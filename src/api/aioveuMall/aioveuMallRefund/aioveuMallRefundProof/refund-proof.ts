import request from "@/utils/request";
import {BaseQueryParams, PageQuery} from "@/types";

const REFUNDPROOF_BASE_URL = "/aioveu-tenant-refund/api/v1/refund-proof";

const RefundProofAPI = {
    /** 获取退款凭证图片分页数据 */
    getPage(queryParams?: RefundProofPageQuery) {
        return request<any, PageResult<RefundProofPageVO[]>>({
            url: `${REFUNDPROOF_BASE_URL}/page`,
            method: "get",
            params: queryParams,
        });
    },
    /**
     * 获取退款凭证图片表单数据
     *
     * @param id 退款凭证图片ID
     * @returns 退款凭证图片表单数据
     */
    getFormData(id: number) {
        return request<any, RefundProofForm>({
            url: `${REFUNDPROOF_BASE_URL}/${id}/form`,
            method: "get",
        });
    },

    /**
     *  添加退款凭证图片
     *
     *  @param data 退款凭证图片表单数据
     */
    add(data: RefundProofForm) {
        return request({
            url: `${REFUNDPROOF_BASE_URL}`,
            method: "post",
            data: data,
        });
    },

    /**
     * 更新退款凭证图片
     *
     * @param id 退款凭证图片ID
     * @param data 退款凭证图片表单数据
     */
     update(id: number, data: RefundProofForm) {
        return request({
            url: `${REFUNDPROOF_BASE_URL}/${id}`,
            method: "put",
            data: data,
        });
    },

    /**
     * 批量删除退款凭证图片，多个以英文逗号(,)分割
     *
     * @param ids 退款凭证图片ID字符串，多个以英文逗号(,)分割
     */
     deleteByIds(ids: string) {
        return request({
            url: `${REFUNDPROOF_BASE_URL}/${ids}`,
            method: "delete",
        });
    }
}

export default RefundProofAPI;

/** 退款凭证图片分页查询参数 */
export interface RefundProofPageQuery extends PageQuery {
    /** 退款申请ID */
    refundId?: number;
    /** 凭证类型：1-质量问题 2-物流问题 3-描述不符 4-其他 */
    proofType?: number;
    /** 图片描述 */
    imageDesc?: string;
}

/** 退款凭证图片表单对象 */
export interface RefundProofForm {
    /** 主键ID */
    id?:  number;
    /** 退款申请ID */
    refundId?:  number;
    /** 凭证类型：1-质量问题 2-物流问题 3-描述不符 4-其他 */
    proofType?:  number;
    /** 图片URL */
    imageUrl?:  string;
    /** 图片描述 */
    imageDesc?:  string;
    /** 创建时间 */
    createTime?:  Date;
    /** 逻辑删除 */
    deleted?:  number;
}

/** 退款凭证图片分页对象 */
export interface RefundProofPageVO {
    /** 主键ID */
    id?: number;
    /** 退款申请ID */
    refundId?: number;
    /** 凭证类型：1-质量问题 2-物流问题 3-描述不符 4-其他 */
    proofType?: number;
    /** 图片URL */
    imageUrl?: string;
    /** 图片描述 */
    imageDesc?: string;
    /** 创建时间 */
    createTime?: Date;
    /** 逻辑删除 */
    deleted?: number;
}
