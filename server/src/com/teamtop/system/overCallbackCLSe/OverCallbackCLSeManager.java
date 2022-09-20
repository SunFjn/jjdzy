package com.teamtop.system.overCallbackCLSe;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.Map;

import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.overCallbackCLSe.model.OverCallbackCLSe;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.struct.Struct_clfl1_736;

public class OverCallbackCLSeManager {

	private static OverCallbackCLSeManager ins;

	private OverCallbackCLSeManager() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized OverCallbackCLSeManager getIns() {
		if (ins == null) {
			ins = new OverCallbackCLSeManager();
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
			if (!HeroFunction.getIns().checkSystemOpen(hero, OverCallbackCLSeConst.SysId)) {
				return;
			}
			OverCallbackCLSe overCallbackCLSe = hero.getOverCallbackCLSe();
			Map<Integer, Integer> awardStateMap = overCallbackCLSe.getAwardStateMap();
			ArrayList<Object> arrayList = new ArrayList<Object>();
			int openDays = TimeDateUtil.betweenOpen();
			Map<Integer, Struct_clfl1_736> map = OverCallbackCLSeCache.getClConfigMap().get(openDays);
			Iterator<Integer> iterator = map.keySet().iterator();
			for (; iterator.hasNext();) {
				int id = iterator.next();
				int state = OverCallbackCLSeConst.NOT_REACH;
				if (awardStateMap.containsKey(id)) {
					state = awardStateMap.get(id);
				}
				arrayList.add(new Object[] { id, state });
			}
			OverCallbackCLSeSender.sendCmd_2952(hero.getId(), arrayList.toArray(), overCallbackCLSe.getConsumeNum());
		} catch (Exception e) {
			LogTool.error(e, OverCallbackCLSeManager.class, hid, hero.getName(), "OverCallbackCLSeManager openUI");
		}
	}

	/**
	 * 领取奖励
	 * 
	 * @param hero
	 * @param index
	 */
	public void getAward(Hero hero, int index) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, OverCallbackCLSeConst.SysId)) {
				return;
			}
			OverCallbackCLSe overCallbackCLSe = hero.getOverCallbackCLSe();
			Map<Integer, Integer> awardStateMap = overCallbackCLSe.getAwardStateMap();
			if (!awardStateMap.containsKey(index)) {// 没有奖励
				OverCallbackCLSeSender.sendCmd_2954(hero.getId(), OverCallbackCLSeConst.FAILURE_NOT_AWARD, 0);
				return;
			}
			if (!awardStateMap.containsKey(index)) {// 不可领取
				OverCallbackCLSeSender.sendCmd_2954(hero.getId(), OverCallbackCLSeConst.FAILURE_NOT_REACH, 0);
				return;
			}
			Integer state = awardStateMap.get(index);
			if (state == OverCallbackCLSeConst.GETTED) {// 不可重复领取
				OverCallbackCLSeSender.sendCmd_2954(hero.getId(), OverCallbackCLSeConst.FAILURE_NOT_REP, 0);
				return;
			}
			int days = TimeDateUtil.betweenOpen();
			Map<Integer, Struct_clfl1_736> map = OverCallbackCLSeCache.getClConfigMap().get(days);
			awardStateMap.put(index, OverCallbackCLSeConst.GETTED);
			int[][] award = map.get(index).getReward();
			UseAddUtil.add(hero, award, SourceGoodConst.OVERCALLBACKCONST_CL_AWARD, UseAddUtil.getDefaultMail(), true); // 发放奖励
			OverCallbackCLSeSender.sendCmd_2954(hero.getId(), OverCallbackCLSeConst.SUCCESS, index);
			// 红点更新
			OverCallbackCLSeFunction.getIns().updateRedPoint(hero);
		} catch (Exception e) {
			LogTool.error(e, OverCallbackCLSeManager.class, hid, hero.getName(), "OverCallbackCLSeManager getAward");
		}
	}

}
