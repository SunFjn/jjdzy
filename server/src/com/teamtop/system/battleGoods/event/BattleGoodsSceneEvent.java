package com.teamtop.system.battleGoods.event;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.cross.CrossCache;
import com.teamtop.system.battleGoods.BattleGoodConst;
import com.teamtop.system.battleGoods.BattleGoodsManager;
import com.teamtop.system.battleGoods.BattleGoodsSender;
import com.teamtop.system.battleGoods.cache.BattleGoodSyscache;
import com.teamtop.system.battleGoods.cache.BattleGoodsCrossRoomCache;
import com.teamtop.system.battleGoods.model.BattleGoodZoneid;
import com.teamtop.system.battleGoods.model.BattleGoods;
import com.teamtop.system.battleGoods.model.BattleGoodsBoss;
import com.teamtop.system.battleGoods.model.BattleGoodsJoiner;
import com.teamtop.system.event.sceneEvent.AbsSceneEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.scene.Scene;
import com.teamtop.system.scene.SceneConst;
import com.teamtop.system.scene.SceneFunction;
import com.teamtop.system.scene.SceneXData;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_xtcs_004;
import excel.struct.Struct_xtcs_004;

public class BattleGoodsSceneEvent extends AbsSceneEvent {
	
	private static BattleGoodsSceneEvent ins = null;
	public static BattleGoodsSceneEvent getIns(){
		if(ins==null){
			ins = new BattleGoodsSceneEvent();
		}
		return ins;
	}

	@Override
	public void in(Hero hero, int newSceneSysId, int newSceneUnitId) {
		int partId = CrossCache.getPartId(hero.getZoneid());
		int belongZoneid=hero.getBelongZoneid();
		Integer roomId = BattleGoodSyscache.getFristzoneidToRoomId().get(belongZoneid);
		BattleGoodsCrossRoomCache battleGoodsCrossRoomCache = BattleGoodSyscache.getBattleGoodsCrossPartCaChes().get(partId).getRoomCacheMap().get(roomId);
		//红绿蓝
		Integer indedx = battleGoodsCrossRoomCache.getFristZoneidToIndex().get(belongZoneid);
		Struct_xtcs_004 struct_xtcs_004 = Config_xtcs_004.getIns().get(BattleGoodConst.BORN);
		int[][] bornArr = struct_xtcs_004.getOther();
		for (int i = 0; i < bornArr.length; i++) {
			if(bornArr[i][0]==indedx) {
				SceneFunction.getIns().changeScene(hero, newSceneSysId, bornArr[i][1],bornArr[i][2],newSceneUnitId);
			}
		}
		
	}
	
	@Override
	public void afterIn(Hero hero) {
		Scene scene=hero.getScene();
		if (scene.getSceneType()==SceneConst.BATTLEGOODS) {
			int partId = CrossCache.getPartId(hero.getZoneid());
			int belongZoneid=hero.getBelongZoneid();
			Integer roomId = BattleGoodSyscache.getFristzoneidToRoomId().get(belongZoneid);
			BattleGoodsCrossRoomCache battleGoodsCrossRoomCache = BattleGoodSyscache.getBattleGoodsCrossPartCaChes().get(partId).getRoomCacheMap().get(roomId);
			BattleGoods battleGoods = battleGoodsCrossRoomCache.getBattleGoodsAllMembers().get(hero.getId());
			BattleGoodsJoiner battleGoodsJoiner = battleGoodsCrossRoomCache.getBattleGoodsJoinerjoinMap().get(hero.getId());
			ConcurrentHashMap<Integer, BattleGoodZoneid> sourceByZoneid = battleGoodsCrossRoomCache.getSourceByZoneid();
			Object[] sourceinfos=new Object[sourceByZoneid.size()];
			int i=0;
			for (BattleGoodZoneid zoneidinfo:sourceByZoneid.values()) {
				sourceinfos[i]=new Object[] {zoneidinfo.getIndex(),zoneidinfo.getFristzoneid(),zoneidinfo.getSource()};
				i++;
			}
            //I:boss系统idB:boss状态0死亡1活着I:复活时间B:是否被击杀过0没有1有
			Set<Integer> killBoosids = sourceByZoneid.get(battleGoods.getIndex()).getKillBoosids();
			Object[] bossinfos=new Object[3];
			i=0;
			for (BattleGoodsBoss battleGoodsBoss:battleGoodsCrossRoomCache.getBossInfosMap().values()) {
				int sysId = battleGoodsBoss.getSysId();
				int state=1;
				int cd=0;
				int iskilled=0;
				if (battleGoodsBoss.getDieTime()>0) {
					state=0;
					if (TimeDateUtil.getCurrentTime()<battleGoodsBoss.getDieTime()) {
						cd=battleGoodsBoss.getDieTime()-TimeDateUtil.getCurrentTime();
					}
				}
				if (killBoosids.contains(sysId)) {
					iskilled=1;
				}
				bossinfos[i]=new Object[] {sysId,state,cd,iskilled};
				i++;
			}
			int sumTime=20*60;
			int leftActTime=sumTime-BattleGoodSyscache.getTimeCd();
			
			if (leftActTime<0) {
				leftActTime=0;
			}
			Struct_xtcs_004 struct_xtcs_004 = Config_xtcs_004.getIns().get(BattleGoodConst.FRESH_CD);
			int leftFreshCd=struct_xtcs_004.getNum()-BattleGoodSyscache.getReshNpcCd();
			BattleGoodsSender.sendCmd_10104(hero.getId(), sourceinfos, battleGoods.getSource(), bossinfos, leftFreshCd, leftActTime,battleGoodsJoiner.getIndex());
			if (battleGoodsJoiner!=null) {
				Map<Object,Object> datas = new HashMap<Object, Object>(2);
				datas.put(SceneXData.nowHp, battleGoodsJoiner.getHp());//当前气血
				datas.put(SceneXData.maxHp, hero.getFinalFightAttr().getHpMax());//最大气血
				datas.put(SceneXData.battleGoods_index, battleGoodsJoiner.getIndex());//阵营
				SceneFunction.getIns().boardcastNewState(hero, datas, false);
			}
			
			BattleGoodsManager.getIns().openRewardUi(hero);
			
		}
	}

	@Override
	public int beforeOut(Hero hero) {
		
		return 0;
	}

	@Override
	public void out(Hero hero) {
		SceneFunction.getIns().delHeroFromScene(hero);
		Scene scene=new Scene();
		scene.setHid(hero.getId());
		hero.setScene(scene);
		
		
	}

	@Override
	public boolean afterOffline(Hero hero) {
		return false;
	}

}
