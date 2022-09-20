package com.teamtop.system.activity.ativitys.godGenSendGiftAct.cross.model;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.system.activity.ativitys.godGenSendGiftAct.model.GodGenSendGiftActRankModel;
import com.teamtop.util.db.trans.FieldOrder;

public class CrossLastGodGenSendGiftCache {
	/** 上期排行列表 */
	@FieldOrder(order = 1)
	private Map<Integer, List<GodGenSendGiftActRankModel>> lastRankListMap = new HashMap<>();
	/** 上期期数 */
	@FieldOrder(order = 2)
	private Map<Integer, Integer> lastQsMap = new HashMap<>();

	public CrossLastGodGenSendGiftCache() {
		// TODO Auto-generated constructor stub
	}

	public List<GodGenSendGiftActRankModel> getLastRankList(int partId) {
		return lastRankListMap.get(partId);
	}

	public void setLastRankList(List<GodGenSendGiftActRankModel> lastRankList, int partId) {
		this.lastRankListMap.put(partId, lastRankList);
	}

	public int getLastQs(int partId) {
		Integer qs = lastQsMap.get(partId);
		if (qs == null) {
			qs = 0;
		}
		return qs;
	}

	public void setLastQs(int lastQs, int partId) {
		this.lastQsMap.put(partId, lastQs);
	}

	public Map<Integer, List<GodGenSendGiftActRankModel>> getLastRankListMap() {
		return lastRankListMap;
	}

	public void setLastRankListMap(Map<Integer, List<GodGenSendGiftActRankModel>> lastRankListMap) {
		this.lastRankListMap = lastRankListMap;
	}

	public Map<Integer, Integer> getLastQsMap() {
		return lastQsMap;
	}

	public void setLastQsMap(Map<Integer, Integer> lastQsMap) {
		this.lastQsMap = lastQsMap;
	}

}
