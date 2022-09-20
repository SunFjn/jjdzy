package com.teamtop.system.eightDoor;

import java.util.HashMap;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_bmjs_262;
import excel.config.Config_bmjsrw_262;
import excel.config.Config_hdfl_012;
import excel.struct.Struct_bmjs_262;
import excel.struct.Struct_bmjsrw_262;
import excel.struct.Struct_hdfl_012;

public class EightDoorEvent extends AbsSystemEvent {
	private static EightDoorEvent ins = null;

	public static EightDoorEvent getIns() {
		if (ins == null) {
			ins = new EightDoorEvent();
		}
		return ins;
	}

	@Override
	public void init(Hero hero) {
		EightDoor eightDoor = hero.getEightDoor();
		if (eightDoor==null) {
			eightDoor=new EightDoor();
			eightDoor.setHid(hero.getId());
			HashMap<Integer, Integer[]> taskRewads=new HashMap<>();
			HashMap<Integer, Integer> bigGoalReward=new HashMap<>();
			for(Struct_bmjsrw_262 bmjsrw_262:Config_bmjsrw_262.getIns().getSortList()) {
				if (!taskRewads.containsKey(bmjsrw_262.getId())) {
					taskRewads.put(bmjsrw_262.getId(), new Integer[] {0,GameConst.REWARD_0});
				}
			}
			for(Struct_bmjs_262 bmjs_262:Config_bmjs_262.getIns().getSortList()) {
				if (!bigGoalReward.containsKey(bmjs_262.getId())) {
					bigGoalReward.put(bmjs_262.getId(), GameConst.REWARD_0);
				}
			}
			eightDoor.setTaskRewads(taskRewads);
			eightDoor.setBigGoalReward(bigGoalReward);
			hero.setEightDoor(eightDoor);
		}
		
	}

	@Override
	public void login(Hero hero) {
		EightDoorSysModel eightDoorSysModel = EightDoorSysCache.getEightDoorSysModel();
		int nowTime=TimeDateUtil.getCurrentTime();
		if (nowTime<eightDoorSysModel.getOverTime()&&nowTime>eightDoorSysModel.getBeginTime()) {
			EightDoorSender.sendCmd_4520(hero.getId(), SystemIdConst.EIGHTDOOR, 0, eightDoorSysModel.getQs(), eightDoorSysModel.getBeginTime(), eightDoorSysModel.getOverTime());
		}
		EightDoorFunction.getIns().readPoint(hero);
		EightDoorFunction.getIns().oldHeroEightDoor(hero, EightDoorConst.EIGHTDOOR_TYPE_8,1);
	}
	
	public void levelUp(Hero hero,int newLv,int oldLv){
	
		
	}
	
	public void passGuanqia(Hero hero, int passGuanqia) {
		if (!EightDoorFunction.getIns().isOpen()) {
			return;
		}
		EightDoorSysModel eightDoorSysModel = EightDoorSysCache.getEightDoorSysModel();
		int nowTime=TimeDateUtil.getCurrentTime();
		if (nowTime<eightDoorSysModel.getOverTime()&&nowTime>eightDoorSysModel.getBeginTime()) {
			EightDoorSender.sendCmd_4520(hero.getId(), SystemIdConst.EIGHTDOOR, 0, eightDoorSysModel.getQs(), eightDoorSysModel.getBeginTime(), eightDoorSysModel.getOverTime());
		}
		EightDoorFunction.getIns().readPoint(hero);
	}
	
	@Override
	public void loginReset(Hero hero, int now) {
		zeroHero(hero, now);
	}
	
	@Override
	public void zeroPub(int now){
		EightDoorSysModel eightDoorSysModel = EightDoorSysCache.getEightDoorSysModel();
		for (Struct_hdfl_012 struct_hdfl_012:Config_hdfl_012.getIns().getSortList()) {
			if (struct_hdfl_012.getId()==SystemIdConst.EIGHTDOOR) {
				int openFuDay = TimeDateUtil.betweenOpen();
				int qs = struct_hdfl_012.getQs();
				if (openFuDay>=struct_hdfl_012.getOpen()&&!eightDoorSysModel.getHasOpen().contains(qs)) {
					//开服天数大于x 且 这个服没有开过这个一期活动
					//今天零点开启
					int beginTime=TimeDateUtil.getTodayZeroTimeReturnInt();
					//七日后0点结束
					int overTime=beginTime+3600*24*7;
					eightDoorSysModel.setBeginTime(beginTime);
					eightDoorSysModel.setOverTime(overTime);
					eightDoorSysModel.setQs(qs);
					eightDoorSysModel.getHasOpen().add(qs);
					EightDoorSysCache.upDate();
					for (Hero hero: HeroCache.getHeroMap().values()) {
						if (hero.isOnline()) {
							EightDoorSender.sendCmd_4520(hero.getId(), SystemIdConst.EIGHTDOOR, 0, eightDoorSysModel.getQs(), eightDoorSysModel.getBeginTime(), eightDoorSysModel.getOverTime());
						}
					}
					return;
				}
				break;
			}
		}
	}

	@Override
	public void zeroHero(Hero hero, int now) {
		EightDoorSysModel eightDoorSysModel2 = EightDoorSysCache.getEightDoorSysModel();
		int nowTime=TimeDateUtil.getCurrentTime();
		if (eightDoorSysModel2.getQs()>0&&nowTime>=eightDoorSysModel2.getOverTime()) {
			EightDoorSender.sendCmd_4520(hero.getId(), SystemIdConst.EIGHTDOOR, 0, eightDoorSysModel2.getQs(), eightDoorSysModel2.getBeginTime(), eightDoorSysModel2.getOverTime());
			
			EightDoor eightDoor=hero.getEightDoor();
			HashMap<Integer, Integer> bigGoalReward = eightDoor.getBigGoalReward();
			HashMap<Integer, Integer[]> taskRewads = eightDoor.getTaskRewads();
			int nowDoorNum=1;
			for (int i = 1; i <=Config_bmjs_262.getIns().size(); i++) {
				if (bigGoalReward.get(i)==GameConst.REWARD_2) {
					nowDoorNum=i+1;
				}
			}
			if (nowDoorNum<=Config_bmjs_262.getIns().size()) {
				for (int i = 1; i <=nowDoorNum; i++) {
					Struct_bmjs_262 struct_bmjs_262 = Config_bmjs_262.getIns().get(i);
					if (bigGoalReward.get(i)==GameConst.REWARD_1) {
						bigGoalReward.put(i, GameConst.REWARD_2);
						MailFunction.getIns().sendMailWithFujianData2(hero.getId(), MailConst.MIAL_EIGHTDOOR, new Object[] {MailConst.MIAL_EIGHTDOOR}, struct_bmjs_262.getReward());
					}
				}
				for(Struct_bmjsrw_262 bmjsrw_262:Config_bmjsrw_262.getIns().getSortList()) {
					Integer[] integers = taskRewads.get(bmjsrw_262.getId());
					if (integers[1]==GameConst.REWARD_1&&bmjsrw_262.getDoor()<=nowDoorNum) {
						integers[1]=GameConst.REWARD_2;
						MailFunction.getIns().sendMailWithFujianData2(hero.getId(), MailConst.MIAL_EIGHTDOOR, new Object[] {MailConst.MIAL_EIGHTDOOR}, bmjsrw_262.getReward());
					}
				}
			}
			EightDoorSender.sendCmd_4520(hero.getId(), SystemIdConst.EIGHTDOOR, 1, eightDoorSysModel2.getQs(), eightDoorSysModel2.getBeginTime(), eightDoorSysModel2.getOverTime());
			
		}
	}
	
	 

}
