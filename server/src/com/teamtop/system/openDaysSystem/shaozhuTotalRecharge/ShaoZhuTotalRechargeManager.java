package com.teamtop.system.openDaysSystem.shaozhuTotalRecharge;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Optional;

import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.system.openDaysSystem.AbsOpenDaysManager;
import com.teamtop.system.openDaysSystem.OpenDaysSystemFunction;
import com.teamtop.system.openDaysSystem.model.AbsOpenDaysSystemModel;
import com.teamtop.system.openDaysSystem.model.HeroOpenDaysSysData;
import com.teamtop.system.openDaysSystem.shaozhuTotalRecharge.model.ShaoZhuTotalRecharge;
import com.teamtop.util.log.LogTool;

import excel.config.Config_scljcz_272;
import excel.struct.Struct_scljcz_272;

public class ShaoZhuTotalRechargeManager extends AbsOpenDaysManager {
	private static volatile ShaoZhuTotalRechargeManager ins = null;

	public static ShaoZhuTotalRechargeManager getIns() {
		if (ins == null) {
			synchronized (ShaoZhuTotalRechargeManager.class) {
				if (ins == null) {
					ins = new ShaoZhuTotalRechargeManager();
				}
			}
		}
		return ins;
	}

	private ShaoZhuTotalRechargeManager() {
	}

	@Override
	public void openUI(Hero hero) {
		// TODO Auto-generated method stub
		if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.SHAOZHU_TOTALRECHARGE)) {
			return;
		}
		ShaoZhuTotalRecharge shaoZhuTotalRecharge = ShaoZhuTotalRechargeFunction.getIns().getModel(hero);
		Map<Integer, Integer> awardStateMap = shaoZhuTotalRecharge.getAwardStateMap();
		List<Struct_scljcz_272> sortList = Config_scljcz_272.getIns().getSortList();
		int size = sortList.size();
		ArrayList<Object> awardList = new ArrayList<>();
		for (int i = 0; i < size; i++) {
			int id = sortList.get(i).getId();
			Integer state = Optional.ofNullable(awardStateMap).map(map -> map.get(id))
					.orElse(ShaoZhuTotalRechargeConst.NOT_REACH);
			awardList.add(new Object[] { id, state });
		}
		int rechargeYb = shaoZhuTotalRecharge.getRechargeYb();
		ShaoZhuTotalRechargeSender.sendCmd_5592(hero.getId(), awardList.toArray(), rechargeYb);
	}

	/**
	 * 领取奖励
	 * 
	 * @param hero
	 * @param awardId 要领取的奖励id
	 */
	public void getAward(Hero hero, int awardId) {
		// TODO Auto-generated method stub
		try {
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.SHAOZHU_TOTALRECHARGE)) {
				return;
			}
			Struct_scljcz_272 struct_scljcz_272 = Config_scljcz_272.getIns().get(awardId);
			if (struct_scljcz_272 == null) {
				ShaoZhuTotalRechargeSender.sendCmd_5594(hero.getId(), ShaoZhuTotalRechargeConst.FAILURE_NOT_AWARD,
						awardId);
				return;
			}
			ShaoZhuTotalRecharge shaoZhuTotalRecharge = ShaoZhuTotalRechargeFunction.getIns().getModel(hero);
			Map<Integer, Integer> awardStateMap = shaoZhuTotalRecharge.getAwardStateMap();
			Integer state = awardStateMap.get(awardId);
			if (state == null) {
				ShaoZhuTotalRechargeSender.sendCmd_5594(hero.getId(), ShaoZhuTotalRechargeConst.FAILURE_NOT_REACH,
						awardId);
				return;
			}
			if (state == ShaoZhuTotalRechargeConst.GETTED) {
				ShaoZhuTotalRechargeSender.sendCmd_5594(hero.getId(), ShaoZhuTotalRechargeConst.FAILURE_NOT_REP,
						awardId);
				return;
			}
			awardStateMap.put(awardId, ShaoZhuTotalRechargeConst.GETTED);
			int[][] reward = struct_scljcz_272.getReward();
			// 发放奖励
			UseAddUtil.add(hero, reward, SourceGoodConst.SHAOZHU_TOTALRECHARGE__REWARD, UseAddUtil.getDefaultMail(),
					true);
			ShaoZhuTotalRechargeSender.sendCmd_5594(hero.getId(), ShaoZhuTotalRechargeConst.SUCCESS, awardId);
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(), "getAward awardId:" + awardId);
		}
	}

	@Override
	public void handleOpenPub() {
		// TODO Auto-generated method stub

	}

	@Override
	public void handleOpen(Hero hero, int uid) {
		// TODO Auto-generated method stub
		// 玩家未开启活动,但只要是在活动期间充值就要计算.注意外网当天更新前的充值也要记录
		ShaoZhuTotalRechargeFunction.getIns().rechargeYB(hero, 0, 0);
	}

	@Override
	public void handleEndPub() {
		// TODO Auto-generated method stub

	}

	@Override
	public void handleEnd(Hero hero, int uid) {
		// TODO Auto-generated method stub
		// 补发邮件奖励
		Integer configId = 0;
		try {
			ShaoZhuTotalRecharge shaoZhuTotalRecharge = (ShaoZhuTotalRecharge) ShaoZhuTotalRechargeManager.getIns()
					.getSystemModel(hero, uid);
			Map<Integer, Integer> awardStateMap = shaoZhuTotalRecharge.getAwardStateMap();
			for (Entry<Integer, Integer> entry : awardStateMap.entrySet()) {
				Integer state = entry.getValue();
				if (state == ShaoZhuTotalRechargeConst.CAN_GET) {
					configId = entry.getKey();
					Struct_scljcz_272 struct_scljcz_272 = Config_scljcz_272.getIns().get(configId);
					int[][] reward = struct_scljcz_272.getReward();
					MailFunction.getIns().sendMailWithFujianData2(hero.getId(), MailConst.SHAOZHU_TOTALRECHARGE__REWARD,
							new Object[] { MailConst.SHAOZHU_TOTALRECHARGE__REWARD }, reward);
					entry.setValue(ShaoZhuTotalRechargeConst.GETTED);
				}
			}
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(), "handleEnd configId:" + configId);
		}

	}

	@Override
	public AbsOpenDaysSystemModel getSystemModel(Hero hero, int uid) {
		// TODO Auto-generated method stub
		HeroOpenDaysSysData heroOpenDaysSysData = hero.getHeroOpenDaysSysData();
		ShaoZhuTotalRecharge shaoZhuTotalRecharge = (ShaoZhuTotalRecharge) heroOpenDaysSysData.getOpSysDataMap()
				.get(uid);
		if (shaoZhuTotalRecharge == null) {
			shaoZhuTotalRecharge = new ShaoZhuTotalRecharge();
			shaoZhuTotalRecharge.setAwardStateMap(new HashMap<>());
			// 玩家未开启活动,但只要是在活动期间充值就要计算.注意外网当天更新前的充值也要记录
			shaoZhuTotalRecharge.setRechargeYb(hero.getOneDayRecharge());
		}
		return shaoZhuTotalRecharge;
	}

	@Override
	public Class<?> getSystemModel() {
		// TODO Auto-generated method stub
		return ShaoZhuTotalRecharge.class;
	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		// TODO Auto-generated method stub
		return ShaoZhuTotalRechargeEvent.getIns();
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {
		// TODO Auto-generated method stub
		ShaoZhuTotalRechargeFunction.getIns().rechargeYB(hero, money, product_id);
	}

	@Override
	public void consumeHandle(Hero hero, int consumeNum, int reason) {
		// TODO Auto-generated method stub

	}

}
