import request from "@/utils/request";
import type { LoginRequest, LoginResponse, CaptchaInfo } from "@/types/api/auth";
import type { TenantItem  } from "@/types/api";

const AUTH_BASE_URL = "/aioveu-tenant-auth/api/v1/auth";
const AUTH_LOGIN_URL = "/aioveu-tenant-auth";

const AuthAPI = {
  /** 登录接口*/
  login(data: LoginRequest) {
    const payload: Record<string, any> = {
      username: data.username,
      password: data.password,
      captchaId: data.captchaId,
      captchaCode: data.captchaCode,
      grant_type: "password",  //获取授权类型grant_type
    };

    // tenantId is optional — include only when provided (multi-tenant feature)
    if (typeof data.tenantId !== "undefined") {
      payload.tenantId = data.tenantId;
    }

    return request<any, LoginResponse>({
      url: `${AUTH_LOGIN_URL}/oauth2/token`,
      method: "post",
      data: payload,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Basic bWFsbC1hZG1pbjoxMjM0NTY=", // 客户端信息Base64明文：mall-admin:123456
      },
    }).then(response => {
      console.log("✅ 登录响应:", response);
      return response;
    }).catch(error => {
      console.error("❌ 登录错误:", error);
      throw error;
    });
  },



  /** 一次查询获取用户名在所有租户中的可访问租户  方案1：使用模板字符串（推荐）*/
  getAccessibleTenantsByUsername(username: String) {
    return request<TenantItem[]>({
      url: `${AUTH_BASE_URL}/tenants/${username}`,  // 使用模板字符串
      method: "get",
      // 不需要params了，因为username已经在URL中了
    });
  },

  /** 切换租户(平台用户) - 返回新的 token */
  switchTenant(tenantId: number) {
    return request<any, LoginResponse>({
      url: `${AUTH_BASE_URL}/switch-tenant`,
      method: "post",
      params: { tenantId },
    });
  },

  /** 刷新 token 接口*/
  refreshToken(refreshToken: string) {
    return request<any, LoginResponse>({
      url: `${AUTH_BASE_URL}/refresh-token`,
      method: "post",
      params: { refreshToken },
      headers: {
        Authorization: "no-auth",
      },
    });
  },

  /** 退出登录接口 */
  logout() {
    return request({
      url: `${AUTH_BASE_URL}/logout`,
      method: "delete",
    });
  },

  /** 获取验证码接口*/
  getCaptcha() {
    return request<any, CaptchaInfo>({
      url: `${AUTH_BASE_URL}/captcha`,
      method: "get",
    });
  },
};

export default AuthAPI;
