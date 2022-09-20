package com.teamtop.system.event.backstage;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.systemEvent.ISystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

public class BackstageSystemEvent extends AbsBackstageEvent implements ISystemEvent{
	private static BackstageSystemEvent ins = null;
	public static BackstageSystemEvent getIns(){
		if(ins==null) ins = new BackstageSystemEvent();
		return ins;
	}
	private Logger logger = LoggerFactory.getLogger(BackstageSystemEvent.class);
	@Override
	public void login(Hero hero) {
		int currentTime = TimeDateUtil.getCurrentTime();
		List<AbsBackstageEvent> events = BackstageCache.getLoginEvent();
		for(AbsBackstageEvent event:events){
			try {
				event.login(currentTime, hero);
			} catch (Exception e) {
				logger.error(LogTool.exception(e));
			}
		}
	}
	@Override
	public void logout(Hero hero) {
		int currentTime = TimeDateUtil.getCurrentTime();
		List<AbsBackstageEvent> events = BackstageCache.getLogoutEvent();
		for(AbsBackstageEvent event:events){
			try {
				event.logout(currentTime, hero);
			} catch (Exception e) {
				logger.error(LogTool.exception(e));
			}
		}
	}
	@Override
	public void startServer() throws RunServerException {
		BackstageCache.readConfig();
		List<AbsBackstageEvent> events = BackstageCache.getServerStartEvent();
		for(AbsBackstageEvent event:events){
			event.startServer();
		}
	}

	@Override
	public void shutdownServer() {
		List<AbsBackstageEvent> events = BackstageCache.getShutdownEvent();
		for(AbsBackstageEvent event:events){
			try {
				event.shutdownServer();
			} catch (Exception e) {
				logger.error(LogTool.exception(e));
			}
		}
	}
	@Override
	public void init(Hero hero) {
		
	}
	@Override
	public void loginReset(Hero hero,int now) {
		
	}

	@Override
	public void levelUp(Hero hero, int newLv, int oldLv) {
		
	}

	@Override
	public void afterLogin(Hero hero) {
		
	}

	@Override
	public void extrusionLine(Hero hero) {
		
	}

	@Override
	public void zeroHero(Hero hero,int now) {
		
	}

	@Override
	public void zeroPub(int now) {
		List<AbsBackstageEvent> events = BackstageCache.getResetCacheOnDayEvent();
		for(AbsBackstageEvent event:events){
			try {
				event.resetCacheOnDay(now);
				logger.info("event:"+event+",now:"+now);
			} catch (Exception e) {
				logger.error(LogTool.exception(e));
			}
		}
	}

	@Override
	public void fixTime(int cmdId,int now) {
		int currTime = TimeDateUtil.getCurrentTime();
		if(cmdId==0){
			//1 min
			List<AbsBackstageEvent> events = BackstageCache.getExecuteOneMinEvent();
			for(AbsBackstageEvent event:events){
				try {
					event.executeOneMin(currTime);
//					logger.info("1m event:"+event+",now:"+currTime);
				} catch (Exception e) {
					logger.error(LogTool.exception(e));
				}
			}
		}else if(cmdId==1){
			//5 min
			List<AbsBackstageEvent> events = BackstageCache.getExecuteFiveMinEvent();
			for(AbsBackstageEvent event:events){
				try {
					event.executeFiveMin(currTime);
//					logger.info("5m event:"+event+",now:"+currTime);
				} catch (Exception e) {
					logger.error(LogTool.exception(e));
				}
			}
		}else if(cmdId==2){
			//8 min
			List<AbsBackstageEvent> events = BackstageCache.getExecuteEightPreEvent();
			for(AbsBackstageEvent event:events){
				try {
					event.executeEightPre(currTime);
					logger.info("8m event:"+event+",now:"+currTime);
				} catch (Exception e) {
					logger.error(LogTool.exception(e));
				}
			}
		}else if(cmdId==3){
			//10 min
//			List<AbsBackstageEvent> events = BackstageCache.getExecutePreOneTenMinEvent();
//			for(AbsBackstageEvent event:events){
//				try {
//					event.executePreOneTenMin(beforeHourTime, currTime);
//				} catch (Exception e) {
//					logger.error(LogFormat.exception(e));
//				}
//			}
		}else if(cmdId==4){
			//60 min
			List<AbsBackstageEvent> events = BackstageCache.getExecuteOneHourEvent();
			for(AbsBackstageEvent event:events){
				try {
					event.executeOneHour(currTime);
					logger.info("60m event:"+event+",now:"+currTime);
				} catch (Exception e) {
					logger.error(LogTool.exception(e));
				}
			}
		}else if(cmdId==5){
			//one day
			List<AbsBackstageEvent> events = BackstageCache.getExecuteOneDayEvent();
			for(AbsBackstageEvent event:events){
				try {
					event.executeOneDay(currTime);
					logger.info("1d event:"+event+",now:"+currTime);
				} catch (Exception e) {
					logger.error(LogTool.exception(e));
				}
			}
		}
	}

	@Override
	public void fixtimeSyncPub(int now) {
		
	}
	@Override
	public void logoutSyncPub(Hero hero, int syncType) {
		
	}
	@Override
	public void taskOpen(Hero hero) {
		
	}
	@Override
	public void openNewGeneral(Hero hero, int job) {
		
	}

	@Override
	public void passGuanqia(Hero hero, int passGuanqia) {

	}
	
}
