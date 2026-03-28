import request from "@/utils/request";
// import type { RegistryAppFilingRecordForm, RegistryAppFilingRecordPageQuery, RegistryAppFilingRecordPageVo } from "@/api/types";
import {BaseQueryParams, PageQuery} from "@/types";
const REGISTRY_APP_FILING_RECORD_BASE_URL = "/aioveu-tenant-registry/api/v1/registry-app-filing-record";

const RegistryAppFilingRecordAPI = {
    /** 获取小程序备案记录分页数据 */
    getPage(queryParams?: RegistryAppFilingRecordPageQuery) {
        return request<any, PageResult<RegistryAppFilingRecordPageVo[]>>({
            url: `${REGISTRY_APP_FILING_RECORD_BASE_URL}/page`,
            method: "get",
            params: queryParams,
        });
    },
    /**
     * 获取小程序备案记录表单数据
     *
     * @param id 小程序备案记录ID
     * @returns 小程序备案记录表单数据
     */
    getFormData(id: number) {
        return request<any, RegistryAppFilingRecordForm>({
            url: `${REGISTRY_APP_FILING_RECORD_BASE_URL}/${id}/form`,
            method: "get",
        });
    },

    /**
     *  添加小程序备案记录
     *
     *  @param data 小程序备案记录表单数据
     */
    create(data: RegistryAppFilingRecordForm) {
        return request({
            url: `${REGISTRY_APP_FILING_RECORD_BASE_URL}`,
            method: "post",
            data,
        });
    },

    /**
     * 更新小程序备案记录
     *
     * @param id 小程序备案记录ID
     * @param data 小程序备案记录表单数据
     */
     update(id: number, data: RegistryAppFilingRecordForm) {
        return request({
            url: `${REGISTRY_APP_FILING_RECORD_BASE_URL}/${id}`,
            method: "put",
            data,
        });
    },

    /**
     * 批量删除小程序备案记录，多个以英文逗号(,)分割
     *
     * @param ids 小程序备案记录ID字符串，多个以英文逗号(,)分割
     */
     deleteByIds(ids: string) {
        return request({
            url: `${REGISTRY_APP_FILING_RECORD_BASE_URL}/${ids}`,
            method: "delete",
        });
    }
}

export default RegistryAppFilingRecordAPI;


/**
 * RegistryAppFilingRecord 小程序备案记录类型定义
 */

/** 小程序备案记录分页查询参数 */
export interface RegistryAppFilingRecordPageQuery extends PageQuery {
  /** 所属租户ID */
  tenantId?: number;
  /** 小程序账号ID */
  appAccountId?: number;
  /** 备案类型：1-首次备案，2-变更备案，3-注销备案 */
  filingType?: number;
  /** 备案状态：0-未备案，1-备案中，2-备案通过，3-备案驳回，4-已注销 */
  filingStatus?: number;
  /** 备案编号 */
  filingNo?: string;
  /** 备案主体 */
  filingSubject?: string;
  /** 备案小程序名称 */
  filingAppName?: string;
  /** 备案申请时间 */
  applyTime?: string;
}

/** 小程序备案记录表单对象 */
export interface RegistryAppFilingRecordForm {
  /** 备案ID */
  id?: number;
  /** 所属租户ID */
  tenantId?: number;
  /** 小程序账号ID */
  appAccountId?: number;
  /** 备案类型：1-首次备案，2-变更备案，3-注销备案 */
  filingType?: number;
  /** 备案状态：0-未备案，1-备案中，2-备案通过，3-备案驳回，4-已注销 */
  filingStatus?: number;
  /** 备案编号 */
  filingNo?: string;
  /** 备案主体 */
  filingSubject?: string;
  /** 备案小程序名称 */
  filingAppName?: string;
  /** 备案域名 */
  filingDomain?: string;
  /** 备案IP */
  filingIp?: string;
  /** 备案证书路径 */
  filingCertificatePath?: string;
  /** 备案申请时间 */
  applyTime?: string;
  /** 备案审核时间 */
  auditTime?: string;
  /** 备案驳回原因 */
  rejectionReason?: string;
  /** 备案到期时间 */
  expireTime?: string;
}

/** 小程序备案记录分页对象 */
export interface RegistryAppFilingRecordPageVo {
  /** 备案ID */
  id?: number;
  /** 所属租户ID */
  tenantId?: number;
  /** 小程序账号ID */
  appAccountId?: number;
  /** 备案类型：1-首次备案，2-变更备案，3-注销备案 */
  filingType?: number;
  /** 备案状态：0-未备案，1-备案中，2-备案通过，3-备案驳回，4-已注销 */
  filingStatus?: number;
  /** 备案编号 */
  filingNo?: string;
  /** 备案主体 */
  filingSubject?: string;
  /** 备案小程序名称 */
  filingAppName?: string;
  /** 备案域名 */
  filingDomain?: string;
  /** 备案IP */
  filingIp?: string;
  /** 备案证书路径 */
  filingCertificatePath?: string;
  /** 备案申请时间 */
  applyTime?: string;
  /** 备案审核时间 */
  auditTime?: string;
  /** 备案驳回原因 */
  rejectionReason?: string;
  /** 备案到期时间 */
  expireTime?: string;
  /** 逻辑删除：0-未删除 1-已删除 */
  isDeleted?: number;
  /** 创建时间 */
  createTime?: string;
  /** 更新时间 */
  updateTime?: string;
}
