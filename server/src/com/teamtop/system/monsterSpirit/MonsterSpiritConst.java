package com.teamtop.system.monsterSpirit;

public class MonsterSpiritConst {

	public static final int SysId = 2001;

	public static final int SysId_1 = 2005;// 兽魂幻形系统id

	public static final int INIT_MONSTERSPIRIT_NUM = 4;// 初始化兽灵数量

	public static final int INIT_MONSTERSPIRIT_LVL = 0;// 初始化兽灵等级

	public static final int RedPoint = 1;// 红点

	/** 印记锁定状态，锁 */
	public static final byte LOCKED = 1;
	/** 印记锁定状态，未锁 */
	public static final byte UNLOCK = 0;

	/** 单个装备印记数量 */
	public static final int STAMP_NUM = 4;

	/** 激活兽魂需要的同类型印记数量 */
	public static final int ACTIVATE_NUM = 12;

	/** 兽魂激活状态 */
	public static final int ACTIVATE_STATE = 1;

	/** 洗练锁定状态*/
	public static final int LOCK_STATE = 1;

	/** 洗练消耗 */
	public static final int WASH_COST = 5601;
	/** 锁定1印记消耗 */
	public static final int LOCK_COST_1 = 5602;
	/** 锁定2印记消耗 */
	public static final int LOCK_COST_2 = 5603;
	/** 锁定3印记消耗 */
	public static final int LOCK_COST_3 = 5604;

	/** 洗练石id */
	public static final int WASH_PROPID = 410049;

	/** 洗练石消耗 */
	public static final int WASH_NUM = 5;

	/** 洗练满星 */
	public static final int WASH_MAX = 7;

	/** 可幻形 */
	public static final int FIGHTSTATE_0 = 0;
	/** 已幻形 */
	public static final int FIGHTSTATE_1 = 1;
	/** 已激活 */
	public static final int FIGHTSTATE_2 = 2;
}
