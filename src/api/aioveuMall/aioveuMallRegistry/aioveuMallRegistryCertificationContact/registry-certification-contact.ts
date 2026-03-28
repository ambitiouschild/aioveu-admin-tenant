import request from "@/utils/request";
// import type { RegistryCertificationContactForm, RegistryCertificationContactPageQuery, RegistryCertificationContactPageVo } from "@/api/types";
import {BaseQueryParams, PageQuery} from "@/types";
const REGISTRY_CERTIFICATION_CONTACT_BASE_URL = "/aioveu-tenant-registry/api/v1/registry-certification-contact";

const RegistryCertificationContactAPI = {
    /** 获取认证联系人分页数据 */
    getPage(queryParams?: RegistryCertificationContactPageQuery) {
        return request<any, PageResult<RegistryCertificationContactPageVo[]>>({
            url: `${REGISTRY_CERTIFICATION_CONTACT_BASE_URL}/page`,
            method: "get",
            params: queryParams,
        });
    },
    /**
     * 获取认证联系人表单数据
     *
     * @param id 认证联系人ID
     * @returns 认证联系人表单数据
     */
    getFormData(id: number) {
        return request<any, RegistryCertificationContactForm>({
            url: `${REGISTRY_CERTIFICATION_CONTACT_BASE_URL}/${id}/form`,
            method: "get",
        });
    },

    /**
     *  添加认证联系人
     *
     *  @param data 认证联系人表单数据
     */
    create(data: RegistryCertificationContactForm) {
        return request({
            url: `${REGISTRY_CERTIFICATION_CONTACT_BASE_URL}`,
            method: "post",
            data,
        });
    },

    /**
     * 更新认证联系人
     *
     * @param id 认证联系人ID
     * @param data 认证联系人表单数据
     */
     update(id: number, data: RegistryCertificationContactForm) {
        return request({
            url: `${REGISTRY_CERTIFICATION_CONTACT_BASE_URL}/${id}`,
            method: "put",
            data,
        });
    },

    /**
     * 批量删除认证联系人，多个以英文逗号(,)分割
     *
     * @param ids 认证联系人ID字符串，多个以英文逗号(,)分割
     */
     deleteByIds(ids: string) {
        return request({
            url: `${REGISTRY_CERTIFICATION_CONTACT_BASE_URL}/${ids}`,
            method: "delete",
        });
    }
}

export default RegistryCertificationContactAPI;

/**
 * RegistryCertificationContact 认证联系人类型定义
 */

/** 认证联系人分页查询参数 */
export interface RegistryCertificationContactPageQuery extends PageQuery {
  /** 所属租户ID */
  tenantId?: number;
  /** 认证记录ID */
  certificationId?: number;
  /** 联系人姓名 */
  contactName?: string;
  /** 联系人身份证号 */
  contactIdCard?: string;
  /** 联系人手机号 */
  contactPhone?: string;
}

/** 认证联系人表单对象 */
export interface RegistryCertificationContactForm {
  /** 联系人ID */
  id?: number;
  /** 所属租户ID */
  tenantId?: number;
  /** 认证记录ID */
  certificationId?: number;
  /** 联系人姓名 */
  contactName?: string;
  /** 联系人身份证号 */
  contactIdCard?: string;
  /** 联系人手机号 */
  contactPhone?: string;
  /** 联系人短信验证码 */
  contactPhoneVerifyCode?: string;
  /** 联系人座机（含分机） */
  contactLandline?: string;
  /** 联系人微信OpenID */
  contactWechatOpenid?: string;
  /** 联系人微信扫码是否验证 */
  contactWechatScanned?: number;
}

/** 认证联系人分页对象 */
export interface RegistryCertificationContactPageVo {
  /** 联系人ID */
  id?: number;
  /** 所属租户ID */
  tenantId?: number;
  /** 认证记录ID */
  certificationId?: number;
  /** 联系人姓名 */
  contactName?: string;
  /** 联系人身份证号 */
  contactIdCard?: string;
  /** 联系人手机号 */
  contactPhone?: string;
  /** 联系人短信验证码 */
  contactPhoneVerifyCode?: string;
  /** 联系人座机（含分机） */
  contactLandline?: string;
  /** 联系人微信OpenID */
  contactWechatOpenid?: string;
  /** 联系人微信扫码是否验证 */
  contactWechatScanned?: number;
  /** 逻辑删除：0-未删除 1-已删除 */
  isDeleted?: number;
  /** 创建时间 */
  createTime?: string;
  /** 更新时间 */
  updateTime?: string;
}
