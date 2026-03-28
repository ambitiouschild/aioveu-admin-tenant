import request from "@/utils/request";
// import type { PayConfigAlipayForm, PayConfigAlipayPageQuery, PayConfigAlipayPageVo } from "@/api/types";
import {BaseQueryParams, PageQuery} from "@/types";
const PAY_CONFIG_ALIPAY_BASE_URL = "/api/v1/pay-config-alipay";

const PayConfigAlipayAPI = {
    /** 获取支付宝支付配置分页数据 */
    getPage(queryParams?: PayConfigAlipayPageQuery) {
        return request<any, PageResult<PayConfigAlipayPageVo[]>>({
            url: `${PAY_CONFIG_ALIPAY_BASE_URL}/page`,
            method: "get",
            params: queryParams,
        });
    },
    /**
     * 获取支付宝支付配置表单数据
     *
     * @param id 支付宝支付配置ID
     * @returns 支付宝支付配置表单数据
     */
    getFormData(id: number) {
        return request<any, PayConfigAlipayForm>({
            url: `${PAY_CONFIG_ALIPAY_BASE_URL}/${id}/form`,
            method: "get",
        });
    },

    /**
     *  添加支付宝支付配置
     *
     *  @param data 支付宝支付配置表单数据
     */
    create(data: PayConfigAlipayForm) {
        return request({
            url: `${PAY_CONFIG_ALIPAY_BASE_URL}`,
            method: "post",
            data,
        });
    },

    /**
     * 更新支付宝支付配置
     *
     * @param id 支付宝支付配置ID
     * @param data 支付宝支付配置表单数据
     */
     update(id: number, data: PayConfigAlipayForm) {
        return request({
            url: `${PAY_CONFIG_ALIPAY_BASE_URL}/${id}`,
            method: "put",
            data,
        });
    },

    /**
     * 批量删除支付宝支付配置，多个以英文逗号(,)分割
     *
     * @param ids 支付宝支付配置ID字符串，多个以英文逗号(,)分割
     */
     deleteByIds(ids: string) {
        return request({
            url: `${PAY_CONFIG_ALIPAY_BASE_URL}/${ids}`,
            method: "delete",
        });
    }
}

export default PayConfigAlipayAPI;


/**
 * PayConfigAlipay 支付宝支付配置类型定义
 */

/** 支付宝支付配置分页查询参数 */
export interface PayConfigAlipayPageQuery extends PageQuery {
  /** 支付配置主表ID */
  configId?: number;
  /** 所属租户ID */
  tenantId?: number;
  /** 阿里应用ID */
  appId?: string;
  /** 支付宝公钥 */
  alipayPublicKey?: string;
  /** 创建人ID */
  createBy?: number;
}

/** 支付宝支付配置表单对象 */
export interface PayConfigAlipayForm {
  /** 主键ID */
  id?: number;
  /** 支付配置主表ID */
  configId?: number;
  /** 所属租户ID */
  tenantId?: number;
  /** 阿里应用ID */
  appId?: string;
  /** 应用私钥 */
  merchantPrivateKey?: string;
  /** 支付宝公钥 */
  alipayPublicKey?: string;
  /** 支付宝根证书 */
  alipayRootCert?: string;
  /** 应用公钥证书 */
  appCertPublicKey?: string;
  /** 异步通知地址 */
  notifyUrl?: string;
  /** 同步通知地址 */
  returnUrl?: string;
  /** AES加密密钥 */
  encryptKey?: string;
  /** 签名类型: RSA/RSA2 */
  signType?: string;
  /** 字符编码 */
  charset?: string;
  /** 数据格式 */
  format?: string;
  /** 网关地址 */
  gatewayUrl?: string;
  /** 沙箱网关地址 */
  sandboxGatewayUrl?: string;
  /** 是否沙箱环境: 0-否, 1-是 */
  sandbox?: number;
  /** 加密方式: AES */
  encryptType?: string;
  /** 连接超时时间(秒) */
  connectTimeout?: number;
  /** 读取超时时间(秒) */
  readTimeout?: number;
  /** 代理主机 */
  proxyHost?: string;
  /** 代理端口 */
  proxyPort?: number;
  /** 创建人ID */
  createBy?: number;
  /** 更新人ID */
  updateBy?: number;
}

/** 支付宝支付配置分页对象 */
export interface PayConfigAlipayPageVo {
  /** 主键ID */
  id?: number;
  /** 支付配置主表ID */
  configId?: number;
  /** 所属租户ID */
  tenantId?: number;
  /** 阿里应用ID */
  appId?: string;
  /** 应用私钥 */
  merchantPrivateKey?: string;
  /** 支付宝公钥 */
  alipayPublicKey?: string;
  /** 支付宝根证书 */
  alipayRootCert?: string;
  /** 应用公钥证书 */
  appCertPublicKey?: string;
  /** 异步通知地址 */
  notifyUrl?: string;
  /** 同步通知地址 */
  returnUrl?: string;
  /** AES加密密钥 */
  encryptKey?: string;
  /** 签名类型: RSA/RSA2 */
  signType?: string;
  /** 字符编码 */
  charset?: string;
  /** 数据格式 */
  format?: string;
  /** 网关地址 */
  gatewayUrl?: string;
  /** 沙箱网关地址 */
  sandboxGatewayUrl?: string;
  /** 是否沙箱环境: 0-否, 1-是 */
  sandbox?: number;
  /** 加密方式: AES */
  encryptType?: string;
  /** 连接超时时间(秒) */
  connectTimeout?: number;
  /** 读取超时时间(秒) */
  readTimeout?: number;
  /** 代理主机 */
  proxyHost?: string;
  /** 代理端口 */
  proxyPort?: number;
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
