package com.teamtop.system.longZhongDui;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.OpTaskConst;
import com.teamtop.synHandleCore.orderedRunnable.RankingOpTaskRunnable;
import com.teamtop.system.actHall.ActHallInterface;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.longZhongDui.model.LongZhongDui;
import com.teamtop.system.longZhongDui.model.LongZhongDuiCache;
import com.teamtop.system.longZhongDui.model.LongZhongDuiRankComparator;
import com.teamtop.system.longZhongDui.model.LongZhongDuiRankModel;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.ProbabilityEvent.RandomUtil;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_lzd_234;
import excel.struct.Struct_lzd_234;

public class LongZhongDuiFunction implements ActHallInterface {
	private static LongZhongDuiFunction ins;

	public static LongZhongDuiFunction getIns() {
		if (ins == null) {
			ins = new LongZhongDuiFunction();
		}
		return ins;
	}

	/**
	 * 增加隆中对参与的玩家
	 * 
	 * @param hero
	 */
	public void addJoinMap(Hero hero) {
		LongZhongDuiSysCache.getLongZhongDuiCache().getJoinMap().put(hero.getId(), hero.getId());
	}

	/**
	 * 刷新隆中对积分排行
	 * 
	 * @param hero
	 * @param type 1:刷新积分排行，0：修改名字
	 */
	public void refreshlongZhongDuiRank(final Hero hero, final int type) {
		OpTaskExecutorService.PublicOrderService.execute(new RankingOpTaskRunnable() {
			@Override
			public void run() {
				// TODO Auto-generated method stub
				longZhongDuiRank(hero, type);
			}

			@Override
			public Object getSession() {
				// TODO Auto-generated method stub
				return OpTaskConst.LONGZHONGDUI_KEY;
			}
		});
	}

	public void longZhongDuiRank(Hero hero, int type) {
		LongZhongDuiRankModel longZhongDuiRank = new LongZhongDuiRankModel();
		longZhongDuiRank.setHid(hero.getId());
		longZhongDuiRank.setName(hero.getNameZoneid());
		longZhongDuiRank.setScore(hero.getLongZhongDui().getMyScore());
		longZhongDuiRank.setReachTime(TimeDateUtil.getCurrentTime());
		List<LongZhongDuiRankModel> longZhongDuiRankList = LongZhongDuiSysCache.getLongZhongDuiCache()
				.getLongZhongDuiRankList();
//		if(longZhongDuiRankList.size() < LongZhongDuiConst.RANK_NUM) {
//			LongZhongDuiSysCache.getLongZhongDuiCache().getJoinMap().remove(hero.getId());
//		}

		int indexOf = longZhongDuiRankList.indexOf(longZhongDuiRank);
		if (type == 1) {
			if (indexOf >= 0) {
				LongZhongDuiRankModel longZhongDuiRank2 = longZhongDuiRankList.get(indexOf);
				longZhongDuiRank2.setScore(hero.getLongZhongDui().getMyScore());
				longZhongDuiRank2.setReachTime(TimeDateUtil.getCurrentTime());
			} else {
				longZhongDuiRankList.add(longZhongDuiRank);
			}
			sortLongZhongDuiRank(longZhongDuiRankList, hero);
		} else {
			if (indexOf >= 0) {
				LongZhongDuiRankModel longZhongDuiRank2 = longZhongDuiRankList.get(indexOf);
				longZhongDuiRank2.setName(hero.getNameZoneid());
			}
		}
	}

	public void sortLongZhongDuiRank(List<LongZhongDuiRankModel> longZhongDuiRankList, Hero hero) {
		int i = 1;
		int max = LongZhongDuiConst.RANK_NUM;
		Collections.sort(longZhongDuiRankList, new LongZhongDuiRankComparator());
		Iterator<LongZhongDuiRankModel> iterator = longZhongDuiRankList.iterator();
		while (iterator.hasNext()) {
			iterator.next();
			if (i > max) {
//				if(next.getHid() != hero.getId()) {
//					LongZhongDuiSysCache.getLongZhongDuiCache().getJoinMap().remove(hero.getId());
//				}
				iterator.remove();
			}
			i++;
		}
	}

	public int getOpenTime() {
		String[] split = LongZhongDuiConst.OPEN_TIME.split(":");
		int openMin = Integer.parseInt(split[0]);
		int openSec = Integer.parseInt(split[1]);
		int openTime = TimeDateUtil.getOneTime(0, openMin, openSec, 0);
		return openTime;
	}

	public int getEndTime() {
		String[] split = LongZhongDuiConst.END_TIME.split(":");
		int openMin = Integer.parseInt(split[0]);
		int openSec = Integer.parseInt(split[1]);
		int openTime = TimeDateUtil.getOneTime(0, openMin, openSec, 0);
		return openTime;
	}

	/**
	 * 隆中对是否开启，这是针对个人的，每个人在活动时间内只能一天只能玩一次
	 * 
	 * @param hero
	 * @return
	 */
	public boolean isHeroOpen(Hero hero) {
		LongZhongDui longZhongDui = hero.getLongZhongDui();
		int heroOpenTime = longZhongDui.getHeroOpenTime();
		int currentTime = TimeDateUtil.getCurrentTime();
		if (heroOpenTime != 0 && TimeDateUtil.compareTimeForSameDay(heroOpenTime, currentTime)) {
			return false;
		}
		return true;
	}

	/**
	 * 是否在开启时间段内
	 * 
	 * @return
	 */
	public boolean isOpen() {
		int currentTime = TimeDateUtil.getCurrentTime();
		int openTime = getOpenTime();
		int endTime = getEndTime();
		if (currentTime < openTime || currentTime >= endTime) {
			return false;
		}
		return true;
	}

	/**
	 * 随机题目和答案
	 */
	public void initRandomTopicAndAnswer() {
		LongZhongDuiCache longZhongDuiCache = LongZhongDuiSysCache.getLongZhongDuiCache();
		longZhongDuiCache.getLongZhongDuiRankList().clear();
		longZhongDuiCache.getTopicAndAnswerList().clear();
		longZhongDuiCache.getJoinMap().clear();
		List<List<Integer>> topicAndAnswerList = longZhongDuiCache.getTopicAndAnswerList();
		int topicNum = LongZhongDuiConst.TOPIC_NUM;
		Map<Integer, Struct_lzd_234> map = Config_lzd_234.getIns().getMap();
		int size = map.size();
		List<Integer> multiRandomNumTopic = RandomUtil.getMultiRandomNumInArea(1, size, topicNum);
		for (int topicId : multiRandomNumTopic) {
			ArrayList<Integer> topicAndAnswer = new ArrayList<Integer>();
			topicAndAnswer.add(topicId);
			List<Integer> multiRandomNumAnswer = RandomUtil.getMultiRandomNumInArea(1, 4, 4);
			for (int answerId : multiRandomNumAnswer) {
				topicAndAnswer.add(answerId);
			}
			topicAndAnswerList.add(topicAndAnswer);
		}
	}

	/**
	 * 登录发送红点
	 * 
	 * @param hero
	 */
	public void loginSendRedPoint(Hero hero) {
		if(checkRedPoint(hero)) {
			RedPointFunction.getIns().addLoginRedPoint(hero, LongZhongDuiConst.ZHUCHENG, LongZhongDuiConst.REDPOINT,
					RedPointConst.HAS_RED);
			RedPointFunction.getIns().addLoginRedPoint(hero, LongZhongDuiConst.HUODONG, LongZhongDuiConst.REDPOINT,
					RedPointConst.HAS_RED);
			RedPointFunction.getIns().addLoginRedPoint(hero, LongZhongDuiConst.LONGZHONGDUI, LongZhongDuiConst.REDPOINT,
					RedPointConst.HAS_RED);
		}
	}

	/**
	 * 快速发送红点
	 * 
	 * @param hero
	 * @param state 红点状态
	 */
	public void fastSendRedPoint(Hero hero, int state) {
		RedPointFunction.getIns().fastUpdateRedPoint(hero, LongZhongDuiConst.ZHUCHENG, LongZhongDuiConst.REDPOINT,
				state);
		RedPointFunction.getIns().fastUpdateRedPoint(hero, LongZhongDuiConst.HUODONG, LongZhongDuiConst.REDPOINT,
				state);
		RedPointFunction.getIns().fastUpdateRedPoint(hero, LongZhongDuiConst.LONGZHONGDUI, LongZhongDuiConst.REDPOINT,
				state);
	}

	@Override
	public void getActHallData(List<Object[]> list) {
		if (LongZhongDuiSysCache.isStart == true) {
			return;
		}
		List<LongZhongDuiRankModel> longZhongDuiRankList = LongZhongDuiSysCache.getLongZhongDuiCache()
				.getLongZhongDuiRankList();
		String mvp = "";
		int size = longZhongDuiRankList.size();
		if (size > 0) {
			mvp = longZhongDuiRankList.get(0).getName();
		}
		list.add(new Object[] { LongZhongDuiConst.LONGZHONGDUI, mvp });
	}

	/**
	 * 检测红点
	 * 
	 * @param hero
	 * @return true 有
	 */
	public boolean checkRedPoint(Hero hero) {
		if (!LongZhongDuiFunction.getIns().isOpen()) {
			// 答题未开始或已结束
			return false;
		}
		if (hero == null) {
			return false;
		}
		LongZhongDui longZhongDui = hero.getLongZhongDui();
		if (longZhongDui == null) {
			return false;
		}
		int heroOpenTime = longZhongDui.getHeroOpenTime();
		int currentTime = TimeDateUtil.getCurrentTime();
		if (heroOpenTime != 0 && TimeDateUtil.compareTimeForSameDay(heroOpenTime, currentTime)) {
			// 今天已答题
			int fTopicDownTime = LongZhongDuiConst.FirstTOPIC_DOWNTIME;
			int topicNum = LongZhongDuiConst.TOPIC_NUM;
			int eTopicTime = LongZhongDuiConst.EVERYTOPIC_TIME;
			int eTopicDis = LongZhongDuiConst.EVERYTOPIC_DISTANCE;
			int openTime = hero.getLongZhongDui().getHeroOpenTime();
			int endTime = openTime + fTopicDownTime + topicNum * (eTopicTime + eTopicDis) - eTopicDis;
			if (currentTime >= endTime) {
				// 答题已结束
				return false;
			}
			if(hero.getLongZhongDui().getAnsweredMap().size() == topicNum) {
				// 答题已结束
				return false;
			}
			// 答题中
			return true;
		}
		return true;
	}

}
