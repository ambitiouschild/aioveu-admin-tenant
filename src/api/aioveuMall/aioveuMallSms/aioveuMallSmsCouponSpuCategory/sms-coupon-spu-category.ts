import request from "@/utils/request";
import {BaseQueryParams, PageQuery} from "@/types";

const SMSCOUPONSPUCATEGORY_BASE_URL = "/aioveu-tenant-sms/api/v1/sms-coupon-spu-category";

const SmsCouponSpuCategoryAPI = {
    /** 获取优惠券适用的具体分类分页数据 */
    getPage(queryParams?: SmsCouponSpuCategoryPageQuery) {
        return request<any, PageResult<SmsCouponSpuCategoryPageVO[]>>({
            url: `${SMSCOUPONSPUCATEGORY_BASE_URL}/page`,
            method: "get",
            params: queryParams,
        });
    },
    /**
     * 获取优惠券适用的具体分类表单数据
     *
     * @param id 优惠券适用的具体分类ID
     * @returns 优惠券适用的具体分类表单数据
     */
    getFormData(id: number) {
        return request<any, SmsCouponSpuCategoryForm>({
            url: `${SMSCOUPONSPUCATEGORY_BASE_URL}/${id}/form`,
            method: "get",
        });
    },

    /**
     *  添加优惠券适用的具体分类
     *
     *  @param data 优惠券适用的具体分类表单数据
     */
    add(data: SmsCouponSpuCategoryForm) {
        return request({
            url: `${SMSCOUPONSPUCATEGORY_BASE_URL}`,
            method: "post",
            data: data,
        });
    },

    /**
     * 更新优惠券适用的具体分类
     *
     * @param id 优惠券适用的具体分类ID
     * @param data 优惠券适用的具体分类表单数据
     */
     update(id: number, data: SmsCouponSpuCategoryForm) {
        return request({
            url: `${SMSCOUPONSPUCATEGORY_BASE_URL}/${id}`,
            method: "put",
            data: data,
        });
    },

    /**
     * 批量删除优惠券适用的具体分类，多个以英文逗号(,)分割
     *
     * @param ids 优惠券适用的具体分类ID字符串，多个以英文逗号(,)分割
     */
     deleteByIds(ids: string) {
        return request({
            url: `${SMSCOUPONSPUCATEGORY_BASE_URL}/${ids}`,
            method: "delete",
        });
    }
}

export default SmsCouponSpuCategoryAPI;

/** 优惠券适用的具体分类分页查询参数 */
export interface SmsCouponSpuCategoryPageQuery extends PageQuery {
    /** 优惠券ID */
    couponId?: number;
    /** 商品分类ID */
    categoryId?: number;
}

/** 优惠券适用的具体分类表单对象 */
export interface SmsCouponSpuCategoryForm {
    id?:  number;
    /** 优惠券ID */
    couponId?:  number;
    /** 商品分类ID */
    categoryId?:  number;
}

/** 优惠券适用的具体分类分页对象 */
export interface SmsCouponSpuCategoryPageVO {
    id?: number;
    /** 优惠券ID */
    couponId?: number;
    /** 商品分类ID */
    categoryId?: number;
}
