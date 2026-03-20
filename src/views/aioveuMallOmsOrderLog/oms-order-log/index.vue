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
                <el-form-item label="操作人[用户；系统；后台管理员]" prop="user">
                      <el-input
                          v-model="queryParams.user"
                          placeholder="操作人[用户；系统；后台管理员]"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="操作时订单状态" prop="orderStatus">
                      <el-input
                          v-model="queryParams.orderStatus"
                          placeholder="操作时订单状态"
                          clearable
                          @keyup.enter="handleQuery()"
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
            v-hasPerm="['aioveuMallOmsOrderLog:oms-order-log:add']"
            type="success"
            @click="handleOpenDialog()"
        >
          <template #icon><Plus /></template>
          新增
        </el-button>
        <el-button
            v-hasPerm="['aioveuMallOmsOrderLog:oms-order-log:delete']"
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
                        key="user"
                        label="操作人[用户；系统；后台管理员]"
                        prop="user"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="detail"
                        label="操作详情"
                        prop="detail"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="orderStatus"
                        label="操作时订单状态"
                        prop="orderStatus"
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
                v-hasPerm="['aioveuMallOmsOrderLog:oms-order-log:edit']"
                type="primary"
                size="small"
                link
                @click="handleOpenDialog(scope.row.id)"
            >
              <template #icon><Edit /></template>
              编辑
            </el-button>
            <el-button
                v-hasPerm="['aioveuMallOmsOrderLog:oms-order-log:delete']"
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

    <!-- 订单操作历史记录表单弹窗 -->
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

                <el-form-item label="操作人[用户；系统；后台管理员]" prop="user">
                      <el-input
                          v-model="formData.user"
                          placeholder="操作人[用户；系统；后台管理员]"
                      />
                </el-form-item>

                <el-form-item label="操作详情" prop="detail">
                      <el-input
                          v-model="formData.detail"
                          placeholder="操作详情"
                      />
                </el-form-item>

                <el-form-item label="操作时订单状态" prop="orderStatus">
                      <el-input
                          v-model="formData.orderStatus"
                          placeholder="操作时订单状态"
                      />
                </el-form-item>

                <el-form-item label="备注" prop="remark">
                      <el-input
                          v-model="formData.remark"
                          placeholder="备注"
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
    name: "OmsOrderLog",
    inheritAttrs: false,
  });

  import OmsOrderLogAPI, { OmsOrderLogPageVO, OmsOrderLogForm, OmsOrderLogPageQuery } from "@/api/aioveuMall/aioveuMallOms/aioveuMallOmsOrderLog/oms-order-log";

  const queryFormRef = ref();
  const dataFormRef = ref();

  const loading = ref(false);
  const removeIds = ref<number[]>([]);
  const total = ref(0);

  const queryParams = reactive<OmsOrderLogPageQuery>({
    pageNum: 1,
    pageSize: 10,
  });

  // 订单操作历史记录表格数据
  const pageData = ref<OmsOrderLogPageVO[]>([]);

  // 弹窗
  const dialog = reactive({
    title: "",
    visible: false,
  });

  // 订单操作历史记录表单数据
  const formData = reactive<OmsOrderLogForm>({});

  // 订单操作历史记录表单校验规则
  const rules = reactive({
                      orderId: [{ required: true, message: "请输入订单id", trigger: "blur" }],
                      detail: [{ required: true, message: "请输入操作详情", trigger: "blur" }],
                      remark: [{ required: true, message: "请输入备注", trigger: "blur" }],
  });

  /** 查询订单操作历史记录 */
  function handleQuery() {
    loading.value = true;
          OmsOrderLogAPI.getPage(queryParams)
        .then((data) => {
          pageData.value = data.list.flat();
          total.value = data.total;
        })
        .finally(() => {
          loading.value = false;
        });
  }

  /** 重置订单操作历史记录查询 */
  function handleResetQuery() {
    queryFormRef.value!.resetFields();
    queryParams.pageNum = 1;
    handleQuery();
  }

  /** 行复选框选中记录选中ID集合 */
  function handleSelectionChange(selection: any) {
    removeIds.value = selection.map((item: any) => item.id);
  }

  /** 打开订单操作历史记录弹窗 */
  function handleOpenDialog(id?: number) {
    dialog.visible = true;
    if (id) {
      dialog.title = "修改订单操作历史记录";
            OmsOrderLogAPI.getFormData(id).then((data) => {
        Object.assign(formData, data);
      });
    } else {
      dialog.title = "新增订单操作历史记录";
    }
  }

  /** 提交订单操作历史记录表单 */
  function handleSubmit() {
    dataFormRef.value.validate((valid: any) => {
      if (valid) {
        loading.value = true;
        const id = formData.id;
        if (id) {
                OmsOrderLogAPI.update(id, formData)
              .then(() => {
                ElMessage.success("修改成功");
                handleCloseDialog();
                handleResetQuery();
              })
              .finally(() => (loading.value = false));
        } else {
                OmsOrderLogAPI.add(formData)
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

  /** 关闭订单操作历史记录弹窗 */
  function handleCloseDialog() {
    dialog.visible = false;
    dataFormRef.value.resetFields();
    dataFormRef.value.clearValidate();
    formData.id = undefined;
  }

  /** 删除订单操作历史记录 */
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
                OmsOrderLogAPI.deleteByIds(ids)
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
