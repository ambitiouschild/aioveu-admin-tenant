<template>
  <div class="app-container">
    <div class="search-container">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
                <el-form-item label="商品名称" prop="name">
                      <el-input
                          v-model="queryParams.name"
                          placeholder="商品名称"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
<!--                <el-form-item label="商品类型ID" prop="categoryId">-->
<!--                      <el-input-->
<!--                          v-model="queryParams.categoryId"-->
<!--                          placeholder="商品类型ID"-->
<!--                          clearable-->
<!--                          @keyup.enter="handleQuery()"-->
<!--                      />-->
<!--                </el-form-item>-->

                <el-form-item label="商品类型" prop="categoryId">
                  <el-select
                    v-model="queryParams.categoryId"
                    placeholder="商品类型"
                    clearable
                    filterable
                    @keyup.enter="handleQuery()"
                  >
                    <el-option
                      v-for="item in categoryOptions"
                      :key="Number(item.value)"
                      :label="item.label"
                      :value="Number(item.value)"
                    />
                  </el-select>
                </el-form-item>


<!--                <el-form-item label="商品品牌ID" prop="brandId">-->
<!--                      <el-input-->
<!--                          v-model="queryParams.brandId"-->
<!--                          placeholder="商品品牌ID"-->
<!--                          clearable-->
<!--                          @keyup.enter="handleQuery()"-->
<!--                      />-->
<!--                </el-form-item>-->

                <el-form-item label="商品品牌" prop="brandId">
                  <el-select
                    v-model="queryParams.brandId"
                    placeholder="请选择商品品牌"
                    clearable
                    filterable
                    @keyup.enter="handleQuery()"
                  >
                    <el-option
                      v-for="item in brandOption"
                      :key="item.orderId"
                      :label="item.orderNo"
                      :value="item.orderId"
                    />
                  </el-select>
                </el-form-item>

                <el-form-item label="商品简介" prop="description">
                      <el-input
                          v-model="queryParams.description"
                          placeholder="商品简介"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>

<!--                <el-form-item label="商品状态(0:下架 1:上架)" prop="status">-->
<!--                      <el-input-->
<!--                          v-model="queryParams.status"-->
<!--                          placeholder="商品状态(0:下架 1:上架)"-->
<!--                          clearable-->
<!--                          @keyup.enter="handleQuery()"-->
<!--                      />-->


<!--                </el-form-item>-->

                <el-form-item label="商品状态" prop="status">
                  <el-select
                    v-model="queryParams.status"
                    placeholder="商品状态"
                    clearable
                    filterable
                    @keyup.enter="handleQuery()"
                  >
                    <el-option
                      v-for="item in productStatusOptions"
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
            v-hasPerm="['aioveuMallPmsSpu:pms-spu:add']"
            type="success"
            @click="handleOpenDialog()"
        >
          <template #icon><Plus /></template>
          新增
        </el-button>
        <el-button
            v-hasPerm="['aioveuMallPmsSpu:pms-spu:delete']"
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
<!--                        label="主键"-->
<!--                        prop="id"-->
<!--                        min-width="150"-->
<!--                        align="center"-->
<!--                    />-->
                    <el-table-column
                        key="name"
                        label="商品名称"
                        prop="name"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="categoryId"
                        label="商品类型ID"
                        prop="categoryId"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="brandId"
                        label="商品品牌ID"
                        prop="brandId"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="originPrice"
                        label="原价【起】"
                        prop="originPrice"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="price"
                        label="现价【起】"
                        prop="price"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="sales"
                        label="销量"
                        prop="sales"
                        min-width="150"
                        align="center"
                    />
<!--                    <el-table-column-->
<!--                        key="picUrl"-->
<!--                        label="商品主图"-->
<!--                        prop="picUrl"-->
<!--                        min-width="150"-->
<!--                        align="center"-->
<!--                    />-->

                    <el-table-column
                      key="picUrl"
                      label="商品主图"
                      min-width="250"
                      align="center"
                    >
                      <template #default="scope">
                        <el-image
                          style="width: 80px; height: 80px;"
                          :src="scope.row.picUrl"
                          :preview-src-list="[scope.row.picUrl]"
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

<!--                    <el-table-column-->
<!--                        key="album"-->
<!--                        label="商品图册"-->
<!--                        prop="album"-->
<!--                        min-width="150"-->
<!--                        align="center"-->
<!--                    />-->

                      <el-table-column
                        key="album"
                        label="商品图册"
                        prop="album"
                        min-width="150"
                        align="center"
                      >
                        <template #default="{ row }">
                          <div v-if="row.album && row.album.length > 0" class="album-preview">
                            <!-- 只显示第一张图片 -->
                            <el-image
                              :src="row.album[0]"
                              fit="cover"
                              class="main-image"
                              :preview-src-list="row.album"
                              :initial-index="0"
                              :preview-teleported="true"
                              hide-on-click-modal
                            />

                            <!-- 图片数量提示 -->
                            <div v-if="row.album.length > 1" class="image-count">
                              <el-tag size="small" type="info">
                                {{ row.album.length }}张
                              </el-tag>
                            </div>
                          </div>
                          <span v-else class="empty-text">暂无图片</span>
                        </template>
                      </el-table-column>



                    <el-table-column
                        key="unit"
                        label="单位"
                        prop="unit"
                        min-width="150"
                        align="center"
                    />
<!--                    <el-table-column-->
<!--                        key="description"-->
<!--                        label="商品简介"-->
<!--                        prop="description"-->
<!--                        min-width="150"-->
<!--                        align="center"-->
<!--                    />-->

                    <el-table-column
                      key="description"
                      label="商品简介"
                      prop="description"
                      min-width="150"
                      align="center"
                    >
                      <template #default="{ row }">
                        <el-tooltip
                          :content="row.description || '暂无简介'"
                          placement="top"
                          :disabled="!row.description || row.description.length <= 20"
                        >
                        <span class="description-text">
                            {{ formatDescription(row.description) }}
                        </span>
                        </el-tooltip>
                      </template>
                    </el-table-column>


<!--                    <el-table-column-->
<!--                        key="detail"-->
<!--                        label="商品详情"-->
<!--                        prop="detail"-->
<!--                        min-width="150"-->
<!--                        align="center"-->
<!--                    />-->


<!--        完整的商品详情展示组件-->
        <!--    ==================================    -->
                        <el-table-column
                          key="detail"
                          label="商品详情"
                          prop="detail"
                          min-width="200"
                          align="center"
                        >
                          <template #default="{ row }">
                            <ProductDetailPreview
                              :detail="row.detail"
                              @preview="handlePreview"
                            />
                          </template>
                        </el-table-column>

                        <!-- 详情预览对话框 -->
                        <el-dialog
                          v-model="previewVisible"
                          title="商品详情"
                          width="80%"
                          top="5vh"
                        >
                          <div
                            class="detail-full-content"
                            v-html="currentDetail"
                          ></div>
                        </el-dialog>

<!--    ==================================    -->

                    <el-table-column
                        key="status"
                        label="商品状态"
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
                v-hasPerm="['aioveuMallPmsSpu:pms-spu:edit']"
                type="primary"
                size="small"
                link
                @click="handleOpenDialog(scope.row.id)"
            >
              <template #icon><Edit /></template>
              编辑
            </el-button>
            <el-button
                v-hasPerm="['aioveuMallPmsSpu:pms-spu:delete']"
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

    <!-- 商品表单弹窗 -->
    <el-dialog
        v-model="dialog.visible"
        :title="dialog.title"
        width="500px"
        @close="handleCloseDialog"
    >
      <el-form ref="dataFormRef" :model="formData" :rules="rules" label-width="100px">
<!--                <el-form-item label="主键" prop="id">-->
<!--                      <el-input-->
<!--                          v-model="formData.id"-->
<!--                          placeholder="主键"-->
<!--                      />-->
<!--                </el-form-item>-->

                <el-form-item label="商品名称" prop="name">
                      <el-input
                          v-model="formData.name"
                          placeholder="商品名称"
                      />
                </el-form-item>

                <el-form-item label="商品类型ID" prop="categoryId">
                      <el-input
                          v-model="formData.categoryId"
                          placeholder="商品类型ID"
                      />
                </el-form-item>

                <el-form-item label="商品品牌ID" prop="brandId">
                      <el-input
                          v-model="formData.brandId"
                          placeholder="商品品牌ID"
                      />
                </el-form-item>

                <el-form-item label="原价【起】" prop="originPrice">
                      <el-input
                          v-model="formData.originPrice"
                          placeholder="原价【起】"
                      />
                </el-form-item>

                <el-form-item label="现价【起】" prop="price">
                      <el-input
                          v-model="formData.price"
                          placeholder="现价【起】"
                      />
                </el-form-item>

                <el-form-item label="销量" prop="sales">
                      <el-input
                          v-model="formData.sales"
                          placeholder="销量"
                      />
                </el-form-item>

<!--                <el-form-item label="商品主图" prop="picUrl">-->
<!--                      <el-input-->
<!--                          v-model="formData.picUrl"-->
<!--                          placeholder="商品主图"-->
<!--                      />-->
<!--                </el-form-item>-->

                  <el-form-item label="商品主图">
                    <SingleImageUpload
                      v-model="formData.picUrl"
                      :maxFileSize="5"
                      accept=".jpg,.jpeg,.png"
                      @upload-success="handleUploadSuccess"
                    />
                    <div >
                      最大图片大小：5MB，支持格式：JPG、JPEG、PNG
                    </div>
                  </el-form-item>


<!--                <el-form-item label="商品图册" prop="album">-->
<!--                      <el-input-->
<!--                          v-model="formData.album"-->
<!--                          placeholder="商品图册"-->
<!--                      />-->
<!--                </el-form-item>-->

                  <!-- 完整配置示例 -->
                  <el-form-item label="商品图册">
                    <MultiImageUpload
                      v-model="formData.album"
                      :limit="10"
                      :max-file-size="2"
                      accept=".jpg,.jpeg,.png,.gif"
                      :data="{ category: 'product' }"
                    />
                  </el-form-item>

                <el-form-item label="单位" prop="unit">
                      <el-input
                          v-model="formData.unit"
                          placeholder="单位"
                      />
                </el-form-item>

                <el-form-item label="商品简介" prop="description">
                      <el-input
                          v-model="formData.description"
                          placeholder="商品简介"
                      />
                </el-form-item>

                <el-form-item label="商品详情" prop="detail">
                      <el-input
                          v-model="formData.detail"
                          placeholder="商品详情"
                      />
                </el-form-item>

                <el-form-item label="商品状态(0:下架 1:上架)" prop="status">
                      <el-input
                          v-model="formData.status"
                          placeholder="商品状态(0:下架 1:上架)"
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
    name: "PmsSpu",
    inheritAttrs: false,
  });

  import PmsSpuAPI, { PmsSpuPageVO, PmsSpuForm, PmsSpuPageQuery } from "@/api/aioveuMall/aioveuMallPms/aioveuMallPmsSpu/pms-spu";

  import DictAPI from '@/api/system/dict.api'
  import type { DictItemOption } from "@/types/api";
  import { ref } from 'vue'

  import type { FileInfo } from "@/types/api";

  const handleUploadSuccess = (fileInfo: FileInfo) => {
    console.log('上传成功:', fileInfo);
  };

  const queryFormRef = ref();
  const dataFormRef = ref();

  const loading = ref(false);
  const removeIds = ref<number[]>([]);
  const total = ref(0);

  const categoryOptions = ref<DictItemOption[]>([])
  const brandOption = ref<DictItemOption[]>([])
  const productStatusOptions = ref<DictItemOption[]>([])

  const previewVisible = ref(false)
  const currentDetail = ref('')

  const handlePreview = (detail : any ) => {
    currentDetail.value = detail
    previewVisible.value = true
  }

  // 加载选项
  function loadOptions() {
    // AioveuLaundryOrderAPI.getAllLaundryOrderOptions().then(response => {
    //   orderOption.value = response
    // })
    // AioveuLaundryOrderItemAPI.getAllLaundryOrderItemOptions().then(response => {
    //   itemOption.value = response
    // })
    // AioveuEmployeeAPI.getAllEmployeeOptions().then(response => {
    //   employeeOption.value = response
    // })
    DictAPI.getDictItems('laundry_process_image_image_type').then(response => {
      categoryOptions.value = response
    })
  }

  const queryParams = reactive<PmsSpuPageQuery>({
    pageNum: 1,
    pageSize: 10,
  });

  // 商品表格数据
  const pageData = ref<PmsSpuPageVO[]>([]);

  // 弹窗
  const dialog = reactive({
    title: "",
    visible: false,
  });

  // 商品表单数据
  const formData = reactive<PmsSpuForm>({});

  // 商品表单校验规则
  const rules = reactive({
                      name: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
                      categoryId: [{ required: true, message: "请输入商品类型ID", trigger: "blur" }],
                      originPrice: [{ required: true, message: "请输入原价【起】", trigger: "blur" }],
                      price: [{ required: true, message: "请输入现价【起】", trigger: "blur" }],
  });


  function formatDescription(description:any){
      if (!description) return '暂无简介';

      // 设置最大显示长度
      const maxLength = 20;

      if (description.length <= maxLength) {
        return description;
      }

      // 截断并添加省略号
      return description.substring(0, maxLength) + '...';
    }

  /** 查询商品 */
  function handleQuery() {
    loading.value = true;
          PmsSpuAPI.getPage(queryParams)
        .then((data) => {
          pageData.value = data.list.flat();
          total.value = data.total;
        })
        .finally(() => {
          loading.value = false;
        });
  }

  /** 重置商品查询 */
  function handleResetQuery() {
    queryFormRef.value!.resetFields();
    queryParams.pageNum = 1;
    handleQuery();
  }

  /** 行复选框选中记录选中ID集合 */
  function handleSelectionChange(selection: any) {
    removeIds.value = selection.map((item: any) => item.id);
  }

  /** 打开商品弹窗 */
  function handleOpenDialog(id?: number) {
    dialog.visible = true;
    if (id) {
      dialog.title = "修改商品";
            PmsSpuAPI.getFormData(id).then((data) => {
              console.log("修改商品 :{}",data);
        Object.assign(formData, data);
      });
    } else {
      dialog.title = "新增商品";
    }
  }

  /** 提交商品表单 */
  function handleSubmit() {
    dataFormRef.value.validate((valid: any) => {
      if (valid) {
        loading.value = true;
        const id = formData.id;
        if (id) {
                PmsSpuAPI.update(id, formData)
              .then(() => {
                ElMessage.success("修改成功");
                handleCloseDialog();
                handleResetQuery();
              })
              .finally(() => (loading.value = false));
        } else {
                PmsSpuAPI.add(formData)
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

  /** 关闭商品弹窗 */
  function handleCloseDialog() {
    dialog.visible = false;
    dataFormRef.value.resetFields();
    dataFormRef.value.clearValidate();
    formData.id = undefined;
  }

  /** 删除商品 */
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
                PmsSpuAPI.deleteByIds(ids)
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
