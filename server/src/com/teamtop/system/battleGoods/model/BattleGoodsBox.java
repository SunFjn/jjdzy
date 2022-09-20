package com.teamtop.system.battleGoods.model;
/**
 * 粮草争夺-粮草宝箱 
 * @author jjjjyyy
 *
 */
public class BattleGoodsBox {
	
	private long unitid;
	/**
	 * 0正常状态  1正在被1人拾取中 2被两人抢夺中
	 */
	private int state;
	
	private int pox;
	
	private int poy;
	
	private long hidA;
	
	private long hidB;
	/**
	 * 表里系统id
	 */
	private int id;
	
	/**
	 * 所属阵营
	 */
	private int index;
	/**
	 * 随机坐标组下标
	 */
	private int poxyIndex;
	
	

	public BattleGoodsBox() {
		super();
	}

	public long getUnitid() {
		return unitid;
	}

	public void setUnitid(long unitid) {
		this.unitid = unitid;
	}

	public int getState() {
		return state;
	}

	public void setState(int state) {
		this.state = state;
	}

	public int getPox() {
		return pox;
	}

	public void setPox(int pox) {
		this.pox = pox;
	}

	public int getPoy() {
		return poy;
	}

	public void setPoy(int poy) {
		this.poy = poy;
	}

	public long getHidA() {
		return hidA;
	}

	public void setHidA(long hidA) {
		this.hidA = hidA;
	}


	public long getHidB() {
		return hidB;
	}

	public void setHidB(long hidB) {
		this.hidB = hidB;
	}

	public int getIndex() {
		return index;
	}

	public void setIndex(int index) {
		this.index = index;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getPoxyIndex() {
		return poxyIndex;
	}

	public void setPoxyIndex(int poxyIndex) {
		this.poxyIndex = poxyIndex;
	}
	
	
	

}
