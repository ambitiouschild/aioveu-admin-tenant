<template>
  <!-- 商品分类选择组件容器 -->
  <div class="component-container">
    <!-- 主要内容区域 -->
    <div class="component-container__main">
      <!-- 级联选择器面板：用于选择商品分类 -->
      <!-- 这个级联选择器的第三级就是具体产品 -->
      <el-cascader-panel
        ref="categoryRef"
        v-model="goodsInfo.categoryId"
        :options="categoryOptions"
        :props="{
          emitPath: false,  // 只返回最后一级的值，不返回路径数组
          value: 'value',      // 选项的值字段名
          label: 'label',    // 选项的标签字段名
          children: 'children' // 选项的子级字段名
        }"
        @change="handleCategoryChange"
      />

      <!-- 分类路径显示区域 -->
      <!-- 这里显示的路径实际是：大分类 > 子分类 > 产品 -->
      <div class="path-display" style="margin-top: 20px">
        <!-- 提示文本 -->
        <el-link
          v-show="pathLabels.length > 0"
          type="info"
          :underline="false"
        >
          您选择的商品分类:
        </el-link>

        <!-- 显示选中的分类路径 -->
        <el-link
          v-for="(item, index) in pathLabels"
          :key="index"
          type="primary"
          :underline="false"
          class="path-item"
        >
          {{ item }}
          <!-- 分类路径分隔符 -->
          <span
            v-show="index < pathLabels.length - 1"
            class="separator"
          >
            &gt;
          </span>
        </el-link>
      </div>
    </div>

    

    <!-- 底部操作按钮区域 -->
    <div class="component-container__footer">
      <!-- 下一步按钮 -->
      <el-button
        type="primary"
        :disabled="!goodsInfo.categoryId"
        @click="handleNext"

      >
        下一步，填写商品信息
      </el-button>
    </div>
  </div>
</template>



<script setup lang="ts">
// ==================== 导入依赖 ====================
import { ref, computed, onMounted, nextTick } from "vue";
import { ElMessage, type CascaderPanelInstance } from "element-plus";

// 导入分类API
import PmsCategoryAPI from "@/api/aioveuMall/aioveuMallPms/aioveuMallPmsCategory/pms-category";


/*🎯 解决方案

在 GoodsCategory.vue中，当用户选择"阿卡丽"时，需要：

获取产品ID（阿卡丽的ID）

将产品ID传递给父组件（GoodsDetail.vue）

父组件传递给商品信息页（GoodsInfo.vue）

商品信息页根据ID加载产品信息*/

// ==================== 类型定义 ====================
/**
 * 分类选项数据类型
 */
interface CategoryOption {
  id: number;           // 分类ID
  name: string;         // 分类名称
  children?: CategoryOption[]; // 子分类
}

/**
 * 商品信息数据类型
 */
interface GoodsInfo {
  categoryId?: number;  // 选中的分类ID
  id?: number;          // 商品ID（编辑时使用）
  [key: string]: any;   // 其他商品信息字段
}

// ==================== 组件Props和Emit ====================
/**
 * 定义组件接收的属性
 */
const props = defineProps<{
  modelValue: GoodsInfo;  // 双向绑定的商品信息
}>();

/**
 * 定义组件发射的事件
 */
const emit = defineEmits<{
  // 下一步事件
  (e: "next"): void;
  // 更新模型值事件
  (e: "update:modelValue", value: GoodsInfo): void;
}>();

// ==================== 响应式数据 ====================
// 级联选择器组件引用
const categoryRef = ref<CascaderPanelInstance>();

// 响应式数据
const categoryOptions = ref<CategoryOption[]>([]);  // 分类选项数据
const pathLabels = ref<string[]>([]);               // 选中的分类路径标签

// 使用计算属性实现双向绑定
const goodsInfo = computed<GoodsInfo>({
  get: () => props.modelValue,
  set: (value) => {
    emit("update:modelValue", value);
  },
});

// ==================== 业务方法 ====================
/**
 * 加载分类数据
 * 从API获取商品分类树形数据
 */
const loadCategoryData = async (): Promise<void> => {
  try {
    console.log("📦 开始加载商品分类数据");

    // 调用API
    const response = await PmsCategoryAPI.getCategoryOptions();

    // 调试：查看API返回的数据结构
    console.log("API响应数据:{}", response);

    // 假设API返回的数据在response.data中
    // 如果API直接返回数组，就使用response
    // 如果API返回的是 { data: [...] } 结构，就使用response.data

    let data: any = response;

    // 检查常见的API响应结构
    if (response && typeof response === 'object') {
      // 情况1: API返回 { data: [...] } 结构
      if (response.data && Array.isArray(response.data)) {
        data = response.data;
      }
      // 情况2: API返回 { data: { data: [...] } } 结构
      else if (response.data && response.data.data && Array.isArray(response.data.data)) {
        data = response.data.data;
      }
      // 情况3: API直接返回数组
      else if (Array.isArray(response)) {
        data = response;
      }
    }

    console.log("提取的分类数据:", data);

    if (data && Array.isArray(data)) {
      categoryOptions.value = data as CategoryOption[];
      console.log("✅ 商品分类数据加载完成，共", categoryOptions.value.length, "条");

      // 如果商品已有分类ID（编辑模式），需要初始化选中状态
      if (goodsInfo.value.id && goodsInfo.value.categoryId) {
        await nextTick();
        initializeSelectedCategory();
      }
    } else {
      console.warn("⚠️ 商品分类数据为空或格式错误");
      ElMessage.warning("暂无商品分类数据");
    }
  } catch (error) {
    console.error("❌ 加载商品分类数据失败:", error);
    ElMessage.error("加载商品分类失败，请重试");
  }
};

/**
 * 调试API响应的函数
 */
// const debugApiResponse = async (): Promise<void> => {
//   try {
//     console.log("🔍 开始调试API响应结构");
//     const response = await PmsCategoryAPI.getCategoryOptions();
//
//     console.log("API完整响应:", response);
//     console.log("响应类型:", typeof response);
//     console.log("是否是数组:", Array.isArray(response));
//     console.log("响应data:", response.data);
//     console.log("响应data的类型:", typeof response.data);
//     console.log("响应data是否是数组:", Array.isArray(response.data));
//
//     if (response.data && response.data.data) {
//       console.log("嵌套data:", response.data.data);
//     }
//   } catch (error) {
//     console.error("调试API失败:", error);
//   }
// };

/**
 * 初始化已选中的分类（编辑模式）
 * 根据已保存的分类ID设置选中状态
 */
const initializeSelectedCategory = (): void => {
  if (!categoryRef.value) {
    console.warn("⚠️ 级联选择器未初始化");
    return;
  }

  try {
    // 尝试根据分类ID查找对应的节点
    const selectedId = goodsInfo.value.categoryId;
    if (selectedId) {
      console.log("🔄 初始化已选分类:", selectedId);
      // 触发一次分类变化事件来更新路径显示
      handleCategoryChange();
    }
  } catch (error) {
    console.error("❌ 初始化已选分类失败:", error);
  }
};

/**
 * 分类选择变化事件处理
 * 当用户选择分类时触发
 */
const handleCategoryChange = (): void => {
  try {
    if (!categoryRef.value) {
      console.warn("⚠️ 级联选择器未初始化");
      return;
    }

    // 获取选中的节点
    const checkedNodes = categoryRef.value.getCheckedNodes(false);
    if (!checkedNodes || checkedNodes.length === 0) {
      console.log("📝 未选择任何分类");
      pathLabels.value = [];
      goodsInfo.value.categoryId = undefined;
      return;
    }

    // 获取第一个选中的节点
    const selectedNode = checkedNodes[0];

    // 更新路径标签
    const nodePathLabels = selectedNode.pathLabels || [];
    pathLabels.value = nodePathLabels;

    // 更新商品信息的分类ID
    const nodeValue = selectedNode.value as number;
    goodsInfo.value.categoryId = nodeValue;

    console.log("📋 选择的分类:", {
      id: nodeValue,
      path: nodePathLabels.join(" > "),
      node: selectedNode
    });

  } catch (error) {
    console.error("❌ 处理分类选择变化失败:", error);
    ElMessage.error("处理分类选择失败");
  }
};

/**
 * 下一步按钮点击事件处理
 * 验证分类已选择，然后触发下一步事件
 */
const handleNext = (): void => {
  // 验证是否已选择分类
  if (!goodsInfo.value.categoryId) {
    ElMessage.warning("请先选择商品分类");
    return;
  }

  console.log("➡️ 进入下一步，已选分类ID:", goodsInfo.value.categoryId);

  // 发射下一步事件
  emit("next");
};

// ==================== 生命周期钩子 ====================
/**
 * 组件挂载时加载分类数据
 */
onMounted(() => {
  console.log("🔄 商品分类选择组件挂载");
  // 加载分类数据
  loadCategoryData();
  // 如果需要调试API结构，可以取消下面的注释
  // debugApiResponse();
});

// ==================== 暴露给父组件的方法 ====================
defineExpose({
  /**
   * 重新加载分类数据
   */
  reloadData: () => {
    loadCategoryData();
  },

  /**
   * 获取当前选中的分类信息
   */
  getSelectedCategory: () => {
    return {
      categoryId: goodsInfo.value.categoryId,
      pathLabels: pathLabels.value
    };
  },

  /**
   * 清空选择
   */
  clearSelection: () => {
    if (categoryRef.value) {
      try {
        // 清空选中状态
        categoryRef.value.clearCheckedNodes();
        pathLabels.value = [];
        goodsInfo.value.categoryId = undefined;
      } catch (error) {
        console.error("清空选择失败:", error);
      }
    }
  }
});
</script>

<style lang="scss" scoped>
.component-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 400px;
  padding: 20px;
  box-sizing: border-box;

  &__main {
    flex: 1;
    margin: 0 auto;
    max-width: 800px;
    width: 100%;

    // 级联选择器样式
    :deep(.el-cascader-panel) {
      width: 100%;
      max-height: 400px;
      overflow-y: auto;
      border: 1px solid #dcdfe6;
      border-radius: 4px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

      .el-cascader-menu {
        min-width: 200px;
        height: 300px;

        .el-cascader-node {
          padding: 0 20px;
          height: 40px;
          line-height: 40px;

          &:hover {
            background-color: #f5f7fa;
          }

          &.is-active {
            color: #409eff;
            font-weight: 600;
          }
        }
      }
    }

    // 分类路径显示区域
    .path-display {
      padding: 15px;
      background-color: #f8f9fa;
      border-radius: 4px;
      border: 1px solid #ebeef5;
      margin-top: 20px;

      .el-link {
        font-size: 14px;
        font-weight: 500;

        &.path-item {
          margin-left: 5px;

          &:first-of-type {
            margin-left: 0;
          }
        }
      }

      .separator {
        display: inline-block;
        margin: 0 5px;
        color: #909399;
        font-size: 12px;
      }
    }
  }

  &__footer {
    position: sticky;
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
      min-width: 180px;
      height: 40px;
      font-size: 16px;
      font-weight: 500;

      // 禁用状态样式
      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
    }
  }

  // 响应式设计
  @media (max-width: 768px) {
    padding: 15px;

    &__main {
      :deep(.el-cascader-panel) {
        .el-cascader-menu {
          min-width: 150px;
        }
      }

      .path-display {
        padding: 10px;

        .el-link {
          font-size: 12px;
        }
      }
    }

    &__footer {
      padding: 12px 15px;

      .el-button {
        min-width: 140px;
        height: 36px;
        font-size: 14px;
      }
    }
  }

  @media (max-width: 480px) {
    padding: 10px;

    &__main {
      :deep(.el-cascader-panel) {
        .el-cascader-menu {
          min-width: 120px;
        }
      }
    }

    &__footer {
      padding: 10px;
      text-align: center;

      .el-button {
        width: 100%;
        min-width: auto;
      }
    }
  }
}

// 加载状态样式
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;

  .loading-text {
    margin-left: 10px;
    color: #409eff;
  }
}

// 空状态样式
.empty-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 300px;
  color: #909399;

  .empty-icon {
    font-size: 60px;
    margin-bottom: 20px;
    opacity: 0.5;
  }

  .empty-text {
    font-size: 16px;
    margin-bottom: 20px;
  }
}
</style>
