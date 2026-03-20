<template>
  <div class="app-container">
    <div class="search-container">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
                <el-form-item label="优惠券ID" prop="couponId">
                      <el-input
                          v-model="queryParams.couponId"
                          placeholder="优惠券ID"
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
            v-hasPerm="['aioveuMallSmsCouponSpu:sms-coupon-spu:add']"
            type="success"
            @click="handleOpenDialog()"
        >
          <template #icon><Plus /></template>
          新增
        </el-button>
        <el-button
            v-hasPerm="['aioveuMallSmsCouponSpu:sms-coupon-spu:delete']"
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
                        key="couponId"
                        label="优惠券ID"
                        prop="couponId"
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
        <el-table-column fixed="right" label="操作" width="220">
          <template #default="scope">
            <el-button
                v-hasPerm="['aioveuMallSmsCouponSpu:sms-coupon-spu:edit']"
                type="primary"
                size="small"
                link
                @click="handleOpenDialog(scope.row.id)"
            >
              <template #icon><Edit /></template>
              编辑
            </el-button>
            <el-button
                v-hasPerm="['aioveuMallSmsCouponSpu:sms-coupon-spu:delete']"
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

    <!-- 优惠券适用的具体商品表单弹窗 -->
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
                          placeholder=""
                      />
                </el-form-item>

                <el-form-item label="优惠券ID" prop="couponId">
                      <el-input
                          v-model="formData.couponId"
                          placeholder="优惠券ID"
                      />
                </el-form-item>

                <el-form-item label="商品ID" prop="spuId">
                      <el-input
                          v-model="formData.spuId"
                          placeholder="商品ID"
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
    name: "SmsCouponSpu",
    inheritAttrs: false,
  });

  import SmsCouponSpuAPI, { SmsCouponSpuPageVO, SmsCouponSpuForm, SmsCouponSpuPageQuery } from "@/api/aioveuMall/aioveuMallSms/aioveuMallSmsCouponSpu/sms-coupon-spu";

  const queryFormRef = ref();
  const dataFormRef = ref();

  const loading = ref(false);
  const removeIds = ref<number[]>([]);
  const total = ref(0);

  const queryParams = reactive<SmsCouponSpuPageQuery>({
    pageNum: 1,
    pageSize: 10,
  });

  // 优惠券适用的具体商品表格数据
  const pageData = ref<SmsCouponSpuPageVO[]>([]);

  // 弹窗
  const dialog = reactive({
    title: "",
    visible: false,
  });

  // 优惠券适用的具体商品表单数据
  const formData = reactive<SmsCouponSpuForm>({});

  // 优惠券适用的具体商品表单校验规则
  const rules = reactive({
                      couponId: [{ required: true, message: "请输入优惠券ID", trigger: "blur" }],
                      spuId: [{ required: true, message: "请输入商品ID", trigger: "blur" }],
  });

  /** 查询优惠券适用的具体商品 */
  function handleQuery() {
    loading.value = true;
          SmsCouponSpuAPI.getPage(queryParams)
        .then((data) => {
          pageData.value = data.list.flat();
          total.value = data.total;
        })
        .finally(() => {
          loading.value = false;
        });
  }

  /** 重置优惠券适用的具体商品查询 */
  function handleResetQuery() {
    queryFormRef.value!.resetFields();
    queryParams.pageNum = 1;
    handleQuery();
  }

  /** 行复选框选中记录选中ID集合 */
  function handleSelectionChange(selection: any) {
    removeIds.value = selection.map((item: any) => item.id);
  }

  /** 打开优惠券适用的具体商品弹窗 */
  function handleOpenDialog(id?: number) {
    dialog.visible = true;
    if (id) {
      dialog.title = "修改优惠券适用的具体商品";
            SmsCouponSpuAPI.getFormData(id).then((data) => {
        Object.assign(formData, data);
      });
    } else {
      dialog.title = "新增优惠券适用的具体商品";
    }
  }

  /** 提交优惠券适用的具体商品表单 */
  function handleSubmit() {
    dataFormRef.value.validate((valid: any) => {
      if (valid) {
        loading.value = true;
        const id = formData.id;
        if (id) {
                SmsCouponSpuAPI.update(id, formData)
              .then(() => {
                ElMessage.success("修改成功");
                handleCloseDialog();
                handleResetQuery();
              })
              .finally(() => (loading.value = false));
        } else {
                SmsCouponSpuAPI.add(formData)
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

  /** 关闭优惠券适用的具体商品弹窗 */
  function handleCloseDialog() {
    dialog.visible = false;
    dataFormRef.value.resetFields();
    dataFormRef.value.clearValidate();
    formData.id = undefined;
  }

  /** 删除优惠券适用的具体商品 */
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
                SmsCouponSpuAPI.deleteByIds(ids)
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
