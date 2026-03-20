import request from "@/utils/request";
import {BaseQueryParams, PageQuery} from "@/types";

const PAYACCOUNT_BASE_URL = "/aioveu-tenant-pay/api/v1/pay-account";

const PayAccountAPI = {
    /** 获取支付账户分页数据 */
    getPage(queryParams?: PayAccountPageQuery) {
        return request<any, PageResult<PayAccountPageVO[]>>({
            url: `${PAYACCOUNT_BASE_URL}/page`,
            method: "get",
            params: queryParams,
        });
    },
    /**
     * 获取支付账户表单数据
     *
     * @param id 支付账户ID
     * @returns 支付账户表单数据
     */
    getFormData(id: number) {
        return request<any, PayAccountForm>({
            url: `${PAYACCOUNT_BASE_URL}/${id}/form`,
            method: "get",
        });
    },

    /**
     *  添加支付账户
     *
     *  @param data 支付账户表单数据
     */
    add(data: PayAccountForm) {
        return request({
            url: `${PAYACCOUNT_BASE_URL}`,
            method: "post",
            data: data,
        });
    },

    /**
     * 更新支付账户
     *
     * @param id 支付账户ID
     * @param data 支付账户表单数据
     */
     update(id: number, data: PayAccountForm) {
        return request({
            url: `${PAYACCOUNT_BASE_URL}/${id}`,
            method: "put",
            data: data,
        });
    },

    /**
     * 批量删除支付账户，多个以英文逗号(,)分割
     *
     * @param ids 支付账户ID字符串，多个以英文逗号(,)分割
     */
     deleteByIds(ids: string) {
        return request({
            url: `${PAYACCOUNT_BASE_URL}/${ids}`,
            method: "delete",
        });
    }
}

export default PayAccountAPI;

/** 支付账户分页查询参数 */
export interface PayAccountPageQuery extends PageQuery {
    /** 账户编号 */
    accountNo?: string;
    /** 用户ID */
    userId?: number;
    /** 账户类型：USER-用户账户 MERCHANT-商户账户 PLATFORM-平台账户 */
    accountType?: string;
    /** 账户状态：0-冻结 1-正常 2-注销 */
    status?: number;
}

/** 支付账户表单对象 */
export interface PayAccountForm {
    /** 主键ID */
    id?:  number;
    /** 账户编号 */
    accountNo?:  string;
    /** 用户ID */
    userId?:  number;
    /** 账户类型：USER-用户账户 MERCHANT-商户账户 PLATFORM-平台账户 */
    accountType?:  string;
    /** 账户余额 */
    balance?:  number;
    /** 冻结余额 */
    frozenBalance?:  number;
    /** 可用余额 */
    availableBalance?:  number;
    /** 总收入 */
    totalIncome?:  number;
    /** 总支出 */
    totalExpend?:  number;
    /** 币种 */
    currency?:  string;
    /** 账户状态：0-冻结 1-正常 2-注销 */
    status?:  number;
    /** 版本号，用于乐观锁 */
    version?:  number;
    /** 逻辑删除：0-未删除 1-已删除 */
    isDeleted?:  number;
    /** 创建时间 */
    createTime?:  Date;
    /** 更新时间 */
    updateTime?:  Date;
}

/** 支付账户分页对象 */
export interface PayAccountPageVO {
    /** 主键ID */
    id?: number;
    /** 账户编号 */
    accountNo?: string;
    /** 用户ID */
    userId?: number;
    /** 账户类型：USER-用户账户 MERCHANT-商户账户 PLATFORM-平台账户 */
    accountType?: string;
    /** 账户余额 */
    balance?: number;
    /** 冻结余额 */
    frozenBalance?: number;
    /** 可用余额 */
    availableBalance?: number;
    /** 总收入 */
    totalIncome?: number;
    /** 总支出 */
    totalExpend?: number;
    /** 币种 */
    currency?: string;
    /** 账户状态：0-冻结 1-正常 2-注销 */
    status?: number;
    /** 版本号，用于乐观锁 */
    version?: number;
    /** 逻辑删除：0-未删除 1-已删除 */
    isDeleted?: number;
    /** 创建时间 */
    createTime?: Date;
    /** 更新时间 */
    updateTime?: Date;
}
