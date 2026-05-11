import request from "@/utils/request";
// import type { MqSendRecordForm, MqSendRecordPageQuery, MqSendRecordPageVo } from "@/api/types";
import { BaseQueryParams, PageQuery } from "@/types";

const MQ_SEND_RECORD_BASE_URL = "/aioveu-tenant-pay/api/v1/mq-send-record";

const MqSendRecordAPI = {
  /** 获取MQ消息发送记录分页数据 */
  getPage(queryParams?: MqSendRecordPageQuery) {
    return request<any, PageResult<MqSendRecordPageVo[]>>({
      url: `${MQ_SEND_RECORD_BASE_URL}/page`,
      method: "get",
      params: queryParams,
    });
  },
  /**
   * 获取MQ消息发送记录表单数据
   *
   * @param id MQ消息发送记录ID
   * @returns MQ消息发送记录表单数据
   */
  getFormData(id: number) {
    return request<any, MqSendRecordForm>({
      url: `${MQ_SEND_RECORD_BASE_URL}/${id}/form`,
      method: "get",
    });
  },

  /**
   *  添加MQ消息发送记录
   *
   *  @param data MQ消息发送记录表单数据
   */
  create(data: MqSendRecordForm) {
    return request({
      url: `${MQ_SEND_RECORD_BASE_URL}`,
      method: "post",
      data,
    });
  },

  /**
   * 更新MQ消息发送记录
   *
   * @param id MQ消息发送记录ID
   * @param data MQ消息发送记录表单数据
   */
  update(id: number, data: MqSendRecordForm) {
    return request({
      url: `${MQ_SEND_RECORD_BASE_URL}/${id}`,
      method: "put",
      data,
    });
  },

  /**
   * 批量删除MQ消息发送记录，多个以英文逗号(,)分割
   *
   * @param ids MQ消息发送记录ID字符串，多个以英文逗号(,)分割
   */
  deleteByIds(ids: string) {
    return request({
      url: `${MQ_SEND_RECORD_BASE_URL}/${ids}`,
      method: "delete",
    });
  },
};

export default MqSendRecordAPI;

/**
 * MqSendRecord MQ消息发送记录类型定义
 */

/** MQ消息发送记录分页查询参数 */
export interface MqSendRecordPageQuery extends PageQuery {
  /** 租户ID，0表示平台默认 */
  tenantId?: number;
  /** 消息ID */
  messageId?: string;
  /** 业务ID(支付单号) */
  bizId?: string;
  /** 业务类型:payment_success */
  bizType?: string;
  /** Tag */
  tag?: string;
  /** 发送状态:0-未发送,1-发送中,2-发送成功,3-发送失败 */
  sendStatus?: number;
  /** 发送时间 */
  sendTime?: string;
  /** 确认时间 */
  confirmTime?: string;
  /** 错误信息 */
  errorMsg?: string;
}

/** MQ消息发送记录表单对象 */
export interface MqSendRecordForm {
  id?: number;
  /** 租户ID，0表示平台默认 */
  tenantId?: number;
  /** 消息ID */
  messageId?: string;
  /** 业务ID(支付单号) */
  bizId?: string;
  /** 业务类型:payment_success */
  bizType?: string;
  /** Topic */
  topic?: string;
  /** Tag */
  tag?: string;
  /** 分片Key */
  shardingKey?: string;
  /** 消息体(JSON格式) */
  messageBody?: string;
  /** 发送状态:0-未发送,1-发送中,2-发送成功,3-发送失败 */
  sendStatus?: number;
  /** 重试次数 */
  retryCount?: number;
  /** 最大重试次数 */
  maxRetry?: number;
  /** 下次重试时间 */
  nextRetryTime?: string;
  /** 发送时间 */
  sendTime?: string;
  /** 确认时间 */
  confirmTime?: string;
  /** 错误信息 */
  errorMsg?: string;
}

/** MQ消息发送记录分页对象 */
export interface MqSendRecordPageVo {
  id?: number;
  /** 租户ID，0表示平台默认 */
  tenantId?: number;
  /** 消息ID */
  messageId?: string;
  /** 业务ID(支付单号) */
  bizId?: string;
  /** 业务类型:payment_success */
  bizType?: string;
  /** Topic */
  topic?: string;
  /** Tag */
  tag?: string;
  /** 分片Key */
  shardingKey?: string;
  /** 消息体(JSON格式) */
  messageBody?: string;
  /** 发送状态:0-未发送,1-发送中,2-发送成功,3-发送失败 */
  sendStatus?: number;
  /** 重试次数 */
  retryCount?: number;
  /** 最大重试次数 */
  maxRetry?: number;
  /** 下次重试时间 */
  nextRetryTime?: string;
  /** 发送时间 */
  sendTime?: string;
  /** 确认时间 */
  confirmTime?: string;
  /** 错误信息 */
  errorMsg?: string;
  /** 逻辑删除：0-未删除 1-已删除 */
  isDeleted?: number;
  /** 创建时间 */
  createTime?: string;
  /** 更新时间 */
  updateTime?: string;
}
