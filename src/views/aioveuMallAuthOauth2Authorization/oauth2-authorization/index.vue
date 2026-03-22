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
defineOptions({ name: "Oauth2Authorization" });

import Oauth2AuthorizationAPI ,{ Oauth2AuthorizationForm, Oauth2AuthorizationPageQuery }
  from "@/api/aioveuMall/aioveuMallAuth/aioveuMallAuthOauth2Authorization/oauth2-authorization";
// import type { Oauth2AuthorizationForm, Oauth2AuthorizationPageQuery } from "@/api/types";
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
  permPrefix: "aioveuMallAuthOauth2Authorization:oauth2-authorization",
  formItems: [
    {
      type: "input",
      label: "授权记录的唯一标识符，通常是UUID",
      prop: "id",
      attrs: {
        placeholder: "授权记录的唯一标识符，通常是UUID",
        clearable: true,
        style: { width: "200px" },
      },
    },
    {
      type: "input",
      label: "关联的注册客户端ID，指向oauth2_registered_client表",
      prop: "registeredClientId",
      attrs: {
        placeholder: "关联的注册客户端ID，指向oauth2_registered_client表",
        clearable: true,
        style: { width: "200px" },
      },
    },
    {
      type: "input",
      label: "用户主体名称，通常是用户名或用户标识",
      prop: "principalName",
      attrs: {
        placeholder: "用户主体名称，通常是用户名或用户标识",
        clearable: true,
        style: { width: "200px" },
      },
    },
    {
      type: "input",
      label: "授权类型，如authorization_code、password、client_credentials、refresh_token等",
      prop: "authorizationGrantType",
      attrs: {
        placeholder: "授权类型，如authorization_code、password、client_credentials、refresh_token等",
        clearable: true,
        style: { width: "200px" },
      },
    },
  ],
});

// 列表配置
const contentConfig: IContentConfig<Oauth2AuthorizationPageQuery> = reactive({
  // 权限前缀
  permPrefix: "aioveuMallAuthOauth2Authorization:oauth2-authorization",
  table: {
    border: true,
    highlightCurrentRow: true,
  },
  // 主键
  pk: "id",
  // 列表查询接口
  indexAction: Oauth2AuthorizationAPI.getPage,
  // 删除接口
  deleteAction: Oauth2AuthorizationAPI.deleteByIds,
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
    { label: "授权记录的唯一标识符，通常是UUID", prop: "id" },
    { label: "关联的注册客户端ID，指向oauth2_registered_client表", prop: "registeredClientId" },
    { label: "用户主体名称，通常是用户名或用户标识", prop: "principalName" },
    { label: "授权类型，如authorization_code、password、client_credentials、refresh_token等", prop: "authorizationGrantType" },
    { label: "授权的范围列表，以空格分隔的scope字符串", prop: "authorizedScopes" },
    { label: "扩展属性，存储认证过程中的额外信息，序列化为JSON格式", prop: "attributes" },
    { label: "OAuth2授权码流程中的state参数，用于防止CSRF攻击", prop: "state" },
    { label: "授权码的值，加密存储", prop: "authorizationCodeValue" },
    { label: "授权码颁发时间", prop: "authorizationCodeIssuedAt" },
    { label: "授权码过期时间（通常很短，如5分钟）", prop: "authorizationCodeExpiresAt" },
    { label: "授权码的元数据", prop: "authorizationCodeMetadata" },
    { label: "访问令牌的值，JWT或opaque token格式", prop: "accessTokenValue" },
    { label: "访问令牌颁发时间", prop: "accessTokenIssuedAt" },
    { label: "访问令牌过期时间", prop: "accessTokenExpiresAt" },
    { label: "访问令牌的元数据", prop: "accessTokenMetadata" },
    { label: "访问令牌类型，通常是Bearer", prop: "accessTokenType" },
    { label: "访问令牌关联的scope", prop: "accessTokenScopes" },
    { label: "OpenID Connect ID令牌的值", prop: "oidcIdTokenValue" },
    { label: "ID令牌颁发时间", prop: "oidcIdTokenIssuedAt" },
    { label: "ID令牌过期时间", prop: "oidcIdTokenExpiresAt" },
    { label: "ID令牌的元数据", prop: "oidcIdTokenMetadata" },
    { label: "刷新令牌的值", prop: "refreshTokenValue" },
    { label: "刷新令牌颁发时间", prop: "refreshTokenIssuedAt" },
    { label: "刷新令牌过期时间（通常较长，如30天）", prop: "refreshTokenExpiresAt" },
    { label: "刷新令牌的元数据", prop: "refreshTokenMetadata" },
    { label: "设备授权流程中的用户码", prop: "userCodeValue" },
    { label: "用户码颁发时间", prop: "userCodeIssuedAt" },
    { label: "用户码过期时间", prop: "userCodeExpiresAt" },
    { label: "用户码的元数据", prop: "userCodeMetadata" },
    { label: "设备授权流程中的设备码", prop: "deviceCodeValue" },
    { label: "设备码颁发时间", prop: "deviceCodeIssuedAt" },
    { label: "设备码过期时间", prop: "deviceCodeExpiresAt" },
    { label: "设备码的元数据", prop: "deviceCodeMetadata" },
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
const addModalConfig: IModalConfig<Oauth2AuthorizationForm> = reactive({
  // 权限前缀
  permPrefix: "aioveuMallAuthOauth2Authorization:oauth2-authorization",
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
        placeholder: "授权记录的唯一标识符，通常是UUID"
      },
      label: "授权记录的唯一标识符，通常是UUID",
      prop: "id",
    },
    {
      type: "input",
      attrs: {
        placeholder: "关联的注册客户端ID，指向oauth2_registered_client表"
      },
      rules: [{ required: true, message: "关联的注册客户端ID，指向oauth2_registered_client表不能为空", trigger: "blur" }],
      label: "关联的注册客户端ID，指向oauth2_registered_client表",
      prop: "registeredClientId",
    },
    {
      type: "input",
      attrs: {
        placeholder: "用户主体名称，通常是用户名或用户标识"
      },
      rules: [{ required: true, message: "用户主体名称，通常是用户名或用户标识不能为空", trigger: "blur" }],
      label: "用户主体名称，通常是用户名或用户标识",
      prop: "principalName",
    },
    {
      type: "input",
      attrs: {
        placeholder: "授权类型，如authorization_code、password、client_credentials、refresh_token等"
      },
      rules: [{ required: true, message: "授权类型，如authorization_code、password、client_credentials、refresh_token等不能为空", trigger: "blur" }],
      label: "授权类型，如authorization_code、password、client_credentials、refresh_token等",
      prop: "authorizationGrantType",
    },
    {
      type: "input",
      attrs: {
        placeholder: "授权的范围列表，以空格分隔的scope字符串"
      },
      label: "授权的范围列表，以空格分隔的scope字符串",
      prop: "authorizedScopes",
    },
    {
      type: "input",
      attrs: {
        placeholder: "扩展属性，存储认证过程中的额外信息，序列化为JSON格式"
      },
      label: "扩展属性，存储认证过程中的额外信息，序列化为JSON格式",
      prop: "attributes",
    },
    {
      type: "input",
      attrs: {
        placeholder: "OAuth2授权码流程中的state参数，用于防止CSRF攻击"
      },
      label: "OAuth2授权码流程中的state参数，用于防止CSRF攻击",
      prop: "state",
    },
    {
      type: "input",
      attrs: {
        placeholder: "授权码的值，加密存储"
      },
      label: "授权码的值，加密存储",
      prop: "authorizationCodeValue",
    },
    {
      type: "input",
      attrs: {
        placeholder: "授权码颁发时间"
      },
      label: "授权码颁发时间",
      prop: "authorizationCodeIssuedAt",
    },
    {
      type: "input",
      attrs: {
        placeholder: "授权码过期时间（通常很短，如5分钟）"
      },
      label: "授权码过期时间（通常很短，如5分钟）",
      prop: "authorizationCodeExpiresAt",
    },
    {
      type: "input",
      attrs: {
        placeholder: "授权码的元数据"
      },
      label: "授权码的元数据",
      prop: "authorizationCodeMetadata",
    },
    {
      type: "input",
      attrs: {
        placeholder: "访问令牌的值，JWT或opaque token格式"
      },
      label: "访问令牌的值，JWT或opaque token格式",
      prop: "accessTokenValue",
    },
    {
      type: "input",
      attrs: {
        placeholder: "访问令牌颁发时间"
      },
      label: "访问令牌颁发时间",
      prop: "accessTokenIssuedAt",
    },
    {
      type: "input",
      attrs: {
        placeholder: "访问令牌过期时间"
      },
      label: "访问令牌过期时间",
      prop: "accessTokenExpiresAt",
    },
    {
      type: "input",
      attrs: {
        placeholder: "访问令牌的元数据"
      },
      label: "访问令牌的元数据",
      prop: "accessTokenMetadata",
    },
    {
      type: "input",
      attrs: {
        placeholder: "访问令牌类型，通常是Bearer"
      },
      label: "访问令牌类型，通常是Bearer",
      prop: "accessTokenType",
    },
    {
      type: "input",
      attrs: {
        placeholder: "访问令牌关联的scope"
      },
      label: "访问令牌关联的scope",
      prop: "accessTokenScopes",
    },
    {
      type: "input",
      attrs: {
        placeholder: "OpenID Connect ID令牌的值"
      },
      label: "OpenID Connect ID令牌的值",
      prop: "oidcIdTokenValue",
    },
    {
      type: "input",
      attrs: {
        placeholder: "ID令牌颁发时间"
      },
      label: "ID令牌颁发时间",
      prop: "oidcIdTokenIssuedAt",
    },
    {
      type: "input",
      attrs: {
        placeholder: "ID令牌过期时间"
      },
      label: "ID令牌过期时间",
      prop: "oidcIdTokenExpiresAt",
    },
    {
      type: "input",
      attrs: {
        placeholder: "ID令牌的元数据"
      },
      label: "ID令牌的元数据",
      prop: "oidcIdTokenMetadata",
    },
    {
      type: "input",
      attrs: {
        placeholder: "刷新令牌的值"
      },
      label: "刷新令牌的值",
      prop: "refreshTokenValue",
    },
    {
      type: "input",
      attrs: {
        placeholder: "刷新令牌颁发时间"
      },
      label: "刷新令牌颁发时间",
      prop: "refreshTokenIssuedAt",
    },
    {
      type: "input",
      attrs: {
        placeholder: "刷新令牌过期时间（通常较长，如30天）"
      },
      label: "刷新令牌过期时间（通常较长，如30天）",
      prop: "refreshTokenExpiresAt",
    },
    {
      type: "input",
      attrs: {
        placeholder: "刷新令牌的元数据"
      },
      label: "刷新令牌的元数据",
      prop: "refreshTokenMetadata",
    },
    {
      type: "input",
      attrs: {
        placeholder: "设备授权流程中的用户码"
      },
      label: "设备授权流程中的用户码",
      prop: "userCodeValue",
    },
    {
      type: "input",
      attrs: {
        placeholder: "用户码颁发时间"
      },
      label: "用户码颁发时间",
      prop: "userCodeIssuedAt",
    },
    {
      type: "input",
      attrs: {
        placeholder: "用户码过期时间"
      },
      label: "用户码过期时间",
      prop: "userCodeExpiresAt",
    },
    {
      type: "input",
      attrs: {
        placeholder: "用户码的元数据"
      },
      label: "用户码的元数据",
      prop: "userCodeMetadata",
    },
    {
      type: "input",
      attrs: {
        placeholder: "设备授权流程中的设备码"
      },
      label: "设备授权流程中的设备码",
      prop: "deviceCodeValue",
    },
    {
      type: "input",
      attrs: {
        placeholder: "设备码颁发时间"
      },
      label: "设备码颁发时间",
      prop: "deviceCodeIssuedAt",
    },
    {
      type: "input",
      attrs: {
        placeholder: "设备码过期时间"
      },
      label: "设备码过期时间",
      prop: "deviceCodeExpiresAt",
    },
    {
      type: "input",
      attrs: {
        placeholder: "设备码的元数据"
      },
      label: "设备码的元数据",
      prop: "deviceCodeMetadata",
    },
  ],
  // 提交函数
  formAction: (data: Oauth2AuthorizationForm) => {
    if (data.id) {
      // 编辑
      return Oauth2AuthorizationAPI.update(data.id as string, data);
    } else {
      // 新增
      return Oauth2AuthorizationAPI.create(data);
    }
  },
});

// 编辑配置
const editModalConfig: IModalConfig<Oauth2AuthorizationForm> = reactive({
  permPrefix: "aioveuMallAuthOauth2Authorization:oauth2-authorization",
  component: "drawer",
  drawer: {
    title: "编辑",
    size: 500,
  },
  pk: "id",
  formAction(data: any) {
    return Oauth2AuthorizationAPI.update(data.id as string, data);
  },
  formItems: addModalConfig.formItems, // 复用新增的表单项
});

// 处理操作按钮点击
const handleOperateClick = (data: IObject) => {
  if (data.name === "edit") {
    handleEditClick(data.row, async () => {
      return await Oauth2AuthorizationAPI.getFormData(data.row.id);
    });
  }
};

// 处理工具栏按钮点击（删除等）
const handleToolbarClick = (name: string) => {
  console.log(name);
};

</script>
