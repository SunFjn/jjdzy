package com.teamtop.system.hero;

import java.util.Iterator;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.cross.CrossZone;
import com.teamtop.gameCommon.GameProperties;
import com.teamtop.houtaiHttp.events.kickOutHero.KickOutHeroIO;
import com.teamtop.main.RunServerException;
import com.teamtop.system.event.backstage.events.backstage.BackstageConst;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.util.exector.ExectorUtil;
import com.teamtop.util.exector.schedule.ScheduleUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;
/**
 * hero下线数据保存，用于下线时使用此线程同步，减少因为保存数据对下线时间消耗的影响
 * @author Administrator
 *
 */
public class HeroDataSaver extends AbsServerEvent{
	private static Logger logger = LoggerFactory.getLogger(HeroDataSaver.class);
	private static ScheduledExecutorService executors = ScheduleUtil.makeThread("heroDataSaver");
	private static ConcurrentLinkedQueue<Hero> logoutCache = new ConcurrentLinkedQueue<Hero>();
	private static ConcurrentHashMap<Long, Hero> clearCache = new ConcurrentHashMap<Long, Hero>();
	/**
	 * 定时同步
	 */
	public static final int SYNC = 1;
	/**
	 * 登出
	 */
	public static final int LOGOUT = 2;
	/**
	 * 清楚缓存
	 */
	public static final int CLEAR = 3;
	/**
	 * 加入保存数据库队列
	 * @param role
	 */
	public static void addLogoutSaver(Hero hero){
		try {
			if(CrossZone.isCrossServer()) return;
			if(hero==null) return;
			logoutCache.add(hero);
			clearCache.put(hero.getId(), hero);
		} catch (Exception e) {
			logger.error(LogTool.exception(e));
		}
	}
	
	public static void removeClearCache(Hero hero){
		try {
			if(hero==null) return;
			clearCache.remove(hero.getId());
		} catch (Exception e) {
			logger.error(LogTool.exception(e));
		}
	}
	/**
	 * 同步数据,登出的玩家
	 */
	private static void doSyncOnLogout(){
		Iterator<Hero> iterator = logoutCache.iterator();
		Hero hero = null;
		while(iterator.hasNext()){
			try {
				hero = iterator.next();
				HeroDao.getIns().update(hero,LOGOUT);
			} catch (Exception e) {
				logger.error(LogTool.exception(e));
			}finally{
				iterator.remove();
			}
		}
	}
	/**
	 * 同步数据，定时同步
	 */
	public static void doSyncOnFixtime(boolean force){
		Iterator<Hero> iterator = HeroCache.getHeroMap().values().iterator();
		Hero hero = null;
		int now = TimeDateUtil.getCurrentTime();
		while(iterator.hasNext()){
			try {
				hero = iterator.next();
				if(hero.isOnline()){
					int syncTime = hero.getTempData().getSyncTime();
					if(force || now > syncTime){
						if(force) Thread.sleep(50);
						if (!hero.getTempVariables().isLoginSuccess()) {
							int passTime = TimeDateUtil.getCurrentTime() - hero.getTempVariables().getLoginTemp();
							if (passTime > 180) {
								KickOutHeroIO.getIns().kickOut(hero.getId());
								continue;
							}
						}
						HeroDao.getIns().update(hero,SYNC);
						TempData tempData = hero.getTempData();
						if(tempData!=null){
							tempData.setSyncTime(now+GameProperties.SYNC_FIXTIME);
						}
					}
				}
			} catch (Exception e) {
				logger.error(LogTool.exception(e));
			}
		}
	}
	private static void doClear(int now){
		Iterator<Hero> iterator = clearCache.values().iterator();
		Hero hero = null;
		while(iterator.hasNext()){
			try {
				hero = iterator.next();
				if(hero.isOnline()){
					logger.warn(LogTool.getmsg(hero.getId(),hero.getNameZoneid(),"clear hero find hero is online"));
					iterator.remove();
					continue;
				}
				if(now - hero.getLogoutTime()>GameProperties.CLEARGAP){
					logger.info(LogTool.getmsg(hero.getId(),hero.getNameZoneid(),"clear hero succ"));
					iterator.remove();
					try {
						HeroDao.getIns().update(hero,CLEAR);
					} catch (Exception e) {
						logger.error(LogTool.exception(e));
					}
					if(hero.getChannel()==null){
						HeroCache.removeHero(hero.getId());
					}
				}
			} catch (Exception e) {
				logger.error(LogTool.exception(e));
			}/*finally{
				iterator.remove();
			}*/
		}
	}
	@Override
	public void startServer() throws RunServerException {
		executors.scheduleAtFixedRate(new Runnable() {
			@Override
			public void run() {
				doSyncOnLogout();
			}
		}, 0, TimeDateUtil.ONE_SECOND, TimeUnit.SECONDS);
		executors.scheduleAtFixedRate(new Runnable() {
			@Override
			public void run() {
				doSyncOnFixtime(false);
			}
		}, 0, TimeDateUtil.ONE_SECOND*30, TimeUnit.SECONDS);
		executors.scheduleAtFixedRate(new Runnable() {
			@Override
			public void run() {
				doClear(TimeDateUtil.getCurrentTime());
			}
		}, 0, TimeDateUtil.ONE_SECOND*30, TimeUnit.SECONDS);
	}
	
	@Override
	public void shutdownServer() {
		//set shutdown flag
		GameProperties.shutdown = true;
		//close executor
		try {
			ExectorUtil.shutdownAndAwaitTermination(executors,"heroDataSaveThread");
		} catch (Exception e) {
			logger.error(LogTool.exception(e));
		}
		//close all channel,hero data will sync in heroMap cache
		Map<Long, Hero> heroMap = HeroCache.getHeroMap();
		for(Hero hero:heroMap.values()){
			if(hero.isOnline()){
				try {
					if(hero!=null){
						HeroFunction.getIns().logout(hero, BackstageConst.M_LOGINOUT_OPER_NORMAL);
						HeroDao.getIns().update(hero,CLEAR);
					}
				} catch (Exception e) {
					logger.error(LogTool.exception(e,"hid:"+hero.getId()));
				}
			}
		}
	}
}
