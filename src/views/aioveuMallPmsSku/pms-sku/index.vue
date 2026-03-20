<template>
  <div class="app-container">
    <div class="search-container">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
                <el-form-item label="商品编码" prop="skuSn">
                      <el-input
                          v-model="queryParams.skuSn"
                          placeholder="商品编码"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="SPU ID" prop="spuId">
                      <el-input
                          v-model="queryParams.spuId"
                          placeholder="SPU ID"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="商品名称" prop="name">
                      <el-input
                          v-model="queryParams.name"
                          placeholder="商品名称"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="商品规格值，以英文逗号(,)分割" prop="specIds">
                      <el-input
                          v-model="queryParams.specIds"
                          placeholder="商品规格值，以英文逗号(,)分割"
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
            v-hasPerm="['aioveuMallPmsSku:pms-sku:add']"
            type="success"
            @click="handleOpenDialog()"
        >
          <template #icon><Plus /></template>
          新增
        </el-button>
        <el-button
            v-hasPerm="['aioveuMallPmsSku:pms-sku:delete']"
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
                        label="库存ID"
                        prop="id"
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
                        key="spuId"
                        label="SPU ID"
                        prop="spuId"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="name"
                        label="商品名称"
                        prop="name"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="specIds"
                        label="商品规格值，以英文逗号(,)分割"
                        prop="specIds"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="price"
                        label="商品价格(单位：分)"
                        prop="price"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="stock"
                        label="库存数量"
                        prop="stock"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="lockedStock"
                        label="库存锁定数量"
                        prop="lockedStock"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="picUrl"
                        label="商品图片地址"
                        prop="picUrl"
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
                v-hasPerm="['aioveuMallPmsSku:pms-sku:edit']"
                type="primary"
                size="small"
                link
                @click="handleOpenDialog(scope.row.id)"
            >
              <template #icon><Edit /></template>
              编辑
            </el-button>
            <el-button
                v-hasPerm="['aioveuMallPmsSku:pms-sku:delete']"
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

    <!-- 商品库存表单弹窗 -->
    <el-dialog
        v-model="dialog.visible"
        :title="dialog.title"
        width="500px"
        @close="handleCloseDialog"
    >
      <el-form ref="dataFormRef" :model="formData" :rules="rules" label-width="100px">
                <el-form-item label="库存ID" prop="id">
                      <el-input
                          v-model="formData.id"
                          placeholder="库存ID"
                      />
                </el-form-item>

                <el-form-item label="商品编码" prop="skuSn">
                      <el-input
                          v-model="formData.skuSn"
                          placeholder="商品编码"
                      />
                </el-form-item>

                <el-form-item label="SPU ID" prop="spuId">
                      <el-input
                          v-model="formData.spuId"
                          placeholder="SPU ID"
                      />
                </el-form-item>

                <el-form-item label="商品名称" prop="name">
                      <el-input
                          v-model="formData.name"
                          placeholder="商品名称"
                      />
                </el-form-item>

                <el-form-item label="商品规格值，以英文逗号(,)分割" prop="specIds">
                      <el-input
                          v-model="formData.specIds"
                          placeholder="商品规格值，以英文逗号(,)分割"
                      />
                </el-form-item>

                <el-form-item label="商品价格(单位：分)" prop="price">
                      <el-input
                          v-model="formData.price"
                          placeholder="商品价格(单位：分)"
                      />
                </el-form-item>

                <el-form-item label="库存数量" prop="stock">
                      <el-input
                          v-model="formData.stock"
                          placeholder="库存数量"
                      />
                </el-form-item>

                <el-form-item label="库存锁定数量" prop="lockedStock">
                      <el-input
                          v-model="formData.lockedStock"
                          placeholder="库存锁定数量"
                      />
                </el-form-item>

                <el-form-item label="商品图片地址" prop="picUrl">
                      <el-input
                          v-model="formData.picUrl"
                          placeholder="商品图片地址"
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
    name: "PmsSku",
    inheritAttrs: false,
  });

  import PmsSkuAPI, { PmsSkuPageVO, PmsSkuForm, PmsSkuPageQuery } from "@/api/aioveuMall/aioveuMallPms/aioveuMallPmsSku/pms-sku";

  const queryFormRef = ref();
  const dataFormRef = ref();

  const loading = ref(false);
  const removeIds = ref<number[]>([]);
  const total = ref(0);

  const queryParams = reactive<PmsSkuPageQuery>({
    pageNum: 1,
    pageSize: 10,
  });

  // 商品库存表格数据
  const pageData = ref<PmsSkuPageVO[]>([]);

  // 弹窗
  const dialog = reactive({
    title: "",
    visible: false,
  });

  // 商品库存表单数据
  const formData = reactive<PmsSkuForm>({});

  // 商品库存表单校验规则
  const rules = reactive({
                      skuSn: [{ required: true, message: "请输入商品编码", trigger: "blur" }],
                      spuId: [{ required: true, message: "请输入SPU ID", trigger: "blur" }],
                      name: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
  });

  /** 查询商品库存 */
  function handleQuery() {
    loading.value = true;
          PmsSkuAPI.getPage(queryParams)
        .then((data) => {
          pageData.value = data.list.flat();
          total.value = data.total;
        })
        .finally(() => {
          loading.value = false;
        });
  }

  /** 重置商品库存查询 */
  function handleResetQuery() {
    queryFormRef.value!.resetFields();
    queryParams.pageNum = 1;
    handleQuery();
  }

  /** 行复选框选中记录选中ID集合 */
  function handleSelectionChange(selection: any) {
    removeIds.value = selection.map((item: any) => item.id);
  }

  /** 打开商品库存弹窗 */
  function handleOpenDialog(id?: number) {
    dialog.visible = true;
    if (id) {
      dialog.title = "修改商品库存";
            PmsSkuAPI.getFormData(id).then((data) => {
        Object.assign(formData, data);
      });
    } else {
      dialog.title = "新增商品库存";
    }
  }

  /** 提交商品库存表单 */
  function handleSubmit() {
    dataFormRef.value.validate((valid: any) => {
      if (valid) {
        loading.value = true;
        const id = formData.id;
        if (id) {
                PmsSkuAPI.update(id, formData)
              .then(() => {
                ElMessage.success("修改成功");
                handleCloseDialog();
                handleResetQuery();
              })
              .finally(() => (loading.value = false));
        } else {
                PmsSkuAPI.add(formData)
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

  /** 关闭商品库存弹窗 */
  function handleCloseDialog() {
    dialog.visible = false;
    dataFormRef.value.resetFields();
    dataFormRef.value.clearValidate();
    formData.id = undefined;
  }

  /** 删除商品库存 */
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
                PmsSkuAPI.deleteByIds(ids)
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
