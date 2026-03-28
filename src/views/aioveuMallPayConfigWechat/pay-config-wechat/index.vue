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
defineOptions({ name: "PayConfigWechat" });

import PayConfigWechatAPI ,{ PayConfigWechatForm, PayConfigWechatPageQuery }
  from "@/api/aioveuMall/aioveuMallPay/aioveuMallPayConfigWechat/pay-config-wechat";
// import type { PayConfigWechatForm, PayConfigWechatPageQuery } from "@/api/types";
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
  permPrefix: "aioveuMallPayConfigWechat:pay-config-wechat",
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
      label: "租户ID",
      prop: "tenantId",
      attrs: {
        placeholder: "租户ID",
        clearable: true,
        style: { width: "200px" },
      },
    },
    {
      type: "input",
      label: "微信应用ID(公众号/小程序/APP等)",
      prop: "appId",
      attrs: {
        placeholder: "微信应用ID(公众号/小程序/APP等)",
        clearable: true,
        style: { width: "200px" },
      },
    },
    {
      type: "input",
      label: "微信商户号(10位数字)",
      prop: "mchId",
      attrs: {
        placeholder: "微信商户号(10位数字)",
        clearable: true,
        style: { width: "200px" },
      },
    },
    {
      type: "input",
      label: "商户证书序列号",
      prop: "mchSerialNo",
      attrs: {
        placeholder: "商户证书序列号",
        clearable: true,
        style: { width: "200px" },
      },
    },
    {
      type: "input",
      label: "微信支付公钥ID",
      prop: "wechatpayPublicKeyId",
      attrs: {
        placeholder: "微信支付公钥ID",
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
const contentConfig: IContentConfig<PayConfigWechatPageQuery> = reactive({
  // 权限前缀
  permPrefix: "aioveuMallPayConfigWechat:pay-config-wechat",
  table: {
    border: true,
    highlightCurrentRow: true,
  },
  // 主键
  pk: "id",
  // 列表查询接口
  indexAction: PayConfigWechatAPI.getPage,
  // 删除接口
  deleteAction: PayConfigWechatAPI.deleteByIds,
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
    { label: "租户ID", prop: "tenantId" },
    { label: "微信应用ID(公众号/小程序/APP等)", prop: "appId" },
    { label: "微信商户号(10位数字)", prop: "mchId" },
    { label: "商户API密钥V2", prop: "mchKey" },
    { label: "APIv3密钥(32位字符)", prop: "apiV3Key" },
    { label: "商户证书序列号", prop: "mchSerialNo" },
    { label: "商户私钥内容(PKCS#8格式)", prop: "privateKey" },
    { label: "商户私钥文件路径", prop: "privateKeyPath" },
    { label: "微信支付公钥ID", prop: "wechatpayPublicKeyId" },
    { label: "微信支付公钥内容", prop: "wechatpayPublicKey" },
    { label: "微信支付公钥文件路径", prop: "wechatpayPublicKeyPath" },
    { label: "平台证书序列号", prop: "platformCertSerialNo" },
    { label: "平台证书文件路径", prop: "platformCertPath" },
    { label: "网关地址", prop: "apiDomain" },
    { label: "连接超时时间(秒)", prop: "connectTimeout" },
    { label: "读取超时时间(秒)", prop: "readTimeout" },
    { label: "支付异步通知地址", prop: "notifyUrl" },
    { label: "退款异步通知地址", prop: "refundNotifyUrl" },
    { label: "是否沙箱环境: 0-否, 1-是", prop: "sandbox" },
    { label: "签名类型: RSA, HMAC-SHA256", prop: "signType" },
    { label: "证书存储方式: FILE-文件, STRING-字符串, CLOUD-云存储", prop: "certStoreType" },
    { label: "是否自动下载平台证书: 0-否, 1-是", prop: "autoDownloadCert" },
    { label: "子商户应用ID", prop: "subAppId" },
    { label: "子商户号", prop: "subMchId" },
    { label: "是否支持分账: 0-否, 1-是", prop: "profitSharing" },
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
const addModalConfig: IModalConfig<PayConfigWechatForm> = reactive({
  // 权限前缀
  permPrefix: "aioveuMallPayConfigWechat:pay-config-wechat",
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
        placeholder: "租户ID"
      },
      rules: [{ required: true, message: "租户ID不能为空", trigger: "blur" }],
      label: "租户ID",
      prop: "tenantId",
    },
    {
      type: "input",
      attrs: {
        placeholder: "微信应用ID(公众号/小程序/APP等)"
      },
      rules: [{ required: true, message: "微信应用ID(公众号/小程序/APP等)不能为空", trigger: "blur" }],
      label: "微信应用ID(公众号/小程序/APP等)",
      prop: "appId",
    },
    {
      type: "input",
      attrs: {
        placeholder: "微信商户号(10位数字)"
      },
      rules: [{ required: true, message: "微信商户号(10位数字)不能为空", trigger: "blur" }],
      label: "微信商户号(10位数字)",
      prop: "mchId",
    },
    {
      type: "input",
      attrs: {
        placeholder: "商户API密钥V2"
      },
      label: "商户API密钥V2",
      prop: "mchKey",
    },
    {
      type: "input",
      attrs: {
        placeholder: "APIv3密钥(32位字符)"
      },
      rules: [{ required: true, message: "APIv3密钥(32位字符)不能为空", trigger: "blur" }],
      label: "APIv3密钥(32位字符)",
      prop: "apiV3Key",
    },
    {
      type: "input",
      attrs: {
        placeholder: "商户证书序列号"
      },
      label: "商户证书序列号",
      prop: "mchSerialNo",
    },
    {
      type: "input",
      attrs: {
        placeholder: "商户私钥内容(PKCS#8格式)"
      },
      label: "商户私钥内容(PKCS#8格式)",
      prop: "privateKey",
    },
    {
      type: "input",
      attrs: {
        placeholder: "商户私钥文件路径"
      },
      label: "商户私钥文件路径",
      prop: "privateKeyPath",
    },
    {
      type: "input",
      attrs: {
        placeholder: "微信支付公钥ID"
      },
      rules: [{ required: true, message: "微信支付公钥ID不能为空", trigger: "blur" }],
      label: "微信支付公钥ID",
      prop: "wechatpayPublicKeyId",
    },
    {
      type: "input",
      attrs: {
        placeholder: "微信支付公钥内容"
      },
      rules: [{ required: true, message: "微信支付公钥内容不能为空", trigger: "blur" }],
      label: "微信支付公钥内容",
      prop: "wechatpayPublicKey",
    },
    {
      type: "input",
      attrs: {
        placeholder: "微信支付公钥文件路径"
      },
      label: "微信支付公钥文件路径",
      prop: "wechatpayPublicKeyPath",
    },
    {
      type: "input",
      attrs: {
        placeholder: "平台证书序列号"
      },
      label: "平台证书序列号",
      prop: "platformCertSerialNo",
    },
    {
      type: "input",
      attrs: {
        placeholder: "平台证书文件路径"
      },
      label: "平台证书文件路径",
      prop: "platformCertPath",
    },
    {
      type: "input",
      attrs: {
        placeholder: "网关地址"
      },
      label: "网关地址",
      prop: "apiDomain",
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
        placeholder: "支付异步通知地址"
      },
      label: "支付异步通知地址",
      prop: "notifyUrl",
    },
    {
      type: "input",
      attrs: {
        placeholder: "退款异步通知地址"
      },
      label: "退款异步通知地址",
      prop: "refundNotifyUrl",
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
        placeholder: "签名类型: RSA, HMAC-SHA256"
      },
      label: "签名类型: RSA, HMAC-SHA256",
      prop: "signType",
    },
    {
      type: "input",
      attrs: {
        placeholder: "证书存储方式: FILE-文件, STRING-字符串, CLOUD-云存储"
      },
      label: "证书存储方式: FILE-文件, STRING-字符串, CLOUD-云存储",
      prop: "certStoreType",
    },
    {
      type: "input",
      attrs: {
        placeholder: "是否自动下载平台证书: 0-否, 1-是"
      },
      label: "是否自动下载平台证书: 0-否, 1-是",
      prop: "autoDownloadCert",
    },
    {
      type: "input",
      attrs: {
        placeholder: "子商户应用ID"
      },
      label: "子商户应用ID",
      prop: "subAppId",
    },
    {
      type: "input",
      attrs: {
        placeholder: "子商户号"
      },
      label: "子商户号",
      prop: "subMchId",
    },
    {
      type: "input",
      attrs: {
        placeholder: "是否支持分账: 0-否, 1-是"
      },
      label: "是否支持分账: 0-否, 1-是",
      prop: "profitSharing",
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
  formAction: (data: PayConfigWechatForm) => {
    if (data.id) {
      // 编辑
      return PayConfigWechatAPI.update(data.id , data);
    } else {
      // 新增
      return PayConfigWechatAPI.create(data);
    }
  },
});

// 编辑配置
const editModalConfig: IModalConfig<PayConfigWechatForm> = reactive({
  permPrefix: "aioveuMallPayConfigWechat:pay-config-wechat",
  component: "drawer",
  drawer: {
    title: "编辑",
    size: 500,
  },
  pk: "id",
  formAction(data: any) {
    return PayConfigWechatAPI.update(data.id , data);
  },
  formItems: addModalConfig.formItems, // 复用新增的表单项
});

// 处理操作按钮点击
const handleOperateClick = (data: IObject) => {
  if (data.name === "edit") {
    handleEditClick(data.row, async () => {
      return await PayConfigWechatAPI.getFormData(data.row.id);
    });
  }
};

// 处理工具栏按钮点击（删除等）
const handleToolbarClick = (name: string) => {
  console.log(name);
};

</script>
