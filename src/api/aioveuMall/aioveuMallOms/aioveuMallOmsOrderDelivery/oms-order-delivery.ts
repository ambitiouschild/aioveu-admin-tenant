import request from "@/utils/request";
import {BaseQueryParams, PageQuery} from "@/types";

const OMSORDERDELIVERY_BASE_URL = "/aioveu-tenant-oms/api/v1/oms-order-delivery";

const OmsOrderDeliveryAPI = {
    /** 获取订单物流记录分页数据 */
    getPage(queryParams?: OmsOrderDeliveryPageQuery) {
        return request<any, PageResult<OmsOrderDeliveryPageVO[]>>({
            url: `${OMSORDERDELIVERY_BASE_URL}/page`,
            method: "get",
            params: queryParams,
        });
    },
    /**
     * 获取订单物流记录表单数据
     *
     * @param id 订单物流记录ID
     * @returns 订单物流记录表单数据
     */
    getFormData(id: number) {
        return request<any, OmsOrderDeliveryForm>({
            url: `${OMSORDERDELIVERY_BASE_URL}/${id}/form`,
            method: "get",
        });
    },

    /**
     *  添加订单物流记录
     *
     *  @param data 订单物流记录表单数据
     */
    add(data: OmsOrderDeliveryForm) {
        return request({
            url: `${OMSORDERDELIVERY_BASE_URL}`,
            method: "post",
            data: data,
        });
    },

    /**
     * 更新订单物流记录
     *
     * @param id 订单物流记录ID
     * @param data 订单物流记录表单数据
     */
     update(id: number, data: OmsOrderDeliveryForm) {
        return request({
            url: `${OMSORDERDELIVERY_BASE_URL}/${id}`,
            method: "put",
            data: data,
        });
    },

    /**
     * 批量删除订单物流记录，多个以英文逗号(,)分割
     *
     * @param ids 订单物流记录ID字符串，多个以英文逗号(,)分割
     */
     deleteByIds(ids: string) {
        return request({
            url: `${OMSORDERDELIVERY_BASE_URL}/${ids}`,
            method: "delete",
        });
    }
}

export default OmsOrderDeliveryAPI;

/** 订单物流记录分页查询参数 */
export interface OmsOrderDeliveryPageQuery extends PageQuery {
    /** 订单id */
    orderId?: number;
    /** 物流公司(配送方式) */
    deliveryCompany?: string;
    /** 物流单号 */
    deliverySn?: string;
    /** 收货人姓名 */
    receiverName?: string;
    /** 收货人电话 */
    receiverPhone?: string;
    /** 物流状态【0->运输中；1->已收货】 */
    deliveryStatus?: number;
}

/** 订单物流记录表单对象 */
export interface OmsOrderDeliveryForm {
    /** id */
    id?:  number;
    /** 订单id */
    orderId?:  number;
    /** 物流公司(配送方式) */
    deliveryCompany?:  string;
    /** 物流单号 */
    deliverySn?:  string;
    /** 收货人姓名 */
    receiverName?:  string;
    /** 收货人电话 */
    receiverPhone?:  string;
    /** 收货人邮编 */
    receiverPostCode?:  string;
    /** 省份/直辖市 */
    receiverProvince?:  string;
    /** 城市 */
    receiverCity?:  string;
    /** 区 */
    receiverRegion?:  string;
    /** 详细地址 */
    receiverDetailAddress?:  string;
    /** 备注 */
    remark?:  string;
    /** 物流状态【0->运输中；1->已收货】 */
    deliveryStatus?:  number;
    /** 发货时间 */
    deliveryTime?:  Date;
    /** 确认收货时间 */
    receiveTime?:  Date;
    /** 逻辑删除【0->正常；1->已删除】 */
    deleted?:  number;
}

/** 订单物流记录分页对象 */
export interface OmsOrderDeliveryPageVO {
    /** id */
    id?: number;
    /** 订单id */
    orderId?: number;
    /** 物流公司(配送方式) */
    deliveryCompany?: string;
    /** 物流单号 */
    deliverySn?: string;
    /** 收货人姓名 */
    receiverName?: string;
    /** 收货人电话 */
    receiverPhone?: string;
    /** 收货人邮编 */
    receiverPostCode?: string;
    /** 省份/直辖市 */
    receiverProvince?: string;
    /** 城市 */
    receiverCity?: string;
    /** 区 */
    receiverRegion?: string;
    /** 详细地址 */
    receiverDetailAddress?: string;
    /** 备注 */
    remark?: string;
    /** 物流状态【0->运输中；1->已收货】 */
    deliveryStatus?: number;
    /** 发货时间 */
    deliveryTime?: Date;
    /** 确认收货时间 */
    receiveTime?: Date;
    /** 逻辑删除【0->正常；1->已删除】 */
    deleted?: number;
    /** 创建时间 */
    createTime?: Date;
    /** 修改时间 */
    updateTime?: Date;
}
