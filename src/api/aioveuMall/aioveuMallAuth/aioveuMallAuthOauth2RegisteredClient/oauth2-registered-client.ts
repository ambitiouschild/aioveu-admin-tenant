import request from "@/utils/request";
// import type { Oauth2RegisteredClientForm, Oauth2RegisteredClientPageQuery, Oauth2RegisteredClientPageVo } from "@/api/types";
import {BaseQueryParams, PageQuery} from "@/types";

const OAUTH2_REGISTERED_CLIENT_BASE_URL = "/aioveu-tenant-auth/api/v1/oauth2-registered-client";

const Oauth2RegisteredClientAPI = {
    /** 获取OAuth2注册客户端，存储所有已注册的客户端应用信息分页数据 */
    getPage(queryParams?: Oauth2RegisteredClientPageQuery) {
        return request<any, PageResult<Oauth2RegisteredClientPageVo[]>>({
            url: `${OAUTH2_REGISTERED_CLIENT_BASE_URL}/page`,
            method: "get",
            params: queryParams,
        });
    },
    /**
     * 获取OAuth2注册客户端，存储所有已注册的客户端应用信息表单数据
     *
     * @param id OAuth2注册客户端，存储所有已注册的客户端应用信息ID
     * @returns OAuth2注册客户端，存储所有已注册的客户端应用信息表单数据
     */
    getFormData(id: number) {
        return request<any, Oauth2RegisteredClientForm>({
            url: `${OAUTH2_REGISTERED_CLIENT_BASE_URL}/${id}/form`,
            method: "get",
        });
    },

    /**
     *  添加OAuth2注册客户端，存储所有已注册的客户端应用信息
     *
     *  @param data OAuth2注册客户端，存储所有已注册的客户端应用信息表单数据
     */
    create(data: Oauth2RegisteredClientForm) {
        return request({
            url: `${OAUTH2_REGISTERED_CLIENT_BASE_URL}`,
            method: "post",
            data,
        });
    },

    /**
     * 更新OAuth2注册客户端，存储所有已注册的客户端应用信息
     *
     * @param id OAuth2注册客户端，存储所有已注册的客户端应用信息ID
     * @param data OAuth2注册客户端，存储所有已注册的客户端应用信息表单数据
     */
     update(id: string, data: Oauth2RegisteredClientForm) {
        return request({
            url: `${OAUTH2_REGISTERED_CLIENT_BASE_URL}/${id}`,
            method: "put",
            data,
        });
    },

    /**
     * 批量删除OAuth2注册客户端，存储所有已注册的客户端应用信息，多个以英文逗号(,)分割
     *
     * @param ids OAuth2注册客户端，存储所有已注册的客户端应用信息ID字符串，多个以英文逗号(,)分割
     */
     deleteByIds(ids: string) {
        return request({
            url: `${OAUTH2_REGISTERED_CLIENT_BASE_URL}/${ids}`,
            method: "delete",
        });
    }
}

export default Oauth2RegisteredClientAPI;

/**
 * Oauth2RegisteredClient OAuth2注册客户端，存储所有已注册的客户端应用信息类型定义
 */

/** OAuth2注册客户端，存储所有已注册的客户端应用信息分页查询参数 */
export interface Oauth2RegisteredClientPageQuery extends PageQuery {
  /** 客户端记录的唯一标识符，通常是UUID */
  id?: string;
  /** 客户端标识符，OAuth2请求中使用的client_id */
  clientId?: string;
  /** 客户端ID的创建时间 */
  clientIdIssuedAt?: string;
  /** 客户端显示名称，用于用户界面显示 */
  clientName?: string;
  /** 支持的授权类型，JSON格式数组。如["authorization_code","refresh_token","password","client_credentials"] */
  authorizationGrantTypes?: string;
  /** 客户端可请求的范围列表，JSON格式数组。如["openid","profile","email"] */
  scopes?: string;
}

/** OAuth2注册客户端，存储所有已注册的客户端应用信息表单对象 */
export interface Oauth2RegisteredClientForm {
  /** 客户端记录的唯一标识符，通常是UUID */
  id?: string;
  /** 客户端标识符，OAuth2请求中使用的client_id */
  clientId?: string;
  /** 客户端ID的创建时间 */
  clientIdIssuedAt?: string;
  /** 客户端密钥，已加密存储。公共客户端可为NULL */
  clientSecret?: string;
  /** 客户端密钥的过期时间，NULL表示永不过期 */
  clientSecretExpiresAt?: string;
  /** 客户端显示名称，用于用户界面显示 */
  clientName?: string;
  /** 支持的客户端认证方法，JSON格式数组。如["client_secret_basic","client_secret_post"] */
  clientAuthenticationMethods?: string;
  /** 支持的授权类型，JSON格式数组。如["authorization_code","refresh_token","password","client_credentials"] */
  authorizationGrantTypes?: string;
  /** 允许的重定向URI列表，JSON格式数组。必须与授权请求中的redirect_uri完全匹配 */
  redirectUris?: string;
  /** 登出后的重定向URI列表，JSON格式数组 */
  postLogoutRedirectUris?: string;
  /** 客户端可请求的范围列表，JSON格式数组。如["openid","profile","email"] */
  scopes?: string;
  /** 客户端设置，JSON格式。包含requireAuthorizationConsent、requireProofKey等配置 */
  clientSettings?: string;
  /** 令牌设置，JSON格式。包含accessTokenTimeToLive、refreshTokenTimeToLive等配置 */
  tokenSettings?: string;
}

/** OAuth2注册客户端，存储所有已注册的客户端应用信息分页对象 */
export interface Oauth2RegisteredClientPageVo {
  /** 客户端记录的唯一标识符，通常是UUID */
  id?: string;
  /** 客户端标识符，OAuth2请求中使用的client_id */
  clientId?: string;
  /** 客户端ID的创建时间 */
  clientIdIssuedAt?: string;
  /** 客户端密钥，已加密存储。公共客户端可为NULL */
  clientSecret?: string;
  /** 客户端密钥的过期时间，NULL表示永不过期 */
  clientSecretExpiresAt?: string;
  /** 客户端显示名称，用于用户界面显示 */
  clientName?: string;
  /** 支持的客户端认证方法，JSON格式数组。如["client_secret_basic","client_secret_post"] */
  clientAuthenticationMethods?: string;
  /** 支持的授权类型，JSON格式数组。如["authorization_code","refresh_token","password","client_credentials"] */
  authorizationGrantTypes?: string;
  /** 允许的重定向URI列表，JSON格式数组。必须与授权请求中的redirect_uri完全匹配 */
  redirectUris?: string;
  /** 登出后的重定向URI列表，JSON格式数组 */
  postLogoutRedirectUris?: string;
  /** 客户端可请求的范围列表，JSON格式数组。如["openid","profile","email"] */
  scopes?: string;
  /** 客户端设置，JSON格式。包含requireAuthorizationConsent、requireProofKey等配置 */
  clientSettings?: string;
  /** 令牌设置，JSON格式。包含accessTokenTimeToLive、refreshTokenTimeToLive等配置 */
  tokenSettings?: string;
}
