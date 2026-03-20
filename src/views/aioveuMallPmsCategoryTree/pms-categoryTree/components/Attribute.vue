<template>

  <!-- 组件容器 -->
  <div class="component-container">

    <!-- 卡片容器 -->
    <el-card class="box-card" shadow="always">

      <!-- 第一行：显示当前选择的分类和提交按钮 -->
      <el-row>
        <!-- 左侧：显示当前选择的分类 -->
        <el-col :span="12">
          <!-- 如果有选择的分类，显示分类名称 -->
          <el-tag v-if="category && category.name" type="success"
          >{{ category.name }} {{ attributeTypeName }}
          </el-tag>

          <!-- 如果没有选择分类，显示提示 -->
          <el-tag v-else type="info">
            <el-icon><Picture /></el-icon>
            请选择商品分类
          </el-tag>
        </el-col>

        <!-- 右侧：提交按钮 -->
        <el-col :span="12" style="text-align: right">
          <el-button type="primary" @click="submitForm"
          >

            <template #icon><Upload /></template>

            提交</el-button
          >
        </el-col>
      </el-row>


      <!-- 第二行：属性/规格表单 -->
      <el-row style="margin-top: 10px">

        <!-- 动态表单，使用el-form包裹 -->
        <!-- 如果分类有子分类，禁用表单 -->
        <el-form
          ref="form"
          :model="formData"
          :disabled="category?.childrenLen > 0"
          label-width="100"
        >

          <!-- 动态生成属性/规格输入项 -->
          <!-- 标签：如"规格1"、"属性2" -->
          <!-- 表单验证绑定路径 -->
          <el-form-item
            v-for="(item, index) in formData.attributes"
            :key="index"
            :label="attributeTypeName + (index + 1)"
            :prop="'attributes.' + index + '.name'"
            :rules="rules.attribute.name"
          >

            <!-- 属性名称输入框 -->
            <el-input v-model="item.name" style="width: 300px" />

            <!-- 第一行显示添加按钮 -->
            <el-button
              v-if="index === 0"
              type="success"
              circle
              plain
              style="margin-left: 15px"
              @click.prevent="handleAdd()"
            >
              <template #icon><Plus /></template>

            </el-button>

            <!-- 每一行都显示删除按钮 -->
            <el-button
              type="danger"
              plain
              circle
              style="margin-left: 15px"
              @click.prevent="handleDelete(index)"
            >

              <template #icon><Delete /></template>
            </el-button>
          </el-form-item>
        </el-form>
      </el-row>
    </el-card>
  </div>
</template>


<!--
  Vue 3 + TypeScript + Element Plus 组件
  功能：商品属性/规格管理组件
  组件说明：用于管理商品分类下的属性和规格，支持动态添加/删除属性项
-->

<script setup lang="ts">

// 导入API函数
import PmsCategoryAttributeAPI ,{ PmsCategoryAttributePageQuery, PmsCategoryAttributeForm, PmsCategoryAttributePageVO } from "@/api/aioveuMall/aioveuMallPms/aioveuMallPmsCategoryAttribute/pms-category-attribute";


// 定义组件接收的属性
const props = defineProps({

  // 属性类型：1=规格，2=属性
  attributeType: {
    type: Number,
    default: 1,
  },

  // 商品分类信息
  category: {
    type: Object,
    default: () => {
      return {
        id: undefined,
        name: "",
        childrenLen: 0,
      };
    },
  },
});


// 计算属性：根据attributeType显示对应的中文名称
const attributeTypeName = computed(() =>
  props.attributeType === 1 ? "规格" : "属性"
);

// 自定义校验规则：验证属性名称是否为空
const attributeNameValidator = (rule: any, value: any, callback: any) => {
  if (!value) {

    // 显示对应的类型名称（规格/属性）
    return callback(new Error("请输入" + attributeTypeName.value + "名称"));
  } else {
    callback();
  }
};

// 响应式状态管理
const state = reactive({

  // 表单数据
  formData: {
    categoryId: undefined,   // 分类ID
    type: 1,  // 类型：1=规格，2=属性
    attributes: [  // 属性/规格列表
      {
        id: undefined,   // 属性ID（编辑时使用）
        name: "",  // 属性名称
      },
    ],
  },
  // 表单验证规则
  rules: {
    attribute: {
      name: [
        { required: true,   // 必填
          validator: attributeNameValidator,  // 自定义验证器
          trigger: "blur"  // 触发时机：失去焦点
        },
      ],
    },
  },
});

// 将响应式状态解构为ref，方便在模板中使用
const { formData, rules } = toRefs(state);

// 监听分类ID的变化，当选择不同分类时加载对应的属性列表
watch(
  () => props.category.id as any,
  () => {
    const categoryId = props.category.id;
    if (categoryId) {

      // 如果有分类ID，则加载该分类下的属性列表
      PmsCategoryAttributeAPI.getAttributeList({
        categoryId,
        type: props.attributeType,    // 根据传入的类型加载
      }).then((response) => {
        const { data } = response;
        if (data && data.length > 0) {

          // 如果后端返回了数据，则用返回的数据填充表单
          state.formData.attributes = response.data;
        } else {

          // 如果没有数据，重置为一个空的属性项
          state.formData.attributes = [
            {
              id: undefined,
              name: "",
            },
          ];
        }
      });
    } else {

      // 如果没有选择分类，清空表单
      state.formData.attributes = [
        {
          id: undefined,
          name: "",
        },
      ];
    }
  }
);

/**
 * 添加一个新的属性/规格项
 */
function handleAdd() {
  state.formData.attributes.push({
    id: undefined,
    name: "",
  });
}


/**
 * 删除指定索引的属性/规格项
 * @param index - 要删除的项的索引
 */
function handleDelete(index: number) {

  // 如果只剩最后一个，不清空数组，而是重置为初始状态
  if (state.formData.attributes.length == 1) {
    state.formData.attributes = [
      {
        id: undefined,
        name: "",
      },
    ];
    return;
  }

  // 删除指定项
  state.formData.attributes.splice(index, 1);
}

/**
 * 提交表单数据
 */
function submitForm() {

  // 准备提交数据
  state.formData.categoryId = props.category.id;  // 设置分类ID
  state.formData.type = props.attributeType;  // 设置类型

  // 调用API保存数据
  PmsCategoryAttributeAPI.saveAttributeBatch(state.formData).then(() => {

    // 保存成功提示
    ElMessage.success("提交成功");
  });
}
</script>



<!-- 组件样式 -->
<style scoped>

/* 组件容器样式 */
.component-container {
  margin-bottom: 20px;  /* 底部间距 */
}
</style>
