<template>
  <div class="auth-panel-form">
    <h3 class="auth-panel-form__title" text-center>{{ t("login.login") }}</h3>
    <el-form
      ref="loginFormRef"
      :model="loginFormData"
      :rules="loginRules"
      size="large"
      :validate-on-rule-change="false"
    >
      <!-- 用户名 -->
      <el-form-item prop="username">
        <el-input
          v-model.trim="loginFormData.username"
          :placeholder="t('login.username')"
          clearable
          @blur="handleUsernameBlur"
          @clear="handleUsernameClear"
        >
          <template #prefix>
            <el-icon><User /></el-icon>
          </template>
        </el-input>
      </el-form-item>

      <!-- 租户选择（新增） -->
      <el-form-item v-if="showTenantSelect || tenantLoading" prop="tenantId">
        <el-select
          v-model="loginFormData.tenantId"
          :placeholder="tenantLoading ? t('login.loadingTenants') : t('login.selectTenant')"
          filterable
          clearable
          class="w-full"
          :loading="tenantLoading"
          :disabled="tenantList.length === 0 && !tenantLoading"
          @focus="loadTenants"
          @change="handleTenantChange"
        >
          <template #prefix>
            <el-icon><OfficeBuilding /></el-icon>
          </template>

          <!-- 加载中状态 -->
          <template v-if="tenantLoading" #empty>
            <div class="flex justify-center py-2">
              <el-icon class="is-loading"><Loading /></el-icon>
              <span class="ml-2">加载租户列表中...</span>
            </div>
          </template>

<!--          这样修改后，当用户输入用户名时，租户选择框会立即显示，并展示"加载租户列表中..."的提示，加载完成后显示实际的租户列表或"无可用租户"的提示，用户体验会好很多。-->

          <!-- 加载完成后的选项 -->
          <el-option
            v-for="tenant in tenantList"
            :key="tenant.id"
            :label="tenant.name"
            :value="tenant.id"
          >
            <div flex items-center gap-8px>
              <div v-if="tenant.logo" class="tenant-logo">
                <img :src="tenant.logo" :alt="tenant.name" />
              </div>
              <div flex-1>
                <div flex items-center gap-4px>
                  <span>{{ tenant.name }}</span>
                  <el-tag v-if="tenant.code" size="small" type="info">{{ tenant.code }}</el-tag>
                </div>
                <div v-if="tenant.contactName" class="tenant-desc">
                  {{ tenant.contactName }}
                </div>
              </div>
            </div>
          </el-option>
        </el-select>
        <div v-if="tenantList.length === 0 && !tenantLoading" class="tenant-empty">
          <el-text type="info" size="small">该用户暂无可用租户</el-text>
        </div>
      </el-form-item>

      <!-- 密码 -->
      <el-tooltip :visible="isCapsLock" :content="t('login.capsLock')" placement="right">
        <el-form-item prop="password">
          <el-input
            v-model.trim="loginFormData.password"
            :placeholder="t('login.password')"
            type="password"
            show-password
            @keyup="checkCapsLock"
            @keyup.enter="handleLoginSubmit"
          >
            <template #prefix>
              <el-icon><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
      </el-tooltip>

      <!-- 验证码 -->
      <el-form-item prop="captchaCode">
        <div flex items-center gap-10px>
          <el-input
            v-model.trim="loginFormData.captchaCode"
            :placeholder="t('login.captchaCode')"
            clearable
            class="flex-1"
            @keyup.enter="handleLoginSubmit"
          >
            <template #prefix>
              <div class="i-svg:captcha" />
            </template>
          </el-input>
          <div cursor-pointer h-44px w-140px flex-center @click="getCaptcha">
            <el-icon v-if="codeLoading" class="is-loading" size="20"><Loading /></el-icon>
            <img
              v-else-if="captchaBase64"
              border-rd-4px
              w-full
              h-full
              block
              object-cover
              shadow="[0_0_0_1px_var(--el-border-color)_inset]"
              :src="captchaBase64"
              alt="captchaCode"
              title="点击刷新验证码"
              @error="getCaptcha"
            />
            <el-text v-else type="info" size="small">点击获取验证码</el-text>
          </div>
        </div>
      </el-form-item>

      <div class="flex-x-between w-full">
        <el-checkbox v-model="loginFormData.rememberMe">{{ t("login.rememberMe") }}</el-checkbox>
        <el-link type="primary" underline="never" @click="toOtherForm('resetPwd')">
          {{ t("login.forgetPassword") }}
        </el-link>
      </div>

      <!-- 登录按钮 -->
      <el-form-item>
        <el-button
          :loading="loading"
          :disabled="!canSubmit"
          type="primary"
          class="w-full"
          @click="handleLoginSubmit"
        >
          {{ t("login.login") }}
        </el-button>
      </el-form-item>
    </el-form>

    <div flex-center gap-10px>
      <el-text size="default">{{ t("login.noAccount") }}</el-text>
      <el-link type="primary" underline="never" @click="toOtherForm('register')">
        {{ t("login.reg") }}
      </el-link>
    </div>

    <!-- 第三方登录 -->
    <div class="third-party-login">
      <div class="divider-container">
        <div class="divider-line"></div>
        <span class="divider-text">{{ t("login.otherLoginMethods") }}</span>
        <div class="divider-line"></div>
      </div>
      <div class="social-login">
        <div class="social-login__item">
          <div class="i-svg:wechat" />
        </div>
        <div class="social-login__item">
          <div class="i-svg:qq" />
        </div>
        <div class="social-login__item">
          <div class="i-svg:github" />
        </div>
        <div class="social-login__item">
          <div class="i-svg:gitee" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { FormInstance } from "element-plus";
import { User, Lock, Loading, OfficeBuilding } from '@element-plus/icons-vue';
import AuthAPI from "@/api/auth.api";
import type { LoginRequest , TenantItem  } from "@/types/api";
import router from "@/router";
import { useUserStore } from "@/store";
import { AuthStorage } from "@/utils/auth";
import { debounce } from 'lodash-es';

const { t } = useI18n();
const userStore = useUserStore();
const route = useRoute();

onMounted(() => {
  getCaptcha();
  // 从本地存储加载上次选择的租户
  loadLastSelectedTenant();
});

const loginFormRef = ref<FormInstance>();
const loading = ref(false);
// 是否大写锁定
const isCapsLock = ref(false);
// 验证码图片 Base64
const captchaBase64 = ref();

const tenantLoading = ref(false);
const tenantList = ref<TenantItem[]>([]); // 数组字面量语法


// 是否显示租户选择框
const showTenantSelect = ref(false);

// 记住我
const rememberMe = AuthStorage.getRememberMe();
const loginFormData = ref<LoginRequest>({
  username: "",
  password: "",
  tenantId: undefined, // 新增租户ID字段
  captchaId: "",
  captchaCode: "",
  rememberMe,
});

// 是否可以提交
const canSubmit = computed(() => {
  if (!loginFormData.value.username || !loginFormData.value.password) {
    return false;
  }
  // 如果有租户列表且长度>1，必须选择租户
  if (tenantList.value.length > 1 && loginFormData.value.tenantId == null) {
    return false;
  }
  if (!loginFormData.value.captchaCode) {
    return false;
  }
  return true;
});

// 表单验证规则
const loginRules = computed(() => {
  const rules: any = {
    username: [
      {
        required: true,
        trigger: "blur",
        message: t("login.message.username.required"),
      },
    ],
    password: [
      {
        required: true,
        trigger: "blur",
        message: t("login.message.password.required"),
      },
      {
        min: 6,
        message: t("login.message.password.min"),
        trigger: "blur",
      },
    ],
    captchaCode: [
      {
        required: true,
        trigger: "blur",
        message: t("login.message.captchaCode.required"),
      },
    ],
  };

  // 动态添加租户验证规则
  if (tenantList.value.length > 1) {
    rules.tenantId = [
      {
        required: true,
        trigger: "change",
        message: t("login.message.tenant.required 登录租户必须"),
      },
    ];
  }

  return rules;
});

// 从本地存储加载上次选择的租户
function loadLastSelectedTenant() {
  const lastTenant = AuthStorage.getLastSelectedTenant();
  if (lastTenant && lastTenant.username === loginFormData.value.username) {
    loginFormData.value.tenantId = lastTenant.tenantId;
  }
}

// 用户名失去焦点时加载租户
const handleUsernameBlur = debounce(async () => {
  if (!loginFormData.value.username || loginFormData.value.username.length < 2) {
    tenantList.value = [];
    showTenantSelect.value = false;
    return;
  }

  console.log("用户名失去焦点时加载租户",loginFormData.value.username);
  // 立即显示租户选择框（即使还在加载中）
  showTenantSelect.value = true;
  await loadTenants();
}, 300);


// 用户名清空时重置租户
function handleUsernameClear() {
  tenantList.value = [];
  loginFormData.value.tenantId = undefined;
  showTenantSelect.value = false;
}

// 加载租户列表
async function loadTenants() {
  if (!loginFormData.value.username) {
    tenantList.value = [];
    showTenantSelect.value = false;
    return;
  }

  // 清空之前的租户列表
  tenantList.value = [];
  tenantLoading.value = true;

  try {

    console.log("登录用户名:{}",loginFormData.value.username);
    const response  = await AuthAPI.getAccessibleTenantsByUsername(loginFormData.value.username);

    console.log("一次查询获取用户名在所有租户中的可访问租户:{}",response); //如果字段基本一致，可以安全断言
    tenantList.value = response as unknown as TenantItem[] || [];

    console.log("一次查询获取用户名在所有租户中的可访问租户tenantList:{}",tenantList.value);


    if (tenantList.value.length > 0) {
      showTenantSelect.value = true;

      // 如果只有一个租户，自动选择
      if (tenantList.value.length === 1) {
        loginFormData.value.tenantId = tenantList.value[0].id;
        // 保存自动选择的租户
        handleTenantChange(tenantList.value[0].id);
      } else {
        // 多个租户，尝试使用上次的选择
        const lastTenant = AuthStorage.getLastSelectedTenant();
        if (lastTenant && lastTenant.username === loginFormData.value.username) {
          const exists = tenantList.value.some(tenant => tenant.id === lastTenant.tenantId);
          if (exists) {
            loginFormData.value.tenantId = lastTenant.tenantId;
          }
        }
      }
    } else {
      // 没有租户时，仍然显示选择框，但显示"无可用租户"的提示
      loginFormData.value.tenantId = undefined;
    }
  } catch (error) {
    console.error('加载租户列表失败:', error);
    tenantList.value = [];
    // 出错时仍然显示选择框，但显示错误状态
    showTenantSelect.value = true;
  } finally {
    tenantLoading.value = false;
  }
}

// 租户选择变化
function handleTenantChange(tenantId: number) {
  if (tenantId && loginFormData.value.username) {
    // 保存到本地存储
    AuthStorage.setLastSelectedTenant({
      username: loginFormData.value.username,
      tenantId: tenantId
    });
  }
}

// 获取验证码
const codeLoading = ref(false);
function getCaptcha() {
  codeLoading.value = true;
  AuthAPI.getCaptcha()
    .then((data) => {
      loginFormData.value.captchaId = data.captchaId;
      captchaBase64.value = data.captchaBase64;
    })
    .finally(() => (codeLoading.value = false));
}

/**
 * 登录提交
 */
async function handleLoginSubmit() {
  // 1. 表单验证
  const valid = await loginFormRef.value?.validate().then(
    () => true,
    () => false
  );
  if (!valid) return;

  // 2. 如果只有一个租户但未选择，自动选择
  if (tenantList.value.length === 1 && !loginFormData.value.tenantId) {
    loginFormData.value.tenantId = tenantList.value[0].id;
  }

  loading.value = true; // 开始登录加载状态
  try {
    // 2. 执行登录
    console.log("2. 执行登录（调用Pinia action）");
    await userStore.login(loginFormData.value).then(
      async () => {

        // 登录成功，保存租户选择
        if (loginFormData.value.tenantId && loginFormData.value.username) {
          AuthStorage.setLastSelectedTenant({
            username: loginFormData.value.username,
            tenantId: loginFormData.value.tenantId
          });
        }

        // 登录成功，跳转到目标页面
        const redirectPath = (route.query.redirect as string) || "/";
        await router.push(decodeURIComponent(redirectPath));
      },
      (error) => {
        // 登录失败，刷新验证码
        getCaptcha();
        throw error;
      }
    );
  } finally {
    loading.value = false;
  }
}

// 检查输入大小写
function checkCapsLock(event: KeyboardEvent) {
  // 防止浏览器密码自动填充时报错
  if (event instanceof KeyboardEvent) {
    isCapsLock.value = event.getModifierState("CapsLock");
  }
}

const emit = defineEmits(["update:modelValue"]);
function toOtherForm(type: "register" | "resetPwd") {
  emit("update:modelValue", type);
}
</script>

<style lang="scss" scoped>
.auth-panel-form {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.auth-panel-form__title {
  margin: 0 0 0.5rem;
  font-size: 1.125rem;
  font-weight: 600;
}

.tenant-logo {
  width: 24px;
  height: 24px;
  border-radius: 4px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.tenant-desc {
  font-size: 12px;
  color: var(--el-text-color-secondary);
  margin-top: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
}

/* 添加加载状态的样式 */
:deep(.el-select .el-loading-spinner) {
  margin-top: 8px;
}

.tenant-empty {
  padding: 8px 0;
  text-align: center;
  color: var(--el-text-color-placeholder);
  font-size: 12px;
}

.third-party-login {
  .divider-container {
    display: flex;
    align-items: center;
    margin: 16px 0;

    .divider-line {
      flex: 1;
      height: 1px;
      background: linear-gradient(to right, transparent, var(--el-border-color-light), transparent);
    }

    .divider-text {
      padding: 0 16px;
      font-size: 12px;
      color: var(--el-text-color-regular);
      white-space: nowrap;
    }
  }

  .social-login {
    display: flex;
    gap: 1.25rem;
    align-items: center;
    justify-content: center;
    width: 100%;
    color: var(--el-text-color-secondary);

    &__item {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.5rem;
      font-size: 20px;
      cursor: pointer;
      border-radius: 8px;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: var(--el-fill-color);
      }
    }
  }
}
</style>
