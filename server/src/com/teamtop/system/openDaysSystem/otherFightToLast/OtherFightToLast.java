package com.teamtop.system.openDaysSystem.otherFightToLast;

import com.teamtop.system.openDaysSystem.model.AbsOpenDaysSystemModel;

/**
 * 开服7日血战到底
 * @author jjjjyyy
 *
 */
public class OtherFightToLast extends AbsOpenDaysSystemModel {
	
	/**
	 * 当前过关层数
	 */
	private int floorNum;

	/**
	 * 挑战id
	 */
	private int chaId;
	
	
	public OtherFightToLast() {
		super();
	}
	
	public int getChaId() {
		return chaId;
	}

	public void setChaId(int chaId) {
		this.chaId = chaId;
	}

	public int getFloorNum() {
		return floorNum;
	}
	public void setFloorNum(int floorNum) {
		this.floorNum = floorNum;
	}

	
	

}
