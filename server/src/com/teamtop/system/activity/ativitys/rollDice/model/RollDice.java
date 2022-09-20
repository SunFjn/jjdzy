package com.teamtop.system.activity.ativitys.rollDice.model;

import com.teamtop.system.activity.model.ActivityData;

public class RollDice extends ActivityData {
	/**摇骰子次数*/
	private int num;
	/**消费元宝*/
	private int consume;
	/**摇骰子索引*/
	private int rdIndex;
	/**骰子点数*/
	private int diceNum;
	/**总步数*/
	private int totalNum;
	
	public RollDice() {
		
	}
	public RollDice(long hid, int indexId, int actId, int periods) {
		super(hid, indexId, actId, periods);
	}
	public int getNum() {
		return num;
	}
	public void setNum(int num) {
		this.num = num;
	}
	public int getConsume() {
		return consume;
	}
	public void setConsume(int consume) {
		this.consume = consume;
	}
	public int getRdIndex() {
		return rdIndex;
	}
	public void setRdIndex(int rdIndex) {
		this.rdIndex = rdIndex;
	}
	public int getDiceNum() {
		return diceNum;
	}
	public void setDiceNum(int diceNum) {
		this.diceNum = diceNum;
	}
	public int getTotalNum() {
		return totalNum;
	}
	public void setTotalNum(int totalNum) {
		this.totalNum = totalNum;
	}
}
