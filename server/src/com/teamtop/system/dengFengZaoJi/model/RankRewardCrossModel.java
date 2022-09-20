package com.teamtop.system.dengFengZaoJi.model;

import com.teamtop.cross.upload.CrossHeroBaseModel;

public class RankRewardCrossModel {
	/**积分*/
	private int score;
	/**战力*/
	private long strength;
	
	private CrossHeroBaseModel model;
	
	
	public static RankRewardCrossModel valueOf(int score, long strength, CrossHeroBaseModel model) {
		RankRewardCrossModel result = new RankRewardCrossModel();
		result.score = score;
		result.strength = strength;
		result.model = model;
		return result;
	}
	public int getScore() {
		return score;
	}

	public void setScore(int score) {
		this.score = score;
	}

	public long getStrength() {
		return strength;
	}

	public void setStrength(long strength) {
		this.strength = strength;
	}

	public CrossHeroBaseModel getModel() {
		return model;
	}

	public void setModel(CrossHeroBaseModel model) {
		this.model = model;
	}
	
}
