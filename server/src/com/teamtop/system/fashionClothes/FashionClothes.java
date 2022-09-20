package com.teamtop.system.fashionClothes;

import java.util.HashMap;

public class FashionClothes {
	private long hid;
	/**
	 * 时装星级 激活才有
	 */
	private HashMap<Integer, Integer> clothesStar;
	/**
	 * 武将穿戴时装
	 */
	private HashMap<Integer, Integer> wujiangClothesId;
	/**
	 * 激活时装数
	 */
	private int fashNum;
	
	public long getHid() {
		return hid;
	}
	public void setHid(long hid) {
		this.hid = hid;
	}
	public HashMap<Integer, Integer> getClothesStar() {
		return clothesStar;
	}
	public void setClothesStar(HashMap<Integer, Integer> clothesStar) {
		this.clothesStar = clothesStar;
	}
	public HashMap<Integer, Integer> getWujiangClothesId() {
		return wujiangClothesId;
	}
	public void setWujiangClothesId(HashMap<Integer, Integer> wujiangClothesId) {
		this.wujiangClothesId = wujiangClothesId;
	}
	public int getFashNum() {
		return fashNum;
	}
	public void setFashNum(int fashNum) {
		this.fashNum = fashNum;
	}

}
