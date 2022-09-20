package com.teamtop.system.event.systemEvent;

import com.teamtop.system.hero.Hero;
/**
 * 系统事件,如某个系统的登陆、登出、同步、升级等事件
 * @author Administrator
 *
 */
public abstract class AbsSystemEvent implements ISystemEvent{
	/**
	 * 系统初始化:适用于系统做初始化数据,或查询数据库,此方法后数据将会以object呈现
	 * @param hero hero
	 */
	public abstract void init(Hero hero);
	/**
	 * 登录时,用于hero登录逻辑操作<br/>
	 * @param hero hero
	 */
	public abstract void login(Hero hero);
	/**
	 * 登陆重置，用于0点离线，登陆重置系统,此方法先于login执行</br>
	 * 每日0点重置：实现zeroHero()和loginReset()方法
	 * @param hero
	 */
	public void loginReset(Hero hero,int now){
		
	}
	/**
	 * hero升级,适用于根据等级推送图标<br/>
	 * 某些系统等级需求较高,可在这里初始化调用init()
	 * @param hero hero
	 * @param newLv 新等级
	 * @param oldLv 原等级
	 */
	public void levelUp(Hero hero,int newLv,int oldLv){
		
	}
	/**
	 * 通关关卡
	 * @param hero
	 * @param passGuanqia 通关的关卡id
	 */
	public void passGuanqia(Hero hero, int passGuanqia) {
		
	}
	/**
	 * 开启新英雄,战力将会在全部事件回调完后自动计算，所以不需要在这个方法计算战力!!
	 * @param hero
	 * @param job 英雄的job
	 */
	public void openNewGeneral(Hero hero,int job){
		
	}
	/**
	 * 登录后逻辑操作<br/>
	 * 适用于某些系统需要在login后操作逻辑,一般系统无需使用此方法
	 * @param hero hero
	 */
	public void afterLogin(Hero hero){
		
	}
	/**
	 * 登出时，用于处理逻辑执行
	 * @param hero hero
	 */
	public void logout(Hero hero){
		
	}
	/**
	 * 被挤下线时执行
	 * @param hero
	 */
	public void extrusionLine(Hero hero) {
		
	}
	/**
	 * 处理定时事件,此方法在配置期间(一天)会被多次调用,每次处理一个hero对象,直到在线hero被处理完毕。<br/>
	 * 每日0点重置：实现zeroHero()和loginReset()方法
	 * @param hero
	 */
	public void zeroHero(Hero hero,int now){
		
	}
	/**
	 * 处理定时事件,此方法处理多个hero;或单独处理系统重置逻辑,此方法在配置期间(一天)只会被执行一次<br/>
	 * 此方法优先级高于handleQuartzSingle
	 * @param heros 在线hero,不在线但有缓存的hero不会在此
	 */
	public void zeroPub(int now){
		
	}
	/**
	 * 定时事件
	 * @param cmdId 根据配置的传入响应的cmd
	 */
	public void fixTime(int cmdId,int now) {
		
	}
	@Override
	public void logoutSyncPub(Hero hero,int syncType) {
		
	}
	@Override
	public void fixtimeSyncPub(int now) {
		
	}
	/**
	 * 任务控制开启
	 * @param hero
	 */
	public void taskOpen(Hero hero){
		
	}
	/**
	 * 合服活动开始
	 */
	public void hefuActivityStart(){
		
	}
	/**
	 * 合服活动开始初始化玩家信息
	 * @param hero
	 */
	public void hefuActivityHeroInit(Hero hero){
		
	}
	/**
	 * 合服活动结束
	 */
	public void hefuActivityEnd(){
		
	}
	/**
	 * 合服活动个人奖励，会在hefuActivityEnd后调用
	 */
	public void hefuActivityRewardOnEnd(Hero hero){
		
	}
}
