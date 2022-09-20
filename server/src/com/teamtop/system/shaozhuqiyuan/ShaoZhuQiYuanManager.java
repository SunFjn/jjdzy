package com.teamtop.system.shaozhuqiyuan;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.activity.ativitys.achievementTree.AchievementTreeEnum;
import com.teamtop.system.activity.ativitys.achievementTree.AchievementTreeFunction;
import com.teamtop.system.activity.ativitys.shaoZhuQiYuanRankAct.cross.CrossShaoZhuQiYuanRankActLC;
import com.teamtop.system.activity.ativitys.warOrderAct.WarOrderActEnum;
import com.teamtop.system.activity.ativitys.warOrderAct.WarOrderActFunction;
import com.teamtop.system.bag.BagFunction;
import com.teamtop.system.chat.ChatConst;
import com.teamtop.system.chat.ChatManager;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.shaozhuQiYuanRank.cross.CrossShaoZhuQiYuanRankLC;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventUtil;

import excel.config.Config_sonpoint_267;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_sonpoint_267;

public class ShaoZhuQiYuanManager {
	private static ShaoZhuQiYuanManager ins = null;

	public static ShaoZhuQiYuanManager getIns() {
		if (ins == null) {
			ins = new ShaoZhuQiYuanManager();
		}
		return ins;
	}

	private ShaoZhuQiYuanManager() {
	}

	/**
	 * 打开界面
	 * 
	 * @param hero
	 */
	public void openUI(Hero hero) {
		if (hero == null) {
			return;
		}
		if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.SHAO_ZHU_QI_YUAN)) {
			return;
		}
		ShaoZhuQiYuan shaoZhuQiYuan = hero.getShaozhuqiyuan();
		int qyfNum = BagFunction.getIns().getGoodsNumBySysId(hero.getId(), ShaoZhuQiYuanConst.QIYUANFU_ID);
		int score = shaoZhuQiYuan.getScore();

		ArrayList<Object> scoreAwardList = new ArrayList<Object>();
		for (Struct_sonpoint_267 sonpoint : Config_sonpoint_267.getIns().getSortList()) {
			scoreAwardList.add(
					new Object[] { sonpoint.getId(), shaoZhuQiYuan.getScoreAwardStateMap().get(sonpoint.getId()) });
		}
		ShaoZhuQiYuanSender.sendCmd_5392(hero.getId(), qyfNum, scoreAwardList.toArray(), score);
	}

	/**
	 * 祈愿
	 * 
	 * @param hero
	 */
	public void pray(Hero hero, int prayTimes) {
		if (hero == null) {
			return;
		}
		if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.SHAO_ZHU_QI_YUAN)) {
			return;
		}
		if (!(prayTimes == 1 || prayTimes == 10)) {
			return;
		}

		// 判断是否够祈祷符,不够用元宝
		if (!UseAddUtil.canUse(hero, ShaoZhuQiYuanConst.QIYUANFU_ONECONSUME, prayTimes)) { // 祈祷符不足
			// 祈祷符不足尝试使用元宝
			int[][] yuanbaoConsume;
			if (prayTimes == 1) {
				yuanbaoConsume = Config_xtcs_004.getIns().get(ShaoZhuQiYuanConst.YUANBAO_ONECONSUME).getOther();
			} else {
				yuanbaoConsume = Config_xtcs_004.getIns().get(ShaoZhuQiYuanConst.YUANBAO_TENCONSUME).getOther();
			}
			if (!UseAddUtil.canUse(hero, yuanbaoConsume)) { // 元宝不足
				ShaoZhuQiYuanSender.sendCmd_5394(hero.getId(), 3, 0, 0, null);
				return;
			}
			// 扣除资源
			UseAddUtil.use(hero, yuanbaoConsume, SourceGoodConst.SHAOZHUQIYUAN_YBBUY_CONSUME, true);
		} else {
			// 扣除资源
			UseAddUtil.use(hero, ShaoZhuQiYuanConst.QIYUANFU_ONECONSUME, prayTimes,
					SourceGoodConst.SHAOZHUQIYUAN_QYFBUY_CONSUME, true);
		}

		List<int[]> awardList = new ArrayList<int[]>();// 抽取的奖品列表
		ArrayList<Object> awardObjList = new ArrayList<Object>();
		List<Integer[]> bigNoticList = new ArrayList<Integer[]>();// 抽取的要公布的奖品列表
		List<Integer[]> doubleNoticList = new ArrayList<Integer[]>();// 抽取的要公布的双倍奖品列表
		ShaoZhuQiYuan shaoZhuQiYuan = hero.getShaozhuqiyuan();
		int times = shaoZhuQiYuan.getTimes();
		int nowTimes = times;
		int nowScore = shaoZhuQiYuan.getScore();

		List<ProbabilityEventModel> list = ShaoZhuQiYuanSysCache.getGenAwardList();

		// 开始抽奖逻辑
		for (int i = 0; i < prayTimes; i++) {
			// 检查积分奖励
			int newScore = nowScore + ShaoZhuQiYuanConst.BUYONE_GAINSCORE;
			Struct_sonpoint_267 sonpoint = ShaoZhuQiYuanSysCache.getSzqyScoreTableMap().get(newScore);
			if (sonpoint != null) {
				Integer canGetCount = shaoZhuQiYuan.getScoreAwardStateMap().get(sonpoint.getId());
				if (canGetCount == null || canGetCount == -1) {
					canGetCount = 0;
				}
				canGetCount++;
				shaoZhuQiYuan.getScoreAwardStateMap().put(sonpoint.getId(), canGetCount);
			}
			nowScore = newScore % ShaoZhuQiYuanSysCache.getMaxScore();

			// 高级奖励处理逻辑
			int newTimes = nowTimes + 1;
			List<List<ProbabilityEventModel>> higtList = ShaoZhuQiYuanSysCache.getHigtAwardMap().get(newTimes);

			// TODO 算法有漏洞,循环100次没物品下面报空指针
			Map<String, Integer> countMap = new HashMap<>();

			List<Integer[]> nowBigNoticList = new ArrayList<Integer[]>();
			for (int y = 0; y < 3; y++) {
				int[] genAward = null;
				int a = 0;

				List<ProbabilityEventModel> nowList = list;
				if (higtList != null) {
					// 高级奖励
					nowList = higtList.get(y);
				}

				while (genAward == null || a >= 100) {
					for (ProbabilityEventModel pm : nowList) {
						genAward = (int[]) ProbabilityEventUtil.getEventByProbability(pm);// 随机奖励
					}
					a++;
				}
				String key = genAward[0] + "_" + genAward[1] + "_" + genAward[2] + "_" + genAward[4];
				if (countMap.containsKey(key)) {
					countMap.put(key, countMap.get(key) + 1);
				} else {
					countMap.put(key, 1);
				}

				awardList.add(new int[] { genAward[0], genAward[1], genAward[2] });
				awardObjList.add(new Object[] { genAward[0], genAward[1], genAward[2], 0 });
				if (genAward[4] == ShaoZhuQiYuanConst.AWARD_NOTICE) {
					nowBigNoticList.add(new Integer[] { genAward[1], genAward[2] });
				}
				if (y == 2) {
					// 检查是否发送额外奖励
					for (String k : countMap.keySet()) {
						if (countMap.get(k) == 2) {
							// 额外送一个
							String awardStr[] = k.split("_");
							int type = Integer.valueOf(awardStr[0]);
							int itemId = Integer.valueOf(awardStr[1]);
							int itemCount = Integer.valueOf(awardStr[2]);
							awardList.add(new int[] { type, itemId, itemCount });
							awardObjList.add(new Object[] { type, itemId, itemCount, 1 });
						} else if (countMap.get(k) == 3) {
							// 额外送三个
							String awardStr[] = k.split("_");
							int type = Integer.valueOf(awardStr[0]);
							int itemId = Integer.valueOf(awardStr[1]);
							int itemCount = Integer.valueOf(awardStr[2]) * 3;
							int isNotic = Integer.valueOf(awardStr[3]);
							awardList.add(new int[] { type, itemId, itemCount });
							awardObjList.add(new Object[] { type, itemId, itemCount, 2 });
							if (isNotic == ShaoZhuQiYuanConst.AWARD_NOTICE) {
								// 大奖物品双倍不需要单独公告
								nowBigNoticList.clear();
							}
							doubleNoticList.add(new Integer[] { itemId, Integer.valueOf(awardStr[2]) });
						}
					}
					if (!nowBigNoticList.isEmpty()) {
						bigNoticList.addAll(nowBigNoticList);
					}
				}
			}
			nowTimes = newTimes % ShaoZhuQiYuanSysCache.getMaxTimes();
		}
		// 发送奖品
		int size = awardList.size();
		int[][] AwardArray = new int[size][];
		awardList.toArray(AwardArray);
		int[][] other = Config_xtcs_004.getIns().get(ShaoZhuQiYuanConst.TONGQIAN_AWARDS).getOther();
		UseAddUtil.add(hero, other, prayTimes, SourceGoodConst.SHAOZHUQIYUAN_BUY_AWARD, UseAddUtil.getDefaultMail(),
				false);

		UseAddUtil.add(hero, AwardArray, SourceGoodConst.SHAOZHUQIYUAN_BUY_AWARD, UseAddUtil.getDefaultMail(), false); // 发放抽取的奖励，包括普通和高级

		shaoZhuQiYuan.setTimes(nowTimes);
		shaoZhuQiYuan.setScore(nowScore);

		// 返回协议
		int qyfNum = BagFunction.getIns().getGoodsNumBySysId(hero.getId(), ShaoZhuQiYuanConst.QIYUANFU_ID);
		ShaoZhuQiYuanSender.sendCmd_5394(hero.getId(), 1, qyfNum, shaoZhuQiYuan.getScore(), awardObjList.toArray());
		CrossShaoZhuQiYuanRankLC.getIns().updateAppraiseRankListToCen(hero, prayTimes);
		CrossShaoZhuQiYuanRankActLC.getIns().addUpdateAppraiseRankListToCen(hero, prayTimes, 0);
		// 三国战令(活动)
		WarOrderActFunction.getIns().updateTaskNum(hero, WarOrderActEnum.GOAL_5, prayTimes);
		// 成就树
		AchievementTreeFunction.getIns().checkTask(hero, AchievementTreeEnum.TASK_14, prayTimes, 0);
		openUI(hero);

		// 广播
		for (Integer[] notic : bigNoticList) {
			ChatManager.getIns().broadCast(ChatConst.SHAO_ZHU_QI_YUAN_BIG_NOTIC,
					new Object[] { hero.getNameZoneid(), notic[0], notic[1] });
		}
		for (Integer[] notic : doubleNoticList) {
			ChatManager.getIns().broadCast(ChatConst.SHAO_ZHU_QI_YUAN_DOUBLE_NOTIC,
					new Object[] { hero.getNameZoneid(), notic[0], notic[1] });
		}
	}

	/**
	 * 领取积分宝箱
	 * 
	 * @param hero
	 */
	public void getScoreBXAward(Hero hero, int awardId) {
		if (hero == null) {
			return;
		}
		if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.SHAO_ZHU_QI_YUAN)) {
			return;
		}
		// 奖励不存在
		Struct_sonpoint_267 sonpoint = Config_sonpoint_267.getIns().get(awardId);
		if (sonpoint == null) {
			return;
		}
		ShaoZhuQiYuan shaoZhuQiYuan = hero.getShaozhuqiyuan();
		Integer canGetCount = shaoZhuQiYuan.getScoreAwardStateMap().get(awardId);
		if (canGetCount == null || canGetCount <= 0) {
			ShaoZhuQiYuanSender.sendCmd_5396(hero.getId(), 1, awardId, -1);
			return;
		}
		canGetCount--;

		int[][] reward = sonpoint.getReward();
		if (canGetCount == 0 && shaoZhuQiYuan.getScore() >= sonpoint.getPoint()) {
			canGetCount = -1;
		}
		shaoZhuQiYuan.getScoreAwardStateMap().put(awardId, canGetCount);
		UseAddUtil.add(hero, reward, SourceGoodConst.SHAOZHUQIYUAN_SCOREBX_AWARD, UseAddUtil.getDefaultMail(), true); // 发放奖励
		ShaoZhuQiYuanSender.sendCmd_5396(hero.getId(), 0, awardId, canGetCount);
		ShaoZhuQiYuanFunction.getIns().updateRedPoint(hero);
	}

}
