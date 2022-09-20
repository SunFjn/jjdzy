package com.teamtop.system.openDaysSystem.wishingTree;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Random;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.activity.ativitys.wishingTree.WishingTreeActSender;
import com.teamtop.system.bag.BagFunction;
import com.teamtop.system.chat.ChatConst;
import com.teamtop.system.chat.ChatManager;
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
import com.teamtop.system.openDaysSystem.wishingTree.model.WishingTree;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventUtil;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;

import excel.config.Config_hdfl_012;
import excel.config.Config_xysjlb_328;
import excel.config.Config_xysmbb_328;
import excel.config.Config_xysslb_328;
import excel.struct.Struct_hdfl_012;
import excel.struct.Struct_xysjlb_328;
import excel.struct.Struct_xysmbb_328;
import excel.struct.Struct_xysslb_328;

public class WishingTreeManager extends AbsOpenDaysManager {

	private static WishingTreeManager WishingTreeManager;

	private WishingTreeManager() {
	
			}
		
	public static synchronized WishingTreeManager getIns() {
		if (WishingTreeManager == null) {
			WishingTreeManager = new WishingTreeManager();
		}
		return WishingTreeManager;
			}

	public void openUI(Hero hero) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.WISHING_TREE)) {
				return;
			}
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.WISHING_TREE);
			WishingTree model = (WishingTree) getSystemModel(hero, uid);
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
			LogTool.error(e, WishingTreeManager.class, hid, hero.getName(), "WishingTreeManager openUI");
		}
	}


	public void draw(Hero hero, int type, int sysId) {
		if (hero == null) {
				return;
		}
		long hid = hero.getId();
		try {
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.WISHING_TREE)) {
				return;
			}
			if (sysId != SystemIdConst.WISHING_TREE) {
				// 前端传入的id和后端的不一样
				return;
			}
			int count = 0;// 抽奖次数
			int[][] cost = null;// 消耗元宝
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.WISHING_TREE);
			WishingTree model = (WishingTree) getSystemModel(hero, uid);
			int qs = model.getQs();
			Struct_xysjlb_328 struct_xysjlb_328 = Config_xysjlb_328.getIns().get(qs);
			int beforeNum = model.getNum();
			int num = beforeNum;
			int n = -1;// 随机高级奖励
			int coinNum = 0;
			if (type == 1) {// 抽奖1次
				count = WishingTreeConst.COUNT1;
				cost = struct_xysjlb_328.getCj1();
				num = num + count;
				n = num % 10;
				coinNum = 1000;
			} else {// 抽奖10次数
				count = WishingTreeConst.COUNT2;
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
			List<List<ProbabilityEventModel>> bigList = WishingTreeSysCache.getAwardMap().get(qs);
			for (int i = 0; i < count; i++) {
				ProbabilityEventModel pm = null;
				if (i == n) {
					pm = bigList.get(WishingTreeConst.HIGHAWARD_GAILVEVENT_KEY).get(0);// 高级奖励
				} else {
					pm = bigList.get(WishingTreeConst.GENAWARD_GAILVEVENT_KEY).get(0);// 普通奖励
				}

				int[] getAward = (int[]) ProbabilityEventUtil.getEventByProbability(pm);// 随机奖励
				items[i] = new int[] { getAward[0], getAward[1], getAward[2] };
				awardList.add(new Object[] { getAward[0], getAward[1], getAward[2], getAward[4] });
				if (getAward[4] == 1) {
					gbAward = getAward;
				}
			}

			int canUseNum = BagFunction.getIns().getGoodsNumBySysId(hero.getId(), WishingTreeConst.ITEMID);
			if (canUseNum < count) {// 扣除元宝
				if (!UseAddUtil.canUse(hero, cost)) {
					WishingTreeActSender.sendCmd_10042(hid, WishingTreeConst.LACK_OF_MONEY, awardList.toArray(),
							targetRewardList.toArray(), num, sysId);
					return;// 元宝不足
				}
				UseAddUtil.use(hero, cost, SourceGoodConst.WISHING_TREE, true);
			} else {// 扣除道具
				if (!UseAddUtil.canUse(hero, GameConst.TOOL, WishingTreeConst.NUM * count, WishingTreeConst.ITEMID)) {
					// 没道具扣
					return;
				}
				UseAddUtil.use(hero, GameConst.TOOL, WishingTreeConst.NUM * count, WishingTreeConst.ITEMID,
						SourceGoodConst.WISHING_TREE, true);
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
					if (num >= WishingTreeSysCache.getMaxNum(qs)) {
						if (flag == -1) {
							flag = 0;
							awards.put(mbId, flag);
						}
					}
					targetRewardList.add(new Object[] { mbId, flag });
				}
			}

			if (num >= WishingTreeSysCache.getMaxNum(qs)) {
				num = 0;// 重置次数
			}
			model.setNum(num);// 重置的
			model.setParameter(model.getParameter() + count);
			WishingTreeFunction.getIns().targetHandler(hero, model);
			WishingTreeFunction.getIns().checkRed(hero);
			UseAddUtil.add(hero, items, SourceGoodConst.WISHING_TREE_ADD, UseAddUtil.getDefaultMail(), false);
			UseAddUtil.add(hero, GameConst.COIN, coinNum, SourceGoodConst.WISHING_TREE_ADD_ACT, false);
			WishingTreeActSender.sendCmd_10042(hid, WishingTreeConst.SUCCESS, awardList.toArray(),
					targetRewardList.toArray(), num, sysId);
			if (gbAward != null) {
				ChatManager.getIns().broadCast(ChatConst.WISHING_TREE,
						new Object[] { hero.getName(), gbAward[1], gbAward[2] }); // 全服广播
			}
			LogTool.info(hid, hero.getName(), "WishingTreeManager draw type=" + type + " num=" + num,
					WishingTreeManager.class);
		} catch (Exception e) {
			LogTool.error(e, WishingTreeManager.class, hid, hero.getName(), "WishingTreeManager draw");
		}
	}

	public void getAward(Hero hero, int id, int sysId) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.WISHING_TREE)) {
				return;
			}
			if (sysId != SystemIdConst.WISHING_TREE) {
				return;
			}
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.WISHING_TREE);
			WishingTree model = (WishingTree) getSystemModel(hero, uid);
			Map<Integer, Integer> awards = model.getAwards();
			Integer flag = awards.get(id);
			if (flag == null || flag == 0) {
				WishingTreeActSender.sendCmd_10044(hid, WishingTreeConst.DID_NOT_REACH, id, 0, sysId);
					return;
			}
			if (flag == -1) {
				WishingTreeActSender.sendCmd_10044(hid, WishingTreeConst.HAVE_RECEIVE, id, flag, sysId);
				return;
			}

			Struct_xysmbb_328 struct_xysmbb_328 = Config_xysmbb_328.getIns().get(id);
			if (struct_xysmbb_328 == null) {
				WishingTreeActSender.sendCmd_10044(hid, WishingTreeConst.PARA_FAILURE, id, flag, sysId);
				return;
			}

			int[][] reward = struct_xysmbb_328.getReward();
			if (UseAddUtil.canAdd(hero, reward, true)) {
				UseAddUtil.add(hero, reward, SourceGoodConst.WISHING_TREE_ADD, UseAddUtil.getDefaultMail(), true);
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
			WishingTreeActSender.sendCmd_10044(hid, WishingTreeConst.SUCCESS, id, flag, sysId);
			LogTool.info(hid, hero.getName(), "WishingTreeManager getAward id=" + id + " flag=" + flag,
					WishingTreeManager.class);
		} catch (Exception e) {
			LogTool.error(e, WishingTreeManager.class, hid, hero.getName(), "WishingTreeManager getAward");
		}

			}

	public void openTarget(Hero hero, int sysId) {
		// TODO Auto-generated method stub
		if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.WISHING_TREE)) {
			return;
		}
		if (sysId != SystemIdConst.WISHING_TREE) {
			return;
		}
		int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.WISHING_TREE);
		WishingTree model = (WishingTree) getSystemModel(hero, uid);
		int periods = model.getQs();
		Map<Integer, Integer> awardStateMap = model.getAwardStateMap();
		List<Struct_xysslb_328> list = WishingTreeSysCache.getTargetConfigMap().get(periods);
		ArrayList<Object> awardList = new ArrayList<>();
		int size = list.size();
		for (int i = 0; i < size; i++) {
			Struct_xysslb_328 struct_xysslb_328 = list.get(i);
			int id = struct_xysslb_328.getId();
			Integer state = awardStateMap.get(id);
			if (state == null) {
				awardList.add(new Object[] { id, WishingTreeConst.NOT_REACH });
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
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.WISHING_TREE)) {
				return;
			}
			if (sysId != SystemIdConst.WISHING_TREE) {
				return;
			}
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.WISHING_TREE);
			WishingTree model = (WishingTree) getSystemModel(hero, uid);
			int periods = model.getQs();
			Struct_xysslb_328 struct_xysslb_328 = Config_xysslb_328.getIns().get(awardId);
			if (struct_xysslb_328 == null) {
				WishingTreeActSender.sendCmd_10050(hero.getId(), WishingTreeConst.FAILURE_NOT_AWARD, awardId, sysId);
				return;
			}
			int qs = struct_xysslb_328.getQs();
			if (qs != periods) {
				WishingTreeActSender.sendCmd_10050(hero.getId(), WishingTreeConst.FAILURE_NOT_AWARD, awardId, sysId);
				return;
			}
			Map<Integer, Integer> awardStateMap = model.getAwardStateMap();
			Integer state = awardStateMap.get(awardId);
			if (state == null) {
				WishingTreeActSender.sendCmd_10050(hero.getId(), WishingTreeConst.FAILURE_NOT_REACH, awardId, sysId);
				return;
			}
			if (state == WishingTreeConst.GETTED) {
				WishingTreeActSender.sendCmd_10050(hero.getId(), WishingTreeConst.FAILURE_NOT_REP, awardId, sysId);
				return;
			}
			awardStateMap.put(awardId, WishingTreeConst.GETTED);
			int[][] reward = struct_xysslb_328.getReward();
			UseAddUtil.add(hero, reward, SourceGoodConst.WISHING_TREE_SENDGIFT, UseAddUtil.getDefaultMail(), true); // 发放奖励
			WishingTreeActSender.sendCmd_10050(hero.getId(), WishingTreeConst.SUCCESS, awardId, sysId);
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(),
					"WishingTreeManager getTargetAward awardId:" + awardId);
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
		if (hero == null) {
				return;
			}
		long hid = hero.getId();
		try {
			int mailId = MailConst.WISHING_TREE_REWARD;
			WishingTree model = (WishingTree) getSystemModel(hero, uid);
			Map<Integer, Integer> rewardMap = model.getAwards();
			Iterator<Integer> iterator = rewardMap.keySet().iterator();
			while (iterator.hasNext()) {
				int id = iterator.next();
				Integer state = rewardMap.get(id);
				if (state != null && state > 0) {
					Struct_xysmbb_328 struct_xysmbb_328 = Config_xysmbb_328.getIns().get(id);
					int[][] reward = struct_xysmbb_328.getReward();
					if (reward != null) {
					int[][] copyArrayAndNum = CommonUtil.copyArrayAndNum(reward, state);
						MailFunction.getIns().sendMailWithFujianData2(hid, mailId, new Object[] { mailId },
								copyArrayAndNum);
					}
				}
			}
			Map<Integer, Integer> awardStateMap = model.getAwardStateMap();
			for (Entry<Integer, Integer> entry : awardStateMap.entrySet()) {
				Integer state = entry.getValue();
				if (state == WishingTreeConst.CAN_GET) {
					Integer awardId = entry.getKey();
					Struct_xysslb_328 struct_xysslb_328 = Config_xysslb_328.getIns().get(awardId);
					int[][] reward = struct_xysslb_328.getReward();
					MailFunction.getIns().sendMailWithFujianData2(hero.getId(), MailConst.WISHING_TREE_SENDGIFT,
							new Object[] { MailConst.WISHING_TREE_SENDGIFT }, reward);
					entry.setValue(WishingTreeConst.GETTED);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, WishingTreeManager.class, hid, hero.getName(), "WishingTreeManager handleEnd");
		}
	}

	@Override
	public AbsOpenDaysSystemModel getSystemModel(Hero hero, int uid) {
		// TODO Auto-generated method stub
		HeroOpenDaysSysData heroOpenDaysSysData = hero.getHeroOpenDaysSysData();
		WishingTree model = (WishingTree) heroOpenDaysSysData.getOpSysDataMap().get(uid);
		Struct_hdfl_012 struct_hdfl_012 = Config_hdfl_012.getIns().get(uid);
		int qs = struct_hdfl_012.getQs();
		if (model == null) {
			model = new WishingTree();
			Map<Integer, Integer> awards = new HashMap<>();
			model.setAwards(awards);
			model.setAwardStateMap(new HashMap<>());
			model.setQs(qs);
		}
		return model;
	}

	@Override
	public Class<?> getSystemModel() {
		// TODO Auto-generated method stub
		return WishingTree.class;
	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		// TODO Auto-generated method stub
		return WishingTreeEvent.getIns();
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
