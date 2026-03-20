<template>
  <div class="app-container">
    <div class="search-container">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
                <el-form-item label="支付单号，唯一，格式：PAYyyyyMMddHHmmss+6位随机" prop="paymentNo">
                      <el-input
                          v-model="queryParams.paymentNo"
                          placeholder="支付单号，唯一，格式：PAYyyyyMMddHHmmss+6位随机"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="业务订单号（如退款单号、订单号）" prop="orderNo">
                      <el-input
                          v-model="queryParams.orderNo"
                          placeholder="业务订单号（如退款单号、订单号）"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="业务类型：REFUND-退款 ORDER-订单 RECHARGE-充值" prop="bizType">
                      <el-input
                          v-model="queryParams.bizType"
                          placeholder="业务类型：REFUND-退款 ORDER-订单 RECHARGE-充值"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="用户ID" prop="userId">
                      <el-input
                          v-model="queryParams.userId"
                          placeholder="用户ID"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="支付状态：0-待支付 1-支付中 2-支付成功 3-支付失败 4-已关闭 5-已退款" prop="paymentStatus">
                      <el-input
                          v-model="queryParams.paymentStatus"
                          placeholder="支付状态：0-待支付 1-支付中 2-支付成功 3-支付失败 4-已关闭 5-已退款"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="支付渠道：ALIPAY-支付宝 WECHAT-微信 UNIONPAY-银联 BALANCE-余额" prop="paymentChannel">
                      <el-input
                          v-model="queryParams.paymentChannel"
                          placeholder="支付渠道：ALIPAY-支付宝 WECHAT-微信 UNIONPAY-银联 BALANCE-余额"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="支付时间" prop="paymentTime">
                      <el-date-picker
                          v-model="queryParams.paymentTime"
                          type="daterange"
                          range-separator="~"
                          start-placeholder="开始时间"
                          end-placeholder="结束时间"
                          value-format="YYYY-MM-DD HH:mm:ss"
                      />
                </el-form-item>
                <el-form-item label="第三方支付单号" prop="thirdPaymentNo">
                      <el-input
                          v-model="queryParams.thirdPaymentNo"
                          placeholder="第三方支付单号"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="创建时间" prop="createTime">
                      <el-date-picker
                          v-model="queryParams.createTime"
                          type="daterange"
                          range-separator="~"
                          start-placeholder="开始时间"
                          end-placeholder="结束时间"
                          value-format="YYYY-MM-DD HH:mm:ss"
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
            v-hasPerm="['aioveuMallPayOrder:pay-order:add']"
            type="success"
            @click="handleOpenDialog()"
        >
          <template #icon><Plus /></template>
          新增
        </el-button>
        <el-button
            v-hasPerm="['aioveuMallPayOrder:pay-order:delete']"
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
                        key="paymentNo"
                        label="支付单号，唯一，格式：PAYyyyyMMddHHmmss+6位随机"
                        prop="paymentNo"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="orderNo"
                        label="业务订单号（如退款单号、订单号）"
                        prop="orderNo"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="bizType"
                        label="业务类型：REFUND-退款 ORDER-订单 RECHARGE-充值"
                        prop="bizType"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="userId"
                        label="用户ID"
                        prop="userId"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="paymentAmount"
                        label="支付/退款金额"
                        prop="paymentAmount"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="paymentStatus"
                        label="支付状态：0-待支付 1-支付中 2-支付成功 3-支付失败 4-已关闭 5-已退款"
                        prop="paymentStatus"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="paymentChannel"
                        label="支付渠道：ALIPAY-支付宝 WECHAT-微信 UNIONPAY-银联 BALANCE-余额"
                        prop="paymentChannel"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="paymentMethod"
                        label="支付方式：APP-APP支付 H5-H5支付 JSAPI-小程序/公众号 NATIVE-扫码支付"
                        prop="paymentMethod"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="paymentTime"
                        label="支付时间"
                        prop="paymentTime"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="paymentExpireTime"
                        label="支付过期时间"
                        prop="paymentExpireTime"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="thirdPaymentNo"
                        label="第三方支付单号"
                        prop="thirdPaymentNo"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="thirdTransactionNo"
                        label="第三方交易流水号"
                        prop="thirdTransactionNo"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="attachData"
                        label="附加数据，JSON格式"
                        prop="attachData"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="notifyUrl"
                        label="异步通知地址"
                        prop="notifyUrl"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="returnUrl"
                        label="同步返回地址"
                        prop="returnUrl"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="clientIp"
                        label="客户端IP"
                        prop="clientIp"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="deviceInfo"
                        label="设备信息"
                        prop="deviceInfo"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="subject"
                        label="订单标题"
                        prop="subject"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="body"
                        label="订单描述"
                        prop="body"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="currency"
                        label="币种，默认人民币"
                        prop="currency"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="errorCode"
                        label="错误代码"
                        prop="errorCode"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="errorMessage"
                        label="错误信息"
                        prop="errorMessage"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="notifyStatus"
                        label="通知状态：0-未通知 1-通知中 2-通知成功 3-通知失败"
                        prop="notifyStatus"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="notifyCount"
                        label="通知次数"
                        prop="notifyCount"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="lastNotifyTime"
                        label="最后通知时间"
                        prop="lastNotifyTime"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="nextNotifyTime"
                        label="下次通知时间"
                        prop="nextNotifyTime"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="isDeleted"
                        label="逻辑删除：0-未删除 1-已删除"
                        prop="isDeleted"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="createBy"
                        label="创建人"
                        prop="createBy"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="updateBy"
                        label="更新人"
                        prop="updateBy"
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
                        key="version"
                        label="版本号（用于乐观锁）"
                        prop="version"
                        min-width="150"
                        align="center"
                    />
        <el-table-column fixed="right" label="操作" width="220">
          <template #default="scope">
            <el-button
                v-hasPerm="['aioveuMallPayOrder:pay-order:edit']"
                type="primary"
                size="small"
                link
                @click="handleOpenDialog(scope.row.id)"
            >
              <template #icon><Edit /></template>
              编辑
            </el-button>
            <el-button
                v-hasPerm="['aioveuMallPayOrder:pay-order:delete']"
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

    <!-- 支付订单表单弹窗 -->
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

                <el-form-item label="支付单号，唯一，格式：PAYyyyyMMddHHmmss+6位随机" prop="paymentNo">
                      <el-input
                          v-model="formData.paymentNo"
                          placeholder="支付单号，唯一，格式：PAYyyyyMMddHHmmss+6位随机"
                      />
                </el-form-item>

                <el-form-item label="业务订单号（如退款单号、订单号）" prop="orderNo">
                      <el-input
                          v-model="formData.orderNo"
                          placeholder="业务订单号（如退款单号、订单号）"
                      />
                </el-form-item>

                <el-form-item label="业务类型：REFUND-退款 ORDER-订单 RECHARGE-充值" prop="bizType">
                      <el-input
                          v-model="formData.bizType"
                          placeholder="业务类型：REFUND-退款 ORDER-订单 RECHARGE-充值"
                      />
                </el-form-item>

                <el-form-item label="用户ID" prop="userId">
                      <el-input
                          v-model="formData.userId"
                          placeholder="用户ID"
                      />
                </el-form-item>

                <el-form-item label="支付/退款金额" prop="paymentAmount">
                      <el-input
                          v-model="formData.paymentAmount"
                          placeholder="支付/退款金额"
                      />
                </el-form-item>

                <el-form-item label="支付状态：0-待支付 1-支付中 2-支付成功 3-支付失败 4-已关闭 5-已退款" prop="paymentStatus">
                      <el-input
                          v-model="formData.paymentStatus"
                          placeholder="支付状态：0-待支付 1-支付中 2-支付成功 3-支付失败 4-已关闭 5-已退款"
                      />
                </el-form-item>

                <el-form-item label="支付渠道：ALIPAY-支付宝 WECHAT-微信 UNIONPAY-银联 BALANCE-余额" prop="paymentChannel">
                      <el-input
                          v-model="formData.paymentChannel"
                          placeholder="支付渠道：ALIPAY-支付宝 WECHAT-微信 UNIONPAY-银联 BALANCE-余额"
                      />
                </el-form-item>

                <el-form-item label="支付方式：APP-APP支付 H5-H5支付 JSAPI-小程序/公众号 NATIVE-扫码支付" prop="paymentMethod">
                      <el-input
                          v-model="formData.paymentMethod"
                          placeholder="支付方式：APP-APP支付 H5-H5支付 JSAPI-小程序/公众号 NATIVE-扫码支付"
                      />
                </el-form-item>

                <el-form-item label="支付时间" prop="paymentTime">
                      <el-date-picker
                          v-model="formData.paymentTime"
                          type="datetime"
                          placeholder="支付时间"
                          value-format="YYYY-MM-DD HH:mm:ss"
                      />
                </el-form-item>

                <el-form-item label="支付过期时间" prop="paymentExpireTime">
                      <el-date-picker
                          v-model="formData.paymentExpireTime"
                          type="datetime"
                          placeholder="支付过期时间"
                          value-format="YYYY-MM-DD HH:mm:ss"
                      />
                </el-form-item>

                <el-form-item label="第三方支付单号" prop="thirdPaymentNo">
                      <el-input
                          v-model="formData.thirdPaymentNo"
                          placeholder="第三方支付单号"
                      />
                </el-form-item>

                <el-form-item label="第三方交易流水号" prop="thirdTransactionNo">
                      <el-input
                          v-model="formData.thirdTransactionNo"
                          placeholder="第三方交易流水号"
                      />
                </el-form-item>

                <el-form-item label="附加数据，JSON格式" prop="attachData">
                      <el-input
                          v-model="formData.attachData"
                          placeholder="附加数据，JSON格式"
                      />
                </el-form-item>

                <el-form-item label="异步通知地址" prop="notifyUrl">
                      <el-input
                          v-model="formData.notifyUrl"
                          placeholder="异步通知地址"
                      />
                </el-form-item>

                <el-form-item label="同步返回地址" prop="returnUrl">
                      <el-input
                          v-model="formData.returnUrl"
                          placeholder="同步返回地址"
                      />
                </el-form-item>

                <el-form-item label="客户端IP" prop="clientIp">
                      <el-input
                          v-model="formData.clientIp"
                          placeholder="客户端IP"
                      />
                </el-form-item>

                <el-form-item label="设备信息" prop="deviceInfo">
                      <el-input
                          v-model="formData.deviceInfo"
                          placeholder="设备信息"
                      />
                </el-form-item>

                <el-form-item label="订单标题" prop="subject">
                      <el-input
                          v-model="formData.subject"
                          placeholder="订单标题"
                      />
                </el-form-item>

                <el-form-item label="订单描述" prop="body">
                      <el-input
                          v-model="formData.body"
                          placeholder="订单描述"
                      />
                </el-form-item>

                <el-form-item label="币种，默认人民币" prop="currency">
                      <el-input
                          v-model="formData.currency"
                          placeholder="币种，默认人民币"
                      />
                </el-form-item>

                <el-form-item label="错误代码" prop="errorCode">
                      <el-input
                          v-model="formData.errorCode"
                          placeholder="错误代码"
                      />
                </el-form-item>

                <el-form-item label="错误信息" prop="errorMessage">
                      <el-input
                          v-model="formData.errorMessage"
                          placeholder="错误信息"
                      />
                </el-form-item>

                <el-form-item label="通知状态：0-未通知 1-通知中 2-通知成功 3-通知失败" prop="notifyStatus">
                      <el-input
                          v-model="formData.notifyStatus"
                          placeholder="通知状态：0-未通知 1-通知中 2-通知成功 3-通知失败"
                      />
                </el-form-item>

                <el-form-item label="通知次数" prop="notifyCount">
                      <el-input
                          v-model="formData.notifyCount"
                          placeholder="通知次数"
                      />
                </el-form-item>

                <el-form-item label="最后通知时间" prop="lastNotifyTime">
                      <el-date-picker
                          v-model="formData.lastNotifyTime"
                          type="datetime"
                          placeholder="最后通知时间"
                          value-format="YYYY-MM-DD HH:mm:ss"
                      />
                </el-form-item>

                <el-form-item label="下次通知时间" prop="nextNotifyTime">
                      <el-date-picker
                          v-model="formData.nextNotifyTime"
                          type="datetime"
                          placeholder="下次通知时间"
                          value-format="YYYY-MM-DD HH:mm:ss"
                      />
                </el-form-item>

                <el-form-item label="逻辑删除：0-未删除 1-已删除" prop="isDeleted">
                      <el-input
                          v-model="formData.isDeleted"
                          placeholder="逻辑删除：0-未删除 1-已删除"
                      />
                </el-form-item>

                <el-form-item label="创建人" prop="createBy">
                      <el-input
                          v-model="formData.createBy"
                          placeholder="创建人"
                      />
                </el-form-item>

                <el-form-item label="更新人" prop="updateBy">
                      <el-input
                          v-model="formData.updateBy"
                          placeholder="更新人"
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

                <el-form-item label="版本号（用于乐观锁）" prop="version">
                      <el-input
                          v-model="formData.version"
                          placeholder="版本号（用于乐观锁）"
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
    name: "PayOrder",
    inheritAttrs: false,
  });

  import PayOrderAPI, { PayOrderPageVO, PayOrderForm, PayOrderPageQuery } from "@/api/aioveuMall/aioveuMallPay/aioveuMallPayOrder/pay-order";

  const queryFormRef = ref();
  const dataFormRef = ref();

  const loading = ref(false);
  const removeIds = ref<number[]>([]);
  const total = ref(0);

  const queryParams = reactive<PayOrderPageQuery>({
    pageNum: 1,
    pageSize: 10,
  });

  // 支付订单表格数据
  const pageData = ref<PayOrderPageVO[]>([]);

  // 弹窗
  const dialog = reactive({
    title: "",
    visible: false,
  });

  // 支付订单表单数据
  const formData = reactive<PayOrderForm>({});

  // 支付订单表单校验规则
  const rules = reactive({
                      paymentNo: [{ required: true, message: "请输入支付单号，唯一，格式：PAYyyyyMMddHHmmss+6位随机", trigger: "blur" }],
                      orderNo: [{ required: true, message: "请输入业务订单号（如退款单号、订单号）", trigger: "blur" }],
                      bizType: [{ required: true, message: "请输入业务类型：REFUND-退款 ORDER-订单 RECHARGE-充值", trigger: "blur" }],
                      userId: [{ required: true, message: "请输入用户ID", trigger: "blur" }],
                      paymentAmount: [{ required: true, message: "请输入支付/退款金额", trigger: "blur" }],
                      paymentStatus: [{ required: true, message: "请输入支付状态：0-待支付 1-支付中 2-支付成功 3-支付失败 4-已关闭 5-已退款", trigger: "blur" }],
                      paymentChannel: [{ required: true, message: "请输入支付渠道：ALIPAY-支付宝 WECHAT-微信 UNIONPAY-银联 BALANCE-余额", trigger: "blur" }],
                      isDeleted: [{ required: true, message: "请输入逻辑删除：0-未删除 1-已删除", trigger: "blur" }],
  });

  /** 查询支付订单 */
  function handleQuery() {
    loading.value = true;
          PayOrderAPI.getPage(queryParams)
        .then((data) => {
          pageData.value = data.list.flat();
          total.value = data.total;
        })
        .finally(() => {
          loading.value = false;
        });
  }

  /** 重置支付订单查询 */
  function handleResetQuery() {
    queryFormRef.value!.resetFields();
    queryParams.pageNum = 1;
    handleQuery();
  }

  /** 行复选框选中记录选中ID集合 */
  function handleSelectionChange(selection: any) {
    removeIds.value = selection.map((item: any) => item.id);
  }

  /** 打开支付订单弹窗 */
  function handleOpenDialog(id?: number) {
    dialog.visible = true;
    if (id) {
      dialog.title = "修改支付订单";
            PayOrderAPI.getFormData(id).then((data) => {
        Object.assign(formData, data);
      });
    } else {
      dialog.title = "新增支付订单";
    }
  }

  /** 提交支付订单表单 */
  function handleSubmit() {
    dataFormRef.value.validate((valid: any) => {
      if (valid) {
        loading.value = true;
        const id = formData.id;
        if (id) {
                PayOrderAPI.update(id, formData)
              .then(() => {
                ElMessage.success("修改成功");
                handleCloseDialog();
                handleResetQuery();
              })
              .finally(() => (loading.value = false));
        } else {
                PayOrderAPI.add(formData)
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

  /** 关闭支付订单弹窗 */
  function handleCloseDialog() {
    dialog.visible = false;
    dataFormRef.value.resetFields();
    dataFormRef.value.clearValidate();
    formData.id = undefined;
  }

  /** 删除支付订单 */
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
                PayOrderAPI.deleteByIds(ids)
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
