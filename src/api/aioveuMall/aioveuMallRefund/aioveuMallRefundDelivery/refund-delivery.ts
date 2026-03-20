import request from "@/utils/request";
import {BaseQueryParams, PageQuery} from "@/types";

const REFUNDDELIVERY_BASE_URL = "/aioveu-tenant-refund/api/v1/refund-delivery";

const RefundDeliveryAPI = {
    /** 获取退款物流信息（用于退货）分页数据 */
    getPage(queryParams?: RefundDeliveryPageQuery) {
        return request<any, PageResult<RefundDeliveryPageVO[]>>({
            url: `${REFUNDDELIVERY_BASE_URL}/page`,
            method: "get",
            params: queryParams,
        });
    },
    /**
     * 获取退款物流信息（用于退货）表单数据
     *
     * @param id 退款物流信息（用于退货）ID
     * @returns 退款物流信息（用于退货）表单数据
     */
    getFormData(id: number) {
        return request<any, RefundDeliveryForm>({
            url: `${REFUNDDELIVERY_BASE_URL}/${id}/form`,
            method: "get",
        });
    },

    /**
     *  添加退款物流信息（用于退货）
     *
     *  @param data 退款物流信息（用于退货）表单数据
     */
    add(data: RefundDeliveryForm) {
        return request({
            url: `${REFUNDDELIVERY_BASE_URL}`,
            method: "post",
            data: data,
        });
    },

    /**
     * 更新退款物流信息（用于退货）
     *
     * @param id 退款物流信息（用于退货）ID
     * @param data 退款物流信息（用于退货）表单数据
     */
     update(id: number, data: RefundDeliveryForm) {
        return request({
            url: `${REFUNDDELIVERY_BASE_URL}/${id}`,
            method: "put",
            data: data,
        });
    },

    /**
     * 批量删除退款物流信息（用于退货），多个以英文逗号(,)分割
     *
     * @param ids 退款物流信息（用于退货）ID字符串，多个以英文逗号(,)分割
     */
     deleteByIds(ids: string) {
        return request({
            url: `${REFUNDDELIVERY_BASE_URL}/${ids}`,
            method: "delete",
        });
    }
}

export default RefundDeliveryAPI;

/** 退款物流信息（用于退货）分页查询参数 */
export interface RefundDeliveryPageQuery extends PageQuery {
    /** 退款申请ID */
    refundId?: number;
    /** 物流类型：1-买家发货 2-卖家发货 3-换货发货 */
    deliveryType?: number;
    /** 物流公司 */
    deliveryCompany?: string;
    /** 物流单号 */
    deliverySn?: string;
    /** 收货人姓名 */
    receiverName?: string;
    /** 收货人电话 */
    receiverPhone?: string;
}

/** 退款物流信息（用于退货）表单对象 */
export interface RefundDeliveryForm {
    /** 主键ID */
    id?:  number;
    /** 退款申请ID */
    refundId?:  number;
    /** 物流类型：1-买家发货 2-卖家发货 3-换货发货 */
    deliveryType?:  number;
    /** 物流公司 */
    deliveryCompany?:  string;
    /** 物流单号 */
    deliverySn?:  string;
    /** 收货人姓名 */
    receiverName?:  string;
    /** 收货人电话 */
    receiverPhone?:  string;
    /** 收货地址 */
    receiverAddress?:  string;
    /** 发货时间 */
    deliveryTime?:  Date;
    /** 收货时间 */
    receiveTime?:  Date;
    /** 创建时间 */
    createTime?:  Date;
    /** 更新时间 */
    updateTime?:  Date;
    /** 逻辑删除 */
    deleted?:  number;
}

/** 退款物流信息（用于退货）分页对象 */
export interface RefundDeliveryPageVO {
    /** 主键ID */
    id?: number;
    /** 退款申请ID */
    refundId?: number;
    /** 物流类型：1-买家发货 2-卖家发货 3-换货发货 */
    deliveryType?: number;
    /** 物流公司 */
    deliveryCompany?: string;
    /** 物流单号 */
    deliverySn?: string;
    /** 收货人姓名 */
    receiverName?: string;
    /** 收货人电话 */
    receiverPhone?: string;
    /** 收货地址 */
    receiverAddress?: string;
    /** 发货时间 */
    deliveryTime?: Date;
    /** 收货时间 */
    receiveTime?: Date;
    /** 创建时间 */
    createTime?: Date;
    /** 更新时间 */
    updateTime?: Date;
    /** 逻辑删除 */
    deleted?: number;
}
