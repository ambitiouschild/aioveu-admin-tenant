import request from "@/utils/request";
import {BaseQueryParams, PageQuery} from "@/types";

const OMSORDERLOG_BASE_URL = "/aioveu-tenant-oms/api/v1/oms-order-log";

const OmsOrderLogAPI = {
    /** 获取订单操作历史记录分页数据 */
    getPage(queryParams?: OmsOrderLogPageQuery) {
        return request<any, PageResult<OmsOrderLogPageVO[]>>({
            url: `${OMSORDERLOG_BASE_URL}/page`,
            method: "get",
            params: queryParams,
        });
    },
    /**
     * 获取订单操作历史记录表单数据
     *
     * @param id 订单操作历史记录ID
     * @returns 订单操作历史记录表单数据
     */
    getFormData(id: number) {
        return request<any, OmsOrderLogForm>({
            url: `${OMSORDERLOG_BASE_URL}/${id}/form`,
            method: "get",
        });
    },

    /**
     *  添加订单操作历史记录
     *
     *  @param data 订单操作历史记录表单数据
     */
    add(data: OmsOrderLogForm) {
        return request({
            url: `${OMSORDERLOG_BASE_URL}`,
            method: "post",
            data: data,
        });
    },

    /**
     * 更新订单操作历史记录
     *
     * @param id 订单操作历史记录ID
     * @param data 订单操作历史记录表单数据
     */
     update(id: number, data: OmsOrderLogForm) {
        return request({
            url: `${OMSORDERLOG_BASE_URL}/${id}`,
            method: "put",
            data: data,
        });
    },

    /**
     * 批量删除订单操作历史记录，多个以英文逗号(,)分割
     *
     * @param ids 订单操作历史记录ID字符串，多个以英文逗号(,)分割
     */
     deleteByIds(ids: string) {
        return request({
            url: `${OMSORDERLOG_BASE_URL}/${ids}`,
            method: "delete",
        });
    }
}

export default OmsOrderLogAPI;

/** 订单操作历史记录分页查询参数 */
export interface OmsOrderLogPageQuery extends PageQuery {
    /** 订单id */
    orderId?: number;
    /** 操作人[用户；系统；后台管理员] */
    user?: string;
    /** 操作时订单状态 */
    orderStatus?: number;
    /** 逻辑删除【0->正常；1->已删除】 */
    deleted?: number;
}

/** 订单操作历史记录表单对象 */
export interface OmsOrderLogForm {
    /** id */
    id?:  number;
    /** 订单id */
    orderId?:  number;
    /** 操作人[用户；系统；后台管理员] */
    user?:  string;
    /** 操作详情 */
    detail?:  string;
    /** 操作时订单状态 */
    orderStatus?:  number;
    /** 备注 */
    remark?:  string;
    /** 逻辑删除【0->正常；1->已删除】 */
    deleted?:  number;
}

/** 订单操作历史记录分页对象 */
export interface OmsOrderLogPageVO {
    /** id */
    id?: number;
    /** 订单id */
    orderId?: number;
    /** 操作人[用户；系统；后台管理员] */
    user?: string;
    /** 操作详情 */
    detail?: string;
    /** 操作时订单状态 */
    orderStatus?: number;
    /** 备注 */
    remark?: string;
    /** 逻辑删除【0->正常；1->已删除】 */
    deleted?: number;
    /** 创建时间 */
    createTime?: Date;
    /** 修改时间 */
    updateTime?: Date;
}
