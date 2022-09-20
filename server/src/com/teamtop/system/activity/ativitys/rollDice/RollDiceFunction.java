package com.teamtop.system.activity.ativitys.rollDice;

import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.rollDice.model.RollDice;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;

import excel.config.Config_xfytsx_763;
import excel.struct.Struct_xfytsx_763;

public class RollDiceFunction {
	private static RollDiceFunction ins;

	private RollDiceFunction() {
	}

	public static RollDiceFunction getIns() {
		if (ins == null) {
			ins = new RollDiceFunction();
		}
		return ins;
	}
	
	/**
	 * 登录推送红点
	 * @param hero
	 */
	public void loginRed(Hero hero) {
		try {
			if (hero == null) return;
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_ROLLDICE)) return;
			int num = getNum(hero);
			if(num > 0) {
				RedPointFunction.getIns().addLoginRedPoint(hero,  ActivitySysId.ACT_ROLLDICE, RedPointConst.RED_1, RedPointConst.HAS_RED);
			}
		}catch (Exception e) {
			LogTool.error(e, this, hero.getId(), hero.getName(), "RollDiceFunction loginRed 登录推送红点  异常");
		}
	}
	
	/**
	 * 消费记录及推送红点
	 * @param hero
	 */
	public void consume(Hero hero, int consumeNum) {
		try {
			if (hero == null) return;
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_ROLLDICE)) return;
			RollDice rollDice = (RollDice) ActivityFunction.getIns().getActivityData(hero, ActivitySysId.ACT_ROLLDICE);//个人数据
			rollDice.setConsume(rollDice.getConsume()+consumeNum);
			
			int num = getNum(hero);
			if(num > 0) {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.ACT_ROLLDICE, RedPointConst.RED_1, RedPointConst.HAS_RED);
			}
		}catch (Exception e) {
			LogTool.error(e, this, hero.getId(), hero.getName(), "RollDiceFunction consumeRed 消费推送红点 异常");
		}
	}
	
	/**
	 * 获得摇骰子次数
	 * @param hero
	 * @return
	 */
	public int getNum(Hero hero) {
		RollDice rollDice = (RollDice) ActivityFunction.getIns().getActivityData(hero, ActivitySysId.ACT_ROLLDICE);//个人数据
		if(rollDice == null) return 0;
		int qs = rollDice.getPeriods();
		int consume = rollDice.getConsume();
		int useNum = rollDice.getNum();
		
		Struct_xfytsx_763 struct_xfytsx_763 = Config_xfytsx_763.getIns().get(qs);
		int sysNum = consume/struct_xfytsx_763.getXf();
		if(sysNum > struct_xfytsx_763.getCs()) {
			sysNum = struct_xfytsx_763.getCs();
		}
		
		int num = sysNum-useNum;
		if(num < 0) num=0;
		return num;
	}
}
