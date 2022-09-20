package com.teamtop.system.event.backstage;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.IServerEvent;
import com.teamtop.system.hero.Hero;

/**
 * 后台基本事件
 * @author kyle
 *
 */
public abstract class AbsBackstageEvent implements IServerEvent{
	/**
	 * 角色登陆
	 * @param currTime 当前时间
	 * @param role
	 */
	public void login(int currTime,Hero hero){
		
	}
	/**
	 * 角色登出
	 * @param currTime 当前时间
	 * @param role
	 */
	public void logout(int currTime,Hero hero){
		
	}
	
	/**
	 * 一天重置缓存,适用于一天一次的后台记录,清除当天的缓存
	 * @param currTime 当前时间
	 */
	public void resetCacheOnDay(int currTime){
		
	}
	/**
	 * 每小时执行一次
	 * @param currTime 当前时间
	 */
	public void executeOneHour(int currTime){
		
	}
	/**
	 * 每天执行一次
	 * @param currTime 当前时间
	 */
	public void executeOneDay(int currTime){
		
	}
	/**
	 * 每5分钟执行一次
	 * @param currTime 当前时间
	 */
	public void executeFiveMin(int currTime){
		
	}
	/**
	 * 每1分钟执行一次
	 * @param currTime 当前时间
	 */
	public void executeOneMin(int currTime){
		
	}
	/**
	 * 每个小时10分执行
	 * @param beforeHourTime
	 * @param currTime
	 */
//	public void executePreOneTenMin(int beforeHourTime,int currTime){
//		
//	}
	/**
	 * 每8分钟保存一次
	 * @param currTime
	 */
	public void executeEightPre(int currTime){
		
	}
	
	@Override
	public void startServer() throws RunServerException {
		
	}
	@Override
	public void shutdownServer(){
		
	};
	
}
