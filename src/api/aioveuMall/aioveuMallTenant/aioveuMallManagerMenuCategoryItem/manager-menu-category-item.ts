import request from "@/utils/request";
// import type { ManagerMenuCategoryItemForm, ManagerMenuCategoryItemPageQuery, ManagerMenuCategoryItemPageVo } from "@/api/types";
import {BaseQueryParams, PageQuery} from "@/types";
const MANAGER_MENU_CATEGORY_ITEM_BASE_URL = "/aioveu-tenant/api/v1/manager-menu-category-item";

const ManagerMenuCategoryItemAPI = {
    /** 获取管理系统工作台菜单项（多租户支持）分页数据 */
    getPage(queryParams?: ManagerMenuCategoryItemPageQuery) {
        return request<any, PageResult<ManagerMenuCategoryItemPageVo[]>>({
            url: `${MANAGER_MENU_CATEGORY_ITEM_BASE_URL}/page`,
            method: "get",
            params: queryParams,
        });
    },
    /**
     * 获取管理系统工作台菜单项（多租户支持）表单数据
     *
     * @param id 管理系统工作台菜单项（多租户支持）ID
     * @returns 管理系统工作台菜单项（多租户支持）表单数据
     */
    getFormData(id: number) {
        return request<any, ManagerMenuCategoryItemForm>({
            url: `${MANAGER_MENU_CATEGORY_ITEM_BASE_URL}/${id}/form`,
            method: "get",
        });
    },

    /**
     *  添加管理系统工作台菜单项（多租户支持）
     *
     *  @param data 管理系统工作台菜单项（多租户支持）表单数据
     */
    create(data: ManagerMenuCategoryItemForm) {
        return request({
            url: `${MANAGER_MENU_CATEGORY_ITEM_BASE_URL}`,
            method: "post",
            data,
        });
    },

    /**
     * 更新管理系统工作台菜单项（多租户支持）
     *
     * @param id 管理系统工作台菜单项（多租户支持）ID
     * @param data 管理系统工作台菜单项（多租户支持）表单数据
     */
     update(id: number, data: ManagerMenuCategoryItemForm) {
        return request({
            url: `${MANAGER_MENU_CATEGORY_ITEM_BASE_URL}/${id}`,
            method: "put",
            data,
        });
    },

    /**
     * 批量删除管理系统工作台菜单项（多租户支持），多个以英文逗号(,)分割
     *
     * @param ids 管理系统工作台菜单项（多租户支持）ID字符串，多个以英文逗号(,)分割
     */
     deleteByIds(ids: string) {
        return request({
            url: `${MANAGER_MENU_CATEGORY_ITEM_BASE_URL}/${ids}`,
            method: "delete",
        });
    }
}

export default ManagerMenuCategoryItemAPI;


/**
 * ManagerMenuCategoryItem 管理系统工作台菜单项（多租户支持）类型定义
 */

/** 管理系统工作台菜单项（多租户支持）分页查询参数 */
export interface ManagerMenuCategoryItemPageQuery extends PageQuery {
  /** 租户ID，0表示平台默认 */
  tenantId?: number;
  /** 分类ID */
  categoryId?: number;
  /** 菜单标题 */
  title?: string;
  /** 路由名称 */
  pathName?: string;
  /** 权限标识 */
  permission?: string;
  /** 排序序号 */
  sort?: number;
}

/** 管理系统工作台菜单项（多租户支持）表单对象 */
export interface ManagerMenuCategoryItemForm {
  /** 主键ID */
  id?: number;
  /** 租户ID，0表示平台默认 */
  tenantId?: number;
  /** 分类ID */
  categoryId?: number;
  /** 菜单标题 */
  title?: string;
  /** 菜单图标 */
  icon?: string;
  /** 跳转路径 */
  url?: string;
  /** 路由名称 */
  pathName?: string;
  /** 权限标识 */
  permission?: string;
  /** 菜单描述 */
  description?: string;
  /** 排序序号 */
  sort?: number;
  /** 状态：0-禁用，1-启用 */
  status?: number;
  /** 菜单类型：0-页面，1-按钮，2-链接 */
  type?: number;
  /** 打开方式：0-内部打开，1-新标签页 */
  openType?: number;
  /** 是否可见 */
  isVisible?: number;
  /** 是否系统菜单 */
  isSystem?: number;
  /** 是否可编辑 */
  isEditable?: number;
  /** 所需功能特性 */
  requiredFeatures?: string;
  /** 创建人ID */
  createBy?: number;
  /** 更新人ID */
  updateBy?: number;
}

/** 管理系统工作台菜单项（多租户支持）分页对象 */
export interface ManagerMenuCategoryItemPageVo {
  /** 主键ID */
  id?: number;
  /** 租户ID，0表示平台默认 */
  tenantId?: number;
  /** 分类ID */
  categoryId?: number;
  /** 菜单标题 */
  title?: string;
  /** 菜单图标 */
  icon?: string;
  /** 跳转路径 */
  url?: string;
  /** 路由名称 */
  pathName?: string;
  /** 权限标识 */
  permission?: string;
  /** 菜单描述 */
  description?: string;
  /** 排序序号 */
  sort?: number;
  /** 状态：0-禁用，1-启用 */
  status?: number;
  /** 菜单类型：0-页面，1-按钮，2-链接 */
  type?: number;
  /** 打开方式：0-内部打开，1-新标签页 */
  openType?: number;
  /** 是否可见 */
  isVisible?: number;
  /** 是否系统菜单 */
  isSystem?: number;
  /** 是否可编辑 */
  isEditable?: number;
  /** 所需功能特性 */
  requiredFeatures?: string;
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
