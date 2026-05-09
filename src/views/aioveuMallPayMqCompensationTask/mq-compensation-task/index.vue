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
defineOptions({ name: "MqCompensationTask" });

import MqCompensationTaskAPI, {
  MqCompensationTaskForm,
  MqCompensationTaskPageQuery,
} from "@/api/aioveuMall/aioveuMallPay/aioveuMallPayMqCompensationTask/mq-compensation-task";
// import type { MqCompensationTaskForm, MqCompensationTaskPageQuery } from "@/api/types";
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
  permPrefix: "aioveuMallPayMqCompensationTask:mq-compensation-task",
  formItems: [
    {
      type: "input",
      label: "租户ID，0表示平台默认",
      prop: "tenantId",
      attrs: {
        placeholder: "租户ID，0表示平台默认",
        clearable: true,
        style: { width: "200px" },
      },
    },
    {
      type: "input",
      label: "任务类型:send_retry",
      prop: "taskType",
      attrs: {
        placeholder: "任务类型:send_retry",
        clearable: true,
        style: { width: "200px" },
      },
    },
    {
      type: "input",
      label: "业务ID",
      prop: "bizId",
      attrs: {
        placeholder: "业务ID",
        clearable: true,
        style: { width: "200px" },
      },
    },
    {
      type: "input",
      label: "业务数据",
      prop: "bizData",
      attrs: {
        placeholder: "业务数据",
        clearable: true,
        style: { width: "200px" },
      },
    },
    {
      type: "input",
      label: "重试次数",
      prop: "retryCount",
      attrs: {
        placeholder: "重试次数",
        clearable: true,
        style: { width: "200px" },
      },
    },
    {
      type: "input",
      label: "错误信息",
      prop: "errorMsg",
      attrs: {
        placeholder: "错误信息",
        clearable: true,
        style: { width: "200px" },
      },
    },
  ],
});

// 列表配置
const contentConfig: IContentConfig<MqCompensationTaskPageQuery> = reactive({
  // 权限前缀
  permPrefix: "aioveuMallPayMqCompensationTask:mq-compensation-task",
  table: {
    border: true,
    highlightCurrentRow: true,
  },
  // 主键
  pk: "id",
  // 列表查询接口
  indexAction: MqCompensationTaskAPI.getPage,
  // 删除接口
  deleteAction: MqCompensationTaskAPI.deleteByIds,
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
    { label: "租户ID，0表示平台默认", prop: "tenantId" },
    { label: "任务类型:send_retry", prop: "taskType" },
    { label: "业务ID", prop: "bizId" },
    { label: "业务数据", prop: "bizData" },
    { label: "状态:0-待处理,1-处理中,2-成功,3-失败", prop: "status" },
    { label: "重试次数", prop: "retryCount" },
    { label: "下次执行时间", prop: "nextExecuteTime" },
    { label: "执行结果", prop: "executeResult" },
    { label: "错误信息", prop: "errorMsg" },
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
const addModalConfig: IModalConfig<MqCompensationTaskForm> = reactive({
  // 权限前缀
  permPrefix: "aioveuMallPayMqCompensationTask:mq-compensation-task",
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
        placeholder: "",
      },
      label: "",
      prop: "id",
    },
    {
      type: "input",
      attrs: {
        placeholder: "租户ID，0表示平台默认",
      },
      label: "租户ID，0表示平台默认",
      prop: "tenantId",
    },
    {
      type: "input",
      attrs: {
        placeholder: "任务类型:send_retry",
      },
      rules: [{ required: true, message: "任务类型:send_retry不能为空", trigger: "blur" }],
      label: "任务类型:send_retry",
      prop: "taskType",
    },
    {
      type: "input",
      attrs: {
        placeholder: "业务ID",
      },
      rules: [{ required: true, message: "业务ID不能为空", trigger: "blur" }],
      label: "业务ID",
      prop: "bizId",
    },
    {
      type: "input",
      attrs: {
        placeholder: "业务数据",
      },
      label: "业务数据",
      prop: "bizData",
    },
    {
      type: "switch",
      attrs: {
        activeText: "启用",
        inactiveText: "禁用",
        activeValue: 1,
        inactiveValue: 0,
      },
      initialValue: 1,
      label: "状态:0-待处理,1-处理中,2-成功,3-失败",
      prop: "status",
    },
    {
      type: "input",
      attrs: {
        placeholder: "重试次数",
      },
      label: "重试次数",
      prop: "retryCount",
    },
    {
      type: "input",
      attrs: {
        placeholder: "下次执行时间",
      },
      label: "下次执行时间",
      prop: "nextExecuteTime",
    },
    {
      type: "input",
      attrs: {
        placeholder: "执行结果",
      },
      label: "执行结果",
      prop: "executeResult",
    },
    {
      type: "input",
      attrs: {
        placeholder: "错误信息",
      },
      label: "错误信息",
      prop: "errorMsg",
    },
    {
      type: "input",
      attrs: {
        placeholder: "逻辑删除：0-未删除 1-已删除",
      },
      label: "逻辑删除：0-未删除 1-已删除",
      prop: "isDeleted",
    },
  ],
  // 提交函数
  formAction: (data: MqCompensationTaskForm) => {
    if (data.id) {
      // 编辑
      return MqCompensationTaskAPI.update(data.id as number, data);
    } else {
      // 新增
      return MqCompensationTaskAPI.create(data);
    }
  },
});

// 编辑配置
const editModalConfig: IModalConfig<MqCompensationTaskForm> = reactive({
  permPrefix: "aioveuMallPayMqCompensationTask:mq-compensation-task",
  component: "drawer",
  drawer: {
    title: "编辑",
    size: 500,
  },
  pk: "id",
  formAction(data: any) {
    return MqCompensationTaskAPI.update(data.id as number, data);
  },
  formItems: addModalConfig.formItems, // 复用新增的表单项
});

// 处理操作按钮点击
const handleOperateClick = (data: IObject) => {
  if (data.name === "edit") {
    handleEditClick(data.row, async () => {
      return await MqCompensationTaskAPI.getFormData(data.row.id);
    });
  }
};

// 处理工具栏按钮点击（删除等）
const handleToolbarClick = (name: string) => {
  console.log(name);
};
</script>
