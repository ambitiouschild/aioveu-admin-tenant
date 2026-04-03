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


      <!-- 自定义图片上传组件 label="菜单图标" -->
      <template #iconUpload="{ formData, setField }">
        <el-form-item  prop="icon">
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

      <!-- 自定义图片上传组件 label="菜单图标" -->
      <template #iconUpload="{ formData, setField }">
        <el-form-item  prop="icon">
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
defineOptions({ name: "ManagerMenuCategoryItem" });

import ManagerMenuCategoryItemAPI ,{ ManagerMenuCategoryItemForm, ManagerMenuCategoryItemPageQuery }
  from "@/api/aioveuMall/aioveuMallTenant/aioveuMallManagerMenuCategoryItem/manager-menu-category-item";
// import type { ManagerMenuCategoryItemForm, ManagerMenuCategoryItemPageQuery } from "@/api/types";
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
  permPrefix: "aioveuMallManagerMenuCategoryItem:manager-menu-category-item",
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
      label: "分类ID",
      prop: "categoryId",
      attrs: {
        placeholder: "分类ID",
        clearable: true,
        style: { width: "200px" },
      },
    },
    {
      type: "input",
      label: "菜单标题",
      prop: "title",
      attrs: {
        placeholder: "菜单标题",
        clearable: true,
        style: { width: "200px" },
      },
    },
    {
      type: "input",
      label: "路由名称",
      prop: "pathName",
      attrs: {
        placeholder: "路由名称",
        clearable: true,
        style: { width: "200px" },
      },
    },
    {
      type: "input",
      label: "权限标识",
      prop: "permission",
      attrs: {
        placeholder: "权限标识",
        clearable: true,
        style: { width: "200px" },
      },
    },
    {
      type: "input",
      label: "排序序号",
      prop: "sort",
      attrs: {
        placeholder: "排序序号",
        clearable: true,
        style: { width: "200px" },
      },
    },
  ],
});

// 列表配置
const contentConfig: IContentConfig<ManagerMenuCategoryItemPageQuery> = reactive({
  // 权限前缀
  permPrefix: "aioveuMallManagerMenuCategoryItem:manager-menu-category-item",
  table: {
    border: true,
    highlightCurrentRow: true,
  },
  // 主键
  pk: "id",
  // 列表查询接口
  indexAction: ManagerMenuCategoryItemAPI.getPage,
  // 删除接口
  deleteAction: ManagerMenuCategoryItemAPI.deleteByIds,
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
    { label: "分类ID", prop: "categoryId" },
    { label: "菜单标题", prop: "title" },


    { label: "菜单图标",
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


    { label: "跳转路径", prop: "url" },
    { label: "路由名称", prop: "pathName" },
    { label: "权限标识", prop: "permission" },
    { label: "菜单描述", prop: "description" },
    { label: "排序序号", prop: "sort" },

    { label: "状态：0-禁用，1-启用",
      prop: "status",
      width: 80,
      // templet: "dict", // 使用字典显示
      dictData: [
        { label: "禁用", value: 0, tagType: "danger" },
        { label: "启用", value: 1, tagType: "success" }
      ]
    },
    { label: "菜单类型：0-页面，1-按钮，2-链接",
      prop: "type",
      width: 100,
      // templet: "dict", // 使用字典显示
      dictData: [
        { label: "页面", value: 0 },
        { label: "按钮", value: 1 },
        { label: "链接", value: 2 }
      ]

    },
    { label: "打开方式：0-内部打开，1-新标签页", prop: "openType" },
    { label: "是否可见", prop: "isVisible" },
    { label: "是否系统菜单", prop: "isSystem" },
    { label: "是否可编辑", prop: "isEditable" },
    { label: "所需功能特性", prop: "requiredFeatures" },
    { label: "逻辑删除：0-未删除 1-已删除", prop: "isDeleted" },
    { label: "创建时间", prop: "createTime" },
    { label: "更新时间", prop: "updateTime" },
    { label: "创建人ID", prop: "createBy" },
    { label: "更新人ID", prop: "updateBy" },
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
const addModalConfig: IModalConfig<ManagerMenuCategoryItemForm> = reactive({
  // 权限前缀
  permPrefix: "aioveuMallManagerMenuCategoryItem:manager-menu-category-item",
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
        placeholder: "分类ID"
      },
      rules: [{ required: true, message: "分类ID不能为空", trigger: "blur" }],
      label: "分类ID",
      prop: "categoryId",
    },
    {
      type: "input",
      attrs: {
        placeholder: "菜单标题"
      },
      rules: [{ required: true, message: "菜单标题不能为空", trigger: "blur" }],
      label: "菜单标题",
      prop: "title",
    },
    {
      type: "custom", // 使用自定义类型
      attrs: {
        placeholder: "菜单图标"
      },
      label: "菜单图标",
      prop: "icon",
      slotName: "iconUpload" // 指定插槽名称
    },




    {
      type: "input",
      attrs: {
        placeholder: "跳转路径"
      },
      rules: [{ required: true, message: "跳转路径不能为空", trigger: "blur" }],
      label: "跳转路径",
      prop: "url",
    },
    {
      type: "input",
      attrs: {
        placeholder: "路由名称"
      },
      label: "路由名称",
      prop: "pathName",
    },
    {
      type: "input",
      attrs: {
        placeholder: "权限标识"
      },
      label: "权限标识",
      prop: "permission",
    },
    {
      type: "input",
      attrs: {
        placeholder: "菜单描述"
      },
      label: "菜单描述",
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
        placeholder: "菜单类型：0-页面，1-按钮，2-链接"
      },
      label: "菜单类型：0-页面，1-按钮，2-链接",
      prop: "type",
    },
    {
      type: "input",
      attrs: {
        placeholder: "打开方式：0-内部打开，1-新标签页"
      },
      label: "打开方式：0-内部打开，1-新标签页",
      prop: "openType",
    },
    {
      type: "input",
      attrs: {
        placeholder: "是否可见"
      },
      label: "是否可见",
      prop: "isVisible",
    },
    {
      type: "input",
      attrs: {
        placeholder: "是否系统菜单"
      },
      label: "是否系统菜单",
      prop: "isSystem",
    },
    {
      type: "input",
      attrs: {
        placeholder: "是否可编辑"
      },
      label: "是否可编辑",
      prop: "isEditable",
    },
    {
      type: "input",
      attrs: {
        placeholder: "所需功能特性"
      },
      label: "所需功能特性",
      prop: "requiredFeatures",
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
  formAction: (data: ManagerMenuCategoryItemForm) => {
    if (data.id) {
      // 编辑
      return ManagerMenuCategoryItemAPI.update(data.id , data);
    } else {
      // 新增
      return ManagerMenuCategoryItemAPI.create(data);
    }
  },
});

// 编辑配置
const editModalConfig: IModalConfig<ManagerMenuCategoryItemForm> = reactive({
  permPrefix: "aioveuMallManagerMenuCategoryItem:manager-menu-category-item",
  component: "drawer",
  drawer: {
    title: "编辑",
    size: 1500,
  },
  // 设置表单标签位置为居左
  // form: {
  //   labelWidth: 100,
  //   labelPosition: "left", // 标签居左
  // },
  pk: "id",
  formAction(data: any) {
    return ManagerMenuCategoryItemAPI.update(data.id , data);
  },
  formItems: addModalConfig.formItems, // 复用新增的表单项
});

// 处理操作按钮点击
const handleOperateClick = (data: IObject) => {
  if (data.name === "edit") {
    handleEditClick(data.row, async () => {
      return await ManagerMenuCategoryItemAPI.getFormData(data.row.id);
    });
  }
};

// 处理工具栏按钮点击（删除等）
const handleToolbarClick = (name: string) => {
  console.log(name);
};

</script>
