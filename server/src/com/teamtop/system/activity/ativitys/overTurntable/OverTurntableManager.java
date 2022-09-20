package com.teamtop.system.activity.ativitys.overTurntable;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.activity.AbstractActivityManager;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.overTurntable.model.OverTurntable;
import com.teamtop.system.activity.ativitys.overTurntable.model.OverTurntableNoticeModel;
import com.teamtop.system.activity.ativitys.overTurntable.model.RandAwardRecordModel;
import com.teamtop.system.activity.model.ActivityData;
import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventUtil;

import excel.config.Config_czzpbox_726;
import excel.struct.Struct_czzpbox_726;
import excel.struct.Struct_czzpreward_726;

public class OverTurntableManager extends AbstractActivityManager {
	private static OverTurntableManager ins = null;

	public static OverTurntableManager getIns() {
		if (ins == null) {
			ins = new OverTurntableManager();
		}
		return ins;
	}

	private OverTurntableManager() {
	}

	@Override
	public void openUI(Hero hero) {
		// TODO Auto-generated method stub
		if (hero == null) {
			return;
		}
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.Act_OVERTURNTABLE)) {
			return;
		}
		OverTurntable overTurntable = (OverTurntable) ActivityFunction.getIns().getActivityData(hero,
				ActivitySysId.Act_OVERTURNTABLE);
		int restTimes = overTurntable.getRestTimes();
		int consumeYb = overTurntable.getConsumeYb();
		Map<Integer, Integer> bxAwardStateMap = overTurntable.getBxAwardStateMap();
		ArrayList<Object> stateList = new ArrayList<>();
		List<Struct_czzpbox_726> sortList = Config_czzpbox_726.getIns().getSortList();
		for (Struct_czzpbox_726 struct_czzpbox_726 : sortList) {
			Integer state = bxAwardStateMap.get(struct_czzpbox_726.getId());
			if (state == null) {
				stateList.add(new Object[] { OverTurntableConst.NOT_REACH });
			} else {
				stateList.add(new Object[] { new Integer(state) });
			}
		}
		ArrayList<Object> noticeList = new ArrayList<>();
		List<OverTurntableNoticeModel> awardNoticeList = OverTurntableSysCache.getAwardNoticeList();
		for (int i=0;i<awardNoticeList.size();i++) {
			noticeList.add(new Object[] { awardNoticeList.get(i).getName(), awardNoticeList.get(i).getAwardId() });
		}
		OverTurntableSender.sendCmd_2500(hero.getId(), restTimes, consumeYb, stateList.toArray(), noticeList.toArray());

	}

	/**
	 * 抽奖
	 * 
	 * @param hero
	 * @param type 抽奖类型，1:1次，2:10次
	 */
	public void randAward(Hero hero, int type) {
		if (hero == null) {
			return;
		}
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.Act_OVERTURNTABLE)) {
			return;
		}
		int times = 0;
		if (type == 1) {
			times = OverTurntableConst.RANDAWARD_1;
		} else if (type == 2) {
			times = OverTurntableConst.RANDAWARD_10;
		} else {
			return;
		}
		OverTurntable overTurntable = (OverTurntable) ActivityFunction.getIns().getActivityData(hero,
				ActivitySysId.Act_OVERTURNTABLE);
		int restTimes = overTurntable.getRestTimes();
		if (restTimes < times) {// 剩余抽奖次数不足
			OverTurntableSender.sendCmd_2502(hero.getId(), OverTurntableConst.NOT_RESTTIMES, null, 0);
			return;
		}
		List<Object> awardList = new ArrayList<Object>();// 抽取的奖品列表
		List<Object> awardNoticeList = new ArrayList<Object>();// 抽取的要公布的奖品列表
		List<RandAwardRecordModel> randAwardRecordList = overTurntable.getRandAwardRecordList();// 抽奖记录
		for (int i = 1; i <= times; i++) {
			ProbabilityEventModel pm = OverTurntableSysCache.getProbabilityEventModel();
			Struct_czzpreward_726 struct_czzpreward_726 = (Struct_czzpreward_726) ProbabilityEventUtil
					.getEventByProbability(pm);// 随机奖励
			awardList.add(
					new Object[] { struct_czzpreward_726.getReward()[0][0], struct_czzpreward_726.getReward()[0][1],
							struct_czzpreward_726.getReward()[0][2], struct_czzpreward_726.getBigaward() });
			RandAwardRecordModel randAwardRecordModel = new RandAwardRecordModel();
			randAwardRecordModel.setAwardId(struct_czzpreward_726.getReward()[0][1]);
			randAwardRecordModel.setNum(struct_czzpreward_726.getReward()[0][2]);
			if (randAwardRecordList.size() < OverTurntableConst.RANDAWARD_RECORD) {
				randAwardRecordList.add(randAwardRecordModel);
			} else {
				randAwardRecordList.remove(0);
				randAwardRecordList.add(randAwardRecordModel);
			}
			if (struct_czzpreward_726.getBigaward() == OverTurntableConst.AWARD_NOTICE) {
				awardNoticeList.add(new Object[] { hero.getName(), struct_czzpreward_726.getReward()[0][1] });
			}
		}
		int size = awardList.size();
		int[][] awardArray = new int[size][];
		for (int i = 0; i < size; i++) {
			Object[] objArray = (Object[]) awardList.get(i);
			int[] obj = new int[objArray.length];
			for (int j = 0; j < objArray.length; j++) {
				obj[j] = (int) objArray[j];
			}
			awardArray[i] = obj;
		}
		UseAddUtil.add(hero, awardArray, SourceGoodConst.OVERTURNTABLE_RANDAWARD, UseAddUtil.getDefaultMail(), false); // 发放抽取的奖励
		overTurntable.setRestTimes(restTimes - times);
//		if (overTurntable.getRestTimes() == 0) { // 当没有抽奖次数发送无红点
////			OverTurntableFunction.getIns().sendRedPoint(hero, OverTurntableConst.RESTTIMES_REDPOINT);
//			RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.Act_OVERTURNTABLE,
//					OverTurntableConst.RESTTIMES_REDPOINT, RedPointConst.NO_RED);
//		}
		OverTurntableSender.sendCmd_2502(hero.getId(), OverTurntableConst.SUCCESS, awardList.toArray(), times);

		for (Object obj : awardNoticeList) {
			Object[] objArray = (Object[]) obj;
			OverTurntableFunction.getIns().refreshAwardNoticeList(hero, (int) objArray[1]);
		}
		if (awardNoticeList.size() != 0) {
			Set<Long> heroIdSet = HeroCache.getHeroMap().keySet();// 获取在线玩家id
			for (long hid : heroIdSet) {
				OverTurntableSender.sendCmd_2508(hid, awardNoticeList.toArray());// 给所有在线玩家推送获奖公告
			}
		}

	}

	/**
	 * 领取宝箱奖励
	 * 
	 * @param hero
	 * @param bxAwardId 宝箱id，从1开始
	 */
	public void getBXAward(Hero hero, int bxAwardId) {
		if (hero == null) {
			return;
		}
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.Act_OVERTURNTABLE)) {
			return;
		}
		OverTurntable overTurntable = (OverTurntable) ActivityFunction.getIns().getActivityData(hero,
				ActivitySysId.Act_OVERTURNTABLE);
		int size = Config_czzpbox_726.getIns().getSortList().size();
		if (bxAwardId < 1 || bxAwardId > size) {// 奖励不存在
			OverTurntableSender.sendCmd_2504(hero.getId(), OverTurntableConst.FAILURE_NOT_AWARD, 0);
			return;
		}
		Map<Integer, Integer> bxAwardStateMap = overTurntable.getBxAwardStateMap();
		Integer state = bxAwardStateMap.get(bxAwardId);
		if (state == null) {// 未达到条件
			OverTurntableSender.sendCmd_2504(hero.getId(), OverTurntableConst.FAILURE_NOT_REACH, 0);
			return;
		}
		if (state == OverTurntableConst.GETTED) {// 不能重复领取
			OverTurntableSender.sendCmd_2504(hero.getId(), OverTurntableConst.FAILURE_NOT_REP_GET, 0);
			return;
		}
		int[][] award = Config_czzpbox_726.getIns().getSortList().get(bxAwardId - 1).getReward();
		UseAddUtil.add(hero, award, SourceGoodConst.OVERTURNTABLE_BXAWARD, UseAddUtil.getDefaultMail(), true); // 发放奖励
		bxAwardStateMap.put(bxAwardId, OverTurntableConst.GETTED);
		OverTurntableSender.sendCmd_2504(hero.getId(), OverTurntableConst.SUCCESS, bxAwardId);

	}

	/**
	 * 抽奖记录
	 * 
	 * @param hero
	 */
	public void randAwardRecord(Hero hero) {
		if (hero == null) {
			return;
		}
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.Act_OVERTURNTABLE)) {
			return;
		}
		OverTurntable overTurntable = (OverTurntable) ActivityFunction.getIns().getActivityData(hero,
				ActivitySysId.Act_OVERTURNTABLE);
		List<RandAwardRecordModel> randAwardRecordList = overTurntable.getRandAwardRecordList();
		ArrayList<Object> awardRecordList = new ArrayList<Object>();
		for (RandAwardRecordModel randAwardRecordModel : randAwardRecordList) {
			awardRecordList.add(new Object[] { randAwardRecordModel.getAwardId(), randAwardRecordModel.getNum() });
		}
//		OverTurntableSender.sendCmd_2506(hero.getId(), awardRecordList.toArray());
	}

	@Override
	public void actOpen() {
		// TODO Auto-generated method stub

	}

	@Override
	public void heroActOpen(Hero hero) {
		// TODO Auto-generated method stub
		if (ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.Act_OVERTURNTABLE)) {
			OverTurntableFunction.getIns().fastSendRedPoint(hero);
		}

	}

	@Override
	public void actEnd() {
		// TODO Auto-generated method stub

	}

	@Override
	public void heroActEnd(Hero hero) {
		// TODO Auto-generated method stub

	}

	@Override
	public ActivityData getActivityData(Hero hero, ActivityInfo activityInfo) {
		// TODO Auto-generated method stub
		OverTurntable overTurntable = new OverTurntable(hero.getId(), activityInfo.getIndex(), activityInfo.getActId(),
				activityInfo.getPeriods());
		Map<Integer, Integer> bxAwardStateMap = new HashMap<Integer, Integer>();
		overTurntable.setBxAwardStateMap(bxAwardStateMap);
		List<RandAwardRecordModel> randAwardRecordList = new ArrayList<RandAwardRecordModel>();
		overTurntable.setRandAwardRecordList(randAwardRecordList);
		return overTurntable;
	}

	@Override
	public Class<?> getActivityData() {
		// TODO Auto-generated method stub
		return OverTurntable.class;
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {
		// TODO Auto-generated method stub

	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		// TODO Auto-generated method stub
		return OverTurntableEvent.getIns();
	}

}
