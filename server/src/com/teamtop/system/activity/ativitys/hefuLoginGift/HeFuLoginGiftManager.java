package com.teamtop.system.activity.ativitys.hefuLoginGift;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.activity.AbstractActivityManager;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.threeKingdomsCelebration.celebrationLoginGift.CelebrationLoginGiftCache;
import com.teamtop.system.activity.ativitys.threeKingdomsCelebration.celebrationLoginGift.CelebrationLoginGiftSender;
import com.teamtop.system.activity.model.ActivityData;
import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.util.log.LogTool;

import excel.config.Config_sgdlyj_261;
import excel.struct.Struct_sgdlyj_261;

/**
 * 合服活动登录有礼
 * @author jjjjyyy
 *
 */
public class HeFuLoginGiftManager extends AbstractActivityManager{
	
	public static HeFuLoginGiftManager ins;
	public static synchronized HeFuLoginGiftManager getIns() {
		if(ins == null){
			ins = new HeFuLoginGiftManager();
		}
		return ins;
	}
	
	
	@Override
	public void actOpen() {
		// TODO Auto-generated method stub
		
	}
	@Override
	public void heroActOpen(Hero hero) {
		HeFuLoginGiftFunction.getIns().checkLoginDays(hero);
		
	}
	@Override
	public void actEnd() {
		// TODO Auto-generated method stub
		
	}
	@Override
	public void heroActEnd(Hero hero) {
		HeFuLoginGift actData = (HeFuLoginGift) ActivityFunction.getIns().getActivityData(hero,
				ActivitySysId.HEFU_LOGINGIFT);
		if (actData == null) {
			return;
		}
		int loginTimes = actData.getLoginTimes();
		int qs = actData.getPeriods();
		int mailId = MailConst.CELEBRATION_LOGIN_GITE;
		long hid = hero.getId();
		Map<Integer, Struct_sgdlyj_261> map = CelebrationLoginGiftCache.getQsMap().get(qs);
		Set<Integer> reward = actData.getReward();
		for (int i = 1; i <= loginTimes; i++) {
			if (reward.contains(i)) {
				continue;
			}
			int[][] goods = map.get(i).getReward();
			if (goods == null) {
				continue;
			}
			reward.add(i);
			MailFunction.getIns().sendMailWithFujianData2(hid, mailId, new Object[] { mailId }, goods);
		}
		
	}
	@Override
	public ActivityData getActivityData(Hero hero, ActivityInfo activityInfo) {
		HeFuLoginGift cgift = new HeFuLoginGift(hero.getId(), activityInfo.getIndex(),
				activityInfo.getActId(), activityInfo.getPeriods());
		Set<Integer> reward = new HashSet<>();
		cgift.setReward(reward);
		return cgift;
	}
	@Override
	public Class<?> getActivityData() {
		// TODO Auto-generated method stub
		return HeFuLoginGift.class;
	}
	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {
		// TODO Auto-generated method stub
		
	}
	@Override
	public AbsSystemEvent getSystemEvent() {
		// TODO Auto-generated method stub
		return HeFuLoginGiftSysEvent.getIns();
	}
	@Override
	public void openUI(Hero hero) {
		
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.HEFU_LOGINGIFT)) {
				return;
			}
			HeFuLoginGift actData = (HeFuLoginGift) ActivityFunction.getIns().getActivityData(hero,
					ActivitySysId.HEFU_LOGINGIFT);
			
			int qs = actData.getPeriods();
			Map<Integer, Struct_sgdlyj_261> map = CelebrationLoginGiftCache.getQsMap().get(qs);
			Iterator<Integer> iterator = map.keySet().iterator();
			int loginTimes = actData.getLoginTimes();
			Set<Integer> reward = actData.getReward();
			List<Object[]> sendData = new ArrayList<>();
			for (; iterator.hasNext();) {
				int state = 0;
				Integer day = iterator.next();
				if (day <= loginTimes) {
					state = 1;
				}
				if (reward.contains(day)) {
					state = 2;
				}
				Struct_sgdlyj_261 sgdlyj_261 = map.get(day);
				sendData.add(new Object[] { sgdlyj_261.getId(), state });
			}
			CelebrationLoginGiftSender.sendCmd_4890(hid, loginTimes, sendData.toArray());
		} catch (Exception e) {
			LogTool.error(e, HeFuLoginGiftManager.class, hero.getId(), hero.getName(),
					"HeFuLoginGiftManager openUI");
		}
		
	}
	
	
	/**
	 * 领取奖励
	 * 
	 * @param hero
	 * @param id
	 */
	public void getReward(Hero hero, int id) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.HEFU_LOGINGIFT)) {
				return;
			}
			HeFuLoginGift actData = (HeFuLoginGift) ActivityFunction.getIns().getActivityData(hero,
					ActivitySysId.HEFU_LOGINGIFT);
			Struct_sgdlyj_261 sgdlyj_261 = Config_sgdlyj_261.getIns().get(id);
			if (sgdlyj_261.getQs()!=100) {
				return;
			}
			int day = sgdlyj_261.getDay();
			if (day < 1) {
				LogTool.warn("HeFuLoginGiftManager getReward hid=" + hid + ", day=" + day,
						HeFuLoginGiftManager.class);
				return;
			}
			int loginTimes = actData.getLoginTimes();
			if (day > loginTimes) {
				// 未达条件
				CelebrationLoginGiftSender.sendCmd_4892(hid, 0, 1);
				return;
			}
			Set<Integer> reward = actData.getReward();
			if (reward.contains(day)) {
				// 已领取
				CelebrationLoginGiftSender.sendCmd_4892(hid, 0, 2);
				return;
			}
			int qs = actData.getPeriods();
			Map<Integer, Struct_sgdlyj_261> map = CelebrationLoginGiftCache.getQsMap().get(qs);
			Struct_sgdlyj_261 struct_sgdlyj_261 = map.get(day);
			if (struct_sgdlyj_261 == null) {
				LogTool.warn("HeFuLoginGift getReward struct_sgdlyj_261 null hid=" + hid + ", day=" + day,
						HeFuLoginGiftManager.class);
				return;
			}
			reward.add(day);
			int[][] goods = struct_sgdlyj_261.getReward();
			UseAddUtil.add(hero, goods, SourceGoodConst.HEFU_LOGIN_GIFT, UseAddUtil.getDefaultMail(), true);
			CelebrationLoginGiftSender.sendCmd_4892(hid, 1, id);
			HeFuLoginGiftFunction.getIns().updateRedPoint(hero);
		} catch (Exception e) {
			LogTool.error(e, HeFuLoginGiftManager.class, hero.getId(), hero.getName(),
					"HeFuLoginGiftManager getReward, id=" + id);
		}
	}

	

}
