<template>
  <div class="app-container h-full flex flex-1 flex-col">
    <!-- 搜索 -->
    <page-search
      ref="searchRef"
      :search-config="searchConfig"
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    >
    </page-search>

    <!-- 列表 -->
    <page-content
      ref="contentRef"
      :content-config="contentConfig"
      @add-click="handleAddClick"
      @export-click="handleExportClick"
      @search-click="handleSearchClick"
      @toolbar-click="handleToolbarClick"
      @operate-click="handleOperateClick"
      @filter-change="handleFilterChange"
    >
    </page-content>

    <!-- 新增 -->
    <page-modal ref="addModalRef" :modal-config="addModalConfig" @submit-click="handleSubmitClick">
    </page-modal>

    <!-- 编辑 -->
    <page-modal ref="editModalRef" :modal-config="editModalConfig" @submit-click="handleSubmitClick">
    </page-modal>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "PayConfigDummy" });

import PayConfigDummyAPI,{ PayConfigDummyForm, PayConfigDummyPageQuery }
  from "@/api/aioveuMall/aioveuMallPay/aioveuMallPayConfigDummy/pay-config-dummy";
// import type { PayConfigDummyForm, PayConfigDummyPageQuery } from "@/api/types";
import type { IObject, IModalConfig, IContentConfig, ISearchConfig } from "@/components/CURD/types";
import usePage from "@/components/CURD/usePage";

// 组合式 CRUD
const {
  searchRef,
  contentRef,
  addModalRef,
  editModalRef,
  handleQueryClick,
  handleResetClick,
  handleAddClick,
  handleEditClick,
  handleSubmitClick,
  handleExportClick,
  handleSearchClick,
  handleFilterChange,
} = usePage();

// 搜索配置
const searchConfig: ISearchConfig = reactive({
  permPrefix: "aioveuMallPayConfigDummy:pay-config-dummy",
  formItems: [
    {
      type: "input",
      label: "支付配置主表ID",
      prop: "configId",
      attrs: {
        placeholder: "支付配置主表ID",
        clearable: true,
        style: { width: "200px" },
      },
    },
    {
      type: "input",
      label: "所属租户ID",
      prop: "tenantId",
      attrs: {
        placeholder: "所属租户ID",
        clearable: true,
        style: { width: "200px" },
      },
    },
    {
      type: "input",
      label: "支付成功率(0-100)",
      prop: "successRate",
      attrs: {
        placeholder: "支付成功率(0-100)",
        clearable: true,
        style: { width: "200px" },
      },
    },
  ],
});

// 列表配置
const contentConfig: IContentConfig<PayConfigDummyPageQuery> = reactive({
  // 权限前缀
  permPrefix: "aioveuMallPayConfigDummy:pay-config-dummy",
  table: {
    border: true,
    highlightCurrentRow: true,
  },
  // 主键
  pk: "id",
  // 列表查询接口
  indexAction: PayConfigDummyAPI.getPage,
  // 删除接口
  deleteAction: PayConfigDummyAPI.deleteByIds,
  // 数据解析函数
  parseData(res: any) {
    return {
      total: res.total,
      list: res.list,
    };
  },
  // 分页配置
  pagination: {
    background: true,
    layout: "total, sizes, prev, pager, next, jumper",
    pageSize: 20,
    pageSizes: [10, 20, 30, 50],
  },
  // 工具栏配置
  toolbar: ["add", "delete"],
  defaultToolbar: ["refresh", "filter"],
  // 表格列配置
  cols: [
    { type: "selection", width: 55, align: "center" },
    { label: "主键ID", prop: "id" },
    { label: "支付配置主表ID", prop: "configId" },
    { label: "所属租户ID", prop: "tenantId" },
    { label: "支付成功率(0-100)", prop: "successRate" },
    { label: "模拟延迟(毫秒)", prop: "mockDelay" },
    { label: "模拟回调地址", prop: "callbackUrl" },
    { label: "回调延迟(毫秒)", prop: "callbackDelay" },
    { label: "成功响应模板", prop: "successResponse" },
    { label: "失败响应模板", prop: "failResponse" },
    { label: "是否模拟异常: 0-否, 1-是", prop: "simulateError" },
    { label: "模拟错误码", prop: "errorCode" },
    { label: "模拟错误信息", prop: "errorMsg" },
    { label: "是否自动退款: 0-否, 1-是", prop: "autoRefund" },
    { label: "退款延迟(毫秒)", prop: "refundDelay" },
    { label: "逻辑删除：0-未删除 1-已删除", prop: "isDeleted" },
    { label: "创建时间", prop: "createTime" },
    { label: "更新时间", prop: "updateTime" },
    { label: "创建人ID", prop: "createBy" },
    { label: "更新人ID", prop: "updateBy" },
    {
      label: "操作",
      prop: "operation",
      width: 220,
      templet: "tool",
      operat: ["edit", "delete"],
    },
  ],
});

// 新增配置
const addModalConfig: IModalConfig<PayConfigDummyForm> = reactive({
  // 权限前缀
  permPrefix: "aioveuMallPayConfigDummy:pay-config-dummy",
  // 主键
  pk: "id",
  // 弹窗配置
  dialog: {
    title: "新增",
    width: 800,
    draggable: true,
  },
  form: {
    labelWidth: 100,
  },
  // 表单项配置
  formItems: [
    {
      type: "input",
      attrs: {
        placeholder: "主键ID"
      },
      label: "主键ID",
      prop: "id",
    },
    {
      type: "input",
      attrs: {
        placeholder: "支付配置主表ID"
      },
      rules: [{ required: true, message: "支付配置主表ID不能为空", trigger: "blur" }],
      label: "支付配置主表ID",
      prop: "configId",
    },
    {
      type: "input",
      attrs: {
        placeholder: "所属租户ID"
      },
      rules: [{ required: true, message: "所属租户ID不能为空", trigger: "blur" }],
      label: "所属租户ID",
      prop: "tenantId",
    },
    {
      type: "input",
      attrs: {
        placeholder: "支付成功率(0-100)"
      },
      rules: [{ required: true, message: "支付成功率(0-100)不能为空", trigger: "blur" }],
      label: "支付成功率(0-100)",
      prop: "successRate",
    },
    {
      type: "input",
      attrs: {
        placeholder: "模拟延迟(毫秒)"
      },
      label: "模拟延迟(毫秒)",
      prop: "mockDelay",
    },
    {
      type: "input",
      attrs: {
        placeholder: "模拟回调地址"
      },
      label: "模拟回调地址",
      prop: "callbackUrl",
    },
    {
      type: "input",
      attrs: {
        placeholder: "回调延迟(毫秒)"
      },
      label: "回调延迟(毫秒)",
      prop: "callbackDelay",
    },
    {
      type: "input",
      attrs: {
        placeholder: "成功响应模板"
      },
      label: "成功响应模板",
      prop: "successResponse",
    },
    {
      type: "input",
      attrs: {
        placeholder: "失败响应模板"
      },
      label: "失败响应模板",
      prop: "failResponse",
    },
    {
      type: "input",
      attrs: {
        placeholder: "是否模拟异常: 0-否, 1-是"
      },
      rules: [{ required: true, message: "是否模拟异常: 0-否, 1-是不能为空", trigger: "blur" }],
      label: "是否模拟异常: 0-否, 1-是",
      prop: "simulateError",
    },
    {
      type: "input",
      attrs: {
        placeholder: "模拟错误码"
      },
      label: "模拟错误码",
      prop: "errorCode",
    },
    {
      type: "input",
      attrs: {
        placeholder: "模拟错误信息"
      },
      label: "模拟错误信息",
      prop: "errorMsg",
    },
    {
      type: "input",
      attrs: {
        placeholder: "是否自动退款: 0-否, 1-是"
      },
      label: "是否自动退款: 0-否, 1-是",
      prop: "autoRefund",
    },
    {
      type: "input",
      attrs: {
        placeholder: "退款延迟(毫秒)"
      },
      label: "退款延迟(毫秒)",
      prop: "refundDelay",
    },
    {
      type: "input",
      attrs: {
        placeholder: "创建人ID"
      },
      label: "创建人ID",
      prop: "createBy",
    },
    {
      type: "input",
      attrs: {
        placeholder: "更新人ID"
      },
      label: "更新人ID",
      prop: "updateBy",
    },
  ],
  // 提交函数
  formAction: (data: PayConfigDummyForm) => {
    if (data.id) {
      // 编辑
      return PayConfigDummyAPI.update(data.id , data);
    } else {
      // 新增
      return PayConfigDummyAPI.create(data);
    }
  },
});

// 编辑配置
const editModalConfig: IModalConfig<PayConfigDummyForm> = reactive({
  permPrefix: "aioveuMallPayConfigDummy:pay-config-dummy",
  component: "drawer",
  drawer: {
    title: "编辑",
    size: 500,
  },
  pk: "id",
  formAction(data: any) {
    return PayConfigDummyAPI.update(data.id , data);
  },
  formItems: addModalConfig.formItems, // 复用新增的表单项
});

// 处理操作按钮点击
const handleOperateClick = (data: IObject) => {
  if (data.name === "edit") {
    handleEditClick(data.row, async () => {
      return await PayConfigDummyAPI.getFormData(data.row.id);
    });
  }
};

// 处理工具栏按钮点击（删除等）
const handleToolbarClick = (name: string) => {
  console.log(name);
};

</script>
