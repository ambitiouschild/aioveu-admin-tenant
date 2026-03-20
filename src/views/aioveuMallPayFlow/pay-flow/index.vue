<template>
  <div class="app-container">
    <div class="search-container">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
        <el-form-item label="流水号" prop="flowNo">
          <el-input
            v-model="queryParams.flowNo"
            placeholder="流水号"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="支付单号" prop="paymentNo">
          <el-input
            v-model="queryParams.paymentNo"
            placeholder="支付单号"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="退款单号" prop="refundNo">
          <el-input
            v-model="queryParams.refundNo"
            placeholder="退款单号"
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
        <el-form-item label="用户ID" prop="userId">
          <el-input
            v-model="queryParams.userId"
            placeholder="用户ID"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item
          label="流水类型：PAYMENT-支付 REFUND-退款 SETTLEMENT-结算 ADJUST-调账"
          prop="flowType"
        >
          <el-input
            v-model="queryParams.flowType"
            placeholder="流水类型：PAYMENT-支付 REFUND-退款 SETTLEMENT-结算 ADJUST-调账"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="资金方向：IN-入金 OUT-出金" prop="flowDirection">
          <el-input
            v-model="queryParams.flowDirection"
            placeholder="资金方向：IN-入金 OUT-出金"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="流水状态：0-处理中 1-成功 2-失败" prop="flowStatus">
          <el-input
            v-model="queryParams.flowStatus"
            placeholder="流水状态：0-处理中 1-成功 2-失败"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="交易时间" prop="tradeTime">
          <el-date-picker
            v-model="queryParams.tradeTime"
            type="daterange"
            range-separator="~"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            value-format="YYYY-MM-DD HH:mm:ss"
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
          v-hasPerm="['aioveuMallPayFlow:pay-flow:add']"
          type="success"
          @click="handleOpenDialog()"
        >
          <template #icon><Plus /></template>
          新增
        </el-button>
        <el-button
          v-hasPerm="['aioveuMallPayFlow:pay-flow:delete']"
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
        <el-table-column key="flowNo" label="流水号" prop="flowNo" min-width="150" align="center" />
        <el-table-column
          key="paymentNo"
          label="支付单号"
          prop="paymentNo"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="refundNo"
          label="退款单号"
          prop="refundNo"
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
        <el-table-column key="userId" label="用户ID" prop="userId" min-width="150" align="center" />
        <el-table-column
          key="flowType"
          label="流水类型：PAYMENT-支付 REFUND-退款 SETTLEMENT-结算 ADJUST-调账"
          prop="flowType"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="flowDirection"
          label="资金方向：IN-入金 OUT-出金"
          prop="flowDirection"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="amount"
          label="流水金额"
          prop="amount"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="balanceBefore"
          label="交易前余额"
          prop="balanceBefore"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="balanceAfter"
          label="交易后余额"
          prop="balanceAfter"
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
          key="thirdFlowNo"
          label="第三方流水号"
          prop="thirdFlowNo"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="flowStatus"
          label="流水状态：0-处理中 1-成功 2-失败"
          prop="flowStatus"
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
          key="completeTime"
          label="完成时间"
          prop="completeTime"
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
        <el-table-column key="remark" label="备注" prop="remark" min-width="150" align="center" />
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
              v-hasPerm="['aioveuMallPayFlow:pay-flow:edit']"
              type="primary"
              size="small"
              link
              @click="handleOpenDialog(scope.row.id)"
            >
              <template #icon><Edit /></template>
              编辑
            </el-button>
            <el-button
              v-hasPerm="['aioveuMallPayFlow:pay-flow:delete']"
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

    <!-- 支付流水表单弹窗 -->
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

        <el-form-item label="流水号" prop="flowNo">
          <el-input v-model="formData.flowNo" placeholder="流水号" />
        </el-form-item>

        <el-form-item label="支付单号" prop="paymentNo">
          <el-input v-model="formData.paymentNo" placeholder="支付单号" />
        </el-form-item>

        <el-form-item label="退款单号" prop="refundNo">
          <el-input v-model="formData.refundNo" placeholder="退款单号" />
        </el-form-item>

        <el-form-item label="业务订单号" prop="orderNo">
          <el-input v-model="formData.orderNo" placeholder="业务订单号" />
        </el-form-item>

        <el-form-item label="用户ID" prop="userId">
          <el-input v-model="formData.userId" placeholder="用户ID" />
        </el-form-item>

        <el-form-item
          label="流水类型：PAYMENT-支付 REFUND-退款 SETTLEMENT-结算 ADJUST-调账"
          prop="flowType"
        >
          <el-input
            v-model="formData.flowType"
            placeholder="流水类型：PAYMENT-支付 REFUND-退款 SETTLEMENT-结算 ADJUST-调账"
          />
        </el-form-item>

        <el-form-item label="资金方向：IN-入金 OUT-出金" prop="flowDirection">
          <el-input v-model="formData.flowDirection" placeholder="资金方向：IN-入金 OUT-出金" />
        </el-form-item>

        <el-form-item label="流水金额" prop="amount">
          <el-input v-model="formData.amount" placeholder="流水金额" />
        </el-form-item>

        <el-form-item label="交易前余额" prop="balanceBefore">
          <el-input v-model="formData.balanceBefore" placeholder="交易前余额" />
        </el-form-item>

        <el-form-item label="交易后余额" prop="balanceAfter">
          <el-input v-model="formData.balanceAfter" placeholder="交易后余额" />
        </el-form-item>

        <el-form-item label="渠道编码" prop="channelCode">
          <el-input v-model="formData.channelCode" placeholder="渠道编码" />
        </el-form-item>

        <el-form-item label="第三方流水号" prop="thirdFlowNo">
          <el-input v-model="formData.thirdFlowNo" placeholder="第三方流水号" />
        </el-form-item>

        <el-form-item label="流水状态：0-处理中 1-成功 2-失败" prop="flowStatus">
          <el-input v-model="formData.flowStatus" placeholder="流水状态：0-处理中 1-成功 2-失败" />
        </el-form-item>

        <el-form-item label="交易时间" prop="tradeTime">
          <el-date-picker
            v-model="formData.tradeTime"
            type="datetime"
            placeholder="交易时间"
            value-format="YYYY-MM-DD HH:mm:ss"
          />
        </el-form-item>

        <el-form-item label="完成时间" prop="completeTime">
          <el-date-picker
            v-model="formData.completeTime"
            type="datetime"
            placeholder="完成时间"
            value-format="YYYY-MM-DD HH:mm:ss"
          />
        </el-form-item>

        <el-form-item label="错误代码" prop="errorCode">
          <el-input v-model="formData.errorCode" placeholder="错误代码" />
        </el-form-item>

        <el-form-item label="错误信息" prop="errorMessage">
          <el-input v-model="formData.errorMessage" placeholder="错误信息" />
        </el-form-item>

        <el-form-item label="备注" prop="remark">
          <el-input v-model="formData.remark" placeholder="备注" />
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
  name: "PayFlow",
  inheritAttrs: false,
});

import PayFlowAPI, {
  PayFlowPageVO,
  PayFlowForm,
  PayFlowPageQuery,
} from "@/api/aioveuMall/aioveuMallPay/aioveuMallPayFlow/pay-flow";

const queryFormRef = ref();
const dataFormRef = ref();

const loading = ref(false);
const removeIds = ref<number[]>([]);
const total = ref(0);

const queryParams = reactive<PayFlowPageQuery>({
  pageNum: 1,
  pageSize: 10,
});

// 支付流水表格数据
const pageData = ref<PayFlowPageVO[]>([]);

// 弹窗
const dialog = reactive({
  title: "",
  visible: false,
});

// 支付流水表单数据
const formData = reactive<PayFlowForm>({});

// 支付流水表单校验规则
const rules = reactive({
  flowNo: [{ required: true, message: "请输入流水号", trigger: "blur" }],
  paymentNo: [{ required: true, message: "请输入支付单号", trigger: "blur" }],
  orderNo: [{ required: true, message: "请输入业务订单号", trigger: "blur" }],
  userId: [{ required: true, message: "请输入用户ID", trigger: "blur" }],
  flowType: [
    {
      required: true,
      message: "请输入流水类型：PAYMENT-支付 REFUND-退款 SETTLEMENT-结算 ADJUST-调账",
      trigger: "blur",
    },
  ],
  flowDirection: [{ required: true, message: "请输入资金方向：IN-入金 OUT-出金", trigger: "blur" }],
  amount: [{ required: true, message: "请输入流水金额", trigger: "blur" }],
  channelCode: [{ required: true, message: "请输入渠道编码", trigger: "blur" }],
  flowStatus: [
    { required: true, message: "请输入流水状态：0-处理中 1-成功 2-失败", trigger: "blur" },
  ],
  tradeTime: [{ required: true, message: "请输入交易时间", trigger: "blur" }],
  isDeleted: [{ required: true, message: "请输入逻辑删除：0-未删除 1-已删除", trigger: "blur" }],
});

/** 查询支付流水 */
function handleQuery() {
  loading.value = true;
  PayFlowAPI.getPage(queryParams)
    .then((data) => {
      pageData.value = data.list.flat();
      total.value = data.total;
    })
    .finally(() => {
      loading.value = false;
    });
}

/** 重置支付流水查询 */
function handleResetQuery() {
  queryFormRef.value!.resetFields();
  queryParams.pageNum = 1;
  handleQuery();
}

/** 行复选框选中记录选中ID集合 */
function handleSelectionChange(selection: any) {
  removeIds.value = selection.map((item: any) => item.id);
}

/** 打开支付流水弹窗 */
function handleOpenDialog(id?: number) {
  dialog.visible = true;
  if (id) {
    dialog.title = "修改支付流水";
    PayFlowAPI.getFormData(id).then((data) => {
      Object.assign(formData, data);
    });
  } else {
    dialog.title = "新增支付流水";
  }
}

/** 提交支付流水表单 */
function handleSubmit() {
  dataFormRef.value.validate((valid: any) => {
    if (valid) {
      loading.value = true;
      const id = formData.id;
      if (id) {
        PayFlowAPI.update(id, formData)
          .then(() => {
            ElMessage.success("修改成功");
            handleCloseDialog();
            handleResetQuery();
          })
          .finally(() => (loading.value = false));
      } else {
        PayFlowAPI.add(formData)
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

/** 关闭支付流水弹窗 */
function handleCloseDialog() {
  dialog.visible = false;
  dataFormRef.value.resetFields();
  dataFormRef.value.clearValidate();
  formData.id = undefined;
}

/** 删除支付流水 */
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
      PayFlowAPI.deleteByIds(ids)
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
