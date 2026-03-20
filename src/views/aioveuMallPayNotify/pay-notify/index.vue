<template>
  <div class="app-container">
    <div class="search-container">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
        <el-form-item label="通知编号" prop="notifyNo">
          <el-input
            v-model="queryParams.notifyNo"
            placeholder="通知编号"
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
        <el-form-item label="通知类型：PAYMENT-支付 REFUND-退款" prop="notifyType">
          <el-input
            v-model="queryParams.notifyType"
            placeholder="通知类型：PAYMENT-支付 REFUND-退款"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="通知状态：0-待通知 1-通知中 2-通知成功 3-通知失败" prop="notifyStatus">
          <el-input
            v-model="queryParams.notifyStatus"
            placeholder="通知状态：0-待通知 1-通知中 2-通知成功 3-通知失败"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="下次通知时间" prop="nextNotifyTime">
          <el-date-picker
            v-model="queryParams.nextNotifyTime"
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
          v-hasPerm="['aioveuMallPayNotify:pay-notify:add']"
          type="success"
          @click="handleOpenDialog()"
        >
          <template #icon><Plus /></template>
          新增
        </el-button>
        <el-button
          v-hasPerm="['aioveuMallPayNotify:pay-notify:delete']"
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
          key="notifyNo"
          label="通知编号"
          prop="notifyNo"
          min-width="150"
          align="center"
        />
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
          key="notifyType"
          label="通知类型：PAYMENT-支付 REFUND-退款"
          prop="notifyType"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="notifyUrl"
          label="通知地址"
          prop="notifyUrl"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="requestData"
          label="请求数据"
          prop="requestData"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="responseData"
          label="响应数据"
          prop="responseData"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="notifyStatus"
          label="通知状态：0-待通知 1-通知中 2-通知成功 3-通知失败"
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
          key="maxNotifyCount"
          label="最大通知次数"
          prop="maxNotifyCount"
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
          key="lastNotifyTime"
          label="最后通知时间"
          prop="lastNotifyTime"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="successTime"
          label="成功时间"
          prop="successTime"
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
              v-hasPerm="['aioveuMallPayNotify:pay-notify:edit']"
              type="primary"
              size="small"
              link
              @click="handleOpenDialog(scope.row.id)"
            >
              <template #icon><Edit /></template>
              编辑
            </el-button>
            <el-button
              v-hasPerm="['aioveuMallPayNotify:pay-notify:delete']"
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

    <!-- 支付通知表单弹窗 -->
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

        <el-form-item label="通知编号" prop="notifyNo">
          <el-input v-model="formData.notifyNo" placeholder="通知编号" />
        </el-form-item>

        <el-form-item label="支付单号" prop="paymentNo">
          <el-input v-model="formData.paymentNo" placeholder="支付单号" />
        </el-form-item>

        <el-form-item label="退款单号" prop="refundNo">
          <el-input v-model="formData.refundNo" placeholder="退款单号" />
        </el-form-item>

        <el-form-item label="通知类型：PAYMENT-支付 REFUND-退款" prop="notifyType">
          <el-input
            v-model="formData.notifyType"
            placeholder="通知类型：PAYMENT-支付 REFUND-退款"
          />
        </el-form-item>

        <el-form-item label="通知地址" prop="notifyUrl">
          <el-input v-model="formData.notifyUrl" placeholder="通知地址" />
        </el-form-item>

        <el-form-item label="请求数据" prop="requestData">
          <el-input v-model="formData.requestData" placeholder="请求数据" />
        </el-form-item>

        <el-form-item label="响应数据" prop="responseData">
          <el-input v-model="formData.responseData" placeholder="响应数据" />
        </el-form-item>

        <el-form-item label="通知状态：0-待通知 1-通知中 2-通知成功 3-通知失败" prop="notifyStatus">
          <el-input
            v-model="formData.notifyStatus"
            placeholder="通知状态：0-待通知 1-通知中 2-通知成功 3-通知失败"
          />
        </el-form-item>

        <el-form-item label="通知次数" prop="notifyCount">
          <el-input v-model="formData.notifyCount" placeholder="通知次数" />
        </el-form-item>

        <el-form-item label="最大通知次数" prop="maxNotifyCount">
          <el-input v-model="formData.maxNotifyCount" placeholder="最大通知次数" />
        </el-form-item>

        <el-form-item label="下次通知时间" prop="nextNotifyTime">
          <el-date-picker
            v-model="formData.nextNotifyTime"
            type="datetime"
            placeholder="下次通知时间"
            value-format="YYYY-MM-DD HH:mm:ss"
          />
        </el-form-item>

        <el-form-item label="最后通知时间" prop="lastNotifyTime">
          <el-date-picker
            v-model="formData.lastNotifyTime"
            type="datetime"
            placeholder="最后通知时间"
            value-format="YYYY-MM-DD HH:mm:ss"
          />
        </el-form-item>

        <el-form-item label="成功时间" prop="successTime">
          <el-date-picker
            v-model="formData.successTime"
            type="datetime"
            placeholder="成功时间"
            value-format="YYYY-MM-DD HH:mm:ss"
          />
        </el-form-item>

        <el-form-item label="错误信息" prop="errorMessage">
          <el-input v-model="formData.errorMessage" placeholder="错误信息" />
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
  name: "PayNotify",
  inheritAttrs: false,
});

import PayNotifyAPI, {
  PayNotifyPageVO,
  PayNotifyForm,
  PayNotifyPageQuery,
} from "@/api/aioveuMall/aioveuMallPay/aioveuMallPayNotify/pay-notify";

const queryFormRef = ref();
const dataFormRef = ref();

const loading = ref(false);
const removeIds = ref<number[]>([]);
const total = ref(0);

const queryParams = reactive<PayNotifyPageQuery>({
  pageNum: 1,
  pageSize: 10,
});

// 支付通知表格数据
const pageData = ref<PayNotifyPageVO[]>([]);

// 弹窗
const dialog = reactive({
  title: "",
  visible: false,
});

// 支付通知表单数据
const formData = reactive<PayNotifyForm>({});

// 支付通知表单校验规则
const rules = reactive({
  id: [{ required: true, message: "请输入主键ID", trigger: "blur" }],
  notifyNo: [{ required: true, message: "请输入通知编号", trigger: "blur" }],
  notifyType: [
    { required: true, message: "请输入通知类型：PAYMENT-支付 REFUND-退款", trigger: "blur" },
  ],
  notifyUrl: [{ required: true, message: "请输入通知地址", trigger: "blur" }],
  notifyStatus: [
    {
      required: true,
      message: "请输入通知状态：0-待通知 1-通知中 2-通知成功 3-通知失败",
      trigger: "blur",
    },
  ],
  notifyCount: [{ required: true, message: "请输入通知次数", trigger: "blur" }],
  maxNotifyCount: [{ required: true, message: "请输入最大通知次数", trigger: "blur" }],
  nextNotifyTime: [{ required: true, message: "请输入下次通知时间", trigger: "blur" }],
  isDeleted: [{ required: true, message: "请输入逻辑删除：0-未删除 1-已删除", trigger: "blur" }],
  createTime: [{ required: true, message: "请输入创建时间", trigger: "blur" }],
  updateTime: [{ required: true, message: "请输入更新时间", trigger: "blur" }],
});

/** 查询支付通知 */
function handleQuery() {
  loading.value = true;
  PayNotifyAPI.getPage(queryParams)
    .then((data) => {
      pageData.value = data.list.flat();
      total.value = data.total;
    })
    .finally(() => {
      loading.value = false;
    });
}

/** 重置支付通知查询 */
function handleResetQuery() {
  queryFormRef.value!.resetFields();
  queryParams.pageNum = 1;
  handleQuery();
}

/** 行复选框选中记录选中ID集合 */
function handleSelectionChange(selection: any) {
  removeIds.value = selection.map((item: any) => item.id);
}

/** 打开支付通知弹窗 */
function handleOpenDialog(id?: number) {
  dialog.visible = true;
  if (id) {
    dialog.title = "修改支付通知";
    PayNotifyAPI.getFormData(id).then((data) => {
      Object.assign(formData, data);
    });
  } else {
    dialog.title = "新增支付通知";
  }
}

/** 提交支付通知表单 */
function handleSubmit() {
  dataFormRef.value.validate((valid: any) => {
    if (valid) {
      loading.value = true;
      const id = formData.id;
      if (id) {
        PayNotifyAPI.update(id, formData)
          .then(() => {
            ElMessage.success("修改成功");
            handleCloseDialog();
            handleResetQuery();
          })
          .finally(() => (loading.value = false));
      } else {
        PayNotifyAPI.add(formData)
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

/** 关闭支付通知弹窗 */
function handleCloseDialog() {
  dialog.visible = false;
  dataFormRef.value.resetFields();
  dataFormRef.value.clearValidate();
  formData.id = undefined;
}

/** 删除支付通知 */
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
      PayNotifyAPI.deleteByIds(ids)
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
