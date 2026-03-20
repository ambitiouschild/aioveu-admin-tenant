<template>
  <div class="app-container">
    <div class="search-container">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
        <el-form-item label="账户编号" prop="accountNo">
          <el-input
            v-model="queryParams.accountNo"
            placeholder="账户编号"
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
          label="账户类型：USER-用户账户 MERCHANT-商户账户 PLATFORM-平台账户"
          prop="accountType"
        >
          <el-input
            v-model="queryParams.accountType"
            placeholder="账户类型：USER-用户账户 MERCHANT-商户账户 PLATFORM-平台账户"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="账户状态：0-冻结 1-正常 2-注销" prop="status">
          <el-input
            v-model="queryParams.status"
            placeholder="账户状态：0-冻结 1-正常 2-注销"
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
          v-hasPerm="['aioveuMallPayAccount:pay-account:add']"
          type="success"
          @click="handleOpenDialog()"
        >
          <template #icon><Plus /></template>
          新增
        </el-button>
        <el-button
          v-hasPerm="['aioveuMallPayAccount:pay-account:delete']"
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
          key="accountNo"
          label="账户编号"
          prop="accountNo"
          min-width="150"
          align="center"
        />
        <el-table-column key="userId" label="用户ID" prop="userId" min-width="150" align="center" />
        <el-table-column
          key="accountType"
          label="账户类型：USER-用户账户 MERCHANT-商户账户 PLATFORM-平台账户"
          prop="accountType"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="balance"
          label="账户余额"
          prop="balance"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="frozenBalance"
          label="冻结余额"
          prop="frozenBalance"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="availableBalance"
          label="可用余额"
          prop="availableBalance"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="totalIncome"
          label="总收入"
          prop="totalIncome"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="totalExpend"
          label="总支出"
          prop="totalExpend"
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
          key="status"
          label="账户状态：0-冻结 1-正常 2-注销"
          prop="status"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="version"
          label="版本号，用于乐观锁"
          prop="version"
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
              v-hasPerm="['aioveuMallPayAccount:pay-account:edit']"
              type="primary"
              size="small"
              link
              @click="handleOpenDialog(scope.row.id)"
            >
              <template #icon><Edit /></template>
              编辑
            </el-button>
            <el-button
              v-hasPerm="['aioveuMallPayAccount:pay-account:delete']"
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

    <!-- 支付账户表单弹窗 -->
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

        <el-form-item label="账户编号" prop="accountNo">
          <el-input v-model="formData.accountNo" placeholder="账户编号" />
        </el-form-item>

        <el-form-item label="用户ID" prop="userId">
          <el-input v-model="formData.userId" placeholder="用户ID" />
        </el-form-item>

        <el-form-item
          label="账户类型：USER-用户账户 MERCHANT-商户账户 PLATFORM-平台账户"
          prop="accountType"
        >
          <el-input
            v-model="formData.accountType"
            placeholder="账户类型：USER-用户账户 MERCHANT-商户账户 PLATFORM-平台账户"
          />
        </el-form-item>

        <el-form-item label="账户余额" prop="balance">
          <el-input v-model="formData.balance" placeholder="账户余额" />
        </el-form-item>

        <el-form-item label="冻结余额" prop="frozenBalance">
          <el-input v-model="formData.frozenBalance" placeholder="冻结余额" />
        </el-form-item>

        <el-form-item label="可用余额" prop="availableBalance">
          <el-input v-model="formData.availableBalance" placeholder="可用余额" />
        </el-form-item>

        <el-form-item label="总收入" prop="totalIncome">
          <el-input v-model="formData.totalIncome" placeholder="总收入" />
        </el-form-item>

        <el-form-item label="总支出" prop="totalExpend">
          <el-input v-model="formData.totalExpend" placeholder="总支出" />
        </el-form-item>

        <el-form-item label="币种" prop="currency">
          <el-input v-model="formData.currency" placeholder="币种" />
        </el-form-item>

        <el-form-item label="账户状态：0-冻结 1-正常 2-注销" prop="status">
          <el-input v-model="formData.status" placeholder="账户状态：0-冻结 1-正常 2-注销" />
        </el-form-item>

        <el-form-item label="版本号，用于乐观锁" prop="version">
          <el-input v-model="formData.version" placeholder="版本号，用于乐观锁" />
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
  name: "PayAccount",
  inheritAttrs: false,
});

import PayAccountAPI, {
  PayAccountPageVO,
  PayAccountForm,
  PayAccountPageQuery,
} from "@/api/aioveuMall/aioveuMallPay/aioveuMallPayAccount/pay-account";

const queryFormRef = ref();
const dataFormRef = ref();

const loading = ref(false);
const removeIds = ref<number[]>([]);
const total = ref(0);

const queryParams = reactive<PayAccountPageQuery>({
  pageNum: 1,
  pageSize: 10,
});

// 支付账户表格数据
const pageData = ref<PayAccountPageVO[]>([]);

// 弹窗
const dialog = reactive({
  title: "",
  visible: false,
});

// 支付账户表单数据
const formData = reactive<PayAccountForm>({});

// 支付账户表单校验规则
const rules = reactive({
  accountNo: [{ required: true, message: "请输入账户编号", trigger: "blur" }],
  userId: [{ required: true, message: "请输入用户ID", trigger: "blur" }],
  accountType: [
    {
      required: true,
      message: "请输入账户类型：USER-用户账户 MERCHANT-商户账户 PLATFORM-平台账户",
      trigger: "blur",
    },
  ],
  balance: [{ required: true, message: "请输入账户余额", trigger: "blur" }],
  frozenBalance: [{ required: true, message: "请输入冻结余额", trigger: "blur" }],
  totalIncome: [{ required: true, message: "请输入总收入", trigger: "blur" }],
  totalExpend: [{ required: true, message: "请输入总支出", trigger: "blur" }],
  status: [{ required: true, message: "请输入账户状态：0-冻结 1-正常 2-注销", trigger: "blur" }],
  version: [{ required: true, message: "请输入版本号，用于乐观锁", trigger: "blur" }],
  isDeleted: [{ required: true, message: "请输入逻辑删除：0-未删除 1-已删除", trigger: "blur" }],
});

/** 查询支付账户 */
function handleQuery() {
  loading.value = true;
  PayAccountAPI.getPage(queryParams)
    .then((data) => {
      pageData.value = data.list.flat();
      total.value = data.total;
    })
    .finally(() => {
      loading.value = false;
    });
}

/** 重置支付账户查询 */
function handleResetQuery() {
  queryFormRef.value!.resetFields();
  queryParams.pageNum = 1;
  handleQuery();
}

/** 行复选框选中记录选中ID集合 */
function handleSelectionChange(selection: any) {
  removeIds.value = selection.map((item: any) => item.id);
}

/** 打开支付账户弹窗 */
function handleOpenDialog(id?: number) {
  dialog.visible = true;
  if (id) {
    dialog.title = "修改支付账户";
    PayAccountAPI.getFormData(id).then((data) => {
      Object.assign(formData, data);
    });
  } else {
    dialog.title = "新增支付账户";
  }
}

/** 提交支付账户表单 */
function handleSubmit() {
  dataFormRef.value.validate((valid: any) => {
    if (valid) {
      loading.value = true;
      const id = formData.id;
      if (id) {
        PayAccountAPI.update(id, formData)
          .then(() => {
            ElMessage.success("修改成功");
            handleCloseDialog();
            handleResetQuery();
          })
          .finally(() => (loading.value = false));
      } else {
        PayAccountAPI.add(formData)
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

/** 关闭支付账户弹窗 */
function handleCloseDialog() {
  dialog.visible = false;
  dataFormRef.value.resetFields();
  dataFormRef.value.clearValidate();
  formData.id = undefined;
}

/** 删除支付账户 */
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
      PayAccountAPI.deleteByIds(ids)
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
