package com.teamtop.system.activity.ativitys.skyRichGift;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.activity.AbstractActivityManager;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.skyRichGift.model.SkyRichGiftData;
import com.teamtop.system.activity.model.ActivityData;
import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.util.log.LogTool;

import excel.config.Config_tjhl_335;
import excel.struct.Struct_tjhl_335;

public class SkyRichGiftManager extends AbstractActivityManager {

	private static SkyRichGiftManager ins;

	private SkyRichGiftManager() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized SkyRichGiftManager getIns() {
		if (ins == null) {
			ins = new SkyRichGiftManager();
		}
		return ins;
	}

	@Override
	public void actOpen() {
		// TODO Auto-generated method stub

	}

	@Override
	public void heroActOpen(Hero hero) {
		// TODO Auto-generated method stub

	}

	@Override
	public void actEnd() {
		// TODO Auto-generated method stub

	}

	@Override
	public void heroActEnd(Hero hero) {
		long hid = hero.getId();
		SkyRichGiftData model = (SkyRichGiftData) hero.getHeroActivityData().getActivityDataMap()
				.get(ActivitySysId.ACT_SKY_RICH_GIFT);
		int rechargeValue = model.getRechargeValue();
		Set<Integer> rewardSet = model.getRewardSet();
		List<Struct_tjhl_335> list = SkyRichGiftDataSysCache.getQsMap().get(model.getPeriods());
		int size = list.size();
		int mailId = MailConst.ACT_SKY_RICHGIFT_REWARD;
		for (int i = 0; i < size; i++) {
			Struct_tjhl_335 struct_tjhl_335 = list.get(i);
			if (rewardSet.contains(struct_tjhl_335.getId())) {
				continue;
			}
			if (rechargeValue >= struct_tjhl_335.getLj()) {
				int[][] reward = struct_tjhl_335.getReward();
				MailFunction.getIns().sendMailWithFujianData2(hid, mailId, new Object[] { mailId }, reward);
			}
		}
	}

	@Override
	public ActivityData getActivityData(Hero hero, ActivityInfo activityInfo) {
		SkyRichGiftData model = new SkyRichGiftData(hero.getId(), activityInfo.getIndex(), activityInfo.getActId(),
				activityInfo.getPeriods());
		int oneDayRecharge = hero.getOneDayRecharge();
		model.setRechargeValue(oneDayRecharge);
		return model;
	}

	@Override
	public Class<?> getActivityData() {
		// TODO Auto-generated method stub
		return SkyRichGiftData.class;
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_SKY_RICH_GIFT)) {
			return;
		}
		SkyRichGiftData model = (SkyRichGiftData) hero.getHeroActivityData().getActivityDataMap()
				.get(ActivitySysId.ACT_SKY_RICH_GIFT);
		int rechargeValue = model.getRechargeValue();
		model.setRechargeValue(rechargeValue + money);
		SkyRichGiftDataFunction.getIns().updateRedPoint(hero);
	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		// TODO Auto-generated method stub
		return SkyRichGiftDataSysEvent.getIns();
	}

	@Override
	public void openUI(Hero hero) {
		long hid = hero.getId();
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_SKY_RICH_GIFT)) {
			return;
		}
		SkyRichGiftData model = (SkyRichGiftData) hero.getHeroActivityData().getActivityDataMap()
				.get(ActivitySysId.ACT_SKY_RICH_GIFT);
		int rechargeValue = model.getRechargeValue();
		Set<Integer> rewardSet = model.getRewardSet();
		List<Object[]> rewardData = new ArrayList<>();
		Iterator<Integer> iterator = rewardSet.iterator();
		for (; iterator.hasNext();) {
			Integer id = iterator.next();
			rewardData.add(new Object[] { id });
		}
		SkyRichGiftSender.sendCmd_11670(hid, rechargeValue, rewardData.toArray());
	}

	/**
	 * 领取奖励
	 * @param hero
	 * @param id
	 */
	public void getReward(Hero hero, int id) {
		long hid = hero.getId();
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_SKY_RICH_GIFT)) {
				return;
			}
			SkyRichGiftData model = (SkyRichGiftData) hero.getHeroActivityData().getActivityDataMap()
					.get(ActivitySysId.ACT_SKY_RICH_GIFT);
			int rechargeValue = model.getRechargeValue();
			Set<Integer> rewardSet = model.getRewardSet();
			if (rewardSet.contains(id)) {
				SkyRichGiftSender.sendCmd_11672(hid, 0, 2);
				return;
			}
			Struct_tjhl_335 struct_tjhl_335 = Config_tjhl_335.getIns().get(id);
			int qs = struct_tjhl_335.getQishu();
			if (qs != model.getPeriods()) {
				return;
			}
			if (rechargeValue < struct_tjhl_335.getLj()) {
				SkyRichGiftSender.sendCmd_11672(hid, 0, 1);
				return;
			}
			rewardSet.add(id);
			int[][] reward = struct_tjhl_335.getReward();
			UseAddUtil.add(hero, reward, SourceGoodConst.ACT_SKY_RICHGIGT_REWARD, UseAddUtil.getDefaultMail(), true);
			SkyRichGiftSender.sendCmd_11672(hid, 1, id);
			SkyRichGiftDataFunction.getIns().updateRedPoint(hero);
		} catch (Exception e) {
			LogTool.error(e, SkyRichGiftManager.class, hero.getId(), hero.getName(), "SkyRichGiftManager getReward");
		}
	}

}
