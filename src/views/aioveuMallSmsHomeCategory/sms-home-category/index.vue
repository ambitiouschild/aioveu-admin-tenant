<template>
  <div class="app-container">
    <div class="search-container">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
        <el-form-item label="关联商品分类ID（pms_category表）" prop="categoryId">
          <el-input
            v-model="queryParams.categoryId"
            placeholder="关联商品分类ID（pms_category表）"
            clearable
            @keyup.enter="handleQuery()"
          />
        </el-form-item>
        <el-form-item label="首页显示名称" prop="homeName">
          <el-input
            v-model="queryParams.homeName"
            placeholder="首页显示名称"
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
          v-hasPerm="['aioveuMallSmsHomeCategory:sms-home-category:add']"
          type="success"
          @click="handleOpenDialog()"
        >
          <template #icon><Plus /></template>
          新增
        </el-button>
        <el-button
          v-hasPerm="['aioveuMallSmsHomeCategory:sms-home-category:delete']"
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
                <el-table-column key="id" label="id" prop="id" min-width="150" align="center" />
        <el-table-column
          key="categoryId"
          label="关联商品分类ID"
          prop="categoryId"
          min-width="150"
          align="center"
        />

        <!--        <el-table-column-->
        <!--          key="homeIcon"-->
        <!--          label="图标"-->
        <!--          prop="homeIcon"-->
        <!--          min-width="150"-->
        <!--          align="center"-->
        <!--        />-->

        <el-table-column key="homeIcon" label="图标" min-width="250" align="center">
          <template #default="scope">
            <el-image
              style="width: 80px; height: 80px"
              :src="scope.row.homeIcon"
              :preview-src-list="[scope.row.homeIcon]"
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
          key="homeName"
          label="分类名称"
          prop="homeName"
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
        <!--          label="逻辑删除"-->
        <!--          prop="deleted"-->
        <!--          min-width="150"-->
        <!--          align="center"-->
        <!--        />-->
        <!--        <el-table-column-->
        <!--          key="version"-->
        <!--          label="版本号"-->
        <!--          prop="version"-->
        <!--          min-width="150"-->
        <!--          align="center"-->
        <!--        />-->
        <el-table-column fixed="right" label="操作" width="220">
          <template #default="scope">
            <el-button
              v-hasPerm="['aioveuMallSmsHomeCategory:sms-home-category:edit']"
              type="primary"
              size="small"
              link
              @click="handleOpenDialog(scope.row.id)"
            >
              <template #icon><Edit /></template>
              编辑
            </el-button>
            <el-button
              v-hasPerm="['aioveuMallSmsHomeCategory:sms-home-category:delete']"
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

    <!-- 首页分类配置表单弹窗 -->
    <el-dialog
      v-model="dialog.visible"
      :title="dialog.title"
      width="500px"
      @close="handleCloseDialog"
    >
      <el-form ref="dataFormRef" :model="formData" :rules="rules" label-width="100px">
        <!--        <el-form-item label="" prop="id">-->
        <!--          <el-input v-model="formData.id" placeholder="" />-->
        <!--        </el-form-item>-->

                <el-form-item label="关联分类" prop="categoryId">
                  <el-input v-model="formData.categoryId" placeholder="商品分类）" />
                </el-form-item>

        <!--        <el-form-item label="图标" prop="homeIcon">-->
        <!--          <el-input v-model="formData.homeIcon" placeholder="图标" />-->
        <!--        </el-form-item>-->

        <el-form-item label="图标上传">
          <SingleImageUpload
            v-model="formData.homeIcon"
            :maxFileSize="5"
            accept=".jpg,.jpeg,.png"
            :style="{ width: '200px', height: '200px' }"
          />
          <div>最大图片大小：5MB，支持格式：JPG、JPEG、PNG</div>
        </el-form-item>

        <el-form-item label="显示名称" prop="homeName">
          <el-input v-model="formData.homeName" placeholder="显示名称" />
        </el-form-item>

        <el-form-item label="跳转路径" prop="jumpPath">
          <el-input v-model="formData.jumpPath" placeholder="跳转路径" />
        </el-form-item>

        <el-form-item label="跳转类型" prop="jumpType">
          <el-input v-model="formData.jumpType" placeholder="跳转类型" />
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
  name: "SmsHomeCategory",
  inheritAttrs: false,
});

import SmsHomeCategoryAPI, {
  SmsHomeCategoryPageVO,
  SmsHomeCategoryForm,
  SmsHomeCategoryPageQuery,
} from "@/api/aioveuMall/aioveuMallSms/aioveuMallSmsHomeCategory/sms-home-category";

const queryFormRef = ref();
const dataFormRef = ref();

const loading = ref(false);
const removeIds = ref<number[]>([]);
const total = ref(0);

const queryParams = reactive<SmsHomeCategoryPageQuery>({
  pageNum: 1,
  pageSize: 10,
});

// 首页分类配置表格数据
const pageData = ref<SmsHomeCategoryPageVO[]>([]);

// 弹窗
const dialog = reactive({
  title: "",
  visible: false,
});

// 首页分类配置表单数据
const formData = reactive<SmsHomeCategoryForm>({});

// 首页分类配置表单校验规则
const rules = reactive({
  homeIcon: [{ required: true, message: "请输入首页显示的图标URL", trigger: "blur" }],
  homeName: [{ required: true, message: "请输入首页显示名称", trigger: "blur" }],
  sort: [{ required: true, message: "请输入排序", trigger: "blur" }],
  status: [{ required: true, message: "请输入状态：0-隐藏，1-显示", trigger: "blur" }],
});

/** 查询首页分类配置 */
function handleQuery() {
  loading.value = true;
  SmsHomeCategoryAPI.getPage(queryParams)
    .then((data) => {
      pageData.value = data.list.flat();
      total.value = data.total;
    })
    .finally(() => {
      loading.value = false;
    });
}

/** 重置首页分类配置查询 */
function handleResetQuery() {
  queryFormRef.value!.resetFields();
  queryParams.pageNum = 1;
  handleQuery();
}

/** 行复选框选中记录选中ID集合 */
function handleSelectionChange(selection: any) {
  removeIds.value = selection.map((item: any) => item.id);
}

/** 打开首页分类配置弹窗 */
function handleOpenDialog(id?: number) {
  dialog.visible = true;
  if (id) {
    dialog.title = "修改首页分类配置";
    SmsHomeCategoryAPI.getFormData(id).then((data) => {
      Object.assign(formData, data);
    });
  } else {
    dialog.title = "新增首页分类配置";
  }
}

/** 提交首页分类配置表单 */
function handleSubmit() {
  dataFormRef.value.validate((valid: any) => {
    if (valid) {
      loading.value = true;
      const id = formData.id;
      if (id) {
        SmsHomeCategoryAPI.update(id, formData)
          .then(() => {
            ElMessage.success("修改成功");
            handleCloseDialog();
            handleResetQuery();
          })
          .finally(() => (loading.value = false));
      } else {
        SmsHomeCategoryAPI.add(formData)
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

/** 关闭首页分类配置弹窗 */
function handleCloseDialog() {
  dialog.visible = false;
  dataFormRef.value.resetFields();
  dataFormRef.value.clearValidate();
  formData.id = undefined;
}

/** 删除首页分类配置 */
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
      SmsHomeCategoryAPI.deleteByIds(ids)
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
