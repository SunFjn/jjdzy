package com.teamtop.system.activity.ativitys.wishingTree;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Random;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.activity.AbstractActivityManager;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.wishingTree.model.WishingTreeAct;
import com.teamtop.system.activity.model.ActivityData;
import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.system.bag.BagFunction;
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

import excel.config.Config_xysjlb_328;
import excel.config.Config_xysmbb_328;
import excel.config.Config_xysslb_328;
import excel.struct.Struct_xysjlb_328;
import excel.struct.Struct_xysmbb_328;
import excel.struct.Struct_xysslb_328;

public class WishingTreeActManager extends AbstractActivityManager {

	private static WishingTreeActManager ins;
	
	private WishingTreeActManager() {
		
				}

	public static synchronized WishingTreeActManager getIns() {
		if (ins == null) {
			ins = new WishingTreeActManager();
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
			boolean checkHeroActOpen = ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.WISHING_TREE_ACT);
			if (!checkHeroActOpen) {
				return;
			}
			WishingTreeAct model = (WishingTreeAct) hero.getHeroActivityData().getActivityDataMap()
					.get(ActivitySysId.WISHING_TREE_ACT);
			List<Object[]> targetRewardList = new ArrayList<>();
			Map<Integer, Integer> awards = model.getAwards();
			if (awards != null && awards.size() > 0) {
				for (Entry<Integer, Integer> entry : awards.entrySet()) {
					Integer id = entry.getKey();
					Integer value = entry.getValue();
					targetRewardList.add(new Object[] { id, value });
				}
			}
			int num = model.getNum();
			WishingTreeActSender.sendCmd_10040(hid, targetRewardList.toArray(), num);
		} catch (Exception e) {
			LogTool.error(e, WishingTreeActManager.class, hid, hero.getName(), "WishingTreeActManager openUI");
		}

			}

	public void draw(Hero hero, int type, int sysId) {
		if (hero == null) {
			return;
				}
		long hid = hero.getId();
		try {
			boolean checkHeroActOpen = ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.WISHING_TREE_ACT);
			if (!checkHeroActOpen) {
				return;
			}
			if (sysId != ActivitySysId.WISHING_TREE_ACT) {
				return;
			}
			WishingTreeAct model = (WishingTreeAct) hero.getHeroActivityData().getActivityDataMap()
					.get(ActivitySysId.WISHING_TREE_ACT);
			int count = 0;// 抽奖次数
			int[][] cost = null;// 消耗元宝
			int qs = model.getPeriods();
			Struct_xysjlb_328 struct_xysjlb_328 = Config_xysjlb_328.getIns().get(qs);
			int beforeNum = model.getNum();
			int num = beforeNum;
			int n = -1;// 随机高级奖励
			int coinNum = 0;// 固定铜币
			if (type == 1) {// 抽奖1次
				count = WishingTreeActConst.COUNT1;
				cost = struct_xysjlb_328.getCj1();
				num = num + count;
				n = num % 10;
				coinNum = 1000;
			} else {// 抽奖10次数
				count = WishingTreeActConst.COUNT2;
				cost = struct_xysjlb_328.getCj2();
				Random r = new Random();
				n = r.nextInt(count);
				num = num + count;
				coinNum = 10000;
			}

			List<Object[]> awardList = new ArrayList<>();
			List<Object[]> targetRewardList = new ArrayList<>();
			int[][] items = new int[count][];
			int[] gbAward = null;// 广播
			List<List<ProbabilityEventModel>> bigList = WishingTreeActSysCache.getAwardMap().get(qs);
			for (int i = 0; i < count; i++) {
				ProbabilityEventModel pm = null;
				if (i == n) {
					pm = bigList.get(WishingTreeActConst.HIGHAWARD_GAILVEVENT_KEY).get(0);// 高级奖励
				} else {
					pm = bigList.get(WishingTreeActConst.GENAWARD_GAILVEVENT_KEY).get(0);// 普通奖励
				}

				int[] getAward = (int[]) ProbabilityEventUtil.getEventByProbability(pm);// 随机奖励
				items[i] = new int[] { getAward[0], getAward[1], getAward[2] };
				awardList.add(new Object[] { getAward[0], getAward[1], getAward[2], getAward[4] });
				if (getAward[4] == 1) {
					gbAward = getAward;
				}
			}

			int canUseNum = BagFunction.getIns().getGoodsNumBySysId(hero.getId(), WishingTreeActConst.ITEMID);
			if (canUseNum < count) {// 扣除元宝
				if (!UseAddUtil.canUse(hero, cost)) {
					WishingTreeActSender.sendCmd_10042(hid, WishingTreeActConst.LACK_OF_MONEY, awardList.toArray(),
							targetRewardList.toArray(), num, ActivitySysId.WISHING_TREE_ACT);
					return;// 元宝不足
				}
				UseAddUtil.use(hero, cost, SourceGoodConst.WISHING_TREE_ACT, true);
			} else {// 扣除道具
				if (!UseAddUtil.canUse(hero, GameConst.TOOL, WishingTreeActConst.NUM * count,
						WishingTreeActConst.ITEMID)) {
					// 没道具扣
					return;
					}
				UseAddUtil.use(hero, GameConst.TOOL, WishingTreeActConst.NUM * count, WishingTreeActConst.ITEMID,
						SourceGoodConst.WISHING_TREE_ACT, true);
				}

			Map<Integer, Integer> awards = model.getAwards();
			List<Struct_xysmbb_328> sortList = Config_xysmbb_328.getIns().getSortList();
			for (Struct_xysmbb_328 struct_xysmbb_328 : sortList) {
				int periods = struct_xysmbb_328.getQs();
				if (periods != qs) {
					continue;
				}
				int cs = struct_xysmbb_328.getCs();
				int mbId = struct_xysmbb_328.getId();
				if (beforeNum < cs && num >= cs) {
					Integer flag = awards.get(mbId);
					if (flag == null || flag == -1) {
						flag = 1;
					} else {
						flag = flag + 1;
					}
					awards.put(mbId, flag);
				}

				Integer flag = awards.get(mbId);
				if (flag == null) {
					targetRewardList.add(new Object[] { mbId, 0 });
				} else {
					if (num >= WishingTreeActSysCache.getMaxNum(qs)) {
						if (flag == -1) {
							flag = 0;
							awards.put(mbId, flag);
						}
					}
					targetRewardList.add(new Object[] { mbId, flag });
					}
				}

			if (num >= WishingTreeActSysCache.getMaxNum(qs)) {
				num = 0;// 重置次数
			}
			model.setNum(num);
			UseAddUtil.add(hero, items, SourceGoodConst.WISHING_TREE_ADD_ACT, UseAddUtil.getDefaultMail(), false);
			UseAddUtil.add(hero, GameConst.COIN, coinNum, SourceGoodConst.WISHING_TREE_ADD_ACT, false);
			CrossCommonRankLC.getIns().addUpdateActivityRankModelToCen(hero, ActivitySysId.WISHING_TREE_ACT, count, 0);
			WishingTreeActFunction.getIns().checkRed(hero);
			WishingTreeActSender.sendCmd_10042(hid, WishingTreeActConst.SUCCESS, awardList.toArray(),
					targetRewardList.toArray(), num, ActivitySysId.WISHING_TREE_ACT);
			if (gbAward != null) {
				ChatManager.getIns().broadCast(ChatConst.WISHING_TREE,
						new Object[] { hero.getName(), gbAward[1], gbAward[2] }); // 全服广播
			}
			LogTool.info(hid, hero.getName(), "WishingTreeActManager draw type=" + type + " num=" + num,
					WishingTreeActManager.class);
		} catch (Exception e) {
			LogTool.error(e, WishingTreeActManager.class, hid, hero.getName(), "WishingTreeActManager draw");
		}

				}

	public void getAward(Hero hero, int id, int sysId) {
		if (hero == null) {
				return;
			}
		long hid = hero.getId();
		try {
			boolean checkHeroActOpen = ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.WISHING_TREE_ACT);
			if (!checkHeroActOpen) {
				return;
			}
			if (sysId != ActivitySysId.WISHING_TREE_ACT) {
				return;
			}
			WishingTreeAct model = (WishingTreeAct) hero.getHeroActivityData().getActivityDataMap()
					.get(ActivitySysId.WISHING_TREE_ACT);
			Map<Integer, Integer> awards = model.getAwards();
			Integer flag = awards.get(id);
			if (flag == null || flag == 0) {
				WishingTreeActSender.sendCmd_10044(hid, WishingTreeActConst.DID_NOT_REACH, id, 0,
						ActivitySysId.WISHING_TREE_ACT);
				return;
			}
			if (flag == -1) {
				WishingTreeActSender.sendCmd_10044(hid, WishingTreeActConst.HAVE_RECEIVE, id, flag,
						ActivitySysId.WISHING_TREE_ACT);
				return;
			}

			Struct_xysmbb_328 struct_xysmbb_328 = Config_xysmbb_328.getIns().get(id);
			if (struct_xysmbb_328 == null) {
				WishingTreeActSender.sendCmd_10044(hid, WishingTreeActConst.PARA_FAILURE, id, flag,
						ActivitySysId.WISHING_TREE_ACT);
				return;
			}

			int[][] reward = struct_xysmbb_328.getReward();
			if (UseAddUtil.canAdd(hero, reward, true)) {
				UseAddUtil.add(hero, reward, SourceGoodConst.WISHING_TREE_ADD_ACT, UseAddUtil.getDefaultMail(), true);
			}
			if (flag > 1) {
				flag = flag - 1;// 领取次数递减
			} else {
				flag = -1;// 标记已领
				int cs = struct_xysmbb_328.getCs();
				if (model.getNum() < cs) {
					flag = 0;
				}
			}
			awards.put(id, flag);
			WishingTreeActSender.sendCmd_10044(hid, WishingTreeActConst.SUCCESS, id, flag,
						ActivitySysId.WISHING_TREE_ACT);
			LogTool.info(hid, hero.getName(), "WishingTreeActManager getAward id=" + id + " flag=" + flag,
					WishingTreeActManager.class);
		} catch (Exception e) {
			LogTool.error(e, WishingTreeActManager.class, hid, hero.getName(), "WishingTreeActManager getAward");
			}

				}

	public void openRankUI(Hero hero) {
		// TODO Auto-generated method stub
		boolean checkHeroActOpen = ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.WISHING_TREE_ACT);
		if (!checkHeroActOpen) {
			return;
				}
		WishingTreeAct model = (WishingTreeAct) hero.getHeroActivityData().getActivityDataMap()
				.get(ActivitySysId.WISHING_TREE_ACT);
		int myTimes = model.getParameter();
		int myRank = 0;
		Object[] openUIObjArray = CommonRankSysCache.getOpenUIObjArray(ActivitySysId.WISHING_TREE_ACT);
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
		WishingTreeActSender.sendCmd_10046(hero.getId(), openUIObjArray, myRank, myTimes);
		}

	public void openTarget(Hero hero, int sysId) {
		// TODO Auto-generated method stub
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.WISHING_TREE_ACT)) {
			return;
		}
		if (sysId != ActivitySysId.WISHING_TREE_ACT) {
			return;
		}
		WishingTreeAct model = (WishingTreeAct) hero.getHeroActivityData().getActivityDataMap()
				.get(ActivitySysId.WISHING_TREE_ACT);
		int periods = model.getPeriods();
		Map<Integer, Integer> awardStateMap = model.getAwardStateMap();
		List<Struct_xysslb_328> list = WishingTreeActSysCache.getTargetConfigMap().get(periods);
		ArrayList<Object> awardList = new ArrayList<>();
		int size = list.size();
		for (int i = 0; i < size; i++) {
			Struct_xysslb_328 struct_xysslb_328 = list.get(i);
			int id = struct_xysslb_328.getId();
			Integer state = awardStateMap.get(id);
			if (state == null) {
				awardList.add(new Object[] { id, WishingTreeActConst.NOT_REACH });
			} else {
				awardList.add(new Object[] { id, state });
			}
		}
		int parameter = model.getParameter();
		WishingTreeActSender.sendCmd_10048(hero.getId(), awardList.toArray(), sysId, parameter);
	}

	public void getTargetAward(Hero hero, int awardId, int sysId) {
		// TODO Auto-generated method stub
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.WISHING_TREE_ACT)) {
				return;
			}
			if (sysId != ActivitySysId.WISHING_TREE_ACT) {
				return;
			}
			WishingTreeAct model = (WishingTreeAct) hero.getHeroActivityData().getActivityDataMap()
					.get(ActivitySysId.WISHING_TREE_ACT);
			int periods = model.getPeriods();
			Struct_xysslb_328 struct_xysslb_328 = Config_xysslb_328.getIns().get(awardId);
			if (struct_xysslb_328 == null) {
				WishingTreeActSender.sendCmd_10050(hero.getId(), WishingTreeActConst.FAILURE_NOT_AWARD, awardId, sysId);
				return;
			}
			int qs = struct_xysslb_328.getQs();
			if (qs != periods) {
				WishingTreeActSender.sendCmd_10050(hero.getId(), WishingTreeActConst.FAILURE_NOT_AWARD, awardId, sysId);
				return;
			}
			Map<Integer, Integer> awardStateMap = model.getAwardStateMap();
			Integer state = awardStateMap.get(awardId);
			if (state == null) {
				WishingTreeActSender.sendCmd_10050(hero.getId(), WishingTreeActConst.FAILURE_NOT_REACH, awardId, sysId);
				return;
			}
			if (state == WishingTreeActConst.GETTED) {
				WishingTreeActSender.sendCmd_10050(hero.getId(), WishingTreeActConst.FAILURE_NOT_REP, awardId, sysId);
				return;
			}
			awardStateMap.put(awardId, WishingTreeActConst.GETTED);
			int[][] reward = struct_xysslb_328.getReward();
			UseAddUtil.add(hero, reward, SourceGoodConst.WISHING_TREE_SENDGIFT, UseAddUtil.getDefaultMail(),
					true); // 发放奖励
			WishingTreeActSender.sendCmd_10050(hero.getId(), WishingTreeActConst.SUCCESS, awardId, sysId);
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(),
					"WishingTreeActManager getTargetAward awardId:" + awardId);
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
			int mailId = MailConst.WISHING_TREE_REWARD;
			WishingTreeAct model = (WishingTreeAct) hero.getHeroActivityData().getActivityDataMap()
					.get(ActivitySysId.WISHING_TREE_ACT);
			Map<Integer, Integer> rewardMap = model.getAwards();
			Iterator<Integer> iterator = rewardMap.keySet().iterator();
			while (iterator.hasNext()) {
				int id = iterator.next();
				Integer state = rewardMap.get(id);
				if (state != null && state > 0) {
					Struct_xysmbb_328 struct_xysmbb_328 = Config_xysmbb_328.getIns().get(id);
					int[][] reward = struct_xysmbb_328.getReward();
					int[][] copyArrayAndNum = CommonUtil.copyArrayAndNum(reward, state);
					if (copyArrayAndNum != null) {
						MailFunction.getIns().sendMailWithFujianData2(hid, mailId, new Object[] { mailId },
								copyArrayAndNum);
					}
				}
			}
			Map<Integer, Integer> awardStateMap = model.getAwardStateMap();
			for (Entry<Integer, Integer> entry : awardStateMap.entrySet()) {
				Integer state = entry.getValue();
				if (state == WishingTreeActConst.CAN_GET) {
					Integer awardId = entry.getKey();
					Struct_xysslb_328 struct_xysslb_328 = Config_xysslb_328.getIns().get(awardId);
					int[][] reward = struct_xysslb_328.getReward();
					MailFunction.getIns().sendMailWithFujianData2(hero.getId(), MailConst.WISHING_TREE_SENDGIFT,
							new Object[] { MailConst.WISHING_TREE_SENDGIFT }, reward);
					entry.setValue(WishingTreeActConst.GETTED);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, WishingTreeActManager.class, hid, hero.getName(), "WishingTreeActManager handleEnd");
		}
	}

	@Override
	public ActivityData getActivityData(Hero hero, ActivityInfo activityInfo) {
		WishingTreeAct model = new WishingTreeAct(hero.getId(), activityInfo.getIndex(), activityInfo.getActId(),
				activityInfo.getPeriods());
		model.setAwards(new HashMap<>());
		model.setAwardStateMap(new HashMap<>());
		return model;
		}

	@Override
	public Class<?> getActivityData() {
		return WishingTreeAct.class;
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {
	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		return WishingTreeActEvent.getIns();
	}

}
