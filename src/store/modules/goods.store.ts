// store/modules/goods.store.ts
import { store } from "@/store";
import { ref } from "vue";

// 定义 GoodsState 类型
interface GoodsState {
  currentCategoryId: number | null;
  pathLabels: string[];
  selectedThirdLevelName: string;
  goodsList: any[];
  shouldRestoreState: boolean;
}

export const useGoodsStore = defineStore("goods", () => {
  // 状态定义
  const currentCategoryId = ref<number | null>(null);
  const pathLabels = ref<string[]>([]);
  const selectedThirdLevelName = ref<string>("");
  const goodsList = ref<any[]>([]);
  const shouldRestoreState = ref<boolean>(false);

  // localStorage 键名
  const STORAGE_KEY = "goods_store_state";

  /**
   * 保存分类状态
   *
   * @param {number} categoryId 分类ID
   * @param {string[]} pathLabels 分类路径标签
   * @param {string} thirdLevelName 三级分类名称
   */
  function saveCategoryState(
    categoryId: number,
    pathLabelsArr: string[] = [],
    thirdLevelName: string = ""
  ) {
    currentCategoryId.value = categoryId;
    pathLabels.value = pathLabelsArr;  // ✅ 修复：使用不同的变量名
    selectedThirdLevelName.value = thirdLevelName;
    shouldRestoreState.value = true;

    // 同时保存到 localStorage 作为备份
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        currentCategoryId: categoryId,
        pathLabels:pathLabelsArr,  // ✅ 修复：使用不同的变量名
        selectedThirdLevelName: thirdLevelName,
        shouldRestoreState: true,
        timestamp: Date.now(),
      })
    );

    console.log("💾 保存分类状态:", categoryId, pathLabels);
  }

  /**
   * 获取保存的分类
   *
   * @returns {number | null} 分类ID
   */
  function getCategory(): number | null {
    // 先从内存获取
    if (currentCategoryId.value && shouldRestoreState.value) {
      return currentCategoryId.value;
    }

    // 从 localStorage 获取
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        // 检查是否过期（1小时内有效）
        if (Date.now() - parsed.timestamp < 60 * 60 * 1000) {
          if (parsed.shouldRestoreState) {
            return parsed.currentCategoryId;
          }
        }
      }
    } catch (e) {
      console.error("解析保存的分类数据失败:", e);
    }

    return null;
  }

  /**
   * 恢复完整状态
   *
   * @returns {boolean} 是否恢复成功
   */
  function restoreState(): boolean {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        // 检查是否过期（1小时内有效）
        if (Date.now() - parsed.timestamp < 60 * 60 * 1000) {
          if (parsed.shouldRestoreState) {
            currentCategoryId.value = parsed.currentCategoryId;
            pathLabels.value = parsed.pathLabels || [];
            selectedThirdLevelName.value = parsed.selectedThirdLevelName || "";
            shouldRestoreState.value = parsed.shouldRestoreState;
            console.log("🔄 恢复完整状态:", parsed.currentCategoryId);
            return true;
          }
        }
      }
    } catch (e) {
      console.error("恢复状态失败:", e);
    }
    return false;
  }

  /**
   * 清除状态
   * 重置所有状态到初始值
   */
  function clearState() {
    currentCategoryId.value = null;
    pathLabels.value = [];
    selectedThirdLevelName.value = "";
    goodsList.value = [];
    shouldRestoreState.value = false;
    localStorage.removeItem(STORAGE_KEY);
    console.log("🗑️ 清除商品状态");
  }

  /**
   * 只清除商品，保留分类状态
   * 用于商品提交成功后，重置为新增状态
   */
  function clearGoodsOnly() {
    shouldRestoreState.value = true;
    console.log("🔄 清除商品，保留分类状态");
  }

  return {
    // 状态
    currentCategoryId,
    pathLabels,
    selectedThirdLevelName,
    goodsList,
    shouldRestoreState,

    // 方法
    saveCategoryState,
    getCategory,
    restoreState,
    clearState,
    clearGoodsOnly,
  };
});

/**
 * 在组件外部使用 GoodsStore 的钩子函数
 * @see https://pinia.vuejs.org/core-concepts/outside-component-usage.html
 */
export function useGoodsStoreHook() {
  return useGoodsStore(store);
}
