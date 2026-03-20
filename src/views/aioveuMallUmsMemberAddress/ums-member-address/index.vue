<template>
  <div class="app-container">
    <div class="search-container">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
                <el-form-item label="会员ID" prop="memberId">
                      <el-input
                          v-model="queryParams.memberId"
                          placeholder="会员ID"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="收货人姓名" prop="consigneeName">
                      <el-input
                          v-model="queryParams.consigneeName"
                          placeholder="收货人姓名"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="收货人联系方式" prop="consigneeMobile">
                      <el-input
                          v-model="queryParams.consigneeMobile"
                          placeholder="收货人联系方式"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="邮政编码" prop="postalCode">
                      <el-input
                          v-model="queryParams.postalCode"
                          placeholder="邮政编码"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="地址标签(家,公司,学校等)" prop="addressTag">
                      <el-input
                          v-model="queryParams.addressTag"
                          placeholder="地址标签(家,公司,学校等)"
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
            v-hasPerm="['aioveuMallUmsMemberAddress:ums-member-address:add']"
            type="success"
            @click="handleOpenDialog()"
        >
          <template #icon><Plus /></template>
          新增
        </el-button>
        <el-button
            v-hasPerm="['aioveuMallUmsMemberAddress:ums-member-address:delete']"
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
                        label="地址ID"
                        prop="id"
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
                        key="consigneeName"
                        label="收货人姓名"
                        prop="consigneeName"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="consigneeMobile"
                        label="收货人联系方式"
                        prop="consigneeMobile"
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
                        key="district"
                        label="区/县"
                        prop="district"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="street"
                        label="街道"
                        prop="street"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="detailAddress"
                        label="详细地址"
                        prop="detailAddress"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="postalCode"
                        label="邮政编码"
                        prop="postalCode"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="defaulted"
                        label="是否默认地址(0=否,1=是)"
                        prop="defaulted"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="addressTag"
                        label="地址标签(家,公司,学校等)"
                        prop="addressTag"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="longitude"
                        label="经度"
                        prop="longitude"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="latitude"
                        label="纬度"
                        prop="latitude"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="status"
                        label="状态(0=已删除,1=正常)"
                        prop="status"
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
                v-hasPerm="['aioveuMallUmsMemberAddress:ums-member-address:edit']"
                type="primary"
                size="small"
                link
                @click="handleOpenDialog(scope.row.id)"
            >
              <template #icon><Edit /></template>
              编辑
            </el-button>
            <el-button
                v-hasPerm="['aioveuMallUmsMemberAddress:ums-member-address:delete']"
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

    <!-- 会员收货地址表单弹窗 -->
    <el-dialog
        v-model="dialog.visible"
        :title="dialog.title"
        width="500px"
        @close="handleCloseDialog"
    >
      <el-form ref="dataFormRef" :model="formData" :rules="rules" label-width="100px">
                <el-form-item label="地址ID" prop="id">
                      <el-input
                          v-model="formData.id"
                          placeholder="地址ID"
                      />
                </el-form-item>

                <el-form-item label="会员ID" prop="memberId">
                      <el-input
                          v-model="formData.memberId"
                          placeholder="会员ID"
                      />
                </el-form-item>

                <el-form-item label="收货人姓名" prop="consigneeName">
                      <el-input
                          v-model="formData.consigneeName"
                          placeholder="收货人姓名"
                      />
                </el-form-item>

                <el-form-item label="收货人联系方式" prop="consigneeMobile">
                      <el-input
                          v-model="formData.consigneeMobile"
                          placeholder="收货人联系方式"
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

                <el-form-item label="区/县" prop="district">
                      <el-input
                          v-model="formData.district"
                          placeholder="区/县"
                      />
                </el-form-item>

                <el-form-item label="街道" prop="street">
                      <el-input
                          v-model="formData.street"
                          placeholder="街道"
                      />
                </el-form-item>

                <el-form-item label="详细地址" prop="detailAddress">
                      <el-input
                          v-model="formData.detailAddress"
                          placeholder="详细地址"
                      />
                </el-form-item>

                <el-form-item label="邮政编码" prop="postalCode">
                      <el-input
                          v-model="formData.postalCode"
                          placeholder="邮政编码"
                      />
                </el-form-item>

                <el-form-item label="是否默认地址(0=否,1=是)" prop="defaulted">
                      <el-input
                          v-model="formData.defaulted"
                          placeholder="是否默认地址(0=否,1=是)"
                      />
                </el-form-item>

                <el-form-item label="地址标签(家,公司,学校等)" prop="addressTag">
                      <el-input
                          v-model="formData.addressTag"
                          placeholder="地址标签(家,公司,学校等)"
                      />
                </el-form-item>

                <el-form-item label="经度" prop="longitude">
                      <el-input
                          v-model="formData.longitude"
                          placeholder="经度"
                      />
                </el-form-item>

                <el-form-item label="纬度" prop="latitude">
                      <el-input
                          v-model="formData.latitude"
                          placeholder="纬度"
                      />
                </el-form-item>

                <el-form-item label="状态(0=已删除,1=正常)" prop="status">
                      <el-input
                          v-model="formData.status"
                          placeholder="状态(0=已删除,1=正常)"
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
    name: "UmsMemberAddress",
    inheritAttrs: false,
  });

  import UmsMemberAddressAPI, { UmsMemberAddressPageVO, UmsMemberAddressForm, UmsMemberAddressPageQuery } from "@/api/aioveuMall/aioveuMallUms/aioveuMallUmsMemberAddress/ums-member-address";

  const queryFormRef = ref();
  const dataFormRef = ref();

  const loading = ref(false);
  const removeIds = ref<number[]>([]);
  const total = ref(0);

  const queryParams = reactive<UmsMemberAddressPageQuery>({
    pageNum: 1,
    pageSize: 10,
  });

  // 会员收货地址表格数据
  const pageData = ref<UmsMemberAddressPageVO[]>([]);

  // 弹窗
  const dialog = reactive({
    title: "",
    visible: false,
  });

  // 会员收货地址表单数据
  const formData = reactive<UmsMemberAddressForm>({});

  // 会员收货地址表单校验规则
  const rules = reactive({
                      memberId: [{ required: true, message: "请输入会员ID", trigger: "blur" }],
                      consigneeName: [{ required: true, message: "请输入收货人姓名", trigger: "blur" }],
                      consigneeMobile: [{ required: true, message: "请输入收货人联系方式", trigger: "blur" }],
                      detailAddress: [{ required: true, message: "请输入详细地址", trigger: "blur" }],
  });

  /** 查询会员收货地址 */
  function handleQuery() {
    loading.value = true;
          UmsMemberAddressAPI.getPage(queryParams)
        .then((data) => {
          //这个错误明确表示 data.list是二维数组，但 pageData.value期望一维数组。需要将二维数组展平。  pageData.value = data.list.flat();
          pageData.value = data.list.flat();
          total.value = data.total;
        })
        .finally(() => {
          loading.value = false;
        });
  }

  /** 重置会员收货地址查询 */
  function handleResetQuery() {
    queryFormRef.value!.resetFields();
    queryParams.pageNum = 1;
    handleQuery();
  }

  /** 行复选框选中记录选中ID集合 */
  function handleSelectionChange(selection: any) {
    removeIds.value = selection.map((item: any) => item.id);
  }

  /** 打开会员收货地址弹窗 */
  function handleOpenDialog(id?: number) {
    dialog.visible = true;
    if (id) {
      dialog.title = "修改会员收货地址";
            UmsMemberAddressAPI.getFormData(id).then((data) => {
        Object.assign(formData, data);
      });
    } else {
      dialog.title = "新增会员收货地址";
    }
  }

  /** 提交会员收货地址表单 */
  function handleSubmit() {
    dataFormRef.value.validate((valid: any) => {
      if (valid) {
        loading.value = true;
        const id = formData.id;
        if (id) {
                UmsMemberAddressAPI.update(id, formData)
              .then(() => {
                ElMessage.success("修改成功");
                handleCloseDialog();
                handleResetQuery();
              })
              .finally(() => (loading.value = false));
        } else {
                UmsMemberAddressAPI.add(formData)
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

  /** 关闭会员收货地址弹窗 */
  function handleCloseDialog() {
    dialog.visible = false;
    dataFormRef.value.resetFields();
    dataFormRef.value.clearValidate();
    formData.id = undefined;
  }

  /** 删除会员收货地址 */
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
                UmsMemberAddressAPI.deleteByIds(ids)
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
