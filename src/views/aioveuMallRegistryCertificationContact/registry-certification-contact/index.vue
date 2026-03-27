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
defineOptions({ name: "RegistryCertificationContact" });

import RegistryCertificationContactAPI ,{ RegistryCertificationContactForm, RegistryCertificationContactPageQuery }
  from "@/api/aioveuMall/aioveuMallRegistry/aioveuMallRegistryCertificationContact/registry-certification-contact";
// import type { RegistryCertificationContactForm, RegistryCertificationContactPageQuery } from "@/api/types";
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
  permPrefix: "aioveuMallRegistryCertificationContact:registry-certification-contact",
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
      label: "联系人姓名",
      prop: "contactName",
      attrs: {
        placeholder: "联系人姓名",
        clearable: true,
        style: { width: "200px" },
      },
    },
    {
      type: "input",
      label: "联系人身份证号",
      prop: "contactIdCard",
      attrs: {
        placeholder: "联系人身份证号",
        clearable: true,
        style: { width: "200px" },
      },
    },
    {
      type: "input",
      label: "联系人手机号",
      prop: "contactPhone",
      attrs: {
        placeholder: "联系人手机号",
        clearable: true,
        style: { width: "200px" },
      },
    },
  ],
});

// 列表配置
const contentConfig: IContentConfig<RegistryCertificationContactPageQuery> = reactive({
  // 权限前缀
  permPrefix: "aioveuMallRegistryCertificationContact:registry-certification-contact",
  table: {
    border: true,
    highlightCurrentRow: true,
  },
  // 主键
  pk: "id",
  // 列表查询接口
  indexAction: RegistryCertificationContactAPI.getPage,
  // 删除接口
  deleteAction: RegistryCertificationContactAPI.deleteByIds,
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
    { label: "联系人ID", prop: "id" },
    { label: "所属租户ID", prop: "tenantId" },
    { label: "认证记录ID", prop: "certificationId" },
    { label: "联系人姓名", prop: "contactName" },
    { label: "联系人身份证号", prop: "contactIdCard" },
    { label: "联系人手机号", prop: "contactPhone" },
    { label: "联系人短信验证码", prop: "contactPhoneVerifyCode" },
    { label: "联系人座机（含分机）", prop: "contactLandline" },
    { label: "联系人微信OpenID", prop: "contactWechatOpenid" },
    { label: "联系人微信扫码是否验证", prop: "contactWechatScanned" },
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
const addModalConfig: IModalConfig<RegistryCertificationContactForm> = reactive({
  // 权限前缀
  permPrefix: "aioveuMallRegistryCertificationContact:registry-certification-contact",
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
        placeholder: "联系人ID"
      },
      label: "联系人ID",
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
        placeholder: "联系人姓名"
      },
      rules: [{ required: true, message: "联系人姓名不能为空", trigger: "blur" }],
      label: "联系人姓名",
      prop: "contactName",
    },
    {
      type: "input",
      attrs: {
        placeholder: "联系人身份证号"
      },
      label: "联系人身份证号",
      prop: "contactIdCard",
    },
    {
      type: "input",
      attrs: {
        placeholder: "联系人手机号"
      },
      rules: [{ required: true, message: "联系人手机号不能为空", trigger: "blur" }],
      label: "联系人手机号",
      prop: "contactPhone",
    },
    {
      type: "input",
      attrs: {
        placeholder: "联系人短信验证码"
      },
      label: "联系人短信验证码",
      prop: "contactPhoneVerifyCode",
    },
    {
      type: "input",
      attrs: {
        placeholder: "联系人座机（含分机）"
      },
      label: "联系人座机（含分机）",
      prop: "contactLandline",
    },
    {
      type: "input",
      attrs: {
        placeholder: "联系人微信OpenID"
      },
      label: "联系人微信OpenID",
      prop: "contactWechatOpenid",
    },
    {
      type: "input",
      attrs: {
        placeholder: "联系人微信扫码是否验证"
      },
      label: "联系人微信扫码是否验证",
      prop: "contactWechatScanned",
    },
  ],
  // 提交函数
  formAction: (data: RegistryCertificationContactForm) => {
    if (data.id) {
      // 编辑
      return RegistryCertificationContactAPI.update(data.id , data);
    } else {
      // 新增
      return RegistryCertificationContactAPI.create(data);
    }
  },
});

// 编辑配置
const editModalConfig: IModalConfig<RegistryCertificationContactForm> = reactive({
  permPrefix: "aioveuMallRegistryCertificationContact:registry-certification-contact",
  component: "drawer",
  drawer: {
    title: "编辑",
    size: 500,
  },
  pk: "id",
  formAction(data: any) {
    return RegistryCertificationContactAPI.update(data.id , data);
  },
  formItems: addModalConfig.formItems, // 复用新增的表单项
});

// 处理操作按钮点击
const handleOperateClick = (data: IObject) => {
  if (data.name === "edit") {
    handleEditClick(data.row, async () => {
      return await RegistryCertificationContactAPI.getFormData(data.row.id);
    });
  }
};

// 处理工具栏按钮点击（删除等）
const handleToolbarClick = (name: string) => {
  console.log(name);
};

</script>
