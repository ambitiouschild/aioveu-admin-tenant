<template>
  <div class="app-container">
    <div class="search-container">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
                <el-form-item label="昵称" prop="nickName">
                      <el-input
                          v-model="queryParams.nickName"
                          placeholder="昵称"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="手机号" prop="mobile">
                      <el-input
                          v-model="queryParams.mobile"
                          placeholder="手机号"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="性别(0=未知,1=男,2=女)" prop="gender">
                      <el-input
                          v-model="queryParams.gender"
                          placeholder="性别(0=未知,1=男,2=女)"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="生日" prop="birthday">
                      <el-date-picker
                          class="!w-[240px]"
                          v-model="queryParams.birthday"
                          type="daterange"
                          range-separator="~"
                          start-placeholder="开始时间"
                          end-placeholder="结束时间"
                          value-format="YYYY-MM-DD"
                      />
                </el-form-item>
                <el-form-item label="状态(0=禁用,1=正常)" prop="status">
                      <el-input
                          v-model="queryParams.status"
                          placeholder="状态(0=禁用,1=正常)"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="微信OpenID" prop="openid">
                      <el-input
                          v-model="queryParams.openid"
                          placeholder="微信OpenID"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="国家" prop="country">
                      <el-input
                          v-model="queryParams.country"
                          placeholder="国家"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="省份" prop="province">
                      <el-input
                          v-model="queryParams.province"
                          placeholder="省份"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="城市" prop="city">
                      <el-input
                          v-model="queryParams.city"
                          placeholder="城市"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="语言" prop="language">
                      <el-input
                          v-model="queryParams.language"
                          placeholder="语言"
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
            v-hasPerm="['aioveuMallUmsMember:ums-member:add']"
            type="success"
            @click="handleOpenDialog()"
        >
          <template #icon><Plus /></template>
          新增
        </el-button>
        <el-button
            v-hasPerm="['aioveuMallUmsMember:ums-member:delete']"
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
                        label="会员ID"
                        prop="id"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="nickName"
                        label="昵称"
                        prop="nickName"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="mobile"
                        label="手机号"
                        prop="mobile"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="avatarUrl"
                        label="头像URL"
                        prop="avatarUrl"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="gender"
                        label="性别(0=未知,1=男,2=女)"
                        prop="gender"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="birthday"
                        label="生日"
                        prop="birthday"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="point"
                        label="会员积分"
                        prop="point"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="balance"
                        label="账户余额(单位:分)"
                        prop="balance"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="status"
                        label="状态(0=禁用,1=正常)"
                        prop="status"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="deleted"
                        label="删除标志(0=未删除,1=已删除)"
                        prop="deleted"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="openid"
                        label="微信OpenID"
                        prop="openid"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="sessionKey"
                        label="微信会话密钥"
                        prop="sessionKey"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="country"
                        label="国家"
                        prop="country"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="province"
                        label="省份"
                        prop="province"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="city"
                        label="城市"
                        prop="city"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="language"
                        label="语言"
                        prop="language"
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
                v-hasPerm="['aioveuMallUmsMember:ums-member:edit']"
                type="primary"
                size="small"
                link
                @click="handleOpenDialog(scope.row.id)"
            >
              <template #icon><Edit /></template>
              编辑
            </el-button>
            <el-button
                v-hasPerm="['aioveuMallUmsMember:ums-member:delete']"
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

    <!-- 会员表单弹窗 -->
    <el-dialog
        v-model="dialog.visible"
        :title="dialog.title"
        width="500px"
        @close="handleCloseDialog"
    >
      <el-form ref="dataFormRef" :model="formData" :rules="rules" label-width="100px">
                <el-form-item label="会员ID" prop="id">
                      <el-input
                          v-model="formData.id"
                          placeholder="会员ID"
                      />
                </el-form-item>

                <el-form-item label="昵称" prop="nickName">
                      <el-input
                          v-model="formData.nickName"
                          placeholder="昵称"
                      />
                </el-form-item>

                <el-form-item label="手机号" prop="mobile">
                      <el-input
                          v-model="formData.mobile"
                          placeholder="手机号"
                      />
                </el-form-item>

                <el-form-item label="头像URL" prop="avatarUrl">
                      <el-input
                          v-model="formData.avatarUrl"
                          placeholder="头像URL"
                      />
                </el-form-item>

                <el-form-item label="性别(0=未知,1=男,2=女)" prop="gender">
                      <el-input
                          v-model="formData.gender"
                          placeholder="性别(0=未知,1=男,2=女)"
                      />
                </el-form-item>

                <el-form-item label="生日" prop="birthday">
                      <el-date-picker
                          class="!w-[240px]"
                          v-model="formData.birthday"
                          type="date"
                          placeholder="生日"
                          value-format="YYYY-MM-DD"
                      />
                </el-form-item>

                <el-form-item label="会员积分" prop="point">
                      <el-input
                          v-model="formData.point"
                          placeholder="会员积分"
                      />
                </el-form-item>

                <el-form-item label="账户余额(单位:分)" prop="balance">
                      <el-input
                          v-model="formData.balance"
                          placeholder="账户余额(单位:分)"
                      />
                </el-form-item>

                <el-form-item label="状态(0=禁用,1=正常)" prop="status">
                      <el-input
                          v-model="formData.status"
                          placeholder="状态(0=禁用,1=正常)"
                      />
                </el-form-item>

                <el-form-item label="删除标志(0=未删除,1=已删除)" prop="deleted">
                      <el-input
                          v-model="formData.deleted"
                          placeholder="删除标志(0=未删除,1=已删除)"
                      />
                </el-form-item>

                <el-form-item label="微信OpenID" prop="openid">
                      <el-input
                          v-model="formData.openid"
                          placeholder="微信OpenID"
                      />
                </el-form-item>

                <el-form-item label="微信会话密钥" prop="sessionKey">
                      <el-input
                          v-model="formData.sessionKey"
                          placeholder="微信会话密钥"
                      />
                </el-form-item>

                <el-form-item label="国家" prop="country">
                      <el-input
                          v-model="formData.country"
                          placeholder="国家"
                      />
                </el-form-item>

                <el-form-item label="省份" prop="province">
                      <el-input
                          v-model="formData.province"
                          placeholder="省份"
                      />
                </el-form-item>

                <el-form-item label="城市" prop="city">
                      <el-input
                          v-model="formData.city"
                          placeholder="城市"
                      />
                </el-form-item>

                <el-form-item label="语言" prop="language">
                      <el-input
                          v-model="formData.language"
                          placeholder="语言"
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
    name: "UmsMember",
    inheritAttrs: false,
  });

  import UmsMemberAPI, { UmsMemberPageVO, UmsMemberForm, UmsMemberPageQuery } from "@/api/aioveuMall/aioveuMallUms/aioveuMallUmsMember/ums-member";

  const queryFormRef = ref();
  const dataFormRef = ref();

  const loading = ref(false);
  const removeIds = ref<number[]>([]);
  const total = ref(0);

  const queryParams = reactive<UmsMemberPageQuery>({
    pageNum: 1,
    pageSize: 10,
  });

  // 会员表格数据
  const pageData = ref<UmsMemberPageVO[]>([]);

  // 弹窗
  const dialog = reactive({
    title: "",
    visible: false,
  });

  // 会员表单数据
  const formData = reactive<UmsMemberForm>({});

  // 会员表单校验规则
  const rules = reactive({
                      nickName: [{ required: true, message: "请输入昵称", trigger: "blur" }],
                      mobile: [{ required: true, message: "请输入手机号", trigger: "blur" }],
  });

  /** 查询会员 */
  function handleQuery() {
    loading.value = true;
          UmsMemberAPI.getPage(queryParams)
        .then((data) => {
          pageData.value = data.list.flat();
          total.value = data.total;
        })
        .finally(() => {
          loading.value = false;
        });
  }

  /** 重置会员查询 */
  function handleResetQuery() {
    queryFormRef.value!.resetFields();
    queryParams.pageNum = 1;
    handleQuery();
  }

  /** 行复选框选中记录选中ID集合 */
  function handleSelectionChange(selection: any) {
    removeIds.value = selection.map((item: any) => item.id);
  }

  /** 打开会员弹窗 */
  function handleOpenDialog(id?: number) {
    dialog.visible = true;
    if (id) {
      dialog.title = "修改会员";
            UmsMemberAPI.getFormData(id).then((data) => {
        Object.assign(formData, data);
      });
    } else {
      dialog.title = "新增会员";
    }
  }

  /** 提交会员表单 */
  function handleSubmit() {
    dataFormRef.value.validate((valid: any) => {
      if (valid) {
        loading.value = true;
        const id = formData.id;
        if (id) {
                UmsMemberAPI.update(id, formData)
              .then(() => {
                ElMessage.success("修改成功");
                handleCloseDialog();
                handleResetQuery();
              })
              .finally(() => (loading.value = false));
        } else {
                UmsMemberAPI.add(formData)
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

  /** 关闭会员弹窗 */
  function handleCloseDialog() {
    dialog.visible = false;
    dataFormRef.value.resetFields();
    dataFormRef.value.clearValidate();
    formData.id = undefined;
  }

  /** 删除会员 */
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
                UmsMemberAPI.deleteByIds(ids)
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
