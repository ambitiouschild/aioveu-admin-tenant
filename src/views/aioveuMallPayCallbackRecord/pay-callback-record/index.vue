<template>
  <div class="app-container h-full flex flex-1 flex-col">
    <!-- 搜索 -->
    <page-search
      ref="searchRef"
      :search-config="searchConfig"
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    ></page-search>

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
    ></page-content>

    <!-- 新增 -->
    <page-modal
      ref="addModalRef"
      :modal-config="addModalConfig"
      @submit-click="handleSubmitClick"
    ></page-modal>

    <!-- 编辑 -->
    <page-modal
      ref="editModalRef"
      :modal-config="editModalConfig"
      @submit-click="handleSubmitClick"
    ></page-modal>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "PayCallbackRecord" });

import PayCallbackRecordAPI, {
  PayCallbackRecordForm,
  PayCallbackRecordPageQuery,
} from "@/api/aioveuMall/aioveuMallPay/aioveuMallPayCallbackRecord/pay-callback-record";
// import type { PayCallbackRecordForm, PayCallbackRecordPageQuery } from "@/api/types";
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
  permPrefix: "aioveuMallPayCallbackRecord:pay-callback-record",
  formItems: [
    {
      type: "input",
      label: "租户ID，0表示平台",
      prop: "tenantId",
      attrs: {
        placeholder: "租户ID，0表示平台",
        clearable: true,
        style: { width: "200px" },
      },
    },
    {
      type: "input",
      label: "内部支付单号",
      prop: "paymentNo",
      attrs: {
        placeholder: "内部支付单号",
        clearable: true,
        style: { width: "200px" },
      },
    },
    {
      type: "input",
      label: "业务订单号",
      prop: "orderNo",
      attrs: {
        placeholder: "业务订单号",
        clearable: true,
        style: { width: "200px" },
      },
    },
    {
      type: "input",
      label: "支付渠道交易号（微信transaction_id / 支付宝trade_no）",
      prop: "transactionId",
      attrs: {
        placeholder: "支付渠道交易号（微信transaction_id / 支付宝trade_no）",
        clearable: true,
        style: { width: "200px" },
      },
    },
    {
      type: "input",
      label: "支付渠道：WECHAT / ALIPAY / UNION",
      prop: "channel",
      attrs: {
        placeholder: "支付渠道：WECHAT / ALIPAY / UNION",
        clearable: true,
        style: { width: "200px" },
      },
    },
    {
      type: "input",
      label: "回调状态：0-接收 1-处理成功 2-处理失败",
      prop: "notifyStatus",
      attrs: {
        placeholder: "回调状态：0-接收 1-处理成功 2-处理失败",
        clearable: true,
        style: { width: "200px" },
      },
    },
    {
      type: "input",
      label: "最后一次回调时间",
      prop: "lastNotifyTime",
      attrs: {
        placeholder: "最后一次回调时间",
        clearable: true,
        style: { width: "200px" },
      },
    },
    {
      type: "input",
      label: "实际支付金额",
      prop: "paidAmount",
      attrs: {
        placeholder: "实际支付金额",
        clearable: true,
        style: { width: "200px" },
      },
    },
    {
      type: "input",
      label: "商户号",
      prop: "mchId",
      attrs: {
        placeholder: "商户号",
        clearable: true,
        style: { width: "200px" },
      },
    },
    {
      type: "input",
      label: "应用ID",
      prop: "appId",
      attrs: {
        placeholder: "应用ID",
        clearable: true,
        style: { width: "200px" },
      },
    },
    {
      type: "input",
      label: "创建时间",
      prop: "createTime",
      attrs: {
        placeholder: "创建时间",
        clearable: true,
        style: { width: "200px" },
      },
    },
  ],
});

// 列表配置
const contentConfig: IContentConfig<PayCallbackRecordPageQuery> = reactive({
  // 权限前缀
  permPrefix: "aioveuMallPayCallbackRecord:pay-callback-record",
  table: {
    border: true,
    highlightCurrentRow: true,
  },
  // 主键
  pk: "id",
  // 列表查询接口
  indexAction: PayCallbackRecordAPI.getPage,
  // 删除接口
  deleteAction: PayCallbackRecordAPI.deleteByIds,
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
  toolbar: [
    "add",
    "delete",
    {
      name: "mockWxPay",
      text: "模拟微信回调",
      // perm: "aioveuMallPayCallbackRecord:pay-callback-record:mock:wxpay",
    },
    {
      name: "mockAliPay",
      text: "模拟支付宝回调",
      // perm: "aioveuMallPayCallbackRecord:pay-callback-record:mock:alipay",
    },
  ],
  defaultToolbar: ["refresh", "filter"],
  // 表格列配置
  cols: [
    { type: "selection", width: 55, align: "center" },
    { label: "主键ID", prop: "id" },
    { label: "租户ID，0表示平台", prop: "tenantId" },
    { label: "内部支付单号", prop: "paymentNo" },
    { label: "业务订单号", prop: "orderNo" },
    { label: "支付渠道交易号（微信transaction_id / 支付宝trade_no）", prop: "transactionId" },
    { label: "支付渠道：WECHAT / ALIPAY / UNION", prop: "channel" },
    { label: "回调状态：0-接收 1-处理成功 2-处理失败", prop: "notifyStatus" },
    { label: "回调次数（防风暴）", prop: "notifyCount" },
    { label: "最后一次回调时间", prop: "lastNotifyTime" },
    { label: "实际支付金额", prop: "paidAmount" },
    { label: "商户号", prop: "mchId" },
    { label: "应用ID", prop: "appId" },
    { label: "原始回调报文（XML / JSON）", prop: "rawData" },
    { label: "处理失败原因", prop: "errorMsg" },
    { label: "逻辑删除：0-未删除 1-已删除", prop: "isDeleted" },
    { label: "创建时间", prop: "createTime" },
    { label: "更新时间", prop: "updateTime" },
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
const addModalConfig: IModalConfig<PayCallbackRecordForm> = reactive({
  // 权限前缀
  permPrefix: "aioveuMallPayCallbackRecord:pay-callback-record",
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
        placeholder: "主键ID",
      },
      label: "主键ID",
      prop: "id",
    },
    {
      type: "input",
      attrs: {
        placeholder: "租户ID，0表示平台",
      },
      rules: [{ required: true, message: "租户ID，0表示平台不能为空", trigger: "blur" }],
      label: "租户ID，0表示平台",
      prop: "tenantId",
    },
    {
      type: "input",
      attrs: {
        placeholder: "内部支付单号",
      },
      rules: [{ required: true, message: "内部支付单号不能为空", trigger: "blur" }],
      label: "内部支付单号",
      prop: "paymentNo",
    },
    {
      type: "input",
      attrs: {
        placeholder: "业务订单号",
      },
      rules: [{ required: true, message: "业务订单号不能为空", trigger: "blur" }],
      label: "业务订单号",
      prop: "orderNo",
    },
    {
      type: "input",
      attrs: {
        placeholder: "支付渠道交易号（微信transaction_id / 支付宝trade_no）",
      },
      rules: [
        {
          required: true,
          message: "支付渠道交易号（微信transaction_id / 支付宝trade_no）不能为空",
          trigger: "blur",
        },
      ],
      label: "支付渠道交易号（微信transaction_id / 支付宝trade_no）",
      prop: "transactionId",
    },
    {
      type: "input",
      attrs: {
        placeholder: "支付渠道：WECHAT / ALIPAY / UNION",
      },
      rules: [
        { required: true, message: "支付渠道：WECHAT / ALIPAY / UNION不能为空", trigger: "blur" },
      ],
      label: "支付渠道：WECHAT / ALIPAY / UNION",
      prop: "channel",
    },
    {
      type: "input",
      attrs: {
        placeholder: "回调状态：0-接收 1-处理成功 2-处理失败",
      },
      rules: [
        {
          required: true,
          message: "回调状态：0-接收 1-处理成功 2-处理失败不能为空",
          trigger: "blur",
        },
      ],
      label: "回调状态：0-接收 1-处理成功 2-处理失败",
      prop: "notifyStatus",
    },
    {
      type: "input",
      attrs: {
        placeholder: "回调次数（防风暴）",
      },
      rules: [{ required: true, message: "回调次数（防风暴）不能为空", trigger: "blur" }],
      label: "回调次数（防风暴）",
      prop: "notifyCount",
    },
    {
      type: "input",
      attrs: {
        placeholder: "最后一次回调时间",
      },
      rules: [{ required: true, message: "最后一次回调时间不能为空", trigger: "blur" }],
      label: "最后一次回调时间",
      prop: "lastNotifyTime",
    },
    {
      type: "input",
      attrs: {
        placeholder: "实际支付金额",
      },
      rules: [{ required: true, message: "实际支付金额不能为空", trigger: "blur" }],
      label: "实际支付金额",
      prop: "paidAmount",
    },
    {
      type: "input",
      attrs: {
        placeholder: "商户号",
      },
      rules: [{ required: true, message: "商户号不能为空", trigger: "blur" }],
      label: "商户号",
      prop: "mchId",
    },
    {
      type: "input",
      attrs: {
        placeholder: "应用ID",
      },
      rules: [{ required: true, message: "应用ID不能为空", trigger: "blur" }],
      label: "应用ID",
      prop: "appId",
    },
    {
      type: "input",
      attrs: {
        placeholder: "原始回调报文（XML / JSON）",
      },
      rules: [{ required: true, message: "原始回调报文（XML / JSON）不能为空", trigger: "blur" }],
      label: "原始回调报文（XML / JSON）",
      prop: "rawData",
    },
    {
      type: "input",
      attrs: {
        placeholder: "处理失败原因",
      },
      rules: [{ required: true, message: "处理失败原因不能为空", trigger: "blur" }],
      label: "处理失败原因",
      prop: "errorMsg",
    },
  ],
  // 提交函数
  formAction: (data: PayCallbackRecordForm) => {
    if (data.id) {
      // 编辑
      return PayCallbackRecordAPI.update(data.id as number, data);
    } else {
      // 新增
      return PayCallbackRecordAPI.create(data);
    }
  },
});

// 编辑配置
const editModalConfig: IModalConfig<PayCallbackRecordForm> = reactive({
  permPrefix: "aioveuMallPayCallbackRecord:pay-callback-record",
  component: "drawer",
  drawer: {
    title: "编辑",
    size: 500,
  },
  pk: "id",
  formAction(data: any) {
    return PayCallbackRecordAPI.update(data.id as number, data);
  },
  formItems: addModalConfig.formItems, // 复用新增的表单项
});

// 处理操作按钮点击
const handleOperateClick = (data: IObject) => {
  if (data.name === "edit") {
    handleEditClick(data.row, async () => {
      return await PayCallbackRecordAPI.getFormData(data.row.id);
    });
  }
};

// 处理工具栏按钮点击（删除等）
const handleToolbarClick = async (name: string) => {
  console.log(name);
  if (name === "mockWxPay") {
    const paymentNo = await promptPaymentNo("微信支付");
    if (!paymentNo) return;

    await PayCallbackRecordAPI.mockWxPayNotify(paymentNo);
    ElMessage.success("模拟微信回调成功");
    handleQueryClick({}); // ✅ 刷新列表
  }

  if (name === "mockAliPay") {
    const paymentNo = await promptPaymentNo("支付宝支付");
    if (!paymentNo) return;

    await PayCallbackRecordAPI.mockAliPayNotify(paymentNo);
    ElMessage.success("模拟支付宝回调成功");
    handleQueryClick({}); // ✅ 刷新列表
  }
};

import { ElMessageBox } from "element-plus";

//三、弹窗输入支付单号（✅ 体验好）
const promptPaymentNo = async (label: string): Promise<string | null> => {
  const { value } = (await ElMessageBox.prompt(`请输入要模拟的支付单号`, `手动触发${label}回调`, {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    inputPlaceholder: "例如：P202602110001",
  })) as unknown as { value: string };
  return value || null;
};
</script>
