import request from "@/utils/request";
import {BaseQueryParams, PageQuery} from "@/types";

const OMSORDERPAY_BASE_URL = "/aioveu-tenant-oms/api/v1/oms-order-pay";

const OmsOrderPayAPI = {
    /** 获取支付信息分页数据 */
    getPage(queryParams?: OmsOrderPayPageQuery) {
        return request<any, PageResult<OmsOrderPayPageVO[]>>({
            url: `${OMSORDERPAY_BASE_URL}/page`,
            method: "get",
            params: queryParams,
        });
    },
    /**
     * 获取支付信息表单数据
     *
     * @param id 支付信息ID
     * @returns 支付信息表单数据
     */
    getFormData(id: number) {
        return request<any, OmsOrderPayForm>({
            url: `${OMSORDERPAY_BASE_URL}/${id}/form`,
            method: "get",
        });
    },

    /**
     *  添加支付信息
     *
     *  @param data 支付信息表单数据
     */
    add(data: OmsOrderPayForm) {
        return request({
            url: `${OMSORDERPAY_BASE_URL}`,
            method: "post",
            data: data,
        });
    },

    /**
     * 更新支付信息
     *
     * @param id 支付信息ID
     * @param data 支付信息表单数据
     */
     update(id: number, data: OmsOrderPayForm) {
        return request({
            url: `${OMSORDERPAY_BASE_URL}/${id}`,
            method: "put",
            data: data,
        });
    },

    /**
     * 批量删除支付信息，多个以英文逗号(,)分割
     *
     * @param ids 支付信息ID字符串，多个以英文逗号(,)分割
     */
     deleteByIds(ids: string) {
        return request({
            url: `${OMSORDERPAY_BASE_URL}/${ids}`,
            method: "delete",
        });
    }
}

export default OmsOrderPayAPI;

/** 支付信息分页查询参数 */
export interface OmsOrderPayPageQuery extends PageQuery {
    /** 订单id */
    orderId?: number;
    /** 支付流水号 */
    paySn?: string;
    /** 应付总额(分) */
    payAmount?: number;
    /** 支付方式【1->支付宝；2->微信；3->银联； 4->货到付款；】 */
    payType?: number;
    /** 支付状态 */
    payStatus?: number;
    /** 回调时间 */
    callbackTime?: [string, string];
    /** 逻辑删除【0->正常；1->已删除】 */
    deleted?: number;
}

/** 支付信息表单对象 */
export interface OmsOrderPayForm {
    /** id */
    id?:  number;
    /** 订单id */
    orderId?:  number;
    /** 支付流水号 */
    paySn?:  string;
    /** 应付总额(分) */
    payAmount?:  number;
    /** 支付时间 */
    payTime?:  Date;
    /** 支付方式【1->支付宝；2->微信；3->银联； 4->货到付款；】 */
    payType?:  number;
    /** 支付状态 */
    payStatus?:  number;
    /** 确认时间 */
    confirmTime?:  Date;
    /** 回调内容 */
    callbackContent?:  string;
    /** 回调时间 */
    callbackTime?:  Date;
    /** 交易内容 */
    paySubject?:  string;
    /** 逻辑删除【0->正常；1->已删除】 */
    deleted?:  number;
}

/** 支付信息分页对象 */
export interface OmsOrderPayPageVO {
    /** id */
    id?: number;
    /** 订单id */
    orderId?: number;
    /** 支付流水号 */
    paySn?: string;
    /** 应付总额(分) */
    payAmount?: number;
    /** 支付时间 */
    payTime?: Date;
    /** 支付方式【1->支付宝；2->微信；3->银联； 4->货到付款；】 */
    payType?: number;
    /** 支付状态 */
    payStatus?: number;
    /** 确认时间 */
    confirmTime?: Date;
    /** 回调内容 */
    callbackContent?: string;
    /** 回调时间 */
    callbackTime?: Date;
    /** 交易内容 */
    paySubject?: string;
    /** 逻辑删除【0->正常；1->已删除】 */
    deleted?: number;
    /** 创建时间 */
    createTime?: Date;
    /** 修改时间 */
    updateTime?: Date;
}
