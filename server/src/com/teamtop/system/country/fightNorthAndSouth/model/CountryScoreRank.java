package com.teamtop.system.country.fightNorthAndSouth.model;

import java.util.concurrent.atomic.AtomicInteger;

import com.teamtop.util.db.trans.FieldOrder;
import com.teamtop.util.time.TimeDateUtil;

public class CountryScoreRank {

	/** 国家 */
	@FieldOrder(order = 1)
	private int countryType;

	/** 总积分 */
	@FieldOrder(order = 2)
	private int totalScoreInt;

	private AtomicInteger totalScore = new AtomicInteger(0);

	/** 更新时间 */
	@FieldOrder(order = 3)
	private int updateTime;

	public int getCountryType() {
		return countryType;
	}

	public void setCountryType(int countryType) {
		this.countryType = countryType;
	}

	public int getTotalScoreInt() {
		return totalScore.get();
	}

	public void setTotalScoreInt(int totalScoreInt) {
		this.totalScoreInt = totalScoreInt;
		this.totalScore.set(totalScoreInt);
	}

	public int getTotalScore() {
		return totalScore.get();
	}

	public int addScore(int score) {
		if (score > 0) {
			setUpdateTime(TimeDateUtil.getCurrentTime());
		}
		return this.totalScore.addAndGet(score);
	}

	public int getUpdateTime() {
		return updateTime;
	}

	public void setUpdateTime(int updateTime) {
		this.updateTime = updateTime;
	}

}
