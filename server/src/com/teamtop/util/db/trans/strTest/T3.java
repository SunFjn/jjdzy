package com.teamtop.util.db.trans.strTest;

import java.util.List;

import com.teamtop.util.db.trans.FieldOrder;

public class T3 {
	@FieldOrder(order = 1)
	private List<int[]> list;

	public List<int[]> getList() {
		return list;
	}

	public void setList(List<int[]> list) {
		this.list = list;
	}
	
}
