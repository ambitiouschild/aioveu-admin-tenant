import request from "@/utils/request";
// import type { OmsOrderExportTaskForm, OmsOrderExportTaskPageQuery, OmsOrderExportTaskPageVo } from "@/api/types";
import { BaseQueryParams, PageQuery } from "@/types";
const OMS_ORDER_EXPORT_TASK_BASE_URL = "/aioveu/api/v8/admin/oms/oms-order-export-task";

const OmsOrderExportTaskAPI = {
  /** 获取订单导出任务分页数据 */
  getPage(queryParams?: OmsOrderExportTaskPageQuery) {
    return request<any, PageResult<OmsOrderExportTaskPageVo[]>>({
      url: `${OMS_ORDER_EXPORT_TASK_BASE_URL}/page`,
      method: "get",
      params: queryParams,
    });
  },
  /**
   * 获取订单导出任务表单数据
   *
   * @param id 订单导出任务ID
   * @returns 订单导出任务表单数据
   */
  getFormData(id: number) {
    return request<any, OmsOrderExportTaskForm>({
      url: `${OMS_ORDER_EXPORT_TASK_BASE_URL}/${id}/form`,
      method: "get",
    });
  },

  /**
   *  添加订单导出任务
   *
   *  @param data 订单导出任务表单数据
   */
  create(data: OmsOrderExportTaskForm) {
    return request({
      url: `${OMS_ORDER_EXPORT_TASK_BASE_URL}`,
      method: "post",
      data,
    });
  },

  /**
   * 更新订单导出任务
   *
   * @param id 订单导出任务ID
   * @param data 订单导出任务表单数据
   */
  update(id: number, data: OmsOrderExportTaskForm) {
    return request({
      url: `${OMS_ORDER_EXPORT_TASK_BASE_URL}/${id}`,
      method: "put",
      data,
    });
  },

  /**
   * 批量删除订单导出任务，多个以英文逗号(,)分割
   *
   * @param ids 订单导出任务ID字符串，多个以英文逗号(,)分割
   */
  deleteByIds(ids: string) {
    return request({
      url: `${OMS_ORDER_EXPORT_TASK_BASE_URL}/${ids}`,
      method: "delete",
    });
  },

  downloadExportFile(exportNo: string) {
    return request({
      url: `${OMS_ORDER_EXPORT_TASK_BASE_URL}/export/download`,
      method: "get",
      data: { exportNo },
      responseType: "blob", // ✅ 必须
    });
  },
};

export default OmsOrderExportTaskAPI;

/**
 * OmsOrderExportTask 订单导出任务类型定义
 */

/** 订单导出任务分页查询参数 */
export interface OmsOrderExportTaskPageQuery extends PageQuery {
  /** 订单导出任务编号 */
  orderExportTaskNo?: string;
  /** 租户ID，0表示平台默认 */
  tenantId?: number;
  /** 操作员ID */
  operatorId?: string;
  /** 客户端ID（小程序/H5/PC） */
  clientId?: string;
  /** 订单状态：0-待付款 1-已付款 2-已发货 3-已完成 4-已取消 5-售后中 */
  orderStatus?: number;
  /** 订单起始时间 */
  orderStartTime?: string;
  /** 订单结束时间 */
  orderEndTime?: string;
  /** 导出格式：excel/csv */
  exportFormat?: string;
  /** 导出数据总量 */
  totalCount?: number;
  /** 任务状态：PENDING/RUNNING/SUCCESS/FAILED */
  status?: string;
  /** 任务开始执行时间 */
  startTimeActual?: string;
  /** 任务完成时间 */
  finishTime?: string;
}

/** 订单导出任务表单对象 */
export interface OmsOrderExportTaskForm {
  /** 订单导出任务ID */
  id?: number;
  /** 订单导出任务编号 */
  orderExportTaskNo?: string;
  /** 租户ID，0表示平台默认 */
  tenantId?: number;
  /** 操作员ID */
  operatorId?: string;
  /** 客户端ID（小程序/H5/PC） */
  clientId?: string;
  /** 订单状态：0-待付款 1-已付款 2-已发货 3-已完成 4-已取消 5-售后中 */
  orderStatus?: number;
  /** 订单起始时间 */
  orderStartTime?: string;
  /** 订单结束时间 */
  orderEndTime?: string;
  /** 导出格式：excel/csv */
  exportFormat?: string;
  /** 导出数据总量 */
  totalCount?: number;
  /** 任务状态：PENDING/RUNNING/SUCCESS/FAILED */
  status?: string;
  /** 导出文件地址 */
  fileUrl?: string;
  /** 失败原因 */
  failReason?: string;
  /** 任务开始执行时间 */
  startTimeActual?: string;
  /** 任务完成时间 */
  finishTime?: string;
}

/** 订单导出任务分页对象 */
export interface OmsOrderExportTaskPageVo {
  /** 订单导出任务ID */
  id?: number;
  /** 订单导出任务编号 */
  orderExportTaskNo?: string;
  /** 租户ID，0表示平台默认 */
  tenantId?: number;
  /** 操作员ID */
  operatorId?: string;
  /** 客户端ID（小程序/H5/PC） */
  clientId?: string;
  /** 订单状态：0-待付款 1-已付款 2-已发货 3-已完成 4-已取消 5-售后中 */
  orderStatus?: number;
  /** 订单起始时间 */
  orderStartTime?: string;
  /** 订单结束时间 */
  orderEndTime?: string;
  /** 导出格式：excel/csv */
  exportFormat?: string;
  /** 导出数据总量 */
  totalCount?: number;
  /** 任务状态：PENDING/RUNNING/SUCCESS/FAILED */
  status?: string;
  /** 导出文件地址 */
  fileUrl?: string;
  /** 失败原因 */
  failReason?: string;
  /** 任务开始执行时间 */
  startTimeActual?: string;
  /** 任务完成时间 */
  finishTime?: string;
  /** 逻辑删除：0-未删除 1-已删除 */
  isDeleted?: number;
  /** 创建时间 */
  createTime?: string;
  /** 更新时间 */
  updateTime?: string;
}
