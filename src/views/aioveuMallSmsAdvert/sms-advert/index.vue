<template>
  <div class="app-container">
    <div class="search-container">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
                <el-form-item label="广告标题" prop="title">
                      <el-input
                          v-model="queryParams.title"
                          placeholder="广告标题"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
<!--                <el-form-item label="状态" prop="status">-->
<!--                      <el-input-->
<!--                          v-model="queryParams.status"-->
<!--                          placeholder="状态"-->
<!--                          clearable-->
<!--                          @keyup.enter="handleQuery()"-->
<!--                      />-->
<!--                </el-form-item>-->

                <el-form-item label="状态" prop="status">
                  <el-select
                    v-model="queryParams.status"
                    placeholder="状态"
                    clearable
                    filterable
                    @keyup.enter="handleQuery()"
                  >
                    <el-option
                      v-for="item in advertStatusOptions"
                      :key="Number(item.value)"
                      :label="item.label"
                      :value="Number(item.value)"
                    />
                  </el-select>
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
            v-hasPerm="['aioveuMallSmsAdvert:sms-advert:add']"
            type="success"
            @click="handleOpenDialog()"
        >
          <template #icon><Plus /></template>
          新增
        </el-button>
        <el-button
            v-hasPerm="['aioveuMallSmsAdvert:sms-advert:delete']"
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
<!--                    <el-table-column-->
<!--                        key="id"-->
<!--                        label="广告ID"-->
<!--                        prop="id"-->
<!--                        min-width="150"-->
<!--                        align="center"-->
<!--                    />-->
                    <el-table-column
                        key="title"
                        label="广告标题"
                        prop="title"
                        min-width="150"
                        align="center"
                    />


<!--                    <el-table-column-->
<!--                        key="imageUrl"-->
<!--                        label="图片地址"-->
<!--                        prop="imageUrl"-->
<!--                        min-width="150"-->
<!--                        align="center"-->
<!--                    />-->

                    <el-table-column
                      key="imageUrl"
                      label="图片预览"
                      min-width="250"
                      align="center"
                    >
                      <template #default="scope">
                        <el-image
                          style="width: 80px; height: 80px;"
                          :src="scope.row.imageUrl"
                          :preview-src-list="[scope.row.imageUrl]"
                          fit="cover"
                          lazy
                          :scroll-container="'.el-table__body-wrapper'"
                          :preview-teleported="true"
                          hide-on-click-modal
                        >
                          <template #placeholder>
                            <div class="image-loading">
                              <el-icon><Loading /></el-icon>
                            </div>
                          </template>
                          <template #error>
                            <div class="image-error">
                              <el-icon><Picture /></el-icon>
                              <span>加载失败</span>
                            </div>
                          </template>
                        </el-image>
                      </template>
                    </el-table-column>



                    <el-table-column
                        key="startTime"
                        label="开始时间"
                        prop="startTime"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="endTime"
                        label="结束时间"
                        prop="endTime"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="status"
                        label="状态"
                        prop="status"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="sort"
                        label="排序"
                        prop="sort"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="redirectUrl"
                        label="跳转链接"
                        prop="redirectUrl"
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
                v-hasPerm="['aioveuMallSmsAdvert:sms-advert:edit']"
                type="primary"
                size="small"
                link
                @click="handleOpenDialog(scope.row.id)"
            >
              <template #icon><Edit /></template>
              编辑
            </el-button>
            <el-button
                v-hasPerm="['aioveuMallSmsAdvert:sms-advert:delete']"
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

    <!-- 广告表单弹窗 -->
    <el-dialog
        v-model="dialog.visible"
        :title="dialog.title"
        width="500px"
        @close="handleCloseDialog"
    >
      <el-form ref="dataFormRef" :model="formData" :rules="rules" label-width="100px">
<!--                <el-form-item label="广告ID" prop="id">-->
<!--                      <el-input-->
<!--                          v-model="formData.id"-->
<!--                          placeholder="广告ID"-->
<!--                      />-->
<!--                </el-form-item>-->

                <el-form-item label="广告标题" prop="title">
                      <el-input
                          v-model="formData.title"
                          placeholder="广告标题"
                      />
                </el-form-item>

<!--                <el-form-item label="图片地址" prop="imageUrl">-->
<!--                      <el-input-->
<!--                          v-model="formData.imageUrl"-->
<!--                          placeholder="图片地址"-->
<!--                      />-->
<!--                </el-form-item>-->

                <el-form-item label="单图上传">
                  <SingleImageUpload
                    v-model="formData.imageUrl"
                    :maxFileSize="5"
                    accept=".jpg,.jpeg,.png"
                    :style="{ width: '200px', height: '200px' }"
                    @upload-success="handleUploadSuccess"
                  />
                  <div >
                    最大图片大小：5MB，支持格式：JPG、JPEG、PNG
                  </div>
                </el-form-item>


                <el-form-item label="开始时间" prop="startTime">
                      <el-date-picker
                          v-model="formData.startTime"
                          type="datetime"
                          placeholder="开始时间"
                          value-format="YYYY-MM-DD HH:mm:ss"
                      />
                </el-form-item>

                <el-form-item label="结束时间" prop="endTime">
                      <el-date-picker
                          v-model="formData.endTime"
                          type="datetime"
                          placeholder="结束时间"
                          value-format="YYYY-MM-DD HH:mm:ss"
                      />
                </el-form-item>

                <el-form-item label="状态" prop="status">
                      <el-input
                          v-model="formData.status"
                          placeholder="状态"
                      />
                </el-form-item>

                <el-form-item label="排序" prop="sort">
                      <el-input
                          v-model="formData.sort"
                          placeholder="排序"
                      />
                </el-form-item>

                <el-form-item label="跳转链接" prop="redirectUrl">
                      <el-input
                          v-model="formData.redirectUrl"
                          placeholder="跳转链接"
                      />
                </el-form-item>

                <el-form-item label="备注" prop="remark">
                      <el-input
                          v-model="formData.remark"
                          placeholder="备注"
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
    name: "SmsAdvert",
    inheritAttrs: false,
  });

  import type { FileInfo } from "@/types/api";
  import DictAPI from '@/api/system/dict.api'
  import type { DictItemOption } from "@/types/api";

  import SmsAdvertAPI, { SmsAdvertPageVO, SmsAdvertForm, SmsAdvertPageQuery } from "@/api/aioveuMall/aioveuMallSms/aioveuMallSmsAdvert/sms-advert";


  const handleUploadSuccess = (fileInfo: FileInfo) => {
    console.log('上传成功:', fileInfo);
  };

  const queryFormRef = ref();
  const dataFormRef = ref();

  const loading = ref(false);
  const removeIds = ref<number[]>([]);
  const total = ref(0);


  const advertStatusOptions = ref<DictItemOption[]>([])


  // 加载选项
  function loadOptions() {

    DictAPI.getDictItems('laundry_process_image_image_type').then(response => {
      advertStatusOptions.value = response
    })
  }

  const queryParams = reactive<SmsAdvertPageQuery>({
    pageNum: 1,
    pageSize: 10,
  });

  // 广告表格数据
  const pageData = ref<SmsAdvertPageVO[]>([]);

  // 弹窗
  const dialog = reactive({
    title: "",
    visible: false,
  });

  // 广告表单数据
  const formData = reactive<SmsAdvertForm>({});

  // 广告表单校验规则
  const rules = reactive({
                      title: [{ required: true, message: "请输入广告标题", trigger: "blur" }],
                      imageUrl: [{ required: true, message: "请输入图片地址", trigger: "blur" }],
                      status: [{ required: true, message: "请输入状态(1:开启；0:关闭)", trigger: "blur" }],
  });

  /** 查询广告 */
  function handleQuery() {
    loading.value = true;
          SmsAdvertAPI.getPage(queryParams)
        .then((data) => {
          pageData.value = data.list.flat();
          total.value = data.total;
        })
        .finally(() => {
          loading.value = false;
        });
  }

  /** 重置广告查询 */
  function handleResetQuery() {
    queryFormRef.value!.resetFields();
    queryParams.pageNum = 1;
    handleQuery();
  }

  /** 行复选框选中记录选中ID集合 */
  function handleSelectionChange(selection: any) {
    removeIds.value = selection.map((item: any) => item.id);
  }

  /** 打开广告弹窗 */
  function handleOpenDialog(id?: number) {
    dialog.visible = true;
    if (id) {
      dialog.title = "修改广告";
            SmsAdvertAPI.getFormData(id).then((data) => {
        Object.assign(formData, data);
      });
    } else {
      dialog.title = "新增广告";
    }
  }

  /** 提交广告表单 */
  function handleSubmit() {
    dataFormRef.value.validate((valid: any) => {
      if (valid) {
        loading.value = true;
        const id = formData.id;
        if (id) {
                SmsAdvertAPI.update(id, formData)
              .then(() => {
                ElMessage.success("修改成功");
                handleCloseDialog();
                handleResetQuery();
              })
              .finally(() => (loading.value = false));
        } else {
                SmsAdvertAPI.add(formData)
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

  /** 关闭广告弹窗 */
  function handleCloseDialog() {
    dialog.visible = false;
    dataFormRef.value.resetFields();
    dataFormRef.value.clearValidate();
    formData.id = undefined;
  }

  /** 删除广告 */
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
                SmsAdvertAPI.deleteByIds(ids)
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
    loadOptions()

  });
</script>
