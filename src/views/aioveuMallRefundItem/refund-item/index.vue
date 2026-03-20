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
                <el-form-item label="退款类型（冗余字段，与主表一致）" prop="refundType">
                      <el-input
                          v-model="queryParams.refundType"
                          placeholder="退款类型（冗余字段，与主表一致）"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="订单项ID" prop="orderItemId">
                      <el-input
                          v-model="queryParams.orderItemId"
                          placeholder="订单项ID"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="商品ID" prop="spuId">
                      <el-input
                          v-model="queryParams.spuId"
                          placeholder="商品ID"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="商品名称" prop="spuName">
                      <el-input
                          v-model="queryParams.spuName"
                          placeholder="商品名称"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="SKU ID" prop="skuId">
                      <el-input
                          v-model="queryParams.skuId"
                          placeholder="SKU ID"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="SKU名称" prop="skuName">
                      <el-input
                          v-model="queryParams.skuName"
                          placeholder="SKU名称"
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
            v-hasPerm="['aioveuMallRefundItem:refund-item:add']"
            type="success"
            @click="handleOpenDialog()"
        >
          <template #icon><Plus /></template>
          新增
        </el-button>
        <el-button
            v-hasPerm="['aioveuMallRefundItem:refund-item:delete']"
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
                        key="refundType"
                        label="退款类型（冗余字段，与主表一致）"
                        prop="refundType"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="orderItemId"
                        label="订单项ID"
                        prop="orderItemId"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="spuId"
                        label="商品ID"
                        prop="spuId"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="spuName"
                        label="商品名称"
                        prop="spuName"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="skuId"
                        label="SKU ID"
                        prop="skuId"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="skuName"
                        label="SKU名称"
                        prop="skuName"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="picUrl"
                        label="商品图片"
                        prop="picUrl"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="price"
                        label="商品单价（分）"
                        prop="price"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="quantity"
                        label="退款数量"
                        prop="quantity"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="refundAmount"
                        label="退款金额（分）"
                        prop="refundAmount"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="refundReason"
                        label="该商品的退款原因"
                        prop="refundReason"
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
                v-hasPerm="['aioveuMallRefundItem:refund-item:edit']"
                type="primary"
                size="small"
                link
                @click="handleOpenDialog(scope.row.id)"
            >
              <template #icon><Edit /></template>
              编辑
            </el-button>
            <el-button
                v-hasPerm="['aioveuMallRefundItem:refund-item:delete']"
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

    <!-- 退款商品明细表单弹窗 -->
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

                <el-form-item label="退款类型（冗余字段，与主表一致）" prop="refundType">
                      <el-input
                          v-model="formData.refundType"
                          placeholder="退款类型（冗余字段，与主表一致）"
                      />
                </el-form-item>

                <el-form-item label="订单项ID" prop="orderItemId">
                      <el-input
                          v-model="formData.orderItemId"
                          placeholder="订单项ID"
                      />
                </el-form-item>

                <el-form-item label="商品ID" prop="spuId">
                      <el-input
                          v-model="formData.spuId"
                          placeholder="商品ID"
                      />
                </el-form-item>

                <el-form-item label="商品名称" prop="spuName">
                      <el-input
                          v-model="formData.spuName"
                          placeholder="商品名称"
                      />
                </el-form-item>

                <el-form-item label="SKU ID" prop="skuId">
                      <el-input
                          v-model="formData.skuId"
                          placeholder="SKU ID"
                      />
                </el-form-item>

                <el-form-item label="SKU名称" prop="skuName">
                      <el-input
                          v-model="formData.skuName"
                          placeholder="SKU名称"
                      />
                </el-form-item>

                <el-form-item label="商品图片" prop="picUrl">
                      <el-input
                          v-model="formData.picUrl"
                          placeholder="商品图片"
                      />
                </el-form-item>

                <el-form-item label="商品单价（分）" prop="price">
                      <el-input
                          v-model="formData.price"
                          placeholder="商品单价（分）"
                      />
                </el-form-item>

                <el-form-item label="退款数量" prop="quantity">
                      <el-input
                          v-model="formData.quantity"
                          placeholder="退款数量"
                      />
                </el-form-item>

                <el-form-item label="退款金额（分）" prop="refundAmount">
                      <el-input
                          v-model="formData.refundAmount"
                          placeholder="退款金额（分）"
                      />
                </el-form-item>

                <el-form-item label="该商品的退款原因" prop="refundReason">
                      <el-input
                          v-model="formData.refundReason"
                          placeholder="该商品的退款原因"
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
    name: "RefundItem",
    inheritAttrs: false,
  });

  import RefundItemAPI, { RefundItemPageVO, RefundItemForm, RefundItemPageQuery } from "@/api/aioveuMall/aioveuMallRefund/aioveuMallRefundItem/refund-item";

  const queryFormRef = ref();
  const dataFormRef = ref();

  const loading = ref(false);
  const removeIds = ref<number[]>([]);
  const total = ref(0);

  const queryParams = reactive<RefundItemPageQuery>({
    pageNum: 1,
    pageSize: 10,
  });

  // 退款商品明细表格数据
  const pageData = ref<RefundItemPageVO[]>([]);

  // 弹窗
  const dialog = reactive({
    title: "",
    visible: false,
  });

  // 退款商品明细表单数据
  const formData = reactive<RefundItemForm>({});

  // 退款商品明细表单校验规则
  const rules = reactive({
                      refundId: [{ required: true, message: "请输入退款申请ID", trigger: "blur" }],
                      orderItemId: [{ required: true, message: "请输入订单项ID", trigger: "blur" }],
                      spuId: [{ required: true, message: "请输入商品ID", trigger: "blur" }],
                      spuName: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
                      skuId: [{ required: true, message: "请输入SKU ID", trigger: "blur" }],
                      price: [{ required: true, message: "请输入商品单价（分）", trigger: "blur" }],
                      quantity: [{ required: true, message: "请输入退款数量", trigger: "blur" }],
                      refundAmount: [{ required: true, message: "请输入退款金额（分）", trigger: "blur" }],
  });

  /** 查询退款商品明细 */
  function handleQuery() {
    loading.value = true;
          RefundItemAPI.getPage(queryParams)
        .then((data) => {
          pageData.value = data.list.flat();
          total.value = data.total;
        })
        .finally(() => {
          loading.value = false;
        });
  }

  /** 重置退款商品明细查询 */
  function handleResetQuery() {
    queryFormRef.value!.resetFields();
    queryParams.pageNum = 1;
    handleQuery();
  }

  /** 行复选框选中记录选中ID集合 */
  function handleSelectionChange(selection: any) {
    removeIds.value = selection.map((item: any) => item.id);
  }

  /** 打开退款商品明细弹窗 */
  function handleOpenDialog(id?: number) {
    dialog.visible = true;
    if (id) {
      dialog.title = "修改退款商品明细";
            RefundItemAPI.getFormData(id).then((data) => {
        Object.assign(formData, data);
      });
    } else {
      dialog.title = "新增退款商品明细";
    }
  }

  /** 提交退款商品明细表单 */
  function handleSubmit() {
    dataFormRef.value.validate((valid: any) => {
      if (valid) {
        loading.value = true;
        const id = formData.id;
        if (id) {
                RefundItemAPI.update(id, formData)
              .then(() => {
                ElMessage.success("修改成功");
                handleCloseDialog();
                handleResetQuery();
              })
              .finally(() => (loading.value = false));
        } else {
                RefundItemAPI.add(formData)
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

  /** 关闭退款商品明细弹窗 */
  function handleCloseDialog() {
    dialog.visible = false;
    dataFormRef.value.resetFields();
    dataFormRef.value.clearValidate();
    formData.id = undefined;
  }

  /** 删除退款商品明细 */
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
                RefundItemAPI.deleteByIds(ids)
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
