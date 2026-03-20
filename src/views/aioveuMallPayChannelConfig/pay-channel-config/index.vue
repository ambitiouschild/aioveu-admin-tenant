<template>
  <div class="app-container">
    <div class="search-container">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
                <el-form-item label="渠道编码：ALIPAY-支付宝 WECHAT-微信 UNIONPAY-银联" prop="channelCode">
                      <el-input
                          v-model="queryParams.channelCode"
                          placeholder="渠道编码：ALIPAY-支付宝 WECHAT-微信 UNIONPAY-银联"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="渠道名称" prop="channelName">
                      <el-input
                          v-model="queryParams.channelName"
                          placeholder="渠道名称"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="渠道类型：ONLINE-线上 OFFLINE-线下" prop="channelType">
                      <el-input
                          v-model="queryParams.channelType"
                          placeholder="渠道类型：ONLINE-线上 OFFLINE-线下"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="配置类型：CERT-证书 KEY-密钥 URL-地址" prop="configType">
                      <el-input
                          v-model="queryParams.configType"
                          placeholder="配置类型：CERT-证书 KEY-密钥 URL-地址"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="是否启用：0-禁用 1-启用" prop="isEnabled">
                      <el-input
                          v-model="queryParams.isEnabled"
                          placeholder="是否启用：0-禁用 1-启用"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="是否默认：0-否 1-是" prop="isDefault">
                      <el-input
                          v-model="queryParams.isDefault"
                          placeholder="是否默认：0-否 1-是"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="逻辑删除：0-未删除 1-已删除" prop="isDeleted">
                      <el-input
                          v-model="queryParams.isDeleted"
                          placeholder="逻辑删除：0-未删除 1-已删除"
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
            v-hasPerm="['aioveuMallPayChannelConfig:pay-channel-config:add']"
            type="success"
            @click="handleOpenDialog()"
        >
          <template #icon><Plus /></template>
          新增
        </el-button>
        <el-button
            v-hasPerm="['aioveuMallPayChannelConfig:pay-channel-config:delete']"
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
                        key="channelCode"
                        label="渠道编码：ALIPAY-支付宝 WECHAT-微信 UNIONPAY-银联"
                        prop="channelCode"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="channelName"
                        label="渠道名称"
                        prop="channelName"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="channelType"
                        label="渠道类型：ONLINE-线上 OFFLINE-线下"
                        prop="channelType"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="configKey"
                        label="配置键"
                        prop="configKey"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="configValue"
                        label="配置值"
                        prop="configValue"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="configType"
                        label="配置类型：CERT-证书 KEY-密钥 URL-地址"
                        prop="configType"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="configDesc"
                        label="配置描述"
                        prop="configDesc"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="isEnabled"
                        label="是否启用：0-禁用 1-启用"
                        prop="isEnabled"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="isDefault"
                        label="是否默认：0-否 1-是"
                        prop="isDefault"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="priority"
                        label="优先级，数值越大优先级越高"
                        prop="priority"
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
        <el-table-column fixed="right" label="操作" width="220">
          <template #default="scope">
            <el-button
                v-hasPerm="['aioveuMallPayChannelConfig:pay-channel-config:edit']"
                type="primary"
                size="small"
                link
                @click="handleOpenDialog(scope.row.id)"
            >
              <template #icon><Edit /></template>
              编辑
            </el-button>
            <el-button
                v-hasPerm="['aioveuMallPayChannelConfig:pay-channel-config:delete']"
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

    <!-- 支付渠道配置表单弹窗 -->
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

                <el-form-item label="渠道编码：ALIPAY-支付宝 WECHAT-微信 UNIONPAY-银联" prop="channelCode">
                      <el-input
                          v-model="formData.channelCode"
                          placeholder="渠道编码：ALIPAY-支付宝 WECHAT-微信 UNIONPAY-银联"
                      />
                </el-form-item>

                <el-form-item label="渠道名称" prop="channelName">
                      <el-input
                          v-model="formData.channelName"
                          placeholder="渠道名称"
                      />
                </el-form-item>

                <el-form-item label="渠道类型：ONLINE-线上 OFFLINE-线下" prop="channelType">
                      <el-input
                          v-model="formData.channelType"
                          placeholder="渠道类型：ONLINE-线上 OFFLINE-线下"
                      />
                </el-form-item>

                <el-form-item label="配置键" prop="configKey">
                      <el-input
                          v-model="formData.configKey"
                          placeholder="配置键"
                      />
                </el-form-item>

                <el-form-item label="配置值" prop="configValue">
                      <el-input
                          v-model="formData.configValue"
                          placeholder="配置值"
                      />
                </el-form-item>

                <el-form-item label="配置类型：CERT-证书 KEY-密钥 URL-地址" prop="configType">
                      <el-input
                          v-model="formData.configType"
                          placeholder="配置类型：CERT-证书 KEY-密钥 URL-地址"
                      />
                </el-form-item>

                <el-form-item label="配置描述" prop="configDesc">
                      <el-input
                          v-model="formData.configDesc"
                          placeholder="配置描述"
                      />
                </el-form-item>

                <el-form-item label="是否启用：0-禁用 1-启用" prop="isEnabled">
                      <el-input
                          v-model="formData.isEnabled"
                          placeholder="是否启用：0-禁用 1-启用"
                      />
                </el-form-item>

                <el-form-item label="是否默认：0-否 1-是" prop="isDefault">
                      <el-input
                          v-model="formData.isDefault"
                          placeholder="是否默认：0-否 1-是"
                      />
                </el-form-item>

                <el-form-item label="优先级，数值越大优先级越高" prop="priority">
                      <el-input
                          v-model="formData.priority"
                          placeholder="优先级，数值越大优先级越高"
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
    name: "PayChannelConfig",
    inheritAttrs: false,
  });

  import PayChannelConfigAPI, { PayChannelConfigPageVO, PayChannelConfigForm, PayChannelConfigPageQuery } from "@/api/aioveuMall/aioveuMallPay/aioveuMallPayChannelConfig/pay-channel-config";

  const queryFormRef = ref();
  const dataFormRef = ref();

  const loading = ref(false);
  const removeIds = ref<number[]>([]);
  const total = ref(0);

  const queryParams = reactive<PayChannelConfigPageQuery>({
    pageNum: 1,
    pageSize: 10,
  });

  // 支付渠道配置表格数据
  const pageData = ref<PayChannelConfigPageVO[]>([]);

  // 弹窗
  const dialog = reactive({
    title: "",
    visible: false,
  });

  // 支付渠道配置表单数据
  const formData = reactive<PayChannelConfigForm>({});

  // 支付渠道配置表单校验规则
  const rules = reactive({
                      channelCode: [{ required: true, message: "请输入渠道编码：ALIPAY-支付宝 WECHAT-微信 UNIONPAY-银联", trigger: "blur" }],
                      channelName: [{ required: true, message: "请输入渠道名称", trigger: "blur" }],
                      channelType: [{ required: true, message: "请输入渠道类型：ONLINE-线上 OFFLINE-线下", trigger: "blur" }],
                      configKey: [{ required: true, message: "请输入配置键", trigger: "blur" }],
                      configValue: [{ required: true, message: "请输入配置值", trigger: "blur" }],
                      isEnabled: [{ required: true, message: "请输入是否启用：0-禁用 1-启用", trigger: "blur" }],
                      isDeleted: [{ required: true, message: "请输入逻辑删除：0-未删除 1-已删除", trigger: "blur" }],
  });

  /** 查询支付渠道配置 */
  function handleQuery() {
    loading.value = true;
          PayChannelConfigAPI.getPage(queryParams)
        .then((data) => {
          pageData.value = data.list.flat();
          total.value = data.total;
        })
        .finally(() => {
          loading.value = false;
        });
  }

  /** 重置支付渠道配置查询 */
  function handleResetQuery() {
    queryFormRef.value!.resetFields();
    queryParams.pageNum = 1;
    handleQuery();
  }

  /** 行复选框选中记录选中ID集合 */
  function handleSelectionChange(selection: any) {
    removeIds.value = selection.map((item: any) => item.id);
  }

  /** 打开支付渠道配置弹窗 */
  function handleOpenDialog(id?: number) {
    dialog.visible = true;
    if (id) {
      dialog.title = "修改支付渠道配置";
            PayChannelConfigAPI.getFormData(id).then((data) => {
        Object.assign(formData, data);
      });
    } else {
      dialog.title = "新增支付渠道配置";
    }
  }

  /** 提交支付渠道配置表单 */
  function handleSubmit() {
    dataFormRef.value.validate((valid: any) => {
      if (valid) {
        loading.value = true;
        const id = formData.id;
        if (id) {
                PayChannelConfigAPI.update(id, formData)
              .then(() => {
                ElMessage.success("修改成功");
                handleCloseDialog();
                handleResetQuery();
              })
              .finally(() => (loading.value = false));
        } else {
                PayChannelConfigAPI.add(formData)
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

  /** 关闭支付渠道配置弹窗 */
  function handleCloseDialog() {
    dialog.visible = false;
    dataFormRef.value.resetFields();
    dataFormRef.value.clearValidate();
    formData.id = undefined;
  }

  /** 删除支付渠道配置 */
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
                PayChannelConfigAPI.deleteByIds(ids)
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
