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
defineOptions({ name: "MqConsumeIdempotent" });

import MqConsumeIdempotentAPI, {
  MqConsumeIdempotentForm,
  MqConsumeIdempotentPageQuery,
} from "@/api/aioveuMall/aioveuMallOms/aioveuMallOmsMqConsumeIdempotent/mq-consume-idempotent";
// import type { MqConsumeIdempotentForm, MqConsumeIdempotentPageQuery } from "@/api/types";
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
  permPrefix: "aioveuMallOmsMqConsumeIdempotent:mq-consume-idempotent",
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
      label: "业务唯一键",
      prop: "bizUniqueKey",
      attrs: {
        placeholder: "业务唯一键",
        clearable: true,
        style: { width: "200px" },
      },
    },
    {
      type: "input",
      label: "业务类型",
      prop: "bizType",
      attrs: {
        placeholder: "业务类型",
        clearable: true,
        style: { width: "200px" },
      },
    },
    {
      type: "input",
      label: "消息ID",
      prop: "messageId",
      attrs: {
        placeholder: "消息ID",
        clearable: true,
        style: { width: "200px" },
      },
    },
    {
      type: "input",
      label: "消费时间",
      prop: "consumeTime",
      attrs: {
        placeholder: "消费时间",
        clearable: true,
        style: { width: "200px" },
      },
    },
    {
      type: "input",
      label: "更新时间",
      prop: "updateTime",
      attrs: {
        placeholder: "更新时间",
        clearable: true,
        style: { width: "200px" },
      },
    },
  ],
});

// 列表配置
const contentConfig: IContentConfig<MqConsumeIdempotentPageQuery> = reactive({
  // 权限前缀
  permPrefix: "aioveuMallOmsMqConsumeIdempotent:mq-consume-idempotent",
  table: {
    border: true,
    highlightCurrentRow: true,
  },
  // 主键
  pk: "id",
  // 列表查询接口
  indexAction: MqConsumeIdempotentAPI.getPage,
  // 删除接口
  deleteAction: MqConsumeIdempotentAPI.deleteByIds,
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
    {
      label: "",
      width: 250, // 增加宽度以防止内容换行
      showOverflowTooltip: true, // 推荐：超出宽度显示 tooltip 提示
      prop: "id",
    },
    {
      label: "租户ID，0表示平台默认",
      width: 250, // 增加宽度以防止内容换行
      showOverflowTooltip: true, // 推荐：超出宽度显示 tooltip 提示
      prop: "tenantId",
    },
    {
      label: "业务唯一键",
      width: 250, // 增加宽度以防止内容换行
      showOverflowTooltip: true, // 推荐：超出宽度显示 tooltip 提示
      prop: "bizUniqueKey",
    },
    {
      label: "业务类型",
      width: 250, // 增加宽度以防止内容换行
      showOverflowTooltip: true, // 推荐：超出宽度显示 tooltip 提示
      prop: "bizType",
    },
    {
      label: "消息ID",
      width: 250, // 增加宽度以防止内容换行
      showOverflowTooltip: true, // 推荐：超出宽度显示 tooltip 提示
      prop: "messageId",
    },
    {
      label: "状态:1-已处理",
      width: 250, // 增加宽度以防止内容换行
      showOverflowTooltip: true, // 推荐：超出宽度显示 tooltip 提示
      prop: "status",
    },
    {
      label: "消费时间",
      width: 250, // 增加宽度以防止内容换行
      showOverflowTooltip: true, // 推荐：超出宽度显示 tooltip 提示
      prop: "consumeTime",
    },
    {
      label: "逻辑删除：0-未删除 1-已删除",
      width: 250, // 增加宽度以防止内容换行
      showOverflowTooltip: true, // 推荐：超出宽度显示 tooltip 提示
      prop: "isDeleted",
    },
    {
      label: "创建时间",
      width: 250, // 增加宽度以防止内容换行
      showOverflowTooltip: true, // 推荐：超出宽度显示 tooltip 提示
      prop: "createTime",
    },
    {
      label: "更新时间",
      width: 250, // 增加宽度以防止内容换行
      showOverflowTooltip: true, // 推荐：超出宽度显示 tooltip 提示
      prop: "updateTime",
    },
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
const addModalConfig: IModalConfig<MqConsumeIdempotentForm> = reactive({
  // 权限前缀
  permPrefix: "aioveuMallOmsMqConsumeIdempotent:mq-consume-idempotent",
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
        placeholder: "业务唯一键",
      },
      rules: [{ required: true, message: "业务唯一键不能为空", trigger: "blur" }],
      label: "业务唯一键",
      prop: "bizUniqueKey",
    },
    {
      type: "input",
      attrs: {
        placeholder: "业务类型",
      },
      rules: [{ required: true, message: "业务类型不能为空", trigger: "blur" }],
      label: "业务类型",
      prop: "bizType",
    },
    {
      type: "input",
      attrs: {
        placeholder: "消息ID",
      },
      rules: [{ required: true, message: "消息ID不能为空", trigger: "blur" }],
      label: "消息ID",
      prop: "messageId",
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
      label: "状态:1-已处理",
      prop: "status",
    },
    {
      type: "input",
      attrs: {
        placeholder: "消费时间",
      },
      rules: [{ required: true, message: "消费时间不能为空", trigger: "blur" }],
      label: "消费时间",
      prop: "consumeTime",
    },
  ],
  // 提交函数
  formAction: (data: MqConsumeIdempotentForm) => {
    if (data.id) {
      // 编辑
      return MqConsumeIdempotentAPI.update(data.id as number, data);
    } else {
      // 新增
      return MqConsumeIdempotentAPI.create(data);
    }
  },
});

// 编辑配置
const editModalConfig: IModalConfig<MqConsumeIdempotentForm> = reactive({
  permPrefix: "aioveuMallOmsMqConsumeIdempotent:mq-consume-idempotent",
  component: "drawer",
  drawer: {
    title: "编辑",
    size: 500,
  },
  form: {
    labelWidth: 100,
    labelPosition: "top", // 标签置顶，更适合宽表单
  },
  pk: "id",
  formAction(data: any) {
    return MqConsumeIdempotentAPI.update(data.id as number, data);
  },
  formItems: addModalConfig.formItems, // 复用新增的表单项
});

// 处理操作按钮点击
const handleOperateClick = (data: IObject) => {
  if (data.name === "edit") {
    handleEditClick(data.row, async () => {
      return await MqConsumeIdempotentAPI.getFormData(data.row.id);
    });
  }
};

// 处理工具栏按钮点击（删除等）
const handleToolbarClick = (name: string) => {
  console.log(name);
};
</script>
