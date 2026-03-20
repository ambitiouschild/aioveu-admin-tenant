<template>
  <div class="app-container">
    <div class="search-container">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
        <el-form-item label="关联广告ID（sms_advert表）" prop="advertId">
          <el-input
            v-model="queryParams.advertId"
            placeholder="关联广告ID（sms_advert表）"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="广告显示名称" prop="homeAdvertName">
          <el-input
            v-model="queryParams.homeAdvertName"
            placeholder="广告显示名称"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="图片模式" prop="imageMode">
          <el-input
            v-model="queryParams.imageMode"
            placeholder="图片模式"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="跳转类型：navigateTo, redirectTo, switchTab" prop="jumpType">
          <el-input
            v-model="queryParams.jumpType"
            placeholder="跳转类型：navigateTo, redirectTo, switchTab"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input
            v-model="queryParams.sort"
            placeholder="排序"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="状态：0-隐藏，1-显示" prop="status">
          <el-input
            v-model="queryParams.status"
            placeholder="状态：0-隐藏，1-显示"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="逻辑删除：0-正常 1-删除" prop="deleted">
          <el-input
            v-model="queryParams.deleted"
            placeholder="逻辑删除：0-正常 1-删除"
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
          v-hasPerm="['aioveuMallSmsHomeAdvert:sms-home-advert:add']"
          type="success"
          @click="handleOpenDialog()"
        >
          <template #icon><Plus /></template>
          新增
        </el-button>
        <el-button
          v-hasPerm="['aioveuMallSmsHomeAdvert:sms-home-advert:delete']"
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
        <el-table-column key="id" label="ID" prop="id" min-width="150" align="center" />
        <el-table-column
          key="advertId"
          label="关联广告ID"
          prop="advertId"
          min-width="150"
          align="center"
        />
        <!--        <el-table-column-->
        <!--          key="homeAdvertIcon"-->
        <!--          label="广告显示的图标URL"-->
        <!--          prop="homeAdvertIcon"-->
        <!--          min-width="150"-->
        <!--          align="center"-->
        <!--        />-->

        <el-table-column key="homeAdvertIcon" label="广告" min-width="250" align="center">
          <template #default="scope">
            <el-image
              style="width: 80px; height: 80px"
              :src="scope.row.homeAdvertIcon"
              :preview-src-list="[scope.row.homeAdvertIcon]"
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
          key="homeAdvertName"
          label="广告显示名称"
          prop="homeAdvertName"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="height"
          label="高度（rpx/upx）"
          prop="height"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="imageMode"
          label="图片模式"
          prop="imageMode"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="jumpPath"
          label="跳转路径"
          prop="jumpPath"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="jumpType"
          label="跳转类型"
          prop="jumpType"
          min-width="150"
          align="center"
        />
        <el-table-column
          key="jumpParams"
          label="跳转参数"
          prop="jumpParams"
          min-width="150"
          align="center"
        />
        <el-table-column key="sort" label="排序" prop="sort" min-width="150" align="center" />
        <el-table-column key="status" label="状态" prop="status" min-width="150" align="center" />
        <el-table-column key="remark" label="备注" prop="remark" min-width="150" align="center" />
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
        <!--        <el-table-column-->
        <!--          key="deleted"-->
        <!--          label="逻辑删除：0-正常 1-删除"-->
        <!--          prop="deleted"-->
        <!--          min-width="150"-->
        <!--          align="center"-->
        <!--        />-->
        <!--        <el-table-column-->
        <!--          key="version"-->
        <!--          label="版本号（用于乐观锁）"-->
        <!--          prop="version"-->
        <!--          min-width="150"-->
        <!--          align="center"-->
        <!--        />-->
        <el-table-column fixed="right" label="操作" width="220">
          <template #default="scope">
            <el-button
              v-hasPerm="['aioveuMallSmsHomeAdvert:sms-home-advert:edit']"
              type="primary"
              size="small"
              link
              @click="handleOpenDialog(scope.row.id)"
            >
              <template #icon><Edit /></template>
              编辑
            </el-button>
            <el-button
              v-hasPerm="['aioveuMallSmsHomeAdvert:sms-home-advert:delete']"
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

    <!-- 首页广告配置（增加跳转路径）表单弹窗 -->
    <el-dialog
      v-model="dialog.visible"
      :title="dialog.title"
      width="500px"
      @close="handleCloseDialog"
    >
      <el-form ref="dataFormRef" :model="formData" :rules="rules" label-width="100px">
        <!--        <el-form-item label="主键ID" prop="id">-->
        <!--          <el-input v-model="formData.id" placeholder="主键ID" />-->
        <!--        </el-form-item>-->

        <!--        <el-form-item label="关联广告ID" prop="advertId">-->
        <!--          <el-input v-model="formData.advertId" placeholder="关联广告ID（sms_advert表）" />-->
        <!--        </el-form-item>-->

        <el-form-item label="广告图标" prop="homeAdvertIcon">
          <el-input v-model="formData.homeAdvertIcon" placeholder="广告图标" />
        </el-form-item>

        <el-form-item label="广告图标">
          <SingleImageUpload
            v-model="formData.homeAdvertIcon"
            :maxFileSize="5"
            accept=".jpg,.jpeg,.png"
            :style="{ width: '200px', height: '200px' }"
          >
            <!-- ✅ 正确：插槽写在组件标签内部 -->
            <template #placeholder>
              <div class="image-loading">
                <el-icon><Loading /></el-icon>
                <span>图片上传中...</span>
              </div>
            </template>
            <template #error>
              <div class="image-error">
                <el-icon><Picture /></el-icon>
                <span>上传失败，请重试</span>
              </div>
            </template>
          </SingleImageUpload>

          <div>最大图片大小：5MB，支持格式：JPG、JPEG、PNG</div>
        </el-form-item>

        <el-form-item label="广告名称" prop="homeAdvertName">
          <el-input v-model="formData.homeAdvertName" placeholder="广告名称" />
        </el-form-item>

        <el-form-item label="高度" prop="height">
          <el-input v-model="formData.height" placeholder="高度（rpx/upx）" />
        </el-form-item>

        <el-form-item label="图片模式" prop="imageMode">
          <el-input v-model="formData.imageMode" placeholder="图片模式" />
        </el-form-item>

        <el-form-item label="跳转路径" prop="jumpPath">
          <el-input v-model="formData.jumpPath" placeholder="跳转路径" />
        </el-form-item>

        <el-form-item label="跳转类型" prop="jumpType">
          <el-input v-model="formData.jumpType" placeholder="跳转类型" />
        </el-form-item>

        <el-form-item label="跳转参数" prop="jumpParams">
          <el-input v-model="formData.jumpParams" placeholder="跳转参数" />
        </el-form-item>

        <el-form-item label="排序" prop="sort">
          <el-input v-model="formData.sort" placeholder="排序" />
        </el-form-item>

        <el-form-item label="状态" prop="status">
          <el-input v-model="formData.status" placeholder="状态" />
        </el-form-item>

        <el-form-item label="备注" prop="remark">
          <el-input v-model="formData.remark" placeholder="备注" type="textarea" />
        </el-form-item>

        <!--        <el-form-item label="创建时间" prop="createTime">-->
        <!--          <el-date-picker-->
        <!--            v-model="formData.createTime"-->
        <!--            type="datetime"-->
        <!--            placeholder="创建时间"-->
        <!--            value-format="YYYY-MM-DD HH:mm:ss"-->
        <!--          />-->
        <!--        </el-form-item>-->

        <!--        <el-form-item label="更新时间" prop="updateTime">-->
        <!--          <el-date-picker-->
        <!--            v-model="formData.updateTime"-->
        <!--            type="datetime"-->
        <!--            placeholder="更新时间"-->
        <!--            value-format="YYYY-MM-DD HH:mm:ss"-->
        <!--          />-->
        <!--        </el-form-item>-->

        <!--        <el-form-item label="逻辑删除：0-正常 1-删除" prop="deleted">-->
        <!--          <el-input v-model="formData.deleted" placeholder="逻辑删除：0-正常 1-删除" />-->
        <!--        </el-form-item>-->

        <!--        <el-form-item label="版本号（用于乐观锁）" prop="version">-->
        <!--          <el-input v-model="formData.version" placeholder="版本号（用于乐观锁）" />-->
        <!--        </el-form-item>-->
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
  name: "SmsHomeAdvert",
  inheritAttrs: false,
});

import SmsHomeAdvertAPI, {
  SmsHomeAdvertPageVO,
  SmsHomeAdvertForm,
  SmsHomeAdvertPageQuery,
} from "@/api/aioveuMall/aioveuMallSms/aioveuMallSmsHomeAdvert/sms-home-advert";

const queryFormRef = ref();
const dataFormRef = ref();

const loading = ref(false);
const removeIds = ref<number[]>([]);
const total = ref(0);

const queryParams = reactive<SmsHomeAdvertPageQuery>({
  pageNum: 1,
  pageSize: 10,
});

// 首页广告配置（增加跳转路径）表格数据
const pageData = ref<SmsHomeAdvertPageVO[]>([]);

// 弹窗
const dialog = reactive({
  title: "",
  visible: false,
});

// 首页广告配置（增加跳转路径）表单数据
const formData = reactive<SmsHomeAdvertForm>({});

// 首页广告配置（增加跳转路径）表单校验规则
const rules = reactive({
  homeAdvertIcon: [{ required: true, message: "请输入广告显示的图标URL", trigger: "blur" }],
  homeAdvertName: [{ required: true, message: "请输入广告显示名称", trigger: "blur" }],
  status: [{ required: true, message: "请输入状态：0-隐藏，1-显示", trigger: "blur" }],
});

/** 查询首页广告配置（增加跳转路径） */
function handleQuery() {
  loading.value = true;
  SmsHomeAdvertAPI.getPage(queryParams)
    .then((data) => {
      pageData.value = data.list.flat();
      total.value = data.total;
    })
    .finally(() => {
      loading.value = false;
    });
}

/** 重置首页广告配置（增加跳转路径）查询 */
function handleResetQuery() {
  queryFormRef.value!.resetFields();
  queryParams.pageNum = 1;
  handleQuery();
}

/** 行复选框选中记录选中ID集合 */
function handleSelectionChange(selection: any) {
  removeIds.value = selection.map((item: any) => item.id);
}

/** 打开首页广告配置（增加跳转路径）弹窗 */
function handleOpenDialog(id?: number) {
  dialog.visible = true;
  if (id) {
    dialog.title = "修改首页广告配置（增加跳转路径）";
    SmsHomeAdvertAPI.getFormData(id).then((data) => {
      Object.assign(formData, data);
    });
  } else {
    dialog.title = "新增首页广告配置（增加跳转路径）";
  }
}

/** 提交首页广告配置（增加跳转路径）表单 */
function handleSubmit() {
  dataFormRef.value.validate((valid: any) => {
    if (valid) {
      loading.value = true;
      const id = formData.id;
      if (id) {
        SmsHomeAdvertAPI.update(id, formData)
          .then(() => {
            ElMessage.success("修改成功");
            handleCloseDialog();
            handleResetQuery();
          })
          .finally(() => (loading.value = false));
      } else {
        SmsHomeAdvertAPI.add(formData)
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

/** 关闭首页广告配置（增加跳转路径）弹窗 */
function handleCloseDialog() {
  dialog.visible = false;
  dataFormRef.value.resetFields();
  dataFormRef.value.clearValidate();
  formData.id = undefined;
}

/** 删除首页广告配置（增加跳转路径） */
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
      SmsHomeAdvertAPI.deleteByIds(ids)
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
