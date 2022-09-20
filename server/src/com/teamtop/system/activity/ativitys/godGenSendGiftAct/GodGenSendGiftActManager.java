package com.teamtop.system.activity.ativitys.godGenSendGiftAct;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.activity.AbstractActivityManager;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySender;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.godGenSendGiftAct.model.GodGenSendGiftAct;
import com.teamtop.system.activity.ativitys.godGenSendGiftAct.model.GodGenSendGiftActRankModel;
import com.teamtop.system.activity.model.ActivityData;
import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;

import excel.config.Config_cbgmb2_729;
import excel.struct.Struct_cbgmb2_729;
import excel.struct.Struct_huodong_009;

public class GodGenSendGiftActManager extends AbstractActivityManager {
	private static GodGenSendGiftActManager ins;

	private GodGenSendGiftActManager() {
		// TODO Auto-generated constructor stub
	}

	public static GodGenSendGiftActManager getIns() {
		if (ins == null) {
			ins = new GodGenSendGiftActManager();
		}
		return ins;
	}

	public void openRankUI(Hero hero) {
		// TODO Auto-generated method stub
		if (hero == null) {
			return;
		}
		if (!GodGenSendGiftActFunction.getIns().checkOpen(hero)) {
			return;
		}
		List<GodGenSendGiftActRankModel> rankList = GodGenSendGiftActCache.getRankList();
		int size = rankList.size();
		List<Object[]> objList = new ArrayList<>();
		int myRank = 0;
		long hid = hero.getId();
		for (int i = 0; i < size; i++) {
			GodGenSendGiftActRankModel rankModel = rankList.get(i);
			objList.add(new Object[] { i + 1, rankModel.getName(), rankModel.getTotalTimes() });
			if (rankModel.getHid() == hid) {
				myRank = i + 1;
			}
		}
		GodGenSendGiftAct godGenSendGiftAct = (GodGenSendGiftAct) ActivityFunction.getIns().getActivityData(hero,
				ActivitySysId.ACT_GODGENSENDGIFT);
		GodGenSendGiftActFunction.getIns().heroDataHandle(godGenSendGiftAct);
		int totalTimes = godGenSendGiftAct.getTotalTimes();
		GodGenSendGiftActSender.sendCmd_4872(hero.getId(), objList.toArray(), myRank, totalTimes,
				godGenSendGiftAct.getPeriods());

	}

	public void openTargetUI(Hero hero) {
		// TODO Auto-generated method stub
		if (hero == null) {
			return;
		}
		if (!GodGenSendGiftActFunction.getIns().checkOpen(hero)) {
			return;
		}
		GodGenSendGiftAct godGenSendGiftAct = (GodGenSendGiftAct) ActivityFunction.getIns().getActivityData(hero,
				ActivitySysId.ACT_GODGENSENDGIFT);
		Map<Integer, Integer> awardStateMap = godGenSendGiftAct.getAwardStateMap();
		int qs = godGenSendGiftAct.getPeriods();
		Map<Integer, Map<Integer, Struct_cbgmb2_729>> targetConfigMap = GodGenSendGiftActCache.getTargetConfigMap();
		Map<Integer, Struct_cbgmb2_729> map = targetConfigMap.get(qs);
		ArrayList<Object[]> awardList = new ArrayList<>();
		for (int configId : map.keySet()) {
			Integer state = awardStateMap.get(configId);
			if (state == null) {
				awardList.add(new Object[] { configId, GodGenSendGiftActConst.NOT_REACH });
			} else {
				awardList.add(new Object[] { configId, state });
			}
		}
		GodGenSendGiftActSender.sendCmd_4874(hero.getId(), awardList.toArray());
	}

	public void getAward(Hero hero, int awardId) {
		// TODO Auto-generated method stub
		if (hero == null) {
			return;
		}
		try {
			if (!GodGenSendGiftActFunction.getIns().checkOpen(hero)) {
				return;
			}
			GodGenSendGiftAct godGenSendGiftAct = (GodGenSendGiftAct) ActivityFunction.getIns().getActivityData(hero,
					ActivitySysId.ACT_GODGENSENDGIFT);
			int qs = godGenSendGiftAct.getPeriods();
			Map<Integer, Map<Integer, Struct_cbgmb2_729>> targetConfigMap = GodGenSendGiftActCache.getTargetConfigMap();
			Map<Integer, Struct_cbgmb2_729> map = targetConfigMap.get(qs);
			Struct_cbgmb2_729 struct_cbgmb2_729 = map.get(awardId);

			if (struct_cbgmb2_729 == null) {
				GodGenSendGiftActSender.sendCmd_4876(hero.getId(), GodGenSendGiftActConst.FAILURE_NOT_AWARD, awardId);
				return;
			}
			Map<Integer, Integer> awardStateMap = godGenSendGiftAct.getAwardStateMap();
			Integer state = awardStateMap.get(awardId);
			if (state == null) {
				GodGenSendGiftActSender.sendCmd_4876(hero.getId(), GodGenSendGiftActConst.FAILURE_NOT_REACH, awardId);
				return;
			}
			if (state == GodGenSendGiftActConst.GETTED) {
				GodGenSendGiftActSender.sendCmd_4876(hero.getId(), GodGenSendGiftActConst.FAILURE_NOT_REP, awardId);
				return;
			}
			awardStateMap.put(awardId, GodGenSendGiftActConst.GETTED);
			int[][] reward = struct_cbgmb2_729.getReward();
			// 发放奖励
			UseAddUtil.add(hero, reward, SourceGoodConst.GODGENSENDAWARD_TARGETAWARD, UseAddUtil.getDefaultMail(),
					true);
			GodGenSendGiftActSender.sendCmd_4876(hero.getId(), GodGenSendGiftActConst.SUCCESS, awardId);
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(), "getAward awardId:" + awardId);
		}
	}

	@Override
	public void actOpen() {
		// TODO Auto-generated method stub
		GodGenSendGiftActCache.getRankList().clear();
	}

	@Override
	public void heroActOpen(Hero hero) {
		// TODO Auto-generated method stub

	}

	@Override
	public void actEnd() {
		// TODO Auto-generated method stub
		GodGenSendGiftActCache.getRankList().clear();
	}

	@Override
	public void heroActEnd(Hero hero) {
		// TODO Auto-generated method stub
		int id = 0;
		int state = 0;
		try {
			GodGenSendGiftAct godGenSendGiftAct = (GodGenSendGiftAct) ActivityFunction.getIns().getActivityData(hero,
					ActivitySysId.ACT_GODGENSENDGIFT);
			Map<Integer, Integer> awardStateMap = godGenSendGiftAct.getAwardStateMap();
			for (Entry<Integer, Integer> entry : awardStateMap.entrySet()) {
				state = entry.getValue();
				if (state == GodGenSendGiftActConst.CAN_GET) {
					id = entry.getKey();
					Struct_cbgmb2_729 struct_cbgmb2_729 = Config_cbgmb2_729.getIns().get(id);
					MailFunction.getIns().sendMailWithFujianData2(hero.getId(), MailConst.GODGENSENDGIFT_TARGETAWARD,
							new Object[] { MailConst.GODGENSENDGIFT_TARGETAWARD }, struct_cbgmb2_729.getReward());
				}
			}
			awardStateMap.clear();
			godGenSendGiftAct.setTotalTimes(0);
			// 用来过零点关闭红点
			RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.ACT_GODGENSENDGIFT, 1,
					RedPointConst.NO_RED);

			int indexId = godGenSendGiftAct.getIndexId();
			Struct_huodong_009 last_struct_huodong_009 = GodGenSendGiftActCache.getLast_struct_huodong_009();
			if (last_struct_huodong_009 != null && last_struct_huodong_009.getIndex() == indexId) {
				int lastEndTime = GodGenSendGiftActCache.getLastEndTime();
				if (lastEndTime != 0) {
					ActivitySender.sendCmd_2256(hero.getId(), 5601, 0, ActivitySysId.ACT_GODGENSENDGIFT, 0, 0,
							lastEndTime, 1);
				}
			}
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, "GodGenSendGiftActManager heroActEnd id:" + id + " state:" + state);
		}
	}

	@Override
	public ActivityData getActivityData(Hero hero, ActivityInfo activityInfo) {
		// TODO Auto-generated method stub
		GodGenSendGiftAct godGenSendGiftAct = new GodGenSendGiftAct(hero.getId(), activityInfo.getIndex(),
				activityInfo.getActId(), activityInfo.getPeriods());
		godGenSendGiftAct.setAwardStateMap(new HashMap<>());
		return godGenSendGiftAct;
	}

	@Override
	public Class<?> getActivityData() {
		// TODO Auto-generated method stub
		return GodGenSendGiftAct.class;
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {
		// TODO Auto-generated method stub

	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		// TODO Auto-generated method stub
		return GodGenSendGiftActEvent.getIns();
	}

	@Override
	public void openUI(Hero hero) {
		// TODO Auto-generated method stub

	}

	/**
	 * 打开上期排名界面
	 * 
	 * @param hero
	 */
	public void openLastRankUI(Hero hero) {
		// TODO Auto-generated method stub
		if (hero == null) {
			return;
		}
//		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_GODGENSENDGIFT)) {
//			return;
//		}
		List<GodGenSendGiftActRankModel> lastRankList = GodGenSendGiftActCache.getLastRankList();
		if (lastRankList == null) {
			lastRankList = new ArrayList<>();
		}
		int size = lastRankList.size();
		List<Object[]> objList = new ArrayList<>();
		int myLastRank = 0;
		int myLastTotalTimes = 0;
		long hid = hero.getId();
		for (int i = 0; i < size; i++) {
			GodGenSendGiftActRankModel rankModel = lastRankList.get(i);
			objList.add(new Object[] { i + 1, rankModel.getName(), rankModel.getTotalTimes() });
			if (rankModel.getHid() == hid) {
				myLastRank = i + 1;
				myLastTotalTimes = rankModel.getTotalTimes();
			}
		}
		int lastQs = GodGenSendGiftActCache.getLastQs();
		GodGenSendGiftActSender.sendCmd_4878(hero.getId(), objList.toArray(), myLastRank, myLastTotalTimes, lastQs);
	}

}
