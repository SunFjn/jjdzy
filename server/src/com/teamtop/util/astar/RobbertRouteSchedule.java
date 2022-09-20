package com.teamtop.util.astar;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.system.scene.Canwalk;
import com.teamtop.system.scene.RowCol;
import com.teamtop.system.scene.SceneCache;
import com.teamtop.system.scene.SceneFunction;
import com.teamtop.util.exector.schedule.AbsScheduleExecutor;
/**
 * 移动npc生成路径线程
 * @author Administrator
 *
 */
public class RobbertRouteSchedule extends AbsScheduleExecutor{
	private Canwalk canwalk;
	private ArrayList<RowCol> allCanPointList;
	private int sceneUid;
	public RobbertRouteSchedule(long delay, long interval,int sceneSysId,int sceneUid) {
		super(delay, interval,false);
		this.canwalk = SceneCache.getCanwalk(sceneSysId);
		this.allCanPointList = SceneCache.getCanWalk(sceneSysId);
		this.sceneUid = sceneUid;
	}
	
	@Override
	public void execute(int now) {
		ConcurrentHashMap<Robbert, Integer> map = RobbertCache.getMakeRouteMap().get(sceneUid);
		ConcurrentHashMap<Long, Robbert> rm = RobbertCache.getRobbertMap().get(sceneUid);
		if(map!=null){
			Iterator<Robbert> it = map.keySet().iterator();
			while(it.hasNext()){
				Robbert robbert = it.next();
				if(rm.containsKey(robbert.getId())){
					int[][] makeRoute = RobbertFunction.makeRoute(robbert.getPosX(),robbert.getPosY(),canwalk, allCanPointList);
					if(robbert.getSpeed()==0) continue;
					robbert.setRoute(makeRoute);
//					System.err.println("make new route board,x:"+robbert.getPosX()+",y:"+robbert.getPosY()+",id:"+robbert.getId()+",route:"+Arrays.deepToString(makeRoute));
					if(rm.containsKey(robbert.getId())){
						SceneFunction.getIns().boardNewNpc(robbert);
					}
					robbert.setSuspend(false);
				}/*else{
					System.err.println("make new route board,robbert is removed!!!!,id:"+robbert.getId());
				}*/
				it.remove();
			}
		}
	}
}
