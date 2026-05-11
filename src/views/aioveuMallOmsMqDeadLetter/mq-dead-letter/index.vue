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
defineOptions({ name: "MqDeadLetter" });

import MqDeadLetterAPI, {
  MqDeadLetterForm,
  MqDeadLetterPageQuery,
} from "@/api/aioveuMall/aioveuMallOms/aioveuMallOmsMqDeadLetter/mq-dead-letter";
// import type { MqDeadLetterForm, MqDeadLetterPageQuery } from "@/api/types";
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
  permPrefix: "aioveuMallOmsMqDeadLetter:mq-dead-letter",
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
      label: "Topic",
      prop: "topic",
      attrs: {
        placeholder: "Topic",
        clearable: true,
        style: { width: "200px" },
      },
    },
    {
      type: "input",
      label: "Tag",
      prop: "tag",
      attrs: {
        placeholder: "Tag",
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
const contentConfig: IContentConfig<MqDeadLetterPageQuery> = reactive({
  // 权限前缀
  permPrefix: "aioveuMallOmsMqDeadLetter:mq-dead-letter",
  table: {
    border: true,
    highlightCurrentRow: true,
  },
  // 主键
  pk: "id",
  // 列表查询接口
  indexAction: MqDeadLetterAPI.getPage,
  // 删除接口
  deleteAction: MqDeadLetterAPI.deleteByIds,
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
      label: "消息ID",
      width: 250, // 增加宽度以防止内容换行
      showOverflowTooltip: true, // 推荐：超出宽度显示 tooltip 提示
      prop: "messageId",
    },
    {
      label: "Topic",
      width: 250, // 增加宽度以防止内容换行
      showOverflowTooltip: true, // 推荐：超出宽度显示 tooltip 提示
      prop: "topic",
    },
    {
      label: "Tag",
      width: 250, // 增加宽度以防止内容换行
      showOverflowTooltip: true, // 推荐：超出宽度显示 tooltip 提示
      prop: "tag",
    },
    {
      label: "消费者组",
      width: 250, // 增加宽度以防止内容换行
      showOverflowTooltip: true, // 推荐：超出宽度显示 tooltip 提示
      prop: "consumerGroup",
    },
    {
      label: "业务ID",
      width: 250, // 增加宽度以防止内容换行
      showOverflowTooltip: true, // 推荐：超出宽度显示 tooltip 提示
      prop: "bizId",
    },
    {
      label: "消息体",
      width: 250, // 增加宽度以防止内容换行
      showOverflowTooltip: true, // 推荐：超出宽度显示 tooltip 提示
      prop: "messageBody",
    },
    {
      label: "消费次数",
      width: 250, // 增加宽度以防止内容换行
      showOverflowTooltip: true, // 推荐：超出宽度显示 tooltip 提示
      prop: "consumeTimes",
    },
    {
      label: "错误信息",
      width: 250, // 增加宽度以防止内容换行
      showOverflowTooltip: true, // 推荐：超出宽度显示 tooltip 提示
      prop: "errorMsg",
    },
    {
      label: "死信原因",
      width: 250, // 增加宽度以防止内容换行
      showOverflowTooltip: true, // 推荐：超出宽度显示 tooltip 提示
      prop: "deadReason",
    },
    {
      label: "处理状态:0-未处理,1-已处理",
      width: 250, // 增加宽度以防止内容换行
      showOverflowTooltip: true, // 推荐：超出宽度显示 tooltip 提示
      prop: "handleStatus",
    },
    {
      label: "处理时间",
      width: 250, // 增加宽度以防止内容换行
      showOverflowTooltip: true, // 推荐：超出宽度显示 tooltip 提示
      prop: "handleTime",
    },
    {
      label: "处理结果",
      width: 250, // 增加宽度以防止内容换行
      showOverflowTooltip: true, // 推荐：超出宽度显示 tooltip 提示
      prop: "handleResult",
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
const addModalConfig: IModalConfig<MqDeadLetterForm> = reactive({
  // 权限前缀
  permPrefix: "aioveuMallOmsMqDeadLetter:mq-dead-letter",
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
        placeholder: "消息ID",
      },
      rules: [{ required: true, message: "消息ID不能为空", trigger: "blur" }],
      label: "消息ID",
      prop: "messageId",
    },
    {
      type: "input",
      attrs: {
        placeholder: "Topic",
      },
      rules: [{ required: true, message: "Topic不能为空", trigger: "blur" }],
      label: "Topic",
      prop: "topic",
    },
    {
      type: "input",
      attrs: {
        placeholder: "Tag",
      },
      label: "Tag",
      prop: "tag",
    },
    {
      type: "input",
      attrs: {
        placeholder: "消费者组",
      },
      rules: [{ required: true, message: "消费者组不能为空", trigger: "blur" }],
      label: "消费者组",
      prop: "consumerGroup",
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
        placeholder: "消息体",
      },
      rules: [{ required: true, message: "消息体不能为空", trigger: "blur" }],
      label: "消息体",
      prop: "messageBody",
    },
    {
      type: "input",
      attrs: {
        placeholder: "消费次数",
      },
      label: "消费次数",
      prop: "consumeTimes",
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
        placeholder: "死信原因",
      },
      label: "死信原因",
      prop: "deadReason",
    },
    {
      type: "input",
      attrs: {
        placeholder: "处理状态:0-未处理,1-已处理",
      },
      label: "处理状态:0-未处理,1-已处理",
      prop: "handleStatus",
    },
    {
      type: "input",
      attrs: {
        placeholder: "处理时间",
      },
      label: "处理时间",
      prop: "handleTime",
    },
    {
      type: "input",
      attrs: {
        placeholder: "处理结果",
      },
      label: "处理结果",
      prop: "handleResult",
    },
  ],
  // 提交函数
  formAction: (data: MqDeadLetterForm) => {
    if (data.id) {
      // 编辑
      return MqDeadLetterAPI.update(data.id as number, data);
    } else {
      // 新增
      return MqDeadLetterAPI.create(data);
    }
  },
});

// 编辑配置
const editModalConfig: IModalConfig<MqDeadLetterForm> = reactive({
  permPrefix: "aioveuMallOmsMqDeadLetter:mq-dead-letter",
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
    return MqDeadLetterAPI.update(data.id as number, data);
  },
  formItems: addModalConfig.formItems, // 复用新增的表单项
});

// 处理操作按钮点击
const handleOperateClick = (data: IObject) => {
  if (data.name === "edit") {
    handleEditClick(data.row, async () => {
      return await MqDeadLetterAPI.getFormData(data.row.id);
    });
  }
};

// 处理工具栏按钮点击（删除等）
const handleToolbarClick = (name: string) => {
  console.log(name);
};
</script>
