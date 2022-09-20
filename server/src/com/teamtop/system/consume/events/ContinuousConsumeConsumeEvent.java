package com.teamtop.system.consume.events;

import java.util.List;
import java.util.Map;

import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.continuousConsume.ContinuousConsume;
import com.teamtop.system.activity.ativitys.continuousConsume.ContinuousConsumeData;
import com.teamtop.system.activity.ativitys.continuousConsume.ContinuousConsumeManager;
import com.teamtop.system.consume.AbsConsumeEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;

import excel.config.Config_lxxf2_737;
import excel.struct.Struct_lxxf2_737;

public class ContinuousConsumeConsumeEvent  extends AbsConsumeEvent {

	@Override
	public void consumeHandle(Hero hero, int consumeNum, int reason) {
		boolean checkSystemOpen = HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.CONTINUOUS_RECHARGE);
		if( !checkSystemOpen){
			//系统未开启
			return;
		}
		if (!ActivityFunction.getIns().checkSwitch(ActivitySysId.ACT_CONTINUOUS_CONSUME)) {
			//活动未开启
			return;
		}
		int days = ActivityFunction.getIns().getActivityOpenDays(ActivitySysId.ACT_CONTINUOUS_CONSUME);
		ContinuousConsume dataAll = (ContinuousConsume)hero.getHeroActivityData().getActivityDataMap().get(ActivitySysId.ACT_CONTINUOUS_CONSUME);
		int periods = dataAll.getPeriods();
		
		Struct_lxxf2_737 excel = null;
		List<Struct_lxxf2_737> sortList = Config_lxxf2_737.getIns().getSortList();
		for(Struct_lxxf2_737 temp:sortList){
			int qishu = temp.getQishu();
			int tianshu = temp.getTianshu();
			if(qishu == periods&& tianshu == days){
				excel = temp;
				break;
			}
		}
		if(excel == null)
			//没找到配置
			return;
		ContinuousConsume activityData = (ContinuousConsume) ActivityFunction.getIns().getActivityData(hero, ActivitySysId.ACT_CONTINUOUS_CONSUME);
		Map<Integer, ContinuousConsumeData> dataMap = activityData.getDataMap();
		ContinuousConsumeData dataOneDay = dataMap.get(excel.getId());
		if( dataOneDay==null){
			dataOneDay = new ContinuousConsumeData();
			dataMap.put(excel.getId(), dataOneDay);
		}
		int moneySpend = dataOneDay.getMoneySpend();
		dataOneDay.setMoneySpend(moneySpend + consumeNum);
		ContinuousConsumeManager.getIns().checkRed(hero, 2);
	}

}
