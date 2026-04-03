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

      <!-- 为图片列添加自定义插槽（如果image类型不满足需求） -->
      <template #icon="{ row }">
        <el-image
          v-if="row.icon"
          style="width: 80px; height: 80px; border-radius: 4px;"
          :src="row.icon"
          :preview-src-list="[row.icon]"
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

    <!-- 新增 -->
    <page-modal ref="addModalRef" :modal-config="addModalConfig" @submit-click="handleSubmitClick">

      <!-- 自定义图片上传组件 -->
      <template #iconUpload="{ formData, setField }">
        <el-form-item label="菜单图标" prop="icon">
          <SingleImageUpload
            v-model="formData.icon"
            :maxFileSize="5"
            accept=".jpg,.jpeg,.png"
            :style="{ width: '200px', height: '200px' }"
            @change="(url: string) => setField('icon', url)"
          />
          <div class="upload-tips">
            最大图片大小：5MB，支持格式：JPG、JPEG、PNG
          </div>
        </el-form-item>
      </template>

    </page-modal>

    <!-- 编辑 -->
    <page-modal ref="editModalRef" :modal-config="editModalConfig" @submit-click="handleSubmitClick">

      <!-- 自定义图片上传组件 -->
      <template #iconUpload="{ formData, setField }">
        <el-form-item label="菜单图标" prop="icon">
          <SingleImageUpload
            v-model="formData.icon"
            :maxFileSize="5"
            accept=".jpg,.jpeg,.png"
            :style="{ width: '200px', height: '200px' }"
            @change="(url: string) => setField('icon', url)"
          />
          <div class="upload-tips">
            最大图片大小：5MB，支持格式：JPG、JPEG、PNG
          </div>
        </el-form-item>
      </template>

    </page-modal>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "ManagerMenuCategory" });

import ManagerMenuCategoryAPI ,{ ManagerMenuCategoryForm, ManagerMenuCategoryPageQuery }
  from "@/api/aioveuMall/aioveuMallTenant/aioveuMallManagerMenuCategory/manager-menu-category";
// import type { ManagerMenuCategoryForm, ManagerMenuCategoryPageQuery } from "@/api/types";
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
  permPrefix: "aioveuMallManagerMenuCategory:manager-menu-category",
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
      label: "分类标题",
      prop: "title",
      attrs: {
        placeholder: "分类标题",
        clearable: true,
        style: { width: "200px" },
      },
    },
    {
      type: "input",
      label: "状态：0-禁用，1-启用",
      prop: "status",
      attrs: {
        placeholder: "状态：0-禁用，1-启用",
        clearable: true,
        style: { width: "200px" },
      },
    },
    {
      type: "input",
      label: "分类类型：workbench-工作台，sidebar-侧边栏",
      prop: "type",
      attrs: {
        placeholder: "分类类型：workbench-工作台，sidebar-侧边栏",
        clearable: true,
        style: { width: "200px" },
      },
    },
    {
      type: "input",
      label: "是否可编辑：0-系统内置，1-可编辑",
      prop: "isEditable",
      attrs: {
        placeholder: "是否可编辑：0-系统内置，1-可编辑",
        clearable: true,
        style: { width: "200px" },
      },
    },
  ],
});

// 列表配置
const contentConfig: IContentConfig<ManagerMenuCategoryPageQuery> = reactive({
  // 权限前缀
  permPrefix: "aioveuMallManagerMenuCategory:manager-menu-category",
  table: {
    border: true,
    highlightCurrentRow: true,
  },
  // 主键
  pk: "id",
  // 列表查询接口
  indexAction: ManagerMenuCategoryAPI.getPage,
  // 删除接口
  deleteAction: ManagerMenuCategoryAPI.deleteByIds,
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
    { label: "主键ID", prop: "id" },
    { label: "租户ID，0表示平台默认", prop: "tenantId" },
    { label: "分类标题", prop: "title" },

    { label: "分类图标",
      prop: "icon",
      width: 100,
      templet: "image", // 使用插槽  // 使用image类型显示图片
      attrs: {
        style: "width: 80px; height: 80px;", // 自定义样式
        fit: "cover", // 填充方式
        lazy: true, // 懒加载
        hideOnClickModal: true, // 点击遮罩层关闭
        previewSrcList: (row:any) => [row.icon] // 预览图片列表
      },
      slotName: "icon" // 添加插槽名称，如果image类型不满足可以自定义
    },

    { label: "分类描述", prop: "description" },
    { label: "排序序号", prop: "sort" },
    { label: "状态：0-禁用，1-启用", prop: "status" },
    { label: "分类类型：workbench-工作台，sidebar-侧边栏", prop: "type" },
    { label: "可见范围：0-所有用户，1-租户管理员，2-普通用户", prop: "visibleRange" },
    { label: "是否可编辑：0-系统内置，1-可编辑", prop: "isEditable" },
    { label: "创建人ID", prop: "createBy" },
    { label: "更新人ID", prop: "updateBy" },
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
const addModalConfig: IModalConfig<ManagerMenuCategoryForm> = reactive({
  // 权限前缀
  permPrefix: "aioveuMallManagerMenuCategory:manager-menu-category",
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
        placeholder: "主键ID"
      },
      label: "主键ID",
      prop: "id",
    },
    {
      type: "input",
      attrs: {
        placeholder: "租户ID，0表示平台默认"
      },
      rules: [{ required: true, message: "租户ID，0表示平台默认不能为空", trigger: "blur" }],
      label: "租户ID，0表示平台默认",
      prop: "tenantId",
    },
    {
      type: "input",
      attrs: {
        placeholder: "分类标题"
      },
      rules: [{ required: true, message: "分类标题不能为空", trigger: "blur" }],
      label: "分类标题",
      prop: "title",
    },

    {
      type: "custom", // 使用自定义类型
      attrs: {
        placeholder: "分类图标"
      },
      label: "分类图标",
      prop: "icon",
      slotName: "iconUpload" // 指定插槽名称
    },



    {
      type: "input",
      attrs: {
        placeholder: "分类描述"
      },
      label: "分类描述",
      prop: "description",
    },
    {
      type: "input",
      attrs: {
        placeholder: "排序序号"
      },
      rules: [{ required: true, message: "排序序号不能为空", trigger: "blur" }],
      label: "排序序号",
      prop: "sort",
    },
    {
      type: "switch",
      attrs: {
        activeText: "启用",
        inactiveText: "禁用",
        activeValue: 1,
        inactiveValue: 0
      },
      initialValue: 1,
      label: "状态：0-禁用，1-启用",
      prop: "status",
    },
    {
      type: "input",
      attrs: {
        placeholder: "分类类型：workbench-工作台，sidebar-侧边栏"
      },
      label: "分类类型：workbench-工作台，sidebar-侧边栏",
      prop: "type",
    },
    {
      type: "input",
      attrs: {
        placeholder: "可见范围：0-所有用户，1-租户管理员，2-普通用户"
      },
      label: "可见范围：0-所有用户，1-租户管理员，2-普通用户",
      prop: "visibleRange",
    },
    {
      type: "input",
      attrs: {
        placeholder: "是否可编辑：0-系统内置，1-可编辑"
      },
      label: "是否可编辑：0-系统内置，1-可编辑",
      prop: "isEditable",
    },
    {
      type: "input",
      attrs: {
        placeholder: "创建人ID"
      },
      label: "创建人ID",
      prop: "createBy",
    },
    {
      type: "input",
      attrs: {
        placeholder: "更新人ID"
      },
      label: "更新人ID",
      prop: "updateBy",
    },
  ],
  // 提交函数
  formAction: (data: ManagerMenuCategoryForm) => {
    if (data.id) {
      // 编辑
      return ManagerMenuCategoryAPI.update(data.id , data);
    } else {
      // 新增
      return ManagerMenuCategoryAPI.create(data);
    }
  },
});

// 编辑配置
const editModalConfig: IModalConfig<ManagerMenuCategoryForm> = reactive({
  permPrefix: "aioveuMallManagerMenuCategory:manager-menu-category",
  component: "drawer",
  drawer: {
    title: "编辑",
    size: 800,
    // direction: "ltr", // 从左向右，表示左侧打开
  },
  // 设置表单标签位置为居左
  form: {
    labelWidth: 100,
    labelPosition: "left", // 标签居左
  },
  pk: "id",
  formAction(data: any) {
    return ManagerMenuCategoryAPI.update(data.id , data);
  },
  formItems: addModalConfig.formItems, // 复用新增的表单项
});

// 处理操作按钮点击
const handleOperateClick = (data: IObject) => {
  if (data.name === "edit") {
    handleEditClick(data.row, async () => {
      return await ManagerMenuCategoryAPI.getFormData(data.row.id);
    });
  }
};

// 处理工具栏按钮点击（删除等）
const handleToolbarClick = (name: string) => {
  console.log(name);
};

</script>
