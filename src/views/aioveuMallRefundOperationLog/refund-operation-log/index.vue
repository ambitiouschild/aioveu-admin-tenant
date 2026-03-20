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
                <el-form-item label="操作类型：1-用户申请 2-客服审核 3-财务审核 4-商家处理 5-用户操作 6-系统自动" prop="operationType">
                      <el-input
                          v-model="queryParams.operationType"
                          placeholder="操作类型：1-用户申请 2-客服审核 3-财务审核 4-商家处理 5-用户操作 6-系统自动"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="操作人ID" prop="operatorId">
                      <el-input
                          v-model="queryParams.operatorId"
                          placeholder="操作人ID"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="操作人名称" prop="operatorName">
                      <el-input
                          v-model="queryParams.operatorName"
                          placeholder="操作人名称"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="操作人类型：1-用户 2-客服 3-商家 4-系统" prop="operatorType">
                      <el-input
                          v-model="queryParams.operatorType"
                          placeholder="操作人类型：1-用户 2-客服 3-商家 4-系统"
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
            v-hasPerm="['aioveuMallRefundOperationLog:refund-operation-log:add']"
            type="success"
            @click="handleOpenDialog()"
        >
          <template #icon><Plus /></template>
          新增
        </el-button>
        <el-button
            v-hasPerm="['aioveuMallRefundOperationLog:refund-operation-log:delete']"
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
                        key="operationType"
                        label="操作类型：1-用户申请 2-客服审核 3-财务审核 4-商家处理 5-用户操作 6-系统自动"
                        prop="operationType"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="operationContent"
                        label="操作内容"
                        prop="operationContent"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="operatorId"
                        label="操作人ID"
                        prop="operatorId"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="operatorName"
                        label="操作人名称"
                        prop="operatorName"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="operatorType"
                        label="操作人类型：1-用户 2-客服 3-商家 4-系统"
                        prop="operatorType"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="beforeStatus"
                        label="操作前状态"
                        prop="beforeStatus"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="afterStatus"
                        label="操作后状态"
                        prop="afterStatus"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="remark"
                        label="备注"
                        prop="remark"
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
        <el-table-column fixed="right" label="操作" width="220">
          <template #default="scope">
            <el-button
                v-hasPerm="['aioveuMallRefundOperationLog:refund-operation-log:edit']"
                type="primary"
                size="small"
                link
                @click="handleOpenDialog(scope.row.id)"
            >
              <template #icon><Edit /></template>
              编辑
            </el-button>
            <el-button
                v-hasPerm="['aioveuMallRefundOperationLog:refund-operation-log:delete']"
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

    <!-- 退款操作记录（用于审计）表单弹窗 -->
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

                <el-form-item label="操作类型：1-用户申请 2-客服审核 3-财务审核 4-商家处理 5-用户操作 6-系统自动" prop="operationType">
                      <el-input
                          v-model="formData.operationType"
                          placeholder="操作类型：1-用户申请 2-客服审核 3-财务审核 4-商家处理 5-用户操作 6-系统自动"
                      />
                </el-form-item>

                <el-form-item label="操作内容" prop="operationContent">
                      <el-input
                          v-model="formData.operationContent"
                          placeholder="操作内容"
                      />
                </el-form-item>

                <el-form-item label="操作人ID" prop="operatorId">
                      <el-input
                          v-model="formData.operatorId"
                          placeholder="操作人ID"
                      />
                </el-form-item>

                <el-form-item label="操作人名称" prop="operatorName">
                      <el-input
                          v-model="formData.operatorName"
                          placeholder="操作人名称"
                      />
                </el-form-item>

                <el-form-item label="操作人类型：1-用户 2-客服 3-商家 4-系统" prop="operatorType">
                      <el-input
                          v-model="formData.operatorType"
                          placeholder="操作人类型：1-用户 2-客服 3-商家 4-系统"
                      />
                </el-form-item>

                <el-form-item label="操作前状态" prop="beforeStatus">
                      <el-input
                          v-model="formData.beforeStatus"
                          placeholder="操作前状态"
                      />
                </el-form-item>

                <el-form-item label="操作后状态" prop="afterStatus">
                      <el-input
                          v-model="formData.afterStatus"
                          placeholder="操作后状态"
                      />
                </el-form-item>

                <el-form-item label="备注" prop="remark">
                      <el-input
                          v-model="formData.remark"
                          placeholder="备注"
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
    name: "RefundOperationLog",
    inheritAttrs: false,
  });

  import RefundOperationLogAPI, { RefundOperationLogPageVO,
    RefundOperationLogForm,
    RefundOperationLogPageQuery
  } from "@/api/aioveuMall/aioveuMallRefund/aioveuMallRefundOperationLog/refund-operation-log";

  const queryFormRef = ref();
  const dataFormRef = ref();

  const loading = ref(false);
  const removeIds = ref<number[]>([]);
  const total = ref(0);

  const queryParams = reactive<RefundOperationLogPageQuery>({
    pageNum: 1,
    pageSize: 10,
  });

  // 退款操作记录（用于审计）表格数据
  const pageData = ref<RefundOperationLogPageVO[]>([]);

  // 弹窗
  const dialog = reactive({
    title: "",
    visible: false,
  });

  // 退款操作记录（用于审计）表单数据
  const formData = reactive<RefundOperationLogForm>({});

  // 退款操作记录（用于审计）表单校验规则
  const rules = reactive({
                      refundId: [{ required: true, message: "请输入退款申请ID", trigger: "blur" }],
                      operationType: [{ required: true, message: "请输入操作类型：1-用户申请 2-客服审核 3-财务审核 4-商家处理 5-用户操作 6-系统自动", trigger: "blur" }],
                      operationContent: [{ required: true, message: "请输入操作内容", trigger: "blur" }],
  });

  /** 查询退款操作记录（用于审计） */
  function handleQuery() {
    loading.value = true;
          RefundOperationLogAPI.getPage(queryParams)
        .then((data) => {
          pageData.value = data.list.flat();
          total.value = data.total;
        })
        .finally(() => {
          loading.value = false;
        });
  }

  /** 重置退款操作记录（用于审计）查询 */
  function handleResetQuery() {
    queryFormRef.value!.resetFields();
    queryParams.pageNum = 1;
    handleQuery();
  }

  /** 行复选框选中记录选中ID集合 */
  function handleSelectionChange(selection: any) {
    removeIds.value = selection.map((item: any) => item.id);
  }

  /** 打开退款操作记录（用于审计）弹窗 */
  function handleOpenDialog(id?: number) {
    dialog.visible = true;
    if (id) {
      dialog.title = "修改退款操作记录（用于审计）";
            RefundOperationLogAPI.getFormData(id).then((data) => {
        Object.assign(formData, data);
      });
    } else {
      dialog.title = "新增退款操作记录（用于审计）";
    }
  }

  /** 提交退款操作记录（用于审计）表单 */
  function handleSubmit() {
    dataFormRef.value.validate((valid: any) => {
      if (valid) {
        loading.value = true;
        const id = formData.id;
        if (id) {
                RefundOperationLogAPI.update(id, formData)
              .then(() => {
                ElMessage.success("修改成功");
                handleCloseDialog();
                handleResetQuery();
              })
              .finally(() => (loading.value = false));
        } else {
                RefundOperationLogAPI.add(formData)
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

  /** 关闭退款操作记录（用于审计）弹窗 */
  function handleCloseDialog() {
    dialog.visible = false;
    dataFormRef.value.resetFields();
    dataFormRef.value.clearValidate();
    formData.id = undefined;
  }

  /** 删除退款操作记录（用于审计） */
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
                RefundOperationLogAPI.deleteByIds(ids)
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
