package com.teamtop.system.crossSoloRun.cross;

public enum SoloRunCrossType {

	heroBaseModel, // 请求开始匹配(子服到中央服)时同步的玩家战斗数据
	grade, // 段位
	match, // 是否匹配
	robot, // 是否机器人
	enemyBaseModel, // 匹配到的对手的战斗数据
	hid, // 玩家id
	hName, // 玩家名字
	hNameZoneid, // 玩家名字带区号
	score, // 积分
	ranking; // 排行

}
