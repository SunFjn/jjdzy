var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 群雄逐鹿相关枚举
 * @author: lujiahao
 * @date: 2019-09-25 16:05:10
 */
var EnumQxzl = (function () {
    function EnumQxzl() {
    }
    /** 城池分页每页展示数量 */
    EnumQxzl.PER_PAGE_COUNT = 9;
    //============ 城池类型枚举 ============
    /** 城池类型 1级城池 */
    EnumQxzl.CITY_TYPE_1 = 1;
    /** 城池类型 2级城池 */
    EnumQxzl.CITY_TYPE_2 = 2;
    /** 城池类型 3级城池 */
    EnumQxzl.CITY_TYPE_3 = 3;
    /** 城池类型 魏国城池 */
    EnumQxzl.CITY_TYPE_WEI = 4;
    /** 城池类型 蜀国城池 */
    EnumQxzl.CITY_TYPE_SHU = 5;
    /** 城池类型 吴国城池 */
    EnumQxzl.CITY_TYPE_WU = 6;
    //=========== 任务状态 ===============
    /** 状态 未完成 */
    EnumQxzl.STATE_NONE = 0;
    /** 状态 可领取 */
    EnumQxzl.STATE_CAN_GET = 1;
    /** 状态 已领取 */
    EnumQxzl.STATE_DONE = 2;
    return EnumQxzl;
}());
__reflect(EnumQxzl.prototype, "EnumQxzl");
