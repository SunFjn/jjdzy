package com.teamtop.system.openDaysSystem.otherTotalRecharge;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.gameCommon.GameConst;
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
import com.teamtop.system.openDaysSystem.otherTotalRecharge.model.OtherTotalRechargeSys;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_hdfl_012;
import excel.config.Config_xitong_001;
import excel.struct.Struct_hdfl_012;
import excel.struct.Struct_leichong3_725;


public class OtherTotalRechargeSysManager extends AbsOpenDaysManager {
	public static OtherTotalRechargeSysManager ins;

	public static OtherTotalRechargeSysManager getIns() {
		if (ins == null) {
			ins = new OtherTotalRechargeSysManager();
		}
		return ins;
	}

	public OtherTotalRechargeSysManager() {
		// TODO Auto-generated constructor stub
	}

	public void openUI(Hero hero) {
		// TODO Auto-generated method stub
		try {
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.OTHER_TOTAL_RECHARGE)) {
				return;
			}
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.OTHER_TOTAL_RECHARGE);
			OtherTotalRechargeSys totalRechargeSys = (OtherTotalRechargeSys) OtherTotalRechargeSysManager.getIns()
					.getSystemModel(hero, uid);
			Map<Integer, Integer> rewardMap = totalRechargeSys.getRewardMap();
			List<Object[]> rewardData = new ArrayList<>();
			for (int index : rewardMap.keySet()) {
				rewardData.add(new Object[] { index, rewardMap.get(index) });
			}
			OtherTotalRechargeSysSender.sendCmd_4670(hero.getId(), totalRechargeSys.getRewardNum(), rewardData.toArray());
		} catch (Exception e) {
			LogTool.error(e, OtherTotalRechargeSysManager.class, hero.getId(), hero.getName(),
					"TotalRechargeSysManager openUI");
		}
	}

	public void getReward(Hero hero, int index) {
		// TODO Auto-generated method stub
		try {
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.OTHER_TOTAL_RECHARGE)) {
				return;
			}
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.OTHER_TOTAL_RECHARGE);
			OtherTotalRechargeSys totalRechargeSys = (OtherTotalRechargeSys) OtherTotalRechargeSysManager.getIns()
					.getSystemModel(hero, uid);
			if (!totalRechargeSys.getRewardMap().containsKey(index)) {
				return;
			}
			int qs = totalRechargeSys.getQs();
			Map<Integer, Struct_leichong3_725> map = OtherTotalRechargeCache.getQsMap().get(qs);
			int state = totalRechargeSys.getRewardMap().get(index);
			if (state == GameConst.REWARD_1) {
				int[][] reward = map.get(index).getReward();
				if (UseAddUtil.canAdd(hero, reward, false)) {
					totalRechargeSys.getRewardMap().put(index, GameConst.REWARD_2);
					UseAddUtil.add(hero, reward, SourceGoodConst.TOTALRECHARGESYS, null, true);
					OtherTotalRechargeSysSender.sendCmd_4672(hero.getId(), index, GameConst.REWARD_2);
				}
			}
			return;
		} catch (Exception e) {
			LogTool.error(e, OtherTotalRechargeSysManager.class, "TotalRechargeSysManager getreward has wrong");
		}
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
		//OtherTotalRechargeSysEvent.getIns().zeroHero(hero, 0);
		// TODO Auto-generated method stub
		// 补发邮件奖励
		int day = Config_xitong_001.getIns().get(SystemIdConst.OTHER_TOTAL_RECHARGE).getDay();
		int betweenOpen = TimeDateUtil.betweenOpen();
		if (betweenOpen >= day % 1000 + 1) {
			OtherTotalRechargeSys totalRechargeSys = (OtherTotalRechargeSys) OtherTotalRechargeSysManager.getIns()
					.getSystemModel(hero, uid);
			HashMap<Integer, Integer> rewardMap = totalRechargeSys.getRewardMap();
			int qs = totalRechargeSys.getQs();
			Map<Integer, Struct_leichong3_725> map = OtherTotalRechargeCache.getQsMap().get(qs);
			for (int rewardKey : rewardMap.keySet()) {
				int rewardSate = rewardMap.get(rewardKey);
				int[][] reward = map.get(rewardKey).getReward();
				if (rewardSate == GameConst.REWARD_1) {
					rewardMap.put(rewardKey, GameConst.REWARD_2);
					MailFunction.getIns().sendMailWithFujianData2(hero.getId(), MailConst.TOTALRECAHARE,
							new Object[] { MailConst.TOTALRECAHARE }, reward);
				}
			}
		}
		
	}

	@Override
	public AbsOpenDaysSystemModel getSystemModel(Hero hero, int uid) {
		HeroOpenDaysSysData heroOpenDaysSysData = hero.getHeroOpenDaysSysData();
		OtherTotalRechargeSys rechargeSys = (OtherTotalRechargeSys) heroOpenDaysSysData.getOpSysDataMap().get(uid);
		Struct_hdfl_012 struct_hdfl_012 = Config_hdfl_012.getIns().get(uid);
		int qs = struct_hdfl_012.getQs();
		if (rechargeSys == null) {
			rechargeSys = new OtherTotalRechargeSys();
			rechargeSys.setHid(hero.getId());
			HashMap<Integer, Integer> rewardMap = new HashMap<Integer, Integer>();
			rechargeSys.setQs(qs);
			List<Struct_leichong3_725> list = OtherTotalRechargeCache.getQsListMap().get(qs);
			for (Struct_leichong3_725 Struct_leichong3_725 : list) {
				rewardMap.put(Struct_leichong3_725.getId(), GameConst.REWARD_0);
			}
			rechargeSys.setRewardMap(rewardMap);
		}
		return rechargeSys;
	}

	@Override
	public Class<?> getSystemModel() {
		return OtherTotalRechargeSys.class;
	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		return OtherTotalRechargeSysEvent.getIns();
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {
		OtherTotalRechargeSysFunction.getIns().recharge(hero, money, product_id);
	}

	@Override
	public void consumeHandle(Hero hero, int consumeNum, int reason) {
		// TODO Auto-generated method stub

	}

}
