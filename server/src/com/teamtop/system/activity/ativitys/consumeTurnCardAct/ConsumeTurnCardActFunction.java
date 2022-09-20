package com.teamtop.system.activity.ativitys.consumeTurnCardAct;

import java.util.List;

import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.consumeTurnCardAct.model.ConsumeTurnCardAct;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;

import excel.config.Config_xhdxffpxfb_318;
import excel.struct.Struct_xhdxffpxfb_318;

public class ConsumeTurnCardActFunction {

	private static ConsumeTurnCardActFunction ins;

	private ConsumeTurnCardActFunction() {
		// TODO Auto-generated constructor stub
	}

	public static ConsumeTurnCardActFunction getIns() {
		if (ins == null) {
			ins = new ConsumeTurnCardActFunction();
		}
		return ins;
	}

	/**
	 * 元宝消费处理
	 * 
	 * @param hero
	 * @param consumeNum
	 * @param reason
	 */
	public void consumeHandle(Hero hero, int consumeNum, int reason) {
		int nowId = 0;
		int totalRecharge = 0;
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_CONSUME_TURNCARD)) {
				return;
			}
			ConsumeTurnCardAct consumeTurnCardAct = (ConsumeTurnCardAct) ActivityFunction.getIns().getActivityData(hero,
					ActivitySysId.ACT_CONSUME_TURNCARD);
			totalRecharge = consumeTurnCardAct.getTotalRecharge();
			consumeTurnCardAct.setTotalRecharge(totalRecharge + consumeNum);
			totalRecharge = consumeTurnCardAct.getTotalRecharge();
			List<Struct_xhdxffpxfb_318> list = ConsumeTurnCardActCache.getConsumeturnConfigMap()
					.get(consumeTurnCardAct.getPeriods());
			int size = list.size();
			nowId = consumeTurnCardAct.getNowId();
			int needConsume = 0;
			for (int i = nowId % 1000; i < size; i++) {
				Struct_xhdxffpxfb_318 struct_xhdxffpxfb_318 = list.get(i);
				needConsume = struct_xhdxffpxfb_318.getYb()[0][2];
				if (totalRecharge >= needConsume) {
					nowId = struct_xhdxffpxfb_318.getId();
					consumeTurnCardAct.setNowId(nowId);
					ConsumeTurnCardActFunction.getIns().redPoint(hero, false);
				} else {
					break;
				}
			}
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getNameZoneid(),
					"ConsumeTurnCardActFunction consumeHandle" + " nowId:" + nowId + " totalRecharge" + totalRecharge
							+ " consumeNum:" + consumeNum + " reason" + reason);
		}
	}

	/**
	 * 红点发送
	 * 
	 * @param isLogin 是否登录状态
	 */
	public void redPoint(Hero hero, boolean isLogin) {
		int turnedTimes = 0;
		int nowId = 0;
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_CONSUME_TURNCARD)) {
				return;
			}
			ConsumeTurnCardAct consumeTurnCardAct = (ConsumeTurnCardAct) ActivityFunction.getIns().getActivityData(hero,
					ActivitySysId.ACT_CONSUME_TURNCARD);
			turnedTimes = consumeTurnCardAct.getTurnedTimes();
			nowId = consumeTurnCardAct.getNowId();
			if (nowId == 0) {
				return;
			}
			Struct_xhdxffpxfb_318 struct_xhdxffpxfb_318 = Config_xhdxffpxfb_318.getIns().get(nowId);
			int times = struct_xhdxffpxfb_318.getTimes();
			if (turnedTimes < times) {
				if (isLogin) {
					RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.ACT_CONSUME_TURNCARD, 1,
							RedPointConst.HAS_RED);
				} else {
					RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.ACT_CONSUME_TURNCARD, 1,
							RedPointConst.HAS_RED);
				}
			}
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getNameZoneid(),
					"ConsumeTurnCardActFunction redPoint" + " nowId:" + nowId + " turnedTimes" + turnedTimes);
		}

	}

}
