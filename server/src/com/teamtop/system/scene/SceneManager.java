package com.teamtop.system.scene;

import java.util.concurrent.ConcurrentSkipListSet;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.system.event.sceneEvent.AbsSceneEvent;
import com.teamtop.system.event.sceneEvent.SceneEventFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.TempData;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_map_200;

public class SceneManager {
	private static SceneManager ins = null;

	public static SceneManager getIns() {
		if (ins == null) {
			ins = new SceneManager();
		}
		return ins;
	}

	/**
	 * 切换场景
	 * 
	 * @param hero
	 * @param newSceneSysId
	 */
	public void inscene(Hero hero, int newSceneSysId) {
		try {
//			if (!checkSceneControlType(hero, newSceneSysId))
//			return;
		
			//不可以重复进入当前场景限制。现在的前端战斗是退出场景，打完重新跳入当前场景，所以要去掉这个限制
	//		if (!SceneFunction.getIns().canChangeScene(hero, newSceneSysId)) {
	//			return;
	//		}
			
			// if(!sysFunFunction.canUseFunction(OpenFunctionConst.CHANGESCENE,
			// hero,FunTipConst.DONT_USE_SHOES,false)){return;}
			int severtype = Config_map_200.getIns().get(newSceneSysId).getSevertype();
			AbsSceneEvent sceneEvent = SceneEventFunction.getSceneEvent(severtype);
			if (sceneEvent == null) {
				LogTool.warn("hid:"+hero.getId()+","+hero.getNameZoneid()+"changeScene get sceneEvent is null,newSceneSysId:" + newSceneSysId, SceneManager.class);
				return;
			}
			int newSceneUnitId = sceneEvent.beforeIn(hero, newSceneSysId);
			if (newSceneUnitId != 1) {
				sceneEvent.in(hero, newSceneSysId, newSceneUnitId);
	//			logger.info(LogFormat.rec(hero.getId(), hero.getName(), "before in rtn true,sceneEvent:"+sceneEvent));
			}/*else{
				logger.warn(LogFormat.rec(hero.getId(), hero.getName(), "before in rtn false,sceneEvent:"+sceneEvent));
			}*/
		} catch (Exception e) {
			LogTool.error(e, SceneManager.class, hero.getId(), hero.getName(), "SceneManager inscene newSceneSysId="+newSceneSysId);
		}
	}
	
	/**
	 * 切换场景
	 * @param hero
	 * @param newSceneSysId
	 */
	public void changeScene(Hero hero, int newSceneSysId ) {
		try {
			if (!SceneFunction.getIns().canChangeScene(hero, newSceneSysId)) {
				LogTool.warn("hid:"+hero.getId()+","+hero.getNameZoneid()+ "can not change scene,newSceneSysId:"+newSceneSysId, SceneManager.class);
				return;
			}
			// if(!sysFunFunction.canUseFunction(OpenFunctionConst.CHANGESCENE,
			// hero,FunTipConst.DONT_USE_SHOES,false)){return;}
			AbsSceneEvent sceneEvent = SceneEventFunction.getSceneEvent(Config_map_200.getIns().get(newSceneSysId).getSevertype());
			if (sceneEvent == null) {
				LogTool.warn("hid:"+hero.getId()+","+hero.getNameZoneid()+ "changeScene get sceneEvent is null,newSceneSysId:" + newSceneSysId, SceneManager.class);
				return;
			}
			int newSceneUnitId = sceneEvent.beforeIn(hero,newSceneSysId);
			if (newSceneUnitId != 1) {
				sceneEvent.in(hero, newSceneSysId, newSceneUnitId);
			}
		} catch (Exception e) {
			LogTool.error(e, SceneManager.class, hero.getId(), hero.getName(), "SceneManager changeScene newSceneSysId="+newSceneSysId);
		}
	}

	/**
	 * 移动完毕
	 * @param hero
	 */
	public void finishMove(Hero hero,int posX,int posY) {
		try {
			// 最后再同步一下坐标
			Scene scene = hero.getScene();
//			if(scene.getEndX()!=posX || scene.getEndY()!=posY){
//				System.err.println(hero.getName()+" stop move");
//				SceneFunction.getIns().stopMove(hero);
//			}
			scene.setRoute(null);
			syncPosXY(hero, posX, posY);
			/*Struct_monster_307 monsterNPC = Config_monster_307.getIns().get(50000001);
			Robbert npc=new Robbert();
			npc.setHp(monsterNPC.getQixue());
			npc.setHpMax(monsterNPC.getQixue());
			SceneFunction.getIns().addNPCToSceneInit(npc,50470001, posX, posY, -1, 30010001, 30010001, true);*/
//			System.err.println(hero.getName()+" 移动结束,endX:"+scene.getEndX()+",endY:"+scene.getEndY()+",px:"+posX+",py:"+posY);
		} catch (Exception e) {
			LogTool.error(e, SceneManager.class, hero.getId(), hero.getName(), "SceneManager finishMove posX="+posX+", posY="+posY);
		}
	}

	/**
	 * 同步坐标XY
	 * @param hero
	 * @param posX
	 * @param posY
	 */
	public void syncPosXY(final Hero hero, final int posX, final int posY) {
		try {
			Scene roleScene = hero.getScene();
			if(roleScene.getNewLocation()!=null){
				LogTool.warn("roleScene.getNewLocation()!=null", SceneManager.class);
				return;
			}
			int prePosX = roleScene.getPosX();
			int prePosY = roleScene.getPosY();
			int preRowCol = SceneFunction.getIns().getGridRowColMixByPosXY(prePosX, prePosY);
			int rowCol = SceneFunction.getIns().getGridRowColMixByPosXY(posX, posY);
			int preRow = preRowCol / 1000;
			int preCol = preRowCol % 1000;
			int row = rowCol / 1000;
			int col = rowCol % 1000;
			int offsetRow = row - preRow;
			int offsetCol = col - preCol;
			if (Math.abs(offsetRow) > 2 || Math.abs(offsetCol) > 2) {

			}
			int[][] addDelGrids = null;
			if (SceneCache.boardSupplyWay(roleScene.getSceneType())) {
				addDelGrids = SceneFunction.getIns().getAddDelByCalc(preRow, preCol, row, col);
			}
			SoloSceneFunction.getIns().syncPosXY(hero, posX, posY, preRowCol, rowCol, addDelGrids,SceneHeroDataType.NORMAL);
		} catch (Exception e) {
			LogTool.error(e, SceneManager.class, hero.getId(), hero.getName(), "SceneManager syncPosXY posX="+posX+", posY="+posY);
		}
	}

	/**
	 * 同步路径
	 * @param hero
	 * @param route
	 */
	public void syncRoute(Hero hero, Object[] xyArr) {
		try {
			int xyLen = xyArr.length;
			Integer[][] route = new Integer[xyLen][];
			for (int i = 0; i < xyLen; i++) {
				Object[] posArr = (Object[]) xyArr[i];
				int s = (Short) posArr[0];
				int e = (Short) posArr[1];
				route[i] = new Integer[] { s, e };
			}
			hero.getScene().setRoute(route);
			//System.err.println("learder route,path:"+Arrays.deepToString(route));
		} catch (Exception e) {
			LogTool.error(e, SceneManager.class, hero.getId(), hero.getName(), "SceneManager syncRoute");
		}
	}

	/**
	 * 离开场景
	 * @param hero
	 */
	public void exitScene(Hero hero) {
		try {
			SceneFunction.getIns().exitScene(hero,true);
		} catch (Exception e1) {
			LogTool.errmsg(e1);
		}
	}
	
	/**
	 * 移动(包括跳跃信息)
	 * @param routes 路径
	 */
	public void move(Hero hero, Object[] routes) {
		try {
			if (routes == null)
				return;
			int length = routes.length;
			if (length <= 0)
				return;
			final Integer[][] route = new Integer[length][];
			for (int i = 0; i < length; i++) {
				Object[] rouArr = (Object[]) routes[i];
				int s = (Short) rouArr[0];
				int e = (Short) rouArr[1];
				int t = (Byte)rouArr[2];
				route[i] = new Integer[] { s, e,t };
			}
			Scene roleScene = hero.getScene();
			int posX = roleScene.getPosX();
			int posY = roleScene.getPosY();
			int rowCol = SceneFunction.getIns().getGridRowColMixByPosXY(posX, posY);
			long hid = hero.getId();
			/*if(PracticeFunction.getIns().isHang(hero)){
				PracticeManager.getIns().reqHang(hero, 1);
			}*/
			final long sceneId = roleScene.getSceneUnitId();
			final int sceneType = roleScene.getSceneType();
			final int endX = route[route.length-1][0];
			final int endY = route[route.length-1][1];
//			System.err.println("endx:"+endX+",endy:"+endY);
			//设置终点坐标
			roleScene.setEndX(endX);
			roleScene.setEndY(endY);
			roleScene.setRoute(route);
			SceneFunction sceneFunction = SceneFunction.getIns();
			Object[] roleData = new Object[]{hero.getId(),SceneConst.PLAYER,routes};
			if (SceneCache.boardSupplyWay(sceneType)) {
				// 在补给地图
				Integer[] sendArea = sceneFunction.calcSendAreaByGridCoords(rowCol);
				if (sendArea == null)
					return;
				int line = sceneFunction.getSupplySceneLine(hero, roleScene.getSceneSysId());
				for (Integer grid : sendArea) {
					ConcurrentSkipListSet<Hero> listSet = SceneCache.supplySceneHeroData.get(line, sceneId, grid);
					sceneFunction.boardCastRoleOneWay(listSet, roleData, SceneCmd.GC_Move_3908, hid,true);
				}
			} else{
				// 在副本
				sceneFunction.boardCastRoleOneWay(SceneCache.copySceneHeroData.get(sceneId), roleData, SceneCmd.GC_Move_3908, hid,true);
			}
//			System.out.println("移动角色："+hero.getNameZoneid()+" 到X："+endX+" y:"+endY);
		} catch (Exception e) {
			LogTool.error(e, SceneManager.class, hero.getId(), hero.getName(), "SceneManager move");
		}
	}

	/**
	 * 成功进入场景
	 * 
	 * @param hero
	 */
	public void succEnterScene(Hero hero) {
		try {

			hero.setLoginTime(TimeDateUtil.getCurrentTime());
			// 添加hero到场景
			SceneFunction.getIns().addHeroToScene(hero);
			// 响应进入场景后事件
			AbsSceneEvent sceneEvent = SceneEventFunction.getSceneEvent(Config_map_200.getIns().get(hero.getScene().getSceneSysId()).getSevertype());
//			boolean afterOffline = sceneEvent.afterOffline(hero);
//			if(!afterOffline){
//			}
			try {
				sceneEvent.afterIn(hero);
			} catch (Exception e) {
				LogTool.errmsg(e);
			}
			hero.getTempVariables().setLoginEnterScene(false);//移除登陆标志
			hero.getTempVariables().setLoginSuccess(true);
			hero.getTempVariables().setLastHeartBeatTime(TimeDateUtil.getCurrentTime());
			if(hero.getNowCreate() == 1){
				hero.setNowCreate(0);
			}
			//SkyEyeCache.removeChannelConn(hero.getChannel());//移除已经连接的channel
		
		} catch (Exception e) {
			LogTool.error(e, SceneManager.class, hero.getId(), hero.getName(), "SceneManager succEnterScene");
		}
	}
	/**
	 * 切换进入场景
	 * 
	 * @param hero
	 */
	public void changeSceneOK(Hero hero) {
		try {
//			System.err.println("changeSceneOK,"+hero.getName());
			int sceneSysId = 0;
			boolean newIn = false;
			Scene scene = hero.getScene();
			int oriSceneType = scene.getSceneType();
			try {
				NewLocation newLocation = scene.getNewLocation();
				if(newLocation==null) return;
				setSceneFromNewLocation(scene, newLocation);
				//syncSceneToLocal(hero, scene);
				// 其他系统在确定跳转成功后的调用
				newIn = true;
				TempData tempData = hero.getTempData();
				if (tempData.getAttribute(GameConst.QUIT_SCENE) != null) {
					tempData.removeAttribute(GameConst.QUIT_SCENE);
					newIn = false;
				}
				SceneFunction.getIns().addHeroToScene(hero);
			} catch (Exception e) {
				LogTool.error(e, SceneManager.class, hero.getId() + ",name=" + hero.getNameZoneid() + " sceneSysId=" + sceneSysId + " changeSceneOK exception:");
			}
			scene.setNewLocation(null);
			AbsSceneEvent sceneEvent = SceneEventFunction.getSceneEvent(scene.getSceneType());
			if (sceneEvent == null) {
				LogTool.warn(hero.getId()+hero.getNameZoneid()+"changeSceneOK get sceneEvent is null,sceneSysId:" + sceneSysId, SceneManager.class);
				return;
			}
			sceneEvent.afterIn(hero);
			hero.getTempVariables().setChangeSceneType(0);
		} catch (Exception e) {
			LogTool.error(e, SceneManager.class, hero.getId(), hero.getName(), "SceneManager changeSceneOK");
		}
	}
	
	/**
	 * 从newLocation设置正式的场景
	 * @param scene
	 * @param newLocation
	 */
	private void setSceneFromNewLocation(Scene scene,NewLocation newLocation){
		int sceneType = Config_map_200.getIns().get(newLocation.getSceneSysId()).getSevertype();
		scene.setSceneType(sceneType);
		scene.setSceneUnitId(newLocation.getSceneId());
		scene.setSceneSysId(newLocation.getSceneSysId());
		scene.setPosX(newLocation.getPosX());
		scene.setPosY(newLocation.getPosY());
		scene.setEndX(newLocation.getPosX());
		scene.setEndY(newLocation.getPosY());
		scene.setRoute(null);
	}
	
	/**
	 * 同步中央服场景信息到本地
	 * @param hero
	 * @param scene
	 */
	/*public void syncSceneToLocal(Hero hero,Scene scene){
		try {
			if(CrossZone.isCrossServer()){
				CrossData crossData = new CrossData();
				crossData.put(CrossEnum.sceneSysId.name(), scene.getSceneSysId());
				crossData.put(CrossEnum.sceneUnitId.name(), scene.getSceneUnitId());
				crossData.put(CrossEnum.x.name(), scene.getPosX());
				crossData.put(CrossEnum.y.name(), scene.getPosY());
				crossData.put(CrossEnum.hid.name(), hero.getId());
				NettyWrite.writeXData(hero.getLocalChannel(), CrossConst.SYNC_SCENE_TO_LOCAL, crossData);
			}
		} catch (Exception e) {
			LogTool.errmsg(e);
		}
	}*/
	
}
