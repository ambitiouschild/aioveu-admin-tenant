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
defineOptions({ name: "PayConfigAlipay" });

import PayConfigAlipayAPI ,{ PayConfigAlipayForm, PayConfigAlipayPageQuery }
  from "@/api/aioveuMall/aioveuMallPay/aioveuMallPayConfigAlipay/pay-config-alipay";
// import type { PayConfigAlipayForm, PayConfigAlipayPageQuery } from "@/api/types";
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
  permPrefix: "aioveuMallPayConfigAlipay:pay-config-alipay",
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
      label: "阿里应用ID",
      prop: "appId",
      attrs: {
        placeholder: "阿里应用ID",
        clearable: true,
        style: { width: "200px" },
      },
    },
    {
      type: "input",
      label: "支付宝公钥",
      prop: "alipayPublicKey",
      attrs: {
        placeholder: "支付宝公钥",
        clearable: true,
        style: { width: "200px" },
      },
    },
    {
      type: "input",
      label: "创建人ID",
      prop: "createBy",
      attrs: {
        placeholder: "创建人ID",
        clearable: true,
        style: { width: "200px" },
      },
    },
  ],
});

// 列表配置
const contentConfig: IContentConfig<PayConfigAlipayPageQuery> = reactive({
  // 权限前缀
  permPrefix: "aioveuMallPayConfigAlipay:pay-config-alipay",
  table: {
    border: true,
    highlightCurrentRow: true,
  },
  // 主键
  pk: "id",
  // 列表查询接口
  indexAction: PayConfigAlipayAPI.getPage,
  // 删除接口
  deleteAction: PayConfigAlipayAPI.deleteByIds,
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
    { label: "阿里应用ID", prop: "appId" },
    { label: "应用私钥", prop: "merchantPrivateKey" },
    { label: "支付宝公钥", prop: "alipayPublicKey" },
    { label: "支付宝根证书", prop: "alipayRootCert" },
    { label: "应用公钥证书", prop: "appCertPublicKey" },
    { label: "异步通知地址", prop: "notifyUrl" },
    { label: "同步通知地址", prop: "returnUrl" },
    { label: "AES加密密钥", prop: "encryptKey" },
    { label: "签名类型: RSA/RSA2", prop: "signType" },
    { label: "字符编码", prop: "charset" },
    { label: "数据格式", prop: "format" },
    { label: "网关地址", prop: "gatewayUrl" },
    { label: "沙箱网关地址", prop: "sandboxGatewayUrl" },
    { label: "是否沙箱环境: 0-否, 1-是", prop: "sandbox" },
    { label: "加密方式: AES", prop: "encryptType" },
    { label: "连接超时时间(秒)", prop: "connectTimeout" },
    { label: "读取超时时间(秒)", prop: "readTimeout" },
    { label: "代理主机", prop: "proxyHost" },
    { label: "代理端口", prop: "proxyPort" },
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
const addModalConfig: IModalConfig<PayConfigAlipayForm> = reactive({
  // 权限前缀
  permPrefix: "aioveuMallPayConfigAlipay:pay-config-alipay",
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
        placeholder: "阿里应用ID"
      },
      rules: [{ required: true, message: "阿里应用ID不能为空", trigger: "blur" }],
      label: "阿里应用ID",
      prop: "appId",
    },
    {
      type: "input",
      attrs: {
        placeholder: "应用私钥"
      },
      rules: [{ required: true, message: "应用私钥不能为空", trigger: "blur" }],
      label: "应用私钥",
      prop: "merchantPrivateKey",
    },
    {
      type: "input",
      attrs: {
        placeholder: "支付宝公钥"
      },
      rules: [{ required: true, message: "支付宝公钥不能为空", trigger: "blur" }],
      label: "支付宝公钥",
      prop: "alipayPublicKey",
    },
    {
      type: "input",
      attrs: {
        placeholder: "支付宝根证书"
      },
      label: "支付宝根证书",
      prop: "alipayRootCert",
    },
    {
      type: "input",
      attrs: {
        placeholder: "应用公钥证书"
      },
      label: "应用公钥证书",
      prop: "appCertPublicKey",
    },
    {
      type: "input",
      attrs: {
        placeholder: "异步通知地址"
      },
      label: "异步通知地址",
      prop: "notifyUrl",
    },
    {
      type: "input",
      attrs: {
        placeholder: "同步通知地址"
      },
      label: "同步通知地址",
      prop: "returnUrl",
    },
    {
      type: "input",
      attrs: {
        placeholder: "AES加密密钥"
      },
      label: "AES加密密钥",
      prop: "encryptKey",
    },
    {
      type: "input",
      attrs: {
        placeholder: "签名类型: RSA/RSA2"
      },
      label: "签名类型: RSA/RSA2",
      prop: "signType",
    },
    {
      type: "input",
      attrs: {
        placeholder: "字符编码"
      },
      label: "字符编码",
      prop: "charset",
    },
    {
      type: "input",
      attrs: {
        placeholder: "数据格式"
      },
      label: "数据格式",
      prop: "format",
    },
    {
      type: "input",
      attrs: {
        placeholder: "网关地址"
      },
      label: "网关地址",
      prop: "gatewayUrl",
    },
    {
      type: "input",
      attrs: {
        placeholder: "沙箱网关地址"
      },
      label: "沙箱网关地址",
      prop: "sandboxGatewayUrl",
    },
    {
      type: "input",
      attrs: {
        placeholder: "是否沙箱环境: 0-否, 1-是"
      },
      label: "是否沙箱环境: 0-否, 1-是",
      prop: "sandbox",
    },
    {
      type: "input",
      attrs: {
        placeholder: "加密方式: AES"
      },
      label: "加密方式: AES",
      prop: "encryptType",
    },
    {
      type: "input",
      attrs: {
        placeholder: "连接超时时间(秒)"
      },
      label: "连接超时时间(秒)",
      prop: "connectTimeout",
    },
    {
      type: "input",
      attrs: {
        placeholder: "读取超时时间(秒)"
      },
      label: "读取超时时间(秒)",
      prop: "readTimeout",
    },
    {
      type: "input",
      attrs: {
        placeholder: "代理主机"
      },
      label: "代理主机",
      prop: "proxyHost",
    },
    {
      type: "input",
      attrs: {
        placeholder: "代理端口"
      },
      label: "代理端口",
      prop: "proxyPort",
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
  formAction: (data: PayConfigAlipayForm) => {
    if (data.id) {
      // 编辑
      return PayConfigAlipayAPI.update(data.id , data);
    } else {
      // 新增
      return PayConfigAlipayAPI.create(data);
    }
  },
});

// 编辑配置
const editModalConfig: IModalConfig<PayConfigAlipayForm> = reactive({
  permPrefix: "aioveuMallPayConfigAlipay:pay-config-alipay",
  component: "drawer",
  drawer: {
    title: "编辑",
    size: 500,
  },
  pk: "id",
  formAction(data: any) {
    return PayConfigAlipayAPI.update(data.id , data);
  },
  formItems: addModalConfig.formItems, // 复用新增的表单项
});

// 处理操作按钮点击
const handleOperateClick = (data: IObject) => {
  if (data.name === "edit") {
    handleEditClick(data.row, async () => {
      return await PayConfigAlipayAPI.getFormData(data.row.id);
    });
  }
};

// 处理工具栏按钮点击（删除等）
const handleToolbarClick = (name: string) => {
  console.log(name);
};

</script>
