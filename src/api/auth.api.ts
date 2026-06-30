import request from "@/utils/request";
import type { LoginRequest, LoginResponse, CaptchaInfo } from "@/types/api/auth";
import type { TenantItem } from "@/types/api";
import {
  CLIENT_CONFIG,
  setClientId,
  getClientId,
  clearClientId,
  detectClientId,
} from "@/utils/clientManager";
const AUTH_BASE_URL = "/aioveu/api/v8/admin/auth/auth";

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

    const clientId = getClientId() || CLIENT_CONFIG.CLIENT_ID;
    console.log("登录使用客户端ID:", clientId);
    const basicAuth = CLIENT_CONFIG.getBASIC_AUTH();
    console.log("动态生成的认证头:", basicAuth);


    return request<any, LoginResponse>({
      // url: `${AUTH_BASE_URL}/oauth2/token`,
      url: `/oauth2/token`,
      method: "post",
      data: payload,
      headers: {
        "Content-Type": "multipart/form-data",
        // Authorization: "Basic bWFsbC1hZG1pbjoxMjM0NTY=", // 客户端信息Base64明文：mall-admin:123456
        Authorization: basicAuth, // 客户端信息Base64明文：mall-admin:123456
      },
    })
      .then((response) => {
        console.log("✅ 登录响应:", response);
        return response;
      })
      .catch((error) => {
        console.error("❌ 登录错误:", error);
        throw error;
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
