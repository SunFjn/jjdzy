package com.teamtop.system.chuangGuanYouLi;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import com.teamtop.system.chuangGuanYouLi.model.ChuangGuanYouLi;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;

public class ChuangGuanYouLiEvent extends AbsSystemEvent {
	private static ChuangGuanYouLiEvent ins;

	public static ChuangGuanYouLiEvent getIns() {
		if (ins == null) {
			ins = new ChuangGuanYouLiEvent();
		}
		return ins;
	}

	private ChuangGuanYouLiEvent() {
	}

	@Override
	public void zeroHero(final Hero hero, final int now) {

	}

	@Override
	public void loginReset(Hero hero, int now) {

	}

	@Override
	public void init(Hero hero) {
		ChuangGuanYouLi data = hero.getChuangGuanYouLi();
		if(data==null) {
			data = new ChuangGuanYouLi();
			hero.setChuangGuanYouLi(data);
		}
		data.setHid( hero.getId());
		Map<Integer, Integer> taskMap = data.getTaskMap();
		if(taskMap == null) {
			taskMap = new HashMap<>();
			data.setTaskMap(taskMap);
		}
		
		//初始化
		int targetID = data.getTargetID();
		if(targetID==0) {
			targetID = ChuangGuanYouLiCache.getTargetMinID();
			data.setTargetID(targetID);
			
			Map<Integer, Set<Integer>> targerToTaskIDMap = ChuangGuanYouLiCache.getTargetToTaskIDMap();
			Set<Integer> taskExcelSet = targerToTaskIDMap.get(targetID);
			for(int taskIDExcel:taskExcelSet) {
				Integer integer = taskMap.get(taskIDExcel);
				if(integer==null) {
					taskMap.put(taskIDExcel, ChuangGuanYouLiConst.TYPE_AWARD_0);
				}
			}
		}
	}

	@Override
	public void login(Hero hero) {
		//检查任务ID
		ChuangGuanYouLi data = hero.getChuangGuanYouLi();
		int targetID = data.getTargetID();
		Map<Integer, Integer> taskMap = data.getTaskMap();
		Map<Integer, Set<Integer>> targerToTaskIDMap = ChuangGuanYouLiCache.getTargetToTaskIDMap();
		Set<Integer> taskExcelSet = targerToTaskIDMap.get(targetID);
		for(int taskIDExcel:taskExcelSet) {
			Integer integer = taskMap.get(taskIDExcel);
			if(integer==null) {
				taskMap.put(taskIDExcel, ChuangGuanYouLiConst.TYPE_AWARD_0);
			}
		}
		
		ChuangGuanYouLiFunction.getIns().door(hero, 1);
		ChuangGuanYouLiFunction.getIns().checkRed(hero,1);
	}

	@Override
	public void levelUp(Hero hero, int newLv, int oldLv) {

	}

	@Override
	public void passGuanqia(Hero hero, int passGuanqia) {
		ChuangGuanYouLiFunction.getIns().checkRed(hero,2);
	}


}
