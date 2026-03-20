<template>
  <!-- 组件容器 -->
  <!-- 关键：添加 v-if 强制重新渲染 -->
  <div v-if="showCategoryTree" class="component-container">
    <!-- 树形分类组件 -->
    <el-tree
      ref="categoryTreeRef"
      v-loading="loading"
      class="category"
      :data="categoryOptions"
      :props="{ label: 'name', children: 'children', disabled: '' }"
      node-key="id"
      :expand-on-click-node="false"
      default-expand-all
      :accordion="true"
      @node-click="handleNodeClick"
    >
      <!-- 自定义节点内容 -->
      <template #default="scope">
        <div class="category_node">
          <!-- 左侧：节点内容显示 -->
          <div>
            <!-- 三级分类显示图标 -->
            <el-image
              v-show="scope.data.level === 3"
              :src="scope.data.iconUrl"
              class="category_node_img"
            >
              <!-- 图标加载失败的占位符 -->
              <template #error>
                <div class="image-slot">
                  <el-icon><Picture /></el-icon>
                </div>
              </template>
            </el-image>
            <!-- 分类名称 -->
            {{ scope.data.name }}
          </div>

          <!-- 右侧：操作按钮 -->
          <div>
            <!-- 非三级分类显示新增按钮 -->
            <el-button
              v-show="scope.data.level !== 3"
              type="success"
              link
              @click.stop="handleAdd(scope.data)"
            >
              新增
            </el-button>

            <!-- 非根节点显示编辑按钮 -->
            <el-button
              v-show="scope.data.id !== 0"
              type="warning"
              link
              @click.stop="handleUpdate(scope.data)"
            >
              编辑
            </el-button>

            <!-- 叶子节点显示删除按钮 -->
            <el-button
              v-show="
                scope.data.id &&
                (!scope.data.children || scope.data.children.length <= 0)
              "
              type="danger"
              link
              @click.stop="handleDelete(scope.data)"
            >
              删除
            </el-button>
          </div>
        </div>
      </template>
    </el-tree>

    <!-- 新增/编辑分类对话框 -->
    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="750px">
      <!-- 表单 -->
      <el-form
        ref="dataFormRef"
        :model="formData"
        :rules="rules"
        label-width="100px"
      >
        <!-- 上级分类（只读） -->
        <el-form-item label="上级分类" prop="parentId">
          <el-input v-model="parentCategory.name" readonly />
        </el-form-item>

        <!-- 分类名称 -->
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="formData.name" />
        </el-form-item>

        <!-- 分类图标上传 -->
<!--        <el-form-item label="分类图标" prop="iconUrl">-->
<!--          <single-upload v-model="formData.iconUrl" />-->
<!--        </el-form-item>-->

        <!-- 分类图标上传 -->
        <el-form-item label="分类图标">
          <SingleImageUpload
            v-model="formData.iconUrl"
            :maxFileSize="5"
            accept=".jpg,.jpeg,.png"
            :style="{ width: '200px', height: '200px' }"
          />
          <div >
            最大图片大小：5MB，支持格式：JPG、JPEG、PNG
          </div>
        </el-form-item>

        <!-- 显示状态 -->
        <el-form-item label="显示状态" prop="visible">
          <el-radio-group v-model="formData.visible">
            <el-radio :label="1">显示</el-radio>
            <el-radio :label="0">隐藏</el-radio>
          </el-radio-group>
        </el-form-item>

        <!-- 排序 -->
        <el-form-item label="排序" prop="sort">
          <el-input v-model="formData.sort" />
        </el-form-item>
      </el-form>

      <!-- 对话框底部按钮 -->
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="closeDialog">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import PmsCategoryAPI from '@/api/aioveuMall/aioveuMallPms/aioveuMallPmsCategory/pms-category'

// 定义组件事件
const emit = defineEmits<{
  (e: 'category-click', data: any): void
}>()

const showCategoryTree = ref(true)

// 定义组件引用
const categoryTreeRef = ref<InstanceType<typeof ElTree>>()
const dataFormRef = ref<FormInstance>()

// 响应式数据
const loading = ref(true)
const categoryOptions = ref<any[]>([])

// 表单数据
// 但 el-radio 的 label 是数字
const formData = reactive({
  id: undefined as number | undefined,
  name: '',
  parentId: 0,
  level: undefined as number | undefined,
  iconUrl: '',
  visible: 1,  // ✅ 改为数字类型
  sort: 1
})

// 表单验证规则
const rules = reactive<FormRules>({
  name: [
    { required: true, message: '请输入分类名称', trigger: 'blur' }
  ],
  parentId: [
    { required: true, message: '请选择上级分类', trigger: 'blur' }
  ],
  visible: [
    { required: true, message: '请选择显示状态', trigger: 'change' }
  ]
})

// 对话框控制
const dialogVisible = ref(false)
const dialogTitle = ref('')

// 父级分类和当前分类
const parentCategory = reactive({
  id: 0,
  name: '全部分类',
  level: 0
})

const currentCategory = ref<any>({})

/**
 * 查询分类数据
 */
const handleQuery = async () => {
  loading.value = true
  try {
    const response = await PmsCategoryAPI.getListCategories({})

    console.log("分类数据:", response)

    // 构建树形数据，添加虚拟根节点"全部分类"
    if (Array.isArray(response)) {
      categoryOptions.value = [{
        id: 0,
        name: '全部分类',
        parentId: 0,
        level: 0,
        children: response
      }]
    } else if (response && Array.isArray(response.data)) {
      categoryOptions.value = [{
        id: 0,
        name: '全部分类',
        parentId: 0,
        level: 0,
        children: response.data
      }]
    } else {
      console.error('返回数据格式不正确:', response)
      categoryOptions.value = []
    }
  } catch (error) {
    console.error('查询分类数据失败:', error)
    ElMessage.error('获取分类数据失败')
  } finally {
    loading.value = false
  }
}

/**
 * 树节点点击事件处理
 */
const handleNodeClick = (row: any) => {
  if (!categoryTreeRef.value) return


  // 确保 parentId 是数字类型
  const parentId = Number(row.parentId)

  // 获取当前节点的父节点

  //ElTree的 node-key被设置为 "id"，这意味着节点的 key 应该是数字类型。但是在使用 getNode(row.parentId)时，如果 row.parentId是字符串类型，就会导致类型不匹配。
  const parentNode = categoryTreeRef.value.getNode(parentId)

  // 更新父级分类信息
  if (parentNode) {
    parentCategory.id = parentId
    parentCategory.name = parentNode.label
    parentCategory.level = row.level
  } else {
    // 如果没有父节点（可能是根节点），清空父级信息
    parentCategory.id = 0
    parentCategory.name = ''
    parentCategory.level = 0
  }

  // 保存当前分类信息
  currentCategory.value = { ...row }

  // 向父组件发射事件
  emit('category-click', row)
}

/**
 * 新增分类
 */
const handleAdd = (row: any) => {
  dialogTitle.value = '新增商品分类'
  dialogVisible.value = true

  // 重置表单
  resetForm()
  formData.id = undefined

  if (row && row.id != null) {
    // 设置父级分类
    parentCategory.id = row.id
    parentCategory.name = row.name
    parentCategory.level = row.level
  }
}

/**
 * 修改分类
 */
const handleUpdate = (row: any) => {
  // 先触发节点点击，获取父节点信息
  handleNodeClick(row)

  dialogTitle.value = '修改商品分类'
  dialogVisible.value = true

  // 将当前分类数据复制到表单中
  Object.assign(formData, {
    id: row.id,
    name: row.name,
    parentId: row.parentId,
    level: row.level,
    iconUrl: row.iconUrl || '',
    visible: row.visible,  // ✅ 确保转换为数字
    sort: row.sort || 1
  })
}

/**
 * 提交表单
 */
const submitForm = async () => {
  if (!dataFormRef.value) return

  try {
    const valid = await dataFormRef.value.validate()
    if (!valid) return

    if (formData.id) {
      // 修改操作
      await PmsCategoryAPI.update(formData.id, formData)
      ElMessage.success('修改成功')
    } else {
      // 新增操作
      const newData = {
        ...formData,
        parentId: parentCategory.id,
        level: (parentCategory.level || 0) + 1
      }
      await PmsCategoryAPI.add(newData)
      ElMessage.success('新增成功')
    }

    closeDialog()
    handleQuery()
  } catch (error) {
    console.error('提交表单失败:', error)
  }
}

/**
 * 删除分类
 */
const handleDelete = async (row: any) => {
  try {
    await ElMessageBox.confirm('确认删除已选中的数据项?', '警告', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })

    const ids = [row.id].join(',')
    await PmsCategoryAPI.deleteByIds(ids)

    ElMessage.success('删除成功')
    handleQuery()
  } catch {
    // 用户取消删除
    console.log('取消删除')
  }
}

/**
 * 重置表单
 */
const resetForm = () => {
  Object.assign(formData, {
    id: undefined,
    name: '',
    parentId: 0,
    level: undefined,
    iconUrl: '',
    visible: 1,
    sort: 1
  })

  Object.assign(parentCategory, {
    id: 0,
    name: '',
    level: 0
  })

  if (dataFormRef.value) {
    dataFormRef.value.clearValidate()
  }
}

/**
 * 关闭对话框
 */
const closeDialog = () => {
  dialogVisible.value = false
  resetForm()
}

// 组件挂载时加载数据
onMounted(() => {
  handleQuery()
})

// 组件挂载时
onMounted(() => {
  console.log('📌 父组件挂载')
})

// 组件卸载时
onUnmounted(() => {
  console.log('❌ 父组件卸载')
  showCategoryTree.value = false

  // 强制 GC（如果可用）
  if (window.gc) {
    window.gc()
  }
})



</script>

<style lang="scss" scoped>
.component-container {
  width: 100%;
  height: 100%;
}

.category {
  &_node {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    width: 100%;
    padding: 5px 0;

    &_img {
      width: 20px;
      height: 20px;
      margin-top: -5px;
      vertical-align: middle;
      margin-right: 5px;
    }

    .el-button {
      margin-left: 8px;
    }
  }
}
</style>
