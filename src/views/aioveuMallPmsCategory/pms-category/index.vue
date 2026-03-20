<template>
  <div class="app-container">
    <div class="search-container">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
                <el-form-item label="商品分类名称" prop="name">
                      <el-input
                          v-model="queryParams.name"
                          placeholder="商品分类名称"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="父级ID" prop="parentId">
                      <el-input
                          v-model="queryParams.parentId"
                          placeholder="父级ID"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="父级" prop="parentId">
                  <el-select
                    v-model="queryParams.parentId"
                    placeholder="请选择父级"
                    clearable
                    filterable
                    @keyup.enter="handleQuery()"
                  >
                    <el-option
                      v-for="item in parentIdOption"
                      :key="item.orderId"
                      :label="item.orderNo"
                      :value="item.orderId"
                    />
                  </el-select>
                </el-form-item>

<!--                <el-form-item label="图标地址" prop="iconUrl">-->
<!--                      <el-input-->
<!--                          v-model="queryParams.iconUrl"-->
<!--                          placeholder="图标地址"-->
<!--                          clearable-->
<!--                          @keyup.enter="handleQuery()"-->
<!--                      />-->
<!--                </el-form-item>-->
                <el-form-item label="排序" prop="sort">
                      <el-input
                          v-model="queryParams.sort"
                          placeholder="排序"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="显示状态:( 0:隐藏 1:显示)" prop="visible">
                      <el-input
                          v-model="queryParams.visible"
                          placeholder="显示状态:( 0:隐藏 1:显示)"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">
            <template #icon><Search /></template>
            搜索
          </el-button>
          <el-button @click="handleResetQuery">
            <template #icon><Refresh /></template>
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-card shadow="never">
      <div class="mb-10px">
        <el-button
            v-hasPerm="['aioveuMallPmsCategory:pms-category:add']"
            type="success"
            @click="handleOpenDialog()"
        >
          <template #icon><Plus /></template>
          新增
        </el-button>
        <el-button
            v-hasPerm="['aioveuMallPmsCategory:pms-category:delete']"
            type="danger"
            :disabled="removeIds.length === 0"
            @click="handleDelete()"
        >
          <template #icon><Delete /></template>
          删除
        </el-button>
      </div>

      <el-table
          ref="dataTableRef"
          v-loading="loading"
          :data="pageData"
          highlight-current-row
          border
          @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center" />
                    <el-table-column
                        key="id"
                        label="主键"
                        prop="id"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="name"
                        label="商品分类名称"
                        prop="name"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="parentId"
                        label="父级ID"
                        prop="parentId"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="level"
                        label="层级"
                        prop="level"
                        min-width="150"
                        align="center"
                    />
<!--                    <el-table-column-->
<!--                        key="iconUrl"-->
<!--                        label="图标地址"-->
<!--                        prop="iconUrl"-->
<!--                        min-width="150"-->
<!--                        align="center"-->
<!--                    />-->

                    <el-table-column
                      key="imageUrl"
                      label="图标"
                      min-width="250"
                      align="center"
                    >
                      <template #default="scope">
                        <el-image
                          style="width: 80px; height: 80px;"
                          :src="scope.row.iconUrl"
                          :preview-src-list="[scope.row.iconUrl]"
                          fit="cover"
                          lazy
                          :scroll-container="'.el-table__body-wrapper'"
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
                      </template>
                    </el-table-column>


                    <el-table-column
                        key="sort"
                        label="排序"
                        prop="sort"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="visible"
                        label="显示状态"
                        prop="visible"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="createTime"
                        label="创建时间"
                        prop="createTime"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="updateTime"
                        label="更新时间"
                        prop="updateTime"
                        min-width="150"
                        align="center"
                    />
        <el-table-column fixed="right" label="操作" width="220">
          <template #default="scope">
            <el-button
                v-hasPerm="['aioveuMallPmsCategory:pms-category:edit']"
                type="primary"
                size="small"
                link
                @click="handleOpenDialog(scope.row.id)"
            >
              <template #icon><Edit /></template>
              编辑
            </el-button>
            <el-button
                v-hasPerm="['aioveuMallPmsCategory:pms-category:delete']"
                type="danger"
                size="small"
                link
                @click="handleDelete(scope.row.id)"
            >
              <template #icon><Delete /></template>
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <pagination
          v-if="total > 0"
          v-model:total="total"
          v-model:page="queryParams.pageNum"
          v-model:limit="queryParams.pageSize"
          @pagination="handleQuery()"
      />
    </el-card>

    <!-- 商品分类表单弹窗 -->
    <el-dialog
        v-model="dialog.visible"
        :title="dialog.title"
        width="500px"
        @close="handleCloseDialog"
    >
      <el-form ref="dataFormRef" :model="formData" :rules="rules" label-width="100px">
                <el-form-item label="主键" prop="id">
                      <el-input
                          v-model="formData.id"
                          placeholder="主键"
                      />
                </el-form-item>

                <el-form-item label="商品分类名称" prop="name">
                      <el-input
                          v-model="formData.name"
                          placeholder="商品分类名称"
                      />
                </el-form-item>

                <el-form-item label="父级ID" prop="parentId">
                      <el-input
                          v-model="formData.parentId"
                          placeholder="父级ID"
                      />
                </el-form-item>

                <el-form-item label="层级" prop="level">
                      <el-input
                          v-model="formData.level"
                          placeholder="层级"
                      />
                </el-form-item>

                <el-form-item label="图标地址" prop="iconUrl">
                      <el-input
                          v-model="formData.iconUrl"
                          placeholder="图标地址"
                      />
                </el-form-item>

                <el-form-item label="单图上传">
                  <SingleImageUpload
                    v-model="formData.iconUrl"
                    :maxFileSize="5"
                    accept=".jpg,.jpeg,.png"
                    :style="{ width: '200px', height: '200px' }"
                  />
                  <div >
                    最大图片大小：5MB，支持格式：JPG、JPEG、PNG
                  </div>
                </el-form-item>




                <el-form-item label="排序" prop="sort">
                      <el-input
                          v-model="formData.sort"
                          placeholder="排序"
                      />
                </el-form-item>

                <el-form-item label="显示状态:( 0:隐藏 1:显示)" prop="visible">
                      <el-input
                          v-model="formData.visible"
                          placeholder="显示状态:( 0:隐藏 1:显示)"
                      />
                </el-form-item>

      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="handleSubmit()">确定</el-button>
          <el-button @click="handleCloseDialog()">取消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
  defineOptions({
    name: "PmsCategory",
    inheritAttrs: false,
  });

  import PmsCategoryAPI, { PmsCategoryPageVO, PmsCategoryForm, PmsCategoryPageQuery } from "@/api/aioveuMall/aioveuMallPms/aioveuMallPmsCategory/pms-category";
  import DictAPI from '@/api/system/dict.api'
  import type { DictItemOption } from "@/types/api";
  // 新增：选项
  const parentIdOption = ref<DictItemOption[]>([]);  // 新增：选项

  const queryFormRef = ref();
  const dataFormRef = ref();

  const loading = ref(false);
  const removeIds = ref<number[]>([]);
  const total = ref(0);

  const queryParams = reactive<PmsCategoryPageQuery>({
    pageNum: 1,
    pageSize: 10,
  });

  // 加载选项
  function loadOptions() {
    // AioveuLaundryOrderAPI.getAllLaundryOrderOptions().then(response => {
    //   orderOption.value = response
    // })
    // AioveuLaundryOrderItemAPI.getAllLaundryOrderItemOptions().then(response => {
    //   itemOption.value = response
    // })
    // AioveuEmployeeAPI.getAllEmployeeOptions().then(response => {
    //   employeeOption.value = response
    // })
    DictAPI.getDictItems('laundry_process_image_image_type').then(response => {
      parentIdOption.value = response
    })
  }
  // 商品分类表格数据
  const pageData = ref<PmsCategoryPageVO[]>([]);

  // 弹窗
  const dialog = reactive({
    title: "",
    visible: false,
  });

  // 商品分类表单数据
  const formData = reactive<PmsCategoryForm>({});

  // 商品分类表单校验规则
  const rules = reactive({
                      name: [{ required: true, message: "请输入商品分类名称", trigger: "blur" }],
                      parentId: [{ required: true, message: "请输入父级ID", trigger: "blur" }],
  });

  /** 查询商品分类 */
  function handleQuery() {
    loading.value = true;
          PmsCategoryAPI.getPage(queryParams)
        .then((data) => {
          pageData.value = data.list.flat();
          total.value = data.total;
        })
        .finally(() => {
          loading.value = false;
        });
  }

  /** 重置商品分类查询 */
  function handleResetQuery() {
    queryFormRef.value!.resetFields();
    queryParams.pageNum = 1;
    handleQuery();
  }

  /** 行复选框选中记录选中ID集合 */
  function handleSelectionChange(selection: any) {
    removeIds.value = selection.map((item: any) => item.id);
  }

  /** 打开商品分类弹窗 */
  function handleOpenDialog(id?: number) {
    dialog.visible = true;
    if (id) {
      dialog.title = "修改商品分类";
            PmsCategoryAPI.getFormData(id).then((data) => {
        Object.assign(formData, data);
      });
    } else {
      dialog.title = "新增商品分类";
    }
  }

  /** 提交商品分类表单 */
  function handleSubmit() {
    dataFormRef.value.validate((valid: any) => {
      if (valid) {
        loading.value = true;
        const id = formData.id;
        if (id) {
                PmsCategoryAPI.update(id, formData)
              .then(() => {
                ElMessage.success("修改成功");
                handleCloseDialog();
                handleResetQuery();
              })
              .finally(() => (loading.value = false));
        } else {
                PmsCategoryAPI.add(formData)
              .then(() => {
                ElMessage.success("新增成功");
                handleCloseDialog();
                handleResetQuery();
              })
              .finally(() => (loading.value = false));
        }
      }
    });
  }

  /** 关闭商品分类弹窗 */
  function handleCloseDialog() {
    dialog.visible = false;
    dataFormRef.value.resetFields();
    dataFormRef.value.clearValidate();
    formData.id = undefined;
  }

  /** 删除商品分类 */
  function handleDelete(id?: number) {
    const ids = [id || removeIds.value].join(",");
    if (!ids) {
      ElMessage.warning("请勾选删除项");
      return;
    }

    ElMessageBox.confirm("确认删除已选中的数据项?", "警告", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    }).then(
        () => {
          loading.value = true;
                PmsCategoryAPI.deleteByIds(ids)
              .then(() => {
                ElMessage.success("删除成功");
                handleResetQuery();
              })
              .finally(() => (loading.value = false));
        },
        () => {
          ElMessage.info("已取消删除");
        }
    );
  }

  onMounted(() => {
    handleQuery();

    loadOptions()

  });
</script>
