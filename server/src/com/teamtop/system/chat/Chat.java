package com.teamtop.system.chat;

import java.util.HashMap;
import java.util.List;

import com.teamtop.util.cache.CacheModel;
import com.teamtop.util.db.trans.FieldOrder;


public class Chat extends CacheModel {
	@FieldOrder(order = 1)
	private long hid;
	/**
	 * 跨服聊天次数
	 */
	@FieldOrder(order = 2)
	private int crossCiShu;
	/**本服聊天次数**/
	@FieldOrder(order = 3)
	private int localCiShu;
	/**
	 * 国家聊天次数
	 */
	@FieldOrder(order = 4)
	private int countryCiShu;
	/**
	 * 黑名单人数
	 */
	@FieldOrder(order = 5)
	private HashMap<Long,String> blackMap;
	/**
	 * 私聊人数
	 */
	@FieldOrder(order = 6)
	private List<Long> siLiaoRenShu;
	/**
	 * 在别人的黑名单，别人的Hid，合服用
	 */
	@FieldOrder(order = 7)
	private HashMap<Long,String> inOthBlackMap;

	public List<Long> getSiLiaoRenShu() {
		return siLiaoRenShu;
	}
	public HashMap<Long, String> getInOthBlackMap() {
		return inOthBlackMap;
	}
	public void setInOthBlackMap(HashMap<Long, String> inOthBlackMap) {
		this.inOthBlackMap = inOthBlackMap;
	}
	public void setSiLiaoRenShu(List<Long> siLiaoRenShu) {
		this.siLiaoRenShu = siLiaoRenShu;
	}
	public long getHid() {
		return hid;
	}
	public void setHid(long hid) {
		this.hid = hid;
	}
	public int getCrossCiShu() {
		return crossCiShu;
	}
	public void setCrossCiShu(int crossCiShu) {
		this.crossCiShu = crossCiShu;
	}
	public int getLocalCiShu() {
		return localCiShu;
	}
	public void setLocalCiShu(int localCiShu) {
		this.localCiShu = localCiShu;
	}
	public int getCountryCiShu() {
		return countryCiShu;
	}
	public void setCountryCiShu(int countryCiShu) {
		this.countryCiShu = countryCiShu;
	}
	public HashMap<Long, String> getBlackMap() {
		return blackMap;
	}
	public void setBlackMap(HashMap<Long, String> blackMap) {
		this.blackMap = blackMap;
	}
	
}
