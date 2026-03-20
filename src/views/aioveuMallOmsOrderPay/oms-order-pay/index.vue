<template>
  <div class="app-container">
    <div class="search-container">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
                <el-form-item label="订单id" prop="orderId">
                      <el-input
                          v-model="queryParams.orderId"
                          placeholder="订单id"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="支付流水号" prop="paySn">
                      <el-input
                          v-model="queryParams.paySn"
                          placeholder="支付流水号"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="应付总额(分)" prop="payAmount">
                      <el-input
                          v-model="queryParams.payAmount"
                          placeholder="应付总额(分)"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="支付方式【1->支付宝；2->微信；3->银联； 4->货到付款；】" prop="payType">
                      <el-input
                          v-model="queryParams.payType"
                          placeholder="支付方式【1->支付宝；2->微信；3->银联； 4->货到付款；】"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="支付状态" prop="payStatus">
                      <el-input
                          v-model="queryParams.payStatus"
                          placeholder="支付状态"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="回调时间" prop="callbackTime">
                      <el-date-picker
                          v-model="queryParams.callbackTime"
                          type="daterange"
                          range-separator="~"
                          start-placeholder="开始时间"
                          end-placeholder="结束时间"
                          value-format="YYYY-MM-DD HH:mm:ss"
                      />
                </el-form-item>
                <el-form-item label="逻辑删除【0->正常；1->已删除】" prop="deleted">
                      <el-input
                          v-model="queryParams.deleted"
                          placeholder="逻辑删除【0->正常；1->已删除】"
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
            v-hasPerm="['aioveuMallOmsOrderPay:oms-order-pay:add']"
            type="success"
            @click="handleOpenDialog()"
        >
          <template #icon><Plus /></template>
          新增
        </el-button>
        <el-button
            v-hasPerm="['aioveuMallOmsOrderPay:oms-order-pay:delete']"
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
                        label="id"
                        prop="id"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="orderId"
                        label="订单id"
                        prop="orderId"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="paySn"
                        label="支付流水号"
                        prop="paySn"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="payAmount"
                        label="应付总额(分)"
                        prop="payAmount"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="payTime"
                        label="支付时间"
                        prop="payTime"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="payType"
                        label="支付方式【1->支付宝；2->微信；3->银联； 4->货到付款；】"
                        prop="payType"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="payStatus"
                        label="支付状态"
                        prop="payStatus"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="confirmTime"
                        label="确认时间"
                        prop="confirmTime"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="callbackContent"
                        label="回调内容"
                        prop="callbackContent"
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
                        key="paySubject"
                        label="交易内容"
                        prop="paySubject"
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
                v-hasPerm="['aioveuMallOmsOrderPay:oms-order-pay:edit']"
                type="primary"
                size="small"
                link
                @click="handleOpenDialog(scope.row.id)"
            >
              <template #icon><Edit /></template>
              编辑
            </el-button>
            <el-button
                v-hasPerm="['aioveuMallOmsOrderPay:oms-order-pay:delete']"
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

    <!-- 支付信息表单弹窗 -->
    <el-dialog
        v-model="dialog.visible"
        :title="dialog.title"
        width="500px"
        @close="handleCloseDialog"
    >
      <el-form ref="dataFormRef" :model="formData" :rules="rules" label-width="100px">
                <el-form-item label="id" prop="id">
                      <el-input
                          v-model="formData.id"
                          placeholder="id"
                      />
                </el-form-item>

                <el-form-item label="订单id" prop="orderId">
                      <el-input
                          v-model="formData.orderId"
                          placeholder="订单id"
                      />
                </el-form-item>

                <el-form-item label="支付流水号" prop="paySn">
                      <el-input
                          v-model="formData.paySn"
                          placeholder="支付流水号"
                      />
                </el-form-item>

                <el-form-item label="应付总额(分)" prop="payAmount">
                      <el-input
                          v-model="formData.payAmount"
                          placeholder="应付总额(分)"
                      />
                </el-form-item>

                <el-form-item label="支付时间" prop="payTime">
                      <el-date-picker
                          v-model="formData.payTime"
                          type="datetime"
                          placeholder="支付时间"
                          value-format="YYYY-MM-DD HH:mm:ss"
                      />
                </el-form-item>

                <el-form-item label="支付方式【1->支付宝；2->微信；3->银联； 4->货到付款；】" prop="payType">
                      <el-input
                          v-model="formData.payType"
                          placeholder="支付方式【1->支付宝；2->微信；3->银联； 4->货到付款；】"
                      />
                </el-form-item>

                <el-form-item label="支付状态" prop="payStatus">
                      <el-input
                          v-model="formData.payStatus"
                          placeholder="支付状态"
                      />
                </el-form-item>

                <el-form-item label="确认时间" prop="confirmTime">
                      <el-date-picker
                          v-model="formData.confirmTime"
                          type="datetime"
                          placeholder="确认时间"
                          value-format="YYYY-MM-DD HH:mm:ss"
                      />
                </el-form-item>

                <el-form-item label="回调内容" prop="callbackContent">
                      <el-input
                          v-model="formData.callbackContent"
                          placeholder="回调内容"
                      />
                </el-form-item>

                <el-form-item label="回调时间" prop="callbackTime">
                      <el-date-picker
                          v-model="formData.callbackTime"
                          type="datetime"
                          placeholder="回调时间"
                          value-format="YYYY-MM-DD HH:mm:ss"
                      />
                </el-form-item>

                <el-form-item label="交易内容" prop="paySubject">
                      <el-input
                          v-model="formData.paySubject"
                          placeholder="交易内容"
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
    name: "OmsOrderPay",
    inheritAttrs: false,
  });

  import OmsOrderPayAPI, { OmsOrderPayPageVO, OmsOrderPayForm, OmsOrderPayPageQuery } from "@/api/aioveuMall/aioveuMallOms/aioveuMallOmsOrderPay/oms-order-pay";

  const queryFormRef = ref();
  const dataFormRef = ref();

  const loading = ref(false);
  const removeIds = ref<number[]>([]);
  const total = ref(0);

  const queryParams = reactive<OmsOrderPayPageQuery>({
    pageNum: 1,
    pageSize: 10,
  });

  // 支付信息表格数据
  const pageData = ref<OmsOrderPayPageVO[]>([]);

  // 弹窗
  const dialog = reactive({
    title: "",
    visible: false,
  });

  // 支付信息表单数据
  const formData = reactive<OmsOrderPayForm>({});

  // 支付信息表单校验规则
  const rules = reactive({
                      orderId: [{ required: true, message: "请输入订单id", trigger: "blur" }],
                      paySn: [{ required: true, message: "请输入支付流水号", trigger: "blur" }],
                      payAmount: [{ required: true, message: "请输入应付总额(分)", trigger: "blur" }],
                      callbackContent: [{ required: true, message: "请输入回调内容", trigger: "blur" }],
                      paySubject: [{ required: true, message: "请输入交易内容", trigger: "blur" }],
  });

  /** 查询支付信息 */
  function handleQuery() {
    loading.value = true;
          OmsOrderPayAPI.getPage(queryParams)
        .then((data) => {
          pageData.value = data.list.flat();
          total.value = data.total;
        })
        .finally(() => {
          loading.value = false;
        });
  }

  /** 重置支付信息查询 */
  function handleResetQuery() {
    queryFormRef.value!.resetFields();
    queryParams.pageNum = 1;
    handleQuery();
  }

  /** 行复选框选中记录选中ID集合 */
  function handleSelectionChange(selection: any) {
    removeIds.value = selection.map((item: any) => item.id);
  }

  /** 打开支付信息弹窗 */
  function handleOpenDialog(id?: number) {
    dialog.visible = true;
    if (id) {
      dialog.title = "修改支付信息";
            OmsOrderPayAPI.getFormData(id).then((data) => {
        Object.assign(formData, data);
      });
    } else {
      dialog.title = "新增支付信息";
    }
  }

  /** 提交支付信息表单 */
  function handleSubmit() {
    dataFormRef.value.validate((valid: any) => {
      if (valid) {
        loading.value = true;
        const id = formData.id;
        if (id) {
                OmsOrderPayAPI.update(id, formData)
              .then(() => {
                ElMessage.success("修改成功");
                handleCloseDialog();
                handleResetQuery();
              })
              .finally(() => (loading.value = false));
        } else {
                OmsOrderPayAPI.add(formData)
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

  /** 关闭支付信息弹窗 */
  function handleCloseDialog() {
    dialog.visible = false;
    dataFormRef.value.resetFields();
    dataFormRef.value.clearValidate();
    formData.id = undefined;
  }

  /** 删除支付信息 */
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
                OmsOrderPayAPI.deleteByIds(ids)
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
