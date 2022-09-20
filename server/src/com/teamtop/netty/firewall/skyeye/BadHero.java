package com.teamtop.netty.firewall.skyeye;

import java.util.ArrayList;
import java.util.List;

import com.teamtop.util.time.TimeDateUtil;

public class BadHero{
	private long rid;
	private String name;
	private String openid;
	private int time;
	private List<String> numList = new ArrayList<String>();
//	private int num;
	public int getTime() {
		return time;
	}
	public void setNowTime() {
		this.time = TimeDateUtil.getCurrentTime();
	}
	public int getNum() {
		return numList.size();
	}
	public void addNum(String reason) {
		numList.add(reason);
	}
	public long getRid() {
		return rid;
	}
	public void setRid(long rid) {
		this.rid = rid;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public List<String> getNumList() {
		return numList;
	}
	public void setNumList(List<String> numList) {
		this.numList = numList;
	}
	public void setTime(int time) {
		this.time = time;
	}
	public String getOpenid() {
		return openid;
	}
	public void setOpenid(String openid) {
		this.openid = openid;
	}
	
}
