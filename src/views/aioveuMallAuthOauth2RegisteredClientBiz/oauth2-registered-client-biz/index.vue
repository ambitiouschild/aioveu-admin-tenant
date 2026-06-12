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
defineOptions({ name: "Oauth2RegisteredClientBiz" });

import Oauth2RegisteredClientBizAPI, {
  Oauth2RegisteredClientBizForm,
  Oauth2RegisteredClientBizPageQuery,
} from "@/api/aioveuMall/aioveuMallAuth/aioveuMallAuthOauth2RegisteredClientBiz/oauth2-registered-client-biz";
// import type {
//   Oauth2RegisteredClientBizForm,
//   Oauth2RegisteredClientBizPageQuery,
// } from "@/api/types";
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
  permPrefix: "aioveuMallAuthOauth2RegisteredClientBiz:oauth2-registered-client-biz",
  formItems: [
    {
      type: "input",
      label: "OAuth2 客户端ID",
      prop: "clientId",
      attrs: {
        placeholder: "OAuth2 客户端ID",
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
      label: "是否启用：1-启用 0-禁用",
      prop: "enabled",
      attrs: {
        placeholder: "是否启用：1-启用 0-禁用",
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
const contentConfig: IContentConfig<Oauth2RegisteredClientBizPageQuery> = reactive({
  // 权限前缀
  permPrefix: "aioveuMallAuthOauth2RegisteredClientBiz:oauth2-registered-client-biz",
  table: {
    border: true,
    highlightCurrentRow: true,
  },
  // 主键
  pk: "id",
  // 列表查询接口
  indexAction: Oauth2RegisteredClientBizAPI.getPage,
  // 删除接口
  deleteAction: Oauth2RegisteredClientBizAPI.deleteByIds,
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
  // 设置表格行高
  height: "full-100", // 自适应高度，减100px
  // 或固定高度
  // height: 600,

  // 设置单元格样式
  cellMinWidth: 100, // 全局最小单元格宽度

  // 设置行高样式
  lineStyle: "height: 50px;", // 行高50px

  // 启用横向滚动
  size: "lg", // 大尺寸
  scrollPos: "fixed", // 固定表头
  autoSort: false,

  // 添加斑马纹样式
  even: true,
  // 表格列配置
  cols: [
    { type: "selection", width: 55, align: "center" },
    { label: "主键ID", prop: "id" },
    {
      label: "OAuth2 客户端UUID",
      width: 200, // 增加宽度以防止内容换行
      prop: "clientUUId",
    },
    { label: "OAuth2 客户端ID", prop: "clientId" },
    { label: "租户ID", prop: "tenantId" },
    { label: "是否启用：1-启用 0-禁用", prop: "enabled" },
    { label: "备注", prop: "remark" },
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
const addModalConfig: IModalConfig<Oauth2RegisteredClientBizForm> = reactive({
  // 权限前缀
  permPrefix: "aioveuMallAuthOauth2RegisteredClientBiz:oauth2-registered-client-biz",
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
    labelPosition: "top", // 标签置顶，更适合宽表单
  },
  // 表单项配置
  formItems: [
    // {
    //   type: "input",
    //   attrs: {
    //     placeholder: "主键ID",
    //   },
    //   label: "主键ID",
    //   prop: "id",
    // },
    {
      type: "input",
      attrs: {
        placeholder: "OAuth2 客户端UUID",
      },
      rules: [{ required: true, message: "OAuth2 客户端UUID不能为空", trigger: "blur" }],
      label: "OAuth2 客户端UUID",
      prop: "clientUUId",
    },
    {
      type: "input",
      attrs: {
        placeholder: "OAuth2 客户端ID",
      },
      rules: [{ required: true, message: "OAuth2 客户端ID不能为空", trigger: "blur" }],
      label: "OAuth2 客户端ID",
      prop: "clientId",
    },
    {
      type: "input",
      attrs: {
        placeholder: "租户ID",
      },
      label: "租户ID",
      prop: "tenantId",
    },
    {
      type: "input",
      attrs: {
        placeholder: "是否启用：1-启用 0-禁用",
      },
      rules: [{ required: true, message: "是否启用：1-启用 0-禁用不能为空", trigger: "blur" }],
      label: "是否启用：1-启用 0-禁用",
      prop: "enabled",
    },
    {
      type: "input",
      attrs: {
        placeholder: "备注",
      },
      label: "备注",
      prop: "remark",
    },
  ],
  // 提交函数
  formAction: (data: Oauth2RegisteredClientBizForm) => {
    if (data.id) {
      // 编辑
      return Oauth2RegisteredClientBizAPI.update(data.id as number, data);
    } else {
      // 新增
      return Oauth2RegisteredClientBizAPI.create(data);
    }
  },
});

// 编辑配置
const editModalConfig: IModalConfig<Oauth2RegisteredClientBizForm> = reactive({
  permPrefix: "aioveuMallAuthOauth2RegisteredClientBiz:oauth2-registered-client-biz",
  component: "drawer",
  drawer: {
    title: "编辑",
    size: 500,
  },
  pk: "id",
  formAction(data: any) {
    return Oauth2RegisteredClientBizAPI.update(data.id as number, data);
  },
  formItems: addModalConfig.formItems, // 复用新增的表单项
});

// 处理操作按钮点击
const handleOperateClick = (data: IObject) => {
  if (data.name === "edit") {
    handleEditClick(data.row, async () => {
      return await Oauth2RegisteredClientBizAPI.getFormData(data.row.id);
    });
  }
};

// 处理工具栏按钮点击（删除等）
const handleToolbarClick = (name: string) => {
  console.log(name);
};
</script>
