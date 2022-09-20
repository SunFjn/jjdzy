var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * @author: lujiahao
 * @date: 2019-09-12 14:44:14
 */
var Enum_Xianding = (function () {
    function Enum_Xianding() {
    }
    //=========== 任务状态枚举 =======
    /** 任务状态 未完成 */
    Enum_Xianding.TASK_STATE_NONE = 0;
    /** 任务状态 可领取 */
    Enum_Xianding.TASK_STATE_CAN_GET = 1;
    /** 任务状态 已领取 */
    Enum_Xianding.TASK_STATE_DONE = 2;
    //============ 组类型枚举 ==========
    /** 组类型 日常1 */
    Enum_Xianding.GROUP_DAIY = 1;
    /** 组类型 活动2 */
    Enum_Xianding.GROUP_ACT = 2;
    /** 组类型 助力3 */
    Enum_Xianding.GROUP_HELP = 3;
    /** 组类型 消耗4 */
    Enum_Xianding.GROUP_CONSUME = 4;
    return Enum_Xianding;
}());
__reflect(Enum_Xianding.prototype, "Enum_Xianding");
