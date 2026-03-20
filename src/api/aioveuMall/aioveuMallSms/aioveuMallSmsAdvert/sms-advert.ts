import request from "@/utils/request";
import {BaseQueryParams, PageQuery} from "@/types";

const SMSADVERT_BASE_URL = "/aioveu-tenant-sms/api/v1/sms-advert";

const SmsAdvertAPI = {
    /** 获取广告分页数据 */
    getPage(queryParams?: SmsAdvertPageQuery) {
        return request<any, PageResult<SmsAdvertPageVO[]>>({
            url: `${SMSADVERT_BASE_URL}/page`,
            method: "get",
            params: queryParams,
        });
    },
    /**
     * 获取广告表单数据
     *
     * @param id 广告ID
     * @returns 广告表单数据
     */
    getFormData(id: number) {
        return request<any, SmsAdvertForm>({
            url: `${SMSADVERT_BASE_URL}/${id}/form`,
            method: "get",
        });
    },

    /**
     *  添加广告
     *
     *  @param data 广告表单数据
     */
    add(data: SmsAdvertForm) {
        return request({
            url: `${SMSADVERT_BASE_URL}`,
            method: "post",
            data: data,
        });
    },

    /**
     * 更新广告
     *
     * @param id 广告ID
     * @param data 广告表单数据
     */
     update(id: number, data: SmsAdvertForm) {
        return request({
            url: `${SMSADVERT_BASE_URL}/${id}`,
            method: "put",
            data: data,
        });
    },

    /**
     * 批量删除广告，多个以英文逗号(,)分割
     *
     * @param ids 广告ID字符串，多个以英文逗号(,)分割
     */
     deleteByIds(ids: string) {
        return request({
            url: `${SMSADVERT_BASE_URL}/${ids}`,
            method: "delete",
        });
    }
}

export default SmsAdvertAPI;

/** 广告分页查询参数 */
export interface SmsAdvertPageQuery extends PageQuery {
    /** 广告标题 */
    title?: string;
    /** 状态(1:开启；0:关闭) */
    status?: number;
}

/** 广告表单对象 */
export interface SmsAdvertForm {
    /** 广告ID */
    id?:  number;
    /** 广告标题 */
    title?:  string;
    /** 图片地址 */
    imageUrl?:  string;
    /** 开始时间 */
    startTime?:  Date;
    /** 结束时间 */
    endTime?:  Date;
    /** 状态(1:开启；0:关闭) */
    status?:  number;
    /** 排序 */
    sort?:  number;
    /** 跳转链接 */
    redirectUrl?:  string;
    /** 备注 */
    remark?:  string;
}

/** 广告分页对象 */
export interface SmsAdvertPageVO {
    /** 广告ID */
    id?: number;
    /** 广告标题 */
    title?: string;
    /** 图片地址 */
    imageUrl?: string;
    /** 开始时间 */
    startTime?: Date;
    /** 结束时间 */
    endTime?: Date;
    /** 状态(1:开启；0:关闭) */
    status?: number;
    /** 排序 */
    sort?: number;
    /** 跳转链接 */
    redirectUrl?: string;
    /** 备注 */
    remark?: string;
    /** 创建时间 */
    createTime?: Date;
    /** 更新时间(新增有值) */
    updateTime?: Date;
}
