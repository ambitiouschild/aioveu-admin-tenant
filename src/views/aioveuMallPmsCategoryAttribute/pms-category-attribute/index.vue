<template>
  <div class="app-container">
    <div class="search-container">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
                <el-form-item label="分类ID" prop="categoryId">
                      <el-input
                          v-model="queryParams.categoryId"
                          placeholder="分类ID"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="属性名称" prop="name">
                      <el-input
                          v-model="queryParams.name"
                          placeholder="属性名称"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="类型(1:规格;2:属性;)" prop="type">
                      <el-input
                          v-model="queryParams.type"
                          placeholder="类型(1:规格;2:属性;)"
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
            v-hasPerm="['aioveuMallPmsCategoryAttribute:pms-category-attribute:add']"
            type="success"
            @click="handleOpenDialog()"
        >
          <template #icon><Plus /></template>
          新增
        </el-button>
        <el-button
            v-hasPerm="['aioveuMallPmsCategoryAttribute:pms-category-attribute:delete']"
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
                        key="categoryId"
                        label="分类ID"
                        prop="categoryId"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="name"
                        label="属性名称"
                        prop="name"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="type"
                        label="类型(1:规格;2:属性;)"
                        prop="type"
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
                v-hasPerm="['aioveuMallPmsCategoryAttribute:pms-category-attribute:edit']"
                type="primary"
                size="small"
                link
                @click="handleOpenDialog(scope.row.id)"
            >
              <template #icon><Edit /></template>
              编辑
            </el-button>
            <el-button
                v-hasPerm="['aioveuMallPmsCategoryAttribute:pms-category-attribute:delete']"
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

    <!-- 商品类型（规格，属性）表单弹窗 -->
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

                <el-form-item label="分类ID" prop="categoryId">
                      <el-input
                          v-model="formData.categoryId"
                          placeholder="分类ID"
                      />
                </el-form-item>

                <el-form-item label="属性名称" prop="name">
                      <el-input
                          v-model="formData.name"
                          placeholder="属性名称"
                      />
                </el-form-item>

                <el-form-item label="类型(1:规格;2:属性;)" prop="type">
                      <el-input
                          v-model="formData.type"
                          placeholder="类型(1:规格;2:属性;)"
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
    name: "PmsCategoryAttribute",
    inheritAttrs: false,
  });

  import PmsCategoryAttributeAPI, { PmsCategoryAttributePageVO, PmsCategoryAttributeForm, PmsCategoryAttributePageQuery } from "@/api/aioveuMall/aioveuMallPms/aioveuMallPmsCategoryAttribute/pms-category-attribute";

  const queryFormRef = ref();
  const dataFormRef = ref();

  const loading = ref(false);
  const removeIds = ref<number[]>([]);
  const total = ref(0);

  const queryParams = reactive<PmsCategoryAttributePageQuery>({
    pageNum: 1,
    pageSize: 10,
  });

  // 商品类型（规格，属性）表格数据
  const pageData = ref<PmsCategoryAttributePageVO[]>([]);

  // 弹窗
  const dialog = reactive({
    title: "",
    visible: false,
  });

  // 商品类型（规格，属性）表单数据
  const formData = reactive<PmsCategoryAttributeForm>({});

  // 商品类型（规格，属性）表单校验规则
  const rules = reactive({
                      categoryId: [{ required: true, message: "请输入分类ID", trigger: "blur" }],
                      name: [{ required: true, message: "请输入属性名称", trigger: "blur" }],
                      type: [{ required: true, message: "请输入类型(1:规格;2:属性;)", trigger: "blur" }],
  });

  /** 查询商品类型（规格，属性） */
  function handleQuery() {
    loading.value = true;
          PmsCategoryAttributeAPI.getPage(queryParams)
        .then((data) => {
          pageData.value = data.list.flat();
          total.value = data.total;
        })
        .finally(() => {
          loading.value = false;
        });
  }

  /** 重置商品类型（规格，属性）查询 */
  function handleResetQuery() {
    queryFormRef.value!.resetFields();
    queryParams.pageNum = 1;
    handleQuery();
  }

  /** 行复选框选中记录选中ID集合 */
  function handleSelectionChange(selection: any) {
    removeIds.value = selection.map((item: any) => item.id);
  }

  /** 打开商品类型（规格，属性）弹窗 */
  function handleOpenDialog(id?: number) {
    dialog.visible = true;
    if (id) {
      dialog.title = "修改商品类型（规格，属性）";
            PmsCategoryAttributeAPI.getFormData(id).then((data) => {
        Object.assign(formData, data);
      });
    } else {
      dialog.title = "新增商品类型（规格，属性）";
    }
  }

  /** 提交商品类型（规格，属性）表单 */
  function handleSubmit() {
    dataFormRef.value.validate((valid: any) => {
      if (valid) {
        loading.value = true;
        const id = formData.id;
        if (id) {
                PmsCategoryAttributeAPI.update(id, formData)
              .then(() => {
                ElMessage.success("修改成功");
                handleCloseDialog();
                handleResetQuery();
              })
              .finally(() => (loading.value = false));
        } else {
                PmsCategoryAttributeAPI.add(formData)
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

  /** 关闭商品类型（规格，属性）弹窗 */
  function handleCloseDialog() {
    dialog.visible = false;
    dataFormRef.value.resetFields();
    dataFormRef.value.clearValidate();
    formData.id = undefined;
  }

  /** 删除商品类型（规格，属性） */
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
                PmsCategoryAttributeAPI.deleteByIds(ids)
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
  });
</script>
