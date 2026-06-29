import request from "@/utils/request";
// import type { MqCompensationTaskForm, MqCompensationTaskPageQuery, MqCompensationTaskPageVo } from "@/api/types";
import { BaseQueryParams, PageQuery } from "@/types";
const MQ_COMPENSATION_TASK_BASE_URL = "/aioveu/api/v8/admin/pay/mq-compensation-task";

const MqCompensationTaskAPI = {
  /** 获取MQ补偿任务分页数据 */
  getPage(queryParams?: MqCompensationTaskPageQuery) {
    return request<any, PageResult<MqCompensationTaskPageVo[]>>({
      url: `${MQ_COMPENSATION_TASK_BASE_URL}/page`,
      method: "get",
      params: queryParams,
    });
  },
  /**
   * 获取MQ补偿任务表单数据
   *
   * @param id MQ补偿任务ID
   * @returns MQ补偿任务表单数据
   */
  getFormData(id: number) {
    return request<any, MqCompensationTaskForm>({
      url: `${MQ_COMPENSATION_TASK_BASE_URL}/${id}/form`,
      method: "get",
    });
  },

  /**
   *  添加MQ补偿任务
   *
   *  @param data MQ补偿任务表单数据
   */
  create(data: MqCompensationTaskForm) {
    return request({
      url: `${MQ_COMPENSATION_TASK_BASE_URL}`,
      method: "post",
      data,
    });
  },

  /**
   * 更新MQ补偿任务
   *
   * @param id MQ补偿任务ID
   * @param data MQ补偿任务表单数据
   */
  update(id: number, data: MqCompensationTaskForm) {
    return request({
      url: `${MQ_COMPENSATION_TASK_BASE_URL}/${id}`,
      method: "put",
      data,
    });
  },

  /**
   * 批量删除MQ补偿任务，多个以英文逗号(,)分割
   *
   * @param ids MQ补偿任务ID字符串，多个以英文逗号(,)分割
   */
  deleteByIds(ids: string) {
    return request({
      url: `${MQ_COMPENSATION_TASK_BASE_URL}/${ids}`,
      method: "delete",
    });
  },
};

export default MqCompensationTaskAPI;

/**
 * MqCompensationTask MQ补偿任务类型定义
 */

/** MQ补偿任务分页查询参数 */
export interface MqCompensationTaskPageQuery extends PageQuery {
  /** 租户ID，0表示平台默认 */
  tenantId?: number;
  /** 任务类型:send_retry */
  taskType?: string;
  /** 业务ID */
  bizId?: string;
  /** 业务数据 */
  bizData?: string;
  /** 重试次数 */
  retryCount?: number;
  /** 错误信息 */
  errorMsg?: string;
}

/** MQ补偿任务表单对象 */
export interface MqCompensationTaskForm {
  id?: number;
  /** 租户ID，0表示平台默认 */
  tenantId?: number;
  /** 任务类型:send_retry */
  taskType?: string;
  /** 业务ID */
  bizId?: string;
  /** 业务数据 */
  bizData?: string;
  /** 状态:0-待处理,1-处理中,2-成功,3-失败 */
  status?: number;
  /** 重试次数 */
  retryCount?: number;
  /** 下次执行时间 */
  nextExecuteTime?: string;
  /** 执行结果 */
  executeResult?: string;
  /** 错误信息 */
  errorMsg?: string;
  /** 逻辑删除：0-未删除 1-已删除 */
  isDeleted?: number;
}

/** MQ补偿任务分页对象 */
export interface MqCompensationTaskPageVo {
  id?: number;
  /** 租户ID，0表示平台默认 */
  tenantId?: number;
  /** 任务类型:send_retry */
  taskType?: string;
  /** 业务ID */
  bizId?: string;
  /** 业务数据 */
  bizData?: string;
  /** 状态:0-待处理,1-处理中,2-成功,3-失败 */
  status?: number;
  /** 重试次数 */
  retryCount?: number;
  /** 下次执行时间 */
  nextExecuteTime?: string;
  /** 执行结果 */
  executeResult?: string;
  /** 错误信息 */
  errorMsg?: string;
  /** 逻辑删除：0-未删除 1-已删除 */
  isDeleted?: number;
  /** 创建时间 */
  createTime?: string;
  /** 更新时间 */
  updateTime?: string;
}
