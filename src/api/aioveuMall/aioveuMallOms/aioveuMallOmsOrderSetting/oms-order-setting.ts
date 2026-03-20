import request from "@/utils/request";
import {BaseQueryParams, PageQuery} from "@/types";

const OMSORDERSETTING_BASE_URL = "/aioveu-tenant-oms/api/v1/oms-order-setting";

const OmsOrderSettingAPI = {
    /** 获取订单配置信息分页数据 */
    getPage(queryParams?: OmsOrderSettingPageQuery) {
        return request<any, PageResult<OmsOrderSettingPageVO[]>>({
            url: `${OMSORDERSETTING_BASE_URL}/page`,
            method: "get",
            params: queryParams,
        });
    },
    /**
     * 获取订单配置信息表单数据
     *
     * @param id 订单配置信息ID
     * @returns 订单配置信息表单数据
     */
    getFormData(id: number) {
        return request<any, OmsOrderSettingForm>({
            url: `${OMSORDERSETTING_BASE_URL}/${id}/form`,
            method: "get",
        });
    },

    /**
     *  添加订单配置信息
     *
     *  @param data 订单配置信息表单数据
     */
    add(data: OmsOrderSettingForm) {
        return request({
            url: `${OMSORDERSETTING_BASE_URL}`,
            method: "post",
            data: data,
        });
    },

    /**
     * 更新订单配置信息
     *
     * @param id 订单配置信息ID
     * @param data 订单配置信息表单数据
     */
     update(id: number, data: OmsOrderSettingForm) {
        return request({
            url: `${OMSORDERSETTING_BASE_URL}/${id}`,
            method: "put",
            data: data,
        });
    },

    /**
     * 批量删除订单配置信息，多个以英文逗号(,)分割
     *
     * @param ids 订单配置信息ID字符串，多个以英文逗号(,)分割
     */
     deleteByIds(ids: string) {
        return request({
            url: `${OMSORDERSETTING_BASE_URL}/${ids}`,
            method: "delete",
        });
    }
}

export default OmsOrderSettingAPI;

/** 订单配置信息分页查询参数 */
export interface OmsOrderSettingPageQuery extends PageQuery {
    /** 秒杀订单超时关闭时间(分) */
    flashOrderOvertime?: number;
    /** 正常订单超时时间(分) */
    normalOrderOvertime?: number;
    /** 自动完成交易时间，不能申请退货（天） */
    finishOvertime?: number;
    /** 订单完成后自动好评时间（天） */
    commentOvertime?: number;
    /** 会员等级【0-不限会员等级，全部通用；其他-对应的其他会员等级】 */
    memberLevel?: number;
    /** 逻辑删除【0->正常；1->已删除】 */
    deleted?: number;
}

/** 订单配置信息表单对象 */
export interface OmsOrderSettingForm {
    /** id */
    id?:  number;
    /** 秒杀订单超时关闭时间(分) */
    flashOrderOvertime?:  number;
    /** 正常订单超时时间(分) */
    normalOrderOvertime?:  number;
    /** 发货后自动确认收货时间（天） */
    confirmOvertime?:  number;
    /** 自动完成交易时间，不能申请退货（天） */
    finishOvertime?:  number;
    /** 订单完成后自动好评时间（天） */
    commentOvertime?:  number;
    /** 会员等级【0-不限会员等级，全部通用；其他-对应的其他会员等级】 */
    memberLevel?:  number;
    /** 逻辑删除【0->正常；1->已删除】 */
    deleted?:  number;
}

/** 订单配置信息分页对象 */
export interface OmsOrderSettingPageVO {
    /** id */
    id?: number;
    /** 秒杀订单超时关闭时间(分) */
    flashOrderOvertime?: number;
    /** 正常订单超时时间(分) */
    normalOrderOvertime?: number;
    /** 发货后自动确认收货时间（天） */
    confirmOvertime?: number;
    /** 自动完成交易时间，不能申请退货（天） */
    finishOvertime?: number;
    /** 订单完成后自动好评时间（天） */
    commentOvertime?: number;
    /** 会员等级【0-不限会员等级，全部通用；其他-对应的其他会员等级】 */
    memberLevel?: number;
    /** 逻辑删除【0->正常；1->已删除】 */
    deleted?: number;
    /** 创建时间 */
    createTime?: Date;
    /** 修改时间 */
    updateTime?: Date;
}
