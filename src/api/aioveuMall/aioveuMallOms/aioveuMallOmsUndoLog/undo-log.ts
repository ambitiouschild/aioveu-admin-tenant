import request from "@/utils/request";
import {BaseQueryParams, PageQuery} from "@/types";

const UNDOLOG_BASE_URL = "/aioveu-tenant-oms/api/v1/undo-log";

const UndoLogAPI = {
    /** 获取AT transaction mode undo table分页数据 */
    getPage(queryParams?: UndoLogPageQuery) {
        return request<any, PageResult<UndoLogPageVO[]>>({
            url: `${UNDOLOG_BASE_URL}/page`,
            method: "get",
            params: queryParams,
        });
    },
    /**
     * 获取AT transaction mode undo table表单数据
     *
     * @param id AT transaction mode undo tableID
     * @returns AT transaction mode undo table表单数据
     */
    getFormData(id: number) {
        return request<any, UndoLogForm>({
            url: `${UNDOLOG_BASE_URL}/${id}/form`,
            method: "get",
        });
    },

    /**
     *  添加AT transaction mode undo table
     *
     *  @param data AT transaction mode undo table表单数据
     */
    add(data: UndoLogForm) {
        return request({
            url: `${UNDOLOG_BASE_URL}`,
            method: "post",
            data: data,
        });
    },

    /**
     * 更新AT transaction mode undo table
     *
     * @param id AT transaction mode undo tableID
     * @param data AT transaction mode undo table表单数据
     */
     update(id: number, data: UndoLogForm) {
        return request({
            url: `${UNDOLOG_BASE_URL}/${id}`,
            method: "put",
            data: data,
        });
    },

    /**
     * 批量删除AT transaction mode undo table，多个以英文逗号(,)分割
     *
     * @param ids AT transaction mode undo tableID字符串，多个以英文逗号(,)分割
     */
     deleteByIds(ids: string) {
        return request({
            url: `${UNDOLOG_BASE_URL}/${ids}`,
            method: "delete",
        });
    }
}

export default UndoLogAPI;

/** AT transaction mode undo table分页查询参数 */
export interface UndoLogPageQuery extends PageQuery {
    /** 分支事务的唯一标识。branch transaction id */
    branchId?: number;
    /** 全局事务的唯一标识。global transaction id */
    xid?: string;
    /** 记录上下文信息 undo_log context,such as serialization */
    context?: string;
    /** 核心字段。存储序列化后的回滚数据，包含前后镜像（beforeImage和afterImage）。rollback info */
    rollbackInfo?: string;  // 改为string类型，Base64编码
    /** 日志状态。0：正常状态；1：全局事务已完成，用于防悬挂（防止第二阶段回滚请求在一阶段日志产生前到达）0:normal status,1:defense status */
    logStatus?: number;
}

/** AT transaction mode undo table表单对象 */
export interface UndoLogForm {
    /** 分支事务的唯一标识。branch transaction id */
    branchId?:  number;
    /** 全局事务的唯一标识。global transaction id */
    xid?:  string;
    /** 记录上下文信息 undo_log context,such as serialization */
    context?:  string;
    /** 核心字段。存储序列化后的回滚数据，包含前后镜像（beforeImage和afterImage）。rollback info */
    rollbackInfo?: string;  // 改为string类型，Base64编码
    /** 日志状态。0：正常状态；1：全局事务已完成，用于防悬挂（防止第二阶段回滚请求在一阶段日志产生前到达）0:normal status,1:defense status */
    logStatus?:  number;
}

/** AT transaction mode undo table分页对象 */
export interface UndoLogPageVO {
    /** 分支事务的唯一标识。branch transaction id */
    branchId?: number;
    /** 全局事务的唯一标识。global transaction id */
    xid?: string;
    /** 记录上下文信息 undo_log context,such as serialization */
    context?: string;
    /** 核心字段。存储序列化后的回滚数据，包含前后镜像（beforeImage和afterImage）。rollback info */
    rollbackInfo?: string;  // 改为string类型，Base64编码
    /** 日志状态。0：正常状态；1：全局事务已完成，用于防悬挂（防止第二阶段回滚请求在一阶段日志产生前到达）0:normal status,1:defense status */
    logStatus?: number;
    /** 记录的创建时间create datetime */
    logCreated?: Date;
    /** 记录的最后修改时间。modify datetime */
    logModified?: Date;
}
