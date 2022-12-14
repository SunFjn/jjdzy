package com.teamtop.system.scene;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentSkipListSet;

import com.teamtop.cross.BlockType;
import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.CrossEnum;
import com.teamtop.cross.CrossZone;
import com.teamtop.gameCommon.GameConst;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.NPC.NPC;
import com.teamtop.system.battleGoods.cache.BattleGoodSyscache;
import com.teamtop.system.battleGoods.cache.BattleGoodsCrossPartCaChe;
import com.teamtop.system.battleGoods.cache.BattleGoodsCrossRoomCache;
import com.teamtop.system.battleGoods.model.BattleGoodsJoiner;
import com.teamtop.system.crossWenDingTianXia.cross.CrossWenDingTianXiaCrossFunction;
import com.teamtop.system.event.sceneEvent.AbsSceneEvent;
import com.teamtop.system.event.sceneEvent.SceneEventFunction;
import com.teamtop.system.godWeapon.GodWeaponFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.TempData;
import com.teamtop.system.mount.MountFunction;
import com.teamtop.system.scene.area.ScenePosXYArea;
import com.teamtop.system.zcBoss.ZcBossJoiner;
import com.teamtop.system.zcBoss.ZcBossLocalCache;
import com.teamtop.system.zcBoss.cross.ZcBossCrossCache;
import com.teamtop.util.astar.Robbert;
import com.teamtop.util.common.UpdatePropertyValue;
import com.teamtop.util.communication.io.Response;
import com.teamtop.util.db.trans.LMessageFormat;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_NPC_200;
import excel.config.Config_NPC_205;
import excel.config.Config_map_200;
import excel.struct.Struct_map_200;
import io.netty.channel.Channel;

public class SceneFunction {
	private static SceneFunction ins = null;

	public static SceneFunction getIns() {
		if (ins == null) {
			ins = new SceneFunction();
		}
		return ins;
	}


	/**
	 * ??????????????????
	 * 
	 * @param hero
	 *            ??????
	 * @param newSceneSysId
	 *            ????????????id
	 * @return 1???????????????
	 */
	public boolean canChangeScene(Hero hero, int newSceneSysId) {
		Struct_map_200 sceneSys = Config_map_200.getIns().get(newSceneSysId);
		if (sceneSys == null) return false;
		Scene scene = hero.getScene();
		if (scene.getSceneSysId()==newSceneSysId) {
			LogTool.warn("hero oldSceneID==newSceneSysId,hid:"+hero.getId(), SceneFunction.class);
			return false;
		}
		/*int level = sceneSys.getLevel();
		//if(!TeamFunction.getIns().canTranScene(hero,level)) return false;
		if (hero.getLevel() < level) {
			// ????????????
			return false;
		}*/
		return true;
	}

	/**
	 * ??????????????????
	 * @param hero
	 * @param newSceneSysId
	 * @param newPosX
	 * @param newPosY
	 * @param newSceneUnitId
	 * @param isExitHang ?????????????????? true ??? false ???
	 */
	public void changeScene(Hero hero, int newSceneSysId, int newPosX, int newPosY, long newSceneUnitId, boolean...isExitHang) {
		if(hero==null) return;
		Scene roleScene = hero.getScene();
		int nowSceneSysId = roleScene.getSceneSysId();
		long nowSceneUnitId = roleScene.getSceneUnitId();
		if (nowSceneSysId != newSceneSysId) {
			// ???????????????
			roleScene.setPreLocation(new PreLocation(nowSceneUnitId, nowSceneSysId, roleScene.getSceneType(), roleScene.getPosX(), roleScene.getPosY()));
		}
		if (roleScene.getSceneType()==SceneConst.IS_SUPPLY_SCENE) {
			// ???????????????????????????????????????
			roleScene.setPreSupplyLocation(new PreSupplyLocation(nowSceneUnitId, nowSceneSysId, roleScene.getPosX(), roleScene.getPosY()));
		}
		boolean nowSceneIsSingle =false;
		SoloSceneFunction.getIns().changeScene(hero, nowSceneUnitId,nowSceneSysId, newSceneUnitId, newSceneSysId, newPosX, newPosY, nowSceneIsSingle);
		if(nowSceneUnitId!=newSceneUnitId){
			//???????????????????????????
			/*BattleCache.removeFuhuoBattle(hero.getId());*/
		}
	}



	/**
	 * ????????????????????????
	 * 
	 * @param hero
	 * @param route
	 * @return
	 */
	public Object[] getMoveSendData(Hero hero, Integer[][] route) {
		if (hero == null ||route==null) return null;
		int len = route.length;
		Object[] routeData = new Object[len];
		for (int i = 0; i < len; i++) {
			routeData[i] = new Object[] { route[i][0], route[i][1] };
		}
		return new Object[] { hero.getId(), SceneConst.PLAYER, routeData };
	}

	/**
	 * 
	 * ????????????????????????????????????
	 * 
	 * @name calcSendAreaByGridCoords
	 * @condition ???????????????
	 * @param gridX
	 *            X???????????????
	 * @param gridY
	 *            Y???????????????
	 * @return ?????????????????? Integer[]
	 * @author Kyle
	 * @date???2012-8-2 ??????08:06:10
	 * @throws
	 * @version 1.0.0
	 */
	public Integer[] calcSendAreaByGridCoords(int grid) {
		int gridX = grid / 1000;
		int gridY = grid % 1000;
		int row = SceneConst.ROW;
		int col = SceneConst.COL;
		int startX = gridX - (row - 1) / 2;
		int endX = gridX + (row - 1) / 2;

		int startY = gridY - (col - 1) / 2;
		int endY = gridY + (col - 1) / 2;

		if (startX <= 0)
			startX = 1;
		if (startY <= 0)
			startY = 1;

		int lenX = endX - startX + 1;
		int lenY = endY - startY + 1;

		Integer[] sendArea = new Integer[lenX * lenY];

		int count = 0;
		for (; startY <= endY; startY++) {
			startX = endX + 1 - lenX;
			for (; startX <= endX; startX++) {
				sendArea[count++] = startX * 1000 + startY;
			}
		}

		return sendArea;

	}

	/**
	 * 
	 * ????????????????????????????????????
	 * 
	 * @name getGridRowColMixByPosXY
	 * @condition ?????????????????????
	 * @param posX
	 *            X???????????????
	 * @param posY
	 *            Y???????????????
	 * @return ????????????X???????????????Y???????????????Int int
	 * @author Kyle
	 * @date???2012-8-3 ??????06:19:26
	 * @throws
	 * @version 1.0.0
	 */
	public int getGridRowColMixByPosXY(int posX, int posY) {
		try {
			int col = posX / (SceneConst.LENGTH / SceneConst.ROW) + 1;
			int row = posY / (SceneConst.HIGH / SceneConst.COL) + 1;
			return row * 1000 + col;
		} catch (Exception e) {
			LogTool.error(e, SceneFunction.class, "get grid row col exception");
			return 0;
		}
	}

	/**
	 * ?????????????????????????????????????????????
	 * 
	 * @param rid
	 *            ??????id
	 * @param sceneSysId
	 *            ????????????id
	 * @return ?????????????????????id,?????????,?????????????????????????????????;??????rid???????????????channel,??????0
	 */
	public int getSupplySceneLine(Hero hero, int sceneSysId) {
		if (!SceneCache.lineSceneCache.contains(sceneSysId)) {
			return 1;
		}
		final TempData tempData = hero.getTempData();
		Integer line = (Integer) tempData.getAttribute(sceneSysId + "");
		if (line == null) {
			if (SceneCache.lineMode == SceneConst.MODE_LINE_NONE) {
				line = 0;
			} else if (SceneCache.lineMode == SceneConst.MODE_LINE_FULL) {
				line = SceneCache.getRoleSupplySceneLineOnFull(sceneSysId);
			} else if (SceneCache.lineMode == SceneConst.MODE_LINE_AVERAGE) {
				line = SceneCache.getRoleSupplySceneLineOnAverage(sceneSysId);
			}
			tempData.addAttribute(sceneSysId + "", line);
			return line;
		}
		return line;
	}

	/**
	 * ??????????????????
	 * @param gridData
	 * @param roleData
	 * @param action
	 * @param rid
	 * @param isLeader
	 */
	public void boardCastRoleOneWay(ConcurrentSkipListSet<Hero> gridData, Object[] roleData, int action, long rid, boolean isLeader) {
		if (gridData == null || roleData == null)
			return;
		Hero hero = null;
		for (Iterator<Hero> it = gridData.iterator(); it.hasNext();) {
			hero = it.next();
			if (hero!=null) {
				// ??????
				if (hero.getId() != rid || !isLeader) {
					NettyWrite.writeData(hero.getChannel(), roleData, action);
//					System.err.println(rid+" boardCaseRole");
				}
			}
		}
	}

	/**
	 * ??????NPC??????
	 * @param gridData
	 * @param roleData
	 * @param action
	 */
	public void boardCastNPCOneWay(ConcurrentSkipListSet<Long> gridData, Object[] roleData, int action) {
		if (gridData == null || roleData == null)
			return;
		if (gridData.size() == 0) {
			return;
		}
		Long id = null;
		for (Iterator<Long> it = gridData.iterator(); it.hasNext();) {
			id = it.next();
			if (id > 0) {
				// ??????
				NettyWrite.writeData(id, roleData, action);
				// System.err.println(" boardCast to hero,"+r.getName());
			}
		}
	}

	/**
	 * ?????????????????????
	 * @param hero
	 */
	public void addHeroToScene(Hero hero) {
		Scene roleScene = hero.getScene();
		int posX = roleScene.getPosX();
		int posY = roleScene.getPosY();
		int rowCol = getGridRowColMixByPosXY(posX, posY);
		if (rowCol == 0)
			return;

		long sceneUnitId = (long)roleScene.getSceneUnitId();
		int sceneType = roleScene.getSceneType();
		SceneHeroDataType dataType = SceneHeroDataType.NORMAL;
		HashMap<Object,Object> heroBoradData = null;
		heroBoradData = getHeroBoradData(hero);
		
		if (SceneCache.boardSupplyWay(sceneType)) {
			// ???????????????
			Integer[] sendArea = calcSendAreaByGridCoords(rowCol);
			if (sendArea == null)
				return;
			int line = getSupplySceneLine(hero, roleScene.getSceneSysId());
			// ???????????????
			SceneCache.addHeroToSupplyScene(sceneUnitId, rowCol, hero, line, true);
			// ??????
			for (Integer grid : sendArea) {
				// ??????npc
				ConcurrentSkipListSet<NPC> npcListSet = SceneCache.supplySceneNpcCache.get(sceneUnitId, grid);
				heroMeetNpc(npcListSet, hero);
				// ??????hero
				ConcurrentSkipListSet<Hero> heroListSet = SceneCache.supplySceneHeroData.get(line, sceneUnitId, grid);
				heroMeetHero(heroListSet, hero,heroBoradData, true,dataType);
				// ?????????????????????
				//heroMeetHangRobbert(sceneUnitId, grid, hero);
			}
		} else {
			// ?????????
			// ???????????????
//			logger.info(LogFormat.rec(hero.getId(), hero.getName(), "add hero to scene s1"));
			SceneCache.copySceneHeroData.putConcurrentSkipListSet(sceneUnitId, hero);
//			logger.info(LogFormat.rec(hero.getId(), hero.getName(), "add hero to scene s2"));
			// ??????hero
			heroMeetHero(SceneCache.copySceneHeroData.get(sceneUnitId), hero,heroBoradData, false,dataType);
//			logger.info(LogFormat.rec(hero.getId(), hero.getName(), "add hero to scene s3"));
			// ??????npc
			heroMeetNpc(SceneCache.copySceneNpcData.get(sceneUnitId), hero);
//			logger.info(LogFormat.rec(hero.getId(), hero.getName(), "add hero to scene s4"));
		}
	}

	/**
	 * ???????????????????????????
	 * @param sceneuid
	 * @param grid
	 * @param hero
	 */
/*	public void heroMeetHangRobbert(int sceneuid,int grid,final Hero hero){
		ConcurrentSkipListSet<HangRobbert> set = SceneCache.getHangRobbertSet(sceneuid, grid);
		if(set!=null){
			for(HangRobbert hb:set){
				NettyWrite.writeXData(hero.getChannel(), SceneConst.GC_ADD_PLAYER,hb.getHeroBoradData());
			}
		}
	}*/
	/**
	 * hero????????????
	 * @param gridData
	 * @param hero
	 * @param limit
	 * @param type 
	 */
	public void heroMeetHero(final ConcurrentSkipListSet<Hero> gridData, final Hero hero,HashMap<Object,Object>  heroData, boolean limit,SceneHeroDataType type) {
		// limit = false;
		if (gridData == null) return;
		long hid = hero.getId();
		Hero nearHero = null;
		int i = 0;
		for (Iterator<Hero> it = gridData.iterator(); it.hasNext();) {
			nearHero = it.next();
			if (nearHero != null && nearHero.getId() != hid) {
				if (limit && ++i >= SceneCache.boardNum) break;
				if(nearHero.getChannel()==null){
					//logger.warn();
					LogTool.warn("hero meet hero,add near hero,hero:"+nearHero.toString(), SceneFunction.class);
					it.remove();
				}else{
					Scene scene = hero.getScene();
					int sceneType = scene.getSceneType();
					
					NettyWrite.writeXData(nearHero.getChannel(), SceneCmd.GC_Addhero_3904, heroData);
					HashMap<Object, Object> nearHeroBoradData=getHeroBoradData(nearHero);
					NettyWrite.writeXData(hero.getChannel(), SceneCmd.GC_Addhero_3904, nearHeroBoradData);
//					System.err.println("???????????????????????????????????????1???"+heroData.get(SceneXData.name)+" [x"+heroData.get(SceneXData.gX)+" y"+heroData.get(SceneXData.gY)+
//							"] ??????2:"+nearHeroBoradData.get(SceneXData.name)+" [x"+nearHeroBoradData.get(SceneXData.gX)+" y"+nearHeroBoradData.get(SceneXData.gY)+"]");//TODO
					
					//?????????????????????????????????
					if(sceneType == SceneConst.IS_WEN_DING_TIAN_DAO){
						CrossWenDingTianXiaCrossFunction.getIns().reflashHeroMeetHeroState(hid, nearHero.getId());;
					}
				}
			}
		}
	}
	/**
	 * ??????hero??????????????????
	 * @param hero
	 * @return
	 */
	public HashMap<Object, Object> getHeroBoradData(Hero hero){
		if(hero==null) return null;
		long now = System.currentTimeMillis();
		Scene scene = hero.getScene();
		if(now-hero.getSceneBoardDataUpdate()<1500 || CrossZone.isCrossServer()){
			hero.setSceneBoardDataUpdate(now);
			HashMap<Object, Object> heroData = new HashMap<Object, Object>();
			HashMap<Object, Object> sceneShowData = hero.getSceneShowData();
			if (sceneShowData==null) {
				sceneShowData=new HashMap<Object, Object>();
				hero.setSceneShowData(sceneShowData);
			}
			heroData.putAll(sceneShowData);
			heroData.put(SceneXData.gX, scene.getPosX());
			heroData.put(SceneXData.gY, scene.getPosY());
			heroData.put(SceneXData.route, Arrays.deepToString(scene.getRoute()));//??????
			if (scene.getSceneType()==SceneConst.ZCBOSS||scene.getSceneType()==SceneConst.CROSS_ZCBOSS) {
				int zoneid = hero.getZoneid();
				int partId = CrossCache.getPartId(zoneid);
				ZcBossJoiner zcBossJoiner=null;
				if (ZcBossLocalCache.getIns().getZcBossJoinersMap().containsKey(hero.getId())) {
					zcBossJoiner=ZcBossLocalCache.getIns().getZcBossJoinersMap().get(hero.getId());
				}else if (CrossZone.isCrossServer()&&ZcBossCrossCache.getIns().getZcBossJoinersMap(partId).containsKey(hero.getId())) {
					zcBossJoiner = ZcBossCrossCache.getIns().getZcBossJoinersMap(partId).get(hero.getId());
				}
				if (zcBossJoiner!=null) {
					heroData.put(SceneXData.nowHp, zcBossJoiner.getHp());//????????????
					heroData.put(SceneXData.maxHp, hero.getFinalFightAttr().getHpMax());//????????????
					LogTool.info("zcBossJoiner.getHp():"+zcBossJoiner.getHp()+" max :"+hero.getFinalFightAttr().getHpMax(), SceneFunction.class);
				}
			}
			if (scene.getSceneType()==SceneConst.BATTLEGOODS) {
				int partId = CrossCache.getPartId(hero.getZoneid());
				int belongZoneid=hero.getBelongZoneid();
				Integer roomId = BattleGoodSyscache.getFristzoneidToRoomId().get(belongZoneid);
				
				if (roomId!=null) {
					BattleGoodsCrossPartCaChe battleGoodsCrossPartCaChe = BattleGoodSyscache.getBattleGoodsCrossPartCaChes().get(partId);
					if (battleGoodsCrossPartCaChe!=null) {
						BattleGoodsCrossRoomCache battleGoodsCrossRoomCache =battleGoodsCrossPartCaChe.getRoomCacheMap().get(roomId);
						if (battleGoodsCrossRoomCache!=null) {
							ConcurrentHashMap<Long, BattleGoodsJoiner> battleGoodsJoinerjoinMap = battleGoodsCrossRoomCache.getBattleGoodsJoinerjoinMap();
							BattleGoodsJoiner battleGoodsJoiner = battleGoodsJoinerjoinMap.get(hero.getId());
							if (battleGoodsJoiner!=null) {
								heroData.put(SceneXData.nowHp, battleGoodsJoiner.getHp());//????????????
								heroData.put(SceneXData.maxHp, hero.getFinalFightAttr().getHpMax());//????????????
								heroData.put(SceneXData.battleGoods_index, battleGoodsJoiner.getIndex());//??????
							}
						}
					}
				}
			}
		
			int sceneState = hero.getSceneState();
			heroData.put(SceneXData.act_st, sceneState);
			return heroData;
		}
		HashMap<Object, Object> heroData = new HashMap<Object, Object>();
		heroData.put(SceneXData.id, Long.toString(hero.getId()));//hid
		heroData.put(SceneXData.name, hero.getNameZoneid());//??????
		heroData.put(SceneXData.job, hero.getJob());//??????
		heroData.put(SceneXData.gX, scene.getPosX());
		heroData.put(SceneXData.gY, scene.getPosY());
		heroData.put(SceneXData.route, Arrays.deepToString(scene.getRoute()));//??????
		heroData.put(SceneXData.dir, scene.getDirection());//??????
//		ShowModel sm = hero.getShowModel();
		heroData.put(SceneXData.weapon, GodWeaponFunction.getIns().getNowGodWeapon(hero));//????????????  sm.getWeaponModel()
		heroData.put(SceneXData.vip, hero.getVipLv());// VIP??????
		int speed = MountFunction.getIns().getSpeed(hero);//?????????
		heroData.put(SceneXData.speed,speed);// ??????
		heroData.put(SceneXData.title, hero.getTitleId());// ??????
		heroData.put(SceneXData.shouHun, hero.getMonsterSpiritModel().getFightMonsterSpiri());
		if (scene.getSceneType()==SceneConst.ZCBOSS||scene.getSceneType()==SceneConst.CROSS_ZCBOSS) {
			int zoneid = hero.getZoneid();
			int partId = CrossCache.getPartId(zoneid);
			ZcBossJoiner zcBossJoiner=null;
			if (ZcBossLocalCache.getIns().getZcBossJoinersMap().containsKey(hero.getId())) {
				zcBossJoiner=ZcBossLocalCache.getIns().getZcBossJoinersMap().get(hero.getId());
			}else if (CrossZone.isCrossServer()&&ZcBossCrossCache.getIns().getZcBossJoinersMap(partId).containsKey(hero.getId())) {
				zcBossJoiner = ZcBossCrossCache.getIns().getZcBossJoinersMap(partId).get(hero.getId());
			}
			if (zcBossJoiner!=null) {
				heroData.put(SceneXData.nowHp, zcBossJoiner.getHp());//????????????
				heroData.put(SceneXData.maxHp, hero.getFinalFightAttr().getHpMax());//????????????
				LogTool.info("zcBossJoiner.getHp():"+zcBossJoiner.getHp()+" max :"+hero.getFinalFightAttr().getHpMax(), SceneFunction.class);
			}
		}
		if (scene.getSceneType()==SceneConst.BATTLEGOODS) {
			int partId = CrossCache.getPartId(hero.getZoneid());
			int belongZoneid=hero.getBelongZoneid();
			Integer roomId = BattleGoodSyscache.getFristzoneidToRoomId().get(belongZoneid);
			
			if (roomId!=null) {
				BattleGoodsCrossPartCaChe battleGoodsCrossPartCaChe = BattleGoodSyscache.getBattleGoodsCrossPartCaChes().get(partId);
				if (battleGoodsCrossPartCaChe!=null) {
					BattleGoodsCrossRoomCache battleGoodsCrossRoomCache =battleGoodsCrossPartCaChe.getRoomCacheMap().get(roomId);
					if (battleGoodsCrossRoomCache!=null) {
						ConcurrentHashMap<Long, BattleGoodsJoiner> battleGoodsJoinerjoinMap = battleGoodsCrossRoomCache.getBattleGoodsJoinerjoinMap();
						BattleGoodsJoiner battleGoodsJoiner = battleGoodsJoinerjoinMap.get(hero.getId());
						if (battleGoodsJoiner!=null) {
							heroData.put(SceneXData.nowHp, battleGoodsJoiner.getHp());//????????????
							heroData.put(SceneXData.maxHp, hero.getFinalFightAttr().getHpMax());//????????????
							heroData.put(SceneXData.battleGoods_index, battleGoodsJoiner.getIndex());//??????
						}
					}
				}
			}
		}
		
		int sceneState = hero.getSceneState();
		if(sceneState!=0){
			//????????????  0????????????1????????????2?????????
			heroData.put(SceneXData.act_st, sceneState);
		}
		//??????
		heroData.put(SceneXData.mount, hero.getMountId());
		
		hero.setSceneBoardDataUpdate(now);
		hero.setSceneShowData(heroData);
		return heroData;
	}

	
	/**
	 * ??????????????????<br/>
	 * ?????????????????????body??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
	 * @param hero hero
	 * @param onlyForHero ?????????????????????????????????????????????
	 * @param datas (key,value)??????id?????????GameConst???J_200_???????????????.xlsx
	 */
	public void boardcastNewState(Hero hero,Map<Object,Object> datas,boolean onlyForHero){
		Map<Object,Object> data = new HashMap<Object, Object>(datas);
		long hid = hero.getId();
		data.put(SceneXData.id, hid);
		SceneSender.sendCmd_3916(hero.getId(),HeroFunction.getIns().mapObjDataToStr(data));
		if(onlyForHero){
			return;
		}
		Scene scene = hero.getScene();
		if(scene==null) return;
		int posX = scene.getPosX();
		int posY = scene.getPosY();
		long sceneUnitId = scene.getSceneUnitId();
		int rowCol = getGridRowColMixByPosXY(posX, posY);
		int sceneType = scene.getSceneType();
		if (SceneCache.boardSupplyWay(sceneType)) {
			// ???????????????
			Integer[] sendArea = calcSendAreaByGridCoords(rowCol);
			if (sendArea == null)
				return;
			int line = getSupplySceneLine(hero, scene.getSceneSysId());
			// ??????
			for (Integer grid : sendArea) {
				ConcurrentSkipListSet<Hero> set = SceneCache.supplySceneHeroData.get(line, sceneUnitId, grid);
				if(set==null) continue;
				for(Hero nearHero:set){
					if(nearHero.getId()!=hid)
						SceneSender.sendCmd_3916(nearHero.getId(),HeroFunction.getIns().mapObjDataToStr(data));
				}
			}
		} else {
			// ?????????
			ConcurrentSkipListSet<Hero> set = SceneCache.copySceneHeroData.get(sceneUnitId);
			if(set!=null){
				for(Hero nearHero:set){
					if(nearHero.getId()!=hid)
						SceneSender.sendCmd_3916(nearHero.getId(),HeroFunction.getIns().mapObjDataToStr(data));
				}
			}
		}
		//????????????????????????
		//CrossFunction.syncHeroChangeToCross(hero, data);
	}
	
	/**
	 * ??????????????????<br/>
	 * @param hero hero
	 * @param cmd ??????????????????
	 * @param onlyForHero ?????????????????????????????????????????????
	 * @param datas (key,value)??????id?????????GameConst???J_200_???????????????.xlsx
	 */
	public void boardcastNewState(Hero hero,int cmd , Map<Object,Object> datas,boolean onlyForHero){
//		for(Object key : datas.keySet()){
//			hero.setSceneShowData(key, datas.get(key));
//		}
		Map<Object,Object> data = new HashMap<Object, Object>(datas);
		long hid = hero.getId();
		data.put(SceneXData.id, hid);
		byte[] write = LMessageFormat.write(data);
		NettyWrite.writeXData(hero.getChannel(), cmd, write);
		if(onlyForHero){
			return;
		}
		Scene scene = hero.getScene();
		if(scene==null) return;
		int posX = scene.getPosX();
		int posY = scene.getPosY();
		long sceneUnitId = scene.getSceneUnitId();
		int rowCol = getGridRowColMixByPosXY(posX, posY);
		int sceneType = scene.getSceneType();
		if (SceneCache.boardSupplyWay(sceneType)) {
			// ???????????????
			Integer[] sendArea = calcSendAreaByGridCoords(rowCol);
			if (sendArea == null)
				return;
			int line = getSupplySceneLine(hero, scene.getSceneSysId());
			// ??????
			for (Integer grid : sendArea) {
				ConcurrentSkipListSet<Hero> set = SceneCache.supplySceneHeroData.get(line, sceneUnitId, grid);
				if(set==null) continue;
				for(Hero nearHero:set){
					if(nearHero.getId()!=hid)
						NettyWrite.writeXData(nearHero.getChannel(), cmd, write);
				}
			}
		} else {
			// ?????????
			ConcurrentSkipListSet<Hero> set = SceneCache.copySceneHeroData.get(sceneUnitId);
			if(set!=null){
				for(Hero nearHero:set){
					if(nearHero.getId()!=hid)
						NettyWrite.writeXData(nearHero.getChannel(), cmd, write);
				}
			}
		}
	}
	
	
	/**
	 * ??????????????????<br/>
	 * ?????????????????????body??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
	 * @param hero hero
	 * @param key ??????id?????????GameConst???J_200_???????????????.xlsx
	 * @param value ?????????
	 * @param onlyForHero ?????????????????????????????????????????????
	 */
	public void boardcastNewState(Hero hero,Object key,Object value,boolean onlyForHero){
//		hero.setSceneShowData(key, value);
		Map<Object,Object> data = new HashMap<Object, Object>(3);
		data.put(key, value);
		boardcastNewState(hero,data,onlyForHero);
	}
	/**
	 * hero??????NPC
	 * @param gridData
	 * @param hero
	 */
	public void heroMeetNpc(ConcurrentSkipListSet<NPC> gridData,Hero hero) {
		if (gridData == null) return;
		Channel channel = null;
		NPC npc = null;
		for (Iterator<NPC> it = gridData.iterator(); it.hasNext();) {
			npc = it.next();
			if (npc != null) {
				if(channel==null) channel = hero.getChannel();
//				NettyWrite.writeData(channel, new Object[] { npc.getId() * -1, npc.getSysId(), npc.getPosX(), npc.getPosY(), npc.getRoute(), npc.getClientNpcType(),npc.getSceneState()}, SceneCmd.GC_Addnpc_3918);
				heroMeetNpc(channel, npc);
//				System.out.println("Function??????"+hero.getName()+"??????NPC???"+npc.getSysId()+" id:"+npc.getId()+" x:"+npc.getPosX()+" y:"+npc.getPosY());//TODO
			}
		}
	}
	/**
	 * ????????????npc
	 * @param channel
	 * @param npc
	 */
	private void heroMeetRadishNPC(Channel channel,NPC npc){
		NettyWrite.writeXData(channel, SceneCmd.GC_Addnpc_3918, npc.getOtherData().getPropertyValue());
	}
	
	/**
	 * ??????npc
	 * @param channel
	 * @param npc
	 */
	private void heroMeetNpc(Channel channel,NPC npc){
		npc.addAttr(SceneXData.id, npc.getId()*-1);
		npc.addAttr(SceneXData.sysId, npc.getSysId());
		npc.addAttr(SceneXData.type, npc.getNpcType());
		npc.addAttr(SceneXData.gX, npc.getPosX());
		npc.addAttr(SceneXData.gY, npc.getPosY());
		NettyWrite.writeXData(channel, SceneCmd.GC_Addnpc_3918, npc.getOtherData().getPropertyValue());
		LogTool.info("SceneFunction heroMeetNpc npc=" + npc.getId() + ", sysId=" + npc.getSysId(), SceneFunction.class);
	}
	
	/**
	 * ??????????????????
	 * @param robbert
	 */
	private void heroMeetRobbert(Robbert robbert){
		robbert.addAttr(SceneXData.id, robbert.getId()*-1);
		robbert.addAttr(SceneXData.sysId, robbert.getSysId());
		robbert.addAttr(SceneXData.type, robbert.getNpcType());
		robbert.addAttr(SceneXData.gX, robbert.getPosX());
		robbert.addAttr(SceneXData.gY, robbert.getPosY());
		robbert.addAttr(SceneXData.route, robbert.getRoute());
		robbert.addAttr(SceneXData.act_st, robbert.getSceneState());
	}
	/**
	 * ???????????????????????????
	 * @param tn
	 */
	public void boardRobbertState(Robbert robbert){
		/*int rowCol = SceneFunction.getIns().getGridRowColMixByPosXY(robbert.getPosX(), robbert.getPosY());
		if (rowCol == 0)return;
		int sceneType = Config_map_200.getIns().get(robbert.getSceneSysId()).getSevertype();
		int sceneUnitId = robbert.getSceneUnitId();
		heroMeetRobbert(robbert);
		Map<Object, Object> propertyValue = robbert.getOtherData().getPropertyValue();
		if (SceneCache.boardSupplyWay(sceneType)) {
			// ???????????????
			Integer[] sendArea  = SceneFunction.getIns().calcSendAreaByGridCoords(rowCol);
			if (sendArea == null) return;
			Set<Integer> allLine = SceneCache.getAllLine();
			for(Integer line:allLine){
				for (Integer grid : sendArea) {
					ConcurrentSkipListSet<Hero> gridData = SceneCache.supplySceneHeroData.get(line, sceneUnitId, grid);
					if(gridData==null) continue;
					Hero hero = null;
					for (Iterator<Hero> it = gridData.iterator(); it.hasNext();) {
						hero = it.next();
						if (hero!=null) {
							// ??????
//							logger.info("boardRobbertState,add hero:"+hero.toString()+propertyValue+",route:"+Arrays.deepToString((Object[])propertyValue.get("route")));
							NettyWrite.writeXData(hero.getChannel(), SceneCmd.GC_Addnpc_3918, propertyValue);
						}
					}
				}
			}
		} else {
			// ?????????
			ConcurrentSkipListSet<Hero> gridData = SceneCache.copySceneHeroData.get(sceneUnitId);
			if(gridData==null) return;
			Hero hero = null;
			for (Iterator<Hero> it = gridData.iterator(); it.hasNext();) {
				hero = it.next();
				if (hero!=null) {
					// ??????
					System.err.println("add ex,hero:"+hero.toString()+propertyValue+",route:"+Arrays.deepToString((Object[])propertyValue.get("route")));
					NettyWrite.writeXData(hero.getChannel(), SceneCmd.GC_Addnpc_3918, propertyValue);
				}
			}
		}*/
	}
	/**
	 * NPC?????????hero
	 * @param gridData
	 * @param npc
	 */
	public void npcMeetHero(ConcurrentSkipListSet<Hero> gridData, NPC npc) {
		if (gridData == null || npc == null)
			return;
		Hero hero = null;
		Object[] npcData = null;
		for (Iterator<Hero> it = gridData.iterator(); it.hasNext();) {
			hero = it.next();
			if (hero!=null) {
				// ??????
				if(npcData==null){
					npcData = new Object[] { npc.getId() * -1, npc.getSysId(), npc.getPosX(), npc.getPosY(), npc.getRoute(), npc.getClientNpcType(),npc.getSceneState()};
				}
//				NettyWrite.writeData(hero.getChannel(), npcData, SceneCmd.GC_Addnpc_3918);
				Channel channel = hero.getChannel();
				heroMeetNpc(channel, npc);
//				System.err.println("Function.2??????"+hero.getName()+"??????NPC???"+npc.getSysId()+" x:"+npc.getPosX()+" y:"+npc.getPosY());//TODO
//				logger.info("npc meet hero,npc sysID:"+npc.getSysId()+"?????????:"+hero.getName()+"??????. "+
//				 " npc unitID "+ npc.getId()+",pos???"+npc.getPosX()+","+npc.getPosY()+",sceneSysId:"+npc.getSceneSysId()+",sceneUnitId:"+npc.getSceneUnitId());
			}
		}
	}
	/**
	 * ?????????????????????
	 * 
	 * @param hero
	 * @param sameScene ?????????????????????
	 */
	public void delHeroFromScene(Hero hero) {
		if (hero == null)
			return;
		long hid = hero.getId();
		Scene scene = hero.getScene();
		//????????????????????????????????????
		//SceneFunction.getIns().stopMove(hero);
		int posX = scene.getPosX();
		int posY = scene.getPosY();
		Object[] roleData = new Object[] { hid, SceneConst.PLAYER };
		int rowCol = getGridRowColMixByPosXY(posX, posY);
		if (rowCol == 0)
			return;
		long sceneId = scene.getSceneUnitId();
		int sceneType = scene.getSceneType();
		if (SceneCache.boardSupplyWay(sceneType)) {
			// ???????????????
			int line = getSupplySceneLine(hero, scene.getSceneSysId());
			SceneCache.removeFromSupplyScene(sceneId, rowCol, hero, line, true);
			Integer[] sendArea = calcSendAreaByGridCoords(rowCol);
			if (sendArea == null)
				return;
			for (Integer grid : sendArea) {
				delHero(SceneCache.supplySceneHeroData.get(line, sceneId, grid), hero,roleData,true);
			}
		} else {
			// ?????????
			SceneCache.copySceneHeroData.removeSet(sceneId, hero);
			delHero(SceneCache.copySceneHeroData.get(sceneId), hero,roleData,true);
		}
	}
	/**
	 * ??????????????????????????????????????????hero
	 * 
	 * @param hero
	 */
	public void confirmDelHeroSceneCache(Hero hero) {
		if (hero == null)
			return;
		long hid = hero.getId();
		Scene scene = hero.getScene();
		int sceneType = scene.getSceneType();
		if (SceneCache.boardSupplyWay(sceneType)) {
			// ???????????????
			Map<Integer, Map<Long, Map<Integer, ConcurrentSkipListSet<Hero>>>> map = SceneCache.supplySceneHeroData.get();
			for(Map<Long, Map<Integer, ConcurrentSkipListSet<Hero>>> m1:map.values()){
				for(Map<Integer, ConcurrentSkipListSet<Hero>> m2:m1.values()){
					for(ConcurrentSkipListSet<Hero> m3:m2.values()){
						for(Hero h:m3){
							if(h.getId()==hid){
								m3.remove(h);
							}
						}
					}
				}
			}
		} else {
			// ?????????
			Map<Long, ConcurrentSkipListSet<Hero>> map = SceneCache.copySceneHeroData.get();
			for(ConcurrentSkipListSet<Hero> m1:map.values()){
				for(Hero h:m1){
					if(h.getId()==hid){
						m1.remove(h);
					}
				}
			}
		}
	}
	/**
	 * ??????hero
	 * @param gridData
	 * @param hero
	 * @param delData
	 * @param delSingle
	 */
	public void delHero(ConcurrentSkipListSet<Hero> gridData, Hero hero,Object[] delData,boolean del) {
		if (gridData == null) return;
		Hero nearHero = null;
		Channel channel = null;
		for (Iterator<Hero> it = gridData.iterator(); it.hasNext();) {
			nearHero = it.next();
			if (nearHero!=null) {
				// ??????
				NettyWrite.writeData(nearHero.getChannel(), delData,SceneCmd.GC_Delhero_3906);
				if(del){
					if(channel==null) channel = hero.getChannel();
					NettyWrite.writeData(channel, new Object[] { nearHero.getId(), SceneConst.PLAYER }, SceneCmd.GC_Delhero_3906);
//					int heroPosX = hero.getScene().getPosX();
//					int heroPosY = hero.getScene().getPosY();
//					int nearHeroPosX = nearHero.getScene().getPosX();
//					int nearHeroPosY = nearHero.getScene().getPosY();
//					System.err.println("??????:"+hero.getName()+",rowcol:"+getGridRowColMixByPosXY(heroPosX, heroPosY)+",pos:("+heroPosX+","+heroPosY+
//							")?????????:"+nearHero.getName()+",rowcol:"+getGridRowColMixByPosXY(nearHeroPosX, nearHeroPosY)+",pos:("+nearHeroPosX+","+nearHeroPosY+") ????????????.");
				}
			}
		}
	}
	/**
	 * ?????????????????????
	 * @param sceneuid
	 * @param grid
	 * @param hero
	 */
	public void delHangRobbert(int sceneuid,int grid,Hero hero){
		/*ConcurrentSkipListSet<HangRobbert> set = SceneCache.getHangRobbertSet(sceneuid, grid);
		if(set!=null){
			for(HangRobbert hb:set){
				NettyWrite.writeData(hero.getChannel(), new Object[] { hb.getHid(), SceneConst.PLAYER }, SceneCmd.GC_Delhero_3906);
			}
		}*/
	}
	/**
	 * ??????npc
	 * @param gridData
	 * @param hero
	 */
	public void delNpc(ConcurrentSkipListSet<NPC> gridData,Hero hero){
		if(gridData==null) return;
		Channel channel = null;
		NPC npc = null;
		for (Iterator<NPC> it = gridData.iterator(); it.hasNext();) {
			npc = it.next();
			if (npc != null) {
				if(channel==null) channel = hero.getChannel();
//				System.err.println("remove "+hero.getNameZoneid()+",npc:"+npc.getSysId()+",type"+npc.getNpcType());
				NettyWrite.writeData(channel, new Object[] { npc.getId() * -1, npc.getClientNpcType() },SceneCmd.GC_Delhero_3906);
			}
		}
	}

	/**
	 * ?????????????????????
	 * 
	 * @param sceneUnitId
	 */
	public void delScene(long sceneUnitId,int sceneType) {
		if(SceneCache.boardSupplyWay(sceneType)){
			Iterator<Entry<Integer, Map<Long, Map<Integer, ConcurrentSkipListSet<Hero>>>>> it1 = SceneCache.supplySceneHeroData.get().entrySet().iterator();
			while(it1.hasNext()){
				Entry<Integer, Map<Long, Map<Integer, ConcurrentSkipListSet<Hero>>>> next = it1.next();
				Map<Long, Map<Integer, ConcurrentSkipListSet<Hero>>> value = next.getValue();
				Iterator<Entry<Long, Map<Integer, ConcurrentSkipListSet<Hero>>>> it2 = value.entrySet().iterator();
				boolean found = false;
				while(it2.hasNext()){
					Entry<Long, Map<Integer, ConcurrentSkipListSet<Hero>>> next2 = it2.next();
					if(next2.getKey()==sceneUnitId){
						it2.remove();
						found = true;
						break;
					}
				}
				if(found) break;
			}
			Map<Integer, ConcurrentSkipListSet<NPC>> remove = SceneCache.supplySceneNpcCache.remove(sceneUnitId);
			if(remove!=null){
				for(ConcurrentSkipListSet<NPC> set:remove.values()){
					if(set!=null){
						for(NPC npc:set){
							SceneCache.removeFromNPCCache(npc.getId());
						}
					}
				}
			}
		}else{
			SceneCache.copySceneHeroData.remove(sceneUnitId);
			ConcurrentSkipListSet<NPC> npcList = SceneCache.copySceneNpcData.remove(sceneUnitId);
			if(npcList!=null){
				for(NPC npc:npcList){
					SceneCache.removeFromNPCCache(npc.getId());
				}
			}
		}
	}
	
	
	/**
	 * ????????????npc?????????
	 * @param npcSysId npc??????id
	 * @param posX npc??????x
	 * @param posY npc??????y
	 * @param wave ???????????????????????????????????????-1
	 * @param sceneUnitId ????????????id,??????????????????,??????0
	 * @param sceneSysId  ????????????id	
	 * @param needBoardcast ??????????????????
	 * @return ?????????NPC
	 */
	public NPC addNpcToScene(int npcSysId,int posX,int posY,int wave,int sceneUnitId,int sceneSysId,boolean needBoardcast) {
		if(sceneUnitId==0){
			sceneUnitId = SceneCache.getSceneUnitId();
		}
		NPC npc = new NPC();
		long npcUnitId = SceneCache.getNPCUnitId();
		npc.setId(npcUnitId);
		npc.setSysId(npcSysId);
		npc.setSceneSysId(sceneSysId);
		npc.setSceneUnitId(sceneUnitId);
		npc.setPosX(posX);
		npc.setPosY(posY);
		npc.setWave(wave);
		npc.setNpcType(Config_NPC_200.getIns().get(npcSysId).getType());
		npc.setCreateTime(TimeDateUtil.getCurrentTime());
		npc.setClientNpcType(Config_NPC_200.getIns().get(npcSysId).getGongji());
		addNPCToSceneCache(npc);
		if(needBoardcast){
			boardNewNpc(npc);
		}
		return npc;
	}
	
	/**
	 * ????????????npc?????????
	 * @param npcSysId npc??????id
	 * @param posX npc??????x
	 * @param posY npc??????y
	 * @param wave ???????????????????????????????????????-1
	 * @param oterDatas ??????????????????????????????????????????
	 * @param sceneUnitId ????????????id,??????????????????,??????0
	 * @param sceneSysId  ????????????id	
	 * @param needBoardcast ??????????????????
	 * @return ?????????NPC
	 */
	public NPC addNpcToScene(int npcSysId,int posX,int posY,int wave,UpdatePropertyValue oterDatas , long sceneUnitId,int sceneSysId,boolean needBoardcast) {
		if(sceneUnitId==0){
			sceneUnitId = SceneCache.getSceneUnitId();
		}
		NPC npc = new NPC();
		long npcUnitId = SceneCache.getNPCUnitId();
		npc.setId(npcUnitId);
		npc.setSysId(npcSysId);
		npc.setSceneSysId(sceneSysId);
		npc.setSceneUnitId(sceneUnitId);
		npc.setPosX(posX);
		npc.setPosY(posY);
		npc.setWave(wave);
		npc.setNpcType(Config_NPC_205.getIns().get(npcSysId).getLeixing());
		npc.setCreateTime(TimeDateUtil.getCurrentTime());
		npc.setClientNpcType(Config_NPC_205.getIns().get(npcSysId).getGongji());
		if(oterDatas != null){
			npc.getOtherData().getPropertyValue().putAll(oterDatas.getPropertyValue());
		}
		addNPCToSceneCache(npc);
		if(needBoardcast){
			boardNewNpc(npc);
		}
		return npc;
	}
	/**
	 * ??????NPC??????????????????????????????????????????NPC?????????
	 * @param npc ????????????npc
	 * @param npcSysId npc??????id
	 * @param posX npc??????x
	 * @param posY npc??????y
	 * @param wave ???????????????????????????????????????-1
	 * @param oterDatas ??????????????????????????????????????????
	 * @param sceneUnitId ????????????id,??????????????????,??????0
	 * @param sceneSysId  ????????????id	
	 * @param needBoardcast ??????????????????
	 */
	public void addNPCToSceneInit(NPC npc,int npcSysId,int posX,int posY,int wave,int sceneUnitId,int sceneSysId,boolean needBoardcast){
		if(sceneUnitId==0){
			sceneUnitId = SceneCache.getSceneUnitId();
		}
		long npcUnitId = SceneCache.getNPCUnitId();
		npc.setId(npcUnitId);
		npc.setSysId(npcSysId);
		npc.setSceneSysId(sceneSysId);
		npc.setSceneUnitId(sceneUnitId);
		npc.setPosX(posX);
		npc.setPosY(posY);
		npc.setWave(wave);
		npc.setNpcType(Config_NPC_205.getIns().get(npcSysId).getLeixing());
		npc.setCreateTime(TimeDateUtil.getCurrentTime());
		npc.setClientNpcType(Config_NPC_205.getIns().get(npcSysId).getGongji());
		addNPCToSceneCache(npc);
		if(needBoardcast){
			boardNewNpc(npc);
		}
	}
	
	
	/**
	 * ??????npc?????????(??????npc)
	 * 
	 * @param npcData
	 *            npc??????,?????????list,???????????????int[]{sysId,posX,posY,wave(????????????-1)}
	 * @param sceneUnitId
	 *            ????????????ID
	 * @param sceneSysId 
	 * 			  ????????????id
	 * @param needBoardcast ??????????????????
	 * @return ?????????npc??????           
	 */
	public NPC[] addNpcToScene(List<int[]> npcData, int sceneUnitId,int sceneSysId,boolean needBoardcast) {
		if(npcData==null || npcData.size()==0){
			LogTool.warn("add npc to scene fail,sceneSysId:"+sceneSysId+",sceneUnitId:"+sceneUnitId,SceneFunction.class);
			return null;
		}
		NPC[] npcReturnArr = new NPC[npcData.size()];
		int i = 0;
		for (int[] arr : npcData) {
			NPC npc = new NPC();
			long npcUnitId = SceneCache.getNPCUnitId();
			npc.setId(npcUnitId);
			npc.setSceneSysId(sceneSysId);
			npc.setSceneUnitId(sceneUnitId);
			npc.setSysId(arr[0]);
			npc.setPosX(arr[1]);
			npc.setPosY(arr[2]);
			npc.setWave(arr[3]);
			npc.setCreateTime(TimeDateUtil.getCurrentTime());
			npc.setNpcType(Config_NPC_205.getIns().get(arr[0]).getLeixing());
			npc.setClientNpcType(Config_NPC_205.getIns().get(arr[0]).getGongji());
			addNPCToSceneCache(npc);
			if(needBoardcast){
				boardNewNpc(npc);
			}
			npcReturnArr[i] = npc;
			i++;
		}
		return npcReturnArr;
	}
	/**
	 * ??????npc?????????
	 * @param npc
	 * @param needBoardcast
	 */
	public void addNpcToScene(NPC npc,boolean needBoardcast){
		addNPCToSceneCache(npc);
		if(needBoardcast){
			boardNewNpc(npc);
		}
	}
	/**
	 * ??????npc???????????????
	 * @param npc npc??????
	 */
	private void addNPCToSceneCache(NPC npc) {
		if (npc == null)
			return;
		SceneCache.addToNPCCache(npc);
//		SceneCache.copySceneNpcData.putConcurrentSkipListSet(npc.getSceneUnitId(), npc);
		SceneCache.addNpcToSceneCache(npc.getSceneUnitId(), npc);
	}
	
	/**
	 * ??????????????????npc
	 * @param npc npc??????
	 * @param sceneUnitId ????????????id
	 */
	public void boardNewNpc(NPC npc){
		int rowCol = getGridRowColMixByPosXY(npc.getPosX(), npc.getPosY());
		if (rowCol == 0)return;
		int sceneType = Config_map_200.getIns().get(npc.getSceneSysId()).getSevertype();
		long sceneUnitId = npc.getSceneUnitId();
		if (SceneCache.boardSupplyWay(sceneType)) {
			// ???????????????
			Integer[] sendArea  = calcSendAreaByGridCoords(rowCol);
			if (sendArea == null) return;
			Set<Integer> allLine = SceneCache.getAllLine();
			for(Integer line:allLine){
				for (Integer grid : sendArea) {
					// ????????????
					npcMeetHero(SceneCache.supplySceneHeroData.get(line, sceneUnitId, grid), npc);
				}
			}
		} else {
			// ?????????
			// ????????????
			npcMeetHero(SceneCache.copySceneHeroData.get(sceneUnitId), npc);
		}
	}
	
	/**
	 * ??????xy?????????????????????????????????
	 * @param x
	 * @param y
	 */
	public ConcurrentSkipListSet<Hero> getSceneHeroDataFromPonit(int sceneSysId , long sceneUnitId , int x , int y){
		int rowCol = getGridRowColMixByPosXY(x, y);
		if (rowCol == 0){
			return null;
		}
		int sceneType = Config_map_200.getIns().get(sceneSysId).getSevertype();
		
		if (SceneCache.boardSupplyWay(sceneType)) {
			// ???????????????
			Integer[] sendArea  = calcSendAreaByGridCoords(rowCol);
			if (sendArea == null) {
				return null;
			}
			ConcurrentSkipListSet<Hero>  heros = new ConcurrentSkipListSet<Hero>();
			Set<Integer> allLine = SceneCache.getAllLine();
			for(Integer line:allLine){
				for (Integer grid : sendArea) {
					ConcurrentSkipListSet<Hero> tempHeros = SceneCache.supplySceneHeroData.get(line, sceneUnitId, grid);
					if(tempHeros != null){
						heros.addAll(tempHeros);
					}
				}
			}
			return heros;
		} else {
			// ?????????
			return SceneCache.copySceneHeroData.get(sceneUnitId);
		}
	}
	
	/**
	 * ????????????
	 * @param hero ??????
	 * @param checkTeam true???????????????
	 */
	public void exitScene(Hero hero,boolean checkTeam) {
		try {
			AbsSceneEvent sceneEvent = SceneEventFunction.getSceneEvent(hero.getScene().getSceneType());
			if(sceneEvent==null){
				LogTool.warn("hid: "+hero.getId()+"name "+hero.getNameZoneid()+"exitScene get sceneEvent is null,sceneSysId:"+hero.getScene().getSceneSysId(),SceneFunction.class);
				return;
			}
			int beforeOut = sceneEvent.beforeOut(hero);
			if(beforeOut!=1){
				if(!hero.getTempVariables().isLoginEnterScene()){
					hero.getTempData().addAttribute(GameConst.QUIT_SCENE, 1);
					hero.getTempData().addAttribute(GameConst.QUIT_SCENE_TYPE, hero.getScene().getSceneType());
				}
				SceneFunction.getIns().delHeroFromScene(hero);
				Scene scene = new Scene();
				scene.setHid(hero.getId());
				hero.setScene(scene);
				sceneEvent.out(hero);
			}
		} catch (Exception e) {
			LogTool.error(e, SceneFunction.class, hero.getId(), hero.getName(), "exit scene err");
		}
	}
	/**
	 * ?????????????????? ?????????????????????id
	 * @param sceneSysId
	 */
	public void exitSceneBatch(int sceneSysId){
		try {
			Struct_map_200 Struct_map_200 = Config_map_200.getIns().get(sceneSysId);
			List<Long> foundList=  new ArrayList<Long>();
			if(SceneCache.boardSupplyWay(Struct_map_200.getSevertype())){
				//??????????????????
				Iterator<Entry<Integer, Map<Long, Map<Integer, ConcurrentSkipListSet<Hero>>>>> it1 = SceneCache.supplySceneHeroData.get().entrySet().iterator();
				while(it1.hasNext()){
					Entry<Integer, Map<Long, Map<Integer, ConcurrentSkipListSet<Hero>>>> next = it1.next();
					Map<Long, Map<Integer, ConcurrentSkipListSet<Hero>>> value = next.getValue();
					Iterator<Entry<Long, Map<Integer, ConcurrentSkipListSet<Hero>>>> it2 = value.entrySet().iterator();
					while(it2.hasNext()){
						Entry<Long, Map<Integer, ConcurrentSkipListSet<Hero>>> next2 = it2.next();
						long uid = next2.getKey();
						Map<Integer, ConcurrentSkipListSet<Hero>> value2 = next2.getValue();
						boolean found = false;
						for(ConcurrentSkipListSet<Hero> set:value2.values()){
							for(Hero h:set){
								if(h.isOnline()){
									/*logger.info("hero===uid:" + h.getId()+
											";hero sceneid:" + h.getScene().getSceneSysId() + ";sceneSysId:" + sceneSysId
											+ ";name:" + h.getName());*/
									if(h.getScene().getSceneSysId()==sceneSysId){
										foundList.add(uid);
										found = true;
										break;
									}
								}
							}
							if(found){
								//logger.info("hero===uid:" + uid);
								break;
							}
						}
					}
				}
				if(foundList.size()==0){
					Iterator<Entry<Long, Map<Integer, ConcurrentSkipListSet<NPC>>>> itnpc = SceneCache.supplySceneNpcCache.get().entrySet().iterator();
					while(itnpc.hasNext()){
						Entry<Long, Map<Integer, ConcurrentSkipListSet<NPC>>> next = itnpc.next();
						long uid = next.getKey();
						Map<Integer, ConcurrentSkipListSet<NPC>> value = next.getValue();
						for(ConcurrentSkipListSet<NPC> set:value.values()){
							boolean found = false;
							for(NPC npc:set){
								if(npc.getSceneSysId()==sceneSysId){
									foundList.add(uid);
									found = true;
									break;
								}
							}
							if(found){
								//logger.info("npc===uid:" + uid);
								break;
							}
						}
					}
				}
			}else{
				//????????????
				Iterator<Entry<Long, ConcurrentSkipListSet<Hero>>> it = SceneCache.copySceneHeroData.get().entrySet().iterator();
				while(it.hasNext()){
					Entry<Long, ConcurrentSkipListSet<Hero>> next = it.next();
					long uid = next.getKey();
					for(Hero h:next.getValue()){
						if(h.isOnline()){
							if(h.getScene().getSceneSysId()==sceneSysId){
								foundList.add(uid);
								break;
							}
						}
					}
				}
				if(foundList.size()==0){
					Iterator<Entry<Long, ConcurrentSkipListSet<NPC>>> itnpc = SceneCache.copySceneNpcData.get().entrySet().iterator();
					while(itnpc.hasNext()){
						Entry<Long, ConcurrentSkipListSet<NPC>> next = itnpc.next();
						long uid = next.getKey();
						for(NPC npc:next.getValue()){
							if(npc.getSceneSysId()==sceneSysId){
								foundList.add(uid);
								break;
							}
						}
					}
				}
			}
			for(long uid:foundList){
				exitSceneBatch(uid, sceneSysId);
			}
		} catch (Exception e) {
			LogTool.errmsg(e);
		}
	}
	/**
	 * ???????????????????????????????????????
	 * @param sceneUid ????????????id
	 * @param sceneSysId ????????????id
	 */
	public void exitSceneBatch(long sceneUid,int sceneSysId){
		Struct_map_200 Struct_map_200 = Config_map_200.getIns().get(sceneSysId);
		if(SceneCache.boardSupplyWay(Struct_map_200.getSevertype())){
			//??????????????????
			Iterator<Entry<Integer, Map<Long, Map<Integer, ConcurrentSkipListSet<Hero>>>>> it1 = SceneCache.supplySceneHeroData.get().entrySet().iterator();
			while(it1.hasNext()){
				Map<Integer, ConcurrentSkipListSet<Hero>> map = it1.next().getValue().get(sceneUid);
				if(map==null) continue;
				Collection<ConcurrentSkipListSet<Hero>> values = map.values();
				for(ConcurrentSkipListSet<Hero> set:values){
					for(Hero hero:set){
						if(hero.isOnline()){
							LogTool.info(hero.getId(), hero.getName(), "exit scene 2s", SceneFunction.class);
							/*if(hero.getTeam()==null){
								logger.info("exit scene,hero:"+hero.getId()+",name:"+hero.getNameZoneid());
							}*/
							exitScene(hero,false);
						}
					}
				}
			}
		}else{
			//????????????
			ConcurrentSkipListSet<Hero> set = SceneCache.copySceneHeroData.get(sceneUid);
			if(set != null){
				for(Hero hero:set){
					LogTool.info(hero.getId(), hero.getName(), "exit scene 2s", SceneFunction.class);
					/*if(hero.getTeam()==null){
						logger.info("exit scene,hero:"+hero.getId()+",name:"+hero.getNameZoneid());
					}*/
					exitScene(hero,false);
				}
			}
		}
		//exitSceneForTeam(sceneUid,sceneSysId);
		delScene(sceneUid, Struct_map_200.getSevertype());
	}
	/**
	 * ??????????????????????????????
	 * @param preRow
	 * @param preCol
	 * @param row
	 * @param col
	 * @return
	 */
	public int[][] getAddDelByCalc(final int preRow,final int preCol,final int row,final int col){
		int[][] addDel = null;
		if(preRow==row && preCol==col){
			return null;
		}
//		String move = null;
		if(preRow!=row && preCol!=col){
			//???????????????
			addDel = moveXY(preRow, preCol, SceneConst.LEFT_CAN_SEE, SceneConst.RIGHT_CAN_SEE, SceneConst.UP_CAN_SEE, SceneConst.DOWN_CAN_SEE, col-preCol>0?true:false,row-preRow>0?true:false);
//			move = "move xy";
		}else if(preRow==row){
			//????????????
			addDel = moveX(preRow, preCol, SceneConst.LEFT_CAN_SEE, SceneConst.RIGHT_CAN_SEE, SceneConst.UP_CAN_SEE, SceneConst.DOWN_CAN_SEE, col-preCol>0?true:false);
//			move = "move x";
		}else{
			//????????????
			addDel = moveY(preRow, preCol, SceneConst.LEFT_CAN_SEE, SceneConst.RIGHT_CAN_SEE, SceneConst.UP_CAN_SEE, SceneConst.DOWN_CAN_SEE, row-preRow>0?true:false);
//			move = "move y";
		}
//		System.err.println("preRowCol:"+preRow*1000+preCol+","+"rowcol:"+row*1000+col+","+move+","+Arrays.deepToString(addDel));
		return addDel;
	}
	
	private int[][] moveXY(int nowRow,int nowCol,int leftCanSee,int rightCanSee,int upCanSee,int downCanSee,boolean moveRight,boolean moveDown){
		int[][] moveX = moveX(nowRow, nowCol, leftCanSee, rightCanSee, upCanSee, downCanSee, moveRight);
		int[][] moveY = moveY(nowRow, moveRight?nowCol+1:nowCol-1, leftCanSee, rightCanSee, upCanSee, downCanSee, moveDown);
		int[] addGrid = new int[moveX[0].length+moveY[0].length];
		int[] delGrid = new int[moveX[1].length+moveY[1].length];
		int i = 0;
		int j = 0;
		for(int grid:moveX[0]){
			addGrid[i++] = grid;
		}
		for(int grid:moveY[0]){
			addGrid[i++] = grid;
		}
		for(int grid:moveX[1]){
			delGrid[j++] = grid;
		}
		for(int grid:moveY[1]){
			delGrid[j++] = grid;
		}
		int[][] addDelGrid = new int[2][];
		addDelGrid[0] = addGrid;
		addDelGrid[1] = delGrid;
		return addDelGrid;
	}
	
	private int[][] moveX(int nowRow,int nowCol,int leftCanSee,int rightCanSee,int upCanSee,int downCanSee,boolean moveRight){
		int addCol = 0;
		int delCol = 0;
		if(moveRight){
			//????????????
			addCol = nowCol + rightCanSee + 1;
			delCol = nowCol - leftCanSee;
		}else{
			//????????????
			addCol = nowCol - leftCanSee - 1;
			delCol = nowCol + rightCanSee;
		}
		int[] addGrid = new int[upCanSee+downCanSee+1];
		int[] delGrid = new int[upCanSee+downCanSee+1];
		int j = 0;
		int k = 0;
		//?????????
		for(int i=nowRow-1;i>=nowRow-upCanSee;i--){
			addGrid[j++] = i*1000 + addCol;
			delGrid[k++] = i*1000 + delCol;
		}
		//??????
		addGrid[j++] = nowRow * 1000 + addCol;
		delGrid[k++] = nowRow * 1000 + delCol;
		//?????????
		for(int i=nowRow+1;i<=nowRow+downCanSee;i++){
			addGrid[j++] = i*1000 + addCol;
			delGrid[k++] = i*1000 + delCol;
		}
		int[][] addDelGrid = new int[2][];
		addDelGrid[0] = addGrid;
		addDelGrid[1] = delGrid;
		return addDelGrid;
	}
	
	private int[][] moveY(int nowRow,int nowCol,int leftCanSee,int rightCanSee,int upCanSee,int downCanSee,boolean moveDown){
		int addRow = 0;
		int delRow = 0;
		if(moveDown){
			//????????????
			addRow = nowRow + downCanSee + 1;
			delRow = nowRow - upCanSee;
		}else{
			//????????????
			addRow = nowRow - upCanSee - 1;
			delRow = nowRow + downCanSee;
		}
		int[] addGrid = new int[leftCanSee+rightCanSee+1];
		int[] delGrid = new int[leftCanSee+rightCanSee+1];
		int j = 0;
		int k = 0;
		//?????????
		for(int i=nowCol-1;i>=nowCol-leftCanSee;i--){
			addGrid[j++] = addRow * 1000 + i;
			delGrid[k++] = delRow *1000+ i;
		}
		//??????
		addGrid[j++] = addRow * 1000 + nowCol;
		delGrid[k++] = delRow * 1000 + nowCol;
		//?????????
		for(int i=nowCol+1;i<=nowCol+rightCanSee;i++){
			addGrid[j++] = addRow*1000 + i;
			delGrid[k++] = delRow*1000 + i;
		}
		int[][] addDelGrid = new int[2][];
		addDelGrid[0] = addGrid;
		addDelGrid[1] = delGrid;
		return addDelGrid;
	}
	
	// ????????????????????????????????????
	public void setRoleNewSceneData(Hero hero, long newSceneUnitId, int newSceneSysId, int newPosX, int newPosY) {
		Scene roleScene = hero.getScene();
		roleScene.setNewLocation(null);
		NewLocation newLocation = new NewLocation(newSceneUnitId, newSceneSysId, newPosX, newPosY);
		roleScene.setNewLocation(newLocation);
		NettyWrite.writeData(hero.getChannel(), new Object[] { 1, newSceneSysId, newPosX, newPosY},SceneCmd.GC_Inscene_3902);
	}
	
	/**
	 * ????????????<br/>
	 * ??????????????????????????????????????????????????????
	 * @param hero
	 */
	public void stopMove(final Hero hero){
		if(hero==null) return;
		try {
			final Scene roleScene = hero.getScene();
			if(roleScene==null) return;
//			final Integer[][] route = roleScene.getRoute();
//			if(route==null || route.length==0) return;
			//????????????????????????
			long rid = hero.getId();
			int posX = roleScene.getPosX();
			int posY = roleScene.getPosY();
			int rowCol = getGridRowColMixByPosXY(posX, posY);
			int sceneSysId = roleScene.getSceneSysId();
			long sceneUnitId = roleScene.getSceneUnitId();
			final Struct_map_200 sceneSys = Config_map_200.getIns().get(sceneSysId);
			roleScene.setRoute(null);
//			roleScene.setEndX(roleScene.getPosX());
//			roleScene.setEndY(roleScene.getPosY());
			final Object[] data = new Object[]{rid,posX,posY,SceneConst.PLAYER};
			if (SceneCache.boardSupplyWay(sceneSys.getSevertype())) {
				// ???????????????
				Integer[] sendArea = calcSendAreaByGridCoords(rowCol);
				if (sendArea == null)
					return;
				int line = getSupplySceneLine(hero, sceneSysId);
				for (Integer grid : sendArea) {
					ConcurrentSkipListSet<Hero> gridData = SceneCache.supplySceneHeroData.get(line,sceneUnitId, grid);
					if (gridData == null || data == null)
						continue;
					Hero h = null;
					for (Iterator<Hero> it = gridData.iterator(); it.hasNext();) {
						h = it.next();
						if (h!=null) {
							// ??????
							NettyWrite.writeData(h.getChannel(), data, SceneCmd.CG_FinishMove_3909);
//							System.err.println(hero.getName()+" stop move for:"+h.getName()+",grid:"+grid);
						}
					}
				}
			} else{
				// ?????????
				ConcurrentSkipListSet<Hero> gridData = SceneCache.copySceneHeroData.get(sceneUnitId);
				if (gridData == null || data == null)
					return;
				Hero h = null;
				for (Iterator<Hero> it = gridData.iterator(); it.hasNext();) {
					h = it.next();
					if (h!=null) {
						// ??????
						NettyWrite.writeData(h.getChannel(), data, SceneCmd.CG_FinishMove_3909);
					}
				}
			}
		} catch (Exception e) {
			LogTool.error(e, SceneFunction.class, hero.getId(),hero.getNameZoneid(), "stop move err");
		}
	}
	/**
	 * ?????????????????????
	 * @param robbert
	 */
	public void stopMove(Robbert robbert){
		if(robbert==null) return;
		try {
			int posX = robbert.getPosX();
			int posY = robbert.getPosY();
			int rowCol = getGridRowColMixByPosXY(posX, posY);
			long sceneUnitId = robbert.getSceneUnitId();
			robbert.setSpeed(0);
			long id=robbert.getId()*-1;
			final Object[] data = new Object[]{id,robbert.getNpcType()};
			if (SceneCache.boardSupplyWay(robbert.getSceneType())) {
				// ???????????????
				Integer[] sendArea = calcSendAreaByGridCoords(rowCol);
				if (sendArea == null)
					return;
				for(int line:SceneCache.getAllLine()){
					for (Integer grid : sendArea) {
						boardCastRoleOneWay(SceneCache.supplySceneHeroData.get(line,sceneUnitId, grid), data, SceneCmd.CG_FinishMove_3909, id,true);
					}
				}
			} else{
				// ?????????
				boardCastRoleOneWay(SceneCache.copySceneHeroData.get(sceneUnitId), data, SceneCmd.CG_FinishMove_3909, id,true);
			}
		} catch (Exception e) {
			LogTool.error(e, SceneFunction.class, "robbert  stop move err");
		}
	}
	/**
	 * ???????????????NPC??????
	 * @param hero
	 * @param npcUid npc??????id
	 * @param dis ???????????????==0??????????????????
	 * @return
	 */
	public boolean validateNPCDistance(Hero hero,long npcUid,int dis){
		NPC npc = SceneCache.npcCache.get(npcUid);
		if(npc==null) return false;
		return validateNPCDistance(hero, npc.getPosX(),npc.getPosY(),dis);
	}
	/**
	 * ???????????????????????????npc???????????????????????????NPC???????????????????????????NPC??????
	 * @param hero
	 * @param npcSysId npc??????id
	 * @return
	 */
	public boolean validateNPCDistanceOnSupplyScene(Hero hero,int npcSysId){
		if(hero.getCrossChannel()!=null){
			CrossData crossData = new CrossData(CrossEnum.blockType.name(),BlockType.valiDis);
			crossData.putObject(CrossEnum.npcSysId.name(), npcSysId);
			crossData.putObject(CrossEnum.dis.name(), 0);
			CrossData cd = NettyWrite.writeBlockData(hero.getCrossChannel(), /*CrossConst.TEST_CROSS*/99999,hero.getId(),crossData);
			boolean rtn =cd.getObject(CrossEnum.rtn.name(),boolean.class);
			return rtn;
		}
		if(hero.getScene().getSceneType()!=SceneConst.IS_SUPPLY_SCENE) return false;
		int[] is = SceneCache.npcSysCache.get(hero.getScene().getSceneSysId(),npcSysId);
		if(is==null){
			LogTool.warn("vailidate npc distance fail,sceneid:"+hero.getScene().getSceneSysId()+",npcid:"+npcSysId, SceneFunction.class);
			return false;
		}
		return validateNPCDistance(hero, is[0],is[1],0);
	}
	
	public boolean validateNPCDistance(Hero hero,int npcPosX,int npcPosY,int dis){
		if(hero.getCrossChannel()!=null){
			CrossData crossData = new CrossData(CrossEnum.blockType.name(),BlockType.valiDis);
			crossData.putObject(CrossEnum.x.name(), npcPosX);
			crossData.putObject(CrossEnum.y.name(), npcPosY);
			crossData.putObject(CrossEnum.dis.name(), dis);
			CrossData cd = NettyWrite.writeBlockData(hero.getCrossChannel(), 99999,hero.getId(),crossData);
			boolean rtn =cd.getObject(CrossEnum.rtn.name(),boolean.class);
			return rtn;
		}
		int rolePosX = hero.getScene().getPosX();
		int rolePosY = hero.getScene().getPosY();
		return validateDistance(rolePosX, rolePosY, npcPosX, npcPosY, dis);
	}
	
	/**
	 * ??????????????????????????????npc??????????????????
	 * @author lobbyer
	 * @param hero
	 * @param sceneId
	 * @param npcSysId
	 * @return
	 * @date 2016???3???23???
	 */
	public boolean checkNPCDistanceByScene(Hero hero,int sceneId,int npcSysId) {
		if(hero.getScene().getSceneSysId() != sceneId) return false;
		int[] is = SceneCache.npcSysCache.get(sceneId,npcSysId);
		if(is==null){
			LogTool.warn("checkNPCDistanceByScene npc distance fail,sceneid:"+sceneId+",npcid:"+npcSysId, SceneFunction.class);
			return false;
		}
		return validateNPCDistance(hero, is[0], is[1], 0);
	}
	
	/**
	 * ??????????????????
	 * @param x
	 * @param y
	 * @param tarx
	 * @param tary
	 * @param dis ???0?????????????????????
	 * @return
	 */
	public boolean validateDistance(int x,int y,int tarx,int tary,int dis){
		int distanceX = Math.abs((x-tarx));
		int distanceY = Math.abs((y-tary));
//		System.err.println("rolePosX:"+rolePosX+",rolePosY:"+rolePosY+",npcPosX:"+npcPosX+",npcPosY:"+npcPosY);
		int distance = distanceX*distanceX + distanceY*distanceY;
		if(dis==0){
			if(distance > SceneConst.MAX_DISTANCE){
				LogTool.warn("distance:"+distance+",max:"+SceneConst.MAX_DISTANCE+",x:"+x+",y:"+y+",tarx:"+tarx+",tary:"+tary, SceneFunction.class);
				return false;
			}
		}else{
			if(distance > dis)return false;
		}
		return true;
	}
	
	/**
	 * ??????????????????????????????????????????????????????
	 * @param pointA ????????????????????????int[posX,poxY]??????
	 * @param pointB ????????????????????????int[posX,poxY]??????
	 * @param dis ???????????????=0??????????????????
	 * @return true???????????????false???????????????
	 */
	public boolean validatePointsDistance(int[] pointA, int[] pointB, int dis){
		if(dis==0){
			return false;
		}
		int pointAX = pointA[0];
		int pointAY = pointA[1];
		int pointBX = pointB[0];
		int pointBY = pointB[1];
		int distanceX = Math.abs(pointAX - pointBX);
		int distanceY = Math.abs(pointAY - pointBY);
		int distance = distanceX*distanceX + distanceY*distanceY;
		if(distance < dis)return true;
		return false;
	}
	
	/**
	 * ?????????????????????????????????
	 * @param pointAX
	 * @param pointAY
	 * @param pointBX
	 * @param pointBY
	 * @return
	 */
	public int getPointsDistance(int pointAX, int pointAY, int pointBX, int pointBY){
		int distanceX = Math.abs(pointAX - pointBX);
		int distanceY = Math.abs(pointAY - pointBY);
		return distanceX*distanceX + distanceY*distanceY;
	}
	
	/**
	 * ????????????
	 * @param hero
	 * @param data ????????????
	 */
	public void chatOnNear(Hero hero,Response response){
		Scene scene = hero.getScene();
		int posX = scene.getPosX();
		int posY = scene.getPosY();
		long sceneUnitId = scene.getSceneUnitId();
		int rowCol = getGridRowColMixByPosXY(posX, posY);
		int sceneType = scene.getSceneType();
		if (SceneCache.boardSupplyWay(sceneType)) {
			// ???????????????
			Integer[] sendArea = calcSendAreaByGridCoords(rowCol);
			if (sendArea == null)
				return;
			int line = getSupplySceneLine(hero, scene.getSceneSysId());
			// ??????
			for (Integer grid : sendArea) {
				ConcurrentSkipListSet<Hero> set = SceneCache.supplySceneHeroData.get(line, sceneUnitId, grid);
				if(set==null) continue;
				for(Hero nearHero:set){
					//NettyWrite.writeData(nearHero.getId(), response);	
				}
			}
		} else {
			// ?????????
			ConcurrentSkipListSet<Hero> set = SceneCache.copySceneHeroData.get(sceneUnitId);
			for(Hero nearHero:set){
				if(set==null) continue;
				//NettyWrite.writeData(nearHero.getId(), response);	
			}
		}
	}
	/**
	 * ?????????????????????npc
	 * 
	 * @param sceneUnitId
	 *            ????????????id
	 * @param npcUnitId
	 * @param rid
	 */
	private void removeNpcFromCopyScene(long npcUnitId,int npcType) {
		NPC npc = SceneCache.removeFromNPCCache(npcUnitId);
		if(npc==null){
			return;
		}
		long sceneUnitId = npc.getSceneUnitId();
		SceneCache.removeNpcFromCopyScene(sceneUnitId, npc);
		npcUnitId = npcUnitId * -1;
		ConcurrentSkipListSet<Hero> grid = SceneCache.copySceneHeroData.get(sceneUnitId);
		if (grid == null)
			return;
		for (Hero hero : grid) {
			NettyWrite.writeData(hero.getChannel(), new Object[] { npcUnitId, npcType }, SceneCmd.GC_Delhero_3906);
		}
	}
	/*public void removeBattleNpcFromCopyScene(long npcUnitId) {
		removeNpcFromCopyScene(npcUnitId, SceneConst.ZHANDOU_NPC);
	}
	public void removeNoBattleNpcFromCopyScene(long npcUnitId) {
		removeNpcFromCopyScene(npcUnitId, SceneConst.NPC);
	}*/
	/**
	 * ???????????????????????????npc 
	 * @param sceneUnitId ??????????????????id
	 * @param npcUnitId
	 */
	private void removeNpcFromSupplyScene(long npcUnitId,int npcType) {
		NPC npc = SceneCache.removeFromNPCCache(npcUnitId);
		if(npc==null) return;
		long sceneUnitId = npc.getSceneUnitId();
		int rowCol = getGridRowColMixByPosXY(npc.getPosX(),npc.getPosY());
		Integer[] sendArea = calcSendAreaByGridCoords(rowCol);
		if (sendArea == null) return;
		SceneCache.removeNpcFromSupplyScene(sceneUnitId, rowCol, npc);
		
		npcUnitId = npcUnitId*-1;
		Set<Integer> allLine = SceneCache.getAllLine();
		for(Integer line:allLine){
			//??????????????????????????????
			for (Integer grid : sendArea) {
				ConcurrentSkipListSet<Hero> gridData = SceneCache.supplySceneHeroData.get(line, sceneUnitId, grid);
				if(gridData==null){
					continue;
				}
				for (Hero hero : gridData) {
//					logger.info("remove npc,hero id:" + hero.getId() + "; name:" + hero.getName()+",npcId:"+npcUnitId+",npctype:"+npcType);
					NettyWrite.writeData(hero.getChannel(), new Object[] { npcUnitId, npcType }, SceneCmd.GC_Delhero_3906);
				}
			}
		}
	}
	/**
	 * ???????????????npc
	 * @param npcid npc??????id
	 */
	public void removeNpcFromScene(long npcid){
		NPC npc = SceneCache.getFromNPCCache(npcid);
		removeNpcFromScene(npc);
	}
	/**
	 * ???????????????npc
	 * @param npc npc??????
	 */
	public void removeNpcFromScene(NPC npc){
		if(npc==null) return;
		int clientNpcType = npc.getClientNpcType();
		int sceneSysId = npc.getSceneSysId();
		if(SceneCache.boardSupplyWay(Config_map_200.getIns().get(sceneSysId).getSevertype())){
			//????????????
			removeNpcFromSupplyScene(npc.getId(), clientNpcType);
		}else{
			//??????
			removeNpcFromCopyScene(npc.getId(), clientNpcType);
		}
	}
	
	/**
	 * ????????????????????????npc 
	 * @param sceneUnitId ??????????????????id
	 * @param npcUnitId
	 */
//	public void removeBattleNpcFromSupplyScene(long npcUnitId) {
//		removeNpcFromSupplyScene(npcUnitId, SceneConst.ZHANDOU_NPC);
//	}
	/**
	 * ???????????????????????????npc 
	 * @param sceneUnitId ??????????????????id
	 * @param npcUnitId
	 */
//	public void removeNoBattleNpcFromSupplyScene(long npcUnitId) {
//		removeNpcFromSupplyScene(npcUnitId, SceneConst.NPC);
//	}
	/**
	 * ??????hero????????????????????????<br/>
	 * ????????????????????????????????????NORMAL<br/>
	 * ???????????????
	 * ?????????????????????BATTLE???????????????????????????NORMAL?????????override battlecallback???handleSceneState???????????????FROZEN
	 * @param hero
	 */
	public void setSceneStateNormal(Hero hero){
		if(hero==null) return;
		try {
			hero.setSceneState(SceneConst.STATE_NORMAL);
			boardcastNewState(hero, SceneXData.act_st, hero.getSceneState(), false);
		} catch (Exception e) {
			LogTool.errmsg(e);
		}
	}
	/**
	 * ??????????????????
	 * @param hero hero
	 * @param state ?????????????????????SceneConst.STATE_NORMAL,SceneConst.STATE_BATTLESceneConst.STATE_FROZEN
	 */
	public void setSceneState(Hero hero,int state){
		if(hero==null) return;
		try {
			if(state!=SceneConst.STATE_NORMAL && state!=SceneConst.STATE_BATTLE && state!=SceneConst.STATE_FROZEN){
				LogTool.warn("hid:"+hero.getId()+","+hero.getNameZoneid()+"set scene state,but state is:"+state, SceneFunction.class);
				return;
			}
			hero.setSceneState(state);
			boardcastNewState(hero, SceneXData.act_st, hero.getSceneState(), false);
		} catch (Exception e) {
			LogTool.errmsg(e);
		}
	}
	/**
	 * ???????????????????????????????????????????????????
	 * @param battleType
	 */
	/*public void setSceneStateNormal(int battleType){
		Map<Long, BattleFuHuo> map = BattleCache.getFuhuoMap().get(battleType);
		if(map!=null){
			for(Long hid:map.keySet()){
				Hero h = HeroCache.getHero(hid);
				if(h!=null){
					setSceneStateNormal(h);
				}
			}
		}
	}*/
	/**
	 * ?????????????????????????????????????????????
	 * @param sceneUid
	 * @param sceneSysId
	 */
	public void setSceneStateNormal(long sceneUid,int sceneSysId){
		try {
			Struct_map_200 map = Config_map_200.getIns().get(sceneSysId);
			if(map!=null){
				if(SceneCache.boardSupplyWay(map.getSevertype())){
					Map<Integer, Map<Long, Map<Integer, ConcurrentSkipListSet<Hero>>>> sm = SceneCache.supplySceneHeroData.get();
					for(Map<Long, Map<Integer, ConcurrentSkipListSet<Hero>>> m:sm.values()){
						Map<Integer, ConcurrentSkipListSet<Hero>> m2 = m.get(sceneUid);
						if(m2!=null){
							for(ConcurrentSkipListSet<Hero> set:m2.values()){
								for(Hero h:set){
									setSceneStateNormal(h);
								}
							}
						}
					}
				}else{
					Map<Long, ConcurrentSkipListSet<Hero>> cm = SceneCache.copySceneHeroData.get();
					ConcurrentSkipListSet<Hero> set = cm.get(sceneUid);
					if(set!=null){
						for(Hero h:set){
							setSceneStateNormal(h);
						}
					}
				}
			}
		} catch (Exception e) {
			LogTool.errmsg(e);
		}
	}
	/**
	 * ??????????????????????????????????????????
	 * @param team
	 * @return
	 */
	/*public boolean checkTeamMemOnSameScene(Team team){
		try {
			Hero leaderHero = team.getLeaderHero();
			if(leaderHero==null){
				logger.warn("checkTeamMemOnSameScene,but leader hero is null,leader:"+team.getLeader());
				return false;
			}
			long leader = team.getLeader();
			Scene scene = leaderHero.getScene();
			int sceneUnitId = scene.getSceneUnitId();
			Map<Long, TeamMember> members = team.getMembers();
			for(Long mid:members.keySet()){
				if(mid!=leader){
					Hero h = HeroCache.getHero(mid);
					if(h==null){
						logger.warn("checkTeamMemOnSameScene,but member hero is null,mid:"+mid);
						return false;
					}
					if(sceneUnitId !=h.getScene().getSceneUnitId()){
						TeamSender.sendCmd_3106(leader, 19, h.getNameZoneid());
						return false;
					}
				}
			}
			return true;
		} catch (Exception e) {
			logger.error(LogFormat.exception(e));
			return false;
		}
	}
	
	
	*//**
	 * ??????????????????
	 * @param team ??????
	 * @param newSceneSysId ???????????????id
	 * @param newSceneUnitId ???????????????id
	 * @param newPosX ?????????x
	 * @param newPosY ?????????y
	 *//*
	public void forceTeamJump(Team team,int newSceneSysId,int newSceneUnitId,int newPosX,int newPosY){
		Hero leaderHero = checkTeamMemForceJump(team);
		SceneFunction.getIns().changeScene(leaderHero, newSceneSysId, newPosX, newPosY, newSceneUnitId);
	}
	
	*//**
	 * ??????????????????
	 * @param team ??????
	 * @param newSceneSysId ???????????????id
	 * @param newSceneUnitId ???????????????id
	 * @param newPosX ?????????x
	 * @param newPosY ?????????y
	 *//*
	public void forceTeamJumpToRandomPoint(Team team,int newSceneSysId,int newSceneUnitId){
		Hero leaderHero = checkTeamMemForceJump(team);
		
		int[] rect = SceneEventFunction.getRandomPosFromRect(newSceneSysId);
		if(rect!=null){
			SceneFunction.getIns().changeScene(leaderHero, newSceneSysId, rect[0], rect[1],newSceneUnitId);
		}else{
			ArrayList<RowCol> list = SceneCache.getCanWalk(newSceneSysId);
			if(list==null){
				logger.warn(LogFormat.rec(leaderHero.getId(),leaderHero.getNameZoneid(),"changeToRandomPoint canwalk list is null,newSceneSysId:"+newSceneSysId));
				return;
			}
			RowCol pos = SceneEventFunction.getNewPosByRandom(list);
			SceneFunction.getIns().changeScene(leaderHero, newSceneSysId, pos.getCol()*SceneConst.CANWARL_POSX_TRANS, pos.getRow()*SceneConst.CANWARL_POSX_TRANS,newSceneUnitId);
		}
	}
	
	*//**
	 * ????????????????????????
	 * @param sceneUnitId ????????????id
	 *//*
	public void exitSceneForTeam(int sceneUnitId,int sceneSysId){
		ConcurrentSkipListSet<Team> set = TeamCache.getSceneTeamMap().get(sceneUnitId);
		if(set!=null){
			logger.info("exitSceneForTeam,sceneUnitId:"+sceneUnitId+",sceneSysId:"+sceneSysId);
			for(Team team:set){
				Hero leaderHero = checkTeamMemForceJump(team);
				if(leaderHero!=null){
					logger.info("exit scene team,team leader:"+team.getLeader()+",name:"+leaderHero.getNameZoneid());
					SceneEventFunction.changeToPreSupplyScene(leaderHero);
				}
			}
		}
	}
	private Hero checkTeamMemForceJump(Team team){
		Map<Long, TeamMember> members = team.getMembers();
		Hero leaderHero = team.getLeaderHero();
		for(TeamMember member:members.values()){
			if(member.getState()!=TeamConst.STATE_FOLLOW){
				TeamManager.getIns().kickOut(leaderHero, member.getHid());
			}
		}
		return leaderHero;
	}*/
	
	/**
	 * ???????????????id???
	 * @param sceneUid ????????????id
	 * @param sceneSysId ????????????id
	 * @return
	 */
	public List<Long> getSceneHero(long sceneUid,int sceneSysId){
		List<Long> list = new ArrayList<Long>();
		try {
			Struct_map_200 Struct_map_200 = Config_map_200.getIns().get(sceneSysId);
			if(SceneCache.boardSupplyWay(Struct_map_200.getSevertype())){
				//??????????????????
				Iterator<Entry<Integer, Map<Long, Map<Integer, ConcurrentSkipListSet<Hero>>>>> it1 = SceneCache.supplySceneHeroData.get().entrySet().iterator();
				while(it1.hasNext()){
					Map<Integer, ConcurrentSkipListSet<Hero>> map = it1.next().getValue().get(sceneUid);
					if(map!=null){
						Collection<ConcurrentSkipListSet<Hero>> values = map.values();
						if(values!=null){
							for(ConcurrentSkipListSet<Hero> set:values){
								if(set!=null){
									for(Hero hero:set){
										list.add(hero.getId());
									}
								}
							}
						}
					}
				}
			}else{
				//????????????
				ConcurrentSkipListSet<Hero> set = SceneCache.copySceneHeroData.get(sceneUid);
				for(Hero hero:set){
					list.add(hero.getId());
				}
			}
		} catch (Exception e) {
			LogTool.error(e, SceneFunction.class, "SceneFunction getSceneHero an error.sceneUid="+sceneUid+" sceneSysId="+sceneSysId);
		}
		return list;
	}
	
	/**
	 * ?????????????????????????????????????????????????????????????????????
	 * @param hero
	 * @param data
	 * @param cmd
	 * @param includeMySelf
	 */
	public void board(Hero hero,Object[] data,int cmd,boolean includeMySelf){
		try {
			if(includeMySelf)
				NettyWrite.writeData(hero.getChannel(), data, cmd);
			Scene scene = hero.getScene();
			if(scene==null) return;
			long hid = hero.getId();
			int posX = scene.getPosX();
			int posY = scene.getPosY();
			long sceneUnitId = scene.getSceneUnitId();
			if (SceneCache.boardSupplyWay(hero.getScene().getSceneType())) {
				int rowCol = SceneFunction.getIns().getGridRowColMixByPosXY(posX, posY);
				Integer[] sendArea = SceneFunction.getIns().calcSendAreaByGridCoords(rowCol);
				if (sendArea == null) return;
				int line = SceneFunction.getIns().getSupplySceneLine(hero, scene.getSceneSysId());
				// ??????
				for (Integer grid : sendArea) {
					ConcurrentSkipListSet<Hero> set = SceneCache.supplySceneHeroData.get(line, sceneUnitId, grid);
					if(set==null) continue;
					for(Hero nearHero:set){
						if(nearHero.getId()!=hid)
							NettyWrite.writeData(nearHero.getChannel(), data, cmd);
					}
				}
			}else{
				ConcurrentSkipListSet<Hero> set = SceneCache.copySceneHeroData.get(sceneUnitId);
				for(Hero nearHero:set){
					if(nearHero.getId()!=hid)
						NettyWrite.writeData(nearHero.getChannel(), data, cmd);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, SceneFunction.class,hero.getId(), hero.getNameZoneid(), "cmd:"+cmd);
		}
	}
	
	public static void main(String[] args) {
		int a = SceneFunction.getIns().getGridRowColMixByPosXY(2400,1644);
		int b = SceneFunction.getIns().getGridRowColMixByPosXY(1200,544);
		int c = SceneFunction.getIns().getGridRowColMixByPosXY(1152,384);
		System.err.println("a:"+a+",b:"+b+",c:"+c);
	}
	
	/**
	 * ?????????scene
	 * 
	 * @param hero
	 */
	public Scene initScene(long hid) {
		Scene scene = new Scene();
		scene.setHid(hid);
		int sceneId = SceneConst.ID_SCENE_DONG_XI;
		scene.setSceneSysId(sceneId);
		scene.setSceneUnitId(sceneId);
		scene.setDirection(4);
		scene.setSceneType(SceneConst.IS_SUPPLY_SCENE);
		ScenePosXYArea posXY = SceneCache.startPointMap.get(sceneId);
		scene.setPosX(posXY.getPosX());
		scene.setPosY(posXY.getPosY());
		if(scene.getMoveSpeed()==0)
			scene.setMoveSpeed( SceneConst.SPEED_INIT);
		return scene;
	}
	
	
}

