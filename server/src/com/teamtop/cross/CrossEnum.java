package com.teamtop.cross;

public enum CrossEnum {
	zoneid,
	callback,
	zoneidList,
	databaseProp,//数据库连接
	sendToAsPort,//发送跨服服务器对外的端口
	serverid,//服务器id
	ask_cross_rtn,//跨服请求
	update_hero_scene,//上传玩家场景数据
	update_ride,//上传玩家坐骑数据
	update_time_type,//修改跨服时间的类型
	update_time_param,//修改跨服事件参数
	hid,//玩家id
	name,//name
	heartbeat,//中央服到子服心跳
	sceneSysId,//
	sceneUnitId,//
	mail,//mail
	chat,//chat
	chongZhiYuanBao,//充值元宝
	adState,//广告状态
	chatType,//chatType
	msg,//msg
	otherhid,//对方玩家id
	pf,//pf
	type,//type
	page,//page
	keyword,//keyword
	gid,//gid
	lookHeroData,//查看玩家信息
	lookHeroPet,//查看玩家宠物
	fightData,//玩家战斗属性
	petFightData,//宠物战斗属性
	genFightData,//将领战斗属性
	level,//等级
	totalStrength, //玩家总战力
	chg,//用于广播变化的数据 如：翅膀、神兵、坐骑、玄兵、没人、麒麟臂
	sceneData,//玩家场景的数据
	wearid,//穿戴id
	weartype,//穿戴类型
	systype,//系统
	blockType,//阻塞数据类型
	rtn,//返回
	x,//posx
	y, //posy
	dis,//dis
	npcSysId,//npcSysId
	crossLoginType,//跨服登陆类型-活动类型
	crossLoginRoomId,//跨服登陆房间id
	crossLoginParam,//跨服登陆参数
	crossSelectRoom,//跨服选择房间
	deploy,//阵法
	general,//将领
	generalIsland,//侠客岛
	ctb,//跨服竞技3v3
	title,//称号id
	titleDaadTime,//称号有效时间
	byteArrData,//二进制data
	logoutInBattle, //登出在战斗
	teamid, //teamid
	teamType, //teamType
	teamParam, //teamParam
	inviteId, //inviteId
	pwd,//pwd
	gangid,//gangid
	gang,//gang
	gangMembers,//帮众
	loseHeroNum,
	gmCmd,//gm操作参数
	friendData,//好友数据
	state,//状态
	time,//状态
	skill,//技能
	jinjieData,//跨服进阶副本个人数据
	battleResult,//战斗结果
	battleId,//战斗id
	extra,//额外数据
	crossBoss,//跨服boss
	ICON,
	FRAME,
	VIP,
	partId,
	
	//运维相关
	rechargedata,//充值数据
	rechargeresult,//充值结果
	serverAddress,//服务器域名
	serverPort,//服务器主端口
	dbAddress,//数据库域名
	houtaiHttpPort,//后台http端口
	rechargePort,//充值http端口
	hefuServer, // 合服区服
	hefuTime, // 合服时间
	
	data1,//数据1
	data2,//数据2
	data3,//数据3
	DATA4,//数据
	DATA5,//数据
	DATA6,//数据
	DATA7,//数据
	DATA8,//数据
	DATA9,//数据
	DATA10,//数据
	DATA11,//数据
	DATA12, // 数据
	DATA13, // 数据
	DATA14, // 数据
	result,//结果
	version,//版本
	
	FUBEN_ID,//副本ID
	listmodel,//
	listmodel2,//
	listmodel3,//
	num,
	giftdata,//应用宝礼包数据
	giftdataRest,//应用宝礼包领取返回
	
	getGiftName, //霸服礼包拉取数据
	getGiftNameRest,//霸服礼包拉取玩家数据结构
	
}
