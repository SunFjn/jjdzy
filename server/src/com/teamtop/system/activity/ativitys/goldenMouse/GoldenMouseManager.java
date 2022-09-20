package com.teamtop.system.activity.ativitys.goldenMouse;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.activity.AbstractActivityManager;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.model.ActivityData;
import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.ProbabilityEvent.RandomUtil;
import com.teamtop.util.log.LogTool;

import excel.config.Config_jssc_774;
import excel.struct.Struct_jssc_774;

public class GoldenMouseManager extends AbstractActivityManager{
	
	public static GoldenMouseManager ins;

	public static synchronized GoldenMouseManager getIns() {
		if (ins == null) {
			ins = new GoldenMouseManager();
		}
		return ins;
	}

	@Override
	public void actOpen() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void heroActOpen(Hero hero) {
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.GOLDENMOUSE)) {
				return;
			}
			// 活动开启处理
			GoldenMouse goldenMouse = (GoldenMouse)hero.getHeroActivityData().getActivityDataMap().get(ActivitySysId.GOLDENMOUSE);
			goldenMouse.setHasBuyNum(0);
			goldenMouse.setHasGetNum(0);
			goldenMouse.setRechargeNum(hero.getOneDayRecharge());
		} catch (Exception e) {
			LogTool.error(e, GoldenMouseManager.class, "heroActOpen has wrong");
		}
		
		
	}

	@Override
	public void actEnd() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void heroActEnd(Hero hero) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public ActivityData getActivityData(Hero hero, ActivityInfo activityInfo) {
		GoldenMouse goldenMouse=new GoldenMouse();
		goldenMouse.setHid(hero.getId());
		goldenMouse.setIndexId(activityInfo.getIndex());
		goldenMouse.setActId(activityInfo.getActId());
		goldenMouse.setPeriods(activityInfo.getPeriods());
		goldenMouse.setHasBuyNum(0);
		goldenMouse.setHasGetNum(0);
		goldenMouse.setRechargeNum(hero.getOneDayRecharge());
		return goldenMouse;
	}

	@Override
	public Class<?> getActivityData() {
		
		return GoldenMouse.class;
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.GOLDENMOUSE)) {
			return;
		}
		GoldenMouse goldenMouse = (GoldenMouse)hero.getHeroActivityData().getActivityDataMap().get(ActivitySysId.GOLDENMOUSE);
		goldenMouse.setRechargeNum(goldenMouse.getRechargeNum()+money);
		int maxBuyNumByRechrge = GoldenMouseFunction.getIns().getMaxBuyNumByRechrge(goldenMouse.getRechargeNum());
		GoldenMouseSender.sendCmd_11580(hero.getId(), goldenMouse.getRechargeNum(), goldenMouse.getHasBuyNum(), maxBuyNumByRechrge,goldenMouse.getHasGetNum());
		if (goldenMouse.getHasBuyNum()<maxBuyNumByRechrge) {
			RedPointFunction.getIns().updateRedPoint(hero,  ActivitySysId.GOLDENMOUSE, 1, RedPointConst.HAS_RED);
		}
	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		return GoldenMouseEvent.getIns();
	}

	@Override
	public void openUI(Hero hero) {
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.GOLDENMOUSE)) {
				return;
			}
			GoldenMouse goldenMouse = (GoldenMouse)hero.getHeroActivityData().getActivityDataMap().get(ActivitySysId.GOLDENMOUSE);
			int maxBuyNumByRechrge = GoldenMouseFunction.getIns().getMaxBuyNumByRechrge(goldenMouse.getRechargeNum());
			GoldenMouseSender.sendCmd_11580(hero.getId(), goldenMouse.getRechargeNum(), goldenMouse.getHasBuyNum(), maxBuyNumByRechrge,goldenMouse.getHasGetNum());
		} catch (Exception e) {
			LogTool.error(e, GoldenMouseManager.class, "openUI has wrong");
		}
		
	}

	public void buy(Hero hero) {
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.GOLDENMOUSE)) {
				return;
			}
			GoldenMouse goldenMouse = (GoldenMouse)hero.getHeroActivityData().getActivityDataMap().get(ActivitySysId.GOLDENMOUSE);
			int maxBuyNumByRechrge = GoldenMouseFunction.getIns().getMaxBuyNumByRechrge(goldenMouse.getRechargeNum());
			int hasBuyNum = goldenMouse.getHasBuyNum();
			if (hasBuyNum<maxBuyNumByRechrge) {
				int buyIndex=hasBuyNum+1;
				Struct_jssc_774 struct_jssc_774 = Config_jssc_774.getIns().getMap().get(buyIndex);
				int[][] xh = struct_jssc_774.getXh();
				if (UseAddUtil.canUse(hero, xh)) {
					goldenMouse.setHasBuyNum(buyIndex);
					UseAddUtil.use(hero, xh, SourceGoodConst.GOLEN_MOUSE_COST, true);
					int randomNum = RandomUtil.getRandomNumInAreas(struct_jssc_774.getMin(), struct_jssc_774.getMax());
					UseAddUtil.add(hero,GameConst.YUANBAO, randomNum, SourceGoodConst.GOLEN_MOUSE_FANLI,true);
					goldenMouse.setHasGetNum(goldenMouse.getHasGetNum()+randomNum);
					GoldenMouseSender.sendCmd_11582(hero.getId(), 0, buyIndex,randomNum);
					return;
				}else {
					GoldenMouseSender.sendCmd_11582(hero.getId(), 1, hasBuyNum,0);
					return;
				}
			}
			GoldenMouseSender.sendCmd_11582(hero.getId(), 2, hasBuyNum,0);
			return;
		} catch (Exception e) {
			LogTool.error(e, GoldenMouseManager.class, "buy has wrong");
		}
		
	}

}
