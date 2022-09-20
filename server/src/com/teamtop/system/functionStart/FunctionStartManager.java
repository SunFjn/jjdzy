package com.teamtop.system.functionStart;

import java.util.ArrayList;
import java.util.Set;

import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.task.TaskUserConst;
import com.teamtop.system.task.TaskUserFunction;

import excel.config.Config_sysshow_228;
import excel.struct.Struct_sysshow_228;

public class FunctionStartManager {
	private static FunctionStartManager ins;

	public static FunctionStartManager getIns() {
		if (ins == null) {
			ins = new FunctionStartManager();
		}
		return ins;
	}

	private FunctionStartManager() {
	}

	/**
	 * 打开功能预览界面
	 * 
	 * @param hero
	 */
	public void openUI(Hero hero) {
		if (hero == null) {
			return;
		}
		if (!HeroFunction.getIns().checkSystemOpen(hero, FunctionStartConst.FUNCTIONSTART_SYSID)) {
			return;
		}
		Set<Integer> openSysReward = hero.getOpenSysReward();
		ArrayList<Object> arrayList = new ArrayList<Object>();
		for (int rewardId : openSysReward) {
			arrayList.add(new Object[] { rewardId });
		}
		FunctionStartSender.sendCmd_1802(hero.getId(), arrayList.toArray());
	}

	/**
	 * 领取奖励
	 * 
	 * @param hero
	 * @param guanqiaId
	 */
	public void getAwards(Hero hero, int guanqiaId) {
		if (hero == null) {
			return;
		}
		if (!HeroFunction.getIns().checkSystemOpen(hero, FunctionStartConst.FUNCTIONSTART_SYSID)) {
			return;
		}
		if (!checkGuanqia(guanqiaId)) { // 检查关卡
			FunctionStartSender.sendCmd_1804(hero.getId(), FunctionStartConst.FAILURE_NOT_AWARDS, 0);
			return;
		}
		if (hero.getCurGuanqia() < guanqiaId) { // 当前关卡小于要领取的关卡
			FunctionStartSender.sendCmd_1804(hero.getId(), FunctionStartConst.FAILURE_NOT_CURRENTGQ, 0);
			return;
		}
		Set<Integer> openSysReward = hero.getOpenSysReward();
		for (int gid : openSysReward) { // 检查是否重复领取
			if (guanqiaId == gid) {
				FunctionStartSender.sendCmd_1804(hero.getId(), FunctionStartConst.FAILURE_NOT_REP, 0);
				return;
			}
		}
		int[][] reward = Config_sysshow_228.getIns().get(guanqiaId).getReward();
		UseAddUtil.add(hero, reward, SourceGoodConst.FS_GUANQIA_AWARDS, null, true); // 发放奖励
		openSysReward.add(guanqiaId);
		//任务
		TaskUserFunction.getIns().reshTaskUser(hero, TaskUserConst.TASK_TYPE_27, 1);
		FunctionStartSender.sendCmd_1804(hero.getId(), FunctionStartConst.SUCCESS, guanqiaId);
	}

	/**
	 * 检查关卡
	 * 
	 * @param guanqiaId
	 * @return
	 */
	public boolean checkGuanqia(int guanqiaId) {
		Struct_sysshow_228 struct_sysshow_228 = Config_sysshow_228.getIns().get(guanqiaId);
		if (struct_sysshow_228 == null) {
			return false;
		}
		return true;
	}
}
