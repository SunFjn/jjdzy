package com.teamtop.system.crossZhuLu.model;

import com.teamtop.util.db.trans.FieldOrder;

public class CrossZhuLuCountryInfo implements Comparable<CrossZhuLuCountryInfo> {
	/** 国家id */
	@FieldOrder(order = 1)
	private int countryId;
	/** 总积分 */
	@FieldOrder(order = 2)
	private long totalScore;
	@FieldOrder(order = 3)
	private long updateTime;

	public int getCountryId() {
		return countryId;
	}

	public void setCountryId(int countryId) {
		this.countryId = countryId;
	}

	public long getUpdateTime() {
		return updateTime;
	}

	public void setUpdateTime(long updateTime) {
		this.updateTime = updateTime;
	}

	@Override
	public int compareTo(CrossZhuLuCountryInfo o) {
		if (o.getTotalScore() > getTotalScore()) {
			return 1;
		} else if (o.getTotalScore() == getTotalScore()) {
			if (o.getUpdateTime() < getUpdateTime()) {
				return 1;
			} else if (o.getUpdateTime() == getUpdateTime()) {
				return -1;
			}
		}
		return -1;
	}

	public long getTotalScore() {
		return totalScore;
	}

	public void setTotalScore(long totalScore) {
		this.totalScore = totalScore;
	}
}
