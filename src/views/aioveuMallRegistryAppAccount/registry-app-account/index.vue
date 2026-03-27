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
defineOptions({ name: "RegistryAppAccount" });

import RegistryAppAccountAPI,{ RegistryAppAccountForm, RegistryAppAccountPageQuery } from
    "@/api/aioveuMall/aioveuMallRegistry/aioveuMallRegistryAppAccount/registry-app-account";
// import type { RegistryAppAccountForm, RegistryAppAccountPageQuery } from "@/api/types";
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
  permPrefix: "aioveuMallRegistryAppAccount:registry-app-account",
  formItems: [
    {
      type: "input",
      label: "小程序AppID",
      prop: "appId",
      attrs: {
        placeholder: "小程序AppID",
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
      label: "小程序名称",
      prop: "accountName",
      attrs: {
        placeholder: "小程序名称",
        clearable: true,
        style: { width: "200px" },
      },
    },
    {
      type: "input",
      label: "账号类型：0-未注册，1-普通小程序，2-游戏小程序",
      prop: "accountType",
      attrs: {
        placeholder: "账号类型：0-未注册，1-普通小程序，2-游戏小程序",
        clearable: true,
        style: { width: "200px" },
      },
    },
    {
      type: "input",
      label: "注册邮箱",
      prop: "email",
      attrs: {
        placeholder: "注册邮箱",
        clearable: true,
        style: { width: "200px" },
      },
    },
  ],
});

// 列表配置
const contentConfig: IContentConfig<RegistryAppAccountPageQuery> = reactive({
  // 权限前缀
  permPrefix: "aioveuMallRegistryAppAccount:registry-app-account",
  table: {
    border: true,
    highlightCurrentRow: true,
  },
  // 主键
  pk: "id",
  // 列表查询接口
  indexAction: RegistryAppAccountAPI.getPage,
  // 删除接口
  deleteAction: RegistryAppAccountAPI.deleteByIds,
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
    { label: "", prop: "id" },
    { label: "小程序AppID", prop: "appId" },
    { label: "所属租户ID", prop: "tenantId" },
    { label: "小程序AppSecret", prop: "appSecret" },
    { label: "原始ID", prop: "originalId" },
    { label: "小程序名称", prop: "accountName" },
    { label: "账号类型：0-未注册，1-普通小程序，2-游戏小程序", prop: "accountType" },
    { label: "注册邮箱", prop: "email" },
    { label: "登录密码（加密存储）", prop: "password" },
    { label: "邮箱验证码", prop: "emailVerifyCode" },
    { label: "邮箱是否已验证：0-未验证，1-已验证", prop: "emailVerified" },
    { label: "注册状态：0-未开始，1-邮箱注册中，2-信息登记中，3-主体认证中，4-注册完成", prop: "registerStatus" },
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
const addModalConfig: IModalConfig<RegistryAppAccountForm> = reactive({
  // 权限前缀
  permPrefix: "aioveuMallRegistryAppAccount:registry-app-account",
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
        placeholder: ""
      },
      label: "",
      prop: "id",
    },
    {
      type: "input",
      attrs: {
        placeholder: "小程序AppID"
      },
      rules: [{ required: true, message: "小程序AppID不能为空", trigger: "blur" }],
      label: "小程序AppID",
      prop: "appId",
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
        placeholder: "小程序AppSecret"
      },
      label: "小程序AppSecret",
      prop: "appSecret",
    },
    {
      type: "input",
      attrs: {
        placeholder: "原始ID"
      },
      label: "原始ID",
      prop: "originalId",
    },
    {
      type: "input",
      attrs: {
        placeholder: "小程序名称"
      },
      rules: [{ required: true, message: "小程序名称不能为空", trigger: "blur" }],
      label: "小程序名称",
      prop: "accountName",
    },
    {
      type: "input",
      attrs: {
        placeholder: "账号类型：0-未注册，1-普通小程序，2-游戏小程序"
      },
      label: "账号类型：0-未注册，1-普通小程序，2-游戏小程序",
      prop: "accountType",
    },
    {
      type: "input",
      attrs: {
        placeholder: "注册邮箱"
      },
      rules: [{ required: true, message: "注册邮箱不能为空", trigger: "blur" }],
      label: "注册邮箱",
      prop: "email",
    },
    {
      type: "input",
      attrs: {
        placeholder: "登录密码（加密存储）"
      },
      label: "登录密码（加密存储）",
      prop: "password",
    },
    {
      type: "input",
      attrs: {
        placeholder: "邮箱验证码"
      },
      label: "邮箱验证码",
      prop: "emailVerifyCode",
    },
    {
      type: "input",
      attrs: {
        placeholder: "邮箱是否已验证：0-未验证，1-已验证"
      },
      label: "邮箱是否已验证：0-未验证，1-已验证",
      prop: "emailVerified",
    },
    {
      type: "input",
      attrs: {
        placeholder: "注册状态：0-未开始，1-邮箱注册中，2-信息登记中，3-主体认证中，4-注册完成"
      },
      rules: [{ required: true, message: "注册状态：0-未开始，1-邮箱注册中，2-信息登记中，3-主体认证中，4-注册完成不能为空", trigger: "blur" }],
      label: "注册状态：0-未开始，1-邮箱注册中，2-信息登记中，3-主体认证中，4-注册完成",
      prop: "registerStatus",
    },
  ],
  // 提交函数
  formAction: (data: RegistryAppAccountForm) => {
    if (data.id) {
      // 编辑
      return RegistryAppAccountAPI.update(data.id, data);
    } else {
      // 新增
      return RegistryAppAccountAPI.create(data);
    }
  },
});

// 编辑配置
const editModalConfig: IModalConfig<RegistryAppAccountForm> = reactive({
  permPrefix: "aioveuMallRegistryAppAccount:registry-app-account",
  component: "drawer",
  drawer: {
    title: "编辑",
    size: 500,
  },
  pk: "id",
  formAction(data: any) {
    return RegistryAppAccountAPI.update(data.id, data);
  },
  formItems: addModalConfig.formItems, // 复用新增的表单项
});

// 处理操作按钮点击
const handleOperateClick = (data: IObject) => {
  if (data.name === "edit") {
    handleEditClick(data.row, async () => {
      return await RegistryAppAccountAPI.getFormData(data.row.id);
    });
  }
};

// 处理工具栏按钮点击（删除等）
const handleToolbarClick = (name: string) => {
  console.log(name);
};

</script>
