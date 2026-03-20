<template>
  <div class="app-container">
    <div class="search-container">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
                <el-form-item label="订单ID" prop="orderId">
                      <el-input
                          v-model="queryParams.orderId"
                          placeholder="订单ID"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="订单编号" prop="orderSn">
                      <el-input
                          v-model="queryParams.orderSn"
                          placeholder="订单编号"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="退款单号" prop="refundSn">
                      <el-input
                          v-model="queryParams.refundSn"
                          placeholder="退款单号"
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
                <el-form-item label="退款类型：1-仅退款 2-退货退款 3-换货" prop="refundType">
                      <el-input
                          v-model="queryParams.refundType"
                          placeholder="退款类型：1-仅退款 2-退货退款 3-换货"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="退款状态：0-待处理 1-审核中 2-审核通过 3-审核拒绝 4-退款中 5-退款成功 6-退款失败" prop="status">
                      <el-input
                          v-model="queryParams.status"
                          placeholder="退款状态：0-待处理 1-审核中 2-审核通过 3-审核拒绝 4-退款中 5-退款成功 6-退款失败"
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
            v-hasPerm="['aioveuMallRefundOrder:refund-order:add']"
            type="success"
            @click="handleOpenDialog()"
        >
          <template #icon><Plus /></template>
          新增
        </el-button>
        <el-button
            v-hasPerm="['aioveuMallRefundOrder:refund-order:delete']"
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
                        key="orderId"
                        label="订单ID"
                        prop="orderId"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="orderSn"
                        label="订单编号"
                        prop="orderSn"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="refundSn"
                        label="退款单号"
                        prop="refundSn"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="userId"
                        label="用户ID"
                        prop="userId"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="refundType"
                        label="退款类型：1-仅退款 2-退货退款 3-换货"
                        prop="refundType"
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
                        key="description"
                        label="补充说明"
                        prop="description"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="proofImages"
                        label="退款凭证图片（JSON数组）"
                        prop="proofImages"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="refundAmount"
                        label="申请退款金额（分）"
                        prop="refundAmount"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="actualRefundAmount"
                        label="实际退款金额（分）"
                        prop="actualRefundAmount"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="status"
                        label="退款状态：0-待处理 1-审核中 2-审核通过 3-审核拒绝 4-退款中 5-退款成功 6-退款失败"
                        prop="status"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="handleNote"
                        label="处理备注"
                        prop="handleNote"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="handleBy"
                        label="处理人"
                        prop="handleBy"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="handleTime"
                        label="处理时间"
                        prop="handleTime"
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
                    <el-table-column
                        key="deleted"
                        label="逻辑删除：0-正常 1-删除"
                        prop="deleted"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="version"
                        label="版本号（用于乐观锁）"
                        prop="version"
                        min-width="150"
                        align="center"
                    />
        <el-table-column fixed="right" label="操作" width="220">
          <template #default="scope">
            <el-button
                v-hasPerm="['aioveuMallRefundOrder:refund-order:edit']"
                type="primary"
                size="small"
                link
                @click="handleOpenDialog(scope.row.id)"
            >
              <template #icon><Edit /></template>
              编辑
            </el-button>
            <el-button
                v-hasPerm="['aioveuMallRefundOrder:refund-order:delete']"
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

    <!-- 订单退款申请表单弹窗 -->
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

                <el-form-item label="订单ID" prop="orderId">
                      <el-input
                          v-model="formData.orderId"
                          placeholder="订单ID"
                      />
                </el-form-item>

                <el-form-item label="订单编号" prop="orderSn">
                      <el-input
                          v-model="formData.orderSn"
                          placeholder="订单编号"
                      />
                </el-form-item>

                <el-form-item label="退款单号" prop="refundSn">
                      <el-input
                          v-model="formData.refundSn"
                          placeholder="退款单号"
                      />
                </el-form-item>

                <el-form-item label="用户ID" prop="userId">
                      <el-input
                          v-model="formData.userId"
                          placeholder="用户ID"
                      />
                </el-form-item>

                <el-form-item label="退款类型：1-仅退款 2-退货退款 3-换货" prop="refundType">
                      <el-input
                          v-model="formData.refundType"
                          placeholder="退款类型：1-仅退款 2-退货退款 3-换货"
                      />
                </el-form-item>

                <el-form-item label="退款原因" prop="refundReason">
                      <el-input
                          v-model="formData.refundReason"
                          placeholder="退款原因"
                      />
                </el-form-item>

                <el-form-item label="补充说明" prop="description">
                      <el-input
                          v-model="formData.description"
                          placeholder="补充说明"
                      />
                </el-form-item>

                <el-form-item label="退款凭证图片（JSON数组）" prop="proofImages">
                      <el-input
                          v-model="formData.proofImages"
                          placeholder="退款凭证图片（JSON数组）"
                      />
                </el-form-item>

                <el-form-item label="申请退款金额（分）" prop="refundAmount">
                      <el-input
                          v-model="formData.refundAmount"
                          placeholder="申请退款金额（分）"
                      />
                </el-form-item>

                <el-form-item label="实际退款金额（分）" prop="actualRefundAmount">
                      <el-input
                          v-model="formData.actualRefundAmount"
                          placeholder="实际退款金额（分）"
                      />
                </el-form-item>

                <el-form-item label="退款状态：0-待处理 1-审核中 2-审核通过 3-审核拒绝 4-退款中 5-退款成功 6-退款失败" prop="status">
                      <el-input
                          v-model="formData.status"
                          placeholder="退款状态：0-待处理 1-审核中 2-审核通过 3-审核拒绝 4-退款中 5-退款成功 6-退款失败"
                      />
                </el-form-item>

                <el-form-item label="处理备注" prop="handleNote">
                      <el-input
                          v-model="formData.handleNote"
                          placeholder="处理备注"
                      />
                </el-form-item>

                <el-form-item label="处理人" prop="handleBy">
                      <el-input
                          v-model="formData.handleBy"
                          placeholder="处理人"
                      />
                </el-form-item>

                <el-form-item label="处理时间" prop="handleTime">
                      <el-date-picker
                          v-model="formData.handleTime"
                          type="datetime"
                          placeholder="处理时间"
                          value-format="YYYY-MM-DD HH:mm:ss"
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

                <el-form-item label="逻辑删除：0-正常 1-删除" prop="deleted">
                      <el-input
                          v-model="formData.deleted"
                          placeholder="逻辑删除：0-正常 1-删除"
                      />
                </el-form-item>

                <el-form-item label="版本号（用于乐观锁）" prop="version">
                      <el-input
                          v-model="formData.version"
                          placeholder="版本号（用于乐观锁）"
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
    name: "RefundOrder",
    inheritAttrs: false,
  });

  import RefundOrderAPI, { RefundOrderPageVO, RefundOrderForm, RefundOrderPageQuery } from "@/api/aioveuMall/aioveuMallRefund/aioveuMallRefundOrder/refund-order";

  const queryFormRef = ref();
  const dataFormRef = ref();

  const loading = ref(false);
  const removeIds = ref<number[]>([]);
  const total = ref(0);

  const queryParams = reactive<RefundOrderPageQuery>({
    pageNum: 1,
    pageSize: 10,
  });

  // 订单退款申请表格数据
  const pageData = ref<RefundOrderPageVO[]>([]);

  // 弹窗
  const dialog = reactive({
    title: "",
    visible: false,
  });

  // 订单退款申请表单数据
  const formData = reactive<RefundOrderForm>({});

  // 订单退款申请表单校验规则
  const rules = reactive({
                      orderId: [{ required: true, message: "请输入订单ID", trigger: "blur" }],
                      orderSn: [{ required: true, message: "请输入订单编号", trigger: "blur" }],
                      refundSn: [{ required: true, message: "请输入退款单号", trigger: "blur" }],
                      userId: [{ required: true, message: "请输入用户ID", trigger: "blur" }],
                      refundType: [{ required: true, message: "请输入退款类型：1-仅退款 2-退货退款 3-换货", trigger: "blur" }],
                      refundReason: [{ required: true, message: "请输入退款原因", trigger: "blur" }],
                      refundAmount: [{ required: true, message: "请输入申请退款金额（分）", trigger: "blur" }],
                      status: [{ required: true, message: "请输入退款状态：0-待处理 1-审核中 2-审核通过 3-审核拒绝 4-退款中 5-退款成功 6-退款失败", trigger: "blur" }],
  });

  /** 查询订单退款申请 */
  function handleQuery() {
    loading.value = true;
          RefundOrderAPI.getPage(queryParams)
        .then((data) => {
          pageData.value = data.list.flat();
          total.value = data.total;
        })
        .finally(() => {
          loading.value = false;
        });
  }

  /** 重置订单退款申请查询 */
  function handleResetQuery() {
    queryFormRef.value!.resetFields();
    queryParams.pageNum = 1;
    handleQuery();
  }

  /** 行复选框选中记录选中ID集合 */
  function handleSelectionChange(selection: any) {
    removeIds.value = selection.map((item: any) => item.id);
  }

  /** 打开订单退款申请弹窗 */
  function handleOpenDialog(id?: number) {
    dialog.visible = true;
    if (id) {
      dialog.title = "修改订单退款申请";
            RefundOrderAPI.getFormData(id).then((data) => {
        Object.assign(formData, data);
      });
    } else {
      dialog.title = "新增订单退款申请";
    }
  }

  /** 提交订单退款申请表单 */
  function handleSubmit() {
    dataFormRef.value.validate((valid: any) => {
      if (valid) {
        loading.value = true;
        const id = formData.id;
        if (id) {
                RefundOrderAPI.update(id, formData)
              .then(() => {
                ElMessage.success("修改成功");
                handleCloseDialog();
                handleResetQuery();
              })
              .finally(() => (loading.value = false));
        } else {
                RefundOrderAPI.add(formData)
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

  /** 关闭订单退款申请弹窗 */
  function handleCloseDialog() {
    dialog.visible = false;
    dataFormRef.value.resetFields();
    dataFormRef.value.clearValidate();
    formData.id = undefined;
  }

  /** 删除订单退款申请 */
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
                RefundOrderAPI.deleteByIds(ids)
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
