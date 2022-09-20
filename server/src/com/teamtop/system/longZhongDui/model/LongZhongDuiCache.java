package com.teamtop.system.longZhongDui.model;

import java.util.List;
import java.util.Map;

import com.teamtop.util.db.trans.FieldOrder;

public class LongZhongDuiCache {

	/**
	 * 题目和答案 Objcet是个包含5个整数的List数组
	 */
	@FieldOrder(order = 1)
	private List<List<Integer>> topicAndAnswerList;

	/**
	 * 排行
	 */
	@FieldOrder(order = 2)
	private List<LongZhongDuiRankModel> longZhongDuiRankList;

	/**
	 * 参与答题的玩家id
	 */
	@FieldOrder(order = 3)
	private Map<Long, Long> joinMap;

	public List<List<Integer>> getTopicAndAnswerList() {
		return topicAndAnswerList;
	}

	public void setTopicAndAnswerList(List<List<Integer>> topicAndAnswerList) {
		this.topicAndAnswerList = topicAndAnswerList;
	}

	public List<LongZhongDuiRankModel> getLongZhongDuiRankList() {
		return longZhongDuiRankList;
	}

	public void setLongZhongDuiRankList(List<LongZhongDuiRankModel> longZhongDuiRankList) {
		this.longZhongDuiRankList = longZhongDuiRankList;
	}

	public Map<Long, Long> getJoinMap() {
		return joinMap;
	}

	public void setJoinMap(Map<Long, Long> joinMap) {
		this.joinMap = joinMap;
	}

}
