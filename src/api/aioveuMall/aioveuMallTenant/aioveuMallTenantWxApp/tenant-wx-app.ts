import request from "@/utils/request";
// import type { TenantWxAppForm, TenantWxAppPageQuery, TenantWxAppPageVo } from "@/api/types";
import {BaseQueryParams, PageQuery} from "@/types";

const TENANT_WX_APP_BASE_URL = "/aioveu-tenant/api/v1/tenant-wx-app";

const TenantWxAppAPI = {
    /** 获取租户与微信小程序关联分页数据 */
    getPage(queryParams?: TenantWxAppPageQuery) {
        return request<any, PageResult<TenantWxAppPageVo[]>>({
            url: `${TENANT_WX_APP_BASE_URL}/page`,
            method: "get",
            params: queryParams,
        });
    },
    /**
     * 获取租户与微信小程序关联表单数据
     *
     * @param id 租户与微信小程序关联ID
     * @returns 租户与微信小程序关联表单数据
     */
    getFormData(id: number) {
        return request<any, TenantWxAppForm>({
            url: `${TENANT_WX_APP_BASE_URL}/${id}/form`,
            method: "get",
        });
    },

    /**
     *  添加租户与微信小程序关联
     *
     *  @param data 租户与微信小程序关联表单数据
     */
    create(data: TenantWxAppForm) {
        return request({
            url: `${TENANT_WX_APP_BASE_URL}`,
            method: "post",
            data,
        });
    },

    /**
     * 更新租户与微信小程序关联
     *
     * @param id 租户与微信小程序关联ID
     * @param data 租户与微信小程序关联表单数据
     */
     update(id: number, data: TenantWxAppForm) {
        return request({
            url: `${TENANT_WX_APP_BASE_URL}/${id}`,
            method: "put",
            data,
        });
    },

    /**
     * 批量删除租户与微信小程序关联，多个以英文逗号(,)分割
     *
     * @param ids 租户与微信小程序关联ID字符串，多个以英文逗号(,)分割
     */
     deleteByIds(ids: string) {
        return request({
            url: `${TENANT_WX_APP_BASE_URL}/${ids}`,
            method: "delete",
        });
    }
}

export default TenantWxAppAPI;

/**
 * TenantWxApp 租户与微信小程序关联类型定义
 */

/** 租户与微信小程序关联分页查询参数 */
export interface TenantWxAppPageQuery extends PageQuery {
  /** 租户ID */
  tenantId?: number;
  /** 微信小程序ID */
  wxAppid?: string;
  /** 是否为默认小程序 */
  isDefault?: number;
  /** 逻辑删除：0-未删除 1-已删除 */
  isDeleted?: number;
}

/** 租户与微信小程序关联表单对象 */
export interface TenantWxAppForm {
  id?: number;
  /** 租户ID */
  tenantId?: number;
  /** 微信小程序ID */
  wxAppid?: string;
  /** 是否为默认小程序 */
  isDefault?: number;
  /** 逻辑删除：0-未删除 1-已删除 */
  isDeleted?: number;
}

/** 租户与微信小程序关联分页对象 */
export interface TenantWxAppPageVo {
  id?: number;
  /** 租户ID */
  tenantId?: number;
  /** 微信小程序ID */
  wxAppid?: string;
  /** 是否为默认小程序 */
  isDefault?: number;
  /** 逻辑删除：0-未删除 1-已删除 */
  isDeleted?: number;
  /** 创建时间 */
  createTime?: string;
  /** 更新时间 */
  updateTime?: string;
}
