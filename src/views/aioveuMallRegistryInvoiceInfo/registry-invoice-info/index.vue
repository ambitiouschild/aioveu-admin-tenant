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
defineOptions({ name: "RegistryInvoiceInfo" });

import RegistryInvoiceInfoAPI , { RegistryInvoiceInfoForm, RegistryInvoiceInfoPageQuery }
  from "@/api/aioveuMall/aioveuMallRegistry/aioveuMallRegistryInvoiceInfo/registry-invoice-info";
// import type { RegistryInvoiceInfoForm, RegistryInvoiceInfoPageQuery } from "@/api/types";
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
  permPrefix: "aioveuMallRegistryInvoiceInfo:registry-invoice-info",
  formItems: [
    {
      type: "input",
      label: "所属租户ID",
      prop: "tenantId",
      attrs: {
        placeholder: "所属租户ID",
        clearable: true,
        style: { width: "200px" },
      },
    },
    {
      type: "input",
      label: "认证记录ID",
      prop: "certificationId",
      attrs: {
        placeholder: "认证记录ID",
        clearable: true,
        style: { width: "200px" },
      },
    },
    {
      type: "input",
      label: "发票类型：1-电子发票，2-纸质发票",
      prop: "invoiceType",
      attrs: {
        placeholder: "发票类型：1-电子发票，2-纸质发票",
        clearable: true,
        style: { width: "200px" },
      },
    },
    {
      type: "input",
      label: "发票抬头",
      prop: "invoiceTitle",
      attrs: {
        placeholder: "发票抬头",
        clearable: true,
        style: { width: "200px" },
      },
    },
    {
      type: "input",
      label: "纳税人识别号",
      prop: "taxIdentificationNo",
      attrs: {
        placeholder: "纳税人识别号",
        clearable: true,
        style: { width: "200px" },
      },
    },
    {
      type: "input",
      label: "开票状态：0-未开票，1-开票中，2-已开票，3-已寄送",
      prop: "invoiceStatus",
      attrs: {
        placeholder: "开票状态：0-未开票，1-开票中，2-已开票，3-已寄送",
        clearable: true,
        style: { width: "200px" },
      },
    },
  ],
});

// 列表配置
const contentConfig: IContentConfig<RegistryInvoiceInfoPageQuery> = reactive({
  // 权限前缀
  permPrefix: "aioveuMallRegistryInvoiceInfo:registry-invoice-info",
  table: {
    border: true,
    highlightCurrentRow: true,
  },
  // 主键
  pk: "id",
  // 列表查询接口
  indexAction: RegistryInvoiceInfoAPI.getPage,
  // 删除接口
  deleteAction: RegistryInvoiceInfoAPI.deleteByIds,
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
    { label: "发票ID", prop: "id" },
    { label: "所属租户ID", prop: "tenantId" },
    { label: "认证记录ID", prop: "certificationId" },
    { label: "发票类型：1-电子发票，2-纸质发票", prop: "invoiceType" },
    { label: "发票抬头", prop: "invoiceTitle" },
    { label: "纳税人识别号", prop: "taxIdentificationNo" },
    { label: "发票备注", prop: "invoiceRemark" },
    { label: "电子发票接收邮箱", prop: "invoiceEmail" },
    { label: "收件人姓名", prop: "receiverName" },
    { label: "收件人电话", prop: "receiverPhone" },
    { label: "收件地址", prop: "receiverAddress" },
    { label: "开票状态：0-未开票，1-开票中，2-已开票，3-已寄送", prop: "invoiceStatus" },
    { label: "开票时间", prop: "invoiceTime" },
    { label: "电子发票URL", prop: "invoiceUrl" },
    { label: "快递单号", prop: "expressNo" },
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
const addModalConfig: IModalConfig<RegistryInvoiceInfoForm> = reactive({
  // 权限前缀
  permPrefix: "aioveuMallRegistryInvoiceInfo:registry-invoice-info",
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
        placeholder: "发票ID"
      },
      label: "发票ID",
      prop: "id",
    },
    {
      type: "input",
      attrs: {
        placeholder: "所属租户ID"
      },
      rules: [{ required: true, message: "所属租户ID不能为空", trigger: "blur" }],
      label: "所属租户ID",
      prop: "tenantId",
    },
    {
      type: "input",
      attrs: {
        placeholder: "认证记录ID"
      },
      rules: [{ required: true, message: "认证记录ID不能为空", trigger: "blur" }],
      label: "认证记录ID",
      prop: "certificationId",
    },
    {
      type: "input",
      attrs: {
        placeholder: "发票类型：1-电子发票，2-纸质发票"
      },
      rules: [{ required: true, message: "发票类型：1-电子发票，2-纸质发票不能为空", trigger: "blur" }],
      label: "发票类型：1-电子发票，2-纸质发票",
      prop: "invoiceType",
    },
    {
      type: "input",
      attrs: {
        placeholder: "发票抬头"
      },
      rules: [{ required: true, message: "发票抬头不能为空", trigger: "blur" }],
      label: "发票抬头",
      prop: "invoiceTitle",
    },
    {
      type: "input",
      attrs: {
        placeholder: "纳税人识别号"
      },
      label: "纳税人识别号",
      prop: "taxIdentificationNo",
    },
    {
      type: "input",
      attrs: {
        placeholder: "发票备注"
      },
      label: "发票备注",
      prop: "invoiceRemark",
    },
    {
      type: "input",
      attrs: {
        placeholder: "电子发票接收邮箱"
      },
      label: "电子发票接收邮箱",
      prop: "invoiceEmail",
    },
    {
      type: "input",
      attrs: {
        placeholder: "收件人姓名"
      },
      label: "收件人姓名",
      prop: "receiverName",
    },
    {
      type: "input",
      attrs: {
        placeholder: "收件人电话"
      },
      label: "收件人电话",
      prop: "receiverPhone",
    },
    {
      type: "input",
      attrs: {
        placeholder: "收件地址"
      },
      label: "收件地址",
      prop: "receiverAddress",
    },
    {
      type: "input",
      attrs: {
        placeholder: "开票状态：0-未开票，1-开票中，2-已开票，3-已寄送"
      },
      rules: [{ required: true, message: "开票状态：0-未开票，1-开票中，2-已开票，3-已寄送不能为空", trigger: "blur" }],
      label: "开票状态：0-未开票，1-开票中，2-已开票，3-已寄送",
      prop: "invoiceStatus",
    },
    {
      type: "input",
      attrs: {
        placeholder: "开票时间"
      },
      label: "开票时间",
      prop: "invoiceTime",
    },
    {
      type: "input",
      attrs: {
        placeholder: "电子发票URL"
      },
      label: "电子发票URL",
      prop: "invoiceUrl",
    },
    {
      type: "input",
      attrs: {
        placeholder: "快递单号"
      },
      label: "快递单号",
      prop: "expressNo",
    },
  ],
  // 提交函数
  formAction: (data: RegistryInvoiceInfoForm) => {
    if (data.id) {
      // 编辑
      return RegistryInvoiceInfoAPI.update(data.id , data);
    } else {
      // 新增
      return RegistryInvoiceInfoAPI.create(data);
    }
  },
});

// 编辑配置
const editModalConfig: IModalConfig<RegistryInvoiceInfoForm> = reactive({
  permPrefix: "aioveuMallRegistryInvoiceInfo:registry-invoice-info",
  component: "drawer",
  drawer: {
    title: "编辑",
    size: 500,
  },
  pk: "id",
  formAction(data: any) {
    return RegistryInvoiceInfoAPI.update(data.id , data);
  },
  formItems: addModalConfig.formItems, // 复用新增的表单项
});

// 处理操作按钮点击
const handleOperateClick = (data: IObject) => {
  if (data.name === "edit") {
    handleEditClick(data.row, async () => {
      return await RegistryInvoiceInfoAPI.getFormData(data.row.id);
    });
  }
};

// 处理工具栏按钮点击（删除等）
const handleToolbarClick = (name: string) => {
  console.log(name);
};

</script>
