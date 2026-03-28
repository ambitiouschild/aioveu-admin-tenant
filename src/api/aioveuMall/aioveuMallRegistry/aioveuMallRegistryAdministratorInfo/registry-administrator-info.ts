import request from "@/utils/request";
// import type { RegistryAdministratorInfoForm, RegistryAdministratorInfoPageQuery, RegistryAdministratorInfoPageVo } from "@/api/types";
import {BaseQueryParams, PageQuery} from "@/types";
const REGISTRY_ADMINISTRATOR_INFO_BASE_URL = "/aioveu-tenant-registry/api/v1/registry-administrator-info";

const RegistryAdministratorInfoAPI = {
    /** 获取管理员信息分页数据 */
    getPage(queryParams?: RegistryAdministratorInfoPageQuery) {
        return request<any, PageResult<RegistryAdministratorInfoPageVo[]>>({
            url: `${REGISTRY_ADMINISTRATOR_INFO_BASE_URL}/page`,
            method: "get",
            params: queryParams,
        });
    },
    /**
     * 获取管理员信息表单数据
     *
     * @param id 管理员信息ID
     * @returns 管理员信息表单数据
     */
    getFormData(id: number) {
        return request<any, RegistryAdministratorInfoForm>({
            url: `${REGISTRY_ADMINISTRATOR_INFO_BASE_URL}/${id}/form`,
            method: "get",
        });
    },

    /**
     *  添加管理员信息
     *
     *  @param data 管理员信息表单数据
     */
    create(data: RegistryAdministratorInfoForm) {
        return request({
            url: `${REGISTRY_ADMINISTRATOR_INFO_BASE_URL}`,
            method: "post",
            data,
        });
    },

    /**
     * 更新管理员信息
     *
     * @param id 管理员信息ID
     * @param data 管理员信息表单数据
     */
     update(id: number, data: RegistryAdministratorInfoForm) {
        return request({
            url: `${REGISTRY_ADMINISTRATOR_INFO_BASE_URL}/${id}`,
            method: "put",
            data,
        });
    },

    /**
     * 批量删除管理员信息，多个以英文逗号(,)分割
     *
     * @param ids 管理员信息ID字符串，多个以英文逗号(,)分割
     */
     deleteByIds(ids: string) {
        return request({
            url: `${REGISTRY_ADMINISTRATOR_INFO_BASE_URL}/${ids}`,
            method: "delete",
        });
    }
}

export default RegistryAdministratorInfoAPI;

/**
 * RegistryAdministratorInfo 管理员信息类型定义
 */

/** 管理员信息分页查询参数 */
export interface RegistryAdministratorInfoPageQuery extends PageQuery {
  /** 所属租户ID */
  tenantId?: number;
  /** 管理员真实姓名 */
  realName?: string;
  /** 身份证号码 */
  idCardNo?: string;
  /** 手机号码 */
  phone?: string;
}

/** 管理员信息表单对象 */
export interface RegistryAdministratorInfoForm {
  /** 管理员ID */
  id?: number;
  /** 所属租户ID */
  tenantId?: number;
  /** 管理员真实姓名 */
  realName?: string;
  /** 身份证号码 */
  idCardNo?: string;
  /** 身份证正面照片 */
  idCardFrontPath?: string;
  /** 身份证反面照片 */
  idCardBackPath?: string;
  /** 手机号码 */
  phone?: string;
  /** 短信验证码 */
  phoneVerifyCode?: string;
  /** 手机是否已验证：0-未验证，1-已验证 */
  phoneVerified?: number;
  /** 管理员微信OpenID */
  wechatOpenid?: string;
  /** 管理员微信UnionID */
  wechatUnionid?: string;
  /** 微信扫码是否已验证 */
  wechatQrScanned?: number;
  /** 微信扫码验证时间 */
  wechatScannedTime?: string;
}

/** 管理员信息分页对象 */
export interface RegistryAdministratorInfoPageVo {
  /** 管理员ID */
  id?: number;
  /** 所属租户ID */
  tenantId?: number;
  /** 管理员真实姓名 */
  realName?: string;
  /** 身份证号码 */
  idCardNo?: string;
  /** 身份证正面照片 */
  idCardFrontPath?: string;
  /** 身份证反面照片 */
  idCardBackPath?: string;
  /** 手机号码 */
  phone?: string;
  /** 短信验证码 */
  phoneVerifyCode?: string;
  /** 手机是否已验证：0-未验证，1-已验证 */
  phoneVerified?: number;
  /** 管理员微信OpenID */
  wechatOpenid?: string;
  /** 管理员微信UnionID */
  wechatUnionid?: string;
  /** 微信扫码是否已验证 */
  wechatQrScanned?: number;
  /** 微信扫码验证时间 */
  wechatScannedTime?: string;
  /** 逻辑删除：0-未删除 1-已删除 */
  isDeleted?: number;
  /** 创建时间 */
  createTime?: string;
  /** 更新时间 */
  updateTime?: string;
}
