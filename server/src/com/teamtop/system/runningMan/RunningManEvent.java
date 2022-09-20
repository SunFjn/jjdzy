package com.teamtop.system.runningMan;

import java.util.HashMap;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.rewardBack.RewardBackFunction;

public class RunningManEvent extends AbsSystemEvent {

	private static RunningManEvent ins;
	public static RunningManEvent getIns(){
		if(ins == null) {
			ins = new RunningManEvent();
		}
		return ins;
	}
	@Override
	public void init(Hero hero) {
		RunningMan runningMan=hero.getRunningMan();
		if (runningMan==null) {
			runningMan=new RunningMan();
			runningMan.setHid(hero.getId());
			runningMan.setMaxtodayFloor(new HashMap<Integer,Integer>());
			runningMan.setMaxHisFloor(new HashMap<Integer,Integer>());
			int size=RunningManCache.getGodEquipLvMap().size();
			for (int i = 1; i <= size; i++) {
				runningMan.getMaxtodayFloor().put(i, 0);
				runningMan.getMaxHisFloor().put(i, 0);
			}
			hero.setRunningMan(runningMan);
			runningMan.setIsNow(1);
			runningMan.setMaxHisnum(0);
			runningMan.setMaxtodaynum(0);
		}else {
			if (runningMan.getIsNow()==0) {
				int maxHisNum=0;
				int masDayNum=0;
				for (int i = 1; i <= RunningManConst.TYPE_4; i++) {
					if (hero.getRunningMan().getMaxHisFloor().containsKey(i)) {
						Integer num = hero.getRunningMan().getMaxHisFloor().get(i);
						if (num>maxHisNum) {
							maxHisNum=num;
						}
					}
					if (hero.getRunningMan().getMaxtodayFloor().containsKey(i)) {
						Integer num = hero.getRunningMan().getMaxtodayFloor().get(i);
						if (num>masDayNum) {
							masDayNum=num;
						}
					}
				}
				runningMan.setMaxHisnum(maxHisNum);
				runningMan.setMaxtodaynum(masDayNum);
				runningMan.setIsNow(1);
			}
		}
		
		
	}
	@Override
	public void login(Hero hero) {
		
		
	}
	
	public void zeroHero(Hero hero,int now){
		/*int size=RunningManCache.getGodEquipLvMap().size();
		if (hero.getRunningMan()!=null) {
			for (int i = 1; i <= size; i++) {
				hero.getRunningMan().getMaxtodayFloor().put(i, 0);
			}
		}*/
		//奖励找回处理(重置前)
		RewardBackFunction.getIns().handle(hero,SystemIdConst.RUNNINGMAN,0);
		hero.getRunningMan().setMaxtodaynum(0);
		//奖励找回处理(重置后)
		RewardBackFunction.getIns().handle(hero,SystemIdConst.RUNNINGMAN,1);
	}
	
	public void loginReset(Hero hero,int now){
		zeroHero(hero, now);
	}

}