package com.teamtop.system.linglongge.model;

import java.util.List;

import com.teamtop.util.db.trans.FieldOrder;

public class LiLoZoneidRewardHis {
	/**达标玩家集合 **/
	@FieldOrder(order = 1)
	private List<Long> zoneidRewardHis;
	/**本服总积分**/
	@FieldOrder(order = 2)
	private int score;
	
	public LiLoZoneidRewardHis() {
		super();
	}

	public List<Long> getZoneidRewardHis() {
		return zoneidRewardHis;
	}

	public void setZoneidRewardHis(List<Long> zoneidRewardHis) {
		this.zoneidRewardHis = zoneidRewardHis;
	}

	public int getScore() {
		return score;
	}

	public void setScore(int score) {
		this.score = score;
	}
	
	

}
