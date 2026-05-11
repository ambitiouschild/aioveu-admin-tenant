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
defineOptions({ name: "MqConsumeRecord" });

import MqConsumeRecordAPI, {
  MqConsumeRecordForm,
  MqConsumeRecordPageQuery,
} from "@/api/aioveuMall/aioveuMallOms/aioveuMallOmsMqConsumeRecord/mq-consume-record";
// import type { MqConsumeRecordForm, MqConsumeRecordPageQuery } from "@/api/types";
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
  permPrefix: "aioveuMallOmsMqConsumeRecord:mq-consume-record",
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
      label: "业务ID(订单号)",
      prop: "bizId",
      attrs: {
        placeholder: "业务ID(订单号)",
        clearable: true,
        style: { width: "200px" },
      },
    },
    {
      type: "input",
      label: "最大重试次数",
      prop: "maxRetry",
      attrs: {
        placeholder: "最大重试次数",
        clearable: true,
        style: { width: "200px" },
      },
    },
  ],
});

// 列表配置
const contentConfig: IContentConfig<MqConsumeRecordPageQuery> = reactive({
  // 权限前缀
  permPrefix: "aioveuMallOmsMqConsumeRecord:mq-consume-record",
  table: {
    border: true,
    highlightCurrentRow: true,
  },
  // 主键
  pk: "id",
  // 列表查询接口
  indexAction: MqConsumeRecordAPI.getPage,
  // 删除接口
  deleteAction: MqConsumeRecordAPI.deleteByIds,
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
      label: "业务ID(订单号)",
      width: 250, // 增加宽度以防止内容换行
      showOverflowTooltip: true, // 推荐：超出宽度显示 tooltip 提示
      prop: "bizId",
    },
    {
      label: "消费状态:0-未消费,1-消费中,2-消费成功,3-消费失败,4-进入死信",
      width: 250, // 增加宽度以防止内容换行
      showOverflowTooltip: true, // 推荐：超出宽度显示 tooltip 提示
      prop: "consumeStatus",
    },
    {
      label: "重试次数",
      width: 250, // 增加宽度以防止内容换行
      showOverflowTooltip: true, // 推荐：超出宽度显示 tooltip 提示
      prop: "retryCount",
    },
    {
      label: "最大重试次数",
      width: 250, // 增加宽度以防止内容换行
      showOverflowTooltip: true, // 推荐：超出宽度显示 tooltip 提示
      prop: "maxRetry",
    },
    {
      label: "下次重试时间",
      width: 250, // 增加宽度以防止内容换行
      showOverflowTooltip: true, // 推荐：超出宽度显示 tooltip 提示
      prop: "nextRetryTime",
    },
    {
      label: "消费时间",
      width: 250, // 增加宽度以防止内容换行
      showOverflowTooltip: true, // 推荐：超出宽度显示 tooltip 提示
      prop: "consumeTime",
    },
    {
      label: "完成时间",
      width: 250, // 增加宽度以防止内容换行
      showOverflowTooltip: true, // 推荐：超出宽度显示 tooltip 提示
      prop: "finishTime",
    },
    {
      label: "错误信息",
      width: 250, // 增加宽度以防止内容换行
      showOverflowTooltip: true, // 推荐：超出宽度显示 tooltip 提示
      prop: "errorMsg",
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
const addModalConfig: IModalConfig<MqConsumeRecordForm> = reactive({
  // 权限前缀
  permPrefix: "aioveuMallOmsMqConsumeRecord:mq-consume-record",
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
        placeholder: "业务ID(订单号)",
      },
      rules: [{ required: true, message: "业务ID(订单号)不能为空", trigger: "blur" }],
      label: "业务ID(订单号)",
      prop: "bizId",
    },
    {
      type: "input",
      attrs: {
        placeholder: "消费状态:0-未消费,1-消费中,2-消费成功,3-消费失败,4-进入死信",
      },
      rules: [
        {
          required: true,
          message: "消费状态:0-未消费,1-消费中,2-消费成功,3-消费失败,4-进入死信不能为空",
          trigger: "blur",
        },
      ],
      label: "消费状态:0-未消费,1-消费中,2-消费成功,3-消费失败,4-进入死信",
      prop: "consumeStatus",
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
        placeholder: "最大重试次数",
      },
      label: "最大重试次数",
      prop: "maxRetry",
    },
    {
      type: "input",
      attrs: {
        placeholder: "下次重试时间",
      },
      label: "下次重试时间",
      prop: "nextRetryTime",
    },
    {
      type: "input",
      attrs: {
        placeholder: "消费时间",
      },
      label: "消费时间",
      prop: "consumeTime",
    },
    {
      type: "input",
      attrs: {
        placeholder: "完成时间",
      },
      label: "完成时间",
      prop: "finishTime",
    },
    {
      type: "input",
      attrs: {
        placeholder: "错误信息",
      },
      label: "错误信息",
      prop: "errorMsg",
    },
  ],
  // 提交函数
  formAction: (data: MqConsumeRecordForm) => {
    if (data.id) {
      // 编辑
      return MqConsumeRecordAPI.update(data.id as number, data);
    } else {
      // 新增
      return MqConsumeRecordAPI.create(data);
    }
  },
});

// 编辑配置
const editModalConfig: IModalConfig<MqConsumeRecordForm> = reactive({
  permPrefix: "aioveuMallOmsMqConsumeRecord:mq-consume-record",
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
    return MqConsumeRecordAPI.update(data.id as number, data);
  },
  formItems: addModalConfig.formItems, // 复用新增的表单项
});

// 处理操作按钮点击
const handleOperateClick = (data: IObject) => {
  if (data.name === "edit") {
    handleEditClick(data.row, async () => {
      return await MqConsumeRecordAPI.getFormData(data.row.id);
    });
  }
};

// 处理工具栏按钮点击（删除等）
const handleToolbarClick = (name: string) => {
  console.log(name);
};
</script>
