package com.teamtop.system.activity.ativitys.themeConsume;

import java.util.Map;

import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.themeConsume.model.ThemeConsume;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;

import excel.config.Config_xtcs_004;
import excel.struct.Struct_xtcs_004;
import excel.struct.Struct_ztxfb_329;

public class ThemeConsumeFunction {
	private static ThemeConsumeFunction ins;

	private ThemeConsumeFunction() {
	}

	public static ThemeConsumeFunction getIns() {
		if (ins == null) {
			ins = new ThemeConsumeFunction();
		}
		return ins;
	}
	
	/**
	 * 活动结束补发奖励
	 * @param hero
	 */
	public void heroActEnd(Hero hero) {
		if (hero == null) return;
		ThemeConsume themeConsume = (ThemeConsume) ActivityFunction.getIns().getActivityData(hero, ActivitySysId.ACT_THEMECONSUME);//个人数据
		int type = themeConsume.getType();
		if(type > 0) {
			int qs = themeConsume.getPeriods();
			int consume = themeConsume.getConsume();
			Map<Integer, Integer> stateMap = themeConsume.getStateMap();
			Map<Integer, Struct_ztxfb_329> map = ThemeConsumeCache.themeConsumeConfig.get(qs);
			for(Struct_ztxfb_329 struct_ztxfb_329 : map.values()) {
				int yb = struct_ztxfb_329.getYb();
				if(consume>=yb && type==struct_ztxfb_329.getLx()) {
					int id = struct_ztxfb_329.getId();
					Integer state = stateMap.get(id);
					if(state == null) {
						stateMap.put(id, 2);
						int[][] reward = struct_ztxfb_329.getJl();
						MailFunction.getIns().sendMailWithFujianData2(hero.getId(), MailConst.THEMECONSUME, new Object[] { MailConst.THEMECONSUME }, reward);
					}
				}
			}
		}
	}
	
	/**
	 * 获得系统常量表累计充值
	 * @return
	 */
	public int getNum() {
		Struct_xtcs_004 struct_xtcs_004 = Config_xtcs_004.getIns().get(ThemeConsumeConst.RECHARGE);
		int num = struct_xtcs_004.getNum();
		return num;
	}
	
	/**
	 * 是否有红点：true.有
	 * @param hero
	 * @return
	 */
	public boolean isRed(Hero hero) {
		if (hero == null) return false;
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_THEMECONSUME)) return false;
		ThemeConsume themeConsume = (ThemeConsume) ActivityFunction.getIns().getActivityData(hero, ActivitySysId.ACT_THEMECONSUME);//个人数据
		int type = themeConsume.getType();
		if(type == 0) {//没有激活
			int recharge = themeConsume.getRecharge();
			int num = getNum();
			if(recharge >= num) {
				return true;
			}
		}else {
			int qs = themeConsume.getPeriods();
			int consume = themeConsume.getConsume();
			Map<Integer, Integer> stateMap = themeConsume.getStateMap();
			Map<Integer, Struct_ztxfb_329> map = ThemeConsumeCache.themeConsumeConfig.get(qs);
			for(Struct_ztxfb_329 struct_ztxfb_329 : map.values()) {
				int yb = struct_ztxfb_329.getYb();
				if(consume>=yb && type==struct_ztxfb_329.getLx()) {
					Integer state = stateMap.get(struct_ztxfb_329.getId());
					if(state == null) {
						return true;
					}
				}
			}
		}
		return false;
	}
	
	/**
	 * 登录推送红点
	 * @param hero
	 */
	public void loginRed(Hero hero) {
		try {
			if (hero == null) return;
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_THEMECONSUME)) return;
			boolean bool = isRed(hero);
			if(bool) {
				RedPointFunction.getIns().addLoginRedPoint(hero,  ActivitySysId.ACT_THEMECONSUME, RedPointConst.RED_1, RedPointConst.HAS_RED);
			}
		}catch (Exception e) {
			LogTool.error(e, this, hero.getId(), hero.getName(), "ThemeConsumeFunction loginRed 登录推送红点  异常");
		}
	}
	
	/**
	 * 消费记录及推送红点
	 * @param hero
	 */
	public void consume(Hero hero, int consumeNum) {
		try {
			if (hero == null) return;
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_THEMECONSUME)) return;
			ThemeConsume themeConsume = (ThemeConsume) ActivityFunction.getIns().getActivityData(hero, ActivitySysId.ACT_THEMECONSUME);//个人数据
			themeConsume.setConsume(themeConsume.getConsume()+consumeNum);
			boolean bool = isRed(hero);
			if(bool) {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.ACT_THEMECONSUME, RedPointConst.RED_1, RedPointConst.HAS_RED);
			}
		}catch (Exception e) {
			LogTool.error(e, this, hero.getId(), hero.getName(), "ThemeConsumeFunction consumeRed 消费推送红点 异常");
		}
	}
	
	/**
	 * 充值记录及推送红点
	 * @param hero
	 */
	public void recharge(Hero hero, int rechargeNum) {
		try {
			if (hero == null) return;
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_THEMECONSUME)) return;
			ThemeConsume themeConsume = (ThemeConsume) ActivityFunction.getIns().getActivityData(hero, ActivitySysId.ACT_THEMECONSUME);//个人数据
			themeConsume.setRecharge(themeConsume.getRecharge()+rechargeNum);
			boolean bool = isRed(hero);
			if(bool) {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.ACT_THEMECONSUME, RedPointConst.RED_1, RedPointConst.HAS_RED);
			}
		}catch (Exception e) {
			LogTool.error(e, this, hero.getId(), hero.getName(), "ThemeConsumeFunction consumeRed 消费推送红点 异常");
		}
	}
	
	
}
