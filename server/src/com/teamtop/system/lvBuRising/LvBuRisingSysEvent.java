package com.teamtop.system.lvBuRising;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.alibaba.fastjson.JSON;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.lvBuRising.model.LvBuRisingModel;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_lbjlpoint_250;
import excel.struct.Struct_lbjlpoint_250;

public class LvBuRisingSysEvent extends AbsSystemEvent {

	private static LvBuRisingSysEvent ins;

	private LvBuRisingSysEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized LvBuRisingSysEvent getIns() {
		if (ins == null) {
			ins = new LvBuRisingSysEvent();
		}
		return ins;
	}

	@Override
	public void init(Hero hero) {
		LvBuRisingModel lvBuRisingModel = hero.getLvBuRisingModel();
		if (lvBuRisingModel != null) {
			return;
		}
		lvBuRisingModel = new LvBuRisingModel();
		lvBuRisingModel.setHid(hero.getId());
		Set<Integer> targetSet = new HashSet<>();
		lvBuRisingModel.setTargetSet(targetSet);
		hero.setLvBuRisingModel(lvBuRisingModel);

	}

	@Override
	public void login(Hero hero) {
		boolean redPoint = LvBuRisingFunction.getIns().checkRedPoint(hero);
		if (redPoint) {
			RedPointFunction.getIns().addLoginRedPoint(hero, LvBuRisingConst.SysId, LvBuRisingConst.RED_POINT,
					RedPointConst.HAS_RED);
		}
	}

	@Override
	public void loginReset(Hero hero, int now) {
		sendTargetAward(hero);
	}

	@Override
	public void zeroHero(Hero hero, int now) {
		sendTargetAward(hero);
	}

	/**
	 * 活动完结 补发积分目标奖励
	 */
	public void sendTargetAward(Hero hero) {
		try {
			int days = TimeDateUtil.betweenOpen();
			if (days >= LvBuRisingConst.DAYS) {
				LvBuRisingModel lvBuRisingModel = hero.getLvBuRisingModel();
				int score = lvBuRisingModel.getScore();
				Set<Integer> targetSet = lvBuRisingModel.getTargetSet();
				Set<Integer> sendSet = new HashSet<>();
				List<Struct_lbjlpoint_250> sortList = Config_lbjlpoint_250.getIns().getSortList();
				Struct_lbjlpoint_250 lbjlpoint_250 = null;
				int[][] reward = null;
				int size = sortList.size();
				for (int i = 0; i < size; i++) {
					lbjlpoint_250 = sortList.get(i);
					int id = lbjlpoint_250.getId();
					if (!targetSet.contains(id) && score >= lbjlpoint_250.getPoint()) {
						reward = lbjlpoint_250.getReward();
						// reward = CommonUtil.arrayPlusArrays(reward, lbjlpoint_250.getReward());
						sendSet.add(id);
						if (reward != null) {
							targetSet.addAll(sendSet);
							MailFunction.getIns().sendMailWithFujianData2(hero.getId(),
									MailConst.LVBURISING_TARGET_AWARD,
									new Object[] { MailConst.LVBURISING_TARGET_AWARD }, reward);
						}
					}
				}
				LogTool.info(hero.getId(), hero.getName(), "sendSet :: " + JSON.toJSONString(sendSet),
						LvBuRisingSysEvent.class);
			}
		} catch (Exception e) {
			LogTool.error(e, LvBuRisingSysEvent.class, "LvBuRisingSysEvent sendTargetAward");
		}
	}

	@Override
	public void zeroPub(int now) {
		int days = TimeDateUtil.betweenOpen();
		if (days == LvBuRisingConst.DAYS) {
			LvBuRisingFunction.getIns().sendRankingAward();
		}
	}

}
