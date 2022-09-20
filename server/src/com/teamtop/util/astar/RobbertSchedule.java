package com.teamtop.util.astar;

import java.util.Iterator;
import java.util.Map.Entry;
import java.util.concurrent.ConcurrentHashMap;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.system.scene.SceneFunction;
import com.teamtop.util.exector.schedule.AbsScheduleExecutor;

public class RobbertSchedule extends AbsScheduleExecutor{
	private int sceneUid;
	private Logger logger = LoggerFactory.getLogger(RobbertSchedule.class);
	
	public RobbertSchedule(long delay, long interval,int sceneUid) {
		super(delay, interval,false);
		this.sceneUid = sceneUid;
	}
	
	@Override
	public void execute(int now) {
		ConcurrentHashMap<Long, Robbert> robbertMap = RobbertCache.getRobbertMap().get(sceneUid);
		if(robbertMap!=null){
			Iterator<Entry<Long, Robbert>> it = robbertMap.entrySet().iterator();
			long currtime = System.currentTimeMillis();
			while(it.hasNext()){
				Entry<Long, Robbert> next = it.next();
				Robbert robbert = next.getValue();
				synchronized (robbert) {
					if(robbert.isDead()){
						it.remove();
						SceneFunction.getIns().removeNpcFromScene(robbert);
						continue;
					}
					if(!robbert.isRunning()){
						if(robbert.getSpeed()==0){
//							System.err.println("robbert speed is 0,robbert:"+robbert.getId());
						}
						continue;
					}
					boolean move = robbert.move(currtime);
					if(!move){
						//移动完毕重新生成路径
//					int[][] makeRoute = null;
						if(robbert.getPreSetRoute()!=null){
							//预设路径
//						makeRoute = robbert.getPreSetRoute();
							logger.info("robbert set preSet route,type:"+robbert.getNpcType()+",sysid:"+robbert.getSysId()+",id:"+robbert.getId()+",run:"+robbert.isRunning()+",speed:"+robbert.getSpeed());
							PreSetRoute[] preSetRoute = robbert.getPreSetRoute();
							logger.info("preSetRoute:"+preSetRoute+",id:"+robbert.getId());
							PreSetRoute route = preSetRoute[0];
							boolean sameScene = true;
							if(robbert.getSceneUnitId()!=route.getSceneUnitId()){
								sameScene = false;
							}
							if(!sameScene){
								SceneFunction.getIns().removeNpcFromScene(robbert);
							}
							robbert.setSceneUnitId(route.getSceneUnitId());
							robbert.setSceneSysId(route.getSceneSysId());
							robbert.setPosX(route.getX());
							robbert.setPosY(route.getY());
							robbert.setRoute(route.getRoute());
							if(!sameScene){
								SceneFunction.getIns().addNpcToScene(robbert, true);
								robbert.changeScene(route.getSceneUnitId(), route.getSceneSysId(), route.getX(), route.getY());
								logger.info("robbert change scene,new:"+route.getSceneSysId());
							}else{
								SceneFunction.getIns().boardNewNpc(robbert);
							}
							preSetRoute = shift(preSetRoute);
							logger.info("setPreSetRoute:"+preSetRoute+",id:"+robbert.getId());
							robbert.setPreSetRoute(preSetRoute);
						}else{
							if(robbert.handleHereOnEnd()){
								continue;
							}
							if(robbert.removeOnMoveEnd()){
								it.remove();
								continue;
							}
							robbert.setSuspend(true);
							//随机路径
//						makeRoute = RobbertFunction.makeRoute(robbert.getPosX(),robbert.getPosY(),canwalk, allCanPointList);
							RobbertCache.addMakeRoute(robbert);
						}
//					System.err.println("make new route,id:"+robbert.getId());
//					robbert.setRoute(makeRoute);
//					SceneFunction.getIns().boardNewNpc(robbert);
					}
				}
			}
		}
	}
	
	private PreSetRoute[] shift(PreSetRoute[] preSetRoute){
		if(preSetRoute==null || preSetRoute.length==1) return null;
		PreSetRoute[] copy = new PreSetRoute[preSetRoute.length-1];
		for(int i=1;i<preSetRoute.length;i++){
			copy[i-1] = preSetRoute[i];
		}
		return copy;
	}
}
