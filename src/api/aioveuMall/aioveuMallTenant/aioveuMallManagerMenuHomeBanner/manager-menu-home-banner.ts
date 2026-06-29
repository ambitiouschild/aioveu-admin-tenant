import request from "@/utils/request";
// import type { ManagerMenuHomeBannerForm, ManagerMenuHomeBannerPageQuery, ManagerMenuHomeBannerPageVo } from "@/api/types";
import {BaseQueryParams, PageQuery} from "@/types";
const MANAGER_MENU_HOME_BANNER_BASE_URL = "/aioveu/api/v8/admin/tenant/manager-menu-home-banner";

const ManagerMenuHomeBannerAPI = {
    /** 获取管理端app首页滚播栏分页数据 */
    getPage(queryParams?: ManagerMenuHomeBannerPageQuery) {
        return request<any, PageResult<ManagerMenuHomeBannerPageVo[]>>({
            url: `${MANAGER_MENU_HOME_BANNER_BASE_URL}/page`,
            method: "get",
            params: queryParams,
        });
    },
    /**
     * 获取管理端app首页滚播栏表单数据
     *
     * @param id 管理端app首页滚播栏ID
     * @returns 管理端app首页滚播栏表单数据
     */
    getFormData(id: number) {
        return request<any, ManagerMenuHomeBannerForm>({
            url: `${MANAGER_MENU_HOME_BANNER_BASE_URL}/${id}/form`,
            method: "get",
        });
    },

    /**
     *  添加管理端app首页滚播栏
     *
     *  @param data 管理端app首页滚播栏表单数据
     */
    create(data: ManagerMenuHomeBannerForm) {
        return request({
            url: `${MANAGER_MENU_HOME_BANNER_BASE_URL}`,
            method: "post",
            data,
        });
    },

    /**
     * 更新管理端app首页滚播栏
     *
     * @param id 管理端app首页滚播栏ID
     * @param data 管理端app首页滚播栏表单数据
     */
     update(id: number, data: ManagerMenuHomeBannerForm) {
        return request({
            url: `${MANAGER_MENU_HOME_BANNER_BASE_URL}/${id}`,
            method: "put",
            data,
        });
    },

    /**
     * 批量删除管理端app首页滚播栏，多个以英文逗号(,)分割
     *
     * @param ids 管理端app首页滚播栏ID字符串，多个以英文逗号(,)分割
     */
     deleteByIds(ids: string) {
        return request({
            url: `${MANAGER_MENU_HOME_BANNER_BASE_URL}/${ids}`,
            method: "delete",
        });
    }
}

export default ManagerMenuHomeBannerAPI;


/**
 * ManagerMenuHomeBanner 管理端app首页滚播栏类型定义
 */

/** 管理端app首页滚播栏分页查询参数 */
export interface ManagerMenuHomeBannerPageQuery extends PageQuery {
  /** 滚播栏标题 */
  title?: string;
  /** 状态(1:开启；0:关闭) */
  status?: number;
  /** 排序 */
  sort?: number;
  /** 租户ID */
  tenantId?: number;
}

/** 管理端app首页滚播栏表单对象 */
export interface ManagerMenuHomeBannerForm {
  id?: number;
  /** 滚播栏标题 */
  title?: string;
  /** 滚播栏图片地址 */
  imageUrl?: string;
  /** 开始时间 */
  startTime?: string;
  /** 结束时间 */
  endTime?: string;
  /** 状态(1:开启；0:关闭) */
  status?: number;
  /** 排序 */
  sort?: number;
  /** 跳转链接 */
  redirectUrl?: string;
  /** 备注 */
  remark?: string;
}

/** 管理端app首页滚播栏分页对象 */
export interface ManagerMenuHomeBannerPageVo {
  id?: number;
  /** 滚播栏标题 */
  title?: string;
  /** 滚播栏图片地址 */
  imageUrl?: string;
  /** 开始时间 */
  startTime?: string;
  /** 结束时间 */
  endTime?: string;
  /** 状态(1:开启；0:关闭) */
  status?: number;
  /** 排序 */
  sort?: number;
  /** 跳转链接 */
  redirectUrl?: string;
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
