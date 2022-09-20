package com.teamtop.netty.firewall.skyeye;

import java.util.HashSet;
import java.util.Set;

import com.teamtop.util.time.TimeDateUtil;

public class BadIp{
	private String ip;
	private int time;
	private int num;
//	private Map<Long,BadRole> badRoleMap;
	private Set<BadHero> badOpendIdSet = new HashSet<BadHero>();
	public Integer getTime() {
		return time;
	}
	public void setNowTime() {
		this.time = TimeDateUtil.getCurrentTime();
	}
	public Integer getNum() {
		return num;
	}
	public void addNum(){
		this.num +=1;
//		System.err.println("now num:"+this.num);
	}
//	public Map<Long, BadRole> getBadRoleMap() {
//		if(badRoleMap==null){
//			badRoleMap = new HashMap<Long,BadRole>();
//		}
//		return badRoleMap;
//	}
	
	public void addBadOpenId(BadHero badRole){
		if(badRole==null) return;
		badOpendIdSet.add(badRole);
	}
	
	public void removeBadOpenId(String openid){
		if(openid==null) return;
		badOpendIdSet.remove(openid);
	}
	public Set<BadHero> getBadOpendIdSet() {
		return badOpendIdSet;
	}
	public String getIp() {
		return ip;
	}
	public void setIp(String ip) {
		this.ip = ip;
	}
	public void setTime(int time) {
		this.time = time;
	}
	public void setNum(int num) {
		this.num = num;
	}
	public void setBadOpendIdSet(Set<BadHero> badOpendIdSet) {
		this.badOpendIdSet = badOpendIdSet;
	}
	
	
	
}
