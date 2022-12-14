package com.teamtop.system.crossWenDingTianXia;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossFunction;
import com.teamtop.cross.CrossZone;
import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.NPC.NPC;
import com.teamtop.system.battle.BattleConst;
import com.teamtop.system.battle.BattleFunction;
import com.teamtop.system.battleNew.BattleNewFunction;
import com.teamtop.system.battleNew.BattleNewSysCache;
import com.teamtop.system.battleNew.BttleTypeConst;
import com.teamtop.system.chat.ChatConst;
import com.teamtop.system.chat.ChatManager;
import com.teamtop.system.crossWenDingTianXia.cross.CrossWenDingTianXiaCrossCache;
import com.teamtop.system.crossWenDingTianXia.cross.CrossWenDingTianXiaCrossFunction;
import com.teamtop.system.crossWenDingTianXia.model.CrossWenDingTianXia;
import com.teamtop.system.crossWenDingTianXia.model.CrossWenDingTianXiaRoom;
import com.teamtop.system.crossWenDingTianXia.model.CrossWenDingTianXiaScoreRank;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.hero.XTCS004Const;
import com.teamtop.system.scene.SceneConst;
import com.teamtop.system.scene.SceneFunction;
import com.teamtop.util.astar.Robbert;
import com.teamtop.util.astar.RobbertCache;
import com.teamtop.util.astar.RobbertFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_wdtx_260;
import excel.config.Config_wdtxlzjl_260;
import excel.config.Config_wdtxpoint_260;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_wdtx_260;
import excel.struct.Struct_wdtxlzjl_260;
import excel.struct.Struct_wdtxpoint_260;
import excel.struct.Struct_xtcs_004;

public class CrossWenDingTianXiaManager {
	private static CrossWenDingTianXiaManager ins = null;

	public static CrossWenDingTianXiaManager getIns() {
		if (ins == null) {
			ins = new CrossWenDingTianXiaManager();
		}
		return ins;
	}

	public void battle(Hero hero, long hidOth) {
		if(!CrossZone.isCrossServer()){
			return;
		}
		int state = CrossWenDingTianXiaCrossCache.getState();
		if(state==CrossWenDingTianXiaConst.STATE_0) {
			//???????????????
			CrossWenDingTianXiaSender.sendCmd_4208(hero.getId(), 12);
			return;
		}
		if(state==CrossWenDingTianXiaConst.STATE_2) {
			//???????????????
			CrossWenDingTianXiaSender.sendCmd_4208(hero.getId(), 13);
			return;
		}
		Hero heroTarget = HeroCache.getHero(hidOth);
		if(heroTarget == null) {
			//??????????????????
			CrossWenDingTianXiaSender.sendCmd_4208(hero.getId(), 2);
			return;
		}
		CrossWenDingTianXia wdtxData = hero.getCrossWenDingTianXia();
		if(wdtxData==null) {
			//????????????????????????????????????
			CrossWenDingTianXiaSender.sendCmd_4208(hero.getId(), 3);
			return;
		}
		CrossWenDingTianXia wdtxDataTarget = heroTarget.getCrossWenDingTianXia();
		if(wdtxDataTarget == null) {
			//????????????????????????????????????
			CrossWenDingTianXiaSender.sendCmd_4208(hero.getId(), 4);
			return;
		}
		int timeExcel = Config_xtcs_004.getIns().get( XTCS004Const.CROSS_FHLY_FU_HUO_TIME).getNum();
		int timeDeath = wdtxData.getTimeDeath();
		int timeNow = TimeDateUtil.getCurrentTime()+1;//??????1???
		if(timeDeath!=0&& timeNow-timeDeath<timeExcel) {
			//????????????
			CrossWenDingTianXiaSender.sendCmd_4208(hero.getId(), 10);
			return;
		}
		int timeDeathTarget = wdtxDataTarget.getTimeDeath();
		if(timeDeathTarget!=0&& timeNow-timeDeathTarget<timeExcel) {
			//??????????????????
			CrossWenDingTianXiaSender.sendCmd_4208(hero.getId(), 11);
			return;
		}
		
		CrossWenDingTianXiaScoreRank rankDataTarget = CrossWenDingTianXiaCrossFunction.getIns().getHeroRankData(hidOth);
		if(rankDataTarget == null) {
			//?????????????????????
			CrossWenDingTianXiaSender.sendCmd_4208(hero.getId(), 5);
			return;
		}
		CrossWenDingTianXiaScoreRank rankDataMy = CrossWenDingTianXiaCrossFunction.getIns().getHeroRankData(hero.getId());
		if(rankDataMy==null) {
			//??????????????????
			CrossWenDingTianXiaSender.sendCmd_4208(hero.getId(), 6);
			return;
		}
		int layerTarget = wdtxDataTarget.getLayer();
		int layerMy = wdtxData.getLayer();
		if( layerMy!= layerTarget) {
			//???????????????????????????
			CrossWenDingTianXiaSender.sendCmd_4208(hero.getId(), 7);
			return;
		}
		boolean inBattle = BattleNewFunction.getIns().checkIsBattle(hero.getId());
		if(inBattle|| wdtxData.getNpcID()!=0) {
			//?????????????????????
			CrossWenDingTianXiaSender.sendCmd_4208(hero.getId(), 8);
			return;
		}
		int timeBattleBegin = wdtxDataTarget.getTimeBattleBegin();
		boolean inBattleOth = BattleNewFunction.getIns().checkIsBattle(hidOth);
		if( timeBattleBegin!=0&& timeBattleBegin+BattleConst.ATT_END_TIME < timeNow) {
			//??????????????????
		}else if(inBattleOth|| wdtxDataTarget.getNpcID()!=0) {
			//?????????????????????
			CrossWenDingTianXiaSender.sendCmd_4208(hero.getId(), 9);
			return;
		}
		
		CrossWenDingTianXia wdtdDataTarget = heroTarget.getCrossWenDingTianXia();
		CrossWenDingTianXia wdtdDataMy = hero.getCrossWenDingTianXia();
		long hpMy = wdtdDataMy.getHp();
		long huDunMy = wdtdDataMy.getHuDun();
		long hpTarget = wdtdDataTarget.getHp();
		long huDunTarget = wdtdDataTarget.getHuDun();
		long battleId = BattleNewSysCache.getBattleUid();
		BattleNewFunction.getIns().startPVPBattle(hero, heroTarget, SystemIdConst.CROSS_WEN_DING_TIAN_XIA, BttleTypeConst.WEN_DING_TIAN_XIA, hpMy, hpTarget, huDunMy, huDunTarget, battleId);
//		System.out.println("wdtx??????:"+hero.getName()+" hd:"+huDunMy+" ??????:"+heroTarget.getName()+" hd:"+huDunTarget);
		//????????????????????????
		CrossWenDingTianXiaCrossFunction.getIns().sendTimeAndScore(hero);
		CrossWenDingTianXiaSender.sendCmd_4208(hero.getId(), 1);
		CrossWenDingTianXiaCrossFunction.getIns().reflaseHeroState(hero.getId());
		CrossWenDingTianXiaCrossFunction.getIns().reflaseHeroState(hidOth);
		//?????????
		wdtxData.setTimeBattleBegin(timeNow);
		wdtxDataTarget.setTimeBattleBegin(timeNow);
	}

	public void openRank(Hero hero) {
		if(!CrossZone.isCrossServer()){
			return;
		}
		int zIDHero = hero.getBelongZoneid();
		int partId = CrossCache.getPartId(zIDHero);
		Map<Integer, Integer> zidMap = CrossWenDingTianXiaCrossCache.getWdtxZidToRoomIDMap(partId);
		Integer roomID = zidMap.get(zIDHero);
		if(roomID == null) {
			//?????????????????????
			System.out.println("1?????????????????????.hid:"+hero.getId());
			return;
		}
		Map<Integer, CrossWenDingTianXiaRoom> roomMap = CrossWenDingTianXiaCrossCache.getWdtxRoomMap(partId);
		CrossWenDingTianXiaRoom roomData = roomMap.get(roomID);
		if(roomData == null) {
			//???????????????????????????
			System.out.println("1???????????????????????????.hid:"+hero.getId());
			return;
		}
		List<CrossWenDingTianXiaScoreRank> rankList = roomData.getRankList();
		CrossWenDingTianXiaScoreRank rankTemp = new CrossWenDingTianXiaScoreRank();
		rankTemp.setHid(hero.getId());
		int indexOf = rankList.indexOf(rankTemp);
		if(indexOf < 0) {
			//???????????????
			System.out.println("1???????????????.hid:"+hero.getId());
			return;
		}
		rankTemp = rankList.get(indexOf);
		CrossWenDingTianXiaScoreRank rankData = CrossWenDingTianXiaCrossFunction.getIns().getHeroRankData(hero.getId());
		int score = rankData.getScore();
		
		int size = Math.min( CrossWenDingTianXiaConst.NUM_RANK, rankList.size());
		List<Object[]> sendData = new ArrayList<>();
		for( int i=0; i<size; i++ ) {
			CrossWenDingTianXiaScoreRank temp = rankList.get( i);
			sendData.add( new Object[] {temp.getRank(), temp.getName(), temp.getScore()});
		}
		
		CrossWenDingTianXiaSender.sendCmd_4214(hero.getId(), sendData.toArray(), rankTemp.getRank(), score);
	}

	public void openKillAwards(Hero hero) {
		if(!CrossZone.isCrossServer()){
			return;
		}
		CrossWenDingTianXiaScoreRank heroRankData = CrossWenDingTianXiaCrossFunction.getIns().getHeroRankData(hero.getId());
		if(heroRankData == null) {
			//???????????????????????????
			System.out.println("2???????????????????????????.hid:"+hero.getId());
			return;
		}
		
		List<Object[]> sendData = new ArrayList<>();
		Map<Integer, Integer> killAwards = heroRankData.getKillAwards();
		List<Struct_wdtxlzjl_260> sortList = Config_wdtxlzjl_260.getIns().getSortList();
		for(Struct_wdtxlzjl_260 temp: sortList) {
			int id = temp.getId();
			Integer getState = killAwards.get(id);
			if(getState == null) {
				sendData.add( new Object[] { id, CrossWenDingTianXiaConst.STATE_AWARDS_0});
			}else {
				sendData.add( new Object[] { id, getState});
			}
		}
		
		CrossWenDingTianXia wdtxData = hero.getCrossWenDingTianXia();
		int killContinue = wdtxData.getNumKillContinue();
		CrossWenDingTianXiaSender.sendCmd_4216(hero.getId(), sendData.toArray(), killContinue);
	}

	public void openLayerAwards(Hero hero) {
		if(!CrossZone.isCrossServer()){
			return;
		}
		CrossWenDingTianXiaScoreRank heroRankData = CrossWenDingTianXiaCrossFunction.getIns().getHeroRankData(hero.getId());
		if(heroRankData == null) {
			//???????????????????????????
			System.out.println("3???????????????????????????.hid:"+hero.getId());
			return;
		}
		
		int layerMax = heroRankData.getLayerMax();
		List<Object[]> sendData = new ArrayList<>();
		Map<Integer, Integer> layerAwards = heroRankData.getLayerAwards();
		List<Struct_wdtx_260> sortList = Config_wdtx_260.getIns().getSortList();
		for(Struct_wdtx_260 temp: sortList) {
			int id = temp.getId();
			Integer getState = layerAwards.get(id);
			if(getState==null&& layerMax>=id) {
				layerAwards.put( id, CrossWenDingTianXiaConst.STATE_AWARDS_1);
				getState = layerAwards.get(id);
			}
				
			if(getState == null) {
				sendData.add( new Object[] { id, CrossWenDingTianXiaConst.STATE_AWARDS_0});
			}else {
				sendData.add( new Object[] { id, getState});
			}
		}
		
		CrossWenDingTianXiaSender.sendCmd_4218(hero.getId(), sendData.toArray(), layerMax);
	}

	public void getKillAwards(Hero hero, int id) {
		if(!CrossZone.isCrossServer()){
			return;
		}
		CrossWenDingTianXiaScoreRank heroRankData = CrossWenDingTianXiaCrossFunction.getIns().getHeroRankData(hero.getId());
		if(heroRankData == null) {
			//???????????????????????????
			CrossWenDingTianXiaSender.sendCmd_4220(hero.getId(), 2);
			return;
		}
		
		Struct_wdtxlzjl_260 excel = Config_wdtxlzjl_260.getIns().get(id);
		if(excel == null) {
			//??????????????????
			CrossWenDingTianXiaSender.sendCmd_4220(hero.getId(), 3);
			return;
		}
		
		Map<Integer, Integer> killAwards = heroRankData.getKillAwards();
		Integer stateGet = killAwards.get( id);
		if(stateGet==null|| stateGet==CrossWenDingTianXiaConst.STATE_AWARDS_0) {
			//???????????????
			CrossWenDingTianXiaSender.sendCmd_4220(hero.getId(), 4);
			return;
		}else if(stateGet!=null&& stateGet==CrossWenDingTianXiaConst.STATE_AWARDS_2) {
			//???????????????
			CrossWenDingTianXiaSender.sendCmd_4220(hero.getId(), 5);
			return;
		}
		
		int[][] reward = excel.getReward();
		boolean canAdd = UseAddUtil.canAdd(hero, reward, false);
		if(!canAdd) {
			//????????????
			CrossWenDingTianXiaSender.sendCmd_4220(hero.getId(), 6);
			return;
		}
		
		UseAddUtil.add(hero, reward, SourceGoodConst.WDTD_KILL_AWARDS, UseAddUtil.getDefaultMail(), true);
		killAwards.put( id, CrossWenDingTianXiaConst.STATE_AWARDS_2);
		CrossWenDingTianXiaSender.sendCmd_4220(hero.getId(), 1);
		LogTool.info("GetKillAwards.hid:"+hero.getId()+" id:"+id, this);
	}

	public void getLayerAwards(Hero hero, int layer) {
		Struct_wdtx_260 excel = Config_wdtx_260.getIns().get(layer);
		if(excel==null) {
			//???????????????
			CrossWenDingTianXiaSender.sendCmd_4222(hero.getId(), 2);
			return;
		}
		CrossWenDingTianXiaScoreRank heroRankData = CrossWenDingTianXiaCrossFunction.getIns().getHeroRankData(hero.getId());
		if(heroRankData == null) {
			//???????????????????????????
			CrossWenDingTianXiaSender.sendCmd_4222(hero.getId(), 3);
			return;
		}
		Map<Integer, Integer> layerAwards = heroRankData.getLayerAwards();
		Integer stateGet = layerAwards.get( layer);
		if(stateGet==null|| stateGet==CrossWenDingTianXiaConst.STATE_AWARDS_0) {
			//???????????????
			CrossWenDingTianXiaSender.sendCmd_4222(hero.getId(), 4);
			return;
		}else if(stateGet!=null&& stateGet==CrossWenDingTianXiaConst.STATE_AWARDS_2) {
			//???????????????
			CrossWenDingTianXiaSender.sendCmd_4222(hero.getId(), 5);
			return;
		}
		
		int[][] reward = excel.getReward1();
		int zID = hero.getBelongZoneid();
		List<Integer> newServerList = CrossWenDingTianXiaCrossCache.getWdtxNewServerList();
		boolean contains = newServerList.contains(zID);
		if(!contains) {
			reward = excel.getReward2();
		}
		
//		boolean canAdd = UseAddUtil.canAdd(hero, reward, false);
//		if(!canAdd) {
//			//????????????
//			CrossWenDingTianXiaSender.sendCmd_4222(hero.getId(), 6);
//			return;
//		}
		
		UseAddUtil.add(hero, reward, SourceGoodConst.WDTD_LAYER_AWARDS, UseAddUtil.getDefaultMail(), true);
		layerAwards.put( layer, CrossWenDingTianXiaConst.STATE_AWARDS_2);
		CrossWenDingTianXiaSender.sendCmd_4222(hero.getId(), 1);
		LogTool.info("GetLayerAwards.hid:"+hero.getId()+" layer:"+layer, this);
	}

	public void goToCross(Hero hero) {
		if(CrossZone.isCrossServer()){
			return;
		}
		boolean checkSystemOpen = HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.CROSS_WEN_DING_TIAN_XIA);
		if(!checkSystemOpen) {
			//???????????????
			CrossWenDingTianXiaSender.sendCmd_4224(hero.getId(), 2, 0);
			return;
		}
		
		int state = CrossWenDingTianXiaCache.getState();
		if(state==CrossWenDingTianXiaConst.STATE_0) {
			//???????????????
			CrossWenDingTianXiaSender.sendCmd_4224(hero.getId(), 3, 0);
			return;
		}
		if(state==CrossWenDingTianXiaConst.STATE_2) {
			//???????????????
			CrossWenDingTianXiaSender.sendCmd_4224(hero.getId(), 5, 0);
			return;
		}
		
		CrossWenDingTianXia data = hero.getCrossWenDingTianXia();
		int timeLogout = data.getTimeLogout();
		int timeNow = TimeDateUtil.getCurrentTime();
		if(timeLogout+CrossWenDingTianXiaConst.TIME_LOGOUT > timeNow) {
			//?????????????????????
			CrossWenDingTianXiaSender.sendCmd_4224(hero.getId(), 4, (timeLogout+CrossWenDingTianXiaConst.TIME_LOGOUT - timeNow));
			return;
		}
		
		CrossFunction.askCross(hero, SystemIdConst.CROSS_WEN_DING_TIAN_XIA);
	}

	public void getSceneData(Hero hero) {
		if(!CrossZone.isCrossServer()){
			return;
		}
		//??????????????????
		CrossWenDingTianXiaCrossFunction.getIns().sendTimeAndScore(hero);
		//????????????                                                                                                    
		CrossWenDingTianXia wdtxData = hero.getCrossWenDingTianXia();
		CrossWenDingTianXiaSender.sendCmd_4206(hero.getId(), 1, wdtxData.getLayer());
		CrossWenDingTianXiaCrossFunction.getIns().sendLayerAndYuXiHeroData(hero);
		//??????????????????????????????????????????
		CrossWenDingTianXiaCrossFunction.getIns().reflaseHeroState(hero.getId());
//		System.out.println("4225????????????????????????"+hero.getName()+" 4206??????:"+wdtxData.getLayer());
	}

	public void battleMonster(Hero hero, long mID) {
		if(!CrossZone.isCrossServer()){
			return;
		}
		CrossWenDingTianXiaRoom roomData = CrossWenDingTianXiaCrossFunction.getIns().getRoomData(hero.getId());
		if(roomData==null) {
			//????????????????????????
			CrossWenDingTianXiaSender.sendCmd_4228(hero.getId(), 2);
			return;
		}
		CrossWenDingTianXia wdtxData = hero.getCrossWenDingTianXia();
		if(wdtxData==null) {
			//??????????????????
			CrossWenDingTianXiaSender.sendCmd_4228(hero.getId(), 3);
			return;
		}
		int layer = wdtxData.getLayer();
		Map<Integer, Map<Long, NPC>> npcLayerMap = roomData.getNpcMap();
		Map<Long, NPC> npcMap = npcLayerMap.get(layer);
		if(npcMap == null) {
			//????????????????????????
			CrossWenDingTianXiaSender.sendCmd_4228(hero.getId(), 4);
			return;
		}
		mID = mID*-1;
		NPC npc = npcMap.get( mID);
		if(npc==null) {
			//??????????????????
			CrossWenDingTianXiaSender.sendCmd_4228(hero.getId(), 5);
			return;
		}
		int timeBattleBegin = npc.getTimeBattleBegin();
		if( timeBattleBegin!=0&& timeBattleBegin+BattleConst.ATT_END_TIME < TimeDateUtil.getCurrentTime()) {
			//??????????????????
		}else if(npc.getSceneState() != SceneConst.STATE_NORMAL){
			//???????????????
			CrossWenDingTianXiaSender.sendCmd_4228(hero.getId(), 6);
			return ;
		}
		
		int timeExcel = Config_xtcs_004.getIns().get( XTCS004Const.CROSS_FHLY_FU_HUO_TIME).getNum();
		int timeDeath = wdtxData.getTimeDeath();
		int timeNow = TimeDateUtil.getCurrentTime()+1;//??????1???
		if(timeDeath!=0&& timeNow-timeDeath<timeExcel) {
			//????????????
			CrossWenDingTianXiaSender.sendCmd_4228(hero.getId(), 7);
			return;
		}
		boolean inBattle = BattleNewFunction.getIns().checkIsBattle(hero.getId());
		if(inBattle) {
			//?????????????????????
			CrossWenDingTianXiaSender.sendCmd_4228(hero.getId(), 8);
			return;
		}
		
		wdtxData.setNpcID(mID);
		//????????????????????????
		npc.setSceneState(SceneConst.STATE_BATTLE);
		//??????????????????????????????
		RobbertFunction.stopRobbert((Robbert)npc);
		CrossWenDingTianXiaSender.sendCmd_4228(hero.getId(), 1);
		CrossWenDingTianXiaCrossFunction.getIns().reflaseHeroState(hero.getId());
		//?????????
		wdtxData.setChangeXY(1);
		npc.setTimeBattleBegin(TimeDateUtil.getCurrentTime());
		CrossWenDingTianXiaCrossFunction.getIns().reflashNPCState(roomData, layer, npc);
	}

	public void fuHuo(Hero hero) {
		if(!CrossZone.isCrossServer()){
			return;
		}
		CrossWenDingTianXia wdtxData = hero.getCrossWenDingTianXia();
		if(wdtxData==null) {
			//????????????
			CrossWenDingTianXiaSender.sendCmd_4232(hero.getId(), 2);
			return;
		}
		int timeDeath = wdtxData.getTimeDeath();
		int timeExcel = Config_xtcs_004.getIns().get( XTCS004Const.CROSS_FHLY_FU_HUO_TIME).getNum();
		int timeNow = TimeDateUtil.getCurrentTime();
		if(timeDeath==0|| (timeDeath!=0&& timeNow-timeDeath>=timeExcel)) {
			//?????????????????????????????????
			CrossWenDingTianXiaSender.sendCmd_4232(hero.getId(), 3);
			return;
		}
		Struct_xtcs_004 excelYB = Config_xtcs_004.getIns().get( XTCS004Const.CROSS_FHLY_SPEND_YUAN_BAO);
		int yuanBaoExcel = excelYB.getNum();
		boolean canUse = UseAddUtil.canUse(hero, GameConst.YUANBAO, yuanBaoExcel);
		if(!canUse) {
			//????????????
			CrossWenDingTianXiaSender.sendCmd_4232(hero.getId(), 4);
			return;
		}
		UseAddUtil.use(hero, GameConst.YUANBAO, yuanBaoExcel, SourceGoodConst.WDTD_FU_HUO_SPEND, true);
		//??????????????????
		CrossWenDingTianXiaCrossFunction.getIns().resetFuHuoTime(hero);
	}

	public void battleMonsterEnd(Hero hero, int result) {
		if(!CrossZone.isCrossServer()){
			return;
		}
		CrossWenDingTianXiaRoom roomData = CrossWenDingTianXiaCrossFunction.getIns().getRoomData(hero.getId());
		if(roomData==null) {
			//?????????????????????
			CrossWenDingTianXiaSender.sendCmd_4234(hero.getId(), 2, BattleConst.RESULT_ATT_LOSE, new Object[][] {});
			return;
		}
		CrossWenDingTianXia wdtxData = hero.getCrossWenDingTianXia();
		if(wdtxData==null) {
			//??????????????????
			CrossWenDingTianXiaSender.sendCmd_4234(hero.getId(), 3, BattleConst.RESULT_ATT_LOSE, new Object[][] {});
			return;
		}
		int layer = wdtxData.getLayer();
		Map<Integer, Map<Long, NPC>> npcLayerMap = roomData.getNpcMap();
		Map<Long, NPC> npcMap = npcLayerMap.get(layer);
		if(npcMap == null) {
			//????????????????????????
			CrossWenDingTianXiaSender.sendCmd_4234(hero.getId(), 4, BattleConst.RESULT_ATT_LOSE, new Object[][] {});
			return;
		}
		long npcID = wdtxData.getNpcID();
		if(npcID==0) {
			//????????????????????????
			CrossWenDingTianXiaSender.sendCmd_4234(hero.getId(), 5, BattleConst.RESULT_ATT_LOSE, new Object[][] {});
			return;
		}
		NPC npc = npcMap.get( npcID);
		if(npc==null) {
			//???????????????
			CrossWenDingTianXiaSender.sendCmd_4234(hero.getId(), 6, BattleConst.RESULT_ATT_LOSE, new Object[][] {});
			return;
		}
		
		//?????????????????????
		int resultNow = BattleFunction.checkWinByFight(hero, npc.getSysId(), SystemIdConst.CROSS_WEN_DING_TIAN_XIA);
		if (resultNow == BattleConst.RESULT_ATT_LOSE) {
			resultNow = result;
		}
		
		Struct_wdtx_260 excel = Config_wdtx_260.getIns().get( layer);
		if (resultNow == BattleConst.RESULT_ATT_NO|| result == BattleConst.RESULT_ATT_LOSE || result == BattleConst.RESULT_ATT_NO) {
			//????????????
			int addScore = excel.getLose();
			CrossWenDingTianXiaCrossFunction.getIns().refreshHeroScoreRank(hero, addScore*-1);

			//??????NPC????????????
			npc.setSceneState(SceneConst.STATE_NORMAL);
			CrossWenDingTianXiaSender.sendCmd_4234(hero.getId(), 1, BattleConst.RESULT_ATT_LOSE, new Object[] {});
		}else {
			//????????????
			int addScore = excel.getPoint();
			CrossWenDingTianXiaCrossFunction.getIns().refreshHeroScoreRank(hero, addScore);
			//???????????????
			wdtxData.setNumKillThisLayer( wdtxData.getNumKillThisLayer() + 1);
			CrossWenDingTianXiaCrossFunction.getIns().goToNextLayer(hero);
			
			//?????????????????????
			SceneFunction.getIns().removeNpcFromScene(npc.getId());
			RobbertCache.removeRobbert(npc);
			npcMap.remove(npc.getId());
			
			//?????????
			CrossWenDingTianXiaCrossFunction.getIns().sendTimeAndScore(hero);
			
			//???????????????????????????????????????????????????
			int scoreNextExcel = excel.getNext();
			List<Object[]> sendDataAwards =new ArrayList<>();
			if(scoreNextExcel==0) {
				long hidYuXi = roomData.getHidYuXi();
				if(hidYuXi!=0) {
					boolean online = HeroFunction.getIns().isOnline( hidYuXi);
					LogTool.warn("battleMonsterEnd.hid:"+hero.getId()+" online:"+online, this);
				}
				roomData.setHidYuXi(hero.getId());
				roomData.setIconYuXi(hero.getIcon());
				roomData.setFrameYuXi(hero.getFrame());
				roomData.setNameYuXi(hero.getNameZoneid());
				//???????????????????????????
				CrossWenDingTianXiaCrossFunction.getIns().sendLayerAndYuXiHeroDataToAll(hero.getId());
				//???????????????????????????
				ChatManager.getIns().broadCast(ChatConst.CROSS_WDTX_GET_YU_XI, new Object[] {hero.getNameZoneid(), "????????????"});
				//??????????????????
				Struct_xtcs_004 excelXTCS = Config_xtcs_004.getIns().get( XTCS004Const.WDTX_YU_XI_WIN_AWARDS);
				int[][] other = excelXTCS.getOther();
				UseAddUtil.add(hero, other, SourceGoodConst.WDTD_YU_XI_AWARDS, UseAddUtil.getDefaultMail(), true);
				for( int[] temp:other) {
					sendDataAwards.add( new Object[] { temp[0], temp[1], temp[2]});
				}
				sendDataAwards.add( new Object[] {GameConst.TOOL, GameConst.SCORE, addScore});
			}else {
				sendDataAwards.add( new Object[] {GameConst.TOOL, GameConst.SCORE, addScore});
			}
			wdtxData.setResultBattle(BattleConst.RESULT_ATT_WIN);
			wdtxData.setResultData(sendDataAwards.toArray());
		}
		
		wdtxData.setNpcID( 0);
		CrossWenDingTianXiaCrossFunction.getIns().reflashNPCState(roomData, layer, npc);
	}

	public void openScoreAwards(Hero hero) {
		if(!CrossZone.isCrossServer()){
			return;
		}
		CrossWenDingTianXiaScoreRank heroRankData = CrossWenDingTianXiaCrossFunction.getIns().getHeroRankData(hero.getId());
		if(heroRankData == null) {
			//???????????????????????????
			System.out.println("11???????????????????????????.hid:"+hero.getId());
			return;
		}

		int scoreHero = heroRankData.getScore();
		Map<Integer, Integer> scoreAwards = heroRankData.getScoreAwards();
		List<Struct_wdtxpoint_260> sortList = Config_wdtxpoint_260.getIns().getSortList();
		List<Object[]> sendData = new ArrayList<>();
		for(Struct_wdtxpoint_260 temp:sortList) {
			int id = temp.getId();
			int point = temp.getPoint();
			Integer getState = scoreAwards.get(id);
			if(getState==null&& scoreHero>=point) {
				scoreAwards.put( id, CrossWenDingTianXiaConst.STATE_AWARDS_1);
				getState = scoreAwards.get(id);
			}
				
			if(getState == null) {
				sendData.add( new Object[] { id, CrossWenDingTianXiaConst.STATE_AWARDS_0});
			}else {
				sendData.add( new Object[] { id, getState});
			}
		}
		
		CrossWenDingTianXiaSender.sendCmd_4236( hero.getId(), sendData.toArray());
	}

	public void getScoreAwards(Hero hero, int id) {
		if(!CrossZone.isCrossServer()){
			return;
		}
		Struct_wdtxpoint_260 excel = Config_wdtxpoint_260.getIns().get(id);
		if(excel==null) {
			//???????????????
			CrossWenDingTianXiaSender.sendCmd_4238(hero.getId(), 2, id);
			return;
		}
		CrossWenDingTianXiaScoreRank heroRankData = CrossWenDingTianXiaCrossFunction.getIns().getHeroRankData(hero.getId());
		if(heroRankData == null) {
			//???????????????????????????
			CrossWenDingTianXiaSender.sendCmd_4238(hero.getId(), 3, id);
			return;
		}
		Map<Integer, Integer> scoreAwards = heroRankData.getScoreAwards();
		Integer stateGet = scoreAwards.get( id);
		if(stateGet==null|| stateGet==CrossWenDingTianXiaConst.STATE_AWARDS_0) {
			//???????????????
			CrossWenDingTianXiaSender.sendCmd_4238(hero.getId(), 4, id);
			return;
		}else if(stateGet!=null&& stateGet==CrossWenDingTianXiaConst.STATE_AWARDS_2) {
			//???????????????
			CrossWenDingTianXiaSender.sendCmd_4238(hero.getId(), 5, id);
			return;
		}
		
		int[][] reward = excel.getReward();
//		boolean canAdd = UseAddUtil.canAdd(hero, reward, false);
//		if(!canAdd) {
//			//????????????
//			CrossWenDingTianXiaSender.sendCmd_4238(hero.getId(), 6, id);
//			return;
//		}
		
		UseAddUtil.add(hero, reward, SourceGoodConst.WDTD_SCORE_AWARDS, UseAddUtil.getDefaultMail(), true);
		scoreAwards.put( id, CrossWenDingTianXiaConst.STATE_AWARDS_2);
		CrossWenDingTianXiaSender.sendCmd_4238(hero.getId(), 1, id);
		LogTool.info("GetScoreAwards.hid:"+hero.getId()+" id:"+id, this);
	}
	
	
	//TODO ????????????????????????
	//TODO ????????????,buf???????????????
}
