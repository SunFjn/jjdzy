package com.teamtop.util.astar;

import java.util.Arrays;
import java.util.List;

//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;

import com.teamtop.system.NPC.NPC;
import com.teamtop.system.hero.Hero;
/**
 * 移动的机器人NPC
 * @author Administrator
 *
 */
public class Robbert extends NPC{
//	private Logger logger = LoggerFactory.getLogger(Robbert.class);
	private int sceneType;
	private int nowSpeed;
	private int speed = 140;
	private int pre_x; //上一次同步时的坐标x
	private int pre_y; //上一次同步时的坐标y
	private int start_x;
	private int start_y;
	private int end_x;
	private int end_y;
	private int dx;
	private int dy;
	private long lastTime;
	private int allTime;
//	private int overTime;//结束时间
	private float rate;
//	private int stopTime;//停止行走时间
//	private int time;//
	private int state = 1;
	private boolean suspend;//暂停
//	protected int preSetRoute[][];//预设的路径，用于类似小龟赛跑的npc 
	protected PreSetRoute[] preSetRoute; 
	private int[][] cloneRoute;
	public boolean move(long now) {
//		System.err.println("move,now:"+now);
//		if(state!=1) return false;
		try {
			if(suspend) return true;
			if(allTime==0){
				return false;
			}
			rate = (float)(now - lastTime)/allTime;
			if(rate > 1) {
				if(route!=null && route.length>0){
//					route = arrayShift(route);
					setRoute(route);
//					RobbertFunction.onSyncRoute(this);
				}
				else {
					if(end_x != 0 && end_y != 0) {
//						logger.info("id:"+id+",rate:"+rate+",allTime:"+allTime+",path:"+"end_x"+end_x+",end_y:"+end_y+",posX:"+posX+",posY:"+posY+",pre_x:"+pre_x+",pre_y:"+pre_y+",route.length:"+route.length);
						pre_x = posX;
						pre_y = posY;
						posX = end_x;
						posY = end_y;
						RobbertFunction.onSyncPos(this);
						return false;
					}
				}
			}else {
				pre_x = posX;
				pre_y = posY;
				posX = (int) (rate*dx + start_x);
				posY = (int) (rate*dy + start_y);
				RobbertFunction.onSyncPos(this);
//				System.err.println("rate:"+rate+",allTime:"+allTime+",path:"+"end_x"+end_x+",end_y:"+end_y+"posX:"+posX+",posY:"+posY+",speet:"+speed);
			}
//			System.err.println("global_x:"+posX+",global_y:"+posY);
			return true;
		} catch (Exception e) {
			return false;
		}
	}
	
	public void setRoute(int path[][]){
		//System.err.println("set route,path:"+Arrays.deepToString(path)+"posX:"+posX+",posY:"+posY);
		route = path;
		if(route==null || route.length==0){
			//没有路径
//			System.err.println("route is null or len is 0");
			return;
		}
		start_x = posX;
		start_y = posY;
		//取第一个,并从数组移除
		int[] posArr = route[0];
		end_x = posArr[0];
		end_y = posArr[1];
		cloneRoute = Arrays.copyOf(route, route.length);
		route = arrayShift(route);
		
		int len = (int) Math.ceil(Math.sqrt((end_y-start_y)*(end_y-start_y)+(end_x-start_x)*(end_x-start_x)));
		
		if(len<1){
			//A星算的两点太短，重新计算路径
//			System.err.println("len too short:"+len);
//			route = arrayShift(route);
			setRoute(route);
			return;
		}
		if(end_x == start_x) {
			nowSpeed = speed;
		}else {
			float c = (float)(end_y-start_y)/(end_x-start_x)*(end_y-start_y)/(end_x-start_x);
			float variable = (float) Math.sqrt((1+c) / (1/(RobbertConst.ROUTE_A*RobbertConst.ROUTE_A) + c/(RobbertConst.ROUTE_B*RobbertConst.ROUTE_B)));
			nowSpeed = (int) (speed * variable);
			//System.err.println("c:"+c+",variable:"+variable+",nowSpeed:"+nowSpeed+",len:"+len);
		}
		allTime = (int) (1000*len/nowSpeed);
		lastTime = System.currentTimeMillis();
		dx = end_x - start_x;
		dy = end_y - start_y;
//		System.err.println("allTime:"+allTime+"ms,lastTime:"+lastTime);
//		System.err.println("nowSpeed:"+nowSpeed+",speed:"+speed);
//		System.err.println("end_x:"+end_x+",end_y:"+end_y+",start_x:"+start_x+",start_y:"+start_y);
	}
	
	private int[][] arrayShift(int[][] route){
		int length = route.length;
		if(length==0){
			return null;
		}
		int[][] copy = new int[length-1][];
		for(int i=1;i<length;i++){
			copy[i-1] = route[i];
		}
		return copy;
	}
	/**
	 * 机器人同步坐标的时候，强行同步返回列表的玩家坐标，达到机器人和玩家一致
	 * @return
	 */
	public List<Hero> getSyncHeroList(){
		return null;
	}
	public int getSpeed() {
		return speed;
	}

	public void setSpeed(int speed) {
		suspend = true;
		try {
			this.speed = speed;
			if(speed>0){
				setRoute(cloneRoute);
				state = 1;
			}else{
				state = 2;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		suspend = false;
	}
	

	public boolean isSuspend() {
		return suspend;
	}

	public void setSuspend(boolean suspend) {
		this.suspend = suspend;
	}

	public int getStart_x() {
		return start_x;
	}

	public void setStart_x(int start_x) {
		this.start_x = start_x;
	}

	public int getStart_y() {
		return start_y;
	}

	public void setStart_y(int start_y) {
		this.start_y = start_y;
	}

	public int getPre_x() {
		return pre_x;
	}

	public void setPre_x(int pre_x) {
		this.pre_x = pre_x;
	}

	public int getPre_y() {
		return pre_y;
	}

	public void setPre_y(int pre_y) {
		this.pre_y = pre_y;
	}

//	public int getStopTime() {
//		return stopTime;
//	}
//
//	public void setStopTime(int stopTime) {
//		this.stopTime = stopTime;
//	}
//	
//	public int getTime() {
//		return time;
//	}
////	public int getState() {
////		return state;
////	}
//	
//	public void addTime(int time){
//		this.time += time;
////		this.allTime += time;
//		this.overTime += time;
//	}
//	
//	public int getOverTime() {
//		return overTime;
//	}
//	public void resetTime(){
//		this.time = 0;
//	}
//	public int getAllTime() {
//		return allTime;
//	}
//	public void setAllTime(int allTime) {
//		this.allTime = allTime;
//	}

	public int getSceneType() {
		return sceneType;
	}

	public void setSceneType(int sceneType) {
		this.sceneType = sceneType;
	}
	/**
	 * 设置死亡
	 */
	public void setDead(){
		this.state = 3;
		this.route = null;
	}
	public boolean isRunning(){
		return this.state==1;
	}
	public boolean isDead(){
		return this.state == 3;
	}
	/**
	 * 如果机器人跳转场景
	 * @param newSceneUnitId 新场景唯一id
	 * @param newSceneSysId 新场景系统id
	 * @param newX 新的坐标x
	 * @param newY 新的坐标y
	 */
	public void changeScene(int newSceneUnitId,int newSceneSysId,int newX,int newY){
		
	}
	/**
	 * 机器人走完在这里自定义处理就返回true
	 * @return
	 */
	public boolean handleHereOnEnd(){
		return false;
	}
	/**
	 * 移动结束后是否移除
	 * @return true为移除，可以由子类自行控制，默然为false
	 */
	public boolean removeOnMoveEnd(){
		return false;
	}

//	public int[][] getPreSetRoute() {
//		return preSetRoute;
//	}
//
//	public void setPreSetRoute(int[][] preSetRoute) {
//		this.preSetRoute = preSetRoute;
//	}

	
	@Override
	public Object[] getRoute() {
		if(cloneRoute==null || cloneRoute.length==0){
			System.err.println("Robbert.route null");
			return null;
		}
		Object[] obj = new Object[cloneRoute.length];
		int i=0;
		for(int[] pos:cloneRoute){
			obj[i++] = new Object[]{pos[0],pos[1]};
		}
//		System.err.println(Arrays.deepToString(obj));
		return obj;
	}

	public PreSetRoute[] getPreSetRoute() {
		return preSetRoute;
	}

	public void setPreSetRoute(PreSetRoute[] preSetRoute) {
		this.preSetRoute = preSetRoute;
	}

	public int getEnd_x() {
		return end_x;
	}

	public void setEnd_x(int end_x) {
		this.end_x = end_x;
	}

	public int getEnd_y() {
		return end_y;
	}

	public void setEnd_y(int end_y) {
		this.end_y = end_y;
	}
	
}
