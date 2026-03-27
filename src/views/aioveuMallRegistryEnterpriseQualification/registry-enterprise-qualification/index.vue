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
defineOptions({ name: "RegistryEnterpriseQualification" });

import RegistryEnterpriseQualificationAPI ,{ RegistryEnterpriseQualificationForm, RegistryEnterpriseQualificationPageQuery }
  from "@/api/aioveuMall/aioveuMallRegistry/aioveuMallRegistryEnterpriseQualification/registry-enterprise-qualification";
// import type { RegistryEnterpriseQualificationForm, RegistryEnterpriseQualificationPageQuery } from "@/api/types";
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
  permPrefix: "aioveuMallRegistryEnterpriseQualification:registry-enterprise-qualification",
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
      label: "企业名称（营业执照全称）",
      prop: "enterpriseName",
      attrs: {
        placeholder: "企业名称（营业执照全称）",
        clearable: true,
        style: { width: "200px" },
      },
    },
    {
      type: "input",
      label: "营业执照注册号/统一社会信用代码",
      prop: "businessLicenseNo",
      attrs: {
        placeholder: "营业执照注册号/统一社会信用代码",
        clearable: true,
        style: { width: "200px" },
      },
    },
    {
      type: "input",
      label: "主体验证方式：1-小额打款，2-微信认证，3-电子营业执照",
      prop: "verificationType",
      attrs: {
        placeholder: "主体验证方式：1-小额打款，2-微信认证，3-电子营业执照",
        clearable: true,
        style: { width: "200px" },
      },
    },
    {
      type: "input",
      label: "验证状态：0-未验证，1-验证中，2-验证成功，3-验证失败",
      prop: "verificationStatus",
      attrs: {
        placeholder: "验证状态：0-未验证，1-验证中，2-验证成功，3-验证失败",
        clearable: true,
        style: { width: "200px" },
      },
    },
  ],
});

// 列表配置
const contentConfig: IContentConfig<RegistryEnterpriseQualificationPageQuery> = reactive({
  // 权限前缀
  permPrefix: "aioveuMallRegistryEnterpriseQualification:registry-enterprise-qualification",
  table: {
    border: true,
    highlightCurrentRow: true,
  },
  // 主键
  pk: "id",
  // 列表查询接口
  indexAction: RegistryEnterpriseQualificationAPI.getPage,
  // 删除接口
  deleteAction: RegistryEnterpriseQualificationAPI.deleteByIds,
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
    { label: "资质ID", prop: "id" },
    { label: "所属租户ID", prop: "tenantId" },
    { label: "企业名称（营业执照全称）", prop: "enterpriseName" },
    { label: "营业执照注册号/统一社会信用代码", prop: "businessLicenseNo" },
    { label: "营业执照照片路径", prop: "businessLicenseUrl" },
    { label: "其他证明材料（JSON数组）", prop: "otherCertificates" },
    { label: "主体验证方式：1-小额打款，2-微信认证，3-电子营业执照", prop: "verificationType" },
    { label: "小额打款金额", prop: "verificationAmount" },
    { label: "验证状态：0-未验证，1-验证中，2-验证成功，3-验证失败", prop: "verificationStatus" },
    { label: "验证时间", prop: "verificationTime" },
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
const addModalConfig: IModalConfig<RegistryEnterpriseQualificationForm> = reactive({
  // 权限前缀
  permPrefix: "aioveuMallRegistryEnterpriseQualification:registry-enterprise-qualification",
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
        placeholder: "资质ID"
      },
      label: "资质ID",
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
        placeholder: "企业名称（营业执照全称）"
      },
      rules: [{ required: true, message: "企业名称（营业执照全称）不能为空", trigger: "blur" }],
      label: "企业名称（营业执照全称）",
      prop: "enterpriseName",
    },
    {
      type: "input",
      attrs: {
        placeholder: "营业执照注册号/统一社会信用代码"
      },
      rules: [{ required: true, message: "营业执照注册号/统一社会信用代码不能为空", trigger: "blur" }],
      label: "营业执照注册号/统一社会信用代码",
      prop: "businessLicenseNo",
    },
    {
      type: "input",
      attrs: {
        placeholder: "营业执照照片路径"
      },
      label: "营业执照照片路径",
      prop: "businessLicenseUrl",
    },
    {
      type: "input",
      attrs: {
        placeholder: "其他证明材料（JSON数组）"
      },
      label: "其他证明材料（JSON数组）",
      prop: "otherCertificates",
    },
    {
      type: "input",
      attrs: {
        placeholder: "主体验证方式：1-小额打款，2-微信认证，3-电子营业执照"
      },
      label: "主体验证方式：1-小额打款，2-微信认证，3-电子营业执照",
      prop: "verificationType",
    },
    {
      type: "input",
      attrs: {
        placeholder: "小额打款金额"
      },
      label: "小额打款金额",
      prop: "verificationAmount",
    },
    {
      type: "input",
      attrs: {
        placeholder: "验证状态：0-未验证，1-验证中，2-验证成功，3-验证失败"
      },
      rules: [{ required: true, message: "验证状态：0-未验证，1-验证中，2-验证成功，3-验证失败不能为空", trigger: "blur" }],
      label: "验证状态：0-未验证，1-验证中，2-验证成功，3-验证失败",
      prop: "verificationStatus",
    },
    {
      type: "input",
      attrs: {
        placeholder: "验证时间"
      },
      label: "验证时间",
      prop: "verificationTime",
    },
  ],
  // 提交函数
  formAction: (data: RegistryEnterpriseQualificationForm) => {
    if (data.id) {
      // 编辑
      return RegistryEnterpriseQualificationAPI.update(data.id, data);
    } else {
      // 新增
      return RegistryEnterpriseQualificationAPI.create(data);
    }
  },
});

// 编辑配置
const editModalConfig: IModalConfig<RegistryEnterpriseQualificationForm> = reactive({
  permPrefix: "aioveuMallRegistryEnterpriseQualification:registry-enterprise-qualification",
  component: "drawer",
  drawer: {
    title: "编辑",
    size: 500,
  },
  pk: "id",
  formAction(data: any) {
    return RegistryEnterpriseQualificationAPI.update(data.id, data);
  },
  formItems: addModalConfig.formItems, // 复用新增的表单项
});

// 处理操作按钮点击
const handleOperateClick = (data: IObject) => {
  if (data.name === "edit") {
    handleEditClick(data.row, async () => {
      return await RegistryEnterpriseQualificationAPI.getFormData(data.row.id);
    });
  }
};

// 处理工具栏按钮点击（删除等）
const handleToolbarClick = (name: string) => {
  console.log(name);
};

</script>
