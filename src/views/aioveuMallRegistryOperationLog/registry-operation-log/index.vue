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
defineOptions({ name: "RegistryOperationLog" });

import RegistryOperationLogAPI ,{ RegistryOperationLogForm, RegistryOperationLogPageQuery }
  from "@/api/aioveuMall/aioveuMallRegistry/aioveuMallRegistryOperationLog/registry-operation-log";
// import type { RegistryOperationLogForm, RegistryOperationLogPageQuery } from "@/api/types";
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
  permPrefix: "aioveuMallRegistryOperationLog:registry-operation-log",
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
      label: "操作人ID",
      prop: "operatorId",
      attrs: {
        placeholder: "操作人ID",
        clearable: true,
        style: { width: "200px" },
      },
    },
    {
      type: "input",
      label: "操作人类型：1-系统，2-租户，3-管理员",
      prop: "operatorType",
      attrs: {
        placeholder: "操作人类型：1-系统，2-租户，3-管理员",
        clearable: true,
        style: { width: "200px" },
      },
    },
    {
      type: "input",
      label: "操作类型：REGISTER, CERTIFY, FILE, UPDATE, DELETE等",
      prop: "operationType",
      attrs: {
        placeholder: "操作类型：REGISTER, CERTIFY, FILE, UPDATE, DELETE等",
        clearable: true,
        style: { width: "200px" },
      },
    },
    {
      type: "input",
      label: "操作目标：TENANT, APP, CERTIFICATION, FILING等",
      prop: "operationTarget",
      attrs: {
        placeholder: "操作目标：TENANT, APP, CERTIFICATION, FILING等",
        clearable: true,
        style: { width: "200px" },
      },
    },
    {
      type: "input",
      label: "目标记录ID",
      prop: "targetId",
      attrs: {
        placeholder: "目标记录ID",
        clearable: true,
        style: { width: "200px" },
      },
    },
    {
      type: "input",
      label: "操作内容（JSON格式）",
      prop: "operationContent",
      attrs: {
        placeholder: "操作内容（JSON格式）",
        clearable: true,
        style: { width: "200px" },
      },
    },
    {
      type: "input",
      label: "操作结果：1-成功，0-失败",
      prop: "operationResult",
      attrs: {
        placeholder: "操作结果：1-成功，0-失败",
        clearable: true,
        style: { width: "200px" },
      },
    },
    {
      type: "input",
      label: "用户代理",
      prop: "userAgent",
      attrs: {
        placeholder: "用户代理",
        clearable: true,
        style: { width: "200px" },
      },
    },
  ],
});

// 列表配置
const contentConfig: IContentConfig<RegistryOperationLogPageQuery> = reactive({
  // 权限前缀
  permPrefix: "aioveuMallRegistryOperationLog:registry-operation-log",
  table: {
    border: true,
    highlightCurrentRow: true,
  },
  // 主键
  pk: "id",
  // 列表查询接口
  indexAction: RegistryOperationLogAPI.getPage,
  // 删除接口
  deleteAction: RegistryOperationLogAPI.deleteByIds,
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
    { label: "日志ID", prop: "id" },
    { label: "租户ID", prop: "tenantId" },
    { label: "操作人ID", prop: "operatorId" },
    { label: "操作人类型：1-系统，2-租户，3-管理员", prop: "operatorType" },
    { label: "操作类型：REGISTER, CERTIFY, FILE, UPDATE, DELETE等", prop: "operationType" },
    { label: "操作目标：TENANT, APP, CERTIFICATION, FILING等", prop: "operationTarget" },
    { label: "目标记录ID", prop: "targetId" },
    { label: "操作内容（JSON格式）", prop: "operationContent" },
    { label: "操作结果：1-成功，0-失败", prop: "operationResult" },
    { label: "错误信息", prop: "errorMessage" },
    { label: "操作IP", prop: "ipAddress" },
    { label: "用户代理", prop: "userAgent" },
    { label: "操作时间", prop: "createTime" },
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
const addModalConfig: IModalConfig<RegistryOperationLogForm> = reactive({
  // 权限前缀
  permPrefix: "aioveuMallRegistryOperationLog:registry-operation-log",
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
        placeholder: "日志ID"
      },
      label: "日志ID",
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
        placeholder: "操作人ID"
      },
      rules: [{ required: true, message: "操作人ID不能为空", trigger: "blur" }],
      label: "操作人ID",
      prop: "operatorId",
    },
    {
      type: "input",
      attrs: {
        placeholder: "操作人类型：1-系统，2-租户，3-管理员"
      },
      rules: [{ required: true, message: "操作人类型：1-系统，2-租户，3-管理员不能为空", trigger: "blur" }],
      label: "操作人类型：1-系统，2-租户，3-管理员",
      prop: "operatorType",
    },
    {
      type: "input",
      attrs: {
        placeholder: "操作类型：REGISTER, CERTIFY, FILE, UPDATE, DELETE等"
      },
      rules: [{ required: true, message: "操作类型：REGISTER, CERTIFY, FILE, UPDATE, DELETE等不能为空", trigger: "blur" }],
      label: "操作类型：REGISTER, CERTIFY, FILE, UPDATE, DELETE等",
      prop: "operationType",
    },
    {
      type: "input",
      attrs: {
        placeholder: "操作目标：TENANT, APP, CERTIFICATION, FILING等"
      },
      rules: [{ required: true, message: "操作目标：TENANT, APP, CERTIFICATION, FILING等不能为空", trigger: "blur" }],
      label: "操作目标：TENANT, APP, CERTIFICATION, FILING等",
      prop: "operationTarget",
    },
    {
      type: "input",
      attrs: {
        placeholder: "目标记录ID"
      },
      label: "目标记录ID",
      prop: "targetId",
    },
    {
      type: "input",
      attrs: {
        placeholder: "操作内容（JSON格式）"
      },
      label: "操作内容（JSON格式）",
      prop: "operationContent",
    },
    {
      type: "input",
      attrs: {
        placeholder: "操作结果：1-成功，0-失败"
      },
      label: "操作结果：1-成功，0-失败",
      prop: "operationResult",
    },
    {
      type: "input",
      attrs: {
        placeholder: "错误信息"
      },
      label: "错误信息",
      prop: "errorMessage",
    },
    {
      type: "input",
      attrs: {
        placeholder: "操作IP"
      },
      label: "操作IP",
      prop: "ipAddress",
    },
    {
      type: "input",
      attrs: {
        placeholder: "用户代理"
      },
      label: "用户代理",
      prop: "userAgent",
    },
  ],
  // 提交函数
  formAction: (data: RegistryOperationLogForm) => {
    if (data.id) {
      // 编辑
      return RegistryOperationLogAPI.update(data.id , data);
    } else {
      // 新增
      return RegistryOperationLogAPI.create(data);
    }
  },
});

// 编辑配置
const editModalConfig: IModalConfig<RegistryOperationLogForm> = reactive({
  permPrefix: "aioveuMallRegistryOperationLog:registry-operation-log",
  component: "drawer",
  drawer: {
    title: "编辑",
    size: 500,
  },
  pk: "id",
  formAction(data: any) {
    return RegistryOperationLogAPI.update(data.id , data);
  },
  formItems: addModalConfig.formItems, // 复用新增的表单项
});

// 处理操作按钮点击
const handleOperateClick = (data: IObject) => {
  if (data.name === "edit") {
    handleEditClick(data.row, async () => {
      return await RegistryOperationLogAPI.getFormData(data.row.id);
    });
  }
};

// 处理工具栏按钮点击（删除等）
const handleToolbarClick = (name: string) => {
  console.log(name);
};

</script>
