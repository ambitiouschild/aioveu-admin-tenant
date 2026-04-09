<template>
  <div class="component-container">
    <!-- 主要内容区域 -->
    <div class="component-container__main">
      <el-card class="box-card" shadow="never">
        <!-- 卡片头部：标题和添加按钮 -->
        <template #header>
          <div class="card-header">
            <span class="card-title">商品属性</span>
            <el-button
              type="success"
              size="small"
              @click="handleAddAttribute"
            >
              <el-icon><Plus /></el-icon>
              添加属性
            </el-button>
          </div>
        </template>

        <!-- 属性表单 -->
        <el-form
          ref="attributeFormRef"
          :model="goodsInfo"
          :rules="formRules"
          size="small"
          label-width="0"
        >
          <!-- 属性表格 -->
          <el-table
            :data="goodsInfo.attrList"
            size="small"
            border
            stripe
            :header-cell-style="{ background: '#f5f7fa' }"
            v-if="goodsInfo.attrList && goodsInfo.attrList.length > 0"
          >
            <!-- 属性名称列 -->
            <el-table-column
              label="属性名称"
              prop="name"
              min-width="200"
            >
              <template #default="scope">
                <el-form-item
                  :prop="`attrList[${scope.$index}].name`"
                  :rules="formRules.name"
                  class="table-form-item"
                >
                  <el-input
                    v-model="scope.row.name"
                    placeholder="请输入属性名称"
                    clearable
                    @change="handleAttributeChange(scope.row, 'name')"
                  />
                </el-form-item>
              </template>
            </el-table-column>

            <!-- 属性值列 -->
            <el-table-column
              label="属性值"
              prop="value"
              min-width="300"
            >
              <template #default="scope">
                <el-form-item
                  :prop="`attrList[${scope.$index}].value`"
                  :rules="formRules.value"
                  class="table-form-item"
                >
                  <el-input
                    v-model="scope.row.value"
                    placeholder="请输入属性值"
                    clearable
                    @change="handleAttributeChange(scope.row, 'value')"
                  />
                </el-form-item>
              </template>
            </el-table-column>

            <!-- 操作列 -->
            <el-table-column
              label="操作"
              width="120"
              align="center"
              fixed="right"
            >
              <template #default="scope">
                <el-tooltip
                  content="删除该属性"
                  placement="top"
                  v-if="scope.$index > 0"
                >
                  <el-button
                    type="danger"
                    size="small"
                    circle
                    plain
                    @click.stop="handleRemoveAttribute(scope.$index)"
                  >
                    <el-icon><Minus /></el-icon>
                  </el-button>
                </el-tooltip>
                <span v-else class="disabled-placeholder"></span>
              </template>
            </el-table-column>
          </el-table>

          <!-- 空状态提示 -->
          <div v-else class="empty-state">
            <el-empty description="暂无商品属性" :image-size="100">
              <el-button type="primary" @click="handleAddAttribute">
                添加属性
              </el-button>
            </el-empty>
          </div>
        </el-form>
      </el-card>
    </div>

    <!-- 底部操作按钮 -->
    <div class="component-container__footer">
      <el-button @click="handlePrev">上一步，填写商品信息</el-button>
      <el-button type="primary" @click="handleNext">下一步，设置商品库存</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
// ==================== 导入依赖 ====================
import { ref, computed, watch, onMounted, nextTick } from "vue";
import { ElMessage, type FormInstance, type FormRules } from "element-plus";
import { Plus, Minus } from "@element-plus/icons-vue";

// 导入API
import PmsSpuAttributeAPI from "@/api/aioveuMall/aioveuMallPms/aioveuMallPmsSpuAttribute/pms-spu-attribute";
import type { PmsSpuPageVO } from "@/api/aioveuMall/aioveuMallPms/aioveuMallPmsSpu/pms-spu";
// ==================== 类型定义 ====================
/**
 * 商品属性项接口
 */
interface GoodsAttribute {
  id?: number;          // 属性ID（编辑时使用）
  name: string;         // 属性名称
  value: string;        // 属性值
  type?: number;        // 属性类型
  categoryId?: number;  // 分类ID
  [key: string]: any;   // 其他可能字段
}

/**
 * 商品信息接口
 */
interface GoodsInfo {
  id?: number;          // 商品ID
  categoryId?: number;  // 分类ID
  attrList: GoodsAttribute[];  // 属性列表
  [key: string]: any;   // 其他商品信息
}


// ==================== Props和Emit ====================
const props = defineProps<{
  modelValue: PmsSpuPageVO;  // ✅ 使用相同的类型;  // 双向绑定的商品信息
}>();

const emit = defineEmits<{
  (e: "prev"): void;  // 上一步事件
  (e: "next"): void;  // 下一步事件
  (e: "update:modelValue", value: PmsSpuPageVO): void;  // ✅ 使用相同的类型
}>();

// ==================== 响应式数据 ====================
// 表单引用
const attributeFormRef = ref<FormInstance>();

// 表单验证规则
const formRules = ref<FormRules>({
  name: [
    {
      required: true,
      message: "请填写属性名称",
      trigger: "blur"
    },
    {
      min: 1,
      max: 50,
      message: "属性名称长度在1-50个字符",
      trigger: "blur"
    }
  ],
  value: [
    {
      required: true,
      message: "请填写属性值",
      trigger: "blur"
    },
    {
      min: 1,
      max: 100,
      message: "属性值长度在1-100个字符",
      trigger: "blur"
    }
  ]
});

// 商品信息双向绑定
const goodsInfo = computed<PmsSpuPageVO>({
  get: () => props.modelValue,
  set: (value) => {
    emit("update:modelValue", value);
  },
});

// 加载状态
const loading = ref(false);

// ==================== 业务方法 ====================
/**
 * 监听分类变化，加载对应分类的属性
 */
const watchCategoryChange = () => {
  watch(
    () => goodsInfo.value.categoryId,
    async (newCategoryId) => {
      console.log("🔄 分类ID变化:", newCategoryId);

      // 如果是编辑模式（有商品ID），不自动加载分类属性
      if (goodsInfo.value.id) {
        console.log("📝 编辑模式，不自动加载分类属性");
        return;
      }

      // 新增模式，加载分类下的属性
      if (newCategoryId) {
        await loadCategoryAttributes(newCategoryId);
      } else {
        // 没有选择分类，重置属性列表
        resetAttributeList();
      }
    },
    {
      immediate: true,  // 立即执行一次
      deep: true        // 深度监听
    }
  );
};

/**
 * 加载分类属性
 * @param categoryId 分类ID
 */
const loadCategoryAttributes = async (categoryId: number): Promise<void> => {
  try {
    loading.value = true;
    console.log(`📦 开始加载分类 ${categoryId} 的属性`);

    const response = await PmsSpuAttributeAPI.getAttributeList({
      categoryId,
      type: 2  // type=2 表示商品分类下的属性
    });

    console.log("API返回的属性数据:", response);

    if (response && Array.isArray(response)) {
      // 转换API数据格式
      const attributes: GoodsAttribute[] = response.map(item => ({
        id: item.id,
        name: item.name || "",
        value: item.value || "",
        type: item.type
      }));

      // 如果有数据，使用API数据，否则添加一个空行
      if (attributes.length > 0) {
        goodsInfo.value.attrList = attributes;
        console.log(`✅ 加载成功，共 ${attributes.length} 个属性`);
      } else {
        resetAttributeList();
        console.log("ℹ️ 该分类下无默认属性");
      }
    } else {
      resetAttributeList();
      console.warn("⚠️ 属性数据格式错误");
    }
  } catch (error) {
    console.error("❌ 加载分类属性失败:", error);
    ElMessage.error("加载属性失败，请重试");
    resetAttributeList();
  } finally {
    loading.value = false;
  }
};

/**
 * 重置属性列表
 */
const resetAttributeList = (): void => {

  // ✅ 确保 goodsInfo.value 存在
  if (!goodsInfo.value) {
    console.error("goodsInfo.value 不存在");
    return;
  }

  goodsInfo.value.attrList = [{
    name: "",
    value: ""
  }];
  console.log("🔄 重置属性列表");
};

/**
 * 添加属性行
 */
const handleAddAttribute = (): void => {
  if (!goodsInfo.value.attrList) {
    goodsInfo.value.attrList = [];
  }

  goodsInfo.value.attrList.push({
    name: "",
    value: ""
  });

  console.log("➕ 添加属性行，当前总数:", goodsInfo.value.attrList.length);

  // 滚动到最后一行
  nextTick(() => {
    const container = document.querySelector('.el-table__body-wrapper');
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  });
};

/**
 * 删除属性行
 * @param index 要删除的索引
 */
const handleRemoveAttribute = (index: number): void => {
  if (goodsInfo.value.attrList.length <= 1) {
    ElMessage.warning("至少需要保留一个属性");
    return;
  }

  const removedItem = goodsInfo.value.attrList[index];
  console.log("🗑️ 删除属性:", removedItem);

  goodsInfo.value.attrList.splice(index, 1);
  console.log("删除后剩余:", goodsInfo.value.attrList.length, "个属性");
};

/**
 * 处理属性变化
 */
const handleAttributeChange = (attribute: GoodsAttribute, field: keyof GoodsAttribute): void => {
  console.log(`📝 属性${field}变化:`, attribute[field]);

  // 可以在这里添加实时验证或其他逻辑
  if (field === 'name' && attribute.name && attribute.name.length > 50) {
    ElMessage.warning("属性名称过长");
  }
};

/**
 * 上一步
 */
const handlePrev = (): void => {
  console.log("⬅️ 返回上一步");
  emit("prev");
};

/**
 * 下一步
 */
const handleNext = async (): Promise<void> => {
  try {
    if (!attributeFormRef.value) {
      console.error("表单引用未初始化");
      return;
    }

    // 表单验证
    const isValid = await attributeFormRef.value.validate();

    if (isValid) {
      // 验证属性数据
      const validationResult = validateAttributes();

      if (validationResult.valid) {
        console.log("✅ 属性验证通过");
        console.log("属性数据:", goodsInfo.value.attrList);

      // ✅ 关键：确保发送完整数据
        const dataToSend: PmsSpuPageVO = {
          ...goodsInfo.value,  // 包含所有现有数据
          // 明确确保关键字段存在
          name: goodsInfo.value.name || "",
          price: goodsInfo.value.price,
          originPrice: goodsInfo.value.originPrice,
          brandId: goodsInfo.value.brandId,
          picUrl: goodsInfo.value.picUrl || "",
          detail: goodsInfo.value.detail || "",
          album: goodsInfo.value.album || [],
          specList: goodsInfo.value.specList || [],
          skuList: goodsInfo.value.skuList || [],
          sales: goodsInfo.value.sales || 0,
          stock: goodsInfo.value.stock || 0,
          categoryName: goodsInfo.value.categoryName || "",
          brandName: goodsInfo.value.brandName || ""
        };

        console.log("📤 GoodsAttribute 发送的数据:", {
          名称: dataToSend.name,
          价格: dataToSend.price,
          属性数量: dataToSend.attrList?.length || 0
        });

        // ✅ 发送完整数据
        emit("update:modelValue", dataToSend);

        // ✅ 触发下一步
        emit("next");


      } else {
        ElMessage.warning(validationResult.message);
      }
    } else {
      console.log("❌ 表单验证失败");
      ElMessage.warning("请填写完整的属性信息");
    }
  } catch (error) {
    console.error("表单验证出错:", error);
  }
};

/**
 * 验证属性数据
 */
const validateAttributes = (): { valid: boolean; message?: string } => {
  if (!goodsInfo.value.attrList || goodsInfo.value.attrList.length === 0) {
    return { valid: true, message: "属性列表为空" };
  }

  // 检查是否有重复的属性名
  const nameSet = new Set<string>();
  for (const attr of goodsInfo.value.attrList) {
    if (attr.name && nameSet.has(attr.name.trim())) {
      return {
        valid: false,
        message: `属性名称"${attr.name}"重复`
      };
    }
    if (attr.name) {
      nameSet.add(attr.name.trim());
    }
  }

  return { valid: true };
};

// ==================== 生命周期钩子 ====================
onMounted(() => {
  console.log("🔄 商品属性组件挂载");

  console.log("🔍 从父组件接收的数据:", {
    名称: props.modelValue?.name,
    价格: props.modelValue?.price,
    原价: props.modelValue?.originPrice,
    品牌ID: props.modelValue?.brandId,
    主图: props.modelValue?.picUrl,
    属性数量: props.modelValue?.attrList?.length || 0
  });
  // 初始化属性列表
  if (!goodsInfo.value.attrList || goodsInfo.value.attrList.length === 0) {
    resetAttributeList();
  }

  // 开始监听分类变化
  watchCategoryChange();
});


// 监听数据变化
watch(() => props.modelValue, (newValue) => {
  console.log("🔄 GoodsAttribute 监听到数据变化:", {
    名称: newValue.name,
    价格: newValue.price,
    属性数量: newValue.attrList?.length || 0
  });
}, { deep: true, immediate: true });



// ==================== 暴露给父组件的方法 ====================
defineExpose({
  /**
   * 手动验证表单
   */
  validateForm: async (): Promise<boolean> => {
    if (!attributeFormRef.value) return false;

    try {
      return await attributeFormRef.value.validate();
    } catch (error) {
      console.error("表单验证出错:", error);
      return false;
    }
  },

  /**
   * 获取当前属性数据
   */
  getAttributes: (): GoodsAttribute[] => {
    return goodsInfo.value.attrList || [];
  },

  /**
   * 清空属性
   */
  clearAttributes: (): void => {
    resetAttributeList();
  }
});
</script>

<style lang="scss" scoped>
.component-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: calc(100vh - 200px);
  padding: 20px;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

  &__main {
    flex: 1;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    overflow-y: auto;
    padding-bottom: 80px; // 为底部按钮留出空间

    .box-card {
      border: none;
      box-shadow: none;

      :deep(.el-card__header) {
        padding: 18px 20px;
        background-color: #f8f9fa;
        border-bottom: 1px solid #ebeef5;

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;

          .card-title {
            font-size: 18px;
            font-weight: 600;
            color: #303133;
          }
        }
      }

      :deep(.el-card__body) {
        padding: 20px;
      }
    }

    // 表格内表单样式
    .table-form-item {
      margin-bottom: 0;

      :deep(.el-form-item__content) {
        margin-left: 0 !important;
      }

      :deep(.el-form-item__error) {
        padding-top: 2px;
      }
    }

    // 空状态样式
    .empty-state {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 200px;
    }

    // 禁用占位符
    .disabled-placeholder {
      display: inline-block;
      width: 32px;
      height: 32px;
    }
  }

  &__footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 16px 20px;
    background-color: #fff;
    border-top: 1px solid #ebeef5;
    text-align: right;
    box-shadow: 0 -2px 12px 0 rgba(0, 0, 0, 0.05);
    z-index: 100;

    .el-button {
      min-width: 120px;
      height: 40px;
      font-size: 16px;
      font-weight: 500;
      margin-left: 12px;

      &:first-child {
        margin-left: 0;
      }
    }
  }
}

// 表格样式
:deep(.el-table) {
  .el-table__header-wrapper {
    th {
      background-color: #f5f7fa;
      color: #303133;
      font-weight: 600;
    }
  }

  .el-table__row {
    &:hover {
      background-color: #f5f7fa;
    }
  }

  .cell {
    padding: 8px 12px;

    .el-button--small {
      padding: 5px;
    }
  }
}

// 加载状态
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;

  .loading-text {
    margin-left: 10px;
    color: #409eff;
  }
}

// 响应式设计
@media (max-width: 768px) {
  .component-container {
    padding: 15px;

    &__main {
      padding-bottom: 70px;

      .box-card {
        :deep(.el-card__header) {
          padding: 15px;

          .card-header {
            flex-direction: column;
            align-items: stretch;
            gap: 10px;

            .card-title {
              text-align: center;
            }
          }
        }
      }
    }

    &__footer {
      padding: 12px 15px;
      text-align: center;

      .el-button {
        width: 48%;
        min-width: auto;
        margin: 0;

        &:first-child {
          margin-right: 4%;
        }
      }
    }
  }
}

@media (max-width: 480px) {
  .component-container {
    padding: 10px;

    &__main {
      .box-card {
        :deep(.el-card__body) {
          padding: 15px 10px;
        }
      }
    }

    &__footer {
      padding: 10px;

      .el-button {
        width: 100%;
        margin-bottom: 8px;

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
}
</style>
