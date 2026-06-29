import request from "@/utils/request";
// import type { ManagerMenuCategoryForm, ManagerMenuCategoryPageQuery, ManagerMenuCategoryPageVo } from "@/api/types";
import {BaseQueryParams, PageQuery} from "@/types";


const MANAGER_MENU_CATEGORY_BASE_URL = "/aioveu/api/v8/admin/tenant/manager-menu-category";

const ManagerMenuCategoryAPI = {
    /** 获取管理端菜单分类（多租户）分页数据 */
    getPage(queryParams?: ManagerMenuCategoryPageQuery) {
        return request<any, PageResult<ManagerMenuCategoryPageVo[]>>({
            url: `${MANAGER_MENU_CATEGORY_BASE_URL}/page`,
            method: "get",
            params: queryParams,
        });
    },
    /**
     * 获取管理端菜单分类（多租户）表单数据
     *
     * @param id 管理端菜单分类（多租户）ID
     * @returns 管理端菜单分类（多租户）表单数据
     */
    getFormData(id: number) {
        return request<any, ManagerMenuCategoryForm>({
            url: `${MANAGER_MENU_CATEGORY_BASE_URL}/${id}/form`,
            method: "get",
        });
    },

    /**
     *  添加管理端菜单分类（多租户）
     *
     *  @param data 管理端菜单分类（多租户）表单数据
     */
    create(data: ManagerMenuCategoryForm) {
        return request({
            url: `${MANAGER_MENU_CATEGORY_BASE_URL}`,
            method: "post",
            data,
        });
    },

    /**
     * 更新管理端菜单分类（多租户）
     *
     * @param id 管理端菜单分类（多租户）ID
     * @param data 管理端菜单分类（多租户）表单数据
     */
     update(id: number, data: ManagerMenuCategoryForm) {
        return request({
            url: `${MANAGER_MENU_CATEGORY_BASE_URL}/${id}`,
            method: "put",
            data,
        });
    },

    /**
     * 批量删除管理端菜单分类（多租户），多个以英文逗号(,)分割
     *
     * @param ids 管理端菜单分类（多租户）ID字符串，多个以英文逗号(,)分割
     */
     deleteByIds(ids: string) {
        return request({
            url: `${MANAGER_MENU_CATEGORY_BASE_URL}/${ids}`,
            method: "delete",
        });
    }
}

export default ManagerMenuCategoryAPI;


/**
 * ManagerMenuCategory 管理端菜单分类（多租户）类型定义
 */

/** 管理端菜单分类（多租户）分页查询参数 */
export interface ManagerMenuCategoryPageQuery extends PageQuery {
  /** 租户ID，0表示平台默认 */
  tenantId?: number;
  /** 分类标题 */
  title?: string;
  /** 状态：0-禁用，1-启用 */
  status?: number;
  /** 分类类型：workbench-工作台，sidebar-侧边栏 */
  type?: string;
  /** 是否可编辑：0-系统内置，1-可编辑 */
  isEditable?: number;
}

/** 管理端菜单分类（多租户）表单对象 */
export interface ManagerMenuCategoryForm {
  /** 主键ID */
  id?: number;
  /** 租户ID，0表示平台默认 */
  tenantId?: number;
  /** 分类标题 */
  title?: string;
  /** 分类图标 */
  icon?: string;
  /** 分类描述 */
  description?: string;
  /** 排序序号 */
  sort?: number;
  /** 状态：0-禁用，1-启用 */
  status?: number;
  /** 分类类型：workbench-工作台，sidebar-侧边栏 */
  type?: string;
  /** 可见范围：0-所有用户，1-租户管理员，2-普通用户 */
  visibleRange?: number;
  /** 是否可编辑：0-系统内置，1-可编辑 */
  isEditable?: number;
  /** 创建人ID */
  createBy?: number;
  /** 更新人ID */
  updateBy?: number;
}

/** 管理端菜单分类（多租户）分页对象 */
export interface ManagerMenuCategoryPageVo {
  /** 主键ID */
  id?: number;
  /** 租户ID，0表示平台默认 */
  tenantId?: number;
  /** 分类标题 */
  title?: string;
  /** 分类图标 */
  icon?: string;
  /** 分类描述 */
  description?: string;
  /** 排序序号 */
  sort?: number;
  /** 状态：0-禁用，1-启用 */
  status?: number;
  /** 分类类型：workbench-工作台，sidebar-侧边栏 */
  type?: string;
  /** 可见范围：0-所有用户，1-租户管理员，2-普通用户 */
  visibleRange?: number;
  /** 是否可编辑：0-系统内置，1-可编辑 */
  isEditable?: number;
  /** 创建人ID */
  createBy?: number;
  /** 更新人ID */
  updateBy?: number;
  /** 逻辑删除：0-未删除 1-已删除 */
  isDeleted?: number;
  /** 创建时间 */
  createTime?: string;
  /** 更新时间 */
  updateTime?: string;
}
