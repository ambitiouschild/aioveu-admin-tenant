import request from "@/utils/request";
import {BaseQueryParams, PageQuery} from "@/types";

const OMSORDERITEM_BASE_URL = "/aioveu-tenant-oms/api/v1/oms-order-item";

const OmsOrderItemAPI = {
    /** 获取订单商品信息分页数据 */
    getPage(queryParams?: OmsOrderItemPageQuery) {
        return request<any, PageResult<OmsOrderItemPageVO[]>>({
            url: `${OMSORDERITEM_BASE_URL}/page`,
            method: "get",
            params: queryParams,
        });
    },
    /**
     * 获取订单商品信息表单数据
     *
     * @param id 订单商品信息ID
     * @returns 订单商品信息表单数据
     */
    getFormData(id: number) {
        return request<any, OmsOrderItemForm>({
            url: `${OMSORDERITEM_BASE_URL}/${id}/form`,
            method: "get",
        });
    },

    /**
     *  添加订单商品信息
     *
     *  @param data 订单商品信息表单数据
     */
    add(data: OmsOrderItemForm) {
        return request({
            url: `${OMSORDERITEM_BASE_URL}`,
            method: "post",
            data: data,
        });
    },

    /**
     * 更新订单商品信息
     *
     * @param id 订单商品信息ID
     * @param data 订单商品信息表单数据
     */
     update(id: number, data: OmsOrderItemForm) {
        return request({
            url: `${OMSORDERITEM_BASE_URL}/${id}`,
            method: "put",
            data: data,
        });
    },

    /**
     * 批量删除订单商品信息，多个以英文逗号(,)分割
     *
     * @param ids 订单商品信息ID字符串，多个以英文逗号(,)分割
     */
     deleteByIds(ids: string) {
        return request({
            url: `${OMSORDERITEM_BASE_URL}/${ids}`,
            method: "delete",
        });
    }
}

export default OmsOrderItemAPI;

/** 订单商品信息分页查询参数 */
export interface OmsOrderItemPageQuery extends PageQuery {
    /** 商品名称 */
    spuName?: string;
    /** 商品编码 */
    skuSn?: string;
    /** 规格名称 */
    skuName?: string;
    /** 逻辑删除标识(1:已删除；0:正常) */
    deleted?: number;
}

/** 订单商品信息表单对象 */
export interface OmsOrderItemForm {

    /** 商品编号 */
    id?:  number;
    /** 商品名称 */
    spuName?:  string;
    /** 商品ID */
    skuId?:  number;
    /** 商品编码 */
    skuSn?:  string;
    /** 规格名称 */
    skuName?:  string;
    /** 商品图片 */
    picUrl?:  string;
    /** 商品单价(单位：分) */
    price?:  number;
    /** 商品数量 */
    quantity?:  number;
    /** 商品总价(单位：分) */
    totalAmount?:  number;
    /** 逻辑删除标识(1:已删除；0:正常) */
    deleted?:  number;
}

/** 订单商品信息分页对象 */
export interface OmsOrderItemPageVO {
    /** 订单ID */
    orderId?: number;
    /** 商品名称 */
    spuName?: string;
    /** 商品ID */
    skuId?: number;
    /** 商品编码 */
    skuSn?: string;
    /** 规格名称 */
    skuName?: string;
    /** 商品图片 */
    picUrl?: string;
    /** 商品单价(单位：分) */
    price?: number;
    /** 商品数量 */
    quantity?: number;
    /** 商品总价(单位：分) */
    totalAmount?: number;
    /** 逻辑删除标识(1:已删除；0:正常) */
    deleted?: number;
    /** 创建时间 */
    createTime?: Date;
    /** 修改时间 */
    updateTime?: Date;
}
