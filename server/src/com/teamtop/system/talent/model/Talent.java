package com.teamtop.system.talent.model;

import java.util.List;
import java.util.Map;

public class Talent {
	/**
	 * 玩家id
	 */
	private long hid;
	/**
	 * 展示道具信息：<展示道具实体>
	 */
	private List<ShowItem> showItemList;
	/**
	 * 修炼奖励：<修炼ID,状态：-1.已领取 0.积分未达成 >0.数量红点>
	 */
	private Map<Integer,Integer> awards;
	/**
	 * 修炼次数
	 */
	private int num;

	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

	public List<ShowItem> getShowItemList() {
		return showItemList;
	}

	public void setShowItemList(List<ShowItem> showItemList) {
		this.showItemList = showItemList;
	}

	public Map<Integer, Integer> getAwards() {
		return awards;
	}

	public void setAwards(Map<Integer, Integer> awards) {
		this.awards = awards;
	}

	public int getNum() {
		return num;
	}

	public void setNum(int num) {
		this.num = num;
	}

}
