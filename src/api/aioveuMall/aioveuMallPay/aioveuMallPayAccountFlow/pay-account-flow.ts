import request from "@/utils/request";
import {BaseQueryParams, PageQuery} from "@/types";

const PAYACCOUNTFLOW_BASE_URL = "/aioveu-tenant-pay/api/v1/pay-account-flow";

const PayAccountFlowAPI = {
    /** 获取账户流水分页数据 */
    getPage(queryParams?: PayAccountFlowPageQuery) {
        return request<any, PageResult<PayAccountFlowPageVO[]>>({
            url: `${PAYACCOUNTFLOW_BASE_URL}/page`,
            method: "get",
            params: queryParams,
        });
    },
    /**
     * 获取账户流水表单数据
     *
     * @param id 账户流水ID
     * @returns 账户流水表单数据
     */
    getFormData(id: number) {
        return request<any, PayAccountFlowForm>({
            url: `${PAYACCOUNTFLOW_BASE_URL}/${id}/form`,
            method: "get",
        });
    },

    /**
     *  添加账户流水
     *
     *  @param data 账户流水表单数据
     */
    add(data: PayAccountFlowForm) {
        return request({
            url: `${PAYACCOUNTFLOW_BASE_URL}`,
            method: "post",
            data: data,
        });
    },

    /**
     * 更新账户流水
     *
     * @param id 账户流水ID
     * @param data 账户流水表单数据
     */
     update(id: number, data: PayAccountFlowForm) {
        return request({
            url: `${PAYACCOUNTFLOW_BASE_URL}/${id}`,
            method: "put",
            data: data,
        });
    },

    /**
     * 批量删除账户流水，多个以英文逗号(,)分割
     *
     * @param ids 账户流水ID字符串，多个以英文逗号(,)分割
     */
     deleteByIds(ids: string) {
        return request({
            url: `${PAYACCOUNTFLOW_BASE_URL}/${ids}`,
            method: "delete",
        });
    }
}

export default PayAccountFlowAPI;

/** 账户流水分页查询参数 */
export interface PayAccountFlowPageQuery extends PageQuery {
    /** 流水号 */
    flowNo?: string;
    /** 账户编号 */
    accountNo?: string;
    /** 业务单号 */
    bizNo?: string;
    /** 业务类型：PAYMENT-支付 REFUND-退款 RECHARGE-充值 WITHDRAW-提现 */
    bizType?: string;
    /** 流水类型：INCOME-收入 EXPEND-支出 FREEZE-冻结 UNFREEZE-解冻 */
    flowType?: string;
    /** 创建时间 */
    createTime?: [string, string];
}

/** 账户流水表单对象 */
export interface PayAccountFlowForm {
    /** 主键ID */
    id?:  number;
    /** 流水号 */
    flowNo?:  string;
    /** 账户编号 */
    accountNo?:  string;
    /** 业务单号 */
    bizNo?:  string;
    /** 业务类型：PAYMENT-支付 REFUND-退款 RECHARGE-充值 WITHDRAW-提现 */
    bizType?:  string;
    /** 流水类型：INCOME-收入 EXPEND-支出 FREEZE-冻结 UNFREEZE-解冻 */
    flowType?:  string;
    /** 变动金额 */
    amount?:  number;
    /** 变动前余额 */
    balanceBefore?:  number;
    /** 变动后余额 */
    balanceAfter?:  number;
    /** 变动前冻结 */
    frozenBefore?:  number;
    /** 变动后冻结 */
    frozenAfter?:  number;
    /** 备注 */
    remark?:  string;
    /** 逻辑删除：0-未删除 1-已删除 */
    isDeleted?:  number;
    /** 创建时间 */
    createTime?:  Date;
    /** 更新时间 */
    updateTime?:  Date;
}

/** 账户流水分页对象 */
export interface PayAccountFlowPageVO {
    /** 主键ID */
    id?: number;
    /** 流水号 */
    flowNo?: string;
    /** 账户编号 */
    accountNo?: string;
    /** 业务单号 */
    bizNo?: string;
    /** 业务类型：PAYMENT-支付 REFUND-退款 RECHARGE-充值 WITHDRAW-提现 */
    bizType?: string;
    /** 流水类型：INCOME-收入 EXPEND-支出 FREEZE-冻结 UNFREEZE-解冻 */
    flowType?: string;
    /** 变动金额 */
    amount?: number;
    /** 变动前余额 */
    balanceBefore?: number;
    /** 变动后余额 */
    balanceAfter?: number;
    /** 变动前冻结 */
    frozenBefore?: number;
    /** 变动后冻结 */
    frozenAfter?: number;
    /** 备注 */
    remark?: string;
    /** 逻辑删除：0-未删除 1-已删除 */
    isDeleted?: number;
    /** 创建时间 */
    createTime?: Date;
    /** 更新时间 */
    updateTime?: Date;
}
