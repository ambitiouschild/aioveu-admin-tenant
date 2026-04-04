import request from "@/utils/request";
// import type { ManagerMenuHomeCategoryForm, ManagerMenuHomeCategoryPageQuery, ManagerMenuHomeCategoryPageVo } from "@/api/types";
import {BaseQueryParams, PageQuery} from "@/types";
const MANAGER_MENU_HOME_CATEGORY_BASE_URL = "/aioveu-tenant/app-api/v1/manager-menu-home-category";

const ManagerMenuHomeCategoryAPI = {
    /** 获取管理端app首页分类配置分页数据 */
    getPage(queryParams?: ManagerMenuHomeCategoryPageQuery) {
        return request<any, PageResult<ManagerMenuHomeCategoryPageVo[]>>({
            url: `${MANAGER_MENU_HOME_CATEGORY_BASE_URL}/page`,
            method: "get",
            params: queryParams,
        });
    },
    /**
     * 获取管理端app首页分类配置表单数据
     *
     * @param id 管理端app首页分类配置ID
     * @returns 管理端app首页分类配置表单数据
     */
    getFormData(id: number) {
        return request<any, ManagerMenuHomeCategoryForm>({
            url: `${MANAGER_MENU_HOME_CATEGORY_BASE_URL}/${id}/form`,
            method: "get",
        });
    },

    /**
     *  添加管理端app首页分类配置
     *
     *  @param data 管理端app首页分类配置表单数据
     */
    create(data: ManagerMenuHomeCategoryForm) {
        return request({
            url: `${MANAGER_MENU_HOME_CATEGORY_BASE_URL}`,
            method: "post",
            data,
        });
    },

    /**
     * 更新管理端app首页分类配置
     *
     * @param id 管理端app首页分类配置ID
     * @param data 管理端app首页分类配置表单数据
     */
     update(id: number, data: ManagerMenuHomeCategoryForm) {
        return request({
            url: `${MANAGER_MENU_HOME_CATEGORY_BASE_URL}/${id}`,
            method: "put",
            data,
        });
    },

    /**
     * 批量删除管理端app首页分类配置，多个以英文逗号(,)分割
     *
     * @param ids 管理端app首页分类配置ID字符串，多个以英文逗号(,)分割
     */
     deleteByIds(ids: string) {
        return request({
            url: `${MANAGER_MENU_HOME_CATEGORY_BASE_URL}/${ids}`,
            method: "delete",
        });
    }
}

export default ManagerMenuHomeCategoryAPI;

/**
 * ManagerMenuHomeCategory 管理端app首页分类配置类型定义
 */

/** 管理端app首页分类配置分页查询参数 */
export interface ManagerMenuHomeCategoryPageQuery extends PageQuery {
  /** 管理端app分类ID */
  categoryId?: number;
  /** 管理端app首页显示的图标URL */
  homeIcon?: string;
  /** 管理端app首页显示名称 */
  homeName?: string;
  /** 状态：0-隐藏，1-显示 */
  status?: number;
}

/** 管理端app首页分类配置表单对象 */
export interface ManagerMenuHomeCategoryForm {
  id?: number;
  /** 管理端app分类ID */
  categoryId?: number;
  /** 管理端app首页显示的图标URL */
  homeIcon?: string;
  /** 管理端app首页显示名称 */
  homeName?: string;
  /** 跳转路径 */
  jumpPath?: string;
  /** 跳转类型：navigateTo, redirectTo, switchTab */
  jumpType?: string;
  /** 排序 */
  sort?: number;
  /** 状态：0-隐藏，1-显示 */
  status?: number;
  /** 备注 */
  remark?: string;
}

/** 管理端app首页分类配置分页对象 */
export interface ManagerMenuHomeCategoryPageVo {
  id?: number;
  /** 管理端app分类ID */
  categoryId?: number;
  /** 管理端app首页显示的图标URL */
  homeIcon?: string;
  /** 管理端app首页显示名称 */
  homeName?: string;
  /** 跳转路径 */
  jumpPath?: string;
  /** 跳转类型：navigateTo, redirectTo, switchTab */
  jumpType?: string;
  /** 排序 */
  sort?: number;
  /** 状态：0-隐藏，1-显示 */
  status?: number;
  /** 备注 */
  remark?: string;
  /** 创建时间 */
  createTime?: string;
  /** 更新时间 */
  updateTime?: string;
  /** 逻辑删除：0-正常 1-删除 */
  deleted?: number;
  /** 版本号（用于乐观锁） */
  version?: number;
  /** 租户ID */
  tenantId?: number;
}
