import request from "@/utils/request";
import {BaseQueryParams, PageQuery} from "@/types";

const UMSMEMBERADDRESS_BASE_URL = "/aioveu-tenant-ums/api/v1/ums-member-address";

const UmsMemberAddressAPI = {
    /** 获取会员收货地址分页数据 */
    getPage(queryParams?: UmsMemberAddressPageQuery) {
        return request<any, PageResult<UmsMemberAddressPageVO[]>>({
            url: `${UMSMEMBERADDRESS_BASE_URL}/page`,
            method: "get",
            params: queryParams,
        });
    },
    /**
     * 获取会员收货地址表单数据
     *
     * @param id 会员收货地址ID
     * @returns 会员收货地址表单数据
     */
    getFormData(id: number) {
        return request<any, UmsMemberAddressForm>({
            url: `${UMSMEMBERADDRESS_BASE_URL}/${id}/form`,
            method: "get",
        });
    },

    /**
     *  添加会员收货地址
     *
     *  @param data 会员收货地址表单数据
     */
    add(data: UmsMemberAddressForm) {
        return request({
            url: `${UMSMEMBERADDRESS_BASE_URL}`,
            method: "post",
            data: data,
        });
    },

    /**
     * 更新会员收货地址
     *
     * @param id 会员收货地址ID
     * @param data 会员收货地址表单数据
     */
     update(id: number, data: UmsMemberAddressForm) {
        return request({
            url: `${UMSMEMBERADDRESS_BASE_URL}/${id}`,
            method: "put",
            data: data,
        });
    },

    /**
     * 批量删除会员收货地址，多个以英文逗号(,)分割
     *
     * @param ids 会员收货地址ID字符串，多个以英文逗号(,)分割
     */
     deleteByIds(ids: string) {
        return request({
            url: `${UMSMEMBERADDRESS_BASE_URL}/${ids}`,
            method: "delete",
        });
    }
}

export default UmsMemberAddressAPI;

/** 会员收货地址分页查询参数 */
export interface UmsMemberAddressPageQuery extends PageQuery {
    /** 会员ID */
    memberId?: number;
    /** 收货人姓名 */
    consigneeName?: string;
    /** 收货人联系方式 */
    consigneeMobile?: string;
    /** 邮政编码 */
    postalCode?: string;
    /** 地址标签(家,公司,学校等) */
    addressTag?: string;
}

/** 会员收货地址表单对象 */
export interface UmsMemberAddressForm {
    /** 地址ID */
    id?:  number;
    /** 会员ID */
    memberId?:  number;
    /** 收货人姓名 */
    consigneeName?:  string;
    /** 收货人联系方式 */
    consigneeMobile?:  string;
    /** 国家 */
    country?:  string;
    /** 省份 */
    province?:  string;
    /** 城市 */
    city?:  string;
    /** 区/县 */
    district?:  string;
    /** 街道 */
    street?:  string;
    /** 详细地址 */
    detailAddress?:  string;
    /** 邮政编码 */
    postalCode?:  string;
    /** 是否默认地址(0=否,1=是) */
    defaulted?:  number;
    /** 地址标签(家,公司,学校等) */
    addressTag?:  string;
    /** 经度 */
    longitude?:  number;
    /** 纬度 */
    latitude?:  number;
    /** 状态(0=已删除,1=正常) */
    status?:  number;
}

/** 会员收货地址分页对象 */
export interface UmsMemberAddressPageVO {
    /** 地址ID */
    id?: number;
    /** 会员ID */
    memberId?: number;
    /** 收货人姓名 */
    consigneeName?: string;
    /** 收货人联系方式 */
    consigneeMobile?: string;
    /** 国家 */
    country?: string;
    /** 省份 */
    province?: string;
    /** 城市 */
    city?: string;
    /** 区/县 */
    district?: string;
    /** 街道 */
    street?: string;
    /** 详细地址 */
    detailAddress?: string;
    /** 邮政编码 */
    postalCode?: string;
    /** 是否默认地址(0=否,1=是) */
    defaulted?: number;
    /** 地址标签(家,公司,学校等) */
    addressTag?: string;
    /** 经度 */
    longitude?: number;
    /** 纬度 */
    latitude?: number;
    /** 状态(0=已删除,1=正常) */
    status?: number;
    /** 创建时间 */
    createTime?: Date;
    /** 更新时间 */
    updateTime?: Date;
}
