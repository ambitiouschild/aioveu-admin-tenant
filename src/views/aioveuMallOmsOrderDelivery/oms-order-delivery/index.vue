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
                <el-form-item label="物流公司(配送方式)" prop="deliveryCompany">
                      <el-input
                          v-model="queryParams.deliveryCompany"
                          placeholder="物流公司(配送方式)"
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
                <el-form-item label="物流状态【0->运输中；1->已收货】" prop="deliveryStatus">
                      <el-input
                          v-model="queryParams.deliveryStatus"
                          placeholder="物流状态【0->运输中；1->已收货】"
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
            v-hasPerm="['aioveuMallOmsOrderDelivery:oms-order-delivery:add']"
            type="success"
            @click="handleOpenDialog()"
        >
          <template #icon><Plus /></template>
          新增
        </el-button>
        <el-button
            v-hasPerm="['aioveuMallOmsOrderDelivery:oms-order-delivery:delete']"
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
                        key="deliveryCompany"
                        label="物流公司(配送方式)"
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
                        key="receiverPostCode"
                        label="收货人邮编"
                        prop="receiverPostCode"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="receiverProvince"
                        label="省份/直辖市"
                        prop="receiverProvince"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="receiverCity"
                        label="城市"
                        prop="receiverCity"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="receiverRegion"
                        label="区"
                        prop="receiverRegion"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="receiverDetailAddress"
                        label="详细地址"
                        prop="receiverDetailAddress"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="remark"
                        label="备注"
                        prop="remark"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="deliveryStatus"
                        label="物流状态【0->运输中；1->已收货】"
                        prop="deliveryStatus"
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
                        label="确认收货时间"
                        prop="receiveTime"
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
                v-hasPerm="['aioveuMallOmsOrderDelivery:oms-order-delivery:edit']"
                type="primary"
                size="small"
                link
                @click="handleOpenDialog(scope.row.id)"
            >
              <template #icon><Edit /></template>
              编辑
            </el-button>
            <el-button
                v-hasPerm="['aioveuMallOmsOrderDelivery:oms-order-delivery:delete']"
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

    <!-- 订单物流记录表单弹窗 -->
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

                <el-form-item label="物流公司(配送方式)" prop="deliveryCompany">
                      <el-input
                          v-model="formData.deliveryCompany"
                          placeholder="物流公司(配送方式)"
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

                <el-form-item label="收货人邮编" prop="receiverPostCode">
                      <el-input
                          v-model="formData.receiverPostCode"
                          placeholder="收货人邮编"
                      />
                </el-form-item>

                <el-form-item label="省份/直辖市" prop="receiverProvince">
                  <el-input
                    v-model="formData.receiverProvince"
                    placeholder="省份/直辖市"
                  />
                </el-form-item>

                <el-form-item label="城市" prop="receiverCity">
                      <el-input
                          v-model="formData.receiverCity"
                          placeholder="城市"
                      />
                </el-form-item>

                <el-form-item label="区" prop="receiverRegion">
                      <el-input
                          v-model="formData.receiverRegion"
                          placeholder="区"
                      />
                </el-form-item>

                <el-form-item label="详细地址" prop="receiverDetailAddress">
                      <el-input
                          v-model="formData.receiverDetailAddress"
                          placeholder="详细地址"
                      />
                </el-form-item>

                <el-form-item label="备注" prop="remark">
                      <el-input
                          v-model="formData.remark"
                          placeholder="备注"
                      />
                </el-form-item>

                <el-form-item label="物流状态【0->运输中；1->已收货】" prop="deliveryStatus">
                      <el-input
                          v-model="formData.deliveryStatus"
                          placeholder="物流状态【0->运输中；1->已收货】"
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

                <el-form-item label="确认收货时间" prop="receiveTime">
                      <el-date-picker
                          v-model="formData.receiveTime"
                          type="datetime"
                          placeholder="确认收货时间"
                          value-format="YYYY-MM-DD HH:mm:ss"
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
    name: "OmsOrderDelivery",
    inheritAttrs: false,
  });

  import OmsOrderDeliveryAPI, { OmsOrderDeliveryPageVO, OmsOrderDeliveryForm, OmsOrderDeliveryPageQuery } from "@/api/aioveuMall/aioveuMallOms/aioveuMallOmsOrderDelivery/oms-order-delivery";

  const queryFormRef = ref();
  const dataFormRef = ref();

  const loading = ref(false);
  const removeIds = ref<number[]>([]);
  const total = ref(0);

  const queryParams = reactive<OmsOrderDeliveryPageQuery>({
    pageNum: 1,
    pageSize: 10,
  });

  // 订单物流记录表格数据
  const pageData = ref<OmsOrderDeliveryPageVO[]>([]);

  // 弹窗
  const dialog = reactive({
    title: "",
    visible: false,
  });

  // 订单物流记录表单数据
  const formData = reactive<OmsOrderDeliveryForm>({});

  // 订单物流记录表单校验规则
  const rules = reactive({
                      id: [{ required: true, message: "请输入id", trigger: "blur" }],
                      orderId: [{ required: true, message: "请输入订单id", trigger: "blur" }],
                      deliveryCompany: [{ required: true, message: "请输入物流公司(配送方式)", trigger: "blur" }],
                      deliverySn: [{ required: true, message: "请输入物流单号", trigger: "blur" }],
                      receiverName: [{ required: true, message: "请输入收货人姓名", trigger: "blur" }],
                      receiverPhone: [{ required: true, message: "请输入收货人电话", trigger: "blur" }],
                      receiverPostCode: [{ required: true, message: "请输入收货人邮编", trigger: "blur" }],
                      receiverProvince: [{ required: true, message: "请输入省份/直辖市", trigger: "blur" }],
                      receiverCity: [{ required: true, message: "请输入城市", trigger: "blur" }],
                      receiverRegion: [{ required: true, message: "请输入区", trigger: "blur" }],
                      receiverDetailAddress: [{ required: true, message: "请输入详细地址", trigger: "blur" }],
                      remark: [{ required: true, message: "请输入备注", trigger: "blur" }],
  });

  /** 查询订单物流记录 */
  function handleQuery() {
    loading.value = true;
          OmsOrderDeliveryAPI.getPage(queryParams)
        .then((data) => {
          pageData.value = data.list.flat();
          total.value = data.total;
        })
        .finally(() => {
          loading.value = false;
        });
  }

  /** 重置订单物流记录查询 */
  function handleResetQuery() {
    queryFormRef.value!.resetFields();
    queryParams.pageNum = 1;
    handleQuery();
  }

  /** 行复选框选中记录选中ID集合 */
  function handleSelectionChange(selection: any) {
    removeIds.value = selection.map((item: any) => item.id);
  }

  /** 打开订单物流记录弹窗 */
  function handleOpenDialog(id?: number) {
    dialog.visible = true;
    if (id) {
      dialog.title = "修改订单物流记录";
            OmsOrderDeliveryAPI.getFormData(id).then((data) => {
        Object.assign(formData, data);
      });
    } else {
      dialog.title = "新增订单物流记录";
    }
  }

  /** 提交订单物流记录表单 */
  function handleSubmit() {
    dataFormRef.value.validate((valid: any) => {
      if (valid) {
        loading.value = true;
        const id = formData.id;
        if (id) {
                OmsOrderDeliveryAPI.update(id, formData)
              .then(() => {
                ElMessage.success("修改成功");
                handleCloseDialog();
                handleResetQuery();
              })
              .finally(() => (loading.value = false));
        } else {
                OmsOrderDeliveryAPI.add(formData)
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

  /** 关闭订单物流记录弹窗 */
  function handleCloseDialog() {
    dialog.visible = false;
    dataFormRef.value.resetFields();
    dataFormRef.value.clearValidate();
    formData.id = undefined;
  }

  /** 删除订单物流记录 */
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
                OmsOrderDeliveryAPI.deleteByIds(ids)
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
