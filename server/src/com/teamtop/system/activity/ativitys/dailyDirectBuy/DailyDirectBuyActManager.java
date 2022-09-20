package com.teamtop.system.activity.ativitys.dailyDirectBuy;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Optional;

import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.activity.AbstractActivityManager;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysCache;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.dailyDirectBuy.model.DailyDirectBuyAct;
import com.teamtop.system.activity.model.ActivityData;
import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.system.dailyDirectBuy.DailyDirectBuyConst;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.util.log.LogTool;

import excel.config.Config_mrzg2_256;
import excel.config.Config_mrzgmb_256;
import excel.struct.Struct_mrzg2_256;
import excel.struct.Struct_mrzgmb_256;

public class DailyDirectBuyActManager extends AbstractActivityManager {
	private static DailyDirectBuyActManager ins = null;

	public static DailyDirectBuyActManager getIns() {
		if (ins == null) {
			ins = new DailyDirectBuyActManager();
		}
		return ins;
	}

	private DailyDirectBuyActManager() {
	}

	@Override
	public void openUI(Hero hero) {
		// TODO Auto-generated method stub
		if (hero == null) {
			return;
		}
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_DAILYDIRECTBUY)) {
			return;
		}
		DailyDirectBuyAct dailyDirectBuy = (DailyDirectBuyAct) ActivityFunction.getIns().getActivityData(hero,
				ActivitySysId.ACT_DAILYDIRECTBUY);
		Map<Integer, Integer> awardList = dailyDirectBuy.getAwardList();
		int periods = dailyDirectBuy.getPeriods();
		int activityOpenDays = ActivityFunction.getIns().getActivityOpenDays(ActivitySysId.ACT_DAILYDIRECTBUY);
		Map<Integer, List<Struct_mrzg2_256>> map = DailyDirectBuyActCache.getDailyDirectBuyConfigMap().get(periods);
		Object[] awardArray = new Object[map.size()];
		Iterator<Entry<Integer, List<Struct_mrzg2_256>>> iterator = map.entrySet().iterator();
		for (; iterator.hasNext();) {
			Entry<Integer, List<Struct_mrzg2_256>> entry = iterator.next();
			int day = entry.getKey() - 1;
			List<Struct_mrzg2_256> list = entry.getValue();
			Object[] twoArray = new Object[list.size()];
			for (int i = 0; i < list.size(); i++) {
				int id = list.get(i).getId();
				Integer status = awardList.get(id);
				if (status == null) {
					status = DailyDirectBuyActConst.NOTBUY;
				}
				twoArray[i] = new Object[] { id, status };
			}
			awardArray[day] = new Object[] { twoArray };
		}

		// 目标奖励
		Map<Integer, Integer> targetAwardMap = dailyDirectBuy.getTargetAwardMap();
		List<Struct_mrzgmb_256> targetAwardConfigList = DailyDirectBuyActCache.getTargetAwardConfigMap().get(periods);
		int size = targetAwardConfigList.size();
		List<Object[]> objTargetList = new ArrayList<>();
		for (int i = 0; i < size; i++) {
			int id = targetAwardConfigList.get(i).getBianhao();
			Integer state = Optional.ofNullable(targetAwardMap).map(mapper -> mapper.get(id))
					.orElse(DailyDirectBuyActConst.NOT_REACH);
			objTargetList.add(new Object[] { id, state });
		}
		int targetTimes = dailyDirectBuy.getAwardList().size();
		int endTime = ActivitySysCache.getActivityMap().get(ActivitySysId.ACT_DAILYDIRECTBUY).getEndTime();
		DailyDirectBuyActSender.sendCmd_3720(hero.getId(), awardArray, activityOpenDays, objTargetList.toArray(),
				targetTimes, endTime);
	}

	/**
	 * 领取奖励
	 * 
	 * @param hero
	 * @param id    领取的天数id，第一天就为1
	 * @param level 领取的档次，为每日直购表id
	 */
	public void getAward(Hero hero, int id, int level) {
		// TODO Auto-generated method stub
		try {
			if (hero == null) {
				return;
			}
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_DAILYDIRECTBUY)) {
				return;
			}
			int activityOpenDays = ActivityFunction.getIns().getActivityOpenDays(ActivitySysId.ACT_DAILYDIRECTBUY);
			Struct_mrzg2_256 struct_mrzg2_256 = Config_mrzg2_256.getIns().get(level);
			DailyDirectBuyAct dailyDirectBuy = (DailyDirectBuyAct) ActivityFunction.getIns().getActivityData(hero,
					ActivitySysId.ACT_DAILYDIRECTBUY);
			int periods = dailyDirectBuy.getPeriods();
			// 参数错误
			if (id < 1 || id > activityOpenDays || struct_mrzg2_256 == null || struct_mrzg2_256.getDay() != id
					|| struct_mrzg2_256.getQs() != periods) {
				DailyDirectBuyActSender.sendCmd_3722(hero.getId(), DailyDirectBuyActConst.PARA_FAILURE, level);
				return;
			}
			Map<Integer, Integer> map = dailyDirectBuy.getAwardList();
			Integer status = map.get(level);
			// 未购买无法领取
			if (status == null) {
				DailyDirectBuyActSender.sendCmd_3722(hero.getId(), DailyDirectBuyActConst.NOTBUY_FAILURE, level);
				return;
			}
			// 重复领取
			if (status == DailyDirectBuyActConst.GETTED) {
				DailyDirectBuyActSender.sendCmd_3722(hero.getId(), DailyDirectBuyActConst.REP_FAILURE, level);
				return;
			}
			map.put(level, DailyDirectBuyActConst.GETTED);
			int[][] reward = struct_mrzg2_256.getReward();
			UseAddUtil.add(hero, reward, SourceGoodConst.DAILYDIRECTBUY_ACT_AWARD, UseAddUtil.getDefaultMail(), true); // 发放奖励
			DailyDirectBuyActSender.sendCmd_3722(hero.getId(), DailyDirectBuyActConst.SUCCESS, level);
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(), "getAward id:" + id + " level:" + level);
		}
	}

	/**
	 * 领取目标奖励 3725
	 * 
	 * @param targetId| 目标表id| int
	 */
	public void getTargetAward(Hero hero, int targetId) {
		// TODO Auto-generated method stub
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_DAILYDIRECTBUY)) {
				return;
			}
			Struct_mrzgmb_256 struct_mrzgmb_256 = Config_mrzgmb_256.getIns().get(targetId);
			if (struct_mrzgmb_256 == null) {
				DailyDirectBuyActSender.sendCmd_3726(hero.getId(), DailyDirectBuyActConst.FAILURE_NOT_AWARD, targetId);
				return;
			}
			DailyDirectBuyAct dailyDirectBuy = (DailyDirectBuyAct) ActivityFunction.getIns().getActivityData(hero,
					ActivitySysId.ACT_DAILYDIRECTBUY);
			Map<Integer, Integer> targetAwardMap = dailyDirectBuy.getTargetAwardMap();
			Integer state = targetAwardMap.get(targetId);
			if (state == null) {
				DailyDirectBuyActSender.sendCmd_3726(hero.getId(), DailyDirectBuyActConst.FAILURE_NOT_REACH, targetId);
				return;
			}
			if (state == DailyDirectBuyConst.GETTED) {
				DailyDirectBuyActSender.sendCmd_3726(hero.getId(), DailyDirectBuyActConst.FAILURE_NOT_REP, targetId);
				return;
			}
			targetAwardMap.put(targetId, DailyDirectBuyActConst.GETTED);
			int[][] reward = struct_mrzgmb_256.getReward();
			// 发放奖励
			UseAddUtil.add(hero, reward, SourceGoodConst.DAILYDIRECTBUY_ACT_TARGET_AWARD, UseAddUtil.getDefaultMail(),
					true);
			DailyDirectBuyActSender.sendCmd_3726(hero.getId(), DailyDirectBuyActConst.SUCCESS, targetId);
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(), "getTargetAward targetId:" + targetId);
		}
	}

	@Override
	public void actOpen() {
		// TODO Auto-generated method stub

	}

	@Override
	public void heroActOpen(Hero hero) {
		openUI(hero);
	}

	@Override
	public void actEnd() {
		// TODO Auto-generated method stub

	}

	@Override
	public void heroActEnd(Hero hero) {
		// TODO Auto-generated method stub
		Integer id = 0;
		Integer targetId = 0;
		try {
			DailyDirectBuyAct dailyDirectBuy = (DailyDirectBuyAct) ActivityFunction.getIns().getActivityData(hero,
					ActivitySysId.ACT_DAILYDIRECTBUY);
			Map<Integer, Integer> awardList = dailyDirectBuy.getAwardList();
			// 补发邮件
			for (Map.Entry<Integer, Integer> entry : awardList.entrySet()) {
				if (entry.getValue() == DailyDirectBuyActConst.BUY_NOTGET) {
					id = entry.getKey();
					int[][] reward = Config_mrzg2_256.getIns().get(id).getReward();
					Object[] contentData = new Object[] { MailConst.MAIL_DAILYDIRECTBUY_AWARD };
					MailFunction.getIns().sendMailWithFujianData2(hero.getId(), MailConst.MAIL_DAILYDIRECTBUY_AWARD,
							contentData, reward);
				}
			}

			// 目标奖励邮件补发
			Map<Integer, Integer> targetAwardMap = dailyDirectBuy.getTargetAwardMap();
			if (targetAwardMap == null) {
				return;
			}
			for (Entry<Integer, Integer> entry : targetAwardMap.entrySet()) {
				targetId = entry.getKey();
				Integer state = entry.getValue();
				if (state == DailyDirectBuyActConst.CAN_GET) {
					Struct_mrzgmb_256 struct_mrzgmb_256 = Config_mrzgmb_256.getIns().get(targetId);
					int[][] reward = struct_mrzgmb_256.getReward();
					Object[] contentData = new Object[] { MailConst.DAILYDIRECTBUY_TARGET_AWARD };
					MailFunction.getIns().sendMailWithFujianData2(hero.getId(), MailConst.DAILYDIRECTBUY_TARGET_AWARD,
							contentData, reward);
					targetAwardMap.put(targetId, DailyDirectBuyActConst.GETTED);
				}
			}
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(), "heroActEnd id:" + id + " targetId:" + targetId);
		}

	}

	@Override
	public ActivityData getActivityData(Hero hero, ActivityInfo activityInfo) {
		// TODO Auto-generated method stub
		DailyDirectBuyAct dailyDirectBuy = new DailyDirectBuyAct(hero.getId(), activityInfo.getIndex(),
				activityInfo.getActId(), activityInfo.getPeriods());
		dailyDirectBuy.setAwardList(new HashMap<>());
		dailyDirectBuy.setTargetAwardMap(new HashMap<>());
		return dailyDirectBuy;
	}

	@Override
	public Class<?> getActivityData() {
		// TODO Auto-generated method stub
		return DailyDirectBuyAct.class;
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {
		// TODO Auto-generated method stub
		// if (!ActivityFunction.getIns().checkHeroActOpen(hero,
		// ActivitySysId.ACT_DAILYDIRECTBUY)) {
		// return;
		// }
		// Struct_shop_011 struct_shop_011 = Config_shop_011.getIns().get(product_id);
		// int type = struct_shop_011.getType();
		// if (type != RechargeConst.DAILYDIRECTBUY) {
		// return;
		// }
		// DailyDirectBuyAct dailyDirectBuy = (DailyDirectBuyAct)
		// ActivityFunction.getIns().getActivityData(hero,
		// ActivitySysId.ACT_DAILYDIRECTBUY);
		// Map<Integer, Integer> map = dailyDirectBuy.getAwardList();
		// Integer status = map.get(product_id);
		// if (status == null) {
		// map.put(product_id, DailyDirectBuyActConst.BUY_NOTGET);
		// DailyDirectBuyActSender.sendCmd_3724(hero.getId(), product_id);
		// }
	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		// TODO Auto-generated method stub
		return DailyDirectBuyActEvent.getIns();
	}

}
