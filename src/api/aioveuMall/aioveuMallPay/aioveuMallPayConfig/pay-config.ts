import request from "@/utils/request";
// import type { PayConfigForm, PayConfigPageQuery, PayConfigPageVo } from "@/api/types";
import {BaseQueryParams, PageQuery} from "@/types";
const PAY_CONFIG_BASE_URL = "/api/v1/pay-config";

const PayConfigAPI = {
    /** 获取支付配置主表分页数据 */
    getPage(queryParams?: PayConfigPageQuery) {
        return request<any, PageResult<PayConfigPageVo[]>>({
            url: `${PAY_CONFIG_BASE_URL}/page`,
            method: "get",
            params: queryParams,
        });
    },
    /**
     * 获取支付配置主表表单数据
     *
     * @param id 支付配置主表ID
     * @returns 支付配置主表表单数据
     */
    getFormData(id: number) {
        return request<any, PayConfigForm>({
            url: `${PAY_CONFIG_BASE_URL}/${id}/form`,
            method: "get",
        });
    },

    /**
     *  添加支付配置主表
     *
     *  @param data 支付配置主表表单数据
     */
    create(data: PayConfigForm) {
        return request({
            url: `${PAY_CONFIG_BASE_URL}`,
            method: "post",
            data,
        });
    },

    /**
     * 更新支付配置主表
     *
     * @param id 支付配置主表ID
     * @param data 支付配置主表表单数据
     */
     update(id: number, data: PayConfigForm) {
        return request({
            url: `${PAY_CONFIG_BASE_URL}/${id}`,
            method: "put",
            data,
        });
    },

    /**
     * 批量删除支付配置主表，多个以英文逗号(,)分割
     *
     * @param ids 支付配置主表ID字符串，多个以英文逗号(,)分割
     */
     deleteByIds(ids: string) {
        return request({
            url: `${PAY_CONFIG_BASE_URL}/${ids}`,
            method: "delete",
        });
    }
}

export default PayConfigAPI;

/**
 * PayConfig 支付配置主表类型定义
 */

/** 支付配置主表分页查询参数 */
export interface PayConfigPageQuery extends PageQuery {
  /** 租户ID */
  tenantId?: number;
  /** 配置编码（唯一标识） */
  configCode?: string;
  /** 配置名称 */
  configName?: string;
  /** 支付平台类型: WECHAT-微信支付, ALIPAY-支付宝, DUMMY-模拟支付 */
  platformType?: string;
  /** 支付类型: APP-APP支付, JSAPI-公众号支付, NATIVE-扫码支付, MWEB-H5支付, MINIPROGRAM-小程序支付, FACE-刷脸支付 */
  payType?: string;
  /** 是否启用: 0-禁用, 1-启用 */
  enabled?: number;
  /** 是否默认配置: 0-否, 1-是 */
  isDefault?: number;
}

/** 支付配置主表表单对象 */
export interface PayConfigForm {
  /** 主键ID */
  id?: number;
  /** 租户ID */
  tenantId?: number;
  /** 配置编码（唯一标识） */
  configCode?: string;
  /** 配置名称 */
  configName?: string;
  /** 支付平台类型: WECHAT-微信支付, ALIPAY-支付宝, DUMMY-模拟支付 */
  platformType?: string;
  /** 支付类型: APP-APP支付, JSAPI-公众号支付, NATIVE-扫码支付, MWEB-H5支付, MINIPROGRAM-小程序支付, FACE-刷脸支付 */
  payType?: string;
  /** 是否启用: 0-禁用, 1-启用 */
  enabled?: number;
  /** 是否默认配置: 0-否, 1-是 */
  isDefault?: number;
  /** 排序 */
  sort?: number;
  /** 备注 */
  remark?: string;
  /** 创建人ID */
  createBy?: number;
  /** 更新人ID */
  updateBy?: number;
}

/** 支付配置主表分页对象 */
export interface PayConfigPageVo {
  /** 主键ID */
  id?: number;
  /** 租户ID */
  tenantId?: number;
  /** 配置编码（唯一标识） */
  configCode?: string;
  /** 配置名称 */
  configName?: string;
  /** 支付平台类型: WECHAT-微信支付, ALIPAY-支付宝, DUMMY-模拟支付 */
  platformType?: string;
  /** 支付类型: APP-APP支付, JSAPI-公众号支付, NATIVE-扫码支付, MWEB-H5支付, MINIPROGRAM-小程序支付, FACE-刷脸支付 */
  payType?: string;
  /** 是否启用: 0-禁用, 1-启用 */
  enabled?: number;
  /** 是否默认配置: 0-否, 1-是 */
  isDefault?: number;
  /** 排序 */
  sort?: number;
  /** 备注 */
  remark?: string;
  /** 逻辑删除：0-未删除 1-已删除 */
  isDeleted?: number;
  /** 创建时间 */
  createTime?: string;
  /** 更新时间 */
  updateTime?: string;
  /** 创建人ID */
  createBy?: number;
  /** 更新人ID */
  updateBy?: number;
}
