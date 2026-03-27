import request from "@/utils/request";
// import type { RegistryTenantForm, RegistryTenantPageQuery, RegistryTenantPageVo } from "@/api/types";
import {BaseQueryParams, PageQuery} from "@/types";
const REGISTRY_TENANT_BASE_URL = "/api/v1/registry-tenant";

const RegistryTenantAPI = {
    /** 获取租户注册小程序基本信息分页数据 */
    getPage(queryParams?: RegistryTenantPageQuery) {
        return request<any, PageResult<RegistryTenantPageVo[]>>({
            url: `${REGISTRY_TENANT_BASE_URL}/page`,
            method: "get",
            params: queryParams,
        });
    },
    /**
     * 获取租户注册小程序基本信息表单数据
     *
     * @param id 租户注册小程序基本信息ID
     * @returns 租户注册小程序基本信息表单数据
     */
    getFormData(id: number) {
        return request<any, RegistryTenantForm>({
            url: `${REGISTRY_TENANT_BASE_URL}/${id}/form`,
            method: "get",
        });
    },

    /**
     *  添加租户注册小程序基本信息
     *
     *  @param data 租户注册小程序基本信息表单数据
     */
    create(data: RegistryTenantForm) {
        return request({
            url: `${REGISTRY_TENANT_BASE_URL}`,
            method: "post",
            data,
        });
    },

    /**
     * 更新租户注册小程序基本信息
     *
     * @param id 租户注册小程序基本信息ID
     * @param data 租户注册小程序基本信息表单数据
     */
     update(id: number, data: RegistryTenantForm) {
        return request({
            url: `${REGISTRY_TENANT_BASE_URL}/${id}`,
            method: "put",
            data,
        });
    },

    /**
     * 批量删除租户注册小程序基本信息，多个以英文逗号(,)分割
     *
     * @param ids 租户注册小程序基本信息ID字符串，多个以英文逗号(,)分割
     */
     deleteByIds(ids: string) {
        return request({
            url: `${REGISTRY_TENANT_BASE_URL}/${ids}`,
            method: "delete",
        });
    }
}

export default RegistryTenantAPI;

/**
 * RegistryTenant 租户注册小程序基本信息类型定义
 */

/** 租户注册小程序基本信息分页查询参数 */
export interface RegistryTenantPageQuery extends PageQuery {
  /** 租户ID */
  tenantId?: number;
  /** 租户唯一编码 */
  tenantCode?: string;
  /** 租户注册状态：0-未注册，1-已注册，2-已认证，3-已备案，4-已禁用 */
  tenantRegistryStatus?: number;
}

/** 租户注册小程序基本信息表单对象 */
export interface RegistryTenantForm {
  id?: number;
  /** 租户ID */
  tenantId?: number;
  /** 租户唯一编码 */
  tenantCode?: string;
  /** 主体类型：1-企业，2-个体工商户，3-政府/媒体，4-其他组织，5-个人 */
  tenantType?: string;
  /** 行业类别/小程序类目 */
  businessType?: string;
  /** 注册国家/地区 */
  countryRegion?: string;
  /** 租户注册状态：0-未注册，1-已注册，2-已认证，3-已备案，4-已禁用 */
  tenantRegistryStatus?: number;
}

/** 租户注册小程序基本信息分页对象 */
export interface RegistryTenantPageVo {
  id?: number;
  /** 租户ID */
  tenantId?: number;
  /** 租户唯一编码 */
  tenantCode?: string;
  /** 主体类型：1-企业，2-个体工商户，3-政府/媒体，4-其他组织，5-个人 */
  tenantType?: string;
  /** 行业类别/小程序类目 */
  businessType?: string;
  /** 注册国家/地区 */
  countryRegion?: string;
  /** 租户注册状态：0-未注册，1-已注册，2-已认证，3-已备案，4-已禁用 */
  tenantRegistryStatus?: number;
  /** 逻辑删除：0-未删除 1-已删除 */
  isDeleted?: number;
  /** 创建时间 */
  createTime?: string;
  /** 更新时间 */
  updateTime?: string;
}
