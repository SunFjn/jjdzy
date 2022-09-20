package com.teamtop.system.activity.ativitys.eightDoorAppraiseRankAct.model;

import com.teamtop.system.activity.model.ActivityData;

public class EightDoorAppraiseRankAct extends ActivityData {
	/**
	 * 鉴定次数
	 */
	private int appraiseTimes;

	public EightDoorAppraiseRankAct() {
		// TODO Auto-generated constructor stub
	}

	public EightDoorAppraiseRankAct(long hid, int indexId, int actId, int periods) {
		super(hid, indexId, actId, periods);
		// TODO Auto-generated constructor stub
	}

	public int getAppraiseTimes() {
		return appraiseTimes;
	}

	public void setAppraiseTimes(int appraiseTimes) {
		this.appraiseTimes = appraiseTimes;
	}

}
