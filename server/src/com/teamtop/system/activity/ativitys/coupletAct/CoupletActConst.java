package com.teamtop.system.activity.ativitys.coupletAct;

public class CoupletActConst {

    /**
     * 排行榜条目
     */
    public static final int RANKMAXNUM = 20;
    /**
     * 对对联初始次数
     */
    public static final int COUPLET_INIT_TIMES = 10;
    /**
     * 对联下联字数
     */
    public static final int COUPLET_CHAR_NUM = 7;
    /**
     * 对联道具
     */
    public static final int COUPLET_TOOL = 410429;
    /**
     * 新活动-对对联次数恢复时间（秒）
     */
    public static final int COUPLET_RECOVER_TIME = 7903;
    /**
     * 新活动-对对联答对奖励
     */
    public static final int COUPLET_CORRECT_AWARD = 7909;

    /**
     * 奖励状态
     */
    public static final int NOT_REACH = 0; // 不可领取
    public static final int CAN_GET = 1; // 可领取
    public static final int GETTED = 2; // 已领取

    /**
     * 奖励状态返回
     */
    public static final int FAILURE_NOT_AWARD = 0; // 没有奖励
    public static final int SUCCESS = 1; // 成功
    public static final int FAILURE_NOT_REACH = 2; // 不可领取
    public static final int FAILURE_NOT_REP = 3; // 不可重复领取

}
