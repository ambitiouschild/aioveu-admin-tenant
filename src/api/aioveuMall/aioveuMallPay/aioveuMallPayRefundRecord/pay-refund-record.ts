import request from "@/utils/request";
import {BaseQueryParams, PageQuery} from "@/types";

const PAYREFUNDRECORD_BASE_URL = "/aioveu-tenant-pay/api/v1/pay-refund-record";

const PayRefundRecordAPI = {
    /** 获取退款记录分页数据 */
    getPage(queryParams?: PayRefundRecordPageQuery) {
        return request<any, PageResult<PayRefundRecordPageVO[]>>({
            url: `${PAYREFUNDRECORD_BASE_URL}/page`,
            method: "get",
            params: queryParams,
        });
    },
    /**
     * 获取退款记录表单数据
     *
     * @param id 退款记录ID
     * @returns 退款记录表单数据
     */
    getFormData(id: number) {
        return request<any, PayRefundRecordForm>({
            url: `${PAYREFUNDRECORD_BASE_URL}/${id}/form`,
            method: "get",
        });
    },

    /**
     *  添加退款记录
     *
     *  @param data 退款记录表单数据
     */
    add(data: PayRefundRecordForm) {
        return request({
            url: `${PAYREFUNDRECORD_BASE_URL}`,
            method: "post",
            data: data,
        });
    },

    /**
     * 更新退款记录
     *
     * @param id 退款记录ID
     * @param data 退款记录表单数据
     */
     update(id: number, data: PayRefundRecordForm) {
        return request({
            url: `${PAYREFUNDRECORD_BASE_URL}/${id}`,
            method: "put",
            data: data,
        });
    },

    /**
     * 批量删除退款记录，多个以英文逗号(,)分割
     *
     * @param ids 退款记录ID字符串，多个以英文逗号(,)分割
     */
     deleteByIds(ids: string) {
        return request({
            url: `${PAYREFUNDRECORD_BASE_URL}/${ids}`,
            method: "delete",
        });
    }
}

export default PayRefundRecordAPI;

/** 退款记录分页查询参数 */
export interface PayRefundRecordPageQuery extends PageQuery {
    /** 原支付单号 */
    paymentNo?: string;
    /** 业务订单号 */
    orderNo?: string;
    /** 退款状态：0-待退款 1-退款中 2-退款成功 3-退款失败 4-已关闭 */
    refundStatus?: number;
    /** 退款渠道：ALIPAY-支付宝 WECHAT-微信 UNIONPAY-银联 BALANCE-余额 */
    refundChannel?: string;
    /** 退款完成时间 */
    refundTime?: [string, string];
    /** 第三方退款流水号 */
    thirdTransactionNo?: string;
    /** 创建时间 */
    createTime?: [string, string];
}

/** 退款记录表单对象 */
export interface PayRefundRecordForm {
    /** 主键ID */
    id?:  number;
    /** 退款单号，格式：RFyyyyMMddHHmmss+6位随机 */
    refundNo?:  string;
    /** 原支付单号 */
    paymentNo?:  string;
    /** 业务订单号 */
    orderNo?:  string;
    /** 业务类型：REFUND-退款 ORDER-订单退款 */
    bizType?:  string;
    /** 退款金额 */
    refundAmount?:  number;
    /** 退款状态：0-待退款 1-退款中 2-退款成功 3-退款失败 4-已关闭 */
    refundStatus?:  number;
    /** 退款渠道：ALIPAY-支付宝 WECHAT-微信 UNIONPAY-银联 BALANCE-余额 */
    refundChannel?:  string;
    /** 退款原因 */
    refundReason?:  string;
    /** 申请时间 */
    applyTime?:  Date;
    /** 退款完成时间 */
    refundTime?:  Date;
    /** 第三方退款单号 */
    thirdRefundNo?:  string;
    /** 第三方退款流水号 */
    thirdTransactionNo?:  string;
    /** 币种 */
    currency?:  string;
    /** 错误代码 */
    errorCode?:  string;
    /** 错误信息 */
    errorMessage?:  string;
    /** 通知状态：0-未通知 1-通知中 2-通知成功 3-通知失败 */
    notifyStatus?:  number;
    /** 通知次数 */
    notifyCount?:  number;
    /** 最后通知时间 */
    lastNotifyTime?:  Date;
    /** 下次通知时间 */
    nextNotifyTime?:  Date;
    /** 回调数据 */
    callbackData?:  string;
    /** 回调时间 */
    callbackTime?:  Date;
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

/** 退款记录分页对象 */
export interface PayRefundRecordPageVO {
    /** 主键ID */
    id?: number;
    /** 退款单号，格式：RFyyyyMMddHHmmss+6位随机 */
    refundNo?: string;
    /** 原支付单号 */
    paymentNo?: string;
    /** 业务订单号 */
    orderNo?: string;
    /** 业务类型：REFUND-退款 ORDER-订单退款 */
    bizType?: string;
    /** 退款金额 */
    refundAmount?: number;
    /** 退款状态：0-待退款 1-退款中 2-退款成功 3-退款失败 4-已关闭 */
    refundStatus?: number;
    /** 退款渠道：ALIPAY-支付宝 WECHAT-微信 UNIONPAY-银联 BALANCE-余额 */
    refundChannel?: string;
    /** 退款原因 */
    refundReason?: string;
    /** 申请时间 */
    applyTime?: Date;
    /** 退款完成时间 */
    refundTime?: Date;
    /** 第三方退款单号 */
    thirdRefundNo?: string;
    /** 第三方退款流水号 */
    thirdTransactionNo?: string;
    /** 币种 */
    currency?: string;
    /** 错误代码 */
    errorCode?: string;
    /** 错误信息 */
    errorMessage?: string;
    /** 通知状态：0-未通知 1-通知中 2-通知成功 3-通知失败 */
    notifyStatus?: number;
    /** 通知次数 */
    notifyCount?: number;
    /** 最后通知时间 */
    lastNotifyTime?: Date;
    /** 下次通知时间 */
    nextNotifyTime?: Date;
    /** 回调数据 */
    callbackData?: string;
    /** 回调时间 */
    callbackTime?: Date;
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
