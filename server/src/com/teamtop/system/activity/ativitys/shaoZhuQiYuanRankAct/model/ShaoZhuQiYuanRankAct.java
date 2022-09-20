package com.teamtop.system.activity.ativitys.shaoZhuQiYuanRankAct.model;

import com.teamtop.system.activity.model.ActivityData;

public class ShaoZhuQiYuanRankAct extends ActivityData {
	/**
	 * 祈愿次数
	 */
	private int qiyuanTimes;

	public ShaoZhuQiYuanRankAct() {
		// TODO Auto-generated constructor stub
	}

	public ShaoZhuQiYuanRankAct(long hid, int indexId, int actId, int periods) {
		super(hid, indexId, actId, periods);
		// TODO Auto-generated constructor stub
	}

	public int getQiyuanTimes() {
		return qiyuanTimes;
	}

	public void setQiyuanTimes(int qiyuanTimes) {
		this.qiyuanTimes = qiyuanTimes;
	}


}
