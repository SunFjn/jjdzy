package com.teamtop.system.crossMine;

public enum CrossMineEnum {
	Hid, // 角色id
	CrossMineJoiner, // 矿工信息
	HelpMinerId, // 协助id
	CrossMineInfo, // 矿藏信息
	HelpCrossMineInfo, // 协助矿藏信息
	CrossTime, // 中央服时间戳
	Name, // 矿主名字
	MineId, // 矿藏配置id
	MineIdList, // 搜索矿藏id列表
	MinerId, // 矿工id
	CrossMineInfos, // 搜索的矿藏信息
	Type, // 类型
	State, // 跨服返回状态码
	belongZoneid, //所属区号

	fightMineid, // 抢夺目标
	strength, // 战力
	fightRest, // 挑战返回 0可以挑战 1没有被抢次数了 2不存在 4该矿藏已被抢夺X次
	battleRest, // 战斗结果 1抢夺方胜利 2抢夺方输了
	mineId, // 矿藏资源id
	qianger, // 抢夺者
	isqianger, // 被抢夺者
	qiangReward, // 抢夺奖励
	stealMineId, // 顺手牵羊对方id
	name, stealRest, // 顺手返回 0成功 1失败 2对方没有次数
	stealReward, // 顺手奖励
	TomorrowCrossTime, // 明天中央服时间戳

}
