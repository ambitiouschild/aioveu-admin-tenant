import request from "@/utils/request";
// import type { RegistryCertificationForm, RegistryCertificationPageQuery, RegistryCertificationPageVo } from "@/api/types";
import {BaseQueryParams, PageQuery} from "@/types";
const REGISTRY_CERTIFICATION_BASE_URL = "/aioveu-tenant-registry/api/v1/registry-certification";

const RegistryCertificationAPI = {
    /** 获取认证记录分页数据 */
    getPage(queryParams?: RegistryCertificationPageQuery) {
        return request<any, PageResult<RegistryCertificationPageVo[]>>({
            url: `${REGISTRY_CERTIFICATION_BASE_URL}/page`,
            method: "get",
            params: queryParams,
        });
    },
    /**
     * 获取认证记录表单数据
     *
     * @param id 认证记录ID
     * @returns 认证记录表单数据
     */
    getFormData(id: number) {
        return request<any, RegistryCertificationForm>({
            url: `${REGISTRY_CERTIFICATION_BASE_URL}/${id}/form`,
            method: "get",
        });
    },

    /**
     *  添加认证记录
     *
     *  @param data 认证记录表单数据
     */
    create(data: RegistryCertificationForm) {
        return request({
            url: `${REGISTRY_CERTIFICATION_BASE_URL}`,
            method: "post",
            data,
        });
    },

    /**
     * 更新认证记录
     *
     * @param id 认证记录ID
     * @param data 认证记录表单数据
     */
     update(id: number, data: RegistryCertificationForm) {
        return request({
            url: `${REGISTRY_CERTIFICATION_BASE_URL}/${id}`,
            method: "put",
            data,
        });
    },

    /**
     * 批量删除认证记录，多个以英文逗号(,)分割
     *
     * @param ids 认证记录ID字符串，多个以英文逗号(,)分割
     */
     deleteByIds(ids: string) {
        return request({
            url: `${REGISTRY_CERTIFICATION_BASE_URL}/${ids}`,
            method: "delete",
        });
    }
}

export default RegistryCertificationAPI;


/**
 * RegistryCertification 认证记录类型定义
 */

/** 认证记录分页查询参数 */
export interface RegistryCertificationPageQuery extends PageQuery {
  /** 所属租户ID */
  tenantId?: number;
  /** 小程序账号ID */
  appAccountId?: number;
  /** 认证状态：0-未开始，1-申请中，2-审核中，3-审核通过，4-审核失败，5-已过期 */
  certificationStatus?: number;
  /** 审核时间 */
  auditTime?: string;
}

/** 认证记录表单对象 */
export interface RegistryCertificationForm {
  /** 认证ID  */
  id?: number;
  /** 所属租户ID */
  tenantId?: number;
  /** 小程序账号ID */
  appAccountId?: number;
  /** 认证类型：1-微信认证 */
  certificationType?: number;
  /** 认证状态：0-未开始，1-申请中，2-审核中，3-审核通过，4-审核失败，5-已过期 */
  certificationStatus?: number;
  /** 申请时间 */
  applyTime?: string;
  /** 审核时间 */
  auditTime?: string;
  /** 过期时间 */
  expireTime?: string;
  /** 认证费用 */
  certificationFee?: number;
  /** 支付状态：0-未支付，1-支付中，2-支付成功，3-支付失败 */
  paymentStatus?: number;
  /** 支付时间 */
  paymentTime?: string;
  /** 支付订单号 */
  paymentOrderNo?: string;
  /** 审核驳回原因 */
  rejectionReason?: string;
  /** 审核备注 */
  auditRemark?: string;
}

/** 认证记录分页对象 */
export interface RegistryCertificationPageVo {
  /** 认证ID  */
  id?: number;
  /** 所属租户ID */
  tenantId?: number;
  /** 小程序账号ID */
  appAccountId?: number;
  /** 认证类型：1-微信认证 */
  certificationType?: number;
  /** 认证状态：0-未开始，1-申请中，2-审核中，3-审核通过，4-审核失败，5-已过期 */
  certificationStatus?: number;
  /** 申请时间 */
  applyTime?: string;
  /** 审核时间 */
  auditTime?: string;
  /** 过期时间 */
  expireTime?: string;
  /** 认证费用 */
  certificationFee?: number;
  /** 支付状态：0-未支付，1-支付中，2-支付成功，3-支付失败 */
  paymentStatus?: number;
  /** 支付时间 */
  paymentTime?: string;
  /** 支付订单号 */
  paymentOrderNo?: string;
  /** 审核驳回原因 */
  rejectionReason?: string;
  /** 审核备注 */
  auditRemark?: string;
  /** 逻辑删除：0-未删除 1-已删除 */
  isDeleted?: number;
  /** 创建时间 */
  createTime?: string;
  /** 更新时间 */
  updateTime?: string;
}
