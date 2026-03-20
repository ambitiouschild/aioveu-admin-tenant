import request from "@/utils/request";
import {BaseQueryParams, PageQuery} from "@/types";

const SMSCOUPON_BASE_URL = "/aioveu-tenant-sms/api/v1/sms-coupon";

const SmsCouponAPI = {
    /** 获取优惠券分页数据 */
    getPage(queryParams?: SmsCouponPageQuery) {
        return request<any, PageResult<SmsCouponPageVO[]>>({
            url: `${SMSCOUPON_BASE_URL}/page`,
            method: "get",
            params: queryParams,
        });
    },
    /**
     * 获取优惠券表单数据
     *
     * @param id 优惠券ID
     * @returns 优惠券表单数据
     */
    getFormData(id: number) {
        return request<any, SmsCouponForm>({
            url: `${SMSCOUPON_BASE_URL}/${id}/form`,
            method: "get",
        });
    },

    /**
     *  添加优惠券
     *
     *  @param data 优惠券表单数据
     */
    add(data: SmsCouponForm) {
        return request({
            url: `${SMSCOUPON_BASE_URL}`,
            method: "post",
            data: data,
        });
    },

    /**
     * 更新优惠券
     *
     * @param id 优惠券ID
     * @param data 优惠券表单数据
     */
     update(id: number, data: SmsCouponForm) {
        return request({
            url: `${SMSCOUPON_BASE_URL}/${id}`,
            method: "put",
            data: data,
        });
    },

    /**
     * 批量删除优惠券，多个以英文逗号(,)分割
     *
     * @param ids 优惠券ID字符串，多个以英文逗号(,)分割
     */
     deleteByIds(ids: string) {
        return request({
            url: `${SMSCOUPON_BASE_URL}/${ids}`,
            method: "delete",
        });
    }
}

export default SmsCouponAPI;

/** 优惠券分页查询参数 */
export interface SmsCouponPageQuery extends PageQuery {
    /** 优惠券名称 */
    name?: string;
    /** 优惠券类型(1-满减券;2-直减券;3-折扣券) */
    type?: number;
    /** 优惠券码 */
    code?: string;
    /** 使用平台(0-全平台;1-APP;2-PC) */
    platform?: number;
    /** 优惠券面值类型 */
    faceValueType?: number;
    /** 使用门槛(0:无门槛) */
    minPoint?: number;
    /** 每人限领张数(-1-无限制) */
    perLimit?: number;
    /** 有效期类型(1:自领取时起有效天数;2:有效起止时间) */
    validityPeriodType?: number;
    /** 有效期天数 */
    validityDays?: number;
    /** 应用范围(0-全场通用;1-指定商品分类;2-指定商品) */
    applicationScope?: number;
    /** 已领取的优惠券数量(统计) */
    receivedCount?: number;
    /** 逻辑删除标识(0-正常;1-删除) */
    deleted?: number;
}

/** 优惠券表单对象 */
export interface SmsCouponForm {
    /** ID */
    id?:  number;
    /** 优惠券名称 */
    name?:  string;
    /** 优惠券类型(1-满减券;2-直减券;3-折扣券) */
    type?:  number;
    /** 优惠券码 */
    code?:  string;
    /** 使用平台(0-全平台;1-APP;2-PC) */
    platform?:  number;
    /** 优惠券面值类型 */
    faceValueType?:  number;
    /** 优惠券面值(分) */
    faceValue?:  number;
    /** 折扣 */
    discount?:  number;
    /** 使用门槛(0:无门槛) */
    minPoint?:  number;
    /** 每人限领张数(-1-无限制) */
    perLimit?:  number;
    /** 有效期类型(1:自领取时起有效天数;2:有效起止时间) */
    validityPeriodType?:  number;
    /** 有效期天数 */
    validityDays?:  number;
    /** 有效期起始时间 */
    validityBeginTime?:  Date;
    /** 有效期截止时间 */
    validityEndTime?:  Date;
    /** 应用范围(0-全场通用;1-指定商品分类;2-指定商品) */
    applicationScope?:  number;
    /** 发行量(-1-无限制) */
    circulation?:  number;
    /** 已领取的优惠券数量(统计) */
    receivedCount?:  number;
    /** 已使用的优惠券数量(统计) */
    usedCount?:  number;
    /** 备注 */
    remark?:  string;
    /** 逻辑删除标识(0-正常;1-删除) */
    deleted?:  number;
}

/** 优惠券分页对象 */
export interface SmsCouponPageVO {
    /** ID */
    id?: number;
    /** 优惠券名称 */
    name?: string;
    /** 优惠券类型(1-满减券;2-直减券;3-折扣券) */
    type?: number;
    /** 优惠券码 */
    code?: string;
    /** 使用平台(0-全平台;1-APP;2-PC) */
    platform?: number;
    /** 优惠券面值类型 */
    faceValueType?: number;
    /** 优惠券面值(分) */
    faceValue?: number;
    /** 折扣 */
    discount?: number;
    /** 使用门槛(0:无门槛) */
    minPoint?: number;
    /** 每人限领张数(-1-无限制) */
    perLimit?: number;
    /** 有效期类型(1:自领取时起有效天数;2:有效起止时间) */
    validityPeriodType?: number;
    /** 有效期天数 */
    validityDays?: number;
    /** 有效期起始时间 */
    validityBeginTime?: Date;
    /** 有效期截止时间 */
    validityEndTime?: Date;
    /** 应用范围(0-全场通用;1-指定商品分类;2-指定商品) */
    applicationScope?: number;
    /** 发行量(-1-无限制) */
    circulation?: number;
    /** 已领取的优惠券数量(统计) */
    receivedCount?: number;
    /** 已使用的优惠券数量(统计) */
    usedCount?: number;
    /** 备注 */
    remark?: string;
    /** 创建时间 */
    updateTime?: Date;
    /** 修改时间 */
    createTime?: Date;
    /** 逻辑删除标识(0-正常;1-删除) */
    deleted?: number;
}
