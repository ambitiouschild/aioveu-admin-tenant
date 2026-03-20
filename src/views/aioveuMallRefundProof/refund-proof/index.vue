<template>
  <div class="app-container">
    <div class="search-container">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
                <el-form-item label="退款申请ID" prop="refundId">
                      <el-input
                          v-model="queryParams.refundId"
                          placeholder="退款申请ID"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="凭证类型：1-质量问题 2-物流问题 3-描述不符 4-其他" prop="proofType">
                      <el-input
                          v-model="queryParams.proofType"
                          placeholder="凭证类型：1-质量问题 2-物流问题 3-描述不符 4-其他"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="图片描述" prop="imageDesc">
                      <el-input
                          v-model="queryParams.imageDesc"
                          placeholder="图片描述"
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
            v-hasPerm="['aioveuMallRefundProof:refund-proof:add']"
            type="success"
            @click="handleOpenDialog()"
        >
          <template #icon><Plus /></template>
          新增
        </el-button>
        <el-button
            v-hasPerm="['aioveuMallRefundProof:refund-proof:delete']"
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
                        key="refundId"
                        label="退款申请ID"
                        prop="refundId"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="proofType"
                        label="凭证类型：1-质量问题 2-物流问题 3-描述不符 4-其他"
                        prop="proofType"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="imageUrl"
                        label="图片URL"
                        prop="imageUrl"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="imageDesc"
                        label="图片描述"
                        prop="imageDesc"
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
                        key="deleted"
                        label="逻辑删除"
                        prop="deleted"
                        min-width="150"
                        align="center"
                    />
        <el-table-column fixed="right" label="操作" width="220">
          <template #default="scope">
            <el-button
                v-hasPerm="['aioveuMallRefundProof:refund-proof:edit']"
                type="primary"
                size="small"
                link
                @click="handleOpenDialog(scope.row.id)"
            >
              <template #icon><Edit /></template>
              编辑
            </el-button>
            <el-button
                v-hasPerm="['aioveuMallRefundProof:refund-proof:delete']"
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

    <!-- 退款凭证图片表单弹窗 -->
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

                <el-form-item label="退款申请ID" prop="refundId">
                      <el-input
                          v-model="formData.refundId"
                          placeholder="退款申请ID"
                      />
                </el-form-item>

                <el-form-item label="凭证类型：1-质量问题 2-物流问题 3-描述不符 4-其他" prop="proofType">
                      <el-input
                          v-model="formData.proofType"
                          placeholder="凭证类型：1-质量问题 2-物流问题 3-描述不符 4-其他"
                      />
                </el-form-item>

                <el-form-item label="图片URL" prop="imageUrl">
                      <el-input
                          v-model="formData.imageUrl"
                          placeholder="图片URL"
                      />
                </el-form-item>

                <el-form-item label="图片描述" prop="imageDesc">
                      <el-input
                          v-model="formData.imageDesc"
                          placeholder="图片描述"
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

                <el-form-item label="逻辑删除" prop="deleted">
                      <el-input
                          v-model="formData.deleted"
                          placeholder="逻辑删除"
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
    name: "RefundProof",
    inheritAttrs: false,
  });

  import RefundProofAPI, { RefundProofPageVO, RefundProofForm, RefundProofPageQuery } from "@/api/aioveuMall/aioveuMallRefund/aioveuMallRefundProof/refund-proof";

  const queryFormRef = ref();
  const dataFormRef = ref();

  const loading = ref(false);
  const removeIds = ref<number[]>([]);
  const total = ref(0);

  const queryParams = reactive<RefundProofPageQuery>({
    pageNum: 1,
    pageSize: 10,
  });

  // 退款凭证图片表格数据
  const pageData = ref<RefundProofPageVO[]>([]);

  // 弹窗
  const dialog = reactive({
    title: "",
    visible: false,
  });

  // 退款凭证图片表单数据
  const formData = reactive<RefundProofForm>({});

  // 退款凭证图片表单校验规则
  const rules = reactive({
                      refundId: [{ required: true, message: "请输入退款申请ID", trigger: "blur" }],
                      proofType: [{ required: true, message: "请输入凭证类型：1-质量问题 2-物流问题 3-描述不符 4-其他", trigger: "blur" }],
                      imageUrl: [{ required: true, message: "请输入图片URL", trigger: "blur" }],
  });

  /** 查询退款凭证图片 */
  function handleQuery() {
    loading.value = true;
          RefundProofAPI.getPage(queryParams)
        .then((data) => {
          pageData.value = data.list.flat();
          total.value = data.total;
        })
        .finally(() => {
          loading.value = false;
        });
  }

  /** 重置退款凭证图片查询 */
  function handleResetQuery() {
    queryFormRef.value!.resetFields();
    queryParams.pageNum = 1;
    handleQuery();
  }

  /** 行复选框选中记录选中ID集合 */
  function handleSelectionChange(selection: any) {
    removeIds.value = selection.map((item: any) => item.id);
  }

  /** 打开退款凭证图片弹窗 */
  function handleOpenDialog(id?: number) {
    dialog.visible = true;
    if (id) {
      dialog.title = "修改退款凭证图片";
            RefundProofAPI.getFormData(id).then((data) => {
        Object.assign(formData, data);
      });
    } else {
      dialog.title = "新增退款凭证图片";
    }
  }

  /** 提交退款凭证图片表单 */
  function handleSubmit() {
    dataFormRef.value.validate((valid: any) => {
      if (valid) {
        loading.value = true;
        const id = formData.id;
        if (id) {
                RefundProofAPI.update(id, formData)
              .then(() => {
                ElMessage.success("修改成功");
                handleCloseDialog();
                handleResetQuery();
              })
              .finally(() => (loading.value = false));
        } else {
                RefundProofAPI.add(formData)
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

  /** 关闭退款凭证图片弹窗 */
  function handleCloseDialog() {
    dialog.visible = false;
    dataFormRef.value.resetFields();
    dataFormRef.value.clearValidate();
    formData.id = undefined;
  }

  /** 删除退款凭证图片 */
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
                RefundProofAPI.deleteByIds(ids)
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
