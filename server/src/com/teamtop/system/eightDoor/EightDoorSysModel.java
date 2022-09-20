package com.teamtop.system.eightDoor;

import java.util.ArrayList;

import com.teamtop.util.db.trans.FieldOrder;


public class EightDoorSysModel {
	/**
	 * 已经开启过得期数id
	 */
	@FieldOrder(order = 1)
	private ArrayList<Integer> hasOpen=new ArrayList<>();
	@FieldOrder(order = 2)
	private int qs;
	@FieldOrder(order = 3)
	private int beginTime;
	@FieldOrder(order = 4)
	private int overTime;
	
	public EightDoorSysModel() {
		super();
	}
	
	
	public ArrayList<Integer> getHasOpen() {
		return hasOpen;
	}
	public void setHasOpen(ArrayList<Integer> hasOpen) {
		this.hasOpen = hasOpen;
	}
	public int getQs() {
		return qs;
	}
	public void setQs(int qs) {
		this.qs = qs;
	}
	public int getBeginTime() {
		return beginTime;
	}
	public void setBeginTime(int beginTime) {
		this.beginTime = beginTime;
	}
	public int getOverTime() {
		return overTime;
	}
	public void setOverTime(int overTime) {
		this.overTime = overTime;
	}
	
	

}
