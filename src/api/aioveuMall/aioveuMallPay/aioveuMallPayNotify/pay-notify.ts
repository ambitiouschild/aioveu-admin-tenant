import request from "@/utils/request";
import {BaseQueryParams, PageQuery} from "@/types";

const PAYNOTIFY_BASE_URL = "/aioveu-tenant-pay/api/v1/pay-notify";

const PayNotifyAPI = {
    /** 获取支付通知分页数据 */
    getPage(queryParams?: PayNotifyPageQuery) {
        return request<any, PageResult<PayNotifyPageVO[]>>({
            url: `${PAYNOTIFY_BASE_URL}/page`,
            method: "get",
            params: queryParams,
        });
    },
    /**
     * 获取支付通知表单数据
     *
     * @param id 支付通知ID
     * @returns 支付通知表单数据
     */
    getFormData(id: number) {
        return request<any, PayNotifyForm>({
            url: `${PAYNOTIFY_BASE_URL}/${id}/form`,
            method: "get",
        });
    },

    /**
     *  添加支付通知
     *
     *  @param data 支付通知表单数据
     */
    add(data: PayNotifyForm) {
        return request({
            url: `${PAYNOTIFY_BASE_URL}`,
            method: "post",
            data: data,
        });
    },

    /**
     * 更新支付通知
     *
     * @param id 支付通知ID
     * @param data 支付通知表单数据
     */
     update(id: number, data: PayNotifyForm) {
        return request({
            url: `${PAYNOTIFY_BASE_URL}/${id}`,
            method: "put",
            data: data,
        });
    },

    /**
     * 批量删除支付通知，多个以英文逗号(,)分割
     *
     * @param ids 支付通知ID字符串，多个以英文逗号(,)分割
     */
     deleteByIds(ids: string) {
        return request({
            url: `${PAYNOTIFY_BASE_URL}/${ids}`,
            method: "delete",
        });
    }
}

export default PayNotifyAPI;

/** 支付通知分页查询参数 */
export interface PayNotifyPageQuery extends PageQuery {
    /** 通知编号 */
    notifyNo?: string;
    /** 支付单号 */
    paymentNo?: string;
    /** 退款单号 */
    refundNo?: string;
    /** 通知类型：PAYMENT-支付 REFUND-退款 */
    notifyType?: string;
    /** 通知状态：0-待通知 1-通知中 2-通知成功 3-通知失败 */
    notifyStatus?: number;
    /** 下次通知时间 */
    nextNotifyTime?: [string, string];
    /** 创建时间 */
    createTime?: [string, string];
}

/** 支付通知表单对象 */
export interface PayNotifyForm {
    /** 主键ID */
    id?:  number;
    /** 通知编号 */
    notifyNo?:  string;
    /** 支付单号 */
    paymentNo?:  string;
    /** 退款单号 */
    refundNo?:  string;
    /** 通知类型：PAYMENT-支付 REFUND-退款 */
    notifyType?:  string;
    /** 通知地址 */
    notifyUrl?:  string;
    /** 请求数据 */
    requestData?:  string;
    /** 响应数据 */
    responseData?:  string;
    /** 通知状态：0-待通知 1-通知中 2-通知成功 3-通知失败 */
    notifyStatus?:  number;
    /** 通知次数 */
    notifyCount?:  number;
    /** 最大通知次数 */
    maxNotifyCount?:  number;
    /** 下次通知时间 */
    nextNotifyTime?:  Date;
    /** 最后通知时间 */
    lastNotifyTime?:  Date;
    /** 成功时间 */
    successTime?:  Date;
    /** 错误信息 */
    errorMessage?:  string;
    /** 逻辑删除：0-未删除 1-已删除 */
    isDeleted?:  number;
    /** 创建时间 */
    createTime?:  Date;
    /** 更新时间 */
    updateTime?:  Date;
}

/** 支付通知分页对象 */
export interface PayNotifyPageVO {
    /** 主键ID */
    id?: number;
    /** 通知编号 */
    notifyNo?: string;
    /** 支付单号 */
    paymentNo?: string;
    /** 退款单号 */
    refundNo?: string;
    /** 通知类型：PAYMENT-支付 REFUND-退款 */
    notifyType?: string;
    /** 通知地址 */
    notifyUrl?: string;
    /** 请求数据 */
    requestData?: string;
    /** 响应数据 */
    responseData?: string;
    /** 通知状态：0-待通知 1-通知中 2-通知成功 3-通知失败 */
    notifyStatus?: number;
    /** 通知次数 */
    notifyCount?: number;
    /** 最大通知次数 */
    maxNotifyCount?: number;
    /** 下次通知时间 */
    nextNotifyTime?: Date;
    /** 最后通知时间 */
    lastNotifyTime?: Date;
    /** 成功时间 */
    successTime?: Date;
    /** 错误信息 */
    errorMessage?: string;
    /** 逻辑删除：0-未删除 1-已删除 */
    isDeleted?: number;
    /** 创建时间 */
    createTime?: Date;
    /** 更新时间 */
    updateTime?: Date;
}
