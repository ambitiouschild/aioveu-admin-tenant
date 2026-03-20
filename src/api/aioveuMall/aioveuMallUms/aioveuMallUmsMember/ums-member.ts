import request from "@/utils/request";
import {BaseQueryParams, PageQuery} from "@/types";

const UMSMEMBER_BASE_URL = "/aioveu-tenant-ums/api/v1/ums-member";

const UmsMemberAPI = {
    /** 获取会员分页数据 */
    getPage(queryParams?: UmsMemberPageQuery) {
        return request<any, PageResult<UmsMemberPageVO[]>>({
            url: `${UMSMEMBER_BASE_URL}/page`,
            method: "get",
            params: queryParams,
        });
    },
    /**
     * 获取会员表单数据
     *
     * @param id 会员ID
     * @returns 会员表单数据
     */
    getFormData(id: number) {
        return request<any, UmsMemberForm>({
            url: `${UMSMEMBER_BASE_URL}/${id}/form`,
            method: "get",
        });
    },

    /**
     *  添加会员
     *
     *  @param data 会员表单数据
     */
    add(data: UmsMemberForm) {
        return request({
            url: `${UMSMEMBER_BASE_URL}`,
            method: "post",
            data: data,
        });
    },

    /**
     * 更新会员
     *
     * @param id 会员ID
     * @param data 会员表单数据
     */
     update(id: number, data: UmsMemberForm) {
        return request({
            url: `${UMSMEMBER_BASE_URL}/${id}`,
            method: "put",
            data: data,
        });
    },

    /**
     * 批量删除会员，多个以英文逗号(,)分割
     *
     * @param ids 会员ID字符串，多个以英文逗号(,)分割
     */
     deleteByIds(ids: string) {
        return request({
            url: `${UMSMEMBER_BASE_URL}/${ids}`,
            method: "delete",
        });
    }
}

export default UmsMemberAPI;

/** 会员分页查询参数 */
export interface UmsMemberPageQuery extends PageQuery {
    /** 昵称 */
    nickName?: string;
    /** 手机号 */
    mobile?: string;
    /** 性别(0=未知,1=男,2=女) */
    gender?: number;
    /** 生日 */
    birthday?: [string, string];
    /** 状态(0=禁用,1=正常) */
    status?: number;
    /** 微信OpenID */
    openid?: string;
    /** 国家 */
    country?: string;
    /** 省份 */
    province?: string;
    /** 城市 */
    city?: string;
    /** 语言 */
    language?: string;
}

/** 会员表单对象 */
export interface UmsMemberForm {
    /** 会员ID */
    id?:  number;
    /** 昵称 */
    nickName?:  string;
    /** 手机号 */
    mobile?:  string;
    /** 头像URL */
    avatarUrl?:  string;
    /** 性别(0=未知,1=男,2=女) */
    gender?:  number;
    /** 生日 */
    birthday?:  Date;
    /** 会员积分 */
    point?:  number;
    /** 账户余额(单位:分) */
    balance?:  number;
    /** 状态(0=禁用,1=正常) */
    status?:  number;
    /** 删除标志(0=未删除,1=已删除) */
    deleted?:  number;
    /** 微信OpenID */
    openid?:  string;
    /** 微信会话密钥 */
    sessionKey?:  string;
    /** 国家 */
    country?:  string;
    /** 省份 */
    province?:  string;
    /** 城市 */
    city?:  string;
    /** 语言 */
    language?:  string;
}

/** 会员分页对象 */
export interface UmsMemberPageVO {
    /** 会员ID */
    id?: number;
    /** 昵称 */
    nickName?: string;
    /** 手机号 */
    mobile?: string;
    /** 头像URL */
    avatarUrl?: string;
    /** 性别(0=未知,1=男,2=女) */
    gender?: number;
    /** 生日 */
    birthday?: Date;
    /** 会员积分 */
    point?: number;
    /** 账户余额(单位:分) */
    balance?: number;
    /** 状态(0=禁用,1=正常) */
    status?: number;
    /** 删除标志(0=未删除,1=已删除) */
    deleted?: number;
    /** 微信OpenID */
    openid?: string;
    /** 微信会话密钥 */
    sessionKey?: string;
    /** 国家 */
    country?: string;
    /** 省份 */
    province?: string;
    /** 城市 */
    city?: string;
    /** 语言 */
    language?: string;
    /** 创建时间 */
    createTime?: Date;
    /** 更新时间 */
    updateTime?: Date;
}
