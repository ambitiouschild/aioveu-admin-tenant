import request from "@/utils/request";
// import type { PayConfigWechatForm, PayConfigWechatPageQuery, PayConfigWechatPageVo } from "@/api/types";
import {BaseQueryParams, PageQuery} from "@/types";
const PAY_CONFIG_WECHAT_BASE_URL = "/api/v1/pay-config-wechat";

const PayConfigWechatAPI = {
    /** 获取微信支付配置分页数据 */
    getPage(queryParams?: PayConfigWechatPageQuery) {
        return request<any, PageResult<PayConfigWechatPageVo[]>>({
            url: `${PAY_CONFIG_WECHAT_BASE_URL}/page`,
            method: "get",
            params: queryParams,
        });
    },
    /**
     * 获取微信支付配置表单数据
     *
     * @param id 微信支付配置ID
     * @returns 微信支付配置表单数据
     */
    getFormData(id: number) {
        return request<any, PayConfigWechatForm>({
            url: `${PAY_CONFIG_WECHAT_BASE_URL}/${id}/form`,
            method: "get",
        });
    },

    /**
     *  添加微信支付配置
     *
     *  @param data 微信支付配置表单数据
     */
    create(data: PayConfigWechatForm) {
        return request({
            url: `${PAY_CONFIG_WECHAT_BASE_URL}`,
            method: "post",
            data,
        });
    },

    /**
     * 更新微信支付配置
     *
     * @param id 微信支付配置ID
     * @param data 微信支付配置表单数据
     */
     update(id: number, data: PayConfigWechatForm) {
        return request({
            url: `${PAY_CONFIG_WECHAT_BASE_URL}/${id}`,
            method: "put",
            data,
        });
    },

    /**
     * 批量删除微信支付配置，多个以英文逗号(,)分割
     *
     * @param ids 微信支付配置ID字符串，多个以英文逗号(,)分割
     */
     deleteByIds(ids: string) {
        return request({
            url: `${PAY_CONFIG_WECHAT_BASE_URL}/${ids}`,
            method: "delete",
        });
    }
}

export default PayConfigWechatAPI;

/**
 * PayConfigWechat 微信支付配置类型定义
 */

/** 微信支付配置分页查询参数 */
export interface PayConfigWechatPageQuery extends PageQuery {
  /** 支付配置主表ID */
  configId?: number;
  /** 租户ID */
  tenantId?: number;
  /** 微信应用ID(公众号/小程序/APP等) */
  appId?: string;
  /** 微信商户号(10位数字) */
  mchId?: string;
  /** 商户证书序列号 */
  mchSerialNo?: string;
  /** 微信支付公钥ID */
  wechatpayPublicKeyId?: string;
  /** 创建人ID */
  createBy?: number;
}

/** 微信支付配置表单对象 */
export interface PayConfigWechatForm {
  /** 主键ID */
  id?: number;
  /** 支付配置主表ID */
  configId?: number;
  /** 租户ID */
  tenantId?: number;
  /** 微信应用ID(公众号/小程序/APP等) */
  appId?: string;
  /** 微信商户号(10位数字) */
  mchId?: string;
  /** 商户API密钥V2 */
  mchKey?: string;
  /** APIv3密钥(32位字符) */
  apiV3Key?: string;
  /** 商户证书序列号 */
  mchSerialNo?: string;
  /** 商户私钥内容(PKCS#8格式) */
  privateKey?: string;
  /** 商户私钥文件路径 */
  privateKeyPath?: string;
  /** 微信支付公钥ID */
  wechatpayPublicKeyId?: string;
  /** 微信支付公钥内容 */
  wechatpayPublicKey?: string;
  /** 微信支付公钥文件路径 */
  wechatpayPublicKeyPath?: string;
  /** 平台证书序列号 */
  platformCertSerialNo?: string;
  /** 平台证书文件路径 */
  platformCertPath?: string;
  /** 网关地址 */
  apiDomain?: string;
  /** 连接超时时间(秒) */
  connectTimeout?: number;
  /** 读取超时时间(秒) */
  readTimeout?: number;
  /** 支付异步通知地址 */
  notifyUrl?: string;
  /** 退款异步通知地址 */
  refundNotifyUrl?: string;
  /** 是否沙箱环境: 0-否, 1-是 */
  sandbox?: number;
  /** 签名类型: RSA, HMAC-SHA256 */
  signType?: string;
  /** 证书存储方式: FILE-文件, STRING-字符串, CLOUD-云存储 */
  certStoreType?: string;
  /** 是否自动下载平台证书: 0-否, 1-是 */
  autoDownloadCert?: number;
  /** 子商户应用ID */
  subAppId?: string;
  /** 子商户号 */
  subMchId?: string;
  /** 是否支持分账: 0-否, 1-是 */
  profitSharing?: number;
  /** 创建人ID */
  createBy?: number;
  /** 更新人ID */
  updateBy?: number;
}

/** 微信支付配置分页对象 */
export interface PayConfigWechatPageVo {
  /** 主键ID */
  id?: number;
  /** 支付配置主表ID */
  configId?: number;
  /** 租户ID */
  tenantId?: number;
  /** 微信应用ID(公众号/小程序/APP等) */
  appId?: string;
  /** 微信商户号(10位数字) */
  mchId?: string;
  /** 商户API密钥V2 */
  mchKey?: string;
  /** APIv3密钥(32位字符) */
  apiV3Key?: string;
  /** 商户证书序列号 */
  mchSerialNo?: string;
  /** 商户私钥内容(PKCS#8格式) */
  privateKey?: string;
  /** 商户私钥文件路径 */
  privateKeyPath?: string;
  /** 微信支付公钥ID */
  wechatpayPublicKeyId?: string;
  /** 微信支付公钥内容 */
  wechatpayPublicKey?: string;
  /** 微信支付公钥文件路径 */
  wechatpayPublicKeyPath?: string;
  /** 平台证书序列号 */
  platformCertSerialNo?: string;
  /** 平台证书文件路径 */
  platformCertPath?: string;
  /** 网关地址 */
  apiDomain?: string;
  /** 连接超时时间(秒) */
  connectTimeout?: number;
  /** 读取超时时间(秒) */
  readTimeout?: number;
  /** 支付异步通知地址 */
  notifyUrl?: string;
  /** 退款异步通知地址 */
  refundNotifyUrl?: string;
  /** 是否沙箱环境: 0-否, 1-是 */
  sandbox?: number;
  /** 签名类型: RSA, HMAC-SHA256 */
  signType?: string;
  /** 证书存储方式: FILE-文件, STRING-字符串, CLOUD-云存储 */
  certStoreType?: string;
  /** 是否自动下载平台证书: 0-否, 1-是 */
  autoDownloadCert?: number;
  /** 子商户应用ID */
  subAppId?: string;
  /** 子商户号 */
  subMchId?: string;
  /** 是否支持分账: 0-否, 1-是 */
  profitSharing?: number;
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
