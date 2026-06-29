import request from "@/utils/request";
// import type { MqConsumeIdempotentForm, MqConsumeIdempotentPageQuery, MqConsumeIdempotentPageVo } from "@/api/types";
import { PageQuery } from "@/types";
const MQ_CONSUME_IDEMPOTENT_BASE_URL = "/aioveu/api/v8/admin/oms/mq-consume-idempotent";

const MqConsumeIdempotentAPI = {
  /** 获取MQ消费幂等性分页数据 */
  getPage(queryParams?: MqConsumeIdempotentPageQuery) {
    return request<any, PageResult<MqConsumeIdempotentPageVo[]>>({
      url: `${MQ_CONSUME_IDEMPOTENT_BASE_URL}/page`,
      method: "get",
      params: queryParams,
    });
  },
  /**
   * 获取MQ消费幂等性表单数据
   *
   * @param id MQ消费幂等性ID
   * @returns MQ消费幂等性表单数据
   */
  getFormData(id: number) {
    return request<any, MqConsumeIdempotentForm>({
      url: `${MQ_CONSUME_IDEMPOTENT_BASE_URL}/${id}/form`,
      method: "get",
    });
  },

  /**
   *  添加MQ消费幂等性
   *
   *  @param data MQ消费幂等性表单数据
   */
  create(data: MqConsumeIdempotentForm) {
    return request({
      url: `${MQ_CONSUME_IDEMPOTENT_BASE_URL}`,
      method: "post",
      data,
    });
  },

  /**
   * 更新MQ消费幂等性
   *
   * @param id MQ消费幂等性ID
   * @param data MQ消费幂等性表单数据
   */
  update(id: number, data: MqConsumeIdempotentForm) {
    return request({
      url: `${MQ_CONSUME_IDEMPOTENT_BASE_URL}/${id}`,
      method: "put",
      data,
    });
  },

  /**
   * 批量删除MQ消费幂等性，多个以英文逗号(,)分割
   *
   * @param ids MQ消费幂等性ID字符串，多个以英文逗号(,)分割
   */
  deleteByIds(ids: string) {
    return request({
      url: `${MQ_CONSUME_IDEMPOTENT_BASE_URL}/${ids}`,
      method: "delete",
    });
  },
};

export default MqConsumeIdempotentAPI;

/**
 * MqConsumeIdempotent MQ消费幂等性类型定义
 */

/** MQ消费幂等性分页查询参数 */
export interface MqConsumeIdempotentPageQuery extends PageQuery {
  /** 租户ID，0表示平台默认 */
  tenantId?: number;
  /** 业务唯一键 */
  bizUniqueKey?: string;
  /** 业务类型 */
  bizType?: string;
  /** 消息ID */
  messageId?: string;
  /** 消费时间 */
  consumeTime?: string;
  /** 更新时间 */
  updateTime?: string;
}

/** MQ消费幂等性表单对象 */
export interface MqConsumeIdempotentForm {
  id?: number;
  /** 租户ID，0表示平台默认 */
  tenantId?: number;
  /** 业务唯一键 */
  bizUniqueKey?: string;
  /** 业务类型 */
  bizType?: string;
  /** 消息ID */
  messageId?: string;
  /** 状态:1-已处理 */
  status?: number;
  /** 消费时间 */
  consumeTime?: string;
}

/** MQ消费幂等性分页对象 */
export interface MqConsumeIdempotentPageVo {
  id?: number;
  /** 租户ID，0表示平台默认 */
  tenantId?: number;
  /** 业务唯一键 */
  bizUniqueKey?: string;
  /** 业务类型 */
  bizType?: string;
  /** 消息ID */
  messageId?: string;
  /** 状态:1-已处理 */
  status?: number;
  /** 消费时间 */
  consumeTime?: string;
  /** 逻辑删除：0-未删除 1-已删除 */
  isDeleted?: number;
  /** 创建时间 */
  createTime?: string;
  /** 更新时间 */
  updateTime?: string;
}
