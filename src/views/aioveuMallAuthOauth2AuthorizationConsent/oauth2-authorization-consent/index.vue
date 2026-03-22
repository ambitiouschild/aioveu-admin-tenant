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
defineOptions({ name: "Oauth2AuthorizationConsent" });

import Oauth2AuthorizationConsentAPI , { Oauth2AuthorizationConsentForm, Oauth2AuthorizationConsentPageQuery }
  from "@/api/aioveuMall/aioveuMallAuth/aioveuMallAuthOauth2AuthorizationConsent/oauth2-authorization-consent";
// import type { Oauth2AuthorizationConsentForm, Oauth2AuthorizationConsentPageQuery } from "@/api/types";
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
  permPrefix: "aioveuMallAuthOauth2AuthorizationConsent:oauth2-authorization-consent",
  formItems: [
    {
      type: "input",
      label: "注册客户端ID，指向oauth2_registered_client表",
      prop: "registeredClientId",
      attrs: {
        placeholder: "注册客户端ID，指向oauth2_registered_client表",
        clearable: true,
        style: { width: "200px" },
      },
    },
    {
      type: "input",
      label: "用户主体名称，用户的唯一标识",
      prop: "principalName",
      attrs: {
        placeholder: "用户主体名称，用户的唯一标识",
        clearable: true,
        style: { width: "200px" },
      },
    },
    {
      type: "input",
      label: "用户对该客户端已同意的权限列表，JSON格式存储",
      prop: "authorities",
      attrs: {
        placeholder: "用户对该客户端已同意的权限列表，JSON格式存储",
        clearable: true,
        style: { width: "200px" },
      },
    },
  ],
});

// 列表配置
const contentConfig: IContentConfig<Oauth2AuthorizationConsentPageQuery> = reactive({
  // 权限前缀
  permPrefix: "aioveuMallAuthOauth2AuthorizationConsent:oauth2-authorization-consent",
  table: {
    border: true,
    highlightCurrentRow: true,
  },
  // 主键
  pk: "id",
  // 列表查询接口
  indexAction: Oauth2AuthorizationConsentAPI.getPage,
  // 删除接口
  deleteAction: Oauth2AuthorizationConsentAPI.deleteByIds,
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
    { label: "注册客户端ID，指向oauth2_registered_client表", prop: "registeredClientId" },
    { label: "用户主体名称，用户的唯一标识", prop: "principalName" },
    { label: "用户对该客户端已同意的权限列表，JSON格式存储", prop: "authorities" },
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
const addModalConfig: IModalConfig<Oauth2AuthorizationConsentForm> = reactive({
  // 权限前缀
  permPrefix: "aioveuMallAuthOauth2AuthorizationConsent:oauth2-authorization-consent",
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
        placeholder: "注册客户端ID，指向oauth2_registered_client表"
      },
      label: "注册客户端ID，指向oauth2_registered_client表",
      prop: "registeredClientId",
    },
    {
      type: "input",
      attrs: {
        placeholder: "用户主体名称，用户的唯一标识"
      },
      rules: [{ required: true, message: "用户主体名称，用户的唯一标识不能为空", trigger: "blur" }],
      label: "用户主体名称，用户的唯一标识",
      prop: "principalName",
    },
    {
      type: "input",
      attrs: {
        placeholder: "用户对该客户端已同意的权限列表，JSON格式存储"
      },
      rules: [{ required: true, message: "用户对该客户端已同意的权限列表，JSON格式存储不能为空", trigger: "blur" }],
      label: "用户对该客户端已同意的权限列表，JSON格式存储",
      prop: "authorities",
    },
  ],
  // 提交函数
  formAction: (data: Oauth2AuthorizationConsentForm) => {
    if (data.registeredClientId) {
      // 编辑
      return Oauth2AuthorizationConsentAPI.update(data.registeredClientId as string, data);
    } else {
      // 新增
      return Oauth2AuthorizationConsentAPI.create(data);
    }
  },
});

// 编辑配置
const editModalConfig: IModalConfig<Oauth2AuthorizationConsentForm> = reactive({
  permPrefix: "aioveuMallAuthOauth2AuthorizationConsent:oauth2-authorization-consent",
  component: "drawer",
  drawer: {
    title: "编辑",
    size: 500,
  },
  pk: "id",
  formAction(data: any) {
    return Oauth2AuthorizationConsentAPI.update(data.id as string, data);
  },
  formItems: addModalConfig.formItems, // 复用新增的表单项
});

// 处理操作按钮点击
const handleOperateClick = (data: IObject) => {
  if (data.name === "edit") {
    handleEditClick(data.row, async () => {
      return await Oauth2AuthorizationConsentAPI.getFormData(data.row.id);
    });
  }
};

// 处理工具栏按钮点击（删除等）
const handleToolbarClick = (name: string) => {
  console.log(name);
};

</script>
