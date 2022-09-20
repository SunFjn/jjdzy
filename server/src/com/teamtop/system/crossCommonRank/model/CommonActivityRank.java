package com.teamtop.system.crossCommonRank.model;

import com.teamtop.system.activity.model.ActivityData;
import com.teamtop.system.crossCommonRank.CommonRankFunction;

public class CommonActivityRank extends ActivityData {
	/**
	 * 次数,充值金额，消费金额
	 */
	private int parameter;

	public CommonActivityRank() {
		// TODO Auto-generated constructor stub
	}

	public CommonActivityRank(long hid, int indexId, int actId, int periods) {
		super(hid, indexId, actId, periods);
		// TODO Auto-generated constructor stub
	}

	public int getParameter() {
		CommonRankFunction.getIns().heroDataHandle(getActId(), this);
		return parameter;
	}

	public int getParameterToHandle() {
		return parameter;
	}

	public void setParameter(int parameter) {
		this.parameter = parameter;
	}

}
