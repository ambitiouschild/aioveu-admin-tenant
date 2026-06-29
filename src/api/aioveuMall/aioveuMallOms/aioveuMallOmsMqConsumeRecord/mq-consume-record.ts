import request from "@/utils/request";
// import type { MqConsumeRecordForm, MqConsumeRecordPageQuery, MqConsumeRecordPageVo } from "@/api/types";
import { PageQuery } from "@/types";
const MQ_CONSUME_RECORD_BASE_URL = "/aioveu/api/v8/admin/oms/mq-consume-record";

const MqConsumeRecordAPI = {
  /** 获取MQ消息消费记录分页数据 */
  getPage(queryParams?: MqConsumeRecordPageQuery) {
    return request<any, PageResult<MqConsumeRecordPageVo[]>>({
      url: `${MQ_CONSUME_RECORD_BASE_URL}/page`,
      method: "get",
      params: queryParams,
    });
  },
  /**
   * 获取MQ消息消费记录表单数据
   *
   * @param id MQ消息消费记录ID
   * @returns MQ消息消费记录表单数据
   */
  getFormData(id: number) {
    return request<any, MqConsumeRecordForm>({
      url: `${MQ_CONSUME_RECORD_BASE_URL}/${id}/form`,
      method: "get",
    });
  },

  /**
   *  添加MQ消息消费记录
   *
   *  @param data MQ消息消费记录表单数据
   */
  create(data: MqConsumeRecordForm) {
    return request({
      url: `${MQ_CONSUME_RECORD_BASE_URL}`,
      method: "post",
      data,
    });
  },

  /**
   * 更新MQ消息消费记录
   *
   * @param id MQ消息消费记录ID
   * @param data MQ消息消费记录表单数据
   */
  update(id: number, data: MqConsumeRecordForm) {
    return request({
      url: `${MQ_CONSUME_RECORD_BASE_URL}/${id}`,
      method: "put",
      data,
    });
  },

  /**
   * 批量删除MQ消息消费记录，多个以英文逗号(,)分割
   *
   * @param ids MQ消息消费记录ID字符串，多个以英文逗号(,)分割
   */
  deleteByIds(ids: string) {
    return request({
      url: `${MQ_CONSUME_RECORD_BASE_URL}/${ids}`,
      method: "delete",
    });
  },
};

export default MqConsumeRecordAPI;

/**
 * MqConsumeRecord MQ消息消费记录类型定义
 */

/** MQ消息消费记录分页查询参数 */
export interface MqConsumeRecordPageQuery extends PageQuery {
  /** 租户ID，0表示平台默认 */
  tenantId?: number;
  /** 消息ID */
  messageId?: string;
  /** Topic */
  topic?: string;
  /** Tag */
  tag?: string;
  /** 业务ID(订单号) */
  bizId?: string;
  /** 最大重试次数 */
  maxRetry?: number;
}

/** MQ消息消费记录表单对象 */
export interface MqConsumeRecordForm {
  id?: number;
  /** 租户ID，0表示平台默认 */
  tenantId?: number;
  /** 消息ID */
  messageId?: string;
  /** Topic */
  topic?: string;
  /** Tag */
  tag?: string;
  /** 消费者组 */
  consumerGroup?: string;
  /** 业务ID(订单号) */
  bizId?: string;
  /** 消费状态:0-未消费,1-消费中,2-消费成功,3-消费失败,4-进入死信 */
  consumeStatus?: number;
  /** 重试次数 */
  retryCount?: number;
  /** 最大重试次数 */
  maxRetry?: number;
  /** 下次重试时间 */
  nextRetryTime?: string;
  /** 消费时间 */
  consumeTime?: string;
  /** 完成时间 */
  finishTime?: string;
  /** 错误信息 */
  errorMsg?: string;
}

/** MQ消息消费记录分页对象 */
export interface MqConsumeRecordPageVo {
  id?: number;
  /** 租户ID，0表示平台默认 */
  tenantId?: number;
  /** 消息ID */
  messageId?: string;
  /** Topic */
  topic?: string;
  /** Tag */
  tag?: string;
  /** 消费者组 */
  consumerGroup?: string;
  /** 业务ID(订单号) */
  bizId?: string;
  /** 消费状态:0-未消费,1-消费中,2-消费成功,3-消费失败,4-进入死信 */
  consumeStatus?: number;
  /** 重试次数 */
  retryCount?: number;
  /** 最大重试次数 */
  maxRetry?: number;
  /** 下次重试时间 */
  nextRetryTime?: string;
  /** 消费时间 */
  consumeTime?: string;
  /** 完成时间 */
  finishTime?: string;
  /** 错误信息 */
  errorMsg?: string;
  /** 逻辑删除：0-未删除 1-已删除 */
  isDeleted?: number;
  /** 创建时间 */
  createTime?: string;
  /** 更新时间 */
  updateTime?: string;
}
