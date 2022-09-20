package com.teamtop.system.linglongge.model;

import java.util.List;
import java.util.Map;

import com.teamtop.util.db.trans.FieldOrder;

public class LingLongCrossCache {

	/** 获奖公告列表 **/
	@FieldOrder(order = 1)
	private Map<Integer, List<LingLongGeNoticeModel>> pAwardNoticeList;

	/** 每日本服玩家积分排名 每日零点清空 **/
	@FieldOrder(order = 2)
	private Map<Integer, List<LingLongGeRankModel>> pLingLongGeRankList;

	/** 区积分排名 每日零点清空 **/
	@FieldOrder(order = 3)
	private Map<Integer, List<LingLongGeRankZoneid>> pZoneidRankList;

	public Map<Integer, List<LingLongGeNoticeModel>> getPAwardNoticeList() {
		return pAwardNoticeList;
	}

	public void setPAwardNoticeList(Map<Integer, List<LingLongGeNoticeModel>> pAwardNoticeList) {
		this.pAwardNoticeList = pAwardNoticeList;
	}

	public Map<Integer, List<LingLongGeRankModel>> getPLingLongGeRankList() {
		return pLingLongGeRankList;
	}

	public void setPLingLongGeRankList(Map<Integer, List<LingLongGeRankModel>> pLingLongGeRankList) {
		this.pLingLongGeRankList = pLingLongGeRankList;
	}

	public Map<Integer, List<LingLongGeRankZoneid>> getPZoneidRankList() {
		return pZoneidRankList;
	}

	public void setPZoneidRankList(Map<Integer, List<LingLongGeRankZoneid>> pZoneidRankList) {
		this.pZoneidRankList = pZoneidRankList;
	}

}
