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
                <el-form-item label="退款支付单号" prop="paymentSn">
                      <el-input
                          v-model="queryParams.paymentSn"
                          placeholder="退款支付单号"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="支付类型：1-微信 2-支付宝 3-银行卡 4-余额" prop="paymentType">
                      <el-input
                          v-model="queryParams.paymentType"
                          placeholder="支付类型：1-微信 2-支付宝 3-银行卡 4-余额"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="支付状态：0-待支付 1-支付中 2-支付成功 3-支付失败" prop="paymentStatus">
                      <el-input
                          v-model="queryParams.paymentStatus"
                          placeholder="支付状态：0-待支付 1-支付中 2-支付成功 3-支付失败"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="支付渠道" prop="paymentChannel">
                      <el-input
                          v-model="queryParams.paymentChannel"
                          placeholder="支付渠道"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="支付交易号" prop="paymentTradeNo">
                      <el-input
                          v-model="queryParams.paymentTradeNo"
                          placeholder="支付交易号"
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
            v-hasPerm="['aioveuMallRefundPayment:refund-payment:add']"
            type="success"
            @click="handleOpenDialog()"
        >
          <template #icon><Plus /></template>
          新增
        </el-button>
        <el-button
            v-hasPerm="['aioveuMallRefundPayment:refund-payment:delete']"
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
                        key="paymentSn"
                        label="退款支付单号"
                        prop="paymentSn"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="paymentType"
                        label="支付类型：1-微信 2-支付宝 3-银行卡 4-余额"
                        prop="paymentType"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="paymentAmount"
                        label="支付金额（分）"
                        prop="paymentAmount"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="paymentStatus"
                        label="支付状态：0-待支付 1-支付中 2-支付成功 3-支付失败"
                        prop="paymentStatus"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="paymentTime"
                        label="支付时间"
                        prop="paymentTime"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="paymentChannel"
                        label="支付渠道"
                        prop="paymentChannel"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="paymentTradeNo"
                        label="支付交易号"
                        prop="paymentTradeNo"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="paymentFee"
                        label="支付手续费（分）"
                        prop="paymentFee"
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
                v-hasPerm="['aioveuMallRefundPayment:refund-payment:edit']"
                type="primary"
                size="small"
                link
                @click="handleOpenDialog(scope.row.id)"
            >
              <template #icon><Edit /></template>
              编辑
            </el-button>
            <el-button
                v-hasPerm="['aioveuMallRefundPayment:refund-payment:delete']"
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

    <!-- 退款支付记录表单弹窗 -->
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

                <el-form-item label="退款支付单号" prop="paymentSn">
                      <el-input
                          v-model="formData.paymentSn"
                          placeholder="退款支付单号"
                      />
                </el-form-item>

                <el-form-item label="支付类型：1-微信 2-支付宝 3-银行卡 4-余额" prop="paymentType">
                      <el-input
                          v-model="formData.paymentType"
                          placeholder="支付类型：1-微信 2-支付宝 3-银行卡 4-余额"
                      />
                </el-form-item>

                <el-form-item label="支付金额（分）" prop="paymentAmount">
                      <el-input
                          v-model="formData.paymentAmount"
                          placeholder="支付金额（分）"
                      />
                </el-form-item>

                <el-form-item label="支付状态：0-待支付 1-支付中 2-支付成功 3-支付失败" prop="paymentStatus">
                      <el-input
                          v-model="formData.paymentStatus"
                          placeholder="支付状态：0-待支付 1-支付中 2-支付成功 3-支付失败"
                      />
                </el-form-item>

                <el-form-item label="支付时间" prop="paymentTime">
                      <el-date-picker
                          v-model="formData.paymentTime"
                          type="datetime"
                          placeholder="支付时间"
                          value-format="YYYY-MM-DD HH:mm:ss"
                      />
                </el-form-item>

                <el-form-item label="支付渠道" prop="paymentChannel">
                      <el-input
                          v-model="formData.paymentChannel"
                          placeholder="支付渠道"
                      />
                </el-form-item>

                <el-form-item label="支付交易号" prop="paymentTradeNo">
                      <el-input
                          v-model="formData.paymentTradeNo"
                          placeholder="支付交易号"
                      />
                </el-form-item>

                <el-form-item label="支付手续费（分）" prop="paymentFee">
                      <el-input
                          v-model="formData.paymentFee"
                          placeholder="支付手续费（分）"
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
    name: "RefundPayment",
    inheritAttrs: false,
  });

  import RefundPaymentAPI, { RefundPaymentPageVO, RefundPaymentForm, RefundPaymentPageQuery } from "@/api/aioveuMall/aioveuMallRefund/aioveuMallRefundPayment/refund-payment";

  const queryFormRef = ref();
  const dataFormRef = ref();

  const loading = ref(false);
  const removeIds = ref<number[]>([]);
  const total = ref(0);

  const queryParams = reactive<RefundPaymentPageQuery>({
    pageNum: 1,
    pageSize: 10,
  });

  // 退款支付记录表格数据
  const pageData = ref<RefundPaymentPageVO[]>([]);

  // 弹窗
  const dialog = reactive({
    title: "",
    visible: false,
  });

  // 退款支付记录表单数据
  const formData = reactive<RefundPaymentForm>({});

  // 退款支付记录表单校验规则
  const rules = reactive({
                      refundId: [{ required: true, message: "请输入退款申请ID", trigger: "blur" }],
                      paymentSn: [{ required: true, message: "请输入退款支付单号", trigger: "blur" }],
                      paymentType: [{ required: true, message: "请输入支付类型：1-微信 2-支付宝 3-银行卡 4-余额", trigger: "blur" }],
                      paymentAmount: [{ required: true, message: "请输入支付金额（分）", trigger: "blur" }],
                      paymentStatus: [{ required: true, message: "请输入支付状态：0-待支付 1-支付中 2-支付成功 3-支付失败", trigger: "blur" }],
  });

  /** 查询退款支付记录 */
  function handleQuery() {
    loading.value = true;
          RefundPaymentAPI.getPage(queryParams)
        .then((data) => {
          pageData.value = data.list.flat();
          total.value = data.total;
        })
        .finally(() => {
          loading.value = false;
        });
  }

  /** 重置退款支付记录查询 */
  function handleResetQuery() {
    queryFormRef.value!.resetFields();
    queryParams.pageNum = 1;
    handleQuery();
  }

  /** 行复选框选中记录选中ID集合 */
  function handleSelectionChange(selection: any) {
    removeIds.value = selection.map((item: any) => item.id);
  }

  /** 打开退款支付记录弹窗 */
  function handleOpenDialog(id?: number) {
    dialog.visible = true;
    if (id) {
      dialog.title = "修改退款支付记录";
            RefundPaymentAPI.getFormData(id).then((data) => {
        Object.assign(formData, data);
      });
    } else {
      dialog.title = "新增退款支付记录";
    }
  }

  /** 提交退款支付记录表单 */
  function handleSubmit() {
    dataFormRef.value.validate((valid: any) => {
      if (valid) {
        loading.value = true;
        const id = formData.id;
        if (id) {
                RefundPaymentAPI.update(id, formData)
              .then(() => {
                ElMessage.success("修改成功");
                handleCloseDialog();
                handleResetQuery();
              })
              .finally(() => (loading.value = false));
        } else {
                RefundPaymentAPI.add(formData)
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

  /** 关闭退款支付记录弹窗 */
  function handleCloseDialog() {
    dialog.visible = false;
    dataFormRef.value.resetFields();
    dataFormRef.value.clearValidate();
    formData.id = undefined;
  }

  /** 删除退款支付记录 */
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
                RefundPaymentAPI.deleteByIds(ids)
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
