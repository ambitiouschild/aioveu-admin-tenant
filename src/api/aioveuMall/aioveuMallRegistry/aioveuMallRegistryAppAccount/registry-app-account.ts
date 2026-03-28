import request from "@/utils/request";
// import type { RegistryAppAccountForm, RegistryAppAccountPageQuery, RegistryAppAccountPageVo } from "@/api/types";
import {BaseQueryParams, PageQuery} from "@/types";
const REGISTRY_APP_ACCOUNT_BASE_URL = "/aioveu-tenant-registry/api/v1/registry-app-account";

const RegistryAppAccountAPI = {
    /** 获取小程序账号分页数据 */
    getPage(queryParams?: RegistryAppAccountPageQuery) {
        return request<any, PageResult<RegistryAppAccountPageVo[]>>({
            url: `${REGISTRY_APP_ACCOUNT_BASE_URL}/page`,
            method: "get",
            params: queryParams,
        });
    },
    /**
     * 获取小程序账号表单数据
     *
     * @param id 小程序账号ID
     * @returns 小程序账号表单数据
     */
    getFormData(id: number) {
        return request<any, RegistryAppAccountForm>({
            url: `${REGISTRY_APP_ACCOUNT_BASE_URL}/${id}/form`,
            method: "get",
        });
    },

    /**
     *  添加小程序账号
     *
     *  @param data 小程序账号表单数据
     */
    create(data: RegistryAppAccountForm) {
        return request({
            url: `${REGISTRY_APP_ACCOUNT_BASE_URL}`,
            method: "post",
            data,
        });
    },

    /**
     * 更新小程序账号
     *
     * @param id 小程序账号ID
     * @param data 小程序账号表单数据
     */
     update(id: number, data: RegistryAppAccountForm) {
        return request({
            url: `${REGISTRY_APP_ACCOUNT_BASE_URL}/${id}`,
            method: "put",
            data,
        });
    },

    /**
     * 批量删除小程序账号，多个以英文逗号(,)分割
     *
     * @param ids 小程序账号ID字符串，多个以英文逗号(,)分割
     */
     deleteByIds(ids: string) {
        return request({
            url: `${REGISTRY_APP_ACCOUNT_BASE_URL}/${ids}`,
            method: "delete",
        });
    }
}

export default RegistryAppAccountAPI;

/**
 * RegistryAppAccount 小程序账号类型定义
 */

/** 小程序账号分页查询参数 */
export interface RegistryAppAccountPageQuery extends PageQuery {
  /** 小程序AppID */
  appId?: number;
  /** 所属租户ID */
  tenantId?: number;
  /** 小程序名称 */
  accountName?: string;
  /** 账号类型：0-未注册，1-普通小程序，2-游戏小程序 */
  accountType?: number;
  /** 注册邮箱 */
  email?: string;
}

/** 小程序账号表单对象 */
export interface RegistryAppAccountForm {
  id?: number;
  /** 小程序AppID */
  appId?: number;
  /** 所属租户ID */
  tenantId?: number;
  /** 小程序AppSecret */
  appSecret?: string;
  /** 原始ID */
  originalId?: string;
  /** 小程序名称 */
  accountName?: string;
  /** 账号类型：0-未注册，1-普通小程序，2-游戏小程序 */
  accountType?: number;
  /** 注册邮箱 */
  email?: string;
  /** 登录密码（加密存储） */
  password?: string;
  /** 邮箱验证码 */
  emailVerifyCode?: string;
  /** 邮箱是否已验证：0-未验证，1-已验证 */
  emailVerified?: number;
  /** 注册状态：0-未开始，1-邮箱注册中，2-信息登记中，3-主体认证中，4-注册完成 */
  registerStatus?: number;
}

/** 小程序账号分页对象 */
export interface RegistryAppAccountPageVo {
  id?: number;
  /** 小程序AppID */
  appId?: number;
  /** 所属租户ID */
  tenantId?: number;
  /** 小程序AppSecret */
  appSecret?: string;
  /** 原始ID */
  originalId?: string;
  /** 小程序名称 */
  accountName?: string;
  /** 账号类型：0-未注册，1-普通小程序，2-游戏小程序 */
  accountType?: number;
  /** 注册邮箱 */
  email?: string;
  /** 登录密码（加密存储） */
  password?: string;
  /** 邮箱验证码 */
  emailVerifyCode?: string;
  /** 邮箱是否已验证：0-未验证，1-已验证 */
  emailVerified?: number;
  /** 注册状态：0-未开始，1-邮箱注册中，2-信息登记中，3-主体认证中，4-注册完成 */
  registerStatus?: number;
  /** 逻辑删除：0-未删除 1-已删除 */
  isDeleted?: number;
  /** 创建时间 */
  createTime?: string;
  /** 更新时间 */
  updateTime?: string;
}
