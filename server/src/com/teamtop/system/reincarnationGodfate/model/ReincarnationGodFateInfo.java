package com.teamtop.system.reincarnationGodfate.model;

import com.teamtop.util.db.trans.FieldOrder;

public class ReincarnationGodFateInfo {
	/** 天命升级表id */
	@FieldOrder(order = 1)
	private int upLvId;
	/** 天命升品表id */
	@FieldOrder(order = 2)
	private int upQualityId;

	public int getUpLvId() {
		return upLvId;
	}

	public int getUpQualityId() {
		return upQualityId;
	}

	public void setUpLvId(int upLvId) {
		this.upLvId = upLvId;
	}

	public void setUpQualityId(int upQualityId) {
		this.upQualityId = upQualityId;
	}

}
