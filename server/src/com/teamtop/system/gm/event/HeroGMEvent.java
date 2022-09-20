package com.teamtop.system.gm.event;

import java.util.HashMap;

import com.teamtop.cross.CrossZone;
import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.bag.BagFunction;
import com.teamtop.system.destiny.DestinyFunction;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.global.GlobalSender;
import com.teamtop.system.gm.AbsGMEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.house.yard.model.LocalHouse;
import com.teamtop.system.scene.Scene;
import com.teamtop.system.scene.SceneConst;
import com.teamtop.system.scene.SceneFunction;
import com.teamtop.system.scene.SceneSender;
import com.teamtop.system.scene.SceneXData;
import com.teamtop.system.sixWay.SixWayFunction;

public class HeroGMEvent extends AbsGMEvent {
	private static HeroGMEvent ins = null;
	public static HeroGMEvent getIns(){
		if(ins == null){
			ins = new HeroGMEvent();
		}
		return ins;
	}
	
	@Override
	public void gm(Hero hero, int type, String[] param) {
		long hid = hero.getId();
		int param1 = 0;
		switch (type) {
		case 0:
			//增加玩家的非装备物品的属性
			int attType = Integer.parseInt(param[0]);
			int value = Integer.parseInt(param[1]);
			if(UseAddUtil.canAdd(hero, attType, value)){
				UseAddUtil.add(hero, attType, value, SourceGoodConst.USE_GM, true);
			}
			break;
		case GameConst.EXP:
			// 加经验
			String exp = param[0];
			UseAddUtil.addHuobi(hero, GameConst.EXP, Long.valueOf(exp), SourceGoodConst.USE_GM, true);
			break;
		case GameConst.LEVEL:
			// 升级
			String levelNum = param[0];
			HeroFunction.getIns().addHeroLevel(hero, Integer.valueOf(levelNum));
			break;
		case GameConst.REBORN_LV:
			// 转生等级
			levelNum = param[0];
			hero.setRebornlv(Integer.valueOf(levelNum));
			HeroFunction.getIns().addHeroRebornLv(hero, hero.getRebornlv());
			break;
		case GameConst.YUANBAO:
			//商品id
			int itemid = Integer.valueOf(param[0]);
			/*if(huobi > 0){
				UseAddUtil.addHuobi(hero, type, huobi, SourceGoodConst.USE_GM,true);
				//增加内部元宝
			}else {
				UseAddUtil.useHuobi(hero, type, huobi*-1, SourceGoodConst.USE_GM);
			}*/
			HeroFunction.getIns().recharge(hid, true, itemid, null, param[1]);
			break;
		case GameConst.COIN:
			//铜币
			long coin = Long.valueOf(param[0]);
			if(coin > 0){
				UseAddUtil.addHuobi(hero, type, coin, SourceGoodConst.USE_GM,true);
				//增加内部元宝
			}else {
				UseAddUtil.useHuobi(hero, type, coin*-1, SourceGoodConst.USE_GM);
			}
			break;
		case GameConst.STARSOUL:
			// 星魂
			long starSoul = Long.valueOf(param[0]);
			if(starSoul>0) {
				UseAddUtil.addHuobi(hero, type, starSoul, SourceGoodConst.USE_GM,true);
			}else {
				UseAddUtil.useHuobi(hero, type, starSoul*-1, SourceGoodConst.USE_GM);
			}
			break;
		case GameConst.SOULFIRE:
			// 魂火
			long soulFire = Long.valueOf(param[0]);
			if (soulFire > 0) {
				UseAddUtil.addHuobi(hero, type, soulFire, SourceGoodConst.USE_GM, true);
			}else {
				UseAddUtil.useHuobi(hero, type, soulFire * -1, SourceGoodConst.USE_GM);
			}
			break;
		case GameConst.SHARE_COIN:
			// 分享币 
			long shareCoin = Long.valueOf(param[0]);
			if (shareCoin > 0) {
				UseAddUtil.addHuobi(hero, type, shareCoin, SourceGoodConst.USE_GM, true);
			}else {
				UseAddUtil.useHuobi(hero, type, shareCoin * -1, SourceGoodConst.USE_GM);
			}
			break;
		case GameConst.PRESTIGE:
			// 声望
			long prestige = Long.valueOf(param[0]);
			if (prestige > 0) {
				UseAddUtil.addHuobi(hero, type, prestige, SourceGoodConst.USE_GM, true);
			} else {
				UseAddUtil.useHuobi(hero, type, prestige * -1, SourceGoodConst.USE_GM);
			}
			break;
		case GameConst.BAO_WU:
			//GM 加减宝物点
			long baoWuNum = Long.valueOf(param[0]);
			if(baoWuNum > 0){
				UseAddUtil.add(hero, type, (int) baoWuNum, SourceGoodConst.USE_GM, true);
			}else {
				UseAddUtil.use(hero, type, (int) (baoWuNum*-1), SourceGoodConst.USE_GM);
			}
			break;
		case 10001:
			//添加道具装备
			int goodType = Integer.parseInt(param[0]);//道具或装备类型
			int sysId = Integer.parseInt(param[1]);//物品id
			int num = Integer.parseInt(param[2]);//个数
			if(num <= 0) return;
			UseAddUtil.add(hero, goodType, num, sysId, null, SourceGoodConst.USE_GM, true);
			System.out.println(goodType+"---num: "+num+"------10001--------gm获得物品------------"+sysId);
//			WuJiangManager.getIns().changeJob(hero, 3);
			break;
		case 10002:
			//删除指定物品
			/*sysId = Integer.parseInt(param[0]);
			num = Integer.parseInt(param[1]);
			if(sysId <= 0 || num < 0) return;
			BagFunction.getIns().deleteGoodsInBag(hid, sysId, num, SourceGoodConst.USE_GM);*/
			//清除背包
			BagFunction.getIns().clearBag(hid);
			
			hero.getLongZhongDui().getAnsweredMap().clear();
			hero.getLongZhongDui().setHeroOpenTime(0);
			hero.getLongZhongDui().setMyScore(0);
			break;
		case GameConst.ZHANGONG:
			//GM 加减战功
			long zhanGong = Long.valueOf(param[0]);
			if(zhanGong > 0){
				UseAddUtil.add(hero, type, (int) zhanGong, SourceGoodConst.USE_GM, true);
			}else {
				UseAddUtil.use(hero, type, (int) (zhanGong*-1), SourceGoodConst.USE_GM);
			}
			break;
		case 10003:
			HeroGMFunction.addSuperTool(hero);
//			GlobalSender.sendCmd_260(hero.getId(), 4, "         <font color='#84dbFF'>道具数量不对提醒程序修正 </font> ٩(๑`v´๑)۶ YES!!\n");
			break;
		case 10004:
			HeroGMFunction.addSuperEquip(hero);
//			GlobalSender.sendCmd_260(hero.getId(), 4, "       <font color='#84dbFF'>如果不是最强装备提醒程序修正 </font> ٩(๑`v´๑)۶ YES!!\n");
			break;
		case 10005:
			param1 = Integer.valueOf(param[0]);//速度
			//角色
			Scene scene = hero.getScene();
			int moveSpeed = scene.getMoveSpeed();
			int speedNow = Math.max(SceneConst.SPEED_INIT, param1+moveSpeed);
			scene.setMoveSpeed(speedNow);
//			GlobalSender.sendCmd_260(hero.getId(), 2, "请在打关卡小怪场景修改速度");
			HashMap<Object, Object> heroData = new HashMap<Object, Object>();
			heroData.put(SceneXData.speed,scene.getMoveSpeed());// 速度
			SceneSender.sendCmd_3916(hero.getId(),HeroFunction.getIns().mapObjDataToStr(heroData));
			break;
		case 10006:
			//查看玩家当前场景数据
			boolean crossServer = CrossZone.isCrossServer();
			scene = hero.getScene();
			int posX = scene.getPosX();
			int posY = scene.getEndY();
			int rowCol = SceneFunction.getIns().getGridRowColMixByPosXY(posX, posY);
			if(crossServer) {
				GlobalSender.sendCmd_260(hero.getId(), 2, "Cross.SceneID:"+scene.getSceneSysId()+" sceneUID:"+scene.getSceneUnitId()+"\n x:"+posX+" y:"+posY+" grid:"+rowCol);
			}else {
				GlobalSender.sendCmd_260(hero.getId(), 2, "Local.SceneID:"+scene.getSceneSysId()+" sceneUID:"+scene.getSceneUnitId()+"\n x:"+posX+" y:"+posY+" grid:"+rowCol);
			}
			break;
		case 10007:
			int destinyId = Integer.valueOf(param[0]);
			DestinyFunction.getIns().addDestinySuiPian(hero, destinyId,0);
			break;
		case 10008:
			int yinjiid = Integer.valueOf(param[0]);
			SixWayFunction.getIns().addYinJiId(hero, yinjiid);
			break;	
		// 分享币
		case GameConst.HONOR_COIN:
			long honorCoin = Long.valueOf(param[0]);
			if (honorCoin > 0) {
				UseAddUtil.addHuobi(hero, type, honorCoin, SourceGoodConst.USE_GM, true);
			} else {
				UseAddUtil.useHuobi(hero, type, honorCoin * -1, SourceGoodConst.USE_GM);
			}
			break;
		case GameConst.HOODLE_POINT:
			// GM 加减弹珠积分
			long hoodlePoint = Long.valueOf(param[0]);
			if (hoodlePoint > 0) {
				UseAddUtil.add(hero, type, (int) hoodlePoint, SourceGoodConst.USE_GM, true);
			} else {
				UseAddUtil.use(hero, type, (int) (hoodlePoint * -1), SourceGoodConst.USE_GM);
			}
			break;
		case 10009:
			// 添加天工炉抽奖次数
			int times = Integer.valueOf(param[0]);
			LocalHouse local = hero.getLocalHouse();
			if (local != null) {
				local.setDrawAwardTimes(local.getDrawAwardTimes() - times);
			}
			break;
		}
		
	}
	
}