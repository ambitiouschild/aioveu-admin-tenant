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
defineOptions({ name: "Oauth2RegisteredClient" });

import Oauth2RegisteredClientAPI , { Oauth2RegisteredClientForm, Oauth2RegisteredClientPageQuery }
  from "@/api/aioveuMall/aioveuMallAuth/aioveuMallAuthOauth2RegisteredClient/oauth2-registered-client";
// import type { Oauth2RegisteredClientForm, Oauth2RegisteredClientPageQuery } from "@/api/types";
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
  permPrefix: "aioveuMallAuthOauth2RegisteredClient:oauth2-registered-client",
  formItems: [
    {
      type: "input",
      label: "客户端记录的唯一标识符，通常是UUID",
      prop: "id",
      attrs: {
        placeholder: "客户端记录的唯一标识符，通常是UUID",
        clearable: true,
        style: { width: "200px" },
      },
    },
    {
      type: "input",
      label: "客户端标识符，OAuth2请求中使用的client_id",
      prop: "clientId",
      attrs: {
        placeholder: "客户端标识符，OAuth2请求中使用的client_id",
        clearable: true,
        style: { width: "200px" },
      },
    },
    {
      type: "input",
      label: "客户端ID的创建时间",
      prop: "clientIdIssuedAt",
      attrs: {
        placeholder: "客户端ID的创建时间",
        clearable: true,
        style: { width: "200px" },
      },
    },
    {
      type: "input",
      label: "客户端显示名称，用于用户界面显示",
      prop: "clientName",
      attrs: {
        placeholder: "客户端显示名称，用于用户界面显示",
        clearable: true,
        style: { width: "200px" },
      },
    },
    {
      type: "input",
      label: "支持的授权类型，JSON格式数组。",
      prop: "authorizationGrantTypes",
      attrs: {
        placeholder: "支持的授权类型，JSON格式数组。",
        clearable: true,
        style: { width: "200px" },
      },
    },
    {
      type: "input",
      label: "客户端可请求的范围列表，JSON格式数组。",
      prop: "scopes",
      attrs: {
        placeholder: "客户端可请求的范围列表，JSON格式数组。",
        clearable: true,
        style: { width: "200px" },
      },
    },
  ],
});

// 列表配置
const contentConfig: IContentConfig<Oauth2RegisteredClientPageQuery> = reactive({
  // 权限前缀
  permPrefix: "aioveuMallAuthOauth2RegisteredClient:oauth2-registered-client",
  table: {
    border: true,
    highlightCurrentRow: true,
  },
  // 主键
  pk: "id",
  // 列表查询接口
  indexAction: Oauth2RegisteredClientAPI.getPage,
  // 删除接口
  deleteAction: Oauth2RegisteredClientAPI.deleteByIds,
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
    { label: "客户端记录的唯一标识符，通常是UUID", prop: "id" },
    { label: "客户端标识符，OAuth2请求中使用的client_id", prop: "clientId" },
    { label: "客户端ID的创建时间", prop: "clientIdIssuedAt" },
    { label: "客户端密钥，已加密存储。公共客户端可为NULL", prop: "clientSecret" },
    { label: "客户端密钥的过期时间，NULL表示永不过期", prop: "clientSecretExpiresAt" },
    { label: "客户端显示名称，用于用户界面显示", prop: "clientName" },
    { label: "支持的客户端认证方法，JSON格式数组。", prop: "clientAuthenticationMethods" },
    { label: "支持的授权类型，JSON格式数组。", prop: "authorizationGrantTypes" },
    { label: "允许的重定向URI列表，JSON格式数组。必须与授权请求中的redirect_uri完全匹配", prop: "redirectUris" },
    { label: "登出后的重定向URI列表，JSON格式数组", prop: "postLogoutRedirectUris" },
    { label: "客户端可请求的范围列表，JSON格式数组。", prop: "scopes" },
    { label: "客户端设置，JSON格式。包含requireAuthorizationConsent、requireProofKey等配置", prop: "clientSettings" },
    { label: "令牌设置，JSON格式。包含accessTokenTimeToLive、refreshTokenTimeToLive等配置", prop: "tokenSettings" },
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
const addModalConfig: IModalConfig<Oauth2RegisteredClientForm> = reactive({
  // 权限前缀
  permPrefix: "aioveuMallAuthOauth2RegisteredClient:oauth2-registered-client",
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
        placeholder: "客户端记录的唯一标识符，通常是UUID"
      },
      label: "客户端记录的唯一标识符，通常是UUID",
      prop: "id",
    },
    {
      type: "input",
      attrs: {
        placeholder: "客户端标识符，OAuth2请求中使用的client_id"
      },
      rules: [{ required: true, message: "客户端标识符，OAuth2请求中使用的client_id不能为空", trigger: "blur" }],
      label: "客户端标识符，OAuth2请求中使用的client_id",
      prop: "clientId",
    },
    {
      type: "input",
      attrs: {
        placeholder: "客户端ID的创建时间"
      },
      rules: [{ required: true, message: "客户端ID的创建时间不能为空", trigger: "blur" }],
      label: "客户端ID的创建时间",
      prop: "clientIdIssuedAt",
    },
    {
      type: "input",
      attrs: {
        placeholder: "客户端密钥，已加密存储。公共客户端可为NULL"
      },
      label: "客户端密钥，已加密存储。公共客户端可为NULL",
      prop: "clientSecret",
    },
    {
      type: "input",
      attrs: {
        placeholder: "客户端密钥的过期时间，NULL表示永不过期"
      },
      label: "客户端密钥的过期时间，NULL表示永不过期",
      prop: "clientSecretExpiresAt",
    },
    {
      type: "input",
      attrs: {
        placeholder: "客户端显示名称，用于用户界面显示"
      },
      rules: [{ required: true, message: "客户端显示名称，用于用户界面显示不能为空", trigger: "blur" }],
      label: "客户端显示名称，用于用户界面显示",
      prop: "clientName",
    },
    {
      type: "input",
      attrs: {
        placeholder: "支持的客户端认证方法，JSON格式数组。"
      },
      label: "支持的客户端认证方法，JSON格式数组。",
      prop: "clientAuthenticationMethods",
    },
    {
      type: "input",
      attrs: {
        placeholder: "支持的授权类型，JSON格式数组。"
      },
      label: "支持的授权类型，JSON格式数组。",
      prop: "authorizationGrantTypes",
    },
    {
      type: "input",
      attrs: {
        placeholder: "允许的重定向URI列表，JSON格式数组。必须与授权请求中的redirect_uri完全匹配"
      },
      label: "允许的重定向URI列表，JSON格式数组。必须与授权请求中的redirect_uri完全匹配",
      prop: "redirectUris",
    },
    {
      type: "input",
      attrs: {
        placeholder: "登出后的重定向URI列表，JSON格式数组"
      },
      label: "登出后的重定向URI列表，JSON格式数组",
      prop: "postLogoutRedirectUris",
    },
    {
      type: "input",
      attrs: {
        placeholder: "客户端可请求的范围列表，JSON格式数组。"
      },
      label: "客户端可请求的范围列表，JSON格式数组。",
      prop: "scopes",
    },
    {
      type: "input",
      attrs: {
        placeholder: "客户端设置，JSON格式。包含requireAuthorizationConsent、requireProofKey等配置"
      },
      label: "客户端设置，JSON格式。包含requireAuthorizationConsent、requireProofKey等配置",
      prop: "clientSettings",
    },
    {
      type: "input",
      attrs: {
        placeholder: "令牌设置，JSON格式。包含accessTokenTimeToLive、refreshTokenTimeToLive等配置"
      },
      label: "令牌设置，JSON格式。包含accessTokenTimeToLive、refreshTokenTimeToLive等配置",
      prop: "tokenSettings",
    },
  ],
  // 提交函数
  formAction: (data: Oauth2RegisteredClientForm) => {
    if (data.id) {
      // 编辑
      return Oauth2RegisteredClientAPI.update(data.id as string, data);
    } else {
      // 新增
      return Oauth2RegisteredClientAPI.create(data);
    }
  },
});

// 编辑配置
const editModalConfig: IModalConfig<Oauth2RegisteredClientForm> = reactive({
  permPrefix: "aioveuMallAuthOauth2RegisteredClient:oauth2-registered-client",
  component: "drawer",
  drawer: {
    title: "编辑",
    size: 500,
  },
  pk: "id",
  formAction(data: any) {
    return Oauth2RegisteredClientAPI.update(data.id as string, data);
  },
  formItems: addModalConfig.formItems, // 复用新增的表单项
});

// 处理操作按钮点击
const handleOperateClick = (data: IObject) => {
  if (data.name === "edit") {
    handleEditClick(data.row, async () => {
      return await Oauth2RegisteredClientAPI.getFormData(data.row.id);
    });
  }
};

// 处理工具栏按钮点击（删除等）
const handleToolbarClick = (name: string) => {
  console.log(name);
};

</script>
