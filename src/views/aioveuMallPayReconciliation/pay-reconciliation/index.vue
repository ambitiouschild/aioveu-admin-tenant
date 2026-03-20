<template>
  <div class="app-container">
    <div class="search-container">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
        <el-form-item label="对账单号" prop="reconciliationNo">
          <el-input
            v-model="queryParams.reconciliationNo"
            placeholder="对账单号"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="渠道编码" prop="channelCode">
          <el-input
            v-model="queryParams.channelCode"
            placeholder="渠道编码"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="账单类型：PAYMENT-支付 REFUND-退款 ALL-全部" prop="billType">
          <el-input
            v-model="queryParams.billType"
            placeholder="账单类型：PAYMENT-支付 REFUND-退款 ALL-全部"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item
          label="对账状态：0-未对账 1-对账中 2-对账完成 3-对账异常"
          prop="reconcileStatus"
        >
          <el-input
            v-model="queryParams.reconcileStatus"
            placeholder="对账状态：0-未对账 1-对账中 2-对账完成 3-对账异常"
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
          v-hasPerm="['aioveuMallPayReconciliation:pay-reconciliation:add']"
          type="success"
          @click="handleOpenDialog()"
        >
          <template #icon><Plus /></template>
          新增
        </el-button>
        <el-button
          v-hasPerm="['aioveuMallPayReconciliation:pay-reconciliation:delete']"
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
          key="reconciliationNo"
          label="对账单号"
          prop="reconciliationNo"
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
          key="billType"
          label="账单类型：PAYMENT-支付 REFUND-退款 ALL-全部"
          prop="billType"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="totalCount"
          label="总笔数"
          prop="totalCount"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="totalAmount"
          label="总金额"
          prop="totalAmount"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="successCount"
          label="成功笔数"
          prop="successCount"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="successAmount"
          label="成功金额"
          prop="successAmount"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="failureCount"
          label="失败笔数"
          prop="failureCount"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="failureAmount"
          label="失败金额"
          prop="failureAmount"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="differenceCount"
          label="差异笔数"
          prop="differenceCount"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="reconcileStatus"
          label="对账状态：0-未对账 1-对账中 2-对账完成 3-对账异常"
          prop="reconcileStatus"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="downloadStatus"
          label="下载状态：0-未下载 1-下载中 2-下载完成 3-下载失败"
          prop="downloadStatus"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="downloadTime"
          label="下载时间"
          prop="downloadTime"
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
          key="billFileUrl"
          label="账单文件URL"
          prop="billFileUrl"
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
              v-hasPerm="['aioveuMallPayReconciliation:pay-reconciliation:edit']"
              type="primary"
              size="small"
              link
              @click="handleOpenDialog(scope.row.id)"
            >
              <template #icon><Edit /></template>
              编辑
            </el-button>
            <el-button
              v-hasPerm="['aioveuMallPayReconciliation:pay-reconciliation:delete']"
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

    <!-- 支付对账表单弹窗 -->
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

        <el-form-item label="对账单号" prop="reconciliationNo">
          <el-input v-model="formData.reconciliationNo" placeholder="对账单号" />
        </el-form-item>

        <el-form-item label="渠道编码" prop="channelCode">
          <el-input v-model="formData.channelCode" placeholder="渠道编码" />
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

        <el-form-item label="账单类型：PAYMENT-支付 REFUND-退款 ALL-全部" prop="billType">
          <el-input
            v-model="formData.billType"
            placeholder="账单类型：PAYMENT-支付 REFUND-退款 ALL-全部"
          />
        </el-form-item>

        <el-form-item label="总笔数" prop="totalCount">
          <el-input v-model="formData.totalCount" placeholder="总笔数" />
        </el-form-item>

        <el-form-item label="总金额" prop="totalAmount">
          <el-input v-model="formData.totalAmount" placeholder="总金额" />
        </el-form-item>

        <el-form-item label="成功笔数" prop="successCount">
          <el-input v-model="formData.successCount" placeholder="成功笔数" />
        </el-form-item>

        <el-form-item label="成功金额" prop="successAmount">
          <el-input v-model="formData.successAmount" placeholder="成功金额" />
        </el-form-item>

        <el-form-item label="失败笔数" prop="failureCount">
          <el-input v-model="formData.failureCount" placeholder="失败笔数" />
        </el-form-item>

        <el-form-item label="失败金额" prop="failureAmount">
          <el-input v-model="formData.failureAmount" placeholder="失败金额" />
        </el-form-item>

        <el-form-item label="差异笔数" prop="differenceCount">
          <el-input v-model="formData.differenceCount" placeholder="差异笔数" />
        </el-form-item>

        <el-form-item
          label="对账状态：0-未对账 1-对账中 2-对账完成 3-对账异常"
          prop="reconcileStatus"
        >
          <el-input
            v-model="formData.reconcileStatus"
            placeholder="对账状态：0-未对账 1-对账中 2-对账完成 3-对账异常"
          />
        </el-form-item>

        <el-form-item
          label="下载状态：0-未下载 1-下载中 2-下载完成 3-下载失败"
          prop="downloadStatus"
        >
          <el-input
            v-model="formData.downloadStatus"
            placeholder="下载状态：0-未下载 1-下载中 2-下载完成 3-下载失败"
          />
        </el-form-item>

        <el-form-item label="下载时间" prop="downloadTime">
          <el-date-picker
            v-model="formData.downloadTime"
            type="datetime"
            placeholder="下载时间"
            value-format="YYYY-MM-DD HH:mm:ss"
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

        <el-form-item label="账单文件URL" prop="billFileUrl">
          <el-input v-model="formData.billFileUrl" placeholder="账单文件URL" />
        </el-form-item>

        <el-form-item label="错误信息" prop="errorMessage">
          <el-input v-model="formData.errorMessage" placeholder="错误信息" />
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
  name: "PayReconciliation",
  inheritAttrs: false,
});

import PayReconciliationAPI, {
  PayReconciliationPageVO,
  PayReconciliationForm,
  PayReconciliationPageQuery,
} from "@/api/aioveuMall/aioveuMallPay/aioveuMallPayReconciliation/pay-reconciliation";

const queryFormRef = ref();
const dataFormRef = ref();

const loading = ref(false);
const removeIds = ref<number[]>([]);
const total = ref(0);

const queryParams = reactive<PayReconciliationPageQuery>({
  pageNum: 1,
  pageSize: 10,
});

// 支付对账表格数据
const pageData = ref<PayReconciliationPageVO[]>([]);

// 弹窗
const dialog = reactive({
  title: "",
  visible: false,
});

// 支付对账表单数据
const formData = reactive<PayReconciliationForm>({});

// 支付对账表单校验规则
const rules = reactive({
  reconciliationNo: [{ required: true, message: "请输入对账单号", trigger: "blur" }],
  channelCode: [{ required: true, message: "请输入渠道编码", trigger: "blur" }],
  billDate: [{ required: true, message: "请输入对账日期", trigger: "blur" }],
  billType: [
    {
      required: true,
      message: "请输入账单类型：PAYMENT-支付 REFUND-退款 ALL-全部",
      trigger: "blur",
    },
  ],
  reconcileStatus: [
    {
      required: true,
      message: "请输入对账状态：0-未对账 1-对账中 2-对账完成 3-对账异常",
      trigger: "blur",
    },
  ],
  isDeleted: [{ required: true, message: "请输入逻辑删除：0-未删除 1-已删除", trigger: "blur" }],
  createTime: [{ required: true, message: "请输入创建时间", trigger: "blur" }],
  updateTime: [{ required: true, message: "请输入更新时间", trigger: "blur" }],
});

/** 查询支付对账 */
function handleQuery() {
  loading.value = true;
  PayReconciliationAPI.getPage(queryParams)
    .then((data) => {
      pageData.value = data.list.flat();
      total.value = data.total;
    })
    .finally(() => {
      loading.value = false;
    });
}

/** 重置支付对账查询 */
function handleResetQuery() {
  queryFormRef.value!.resetFields();
  queryParams.pageNum = 1;
  handleQuery();
}

/** 行复选框选中记录选中ID集合 */
function handleSelectionChange(selection: any) {
  removeIds.value = selection.map((item: any) => item.id);
}

/** 打开支付对账弹窗 */
function handleOpenDialog(id?: number) {
  dialog.visible = true;
  if (id) {
    dialog.title = "修改支付对账";
    PayReconciliationAPI.getFormData(id).then((data) => {
      Object.assign(formData, data);
    });
  } else {
    dialog.title = "新增支付对账";
  }
}

/** 提交支付对账表单 */
function handleSubmit() {
  dataFormRef.value.validate((valid: any) => {
    if (valid) {
      loading.value = true;
      const id = formData.id;
      if (id) {
        PayReconciliationAPI.update(id, formData)
          .then(() => {
            ElMessage.success("修改成功");
            handleCloseDialog();
            handleResetQuery();
          })
          .finally(() => (loading.value = false));
      } else {
        PayReconciliationAPI.add(formData)
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

/** 关闭支付对账弹窗 */
function handleCloseDialog() {
  dialog.visible = false;
  dataFormRef.value.resetFields();
  dataFormRef.value.clearValidate();
  formData.id = undefined;
}

/** 删除支付对账 */
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
      PayReconciliationAPI.deleteByIds(ids)
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
