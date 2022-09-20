package com.teamtop.system.country.newkingship;

import com.teamtop.util.db.trans.FieldOrder;
/**
 * 新王位之争
 * @author jjjjyyy
 *
 */
public class NewKingShip {
	/** 玩家id/npcid */
	@FieldOrder(order = 1)
	private long id;
	/** 分类：0机器人 1人**/
	@FieldOrder(order = 2)
	private int type;
	/** 当前站位**/
	@FieldOrder(order = 3)
	private int Sit;
	/** npcID**/
	@FieldOrder(order = 4)
	private int npcid;
	
	
	public NewKingShip() {
		super();
	}
	
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}

	public int getNpcid() {
		return npcid;
	}
	public void setNpcid(int npcid) {
		this.npcid = npcid;
	}
	public int getType() {
		return type;
	}
	public void setType(int type) {
		this.type = type;
	}
	public int getSit() {
		return Sit;
	}
	public void setSit(int sit) {
		Sit = sit;
	}
	
	
	

}
