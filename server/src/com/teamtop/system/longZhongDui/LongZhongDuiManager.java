package com.teamtop.system.longZhongDui;

import java.util.ArrayList;
import java.util.List;

import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.activity.ativitys.warOrder.WarOrderEnum;
import com.teamtop.system.activity.ativitys.warOrder.WarOrderFunction;
import com.teamtop.system.activity.ativitys.wuJiangGoal.WuJiangGoalEnum;
import com.teamtop.system.activity.ativitys.wuJiangGoal.WuJiangGoalFunction;
import com.teamtop.system.daytask.DayTaskConst;
import com.teamtop.system.daytask.DayTaskFunction;
import com.teamtop.system.event.backstage.events.flowHero.FlowHeroEvent;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.longZhongDui.model.LongZhongDuiRankModel;
import com.teamtop.system.openDaysSystem.warOrder.WarOrderNewEnum;
import com.teamtop.system.openDaysSystem.warOrder.WarOrderNewFunction;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_xtcs_004;
import excel.struct.Struct_xtcs_004;

public class LongZhongDuiManager {
	private static LongZhongDuiManager ins = null;

	public static LongZhongDuiManager getIns() {
		if (ins == null) {
			ins = new LongZhongDuiManager();
		}
		return ins;
	}

	private LongZhongDuiManager() {
	}

	/**
	 * 打开答题界面
	 * 
	 * @param hero
	 */
	public void openAnswerUI(Hero hero) {
		if (hero == null) {
			return;
		}
		if (!HeroFunction.getIns().checkSystemOpen(hero, LongZhongDuiConst.LONGZHONGDUI)) {
			return;
		}
		int myScore = hero.getLongZhongDui().getMyScore();
		if (!LongZhongDuiFunction.getIns().isOpen()) { // 答题未开始或已结束
			LongZhongDuiSender.sendCmd_1982(hero.getId(), LongZhongDuiConst.NOT_START, 0, 0, 0, 0, 0, 0, 0, myScore,
					getMyRank(hero));
			return;
		}
		if (LongZhongDuiFunction.getIns().isHeroOpen(hero)) {
			LongZhongDuiSender.sendCmd_1982(hero.getId(), LongZhongDuiConst.CAN_ANSWER, 0, 0, 0, 0, 0, 0, 0, 0, 0);
			return;
		}
		
		int currentTime = TimeDateUtil.getCurrentTime();
		int fTopicDownTime = LongZhongDuiConst.FirstTOPIC_DOWNTIME;
		int topicNum = LongZhongDuiConst.TOPIC_NUM;
		int eTopicTime = LongZhongDuiConst.EVERYTOPIC_TIME;
		int eTopicDis = LongZhongDuiConst.EVERYTOPIC_DISTANCE;
		int openTime = hero.getLongZhongDui().getHeroOpenTime();

		if (currentTime < openTime + fTopicDownTime) {// 开始答题
			int time = openTime + fTopicDownTime - currentTime;
			LongZhongDuiSender.sendCmd_1982(hero.getId(), LongZhongDuiConst.START_ANSWER, time, 0, 0, 0, 0, 0, 0, 0, 0);
			return;
		}

		int had = hero.getLongZhongDui().getAnsweredMap().size();
		int now = had + 1;

		if (had >= topicNum) {
			// 答题已结束
			LongZhongDuiSender.sendCmd_1982(hero.getId(), LongZhongDuiConst.TODAY_ANSWERED, 0, 0, 0, 0, 0, 0, 0,
					myScore, getMyRank(hero));
			return;
		}
		
		if(now >= 2) {
			// 第1~20题答完
			int time = hero.getLongZhongDui().getAnsweredMap().get(had) + eTopicDis;
			if (currentTime < time) {// 答题超时
				int time1 = time - currentTime;
				List<Integer> topicAndAnswer = (List<Integer>) LongZhongDuiSysCache.getLongZhongDuiCache()
						.getTopicAndAnswerList().get(had-1);
				LongZhongDuiSender.sendCmd_1982(hero.getId(), LongZhongDuiConst.ANSWER_TIMEOUT, time1, had,
						topicAndAnswer.get(0), topicAndAnswer.get(1), topicAndAnswer.get(2), topicAndAnswer.get(3),
						topicAndAnswer.get(4), myScore, getMyRank(hero));
				return;
			}
		}
		
		int wTime = eTopicDis;
		Integer nowTime = hero.getLongZhongDui().getAnsweredMap().get(had);
		if (now == 1) {
			wTime = fTopicDownTime;
			nowTime = hero.getLongZhongDui().getHeroOpenTime();
		}
		int k = 0;
		for (int i = now; i <= topicNum; i++) {
			int time = nowTime + wTime + eTopicTime + (eTopicTime + eTopicDis) * k;
			if (currentTime < time) { // 答题中
				int time1 = time - currentTime;
				List<Integer> topicAndAnswer = (List<Integer>) LongZhongDuiSysCache.getLongZhongDuiCache()
						.getTopicAndAnswerList().get(i - 1);
				LongZhongDuiSender.sendCmd_1982(hero.getId(), LongZhongDuiConst.ANSWERING, time1, i,
						topicAndAnswer.get(0), topicAndAnswer.get(1), topicAndAnswer.get(2), topicAndAnswer.get(3),
						topicAndAnswer.get(4), myScore, getMyRank(hero));
				return;
			}
			time += eTopicDis;
			if (currentTime < time) {// 答题超时
				int time1 = time - currentTime;
				List<Integer> topicAndAnswer = (List<Integer>) LongZhongDuiSysCache.getLongZhongDuiCache()
						.getTopicAndAnswerList().get(i - 1);
				LongZhongDuiSender.sendCmd_1982(hero.getId(), LongZhongDuiConst.ANSWER_TIMEOUT, time1, i,
						topicAndAnswer.get(0), topicAndAnswer.get(1), topicAndAnswer.get(2), topicAndAnswer.get(3),
						topicAndAnswer.get(4), myScore, getMyRank(hero));
				return;
			} else {
				// 这题跳过了
				hero.getLongZhongDui().getAnsweredMap().put(i,currentTime);
			}
			k++;
			if (i == topicNum) {
				LongZhongDuiSender.sendCmd_1982(hero.getId(), LongZhongDuiConst.TODAY_ANSWERED, 0, 0, 0, 0, 0, 0, 0,
						myScore, getMyRank(hero));
			}
		}
	}

	/**
	 * 取得我的排名
	 * 
	 * @param hero
	 * @return
	 */
	public int getMyRank(Hero hero) {
		List<LongZhongDuiRankModel> longZhongDuiRankList = LongZhongDuiSysCache.getLongZhongDuiCache()
				.getLongZhongDuiRankList();
		LongZhongDuiRankModel longZhongDuiRank = new LongZhongDuiRankModel();
		longZhongDuiRank.setHid(hero.getId());
		int indexOf = longZhongDuiRankList.indexOf(longZhongDuiRank);
		if (indexOf >= 0) {
			return indexOf + 1;
		}
		return 0;
	}

	/**
	 * 答题
	 * 
	 * @param hero
	 * @param answerId
	 */
	public void putAnswer(Hero hero, int answerId) {
		if (hero == null) {
			return;
		}
		if (!HeroFunction.getIns().checkSystemOpen(hero, LongZhongDuiConst.LONGZHONGDUI)) {
			return;
		}
		if (answerId > 4 || answerId < 0) {
			return;
		}

		int openTime = hero.getLongZhongDui().getHeroOpenTime();
		int currentTime = TimeDateUtil.getCurrentTime();
		if (currentTime < openTime) {
			// 答题未开始
			return;
		}
		int fTopicDownTime = LongZhongDuiConst.FirstTOPIC_DOWNTIME;
		int topicNum = LongZhongDuiConst.TOPIC_NUM;
		int eTopicTime = LongZhongDuiConst.EVERYTOPIC_TIME;
		int eTopicDis = LongZhongDuiConst.EVERYTOPIC_DISTANCE;
		if (currentTime < openTime + fTopicDownTime) {// 开始答题
			return;
		}
		int had = hero.getLongZhongDui().getAnsweredMap().size();
		int now = had + 1;
		if (had >= topicNum) {
			// 答题已结束
			return;
		}
		if (!LongZhongDuiSysCache.getLongZhongDuiCache().getJoinMap().containsKey(hero.getId())) {
			LongZhongDuiFunction.getIns().addJoinMap(hero); // 增加参与
			// 每日任务
			DayTaskFunction.getIns().successDayTaskType(hero, DayTaskConst.DATTASK_TYPE28);
			// 限定武将
			WuJiangGoalFunction.getIns().updateTaskNum(hero, WuJiangGoalEnum.TASK_12, 1);
			// 犒赏三军(活动)
			WarOrderFunction.getIns().updateTaskNum(hero, WarOrderEnum.GOAL_15, 1);
			// 犒赏三军(开服)
			WarOrderNewFunction.getIns().updateTaskNum(hero, WarOrderNewEnum.GOAL_15, 1);
		}

		if (answerId == 0) {
			// 答题超时
			hero.getLongZhongDui().getAnsweredMap().put(now,currentTime);
			LongZhongDuiSender.sendCmd_1984(hero.getId(), 0, 0);
			return;
		}

		int wTime = eTopicDis;
		Integer nowTime = hero.getLongZhongDui().getAnsweredMap().get(now-1);
		if (now == 1) {
			wTime = fTopicDownTime;
			nowTime = hero.getLongZhongDui().getHeroOpenTime();
		}
		
		int time = nowTime + wTime + eTopicTime;
		if (currentTime < time) {
			// 答题中
			hero.getLongZhongDui().getAnsweredMap().put(now,currentTime);
			int time1 = time - currentTime;
			List<Integer> topicAndAnswer = (List<Integer>) LongZhongDuiSysCache.getLongZhongDuiCache()
					.getTopicAndAnswerList().get(now - 1);
			int userAnswer = topicAndAnswer.get(answerId);
			if (userAnswer == 1) {
				// 答对
				int myScore = hero.getLongZhongDui().getMyScore();
				int addScore = time1 * LongZhongDuiConst.SCORE_BASE + 1;
				hero.getLongZhongDui().setMyScore(myScore + addScore);
				LongZhongDuiFunction.getIns().refreshlongZhongDuiRank(hero, 1); // 刷新积分排行
				Struct_xtcs_004 struct_xtcs_004 = Config_xtcs_004.getIns().get(LongZhongDuiConst.LONGZHONGDUI_AWARD);
				int[][] award = struct_xtcs_004.getOther();
				UseAddUtil.add(hero, award, SourceGoodConst.LONGZHONGDUI_AWARD, null, true); // 答对发放奖励
				LongZhongDuiSender.sendCmd_1984(hero.getId(), 1, addScore);
				String usesys = hero.getTempData().getAccount().getUsesys();
				FlowHeroEvent.addJoinSystemFlow(hero.getId(), hero.getLevel(), hero.getVipLv(), hero.getCreateJob(),
						hero.getTotalStrength(), LongZhongDuiConst.LONGZHONGDUI, hero.getZoneid(), hero.getPf(),
						usesys, hero.getReincarnationLevel());
				// 进入下一题
				LongZhongDuiSender.sendCmd_1982(hero.getId(), LongZhongDuiConst.ANSWER_TIMEOUT, eTopicDis, now,
						topicAndAnswer.get(0), topicAndAnswer.get(1), topicAndAnswer.get(2), topicAndAnswer.get(3),
						topicAndAnswer.get(4), hero.getLongZhongDui().getMyScore(), getMyRank(hero));
				return;
			}
			// 答错
			LongZhongDuiSender.sendCmd_1984(hero.getId(), 0, 0);
			String usesys = hero.getTempData().getAccount().getUsesys();
			FlowHeroEvent.addJoinSystemFlow(hero.getId(), hero.getLevel(), hero.getVipLv(), hero.getCreateJob(),
					hero.getTotalStrength(), LongZhongDuiConst.LONGZHONGDUI, hero.getZoneid(), hero.getPf(), usesys,
					hero.getReincarnationLevel());
			// 进入下一题
			LongZhongDuiSender.sendCmd_1982(hero.getId(), LongZhongDuiConst.ANSWER_TIMEOUT, eTopicDis, now,
					topicAndAnswer.get(0), topicAndAnswer.get(1), topicAndAnswer.get(2), topicAndAnswer.get(3),
					topicAndAnswer.get(4), hero.getLongZhongDui().getMyScore(), getMyRank(hero));
			return;
		}
	}

	/**
	 * 答题排行
	 * 
	 * @param hero
	 */
	public void answerRank(Hero hero) {
		if (hero == null) {
			return;
		}
		if (!HeroFunction.getIns().checkSystemOpen(hero, LongZhongDuiConst.LONGZHONGDUI)) {
			return;
		}
		List<LongZhongDuiRankModel> longZhongDuiRankList = LongZhongDuiSysCache.getLongZhongDuiCache()
				.getLongZhongDuiRankList();
		ArrayList<Object> arrayList = new ArrayList<Object>();
		for (int i = 0; i < longZhongDuiRankList.size(); i++) {
			Object[] objectList = new Object[2];
			LongZhongDuiRankModel longZhongDuiRankModel = longZhongDuiRankList.get(i);
			objectList[0] = longZhongDuiRankModel.getName();
			objectList[1] = longZhongDuiRankModel.getScore();
			arrayList.add(objectList);
		}
		LongZhongDuiSender.sendCmd_1986(hero.getId(), arrayList.toArray());
	}

	/**
	 * 开始答题
	 * 
	 * @param hero
	 */
	public void startAnswer(Hero hero) {
		if (hero == null) {
			return;
		}
		if (!HeroFunction.getIns().checkSystemOpen(hero, LongZhongDuiConst.LONGZHONGDUI)) {
			return;
		}
		if (!LongZhongDuiFunction.getIns().isOpen() || !LongZhongDuiFunction.getIns().isHeroOpen(hero)) {
			int myScore = hero.getLongZhongDui().getMyScore();
			LongZhongDuiSender.sendCmd_1982(hero.getId(), LongZhongDuiConst.NOT_START, 0, 0, 0, 0, 0, 0, 0, myScore,
					getMyRank(hero));
			return;
		}
		int currentTime = TimeDateUtil.getCurrentTime();
		hero.getLongZhongDui().setHeroOpenTime(currentTime);
		LongZhongDuiSender.sendCmd_1982(hero.getId(), LongZhongDuiConst.START_ANSWER,
				LongZhongDuiConst.FirstTOPIC_DOWNTIME, 0, 0, 0, 0, 0, 0, 0, 0);

	}

}
