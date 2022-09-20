package com.teamtop.system.talent.model;

import com.teamtop.util.db.trans.FieldOrder;

/**
 * 修炼展示道具
 * @author jjjjyyyyouxi
 */
public class ShowItem {
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
	
	public static ShowItem valueOf(byte type, int id, int num) {
		ShowItem si = new ShowItem();
		si.type = type;
		si.id = id;
		si.num = num;
		return si;
	}
	
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
}
