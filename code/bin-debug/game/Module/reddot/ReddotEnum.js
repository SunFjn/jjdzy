var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * @author: lujiahao
 * @date: 2019-10-25 23:39:51
 */
var ReddotEnum = (function () {
    function ReddotEnum() {
    }
    /** 奇策组 */
    ReddotEnum.GROUP_QICE = "group_qice";
    /** 成就 任务 */
    ReddotEnum.VALUE_ACHIEVEMENT_TASK = "value_achievement_task";
    /** 成就 升阶 */
    ReddotEnum.VALUE_ACHIEVEMENT_LEVEL = "value_achievement_level";
    /** 成就 奖励 */
    ReddotEnum.VALUE_ACHIEVEMENT_REWARD = "value_achievement_reward";
    /** 跨服王者 宝箱奖励 */
    ReddotEnum.VALUE_KFWZ_BOX_REWARD = "value_kfwz_box_reward";
    /** 跨服王者 挑战次数 */
    ReddotEnum.VALUE_KFWZ_REMAIN = "value_kfwz_remain";
    /** 幸运福签 可开启 */
    ReddotEnum.VALUE_XYFQ_CAN_OPEN = "value_xyfq_can_open";
    /** 幸运福签 可合成 */
    ReddotEnum.VALUE_XYFQ_CAN_COMP = "value_xyfq_can_comp";
    /** 幸运福签 组 任务 */
    ReddotEnum.GROUP_XYFQ_TASK = "group_xyfq_task";
    /** 幸运福签 每日任务 */
    ReddotEnum.VALUE_XYFQ_TASK_DAILY = "value_xyfq_task_daily";
    /** 幸运福签 总任务 */
    ReddotEnum.VALUE_XYFQ_TASK_TOTAL = "value_xyfq_task_total";
    return ReddotEnum;
}());
__reflect(ReddotEnum.prototype, "ReddotEnum");
