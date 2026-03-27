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
defineOptions({ name: "RegistryCertification" });

import RegistryCertificationAPI ,{ RegistryCertificationForm, RegistryCertificationPageQuery }
  from "@/api/aioveuMall/aioveuMallRegistry/aioveuMallRegistryCertification/registry-certification";
// import type { RegistryCertificationForm, RegistryCertificationPageQuery } from "@/api/types";
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
  permPrefix: "aioveuMallRegistryCertification:registry-certification",
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
      label: "认证状态：0-未开始，1-申请中，2-审核中，3-审核通过，4-审核失败，5-已过期",
      prop: "certificationStatus",
      attrs: {
        placeholder: "认证状态：0-未开始，1-申请中，2-审核中，3-审核通过，4-审核失败，5-已过期",
        clearable: true,
        style: { width: "200px" },
      },
    },
    {
      type: "input",
      label: "审核时间",
      prop: "auditTime",
      attrs: {
        placeholder: "审核时间",
        clearable: true,
        style: { width: "200px" },
      },
    },
  ],
});

// 列表配置
const contentConfig: IContentConfig<RegistryCertificationPageQuery> = reactive({
  // 权限前缀
  permPrefix: "aioveuMallRegistryCertification:registry-certification",
  table: {
    border: true,
    highlightCurrentRow: true,
  },
  // 主键
  pk: "id",
  // 列表查询接口
  indexAction: RegistryCertificationAPI.getPage,
  // 删除接口
  deleteAction: RegistryCertificationAPI.deleteByIds,
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
    { label: "认证ID ", prop: "id" },
    { label: "所属租户ID", prop: "tenantId" },
    { label: "小程序账号ID", prop: "appAccountId" },
    { label: "认证类型：1-微信认证", prop: "certificationType" },
    { label: "认证状态：0-未开始，1-申请中，2-审核中，3-审核通过，4-审核失败，5-已过期", prop: "certificationStatus" },
    { label: "申请时间", prop: "applyTime" },
    { label: "审核时间", prop: "auditTime" },
    { label: "过期时间", prop: "expireTime" },
    { label: "认证费用", prop: "certificationFee" },
    { label: "支付状态：0-未支付，1-支付中，2-支付成功，3-支付失败", prop: "paymentStatus" },
    { label: "支付时间", prop: "paymentTime" },
    { label: "支付订单号", prop: "paymentOrderNo" },
    { label: "审核驳回原因", prop: "rejectionReason" },
    { label: "审核备注", prop: "auditRemark" },
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
const addModalConfig: IModalConfig<RegistryCertificationForm> = reactive({
  // 权限前缀
  permPrefix: "aioveuMallRegistryCertification:registry-certification",
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
        placeholder: "认证ID "
      },
      label: "认证ID ",
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
        placeholder: "认证类型：1-微信认证"
      },
      label: "认证类型：1-微信认证",
      prop: "certificationType",
    },
    {
      type: "input",
      attrs: {
        placeholder: "认证状态：0-未开始，1-申请中，2-审核中，3-审核通过，4-审核失败，5-已过期"
      },
      rules: [{ required: true, message: "认证状态：0-未开始，1-申请中，2-审核中，3-审核通过，4-审核失败，5-已过期不能为空", trigger: "blur" }],
      label: "认证状态：0-未开始，1-申请中，2-审核中，3-审核通过，4-审核失败，5-已过期",
      prop: "certificationStatus",
    },
    {
      type: "input",
      attrs: {
        placeholder: "申请时间"
      },
      label: "申请时间",
      prop: "applyTime",
    },
    {
      type: "input",
      attrs: {
        placeholder: "审核时间"
      },
      label: "审核时间",
      prop: "auditTime",
    },
    {
      type: "input",
      attrs: {
        placeholder: "过期时间"
      },
      label: "过期时间",
      prop: "expireTime",
    },
    {
      type: "input",
      attrs: {
        placeholder: "认证费用"
      },
      rules: [{ required: true, message: "认证费用不能为空", trigger: "blur" }],
      label: "认证费用",
      prop: "certificationFee",
    },
    {
      type: "input",
      attrs: {
        placeholder: "支付状态：0-未支付，1-支付中，2-支付成功，3-支付失败"
      },
      rules: [{ required: true, message: "支付状态：0-未支付，1-支付中，2-支付成功，3-支付失败不能为空", trigger: "blur" }],
      label: "支付状态：0-未支付，1-支付中，2-支付成功，3-支付失败",
      prop: "paymentStatus",
    },
    {
      type: "input",
      attrs: {
        placeholder: "支付时间"
      },
      label: "支付时间",
      prop: "paymentTime",
    },
    {
      type: "input",
      attrs: {
        placeholder: "支付订单号"
      },
      label: "支付订单号",
      prop: "paymentOrderNo",
    },
    {
      type: "input",
      attrs: {
        placeholder: "审核驳回原因"
      },
      label: "审核驳回原因",
      prop: "rejectionReason",
    },
    {
      type: "input",
      attrs: {
        placeholder: "审核备注"
      },
      label: "审核备注",
      prop: "auditRemark",
    },
  ],
  // 提交函数
  formAction: (data: RegistryCertificationForm) => {
    if (data.id) {
      // 编辑
      return RegistryCertificationAPI.update(data.id, data);
    } else {
      // 新增
      return RegistryCertificationAPI.create(data);
    }
  },
});

// 编辑配置
const editModalConfig: IModalConfig<RegistryCertificationForm> = reactive({
  permPrefix: "aioveuMallRegistryCertification:registry-certification",
  component: "drawer",
  drawer: {
    title: "编辑",
    size: 500,
  },
  pk: "id",
  formAction(data: any) {
    return RegistryCertificationAPI.update(data.id , data);
  },
  formItems: addModalConfig.formItems, // 复用新增的表单项
});

// 处理操作按钮点击
const handleOperateClick = (data: IObject) => {
  if (data.name === "edit") {
    handleEditClick(data.row, async () => {
      return await RegistryCertificationAPI.getFormData(data.row.id);
    });
  }
};

// 处理工具栏按钮点击（删除等）
const handleToolbarClick = (name: string) => {
  console.log(name);
};

</script>
