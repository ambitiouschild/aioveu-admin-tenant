<template>
  <div class="component-container">
    <!-- 主要内容区域 -->
    <div class="component-container__main">
      <!-- 级联选择器（3级分类） -->
      <el-cascader-panel
        ref="categoryRef"
        v-model="goodsInfo.categoryId"
        :options="categoryOptions"
        :props="{
          emitPath: false,
          value: 'value',
          label: 'label',
          children: 'children',
        }"
        @change="handleCategoryChange"
      />

      <!-- 分类路径显示 -->
      <div class="path-display" style="margin-top: 20px">
        <el-link v-show="pathLabels.length > 0" type="info" underline="never">
          您选择的商品分类:
        </el-link>
        <el-link
          v-for="(item, index) in pathLabels"
          :key="index"
          type="primary"
          underline="never"
          class="path-item"
        >
          {{ item }}
          <span v-show="index < pathLabels.length - 1" class="separator">&gt;</span>
        </el-link>
      </div>

      <!-- 在下面显示该第三级分类的商品列表 -->
      <div v-if="showProductSection" class="product-section">
        <div class="section-header">
          <h3>{{ selectedThirdLevelName }} - 商品列表</h3>
          <div class="section-actions">
            <el-button type="primary" size="small" @click="handleAddGoods">新增商品</el-button>
          </div>
        </div>

        <!-- 商品表格 -->
        <el-table
          :data="goodsList"
          border
          stripe
          size="small"
          v-loading="loadingGoods"
          class="goods-table"
        >
          <el-table-column label="商品名称" width="200">
            <template #default="scope">
              <div class="goods-info">
                <el-image
                  v-if="scope.row.picUrl"
                  :src="scope.row.picUrl"
                  fit="cover"
                  class="goods-thumb"
                />
                <div class="goods-name">{{ scope.row.name }}</div>
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="price" label="价格" width="120" align="right">
            <template #default="scope">¥{{ formatPrice(scope.row.price) }}</template>
          </el-table-column>

          <el-table-column prop="stock" label="库存" width="100" align="center" />

          <el-table-column prop="status" label="状态" width="100" align="center">
            <template #default="scope">
              <el-tag :type="scope.row.status === 1 ? 'success' : 'info'" size="small">
                {{ scope.row.status === 1 ? "上架" : "下架" }}
              </el-tag>
            </template>
          </el-table-column>

          <el-table-column label="操作" width="150" align="center" fixed="right">
            <template #default="scope">
              <el-button-group>
                <el-button type="primary" size="small" @click="handleViewGoods(scope.row)">
                  查看
                </el-button>
                <el-button type="success" size="small" @click="handleEditGoods(scope.row)">
                  编辑
                </el-button>
              </el-button-group>
            </template>
          </el-table-column>
        </el-table>

        <!-- 空状态 -->
        <div v-if="goodsList.length === 0 && !loadingGoods" class="empty-goods">
          <el-empty description="该分类下暂无商品">
            <el-button type="primary" @click="handleAddGoods">新增商品</el-button>
          </el-empty>
        </div>
      </div>
    </div>

    <!-- 底部按钮 -->
    <div class="component-container__footer">
      <el-button type="primary" :disabled="!goodsInfo.categoryId" @click="handleNext">
        下一步，填写商品信息
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from "vue";
import { useRouter } from "vue-router";
import { ElMessage, type CascaderPanelInstance } from "element-plus";
import { useGoodsStoreHook } from "@/store/modules/goods.store";
// 导入API
import PmsCategoryAPI from "@/api/aioveuMall/aioveuMallPms/aioveuMallPmsCategory/pms-category";
import PmsSpuAPI from "@/api/aioveuMall/aioveuMallPms/aioveuMallPmsSpu/pms-spu";

interface CategoryOption {
  id: number;
  name: string;
  children?: CategoryOption[];
}

interface GoodsItem {
  id: number;
  name: string;
  picUrl?: string;
  price: number;
  stock: number;
  status: number;
  [key: string]: any;
}

interface GoodsInfo {
  categoryId?: number;
  id?: number;
  [key: string]: any;
}

/*GoodsCategory.vue (子组件)
        ↓
   emit("update:modelValue")  // 双向绑定更新
↓
GoodsDetail.vue (父组件)      // 统一管理 goodsInfo
↓
   通过 props 传递
        ↓
GoodsInfo.vue (下一步组件)    // 接收 goodsInfo*/
/*当您在 GoodsCategory.vue中修改 goodsInfo.value时，它会通过 emit("update:modelValue")
更新父组件的 goodsInfo。但是当切换到下一步时，GoodsInfo.vue可能没有正确接收到更新后的数据。*/

// Props和Emit
const props = defineProps<{
  modelValue: GoodsInfo;
}>();

/*在商品分类页面：
用户选择分类
显示该分类下的商品列表
点击"编辑"商品 → 需要传递商品ID给父组件
点击"下一步"新增 → 只传递分类ID给父组件
父组件需要知道：
如果是"编辑"模式：需要商品ID来加载商品详情
如果是"新增"模式：只需要分类ID*/

const emit = defineEmits<{
  (e: "next"): void;
  (e: "update:modelValue", value: GoodsInfo): void; // 双向绑定
  (e: "edit-goods", goodsId: number): void; // 新增：编辑商品
}>();

const router = useRouter();

// 响应式数据
const categoryRef = ref<CascaderPanelInstance>();
const categoryOptions = ref<CategoryOption[]>([]);
const pathLabels = ref<string[]>([]);
const goodsList = ref<GoodsItem[]>([]);
const loadingGoods = ref(false);
const selectedThirdLevelName = ref("");

// 获取 store
const goodsState = useGoodsStoreHook();

// 商品信息双向绑定
const goodsInfo = computed<GoodsInfo>({
  //当您修改 goodsInfo.value.id时，只修改了计算属性的一个属性，没有触发 setter！
  //Vue 的计算属性 setter 只在重新赋值整个对象时触发，修改对象属性不会触发。
  get: () => props.modelValue,
  set: (value) => {
    emit("update:modelValue", value);
  },
});

// 计算属性
const showProductSection = computed(() => {
  return pathLabels.value.length === 3 && goodsInfo.value.categoryId;
});

// 方法
const loadCategoryData = async (): Promise<void> => {
  try {
    console.log("📦 开始加载商品分类数据");

    const response = await PmsCategoryAPI.getCategoryOptions();

    let data: any = response;
    console.log("📦 data" ,data);
    if (response && typeof response === "object") {
      if (response.data && Array.isArray(response.data)) {
        data = response.data;
      } else if (response.data && response.data.data && Array.isArray(response.data.data)) {
        data = response.data.data;
      } else if (Array.isArray(response)) {
        data = response;
      }
    }

    if (data && Array.isArray(data)) {
      categoryOptions.value = data as CategoryOption[];
      console.log("✅ 商品分类数据加载完成");

      // ✅ 关键修改：加载保存的状态
      await restoreCategoryState();

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

// ✅ 新增：恢复分类状态的方法
const restoreCategoryState = async () => {
  const savedCategoryId = goodsState.getCategory();
  if (savedCategoryId && goodsState.shouldRestoreState) {
    console.log("🔄 恢复分类状态:", savedCategoryId);

    // 设置商品信息中的分类ID
    goodsInfo.value.categoryId = savedCategoryId;

    // 设置路径标签
    if (goodsState.pathLabels && goodsState.pathLabels.length > 0) {
      pathLabels.value = goodsState.pathLabels;
    }

    // 设置三级分类名称
    if (goodsState.selectedThirdLevelName) {
      selectedThirdLevelName.value = goodsState.selectedThirdLevelName;
    }

    // 等待DOM更新
    await nextTick();

    // 尝试设置级联选择器的选中状态
    if (categoryRef.value) {
      try {
        // 这里需要根据你的级联组件API来设置选中
        // 例如：categoryRef.value.setCheckedNodes([/* 节点 */])
        console.log("尝试设置级联选择器选中状态");
      } catch (error) {
        console.error("设置级联选择器选中状态失败:", error);
      }
    }

    // 加载该分类下的商品
    await loadGoodsByCategory(savedCategoryId);

    // 标记状态已恢复
    goodsState.shouldRestoreState = false;
  }
};

const handleCategoryChange = async (): Promise<void> => {
  try {
    if (!categoryRef.value) {
      console.warn("⚠️ 级联选择器未初始化");
      return;
    }

    const checkedNodes = categoryRef.value.getCheckedNodes(false);
    if (!checkedNodes || checkedNodes.length === 0) {
      console.log("📝 未选择任何分类");
      pathLabels.value = [];
      goodsInfo.value.categoryId = undefined;
      goodsList.value = [];
      selectedThirdLevelName.value = "";

      // 清除保存的状态
      goodsState.clearState();

      return;
    }

    const selectedNode = checkedNodes[0];
    const nodePathLabels = selectedNode.pathLabels || [];
    const nodeValue = selectedNode.value as number;

    pathLabels.value = nodePathLabels;
    goodsInfo.value.categoryId = nodeValue;

    // 保存第三级分类名称
    if (nodePathLabels.length >= 3) {
      selectedThirdLevelName.value = nodePathLabels[2];
    }

    console.log("📋 选择的分类:", {
      id: nodeValue,
      path: nodePathLabels.join(" > "),
      level: nodePathLabels.length,
    });

    // 如果是第三级分类，加载该分类下的商品
    if (nodePathLabels.length === 3) {
      // ✅ 关键：保存状态到 store
      goodsState.saveCategoryState(nodeValue, nodePathLabels, nodePathLabels[2]);
      // 调用API获取该分类下的商品getPage
      await loadGoodsByCategory(nodeValue);
    } else {
      goodsList.value = [];
      selectedThirdLevelName.value = "";
      goodsState.clearState();
    }
  } catch (error) {
    console.error("❌ 处理分类选择变化失败:", error);
    ElMessage.error("处理分类选择失败");
  }
};

// 调用API获取该分类下的商品getPage
const loadGoodsByCategory = async (categoryId: number): Promise<void> => {
  try {
    loadingGoods.value = true;

    // 调用API获取该分类下的商品getPage  getSpuListByCategory
    //您的 PmsSpuPageQuery接口继承了 PageQuery，而 PageQuery可能定义了 pageNum和 pageSize属性
    const response = await PmsSpuAPI.getPage({
      categoryId,
      pageNum: 1,
      pageSize: 10,
    });

    const responseData = response as any;
    console.log("📦 加载到的商品列表:", responseData);
    console.log("📦 加载到的商品列表response.data:", responseData.list);

    if (response && responseData.list) {
      goodsList.value = responseData.list.map((item: any) => ({
        id: item.id,
        name: item.name || "未命名商品",
        picUrl: item.picUrl,
        price: item.price || 0,
        stock: item.stock || 0,
        status: item.status || 0,
      }));

      console.log(`✅ 加载到 ${goodsList.value.length} 个商品`);
    } else {
      goodsList.value = [];
      console.log("📝 该分类下暂无商品");
    }
  } catch (error) {
    console.error("❌ 加载商品列表失败:", error);
    ElMessage.error("加载商品列表失败");
    goodsList.value = [];
  } finally {
    loadingGoods.value = false;
  }
};

const handleViewGoods = (goods: GoodsItem) => {
  console.log("👀 查看商品:", goods);
  router.push({
    path: "/goods/detail",
    query: {
      goodsId: goods.id,
      mode: "view",
    },
  });
};

// 完全正确！这就是最佳实践！您的思路完全正确：
// 1. 点击分类 → 获取该分类下的商品列表
// 2. 点击编辑 → 将商品ID传递给父组件
// 3. 父组件 → 根据商品ID获取商品详情
// 4. 父组件 → 将完整的商品信息传递给所有子组件

const handleEditGoods = (goods: GoodsItem) => {
  console.log("✏️ 编辑商品:", goods);

  //我明白了！您希望在点击编辑商品时，整个流程都是编辑模式，而其他情况下是新增模式。让我帮您实现这个逻辑。
  // 1. 保存商品ID到 goodsInfo
  // 错误：只修改属性，不会触发 setter
  // 触发编辑商品事件
  emit("edit-goods", goods.id);
  //但步骤已经先切换了！GoodsInfo.vue在数据加载完成前就已经渲染了。
  // 2. 等待父组件加载完成，再进入下一步
  // 不在这里触发 next，让父组件加载完数据后自己切换步骤
  // emit("next");  // 注释掉这行
};

const handleAddGoods = () => {
  console.log("➕ 新增商品");
  if (!goodsInfo.value.categoryId) {
    ElMessage.warning("请先选择商品分类");
    return;
  }

  // ✅ 确保是新增模式
  goodsInfo.value.id = undefined;

  emit("next");

  // router.push({
  //   path: '/goods/detail',
  //   query: {
  //     categoryId: goodsInfo.value.categoryId,
  //     mode: 'add'
  //   }
  // });
};

//每次操作前清空ID（推荐）
const handleNext = (): void => {
  if (!goodsInfo.value.categoryId) {
    ElMessage.warning("请先选择商品分类");
    return;
  }

  // ✅ 关键判断：如果有商品ID，说明是编辑模式，不清除数据
  // 如果没有商品ID，说明是新增模式，清除数据
  if (!goodsInfo.value.id) {
    // 新增模式：清除商品信息
    goodsInfo.value = {
      ...goodsInfo.value,
      name: "",
      picUrl: "",
      price: undefined,
      originPrice: undefined,
      album: [],
      detail: "",
      // 但保留分类ID
      categoryId: goodsInfo.value.categoryId,
    };
  }

  console.log(
    "➡️ 进入下一步，模式:",
    goodsInfo.value.id ? "编辑" : "新增",
    "分类ID:",
    goodsInfo.value.categoryId
  );

  console.log("➡️ 进入下一步，已选分类ID:", goodsInfo.value.categoryId);
  emit("next");
};

const formatPrice = (price: number): string => {
  if (!price) return "0.00";
  return (price / 100).toFixed(2);
};

/**
 * 初始化已选中的分类（编辑模式）
 */
const initializeSelectedCategory = async (): Promise<void> => {
  if (!categoryRef.value) {
    console.warn("⚠️ 级联选择器未初始化");
    return;
  }

  try {
    const selectedId = goodsInfo.value.categoryId;
    if (selectedId && pathLabels.value.length === 3) {
      console.log("🔄 初始化已选分类:", selectedId);
      await loadGoodsByCategory(selectedId);
    }
  } catch (error) {
    console.error("❌ 初始化已选分类失败:", error);
  }
};

onMounted(() => {
  console.log("🔄 商品分类选择组件挂载");

  // 尝试加载保存的分类
  const savedCategoryId = goodsState.getCategory();
  if (savedCategoryId) {
    console.log("📂 加载保存的分类ID:", savedCategoryId);
    // 可以在这里预选中分类
    goodsInfo.value.categoryId = savedCategoryId;
  }
  loadCategoryData();
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

// 在您现有的样式基础上添加
.product-section {
  margin-top: 30px;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ebeef5;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 1px solid #ebeef5;

    h3 {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
      color: #303133;
    }
  }

  .goods-table {
    .goods-info {
      display: flex;
      align-items: center;
      gap: 10px;

      .goods-thumb {
        width: 40px;
        height: 40px;
        border-radius: 4px;
        object-fit: cover;
        border: 1px solid #ebeef5;
      }

      .goods-name {
        font-size: 14px;
        color: #303133;
      }
    }
  }

  .empty-goods {
    padding: 40px 0;
    text-align: center;
    border: 1px dashed #dcdfe6;
    border-radius: 8px;
    background-color: #f8f9fa;
  }
}
</style>
