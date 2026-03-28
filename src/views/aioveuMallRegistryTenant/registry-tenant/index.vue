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
defineOptions({ name: "RegistryTenant" });

import RegistryTenantAPI ,{ RegistryTenantForm, RegistryTenantPageQuery } from
    "@/api/aioveuMall/aioveuMallRegistry/aioveuMallRegistryTenant/registry-tenant";
// import type { RegistryTenantForm, RegistryTenantPageQuery } from "@/api/types";
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
  permPrefix: "aioveuMallRegistryTenant:registry-tenant",
  formItems: [
    {
      type: "select",  // 改为select类型
      label: "租户",
      prop: "tenantId",  // 保持prop为tenantId
      attrs: {
        placeholder: "请选择租户",
        clearable: true,
        filterable: true,  // 可搜索
        style: { width: "200px" },
        options: []  // 动态加载租户选项
      },
    },
    {
      type: "input",
      label: "租户ID",
      prop: "tenantId",
      attrs: {
        placeholder: "租户ID",
        clearable: true,
        style: { width: "200px" },
      },
    },
    {
      type: "input",
      label: "租户唯一编码",
      prop: "tenantCode",
      attrs: {
        placeholder: "租户唯一编码",
        clearable: true,
        style: { width: "200px" },
      },
    },
    {
      type: "input",
      label: "租户注册状态：0-未注册，1-已注册，2-已认证，3-已备案，4-已禁用",
      prop: "tenantRegistryStatus",
      attrs: {
        placeholder: "租户注册状态：0-未注册，1-已注册，2-已认证，3-已备案，4-已禁用",
        clearable: true,
        style: { width: "200px" },
      },
    },
  ],
});

// 列表配置
const contentConfig: IContentConfig<RegistryTenantPageQuery> = reactive({
  // 权限前缀
  permPrefix: "aioveuMallRegistryTenant:registry-tenant",
  table: {
    border: true,
    highlightCurrentRow: true,
  },
  // 主键
  pk: "id",
  // 列表查询接口
  indexAction: RegistryTenantAPI.getPage,
  // 删除接口
  deleteAction: RegistryTenantAPI.deleteByIds,
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
    { label: "", prop: "id" },
    { label: "租户ID", prop: "tenantId" },
    { label: "租户唯一编码", prop: "tenantCode" },
    { label: "主体类型：1-企业，2-个体工商户，3-政府/媒体，4-其他组织，5-个人", prop: "tenantType" },
    { label: "行业类别/小程序类目", prop: "businessType" },
    { label: "注册国家/地区", prop: "countryRegion" },
    { label: "租户注册状态：0-未注册，1-已注册，2-已认证，3-已备案，4-已禁用", prop: "tenantRegistryStatus" },
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
const addModalConfig: IModalConfig<RegistryTenantForm> = reactive({
  // 权限前缀
  permPrefix: "aioveuMallRegistryTenant:registry-tenant",
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
        placeholder: ""
      },
      label: "",
      prop: "id",
    },
    {
      type: "input",
      attrs: {
        placeholder: "租户ID"
      },
      rules: [{ required: true, message: "租户ID不能为空", trigger: "blur" }],
      label: "租户ID",
      prop: "tenantId",
    },
    {
      type: "input",
      attrs: {
        placeholder: "租户唯一编码"
      },
      rules: [{ required: true, message: "租户唯一编码不能为空", trigger: "blur" }],
      label: "租户唯一编码",
      prop: "tenantCode",
    },
    {
      type: "input",
      attrs: {
        placeholder: "主体类型：1-企业，2-个体工商户，3-政府/媒体，4-其他组织，5-个人"
      },
      label: "主体类型：1-企业，2-个体工商户，3-政府/媒体，4-其他组织，5-个人",
      prop: "tenantType",
    },
    {
      type: "input",
      attrs: {
        placeholder: "行业类别/小程序类目"
      },
      label: "行业类别/小程序类目",
      prop: "businessType",
    },
    {
      type: "input",
      attrs: {
        placeholder: "注册国家/地区"
      },
      label: "注册国家/地区",
      prop: "countryRegion",
    },
    {
      type: "input",
      attrs: {
        placeholder: "租户注册状态：0-未注册，1-已注册，2-已认证，3-已备案，4-已禁用"
      },
      rules: [{ required: true, message: "租户注册状态：0-未注册，1-已注册，2-已认证，3-已备案，4-已禁用不能为空", trigger: "blur" }],
      label: "租户注册状态：0-未注册，1-已注册，2-已认证，3-已备案，4-已禁用",
      prop: "tenantRegistryStatus",
    },
  ],
  // 提交函数
  formAction: (data: RegistryTenantForm) => {
    if (data.id) {
      // 编辑
      return RegistryTenantAPI.update(data.id, data);
    } else {
      // 新增
      return RegistryTenantAPI.create(data);
    }
  },
});

// 编辑配置
const editModalConfig: IModalConfig<RegistryTenantForm> = reactive({
  permPrefix: "aioveuMallRegistryTenant:registry-tenant",
  component: "drawer",
  drawer: {
    title: "编辑",
    size: 500,
  },
  pk: "id",
  formAction(data: any) {
    return RegistryTenantAPI.update(data.id, data);
  },
  formItems: addModalConfig.formItems, // 复用新增的表单项
});

// 处理操作按钮点击
const handleOperateClick = (data: IObject) => {
  if (data.name === "edit") {
    handleEditClick(data.row, async () => {
      return await RegistryTenantAPI.getFormData(data.row.id);
    });
  }
};

// 处理工具栏按钮点击（删除等）
const handleToolbarClick = (name: string) => {
  console.log(name);
};


// 租户选项
const tenantOptions = ref<Array<{label: string, value: string}>>([]);

// 加载租户列表
const loadTenantOptions = async () => {
  try {
    // 调用租户列表接口
    const response = await TenantAPI.getTenantList({
      pageSize: 1000,  // 获取所有租户
      currentPage: 1
    });

    tenantOptions.value = response.data.list.map((tenant: any) => ({
      label: `${tenant.tenantName} (${tenant.tenantCode})`,  // 显示名称和编码
      value: tenant.id  // 值仍然是租户ID
    }));

    // 将选项设置到搜索配置中
    const tenantSearchItem = searchConfig.formItems.find(
      (item: any) => item.prop === 'tenantId'
    );
    if (tenantSearchItem && tenantSearchItem.attrs) {
      tenantSearchItem.attrs.options = tenantOptions.value;
    }
  } catch (error) {
    console.error('加载租户列表失败:', error);
  }
};

// 在组件挂载时加载租户选项
onMounted(() => {
  loadTenantOptions();
});


</script>
