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
defineOptions({ name: "RegistryAdministratorInfo" });

import RegistryAdministratorInfoAPI,{ RegistryAdministratorInfoForm, RegistryAdministratorInfoPageQuery }
  from "@/api/aioveuMall/aioveuMallRegistry/aioveuMallRegistryAdministratorInfo/registry-administrator-info";
// import type { RegistryAdministratorInfoForm, RegistryAdministratorInfoPageQuery } from "@/api/types";
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
  permPrefix: "aioveuMallRegistryAdministratorInfo:registry-administrator-info",
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
      label: "管理员真实姓名",
      prop: "realName",
      attrs: {
        placeholder: "管理员真实姓名",
        clearable: true,
        style: { width: "200px" },
      },
    },
    {
      type: "input",
      label: "身份证号码",
      prop: "idCardNo",
      attrs: {
        placeholder: "身份证号码",
        clearable: true,
        style: { width: "200px" },
      },
    },
    {
      type: "input",
      label: "手机号码",
      prop: "phone",
      attrs: {
        placeholder: "手机号码",
        clearable: true,
        style: { width: "200px" },
      },
    },
  ],
});

// 列表配置
const contentConfig: IContentConfig<RegistryAdministratorInfoPageQuery> = reactive({
  // 权限前缀
  permPrefix: "aioveuMallRegistryAdministratorInfo:registry-administrator-info",
  table: {
    border: true,
    highlightCurrentRow: true,
  },
  // 主键
  pk: "id",
  // 列表查询接口
  indexAction: RegistryAdministratorInfoAPI.getPage,
  // 删除接口
  deleteAction: RegistryAdministratorInfoAPI.deleteByIds,
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
    { label: "管理员ID", prop: "id" },
    { label: "所属租户ID", prop: "tenantId" },
    { label: "管理员真实姓名", prop: "realName" },
    { label: "身份证号码", prop: "idCardNo" },
    { label: "身份证正面照片", prop: "idCardFrontPath" },
    { label: "身份证反面照片", prop: "idCardBackPath" },
    { label: "手机号码", prop: "phone" },
    { label: "短信验证码", prop: "phoneVerifyCode" },
    { label: "手机是否已验证：0-未验证，1-已验证", prop: "phoneVerified" },
    { label: "管理员微信OpenID", prop: "wechatOpenid" },
    { label: "管理员微信UnionID", prop: "wechatUnionid" },
    { label: "微信扫码是否已验证", prop: "wechatQrScanned" },
    { label: "微信扫码验证时间", prop: "wechatScannedTime" },
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
const addModalConfig: IModalConfig<RegistryAdministratorInfoForm> = reactive({
  // 权限前缀
  permPrefix: "aioveuMallRegistryAdministratorInfo:registry-administrator-info",
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
        placeholder: "管理员ID"
      },
      label: "管理员ID",
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
        placeholder: "管理员真实姓名"
      },
      rules: [{ required: true, message: "管理员真实姓名不能为空", trigger: "blur" }],
      label: "管理员真实姓名",
      prop: "realName",
    },
    {
      type: "input",
      attrs: {
        placeholder: "身份证号码"
      },
      rules: [{ required: true, message: "身份证号码不能为空", trigger: "blur" }],
      label: "身份证号码",
      prop: "idCardNo",
    },
    {
      type: "input",
      attrs: {
        placeholder: "身份证正面照片"
      },
      label: "身份证正面照片",
      prop: "idCardFrontPath",
    },
    {
      type: "input",
      attrs: {
        placeholder: "身份证反面照片"
      },
      label: "身份证反面照片",
      prop: "idCardBackPath",
    },
    {
      type: "input",
      attrs: {
        placeholder: "手机号码"
      },
      rules: [{ required: true, message: "手机号码不能为空", trigger: "blur" }],
      label: "手机号码",
      prop: "phone",
    },
    {
      type: "input",
      attrs: {
        placeholder: "短信验证码"
      },
      label: "短信验证码",
      prop: "phoneVerifyCode",
    },
    {
      type: "input",
      attrs: {
        placeholder: "手机是否已验证：0-未验证，1-已验证"
      },
      rules: [{ required: true, message: "手机是否已验证：0-未验证，1-已验证不能为空", trigger: "blur" }],
      label: "手机是否已验证：0-未验证，1-已验证",
      prop: "phoneVerified",
    },
    {
      type: "input",
      attrs: {
        placeholder: "管理员微信OpenID"
      },
      label: "管理员微信OpenID",
      prop: "wechatOpenid",
    },
    {
      type: "input",
      attrs: {
        placeholder: "管理员微信UnionID"
      },
      label: "管理员微信UnionID",
      prop: "wechatUnionid",
    },
    {
      type: "input",
      attrs: {
        placeholder: "微信扫码是否已验证"
      },
      rules: [{ required: true, message: "微信扫码是否已验证不能为空", trigger: "blur" }],
      label: "微信扫码是否已验证",
      prop: "wechatQrScanned",
    },
    {
      type: "input",
      attrs: {
        placeholder: "微信扫码验证时间"
      },
      label: "微信扫码验证时间",
      prop: "wechatScannedTime",
    },
  ],
  // 提交函数
  formAction: (data: RegistryAdministratorInfoForm) => {
    if (data.id) {
      // 编辑
      return RegistryAdministratorInfoAPI.update(data.id, data);
    } else {
      // 新增
      return RegistryAdministratorInfoAPI.create(data);
    }
  },
});

// 编辑配置
const editModalConfig: IModalConfig<RegistryAdministratorInfoForm> = reactive({
  permPrefix: "aioveuMallRegistryAdministratorInfo:registry-administrator-info",
  component: "drawer",
  drawer: {
    title: "编辑",
    size: 500,
  },
  pk: "id",
  formAction(data: any) {
    return RegistryAdministratorInfoAPI.update(data.id, data);
  },
  formItems: addModalConfig.formItems, // 复用新增的表单项
});

// 处理操作按钮点击
const handleOperateClick = (data: IObject) => {
  if (data.name === "edit") {
    handleEditClick(data.row, async () => {
      return await RegistryAdministratorInfoAPI.getFormData(data.row.id);
    });
  }
};

// 处理工具栏按钮点击（删除等）
const handleToolbarClick = (name: string) => {
  console.log(name);
};

</script>
