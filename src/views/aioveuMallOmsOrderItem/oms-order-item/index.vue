<template>
  <div class="app-container">
    <div class="search-container">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
                <el-form-item label="商品名称" prop="spuName">
                      <el-input
                          v-model="queryParams.spuName"
                          placeholder="商品名称"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="商品编码" prop="skuSn">
                      <el-input
                          v-model="queryParams.skuSn"
                          placeholder="商品编码"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="规格名称" prop="skuName">
                      <el-input
                          v-model="queryParams.skuName"
                          placeholder="规格名称"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="逻辑删除标识(1:已删除；0:正常)" prop="deleted">
                      <el-switch
                          v-model="queryParams.deleted"
                          :active-value="1"
                          :inactive-value="0"
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
            v-hasPerm="['aioveuMallOmsOrderItem:oms-order-item:add']"
            type="success"
            @click="handleOpenDialog()"
        >
          <template #icon><Plus /></template>
          新增
        </el-button>
        <el-button
            v-hasPerm="['aioveuMallOmsOrderItem:oms-order-item:delete']"
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
                        key="orderId"
                        label="订单ID"
                        prop="orderId"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column label="商品名称" width="150" align="center">
                      <template #default="scope">
                        <DictLabel v-model="scope.row.spuName" code="gender" />
                      </template>
                    </el-table-column>
                    <el-table-column
                        key="skuId"
                        label="商品ID"
                        prop="skuId"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="skuSn"
                        label="商品编码"
                        prop="skuSn"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="skuName"
                        label="规格名称"
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
                        label="商品单价(单位：分)"
                        prop="price"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="quantity"
                        label="商品数量"
                        prop="quantity"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="totalAmount"
                        label="商品总价(单位：分)"
                        prop="totalAmount"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="deleted"
                        label="逻辑删除标识(1:已删除；0:正常)"
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
                v-hasPerm="['aioveuMallOmsOrderItem:oms-order-item:edit']"
                type="primary"
                size="small"
                link
                @click="handleOpenDialog(scope.row.id)"
            >
              <template #icon><Edit /></template>
              编辑
            </el-button>
            <el-button
                v-hasPerm="['aioveuMallOmsOrderItem:oms-order-item:delete']"
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

    <!-- 订单商品信息表单弹窗 -->
    <el-dialog
        v-model="dialog.visible"
        :title="dialog.title"
        width="500px"
        @close="handleCloseDialog"
    >
      <el-form ref="dataFormRef" :model="formData" :rules="rules" label-width="100px">
                <el-form-item label="商品名称" prop="spuName">
                      <el-input
                          v-model="formData.spuName"
                          placeholder="商品名称"
                      />
                </el-form-item>

                <el-form-item label="商品ID" prop="skuId">
                      <el-input
                          v-model="formData.skuId"
                          placeholder="商品ID"
                      />
                </el-form-item>

                <el-form-item label="商品编码" prop="skuSn">
                      <el-input
                          v-model="formData.skuSn"
                          placeholder="商品编码"
                      />
                </el-form-item>

                <el-form-item label="规格名称" prop="skuName">
                      <el-input
                          v-model="formData.skuName"
                          placeholder="规格名称"
                      />
                </el-form-item>

                <el-form-item label="商品图片" prop="picUrl">
                      <el-input
                          v-model="formData.picUrl"
                          placeholder="商品图片"
                      />
                </el-form-item>

                <el-form-item label="商品单价(单位：分)" prop="price">
                      <el-input-number
                          v-model="formData.price"
                          placeholder="商品单价(单位：分)"
                      />
                </el-form-item>

                <el-form-item label="商品数量" prop="quantity">
                      <el-input-number
                          v-model="formData.quantity"
                          placeholder="商品数量"
                      />
                </el-form-item>

                <el-form-item label="商品总价(单位：分)" prop="totalAmount">
                      <el-input-number
                          v-model="formData.totalAmount"
                          placeholder="商品总价(单位：分)"
                      />
                </el-form-item>

                <el-form-item label="逻辑删除标识(1:已删除；0:正常)" prop="deleted">
                      <el-switch
                          v-model="formData.deleted"
                          :active-value="1"
                          :inactive-value="0"
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
    name: "OmsOrderItem",
    inheritAttrs: false,
  });

  import OmsOrderItemAPI, { OmsOrderItemPageVO, OmsOrderItemForm, OmsOrderItemPageQuery } from "@/api/aioveuMall/aioveuMallOms/aioveuMallOmsOrderItem/oms-order-item";

  const queryFormRef = ref();
  const dataFormRef = ref();

  const loading = ref(false);
  const removeIds = ref<number[]>([]);
  const total = ref(0);

  const queryParams = reactive<OmsOrderItemPageQuery>({
    pageNum: 1,
    pageSize: 10,
  });

  // 订单商品信息表格数据
  const pageData = ref<OmsOrderItemPageVO[]>([]);

  // 弹窗
  const dialog = reactive({
    title: "",
    visible: false,
  });

  // 订单商品信息表单数据
  const formData = reactive<OmsOrderItemForm>({});

  // 订单商品信息表单校验规则
  const rules = reactive({
                      skuId: [{ required: true, message: "请输入商品ID", trigger: "blur" }],
                      skuSn: [{ required: true, message: "请输入商品编码", trigger: "blur" }],
                      skuName: [{ required: true, message: "请输入规格名称", trigger: "blur" }],
                      picUrl: [{ required: true, message: "请输入商品图片", trigger: "blur" }],
                      price: [{ required: true, message: "请输入商品单价(单位：分)", trigger: "blur" }],
                      totalAmount: [{ required: true, message: "请输入商品总价(单位：分)", trigger: "blur" }],
  });

  /** 查询订单商品信息 */
  function handleQuery() {
    loading.value = true;
          OmsOrderItemAPI.getPage(queryParams)
        .then((data) => {
          pageData.value = data.list.flat();
          total.value = data.total;
        })
        .finally(() => {
          loading.value = false;
        });
  }

  /** 重置订单商品信息查询 */
  function handleResetQuery() {
    queryFormRef.value!.resetFields();
    queryParams.pageNum = 1;
    handleQuery();
  }

  /** 行复选框选中记录选中ID集合 */
  function handleSelectionChange(selection: any) {
    removeIds.value = selection.map((item: any) => item.id);
  }

  /** 打开订单商品信息弹窗 */
  function handleOpenDialog(id?: number) {
    dialog.visible = true;
    if (id) {
      dialog.title = "修改订单商品信息";
            OmsOrderItemAPI.getFormData(id).then((data) => {
        Object.assign(formData, data);
      });
    } else {
      dialog.title = "新增订单商品信息";
    }
  }

  /** 提交订单商品信息表单 */
  function handleSubmit() {
    dataFormRef.value.validate((valid: any) => {
      if (valid) {
        loading.value = true;
        const id = formData.id;
        if (id) {
                OmsOrderItemAPI.update(id, formData)
              .then(() => {
                ElMessage.success("修改成功");
                handleCloseDialog();
                handleResetQuery();
              })
              .finally(() => (loading.value = false));
        } else {
                OmsOrderItemAPI.add(formData)
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

  /** 关闭订单商品信息弹窗 */
  function handleCloseDialog() {
    dialog.visible = false;
    dataFormRef.value.resetFields();
    dataFormRef.value.clearValidate();
    formData.id = undefined;
  }

  /** 删除订单商品信息 */
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
                OmsOrderItemAPI.deleteByIds(ids)
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
