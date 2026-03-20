<template>
  <div class="app-container">
    <div class="search-container">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
        <el-form-item label="原支付单号" prop="paymentNo">
          <el-input
            v-model="queryParams.paymentNo"
            placeholder="原支付单号"
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
        <el-form-item
          label="退款状态：0-待退款 1-退款中 2-退款成功 3-退款失败 4-已关闭"
          prop="refundStatus"
        >
          <el-input
            v-model="queryParams.refundStatus"
            placeholder="退款状态：0-待退款 1-退款中 2-退款成功 3-退款失败 4-已关闭"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item
          label="退款渠道：ALIPAY-支付宝 WECHAT-微信 UNIONPAY-银联 BALANCE-余额"
          prop="refundChannel"
        >
          <el-input
            v-model="queryParams.refundChannel"
            placeholder="退款渠道：ALIPAY-支付宝 WECHAT-微信 UNIONPAY-银联 BALANCE-余额"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="退款完成时间" prop="refundTime">
          <el-date-picker
            v-model="queryParams.refundTime"
            type="daterange"
            range-separator="~"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            value-format="YYYY-MM-DD HH:mm:ss"
          />
        </el-form-item>
        <el-form-item label="第三方退款流水号" prop="thirdTransactionNo">
          <el-input
            v-model="queryParams.thirdTransactionNo"
            placeholder="第三方退款流水号"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="创建时间" prop="createTime">
          <el-date-picker
            v-model="queryParams.createTime"
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
          v-hasPerm="['aioveuMallPayRefundRecord:pay-refund-record:add']"
          type="success"
          @click="handleOpenDialog()"
        >
          <template #icon><Plus /></template>
          新增
        </el-button>
        <el-button
          v-hasPerm="['aioveuMallPayRefundRecord:pay-refund-record:delete']"
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
        <el-table-column key="id" label="主键ID" prop="id" min-width="150" align="center" />
        <el-table-column
          key="refundNo"
          label="退款单号，格式：RFyyyyMMddHHmmss+6位随机"
          prop="refundNo"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="paymentNo"
          label="原支付单号"
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
          key="bizType"
          label="业务类型：REFUND-退款 ORDER-订单退款"
          prop="bizType"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="refundAmount"
          label="退款金额"
          prop="refundAmount"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="refundStatus"
          label="退款状态：0-待退款 1-退款中 2-退款成功 3-退款失败 4-已关闭"
          prop="refundStatus"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="refundChannel"
          label="退款渠道：ALIPAY-支付宝 WECHAT-微信 UNIONPAY-银联 BALANCE-余额"
          prop="refundChannel"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="refundReason"
          label="退款原因"
          prop="refundReason"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="applyTime"
          label="申请时间"
          prop="applyTime"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="refundTime"
          label="退款完成时间"
          prop="refundTime"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="thirdRefundNo"
          label="第三方退款单号"
          prop="thirdRefundNo"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="thirdTransactionNo"
          label="第三方退款流水号"
          prop="thirdTransactionNo"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="currency"
          label="币种"
          prop="currency"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="errorCode"
          label="错误代码"
          prop="errorCode"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="errorMessage"
          label="错误信息"
          prop="errorMessage"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="notifyStatus"
          label="通知状态：0-未通知 1-通知中 2-通知成功 3-通知失败"
          prop="notifyStatus"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="notifyCount"
          label="通知次数"
          prop="notifyCount"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="lastNotifyTime"
          label="最后通知时间"
          prop="lastNotifyTime"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="nextNotifyTime"
          label="下次通知时间"
          prop="nextNotifyTime"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="callbackData"
          label="回调数据"
          prop="callbackData"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="callbackTime"
          label="回调时间"
          prop="callbackTime"
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
          key="createBy"
          label="创建人"
          prop="createBy"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="updateBy"
          label="更新人"
          prop="updateBy"
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
              v-hasPerm="['aioveuMallPayRefundRecord:pay-refund-record:edit']"
              type="primary"
              size="small"
              link
              @click="handleOpenDialog(scope.row.id)"
            >
              <template #icon><Edit /></template>
              编辑
            </el-button>
            <el-button
              v-hasPerm="['aioveuMallPayRefundRecord:pay-refund-record:delete']"
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

    <!-- 退款记录表单弹窗 -->
    <el-dialog
      v-model="dialog.visible"
      :title="dialog.title"
      width="500px"
      @close="handleCloseDialog"
    >
      <el-form ref="dataFormRef" :model="formData" :rules="rules" label-width="100px">
        <el-form-item label="主键ID" prop="id">
          <el-input v-model="formData.id" placeholder="主键ID" />
        </el-form-item>

        <el-form-item label="退款单号，格式：RFyyyyMMddHHmmss+6位随机" prop="refundNo">
          <el-input
            v-model="formData.refundNo"
            placeholder="退款单号，格式：RFyyyyMMddHHmmss+6位随机"
          />
        </el-form-item>

        <el-form-item label="原支付单号" prop="paymentNo">
          <el-input v-model="formData.paymentNo" placeholder="原支付单号" />
        </el-form-item>

        <el-form-item label="业务订单号" prop="orderNo">
          <el-input v-model="formData.orderNo" placeholder="业务订单号" />
        </el-form-item>

        <el-form-item label="业务类型：REFUND-退款 ORDER-订单退款" prop="bizType">
          <el-input v-model="formData.bizType" placeholder="业务类型：REFUND-退款 ORDER-订单退款" />
        </el-form-item>

        <el-form-item label="退款金额" prop="refundAmount">
          <el-input v-model="formData.refundAmount" placeholder="退款金额" />
        </el-form-item>

        <el-form-item
          label="退款状态：0-待退款 1-退款中 2-退款成功 3-退款失败 4-已关闭"
          prop="refundStatus"
        >
          <el-input
            v-model="formData.refundStatus"
            placeholder="退款状态：0-待退款 1-退款中 2-退款成功 3-退款失败 4-已关闭"
          />
        </el-form-item>

        <el-form-item
          label="退款渠道：ALIPAY-支付宝 WECHAT-微信 UNIONPAY-银联 BALANCE-余额"
          prop="refundChannel"
        >
          <el-input
            v-model="formData.refundChannel"
            placeholder="退款渠道：ALIPAY-支付宝 WECHAT-微信 UNIONPAY-银联 BALANCE-余额"
          />
        </el-form-item>

        <el-form-item label="退款原因" prop="refundReason">
          <el-input v-model="formData.refundReason" placeholder="退款原因" />
        </el-form-item>

        <el-form-item label="申请时间" prop="applyTime">
          <el-date-picker
            v-model="formData.applyTime"
            type="datetime"
            placeholder="申请时间"
            value-format="YYYY-MM-DD HH:mm:ss"
          />
        </el-form-item>

        <el-form-item label="退款完成时间" prop="refundTime">
          <el-date-picker
            v-model="formData.refundTime"
            type="datetime"
            placeholder="退款完成时间"
            value-format="YYYY-MM-DD HH:mm:ss"
          />
        </el-form-item>

        <el-form-item label="第三方退款单号" prop="thirdRefundNo">
          <el-input v-model="formData.thirdRefundNo" placeholder="第三方退款单号" />
        </el-form-item>

        <el-form-item label="第三方退款流水号" prop="thirdTransactionNo">
          <el-input v-model="formData.thirdTransactionNo" placeholder="第三方退款流水号" />
        </el-form-item>

        <el-form-item label="币种" prop="currency">
          <el-input v-model="formData.currency" placeholder="币种" />
        </el-form-item>

        <el-form-item label="错误代码" prop="errorCode">
          <el-input v-model="formData.errorCode" placeholder="错误代码" />
        </el-form-item>

        <el-form-item label="错误信息" prop="errorMessage">
          <el-input v-model="formData.errorMessage" placeholder="错误信息" />
        </el-form-item>

        <el-form-item label="通知状态：0-未通知 1-通知中 2-通知成功 3-通知失败" prop="notifyStatus">
          <el-input
            v-model="formData.notifyStatus"
            placeholder="通知状态：0-未通知 1-通知中 2-通知成功 3-通知失败"
          />
        </el-form-item>

        <el-form-item label="通知次数" prop="notifyCount">
          <el-input v-model="formData.notifyCount" placeholder="通知次数" />
        </el-form-item>

        <el-form-item label="最后通知时间" prop="lastNotifyTime">
          <el-date-picker
            v-model="formData.lastNotifyTime"
            type="datetime"
            placeholder="最后通知时间"
            value-format="YYYY-MM-DD HH:mm:ss"
          />
        </el-form-item>

        <el-form-item label="下次通知时间" prop="nextNotifyTime">
          <el-date-picker
            v-model="formData.nextNotifyTime"
            type="datetime"
            placeholder="下次通知时间"
            value-format="YYYY-MM-DD HH:mm:ss"
          />
        </el-form-item>

        <el-form-item label="回调数据" prop="callbackData">
          <el-input v-model="formData.callbackData" placeholder="回调数据" />
        </el-form-item>

        <el-form-item label="回调时间" prop="callbackTime">
          <el-date-picker
            v-model="formData.callbackTime"
            type="datetime"
            placeholder="回调时间"
            value-format="YYYY-MM-DD HH:mm:ss"
          />
        </el-form-item>

        <el-form-item label="逻辑删除：0-未删除 1-已删除" prop="isDeleted">
          <el-input v-model="formData.isDeleted" placeholder="逻辑删除：0-未删除 1-已删除" />
        </el-form-item>

        <el-form-item label="创建人" prop="createBy">
          <el-input v-model="formData.createBy" placeholder="创建人" />
        </el-form-item>

        <el-form-item label="更新人" prop="updateBy">
          <el-input v-model="formData.updateBy" placeholder="更新人" />
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
  name: "PayRefundRecord",
  inheritAttrs: false,
});

import PayRefundRecordAPI, {
  PayRefundRecordPageVO,
  PayRefundRecordForm,
  PayRefundRecordPageQuery,
} from "@/api/aioveuMall/aioveuMallPay/aioveuMallPayRefundRecord/pay-refund-record";

const queryFormRef = ref();
const dataFormRef = ref();

const loading = ref(false);
const removeIds = ref<number[]>([]);
const total = ref(0);

const queryParams = reactive<PayRefundRecordPageQuery>({
  pageNum: 1,
  pageSize: 10,
});

// 退款记录表格数据
const pageData = ref<PayRefundRecordPageVO[]>([]);

// 弹窗
const dialog = reactive({
  title: "",
  visible: false,
});

// 退款记录表单数据
const formData = reactive<PayRefundRecordForm>({});

// 退款记录表单校验规则
const rules = reactive({
  refundNo: [
    { required: true, message: "请输入退款单号，格式：RFyyyyMMddHHmmss+6位随机", trigger: "blur" },
  ],
  paymentNo: [{ required: true, message: "请输入原支付单号", trigger: "blur" }],
  orderNo: [{ required: true, message: "请输入业务订单号", trigger: "blur" }],
  bizType: [
    { required: true, message: "请输入业务类型：REFUND-退款 ORDER-订单退款", trigger: "blur" },
  ],
  refundAmount: [{ required: true, message: "请输入退款金额", trigger: "blur" }],
  refundStatus: [
    {
      required: true,
      message: "请输入退款状态：0-待退款 1-退款中 2-退款成功 3-退款失败 4-已关闭",
      trigger: "blur",
    },
  ],
  refundChannel: [
    {
      required: true,
      message: "请输入退款渠道：ALIPAY-支付宝 WECHAT-微信 UNIONPAY-银联 BALANCE-余额",
      trigger: "blur",
    },
  ],
  applyTime: [{ required: true, message: "请输入申请时间", trigger: "blur" }],
  isDeleted: [{ required: true, message: "请输入逻辑删除：0-未删除 1-已删除", trigger: "blur" }],
});

/** 查询退款记录 */
function handleQuery() {
  loading.value = true;
  PayRefundRecordAPI.getPage(queryParams)
    .then((data) => {
      pageData.value = data.list.flat();
      total.value = data.total;
    })
    .finally(() => {
      loading.value = false;
    });
}

/** 重置退款记录查询 */
function handleResetQuery() {
  queryFormRef.value!.resetFields();
  queryParams.pageNum = 1;
  handleQuery();
}

/** 行复选框选中记录选中ID集合 */
function handleSelectionChange(selection: any) {
  removeIds.value = selection.map((item: any) => item.id);
}

/** 打开退款记录弹窗 */
function handleOpenDialog(id?: number) {
  dialog.visible = true;
  if (id) {
    dialog.title = "修改退款记录";
    PayRefundRecordAPI.getFormData(id).then((data) => {
      Object.assign(formData, data);
    });
  } else {
    dialog.title = "新增退款记录";
  }
}

/** 提交退款记录表单 */
function handleSubmit() {
  dataFormRef.value.validate((valid: any) => {
    if (valid) {
      loading.value = true;
      const id = formData.id;
      if (id) {
        PayRefundRecordAPI.update(id, formData)
          .then(() => {
            ElMessage.success("修改成功");
            handleCloseDialog();
            handleResetQuery();
          })
          .finally(() => (loading.value = false));
      } else {
        PayRefundRecordAPI.add(formData)
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

/** 关闭退款记录弹窗 */
function handleCloseDialog() {
  dialog.visible = false;
  dataFormRef.value.resetFields();
  dataFormRef.value.clearValidate();
  formData.id = undefined;
}

/** 删除退款记录 */
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
      PayRefundRecordAPI.deleteByIds(ids)
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
