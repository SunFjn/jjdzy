package com.teamtop.system.dengFengZaoJi.model;

import com.teamtop.cross.upload.CrossHeroBaseModel;
import com.teamtop.util.db.trans.FieldOrder;

public class DengFengZaoJiBattleInfo {
	/**
	 * 排名
	 */
	@FieldOrder(order = 1)
	private int rank;

	/**
	 * 是否已挑战(0.未挑战  1.已挑战)
	 */
	@FieldOrder(order = 2)
	private int battleState;

	/**
	 * 挑战数据
	 */
	@FieldOrder(order = 3)
	private CrossHeroBaseModel model;
	
	public static DengFengZaoJiBattleInfo valueOf(int rank,int battleState,CrossHeroBaseModel model) {
		DengFengZaoJiBattleInfo result = new DengFengZaoJiBattleInfo();
		result.rank = rank;
		result.battleState = battleState;
		result.model = model;
		return result;
	}

	public int getRank() {
		return rank;
	}

	public void setRank(int rank) {
		this.rank = rank;
	}

	public int getBattleState() {
		return battleState;
	}

	public void setBattleState(int battleState) {
		this.battleState = battleState;
	}

	public CrossHeroBaseModel getModel() {
		return model;
	}

	public void setModel(CrossHeroBaseModel model) {
		this.model = model;
	}

}
