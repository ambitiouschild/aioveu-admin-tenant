import request from "@/utils/request";
// import type { Oauth2RegisteredClientBizForm, Oauth2RegisteredClientBizPageQuery, Oauth2RegisteredClientBizPageVo } from "@/api/types";
import { BaseQueryParams, PageQuery } from "@/types";
const OAUTH2_REGISTERED_CLIENT_BIZ_BASE_URL =
  "/aioveu/api/v8/admin/auth/oauth2-registered-client-biz";

const Oauth2RegisteredClientBizAPI = {
  /** 获取OAuth2 客户端业务状态（auth 服务本地校验用）分页数据 */
  getPage(queryParams?: Oauth2RegisteredClientBizPageQuery) {
    return request<any, PageResult<Oauth2RegisteredClientBizPageVo[]>>({
      url: `${OAUTH2_REGISTERED_CLIENT_BIZ_BASE_URL}/page`,
      method: "get",
      params: queryParams,
    });
  },
  /**
   * 获取OAuth2 客户端业务状态（auth 服务本地校验用）表单数据
   *
   * @param id OAuth2 客户端业务状态（auth 服务本地校验用）ID
   * @returns OAuth2 客户端业务状态（auth 服务本地校验用）表单数据
   */
  getFormData(id: number) {
    return request<any, Oauth2RegisteredClientBizForm>({
      url: `${OAUTH2_REGISTERED_CLIENT_BIZ_BASE_URL}/${id}/form`,
      method: "get",
    });
  },

  /**
   *  添加OAuth2 客户端业务状态（auth 服务本地校验用）
   *
   *  @param data OAuth2 客户端业务状态（auth 服务本地校验用）表单数据
   */
  create(data: Oauth2RegisteredClientBizForm) {
    return request({
      url: `${OAUTH2_REGISTERED_CLIENT_BIZ_BASE_URL}`,
      method: "post",
      data,
    });
  },

  /**
   * 更新OAuth2 客户端业务状态（auth 服务本地校验用）
   *
   * @param id OAuth2 客户端业务状态（auth 服务本地校验用）ID
   * @param data OAuth2 客户端业务状态（auth 服务本地校验用）表单数据
   */
  update(id: number, data: Oauth2RegisteredClientBizForm) {
    return request({
      url: `${OAUTH2_REGISTERED_CLIENT_BIZ_BASE_URL}/${id}`,
      method: "put",
      data,
    });
  },

  /**
   * 批量删除OAuth2 客户端业务状态（auth 服务本地校验用），多个以英文逗号(,)分割
   *
   * @param ids OAuth2 客户端业务状态（auth 服务本地校验用）ID字符串，多个以英文逗号(,)分割
   */
  deleteByIds(ids: string) {
    return request({
      url: `${OAUTH2_REGISTERED_CLIENT_BIZ_BASE_URL}/${ids}`,
      method: "delete",
    });
  },
};

export default Oauth2RegisteredClientBizAPI;

/**
 * Oauth2RegisteredClientBiz OAuth2 客户端业务状态（auth 服务本地校验用）类型定义
 */

/** OAuth2 客户端业务状态（auth 服务本地校验用）分页查询参数 */
export interface Oauth2RegisteredClientBizPageQuery extends PageQuery {
  /** OAuth2 客户端ID */
  clientId?: string;
  /** 租户ID */
  tenantId?: number;
  /** 是否启用：1-启用 0-禁用 */
  enabled?: number;
  /** 逻辑删除：0-未删除 1-已删除 */
  isDeleted?: number;
}

/** OAuth2 客户端业务状态（auth 服务本地校验用）表单对象 */
export interface Oauth2RegisteredClientBizForm {
  /** 主键ID */
  id?: number;
  /** OAuth2 客户端ID */
  clientId?: string;
  /** 租户ID */
  tenantId?: number;
  /** 是否启用：1-启用 0-禁用 */
  enabled?: number;
  /** 备注 */
  remark?: string;
}

/** OAuth2 客户端业务状态（auth 服务本地校验用）分页对象 */
export interface Oauth2RegisteredClientBizPageVo {
  /** 主键ID */
  id?: number;
  /** OAuth2 客户端ID */
  clientId?: string;
  /** 租户ID */
  tenantId?: number;
  /** 是否启用：1-启用 0-禁用 */
  enabled?: number;
  /** 备注 */
  remark?: string;
  /** 逻辑删除：0-未删除 1-已删除 */
  isDeleted?: number;
  /** 创建时间 */
  createTime?: string;
  /** 更新时间 */
  updateTime?: string;
}
