import request from "@/utils/request";
import {BaseQueryParams, PageQuery} from "@/types";

const PAYFLOW_BASE_URL = "/aioveu-tenant-pay/api/v1/pay-flow";

const PayFlowAPI = {
    /** 获取支付流水分页数据 */
    getPage(queryParams?: PayFlowPageQuery) {
        return request<any, PageResult<PayFlowPageVO[]>>({
            url: `${PAYFLOW_BASE_URL}/page`,
            method: "get",
            params: queryParams,
        });
    },
    /**
     * 获取支付流水表单数据
     *
     * @param id 支付流水ID
     * @returns 支付流水表单数据
     */
    getFormData(id: number) {
        return request<any, PayFlowForm>({
            url: `${PAYFLOW_BASE_URL}/${id}/form`,
            method: "get",
        });
    },

    /**
     *  添加支付流水
     *
     *  @param data 支付流水表单数据
     */
    add(data: PayFlowForm) {
        return request({
            url: `${PAYFLOW_BASE_URL}`,
            method: "post",
            data: data,
        });
    },

    /**
     * 更新支付流水
     *
     * @param id 支付流水ID
     * @param data 支付流水表单数据
     */
     update(id: number, data: PayFlowForm) {
        return request({
            url: `${PAYFLOW_BASE_URL}/${id}`,
            method: "put",
            data: data,
        });
    },

    /**
     * 批量删除支付流水，多个以英文逗号(,)分割
     *
     * @param ids 支付流水ID字符串，多个以英文逗号(,)分割
     */
     deleteByIds(ids: string) {
        return request({
            url: `${PAYFLOW_BASE_URL}/${ids}`,
            method: "delete",
        });
    }
}

export default PayFlowAPI;

/** 支付流水分页查询参数 */
export interface PayFlowPageQuery extends PageQuery {
    /** 流水号 */
    flowNo?: string;
    /** 支付单号 */
    paymentNo?: string;
    /** 退款单号 */
    refundNo?: string;
    /** 业务订单号 */
    orderNo?: string;
    /** 用户ID */
    userId?: number;
    /** 流水类型：PAYMENT-支付 REFUND-退款 SETTLEMENT-结算 ADJUST-调账 */
    flowType?: string;
    /** 资金方向：IN-入金 OUT-出金 */
    flowDirection?: string;
    /** 流水状态：0-处理中 1-成功 2-失败 */
    flowStatus?: number;
    /** 交易时间 */
    tradeTime?: [string, string];
    /** 创建时间 */
    createTime?: [string, string];
}

/** 支付流水表单对象 */
export interface PayFlowForm {
    /** 主键ID */
    id?:  number;
    /** 流水号 */
    flowNo?:  string;
    /** 支付单号 */
    paymentNo?:  string;
    /** 退款单号 */
    refundNo?:  string;
    /** 业务订单号 */
    orderNo?:  string;
    /** 用户ID */
    userId?:  number;
    /** 流水类型：PAYMENT-支付 REFUND-退款 SETTLEMENT-结算 ADJUST-调账 */
    flowType?:  string;
    /** 资金方向：IN-入金 OUT-出金 */
    flowDirection?:  string;
    /** 流水金额 */
    amount?:  number;
    /** 交易前余额 */
    balanceBefore?:  number;
    /** 交易后余额 */
    balanceAfter?:  number;
    /** 渠道编码 */
    channelCode?:  string;
    /** 第三方流水号 */
    thirdFlowNo?:  string;
    /** 流水状态：0-处理中 1-成功 2-失败 */
    flowStatus?:  number;
    /** 交易时间 */
    tradeTime?:  Date;
    /** 完成时间 */
    completeTime?:  Date;
    /** 错误代码 */
    errorCode?:  string;
    /** 错误信息 */
    errorMessage?:  string;
    /** 备注 */
    remark?:  string;
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

/** 支付流水分页对象 */
export interface PayFlowPageVO {
    /** 主键ID */
    id?: number;
    /** 流水号 */
    flowNo?: string;
    /** 支付单号 */
    paymentNo?: string;
    /** 退款单号 */
    refundNo?: string;
    /** 业务订单号 */
    orderNo?: string;
    /** 用户ID */
    userId?: number;
    /** 流水类型：PAYMENT-支付 REFUND-退款 SETTLEMENT-结算 ADJUST-调账 */
    flowType?: string;
    /** 资金方向：IN-入金 OUT-出金 */
    flowDirection?: string;
    /** 流水金额 */
    amount?: number;
    /** 交易前余额 */
    balanceBefore?: number;
    /** 交易后余额 */
    balanceAfter?: number;
    /** 渠道编码 */
    channelCode?: string;
    /** 第三方流水号 */
    thirdFlowNo?: string;
    /** 流水状态：0-处理中 1-成功 2-失败 */
    flowStatus?: number;
    /** 交易时间 */
    tradeTime?: Date;
    /** 完成时间 */
    completeTime?: Date;
    /** 错误代码 */
    errorCode?: string;
    /** 错误信息 */
    errorMessage?: string;
    /** 备注 */
    remark?: string;
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
