import request from "@/utils/request";
import {BaseQueryParams, PageQuery} from "@/types";

const REFUNDOPERATIONLOG_BASE_URL = "/aioveu-tenant-refund/api/v1/refund-operation-log";

const RefundOperationLogAPI = {
    /** 获取退款操作记录（用于审计）分页数据 */
    getPage(queryParams?: RefundOperationLogPageQuery) {
        return request<any, PageResult<RefundOperationLogPageVO[]>>({
            url: `${REFUNDOPERATIONLOG_BASE_URL}/page`,
            method: "get",
            params: queryParams,
        });
    },
    /**
     * 获取退款操作记录（用于审计）表单数据
     *
     * @param id 退款操作记录（用于审计）ID
     * @returns 退款操作记录（用于审计）表单数据
     */
    getFormData(id: number) {
        return request<any, RefundOperationLogForm>({
            url: `${REFUNDOPERATIONLOG_BASE_URL}/${id}/form`,
            method: "get",
        });
    },

    /**
     *  添加退款操作记录（用于审计）
     *
     *  @param data 退款操作记录（用于审计）表单数据
     */
    add(data: RefundOperationLogForm) {
        return request({
            url: `${REFUNDOPERATIONLOG_BASE_URL}`,
            method: "post",
            data: data,
        });
    },

    /**
     * 更新退款操作记录（用于审计）
     *
     * @param id 退款操作记录（用于审计）ID
     * @param data 退款操作记录（用于审计）表单数据
     */
     update(id: number, data: RefundOperationLogForm) {
        return request({
            url: `${REFUNDOPERATIONLOG_BASE_URL}/${id}`,
            method: "put",
            data: data,
        });
    },

    /**
     * 批量删除退款操作记录（用于审计），多个以英文逗号(,)分割
     *
     * @param ids 退款操作记录（用于审计）ID字符串，多个以英文逗号(,)分割
     */
     deleteByIds(ids: string) {
        return request({
            url: `${REFUNDOPERATIONLOG_BASE_URL}/${ids}`,
            method: "delete",
        });
    }
}

export default RefundOperationLogAPI;

/** 退款操作记录（用于审计）分页查询参数 */
export interface RefundOperationLogPageQuery extends PageQuery {
    /** 退款申请ID */
    refundId?: number;
    /** 操作类型：1-用户申请 2-客服审核 3-财务审核 4-商家处理 5-用户操作 6-系统自动 */
    operationType?: number;
    /** 操作人ID */
    operatorId?: number;
    /** 操作人名称 */
    operatorName?: string;
    /** 操作人类型：1-用户 2-客服 3-商家 4-系统 */
    operatorType?: number;
}

/** 退款操作记录（用于审计）表单对象 */
export interface RefundOperationLogForm {
    /** 主键ID */
    id?:  number;
    /** 退款申请ID */
    refundId?:  number;
    /** 操作类型：1-用户申请 2-客服审核 3-财务审核 4-商家处理 5-用户操作 6-系统自动 */
    operationType?:  number;
    /** 操作内容 */
    operationContent?:  string;
    /** 操作人ID */
    operatorId?:  number;
    /** 操作人名称 */
    operatorName?:  string;
    /** 操作人类型：1-用户 2-客服 3-商家 4-系统 */
    operatorType?:  number;
    /** 操作前状态 */
    beforeStatus?:  number;
    /** 操作后状态 */
    afterStatus?:  number;
    /** 备注 */
    remark?:  string;
    /** 创建时间 */
    createTime?:  Date;
}

/** 退款操作记录（用于审计）分页对象 */
export interface RefundOperationLogPageVO {
    /** 主键ID */
    id?: number;
    /** 退款申请ID */
    refundId?: number;
    /** 操作类型：1-用户申请 2-客服审核 3-财务审核 4-商家处理 5-用户操作 6-系统自动 */
    operationType?: number;
    /** 操作内容 */
    operationContent?: string;
    /** 操作人ID */
    operatorId?: number;
    /** 操作人名称 */
    operatorName?: string;
    /** 操作人类型：1-用户 2-客服 3-商家 4-系统 */
    operatorType?: number;
    /** 操作前状态 */
    beforeStatus?: number;
    /** 操作后状态 */
    afterStatus?: number;
    /** 备注 */
    remark?: string;
    /** 创建时间 */
    createTime?: Date;
}
