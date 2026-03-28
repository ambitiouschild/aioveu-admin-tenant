import request from "@/utils/request";
// import type { RegistryInvoiceInfoForm, RegistryInvoiceInfoPageQuery, RegistryInvoiceInfoPageVo } from "@/api/types";
import {BaseQueryParams, PageQuery} from "@/types";
const REGISTRY_INVOICE_INFO_BASE_URL = "/aioveu-tenant-registry/api/v1/registry-invoice-info";

const RegistryInvoiceInfoAPI = {
    /** 获取发票信息分页数据 */
    getPage(queryParams?: RegistryInvoiceInfoPageQuery) {
        return request<any, PageResult<RegistryInvoiceInfoPageVo[]>>({
            url: `${REGISTRY_INVOICE_INFO_BASE_URL}/page`,
            method: "get",
            params: queryParams,
        });
    },
    /**
     * 获取发票信息表单数据
     *
     * @param id 发票信息ID
     * @returns 发票信息表单数据
     */
    getFormData(id: number) {
        return request<any, RegistryInvoiceInfoForm>({
            url: `${REGISTRY_INVOICE_INFO_BASE_URL}/${id}/form`,
            method: "get",
        });
    },

    /**
     *  添加发票信息
     *
     *  @param data 发票信息表单数据
     */
    create(data: RegistryInvoiceInfoForm) {
        return request({
            url: `${REGISTRY_INVOICE_INFO_BASE_URL}`,
            method: "post",
            data,
        });
    },

    /**
     * 更新发票信息
     *
     * @param id 发票信息ID
     * @param data 发票信息表单数据
     */
     update(id: number, data: RegistryInvoiceInfoForm) {
        return request({
            url: `${REGISTRY_INVOICE_INFO_BASE_URL}/${id}`,
            method: "put",
            data,
        });
    },

    /**
     * 批量删除发票信息，多个以英文逗号(,)分割
     *
     * @param ids 发票信息ID字符串，多个以英文逗号(,)分割
     */
     deleteByIds(ids: string) {
        return request({
            url: `${REGISTRY_INVOICE_INFO_BASE_URL}/${ids}`,
            method: "delete",
        });
    }
}

export default RegistryInvoiceInfoAPI;


/**
 * RegistryInvoiceInfo 发票信息类型定义
 */

/** 发票信息分页查询参数 */
export interface RegistryInvoiceInfoPageQuery extends PageQuery {
  /** 所属租户ID */
  tenantId?: number;
  /** 认证记录ID */
  certificationId?: number;
  /** 发票类型：1-电子发票，2-纸质发票 */
  invoiceType?: number;
  /** 发票抬头 */
  invoiceTitle?: string;
  /** 纳税人识别号 */
  taxIdentificationNo?: string;
  /** 开票状态：0-未开票，1-开票中，2-已开票，3-已寄送 */
  invoiceStatus?: number;
}

/** 发票信息表单对象 */
export interface RegistryInvoiceInfoForm {
  /** 发票ID */
  id?: number;
  /** 所属租户ID */
  tenantId?: number;
  /** 认证记录ID */
  certificationId?: number;
  /** 发票类型：1-电子发票，2-纸质发票 */
  invoiceType?: number;
  /** 发票抬头 */
  invoiceTitle?: string;
  /** 纳税人识别号 */
  taxIdentificationNo?: string;
  /** 发票备注 */
  invoiceRemark?: string;
  /** 电子发票接收邮箱 */
  invoiceEmail?: string;
  /** 收件人姓名 */
  receiverName?: string;
  /** 收件人电话 */
  receiverPhone?: string;
  /** 收件地址 */
  receiverAddress?: string;
  /** 开票状态：0-未开票，1-开票中，2-已开票，3-已寄送 */
  invoiceStatus?: number;
  /** 开票时间 */
  invoiceTime?: string;
  /** 电子发票URL */
  invoiceUrl?: string;
  /** 快递单号 */
  expressNo?: string;
}

/** 发票信息分页对象 */
export interface RegistryInvoiceInfoPageVo {
  /** 发票ID */
  id?: number;
  /** 所属租户ID */
  tenantId?: number;
  /** 认证记录ID */
  certificationId?: number;
  /** 发票类型：1-电子发票，2-纸质发票 */
  invoiceType?: number;
  /** 发票抬头 */
  invoiceTitle?: string;
  /** 纳税人识别号 */
  taxIdentificationNo?: string;
  /** 发票备注 */
  invoiceRemark?: string;
  /** 电子发票接收邮箱 */
  invoiceEmail?: string;
  /** 收件人姓名 */
  receiverName?: string;
  /** 收件人电话 */
  receiverPhone?: string;
  /** 收件地址 */
  receiverAddress?: string;
  /** 开票状态：0-未开票，1-开票中，2-已开票，3-已寄送 */
  invoiceStatus?: number;
  /** 开票时间 */
  invoiceTime?: string;
  /** 电子发票URL */
  invoiceUrl?: string;
  /** 快递单号 */
  expressNo?: string;
  /** 逻辑删除：0-未删除 1-已删除 */
  isDeleted?: number;
  /** 创建时间 */
  createTime?: string;
  /** 更新时间 */
  updateTime?: string;
}
