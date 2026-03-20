<template>
  <div class="app-container">
    <div class="search-container">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
                <el-form-item label="退款申请ID" prop="refundId">
                      <el-input
                          v-model="queryParams.refundId"
                          placeholder="退款申请ID"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="物流类型：1-买家发货 2-卖家发货 3-换货发货" prop="deliveryType">
                      <el-input
                          v-model="queryParams.deliveryType"
                          placeholder="物流类型：1-买家发货 2-卖家发货 3-换货发货"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="物流公司" prop="deliveryCompany">
                      <el-input
                          v-model="queryParams.deliveryCompany"
                          placeholder="物流公司"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="物流单号" prop="deliverySn">
                      <el-input
                          v-model="queryParams.deliverySn"
                          placeholder="物流单号"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="收货人姓名" prop="receiverName">
                      <el-input
                          v-model="queryParams.receiverName"
                          placeholder="收货人姓名"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="收货人电话" prop="receiverPhone">
                      <el-input
                          v-model="queryParams.receiverPhone"
                          placeholder="收货人电话"
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
            v-hasPerm="['aioveuMallRefundDelivery:refund-delivery:add']"
            type="success"
            @click="handleOpenDialog()"
        >
          <template #icon><Plus /></template>
          新增
        </el-button>
        <el-button
            v-hasPerm="['aioveuMallRefundDelivery:refund-delivery:delete']"
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
                        key="refundId"
                        label="退款申请ID"
                        prop="refundId"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="deliveryType"
                        label="物流类型：1-买家发货 2-卖家发货 3-换货发货"
                        prop="deliveryType"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="deliveryCompany"
                        label="物流公司"
                        prop="deliveryCompany"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="deliverySn"
                        label="物流单号"
                        prop="deliverySn"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="receiverName"
                        label="收货人姓名"
                        prop="receiverName"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="receiverPhone"
                        label="收货人电话"
                        prop="receiverPhone"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="receiverAddress"
                        label="收货地址"
                        prop="receiverAddress"
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
                        label="收货时间"
                        prop="receiveTime"
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
                        label="逻辑删除"
                        prop="deleted"
                        min-width="150"
                        align="center"
                    />
        <el-table-column fixed="right" label="操作" width="220">
          <template #default="scope">
            <el-button
                v-hasPerm="['aioveuMallRefundDelivery:refund-delivery:edit']"
                type="primary"
                size="small"
                link
                @click="handleOpenDialog(scope.row.id)"
            >
              <template #icon><Edit /></template>
              编辑
            </el-button>
            <el-button
                v-hasPerm="['aioveuMallRefundDelivery:refund-delivery:delete']"
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

    <!-- 退款物流信息（用于退货）表单弹窗 -->
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

                <el-form-item label="退款申请ID" prop="refundId">
                      <el-input
                          v-model="formData.refundId"
                          placeholder="退款申请ID"
                      />
                </el-form-item>

                <el-form-item label="物流类型：1-买家发货 2-卖家发货 3-换货发货" prop="deliveryType">
                      <el-input
                          v-model="formData.deliveryType"
                          placeholder="物流类型：1-买家发货 2-卖家发货 3-换货发货"
                      />
                </el-form-item>

                <el-form-item label="物流公司" prop="deliveryCompany">
                      <el-input
                          v-model="formData.deliveryCompany"
                          placeholder="物流公司"
                      />
                </el-form-item>

                <el-form-item label="物流单号" prop="deliverySn">
                      <el-input
                          v-model="formData.deliverySn"
                          placeholder="物流单号"
                      />
                </el-form-item>

                <el-form-item label="收货人姓名" prop="receiverName">
                      <el-input
                          v-model="formData.receiverName"
                          placeholder="收货人姓名"
                      />
                </el-form-item>

                <el-form-item label="收货人电话" prop="receiverPhone">
                      <el-input
                          v-model="formData.receiverPhone"
                          placeholder="收货人电话"
                      />
                </el-form-item>

                <el-form-item label="收货地址" prop="receiverAddress">
                      <el-input
                          v-model="formData.receiverAddress"
                          placeholder="收货地址"
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

                <el-form-item label="收货时间" prop="receiveTime">
                      <el-date-picker
                          v-model="formData.receiveTime"
                          type="datetime"
                          placeholder="收货时间"
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

                <el-form-item label="逻辑删除" prop="deleted">
                      <el-input
                          v-model="formData.deleted"
                          placeholder="逻辑删除"
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
    name: "RefundDelivery",
    inheritAttrs: false,
  });

  import RefundDeliveryAPI, { RefundDeliveryPageVO,
    RefundDeliveryForm,
    RefundDeliveryPageQuery } from "@/api/aioveuMall/aioveuMallRefund/aioveuMallRefundDelivery/refund-delivery";

  const queryFormRef = ref();
  const dataFormRef = ref();

  const loading = ref(false);
  const removeIds = ref<number[]>([]);
  const total = ref(0);

  const queryParams = reactive<RefundDeliveryPageQuery>({
    pageNum: 1,
    pageSize: 10,
  });

  // 退款物流信息（用于退货）表格数据
  const pageData = ref<RefundDeliveryPageVO[]>([]);

  // 弹窗
  const dialog = reactive({
    title: "",
    visible: false,
  });

  // 退款物流信息（用于退货）表单数据
  const formData = reactive<RefundDeliveryForm>({});

  // 退款物流信息（用于退货）表单校验规则
  const rules = reactive({
                      refundId: [{ required: true, message: "请输入退款申请ID", trigger: "blur" }],
                      deliveryType: [{ required: true, message: "请输入物流类型：1-买家发货 2-卖家发货 3-换货发货", trigger: "blur" }],
                      deliveryCompany: [{ required: true, message: "请输入物流公司", trigger: "blur" }],
                      deliverySn: [{ required: true, message: "请输入物流单号", trigger: "blur" }],
                      receiverName: [{ required: true, message: "请输入收货人姓名", trigger: "blur" }],
                      receiverPhone: [{ required: true, message: "请输入收货人电话", trigger: "blur" }],
                      receiverAddress: [{ required: true, message: "请输入收货地址", trigger: "blur" }],
  });

  /** 查询退款物流信息（用于退货） */
  function handleQuery() {
    loading.value = true;
          RefundDeliveryAPI.getPage(queryParams)
        .then((data) => {
          pageData.value = data.list.flat();
          total.value = data.total;
        })
        .finally(() => {
          loading.value = false;
        });
  }

  /** 重置退款物流信息（用于退货）查询 */
  function handleResetQuery() {
    queryFormRef.value!.resetFields();
    queryParams.pageNum = 1;
    handleQuery();
  }

  /** 行复选框选中记录选中ID集合 */
  function handleSelectionChange(selection: any) {
    removeIds.value = selection.map((item: any) => item.id);
  }

  /** 打开退款物流信息（用于退货）弹窗 */
  function handleOpenDialog(id?: number) {
    dialog.visible = true;
    if (id) {
      dialog.title = "修改退款物流信息（用于退货）";
            RefundDeliveryAPI.getFormData(id).then((data) => {
        Object.assign(formData, data);
      });
    } else {
      dialog.title = "新增退款物流信息（用于退货）";
    }
  }

  /** 提交退款物流信息（用于退货）表单 */
  function handleSubmit() {
    dataFormRef.value.validate((valid: any) => {
      if (valid) {
        loading.value = true;
        const id = formData.id;
        if (id) {
                RefundDeliveryAPI.update(id, formData)
              .then(() => {
                ElMessage.success("修改成功");
                handleCloseDialog();
                handleResetQuery();
              })
              .finally(() => (loading.value = false));
        } else {
                RefundDeliveryAPI.add(formData)
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

  /** 关闭退款物流信息（用于退货）弹窗 */
  function handleCloseDialog() {
    dialog.visible = false;
    dataFormRef.value.resetFields();
    dataFormRef.value.clearValidate();
    formData.id = undefined;
  }

  /** 删除退款物流信息（用于退货） */
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
                RefundDeliveryAPI.deleteByIds(ids)
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
