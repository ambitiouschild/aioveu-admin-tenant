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
        <el-form-item label="账户编号" prop="accountNo">
          <el-input
            v-model="queryParams.accountNo"
            placeholder="账户编号"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="业务单号" prop="bizNo">
          <el-input
            v-model="queryParams.bizNo"
            placeholder="业务单号"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item
          label="业务类型：PAYMENT-支付 REFUND-退款 RECHARGE-充值 WITHDRAW-提现"
          prop="bizType"
        >
          <el-input
            v-model="queryParams.bizType"
            placeholder="业务类型：PAYMENT-支付 REFUND-退款 RECHARGE-充值 WITHDRAW-提现"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item
          label="流水类型：INCOME-收入 EXPEND-支出 FREEZE-冻结 UNFREEZE-解冻"
          prop="flowType"
        >
          <el-input
            v-model="queryParams.flowType"
            placeholder="流水类型：INCOME-收入 EXPEND-支出 FREEZE-冻结 UNFREEZE-解冻"
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
          v-hasPerm="['aioveuMallPayAccountFlow:pay-account-flow:add']"
          type="success"
          @click="handleOpenDialog()"
        >
          <template #icon><Plus /></template>
          新增
        </el-button>
        <el-button
          v-hasPerm="['aioveuMallPayAccountFlow:pay-account-flow:delete']"
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
          key="accountNo"
          label="账户编号"
          prop="accountNo"
          min-width="150"
          align="center"
        />
        <el-table-column key="bizNo" label="业务单号" prop="bizNo" min-width="150" align="center" />
        <el-table-column
          key="bizType"
          label="业务类型：PAYMENT-支付 REFUND-退款 RECHARGE-充值 WITHDRAW-提现"
          prop="bizType"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="flowType"
          label="流水类型：INCOME-收入 EXPEND-支出 FREEZE-冻结 UNFREEZE-解冻"
          prop="flowType"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="amount"
          label="变动金额"
          prop="amount"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="balanceBefore"
          label="变动前余额"
          prop="balanceBefore"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="balanceAfter"
          label="变动后余额"
          prop="balanceAfter"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="frozenBefore"
          label="变动前冻结"
          prop="frozenBefore"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="frozenAfter"
          label="变动后冻结"
          prop="frozenAfter"
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
              v-hasPerm="['aioveuMallPayAccountFlow:pay-account-flow:edit']"
              type="primary"
              size="small"
              link
              @click="handleOpenDialog(scope.row.id)"
            >
              <template #icon><Edit /></template>
              编辑
            </el-button>
            <el-button
              v-hasPerm="['aioveuMallPayAccountFlow:pay-account-flow:delete']"
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

    <!-- 账户流水表单弹窗 -->
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

        <el-form-item label="账户编号" prop="accountNo">
          <el-input v-model="formData.accountNo" placeholder="账户编号" />
        </el-form-item>

        <el-form-item label="业务单号" prop="bizNo">
          <el-input v-model="formData.bizNo" placeholder="业务单号" />
        </el-form-item>

        <el-form-item
          label="业务类型：PAYMENT-支付 REFUND-退款 RECHARGE-充值 WITHDRAW-提现"
          prop="bizType"
        >
          <el-input
            v-model="formData.bizType"
            placeholder="业务类型：PAYMENT-支付 REFUND-退款 RECHARGE-充值 WITHDRAW-提现"
          />
        </el-form-item>

        <el-form-item
          label="流水类型：INCOME-收入 EXPEND-支出 FREEZE-冻结 UNFREEZE-解冻"
          prop="flowType"
        >
          <el-input
            v-model="formData.flowType"
            placeholder="流水类型：INCOME-收入 EXPEND-支出 FREEZE-冻结 UNFREEZE-解冻"
          />
        </el-form-item>

        <el-form-item label="变动金额" prop="amount">
          <el-input v-model="formData.amount" placeholder="变动金额" />
        </el-form-item>

        <el-form-item label="变动前余额" prop="balanceBefore">
          <el-input v-model="formData.balanceBefore" placeholder="变动前余额" />
        </el-form-item>

        <el-form-item label="变动后余额" prop="balanceAfter">
          <el-input v-model="formData.balanceAfter" placeholder="变动后余额" />
        </el-form-item>

        <el-form-item label="变动前冻结" prop="frozenBefore">
          <el-input v-model="formData.frozenBefore" placeholder="变动前冻结" />
        </el-form-item>

        <el-form-item label="变动后冻结" prop="frozenAfter">
          <el-input v-model="formData.frozenAfter" placeholder="变动后冻结" />
        </el-form-item>

        <el-form-item label="备注" prop="remark">
          <el-input v-model="formData.remark" placeholder="备注" />
        </el-form-item>

        <el-form-item label="逻辑删除：0-未删除 1-已删除" prop="isDeleted">
          <el-input v-model="formData.isDeleted" placeholder="逻辑删除：0-未删除 1-已删除" />
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
  name: "PayAccountFlow",
  inheritAttrs: false,
});

import PayAccountFlowAPI, {
  PayAccountFlowPageVO,
  PayAccountFlowForm,
  PayAccountFlowPageQuery,
} from "@/api/aioveuMall/aioveuMallPay/aioveuMallPayAccountFlow/pay-account-flow";

const queryFormRef = ref();
const dataFormRef = ref();

const loading = ref(false);
const removeIds = ref<number[]>([]);
const total = ref(0);

const queryParams = reactive<PayAccountFlowPageQuery>({
  pageNum: 1,
  pageSize: 10,
});

// 账户流水表格数据
const pageData = ref<PayAccountFlowPageVO[]>([]);

// 弹窗
const dialog = reactive({
  title: "",
  visible: false,
});

// 账户流水表单数据
const formData = reactive<PayAccountFlowForm>({});

// 账户流水表单校验规则
const rules = reactive({
  flowNo: [{ required: true, message: "请输入流水号", trigger: "blur" }],
  accountNo: [{ required: true, message: "请输入账户编号", trigger: "blur" }],
  bizNo: [{ required: true, message: "请输入业务单号", trigger: "blur" }],
  bizType: [
    {
      required: true,
      message: "请输入业务类型：PAYMENT-支付 REFUND-退款 RECHARGE-充值 WITHDRAW-提现",
      trigger: "blur",
    },
  ],
  flowType: [
    {
      required: true,
      message: "请输入流水类型：INCOME-收入 EXPEND-支出 FREEZE-冻结 UNFREEZE-解冻",
      trigger: "blur",
    },
  ],
  amount: [{ required: true, message: "请输入变动金额", trigger: "blur" }],
  balanceBefore: [{ required: true, message: "请输入变动前余额", trigger: "blur" }],
  balanceAfter: [{ required: true, message: "请输入变动后余额", trigger: "blur" }],
  isDeleted: [{ required: true, message: "请输入逻辑删除：0-未删除 1-已删除", trigger: "blur" }],
});

/** 查询账户流水 */
function handleQuery() {
  loading.value = true;
  PayAccountFlowAPI.getPage(queryParams)
    .then((data) => {
      pageData.value = data.list.flat();
      total.value = data.total;
    })
    .finally(() => {
      loading.value = false;
    });
}

/** 重置账户流水查询 */
function handleResetQuery() {
  queryFormRef.value!.resetFields();
  queryParams.pageNum = 1;
  handleQuery();
}

/** 行复选框选中记录选中ID集合 */
function handleSelectionChange(selection: any) {
  removeIds.value = selection.map((item: any) => item.id);
}

/** 打开账户流水弹窗 */
function handleOpenDialog(id?: number) {
  dialog.visible = true;
  if (id) {
    dialog.title = "修改账户流水";
    PayAccountFlowAPI.getFormData(id).then((data) => {
      Object.assign(formData, data);
    });
  } else {
    dialog.title = "新增账户流水";
  }
}

/** 提交账户流水表单 */
function handleSubmit() {
  dataFormRef.value.validate((valid: any) => {
    if (valid) {
      loading.value = true;
      const id = formData.id;
      if (id) {
        PayAccountFlowAPI.update(id, formData)
          .then(() => {
            ElMessage.success("修改成功");
            handleCloseDialog();
            handleResetQuery();
          })
          .finally(() => (loading.value = false));
      } else {
        PayAccountFlowAPI.add(formData)
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

/** 关闭账户流水弹窗 */
function handleCloseDialog() {
  dialog.visible = false;
  dataFormRef.value.resetFields();
  dataFormRef.value.clearValidate();
  formData.id = undefined;
}

/** 删除账户流水 */
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
      PayAccountFlowAPI.deleteByIds(ids)
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
