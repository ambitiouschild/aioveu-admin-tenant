<template>
  <div class="app-container">
    <div class="search-container">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
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
            v-hasPerm="['aioveuMallOmsOrder:oms-order:add']"
            type="success"
            @click="handleOpenDialog()"
        >
          <template #icon><Plus /></template>
          新增
        </el-button>
        <el-button
            v-hasPerm="['aioveuMallOmsOrder:oms-order:delete']"
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
                        key="orderSn"
                        label="订单号"
                        prop="orderSn"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="totalAmount"
                        label="订单总额（分）"
                        prop="totalAmount"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="totalQuantity"
                        label="商品总数"
                        prop="totalQuantity"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="source"
                        label="订单来源(1:APP；2:网页)"
                        prop="source"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="status"
                        label="订单状态："
                        prop="status"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="remark"
                        label="订单备注"
                        prop="remark"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="memberId"
                        label="会员id"
                        prop="memberId"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="couponId"
                        label="使用的优惠券"
                        prop="couponId"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="couponAmount"
                        label="优惠券抵扣金额（分）"
                        prop="couponAmount"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="freightAmount"
                        label="运费金额（分）"
                        prop="freightAmount"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="paymentAmount"
                        label="应付总额（分）"
                        prop="paymentAmount"
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
                        key="paymentMethod"
                        label="支付方式(1：微信JSAPI；2：支付宝；3：余额；4：微信APP)"
                        prop="paymentMethod"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="outTradeNo"
                        label="微信支付等第三方支付平台的商户订单号"
                        prop="outTradeNo"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="transactionId"
                        label="微信支付订单号"
                        prop="transactionId"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="outRefundNo"
                        label="商户退款单号"
                        prop="outRefundNo"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="refundId"
                        label="微信退款单号"
                        prop="refundId"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="deliveryTime"
                        label="发货时间"
                        prop="deliveryTime"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="receiveTime"
                        label="确认收货时间"
                        prop="receiveTime"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="commentTime"
                        label="评价时间"
                        prop="commentTime"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="deleted"
                        label="逻辑删除【0->正常；1->已删除】"
                        prop="deleted"
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
                        label="修改时间"
                        prop="updateTime"
                        min-width="150"
                        align="center"
                    />
        <el-table-column fixed="right" label="操作" width="220">
          <template #default="scope">
            <el-button
                v-hasPerm="['aioveuMallOmsOrder:oms-order:edit']"
                type="primary"
                size="small"
                link
                @click="handleOpenDialog(scope.row.id)"
            >
              <template #icon><Edit /></template>
              编辑
            </el-button>
            <el-button
                v-hasPerm="['aioveuMallOmsOrder:oms-order:delete']"
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

    <!-- 订单详情表单弹窗 -->
    <el-dialog
        v-model="dialog.visible"
        :title="dialog.title"
        width="500px"
        @close="handleCloseDialog"
    >
      <el-form ref="dataFormRef" :model="formData" :rules="rules" label-width="100px">
                <el-form-item label="订单号" prop="orderSn">
                      <el-input
                          v-model="formData.orderSn"
                          placeholder="订单号"
                      />
                </el-form-item>

                <el-form-item label="订单总额（分）" prop="totalAmount">
                      <el-input
                          v-model="formData.totalAmount"
                          placeholder="订单总额（分）"
                      />
                </el-form-item>

                <el-form-item label="商品总数" prop="totalQuantity">
                      <el-input
                          v-model="formData.totalQuantity"
                          placeholder="商品总数"
                      />
                </el-form-item>

                <el-form-item label="订单来源(1:APP；2:网页)" prop="source">
                      <el-input
                          v-model="formData.source"
                          placeholder="订单来源(1:APP；2:网页)"
                      />
                </el-form-item>

                <el-form-item label="订单状态：" prop="status">
                      <el-input
                          v-model="formData.status"
                          placeholder="订单状态："
                      />
                </el-form-item>

                <el-form-item label="订单备注" prop="remark">
                      <el-input
                          v-model="formData.remark"
                          placeholder="订单备注"
                      />
                </el-form-item>

                <el-form-item label="会员id" prop="memberId">
                      <el-input
                          v-model="formData.memberId"
                          placeholder="会员id"
                      />
                </el-form-item>

                <el-form-item label="使用的优惠券" prop="couponId">
                      <el-input
                          v-model="formData.couponId"
                          placeholder="使用的优惠券"
                      />
                </el-form-item>

                <el-form-item label="优惠券抵扣金额（分）" prop="couponAmount">
                      <el-input
                          v-model="formData.couponAmount"
                          placeholder="优惠券抵扣金额（分）"
                      />
                </el-form-item>

                <el-form-item label="运费金额（分）" prop="freightAmount">
                      <el-input
                          v-model="formData.freightAmount"
                          placeholder="运费金额（分）"
                      />
                </el-form-item>

                <el-form-item label="应付总额（分）" prop="paymentAmount">
                      <el-input
                          v-model="formData.paymentAmount"
                          placeholder="应付总额（分）"
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

                <el-form-item label="支付方式(1：微信JSAPI；2：支付宝；3：余额；4：微信APP)" prop="paymentMethod">
                      <el-input
                          v-model="formData.paymentMethod"
                          placeholder="支付方式(1：微信JSAPI；2：支付宝；3：余额；4：微信APP)"
                      />
                </el-form-item>

                <el-form-item label="微信支付等第三方支付平台的商户订单号" prop="outTradeNo">
                      <el-input
                          v-model="formData.outTradeNo"
                          placeholder="微信支付等第三方支付平台的商户订单号"
                      />
                </el-form-item>

                <el-form-item label="微信支付订单号" prop="transactionId">
                      <el-input
                          v-model="formData.transactionId"
                          placeholder="微信支付订单号"
                      />
                </el-form-item>

                <el-form-item label="商户退款单号" prop="outRefundNo">
                      <el-input
                          v-model="formData.outRefundNo"
                          placeholder="商户退款单号"
                      />
                </el-form-item>

                <el-form-item label="微信退款单号" prop="refundId">
                      <el-input
                          v-model="formData.refundId"
                          placeholder="微信退款单号"
                      />
                </el-form-item>

                <el-form-item label="发货时间" prop="deliveryTime">
                      <el-date-picker
                          v-model="formData.deliveryTime"
                          type="datetime"
                          placeholder="发货时间"
                          value-format="YYYY-MM-DD HH:mm:ss"
                      />
                </el-form-item>

                <el-form-item label="确认收货时间" prop="receiveTime">
                      <el-date-picker
                          v-model="formData.receiveTime"
                          type="datetime"
                          placeholder="确认收货时间"
                          value-format="YYYY-MM-DD HH:mm:ss"
                      />
                </el-form-item>

                <el-form-item label="评价时间" prop="commentTime">
                      <el-date-picker
                          v-model="formData.commentTime"
                          type="datetime"
                          placeholder="评价时间"
                          value-format="YYYY-MM-DD HH:mm:ss"
                      />
                </el-form-item>

                <el-form-item label="逻辑删除【0->正常；1->已删除】" prop="deleted">
                      <el-input
                          v-model="formData.deleted"
                          placeholder="逻辑删除【0->正常；1->已删除】"
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
    name: "OmsOrder",
    inheritAttrs: false,
  });

  import OmsOrderAPI, { OmsOrderPageVO, OmsOrderForm, OmsOrderPageQuery } from "@/api/aioveuMall/aioveuMallOms/aioveuMallOmsOrder/oms-order";

  const queryFormRef = ref();
  const dataFormRef = ref();

  const loading = ref(false);
  const removeIds = ref<number[]>([]);
  const total = ref(0);

  const queryParams = reactive<OmsOrderPageQuery>({
    pageNum: 1,
    pageSize: 10,
  });

  // 订单详情表格数据
  const pageData = ref<OmsOrderPageVO[]>([]);

  // 弹窗
  const dialog = reactive({
    title: "",
    visible: false,
  });

  // 订单详情表单数据
  const formData = reactive<OmsOrderForm>({});

  // 订单详情表单校验规则
  const rules = reactive({
                      orderSn: [{ required: true, message: "请输入订单号", trigger: "blur" }],
                      totalAmount: [{ required: true, message: "请输入订单总额（分）", trigger: "blur" }],
                      totalQuantity: [{ required: true, message: "请输入商品总数", trigger: "blur" }],
                      status: [{ required: true, message: "请输入订单状态：", trigger: "blur" }],
                      remark: [{ required: true, message: "请输入订单备注", trigger: "blur" }],
                      memberId: [{ required: true, message: "请输入会员id", trigger: "blur" }],
                      couponId: [{ required: true, message: "请输入使用的优惠券", trigger: "blur" }],
                      couponAmount: [{ required: true, message: "请输入优惠券抵扣金额（分）", trigger: "blur" }],
                      freightAmount: [{ required: true, message: "请输入运费金额（分）", trigger: "blur" }],
                      paymentAmount: [{ required: true, message: "请输入应付总额（分）", trigger: "blur" }],
  });

  /** 查询订单详情 */
  function handleQuery() {
    loading.value = true;
          OmsOrderAPI.getPage(queryParams)
        .then((data) => {
          pageData.value = data.list.flat();
          total.value = data.total;
        })
        .finally(() => {
          loading.value = false;
        });
  }

  /** 重置订单详情查询 */
  function handleResetQuery() {
    queryFormRef.value!.resetFields();
    queryParams.pageNum = 1;
    handleQuery();
  }

  /** 行复选框选中记录选中ID集合 */
  function handleSelectionChange(selection: any) {
    removeIds.value = selection.map((item: any) => item.id);
  }

  /** 打开订单详情弹窗 */
  function handleOpenDialog(id?: number) {
    dialog.visible = true;
    if (id) {
      dialog.title = "修改订单详情";
            OmsOrderAPI.getFormData(id).then((data) => {
        Object.assign(formData, data);
      });
    } else {
      dialog.title = "新增订单详情";
    }
  }

  /** 提交订单详情表单 */
  function handleSubmit() {
    dataFormRef.value.validate((valid: any) => {
      if (valid) {
        loading.value = true;
        const id = formData.id;
        if (id) {
                OmsOrderAPI.update(id, formData)
              .then(() => {
                ElMessage.success("修改成功");
                handleCloseDialog();
                handleResetQuery();
              })
              .finally(() => (loading.value = false));
        } else {
                OmsOrderAPI.add(formData)
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

  /** 关闭订单详情弹窗 */
  function handleCloseDialog() {
    dialog.visible = false;
    dataFormRef.value.resetFields();
    dataFormRef.value.clearValidate();
    formData.id = undefined;
  }

  /** 删除订单详情 */
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
                OmsOrderAPI.deleteByIds(ids)
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
