package com.teamtop.system.openDaysSystem.runeCellect;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.system.openDaysSystem.AbsOpenDaysManager;
import com.teamtop.system.openDaysSystem.OpenDaysSystemFunction;
import com.teamtop.system.openDaysSystem.OpenDaysSystemSysCache;
import com.teamtop.system.openDaysSystem.model.AbsOpenDaysSystemModel;
import com.teamtop.system.openDaysSystem.model.HeroOpenDaysSysData;
import com.teamtop.system.openDaysSystem.runeCellect.model.RuneCellectModel;
import com.teamtop.util.log.LogTool;

import excel.config.Config_fwsj_263;
import excel.config.Config_hdfl_012;
import excel.struct.Struct_fwsj_263;
import excel.struct.Struct_hdfl_012;

public class RuneCellectManager extends AbsOpenDaysManager {

	private static RuneCellectManager ins;

	private RuneCellectManager() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized RuneCellectManager getIns() {
		if (ins == null) {
			ins = new RuneCellectManager();
		}
		return ins;
	}

	@Override
	public void handleOpenPub() {
		// TODO Auto-generated method stub

	}

	@Override
	public void handleOpen(Hero hero, int uid) {
		if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.RUNE_CELLECT)) {
			return;
		}
	}

	@Override
	public void handleEndPub() {
		// TODO Auto-generated method stub

	}

	@Override
	public void handleEnd(Hero hero, int uid) {
		RuneCellectModel model = (RuneCellectModel) getSystemModel(hero, uid);
		List<Struct_fwsj_263> sortList = Config_fwsj_263.getIns().getSortList();
		int size = sortList.size();
		long hid = hero.getId();
		int mailId = MailConst.MAIL_ID_RUNE_CELLECT;
		for (int i = 0; i < size; i++) {
			Struct_fwsj_263 fwsj_263 = sortList.get(i);
			int id = fwsj_263.getId();
			Map<Integer, Integer> rewardMap = model.getRewardMap();
			Integer state = rewardMap.get(id);
			if (state == null) {
				// 不满足领取条件
				continue;
			}
			if (state == RuneCellectConst.STATE_ALREADY_GET) {
				// 已经领取
				continue;
			}
			int[][] reward = fwsj_263.getReward();
			rewardMap.put(id, RuneCellectConst.STATE_ALREADY_GET);
			MailFunction.getIns().sendMailWithFujianData2(hid, mailId, new Object[] { mailId }, reward);
		}
	}

	@Override
	public AbsOpenDaysSystemModel getSystemModel(Hero hero, int uid) {
		HeroOpenDaysSysData heroOpenDaysSysData = hero.getHeroOpenDaysSysData();
		Map<Integer, AbsOpenDaysSystemModel> opSysDataMap = heroOpenDaysSysData.getOpSysDataMap();
		RuneCellectModel runeCellectModel = (RuneCellectModel) opSysDataMap.get(uid);
		if (runeCellectModel == null) {
			runeCellectModel = new RuneCellectModel();
			runeCellectModel.setHid(hero.getId());
			runeCellectModel.setUid(uid);
			Struct_hdfl_012 hdfl_012 = OpenDaysSystemSysCache.gethdflData(uid);
			runeCellectModel.setQs(hdfl_012.getQs());
			Map<Integer, Integer> rewardMap = new HashMap<Integer, Integer>();
			Map<Integer, Integer> typeNumMap = new HashMap<Integer, Integer>();
			runeCellectModel.setRewardMap(rewardMap);
			runeCellectModel.setTypeNumMap(typeNumMap);
			opSysDataMap.put(uid, runeCellectModel);
		}
		return runeCellectModel;
	}

	@Override
	public Class<?> getSystemModel() {
		return RuneCellectModel.class;
	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		return RuneCellectSysEvent.getIns();
	}

	@Override
	public void openUI(Hero hero) {
		try {
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.RUNE_CELLECT)) {
				return;
			}
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.RUNE_CELLECT);
			RuneCellectManager manager = RuneCellectManager.getIns();
			RuneCellectModel model = (RuneCellectModel) manager.getSystemModel(hero, uid);
			Map<Integer, Integer> rewardMap = model.getRewardMap();
			List<Object[]> rewardList = new ArrayList<>();
			Iterator<Entry<Integer, Integer>> iterator = rewardMap.entrySet().iterator();
			Entry<Integer, Integer> entry = null;
			for (; iterator.hasNext();) {
				entry = iterator.next();
				Integer id = entry.getKey();
				Integer state = entry.getValue();
				rewardList.add(new Object[] { id, state });
			}
			Map<Integer, Integer> typeNumMap = model.getTypeNumMap();
			List<Object[]> typeNumList = new ArrayList<>();
			Iterator<Entry<Integer, Integer>> iterator2 = typeNumMap.entrySet().iterator();
			Entry<Integer, Integer> entry2 = null;
			for (; iterator2.hasNext();) {
				entry2 = iterator2.next();
				Integer type = entry2.getKey();
				Integer num = entry2.getValue();
				typeNumList.add(new Object[] { type, num });
			}
			RuneCellectSender.sendCmd_4590(hero.getId(), rewardList.toArray(), typeNumList.toArray());
		} catch (Exception e) {
			LogTool.error(e, RuneCellectManager.class, hero.getId(), hero.getName(), "RuneCellectManager openUI");
		}
	}

	/**
	 * 领取奖励
	 * 
	 * @param hero
	 */
	public void getReward(Hero hero, int id) {
		try {
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.RUNE_CELLECT)) {
				return;
			}
			long hid = hero.getId();
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.RUNE_CELLECT);
			RuneCellectManager manager = (RuneCellectManager) OpenDaysSystemSysCache
					.getManager(SystemIdConst.RUNE_CELLECT);
			RuneCellectModel model = (RuneCellectModel) manager.getSystemModel(hero, uid);
			int sysQs = Config_hdfl_012.getIns().get(uid).getQs();
			Map<Integer, Integer> rewardMap = model.getRewardMap();
			Integer state = rewardMap.get(id);
			if (state == null) {
				// 不满足领取条件
				RuneCellectSender.sendCmd_4592(hid, 0, 1);
				return;
			}
			if (state == RuneCellectConst.STATE_ALREADY_GET) {
				// 已经领取
				RuneCellectSender.sendCmd_4592(hid, 0, 2);
				return;
			}
			Struct_fwsj_263 fwsj_263 = Config_fwsj_263.getIns().get(id);
			int qs = fwsj_263.getQs();
			if (sysQs != qs) {
				return;
			}
			int[][] reward = fwsj_263.getReward();
			rewardMap.put(id, RuneCellectConst.STATE_ALREADY_GET);
			UseAddUtil.add(hero, reward, SourceGoodConst.RUNE_CELLECT, UseAddUtil.getDefaultMail(), true);
			RuneCellectSender.sendCmd_4592(hid, 1, id);
			RuneCellectFunction.getIns().updateRedPoint(hero);
		} catch (Exception e) {
			LogTool.error(e, RuneCellectManager.class, hero.getId(), hero.getName(), "RuneCellectManager getReward");
		}
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {
		// TODO Auto-generated method stub

	}

	@Override
	public void consumeHandle(Hero hero, int consumeNum, int reason) {
		// TODO Auto-generated method stub

	}

}
