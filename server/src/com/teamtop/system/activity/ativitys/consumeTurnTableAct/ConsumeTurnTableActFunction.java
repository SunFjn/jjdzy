package com.teamtop.system.activity.ativitys.consumeTurnTableAct;

import java.util.List;

import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.consumeTurnTableAct.model.ConsumeTurnTableAct;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;

import excel.config.Config_xhdxfzpxf_316;
import excel.struct.Struct_xhdxfzpxf_316;

public class ConsumeTurnTableActFunction {

	private static ConsumeTurnTableActFunction ins;

	private ConsumeTurnTableActFunction() {
		// TODO Auto-generated constructor stub
	}

	public static ConsumeTurnTableActFunction getIns() {
		if (ins == null) {
			ins = new ConsumeTurnTableActFunction();
		}
		return ins;
	}

	/**
	 * 元宝消费处理
	 * @param hero
	 * @param consumeNum
	 * @param reason
	 */
	public void consumeHandle(Hero hero, int consumeNum, int reason) {
		int nowId = 0;
		int totalRecharge = 0;
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_CONSUME_TURNTABLE)) {
				return;
			}
			ConsumeTurnTableAct consumeTurnTableAct = (ConsumeTurnTableAct) ActivityFunction.getIns()
					.getActivityData(hero, ActivitySysId.ACT_CONSUME_TURNTABLE);
			totalRecharge = consumeTurnTableAct.getTotalRecharge();
			consumeTurnTableAct.setTotalRecharge(totalRecharge + consumeNum);
			totalRecharge = consumeTurnTableAct.getTotalRecharge();
			List<Struct_xhdxfzpxf_316> list = ConsumeTurnTableActCache.getConsumeturnConfigMap()
					.get(consumeTurnTableAct.getPeriods());
			int size = list.size();
			nowId = consumeTurnTableAct.getNowId();
			while (nowId % 1000 < size) {
				Struct_xhdxfzpxf_316 struct_xhdxfzpxf_316 = null;
				if (nowId == 0) {
					struct_xhdxfzpxf_316 = list.get(0);
				} else {
					struct_xhdxfzpxf_316 = Config_xhdxfzpxf_316.getIns().get(++nowId);
				}
				int[][] yb = struct_xhdxfzpxf_316.getYb();
				int needConsume = yb[0][2];
				if (totalRecharge >= needConsume) {
					nowId = struct_xhdxfzpxf_316.getId();
					consumeTurnTableAct.setNowId(nowId);
					ConsumeTurnTableActFunction.getIns().redPoint(hero, false);
				} else {
					break;
				}
			}
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getNameZoneid(),
					"ConsumeTurnTableActFunction consumeHandle" + " nowId:" + nowId + " totalRecharge" + totalRecharge
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
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_CONSUME_TURNTABLE)) {
				return;
			}
			ConsumeTurnTableAct consumeTurnTableAct = (ConsumeTurnTableAct) ActivityFunction.getIns()
					.getActivityData(hero, ActivitySysId.ACT_CONSUME_TURNTABLE);
			turnedTimes = consumeTurnTableAct.getTurnedTimes();
			nowId = consumeTurnTableAct.getNowId();
			if (nowId == 0) {
				return;
			}
			Struct_xhdxfzpxf_316 struct_xhdxfzpxf_316 = Config_xhdxfzpxf_316.getIns().get(nowId);
			int times = struct_xhdxfzpxf_316.getTimes();
			if (turnedTimes < times) {
				if (isLogin) {
					RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.ACT_CONSUME_TURNTABLE, 1,
							RedPointConst.HAS_RED);
				} else {
					RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.ACT_CONSUME_TURNTABLE, 1,
							RedPointConst.HAS_RED);
				}
			}
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getNameZoneid(),
					"ConsumeTurnTableActFunction redPoint" + " nowId:" + nowId + " turnedTimes" + turnedTimes);
		}

	}

}
