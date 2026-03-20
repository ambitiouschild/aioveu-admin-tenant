<template>
  <div class="app-container">
    <div class="search-container">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
                <el-form-item label="优惠券名称" prop="name">
                      <el-input
                          v-model="queryParams.name"
                          placeholder="优惠券名称"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="优惠券类型(1-满减券;2-直减券;3-折扣券)" prop="type">
                      <el-input
                          v-model="queryParams.type"
                          placeholder="优惠券类型(1-满减券;2-直减券;3-折扣券)"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="优惠券码" prop="code">
                      <el-input
                          v-model="queryParams.code"
                          placeholder="优惠券码"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="使用平台(0-全平台;1-APP;2-PC)" prop="platform">
                      <el-input
                          v-model="queryParams.platform"
                          placeholder="使用平台(0-全平台;1-APP;2-PC)"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="优惠券面值类型" prop="faceValueType">
                      <el-input
                          v-model="queryParams.faceValueType"
                          placeholder="优惠券面值类型"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="使用门槛(0:无门槛)" prop="minPoint">
                      <el-input
                          v-model="queryParams.minPoint"
                          placeholder="使用门槛(0:无门槛)"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="每人限领张数(-1-无限制)" prop="perLimit">
                      <el-input
                          v-model="queryParams.perLimit"
                          placeholder="每人限领张数(-1-无限制)"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="有效期类型(1:自领取时起有效天数;2:有效起止时间)" prop="validityPeriodType">
                      <el-input
                          v-model="queryParams.validityPeriodType"
                          placeholder="有效期类型(1:自领取时起有效天数;2:有效起止时间)"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="有效期天数" prop="validityDays">
                      <el-input
                          v-model="queryParams.validityDays"
                          placeholder="有效期天数"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="应用范围(0-全场通用;1-指定商品分类;2-指定商品)" prop="applicationScope">
                      <el-input
                          v-model="queryParams.applicationScope"
                          placeholder="应用范围(0-全场通用;1-指定商品分类;2-指定商品)"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="已领取的优惠券数量(统计)" prop="receivedCount">
                      <el-input
                          v-model="queryParams.receivedCount"
                          placeholder="已领取的优惠券数量(统计)"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="逻辑删除标识(0-正常;1-删除)" prop="deleted">
                      <el-input
                          v-model="queryParams.deleted"
                          placeholder="逻辑删除标识(0-正常;1-删除)"
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
            v-hasPerm="['aioveuMallSmsCoupon:sms-coupon:add']"
            type="success"
            @click="handleOpenDialog()"
        >
          <template #icon><Plus /></template>
          新增
        </el-button>
        <el-button
            v-hasPerm="['aioveuMallSmsCoupon:sms-coupon:delete']"
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
                        label="ID"
                        prop="id"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="name"
                        label="优惠券名称"
                        prop="name"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="type"
                        label="优惠券类型(1-满减券;2-直减券;3-折扣券)"
                        prop="type"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="code"
                        label="优惠券码"
                        prop="code"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="platform"
                        label="使用平台(0-全平台;1-APP;2-PC)"
                        prop="platform"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="faceValueType"
                        label="优惠券面值类型"
                        prop="faceValueType"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="faceValue"
                        label="优惠券面值(分)"
                        prop="faceValue"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="discount"
                        label="折扣"
                        prop="discount"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="minPoint"
                        label="使用门槛(0:无门槛)"
                        prop="minPoint"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="perLimit"
                        label="每人限领张数(-1-无限制)"
                        prop="perLimit"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="validityPeriodType"
                        label="有效期类型(1:自领取时起有效天数;2:有效起止时间)"
                        prop="validityPeriodType"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="validityDays"
                        label="有效期天数"
                        prop="validityDays"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="validityBeginTime"
                        label="有效期起始时间"
                        prop="validityBeginTime"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="validityEndTime"
                        label="有效期截止时间"
                        prop="validityEndTime"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="applicationScope"
                        label="应用范围(0-全场通用;1-指定商品分类;2-指定商品)"
                        prop="applicationScope"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="circulation"
                        label="发行量(-1-无限制)"
                        prop="circulation"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="receivedCount"
                        label="已领取的优惠券数量(统计)"
                        prop="receivedCount"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="usedCount"
                        label="已使用的优惠券数量(统计)"
                        prop="usedCount"
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
                        key="updateTime"
                        label="创建时间"
                        prop="updateTime"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="createTime"
                        label="修改时间"
                        prop="createTime"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="deleted"
                        label="逻辑删除标识(0-正常;1-删除)"
                        prop="deleted"
                        min-width="150"
                        align="center"
                    />
        <el-table-column fixed="right" label="操作" width="220">
          <template #default="scope">
            <el-button
                v-hasPerm="['aioveuMallSmsCoupon:sms-coupon:edit']"
                type="primary"
                size="small"
                link
                @click="handleOpenDialog(scope.row.id)"
            >
              <template #icon><Edit /></template>
              编辑
            </el-button>
            <el-button
                v-hasPerm="['aioveuMallSmsCoupon:sms-coupon:delete']"
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

    <!-- 优惠券表单弹窗 -->
    <el-dialog
        v-model="dialog.visible"
        :title="dialog.title"
        width="500px"
        @close="handleCloseDialog"
    >
      <el-form ref="dataFormRef" :model="formData" :rules="rules" label-width="100px">
                <el-form-item label="ID" prop="id">
                      <el-input
                          v-model="formData.id"
                          placeholder="ID"
                      />
                </el-form-item>

                <el-form-item label="优惠券名称" prop="name">
                      <el-input
                          v-model="formData.name"
                          placeholder="优惠券名称"
                      />
                </el-form-item>

                <el-form-item label="优惠券类型(1-满减券;2-直减券;3-折扣券)" prop="type">
                      <el-input
                          v-model="formData.type"
                          placeholder="优惠券类型(1-满减券;2-直减券;3-折扣券)"
                      />
                </el-form-item>

                <el-form-item label="优惠券码" prop="code">
                      <el-input
                          v-model="formData.code"
                          placeholder="优惠券码"
                      />
                </el-form-item>

                <el-form-item label="使用平台(0-全平台;1-APP;2-PC)" prop="platform">
                      <el-input
                          v-model="formData.platform"
                          placeholder="使用平台(0-全平台;1-APP;2-PC)"
                      />
                </el-form-item>

                <el-form-item label="优惠券面值类型" prop="faceValueType">
                      <el-input
                          v-model="formData.faceValueType"
                          placeholder="优惠券面值类型"
                      />
                </el-form-item>

                <el-form-item label="优惠券面值(分)" prop="faceValue">
                      <el-input
                          v-model="formData.faceValue"
                          placeholder="优惠券面值(分)"
                      />
                </el-form-item>

                <el-form-item label="折扣" prop="discount">
                      <el-input
                          v-model="formData.discount"
                          placeholder="折扣"
                      />
                </el-form-item>

                <el-form-item label="使用门槛(0:无门槛)" prop="minPoint">
                      <el-input
                          v-model="formData.minPoint"
                          placeholder="使用门槛(0:无门槛)"
                      />
                </el-form-item>

                <el-form-item label="每人限领张数(-1-无限制)" prop="perLimit">
                      <el-input
                          v-model="formData.perLimit"
                          placeholder="每人限领张数(-1-无限制)"
                      />
                </el-form-item>

                <el-form-item label="有效期类型(1:自领取时起有效天数;2:有效起止时间)" prop="validityPeriodType">
                      <el-input
                          v-model="formData.validityPeriodType"
                          placeholder="有效期类型(1:自领取时起有效天数;2:有效起止时间)"
                      />
                </el-form-item>

                <el-form-item label="有效期天数" prop="validityDays">
                      <el-input
                          v-model="formData.validityDays"
                          placeholder="有效期天数"
                      />
                </el-form-item>

                <el-form-item label="有效期起始时间" prop="validityBeginTime">
                      <el-date-picker
                          v-model="formData.validityBeginTime"
                          type="datetime"
                          placeholder="有效期起始时间"
                          value-format="YYYY-MM-DD HH:mm:ss"
                      />
                </el-form-item>

                <el-form-item label="有效期截止时间" prop="validityEndTime">
                      <el-date-picker
                          v-model="formData.validityEndTime"
                          type="datetime"
                          placeholder="有效期截止时间"
                          value-format="YYYY-MM-DD HH:mm:ss"
                      />
                </el-form-item>

                <el-form-item label="应用范围(0-全场通用;1-指定商品分类;2-指定商品)" prop="applicationScope">
                      <el-input
                          v-model="formData.applicationScope"
                          placeholder="应用范围(0-全场通用;1-指定商品分类;2-指定商品)"
                      />
                </el-form-item>

                <el-form-item label="发行量(-1-无限制)" prop="circulation">
                      <el-input
                          v-model="formData.circulation"
                          placeholder="发行量(-1-无限制)"
                      />
                </el-form-item>

                <el-form-item label="已领取的优惠券数量(统计)" prop="receivedCount">
                      <el-input
                          v-model="formData.receivedCount"
                          placeholder="已领取的优惠券数量(统计)"
                      />
                </el-form-item>

                <el-form-item label="已使用的优惠券数量(统计)" prop="usedCount">
                      <el-input
                          v-model="formData.usedCount"
                          placeholder="已使用的优惠券数量(统计)"
                      />
                </el-form-item>

                <el-form-item label="备注" prop="remark">
                      <el-input
                          v-model="formData.remark"
                          placeholder="备注"
                      />
                </el-form-item>

                <el-form-item label="逻辑删除标识(0-正常;1-删除)" prop="deleted">
                      <el-input
                          v-model="formData.deleted"
                          placeholder="逻辑删除标识(0-正常;1-删除)"
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
    name: "SmsCoupon",
    inheritAttrs: false,
  });

  import SmsCouponAPI, { SmsCouponPageVO, SmsCouponForm, SmsCouponPageQuery } from "@/api/aioveuMall/aioveuMallSms/aioveuMallSmsCoupon/sms-coupon";

  const queryFormRef = ref();
  const dataFormRef = ref();

  const loading = ref(false);
  const removeIds = ref<number[]>([]);
  const total = ref(0);

  const queryParams = reactive<SmsCouponPageQuery>({
    pageNum: 1,
    pageSize: 10,
  });

  // 优惠券表格数据
  const pageData = ref<SmsCouponPageVO[]>([]);

  // 弹窗
  const dialog = reactive({
    title: "",
    visible: false,
  });

  // 优惠券表单数据
  const formData = reactive<SmsCouponForm>({});

  // 优惠券表单校验规则
  const rules = reactive({
                      name: [{ required: true, message: "请输入优惠券名称", trigger: "blur" }],
                      type: [{ required: true, message: "请输入优惠券类型(1-满减券;2-直减券;3-折扣券)", trigger: "blur" }],
                      code: [{ required: true, message: "请输入优惠券码", trigger: "blur" }],
                      platform: [{ required: true, message: "请输入使用平台(0-全平台;1-APP;2-PC)", trigger: "blur" }],
                      faceValueType: [{ required: true, message: "请输入优惠券面值类型", trigger: "blur" }],
                      minPoint: [{ required: true, message: "请输入使用门槛(0:无门槛)", trigger: "blur" }],
                      perLimit: [{ required: true, message: "请输入每人限领张数(-1-无限制)", trigger: "blur" }],
  });

  /** 查询优惠券 */
  function handleQuery() {
    loading.value = true;
          SmsCouponAPI.getPage(queryParams)
        .then((data) => {
          pageData.value = data.list.flat();
          total.value = data.total;
        })
        .finally(() => {
          loading.value = false;
        });
  }

  /** 重置优惠券查询 */
  function handleResetQuery() {
    queryFormRef.value!.resetFields();
    queryParams.pageNum = 1;
    handleQuery();
  }

  /** 行复选框选中记录选中ID集合 */
  function handleSelectionChange(selection: any) {
    removeIds.value = selection.map((item: any) => item.id);
  }

  /** 打开优惠券弹窗 */
  function handleOpenDialog(id?: number) {
    dialog.visible = true;
    if (id) {
      dialog.title = "修改优惠券";
            SmsCouponAPI.getFormData(id).then((data) => {
        Object.assign(formData, data);
      });
    } else {
      dialog.title = "新增优惠券";
    }
  }

  /** 提交优惠券表单 */
  function handleSubmit() {
    dataFormRef.value.validate((valid: any) => {
      if (valid) {
        loading.value = true;
        const id = formData.id;
        if (id) {
                SmsCouponAPI.update(id, formData)
              .then(() => {
                ElMessage.success("修改成功");
                handleCloseDialog();
                handleResetQuery();
              })
              .finally(() => (loading.value = false));
        } else {
                SmsCouponAPI.add(formData)
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

  /** 关闭优惠券弹窗 */
  function handleCloseDialog() {
    dialog.visible = false;
    dataFormRef.value.resetFields();
    dataFormRef.value.clearValidate();
    formData.id = undefined;
  }

  /** 删除优惠券 */
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
                SmsCouponAPI.deleteByIds(ids)
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
