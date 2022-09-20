package com.teamtop.system.collectTreasury;

import java.util.ArrayList;
import java.util.List;

import com.teamtop.system.collectTreasury.model.CollectTreasury;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.util.common.CommonUtil;

import excel.config.Config_jbp_718;
import excel.config.Config_xitong_001;
import excel.struct.Struct_jbp_718;
import excel.struct.Struct_xitong_001;

public class CollectTreasuryEvent extends AbsSystemEvent {
	private static CollectTreasuryEvent ins;

	public static CollectTreasuryEvent getIns() {
		if (ins == null) {
			ins = new CollectTreasuryEvent();
		}
		return ins;
	}

	private CollectTreasuryEvent() {
	}

	@Override
	public void init(Hero hero) {
		CollectTreasury collectTreasury = hero.getCollectTreasury();
		if (collectTreasury == null) {
			collectTreasury = new CollectTreasury();
			collectTreasury.setHid(hero.getId());
			List<Integer> buyGiftBagList = new ArrayList<Integer>();
			collectTreasury.setBuyGiftBagList(buyGiftBagList);
			ArrayList<List<Integer>> ctAwardsStateList = new ArrayList<List<Integer>>();
			collectTreasury.setCtAwardsStateList(ctAwardsStateList);
			List<Struct_jbp_718> sortList = Config_jbp_718.getIns().getSortList();
			ArrayList<Integer> loginAwardList = new ArrayList<Integer>();// 登录返利奖励列表
			ArrayList<Integer> guanqiaAwardList = new ArrayList<Integer>();// 闯关返利奖励列表
			ArrayList<Integer> lvAwardList = new ArrayList<Integer>();// 等级返利奖励列表
			ArrayList<Integer> strengthAwardList = new ArrayList<Integer>();// 成长返利奖励列表
			for (Struct_jbp_718 jbpAward : sortList) {
				int jbpId = jbpAward.getID() / 1000;

				if (jbpId == CollectTreasuryConst.LOGIN_COLLECTTREASURY) {
					loginAwardList.add(CollectTreasuryConst.NOT_REACH);
				}
				if (jbpId == CollectTreasuryConst.GUANQIA_COLLECTTREASURY) {
					guanqiaAwardList.add(CollectTreasuryConst.NOT_REACH);
				}
				if (jbpId == CollectTreasuryConst.LV_COLLECTTREASURY) {
					lvAwardList.add(CollectTreasuryConst.NOT_REACH);
				}
				if (jbpId == CollectTreasuryConst.STRENGTH_COLLECTTREASURY) {
					strengthAwardList.add(CollectTreasuryConst.NOT_REACH);
				}
			}
			ctAwardsStateList.add(loginAwardList);
			ctAwardsStateList.add(guanqiaAwardList);
			ctAwardsStateList.add(lvAwardList);
			ctAwardsStateList.add(strengthAwardList);
			hero.setCollectTreasury(collectTreasury);
		}
	}

	@Override
	public void login(Hero hero) {
		CollectTreasuryFunction.getIns().loginNoticeFront(hero);
	}

	@Override
	public void loginReset(Hero hero, int now) {
		zeroHero(hero, now);
	}

	@Override
	public void zeroHero(Hero hero, int now) {
		int loginDay = hero.getCollectTreasury().getLoginDay();
		hero.getCollectTreasury().setLoginDay(loginDay + 1);// 设置累计登录天数
		CollectTreasuryFunction.getIns().refreshCTAwardState(hero, CollectTreasuryConst.LOGIN_COLLECTTREASURY);
	}

	@Override
	public void levelUp(Hero hero, int newLv, int oldLv) {
		CollectTreasuryFunction.getIns().refreshCTAwardState(hero, CollectTreasuryConst.LV_COLLECTTREASURY);
	}

	@Override
	public void passGuanqia(Hero hero, int passGuanqia) {
		if (HeroFunction.getIns().checkSystemOpen(hero, CollectTreasuryConst.COLLECTTREASURY)) {
			Struct_xitong_001 op = Config_xitong_001.getIns().get(CollectTreasuryConst.COLLECTTREASURY);
			int[][] open = op.getServer();
			int guanqia = 0;
			for (int[] info : open) {
				if (info[0] == 1) {
					guanqia = info[1];
					break;
				}
			}
			if (hero.getCurGuanqia() == guanqia) {
				int loginDay = hero.getCollectTreasury().getLoginDay();
				hero.getCollectTreasury().setLoginDay(loginDay + 1);// 设置累计登录天数
			}
			CollectTreasuryFunction.getIns().noticeFront(hero);
			CollectTreasuryFunction.getIns().refreshCTAwardState(hero, CollectTreasuryConst.GUANQIA_COLLECTTREASURY);
		}
	}

}
