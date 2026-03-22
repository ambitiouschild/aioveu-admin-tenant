import request from "@/utils/request";
// import type { Oauth2AuthorizationForm, Oauth2AuthorizationPageQuery, Oauth2AuthorizationPageVo } from "@/api/types";
import {BaseQueryParams, PageQuery} from "@/types";

const OAUTH2_AUTHORIZATION_BASE_URL = "/aioveu-tenant-auth/api/v1/oauth2-authorization";

const Oauth2AuthorizationAPI = {
    /** 获取OAuth2授权信息，存储所有的授权记录、令牌和状态信息分页数据 */
    getPage(queryParams?: Oauth2AuthorizationPageQuery) {
        return request<any, PageResult<Oauth2AuthorizationPageVo[]>>({
            url: `${OAUTH2_AUTHORIZATION_BASE_URL}/page`,
            method: "get",
            params: queryParams,
        });
    },
    /**
     * 获取OAuth2授权信息，存储所有的授权记录、令牌和状态信息表单数据
     *
     * @param id OAuth2授权信息，存储所有的授权记录、令牌和状态信息ID
     * @returns OAuth2授权信息，存储所有的授权记录、令牌和状态信息表单数据
     */
    getFormData(id: number) {
        return request<any, Oauth2AuthorizationForm>({
            url: `${OAUTH2_AUTHORIZATION_BASE_URL}/${id}/form`,
            method: "get",
        });
    },

    /**
     *  添加OAuth2授权信息，存储所有的授权记录、令牌和状态信息
     *
     *  @param data OAuth2授权信息，存储所有的授权记录、令牌和状态信息表单数据
     */
    create(data: Oauth2AuthorizationForm) {
        return request({
            url: `${OAUTH2_AUTHORIZATION_BASE_URL}`,
            method: "post",
            data,
        });
    },

    /**
     * 更新OAuth2授权信息，存储所有的授权记录、令牌和状态信息
     *
     * @param id OAuth2授权信息，存储所有的授权记录、令牌和状态信息ID
     * @param data OAuth2授权信息，存储所有的授权记录、令牌和状态信息表单数据
     */
     update(id: string, data: Oauth2AuthorizationForm) {
        return request({
            url: `${OAUTH2_AUTHORIZATION_BASE_URL}/${id}`,
            method: "put",
            data,
        });
    },

    /**
     * 批量删除OAuth2授权信息，存储所有的授权记录、令牌和状态信息，多个以英文逗号(,)分割
     *
     * @param ids OAuth2授权信息，存储所有的授权记录、令牌和状态信息ID字符串，多个以英文逗号(,)分割
     */
     deleteByIds(ids: string) {
        return request({
            url: `${OAUTH2_AUTHORIZATION_BASE_URL}/${ids}`,
            method: "delete",
        });
    }
}

export default Oauth2AuthorizationAPI;


/**
 * Oauth2Authorization OAuth2授权信息，存储所有的授权记录、令牌和状态信息类型定义
 */

/** OAuth2授权信息，存储所有的授权记录、令牌和状态信息分页查询参数 */
export interface Oauth2AuthorizationPageQuery extends PageQuery {
  /** 授权记录的唯一标识符，通常是UUID */
  id?: string;
  /** 关联的注册客户端ID，指向oauth2_registered_client表 */
  registeredClientId?: string;
  /** 用户主体名称，通常是用户名或用户标识 */
  principalName?: string;
  /** 授权类型，如authorization_code、password、client_credentials、refresh_token等 */
  authorizationGrantType?: string;
}

/** OAuth2授权信息，存储所有的授权记录、令牌和状态信息表单对象 */
export interface Oauth2AuthorizationForm {
  /** 授权记录的唯一标识符，通常是UUID */
  id?: string;
  /** 关联的注册客户端ID，指向oauth2_registered_client表 */
  registeredClientId?: string;
  /** 用户主体名称，通常是用户名或用户标识 */
  principalName?: string;
  /** 授权类型，如authorization_code、password、client_credentials、refresh_token等 */
  authorizationGrantType?: string;
  /** 授权的范围列表，以空格分隔的scope字符串 */
  authorizedScopes?: string;
  /** 扩展属性，存储认证过程中的额外信息，序列化为JSON格式 */
  attributes?: Uint8Array;
  /** OAuth2授权码流程中的state参数，用于防止CSRF攻击 */
  state?: string;
  /** 授权码的值，加密存储 */
  authorizationCodeValue?: Uint8Array;
  /** 授权码颁发时间 */
  authorizationCodeIssuedAt?: string;
  /** 授权码过期时间（通常很短，如5分钟） */
  authorizationCodeExpiresAt?: string;
  /** 授权码的元数据 */
  authorizationCodeMetadata?: Uint8Array;
  /** 访问令牌的值，JWT或opaque token格式 */
  accessTokenValue?: Uint8Array;
  /** 访问令牌颁发时间 */
  accessTokenIssuedAt?: string;
  /** 访问令牌过期时间 */
  accessTokenExpiresAt?: string;
  /** 访问令牌的元数据 */
  accessTokenMetadata?: Uint8Array;
  /** 访问令牌类型，通常是Bearer */
  accessTokenType?: string;
  /** 访问令牌关联的scope */
  accessTokenScopes?: string;
  /** OpenID Connect ID令牌的值 */
  oidcIdTokenValue?: Uint8Array;
  /** ID令牌颁发时间 */
  oidcIdTokenIssuedAt?: string;
  /** ID令牌过期时间 */
  oidcIdTokenExpiresAt?: string;
  /** ID令牌的元数据 */
  oidcIdTokenMetadata?: Uint8Array;
  /** 刷新令牌的值 */
  refreshTokenValue?: Uint8Array;
  /** 刷新令牌颁发时间 */
  refreshTokenIssuedAt?: string;
  /** 刷新令牌过期时间（通常较长，如30天） */
  refreshTokenExpiresAt?: string;
  /** 刷新令牌的元数据 */
  refreshTokenMetadata?: Uint8Array;
  /** 设备授权流程中的用户码 */
  userCodeValue?: Uint8Array;
  /** 用户码颁发时间 */
  userCodeIssuedAt?: string;
  /** 用户码过期时间 */
  userCodeExpiresAt?: string;
  /** 用户码的元数据 */
  userCodeMetadata?: Uint8Array;
  /** 设备授权流程中的设备码 */
  deviceCodeValue?: Uint8Array;
  /** 设备码颁发时间 */
  deviceCodeIssuedAt?: string;
  /** 设备码过期时间 */
  deviceCodeExpiresAt?: string;
  /** 设备码的元数据 */
  deviceCodeMetadata?: Uint8Array;
}

/** OAuth2授权信息，存储所有的授权记录、令牌和状态信息分页对象 */
export interface Oauth2AuthorizationPageVo {
  /** 授权记录的唯一标识符，通常是UUID */
  id?: string;
  /** 关联的注册客户端ID，指向oauth2_registered_client表 */
  registeredClientId?: string;
  /** 用户主体名称，通常是用户名或用户标识 */
  principalName?: string;
  /** 授权类型，如authorization_code、password、client_credentials、refresh_token等 */
  authorizationGrantType?: string;
  /** 授权的范围列表，以空格分隔的scope字符串 */
  authorizedScopes?: string;
  /** 扩展属性，存储认证过程中的额外信息，序列化为JSON格式 */
  attributes?: Uint8Array;
  /** OAuth2授权码流程中的state参数，用于防止CSRF攻击 */
  state?: string;
  /** 授权码的值，加密存储 */
  authorizationCodeValue?: Uint8Array;
  /** 授权码颁发时间 */
  authorizationCodeIssuedAt?: string;
  /** 授权码过期时间（通常很短，如5分钟） */
  authorizationCodeExpiresAt?: string;
  /** 授权码的元数据 */
  authorizationCodeMetadata?: Uint8Array;
  /** 访问令牌的值，JWT或opaque token格式 */
  accessTokenValue?: Uint8Array;
  /** 访问令牌颁发时间 */
  accessTokenIssuedAt?: string;
  /** 访问令牌过期时间 */
  accessTokenExpiresAt?: string;
  /** 访问令牌的元数据 */
  accessTokenMetadata?: Uint8Array;
  /** 访问令牌类型，通常是Bearer */
  accessTokenType?: string;
  /** 访问令牌关联的scope */
  accessTokenScopes?: string;
  /** OpenID Connect ID令牌的值 */
  oidcIdTokenValue?: Uint8Array;
  /** ID令牌颁发时间 */
  oidcIdTokenIssuedAt?: string;
  /** ID令牌过期时间 */
  oidcIdTokenExpiresAt?: string;
  /** ID令牌的元数据 */
  oidcIdTokenMetadata?: Uint8Array;
  /** 刷新令牌的值 */
  refreshTokenValue?: Uint8Array;
  /** 刷新令牌颁发时间 */
  refreshTokenIssuedAt?: string;
  /** 刷新令牌过期时间（通常较长，如30天） */
  refreshTokenExpiresAt?: string;
  /** 刷新令牌的元数据 */
  refreshTokenMetadata?: Uint8Array;
  /** 设备授权流程中的用户码 */
  userCodeValue?: Uint8Array;
  /** 用户码颁发时间 */
  userCodeIssuedAt?: string;
  /** 用户码过期时间 */
  userCodeExpiresAt?: string;
  /** 用户码的元数据 */
  userCodeMetadata?: Uint8Array;
  /** 设备授权流程中的设备码 */
  deviceCodeValue?: Uint8Array;
  /** 设备码颁发时间 */
  deviceCodeIssuedAt?: string;
  /** 设备码过期时间 */
  deviceCodeExpiresAt?: string;
  /** 设备码的元数据 */
  deviceCodeMetadata?: Uint8Array;
}
