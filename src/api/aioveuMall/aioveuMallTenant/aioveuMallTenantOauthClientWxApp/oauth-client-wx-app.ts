import request from "@/utils/request";
// import type { OauthClientWxAppForm, OauthClientWxAppPageQuery, OauthClientWxAppPageVo } from "@/api/types";
import {BaseQueryParams, PageQuery} from "@/types";
const OAUTH_CLIENT_WX_APP_BASE_URL = "/aioveu-tenant/api/v1/oauth-client-wx-app";

const OauthClientWxAppAPI = {
    /** 获取OAuth2客户端与微信小程序映射分页数据 */
    getPage(queryParams?: OauthClientWxAppPageQuery) {
        return request<any, PageResult<OauthClientWxAppPageVo[]>>({
            url: `${OAUTH_CLIENT_WX_APP_BASE_URL}/page`,
            method: "get",
            params: queryParams,
        });
    },
    /**
     * 获取OAuth2客户端与微信小程序映射表单数据
     *
     * @param id OAuth2客户端与微信小程序映射ID
     * @returns OAuth2客户端与微信小程序映射表单数据
     */
    getFormData(id: number) {
        return request<any, OauthClientWxAppForm>({
            url: `${OAUTH_CLIENT_WX_APP_BASE_URL}/${id}/form`,
            method: "get",
        });
    },

    /**
     *  添加OAuth2客户端与微信小程序映射
     *
     *  @param data OAuth2客户端与微信小程序映射表单数据
     */
    create(data: OauthClientWxAppForm) {
        return request({
            url: `${OAUTH_CLIENT_WX_APP_BASE_URL}`,
            method: "post",
            data,
        });
    },

    /**
     * 更新OAuth2客户端与微信小程序映射
     *
     * @param id OAuth2客户端与微信小程序映射ID
     * @param data OAuth2客户端与微信小程序映射表单数据
     */
     update(id: number, data: OauthClientWxAppForm) {
        return request({
            url: `${OAUTH_CLIENT_WX_APP_BASE_URL}/${id}`,
            method: "put",
            data,
        });
    },

    /**
     * 批量删除OAuth2客户端与微信小程序映射，多个以英文逗号(,)分割
     *
     * @param ids OAuth2客户端与微信小程序映射ID字符串，多个以英文逗号(,)分割
     */
     deleteByIds(ids: string) {
        return request({
            url: `${OAUTH_CLIENT_WX_APP_BASE_URL}/${ids}`,
            method: "delete",
        });
    }
}

export default OauthClientWxAppAPI;

/**
 * OauthClientWxApp OAuth2客户端与微信小程序映射类型定义
 */

/** OAuth2客户端与微信小程序映射分页查询参数 */
export interface OauthClientWxAppPageQuery extends PageQuery {
  /** OAuth2 client客户端 ID */
  clientId?: string;
  /** 微信小程序appid */
  wxAppid?: string;
  /** 逻辑删除：0-未删除 1-已删除 */
  isDeleted?: number;
}

/** OAuth2客户端与微信小程序映射表单对象 */
export interface OauthClientWxAppForm {
  id?: number;
  /** OAuth2 client客户端 ID */
  clientId?: string;
  /** 微信小程序appid */
  wxAppid?: string;
  /** 逻辑删除：0-未删除 1-已删除 */
  isDeleted?: number;
}

/** OAuth2客户端与微信小程序映射分页对象 */
export interface OauthClientWxAppPageVo {
  id?: number;
  /** OAuth2 client客户端 ID */
  clientId?: string;
  /** 微信小程序appid */
  wxAppid?: string;
  /** 逻辑删除：0-未删除 1-已删除 */
  isDeleted?: number;
  /** 创建时间 */
  createTime?: string;
  /** 更新时间 */
  updateTime?: string;
}
