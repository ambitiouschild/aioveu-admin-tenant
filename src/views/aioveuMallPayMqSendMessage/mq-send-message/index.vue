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
defineOptions({ name: "MqSendRecord" });

import MqSendRecordAPI, {
  MqSendRecordForm,
  MqSendRecordPageQuery,
} from "@/api/aioveuMall/aioveuMallPay/aioveuMallPayMqSendRecord/mq-send-record";

import MqSendMessageAPI from "@/api/aioveuMall/aioveuMallPay/aioveuMallPayMqSendMessage/mq-send-message";

// import type { MqSendRecordForm, MqSendRecordPageQuery } from "@/api/types";
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
  permPrefix: "aioveuMallPay:mq-send-record",
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
      label: "业务ID(支付单号)",
      prop: "bizId",
      attrs: {
        placeholder: "业务ID(支付单号)",
        clearable: true,
        style: { width: "200px" },
      },
    },
    {
      type: "input",
      label: "业务类型:payment_success",
      prop: "bizType",
      attrs: {
        placeholder: "业务类型:payment_success",
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
      label: "发送状态:0-未发送,1-发送中,2-发送成功,3-发送失败",
      prop: "sendStatus",
      attrs: {
        placeholder: "发送状态:0-未发送,1-发送中,2-发送成功,3-发送失败",
        clearable: true,
        style: { width: "200px" },
      },
    },
    {
      type: "input",
      label: "发送时间",
      prop: "sendTime",
      attrs: {
        placeholder: "发送时间",
        clearable: true,
        style: { width: "200px" },
      },
    },
    {
      type: "input",
      label: "确认时间",
      prop: "confirmTime",
      attrs: {
        placeholder: "确认时间",
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
const contentConfig: IContentConfig<MqSendRecordPageQuery> = reactive({
  // 权限前缀
  permPrefix: "aioveuMallPay:mq-send-record",
  table: {
    border: true,
    highlightCurrentRow: true,
  },
  // 主键
  pk: "id",
  // 列表查询接口
  indexAction: MqSendRecordAPI.getPage,
  // 删除接口
  deleteAction: MqSendRecordAPI.deleteByIds,
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
      label: "业务ID(支付单号)",
      width: 250, // 增加宽度以防止内容换行
      showOverflowTooltip: true, // 推荐：超出宽度显示 tooltip 提示
      prop: "bizId",
    },
    {
      label: "业务类型:payment_success",
      width: 250, // 增加宽度以防止内容换行
      showOverflowTooltip: true, // 推荐：超出宽度显示 tooltip 提示
      prop: "bizType",
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
      label: "分片Key",
      width: 250, // 增加宽度以防止内容换行
      showOverflowTooltip: true, // 推荐：超出宽度显示 tooltip 提示
      prop: "shardingKey",
    },
    {
      label: "消息体(JSON格式)",
      width: 250, // 增加宽度以防止内容换行
      showOverflowTooltip: true, // 推荐：超出宽度显示 tooltip 提示
      prop: "messageBody",
    },
    {
      label: "发送状态:0-未发送,1-发送中,2-发送成功,3-发送失败",
      width: 250, // 增加宽度以防止内容换行
      showOverflowTooltip: true, // 推荐：超出宽度显示 tooltip 提示
      prop: "sendStatus",
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
      label: "发送时间",
      width: 250, // 增加宽度以防止内容换行
      showOverflowTooltip: true, // 推荐：超出宽度显示 tooltip 提示
      prop: "sendTime",
    },
    {
      label: "确认时间",
      width: 250, // 增加宽度以防止内容换行
      showOverflowTooltip: true, // 推荐：超出宽度显示 tooltip 提示
      prop: "confirmTime",
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
const addModalConfig: IModalConfig<MqSendRecordForm> = reactive({
  // 权限前缀
  // permPrefix: "aioveuMallPay:mq-send-record",
  // 主键
  pk: "id",
  // 弹窗配置
  dialog: {
    title: "发送支付成功消息",
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
    //     placeholder: "",
    //   },
    //   label: "",
    //   prop: "id",
    // },
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
        placeholder: "支付订单号",
      },
      rules: [{ required: true, message: "支付订单号", trigger: "blur" }],
      label: "支付订单号",
      prop: "payOrderNo",
    },
    // {
    //   type: "input",
    //   attrs: {
    //     placeholder: "消息ID",
    //   },
    //   rules: [{ required: true, message: "消息ID不能为空", trigger: "blur" }],
    //   label: "消息ID",
    //   prop: "messageId",
    // },
    // {
    //   type: "input",
    //   attrs: {
    //     placeholder: "业务ID(支付单号)",
    //   },
    //   rules: [{ required: true, message: "业务ID(支付单号)不能为空", trigger: "blur" }],
    //   label: "业务ID(支付单号)",
    //   prop: "bizId",
    // },
    // {
    //   type: "input",
    //   attrs: {
    //     placeholder: "业务类型:payment_success",
    //   },
    //   rules: [{ required: true, message: "业务类型:payment_success不能为空", trigger: "blur" }],
    //   label: "业务类型:payment_success",
    //   prop: "bizType",
    // },
    // {
    //   type: "input",
    //   attrs: {
    //     placeholder: "Topic",
    //   },
    //   rules: [{ required: true, message: "Topic不能为空", trigger: "blur" }],
    //   label: "Topic",
    //   prop: "topic",
    // },
    // {
    //   type: "input",
    //   attrs: {
    //     placeholder: "Tag",
    //   },
    //   label: "Tag",
    //   prop: "tag",
    // },
    // {
    //   type: "input",
    //   attrs: {
    //     placeholder: "分片Key",
    //   },
    //   label: "分片Key",
    //   prop: "shardingKey",
    // },
    // {
    //   type: "input",
    //   attrs: {
    //     placeholder: "消息体(JSON格式)",
    //   },
    //   rules: [{ required: true, message: "消息体(JSON格式)不能为空", trigger: "blur" }],
    //   label: "消息体(JSON格式)",
    //   prop: "messageBody",
    // },
    // {
    //   type: "input",
    //   attrs: {
    //     placeholder: "发送状态:0-未发送,1-发送中,2-发送成功,3-发送失败",
    //   },
    //   rules: [
    //     {
    //       required: true,
    //       message: "发送状态:0-未发送,1-发送中,2-发送成功,3-发送失败不能为空",
    //       trigger: "blur",
    //     },
    //   ],
    //   label: "发送状态:0-未发送,1-发送中,2-发送成功,3-发送失败",
    //   prop: "sendStatus",
    // },
    // {
    //   type: "input",
    //   attrs: {
    //     placeholder: "重试次数",
    //   },
    //   label: "重试次数",
    //   prop: "retryCount",
    // },
    // {
    //   type: "input",
    //   attrs: {
    //     placeholder: "最大重试次数",
    //   },
    //   label: "最大重试次数",
    //   prop: "maxRetry",
    // },
    // {
    //   type: "input",
    //   attrs: {
    //     placeholder: "下次重试时间",
    //   },
    //   label: "下次重试时间",
    //   prop: "nextRetryTime",
    // },
    // {
    //   type: "input",
    //   attrs: {
    //     placeholder: "发送时间",
    //   },
    //   label: "发送时间",
    //   prop: "sendTime",
    // },
    // {
    //   type: "input",
    //   attrs: {
    //     placeholder: "确认时间",
    //   },
    //   label: "确认时间",
    //   prop: "confirmTime",
    // },
    // {
    //   type: "input",
    //   attrs: {
    //     placeholder: "错误信息",
    //   },
    //   label: "错误信息",
    //   prop: "errorMsg",
    // },
  ],
  // 提交函数
  formAction: (data: MqSendRecordForm) => {
    if (data.id) {
      // 编辑
      return MqSendMessageAPI.sendPaymentSuccessMessage(data);
    } else {
      // 新增
      return MqSendMessageAPI.sendPaymentSuccessMessage(data);
    }
  },
});

// 编辑配置
const editModalConfig: IModalConfig<MqSendRecordForm> = reactive({
  permPrefix: "aioveuMallPay:mq-send-record",
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
    return MqSendRecordAPI.update(data.id, data);
  },
  formItems: addModalConfig.formItems, // 复用新增的表单项
});

// 处理操作按钮点击
const handleOperateClick = (data: IObject) => {
  if (data.name === "edit") {
    handleEditClick(data.row, async () => {
      return await MqSendRecordAPI.getFormData(data.row.id);
    });
  }
};

// 处理工具栏按钮点击（删除等）
const handleToolbarClick = (name: string) => {
  console.log(name);
};
</script>
