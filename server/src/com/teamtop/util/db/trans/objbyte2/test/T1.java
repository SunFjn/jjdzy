package com.teamtop.util.db.trans.objbyte2.test;

import java.util.List;
import java.util.Map;

import com.teamtop.util.db.trans.FieldOrder;

public class T1 {
	@FieldOrder(order = 1)
	private Map<Integer,Integer> map1;
	@FieldOrder(order = 2)
	private Map<Integer,Map<Integer,String>> map2;
	@FieldOrder(order = 3)
	private List<T2> list;
	@FieldOrder(order = 4)
	private int field1;
	public Map<Integer, Integer> getMap1() {
		return map1;
	}
	public void setMap1(Map<Integer, Integer> map1) {
		this.map1 = map1;
	}
	public Map<Integer, Map<Integer, String>> getMap2() {
		return map2;
	}
	public void setMap2(Map<Integer, Map<Integer, String>> map2) {
		this.map2 = map2;
	}
	public List<T2> getList() {
		return list;
	}
	public void setList(List<T2> list) {
		this.list = list;
	}
	public int getField1() {
		return field1;
	}
	public void setField1(int field1) {
		this.field1 = field1;
	}
	
}
