package com.teamtop.system.activity.ativitys.magicDiscount;

import com.teamtop.system.activity.AbstractActivityManager;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.magicDiscount.model.MagicDiscount;
import com.teamtop.system.activity.model.ActivityData;
import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.util.log.LogTool;

/**
 * 限时抢购
 * @author jjjjyyyyouxi
 */
public class MagicDiscountManager extends AbstractActivityManager {
	private static MagicDiscountManager ins = null;
	public static MagicDiscountManager getIns() {
		if (ins == null) {
			ins = new MagicDiscountManager();
		}
		return ins;
	}
	private MagicDiscountManager() {
	}
	
	@Override
	public void openUI(Hero hero) {
		try {
			if (hero == null) return;
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_MAGICDISCOUNT)) return;
			
			MagicDiscount magicDiscount = (MagicDiscount) ActivityFunction.getIns().getActivityData(hero, ActivitySysId.ACT_MAGICDISCOUNT);
			int count = magicDiscount.getCount();
			
			MagicDiscountSender.sendCmd_8742(hero.getId(), count);
		}catch (Exception e) {
			LogTool.error(e, this, hero.getId(), hero.getName(), "MagicDiscountManager.openUI 神兵折扣打开界面异常");
		}
	}
	
	
	@Override
	public void actOpen() {
		
	}

	@Override
	public void heroActOpen(Hero hero) {
	}

	@Override
	public void actEnd() {
	}

	@Override
	public void heroActEnd(Hero hero) {
	}

	@Override
	public ActivityData getActivityData(Hero hero, ActivityInfo activityInfo) {
		MagicDiscount magicDiscount = new MagicDiscount(hero.getId(), activityInfo.getIndex(), activityInfo.getActId(), activityInfo.getPeriods());
		magicDiscount.setCount(0);
		return magicDiscount;
	}

	@Override
	public Class<?> getActivityData() {
		return MagicDiscount.class;
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {
	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		return MagicDiscountEvent.getIns();
	}
}
