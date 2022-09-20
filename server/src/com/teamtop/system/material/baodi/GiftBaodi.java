package com.teamtop.system.material.baodi;

import java.util.Set;

import com.teamtop.util.db.trans.FieldOrder;

public class GiftBaodi {

	@FieldOrder(order = 1)
	private int sysId;

	@FieldOrder(order = 2)
	private int num;

	@FieldOrder(order = 3)
	private int first;

	@FieldOrder(order = 4)
	private Set<Integer> getGoal;

	public int getSysId() {
		return sysId;
	}

	public void setSysId(int sysId) {
		this.sysId = sysId;
	}

	public int getNum() {
		return num;
	}

	public void setNum(int num) {
		this.num = num;
	}

	public int getFirst() {
		return first;
	}

	public void setFirst(int first) {
		this.first = first;
	}

	public Set<Integer> getGetGoal() {
		return getGoal;
	}

	public void setGetGoal(Set<Integer> getGoal) {
		this.getGoal = getGoal;
	}

}
