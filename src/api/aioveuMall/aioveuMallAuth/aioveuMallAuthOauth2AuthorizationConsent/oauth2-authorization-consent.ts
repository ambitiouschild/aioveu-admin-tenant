import request from "@/utils/request";
// import type { Oauth2AuthorizationConsentForm, Oauth2AuthorizationConsentPageQuery, Oauth2AuthorizationConsentPageVo } from "@/api/types";
import {BaseQueryParams, PageQuery} from "@/types";

const OAUTH2_AUTHORIZATION_CONSENT_BASE_URL = "/aioveu-tenant-auth/api/v1/oauth2-authorization-consent";

const Oauth2AuthorizationConsentAPI = {
    /** 获取OAuth2授权同意，记录用户对每个客户端的授权同意情况分页数据 */
    getPage(queryParams?: Oauth2AuthorizationConsentPageQuery) {
        return request<any, PageResult<Oauth2AuthorizationConsentPageVo[]>>({
            url: `${OAUTH2_AUTHORIZATION_CONSENT_BASE_URL}/page`,
            method: "get",
            params: queryParams,
        });
    },
    /**
     * 获取OAuth2授权同意，记录用户对每个客户端的授权同意情况表单数据
     *
     * @param id OAuth2授权同意，记录用户对每个客户端的授权同意情况ID
     * @returns OAuth2授权同意，记录用户对每个客户端的授权同意情况表单数据
     */
    getFormData(id: number) {
        return request<any, Oauth2AuthorizationConsentForm>({
            url: `${OAUTH2_AUTHORIZATION_CONSENT_BASE_URL}/${id}/form`,
            method: "get",
        });
    },

    /**
     *  添加OAuth2授权同意，记录用户对每个客户端的授权同意情况
     *
     *  @param data OAuth2授权同意，记录用户对每个客户端的授权同意情况表单数据
     */
    create(data: Oauth2AuthorizationConsentForm) {
        return request({
            url: `${OAUTH2_AUTHORIZATION_CONSENT_BASE_URL}`,
            method: "post",
            data,
        });
    },

    /**
     * 更新OAuth2授权同意，记录用户对每个客户端的授权同意情况
     *
     * @param id OAuth2授权同意，记录用户对每个客户端的授权同意情况ID
     * @param data OAuth2授权同意，记录用户对每个客户端的授权同意情况表单数据
     */
     update(id: string, data: Oauth2AuthorizationConsentForm) {
        return request({
            url: `${OAUTH2_AUTHORIZATION_CONSENT_BASE_URL}/${id}`,
            method: "put",
            data,
        });
    },

    /**
     * 批量删除OAuth2授权同意，记录用户对每个客户端的授权同意情况，多个以英文逗号(,)分割
     *
     * @param ids OAuth2授权同意，记录用户对每个客户端的授权同意情况ID字符串，多个以英文逗号(,)分割
     */
     deleteByIds(ids: string) {
        return request({
            url: `${OAUTH2_AUTHORIZATION_CONSENT_BASE_URL}/${ids}`,
            method: "delete",
        });
    }
}

export default Oauth2AuthorizationConsentAPI;

/**
 * Oauth2AuthorizationConsent OAuth2授权同意，记录用户对每个客户端的授权同意情况类型定义
 */

/** OAuth2授权同意，记录用户对每个客户端的授权同意情况分页查询参数 */
export interface Oauth2AuthorizationConsentPageQuery extends PageQuery {
  /** 注册客户端ID，指向oauth2_registered_client表 */
  registeredClientId?: string;
  /** 用户主体名称，用户的唯一标识 */
  principalName?: string;
  /** 用户对该客户端已同意的权限列表，JSON格式存储 */
  authorities?: string;
}

/** OAuth2授权同意，记录用户对每个客户端的授权同意情况表单对象 */
export interface Oauth2AuthorizationConsentForm {
  /** 注册客户端ID，指向oauth2_registered_client表 */
  registeredClientId?: string;
  /** 用户主体名称，用户的唯一标识 */
  principalName?: string;
  /** 用户对该客户端已同意的权限列表，JSON格式存储 */
  authorities?: string;
}

/** OAuth2授权同意，记录用户对每个客户端的授权同意情况分页对象 */
export interface Oauth2AuthorizationConsentPageVo {
  /** 注册客户端ID，指向oauth2_registered_client表 */
  registeredClientId?: string;
  /** 用户主体名称，用户的唯一标识 */
  principalName?: string;
  /** 用户对该客户端已同意的权限列表，JSON格式存储 */
  authorities?: string;
}
