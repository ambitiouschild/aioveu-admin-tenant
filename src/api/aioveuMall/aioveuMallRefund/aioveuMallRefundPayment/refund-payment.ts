import request from "@/utils/request";
import {BaseQueryParams, PageQuery} from "@/types";

const REFUNDPAYMENT_BASE_URL = "/aioveu-tenant-refund/api/v1/refund-payment";

const RefundPaymentAPI = {
    /** 获取退款支付记录分页数据 */
    getPage(queryParams?: RefundPaymentPageQuery) {
        return request<any, PageResult<RefundPaymentPageVO[]>>({
            url: `${REFUNDPAYMENT_BASE_URL}/page`,
            method: "get",
            params: queryParams,
        });
    },
    /**
     * 获取退款支付记录表单数据
     *
     * @param id 退款支付记录ID
     * @returns 退款支付记录表单数据
     */
    getFormData(id: number) {
        return request<any, RefundPaymentForm>({
            url: `${REFUNDPAYMENT_BASE_URL}/${id}/form`,
            method: "get",
        });
    },

    /**
     *  添加退款支付记录
     *
     *  @param data 退款支付记录表单数据
     */
    add(data: RefundPaymentForm) {
        return request({
            url: `${REFUNDPAYMENT_BASE_URL}`,
            method: "post",
            data: data,
        });
    },

    /**
     * 更新退款支付记录
     *
     * @param id 退款支付记录ID
     * @param data 退款支付记录表单数据
     */
     update(id: number, data: RefundPaymentForm) {
        return request({
            url: `${REFUNDPAYMENT_BASE_URL}/${id}`,
            method: "put",
            data: data,
        });
    },

    /**
     * 批量删除退款支付记录，多个以英文逗号(,)分割
     *
     * @param ids 退款支付记录ID字符串，多个以英文逗号(,)分割
     */
     deleteByIds(ids: string) {
        return request({
            url: `${REFUNDPAYMENT_BASE_URL}/${ids}`,
            method: "delete",
        });
    }
}

export default RefundPaymentAPI;

/** 退款支付记录分页查询参数 */
export interface RefundPaymentPageQuery extends PageQuery {
    /** 退款申请ID */
    refundId?: number;
    /** 退款支付单号 */
    paymentSn?: string;
    /** 支付类型：1-微信 2-支付宝 3-银行卡 4-余额 */
    paymentType?: number;
    /** 支付状态：0-待支付 1-支付中 2-支付成功 3-支付失败 */
    paymentStatus?: number;
    /** 支付渠道 */
    paymentChannel?: string;
    /** 支付交易号 */
    paymentTradeNo?: string;
}

/** 退款支付记录表单对象 */
export interface RefundPaymentForm {
    /** 主键ID */
    id?:  number;
    /** 退款申请ID */
    refundId?:  number;
    /** 退款支付单号 */
    paymentSn?:  string;
    /** 支付类型：1-微信 2-支付宝 3-银行卡 4-余额 */
    paymentType?:  number;
    /** 支付金额（分） */
    paymentAmount?:  number;
    /** 支付状态：0-待支付 1-支付中 2-支付成功 3-支付失败 */
    paymentStatus?:  number;
    /** 支付时间 */
    paymentTime?:  Date;
    /** 支付渠道 */
    paymentChannel?:  string;
    /** 支付交易号 */
    paymentTradeNo?:  string;
    /** 支付手续费（分） */
    paymentFee?:  number;
    /** 备注 */
    remark?:  string;
    /** 创建时间 */
    createTime?:  Date;
    /** 更新时间 */
    updateTime?:  Date;
}

/** 退款支付记录分页对象 */
export interface RefundPaymentPageVO {
    /** 主键ID */
    id?: number;
    /** 退款申请ID */
    refundId?: number;
    /** 退款支付单号 */
    paymentSn?: string;
    /** 支付类型：1-微信 2-支付宝 3-银行卡 4-余额 */
    paymentType?: number;
    /** 支付金额（分） */
    paymentAmount?: number;
    /** 支付状态：0-待支付 1-支付中 2-支付成功 3-支付失败 */
    paymentStatus?: number;
    /** 支付时间 */
    paymentTime?: Date;
    /** 支付渠道 */
    paymentChannel?: string;
    /** 支付交易号 */
    paymentTradeNo?: string;
    /** 支付手续费（分） */
    paymentFee?: number;
    /** 备注 */
    remark?: string;
    /** 创建时间 */
    createTime?: Date;
    /** 更新时间 */
    updateTime?: Date;
}
