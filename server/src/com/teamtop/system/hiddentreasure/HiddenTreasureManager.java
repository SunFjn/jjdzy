package com.teamtop.system.hiddentreasure;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.NoticeOpTaskRunnable;
import com.teamtop.synHandleCore.orderedRunnable.OpTaskConst;
import com.teamtop.system.activity.ativitys.achievementTree.AchievementTreeEnum;
import com.teamtop.system.activity.ativitys.achievementTree.AchievementTreeFunction;
import com.teamtop.system.activity.ativitys.baoZangPinTu.BaoZangPinTuConst;
import com.teamtop.system.activity.ativitys.baoZangPinTu.BaoZangPinTuFunction;
import com.teamtop.system.activity.ativitys.dropRedPacket.DropRedPacketFunction;
import com.teamtop.system.activity.ativitys.godGenDiscount.GodGenDiscountFunction;
import com.teamtop.system.activity.ativitys.warOrderAct.WarOrderActEnum;
import com.teamtop.system.activity.ativitys.warOrderAct.WarOrderActFunction;
import com.teamtop.system.chat.ChatConst;
import com.teamtop.system.chat.ChatManager;
import com.teamtop.system.eightDoor.EightDoorConst;
import com.teamtop.system.eightDoor.EightDoorFunction;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hiddentreasure.model.HiddenTreasureModel;
import com.teamtop.system.material.MaterialFunction;
import com.teamtop.system.task.TaskUserConst;
import com.teamtop.system.task.TaskUserFunction;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventUtil;
import com.teamtop.util.log.LogTool;

import excel.config.Config_xtcs_004;
import excel.struct.Struct_cbg2_729;
import excel.struct.Struct_cbg_729;

/**
 * 藏宝阁
 * @author hzp
 *
 */
public class HiddenTreasureManager {

	private static HiddenTreasureManager ins;

	private HiddenTreasureManager() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized HiddenTreasureManager getIns() {
		if (ins == null) {
			ins = new HiddenTreasureManager();
		}
		return ins;
	}

	/**
	 * 打开界面
	 * @param hero
	 */
	public void openUI(Hero hero) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, HiddenTreasureConst.SysId)) {
				return;
			}
			HiddenTreasureModel model = hero.getHiddenTreasureModel();
			int lucky = model.getLucky();
			int useTime = model.getUseTime();
			int first = model.getFirst();
			List<Object[]> noticeList = HiddenTreasureCache.getNoticeList();
			int leftFree = HiddenTreasureConst.FREE_TIMES - useTime;
			int qs = model.getQs();
			if (qs == 0) {
				qs = 1;
				model.setQs(qs);
			}
			int endTime = HiddenTreasureFunction.getIns().getEndTime(hero);
			HiddenTreasureSender.sendCmd_2732(hid, lucky, leftFree, first, qs, noticeList.toArray(),endTime);
		} catch (Exception e) {
			LogTool.error(e, HiddenTreasureManager.class, hid, hero.getName(), "HiddenTreasureManager");
		}
	}
	
	/**
	 * 抽奖
	 */
	public void lottery(Hero hero, int type) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, HiddenTreasureConst.SysId)) {
				return;
			}
			HiddenTreasureModel model = hero.getHiddenTreasureModel();
			int lucky = model.getLucky();
			int qs = model.getQs();
			if (qs == 0) {
				qs = 1;
				model.setQs(qs);
			}
			List<int[][]> sendAward = new ArrayList<>();
			List<Object[]> goods = new ArrayList<>();
			int newLucky = lucky;
			int addLucky = Config_xtcs_004.getIns().get(HiddenTreasureConst.ADD_LUCKY).getNum();
			int[][] onceAward = Config_xtcs_004.getIns().get(HiddenTreasureConst.ONCE_AWARD).getOther();
			int singleFirst = model.getSingleFirst();
			int addTimes = 0;
			if (type == 0) {
				// 单抽
				addTimes=1;
				int useTime = model.getUseTime();
				if (useTime == 0) {// 有免费次数
					model.setUseTime(1);
					HiddenTreasureFunction.getIns().updateRedPoint(hero);
				} else {
					if (UseAddUtil.canUse(hero, GameConst.TOOL, HiddenTreasureConst.ONE_COST_NUM, HiddenTreasureConst.TOOL_ID)) {
						UseAddUtil.use(hero, GameConst.TOOL, HiddenTreasureConst.ONE_COST_NUM, HiddenTreasureConst.TOOL_ID,
								SourceGoodConst.HT_ONE_LOTTERY, true);
					} else {
						int[][] cost = Config_xtcs_004.getIns().get(HiddenTreasureConst.ONE_COST).getOther();
						// 神将折扣
						cost = GodGenDiscountFunction.getIns().discount(hero, cost);
						if (!UseAddUtil.canUse(hero, cost)) {
							// 消耗不足
							return;
						}
						UseAddUtil.use(hero, cost, SourceGoodConst.HT_ONE_LOTTERY, true);
					}
				}
				newLucky = lucky + addLucky;
				boolean isBig = false;
				int[][] luckyAward = null;
				if (singleFirst == 0) {
					model.setSingleFirst(1);
					luckyAward = new int[1][3];
					int createJob = hero.getCreateJob();
					if (createJob == GameConst.ZHANSHI) {// 赵云
						luckyAward[0] = new int[] { GameConst.TOOL, HiddenTreasureConst.GENERAL_DIAOCHAN, 1 };
					} else if (createJob == GameConst.WUNV) {// 貂蝉
						luckyAward[0] = new int[] { GameConst.TOOL, HiddenTreasureConst.GENERAL_ZHAOYUN, 1 };
					} else {
						luckyAward[0] = new int[] { GameConst.TOOL, HiddenTreasureConst.GENERAL_DIAOCHAN, 1 };
					}
					// 公告
					List<Object[]> notices = new ArrayList<>();
					notices.add(new Object[] { hero.getNameZoneid(), luckyAward[0][0], luckyAward[0][1],
							luckyAward[0][2] });
					// 处理公告
					notice(hero, notices);
					isBig = true;
				} else {
					List<int[][]> luckyAwardList = getLuckyAward(lucky, newLucky, qs);
					if (luckyAwardList.size() == 0) {
						Struct_cbg_729 struct_cbg_729 = randomHandle(lucky, qs);
						luckyAward = struct_cbg_729.getJiangli();
						if (struct_cbg_729.getDajiang() == 1) {
							// 公告
							List<Object[]> notices = new ArrayList<>();
							notices.add(new Object[] { hero.getNameZoneid(), luckyAward[0][0], luckyAward[0][1],
									luckyAward[0][2] });
							// 处理公告
							notice(hero, notices);
							isBig = true;
						}
					} else {
						luckyAward = luckyAwardList.get(0);
						isBig = true;
					}
				}
				int gid = Config_xtcs_004.getIns().get(HiddenTreasureConst.RANDOM_GIFT_SYSID).getNum();
				if (luckyAward[0][1] == gid) {
					int[][] randomGeneral = randomGeneral(hero, gid);
					if (randomGeneral != null) {
						luckyAward = randomGeneral;
					}
				}
				sendAward.add(luckyAward);
				addToSendGoods(goods, luckyAward, isBig);
				UseAddUtil.add(hero, onceAward, SourceGoodConst.HT_LOTTERY_GET, UseAddUtil.getDefaultMail(), true);
			} else if (type == 1) {
				addTimes=HiddenTreasureConst.TEN;
				if (UseAddUtil.canUse(hero, GameConst.TOOL, HiddenTreasureConst.TEN_COST_NUM, HiddenTreasureConst.TOOL_ID)) {
					UseAddUtil.use(hero, GameConst.TOOL, HiddenTreasureConst.TEN_COST_NUM, HiddenTreasureConst.TOOL_ID,
							SourceGoodConst.HT_TEM_LOTTERY, true);
				} else {
					int[][] cost = Config_xtcs_004.getIns().get(HiddenTreasureConst.TEN_COST).getOther();
					// 神将折扣
					cost = GodGenDiscountFunction.getIns().discount(hero, cost);
					if (!UseAddUtil.canUse(hero, cost)) {
						// 消耗不足
						return;
					}
					UseAddUtil.use(hero, cost, SourceGoodConst.HT_TEM_LOTTERY, true);
				}
				List<Object[]> notices = new ArrayList<>();
				int first = model.getFirst();
				int randomTimes = HiddenTreasureConst.TEN;
				if (singleFirst == 0) {
					randomTimes -= 1;
					model.setSingleFirst(1);
					int[][] luckyAward = new int[1][3];
					int createJob = hero.getCreateJob();
					if (createJob == GameConst.ZHANSHI) {// 赵云
						luckyAward[0] = new int[] { GameConst.TOOL, HiddenTreasureConst.GENERAL_DIAOCHAN, 1 };
					} else if (createJob == GameConst.WUNV) {// 貂蝉
						luckyAward[0] = new int[] { GameConst.TOOL, HiddenTreasureConst.GENERAL_ZHAOYUN, 1 };
					} else {
						luckyAward[0] = new int[] { GameConst.TOOL, HiddenTreasureConst.GENERAL_DIAOCHAN, 1 };
					}
					sendAward.add(luckyAward);
					addToSendGoods(goods, luckyAward, true);
					notices.add(new Object[] { hero.getNameZoneid(), luckyAward[0][0], luckyAward[0][1],
							luckyAward[0][2] });
				}
				if (first != 1) {
					randomTimes -= 1;
					model.setFirst(1);
					int[][] bigAward = Config_xtcs_004.getIns().get(HiddenTreasureConst.BIG_AWARD).getOther();
					sendAward.add(bigAward);
					addToSendGoods(goods, bigAward, true);
					notices.add(new Object[] { hero.getNameZoneid(), bigAward[0][0], bigAward[0][1], bigAward[0][2] });
				}
				newLucky = lucky + addLucky * HiddenTreasureConst.TEN;
				List<int[][]> luckyAwardList = getLuckyAward(lucky, newLucky, qs);
				int[][] luckyAward = null;
				int gid = Config_xtcs_004.getIns().get(HiddenTreasureConst.RANDOM_GIFT_SYSID).getNum();
				for (int i = 0; i < luckyAwardList.size(); i++) {
					luckyAward = luckyAwardList.get(i);
					if (luckyAward[0][1] == gid) {
						int[][] randomGeneral = randomGeneral(hero, gid);
						if (randomGeneral != null) {
							luckyAwardList.set(i, randomGeneral);
						}
					}
				}
				sendAward.addAll(luckyAwardList);
				addToSendGoods(goods, luckyAwardList, true);
				for (int i = 0; i < luckyAwardList.size(); i++) {
					luckyAward = luckyAwardList.get(i);
					notices.add(new Object[] { hero.getNameZoneid(), luckyAward[0][0], luckyAward[0][1],
							luckyAward[0][2] });
				}
				int size = luckyAwardList.size() + 1;
				for (int i = size; i <= randomTimes; i++) {
					Struct_cbg_729 struct_cbg_729 = randomHandle(lucky, qs);
					luckyAward = struct_cbg_729.getJiangli();
					boolean isBig = false;
					if (struct_cbg_729.getDajiang() == 1) {
						notices.add(new Object[] { hero.getNameZoneid(), luckyAward[0][0], luckyAward[0][1],
								luckyAward[0][2] });
						isBig = true;
					}
					sendAward.add(luckyAward);
					addToSendGoods(goods, luckyAward, isBig);
				}
				if (notices.size() > 0) {
					// 处理公告
					notice(hero, notices);
				}
				UseAddUtil.add(hero, onceAward, HiddenTreasureConst.TEN, SourceGoodConst.HT_LOTTERY_GET, UseAddUtil.getDefaultMail(), true);
			}
			int maxLucky = Config_xtcs_004.getIns().get(HiddenTreasureConst.MAX_LUCKY).getNum();
			if (newLucky >= maxLucky) {
				// 幸运值重置
				newLucky = 0;
				// 期数更换
				Map<Integer, Integer> qsNextMap = HiddenTreasureCache.getQsNextMap();
				Integer nextQs = qsNextMap.get(qs);
				if (nextQs == null) {
					nextQs = 1;
				}
				model.setQs(nextQs);
			}
			model.setLucky(newLucky);
			for (int[][] g : sendAward) {
				UseAddUtil.add(hero, g, SourceGoodConst.HT_LOTTERY_GET, UseAddUtil.getDefaultMail(), false);
			}
			int leftFree = HiddenTreasureConst.FREE_TIMES - model.getUseTime();
			HiddenTreasureSender.sendCmd_2734(hid, newLucky, leftFree, model.getFirst(), model.getQs(),
					goods.toArray());
			HiddenTreasureFunction.getIns().GodGenSendGiftSysAndActUpdateHandle(hero, addTimes);
			//任务
			TaskUserFunction.getIns().reshTaskUser(hero, TaskUserConst.TASK_TYPE_44, 1);
			int num=1;
			if (type > 0) {
				num=10;
			}
			EightDoorFunction.getIns().reshEightDoor(hero, EightDoorConst.EIGHTDOOR_TYPE_2, num);
			// 神将折扣
			GodGenDiscountFunction.getIns().addTimes(hero, addTimes);
			// 三国战令(活动)
			WarOrderActFunction.getIns().updateTaskNum(hero, WarOrderActEnum.GOAL_4, addTimes);
			// 成就树
			AchievementTreeFunction.getIns().checkTask(hero, AchievementTreeEnum.TASK_12, addTimes, 0);
			// 宝藏拼图
			BaoZangPinTuFunction.getIns().checkTask(hero, BaoZangPinTuConst.TASK_TYPE_6, addTimes);
			DropRedPacketFunction.getIns().taskHandler(hero, 4, addTimes);
		} catch (Exception e) {
			LogTool.error(e, HiddenTreasureManager.class, hid, hero.getName(), "HiddenTreasureManager");
		}
	}

	public void addToSendGoods(List<Object[]> goods, List<int[][]> awardList, boolean isBig) {
		int[][] luckyAward = null;
		int big = 0;
		if (isBig) {
			big = 1;
		}
		for (int i = 0; i < awardList.size(); i++) {
			luckyAward = awardList.get(i);
			for (int[] arr : luckyAward) {
				goods.add(new Object[] { arr[0], arr[1], arr[2], big });
			}
		}
	}

	public void addToSendGoods(List<Object[]> goods, int[][] award, boolean isBig) {
		int big = 0;
		if (isBig) {
			big = 1;
		}
		for (int[] arr : award) {
			goods.add(new Object[] { arr[0], arr[1], arr[2], big });
		}
	}

	public List<int[][]> getLuckyAward(int lucky, int newLucky, int qs) {
		List<int[][]> awardList = new ArrayList<>();
		List<Struct_cbg2_729> sortList = HiddenTreasureCache.getQsLuckyAwardMap().get(qs);
		int size = sortList.size();
		Struct_cbg2_729 struct_cbg2_729 = null;
		for (int i = 0; i < size; i++) {
			struct_cbg2_729 = sortList.get(i);
			int lk = struct_cbg2_729.getXingyunzhi();
			if (lk > lucky && lk <= newLucky) {
				int[][] jiangli = struct_cbg2_729.getJiangli();
				if (jiangli != null) {
					awardList.add(jiangli);
				}
			}
		}
		return awardList;
	}

	private Struct_cbg_729 randomHandle(int lucky, int qs) {
		ProbabilityEventModel proModel = HiddenTreasureCache.getProModel(qs, lucky);
		Struct_cbg_729 struct_cbg_729 = (Struct_cbg_729) ProbabilityEventUtil.getEventByProbability(proModel);
		return struct_cbg_729;
	}
	
	public void notice(Hero hero, List<Object[]> notices) {
		try {
			try {
				for (Object[] obj : notices) {
					ChatManager.getIns().broadCast(ChatConst.HIDDENTREASURE, new Object[] { obj[0], obj[2] });
				}
			} catch (Exception e) {
				LogTool.error(e, HiddenTreasureManager.class, hero.getId(), hero.getName(),
						"HiddenTreasureManager broad notice");
			}
			OpTaskExecutorService.PublicOrderService.execute(new NoticeOpTaskRunnable() {

				@Override
				public void run() {
					noticeHandle(hero, notices);
				}

				@Override
				public Object getSession() {
					return OpTaskConst.HIDDENTREASURE_AWARDNOTICE;
				}
			});
		} catch (Exception e) {
			LogTool.error(e, HiddenTreasureManager.class, hero.getId(), hero.getName(), "HiddenTreasureManager notice");
		}
	}

	public void noticeHandle(Hero hero, List<Object[]> notices) {
		try {
			List<Object[]> noticeList = HiddenTreasureCache.getNoticeList();
			noticeList.addAll(notices);
			int size = noticeList.size();
			if (size > HiddenTreasureConst.NOTICE_NUM) {
				int overNum = size - HiddenTreasureConst.NOTICE_NUM;
				for (int i = 0; i < overNum; i++) {
					noticeList.remove(0);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, HiddenTreasureManager.class, hero.getId(), hero.getName(),
					"HiddenTreasureManager noticeHandle");
		}
	}

	/**
	 * 随机将领
	 */
	public int[][] randomGeneral(Hero hero, int sysId) {
		try {
			ConcurrentHashMap<Integer, ProbabilityEventModel> diaoLuo = MaterialFunction.getIns().getItemReward(sysId);
			if (diaoLuo == null)
				return null;
			List<int[]> rewards = new ArrayList<int[]>();
			for (int i = 0; i < 1; i++) {
				for (ProbabilityEventModel pe : diaoLuo.values()) {
					int[] is = (int[]) ProbabilityEventUtil.getEventByProbability(pe);
					if (is != null && is.length > 0) {
						rewards.add(is);
					}
				}
			}
			int[][] dropArr = new int[rewards.size()][];
			rewards.toArray(dropArr);
			return dropArr;
		} catch (Exception e) {
			LogTool.error(e, HiddenTreasureManager.class, hero.getId(), hero.getName(),
					"randomGeneral sysId:" + sysId + " num:" + 1 + " Exception!");
			return null;
		}
	}

}
