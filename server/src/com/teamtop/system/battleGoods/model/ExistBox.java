package com.teamtop.system.battleGoods.model;
/**
 * 
 * @author jjjjyyy
 *
 */

import java.util.HashSet;
import java.util.Set;

public class ExistBox {
	/**
	 * 宝箱索引id
	 */
	private int boxid;
	/**
	 * 宝箱剩余数量
	 */
	private int leftNum;
	/**
	 * 存在地图上位置的下标
	 */
	private Set<Integer> existPoxyIndexs=new HashSet<Integer>();
	
	public ExistBox() {
		super();
	}
	
	
	
	public int getBoxid() {
		return boxid;
	}
	public void setBoxid(int boxid) {
		this.boxid = boxid;
	}
	public int getLeftNum() {
		return leftNum;
	}
	public void setLeftNum(int leftNum) {
		this.leftNum = leftNum;
	}

	public Set<Integer> getExistPoxyIndexs() {
		return existPoxyIndexs;
	}

	public void setExistPoxyIndexs(Set<Integer> existPoxyIndexs) {
		this.existPoxyIndexs = existPoxyIndexs;
	}
	
	
	
	
	

}
