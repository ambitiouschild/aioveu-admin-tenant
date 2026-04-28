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
    >
      <!-- 为图片列添加自定义插槽（如果image类型不满足需求） -->
      <template #icon="{ row }">
        <el-image
          v-if="row.homeIcon"
          style="width: 80px; height: 80px; border-radius: 4px"
          :src="row.homeIcon"
          :preview-src-list="[row.homeIcon]"
          fit="cover"
          lazy
          :preview-teleported="true"
          hide-on-click-modal
        >
          <template #placeholder>
            <div class="image-loading">
              <el-icon><Loading /></el-icon>
            </div>
          </template>
          <template #error>
            <div class="image-error">
              <el-icon><Picture /></el-icon>
              <span>加载失败</span>
            </div>
          </template>
        </el-image>
        <span v-else>-</span>
      </template>
    </page-content>

    <!-- 新增 label="菜单图标"-->
    <page-modal ref="addModalRef" :modal-config="addModalConfig" @submit-click="handleSubmitClick">
      <!-- 自定义图片上传组件 -->
      <template #iconUpload="{ formData, setField }">
        <el-form-item prop="icon">
          <SingleImageUpload
            v-model="formData.homeIcon"
            :maxFileSize="5"
            accept=".jpg,.jpeg,.png"
            :style="{ width: '200px', height: '200px' }"
            @change="(url: string) => setField('icon', url)"
          />
          <div class="upload-tips">最大图片大小：5MB，支持格式：JPG、JPEG、PNG</div>
        </el-form-item>
      </template>
    </page-modal>

    <!-- 编辑 label="菜单图标"-->
    <page-modal
      ref="editModalRef"
      :modal-config="editModalConfig"
      @submit-click="handleSubmitClick"
    >
      <!-- 自定义图片上传组件 -->
      <template #iconUpload="{ formData, setField }">
        <el-form-item prop="icon">
          <SingleImageUpload
            v-model="formData.homeIcon"
            :maxFileSize="5"
            accept=".jpg,.jpeg,.png"
            :style="{ width: '200px', height: '200px' }"
            @change="(url: string) => setField('icon', url)"
          />
          <div class="upload-tips">最大图片大小：5MB，支持格式：JPG、JPEG、PNG</div>
        </el-form-item>
      </template>
    </page-modal>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "ManagerMenuHomeCategory," });

import ManagerMenuHomeCategoryAPI, {
  ManagerMenuHomeCategoryForm,
  ManagerMenuHomeCategoryPageQuery,
} from "@/api/aioveuMall/aioveuMallTenant/aioveuMallManagerMenuHomeCategory/manager-menu-home-category";
// import type { ManagerMenuHomeCategoryForm, ManagerMenuHomeCategoryPageQuery } from "@/api/types";
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
  permPrefix: "aioveuMallManagerMenuHomeCategory:manager-menu-home-category",
  formItems: [
    {
      type: "input",
      label: "管理端app分类ID",
      prop: "categoryId",
      attrs: {
        placeholder: "管理端app分类ID",
        clearable: true,
        style: { width: "200px" },
      },
    },
    {
      type: "input",
      label: "管理端app首页显示的图标URL",
      prop: "homeIcon",
      attrs: {
        placeholder: "管理端app首页显示的图标URL",
        clearable: true,
        style: { width: "200px" },
      },
    },
    {
      type: "input",
      label: "管理端app首页显示名称",
      prop: "homeName",
      attrs: {
        placeholder: "管理端app首页显示名称",
        clearable: true,
        style: { width: "200px" },
      },
    },
    {
      type: "input",
      label: "状态：0-隐藏，1-显示",
      prop: "status",
      attrs: {
        placeholder: "状态：0-隐藏，1-显示",
        clearable: true,
        style: { width: "200px" },
      },
    },
  ],
});

// 列表配置
const contentConfig: IContentConfig<ManagerMenuHomeCategoryPageQuery> = reactive({
  // 权限前缀
  permPrefix: "aioveuMallManagerMenuHomeCategory:manager-menu-home-category",
  table: {
    border: true,
    highlightCurrentRow: true,
  },
  // 主键
  pk: "id",
  // 列表查询接口
  indexAction: ManagerMenuHomeCategoryAPI.getPage,
  // 删除接口
  deleteAction: ManagerMenuHomeCategoryAPI.deleteByIds,
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
    {
      label: "管理端app分类ID",
      width: 250, // 增加宽度以防止内容换行 // ✅ Element UI 支持 'auto'
      showOverflowTooltip: true, // 推荐：超出宽度显示 tooltip 提示
      prop: "categoryId",
    },
    // { label: "管理端app首页显示的图标URL", prop: "homeIcon" },

    {
      label: "管理端app首页显示的图标",
      prop: "homeIcon",
      width: 100,
      templet: "image", // 使用插槽  // 使用image类型显示图片
      attrs: {
        style: "width: 80px; height: 80px;", // 自定义样式
        fit: "cover", // 填充方式
        lazy: true, // 懒加载
        hideOnClickModal: true, // 点击遮罩层关闭
        previewSrcList: (row: any) => [row.icon], // 预览图片列表
      },
      slotName: "icon", // 添加插槽名称，如果image类型不满足可以自定义
    },

    {
      label: "管理端app首页显示名称",
      width: 250, // 增加宽度以防止内容换行 // ✅ Element UI 支持 'auto'
      showOverflowTooltip: true, // 推荐：超出宽度显示 tooltip 提示
      prop: "homeName",
    },
    {
      label: "跳转路径",
      width: 250, // 增加宽度以防止内容换行 // ✅ Element UI 支持 'auto'
      showOverflowTooltip: true, // 推荐：超出宽度显示 tooltip 提示
      prop: "jumpPath",
    },
    {
      label: "跳转类型：navigateTo, redirectTo, switchTab",
      width: 250, // 增加宽度以防止内容换行 // ✅ Element UI 支持 'auto'
      showOverflowTooltip: true, // 推荐：超出宽度显示 tooltip 提示
      prop: "jumpType",
    },
    {
      label: "排序",
      width: 250, // 增加宽度以防止内容换行 // ✅ Element UI 支持 'auto'
      showOverflowTooltip: true, // 推荐：超出宽度显示 tooltip 提示
      prop: "sort",
    },
    {
      label: "状态：0-隐藏，1-显示",
      width: 250, // 增加宽度以防止内容换行 // ✅ Element UI 支持 'auto'
      showOverflowTooltip: true, // 推荐：超出宽度显示 tooltip 提示
      prop: "status",
    },
    {
      label: "备注",
      width: 250, // 增加宽度以防止内容换行 // ✅ Element UI 支持 'auto'
      showOverflowTooltip: true, // 推荐：超出宽度显示 tooltip 提示
      prop: "remark",
    },
    {
      label: "创建时间",
      width: 250, // 增加宽度以防止内容换行 // ✅ Element UI 支持 'auto'
      showOverflowTooltip: true, // 推荐：超出宽度显示 tooltip 提示
      prop: "createTime",
    },
    {
      label: "更新时间",
      width: 250, // 增加宽度以防止内容换行 // ✅ Element UI 支持 'auto'
      showOverflowTooltip: true, // 推荐：超出宽度显示 tooltip 提示
      prop: "updateTime",
    },
    { label: "逻辑删除：0-正常 1-删除", prop: "deleted" },
    { label: "版本号（用于乐观锁）", prop: "version" },
    { label: "租户ID", prop: "tenantId" },
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
const addModalConfig: IModalConfig<ManagerMenuHomeCategoryForm> = reactive({
  // 权限前缀
  permPrefix: "aioveuMallManagerMenuHomeCategory:manager-menu-home-category",
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
        placeholder: "管理端app分类ID",
      },
      label: "管理端app分类ID",
      prop: "categoryId",
    },
    {
      type: "custom",
      attrs: {
        placeholder: "管理端app首页显示的图标URL",
      },
      rules: [{ required: true, message: "管理端app首页显示的图标URL不能为空", trigger: "blur" }],
      label: "管理端app首页显示的图标URL",
      prop: "homeIcon",
      slotName: "iconUpload", // 指定插槽名称
    },

    {
      type: "input",
      attrs: {
        placeholder: "管理端app首页显示名称",
      },
      rules: [{ required: true, message: "管理端app首页显示名称不能为空", trigger: "blur" }],
      label: "管理端app首页显示名称",
      prop: "homeName",
    },
    {
      type: "input",
      attrs: {
        placeholder: "跳转路径",
      },
      label: "跳转路径",
      prop: "jumpPath",
    },
    {
      type: "input",
      attrs: {
        placeholder: "跳转类型：navigateTo, redirectTo, switchTab",
      },
      label: "跳转类型：navigateTo, redirectTo, switchTab",
      prop: "jumpType",
    },
    {
      type: "input",
      attrs: {
        placeholder: "排序",
      },
      label: "排序",
      prop: "sort",
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
      label: "状态：0-隐藏，1-显示",
      prop: "status",
    },
    {
      type: "input",
      attrs: {
        placeholder: "备注",
      },
      label: "备注",
      prop: "remark",
    },
  ],
  // 提交函数
  formAction: (data: ManagerMenuHomeCategoryForm) => {
    if (data.id) {
      // 编辑
      return ManagerMenuHomeCategoryAPI.update(data.id, data);
    } else {
      // 新增
      return ManagerMenuHomeCategoryAPI.create(data);
    }
  },
});

// 编辑配置
const editModalConfig: IModalConfig<ManagerMenuHomeCategoryForm> = reactive({
  permPrefix: "aioveuMallManagerMenuHomeCategory:manager-menu-home-category",
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
    return ManagerMenuHomeCategoryAPI.update(data.id, data);
  },
  formItems: addModalConfig.formItems, // 复用新增的表单项
});

// 处理操作按钮点击
const handleOperateClick = (data: IObject) => {
  if (data.name === "edit") {
    handleEditClick(data.row, async () => {
      return await ManagerMenuHomeCategoryAPI.getFormData(data.row.id);
    });
  }
};

// 处理工具栏按钮点击（删除等）
const handleToolbarClick = (name: string) => {
  console.log(name);
};
</script>
