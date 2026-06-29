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
defineOptions({ name: "OmsOrderExportTask" });

import OmsOrderExportTaskAPI, {
  OmsOrderExportTaskForm,
  OmsOrderExportTaskPageQuery,
} from "@/api/aioveuMall/aioveuMallOms/aioveuMallOmsOrderExportTask/oms-order-export-task";
// import type { OmsOrderExportTaskForm, OmsOrderExportTaskPageQuery } from "@/api/types";
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
  permPrefix: "aioveuMallOmsOrderExportTask:oms-order-export-task",
  formItems: [
    {
      type: "input",
      label: "订单导出任务编号",
      prop: "orderExportTaskNo",
      attrs: {
        placeholder: "订单导出任务编号",
        clearable: true,
        style: { width: "200px" },
      },
    },
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
      label: "操作员ID",
      prop: "operatorId",
      attrs: {
        placeholder: "操作员ID",
        clearable: true,
        style: { width: "200px" },
      },
    },
    {
      type: "input",
      label: "客户端ID（小程序/H5/PC）",
      prop: "clientId",
      attrs: {
        placeholder: "客户端ID（小程序/H5/PC）",
        clearable: true,
        style: { width: "200px" },
      },
    },
    {
      type: "input",
      label: "订单状态：0-待付款 1-已付款 2-已发货 3-已完成 4-已取消 5-售后中",
      prop: "orderStatus",
      attrs: {
        placeholder: "订单状态：0-待付款 1-已付款 2-已发货 3-已完成 4-已取消 5-售后中",
        clearable: true,
        style: { width: "200px" },
      },
    },
    {
      type: "input",
      label: "订单起始时间",
      prop: "orderStartTime",
      attrs: {
        placeholder: "订单起始时间",
        clearable: true,
        style: { width: "200px" },
      },
    },
    {
      type: "input",
      label: "订单结束时间",
      prop: "orderEndTime",
      attrs: {
        placeholder: "订单结束时间",
        clearable: true,
        style: { width: "200px" },
      },
    },
    {
      type: "input",
      label: "导出格式：excel/csv",
      prop: "exportFormat",
      attrs: {
        placeholder: "导出格式：excel/csv",
        clearable: true,
        style: { width: "200px" },
      },
    },
    {
      type: "input",
      label: "导出数据总量",
      prop: "totalCount",
      attrs: {
        placeholder: "导出数据总量",
        clearable: true,
        style: { width: "200px" },
      },
    },
    {
      type: "input",
      label: "任务状态：PENDING/RUNNING/SUCCESS/FAILED",
      prop: "status",
      attrs: {
        placeholder: "任务状态：PENDING/RUNNING/SUCCESS/FAILED",
        clearable: true,
        style: { width: "200px" },
      },
    },
    {
      type: "input",
      label: "任务开始执行时间",
      prop: "startTimeActual",
      attrs: {
        placeholder: "任务开始执行时间",
        clearable: true,
        style: { width: "200px" },
      },
    },
    {
      type: "input",
      label: "任务完成时间",
      prop: "finishTime",
      attrs: {
        placeholder: "任务完成时间",
        clearable: true,
        style: { width: "200px" },
      },
    },
  ],
});

// 列表配置
const contentConfig: IContentConfig<OmsOrderExportTaskPageQuery> = reactive({
  // 权限前缀
  permPrefix: "aioveuMallOmsOrderExportTask:oms-order-export-task",
  table: {
    border: true,
    highlightCurrentRow: true,
  },
  // 主键
  pk: "id",
  // 列表查询接口
  indexAction: OmsOrderExportTaskAPI.getPage,
  // 删除接口
  deleteAction: OmsOrderExportTaskAPI.deleteByIds,
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
    { label: "订单导出任务ID", prop: "id" },
    { label: "订单导出任务编号", prop: "orderExportTaskNo" },
    { label: "租户ID，0表示平台默认", prop: "tenantId" },
    { label: "操作员ID", prop: "operatorId" },
    { label: "客户端ID（小程序/H5/PC）", prop: "clientId" },
    {
      label: "订单状态：0-待付款 1-已付款 2-已发货 3-已完成 4-已取消 5-售后中",
      prop: "orderStatus",
    },
    { label: "订单起始时间", prop: "orderStartTime" },
    { label: "订单结束时间", prop: "orderEndTime" },
    { label: "导出格式：excel/csv", prop: "exportFormat" },
    { label: "导出数据总量", prop: "totalCount" },
    { label: "任务状态：PENDING/RUNNING/SUCCESS/FAILED", prop: "status" },
    { label: "导出文件地址", prop: "fileUrl" },
    { label: "失败原因", prop: "failReason" },
    { label: "任务开始执行时间", prop: "startTimeActual" },
    { label: "任务完成时间", prop: "finishTime" },
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
const addModalConfig: IModalConfig<OmsOrderExportTaskForm> = reactive({
  // 权限前缀
  permPrefix: "aioveuMallOmsOrderExportTask:oms-order-export-task",
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
        placeholder: "订单导出任务ID",
      },
      label: "订单导出任务ID",
      prop: "id",
    },
    {
      type: "input",
      attrs: {
        placeholder: "订单导出任务编号",
      },
      rules: [{ required: true, message: "订单导出任务编号不能为空", trigger: "blur" }],
      label: "订单导出任务编号",
      prop: "orderExportTaskNo",
    },
    {
      type: "input",
      attrs: {
        placeholder: "租户ID，0表示平台默认",
      },
      rules: [{ required: true, message: "租户ID，0表示平台默认不能为空", trigger: "blur" }],
      label: "租户ID，0表示平台默认",
      prop: "tenantId",
    },
    {
      type: "input",
      attrs: {
        placeholder: "操作员ID",
      },
      rules: [{ required: true, message: "操作员ID不能为空", trigger: "blur" }],
      label: "操作员ID",
      prop: "operatorId",
    },
    {
      type: "input",
      attrs: {
        placeholder: "客户端ID（小程序/H5/PC）",
      },
      rules: [{ required: true, message: "客户端ID（小程序/H5/PC）不能为空", trigger: "blur" }],
      label: "客户端ID（小程序/H5/PC）",
      prop: "clientId",
    },
    {
      type: "input",
      attrs: {
        placeholder: "订单状态：0-待付款 1-已付款 2-已发货 3-已完成 4-已取消 5-售后中",
      },
      rules: [
        {
          required: true,
          message: "订单状态：0-待付款 1-已付款 2-已发货 3-已完成 4-已取消 5-售后中不能为空",
          trigger: "blur",
        },
      ],
      label: "订单状态：0-待付款 1-已付款 2-已发货 3-已完成 4-已取消 5-售后中",
      prop: "orderStatus",
    },
    {
      type: "input",
      attrs: {
        placeholder: "订单起始时间",
      },
      label: "订单起始时间",
      prop: "orderStartTime",
    },
    {
      type: "input",
      attrs: {
        placeholder: "订单结束时间",
      },
      label: "订单结束时间",
      prop: "orderEndTime",
    },
    {
      type: "input",
      attrs: {
        placeholder: "导出格式：excel/csv",
      },
      label: "导出格式：excel/csv",
      prop: "exportFormat",
    },
    {
      type: "input",
      attrs: {
        placeholder: "导出数据总量",
      },
      label: "导出数据总量",
      prop: "totalCount",
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
      label: "任务状态：PENDING/RUNNING/SUCCESS/FAILED",
      prop: "status",
    },
    {
      type: "input",
      attrs: {
        placeholder: "导出文件地址",
      },
      label: "导出文件地址",
      prop: "fileUrl",
    },
    {
      type: "input",
      attrs: {
        placeholder: "失败原因",
      },
      label: "失败原因",
      prop: "failReason",
    },
    {
      type: "input",
      attrs: {
        placeholder: "任务开始执行时间",
      },
      label: "任务开始执行时间",
      prop: "startTimeActual",
    },
    {
      type: "input",
      attrs: {
        placeholder: "任务完成时间",
      },
      label: "任务完成时间",
      prop: "finishTime",
    },
  ],
  // 提交函数
  formAction: (data: OmsOrderExportTaskForm) => {
    if (data.id) {
      // 编辑
      return OmsOrderExportTaskAPI.update(data.id as number, data);
    } else {
      // 新增
      return OmsOrderExportTaskAPI.create(data);
    }
  },
});

// 编辑配置
const editModalConfig: IModalConfig<OmsOrderExportTaskForm> = reactive({
  permPrefix: "aioveuMallOmsOrderExportTask:oms-order-export-task",
  component: "drawer",
  drawer: {
    title: "编辑",
    size: 500,
  },
  pk: "id",
  formAction(data: any) {
    return OmsOrderExportTaskAPI.update(data.id as number, data);
  },
  formItems: addModalConfig.formItems, // 复用新增的表单项
});

// 处理操作按钮点击
const handleOperateClick = (data: IObject) => {
  if (data.name === "edit") {
    handleEditClick(data.row, async () => {
      return await OmsOrderExportTaskAPI.getFormData(data.row.id);
    });
  }
};

// 处理工具栏按钮点击（删除等）
const handleToolbarClick = (name: string) => {
  console.log(name);
};

const handleDownload = async (exportNo: string) => {
  try {
    const res = await OmsOrderExportTaskAPI.downloadExportFile(exportNo);

    // 1️⃣ 从 response headers 拿文件名
    const disposition = res.headers["content-disposition"];
    let fileName = "订单导出.xlsx";

    if (disposition) {
      const match = disposition.match(/filename\*=UTF-8''(.+)/);
      if (match) {
        fileName = decodeURIComponent(match[1]);
      }
    }

    // 2️创建 blob 并下载
    const blob = new Blob([res.data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    link.click();

    window.URL.revokeObjectURL(link.href);
  } catch (error) {
    console.error("下载失败", error);
    // uni.showToast({ title: "下载失败", icon: "none" });
  }
};
</script>
