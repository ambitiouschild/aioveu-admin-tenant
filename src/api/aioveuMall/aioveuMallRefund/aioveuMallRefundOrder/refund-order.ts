import request from "@/utils/request";
import {BaseQueryParams, PageQuery} from "@/types";

const REFUNDORDER_BASE_URL = "/aioveu-tenant-refund/api/v1/refund-order";

const RefundOrderAPI = {
    /** 获取订单退款申请分页数据 */
    getPage(queryParams?: RefundOrderPageQuery) {
        return request<any, PageResult<RefundOrderPageVO[]>>({
            url: `${REFUNDORDER_BASE_URL}/page`,
            method: "get",
            params: queryParams,
        });
    },
    /**
     * 获取订单退款申请表单数据
     *
     * @param id 订单退款申请ID
     * @returns 订单退款申请表单数据
     */
    getFormData(id: number) {
        return request<any, RefundOrderForm>({
            url: `${REFUNDORDER_BASE_URL}/${id}/form`,
            method: "get",
        });
    },

    /**
     *  添加订单退款申请
     *
     *  @param data 订单退款申请表单数据
     */
    add(data: RefundOrderForm) {
        return request({
            url: `${REFUNDORDER_BASE_URL}`,
            method: "post",
            data: data,
        });
    },

    /**
     * 更新订单退款申请
     *
     * @param id 订单退款申请ID
     * @param data 订单退款申请表单数据
     */
     update(id: number, data: RefundOrderForm) {
        return request({
            url: `${REFUNDORDER_BASE_URL}/${id}`,
            method: "put",
            data: data,
        });
    },

    /**
     * 批量删除订单退款申请，多个以英文逗号(,)分割
     *
     * @param ids 订单退款申请ID字符串，多个以英文逗号(,)分割
     */
     deleteByIds(ids: string) {
        return request({
            url: `${REFUNDORDER_BASE_URL}/${ids}`,
            method: "delete",
        });
    }
}

export default RefundOrderAPI;

/** 订单退款申请分页查询参数 */
export interface RefundOrderPageQuery extends PageQuery {
    /** 订单ID */
    orderId?: number;
    /** 订单编号 */
    orderSn?: string;
    /** 退款单号 */
    refundSn?: string;
    /** 用户ID */
    userId?: number;
    /** 退款类型：1-仅退款 2-退货退款 3-换货 */
    refundType?: number;
    /** 退款状态：0-待处理 1-审核中 2-审核通过 3-审核拒绝 4-退款中 5-退款成功 6-退款失败 */
    status?: number;
}

/** 订单退款申请表单对象 */
export interface RefundOrderForm {
    /** 主键ID */
    id?:  number;
    /** 订单ID */
    orderId?:  number;
    /** 订单编号 */
    orderSn?:  string;
    /** 退款单号 */
    refundSn?:  string;
    /** 用户ID */
    userId?:  number;
    /** 退款类型：1-仅退款 2-退货退款 3-换货 */
    refundType?:  number;
    /** 退款原因 */
    refundReason?:  string;
    /** 补充说明 */
    description?:  string;
    /** 退款凭证图片（JSON数组） */
    proofImages?:  string;
    /** 申请退款金额（分） */
    refundAmount?:  number;
    /** 实际退款金额（分） */
    actualRefundAmount?:  number;
    /** 退款状态：0-待处理 1-审核中 2-审核通过 3-审核拒绝 4-退款中 5-退款成功 6-退款失败 */
    status?:  number;
    /** 处理备注 */
    handleNote?:  string;
    /** 处理人 */
    handleBy?:  string;
    /** 处理时间 */
    handleTime?:  Date;
    /** 创建时间 */
    createTime?:  Date;
    /** 更新时间 */
    updateTime?:  Date;
    /** 逻辑删除：0-正常 1-删除 */
    deleted?:  number;
    /** 版本号（用于乐观锁） */
    version?:  number;
}

/** 订单退款申请分页对象 */
export interface RefundOrderPageVO {
    /** 主键ID */
    id?: number;
    /** 订单ID */
    orderId?: number;
    /** 订单编号 */
    orderSn?: string;
    /** 退款单号 */
    refundSn?: string;
    /** 用户ID */
    userId?: number;
    /** 退款类型：1-仅退款 2-退货退款 3-换货 */
    refundType?: number;
    /** 退款原因 */
    refundReason?: string;
    /** 补充说明 */
    description?: string;
    /** 退款凭证图片（JSON数组） */
    proofImages?: string;
    /** 申请退款金额（分） */
    refundAmount?: number;
    /** 实际退款金额（分） */
    actualRefundAmount?: number;
    /** 退款状态：0-待处理 1-审核中 2-审核通过 3-审核拒绝 4-退款中 5-退款成功 6-退款失败 */
    status?: number;
    /** 处理备注 */
    handleNote?: string;
    /** 处理人 */
    handleBy?: string;
    /** 处理时间 */
    handleTime?: Date;
    /** 创建时间 */
    createTime?: Date;
    /** 更新时间 */
    updateTime?: Date;
    /** 逻辑删除：0-正常 1-删除 */
    deleted?: number;
    /** 版本号（用于乐观锁） */
    version?: number;
}
