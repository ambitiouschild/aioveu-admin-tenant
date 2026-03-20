<template>
  <!-- 页面容器 -->
<!--  <div class="app-container">-->

    <h5>下一步，设置商品属性</h5>
    <!-- 步骤条：显示商品创建/编辑的步骤流程 -->
<!--    <el-steps-->
<!--      :active="activeStep"-->
<!--      process-status="finish"-->
<!--      finish-status="success"-->
<!--      simple-->
<!--      class="goods-steps"-->
<!--    >-->
<!--      &lt;!&ndash; 步骤1：选择商品分类 &ndash;&gt;-->
<!--      <el-step title="选择商品分类" description="选择商品所属的分类" />-->
<!--      &lt;!&ndash; 步骤2：填写商品信息 &ndash;&gt;-->
<!--      <el-step title="填写商品信息" description="填写商品基本信息" />-->
<!--      &lt;!&ndash; 步骤3：设置商品属性 &ndash;&gt;-->
<!--      <el-step title="设置商品属性" description="设置商品规格属性" />-->
<!--      &lt;!&ndash; 步骤4：设置商品库存 &ndash;&gt;-->
<!--      <el-step title="设置商品库存" description="设置商品SKU和库存" />-->
<!--    </el-steps>-->

    <!-- 步骤1：商品分类选择组件 -->
    <!-- 通过 v-show 控制显示，v-if 控制渲染 -->
    <!-- 商品分类选择组件（编辑模式需要回显） -->
    <!-- 监听编辑事件 -->
<!--    使用 v-if配合 activeStep条件，确保每次只渲染一个子组件-->
<!--    <GoodsCategory-->
<!--      v-if="activeStep === 0 && isDataLoaded"-->
<!--      v-model="goodsInfo"-->
<!--      @prev="handlePrevStep"-->
<!--      @next="handleNextStep"-->
<!--      @edit-goods="handleEditGoods"-->
<!--    />-->

    <!-- 步骤2：商品信息填写组件 -->
    <!-- 商品信息填写组件（编辑模式需要回显） -->
<!--    <GoodsInfo-->
<!--      v-if="activeStep === 1"-->
<!--      v-model="goodsInfo"-->
<!--      @prev="handlePrevStep"-->
<!--      @next="handleNextStep"-->
<!--    />-->

    <!-- 步骤3：商品属性设置组件 -->
    <!-- 商品属性设置组件（编辑模式需要回显） -->
<!--    <GoodsAttribute-->
<!--      v-if="activeStep === 2"-->
<!--      v-model="goodsInfo"-->
<!--      @prev="handlePrevStep"-->
<!--      @next="handleNextStep"-->
<!--    />-->

    <!-- 步骤4：商品库存设置组件 -->
    <!-- 商品库存设置组件（编辑模式需要回显） -->
<!--    <GoodsStock-->
<!--      v-if="activeStep === 3"-->
<!--      v-model="goodsInfo"-->
<!--      @prev="handlePrevStep"-->
<!--      @next="handleNextStep"-->
<!--    />-->


<!--  </div>-->
</template>

<script setup lang="ts">
// ==================== 导入依赖 ====================
// import { ref, onMounted, watch, nextTick } from "vue";
// import { useRoute, useRouter } from "vue-router";
//
// // 导入子组件
// import GoodsCategory from "./components/GoodsCategory.vue";
// import GoodsInfo from "./components/GoodsInfo.vue";
// import GoodsAttribute from "./components/GoodsAttribute.vue";
// import GoodsStock from "./components/GoodsStock.vue";
//
// // 导入API接口
// import PmsSpuAPI, {
//   type PmsSpuPageVO
// } from "@/api/aioveuMall/aioveuMallPms/aioveuMallPmsSpu/pms-spu";

// ==================== 组件配置 ====================
// defineOptions({
//   name: "GoodsDetail",  // 组件名称
//   inheritAttrs: false,  // 不继承非prop属性
// });

// ==================== 路由和状态管理 ====================
// const route = useRoute();  // 路由实例，用于获取查询参数
// const router = useRouter();  // 路由实例，用于页面跳转
//
// // 步骤状态
// const activeStep = ref<number>(0);  // 当前激活的步骤，0-3
// const isDataLoaded = ref<boolean>(false);  // 数据是否加载完成


//父组件使用 PmsSpuPageVO类型
//
// 子组件使用自定义的 GoodsInfo接口
//
// 两个接口的结构不完全一致
// 商品信息数据
// 改为使用 ref

// ref的 .value赋值创建了全新的引用，Vue 的响应式系统能更可靠地追踪这种变化，特别是在组件销毁/重建的场景下。
//
// 而 reactive的 Object.assign是原地修改，在复杂的组件生命周期中，响应式订阅可能丢失。

// const goodsInfo = ref<PmsSpuPageVO>({
//   id: undefined,           // 商品ID
//   name: "",                // 商品名称
//   categoryId: undefined,   // 分类ID
//   brandId: undefined,      // 品牌ID
//   originPrice: undefined,  // 原价（单位：分）
//   price: undefined,        // 现价（单位：分）
//   album: [],               // 商品相册图片数组
//   attrList: [],            // 商品属性列表
//   specList: [],            // 商品规格列表
//   skuList: [],             // 商品SKU列表
//   detail: "",              // 商品详情HTML
//   sales: 0,                // 销量
//   stock: 0,                // 总库存
//   picUrl: "",              // 商品主图
//   categoryName: "",        // 分类名称
//   brandName: "",           // 品牌名称
// });

// ==================== 方法定义 ====================
/**
 * 加载商品数据
 * 如果是编辑模式，根据商品ID加载数据   更简单的方法：在父组件 GoodsDetail.vue中统一加载数据，然后传递给所有子组件
 * 如果是新增模式，只初始化数据
 */
// const loadGoodsData = async (): Promise<void> => {
//   try {
//     const goodsId = goodsInfo.value.id;
//
//     console.log("📦 加载商品数据，ID:", goodsId);
//
//     if (goodsId) {
//       console.log(`📦 编辑模式，加载商品ID: ${goodsId} 的数据`);
//
//       // 调用API获取商品详情
//       const response = await PmsSpuAPI.getSpuDetail(goodsId) as any;
//
//       console.log(`📦 编辑模式，加载商品信息:{}`, response);
//
//       if (response ) {
//
//         // 直接赋值
//         goodsInfo.value = {
//           ...response,
//           // 价格转换
//           originPrice: response.originPrice ? Number(response.originPrice) / 100 : undefined,
//           price: response.price ? Number(response.price) / 100 : undefined
//         };
//
//         console.log("✅ 商品数据加载完成", goodsInfo);
//
//       }
//     } else {
//       console.log("🆕 新增商品模式，初始化空数据");
//     }
//
//     // 标记数据已加载完成
//     isDataLoaded.value = true;
//
//   } catch (error) {
//     console.error("❌ 加载商品数据失败:", error);
//     // 可以添加错误提示
//     isDataLoaded.value = true; // 即使失败也标记为已加载，避免页面卡住
//   }
// };

// /**
//  * 上一步：返回上一个步骤
//  */
// const handlePrevStep = (): void => {
//   if (activeStep.value > 0) {
//     activeStep.value--;
//     console.log(`⬅️ 返回上一步，当前步骤: ${activeStep.value}`);
//   }
// };

/**
 * 下一步：进入下一个步骤
 */
// const handleNextStep = (): void => {
//   if (activeStep.value < 3) {
//     activeStep.value++;
//     console.log(`➡️ 进入下一步，当前步骤: ${activeStep.value}`);
//   }
// };

/**
 * 根据路由参数确定当前步骤
 * 用于直接从某个步骤开始编辑
 */
// const initActiveStep = (): void => {
//   const step = route.query.step as string;
//   if (step) {
//     const stepNum = parseInt(step, 10);
//     if (stepNum >= 0 && stepNum <= 3) {
//       activeStep.value = stepNum;
//     }
//   }
// };


// 处理编辑商品
// const handleEditGoods = async (goodsId: number) => {
//   console.log("🎯 父组件收到编辑商品请求，ID:", goodsId);
//
//   // 1. 设置商品ID
//   goodsInfo.value.id = goodsId;
//
//   // 2. 加载商品数据
//   await loadGoodsData();
//
//   // 3. 等数据加载完成后，再切换到下一步
//   console.log("➡️ 商品数据加载完成，切换到步骤1");
//   activeStep.value = 1;
// };

// ==================== 生命周期钩子 ====================

//每次切换回商品页面，onMounted都会重新执行，但数据被重置了。
//onMounted在每次组件挂载到DOM时执行。当页面切换时，组件会被销毁和重新创建，所以会重新执行。
// onMounted(async () => {
//
//   console.log("🔄 商品详情页面开始加载");
//   console.log(`✅ GoodsDetail 页面激活`)
//
//   // 初始化当前步骤
//   initActiveStep();
//
//   // 确保DOM更新完成
//   await nextTick();
//   console.log("✅ 商品详情页面加载完成");
//
// });

// onUnmounted(() => {
//   console.log(`🗑️ GoodsDetail 页面销毁`)
//
// })

// ==================== 监听器 ====================
// 如果 watch是为了监听从其他页面传递过来的商品ID，那么应该监听路由参数，而不是组件内部的数据
// 在现有监听器下面添加
// 监听商品ID变化
/*问题：为什么不能通过路由？
你们在同一个页面内（/pms/pms-detail）
只是在步骤间切换，不是页面跳转
需要通过父子组件通信传递商品ID*/
// ==================== 监听路由参数变化 ===这个是从其他页面转换过来的=================
// 监听路由参数（用于从其他页面跳转过来）
// watch(() => route.params.id, async (newId, oldId) => {
//   console.log("🔄 父组件监听到商品ID变化:", {
//     oldId,
//     newId,
//   });
//
//   if (newId && newId !== oldId) {
//
//     const goodsId = Number(newId);
//     console.log("📦 监听到路由传递的商品ID:", goodsId);
//     // 这里可以自动加载商品详情
//
//     // 设置商品ID
//     goodsInfo.value.id = goodsId;
//
// // 加载商品数据
//     await  loadGoodsData();
//
//     // 编辑模式默认进入步骤1
//     if (activeStep.value === 0) {
//       console.log("➡️ 编辑模式，自动切换到步骤1");
//       activeStep.value = 1;
//     }
//   } else{
//     // 新增模式
//     console.log("🆕 新增模式，重置数据");
//     // resetGoodsInfo();
//     isDataLoaded.value = true;
//   }
//
// }, { immediate: true });





// // 监听步骤变化，可以在这里添加步骤切换时的逻辑
// watch(activeStep, (newStep, oldStep) => {
//   console.log(`🔄 步骤变化: ${oldStep} -> ${newStep}`);
//
//   // 可以在这里添加步骤切换时的额外逻辑
//   // 例如：保存当前步骤数据、验证当前步骤等
//
//   // 更新URL，支持直接跳转到指定步骤
//   const currentQuery = { ...route.query };
//   if (newStep === 0) {
//     delete currentQuery.step;
//   } else {
//     currentQuery.step = newStep.toString();
//   }
//
//   router.replace({
//     query: currentQuery
//   }).catch(() => {});
// });

// ==================== 暴露给父组件的方法 ====================
// 如果需要暴露方法给父组件，可以在这里定义
// defineExpose({
//   activeStep,
//   goodsInfo,
//   handlePrevStep,
//   handleNextStep
// });
</script>

<!--<style lang="scss" scoped>-->
<!--.app-container {-->
<!--  // 设置最大宽度，居中显示-->
<!--  max-width: 1200px;-->
<!--  margin: 0 auto;-->
<!--  padding: 20px;-->
<!--  min-height: calc(100vh - 84px);-->
<!--  background-color: #fff;-->
<!--  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);-->
<!--  border-radius: 8px;-->

<!--  // 响应式调整-->
<!--  @media (max-width: 1240px) {-->
<!--    max-width: 100%;-->
<!--    margin: 0 20px;-->
<!--  }-->

<!--  @media (max-width: 768px) {-->
<!--    margin: 0 10px;-->
<!--    padding: 15px;-->
<!--  }-->
<!--}-->

<!--// 步骤条样式-->
<!--.goods-steps {-->
<!--  margin-bottom: 40px;-->
<!--  padding: 20px;-->
<!--  background-color: #f8f9fa;-->
<!--  border-radius: 8px;-->
<!--  border: 1px solid #ebeef5;-->

<!--  :deep(.el-step) {-->
<!--    .el-step__title {-->
<!--      font-size: 16px;-->
<!--      font-weight: 500;-->
<!--    }-->

<!--    .el-step__description {-->
<!--      font-size: 12px;-->
<!--      color: #909399;-->
<!--      margin-top: 4px;-->
<!--    }-->

<!--    // 激活步骤的样式-->
<!--    &.is-process {-->
<!--      .el-step__title {-->
<!--        color: #409eff;-->
<!--        font-weight: 600;-->
<!--      }-->
<!--    }-->

<!--    // 完成步骤的样式-->
<!--    &.is-success {-->
<!--      .el-step__title {-->
<!--        color: #67c23a;-->
<!--      }-->

<!--      .el-step__icon {-->
<!--        background-color: #67c23a;-->
<!--        border-color: #67c23a;-->
<!--      }-->
<!--    }-->
<!--  }-->

<!--  // 响应式调整-->
<!--  @media (max-width: 768px) {-->
<!--    padding: 15px 10px;-->
<!--    margin-bottom: 30px;-->

<!--    :deep(.el-step) {-->
<!--      .el-step__title {-->
<!--        font-size: 14px;-->
<!--      }-->

<!--      .el-step__description {-->
<!--        display: none; // 小屏幕隐藏描述-->
<!--      }-->
<!--    }-->
<!--  }-->

<!--  @media (max-width: 480px) {-->
<!--    :deep(.el-step) {-->
<!--      .el-step__title {-->
<!--        font-size: 12px;-->
<!--      }-->
<!--    }-->
<!--  }-->
<!--}-->

<!--// 步骤内容容器-->
<!--:deep(.step-content) {-->
<!--  animation: fadeIn 0.3s ease-in-out;-->

<!--  // 每个步骤内容的统一样式-->
<!--  .step-content-inner {-->
<!--    padding: 30px;-->
<!--    background-color: #fff;-->
<!--    border-radius: 8px;-->
<!--    border: 1px solid #ebeef5;-->
<!--    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);-->

<!--    @media (max-width: 768px) {-->
<!--      padding: 20px 15px;-->
<!--    }-->
<!--  }-->

<!--  // 步骤操作按钮区域-->
<!--  .step-actions {-->
<!--    margin-top: 30px;-->
<!--    padding-top: 20px;-->
<!--    border-top: 1px solid #ebeef5;-->
<!--    text-align: center;-->

<!--    .el-button {-->
<!--      min-width: 100px;-->
<!--      margin: 0 10px;-->

<!--      &:first-child {-->
<!--        margin-left: 0;-->
<!--      }-->

<!--      &:last-child {-->
<!--        margin-right: 0;-->
<!--      }-->
<!--    }-->

<!--    @media (max-width: 768px) {-->
<!--      margin-top: 20px;-->
<!--      padding-top: 15px;-->

<!--      .el-button {-->
<!--        width: 100%;-->
<!--        margin: 5px 0;-->
<!--      }-->
<!--    }-->
<!--  }-->
<!--}-->

<!--// 淡入动画-->
<!--@keyframes fadeIn {-->
<!--  from {-->
<!--    opacity: 0;-->
<!--    transform: translateY(10px);-->
<!--  }-->
<!--  to {-->
<!--    opacity: 1;-->
<!--    transform: translateY(0);-->
<!--  }-->
<!--}-->

<!--// 加载状态-->
<!--.loading-container {-->
<!--  display: flex;-->
<!--  justify-content: center;-->
<!--  align-items: center;-->
<!--  min-height: 400px;-->

<!--  .loading-text {-->
<!--    margin-left: 10px;-->
<!--    color: #409eff;-->
<!--    font-size: 16px;-->
<!--  }-->
<!--}-->

<!--// 错误状态-->
<!--.error-container {-->
<!--  display: flex;-->
<!--  flex-direction: column;-->
<!--  justify-content: center;-->
<!--  align-items: center;-->
<!--  min-height: 400px;-->
<!--  text-align: center;-->

<!--  .error-icon {-->
<!--    font-size: 60px;-->
<!--    color: #f56c6c;-->
<!--    margin-bottom: 20px;-->
<!--  }-->

<!--  .error-text {-->
<!--    color: #f56c6c;-->
<!--    font-size: 18px;-->
<!--    margin-bottom: 20px;-->
<!--  }-->

<!--  .retry-button {-->
<!--    min-width: 120px;-->
<!--  }-->
<!--}-->
<!--</style>-->
