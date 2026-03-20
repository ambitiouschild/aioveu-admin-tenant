import request from "@/utils/request";
import {BaseQueryParams, PageQuery} from "@/types";

const REFUNDITEM_BASE_URL = "/aioveu-tenant-refund/api/v1/refund-item";

const RefundItemAPI = {
    /** 获取退款商品明细分页数据 */
    getPage(queryParams?: RefundItemPageQuery) {
        return request<any, PageResult<RefundItemPageVO[]>>({
            url: `${REFUNDITEM_BASE_URL}/page`,
            method: "get",
            params: queryParams,
        });
    },
    /**
     * 获取退款商品明细表单数据
     *
     * @param id 退款商品明细ID
     * @returns 退款商品明细表单数据
     */
    getFormData(id: number) {
        return request<any, RefundItemForm>({
            url: `${REFUNDITEM_BASE_URL}/${id}/form`,
            method: "get",
        });
    },

    /**
     *  添加退款商品明细
     *
     *  @param data 退款商品明细表单数据
     */
    add(data: RefundItemForm) {
        return request({
            url: `${REFUNDITEM_BASE_URL}`,
            method: "post",
            data: data,
        });
    },

    /**
     * 更新退款商品明细
     *
     * @param id 退款商品明细ID
     * @param data 退款商品明细表单数据
     */
     update(id: number, data: RefundItemForm) {
        return request({
            url: `${REFUNDITEM_BASE_URL}/${id}`,
            method: "put",
            data: data,
        });
    },

    /**
     * 批量删除退款商品明细，多个以英文逗号(,)分割
     *
     * @param ids 退款商品明细ID字符串，多个以英文逗号(,)分割
     */
     deleteByIds(ids: string) {
        return request({
            url: `${REFUNDITEM_BASE_URL}/${ids}`,
            method: "delete",
        });
    }
}

export default RefundItemAPI;

/** 退款商品明细分页查询参数 */
export interface RefundItemPageQuery extends PageQuery {
    /** 退款申请ID */
    refundId?: number;
    /** 退款类型（冗余字段，与主表一致） */
    refundType?: number;
    /** 订单项ID */
    orderItemId?: number;
    /** 商品ID */
    spuId?: number;
    /** 商品名称 */
    spuName?: string;
    /** SKU ID */
    skuId?: number;
    /** SKU名称 */
    skuName?: string;
}

/** 退款商品明细表单对象 */
export interface RefundItemForm {
    /** 主键ID */
    id?:  number;
    /** 退款申请ID */
    refundId?:  number;
    /** 退款类型（冗余字段，与主表一致） */
    refundType?:  number;
    /** 订单项ID */
    orderItemId?:  number;
    /** 商品ID */
    spuId?:  number;
    /** 商品名称 */
    spuName?:  string;
    /** SKU ID */
    skuId?:  number;
    /** SKU名称 */
    skuName?:  string;
    /** 商品图片 */
    picUrl?:  string;
    /** 商品单价（分） */
    price?:  number;
    /** 退款数量 */
    quantity?:  number;
    /** 退款金额（分） */
    refundAmount?:  number;
    /** 该商品的退款原因 */
    refundReason?:  string;
    /** 创建时间 */
    createTime?:  Date;
    /** 更新时间 */
    updateTime?:  Date;
    /** 逻辑删除 */
    deleted?:  number;
}

/** 退款商品明细分页对象 */
export interface RefundItemPageVO {
    /** 主键ID */
    id?: number;
    /** 退款申请ID */
    refundId?: number;
    /** 退款类型（冗余字段，与主表一致） */
    refundType?: number;
    /** 订单项ID */
    orderItemId?: number;
    /** 商品ID */
    spuId?: number;
    /** 商品名称 */
    spuName?: string;
    /** SKU ID */
    skuId?: number;
    /** SKU名称 */
    skuName?: string;
    /** 商品图片 */
    picUrl?: string;
    /** 商品单价（分） */
    price?: number;
    /** 退款数量 */
    quantity?: number;
    /** 退款金额（分） */
    refundAmount?: number;
    /** 该商品的退款原因 */
    refundReason?: string;
    /** 创建时间 */
    createTime?: Date;
    /** 更新时间 */
    updateTime?: Date;
    /** 逻辑删除 */
    deleted?: number;
}
