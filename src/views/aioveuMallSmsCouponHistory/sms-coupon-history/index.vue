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
                <el-form-item label="会员ID" prop="memberId">
                      <el-input
                          v-model="queryParams.memberId"
                          placeholder="会员ID"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="会员昵称" prop="memberNickname">
                      <el-input
                          v-model="queryParams.memberNickname"
                          placeholder="会员昵称"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="优惠券码" prop="couponCode">
                      <el-input
                          v-model="queryParams.couponCode"
                          placeholder="优惠券码"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="获取类型(1：后台增删；2：主动领取)" prop="getType">
                      <el-input
                          v-model="queryParams.getType"
                          placeholder="获取类型(1：后台增删；2：主动领取)"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="状态(0：未使用；1：已使用；2：已过期)" prop="status">
                      <el-input
                          v-model="queryParams.status"
                          placeholder="状态(0：未使用；1：已使用；2：已过期)"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="订单ID" prop="orderId">
                      <el-input
                          v-model="queryParams.orderId"
                          placeholder="订单ID"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="订单号" prop="orderSn">
                      <el-input
                          v-model="queryParams.orderSn"
                          placeholder="订单号"
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
            v-hasPerm="['aioveuMallSmsCouponHistory:sms-coupon-history:add']"
            type="success"
            @click="handleOpenDialog()"
        >
          <template #icon><Plus /></template>
          新增
        </el-button>
        <el-button
            v-hasPerm="['aioveuMallSmsCouponHistory:sms-coupon-history:delete']"
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
                        label="优惠券领取/使用记录ID"
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
                        key="memberId"
                        label="会员ID"
                        prop="memberId"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="memberNickname"
                        label="会员昵称"
                        prop="memberNickname"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="couponCode"
                        label="优惠券码"
                        prop="couponCode"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="getType"
                        label="获取类型(1：后台增删；2：主动领取)"
                        prop="getType"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="status"
                        label="状态(0：未使用；1：已使用；2：已过期)"
                        prop="status"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="useTime"
                        label="使用时间"
                        prop="useTime"
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
                        label="订单号"
                        prop="orderSn"
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
                v-hasPerm="['aioveuMallSmsCouponHistory:sms-coupon-history:edit']"
                type="primary"
                size="small"
                link
                @click="handleOpenDialog(scope.row.id)"
            >
              <template #icon><Edit /></template>
              编辑
            </el-button>
            <el-button
                v-hasPerm="['aioveuMallSmsCouponHistory:sms-coupon-history:delete']"
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

    <!-- 优惠券领取/使用记录表单弹窗 -->
    <el-dialog
        v-model="dialog.visible"
        :title="dialog.title"
        width="500px"
        @close="handleCloseDialog"
    >
      <el-form ref="dataFormRef" :model="formData" :rules="rules" label-width="100px">
                <el-form-item label="优惠券领取/使用记录ID" prop="id">
                      <el-input
                          v-model="formData.id"
                          placeholder="优惠券领取/使用记录ID"
                      />
                </el-form-item>

                <el-form-item label="优惠券ID" prop="couponId">
                      <el-input
                          v-model="formData.couponId"
                          placeholder="优惠券ID"
                      />
                </el-form-item>

                <el-form-item label="会员ID" prop="memberId">
                      <el-input
                          v-model="formData.memberId"
                          placeholder="会员ID"
                      />
                </el-form-item>

                <el-form-item label="会员昵称" prop="memberNickname">
                      <el-input
                          v-model="formData.memberNickname"
                          placeholder="会员昵称"
                      />
                </el-form-item>

                <el-form-item label="优惠券码" prop="couponCode">
                      <el-input
                          v-model="formData.couponCode"
                          placeholder="优惠券码"
                      />
                </el-form-item>

                <el-form-item label="获取类型(1：后台增删；2：主动领取)" prop="getType">
                      <el-input
                          v-model="formData.getType"
                          placeholder="获取类型(1：后台增删；2：主动领取)"
                      />
                </el-form-item>

                <el-form-item label="状态(0：未使用；1：已使用；2：已过期)" prop="status">
                      <el-input
                          v-model="formData.status"
                          placeholder="状态(0：未使用；1：已使用；2：已过期)"
                      />
                </el-form-item>

                <el-form-item label="使用时间" prop="useTime">
                      <el-date-picker
                          v-model="formData.useTime"
                          type="datetime"
                          placeholder="使用时间"
                          value-format="YYYY-MM-DD HH:mm:ss"
                      />
                </el-form-item>

                <el-form-item label="订单ID" prop="orderId">
                      <el-input
                          v-model="formData.orderId"
                          placeholder="订单ID"
                      />
                </el-form-item>

                <el-form-item label="订单号" prop="orderSn">
                      <el-input
                          v-model="formData.orderSn"
                          placeholder="订单号"
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
    name: "SmsCouponHistory",
    inheritAttrs: false,
  });

  import SmsCouponHistoryAPI, { SmsCouponHistoryPageVO, SmsCouponHistoryForm, SmsCouponHistoryPageQuery } from "@/api/aioveuMall/aioveuMallSms/aioveuMallSmsCouponHistory/sms-coupon-history";

  const queryFormRef = ref();
  const dataFormRef = ref();

  const loading = ref(false);
  const removeIds = ref<number[]>([]);
  const total = ref(0);

  const queryParams = reactive<SmsCouponHistoryPageQuery>({
    pageNum: 1,
    pageSize: 10,
  });

  // 优惠券领取/使用记录表格数据
  const pageData = ref<SmsCouponHistoryPageVO[]>([]);

  // 弹窗
  const dialog = reactive({
    title: "",
    visible: false,
  });

  // 优惠券领取/使用记录表单数据
  const formData = reactive<SmsCouponHistoryForm>({});

  // 优惠券领取/使用记录表单校验规则
  const rules = reactive({
                      couponId: [{ required: true, message: "请输入优惠券ID", trigger: "blur" }],
                      memberId: [{ required: true, message: "请输入会员ID", trigger: "blur" }],
                      couponCode: [{ required: true, message: "请输入优惠券码", trigger: "blur" }],
                      getType: [{ required: true, message: "请输入获取类型(1：后台增删；2：主动领取)", trigger: "blur" }],
  });

  /** 查询优惠券领取/使用记录 */
  function handleQuery() {
    loading.value = true;
          SmsCouponHistoryAPI.getPage(queryParams)
        .then((data) => {
          pageData.value = data.list.flat();
          total.value = data.total;
        })
        .finally(() => {
          loading.value = false;
        });
  }

  /** 重置优惠券领取/使用记录查询 */
  function handleResetQuery() {
    queryFormRef.value!.resetFields();
    queryParams.pageNum = 1;
    handleQuery();
  }

  /** 行复选框选中记录选中ID集合 */
  function handleSelectionChange(selection: any) {
    removeIds.value = selection.map((item: any) => item.id);
  }

  /** 打开优惠券领取/使用记录弹窗 */
  function handleOpenDialog(id?: number) {
    dialog.visible = true;
    if (id) {
      dialog.title = "修改优惠券领取/使用记录";
            SmsCouponHistoryAPI.getFormData(id).then((data) => {
        Object.assign(formData, data);
      });
    } else {
      dialog.title = "新增优惠券领取/使用记录";
    }
  }

  /** 提交优惠券领取/使用记录表单 */
  function handleSubmit() {
    dataFormRef.value.validate((valid: any) => {
      if (valid) {
        loading.value = true;
        const id = formData.id;
        if (id) {
                SmsCouponHistoryAPI.update(id, formData)
              .then(() => {
                ElMessage.success("修改成功");
                handleCloseDialog();
                handleResetQuery();
              })
              .finally(() => (loading.value = false));
        } else {
                SmsCouponHistoryAPI.add(formData)
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

  /** 关闭优惠券领取/使用记录弹窗 */
  function handleCloseDialog() {
    dialog.visible = false;
    dataFormRef.value.resetFields();
    dataFormRef.value.clearValidate();
    formData.id = undefined;
  }

  /** 删除优惠券领取/使用记录 */
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
                SmsCouponHistoryAPI.deleteByIds(ids)
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
