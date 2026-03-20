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
defineOptions({ name: "OauthClientWxApp" });

import OauthClientWxAppAPI ,{ OauthClientWxAppForm, OauthClientWxAppPageQuery }from "@/api/aioveuMall/aioveuMallTenant/aioveuMallTenantOauthClientWxApp/oauth-client-wx-app";
// import type { OauthClientWxAppForm, OauthClientWxAppPageQuery } from "@/api/types";
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
  permPrefix: "aioveuMallTenantOauthClientWxApp:oauth-client-wx-app",
  formItems: [
    {
      type: "input",
      label: "OAuth2 client客户端 ID",
      prop: "clientId",
      attrs: {
        placeholder: "OAuth2 client客户端 ID",
        clearable: true,
        style: { width: "200px" },
      },
    },
    {
      type: "input",
      label: "微信小程序appid",
      prop: "wxAppid",
      attrs: {
        placeholder: "微信小程序appid",
        clearable: true,
        style: { width: "200px" },
      },
    },
    {
      type: "input",
      label: "微信小程序appname",
      prop: "wxAppname",
      attrs: {
        placeholder: "微信小程序appname",
        clearable: true,
        style: { width: "200px" },
      },
    },
    {
      type: "input",
      label: "微信小程序注册邮箱",
      prop: "registeredEmail",
      attrs: {
        placeholder: "微信小程序注册邮箱",
        clearable: true,
        style: { width: "200px" },
      },
    },
    {
      type: "input",
      label: "逻辑删除：0-未删除 1-已删除",
      prop: "isDeleted",
      attrs: {
        placeholder: "逻辑删除：0-未删除 1-已删除",
        clearable: true,
        style: { width: "200px" },
      },
    },
  ],
});

// 列表配置
const contentConfig: IContentConfig<OauthClientWxAppPageQuery> = reactive({
  // 权限前缀
  permPrefix: "aioveuMallTenantOauthClientWxApp:oauth-client-wx-app",
  table: {
    border: true,
    highlightCurrentRow: true,
  },
  // 主键
  pk: "id",
  // 列表查询接口
  indexAction: OauthClientWxAppAPI.getPage,
  // 删除接口
  deleteAction: OauthClientWxAppAPI.deleteByIds,
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
    { label: "OAuth2 client客户端 ID", prop: "clientId" },
    { label: "微信小程序appid", prop: "wxAppid" },
    { label: "微信小程序appname", prop: "wxAppname" },
    { label: "微信小程序注册邮箱", prop: "registeredEmail" },
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
const addModalConfig: IModalConfig<OauthClientWxAppForm> = reactive({
  // 权限前缀
  permPrefix: "aioveuMallTenantOauthClientWxApp:oauth-client-wx-app",
  // 主键
  pk: "id",
  // 弹窗配置
  dialog: {
    title: "新增",
    width: 800,
    draggable: true,
  },
  form: {
    labelWidth: 200,
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
        placeholder: "OAuth2 client客户端 ID"
      },
      rules: [{ required: true, message: "OAuth2 client客户端 ID不能为空", trigger: "blur" }],
      label: "OAuth2 client客户端 ID",
      prop: "clientId",
    },
    {
      type: "input",
      attrs: {
        placeholder: "微信小程序appid"
      },
      rules: [{ required: true, message: "微信小程序appid不能为空", trigger: "blur" }],
      label: "微信小程序appid",
      prop: "wxAppid",
    },
    {
      type: "input",
      attrs: {
        placeholder: "微信小程序appname"
      },
      label: "微信小程序appname",
      prop: "wxAppname",
    },
    {
      type: "input",
      attrs: {
        placeholder: "微信小程序注册邮箱"
      },
      label: "微信小程序注册邮箱",
      prop: "registeredEmail",
    },
    {
      type: "input",
      attrs: {
        placeholder: "逻辑删除：0-未删除 1-已删除"
      },
      label: "逻辑删除：0-未删除 1-已删除",
      prop: "isDeleted",
    },
  ],
  // 提交函数
  formAction: (data: OauthClientWxAppForm) => {
    if (data.id) {
      // 编辑
      return OauthClientWxAppAPI.update(data.id, data);
    } else {
      // 新增
      return OauthClientWxAppAPI.create(data);
    }
  },
});

// 编辑配置
const editModalConfig: IModalConfig<OauthClientWxAppForm> = reactive({
  permPrefix: "aioveuMallTenantOauthClientWxApp:oauth-client-wx-app",
  component: "drawer",
  drawer: {
    title: "编辑",
    size: 500,
  },
  pk: "id",
  formAction(data: any) {
    return OauthClientWxAppAPI.update(data.id, data);
  },
  formItems: addModalConfig.formItems, // 复用新增的表单项
});

// 处理操作按钮点击
const handleOperateClick = (data: IObject) => {
  if (data.name === "edit") {
    handleEditClick(data.row, async () => {
      return await OauthClientWxAppAPI.getFormData(data.row.id);
    });
  }
};

// 处理工具栏按钮点击（删除等）
const handleToolbarClick = (name: string) => {
  console.log(name);
};

</script>
