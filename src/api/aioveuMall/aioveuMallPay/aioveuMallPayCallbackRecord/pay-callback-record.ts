import request from "@/utils/request";
// import type { PayCallbackRecordForm, PayCallbackRecordPageQuery, PayCallbackRecordPageVo } from "@/api/types";
import { BaseQueryParams, PageQuery } from "@/types";

const PAY_CALLBACK_RECORD_BASE_URL = "/aioveu-tenant-pay/api/v1/pay-callback-record";
const PAYMENT_BASE_URL = "/aioveu-tenant-pay/api/v1/pay-order";
const PayCallbackRecordAPI = {
  /** 获取支付回调记录分页数据 */
  getPage(queryParams?: PayCallbackRecordPageQuery) {
    return request<any, PageResult<PayCallbackRecordPageVo[]>>({
      url: `${PAY_CALLBACK_RECORD_BASE_URL}/page`,
      method: "get",
      params: queryParams,
    });
  },
  /**
   * 获取支付回调记录表单数据
   *
   * @param id 支付回调记录ID
   * @returns 支付回调记录表单数据
   */
  getFormData(id: number) {
    return request<any, PayCallbackRecordForm>({
      url: `${PAY_CALLBACK_RECORD_BASE_URL}/${id}/form`,
      method: "get",
    });
  },

  /**
   *  添加支付回调记录
   *
   *  @param data 支付回调记录表单数据
   */
  create(data: PayCallbackRecordForm) {
    return request({
      url: `${PAY_CALLBACK_RECORD_BASE_URL}`,
      method: "post",
      data,
    });
  },

  /**
   * 更新支付回调记录
   *
   * @param id 支付回调记录ID
   * @param data 支付回调记录表单数据
   */
  update(id: number, data: PayCallbackRecordForm) {
    return request({
      url: `${PAY_CALLBACK_RECORD_BASE_URL}/${id}`,
      method: "put",
      data,
    });
  },

  /**
   * 批量删除支付回调记录，多个以英文逗号(,)分割
   *
   * @param ids 支付回调记录ID字符串，多个以英文逗号(,)分割
   */
  deleteByIds(ids: string) {
    return request({
      url: `${PAY_CALLBACK_RECORD_BASE_URL}/${ids}`,
      method: "delete",
    });
  },

  /**
   *  手动模拟微信支付回调（仅测试环境）
   *
   */
  mockWxPayNotify(paymentNo: string) {
    return request({
      url: `${PAYMENT_BASE_URL}/mock/wxpay/notify`,
      method: "post",
      params: {
        paymentNo,
        resultCode: "SUCCESS",
      },
    });
  },

  /**
   *  手动模拟支付宝支付回调（仅测试环境）
   *
   */
  mockAliPayNotify(paymentNo: string) {
    return request({
      url: `${PAYMENT_BASE_URL}/mock/alipay/notify`,
      method: "post",
      params: {
        paymentNo,
        tradeStatus: "TRADE_SUCCESS",
      },
    });
  },
};

export default PayCallbackRecordAPI;

/**
 * PayCallbackRecord 支付回调记录类型定义
 */

/** 支付回调记录分页查询参数 */
export interface PayCallbackRecordPageQuery extends PageQuery {
  /** 租户ID，0表示平台 */
  tenantId?: number;
  /** 内部支付单号 */
  paymentNo?: string;
  /** 业务订单号 */
  orderNo?: string;
  /** 支付渠道交易号（微信transaction_id / 支付宝trade_no） */
  transactionId?: string;
  /** 支付渠道：WECHAT / ALIPAY / UNION */
  channel?: string;
  /** 回调状态：0-接收 1-处理成功 2-处理失败 */
  notifyStatus?: number;
  /** 最后一次回调时间 */
  lastNotifyTime?: string;
  /** 实际支付金额 */
  paidAmount?: number;
  /** 商户号 */
  mchId?: string;
  /** 应用ID */
  appId?: string;
  /** 创建时间 */
  createTime?: string;
}

/** 支付回调记录表单对象 */
export interface PayCallbackRecordForm {
  /** 主键ID */
  id?: number;
  /** 租户ID，0表示平台 */
  tenantId?: number;
  /** 内部支付单号 */
  paymentNo?: string;
  /** 业务订单号 */
  orderNo?: string;
  /** 支付渠道交易号（微信transaction_id / 支付宝trade_no） */
  transactionId?: string;
  /** 支付渠道：WECHAT / ALIPAY / UNION */
  channel?: string;
  /** 回调状态：0-接收 1-处理成功 2-处理失败 */
  notifyStatus?: number;
  /** 回调次数（防风暴） */
  notifyCount?: number;
  /** 最后一次回调时间 */
  lastNotifyTime?: string;
  /** 实际支付金额 */
  paidAmount?: number;
  /** 商户号 */
  mchId?: string;
  /** 应用ID */
  appId?: string;
  /** 原始回调报文（XML / JSON） */
  rawData?: string;
  /** 处理失败原因 */
  errorMsg?: string;
}

/** 支付回调记录分页对象 */
export interface PayCallbackRecordPageVo {
  /** 主键ID */
  id?: number;
  /** 租户ID，0表示平台 */
  tenantId?: number;
  /** 内部支付单号 */
  paymentNo?: string;
  /** 业务订单号 */
  orderNo?: string;
  /** 支付渠道交易号（微信transaction_id / 支付宝trade_no） */
  transactionId?: string;
  /** 支付渠道：WECHAT / ALIPAY / UNION */
  channel?: string;
  /** 回调状态：0-接收 1-处理成功 2-处理失败 */
  notifyStatus?: number;
  /** 回调次数（防风暴） */
  notifyCount?: number;
  /** 最后一次回调时间 */
  lastNotifyTime?: string;
  /** 实际支付金额 */
  paidAmount?: number;
  /** 商户号 */
  mchId?: string;
  /** 应用ID */
  appId?: string;
  /** 原始回调报文（XML / JSON） */
  rawData?: string;
  /** 处理失败原因 */
  errorMsg?: string;
  /** 逻辑删除：0-未删除 1-已删除 */
  isDeleted?: number;
  /** 创建时间 */
  createTime?: string;
  /** 更新时间 */
  updateTime?: string;
}
