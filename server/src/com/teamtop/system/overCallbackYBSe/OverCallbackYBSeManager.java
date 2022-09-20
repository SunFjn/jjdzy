package com.teamtop.system.overCallbackYBSe;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.Map;

import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.overCallbackYBSe.model.OverCallbackYBSe;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.struct.Struct_ybfl1_735;

public class OverCallbackYBSeManager {

	private static OverCallbackYBSeManager ins;

	private OverCallbackYBSeManager() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized OverCallbackYBSeManager getIns() {
		if (ins == null) {
			ins = new OverCallbackYBSeManager();
		}
		return ins;
	}

	public void openUI(Hero hero) {
		if (hero == null) {
			return;
		}
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, OverCallbackYBSeConst.SysId)) {
				return;
			}
			OverCallbackYBSe overCallbackYBSe = hero.getOverCallbackYBSe();
			Map<Integer, Integer> awardStateMap = overCallbackYBSe.getAwardStateMap();
			ArrayList<Object> arrayList = new ArrayList<Object>();
			int day = TimeDateUtil.betweenOpen();
			Map<Integer, Struct_ybfl1_735> map = OverCallbackYBSeCache.getYbConfigMap().get(day);
			Iterator<Integer> iterator = map.keySet().iterator();
			for (; iterator.hasNext();) {
				int id = iterator.next();
				int state = OverCallbackYBSeConst.NOT_REACH;
				if (awardStateMap.containsKey(id)) {
					state = awardStateMap.get(id);
				}
				arrayList.add(new Object[] { id, state });
			}
			OverCallbackYBSeSender.sendCmd_3032(hero.getId(), arrayList.toArray(), overCallbackYBSe.getConsumeYBNum());
		} catch (Exception e) {
			LogTool.error(e, OverCallbackYBSeManager.class, hero.getId(), hero.getName(), "OverCallbackYBSeManager openUI");
		}
	}
	
	/**
	 * 领取奖励
	 * @param hero
	 * @param index 索引id
	 */
	public void getAward(Hero hero, int index) {
		if (hero == null) {
			return;
		}
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, OverCallbackYBSeConst.SysId)) {
				return;
			}
			OverCallbackYBSe overCallbackYBSe = hero.getOverCallbackYBSe();
			Map<Integer, Integer> awardStateMap = overCallbackYBSe.getAwardStateMap();
			Integer state = awardStateMap.get(index);
			if (state == null) {// 没有奖励
				OverCallbackYBSeSender.sendCmd_3034(hero.getId(), OverCallbackYBSeConst.FAILURE_NOT_AWARD, 0);
				return;
			}
			if (state == OverCallbackYBSeConst.NOT_REACH) {// 不可领取
				OverCallbackYBSeSender.sendCmd_3034(hero.getId(), OverCallbackYBSeConst.FAILURE_NOT_REACH, 0);
				return;
			}
			if (state == OverCallbackYBSeConst.GETTED) {// 不可重复领取
				OverCallbackYBSeSender.sendCmd_3034(hero.getId(), OverCallbackYBSeConst.FAILURE_NOT_REP, 0);
				return;
			}
			int openDays = TimeDateUtil.betweenOpen();
			Map<Integer, Struct_ybfl1_735> map = OverCallbackYBSeCache.getYbConfigMap().get(openDays);
			awardStateMap.put(index, OverCallbackYBSeConst.GETTED);
			int[][] award = map.get(index).getReward();
			UseAddUtil.add(hero, award, SourceGoodConst.OVERCALLBACKCONST_YB_AWARD, UseAddUtil.getDefaultMail(), true); // 发放奖励
			OverCallbackYBSeSender.sendCmd_3034(hero.getId(), OverCallbackYBSeConst.SUCCESS, index);
			OverCallbackYBSeFunction.getIns().updateRedPoint(hero);
		} catch (Exception e) {
			LogTool.error(e, OverCallbackYBSeManager.class, hero.getId(), hero.getName(), "OverCallbackYBSeManager ");
		}
	}

}
