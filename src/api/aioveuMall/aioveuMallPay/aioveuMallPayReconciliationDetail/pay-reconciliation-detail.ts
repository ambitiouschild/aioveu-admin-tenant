import request from "@/utils/request";
import {BaseQueryParams, PageQuery} from "@/types";

const PAYRECONCILIATIONDETAIL_BASE_URL = "/aioveu-tenant-pay/api/v1/pay-reconciliation-detail";

const PayReconciliationDetailAPI = {
    /** 获取对账明细分页数据 */
    getPage(queryParams?: PayReconciliationDetailPageQuery) {
        return request<any, PageResult<PayReconciliationDetailPageVO[]>>({
            url: `${PAYRECONCILIATIONDETAIL_BASE_URL}/page`,
            method: "get",
            params: queryParams,
        });
    },
    /**
     * 获取对账明细表单数据
     *
     * @param id 对账明细ID
     * @returns 对账明细表单数据
     */
    getFormData(id: number) {
        return request<any, PayReconciliationDetailForm>({
            url: `${PAYRECONCILIATIONDETAIL_BASE_URL}/${id}/form`,
            method: "get",
        });
    },

    /**
     *  添加对账明细
     *
     *  @param data 对账明细表单数据
     */
    add(data: PayReconciliationDetailForm) {
        return request({
            url: `${PAYRECONCILIATIONDETAIL_BASE_URL}`,
            method: "post",
            data: data,
        });
    },

    /**
     * 更新对账明细
     *
     * @param id 对账明细ID
     * @param data 对账明细表单数据
     */
     update(id: number, data: PayReconciliationDetailForm) {
        return request({
            url: `${PAYRECONCILIATIONDETAIL_BASE_URL}/${id}`,
            method: "put",
            data: data,
        });
    },

    /**
     * 批量删除对账明细，多个以英文逗号(,)分割
     *
     * @param ids 对账明细ID字符串，多个以英文逗号(,)分割
     */
     deleteByIds(ids: string) {
        return request({
            url: `${PAYRECONCILIATIONDETAIL_BASE_URL}/${ids}`,
            method: "delete",
        });
    }
}

export default PayReconciliationDetailAPI;

/** 对账明细分页查询参数 */
export interface PayReconciliationDetailPageQuery extends PageQuery {
    /** 对账单ID */
    reconciliationId?: number;
    /** 对账日期 */
    billDate?: [string, string];
    /** 系统支付单号 */
    paymentNo?: string;
    /** 业务订单号 */
    orderNo?: string;
    /** 对账状态：0-未对账 1-成功 2-失败 3-系统多 4-渠道多 */
    reconcileStatus?: number;
    /** 对账时间 */
    reconcileTime?: [string, string];
}

/** 对账明细表单对象 */
export interface PayReconciliationDetailForm {
    /** 主键ID */
    id?:  number;
    /** 对账单ID */
    reconciliationId?:  number;
    /** 渠道编码 */
    channelCode?:  string;
    /** 对账日期 */
    billDate?:  Date;
    /** 第三方交易流水号 */
    thirdTransactionNo?:  string;
    /** 第三方订单号 */
    thirdOrderNo?:  string;
    /** 系统支付单号 */
    paymentNo?:  string;
    /** 业务订单号 */
    orderNo?:  string;
    /** 交易类型：PAYMENT-支付 REFUND-退款 */
    tradeType?:  string;
    /** 交易时间 */
    tradeTime?:  Date;
    /** 交易金额 */
    tradeAmount?:  number;
    /** 交易状态：SUCCESS-成功 FAIL-失败 PROCESSING-处理中 */
    tradeStatus?:  string;
    /** 对账状态：0-未对账 1-成功 2-失败 3-系统多 4-渠道多 */
    reconcileStatus?:  number;
    /** 差异原因 */
    differenceReason?:  string;
    /** 对账结果：MATCH-匹配 SYS_MORE-系统多 CHANNEL_MORE-渠道多 */
    reconcileResult?:  string;
    /** 对账时间 */
    reconcileTime?:  Date;
    /** 备注 */
    remark?:  string;
    /** 逻辑删除：0-未删除 1-已删除 */
    isDeleted?:  number;
    /** 创建时间 */
    createTime?:  Date;
    /** 更新时间 */
    updateTime?:  Date;
}

/** 对账明细分页对象 */
export interface PayReconciliationDetailPageVO {
    /** 主键ID */
    id?: number;
    /** 对账单ID */
    reconciliationId?: number;
    /** 渠道编码 */
    channelCode?: string;
    /** 对账日期 */
    billDate?: Date;
    /** 第三方交易流水号 */
    thirdTransactionNo?: string;
    /** 第三方订单号 */
    thirdOrderNo?: string;
    /** 系统支付单号 */
    paymentNo?: string;
    /** 业务订单号 */
    orderNo?: string;
    /** 交易类型：PAYMENT-支付 REFUND-退款 */
    tradeType?: string;
    /** 交易时间 */
    tradeTime?: Date;
    /** 交易金额 */
    tradeAmount?: number;
    /** 交易状态：SUCCESS-成功 FAIL-失败 PROCESSING-处理中 */
    tradeStatus?: string;
    /** 对账状态：0-未对账 1-成功 2-失败 3-系统多 4-渠道多 */
    reconcileStatus?: number;
    /** 差异原因 */
    differenceReason?: string;
    /** 对账结果：MATCH-匹配 SYS_MORE-系统多 CHANNEL_MORE-渠道多 */
    reconcileResult?: string;
    /** 对账时间 */
    reconcileTime?: Date;
    /** 备注 */
    remark?: string;
    /** 逻辑删除：0-未删除 1-已删除 */
    isDeleted?: number;
    /** 创建时间 */
    createTime?: Date;
    /** 更新时间 */
    updateTime?: Date;
}
