import request from "@/utils/request";
// import type { RegistryOperationLogForm, RegistryOperationLogPageQuery, RegistryOperationLogPageVo } from "@/api/types";
import {BaseQueryParams, PageQuery} from "@/types";
const REGISTRY_OPERATION_LOG_BASE_URL = "/api/v1/registry-operation-log";

const RegistryOperationLogAPI = {
    /** 获取操作日志分页数据 */
    getPage(queryParams?: RegistryOperationLogPageQuery) {
        return request<any, PageResult<RegistryOperationLogPageVo[]>>({
            url: `${REGISTRY_OPERATION_LOG_BASE_URL}/page`,
            method: "get",
            params: queryParams,
        });
    },
    /**
     * 获取操作日志表单数据
     *
     * @param id 操作日志ID
     * @returns 操作日志表单数据
     */
    getFormData(id: number) {
        return request<any, RegistryOperationLogForm>({
            url: `${REGISTRY_OPERATION_LOG_BASE_URL}/${id}/form`,
            method: "get",
        });
    },

    /**
     *  添加操作日志
     *
     *  @param data 操作日志表单数据
     */
    create(data: RegistryOperationLogForm) {
        return request({
            url: `${REGISTRY_OPERATION_LOG_BASE_URL}`,
            method: "post",
            data,
        });
    },

    /**
     * 更新操作日志
     *
     * @param id 操作日志ID
     * @param data 操作日志表单数据
     */
     update(id: number, data: RegistryOperationLogForm) {
        return request({
            url: `${REGISTRY_OPERATION_LOG_BASE_URL}/${id}`,
            method: "put",
            data,
        });
    },

    /**
     * 批量删除操作日志，多个以英文逗号(,)分割
     *
     * @param ids 操作日志ID字符串，多个以英文逗号(,)分割
     */
     deleteByIds(ids: string) {
        return request({
            url: `${REGISTRY_OPERATION_LOG_BASE_URL}/${ids}`,
            method: "delete",
        });
    }
}

export default RegistryOperationLogAPI;


/**
 * RegistryOperationLog 操作日志类型定义
 */

/** 操作日志分页查询参数 */
export interface RegistryOperationLogPageQuery extends PageQuery {
  /** 租户ID */
  tenantId?: number;
  /** 操作人ID */
  operatorId?: number;
  /** 操作人类型：1-系统，2-租户，3-管理员 */
  operatorType?: number;
  /** 操作类型：REGISTER, CERTIFY, FILE, UPDATE, DELETE等 */
  operationType?: string;
  /** 操作目标：TENANT, APP, CERTIFICATION, FILING等 */
  operationTarget?: string;
  /** 目标记录ID */
  targetId?: number;
  /** 操作内容（JSON格式） */
  operationContent?: string;
  /** 操作结果：1-成功，0-失败 */
  operationResult?: number;
  /** 用户代理 */
  userAgent?: string;
}

/** 操作日志表单对象 */
export interface RegistryOperationLogForm {
  /** 日志ID */
  id?: number;
  /** 租户ID */
  tenantId?: number;
  /** 操作人ID */
  operatorId?: number;
  /** 操作人类型：1-系统，2-租户，3-管理员 */
  operatorType?: number;
  /** 操作类型：REGISTER, CERTIFY, FILE, UPDATE, DELETE等 */
  operationType?: string;
  /** 操作目标：TENANT, APP, CERTIFICATION, FILING等 */
  operationTarget?: string;
  /** 目标记录ID */
  targetId?: number;
  /** 操作内容（JSON格式） */
  operationContent?: string;
  /** 操作结果：1-成功，0-失败 */
  operationResult?: number;
  /** 错误信息 */
  errorMessage?: string;
  /** 操作IP */
  ipAddress?: string;
  /** 用户代理 */
  userAgent?: string;
}

/** 操作日志分页对象 */
export interface RegistryOperationLogPageVo {
  /** 日志ID */
  id?: number;
  /** 租户ID */
  tenantId?: number;
  /** 操作人ID */
  operatorId?: number;
  /** 操作人类型：1-系统，2-租户，3-管理员 */
  operatorType?: number;
  /** 操作类型：REGISTER, CERTIFY, FILE, UPDATE, DELETE等 */
  operationType?: string;
  /** 操作目标：TENANT, APP, CERTIFICATION, FILING等 */
  operationTarget?: string;
  /** 目标记录ID */
  targetId?: number;
  /** 操作内容（JSON格式） */
  operationContent?: string;
  /** 操作结果：1-成功，0-失败 */
  operationResult?: number;
  /** 错误信息 */
  errorMessage?: string;
  /** 操作IP */
  ipAddress?: string;
  /** 用户代理 */
  userAgent?: string;
  /** 操作时间 */
  createTime?: string;
}
