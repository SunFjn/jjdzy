package com.teamtop.system.openDaysSystem.otherSevenDayLogin;


import java.util.Map;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.openDaysSystem.OpenDaysSystemFunction;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.time.TimeDateUtil;
import excel.config.Config_hdfl_012;

public class OtherSevenDayLoginEvent extends AbsSystemEvent {

	private static OtherSevenDayLoginEvent ins;
	public static OtherSevenDayLoginEvent getIns(){
		if(ins == null) {
			ins = new OtherSevenDayLoginEvent();
		}
		return ins;
	}
	@Override
	public void init(Hero hero) {

	}
	
	@Override
	public void login(Hero hero) {	
		int betweenOpen = TimeDateUtil.betweenOpen();
		int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.SEVENDAYLOGIN);
		if (uid == -1) {
			return;
		}
		if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.SEVENDAYLOGIN)) {
			return;
		}
		OtherSevenDayLogin otherSevenDayLogin = (OtherSevenDayLogin) OtherSevenDayLoginManager.getIns().getSystemModel(hero, uid);
		Map<Integer, OtherSevenDayLoginData> dataMap = otherSevenDayLogin.getDataMap();
		
		Map<Integer, Integer> checkDay = otherSevenDayLogin.getCheckDay();
		Integer state = checkDay.get(betweenOpen);
		if(state==null) {
			state=1;
			checkDay.put(betweenOpen, state);
		}			
		int loginDay = checkDay.size();
		OtherSevenDayLoginData data = dataMap.get(loginDay);
		if(data==null) {
			data = new OtherSevenDayLoginData();
			data.setAwardsGet(1);
			dataMap.put( loginDay, data);			
		}	
		OtherSevenDayLoginManager.getIns().chackRed(hero);
	}
	
	@Override
	public void zeroHero(Hero hero,int now){	
		loginReset(hero, now);
		RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.SEVENDAYLOGIN, OtherSevenDayLoginConst.RED_1, RedPointConst.HAS_RED);
		RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.SEVENDAYLOGIN, OtherSevenDayLoginConst.RED_1, RedPointConst.HAS_RED);								
	}

	@Override
	public void loginReset(Hero hero,int now){
		int betweenOpen = TimeDateUtil.betweenOpen();
		int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.SEVENDAYLOGIN);
		if (uid == -1) {
			return;
		}
		if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.SEVENDAYLOGIN)) {
			return;
		}
		OtherSevenDayLogin otherSevenDayLogin = (OtherSevenDayLogin) OtherSevenDayLoginManager.getIns()
				.getSystemModel(hero, uid);
		Map<Integer, OtherSevenDayLoginData> dataMap = otherSevenDayLogin.getDataMap();

		Map<Integer, Integer> checkDay = otherSevenDayLogin.getCheckDay();
		Integer state = checkDay.get(betweenOpen);
		if (state == null) {
			state = 1;
			checkDay.put(betweenOpen, state);
		}
		int loginDay = checkDay.size();
		OtherSevenDayLoginData data = dataMap.get(loginDay);
		if (data == null) {
			data = new OtherSevenDayLoginData();
			data.setAwardsGet(1);
			dataMap.put(loginDay, data);
		}
		OtherSevenDayLoginManager.getIns().chackRed(hero);
	}
	


}
