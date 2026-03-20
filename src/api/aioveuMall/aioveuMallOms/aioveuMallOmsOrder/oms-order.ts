import request from "@/utils/request";
import {PageQuery} from "@/types";

const OMSORDER_BASE_URL = "/aioveu-tenant-oms/api/v1/oms-order";

const OmsOrderAPI = {
    /** 获取订单详情分页数据 */
    getPage(queryParams?: OmsOrderPageQuery) {
        return request<any, PageResult<OmsOrderPageVO[]>>({
            url: `${OMSORDER_BASE_URL}/page`,
            method: "get",
            params: queryParams,
        });
    },
    /**
     * 获取订单详情表单数据
     *
     * @param id 订单详情ID
     * @returns 订单详情表单数据
     */
    getFormData(id: number) {
        return request<any, OmsOrderForm>({
            url: `${OMSORDER_BASE_URL}/${id}/form`,
            method: "get",
        });
    },

    /**
     *  添加订单详情
     *
     *  @param data 订单详情表单数据
     */
    add(data: OmsOrderForm) {
        return request({
            url: `${OMSORDER_BASE_URL}`,
            method: "post",
            data: data,
        });
    },

    /**
     * 更新订单详情
     *
     * @param id 订单详情ID
     * @param data 订单详情表单数据
     */
     update(id: number, data: OmsOrderForm) {
        return request({
            url: `${OMSORDER_BASE_URL}/${id}`,
            method: "put",
            data: data,
        });
    },

    /**
     * 批量删除订单详情，多个以英文逗号(,)分割
     *
     * @param ids 订单详情ID字符串，多个以英文逗号(,)分割
     */
     deleteByIds(ids: string) {
        return request({
            url: `${OMSORDER_BASE_URL}/${ids}`,
            method: "delete",
        });
    }
}

export default OmsOrderAPI;

/** 订单详情分页查询参数 */
export interface OmsOrderPageQuery extends PageQuery {}

/** 订单详情表单对象 */
export interface OmsOrderForm {

    id?:  number;
    /** 订单号 */
    orderSn?:  string;
    /** 订单总额（分） */
    totalAmount?:  number;
    /** 商品总数 */
    totalQuantity?:  number;
    /** 订单来源(1:APP；2:网页) */
    source?:  number;
    /** 订单状态：
101->待付款；
102->用户取消；
103->系统取消；
201->已付款；
202->申请退款；
203->已退款；
301->待发货；
401->已发货；
501->用户收货；
502->系统收货；
901->已完成； */
    status?:  number;
    /** 订单备注 */
    remark?:  string;
    /** 会员id */
    memberId?:  number;
    /** 使用的优惠券 */
    couponId?:  number;
    /** 优惠券抵扣金额（分） */
    couponAmount?:  number;
    /** 运费金额（分） */
    freightAmount?:  number;
    /** 应付总额（分） */
    paymentAmount?:  number;
    /** 支付时间 */
    paymentTime?:  Date;
    /** 支付方式(1：微信JSAPI；2：支付宝；3：余额；4：微信APP) */
    paymentMethod?:  number;
    /** 微信支付等第三方支付平台的商户订单号 */
    outTradeNo?:  string;
    /** 微信支付订单号 */
    transactionId?:  string;
    /** 商户退款单号 */
    outRefundNo?:  string;
    /** 微信退款单号 */
    refundId?:  string;
    /** 发货时间 */
    deliveryTime?:  Date;
    /** 确认收货时间 */
    receiveTime?:  Date;
    /** 评价时间 */
    commentTime?:  Date;
    /** 逻辑删除【0->正常；1->已删除】 */
    deleted?:  number;
}

/** 订单详情分页对象 */
export interface OmsOrderPageVO {
    /** 订单号 */
    orderSn?: string;
    /** 订单总额（分） */
    totalAmount?: number;
    /** 商品总数 */
    totalQuantity?: number;
    /** 订单来源(1:APP；2:网页) */
    source?: number;
    /** 订单状态：
101->待付款；
102->用户取消；
103->系统取消；
201->已付款；
202->申请退款；
203->已退款；
301->待发货；
401->已发货；
501->用户收货；
502->系统收货；
901->已完成； */
    status?: number;
    /** 订单备注 */
    remark?: string;
    /** 会员id */
    memberId?: number;
    /** 使用的优惠券 */
    couponId?: number;
    /** 优惠券抵扣金额（分） */
    couponAmount?: number;
    /** 运费金额（分） */
    freightAmount?: number;
    /** 应付总额（分） */
    paymentAmount?: number;
    /** 支付时间 */
    paymentTime?: Date;
    /** 支付方式(1：微信JSAPI；2：支付宝；3：余额；4：微信APP) */
    paymentMethod?: number;
    /** 微信支付等第三方支付平台的商户订单号 */
    outTradeNo?: string;
    /** 微信支付订单号 */
    transactionId?: string;
    /** 商户退款单号 */
    outRefundNo?: string;
    /** 微信退款单号 */
    refundId?: string;
    /** 发货时间 */
    deliveryTime?: Date;
    /** 确认收货时间 */
    receiveTime?: Date;
    /** 评价时间 */
    commentTime?: Date;
    /** 逻辑删除【0->正常；1->已删除】 */
    deleted?: number;
    /** 创建时间 */
    createTime?: Date;
    /** 修改时间 */
    updateTime?: Date;
}
