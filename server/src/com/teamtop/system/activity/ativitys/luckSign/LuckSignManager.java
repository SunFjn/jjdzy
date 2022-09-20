package com.teamtop.system.activity.ativitys.luckSign;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.activity.AbstractActivityManager;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.luckSign.model.LuckSign;
import com.teamtop.system.activity.model.ActivityData;
import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.system.chat.ChatConst;
import com.teamtop.system.chat.ChatManager;
import com.teamtop.system.crossCommonRank.CommonRankSysCache;
import com.teamtop.system.crossCommonRank.cross.CrossCommonRankLC;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventUtil;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;

import excel.config.Config_xtcs_004;
import excel.config.Config_xyfq_508;
import excel.config.Config_xyfqhc_508;
import excel.config.Config_xyfqhd_508;
import excel.config.Config_xyfqmr_508;
import excel.struct.Struct_xtcs_004;
import excel.struct.Struct_xyfq_508;
import excel.struct.Struct_xyfqcs_508;
import excel.struct.Struct_xyfqhc_508;
import excel.struct.Struct_xyfqhd_508;
import excel.struct.Struct_xyfqmr_508;

public class LuckSignManager extends AbstractActivityManager {

	private static LuckSignManager ins;
	
	private LuckSignManager() {
		
	}

	public static synchronized LuckSignManager getIns() {
		if (ins == null) {
			ins = new LuckSignManager();
		}
		return ins;
	}

	@Override
	public void openUI(Hero hero) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			boolean checkHeroActOpen = ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.LUCK_SIGN);
			if (!checkHeroActOpen) {
				return;
			}
			LuckSign model = (LuckSign) hero.getHeroActivityData().getActivityDataMap().get(ActivitySysId.LUCK_SIGN);
			// 总的目标奖励
			Map<Integer, Integer> awardStateMap = model.getAwardStateMap();
			int periods = model.getPeriods();
			List<Struct_xyfqhd_508> list = LuckSignSysCache.getTargetConfigMap().get(periods);
			ArrayList<Object> awardList = new ArrayList<>();
			int size = list.size();
			for (int i = 0; i < size; i++) {
				Struct_xyfqhd_508 struct_xyfqhd_508 = list.get(i);
				int id = struct_xyfqhd_508.getId();
				Integer state = awardStateMap.get(id);
				if (state == null) {
					awardList.add(new Object[] { id, LuckSignConst.NOT_REACH });
				} else {
					awardList.add(new Object[] { id, state });
				}
			}

			// 每日目标奖励
			Map<Integer, Integer> dayAwardMap = model.getAwards();
			List<Struct_xyfqmr_508> list1 = LuckSignSysCache.getDayTargetConfigMap().get(periods);
			ArrayList<Object> awardList1 = new ArrayList<>();
			int size1 = list1.size();
			for (int i = 0; i < size1; i++) {
				Struct_xyfqmr_508 struct_xyfqmr_508 = list1.get(i);
				int id = struct_xyfqmr_508.getId();
				Integer state = dayAwardMap.get(id);
				if (state == null) {
					awardList1.add(new Object[] { id, LuckSignConst.NOT_REACH });
				} else {
					awardList1.add(new Object[] { id, state });
				}
			}
			int parameter = model.getParameter();
			int dayNum = model.getDayNum();
			LuckSignSender.sendCmd_12150(hero.getId(), awardList.toArray(), awardList1.toArray(), parameter, dayNum);
		} catch (Exception e) {
			LogTool.error(e, LuckSignManager.class, hid, hero.getName(), "LuckSignManager openUI");
		}

	}

	public void draw(Hero hero, int type) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			boolean checkHeroActOpen = ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.LUCK_SIGN);
			if (!checkHeroActOpen) {
				return;
			}
			LuckSign model = (LuckSign) hero.getHeroActivityData().getActivityDataMap()
					.get(ActivitySysId.LUCK_SIGN);
			int count = 0;// 抽奖次数
			int[][] cost = null;// 消耗元宝
			if (type == 1) {// 抽奖1次
				count = LuckSignConst.COUNT1;
				Struct_xtcs_004 struct_xtcs_004 = Config_xtcs_004.getIns().get(LuckSignConst.XTCS_7952);
				cost = struct_xtcs_004.getOther();
			} else {// 抽奖10次数
				count = LuckSignConst.COUNT2;
				Struct_xtcs_004 struct_xtcs_004 = Config_xtcs_004.getIns().get(LuckSignConst.XTCS_7953);
				cost = struct_xtcs_004.getOther();
			}

			List<Object[]> awardList = new ArrayList<>();
			if (!UseAddUtil.canUse(hero, cost)) {
				// 元宝不足
				LuckSignSender.sendCmd_12152(hid, 1,
						awardList.toArray(), model.getParameter(), model.getDayNum());
				return;
			}
			UseAddUtil.use(hero, cost, SourceGoodConst.LUCK_SIGN_COST, true);

			int[][] items = new int[count][];
			for (int i = 0; i < count; i++) {
				model.setNum(model.getNum() + 1);
				if (model.getNum() > LuckSignSysCache.getMaxNum()) {
					// 重置抽奖次数
					model.setNum(1);
				}
				Struct_xyfqcs_508 xyfqcs_508 = LuckSignSysCache.getCountConfigMap()
						.get(model.getNum());
				ProbabilityEventModel probabilityEventModel = new ProbabilityEventModel();
				for (int[] up : xyfqcs_508.getGl()) {
					probabilityEventModel.addProbabilityEvent(up[1], up[0]);
				}
				int index = (int) ProbabilityEventUtil.getEventByProbability(probabilityEventModel);// 随机
				int propId = 448000 + index;
				items[i] = new int[] { GameConst.TOOL, propId, 1 };
				awardList.add(new Object[] { GameConst.TOOL, propId, 1 });
			}
			UseAddUtil.add(hero, items, SourceGoodConst.LUCK_SIGN_DRAW_GET, UseAddUtil.getDefaultMail(), false);
			model.setDayNum(model.getDayNum() + count);
			CrossCommonRankLC.getIns().addUpdateActivityRankModelToCen(hero, ActivitySysId.LUCK_SIGN, count, 0);
			LuckSignFunction.getIns().checkRed(hero);
			LuckSignSender.sendCmd_12152(hid, 0, awardList.toArray(), model.getParameter(),model.getDayNum());
		} catch (Exception e) {
			LogTool.error(e, LuckSignManager.class, hid, hero.getName(), "LuckSignManager draw");
		}

	}

	public void openLuckSign(Hero hero, int index, int count) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			boolean checkHeroActOpen = ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.LUCK_SIGN);
			if (!checkHeroActOpen) {
				return;
			}
			LuckSign model = (LuckSign) hero.getHeroActivityData().getActivityDataMap()
					.get(ActivitySysId.LUCK_SIGN);
			int qs = model.getPeriods();

			List<Object[]> awardList = new ArrayList<>();
			List<ProbabilityEventModel> bigList = LuckSignSysCache.getAwardMap().get(qs).get(index);
			if (bigList == null) {
				LuckSignSender.sendCmd_12160(hid, 2, awardList.toArray());
				return;
			}

			Struct_xyfq_508 struct_xyfq_508 = Config_xyfq_508.getIns().get(index);
			int q = struct_xyfq_508.getQ();

			int[][] cost = new int[][] { { GameConst.TOOL, q, count } };
			if (!UseAddUtil.canUse(hero, cost)) {
				// 道具不足
				LuckSignSender.sendCmd_12160(hid, 1, awardList.toArray());
				return;
			}
			UseAddUtil.use(hero, cost, SourceGoodConst.LUCK_SIGN_OPEN_COST, true);


			int[][] items = new int[count][];
			int[] gbAward = null;// 广播

			for (int i = 0; i < count; i++) {
				ProbabilityEventModel pm = null;
				pm = bigList.get(0);// 奖励
				int[] getAward = (int[]) ProbabilityEventUtil.getEventByProbability(pm);// 随机奖励
				items[i] = new int[] { getAward[0], getAward[1], getAward[2] };
				awardList.add(new Object[] { getAward[0], getAward[1], getAward[2], getAward[4] });
				if (getAward[4] == 1) {
					gbAward = getAward;
				}
				if (gbAward != null) {
					ChatManager.getIns().broadCast(ChatConst.LUCK_SIGN,
							new Object[] { hero.getName(), gbAward[1], gbAward[2] }); // 全服广播
					gbAward = null;
				}
			}

			UseAddUtil.add(hero, items, SourceGoodConst.LUCK_SIGN_ADD, UseAddUtil.getDefaultMail(), true);
			LuckSignSender.sendCmd_12160(hid, 0, awardList.toArray());

		} catch (Exception e) {
			LogTool.error(e, LuckSignManager.class, hid, hero.getName(), "LuckSignManager openLuckSign");
		}

	}

	public void openRankUI(Hero hero) {
		// TODO Auto-generated method stub
		boolean checkHeroActOpen = ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.LUCK_SIGN);
		if (!checkHeroActOpen) {
			return;
		}
		LuckSign model = (LuckSign) hero.getHeroActivityData().getActivityDataMap()
				.get(ActivitySysId.LUCK_SIGN);
		int myTimes = model.getParameter();
		int myRank = 0;
		Object[] openUIObjArray = CommonRankSysCache.getOpenUIObjArray(ActivitySysId.LUCK_SIGN);
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
		LuckSignSender.sendCmd_12154(hero.getId(), openUIObjArray, myRank, myTimes);
	}

	public void getTargetAward(Hero hero, int sysId, int awardId) {
		// TODO Auto-generated method stub
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.LUCK_SIGN)) {
				return;
			}
			LuckSign model = (LuckSign) hero.getHeroActivityData().getActivityDataMap()
					.get(ActivitySysId.LUCK_SIGN);
			int periods = model.getPeriods();

			if(sysId==1) {
				// 总的目标奖励领取
				Struct_xyfqhd_508 struct_xyfqhd_508 = Config_xyfqhd_508.getIns().get(awardId);
				if (struct_xyfqhd_508 == null) {
					LuckSignSender.sendCmd_12156(hero.getId(), 1, sysId, awardId);
					return;
				}
				int qs = struct_xyfqhd_508.getQs();
				if (qs != periods) {
					LuckSignSender.sendCmd_12156(hero.getId(), 2, sysId, awardId);
					return;
				}
				Map<Integer, Integer> awardStateMap = model.getAwardStateMap();
				Integer state = awardStateMap.get(awardId);
				if (state == null) {
					LuckSignSender.sendCmd_12156(hero.getId(), 3, sysId, awardId);
					return;
				}
				if (state == LuckSignConst.GETTED) {
					LuckSignSender.sendCmd_12156(hero.getId(), 4, sysId, awardId);
					return;
				}
				awardStateMap.put(awardId, LuckSignConst.GETTED);
				int[][] reward = struct_xyfqhd_508.getReward();
				UseAddUtil.add(hero, reward, SourceGoodConst.LUCK_SIGN_GET, UseAddUtil.getDefaultMail(), true); // 发放奖励
				LuckSignSender.sendCmd_12156(hero.getId(), LuckSignConst.SUCCESS, sysId, awardId);
			} else {
				// 每日目标奖励领取
				Struct_xyfqmr_508 struct_xyfqmr_508 = Config_xyfqmr_508.getIns().get(awardId);
				if (struct_xyfqmr_508 == null) {
					LuckSignSender.sendCmd_12156(hero.getId(), 1, sysId, awardId);
					return;
				}
				int qs = struct_xyfqmr_508.getQs();
				if (qs != periods) {
					LuckSignSender.sendCmd_12156(hero.getId(), 2, sysId, awardId);
					return;
				}
				Map<Integer, Integer> awardStateMap = model.getAwards();
				Integer state = awardStateMap.get(awardId);
				if (state == null) {
					LuckSignSender.sendCmd_12156(hero.getId(), 3, sysId, awardId);
					return;
				}
				if (state == LuckSignConst.GETTED) {
					LuckSignSender.sendCmd_12156(hero.getId(), 4, sysId, awardId);
					return;
				}
				awardStateMap.put(awardId, LuckSignConst.GETTED);
				int[][] reward = struct_xyfqmr_508.getReward();
				UseAddUtil.add(hero, reward, SourceGoodConst.LUCK_SIGN_GET, UseAddUtil.getDefaultMail(), true); // 发放奖励
				LuckSignSender.sendCmd_12156(hero.getId(), 0, sysId, awardId);
			}
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(),
					"LuckSignManager getTargetAward sysId:" + sysId + ",awardId:" + awardId);
		}
	}

	/**
	 * 合成福签
	 * 
	 * @param hero
	 * @param id
	 * @param num
	 */
	public void getAward(Hero hero, int id, int num) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			boolean checkHeroActOpen = ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.LUCK_SIGN);
			if (!checkHeroActOpen) {
				return;
			}

			Struct_xyfqhc_508 struct_xyfqhc_508 = Config_xyfqhc_508.getIns().get(id);
			if (struct_xyfqhc_508 == null) {
				// 配置表id不存在
				LuckSignSender.sendCmd_12158(hero.getId(), 1);
			}

			int[][] consume = struct_xyfqhc_508.getConsume();
			int[][] copyArrayAndNum = CommonUtil.copyArrayAndNum(consume, num);
			if (!UseAddUtil.canUse(hero, copyArrayAndNum)) {
				// 道具不足
				LuckSignSender.sendCmd_12158(hero.getId(), 2);
				return;
			}
			int[][] q = struct_xyfqhc_508.getQ();
			int[][] copyArrayAndNum2 = CommonUtil.copyArrayAndNum(q, num);
			if (!UseAddUtil.canUse(hero, copyArrayAndNum2)) {
				// 道具不足
				LuckSignSender.sendCmd_12158(hero.getId(), 2);
				return;
			}
			UseAddUtil.use(hero, copyArrayAndNum, SourceGoodConst.LUCK_SIGN_SYNTHESIS_COST, true);
			UseAddUtil.use(hero, copyArrayAndNum2, SourceGoodConst.LUCK_SIGN_SYNTHESIS_COST, true);

			int[][] prop = new int[][] { { 1, id, num } };
			UseAddUtil.add(hero, prop, SourceGoodConst.LUCK_SIGN_SYNTHESIS_ADD, UseAddUtil.getDefaultMail(), true);

			LuckSignSender.sendCmd_12158(hero.getId(), 0);
		} catch (Exception e) {
			LogTool.error(e, LuckSignManager.class, hid, hero.getName(), "LuckSignManager getAward");
		}
	}

	@Override
	public void actOpen() {
		// TODO Auto-generated method stub

	}

	@Override
	public void heroActOpen(Hero hero) {
		// TODO Auto-generated method stub

	}

	@Override
	public void actEnd() {
		// TODO Auto-generated method stub

	}

	@Override
	public void heroActEnd(Hero hero) {
		// TODO Auto-generated method stub
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			// 每日目标补发
			int mailId = MailConst.LUCK_SIGN_REWARD;
			LuckSign model = (LuckSign) hero.getHeroActivityData().getActivityDataMap()
					.get(ActivitySysId.LUCK_SIGN);
			Map<Integer, Integer> rewardMap = model.getAwards();
			int periods = model.getPeriods();
			Iterator<Integer> iterator = rewardMap.keySet().iterator();
			while (iterator.hasNext()) {
				int id = iterator.next();
				Integer state = rewardMap.get(id);
				if (state != null && state == LuckSignConst.CAN_GET) {
					Struct_xyfqmr_508 struct_xyfqmr_508 = Config_xyfqmr_508.getIns().get(id);
					if (struct_xyfqmr_508.getQs() != periods) {
						continue;
					}
					int[][] reward = struct_xyfqmr_508.getReward();
					if (reward != null) {
						MailFunction.getIns().sendMailWithFujianData2(hid, mailId, new Object[] { mailId },
								reward);
						rewardMap.put(id, LuckSignConst.GETTED);
					}
				}
			}
			// 总的目标补发
			Map<Integer, Integer> awardStateMap = model.getAwardStateMap();
			for (Entry<Integer, Integer> entry : awardStateMap.entrySet()) {
				Integer state = entry.getValue();
				if (state == LuckSignConst.CAN_GET) {
					Integer awardId = entry.getKey();
					Struct_xyfqhd_508 struct_xyfqhd_508 = Config_xyfqhd_508.getIns().get(awardId);
					if (struct_xyfqhd_508.getQs() != periods) {
						continue;
					}
					int[][] reward = struct_xyfqhd_508.getReward();
					MailFunction.getIns().sendMailWithFujianData2(hero.getId(), MailConst.LUCK_SIGN_REWARD,
							new Object[] { MailConst.LUCK_SIGN_REWARD }, reward);
					entry.setValue(LuckSignConst.GETTED);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, LuckSignManager.class, hid, hero.getName(), "LuckSignManager handleEnd");
		}
	}

	@Override
	public ActivityData getActivityData(Hero hero, ActivityInfo activityInfo) {
		LuckSign model = new LuckSign(hero.getId(), activityInfo.getIndex(), activityInfo.getActId(),
				activityInfo.getPeriods());
		model.setAwards(new HashMap<>());
		model.setAwardStateMap(new HashMap<>());
		return model;
	}

	@Override
	public Class<?> getActivityData() {
		return LuckSign.class;
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {
	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		return LuckSignEvent.getIns();
	}

}
