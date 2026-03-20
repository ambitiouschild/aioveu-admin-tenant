import request from "@/utils/request";
import {BaseQueryParams, PageQuery} from "@/types";

const PAYCHANNELCONFIG_BASE_URL = "/aioveu-tenant-pay/api/v1/pay-channel-config";

const PayChannelConfigAPI = {
    /** 获取支付渠道配置分页数据 */
    getPage(queryParams?: PayChannelConfigPageQuery) {
        return request<any, PageResult<PayChannelConfigPageVO[]>>({
            url: `${PAYCHANNELCONFIG_BASE_URL}/page`,
            method: "get",
            params: queryParams,
        });
    },
    /**
     * 获取支付渠道配置表单数据
     *
     * @param id 支付渠道配置ID
     * @returns 支付渠道配置表单数据
     */
    getFormData(id: number) {
        return request<any, PayChannelConfigForm>({
            url: `${PAYCHANNELCONFIG_BASE_URL}/${id}/form`,
            method: "get",
        });
    },

    /**
     *  添加支付渠道配置
     *
     *  @param data 支付渠道配置表单数据
     */
    add(data: PayChannelConfigForm) {
        return request({
            url: `${PAYCHANNELCONFIG_BASE_URL}`,
            method: "post",
            data: data,
        });
    },

    /**
     * 更新支付渠道配置
     *
     * @param id 支付渠道配置ID
     * @param data 支付渠道配置表单数据
     */
     update(id: number, data: PayChannelConfigForm) {
        return request({
            url: `${PAYCHANNELCONFIG_BASE_URL}/${id}`,
            method: "put",
            data: data,
        });
    },

    /**
     * 批量删除支付渠道配置，多个以英文逗号(,)分割
     *
     * @param ids 支付渠道配置ID字符串，多个以英文逗号(,)分割
     */
     deleteByIds(ids: string) {
        return request({
            url: `${PAYCHANNELCONFIG_BASE_URL}/${ids}`,
            method: "delete",
        });
    }
}

export default PayChannelConfigAPI;

/** 支付渠道配置分页查询参数 */
export interface PayChannelConfigPageQuery extends PageQuery {
    /** 渠道编码：ALIPAY-支付宝 WECHAT-微信 UNIONPAY-银联 */
    channelCode?: string;
    /** 渠道名称 */
    channelName?: string;
    /** 渠道类型：ONLINE-线上 OFFLINE-线下 */
    channelType?: string;
    /** 配置类型：CERT-证书 KEY-密钥 URL-地址 */
    configType?: string;
    /** 是否启用：0-禁用 1-启用 */
    isEnabled?: number;
    /** 是否默认：0-否 1-是 */
    isDefault?: number;
    /** 逻辑删除：0-未删除 1-已删除 */
    isDeleted?: number;
}

/** 支付渠道配置表单对象 */
export interface PayChannelConfigForm {
    /** 主键ID */
    id?:  number;
    /** 渠道编码：ALIPAY-支付宝 WECHAT-微信 UNIONPAY-银联 */
    channelCode?:  string;
    /** 渠道名称 */
    channelName?:  string;
    /** 渠道类型：ONLINE-线上 OFFLINE-线下 */
    channelType?:  string;
    /** 配置键 */
    configKey?:  string;
    /** 配置值 */
    configValue?:  string;
    /** 配置类型：CERT-证书 KEY-密钥 URL-地址 */
    configType?:  string;
    /** 配置描述 */
    configDesc?:  string;
    /** 是否启用：0-禁用 1-启用 */
    isEnabled?:  number;
    /** 是否默认：0-否 1-是 */
    isDefault?:  number;
    /** 优先级，数值越大优先级越高 */
    priority?:  number;
    /** 逻辑删除：0-未删除 1-已删除 */
    isDeleted?:  number;
    /** 创建人 */
    createBy?:  string;
    /** 更新人 */
    updateBy?:  string;
    /** 创建时间 */
    createTime?:  Date;
    /** 更新时间 */
    updateTime?:  Date;
}

/** 支付渠道配置分页对象 */
export interface PayChannelConfigPageVO {
    /** 主键ID */
    id?: number;
    /** 渠道编码：ALIPAY-支付宝 WECHAT-微信 UNIONPAY-银联 */
    channelCode?: string;
    /** 渠道名称 */
    channelName?: string;
    /** 渠道类型：ONLINE-线上 OFFLINE-线下 */
    channelType?: string;
    /** 配置键 */
    configKey?: string;
    /** 配置值 */
    configValue?: string;
    /** 配置类型：CERT-证书 KEY-密钥 URL-地址 */
    configType?: string;
    /** 配置描述 */
    configDesc?: string;
    /** 是否启用：0-禁用 1-启用 */
    isEnabled?: number;
    /** 是否默认：0-否 1-是 */
    isDefault?: number;
    /** 优先级，数值越大优先级越高 */
    priority?: number;
    /** 逻辑删除：0-未删除 1-已删除 */
    isDeleted?: number;
    /** 创建人 */
    createBy?: string;
    /** 更新人 */
    updateBy?: string;
    /** 创建时间 */
    createTime?: Date;
    /** 更新时间 */
    updateTime?: Date;
}
