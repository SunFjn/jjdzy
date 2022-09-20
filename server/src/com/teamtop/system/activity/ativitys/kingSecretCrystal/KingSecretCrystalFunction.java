package com.teamtop.system.activity.ativitys.kingSecretCrystal;

import java.util.Iterator;
import java.util.Map;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.kingSecretCrystal.model.KingRewardInfo;
import com.teamtop.system.activity.ativitys.kingSecretCrystal.model.KingSecretCrystalModel;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventFactory;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.log.LogTool;

import excel.config.Config_zzmb_503;
import excel.config.Config_zzmbxh_503;
import excel.struct.Struct_zzmb_503;
import excel.struct.Struct_zzmbxh_503;

public class KingSecretCrystalFunction {

	private static KingSecretCrystalFunction ins;

	private KingSecretCrystalFunction() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized KingSecretCrystalFunction getIns() {
		if (ins == null) {
			ins = new KingSecretCrystalFunction();
		}
		return ins;
	}

	/**
	 * 更新红点
	 * @param hero
	 */
	public void updateRedPoint(Hero hero) {
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_KING_SECRET_CTRISTAL)) {
				return;
			}
			boolean checkRedPoint = checkRedPoint(hero);
			if (checkRedPoint) {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.ACT_KING_SECRET_CTRISTAL,
						RedPointConst.RED_1, RedPointConst.HAS_RED);
			} else {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.ACT_KING_SECRET_CTRISTAL,
						RedPointConst.RED_1, RedPointConst.NO_RED);
			}
		} catch (Exception e) {
			LogTool.error(e, KingSecretCrystalFunction.class, hero.getId(), hero.getName(),
					"KingSecretCrystalFunction updateRedPoint");
		}
	}

	/**
	 * 检测红点
	 * @param hero
	 * @return
	 */
	public boolean checkRedPoint(Hero hero) {
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_KING_SECRET_CTRISTAL)) {
				return false;
			}
			KingSecretCrystalModel model = (KingSecretCrystalModel) hero.getHeroActivityData().getActivityDataMap()
					.get(ActivitySysId.ACT_KING_SECRET_CTRISTAL);
			// 将还有剩余份数的奖励加入概率事件
			ProbabilityEventModel proModel = ProbabilityEventFactory.getProbabilityEvent();
			Map<Integer, Struct_zzmb_503> map = Config_zzmb_503.getIns().getMap();
			Map<Integer, KingRewardInfo> rewardMap = model.getRewardMap();
			Iterator<KingRewardInfo> iterator = rewardMap.values().iterator();
			boolean canDraw = false;
			for (; iterator.hasNext();) {
				KingRewardInfo rewardInfo = iterator.next();
				int num = rewardInfo.getNum();
				if (num > 0) {
					int index = rewardInfo.getIndex();
					int id = rewardInfo.getId();
					Struct_zzmb_503 zzmb_503 = map.get(id);
					proModel.addProbabilityEvent(zzmb_503.getGl(), index);
					canDraw = true;
				}
			}
			if (!canDraw) {
				if (UseAddUtil.canUse(hero, GameConst.TOOL, 1, KingSecretCrystalConst.SYSID)) {
					return true;
				}
			} else {
				int drawNum = model.getDrawNum();
				int size = Config_zzmbxh_503.getIns().size();
				int nowNum = drawNum + 1;
				if (nowNum >= size) {
					nowNum = size;
				}
				Struct_zzmbxh_503 zzmbxh_503 = Config_zzmbxh_503.getIns().get(nowNum);
				int[][] consume = zzmbxh_503.getConsume();
				if (UseAddUtil.canUse(hero, consume)) {
					return true;
				}
			}
		} catch (Exception e) {
			LogTool.error(e, KingSecretCrystalFunction.class, hero.getId(), hero.getName(),
					"KingSecretCrystalFunction checkRedPoint");
		}
		return false;
	}

}
