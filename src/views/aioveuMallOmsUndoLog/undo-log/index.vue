<template>
  <div class="app-container">
    <div class="search-container">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
                <el-form-item label="分支事务的唯一标识。branch transaction id" prop="branchId">
                      <el-input
                          v-model="queryParams.branchId"
                          placeholder="分支事务的唯一标识。branch transaction id"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="全局事务的唯一标识。global transaction id" prop="xid">
                      <el-input
                          v-model="queryParams.xid"
                          placeholder="全局事务的唯一标识。global transaction id"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="记录上下文信息 undo_log context,such as serialization" prop="context">
                      <el-input
                          v-model="queryParams.context"
                          placeholder="记录上下文信息 undo_log context,such as serialization"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="核心字段。存储序列化后的回滚数据，包含前后镜像（beforeImage和afterImage）。rollback info" prop="rollbackInfo">
                      <el-input
                          v-model="queryParams.rollbackInfo"
                          placeholder="核心字段。存储序列化后的回滚数据，包含前后镜像（beforeImage和afterImage）。rollback info"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="日志状态。0：正常状态；1：全局事务已完成，用于防悬挂（防止第二阶段回滚请求在一阶段日志产生前到达）0:normal status,1:defense status" prop="logStatus">
                      <el-input
                          v-model="queryParams.logStatus"
                          placeholder="日志状态。0：正常状态；1：全局事务已完成，用于防悬挂（防止第二阶段回滚请求在一阶段日志产生前到达）0:normal status,1:defense status"
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
            v-hasPerm="['aioveuMallOmsUndoLog:undo-log:add']"
            type="success"
            @click="handleOpenDialog()"
        >
          <template #icon><Plus /></template>
          新增
        </el-button>
        <el-button
            v-hasPerm="['aioveuMallOmsUndoLog:undo-log:delete']"
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
                        key="branchId"
                        label="分支事务的唯一标识。branch transaction id"
                        prop="branchId"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="xid"
                        label="全局事务的唯一标识。global transaction id"
                        prop="xid"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="context"
                        label="记录上下文信息 undo_log context,such as serialization"
                        prop="context"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="rollbackInfo"
                        label="核心字段。存储序列化后的回滚数据，包含前后镜像（beforeImage和afterImage）。rollback info"
                        prop="rollbackInfo"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="logStatus"
                        label="日志状态。0：正常状态；1：全局事务已完成，用于防悬挂（防止第二阶段回滚请求在一阶段日志产生前到达）0:normal status,1:defense status"
                        prop="logStatus"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="logCreated"
                        label="记录的创建时间create datetime"
                        prop="logCreated"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="logModified"
                        label="记录的最后修改时间。modify datetime"
                        prop="logModified"
                        min-width="150"
                        align="center"
                    />
        <el-table-column fixed="right" label="操作" width="220">
          <template #default="scope">
            <el-button
                v-hasPerm="['aioveuMallOmsUndoLog:undo-log:edit']"
                type="primary"
                size="small"
                link
                @click="handleOpenDialog(scope.row.id)"
            >
              <template #icon><Edit /></template>
              编辑
            </el-button>
            <el-button
                v-hasPerm="['aioveuMallOmsUndoLog:undo-log:delete']"
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

    <!-- AT transaction mode undo table表单弹窗 -->
    <el-dialog
        v-model="dialog.visible"
        :title="dialog.title"
        width="500px"
        @close="handleCloseDialog"
    >
      <el-form ref="dataFormRef" :model="formData" :rules="rules" label-width="100px">
                <el-form-item label="分支事务的唯一标识。branch transaction id" prop="branchId">
                      <el-input
                          v-model="formData.branchId"
                          placeholder="分支事务的唯一标识。branch transaction id"
                      />
                </el-form-item>

                <el-form-item label="全局事务的唯一标识。global transaction id" prop="xid">
                      <el-input
                          v-model="formData.xid"
                          placeholder="全局事务的唯一标识。global transaction id"
                      />
                </el-form-item>

                <el-form-item label="记录上下文信息 undo_log context,such as serialization" prop="context">
                      <el-input
                          v-model="formData.context"
                          placeholder="记录上下文信息 undo_log context,such as serialization"
                      />
                </el-form-item>

                <el-form-item label="核心字段。存储序列化后的回滚数据，包含前后镜像（beforeImage和afterImage）。rollback info" prop="rollbackInfo">
                      <el-input
                          v-model="formData.rollbackInfo"
                          placeholder="核心字段。存储序列化后的回滚数据，包含前后镜像（beforeImage和afterImage）。rollback info"
                      />
                </el-form-item>

                <el-form-item label="日志状态。0：正常状态；1：全局事务已完成，用于防悬挂（防止第二阶段回滚请求在一阶段日志产生前到达）0:normal status,1:defense status" prop="logStatus">
                      <el-input
                          v-model="formData.logStatus"
                          placeholder="日志状态。0：正常状态；1：全局事务已完成，用于防悬挂（防止第二阶段回滚请求在一阶段日志产生前到达）0:normal status,1:defense status"
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
    name: "UndoLog",
    inheritAttrs: false,
  });

  import UndoLogAPI, { UndoLogPageVO, UndoLogForm, UndoLogPageQuery } from "@/api/aioveuMall/aioveuMallOms/aioveuMallOmsUndoLog/undo-log";

  const queryFormRef = ref();
  const dataFormRef = ref();

  const loading = ref(false);
  const removeIds = ref<number[]>([]);
  const total = ref(0);

  const queryParams = reactive<UndoLogPageQuery>({
    pageNum: 1,
    pageSize: 10,
  });

  // AT transaction mode undo table表格数据
  const pageData = ref<UndoLogPageVO[]>([]);

  // 弹窗
  const dialog = reactive({
    title: "",
    visible: false,
  });

  // AT transaction mode undo table表单数据
  const formData = reactive<UndoLogForm>({});

  // AT transaction mode undo table表单校验规则
  const rules = reactive({
                      branchId: [{ required: true, message: "请输入分支事务的唯一标识。branch transaction id", trigger: "blur" }],
                      xid: [{ required: true, message: "请输入全局事务的唯一标识。global transaction id", trigger: "blur" }],
                      context: [{ required: true, message: "请输入记录上下文信息 undo_log context,such as serialization", trigger: "blur" }],
                      rollbackInfo: [{ required: true, message: "请输入核心字段。存储序列化后的回滚数据，包含前后镜像（beforeImage和afterImage）。rollback info", trigger: "blur" }],
                      logStatus: [{ required: true, message: "请输入日志状态。0：正常状态；1：全局事务已完成，用于防悬挂（防止第二阶段回滚请求在一阶段日志产生前到达）0:normal status,1:defense status", trigger: "blur" }],
  });

  /** 查询AT transaction mode undo table */
  function handleQuery() {
    loading.value = true;
          UndoLogAPI.getPage(queryParams)
        .then((data) => {
          pageData.value = data.list.flat();
          total.value = data.total;
        })
        .finally(() => {
          loading.value = false;
        });
  }

  /** 重置AT transaction mode undo table查询 */
  function handleResetQuery() {
    queryFormRef.value!.resetFields();
    queryParams.pageNum = 1;
    handleQuery();
  }

  /** 行复选框选中记录选中ID集合 */
  function handleSelectionChange(selection: any) {
    removeIds.value = selection.map((item: any) => item.id);
  }

  /** 打开AT transaction mode undo table弹窗 */
  function handleOpenDialog(id?: number) {
    dialog.visible = true;
    if (id) {
      dialog.title = "修改AT transaction mode undo table";
            UndoLogAPI.getFormData(id).then((data) => {
        Object.assign(formData, data);
      });
    } else {
      dialog.title = "新增AT transaction mode undo table";
    }
  }

  /** 提交AT transaction mode undo table表单 */
  function handleSubmit() {
    dataFormRef.value.validate((valid: any) => {
      if (valid) {
        loading.value = true;
        const id = formData.branchId;
        if (id) {
                UndoLogAPI.update(id, formData)
              .then(() => {
                ElMessage.success("修改成功");
                handleCloseDialog();
                handleResetQuery();
              })
              .finally(() => (loading.value = false));
        } else {
                UndoLogAPI.add(formData)
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

  /** 关闭AT transaction mode undo table弹窗 */
  function handleCloseDialog() {
    dialog.visible = false;
    dataFormRef.value.resetFields();
    dataFormRef.value.clearValidate();
    formData.branchId = undefined;
  }

  /** 删除AT transaction mode undo table */
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
                UndoLogAPI.deleteByIds(ids)
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
