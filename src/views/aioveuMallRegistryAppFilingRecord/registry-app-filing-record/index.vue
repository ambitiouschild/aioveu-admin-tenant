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
defineOptions({ name: "RegistryAppFilingRecord" });

import RegistryAppFilingRecordAPI ,{ RegistryAppFilingRecordForm, RegistryAppFilingRecordPageQuery }
  from "@/api/aioveuMall/aioveuMallRegistry/aioveuMallRegistryAppFilingRecord/registry-app-filing-record";
// import type { RegistryAppFilingRecordForm, RegistryAppFilingRecordPageQuery } from "@/api/types";
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
  permPrefix: "aioveuMallRegistryAppFilingRecord:registry-app-filing-record",
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
      label: "小程序账号ID",
      prop: "appAccountId",
      attrs: {
        placeholder: "小程序账号ID",
        clearable: true,
        style: { width: "200px" },
      },
    },
    {
      type: "input",
      label: "备案类型：1-首次备案，2-变更备案，3-注销备案",
      prop: "filingType",
      attrs: {
        placeholder: "备案类型：1-首次备案，2-变更备案，3-注销备案",
        clearable: true,
        style: { width: "200px" },
      },
    },
    {
      type: "input",
      label: "备案状态：0-未备案，1-备案中，2-备案通过，3-备案驳回，4-已注销",
      prop: "filingStatus",
      attrs: {
        placeholder: "备案状态：0-未备案，1-备案中，2-备案通过，3-备案驳回，4-已注销",
        clearable: true,
        style: { width: "200px" },
      },
    },
    {
      type: "input",
      label: "备案编号",
      prop: "filingNo",
      attrs: {
        placeholder: "备案编号",
        clearable: true,
        style: { width: "200px" },
      },
    },
    {
      type: "input",
      label: "备案主体",
      prop: "filingSubject",
      attrs: {
        placeholder: "备案主体",
        clearable: true,
        style: { width: "200px" },
      },
    },
    {
      type: "input",
      label: "备案小程序名称",
      prop: "filingAppName",
      attrs: {
        placeholder: "备案小程序名称",
        clearable: true,
        style: { width: "200px" },
      },
    },
    {
      type: "input",
      label: "备案申请时间",
      prop: "applyTime",
      attrs: {
        placeholder: "备案申请时间",
        clearable: true,
        style: { width: "200px" },
      },
    },
  ],
});

// 列表配置
const contentConfig: IContentConfig<RegistryAppFilingRecordPageQuery> = reactive({
  // 权限前缀
  permPrefix: "aioveuMallRegistryAppFilingRecord:registry-app-filing-record",
  table: {
    border: true,
    highlightCurrentRow: true,
  },
  // 主键
  pk: "id",
  // 列表查询接口
  indexAction: RegistryAppFilingRecordAPI.getPage,
  // 删除接口
  deleteAction: RegistryAppFilingRecordAPI.deleteByIds,
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
    { label: "备案ID", prop: "id" },
    { label: "所属租户ID", prop: "tenantId" },
    { label: "小程序账号ID", prop: "appAccountId" },
    { label: "备案类型：1-首次备案，2-变更备案，3-注销备案", prop: "filingType" },
    { label: "备案状态：0-未备案，1-备案中，2-备案通过，3-备案驳回，4-已注销", prop: "filingStatus" },
    { label: "备案编号", prop: "filingNo" },
    { label: "备案主体", prop: "filingSubject" },
    { label: "备案小程序名称", prop: "filingAppName" },
    { label: "备案域名", prop: "filingDomain" },
    { label: "备案IP", prop: "filingIp" },
    { label: "备案证书路径", prop: "filingCertificatePath" },
    { label: "备案申请时间", prop: "applyTime" },
    { label: "备案审核时间", prop: "auditTime" },
    { label: "备案驳回原因", prop: "rejectionReason" },
    { label: "备案到期时间", prop: "expireTime" },
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
const addModalConfig: IModalConfig<RegistryAppFilingRecordForm> = reactive({
  // 权限前缀
  permPrefix: "aioveuMallRegistryAppFilingRecord:registry-app-filing-record",
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
        placeholder: "备案ID"
      },
      label: "备案ID",
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
        placeholder: "小程序账号ID"
      },
      rules: [{ required: true, message: "小程序账号ID不能为空", trigger: "blur" }],
      label: "小程序账号ID",
      prop: "appAccountId",
    },
    {
      type: "input",
      attrs: {
        placeholder: "备案类型：1-首次备案，2-变更备案，3-注销备案"
      },
      rules: [{ required: true, message: "备案类型：1-首次备案，2-变更备案，3-注销备案不能为空", trigger: "blur" }],
      label: "备案类型：1-首次备案，2-变更备案，3-注销备案",
      prop: "filingType",
    },
    {
      type: "input",
      attrs: {
        placeholder: "备案状态：0-未备案，1-备案中，2-备案通过，3-备案驳回，4-已注销"
      },
      rules: [{ required: true, message: "备案状态：0-未备案，1-备案中，2-备案通过，3-备案驳回，4-已注销不能为空", trigger: "blur" }],
      label: "备案状态：0-未备案，1-备案中，2-备案通过，3-备案驳回，4-已注销",
      prop: "filingStatus",
    },
    {
      type: "input",
      attrs: {
        placeholder: "备案编号"
      },
      label: "备案编号",
      prop: "filingNo",
    },
    {
      type: "input",
      attrs: {
        placeholder: "备案主体"
      },
      label: "备案主体",
      prop: "filingSubject",
    },
    {
      type: "input",
      attrs: {
        placeholder: "备案小程序名称"
      },
      label: "备案小程序名称",
      prop: "filingAppName",
    },
    {
      type: "input",
      attrs: {
        placeholder: "备案域名"
      },
      label: "备案域名",
      prop: "filingDomain",
    },
    {
      type: "input",
      attrs: {
        placeholder: "备案IP"
      },
      label: "备案IP",
      prop: "filingIp",
    },
    {
      type: "input",
      attrs: {
        placeholder: "备案证书路径"
      },
      label: "备案证书路径",
      prop: "filingCertificatePath",
    },
    {
      type: "input",
      attrs: {
        placeholder: "备案申请时间"
      },
      label: "备案申请时间",
      prop: "applyTime",
    },
    {
      type: "input",
      attrs: {
        placeholder: "备案审核时间"
      },
      label: "备案审核时间",
      prop: "auditTime",
    },
    {
      type: "input",
      attrs: {
        placeholder: "备案驳回原因"
      },
      label: "备案驳回原因",
      prop: "rejectionReason",
    },
    {
      type: "input",
      attrs: {
        placeholder: "备案到期时间"
      },
      label: "备案到期时间",
      prop: "expireTime",
    },
  ],
  // 提交函数
  formAction: (data: RegistryAppFilingRecordForm) => {
    if (data.id) {
      // 编辑
      return RegistryAppFilingRecordAPI.update(data.id , data);
    } else {
      // 新增
      return RegistryAppFilingRecordAPI.create(data);
    }
  },
});

// 编辑配置
const editModalConfig: IModalConfig<RegistryAppFilingRecordForm> = reactive({
  permPrefix: "aioveuMallRegistryAppFilingRecord:registry-app-filing-record",
  component: "drawer",
  drawer: {
    title: "编辑",
    size: 500,
  },
  pk: "id",
  formAction(data: any) {
    return RegistryAppFilingRecordAPI.update(data.id , data);
  },
  formItems: addModalConfig.formItems, // 复用新增的表单项
});

// 处理操作按钮点击
const handleOperateClick = (data: IObject) => {
  if (data.name === "edit") {
    handleEditClick(data.row, async () => {
      return await RegistryAppFilingRecordAPI.getFormData(data.row.id);
    });
  }
};

// 处理工具栏按钮点击（删除等）
const handleToolbarClick = (name: string) => {
  console.log(name);
};

</script>
