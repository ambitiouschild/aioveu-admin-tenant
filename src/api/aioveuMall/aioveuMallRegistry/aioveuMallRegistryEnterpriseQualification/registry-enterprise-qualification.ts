import request from "@/utils/request";
// import type { RegistryEnterpriseQualificationForm, RegistryEnterpriseQualificationPageQuery, RegistryEnterpriseQualificationPageVo } from "@/api/types";
import {BaseQueryParams, PageQuery} from "@/types";
const REGISTRY_ENTERPRISE_QUALIFICATION_BASE_URL = "/aioveu-tenant-registry/api/v1/registry-enterprise-qualification";

const RegistryEnterpriseQualificationAPI = {
    /** 获取企业资质分页数据 */
    getPage(queryParams?: RegistryEnterpriseQualificationPageQuery) {
        return request<any, PageResult<RegistryEnterpriseQualificationPageVo[]>>({
            url: `${REGISTRY_ENTERPRISE_QUALIFICATION_BASE_URL}/page`,
            method: "get",
            params: queryParams,
        });
    },
    /**
     * 获取企业资质表单数据
     *
     * @param id 企业资质ID
     * @returns 企业资质表单数据
     */
    getFormData(id: number) {
        return request<any, RegistryEnterpriseQualificationForm>({
            url: `${REGISTRY_ENTERPRISE_QUALIFICATION_BASE_URL}/${id}/form`,
            method: "get",
        });
    },

    /**
     *  添加企业资质
     *
     *  @param data 企业资质表单数据
     */
    create(data: RegistryEnterpriseQualificationForm) {
        return request({
            url: `${REGISTRY_ENTERPRISE_QUALIFICATION_BASE_URL}`,
            method: "post",
            data,
        });
    },

    /**
     * 更新企业资质
     *
     * @param id 企业资质ID
     * @param data 企业资质表单数据
     */
     update(id: number, data: RegistryEnterpriseQualificationForm) {
        return request({
            url: `${REGISTRY_ENTERPRISE_QUALIFICATION_BASE_URL}/${id}`,
            method: "put",
            data,
        });
    },

    /**
     * 批量删除企业资质，多个以英文逗号(,)分割
     *
     * @param ids 企业资质ID字符串，多个以英文逗号(,)分割
     */
     deleteByIds(ids: string) {
        return request({
            url: `${REGISTRY_ENTERPRISE_QUALIFICATION_BASE_URL}/${ids}`,
            method: "delete",
        });
    }
}

export default RegistryEnterpriseQualificationAPI;

/**
 * RegistryEnterpriseQualification 企业资质类型定义
 */

/** 企业资质分页查询参数 */
export interface RegistryEnterpriseQualificationPageQuery extends PageQuery {
  /** 所属租户ID */
  tenantId?: number;
  /** 企业名称（营业执照全称） */
  enterpriseName?: string;
  /** 营业执照注册号/统一社会信用代码 */
  businessLicenseNo?: string;
  /** 主体验证方式：1-小额打款，2-微信认证，3-电子营业执照 */
  verificationType?: number;
  /** 验证状态：0-未验证，1-验证中，2-验证成功，3-验证失败 */
  verificationStatus?: number;
}

/** 企业资质表单对象 */
export interface RegistryEnterpriseQualificationForm {
  /** 资质ID */
  id?: number;
  /** 所属租户ID */
  tenantId?: number;
  /** 企业名称（营业执照全称） */
  enterpriseName?: string;
  /** 营业执照注册号/统一社会信用代码 */
  businessLicenseNo?: string;
  /** 营业执照照片路径 */
  businessLicenseUrl?: string;
  /** 其他证明材料（JSON数组） */
  otherCertificates?: string;
  /** 主体验证方式：1-小额打款，2-微信认证，3-电子营业执照 */
  verificationType?: number;
  /** 小额打款金额 */
  verificationAmount?: number;
  /** 验证状态：0-未验证，1-验证中，2-验证成功，3-验证失败 */
  verificationStatus?: number;
  /** 验证时间 */
  verificationTime?: string;
}

/** 企业资质分页对象 */
export interface RegistryEnterpriseQualificationPageVo {
  /** 资质ID */
  id?: number;
  /** 所属租户ID */
  tenantId?: number;
  /** 企业名称（营业执照全称） */
  enterpriseName?: string;
  /** 营业执照注册号/统一社会信用代码 */
  businessLicenseNo?: string;
  /** 营业执照照片路径 */
  businessLicenseUrl?: string;
  /** 其他证明材料（JSON数组） */
  otherCertificates?: string;
  /** 主体验证方式：1-小额打款，2-微信认证，3-电子营业执照 */
  verificationType?: number;
  /** 小额打款金额 */
  verificationAmount?: number;
  /** 验证状态：0-未验证，1-验证中，2-验证成功，3-验证失败 */
  verificationStatus?: number;
  /** 验证时间 */
  verificationTime?: string;
  /** 逻辑删除：0-未删除 1-已删除 */
  isDeleted?: number;
  /** 创建时间 */
  createTime?: string;
  /** 更新时间 */
  updateTime?: string;
}
