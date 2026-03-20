import request from "@/utils/request";
import {BaseQueryParams, PageQuery} from "@/types";

const REFUNDREASON_BASE_URL = "/aioveu-tenant-refund/api/v1/refund-reason";

const RefundReasonAPI = {
    /** 获取退款原因分类分页数据 */
    getPage(queryParams?: RefundReasonPageQuery) {
        return request<any, PageResult<RefundReasonPageVO[]>>({
            url: `${REFUNDREASON_BASE_URL}/page`,
            method: "get",
            params: queryParams,
        });
    },
    /**
     * 获取退款原因分类表单数据
     *
     * @param id 退款原因分类ID
     * @returns 退款原因分类表单数据
     */
    getFormData(id: number) {
        return request<any, RefundReasonForm>({
            url: `${REFUNDREASON_BASE_URL}/${id}/form`,
            method: "get",
        });
    },

    /**
     *  添加退款原因分类
     *
     *  @param data 退款原因分类表单数据
     */
    add(data: RefundReasonForm) {
        return request({
            url: `${REFUNDREASON_BASE_URL}`,
            method: "post",
            data: data,
        });
    },

    /**
     * 更新退款原因分类
     *
     * @param id 退款原因分类ID
     * @param data 退款原因分类表单数据
     */
     update(id: number, data: RefundReasonForm) {
        return request({
            url: `${REFUNDREASON_BASE_URL}/${id}`,
            method: "put",
            data: data,
        });
    },

    /**
     * 批量删除退款原因分类，多个以英文逗号(,)分割
     *
     * @param ids 退款原因分类ID字符串，多个以英文逗号(,)分割
     */
     deleteByIds(ids: string) {
        return request({
            url: `${REFUNDREASON_BASE_URL}/${ids}`,
            method: "delete",
        });
    }
}

export default RefundReasonAPI;

/** 退款原因分类分页查询参数 */
export interface RefundReasonPageQuery extends PageQuery {
    /** 原因类型：1-仅退款原因 2-退货退款原因 3-换货原因 */
    reasonType?: number;
    /** 原因内容 */
    reasonContent?: string;
    /** 状态：0-禁用 1-启用 */
    status?: number;
}

/** 退款原因分类表单对象 */
export interface RefundReasonForm {
    /** 主键ID */
    id?:  number;
    /** 原因类型：1-仅退款原因 2-退货退款原因 3-换货原因 */
    reasonType?:  number;
    /** 原因内容 */
    reasonContent?:  string;
    /** 排序 */
    sort?:  number;
    /** 状态：0-禁用 1-启用 */
    status?:  number;
    /** 创建时间 */
    createTime?:  Date;
    /** 更新时间 */
    updateTime?:  Date;
}

/** 退款原因分类分页对象 */
export interface RefundReasonPageVO {
    /** 主键ID */
    id?: number;
    /** 原因类型：1-仅退款原因 2-退货退款原因 3-换货原因 */
    reasonType?: number;
    /** 原因内容 */
    reasonContent?: string;
    /** 排序 */
    sort?: number;
    /** 状态：0-禁用 1-启用 */
    status?: number;
    /** 创建时间 */
    createTime?: Date;
    /** 更新时间 */
    updateTime?: Date;
}
