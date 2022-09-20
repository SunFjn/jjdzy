package com.teamtop.system.activity.ativitys.threeKingdomsCelebration.celebrationHaoLiZhuanPan;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import com.alibaba.fastjson.JSON;
import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.activity.AbstractActivityManager;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.achievementTree.AchievementTreeEnum;
import com.teamtop.system.activity.ativitys.achievementTree.AchievementTreeFunction;
import com.teamtop.system.activity.ativitys.threeKingdomsCelebration.celebrationHaoLiZhuanPan.cross.CelebrationHaoLiZhuanPanLocalToCross;
import com.teamtop.system.activity.ativitys.threeKingdomsCelebration.celebrationHaoLiZhuanPan.model.CelebrationHaoLiZhuanPan;
import com.teamtop.system.activity.model.ActivityData;
import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.system.crossCommonRank.CommonRankFunction;
import com.teamtop.system.crossCommonRank.CommonRankSysCache;
import com.teamtop.system.crossCommonRank.cross.CrossCommonRankLC;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.XTCS004Const;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_sgzpmb_261;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_sgzpmb_261;

public class CelebrationHaoLiZhuanPanManager extends AbstractActivityManager {

	private static CelebrationHaoLiZhuanPanManager ins;

	public static CelebrationHaoLiZhuanPanManager getIns() {
		if (ins == null) {
			ins = new CelebrationHaoLiZhuanPanManager();
		}
		return ins;
	}

	public void openUI(Hero hero) {
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.CELEBRATION_HAO_LI_ZHUAN_PAN)) {
			return;
		}
		Object[] recordArray = CelebrationHaoLiZhuanPanCache.getRecordArray();
		CelebrationHaoLiZhuanPanSender.sendCmd_4122(hero.getId(), recordArray);
	}

	public void buy(Hero hero, int type) {
		CelebrationHaoLiZhuanPan model = null;
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.CELEBRATION_HAO_LI_ZHUAN_PAN)) {
				return;
			}
			model = (CelebrationHaoLiZhuanPan) ActivityFunction.getIns().getActivityData(hero,
					ActivitySysId.CELEBRATION_HAO_LI_ZHUAN_PAN);
			List<Object[]> dropTips = new ArrayList<Object[]>();
			if (TimeDateUtil.isActEndBeforeDay(model.getIndexId(), CelebrationHaoLiZhuanPanConst.DAY_ID)) {
				CelebrationHaoLiZhuanPanSender.sendCmd_4124(hero.getId(), 7, dropTips.toArray());
				return;
			}
			int[][] spend = null;
			int buyTimes = 1;//固定奖励数量
			if(type==1) {
				spend = Config_xtcs_004.getIns().get(XTCS004Const.CELEBRATION_HAO_LI_ZHUAN_PAN_ONE).getOther();
			}else if(type==2) {
				spend = Config_xtcs_004.getIns().get(XTCS004Const.CELEBRATION_HAO_LI_ZHUAN_PAN_TEM).getOther();
				buyTimes = 10;//固定奖励数量
			}else {
				//传入类型不对
				CelebrationHaoLiZhuanPanSender.sendCmd_4124(hero.getId(), 4, dropTips.toArray());
				return;
			}

			Map<Integer, List<ProbabilityEventModel>> puTongAwardMap = CelebrationHaoLiZhuanPanCache
					.getPuTongAwardMap();
			int qs = model.getPeriods();
			List<ProbabilityEventModel> awardsProList = puTongAwardMap.get(qs);
			if (awardsProList==null) {
				//本期奖励没配
				CelebrationHaoLiZhuanPanSender.sendCmd_4124(hero.getId(), 5, dropTips.toArray());
				return;
			}

			if (!UseAddUtil.canUse(hero, spend)) {
				//元宝不足
				CelebrationHaoLiZhuanPanSender.sendCmd_4124(hero.getId(), 6, dropTips.toArray());
				return;
			}
			UseAddUtil.use(hero, spend, SourceGoodConst.CELEBRATION_HAO_LI_ZHUAN_PAN, true);

			List<int[]> dropArr = new ArrayList<int[]>();
			List<Integer[]> awardIdNoticeList = new ArrayList<Integer[]>();// 抽取的要公布的奖品列表
			for (int i = 1; i <= buyTimes; i++) {
				boolean isBigAward = CelebrationHaoLiZhuanPanFunction.getIns().bigAward(model, dropArr, dropTips,
						awardIdNoticeList);// 大奖抽奖
				if (isBigAward) {
					continue;
				}

				int size = awardsProList.size();
				for (int j = 0; j < size; j++) {
					ProbabilityEventModel pe = awardsProList.get(j);
					int[] genAward = (int[]) ProbabilityEventUtil.getEventByProbability(pe);
					if (genAward == null)
						continue;

					int typeTemp = genAward[0];
					if (typeTemp == GameConst.GENDROP) {
						int num = genAward[2];
						ProbabilityEventModel droppe = HeroCache.getDrop(genAward[1]);
						for (int h = 1; h <= num; h++) {
							genAward = (int[]) ProbabilityEventUtil.getEventByProbability(droppe);
							dropArr.add(genAward);
							dropTips.add(new Object[] { genAward[0], genAward[1], genAward[2], genAward[4] });
							if (genAward[4] == 1) {
								awardIdNoticeList.add(new Integer[] { genAward[1], genAward[2] });
							}
						}
					} else {
						dropArr.add(genAward);
						dropTips.add(new Object[] { genAward[0], genAward[1], genAward[2], genAward[4] });
						if (genAward[4] == 1) {
							awardIdNoticeList.add(new Integer[] { genAward[1], genAward[2] });
						}
					}
				}
			}

			// 10000银两
			int[][] awardsGuDing = Config_xtcs_004.getIns().get(XTCS004Const.CELEBRATION_HAO_LI_ZHUAN_PAN_GU_DING)
					.getOther();
			UseAddUtil.add(hero, awardsGuDing, buyTimes, SourceGoodConst.CELEBRATION_HAO_LI_ZHUAN_PAN,
					UseAddUtil.getDefaultMail(), false); // 发放固定奖励

			int[][] drops = new int[dropArr.size()][];
			dropArr.toArray(drops);
			UseAddUtil.add(hero, drops, SourceGoodConst.CELEBRATION_HAO_LI_ZHUAN_PAN, UseAddUtil.getDefaultMail(),
					false); // 发放抽取的奖励，包括普通和高级
			CelebrationHaoLiZhuanPanSender.sendCmd_4124(hero.getId(), 1, dropTips.toArray());
			// 抽奖排行同步到中央服
			CrossCommonRankLC.getIns().addUpdateActivityRankModelToCen(hero, ActivitySysId.CELEBRATION_HAO_LI_ZHUAN_PAN,
					buyTimes, 0);
			// 公告同步到中央服
			CelebrationHaoLiZhuanPanLocalToCross.getIns().sendRecordLC(hero, awardIdNoticeList);
			// 成就树
			AchievementTreeFunction.getIns().checkTask(hero, AchievementTreeEnum.TASK_17, buyTimes, 0);
		} catch (Exception e) {
			// TODO: handle exception
			if (model == null) {
				LogTool.error(e, this, hero.getId(), hero.getName(),
						"CelebrationHaoLiZhuanPanManager buy type:" + type);
			} else {
				LogTool.error(e, this, hero.getId(), hero.getName(),
						"CelebrationHaoLiZhuanPanManager buy type:" + type + " qs:" + model.getPeriods() + " times:"
								+ model.getParameter() + " NumBigAward:" + model.getNumBigAward()
								+ " gettedBigAwardMap:" + JSON.toJSONString(model.getGettedBigAwardMap()));
			}
		}
	}

	public void openRank(Hero hero) {
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.CELEBRATION_HAO_LI_ZHUAN_PAN)) {
			return;
		}
		CelebrationHaoLiZhuanPan model = (CelebrationHaoLiZhuanPan) ActivityFunction.getIns().getActivityData(hero,
				ActivitySysId.CELEBRATION_HAO_LI_ZHUAN_PAN);
		int myTimes = model.getParameter();
		int myRank = 0;
		Object[] openUIObjArray = CommonRankSysCache.getOpenUIObjArray(ActivitySysId.CELEBRATION_HAO_LI_ZHUAN_PAN);
		if (openUIObjArray != null) {
			for (Object obj : openUIObjArray) {
				Object[] objArray = (Object[]) obj;
				String name = (String) objArray[1];
				if (hero.getNameZoneid().equals(name)) {
					myRank = (Integer) objArray[0];
					if (myTimes > 0) {
						objArray[2] = myTimes;
					}
				}
			}
		}
		CelebrationHaoLiZhuanPanSender.sendCmd_4126(hero.getId(), 1, openUIObjArray, myRank, myTimes);
	}

	/**
	 * 打开目标奖励界面
	 * 
	 * @param hero
	 */
	public void openTargetAwardUI(Hero hero) {
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.CELEBRATION_HAO_LI_ZHUAN_PAN)) {
			return;
		}
		CelebrationHaoLiZhuanPan model = (CelebrationHaoLiZhuanPan) ActivityFunction.getIns().getActivityData(hero,
				ActivitySysId.CELEBRATION_HAO_LI_ZHUAN_PAN);
		Map<Integer, List<Struct_sgzpmb_261>> targetAwardConfigListMap = CelebrationHaoLiZhuanPanCache
				.getTargetAwardConfigListMap();
		List<Struct_sgzpmb_261> sortList = targetAwardConfigListMap.get(model.getPeriods());
		List<Object[]> awardList = new ArrayList<>();
		Map<Integer, Integer> targetAwardStateMap = model.getTargetAwardStateMap();
		for(Struct_sgzpmb_261 struct_sgzpmb_261:sortList) {
			int id = struct_sgzpmb_261.getId();
			Integer state = targetAwardStateMap.get(id);
			if(state==null) {
				awardList.add(new Object[] {id,CelebrationHaoLiZhuanPanConst.NOT_REACH});
			}else {
				awardList.add(new Object[] {id,state});
			}
		}
		int myTimes = model.getParameter();
		CelebrationHaoLiZhuanPanSender.sendCmd_4128(hero.getId(), awardList.toArray(), myTimes);
	}

	/**
	 * 领取目标奖励
	 * 
	 * @param hero
	 * @param awardId 要领取的奖励id
	 */
	public void getTargetAward(Hero hero, int awardId) {
		// TODO Auto-generated method stub
		CelebrationHaoLiZhuanPan model = null;
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.CELEBRATION_HAO_LI_ZHUAN_PAN)) {
				return;
			}
			model = (CelebrationHaoLiZhuanPan) ActivityFunction.getIns().getActivityData(hero,
					ActivitySysId.CELEBRATION_HAO_LI_ZHUAN_PAN);
			Struct_sgzpmb_261 struct_sgzpmb_261 = Config_sgzpmb_261.getIns().get(awardId);
			if(struct_sgzpmb_261==null || struct_sgzpmb_261.getQs() != model.getPeriods()) {
				// 没有该奖励
				CelebrationHaoLiZhuanPanSender.sendCmd_4130(hero.getId(),
						CelebrationHaoLiZhuanPanConst.FAILURE_NOT_AWARD, awardId);
				return;
			}
			Map<Integer, Integer> targetAwardStateMap = model.getTargetAwardStateMap();
			Integer state = targetAwardStateMap.get(awardId);
			if(state==null) {
				// 不可领取
				CelebrationHaoLiZhuanPanSender.sendCmd_4130(hero.getId(),CelebrationHaoLiZhuanPanConst.FAILURE_NOT_REACH, awardId);
				return;
			}
			if(state==CelebrationHaoLiZhuanPanConst.GETTED) {
				// 不可重复领取
				CelebrationHaoLiZhuanPanSender.sendCmd_4130(hero.getId(), CelebrationHaoLiZhuanPanConst.FAILURE_NOT_REP, awardId);
				return;
			}
			targetAwardStateMap.put(awardId, CelebrationHaoLiZhuanPanConst.GETTED);
			int[][] reward = struct_sgzpmb_261.getReward();
			UseAddUtil.add(hero, reward, SourceGoodConst.CELEBRATION_HAO_LI_ZHUAN_PAN_TARGETREWARD,UseAddUtil.getDefaultMail(), true); // 发放奖励
			CelebrationHaoLiZhuanPanSender.sendCmd_4130(hero.getId(), CelebrationHaoLiZhuanPanConst.SUCCESS, awardId);
			CelebrationHaoLiZhuanPanFunction.getIns().redPointHandle(hero, targetAwardStateMap);
		} catch (Exception e) {
			// TODO: handle exception
			if (model == null) {
				LogTool.error(e, this, hero.getId(), hero.getName(),
						"CelebrationHaoLiZhuanPanManager getTargetAward awardId:" + awardId);
			} else {
				LogTool.error(e, this, hero.getId(), hero.getName(),
						"CelebrationHaoLiZhuanPanManager getTargetAward awardId:" + awardId + " qs:"
								+ model.getPeriods() + " times:" + model.getParameter() + " targetAwardStateMap:"
								+ JSON.toJSONString(model.getTargetAwardStateMap()));
			}
		}
	}

	@Override
	public void actOpen() {
		CommonRankFunction.getIns().clearLocalCache(ActivitySysId.CELEBRATION_HAO_LI_ZHUAN_PAN);
	}

	@Override
	public void heroActOpen(Hero hero) {
	}

	@Override
	public void actEnd() {
	}

	@Override
	public void heroActEnd(Hero hero) {
		CelebrationHaoLiZhuanPan model = null;
		try {
			model = (CelebrationHaoLiZhuanPan) ActivityFunction.getIns().getActivityData(hero,
					ActivitySysId.CELEBRATION_HAO_LI_ZHUAN_PAN);
			Map<Integer, Integer> targetAwardStateMap = model.getTargetAwardStateMap();
			for (Entry<Integer, Integer> entry : targetAwardStateMap.entrySet()) {
				Integer value = entry.getValue();
				if (value == CelebrationHaoLiZhuanPanConst.CAN_GET) {
					entry.setValue(CelebrationHaoLiZhuanPanConst.GETTED);
					Integer id = entry.getKey();
					try {
						Struct_sgzpmb_261 struct_sgzpmb_261 = Config_sgzpmb_261.getIns().get(id);
						int[][] reward = struct_sgzpmb_261.getReward();
						MailFunction.getIns().sendMailWithFujianData2(hero.getId(),
								MailConst.MAIL_ID_CELEBRATION_HAO_LI_ZHUAN_PAN_TARGETAWARD,
								new Object[] { MailConst.MAIL_ID_CELEBRATION_HAO_LI_ZHUAN_PAN_TARGETAWARD }, reward);// 邮件发放目标奖励
					} catch (Exception e) {
						// TODO: handle exception
						LogTool.error(e, this, hero.getId(), hero.getName(),
								"CelebrationHaoLiZhuanPanManager heroActEnd id:" + id);
					}
				}
			}
		} catch (Exception e) {
			// TODO: handle exception
			if (model == null) {
				LogTool.error(e, this, hero.getId(), hero.getName(), "CelebrationHaoLiZhuanPanManager heroActEnd");
			} else {
				LogTool.error(e, this, hero.getId(), hero.getName(),
						"CelebrationHaoLiZhuanPanManager heroActEnd" + " qs:" + model.getPeriods() + " times:"
								+ model.getParameter() + " targetAwardStateMap:"
								+ JSON.toJSONString(model.getTargetAwardStateMap()));
			}
		}
	}

	@Override
	public ActivityData getActivityData(Hero hero, ActivityInfo activityInfo) {
		CelebrationHaoLiZhuanPan model = new CelebrationHaoLiZhuanPan(hero.getId(), activityInfo.getIndex(),
				activityInfo.getActId(), activityInfo.getPeriods());
		model.setGettedBigAwardMap(new HashMap<>());
		model.setTargetAwardStateMap(new HashMap<>());
		return model;
	}

	@Override
	public Class<?> getActivityData() {
		return CelebrationHaoLiZhuanPan.class;
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {

	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		return CelebrationHaoLiZhuanPanEvent.getIns();
	}

}
