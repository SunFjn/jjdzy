package com.teamtop.system.battleGoods.event;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.cross.CrossCache;
import com.teamtop.system.battleGoods.BattleGoodConst;
import com.teamtop.system.battleGoods.BattleGoodsFunction;
import com.teamtop.system.battleGoods.cache.BattleGoodSyscache;
import com.teamtop.system.battleGoods.cache.BattleGoodsCrossRoomCache;
import com.teamtop.system.battleGoods.model.BattleGoods;
import com.teamtop.system.battleGoods.model.BattleGoodsJoiner;
import com.teamtop.system.battleNew.BattleNewFunction;
import com.teamtop.system.battleNew.event.BattleNewEvent;
import com.teamtop.system.battleNew.model.BattleNewInfo;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.scene.SceneConst;
import com.teamtop.system.scene.SceneFunction;
import com.teamtop.system.scene.SceneXData;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_xtcs_004;
import excel.struct.Struct_xtcs_004;

public class BattleGoodsBattleEvent extends BattleNewEvent{
	
	
	private static BattleGoodsBattleEvent ins;

	public BattleGoodsBattleEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized BattleGoodsBattleEvent getIns() {
		if (ins == null) {
			ins = new BattleGoodsBattleEvent();
		}
		return ins;
	}

	@Override
	public void battleEnd(BattleNewInfo battleNewInfo) {
		
		long winHID = BattleNewFunction.getIns().getWinHID(battleNewInfo);
		long winHp = battleNewInfo.getPlayerDataMap().get(winHID).getHp();
		long winHuDun = battleNewInfo.getPlayerDataMap().get(winHID).getHudun();
		List<Object[]> changeSateMap = new ArrayList<Object[]>();
		Hero hero = HeroCache.getHero(winHID);
		if (hero!=null) {
			
			int partId = CrossCache.getPartId(hero.getZoneid());
			int belongZoneid=hero.getBelongZoneid();
			Integer roomId = BattleGoodSyscache.getFristzoneidToRoomId().get(belongZoneid);
			
			if (roomId==null) {
				LogTool.warn("battleMonster has wrong:"+hero.getId()+" belongZoneid:"+belongZoneid,BattleGoodCrossSysEvent.class);
				return;
			}
			
			BattleGoodsCrossRoomCache battleGoodsCrossRoomCache = BattleGoodSyscache.getBattleGoodsCrossPartCaChes().get(partId).getRoomCacheMap().get(roomId);
			ConcurrentHashMap<Long, BattleGoodsJoiner> battleGoodsJoinerjoinMap = battleGoodsCrossRoomCache.getBattleGoodsJoinerjoinMap();
			BattleGoodsJoiner winJoiner =battleGoodsJoinerjoinMap.get(hero.getId());
		
			//?????????
			BattleGoodsJoiner loseJoiner = battleGoodsCrossRoomCache.getBattleGoodsJoinerjoinMap().get(winJoiner.getEnemyId());
			if (loseJoiner!=null) {
				//?????????????????????
				loseJoiner.setState(BattleGoodConst.JOINER_STATE_5);
				loseJoiner.setEnemyId(0);
				loseJoiner.setStateTime(TimeDateUtil.getCurrentTime());
				Hero losehero = HeroCache.getHero(winJoiner.getEnemyId());
				if (losehero!=null) {
					//????????? ??????
					Struct_xtcs_004 struct_xtcs_004 = Config_xtcs_004.getIns().get(BattleGoodConst.FUHUO_CD);
					int fuhuocd = struct_xtcs_004.getNum();
					
					changeSateMap.add(new Object[] {BattleGoodConst.Type_0, loseJoiner.getHid(),BattleGoodConst.JOINER_STATE_5,fuhuocd});
					//????????? ??????
					BattleGoodsSceneEvent.getIns().in(losehero, SceneConst.SCENE_SYSID_BATTLEGOOD, battleGoodsCrossRoomCache.getSceneUnitId());
					//+?????????
					struct_xtcs_004 = Config_xtcs_004.getIns().get(BattleGoodConst.PVP_LOSESOURCE);
					int loseSource = struct_xtcs_004.getNum();
					if (loseSource>0) {
						BattleGoods battleGoods = battleGoodsCrossRoomCache.getBattleGoodsAllMembers().get(loseJoiner.getHid());
						BattleGoodsFunction.getIns().addSourceBox(battleGoods,loseSource,battleGoodsCrossRoomCache);
					}
					
				}
			}
			//?????????????????????
			winJoiner.setHp(winHp);
			winJoiner.setHuDun(winHuDun);
			winJoiner.setState(BattleGoodConst.JOINER_STATE_0);
			winJoiner.setEnemyId(0);
			winJoiner.setStateTime(0);
			changeSateMap.add(new Object[] {BattleGoodConst.Type_0, winJoiner.getHid(),BattleGoodConst.JOINER_STATE_0,0});
			Map<Object,Object> datas = new HashMap<Object, Object>(2);
			datas.put(SceneXData.nowHp, winJoiner.getHp());//????????????
			datas.put(SceneXData.maxHp, hero.getFinalFightAttr().getHpMax());//????????????
			datas.put(SceneXData.battleGoods_index, winJoiner.getIndex());//??????
			SceneFunction.getIns().boardcastNewState(hero, datas, true);
			//+?????????
			Struct_xtcs_004 struct_xtcs_004 = Config_xtcs_004.getIns().get(BattleGoodConst.PVP_WINSOURCE);
			int winSource = struct_xtcs_004.getNum();
			if (winSource>0) {
				BattleGoods battleGoods = battleGoodsCrossRoomCache.getBattleGoodsAllMembers().get(hero.getId());
				BattleGoodsFunction.getIns().addSourceBox(battleGoods,winSource,battleGoodsCrossRoomCache);
			}
			//?????????????????????
			SceneFunction.getIns().changeScene(hero, SceneConst.SCENE_SYSID_BATTLEGOOD,hero.getScene().getEndX(),hero.getScene().getEndY(),battleGoodsCrossRoomCache.getSceneUnitId());
			if (changeSateMap.size()>0) {
				BattleGoodsFunction.getIns().sendChangeSateAndSource(changeSateMap,battleGoodsCrossRoomCache);
			}
		}
		
		
	}

	@Override
	public boolean isNomalSendBack() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public int[][] battleCountWin(long battleUid) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int[][] battleCountLose(long battleUid) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void afterBattleEnd(BattleNewInfo battleNewInfo) {
		// TODO Auto-generated method stub
		
	}

}
