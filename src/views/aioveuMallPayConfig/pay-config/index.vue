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
defineOptions({ name: "PayConfig" });

import PayConfigAPI ,{ PayConfigForm, PayConfigPageQuery }
  from "@/api/aioveuMall/aioveuMallPay/aioveuMallPayConfig/pay-config";
// import type { PayConfigForm, PayConfigPageQuery } from "@/api/types";
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
  permPrefix: "aioveuMallPayConfig:pay-config",
  formItems: [
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
      label: "配置编码（唯一标识）",
      prop: "configCode",
      attrs: {
        placeholder: "配置编码（唯一标识）",
        clearable: true,
        style: { width: "200px" },
      },
    },
    {
      type: "input",
      label: "配置名称",
      prop: "configName",
      attrs: {
        placeholder: "配置名称",
        clearable: true,
        style: { width: "200px" },
      },
    },
    {
      type: "input",
      label: "支付平台类型: WECHAT-微信支付, ALIPAY-支付宝, DUMMY-模拟支付",
      prop: "platformType",
      attrs: {
        placeholder: "支付平台类型: WECHAT-微信支付, ALIPAY-支付宝, DUMMY-模拟支付",
        clearable: true,
        style: { width: "200px" },
      },
    },
    {
      type: "input",
      label: "支付类型: APP-APP支付, JSAPI-公众号支付, NATIVE-扫码支付, MWEB-H5支付, MINIPROGRAM-小程序支付, FACE-刷脸支付",
      prop: "payType",
      attrs: {
        placeholder: "支付类型: APP-APP支付, JSAPI-公众号支付, NATIVE-扫码支付, MWEB-H5支付, MINIPROGRAM-小程序支付, FACE-刷脸支付",
        clearable: true,
        style: { width: "200px" },
      },
    },
    {
      type: "input",
      label: "是否启用: 0-禁用, 1-启用",
      prop: "enabled",
      attrs: {
        placeholder: "是否启用: 0-禁用, 1-启用",
        clearable: true,
        style: { width: "200px" },
      },
    },
    {
      type: "input",
      label: "是否默认配置: 0-否, 1-是",
      prop: "isDefault",
      attrs: {
        placeholder: "是否默认配置: 0-否, 1-是",
        clearable: true,
        style: { width: "200px" },
      },
    },
  ],
});

// 列表配置
const contentConfig: IContentConfig<PayConfigPageQuery> = reactive({
  // 权限前缀
  permPrefix: "aioveuMallPayConfig:pay-config",
  table: {
    border: true,
    highlightCurrentRow: true,
  },
  // 主键
  pk: "id",
  // 列表查询接口
  indexAction: PayConfigAPI.getPage,
  // 删除接口
  deleteAction: PayConfigAPI.deleteByIds,
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
    { label: "租户ID", prop: "tenantId" },
    { label: "配置编码（唯一标识）", prop: "configCode" },
    { label: "配置名称", prop: "configName" },
    { label: "支付平台类型: WECHAT-微信支付, ALIPAY-支付宝, DUMMY-模拟支付", prop: "platformType" },
    { label: "支付类型: APP-APP支付, JSAPI-公众号支付, NATIVE-扫码支付, MWEB-H5支付, MINIPROGRAM-小程序支付, FACE-刷脸支付", prop: "payType" },
    { label: "是否启用: 0-禁用, 1-启用", prop: "enabled" },
    { label: "是否默认配置: 0-否, 1-是", prop: "isDefault" },
    { label: "排序", prop: "sort" },
    { label: "备注", prop: "remark" },
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
const addModalConfig: IModalConfig<PayConfigForm> = reactive({
  // 权限前缀
  permPrefix: "aioveuMallPayConfig:pay-config",
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
        placeholder: "租户ID"
      },
      rules: [{ required: true, message: "租户ID不能为空", trigger: "blur" }],
      label: "租户ID",
      prop: "tenantId",
    },
    {
      type: "input",
      attrs: {
        placeholder: "配置编码（唯一标识）"
      },
      rules: [{ required: true, message: "配置编码（唯一标识）不能为空", trigger: "blur" }],
      label: "配置编码（唯一标识）",
      prop: "configCode",
    },
    {
      type: "input",
      attrs: {
        placeholder: "配置名称"
      },
      label: "配置名称",
      prop: "configName",
    },
    {
      type: "input",
      attrs: {
        placeholder: "支付平台类型: WECHAT-微信支付, ALIPAY-支付宝, DUMMY-模拟支付"
      },
      rules: [{ required: true, message: "支付平台类型: WECHAT-微信支付, ALIPAY-支付宝, DUMMY-模拟支付不能为空", trigger: "blur" }],
      label: "支付平台类型: WECHAT-微信支付, ALIPAY-支付宝, DUMMY-模拟支付",
      prop: "platformType",
    },
    {
      type: "input",
      attrs: {
        placeholder: "支付类型: APP-APP支付, JSAPI-公众号支付, NATIVE-扫码支付, MWEB-H5支付, MINIPROGRAM-小程序支付, FACE-刷脸支付"
      },
      rules: [{ required: true, message: "支付类型: APP-APP支付, JSAPI-公众号支付, NATIVE-扫码支付, MWEB-H5支付, MINIPROGRAM-小程序支付, FACE-刷脸支付不能为空", trigger: "blur" }],
      label: "支付类型: APP-APP支付, JSAPI-公众号支付, NATIVE-扫码支付, MWEB-H5支付, MINIPROGRAM-小程序支付, FACE-刷脸支付",
      prop: "payType",
    },
    {
      type: "input",
      attrs: {
        placeholder: "是否启用: 0-禁用, 1-启用"
      },
      rules: [{ required: true, message: "是否启用: 0-禁用, 1-启用不能为空", trigger: "blur" }],
      label: "是否启用: 0-禁用, 1-启用",
      prop: "enabled",
    },
    {
      type: "input",
      attrs: {
        placeholder: "是否默认配置: 0-否, 1-是"
      },
      rules: [{ required: true, message: "是否默认配置: 0-否, 1-是不能为空", trigger: "blur" }],
      label: "是否默认配置: 0-否, 1-是",
      prop: "isDefault",
    },
    {
      type: "input",
      attrs: {
        placeholder: "排序"
      },
      rules: [{ required: true, message: "排序不能为空", trigger: "blur" }],
      label: "排序",
      prop: "sort",
    },
    {
      type: "input",
      attrs: {
        placeholder: "备注"
      },
      label: "备注",
      prop: "remark",
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
  formAction: (data: PayConfigForm) => {
    if (data.id) {
      // 编辑
      return PayConfigAPI.update(data.id , data);
    } else {
      // 新增
      return PayConfigAPI.create(data);
    }
  },
});

// 编辑配置
const editModalConfig: IModalConfig<PayConfigForm> = reactive({
  permPrefix: "aioveuMallPayConfig:pay-config",
  component: "drawer",
  drawer: {
    title: "编辑",
    size: 500,
  },
  pk: "id",
  formAction(data: any) {
    return PayConfigAPI.update(data.id , data);
  },
  formItems: addModalConfig.formItems, // 复用新增的表单项
});

// 处理操作按钮点击
const handleOperateClick = (data: IObject) => {
  if (data.name === "edit") {
    handleEditClick(data.row, async () => {
      return await PayConfigAPI.getFormData(data.row.id);
    });
  }
};

// 处理工具栏按钮点击（删除等）
const handleToolbarClick = (name: string) => {
  console.log(name);
};

</script>
