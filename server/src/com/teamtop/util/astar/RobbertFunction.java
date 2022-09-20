package com.teamtop.util.astar;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.concurrent.ConcurrentSkipListSet;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.event.sceneEvent.SceneEventFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.scene.Canwalk;
import com.teamtop.system.scene.RowCol;
import com.teamtop.system.scene.SceneCache;
import com.teamtop.system.scene.SceneCmd;
import com.teamtop.system.scene.SceneConst;
import com.teamtop.system.scene.SceneFunction;
import com.teamtop.system.scene.SceneHeroDataType;
import com.teamtop.system.scene.SoloSceneFunction;
import com.teamtop.util.exector.schedule.ScheduleConst;
import com.teamtop.util.exector.schedule.ScheduleUtil;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_NPC_200;
import excel.config.Config_map_200;
import excel.struct.Struct_NPC_200;

public class RobbertFunction {
	public static void main(String[] args) {
		Canwalk canwalk = SceneCache.getCanwalk(30050011);
		ArrayList<RowCol> allCanPointList = SceneCache.getCanWalk(30050011);
		int[][] map = canwalk.getCanwalk();
		while(true){
			AStar aStar=new AStar(map, canwalk.getRow(), canwalk.getCol());
			RowCol rowcol1 = SceneEventFunction.getNewPosByRandom(allCanPointList);
			RowCol rowcol2 = SceneEventFunction.getNewPosByRandom(allCanPointList);
			int row1 = rowcol1.getRow();
			int col1 = rowcol1.getCol();
			int row2 = rowcol2.getRow();
			int col2 = rowcol2.getCol();
			int[][] flag=aStar.searchByRowCol(row1,col1,row2,col2);
			System.err.println(flag);
		}
	}
	private static Logger logger = LoggerFactory.getLogger(RobbertFunction.class);
	/**
	 * 生成路径
	 * @param posX
	 * @param posY
	 * @param canwalk
	 * @param allCanPointList
	 * @return
	 */
	public static int[][] makeRoute(int posX,int posY,Canwalk canwalk,ArrayList<RowCol> allCanPointList){
		int[][] map = canwalk.getCanwalk();
		AStar aStar=new AStar(map, canwalk.getRow(), canwalk.getCol());
		RowCol rowcol = SceneEventFunction.getNewPosByRandom(allCanPointList);
		int row1 = posY /SceneConst.CANWARL_POSY_TRANS;
		int col1 = posX /SceneConst.CANWARL_POSX_TRANS;
		int row2 = rowcol.getRow();
		int col2 = rowcol.getCol();
//		int[][] flag=aStar.search(posX,posY,col2,row2);
		
		
//		int row1 = 3200/32;
//		int col1 = 4672/32;
//		int row2 = 3296/32;
//		int col2 = 896/32;
		int[][] flag=aStar.searchByRowCol(row1,col1,row2,col2);
        return flag;
	}
	
	private static void doMakeRobbert(Robbert robbert,int sysid,int sceneUid,long id,int sceneSysId,int posX,int posY){
		if(id==0){
			id = SceneCache.getNPCUnitId();
		}
		robbert.setId(id);
		robbert.setSysId(sysid);
		robbert.setPosX(posX);
		robbert.setPosY(posY);
		robbert.setSceneSysId(sceneSysId);
		robbert.setSceneUnitId(sceneUid);
		robbert.setSceneType(Config_map_200.getIns().get(sceneSysId).getSevertype());
		Struct_NPC_200 excelNPC = Config_NPC_200.getIns().get(sysid);
		if(excelNPC==null)
			System.err.println("NPC表还没录npc："+sysid);
		int leixing = excelNPC.getType();
		robbert.setNpcType(leixing);
		robbert.setClientNpcType(excelNPC.getGongji());
		robbert.setCreateTime(TimeDateUtil.getCurrentTime());
		SceneFunction.getIns().addNpcToScene(robbert, true);
	}
	
	public static void makeRobbert(Robbert robbert,int sysid,int sceneUid,long id,int sceneSysId,int posX,int posY,boolean needRoute){
//		if(needRoute){
//			int[][] route = makeRoute(posX,posY,SceneCache.getCanwalk(sceneSysId), SceneCache.getCanWalk(sceneSysId));
//			System.err.println("make robbert,set route:"+Arrays.deepToString(route)+",x:"+posX+",y:"+posY);
//			robbert.setRoute(route);
//		}
		doMakeRobbert(robbert, sysid, sceneUid, id, sceneSysId, posX, posY);
		RobbertCache.addRobbert(robbert);
	}
	/**
	 * 生成移动npc，根据可行走区域随机选取路径
	 * @param sysid npc系统id
	 * @param sceneUid 场景唯一id
	 * @param sceneSysId 场景系统id
	 * @param posX 坐标x
	 * @param posY 坐标y
	 */
	public static void makeRobbert(int sysid,int sceneUid,long id,int sceneSysId,int posX,int posY,boolean needRoute){
		Robbert robbert = new Robbert();
		makeRobbert(robbert, sysid, sceneUid, id, sceneSysId, posX, posY,needRoute);
	}
	/**
	 * 生成预设路径的移动npc，根据预设路径
	 * @param robbert 子类对象
	 * @param sysid npc系统id
	 * @param sceneUid 场景唯一id
	 * @param id npc唯一id，没有填0
	 * @param sceneSysId 场景系统id
	 * @param posX 坐标x
	 * @param posY 坐标y
	 * @param preSetRoute 预设路径
	 * @param useSysId 是否使用场景系统id作为缓存key
	 */
	public static void makeRobbertPreSetRoute(Robbert robbert,int sysid,int sceneUid,
			long id,int sceneSysId,int posX,int posY,int[][] preSetRoute,boolean...useSysId){
		doMakeRobbert(robbert, sysid, sceneUid, id, sceneSysId, posX, posY);
		PreSetRoute psr = new PreSetRoute();
		psr.setSceneUnitId(sceneUid);
		psr.setSceneSysId(sceneSysId);
		psr.setX(posX);
		psr.setY(posY);
		psr.setRoute(preSetRoute);
		robbert.setPreSetRoute(new PreSetRoute[]{psr});
		RobbertCache.addRobbert(robbert, useSysId);
	}
	/**
	 * 生成预设路径的移动npc，根据预设路径
	 * @param robbert 子类对象
	 * @param sysid npc系统id
	 * @param sceneUid 场景唯一id
	 * @param id npc唯一id，没有填0
	 * @param sceneSysId 场景系统id
	 * @param posX 坐标x
	 * @param posY 坐标y
	 * @param routeArr 预设路径
	 */
	public static void makeRobbertPreSetRoute(Robbert robbert,int sysid,int sceneUid,
			long id,int sceneSysId,int posX,int posY,PreSetRoute[] routeArr){
		doMakeRobbert(robbert, sysid, sceneUid, id, sceneSysId, posX, posY);
		robbert.setPreSetRoute(routeArr);
		RobbertCache.addRobbert(robbert);
	}
	/**
	 * 启动移动机器人线程
	 * @param sceneSysId 
	 * @param sceneUid
	 */
	public static void startRobbertThread(int sceneSysId , int sceneUid){
		/*ScheduleUtil.addTask(ScheduleConst.ROBBERT_NPC+sceneUid, new RobbertSchedule(0, 33,sceneUid));
		ScheduleUtil.addTask(ScheduleConst.ROBBERT_MAKE_ROUTE+sceneUid, new RobbertRouteSchedule(0, 200, sceneSysId,sceneUid));*/
	}
	
	/**
	 * 取消移动机器人线程
	 * @param sceneUid
	 */
	public static void cancelRobbertThread(long sceneUid){
		ScheduleUtil.cancelTask(ScheduleConst.ROBBERT_NPC+sceneUid);
		ScheduleUtil.cancelTask(ScheduleConst.ROBBERT_MAKE_ROUTE+sceneUid);
		RobbertCache.getMakeRouteMap().remove(sceneUid);
		RobbertCache.getRobbertMap().remove(sceneUid);
	}
	/**
	 * 同步移动npc的路径时
	 * @param robbert
	 */
	public static void onSyncRoute(Robbert robbert){
		List<Hero> syncList = robbert.getSyncHeroList();
		if(syncList!=null){
			int[][] xyArr = robbert.getRouteIntArr();
			int xyLen = xyArr.length;
			Integer[][] route = new Integer[xyLen][];
			for (int i = 0; i < xyLen; i++) {
				int[] posArr = (int[]) xyArr[i];
				int s = posArr[0];
				int e = posArr[1];
				route[i] = new Integer[] { s, e };
			}
			for(Hero hero:syncList){
				hero.getScene().setRoute(route);
			}
		}
	}
	/**
	 * 同步移动npc的坐标时
	 * @param robbert
	 */
	public static void onSyncPos(Robbert robbert){
		int posX = robbert.getPosX();
		int posY = robbert.getPosY();
		int preRowCol = SceneFunction.getIns().getGridRowColMixByPosXY(robbert.getPre_x(), robbert.getPre_y());
		int rowCol = SceneFunction.getIns().getGridRowColMixByPosXY(posX, posY);
		int preRow = preRowCol / 1000;
		int preCol = preRowCol % 1000;
		int row = rowCol / 1000;
		int col = rowCol % 1000;
		long sceneUnitId = robbert.getSceneUnitId();
		int[][] addDelGrids = null;
		if (SceneCache.boardSupplyWay(robbert.getSceneType())) {
			addDelGrids = SceneFunction.getIns().getAddDelByCalc(preRow, preCol, row, col);
		}
		//修改缓存
		if(addDelGrids!=null){
			int[] addGrids = addDelGrids[0];
			List<Hero> syncList = robbert.getSyncHeroList();
			if(syncList!=null){
				for(Hero hero:syncList){
					SoloSceneFunction.getIns().syncPosXY(hero, posX, posY, preRowCol, rowCol, addDelGrids, SceneHeroDataType.NORMAL);
				}
			}
//			logger.info("add del,id:"+robbert.getId()+",prex:"+robbert.getPre_x()+",prey:"+robbert.getPre_y());
			SceneCache.removeNpcFromSupplyScene(sceneUnitId, preRowCol, robbert);//从原来格子移除
			SceneCache.addNpcToSupplyScene(sceneUnitId, rowCol, robbert);//添加到新的格子
			
			// 添加玩家
			Set<Integer> allLine = SceneCache.getAllLine();
			for(Integer line:allLine){
				for (Integer grid : addGrids) {
					// 单向添加
					SceneFunction.getIns().npcMeetHero(SceneCache.supplySceneHeroData.get(line, sceneUnitId, grid), robbert);
				}
			}

			// 删除玩家
			int[] delGrids = addDelGrids[1];
			Object[] delData = new Object[] { robbert.getId() * -1, robbert.getClientNpcType() };
			for(Integer line:allLine){
				for (Integer grid : delGrids) {
					if (grid == null) {
						continue;
					}
					ConcurrentSkipListSet<Hero> set = SceneCache.supplySceneHeroData.get(line, sceneUnitId, grid);
					if(set==null) continue;
					for(Hero hero:set){
						NettyWrite.writeData(hero.getChannel(), delData, SceneCmd.GC_Delhero_3906);
//						System.err.println("robbert 删除玩家:"+robbert.getId()+","+hero.getName()+"pos："+posX+","+posY);
					}
				}
			}
		}
	}
	/**
	 * 重新设置机器人路径，机器人在行走过程也能设置
	 * @param robbert
	 * @param route
	 */
	public static void resetRobbertRoute(Robbert robbert,int[][] route){
		robbert.setSuspend(true);
		robbert.setRoute(route);
		SceneFunction.getIns().boardRobbertState(robbert);
		robbert.setSuspend(false);
	}
	/**
	 * 使机器人停止
	 * @param robbert
	 */
	public static boolean stopRobbert(Robbert robbert){
//		Object[] route = robbert.getRoute();
//		logger.info("stop robbert,speed:"+robbert.getSpeed()+",route size:"+(route==null?"null":route.length)+",id:"+robbert.getId()+",x:"+robbert.getPosX()+",y:"+robbert.getPosY());
		if(robbert.getSpeed()>0){
			robbert.setSpeed(0);
			SceneFunction.getIns().boardRobbertState(robbert);
			return true;
		}else{
			return false;
		}
	}
	/**
	 * 让机器人重新走路 
	 * @param robbert
	 * @param speed
	 */
	public static void regoRobbert(Robbert robbert,int speed){
//		logger.info("regoRobbert,speed:"+robbert.getSpeed()+",route:"+robbert.getRouteIntArr()+",id:"+robbert.getId()+",x:"+robbert.getPosX()+",y:"+robbert.getPosY());
		robbert.setSpeed(speed);
		SceneFunction.getIns().boardRobbertState(robbert);
	}
}
