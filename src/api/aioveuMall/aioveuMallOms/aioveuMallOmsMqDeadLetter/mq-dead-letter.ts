import request from "@/utils/request";
// import type { MqDeadLetterForm, MqDeadLetterPageQuery, MqDeadLetterPageVo } from "@/api/types";
import { PageQuery } from "@/types";
const MQ_DEAD_LETTER_BASE_URL = "/aioveu-tenant-oms/api/v1/mq-dead-letter";

const MqDeadLetterAPI = {
  /** 获取MQ死信队列分页数据 */
  getPage(queryParams?: MqDeadLetterPageQuery) {
    return request<any, PageResult<MqDeadLetterPageVo[]>>({
      url: `${MQ_DEAD_LETTER_BASE_URL}/page`,
      method: "get",
      params: queryParams,
    });
  },
  /**
   * 获取MQ死信队列表单数据
   *
   * @param id MQ死信队列ID
   * @returns MQ死信队列表单数据
   */
  getFormData(id: number) {
    return request<any, MqDeadLetterForm>({
      url: `${MQ_DEAD_LETTER_BASE_URL}/${id}/form`,
      method: "get",
    });
  },

  /**
   *  添加MQ死信队列
   *
   *  @param data MQ死信队列表单数据
   */
  create(data: MqDeadLetterForm) {
    return request({
      url: `${MQ_DEAD_LETTER_BASE_URL}`,
      method: "post",
      data,
    });
  },

  /**
   * 更新MQ死信队列
   *
   * @param id MQ死信队列ID
   * @param data MQ死信队列表单数据
   */
  update(id: number, data: MqDeadLetterForm) {
    return request({
      url: `${MQ_DEAD_LETTER_BASE_URL}/${id}`,
      method: "put",
      data,
    });
  },

  /**
   * 批量删除MQ死信队列，多个以英文逗号(,)分割
   *
   * @param ids MQ死信队列ID字符串，多个以英文逗号(,)分割
   */
  deleteByIds(ids: string) {
    return request({
      url: `${MQ_DEAD_LETTER_BASE_URL}/${ids}`,
      method: "delete",
    });
  },
};

export default MqDeadLetterAPI;

/**
 * MqDeadLetter MQ死信队列类型定义
 */

/** MQ死信队列分页查询参数 */
export interface MqDeadLetterPageQuery extends PageQuery {
  /** 租户ID，0表示平台默认 */
  tenantId?: number;
  /** 消息ID */
  messageId?: string;
  /** Topic */
  topic?: string;
  /** Tag */
  tag?: string;
  /** 业务ID */
  bizId?: string;
  /** 错误信息 */
  errorMsg?: string;
}

/** MQ死信队列表单对象 */
export interface MqDeadLetterForm {
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
  /** 业务ID */
  bizId?: string;
  /** 消息体 */
  messageBody?: string;
  /** 消费次数 */
  consumeTimes?: number;
  /** 错误信息 */
  errorMsg?: string;
  /** 死信原因 */
  deadReason?: string;
  /** 处理状态:0-未处理,1-已处理 */
  handleStatus?: number;
  /** 处理时间 */
  handleTime?: string;
  /** 处理结果 */
  handleResult?: string;
}

/** MQ死信队列分页对象 */
export interface MqDeadLetterPageVo {
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
  /** 业务ID */
  bizId?: string;
  /** 消息体 */
  messageBody?: string;
  /** 消费次数 */
  consumeTimes?: number;
  /** 错误信息 */
  errorMsg?: string;
  /** 死信原因 */
  deadReason?: string;
  /** 处理状态:0-未处理,1-已处理 */
  handleStatus?: number;
  /** 处理时间 */
  handleTime?: string;
  /** 处理结果 */
  handleResult?: string;
  /** 逻辑删除：0-未删除 1-已删除 */
  isDeleted?: number;
  /** 创建时间 */
  createTime?: string;
  /** 更新时间 */
  updateTime?: string;
}
