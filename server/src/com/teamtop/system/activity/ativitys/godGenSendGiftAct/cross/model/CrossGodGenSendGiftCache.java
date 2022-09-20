package com.teamtop.system.activity.ativitys.godGenSendGiftAct.cross.model;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.system.activity.ativitys.godGenSendGiftAct.model.GodGenSendGiftActRankModel;
import com.teamtop.util.db.trans.FieldOrder;

public class CrossGodGenSendGiftCache {
	/** 排行列表 */
	@FieldOrder(order = 1)
	private Map<Integer, List<GodGenSendGiftActRankModel>> rankListMap = new HashMap<>();
	/** 期数 */
	@FieldOrder(order = 2)
	private Map<Integer, Integer> qsMap = new HashMap<>();

	public CrossGodGenSendGiftCache() {
		// TODO Auto-generated constructor stub
	}

	public List<GodGenSendGiftActRankModel> getRankList(int partId) {
		List<GodGenSendGiftActRankModel> list = rankListMap.get(partId);
		if (list == null) {
			list = new ArrayList<>();
			rankListMap.put(partId, list);
		}
		return list;
	}

	public void setRankList(List<GodGenSendGiftActRankModel> rankList, int partId) {
		this.rankListMap.put(partId, rankList);
	}

	public int getQs(int partId) {
		Integer qsValue = qsMap.get(partId);
		if (qsValue == null) {
			qsValue = 0;
		}
		return qsValue;
	}

	public void setQs(int qs, int partId) {
		this.qsMap.put(partId, qs);
	}

	public Map<Integer, List<GodGenSendGiftActRankModel>> getRankListMap() {
		return rankListMap;
	}

	public void setRankListMap(Map<Integer, List<GodGenSendGiftActRankModel>> rankListMap) {
		this.rankListMap = rankListMap;
	}

	public Map<Integer, Integer> getQsMap() {
		return qsMap;
	}

	public void setQsMap(Map<Integer, Integer> qsMap) {
		this.qsMap = qsMap;
	}
}
