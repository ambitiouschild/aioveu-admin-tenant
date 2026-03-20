import request from "@/utils/request";
import {BaseQueryParams, PageQuery} from "@/types";

const SMSCOUPONHISTORY_BASE_URL = "/aioveu-tenant-sms/api/v1/sms-coupon-history";

const SmsCouponHistoryAPI = {
    /** 获取优惠券领取/使用记录分页数据 */
    getPage(queryParams?: SmsCouponHistoryPageQuery) {
        return request<any, PageResult<SmsCouponHistoryPageVO[]>>({
            url: `${SMSCOUPONHISTORY_BASE_URL}/page`,
            method: "get",
            params: queryParams,
        });
    },
    /**
     * 获取优惠券领取/使用记录表单数据
     *
     * @param id 优惠券领取/使用记录ID
     * @returns 优惠券领取/使用记录表单数据
     */
    getFormData(id: number) {
        return request<any, SmsCouponHistoryForm>({
            url: `${SMSCOUPONHISTORY_BASE_URL}/${id}/form`,
            method: "get",
        });
    },

    /**
     *  添加优惠券领取/使用记录
     *
     *  @param data 优惠券领取/使用记录表单数据
     */
    add(data: SmsCouponHistoryForm) {
        return request({
            url: `${SMSCOUPONHISTORY_BASE_URL}`,
            method: "post",
            data: data,
        });
    },

    /**
     * 更新优惠券领取/使用记录
     *
     * @param id 优惠券领取/使用记录ID
     * @param data 优惠券领取/使用记录表单数据
     */
     update(id: number, data: SmsCouponHistoryForm) {
        return request({
            url: `${SMSCOUPONHISTORY_BASE_URL}/${id}`,
            method: "put",
            data: data,
        });
    },

    /**
     * 批量删除优惠券领取/使用记录，多个以英文逗号(,)分割
     *
     * @param ids 优惠券领取/使用记录ID字符串，多个以英文逗号(,)分割
     */
     deleteByIds(ids: string) {
        return request({
            url: `${SMSCOUPONHISTORY_BASE_URL}/${ids}`,
            method: "delete",
        });
    }
}

export default SmsCouponHistoryAPI;

/** 优惠券领取/使用记录分页查询参数 */
export interface SmsCouponHistoryPageQuery extends PageQuery {
    /** 优惠券ID */
    couponId?: number;
    /** 会员ID */
    memberId?: number;
    /** 会员昵称 */
    memberNickname?: string;
    /** 优惠券码 */
    couponCode?: string;
    /** 获取类型(1：后台增删；2：主动领取) */
    getType?: number;
    /** 状态(0：未使用；1：已使用；2：已过期) */
    status?: number;
    /** 订单ID */
    orderId?: number;
    /** 订单号 */
    orderSn?: string;
}

/** 优惠券领取/使用记录表单对象 */
export interface SmsCouponHistoryForm {
    /** 优惠券领取/使用记录ID */
    id?:  number;
    /** 优惠券ID */
    couponId?:  number;
    /** 会员ID */
    memberId?:  number;
    /** 会员昵称 */
    memberNickname?:  string;
    /** 优惠券码 */
    couponCode?:  string;
    /** 获取类型(1：后台增删；2：主动领取) */
    getType?:  number;
    /** 状态(0：未使用；1：已使用；2：已过期) */
    status?:  number;
    /** 使用时间 */
    useTime?:  Date;
    /** 订单ID */
    orderId?:  number;
    /** 订单号 */
    orderSn?:  string;
}

/** 优惠券领取/使用记录分页对象 */
export interface SmsCouponHistoryPageVO {
    /** 优惠券领取/使用记录ID */
    id?: number;
    /** 优惠券ID */
    couponId?: number;
    /** 会员ID */
    memberId?: number;
    /** 会员昵称 */
    memberNickname?: string;
    /** 优惠券码 */
    couponCode?: string;
    /** 获取类型(1：后台增删；2：主动领取) */
    getType?: number;
    /** 状态(0：未使用；1：已使用；2：已过期) */
    status?: number;
    /** 使用时间 */
    useTime?: Date;
    /** 订单ID */
    orderId?: number;
    /** 订单号 */
    orderSn?: string;
    /** 创建时间 */
    createTime?: Date;
    /** 更新时间 */
    updateTime?: Date;
}
