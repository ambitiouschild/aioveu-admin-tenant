import request from "@/utils/request";
import {BaseQueryParams, PageQuery} from "@/types";

const SMSCOUPONSPU_BASE_URL = "/aioveu-tenant-sms/api/v1/sms-coupon-spu";

const SmsCouponSpuAPI = {
    /** 获取优惠券适用的具体商品分页数据 */
    getPage(queryParams?: SmsCouponSpuPageQuery) {
        return request<any, PageResult<SmsCouponSpuPageVO[]>>({
            url: `${SMSCOUPONSPU_BASE_URL}/page`,
            method: "get",
            params: queryParams,
        });
    },
    /**
     * 获取优惠券适用的具体商品表单数据
     *
     * @param id 优惠券适用的具体商品ID
     * @returns 优惠券适用的具体商品表单数据
     */
    getFormData(id: number) {
        return request<any, SmsCouponSpuForm>({
            url: `${SMSCOUPONSPU_BASE_URL}/${id}/form`,
            method: "get",
        });
    },

    /**
     *  添加优惠券适用的具体商品
     *
     *  @param data 优惠券适用的具体商品表单数据
     */
    add(data: SmsCouponSpuForm) {
        return request({
            url: `${SMSCOUPONSPU_BASE_URL}`,
            method: "post",
            data: data,
        });
    },

    /**
     * 更新优惠券适用的具体商品
     *
     * @param id 优惠券适用的具体商品ID
     * @param data 优惠券适用的具体商品表单数据
     */
     update(id: number, data: SmsCouponSpuForm) {
        return request({
            url: `${SMSCOUPONSPU_BASE_URL}/${id}`,
            method: "put",
            data: data,
        });
    },

    /**
     * 批量删除优惠券适用的具体商品，多个以英文逗号(,)分割
     *
     * @param ids 优惠券适用的具体商品ID字符串，多个以英文逗号(,)分割
     */
     deleteByIds(ids: string) {
        return request({
            url: `${SMSCOUPONSPU_BASE_URL}/${ids}`,
            method: "delete",
        });
    }
}

export default SmsCouponSpuAPI;

/** 优惠券适用的具体商品分页查询参数 */
export interface SmsCouponSpuPageQuery extends PageQuery {
    /** 优惠券ID */
    couponId?: number;
    /** 商品ID */
    spuId?: number;
}

/** 优惠券适用的具体商品表单对象 */
export interface SmsCouponSpuForm {
    id?:  number;
    /** 优惠券ID */
    couponId?:  number;
    /** 商品ID */
    spuId?:  number;
}

/** 优惠券适用的具体商品分页对象 */
export interface SmsCouponSpuPageVO {
    id?: number;
    /** 优惠券ID */
    couponId?: number;
    /** 商品ID */
    spuId?: number;
}
