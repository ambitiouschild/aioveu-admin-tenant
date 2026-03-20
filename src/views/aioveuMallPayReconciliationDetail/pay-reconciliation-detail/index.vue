<template>
  <div class="app-container">
    <div class="search-container">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
                <el-form-item label="对账单ID" prop="reconciliationId">
                      <el-input
                          v-model="queryParams.reconciliationId"
                          placeholder="对账单ID"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="对账日期" prop="billDate">
                      <el-date-picker
                          class="!w-[240px]"
                          v-model="queryParams.billDate"
                          type="daterange"
                          range-separator="~"
                          start-placeholder="开始时间"
                          end-placeholder="结束时间"
                          value-format="YYYY-MM-DD"
                      />
                </el-form-item>
                <el-form-item label="系统支付单号" prop="paymentNo">
                      <el-input
                          v-model="queryParams.paymentNo"
                          placeholder="系统支付单号"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="业务订单号" prop="orderNo">
                      <el-input
                          v-model="queryParams.orderNo"
                          placeholder="业务订单号"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="对账状态：0-未对账 1-成功 2-失败 3-系统多 4-渠道多" prop="reconcileStatus">
                      <el-input
                          v-model="queryParams.reconcileStatus"
                          placeholder="对账状态：0-未对账 1-成功 2-失败 3-系统多 4-渠道多"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="对账时间" prop="reconcileTime">
                      <el-date-picker
                          v-model="queryParams.reconcileTime"
                          type="daterange"
                          range-separator="~"
                          start-placeholder="开始时间"
                          end-placeholder="结束时间"
                          value-format="YYYY-MM-DD HH:mm:ss"
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
            v-hasPerm="['aioveuMallPayReconciliationDetail:pay-reconciliation-detail:add']"
            type="success"
            @click="handleOpenDialog()"
        >
          <template #icon><Plus /></template>
          新增
        </el-button>
        <el-button
            v-hasPerm="['aioveuMallPayReconciliationDetail:pay-reconciliation-detail:delete']"
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
                        key="reconciliationId"
                        label="对账单ID"
                        prop="reconciliationId"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="channelCode"
                        label="渠道编码"
                        prop="channelCode"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="billDate"
                        label="对账日期"
                        prop="billDate"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="thirdTransactionNo"
                        label="第三方交易流水号"
                        prop="thirdTransactionNo"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="thirdOrderNo"
                        label="第三方订单号"
                        prop="thirdOrderNo"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="paymentNo"
                        label="系统支付单号"
                        prop="paymentNo"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="orderNo"
                        label="业务订单号"
                        prop="orderNo"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="tradeType"
                        label="交易类型：PAYMENT-支付 REFUND-退款"
                        prop="tradeType"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="tradeTime"
                        label="交易时间"
                        prop="tradeTime"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="tradeAmount"
                        label="交易金额"
                        prop="tradeAmount"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="tradeStatus"
                        label="交易状态：SUCCESS-成功 FAIL-失败 PROCESSING-处理中"
                        prop="tradeStatus"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="reconcileStatus"
                        label="对账状态：0-未对账 1-成功 2-失败 3-系统多 4-渠道多"
                        prop="reconcileStatus"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="differenceReason"
                        label="差异原因"
                        prop="differenceReason"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="reconcileResult"
                        label="对账结果：MATCH-匹配 SYS_MORE-系统多 CHANNEL_MORE-渠道多"
                        prop="reconcileResult"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="reconcileTime"
                        label="对账时间"
                        prop="reconcileTime"
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
                        key="isDeleted"
                        label="逻辑删除：0-未删除 1-已删除"
                        prop="isDeleted"
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
                v-hasPerm="['aioveuMallPayReconciliationDetail:pay-reconciliation-detail:edit']"
                type="primary"
                size="small"
                link
                @click="handleOpenDialog(scope.row.id)"
            >
              <template #icon><Edit /></template>
              编辑
            </el-button>
            <el-button
                v-hasPerm="['aioveuMallPayReconciliationDetail:pay-reconciliation-detail:delete']"
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

    <!-- 对账明细表单弹窗 -->
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

                <el-form-item label="对账单ID" prop="reconciliationId">
                      <el-input
                          v-model="formData.reconciliationId"
                          placeholder="对账单ID"
                      />
                </el-form-item>

                <el-form-item label="渠道编码" prop="channelCode">
                      <el-input
                          v-model="formData.channelCode"
                          placeholder="渠道编码"
                      />
                </el-form-item>

                <el-form-item label="对账日期" prop="billDate">
                      <el-date-picker
                          class="!w-[240px]"
                          v-model="formData.billDate"
                          type="date"
                          placeholder="对账日期"
                          value-format="YYYY-MM-DD"
                      />
                </el-form-item>

                <el-form-item label="第三方交易流水号" prop="thirdTransactionNo">
                      <el-input
                          v-model="formData.thirdTransactionNo"
                          placeholder="第三方交易流水号"
                      />
                </el-form-item>

                <el-form-item label="第三方订单号" prop="thirdOrderNo">
                      <el-input
                          v-model="formData.thirdOrderNo"
                          placeholder="第三方订单号"
                      />
                </el-form-item>

                <el-form-item label="系统支付单号" prop="paymentNo">
                      <el-input
                          v-model="formData.paymentNo"
                          placeholder="系统支付单号"
                      />
                </el-form-item>

                <el-form-item label="业务订单号" prop="orderNo">
                      <el-input
                          v-model="formData.orderNo"
                          placeholder="业务订单号"
                      />
                </el-form-item>

                <el-form-item label="交易类型：PAYMENT-支付 REFUND-退款" prop="tradeType">
                      <el-input
                          v-model="formData.tradeType"
                          placeholder="交易类型：PAYMENT-支付 REFUND-退款"
                      />
                </el-form-item>

                <el-form-item label="交易时间" prop="tradeTime">
                      <el-date-picker
                          v-model="formData.tradeTime"
                          type="datetime"
                          placeholder="交易时间"
                          value-format="YYYY-MM-DD HH:mm:ss"
                      />
                </el-form-item>

                <el-form-item label="交易金额" prop="tradeAmount">
                      <el-input
                          v-model="formData.tradeAmount"
                          placeholder="交易金额"
                      />
                </el-form-item>

                <el-form-item label="交易状态：SUCCESS-成功 FAIL-失败 PROCESSING-处理中" prop="tradeStatus">
                      <el-input
                          v-model="formData.tradeStatus"
                          placeholder="交易状态：SUCCESS-成功 FAIL-失败 PROCESSING-处理中"
                      />
                </el-form-item>

                <el-form-item label="对账状态：0-未对账 1-成功 2-失败 3-系统多 4-渠道多" prop="reconcileStatus">
                      <el-input
                          v-model="formData.reconcileStatus"
                          placeholder="对账状态：0-未对账 1-成功 2-失败 3-系统多 4-渠道多"
                      />
                </el-form-item>

                <el-form-item label="差异原因" prop="differenceReason">
                      <el-input
                          v-model="formData.differenceReason"
                          placeholder="差异原因"
                      />
                </el-form-item>

                <el-form-item label="对账结果：MATCH-匹配 SYS_MORE-系统多 CHANNEL_MORE-渠道多" prop="reconcileResult">
                      <el-input
                          v-model="formData.reconcileResult"
                          placeholder="对账结果：MATCH-匹配 SYS_MORE-系统多 CHANNEL_MORE-渠道多"
                      />
                </el-form-item>

                <el-form-item label="对账时间" prop="reconcileTime">
                      <el-date-picker
                          v-model="formData.reconcileTime"
                          type="datetime"
                          placeholder="对账时间"
                          value-format="YYYY-MM-DD HH:mm:ss"
                      />
                </el-form-item>

                <el-form-item label="备注" prop="remark">
                      <el-input
                          v-model="formData.remark"
                          placeholder="备注"
                      />
                </el-form-item>

                <el-form-item label="逻辑删除：0-未删除 1-已删除" prop="isDeleted">
                      <el-input
                          v-model="formData.isDeleted"
                          placeholder="逻辑删除：0-未删除 1-已删除"
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
    name: "PayReconciliationDetail",
    inheritAttrs: false,
  });

  import PayReconciliationDetailAPI, { PayReconciliationDetailPageVO, PayReconciliationDetailForm, PayReconciliationDetailPageQuery }
    from "@/api/aioveuMall/aioveuMallPay/aioveuMallPayReconciliationDetail/pay-reconciliation-detail";

  const queryFormRef = ref();
  const dataFormRef = ref();

  const loading = ref(false);
  const removeIds = ref<number[]>([]);
  const total = ref(0);

  const queryParams = reactive<PayReconciliationDetailPageQuery>({
    pageNum: 1,
    pageSize: 10,
  });

  // 对账明细表格数据
  const pageData = ref<PayReconciliationDetailPageVO[]>([]);

  // 弹窗
  const dialog = reactive({
    title: "",
    visible: false,
  });

  // 对账明细表单数据
  const formData = reactive<PayReconciliationDetailForm>({});

  // 对账明细表单校验规则
  const rules = reactive({
                      reconciliationId: [{ required: true, message: "请输入对账单ID", trigger: "blur" }],
                      channelCode: [{ required: true, message: "请输入渠道编码", trigger: "blur" }],
                      billDate: [{ required: true, message: "请输入对账日期", trigger: "blur" }],
                      thirdTransactionNo: [{ required: true, message: "请输入第三方交易流水号", trigger: "blur" }],
                      tradeType: [{ required: true, message: "请输入交易类型：PAYMENT-支付 REFUND-退款", trigger: "blur" }],
                      tradeTime: [{ required: true, message: "请输入交易时间", trigger: "blur" }],
                      tradeAmount: [{ required: true, message: "请输入交易金额", trigger: "blur" }],
                      tradeStatus: [{ required: true, message: "请输入交易状态：SUCCESS-成功 FAIL-失败 PROCESSING-处理中", trigger: "blur" }],
                      reconcileStatus: [{ required: true, message: "请输入对账状态：0-未对账 1-成功 2-失败 3-系统多 4-渠道多", trigger: "blur" }],
  });

  /** 查询对账明细 */
  function handleQuery() {
    loading.value = true;
          PayReconciliationDetailAPI.getPage(queryParams)
        .then((data) => {
          pageData.value = data.list.flat();
          total.value = data.total;
        })
        .finally(() => {
          loading.value = false;
        });
  }

  /** 重置对账明细查询 */
  function handleResetQuery() {
    queryFormRef.value!.resetFields();
    queryParams.pageNum = 1;
    handleQuery();
  }

  /** 行复选框选中记录选中ID集合 */
  function handleSelectionChange(selection: any) {
    removeIds.value = selection.map((item: any) => item.id);
  }

  /** 打开对账明细弹窗 */
  function handleOpenDialog(id?: number) {
    dialog.visible = true;
    if (id) {
      dialog.title = "修改对账明细";
            PayReconciliationDetailAPI.getFormData(id).then((data) => {
        Object.assign(formData, data);
      });
    } else {
      dialog.title = "新增对账明细";
    }
  }

  /** 提交对账明细表单 */
  function handleSubmit() {
    dataFormRef.value.validate((valid: any) => {
      if (valid) {
        loading.value = true;
        const id = formData.id;
        if (id) {
                PayReconciliationDetailAPI.update(id, formData)
              .then(() => {
                ElMessage.success("修改成功");
                handleCloseDialog();
                handleResetQuery();
              })
              .finally(() => (loading.value = false));
        } else {
                PayReconciliationDetailAPI.add(formData)
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

  /** 关闭对账明细弹窗 */
  function handleCloseDialog() {
    dialog.visible = false;
    dataFormRef.value.resetFields();
    dataFormRef.value.clearValidate();
    formData.id = undefined;
  }

  /** 删除对账明细 */
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
                PayReconciliationDetailAPI.deleteByIds(ids)
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
