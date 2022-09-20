package com.teamtop.system.searchAnimals.model;

import com.teamtop.util.db.trans.FieldOrder;

public class Animals {
	/**
	 * 道具类型
	 */
	@FieldOrder(order = 1)
	private byte type;
	/**
	 * 道具id
	 */
	@FieldOrder(order = 2)
	private int id; 
	/**
	 * 数量
	 */
	@FieldOrder(order = 3)
	private int num;
	/**
	 * 状态：0.未开  1.已开启
	 */
	@FieldOrder(order = 4)
	private byte state;
	/**
	 * 是否广播：0.否 1.是
	 */
	@FieldOrder(order = 5)
	private byte radio;
	
	
	public byte getType() {
		return type;
	}


	public void setType(byte type) {
		this.type = type;
	}


	public int getId() {
		return id;
	}


	public void setId(int id) {
		this.id = id;
	}


	public int getNum() {
		return num;
	}


	public void setNum(int num) {
		this.num = num;
	}


	public byte getState() {
		return state;
	}


	public void setState(byte state) {
		this.state = state;
	}


	public byte getRadio() {
		return radio;
	}


	public void setRadio(byte radio) {
		this.radio = radio;
	}
	
}
