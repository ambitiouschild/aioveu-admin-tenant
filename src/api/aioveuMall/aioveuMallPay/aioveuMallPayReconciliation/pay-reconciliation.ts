import request from "@/utils/request";
import {BaseQueryParams, PageQuery} from "@/types";

const PAYRECONCILIATION_BASE_URL = "/aioveu-tenant-pay/api/v1/pay-reconciliation";

const PayReconciliationAPI = {
    /** 获取支付对账分页数据 */
    getPage(queryParams?: PayReconciliationPageQuery) {
        return request<any, PageResult<PayReconciliationPageVO[]>>({
            url: `${PAYRECONCILIATION_BASE_URL}/page`,
            method: "get",
            params: queryParams,
        });
    },
    /**
     * 获取支付对账表单数据
     *
     * @param id 支付对账ID
     * @returns 支付对账表单数据
     */
    getFormData(id: number) {
        return request<any, PayReconciliationForm>({
            url: `${PAYRECONCILIATION_BASE_URL}/${id}/form`,
            method: "get",
        });
    },

    /**
     *  添加支付对账
     *
     *  @param data 支付对账表单数据
     */
    add(data: PayReconciliationForm) {
        return request({
            url: `${PAYRECONCILIATION_BASE_URL}`,
            method: "post",
            data: data,
        });
    },

    /**
     * 更新支付对账
     *
     * @param id 支付对账ID
     * @param data 支付对账表单数据
     */
     update(id: number, data: PayReconciliationForm) {
        return request({
            url: `${PAYRECONCILIATION_BASE_URL}/${id}`,
            method: "put",
            data: data,
        });
    },

    /**
     * 批量删除支付对账，多个以英文逗号(,)分割
     *
     * @param ids 支付对账ID字符串，多个以英文逗号(,)分割
     */
     deleteByIds(ids: string) {
        return request({
            url: `${PAYRECONCILIATION_BASE_URL}/${ids}`,
            method: "delete",
        });
    }
}

export default PayReconciliationAPI;

/** 支付对账分页查询参数 */
export interface PayReconciliationPageQuery extends PageQuery {
    /** 对账单号 */
    reconciliationNo?: string;
    /** 渠道编码 */
    channelCode?: string;
    /** 账单类型：PAYMENT-支付 REFUND-退款 ALL-全部 */
    billType?: string;
    /** 对账状态：0-未对账 1-对账中 2-对账完成 3-对账异常 */
    reconcileStatus?: number;
    /** 对账时间 */
    reconcileTime?: [string, string];
}

/** 支付对账表单对象 */
export interface PayReconciliationForm {
    /** 主键ID */
    id?:  number;
    /** 对账单号 */
    reconciliationNo?:  string;
    /** 渠道编码 */
    channelCode?:  string;
    /** 对账日期 */
    billDate?:  Date;
    /** 账单类型：PAYMENT-支付 REFUND-退款 ALL-全部 */
    billType?:  string;
    /** 总笔数 */
    totalCount?:  number;
    /** 总金额 */
    totalAmount?:  number;
    /** 成功笔数 */
    successCount?:  number;
    /** 成功金额 */
    successAmount?:  number;
    /** 失败笔数 */
    failureCount?:  number;
    /** 失败金额 */
    failureAmount?:  number;
    /** 差异笔数 */
    differenceCount?:  number;
    /** 对账状态：0-未对账 1-对账中 2-对账完成 3-对账异常 */
    reconcileStatus?:  number;
    /** 下载状态：0-未下载 1-下载中 2-下载完成 3-下载失败 */
    downloadStatus?:  number;
    /** 下载时间 */
    downloadTime?:  Date;
    /** 对账时间 */
    reconcileTime?:  Date;
    /** 账单文件URL */
    billFileUrl?:  string;
    /** 错误信息 */
    errorMessage?:  string;
    /** 逻辑删除：0-未删除 1-已删除 */
    isDeleted?:  number;
    /** 创建人 */
    createBy?:  string;
    /** 更新人 */
    updateBy?:  string;
    /** 创建时间 */
    createTime?:  Date;
    /** 更新时间 */
    updateTime?:  Date;
}

/** 支付对账分页对象 */
export interface PayReconciliationPageVO {
    /** 主键ID */
    id?: number;
    /** 对账单号 */
    reconciliationNo?: string;
    /** 渠道编码 */
    channelCode?: string;
    /** 对账日期 */
    billDate?: Date;
    /** 账单类型：PAYMENT-支付 REFUND-退款 ALL-全部 */
    billType?: string;
    /** 总笔数 */
    totalCount?: number;
    /** 总金额 */
    totalAmount?: number;
    /** 成功笔数 */
    successCount?: number;
    /** 成功金额 */
    successAmount?: number;
    /** 失败笔数 */
    failureCount?: number;
    /** 失败金额 */
    failureAmount?: number;
    /** 差异笔数 */
    differenceCount?: number;
    /** 对账状态：0-未对账 1-对账中 2-对账完成 3-对账异常 */
    reconcileStatus?: number;
    /** 下载状态：0-未下载 1-下载中 2-下载完成 3-下载失败 */
    downloadStatus?: number;
    /** 下载时间 */
    downloadTime?: Date;
    /** 对账时间 */
    reconcileTime?: Date;
    /** 账单文件URL */
    billFileUrl?: string;
    /** 错误信息 */
    errorMessage?: string;
    /** 逻辑删除：0-未删除 1-已删除 */
    isDeleted?: number;
    /** 创建人 */
    createBy?: string;
    /** 更新人 */
    updateBy?: string;
    /** 创建时间 */
    createTime?: Date;
    /** 更新时间 */
    updateTime?: Date;
}
