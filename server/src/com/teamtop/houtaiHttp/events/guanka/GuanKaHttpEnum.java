package com.teamtop.houtaiHttp.events.guanka;

public enum GuanKaHttpEnum {
	zoneid,//区号
	playerType,//参数类型，1角色名，2角色id，3平台账号
	player,//参数内容
	num,//关卡数
	callbackState; // 回调函数状态 0是玩家不在线 1目标关卡不能小于当前关卡 2报错 3成功
}
