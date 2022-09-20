package com.teamtop.util.time;

import com.teamtop.gameCommon.GameProperties;
import com.teamtop.system.chat.ChatConst;
import com.teamtop.system.chat.ChatManager;
import com.teamtop.system.global.GlobalSender;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.util.exector.schedule.AbsScheduleExecutor;

public class TimeDateSchedule extends AbsScheduleExecutor{
	private static int oneDayHowManyMinutes  = 24*60;
	private static String accountSetTimeGM  = "??";
	
	public TimeDateSchedule(long delay, long interval, boolean useLong) {
		super(delay, interval, useLong);
	}

	@Override
	public void execute(int now) {
		if( GameProperties.gmFlag){
			if(TimeDateUtil.MINUTE_IN_DAY==oneDayHowManyMinutes)
				return;
			int timeMultiple = TimeDateUtil.MINUTE_IN_DAY/oneDayHowManyMinutes;
			int currentTime = TimeDateUtil.getCurrentTime();
			if( currentTime==0){
				currentTime = (int) (System.currentTimeMillis()/1000);
			}
			int timeNew = currentTime+ timeMultiple;
			TimeDateUtil.setModifyTime(timeNew);
			boolean sameHour = TimeDateUtil.isSameHour(currentTime, timeNew);
			if(!sameHour){
				ChatManager.getIns().chatToAllHero( ChatConst.CROSS, 0, 1003, 2001, 1,0, 0, 1, 0, 0, 1, "<font color='#84dbFF'>【系统】</font>", 0, "当前时间:"+TimeDateUtil.getTimeStrByInt(timeNew, "yyyy-MM-dd HH:mm:ss")+"  gm:"+oneDayHowManyMinutes+"  openID:"+accountSetTimeGM);
			}
			//通知在线玩家服务器时间改变
			for(Hero tempHero : HeroCache.getHeroMap().values()){
				//通知前端当前服务器时间
				if(tempHero!=null && HeroFunction.getIns().isOnline(tempHero.getId())){
					GlobalSender.sendCmd_252(tempHero.getId(), TimeDateUtil.getCurrentTimeInMillis(), TimeDateUtil.serverTimezone.getDisplayName());
				}
			}
			TimeDateUtil.isModifyTime = true;
		}
	}

	public static int getOneDayHowManyMinutes() {
		return oneDayHowManyMinutes;
	}
	public static void setOneDayHowManyMinutes(int oneDayHowManyMinutes) {
		TimeDateSchedule.oneDayHowManyMinutes = oneDayHowManyMinutes;
	}
	public static String getAccountSetTimeGM() {
		return accountSetTimeGM;
	}
	public static void setAccountSetTimeGM(String accountSetTimeGM) {
		TimeDateSchedule.accountSetTimeGM = accountSetTimeGM;
	}
}
