package com.teamtop.system.littleLeader;

import com.teamtop.util.db.trans.FieldOrder;

/**
 * 六艺信息
 */
public class SixArtsModel {
	/**
	 * 六艺等级
	 */
	@FieldOrder(order=1)
	private int level;
	/**
	 * 已成功进修的学堂Id
	 */
	@FieldOrder(order=2)
	private int schoolId;
	
	public int getLevel() {
		return level;
	}
	public void setLevel(int level) {
		this.level = level;
	}
	public int getSchoolId() {
		return schoolId;
	}
	public void setSchoolId(int schoolId) {
		this.schoolId = schoolId;
	}
	
}
