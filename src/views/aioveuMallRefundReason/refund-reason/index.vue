<template>
  <div class="app-container">
    <div class="search-container">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
                <el-form-item label="原因类型：1-仅退款原因 2-退货退款原因 3-换货原因" prop="reasonType">
                      <el-input
                          v-model="queryParams.reasonType"
                          placeholder="原因类型：1-仅退款原因 2-退货退款原因 3-换货原因"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="原因内容" prop="reasonContent">
                      <el-input
                          v-model="queryParams.reasonContent"
                          placeholder="原因内容"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="状态：0-禁用 1-启用" prop="status">
                      <el-input
                          v-model="queryParams.status"
                          placeholder="状态：0-禁用 1-启用"
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
            v-hasPerm="['aioveuMallRefundReason:refund-reason:add']"
            type="success"
            @click="handleOpenDialog()"
        >
          <template #icon><Plus /></template>
          新增
        </el-button>
        <el-button
            v-hasPerm="['aioveuMallRefundReason:refund-reason:delete']"
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
                        label="主键ID"
                        prop="id"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="reasonType"
                        label="原因类型：1-仅退款原因 2-退货退款原因 3-换货原因"
                        prop="reasonType"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="reasonContent"
                        label="原因内容"
                        prop="reasonContent"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="sort"
                        label="排序"
                        prop="sort"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="status"
                        label="状态：0-禁用 1-启用"
                        prop="status"
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
                v-hasPerm="['aioveuMallRefundReason:refund-reason:edit']"
                type="primary"
                size="small"
                link
                @click="handleOpenDialog(scope.row.id)"
            >
              <template #icon><Edit /></template>
              编辑
            </el-button>
            <el-button
                v-hasPerm="['aioveuMallRefundReason:refund-reason:delete']"
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

    <!-- 退款原因分类表单弹窗 -->
    <el-dialog
        v-model="dialog.visible"
        :title="dialog.title"
        width="500px"
        @close="handleCloseDialog"
    >
      <el-form ref="dataFormRef" :model="formData" :rules="rules" label-width="100px">
                <el-form-item label="主键ID" prop="id">
                      <el-input
                          v-model="formData.id"
                          placeholder="主键ID"
                      />
                </el-form-item>

                <el-form-item label="原因类型：1-仅退款原因 2-退货退款原因 3-换货原因" prop="reasonType">
                      <el-input
                          v-model="formData.reasonType"
                          placeholder="原因类型：1-仅退款原因 2-退货退款原因 3-换货原因"
                      />
                </el-form-item>

                <el-form-item label="原因内容" prop="reasonContent">
                      <el-input
                          v-model="formData.reasonContent"
                          placeholder="原因内容"
                      />
                </el-form-item>

                <el-form-item label="排序" prop="sort">
                      <el-input
                          v-model="formData.sort"
                          placeholder="排序"
                      />
                </el-form-item>

                <el-form-item label="状态：0-禁用 1-启用" prop="status">
                      <el-input
                          v-model="formData.status"
                          placeholder="状态：0-禁用 1-启用"
                      />
                </el-form-item>

                <el-form-item label="创建时间" prop="createTime">
                      <el-date-picker
                          v-model="formData.createTime"
                          type="datetime"
                          placeholder="创建时间"
                          value-format="YYYY-MM-DD HH:mm:ss"
                      />
                </el-form-item>

                <el-form-item label="更新时间" prop="updateTime">
                      <el-date-picker
                          v-model="formData.updateTime"
                          type="datetime"
                          placeholder="更新时间"
                          value-format="YYYY-MM-DD HH:mm:ss"
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
    name: "RefundReason",
    inheritAttrs: false,
  });

  import RefundReasonAPI, { RefundReasonPageVO,
    RefundReasonForm,
    RefundReasonPageQuery } from "@/api/aioveuMall/aioveuMallRefund/aioveuMallRefundReason/refund-reason";

  const queryFormRef = ref();
  const dataFormRef = ref();

  const loading = ref(false);
  const removeIds = ref<number[]>([]);
  const total = ref(0);

  const queryParams = reactive<RefundReasonPageQuery>({
    pageNum: 1,
    pageSize: 10,
  });

  // 退款原因分类表格数据
  const pageData = ref<RefundReasonPageVO[]>([]);

  // 弹窗
  const dialog = reactive({
    title: "",
    visible: false,
  });

  // 退款原因分类表单数据
  const formData = reactive<RefundReasonForm>({});

  // 退款原因分类表单校验规则
  const rules = reactive({
                      reasonType: [{ required: true, message: "请输入原因类型：1-仅退款原因 2-退货退款原因 3-换货原因", trigger: "blur" }],
                      reasonContent: [{ required: true, message: "请输入原因内容", trigger: "blur" }],
                      sort: [{ required: true, message: "请输入排序", trigger: "blur" }],
                      status: [{ required: true, message: "请输入状态：0-禁用 1-启用", trigger: "blur" }],
  });

  /** 查询退款原因分类 */
  function handleQuery() {
    loading.value = true;
          RefundReasonAPI.getPage(queryParams)
        .then((data) => {
          pageData.value = data.list.flat();
          total.value = data.total;
        })
        .finally(() => {
          loading.value = false;
        });
  }

  /** 重置退款原因分类查询 */
  function handleResetQuery() {
    queryFormRef.value!.resetFields();
    queryParams.pageNum = 1;
    handleQuery();
  }

  /** 行复选框选中记录选中ID集合 */
  function handleSelectionChange(selection: any) {
    removeIds.value = selection.map((item: any) => item.id);
  }

  /** 打开退款原因分类弹窗 */
  function handleOpenDialog(id?: number) {
    dialog.visible = true;
    if (id) {
      dialog.title = "修改退款原因分类";
            RefundReasonAPI.getFormData(id).then((data) => {
        Object.assign(formData, data);
      });
    } else {
      dialog.title = "新增退款原因分类";
    }
  }

  /** 提交退款原因分类表单 */
  function handleSubmit() {
    dataFormRef.value.validate((valid: any) => {
      if (valid) {
        loading.value = true;
        const id = formData.id;
        if (id) {
                RefundReasonAPI.update(id, formData)
              .then(() => {
                ElMessage.success("修改成功");
                handleCloseDialog();
                handleResetQuery();
              })
              .finally(() => (loading.value = false));
        } else {
                RefundReasonAPI.add(formData)
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

  /** 关闭退款原因分类弹窗 */
  function handleCloseDialog() {
    dialog.visible = false;
    dataFormRef.value.resetFields();
    dataFormRef.value.clearValidate();
    formData.id = undefined;
  }

  /** 删除退款原因分类 */
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
                RefundReasonAPI.deleteByIds(ids)
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
