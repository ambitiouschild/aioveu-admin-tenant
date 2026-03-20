<template>
  <div class="app-container">
    <div class="search-container">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
                <el-form-item label="秒杀订单超时关闭时间(分)" prop="flashOrderOvertime">
                      <el-input
                          v-model="queryParams.flashOrderOvertime"
                          placeholder="秒杀订单超时关闭时间(分)"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="正常订单超时时间(分)" prop="normalOrderOvertime">
                      <el-input
                          v-model="queryParams.normalOrderOvertime"
                          placeholder="正常订单超时时间(分)"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="自动完成交易时间，不能申请退货（天）" prop="finishOvertime">
                      <el-input
                          v-model="queryParams.finishOvertime"
                          placeholder="自动完成交易时间，不能申请退货（天）"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="订单完成后自动好评时间（天）" prop="commentOvertime">
                      <el-input
                          v-model="queryParams.commentOvertime"
                          placeholder="订单完成后自动好评时间（天）"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="会员等级【0-不限会员等级，全部通用；其他-对应的其他会员等级】" prop="memberLevel">
                      <el-input
                          v-model="queryParams.memberLevel"
                          placeholder="会员等级【0-不限会员等级，全部通用；其他-对应的其他会员等级】"
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
            v-hasPerm="['aioveuMallOmsOrderSetting:oms-order-setting:add']"
            type="success"
            @click="handleOpenDialog()"
        >
          <template #icon><Plus /></template>
          新增
        </el-button>
        <el-button
            v-hasPerm="['aioveuMallOmsOrderSetting:oms-order-setting:delete']"
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
                        key="flashOrderOvertime"
                        label="秒杀订单超时关闭时间(分)"
                        prop="flashOrderOvertime"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="normalOrderOvertime"
                        label="正常订单超时时间(分)"
                        prop="normalOrderOvertime"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="confirmOvertime"
                        label="发货后自动确认收货时间（天）"
                        prop="confirmOvertime"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="finishOvertime"
                        label="自动完成交易时间，不能申请退货（天）"
                        prop="finishOvertime"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="commentOvertime"
                        label="订单完成后自动好评时间（天）"
                        prop="commentOvertime"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="memberLevel"
                        label="会员等级【0-不限会员等级，全部通用；其他-对应的其他会员等级】"
                        prop="memberLevel"
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
                v-hasPerm="['aioveuMallOmsOrderSetting:oms-order-setting:edit']"
                type="primary"
                size="small"
                link
                @click="handleOpenDialog(scope.row.id)"
            >
              <template #icon><Edit /></template>
              编辑
            </el-button>
            <el-button
                v-hasPerm="['aioveuMallOmsOrderSetting:oms-order-setting:delete']"
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

    <!-- 订单配置信息表单弹窗 -->
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

                <el-form-item label="秒杀订单超时关闭时间(分)" prop="flashOrderOvertime">
                      <el-input
                          v-model="formData.flashOrderOvertime"
                          placeholder="秒杀订单超时关闭时间(分)"
                      />
                </el-form-item>

                <el-form-item label="正常订单超时时间(分)" prop="normalOrderOvertime">
                      <el-input
                          v-model="formData.normalOrderOvertime"
                          placeholder="正常订单超时时间(分)"
                      />
                </el-form-item>

                <el-form-item label="发货后自动确认收货时间（天）" prop="confirmOvertime">
                      <el-input
                          v-model="formData.confirmOvertime"
                          placeholder="发货后自动确认收货时间（天）"
                      />
                </el-form-item>

                <el-form-item label="自动完成交易时间，不能申请退货（天）" prop="finishOvertime">
                      <el-input
                          v-model="formData.finishOvertime"
                          placeholder="自动完成交易时间，不能申请退货（天）"
                      />
                </el-form-item>

                <el-form-item label="订单完成后自动好评时间（天）" prop="commentOvertime">
                      <el-input
                          v-model="formData.commentOvertime"
                          placeholder="订单完成后自动好评时间（天）"
                      />
                </el-form-item>

                <el-form-item label="会员等级【0-不限会员等级，全部通用；其他-对应的其他会员等级】" prop="memberLevel">
                      <el-input
                          v-model="formData.memberLevel"
                          placeholder="会员等级【0-不限会员等级，全部通用；其他-对应的其他会员等级】"
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
    name: "OmsOrderSetting",
    inheritAttrs: false,
  });

  import OmsOrderSettingAPI, { OmsOrderSettingPageVO, OmsOrderSettingForm, OmsOrderSettingPageQuery } from "@/api/aioveuMall/aioveuMallOms/aioveuMallOmsOrderSetting/oms-order-setting";

  const queryFormRef = ref();
  const dataFormRef = ref();

  const loading = ref(false);
  const removeIds = ref<number[]>([]);
  const total = ref(0);

  const queryParams = reactive<OmsOrderSettingPageQuery>({
    pageNum: 1,
    pageSize: 10,
  });

  // 订单配置信息表格数据
  const pageData = ref<OmsOrderSettingPageVO[]>([]);

  // 弹窗
  const dialog = reactive({
    title: "",
    visible: false,
  });

  // 订单配置信息表单数据
  const formData = reactive<OmsOrderSettingForm>({});

  // 订单配置信息表单校验规则
  const rules = reactive({
  });

  /** 查询订单配置信息 */
  function handleQuery() {
    loading.value = true;
          OmsOrderSettingAPI.getPage(queryParams)
        .then((data) => {
          pageData.value = data.list.flat();
          total.value = data.total;
        })
        .finally(() => {
          loading.value = false;
        });
  }

  /** 重置订单配置信息查询 */
  function handleResetQuery() {
    queryFormRef.value!.resetFields();
    queryParams.pageNum = 1;
    handleQuery();
  }

  /** 行复选框选中记录选中ID集合 */
  function handleSelectionChange(selection: any) {
    removeIds.value = selection.map((item: any) => item.id);
  }

  /** 打开订单配置信息弹窗 */
  function handleOpenDialog(id?: number) {
    dialog.visible = true;
    if (id) {
      dialog.title = "修改订单配置信息";
            OmsOrderSettingAPI.getFormData(id).then((data) => {
        Object.assign(formData, data);
      });
    } else {
      dialog.title = "新增订单配置信息";
    }
  }

  /** 提交订单配置信息表单 */
  function handleSubmit() {
    dataFormRef.value.validate((valid: any) => {
      if (valid) {
        loading.value = true;
        const id = formData.id;
        if (id) {
                OmsOrderSettingAPI.update(id, formData)
              .then(() => {
                ElMessage.success("修改成功");
                handleCloseDialog();
                handleResetQuery();
              })
              .finally(() => (loading.value = false));
        } else {
                OmsOrderSettingAPI.add(formData)
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

  /** 关闭订单配置信息弹窗 */
  function handleCloseDialog() {
    dialog.visible = false;
    dataFormRef.value.resetFields();
    dataFormRef.value.clearValidate();
    formData.id = undefined;
  }

  /** 删除订单配置信息 */
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
                OmsOrderSettingAPI.deleteByIds(ids)
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
