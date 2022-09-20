package com.teamtop.system.dailyDirectBuy;

import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;

import com.teamtop.system.dailyDirectBuy.model.DailyDirectBuy;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_mrzg1_256;
import excel.config.Config_mrzgmb_256;
import excel.struct.Struct_mrzgmb_256;

public class DailyDirectBuyEvent extends AbsSystemEvent {
	public static DailyDirectBuyEvent ins;

	public static DailyDirectBuyEvent getIns() {
		if (ins == null) {
			ins = new DailyDirectBuyEvent();
		}
		return ins;
	}

	private DailyDirectBuyEvent() {
	}

	@Override
	public void init(Hero hero) {
		// TODO Auto-generated method stub
		DailyDirectBuy dailyDirectBuy = hero.getDailyDirectBuy();
		if (dailyDirectBuy == null) {
			dailyDirectBuy = new DailyDirectBuy();
			dailyDirectBuy.setHid(hero.getId());
			dailyDirectBuy.setAwardMap(new HashMap<>());
			dailyDirectBuy.setTargetAwardMap(new HashMap<>());
			hero.setDailyDirectBuy(dailyDirectBuy);
		} else {
			if (dailyDirectBuy.getAwardMap() == null) {
				dailyDirectBuy.setAwardMap(new HashMap<>());
				hero.setDailyDirectBuy(dailyDirectBuy);
			}
			// 目标奖励
			if (dailyDirectBuy.getTargetAwardMap() == null) {
				dailyDirectBuy.setTargetAwardMap(new HashMap<>());
			}
		}
	}

	@Override
	public void login(Hero hero) {
		// TODO Auto-generated method stub
		if (HeroFunction.getIns().checkSystemOpen(hero, DailyDirectBuyConst.SYSTEMID)) {
			DailyDirectBuyFunction.getIns().targetAwardHandle(hero);
			DailyDirectBuyFunction.getIns().loginSendRedPoint(hero);
		}
	}

	@Override
	public void loginReset(Hero hero, int now) {
		// TODO Auto-generated method stub
		zeroHero(hero, now);
	}

	@Override
	public void zeroHero(Hero hero, int now) {
		// TODO Auto-generated method stub
		int betweenOpen = TimeDateUtil.betweenOpen();
		mailAgainSend(hero);
		if (betweenOpen <= 7) {
			DailyDirectBuyManager.getIns().openUI(hero);
		}
	}

	/**
	 * 邮件补发
	 * 
	 * @param hero
	 */
	public void mailAgainSend(Hero hero) {
		int key1 = 0;
		Integer id = 0;
		try {
			int betweenOpen = TimeDateUtil.betweenOpen();
			DailyDirectBuy dailyDirectBuy = hero.getDailyDirectBuy();
			if (betweenOpen > 7) {
				Map<Integer, Integer> awardList = dailyDirectBuy.getAwardMap();
				for (int key : awardList.keySet()) {
					key1 = key;
					int state = awardList.get(key);
					if (state == DailyDirectBuyConst.BUY_NOTGET) {
						int[][] reward = Config_mrzg1_256.getIns().get(key).getReward();
						Object[] contentData = new Object[] { MailConst.MAIL_DAILYDIRECTBUY_AWARD };
						MailFunction.getIns().sendMailWithFujianData2(hero.getId(), MailConst.MAIL_DAILYDIRECTBUY_AWARD,
								contentData, reward);
						awardList.put(key, DailyDirectBuyConst.GETTED);
					}
				}
				// 目标奖励邮件补发
				Map<Integer, Integer> targetAwardMap = dailyDirectBuy.getTargetAwardMap();
				for (Entry<Integer, Integer> entry : targetAwardMap.entrySet()) {
					id = entry.getKey();
					Integer state = entry.getValue();
					if (state == DailyDirectBuyConst.CAN_GET) {
						Struct_mrzgmb_256 struct_mrzgmb_256 = Config_mrzgmb_256.getIns().get(id);
						int[][] reward = struct_mrzgmb_256.getReward();
						Object[] contentData = new Object[] { MailConst.DAILYDIRECTBUY_TARGET_AWARD };
						MailFunction.getIns().sendMailWithFujianData2(hero.getId(),
								MailConst.DAILYDIRECTBUY_TARGET_AWARD, contentData, reward);
						targetAwardMap.put(id, DailyDirectBuyConst.GETTED);
					}
				}
			}
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(), "mailAgainSend key1:" + key1 + " id:" + id);
		}
	}

}
