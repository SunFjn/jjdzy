package com.teamtop.system.openDaysSystem.otherHyperPointGeneralSys;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.openDaysSystem.AbsOpenDaysManager;
import com.teamtop.system.openDaysSystem.OpenDaysSystemFunction;
import com.teamtop.system.openDaysSystem.model.AbsOpenDaysSystemModel;
import com.teamtop.system.openDaysSystem.model.HeroOpenDaysSysData;
import com.teamtop.system.openDaysSystem.otherHyperPointGeneralSys.model.OtherAwardModel;
import com.teamtop.system.openDaysSystem.otherHyperPointGeneralSys.model.OtherHyperPointGeneralSys;
import com.teamtop.util.log.LogTool;

import excel.config.Config_hdfl_012;
import excel.struct.Struct_cjdj3_010;
import excel.struct.Struct_hdfl_012;



public class OtherHyperPointGeneralSysManager extends AbsOpenDaysManager {
	private static OtherHyperPointGeneralSysManager ins = null;

	public static OtherHyperPointGeneralSysManager getIns() {
		if (ins == null) {
			ins = new OtherHyperPointGeneralSysManager();
		}
		return ins;
	}

	private OtherHyperPointGeneralSysManager() {
	}

	@Override
	public void openUI(Hero hero) {
		// TODO Auto-generated method stub
		if (hero == null) {
			return;
		}
		if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.OTHER_HYPERPOINT_GENERAL)) {
			return;
		}
		int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.OTHER_HYPERPOINT_GENERAL);
		OtherHyperPointGeneralSys hyperPointGeneralSys = (OtherHyperPointGeneralSys) getSystemModel(hero, uid);
		int rechargeYBNum = hyperPointGeneralSys.getRechargeYBNum();
		int nextTimes = hyperPointGeneralSys.getNextTimes();
		int restTimes = hyperPointGeneralSys.getRestTimes();
		List<OtherAwardModel> awardList = hyperPointGeneralSys.getAwardList();
		ArrayList<Object> arrayList = new ArrayList<Object>();
		for (OtherAwardModel awardModel : awardList) {
			if (awardModel.getState() == OtherHyperPointGeneralSysConst.GETTED) {
				int[] award = awardModel.getAwardItemList().get(0);
				arrayList.add(new Object[] { awardModel.getState(), award[0], award[1], award[2] });
			} else {
				arrayList.add(new Object[] { awardModel.getState(), 0, 0, 0 });
			}
		}
		int qs = hyperPointGeneralSys.getQs();
		List<Struct_cjdj3_010> list = OtherHyperPointGeneralSysCache.getQsListMap().get(qs);
		int size = list.size();
		if (nextTimes > size) {
			nextTimes = size;
		}
		if (qs>1) {
			nextTimes=(qs-1)*1000+nextTimes;
		}
		OtherHyperPointGeneralSysSender.sendCmd_4810(hero.getId(), rechargeYBNum, nextTimes, restTimes, arrayList.toArray());
	}

	public void getAward(Hero hero, int awardId) {
		// TODO Auto-generated method stub
		int[][] award=null;
		try {
		if (hero == null) {
			return;
		}
		if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.OTHER_HYPERPOINT_GENERAL)) {
			return;
		}
		int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.OTHER_HYPERPOINT_GENERAL);
		OtherHyperPointGeneralSys hyperPointGeneralSys = (OtherHyperPointGeneralSys) getSystemModel(hero, uid);
		List<OtherAwardModel> awardList = hyperPointGeneralSys.getAwardList();
		int size = awardList.size();
		if (awardId < 1 || awardId > size) {// 奖励不存在
			OtherHyperPointGeneralSysSender.sendCmd_4812(hero.getId(), OtherHyperPointGeneralSysConst.FAILURE_NOT_AWARD, 0, 0, 0, 0);
			return;
		}
		int restTimes = hyperPointGeneralSys.getRestTimes();
		if (restTimes <= 0) {// 无抽奖次数
			OtherHyperPointGeneralSysSender.sendCmd_4812(hero.getId(), OtherHyperPointGeneralSysConst.FAILURE_NOT_RESTTIMES, 0, 0, 0,
					0);
			return;
		}
		OtherAwardModel awardModel = awardList.get(awardId - 1);
		if (awardModel.getState() == OtherHyperPointGeneralSysConst.GETTED) {// 不能重复领取
			OtherHyperPointGeneralSysSender.sendCmd_4812(hero.getId(), OtherHyperPointGeneralSysConst.FAILURE_NOT_REP_GET, 0, 0, 0,
					0);
			return;
		}
		int nextTimes = hyperPointGeneralSys.getNextTimes();
		int localTimes = nextTimes - restTimes;
//		List<ProbabilityEventModel> pmList = HyperPointGeneralSysCache.getPmList();
//		ProbabilityEventModel pm = pmList.get(localTimes - 1);
//		int[][] award = (int[][]) ProbabilityEventUtil.getEventByProbability(pm);// 随机奖励
		int qs = hyperPointGeneralSys.getQs();
		List<Struct_cjdj3_010> list = OtherHyperPointGeneralSysCache.getQsListMap().get(qs);
		award = list.get(localTimes - 1).getReward();
		UseAddUtil.add(hero, award, SourceGoodConst.HYPERPOINTGENERAL_SYS_AWARD, UseAddUtil.getDefaultMail(), true); // 发放抽取的奖励
		hyperPointGeneralSys.setRestTimes(restTimes - 1);
		ArrayList<int[]> awardItemList = new ArrayList<int[]>();
		for (int[] awardItem : award) {
			awardItemList.add(awardItem);
		}
		awardModel.setAwardItemList(awardItemList);
		awardModel.setState(OtherHyperPointGeneralSysConst.GETTED);// 修改奖励状态
		OtherHyperPointGeneralSysSender.sendCmd_4812(hero.getId(), OtherHyperPointGeneralSysConst.SUCCESS, awardId, award[0][0],
				award[0][1], award[0][2]);
		}catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(), "awardId:" + awardId+" award"+"["+award[0][0]+","+award[0][1]+","+award[0][2]+"]");
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
		// TODO Auto-generated method stub

	}

	@Override
	public AbsOpenDaysSystemModel getSystemModel(Hero hero, int uid) {
		HeroOpenDaysSysData heroOpenDaysSysData = hero.getHeroOpenDaysSysData();
		Map<Integer, AbsOpenDaysSystemModel> opSysDataMap = heroOpenDaysSysData.getOpSysDataMap();
		OtherHyperPointGeneralSys hyperPointGeneralSys = (OtherHyperPointGeneralSys) opSysDataMap.get(uid);
		Struct_hdfl_012 struct_hdfl_012 = Config_hdfl_012.getIns().get(uid);
		int qs = struct_hdfl_012.getQs();
		if(hyperPointGeneralSys==null) {
			hyperPointGeneralSys = new OtherHyperPointGeneralSys();
			hyperPointGeneralSys.setHid(hero.getId());
			List<OtherAwardModel> awardList = new ArrayList<OtherAwardModel>();
			List<Struct_cjdj3_010> list = OtherHyperPointGeneralSysCache.getQsListMap().get(qs);
			int size =list.size();
			for (int i = 0; i < size; i++) {
				OtherAwardModel awardModel = new OtherAwardModel();
				awardModel.setState(OtherHyperPointGeneralSysConst.NOT_GET);
				awardList.add(awardModel);
			}
			hyperPointGeneralSys.setQs(qs);
			hyperPointGeneralSys.setAwardList(awardList);
			hyperPointGeneralSys.setNextTimes(1);
		}
		return hyperPointGeneralSys;
	}

	@Override
	public Class<?> getSystemModel() {
		// TODO Auto-generated method stub
		return OtherHyperPointGeneralSys.class;
	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		// TODO Auto-generated method stub
		return OtherHyperPointGeneralSysEvent.getIns();
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {
		OtherHyperPointGeneralSysFunction.getIns().rechargeYB(hero, money);
	}

	@Override
	public void consumeHandle(Hero hero, int consumeNum, int reason) {
		// TODO Auto-generated method stub

	}

}
