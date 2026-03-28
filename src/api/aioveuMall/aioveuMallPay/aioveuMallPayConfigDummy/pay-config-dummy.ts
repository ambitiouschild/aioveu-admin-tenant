import request from "@/utils/request";
// import type { PayConfigDummyForm, PayConfigDummyPageQuery, PayConfigDummyPageVo } from "@/api/types";
import {BaseQueryParams, PageQuery} from "@/types";
const PAY_CONFIG_DUMMY_BASE_URL = "/api/v1/pay-config-dummy";

const PayConfigDummyAPI = {
    /** 获取模拟支付配置分页数据 */
    getPage(queryParams?: PayConfigDummyPageQuery) {
        return request<any, PageResult<PayConfigDummyPageVo[]>>({
            url: `${PAY_CONFIG_DUMMY_BASE_URL}/page`,
            method: "get",
            params: queryParams,
        });
    },
    /**
     * 获取模拟支付配置表单数据
     *
     * @param id 模拟支付配置ID
     * @returns 模拟支付配置表单数据
     */
    getFormData(id: number) {
        return request<any, PayConfigDummyForm>({
            url: `${PAY_CONFIG_DUMMY_BASE_URL}/${id}/form`,
            method: "get",
        });
    },

    /**
     *  添加模拟支付配置
     *
     *  @param data 模拟支付配置表单数据
     */
    create(data: PayConfigDummyForm) {
        return request({
            url: `${PAY_CONFIG_DUMMY_BASE_URL}`,
            method: "post",
            data,
        });
    },

    /**
     * 更新模拟支付配置
     *
     * @param id 模拟支付配置ID
     * @param data 模拟支付配置表单数据
     */
     update(id: number, data: PayConfigDummyForm) {
        return request({
            url: `${PAY_CONFIG_DUMMY_BASE_URL}/${id}`,
            method: "put",
            data,
        });
    },

    /**
     * 批量删除模拟支付配置，多个以英文逗号(,)分割
     *
     * @param ids 模拟支付配置ID字符串，多个以英文逗号(,)分割
     */
     deleteByIds(ids: string) {
        return request({
            url: `${PAY_CONFIG_DUMMY_BASE_URL}/${ids}`,
            method: "delete",
        });
    }
}

export default PayConfigDummyAPI;

/**
 * PayConfigDummy 模拟支付配置类型定义
 */

/** 模拟支付配置分页查询参数 */
export interface PayConfigDummyPageQuery extends PageQuery {
  /** 支付配置主表ID */
  configId?: number;
  /** 所属租户ID */
  tenantId?: number;
  /** 支付成功率(0-100) */
  successRate?: number;
}

/** 模拟支付配置表单对象 */
export interface PayConfigDummyForm {
  /** 主键ID */
  id?: number;
  /** 支付配置主表ID */
  configId?: number;
  /** 所属租户ID */
  tenantId?: number;
  /** 支付成功率(0-100) */
  successRate?: number;
  /** 模拟延迟(毫秒) */
  mockDelay?: number;
  /** 模拟回调地址 */
  callbackUrl?: string;
  /** 回调延迟(毫秒) */
  callbackDelay?: number;
  /** 成功响应模板 */
  successResponse?: string;
  /** 失败响应模板 */
  failResponse?: string;
  /** 是否模拟异常: 0-否, 1-是 */
  simulateError?: number;
  /** 模拟错误码 */
  errorCode?: string;
  /** 模拟错误信息 */
  errorMsg?: string;
  /** 是否自动退款: 0-否, 1-是 */
  autoRefund?: number;
  /** 退款延迟(毫秒) */
  refundDelay?: number;
  /** 创建人ID */
  createBy?: number;
  /** 更新人ID */
  updateBy?: number;
}

/** 模拟支付配置分页对象 */
export interface PayConfigDummyPageVo {
  /** 主键ID */
  id?: number;
  /** 支付配置主表ID */
  configId?: number;
  /** 所属租户ID */
  tenantId?: number;
  /** 支付成功率(0-100) */
  successRate?: number;
  /** 模拟延迟(毫秒) */
  mockDelay?: number;
  /** 模拟回调地址 */
  callbackUrl?: string;
  /** 回调延迟(毫秒) */
  callbackDelay?: number;
  /** 成功响应模板 */
  successResponse?: string;
  /** 失败响应模板 */
  failResponse?: string;
  /** 是否模拟异常: 0-否, 1-是 */
  simulateError?: number;
  /** 模拟错误码 */
  errorCode?: string;
  /** 模拟错误信息 */
  errorMsg?: string;
  /** 是否自动退款: 0-否, 1-是 */
  autoRefund?: number;
  /** 退款延迟(毫秒) */
  refundDelay?: number;
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
