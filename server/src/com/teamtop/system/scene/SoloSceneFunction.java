package com.teamtop.system.scene;


import java.util.HashMap;
import java.util.Iterator;
import java.util.concurrent.ConcurrentSkipListSet;

import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.NPC.NPC;
import com.teamtop.system.crossWenDingTianXia.cross.CrossWenDingTianXiaCrossFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.util.log.LogTool;

import excel.config.Config_map_200;

public class SoloSceneFunction {
	private static SoloSceneFunction ins = null;
	public static SoloSceneFunction getIns(){
		if(ins==null){
			ins = new SoloSceneFunction();
		}
		return ins;
	}

	/**
	 * 移动
	 * @param hero
	 * @param route
	 * @param rowCol
	 * @param isMoveStop
	 */
	public void move(final Hero hero,final Integer[][] route,final  int rowCol,boolean isMoveStop) {
		long hid = hero.getId();
		final Scene roleScene = hero.getScene();
		/*if(PracticeFunction.getIns().isHang(hero)){
			PracticeManager.getIns().reqHang(hero, 1);
		}*/
		final long sceneId = roleScene.getSceneUnitId();
		final int sceneType = roleScene.getSceneType();
		final int endX = route[route.length-1][0];
		final int endY = route[route.length-1][1];
//		System.err.println("endx:"+endX+",endy:"+endY);
		//设置终点坐标
		roleScene.setEndX(endX);
		roleScene.setEndY(endY);
		if(isMoveStop){
			roleScene.setPosX(endX);
			roleScene.setPosY(endY);
		}
		roleScene.setRoute(route);
		SceneFunction sceneFunction = SceneFunction.getIns();
		Object[] roleData = sceneFunction.getMoveSendData(hero, route);
		if (SceneCache.boardSupplyWay(sceneType)) {
			// 在补给地图
			Integer[] sendArea = sceneFunction.calcSendAreaByGridCoords(rowCol);
			if (sendArea == null)
				return;
			int line = sceneFunction.getSupplySceneLine(hero, roleScene.getSceneSysId());
			for (Integer grid : sendArea) {
				sceneFunction.boardCastRoleOneWay(SceneCache.supplySceneHeroData.get(line, sceneId, grid), roleData, SceneCmd.GC_FinishMove_3910, hid,true);
			}
		} else{
			// 在副本
			sceneFunction.boardCastRoleOneWay(SceneCache.copySceneHeroData.get(sceneId), roleData, SceneCmd.GC_FinishMove_3910, hid,true);
		}
	}

	// 同步坐标XY
	public void syncPosXY(Hero hero, int posX, int posY, int preRowCol, int rowCol, int[][] addDelGrids,SceneHeroDataType type) {
		Scene roleScene = hero.getScene();
		// 修改坐标
		roleScene.setPosX(posX);
		roleScene.setPosY(posY);
//		System.err.println(LogFormat.rec(hero.getId(), hero.getName(), "set xy,posX:"+posX+",posY:"+posY+" rowCol="+rowCol+",preRowCol="+preRowCol));
		
		if (addDelGrids != null) {
//			System.err.println(LogFormat.rec(hero.getId(), hero.getName(), "syncPosXy,addDelGrids is not null"));
//			System.err.println("addGrid:"+Arrays.toString(addDelGrids[0])+",delGrid:"+Arrays.toString(addDelGrids[1]));
			SceneFunction sceneFunction = SceneFunction.getIns();
			int preRow = preRowCol / 1000;
			int preCol = preRowCol % 1000;
			int row = rowCol / 1000;
			int col = rowCol % 1000;
			long sceneUnitId = roleScene.getSceneUnitId();
			long rid = hero.getId();

			// 修改缓存
			int line = sceneFunction.getSupplySceneLine(hero, roleScene.getSceneSysId());
			SceneCache.removeFromSupplyScene(sceneUnitId, preRowCol, hero,line,false);
			SceneCache.addHeroToSupplyScene(sceneUnitId, rowCol, hero,line,false);

			int[] addGrids = addDelGrids[0];
			if(addGrids!=null && addGrids.length>0){
				// 添加玩家
                // Object[] addData = sceneFunction.getAddObjData(hero);
				HashMap<Object, Object> heroBoradData = null;
				/*if(type.equals(SceneHeroDataType.CS)){
					heroBoradData = CSFunction.getIns().getHeroData(hero);
				}else if(type.equals(SceneHeroDataType.RUNNING_MAN)){
					heroBoradData = RunningManFunction.getIns().getHeroData(hero);
				}else {
					heroBoradData = sceneFunction.getHeroBoradData(hero);
				}*/
				for (Integer grid : addGrids) {
					if (grid == null) {
						LogTool.warn("hid:"+hero.getId()+","+hero.getNameZoneid()+ "syncPosXY addGrid is null,row:" + row + ",col:" + col + ",preRow:" + preRow + ",preCol:" + preCol, SoloSceneFunction.class);
						break;
					}
//					System.err.println("hero meet npc,add grid:"+grid+",rowcol:"+rowCol+",preRowcol:"+preRowCol);
					ConcurrentSkipListSet<NPC> npcSet = SceneCache.supplySceneNpcCache.get(sceneUnitId, grid);
					sceneFunction.heroMeetNpc( npcSet, hero);
					//sceneFunction.heroMeetHero(SceneCache.supplySceneHeroData.get(line, sceneUnitId, grid), hero,heroBoradData,true,type);
					//TODO 添加挂机机器人
//					sceneFunction.heroMeetHangRobbert(sceneUnitId, grid, hero);
					ConcurrentSkipListSet<Hero> gridData = SceneCache.supplySceneHeroData.get(line, sceneUnitId, grid);
					if (gridData == null) continue;
					long hid = hero.getId();
					Hero nearHero = null;
					int i = 0;
					for (Iterator<Hero> it = gridData.iterator(); it.hasNext();) {
						nearHero = it.next();
						if (nearHero != null && nearHero.getId() != hid) {
							if(heroBoradData==null){
//								if(type.equals(SceneHeroDataType.CS)){
//									heroBoradData = CSFunction.getIns().getHeroData(hero);
//								}else if(type.equals(SceneHeroDataType.RUNNING_MAN)){
//									heroBoradData = RunningManFunction.getIns().getHeroData(hero);
//								}else {
									heroBoradData = sceneFunction.getHeroBoradData(hero);
//								}
							}
							if (++i >= SceneCache.boardNum) break;
							if(nearHero.getChannel()==null){
								LogTool.warn("hero meet hero,add near hero,hero:"+nearHero.toString(), SoloSceneFunction.class);
								it.remove();
							}else{
								NettyWrite.writeXData(nearHero.getChannel(), SceneCmd.GC_Addhero_3904, heroBoradData);
								HashMap<Object, Object> nearHeroBoradData=sceneFunction.getHeroBoradData(nearHero);
								NettyWrite.writeXData(hero.getChannel(), SceneCmd.GC_Addhero_3904, nearHeroBoradData);
//								System.out.println("场景玩家互相添加玩家XY，玩家1："+heroBoradData.get(SceneXData.name)+" x"+heroBoradData.get(SceneXData.gX)+" y"+heroBoradData.get(SceneXData.gY)+
//										" 玩家2:"+nearHeroBoradData.get(SceneXData.name)+" x"+nearHeroBoradData.get(SceneXData.gX)+" y"+nearHeroBoradData.get(SceneXData.gY));//TODO

								// 添加玩家各个系统的信息
//								Object[] yellowState=DiamondYellowFunction.getIns().isShowDiamondYellow(nearHero,hero.getDiamond());
//								heroBoradData.put(HeroXData.yellowState, yellowState);
								int sceneType = roleScene.getSceneType();
								
								//各个系统要额外发的姿态
								if(sceneType == SceneConst.IS_WEN_DING_TIAN_DAO){
									CrossWenDingTianXiaCrossFunction.getIns().reflashHeroMeetHeroState(hid, nearHero.getId());;
//									NettyWrite.writeXData(nearHero.getChannel(), CSCmd.GC_AddHero_6100, heroBoradData);
//									NettyWrite.writeXData(hero.getChannel(), CSCmd.GC_AddHero_6100, CSFunction.getIns().getHeroData(nearHero));
//								}else if(type.equals(SceneHeroDataType.RUNNING_MAN)){
//									NettyWrite.writeXData(nearHero.getChannel(), RunningManCmd.GC_AddHero_6730, heroBoradData);
//									NettyWrite.writeXData(hero.getChannel(),RunningManCmd.GC_AddHero_6730, RunningManFunction.getIns().getHeroData(nearHero));
								}
							}
							int heroPosX = hero.getScene().getPosX();
							int heroPosY = hero.getScene().getPosY();
							int nearHeroPosX = nearHero.getScene().getPosX();
							int nearHeroPosY = nearHero.getScene().getPosY();
//							logger.info("角色:"+hero.getName()+",rowcol:"+sceneFunction.getGridRowColMixByPosXY(heroPosX, heroPosY)+",pos:("+heroPosX+","+heroPosY+
//									")与角色:"+nearHero.getName()+",rowcol:"+sceneFunction.getGridRowColMixByPosXY(nearHeroPosX, nearHeroPosY)+",pos:("+nearHeroPosX+","+nearHeroPosY+") 互相添加.");
//							System.err.println("角色:"+hero.getName()+","+hero.getSceneShowData()+",posX:"+hero.getScene().getPosX()+",posY:"+hero.getScene().getPosY()+",route:"+hero.getScene().getRoute());
//							System.err.println("角色:"+nearHero.getName()+","+Arrays.toString(nearHero.getSceneShowData())+",posX:"+nearHero.getScene().getPosX()+",posY:"+nearHero.getScene().getPosY()+",route:"+nearHero.getScene().getRoute());
//							System.err.println("角色:"+hero.getName()+","+hero.getSceneShowData()+",posX:"+hero.getScene().getPosX()+",posY:"+hero.getScene().getPosY()+",route:"+hero.getScene().getRoute());
//							System.err.println("角色:"+nearHero.getName()+","+nearHero.getSceneShowData()+",posX:"+nearHero.getScene().getPosX()+",posY:"+nearHero.getScene().getPosY()+",route:"+nearHero.getScene().getRoute());
						}
					}
				}
			}

			// 删除玩家
			int[] delGrids = addDelGrids[1];
			Object[] delData = new Object[] { rid, SceneConst.PLAYER };
			for (Integer grid : delGrids) {
				if (grid == null) {
					LogTool.warn("hid:"+hero.getId()+","+hero.getNameZoneid()+"syncPosXY delGrid is null,row:" + row + ",col:" + col + ",preRow:" + preRow + ",preCol:" + preCol, SoloSceneFunction.class);
					break;
				}
				sceneFunction.delHero(SceneCache.supplySceneHeroData.get(line, sceneUnitId, grid), hero, delData, true);
				sceneFunction.delNpc(SceneCache.supplySceneNpcCache.get(sceneUnitId, grid), hero);
			}
		}
	}
	
	

	//转换场景
	public void changeScene(Hero hero,long nowSceneUnitId,int nowSceneSysId,long newSceneUnitId,int newSceneSysId,int newPosX,int newPosY,boolean nowSceneIsSingle){
		SceneFunction sceneFunction = SceneFunction.getIns();
		if(nowSceneIsSingle){
			//现在处于单人副本
			//有可能爬塔内，玩家是队长点击退出队伍，此时场景里可能还有其他队员
			boolean del = true;
			/*ConcurrentSkipListSet<Team> set = TeamCache.getSceneTeamMap().get(nowSceneUnitId);
			if(set!=null){
				for(Team team:set){
					for(TeamMember member:team.getMembers().values()){
						if(member.getHid()!=hero.getId()){
							del = false;
							break;
						}
					}
				}
			}*/
			if(del){
				sceneFunction.delScene(nowSceneUnitId,Config_map_200.getIns().get(nowSceneSysId).getSevertype());
			}else{
				sceneFunction.delHeroFromScene(hero);
			}
		}else{
			sceneFunction.delHeroFromScene(hero);
		}
		sceneFunction.setRoleNewSceneData(hero, newSceneUnitId, newSceneSysId, newPosX, newPosY);
	}
	
	// 切换场景OK
	public void changeSceneOK(Hero hero) {
		SceneFunction.getIns().addHeroToScene(hero);
	}
	
	/**
	 * 获取同屏所有玩家
	 */
	public void getNearHero(Hero hero, int rowCol, int[][] addDelGrids,SceneHeroDataType type) {
		Scene sceneHero = hero.getScene();
		// 修改坐标
		int posX = sceneHero.getPosX();
		int posY = sceneHero.getPosY();
		if (addDelGrids != null) {
			SceneFunction sceneFunction = SceneFunction.getIns();
			int row = rowCol / 1000;
			int col = rowCol % 1000;
			long sceneUnitId = sceneHero.getSceneUnitId();
			long rid = hero.getId();
			int line = sceneFunction.getSupplySceneLine(hero, sceneHero.getSceneSysId());

			int[] addGrids = addDelGrids[0];
			if(addGrids!=null && addGrids.length>0){
				for (Integer grid : addGrids) {
					ConcurrentSkipListSet<Hero> gridData = SceneCache.supplySceneHeroData.get(line, sceneUnitId, grid);
					if (gridData == null) continue;
					long hid = hero.getId();
					Hero nearHero = null;
					int i = 0;
					for (Iterator<Hero> it = gridData.iterator(); it.hasNext();) {
						nearHero = it.next();
						if (nearHero != null && nearHero.getId() != hid) {
							if (++i >= SceneCache.boardNum) break;
							if(nearHero.getChannel()==null){
								LogTool.warn("hero meet hero,add near hero,hero:"+nearHero.toString(), SoloSceneFunction.class);
								it.remove();
							}else{
//								NettyWrite.writeXData(nearHero.getChannel(), SceneCmd.GC_Addhero_3904, heroBoradData);
								HashMap<Object, Object> nearHeroBoradData=sceneFunction.getHeroBoradData(nearHero);
								NettyWrite.writeXData(hero.getChannel(), SceneCmd.GC_Addhero_3904, nearHeroBoradData);
//								System.out.println("场景玩家互相添加玩家XY，玩家1："+heroBoradData.get(SceneXData.name)+" x"+heroBoradData.get(SceneXData.gX)+" y"+heroBoradData.get(SceneXData.gY)+
//										" 玩家2:"+nearHeroBoradData.get(SceneXData.name)+" x"+nearHeroBoradData.get(SceneXData.gX)+" y"+nearHeroBoradData.get(SceneXData.gY));//TODO

								// 添加玩家各个系统的信息
//								Object[] yellowState=DiamondYellowFunction.getIns().isShowDiamondYellow(nearHero,hero.getDiamond());
//								heroBoradData.put(HeroXData.yellowState, yellowState);
								int sceneType = sceneHero.getSceneType();
								
								//各个系统要额外发的姿态
								if(sceneType == SceneConst.IS_WEN_DING_TIAN_DAO){
									CrossWenDingTianXiaCrossFunction.getIns().reflashHeroMeetHeroState(hid, nearHero.getId());;
//									NettyWrite.writeXData(nearHero.getChannel(), CSCmd.GC_AddHero_6100, heroBoradData);
//									NettyWrite.writeXData(hero.getChannel(), CSCmd.GC_AddHero_6100, CSFunction.getIns().getHeroData(nearHero));
//								}else if(type.equals(SceneHeroDataType.RUNNING_MAN)){
//									NettyWrite.writeXData(nearHero.getChannel(), RunningManCmd.GC_AddHero_6730, heroBoradData);
//									NettyWrite.writeXData(hero.getChannel(),RunningManCmd.GC_AddHero_6730, RunningManFunction.getIns().getHeroData(nearHero));
								}
							}
							int heroPosX = hero.getScene().getPosX();
							int heroPosY = hero.getScene().getPosY();
							int nearHeroPosX = nearHero.getScene().getPosX();
							int nearHeroPosY = nearHero.getScene().getPosY();
//							logger.info("角色:"+hero.getName()+",rowcol:"+sceneFunction.getGridRowColMixByPosXY(heroPosX, heroPosY)+",pos:("+heroPosX+","+heroPosY+
//									")与角色:"+nearHero.getName()+",rowcol:"+sceneFunction.getGridRowColMixByPosXY(nearHeroPosX, nearHeroPosY)+",pos:("+nearHeroPosX+","+nearHeroPosY+") 互相添加.");
//							System.err.println("角色:"+hero.getName()+","+hero.getSceneShowData()+",posX:"+hero.getScene().getPosX()+",posY:"+hero.getScene().getPosY()+",route:"+hero.getScene().getRoute());
//							System.err.println("角色:"+nearHero.getName()+","+Arrays.toString(nearHero.getSceneShowData())+",posX:"+nearHero.getScene().getPosX()+",posY:"+nearHero.getScene().getPosY()+",route:"+nearHero.getScene().getRoute());
//							System.err.println("角色:"+hero.getName()+","+hero.getSceneShowData()+",posX:"+hero.getScene().getPosX()+",posY:"+hero.getScene().getPosY()+",route:"+hero.getScene().getRoute());
//							System.err.println("角色:"+nearHero.getName()+","+nearHero.getSceneShowData()+",posX:"+nearHero.getScene().getPosX()+",posY:"+nearHero.getScene().getPosY()+",route:"+nearHero.getScene().getRoute());
						}
					}
				}
			}

			// 删除玩家
			int[] delGrids = addDelGrids[1];
			Object[] delData = new Object[] { rid, SceneConst.PLAYER };
			for (Integer grid : delGrids) {
				sceneFunction.delHero(SceneCache.supplySceneHeroData.get(line, sceneUnitId, grid), hero, delData, true);
				sceneFunction.delNpc(SceneCache.supplySceneNpcCache.get(sceneUnitId, grid), hero);
			}
		}
	}
}
