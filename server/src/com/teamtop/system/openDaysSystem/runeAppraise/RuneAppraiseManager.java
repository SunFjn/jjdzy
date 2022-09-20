package com.teamtop.system.openDaysSystem.runeAppraise;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.system.openDaysSystem.AbsOpenDaysManager;
import com.teamtop.system.openDaysSystem.OpenDaysSystemFunction;
import com.teamtop.system.openDaysSystem.OpenDaysSystemSysCache;
import com.teamtop.system.openDaysSystem.model.AbsOpenDaysSystemModel;
import com.teamtop.system.openDaysSystem.model.HeroOpenDaysSysData;
import com.teamtop.system.openDaysSystem.runeAppraise.model.RuneAppraiseModel;
import com.teamtop.util.log.LogTool;

import excel.config.Config_fwjd_264;
import excel.config.Config_hdfl_012;
import excel.struct.Struct_fwjd_264;
import excel.struct.Struct_hdfl_012;

public class RuneAppraiseManager extends AbsOpenDaysManager {

	private static RuneAppraiseManager ins;

	private RuneAppraiseManager() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized RuneAppraiseManager getIns() {
		if (ins == null) {
			ins = new RuneAppraiseManager();
		}
		return ins;
	}

	@Override
	public void handleOpenPub() {
		// TODO Auto-generated method stub

	}

	@Override
	public void handleOpen(Hero hero, int uid) {
		// TODO Auto-generated method stub

	}

	@Override
	public void handleEndPub() {
		// TODO Auto-generated method stub

	}

	@Override
	public void handleEnd(Hero hero, int uid) {
		// 补发奖励
		RuneAppraiseModel model = (RuneAppraiseModel) getSystemModel(hero, uid);
		int appraiseNum = model.getAppraiseNum();
		Set<Integer> rewardSet = model.getRewardSet();
		List<Struct_fwjd_264> sortList = Config_fwjd_264.getIns().getSortList();
		int size = sortList.size();
		long hid = hero.getId();
		int mailId = MailConst.MAIL_ID_RUNE_APPRAISE;
		for (int i = 0; i < size; i++) {
			Struct_fwjd_264 fwjd_264 = sortList.get(i);
			int id = fwjd_264.getId();
			if (rewardSet.contains(id)) {
				continue;
			}
			int times = fwjd_264.getTime();
			if (appraiseNum < times) {
				// 为满足条件
				continue;
			}
			rewardSet.add(id);
			int[][] reward = fwjd_264.getReward();
			MailFunction.getIns().sendMailWithFujianData2(hid, mailId, new Object[] { mailId }, reward);
		}
	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		return RuneAppraiseSysEvent.getIns();
	}

	@Override
	public AbsOpenDaysSystemModel getSystemModel(Hero hero, int uid) {
		HeroOpenDaysSysData heroOpenDaysSysData = hero.getHeroOpenDaysSysData();
		Map<Integer, AbsOpenDaysSystemModel> opSysDataMap = heroOpenDaysSysData.getOpSysDataMap();
		RuneAppraiseModel runeAppraiseModel = (RuneAppraiseModel) opSysDataMap.get(uid);
		if (runeAppraiseModel == null) {
			runeAppraiseModel = new RuneAppraiseModel();
			runeAppraiseModel.setHid(hero.getId());
			runeAppraiseModel.setUid(uid);
			Struct_hdfl_012 hdfl_012 = OpenDaysSystemSysCache.gethdflData(uid);
			runeAppraiseModel.setQs(hdfl_012.getQs());
			Set<Integer> rewardSet = new HashSet<>();
			runeAppraiseModel.setRewardSet(rewardSet);
			opSysDataMap.put(uid, runeAppraiseModel);
		}
		return runeAppraiseModel;
	}

	@Override
	public Class<?> getSystemModel() {
		return RuneAppraiseModel.class;
	}

	@Override
	public void openUI(Hero hero) {
		if (hero == null) {
			return;
		}
		try {
			long hid = hero.getId();
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.RUNE_APPRAISE)) {
				return;
			}
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.RUNE_APPRAISE);
			RuneAppraiseModel model = (RuneAppraiseModel) getSystemModel(hero, uid);
			int appraiseNum = model.getAppraiseNum();
			Set<Integer> rewardSet = model.getRewardSet();
			List<Object[]> list = new ArrayList<>();
			for (int id : rewardSet) {
				list.add(new Object[] { id });
			}
			RuneAppraiseSender.sendCmd_4610(hid, appraiseNum, list.toArray());
		} catch (Exception e) {
			LogTool.error(e, RuneAppraiseManager.class, hero.getId(), hero.getName(), "RuneAppraiseManager openUI");
		}

	}

	/**
	 * 领取奖励
	 * 
	 * @param hero
	 */
	public void getReward(Hero hero, int id) {
		try {
			if (hero == null) {
				return;
			}
			long hid = hero.getId();
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.RUNE_APPRAISE)) {
				return;
			}
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.RUNE_APPRAISE);
			RuneAppraiseModel model = (RuneAppraiseModel) getSystemModel(hero, uid);
			int sysQs = Config_hdfl_012.getIns().get(uid).getQs();
			int appraiseNum = model.getAppraiseNum();
			Set<Integer> rewardSet = model.getRewardSet();
			if (rewardSet.contains(id)) {
				// 已领取
				RuneAppraiseSender.sendCmd_4612(hid, 0, 2);
				return;
			}
			Struct_fwjd_264 fwjd_264 = Config_fwjd_264.getIns().get(id);
			int qs = fwjd_264.getQs();
			if (sysQs != qs) {
				return;
			}
			int times = fwjd_264.getTime();
			if (appraiseNum < times) {
				// 为满足条件
				RuneAppraiseSender.sendCmd_4612(hid, 0, 1);
				return;
			}
			rewardSet.add(id);
			int[][] reward = fwjd_264.getReward();
			UseAddUtil.add(hero, reward, SourceGoodConst.RUNE_APPRAISE, UseAddUtil.getDefaultMail(), true);
			RuneAppraiseSender.sendCmd_4612(hid, 1, id);
			RuneAppraiseFunction.getIns().updateRedPoint(hero);
		} catch (Exception e) {
			LogTool.error(e, RuneAppraiseManager.class, hero.getId(), hero.getName(),
					"RuneAppraiseManager getReward, id=" + id);
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
