package com.teamtop.system.linglongge.model;

import java.util.List;

import com.teamtop.util.db.trans.FieldOrder;

public class LingLongGeCache {
	/** 获奖公告列表 **/
	@FieldOrder(order = 1)
	private List<LingLongGeNoticeModel> awardNoticeList;
	/** 每日本服玩家积分排名 每日零点清空 **/
	@FieldOrder(order = 2)
	private List<LingLongGeRankModel> lingLongGeRankList;
	/**区服积分排名 每日零点清空 **/
	@FieldOrder(order = 3)
	private List<LingLongGeRankZoneid> zoneidRankList;
	

	public List<LingLongGeNoticeModel> getAwardNoticeList() {
		return awardNoticeList;
	}

	public void setAwardNoticeList(List<LingLongGeNoticeModel> awardNoticeList) {
		this.awardNoticeList = awardNoticeList;
	}

	public List<LingLongGeRankModel> getLingLongGeRankList() {
		return lingLongGeRankList;
	}

	public void setLingLongGeRankList(List<LingLongGeRankModel> lingLongGeRankList) {
		this.lingLongGeRankList = lingLongGeRankList;
	}

	public List<LingLongGeRankZoneid> getZoneidRankList() {
		return zoneidRankList;
	}

	public void setZoneidRankList(List<LingLongGeRankZoneid> zoneidRankList) {
		this.zoneidRankList = zoneidRankList;
	}
	
	

}
