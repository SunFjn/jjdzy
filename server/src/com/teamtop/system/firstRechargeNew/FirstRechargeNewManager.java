package com.teamtop.system.firstRechargeNew;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.guanqia.Guanqia;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_xsc_731;
import excel.struct.Struct_xsc_731;

/**
 * 新首充
 * 
 * @author hzp
 *
 */
public class FirstRechargeNewManager {

	private static FirstRechargeNewManager ins;

	private FirstRechargeNewManager() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized FirstRechargeNewManager getIns() {
		if (ins == null) {
			ins = new FirstRechargeNewManager();
		}
		return ins;
	}

	/**
	 * 打开界面
	 * 
	 * @param hero
	 */
	public void openUI(Hero hero) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, FirstRechargeNewConst.SysId)) {
				return;
			}
			Map<Integer, Integer> firstRechargeAward = hero.getFirstRechargeAward();
			List<Object[]> awardList = new ArrayList<>();
			Iterator<Entry<Integer, Integer>> iterator = firstRechargeAward.entrySet().iterator();
			for (; iterator.hasNext();) {
				Entry<Integer, Integer> entry = iterator.next();
				awardList.add(new Object[] { entry.getKey(), entry.getValue() });
			}
			FirstRechargeNewSender.sendCmd_2752(hid, awardList.toArray());
		} catch (Exception e) {
			LogTool.error(e, FirstRechargeNewManager.class, hid, hero.getName(), "FirstRechargeNewManager openUI");
		}
	}

	/**
	 * 领取首充奖励
	 * 
	 * @param hero
	 * @param index 首充档次序号
	 */
	public void getReward(Hero hero, int index) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, FirstRechargeNewConst.SysId)) {
				return;
			}
			Map<Integer, Integer> firstRechargeAward = hero.getFirstRechargeAward();
			if (!firstRechargeAward.containsKey(index)) {
				// 未充值该额度
				FirstRechargeNewSender.sendCmd_2754(hid, 0, 1);
				return;
			}
			Integer state = firstRechargeAward.get(index);
			if (state == FirstRechargeNewConst.ALREADY_GET) {
				// 已领取
				FirstRechargeNewSender.sendCmd_2754(hid, 0, 2);
				return;
			}
			Struct_xsc_731 struct_xsc_731 = Config_xsc_731.getIns().get(index);
			if (struct_xsc_731 == null) {
				return;
			}
			firstRechargeAward.put(index, FirstRechargeNewConst.ALREADY_GET);
			int[][] award = struct_xsc_731.getJiangli();
			UseAddUtil.add(hero, award, SourceGoodConst.FIRSTRECHARGE_AWARDS, null, true);
			FirstRechargeNewSender.sendCmd_2754(hid, 1, index);
			// 更新红点
			FirstRechargeNewFunction.getIns().updateRedPoint(hero);
			// 检测Icon
			FirstRechargeNewFunction.getIns().checkIcon(hero);
		} catch (Exception e) {
			LogTool.error(e, FirstRechargeNewManager.class, hid, hero.getName(), "FirstRechargeNewManager getReward");
		}
	}

	public void closeUI(Hero hero) {
		Guanqia guanqia = hero.getGuanqia();
		int curGuanqia = guanqia.getCurGuanqia();
		if(curGuanqia < FirstRechargeNewConst.GUANG_QIA) {
			return;
		}
		hero.setFirstRechargeCloseUITime(TimeDateUtil.getCurrentTime());
	}

}
