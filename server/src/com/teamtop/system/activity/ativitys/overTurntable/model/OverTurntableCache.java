package com.teamtop.system.activity.ativitys.overTurntable.model;

import java.util.List;

import com.teamtop.util.db.trans.FieldOrder;

public class OverTurntableCache {
	/** 获奖公告列表 **/
	@FieldOrder(order = 1)
	private List<OverTurntableNoticeModel> awardNoticeList;

	public List<OverTurntableNoticeModel> getAwardNoticeList() {
		return awardNoticeList;
	}

	public void setAwardNoticeList(List<OverTurntableNoticeModel> awardNoticeList) {
		this.awardNoticeList = awardNoticeList;
	}

}
