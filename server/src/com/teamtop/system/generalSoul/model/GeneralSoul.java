package com.teamtop.system.generalSoul.model;

import java.util.Map;
import java.util.Set;

/**
 * 将魂数据
 * 
 * @author hzp
 *
 */
public class GeneralSoul {

	public long hid;

	/**
	 * 拥有的将魂
	 */
	public Map<Integer, GeneralSoulModel> generalSoulMap;

	/**
	 * 套装信息
	 */
	public Set<Integer> setList;

	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

	public Map<Integer, GeneralSoulModel> getGeneralSoulMap() {
		return generalSoulMap;
	}

	public void setGeneralSoulMap(Map<Integer, GeneralSoulModel> generalSoulMap) {
		this.generalSoulMap = generalSoulMap;
	}

	public Set<Integer> getSetList() {
		return setList;
	}

	public void setSetList(Set<Integer> setList) {
		this.setList = setList;
	}

}
