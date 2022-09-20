package com.teamtop.houtaiHttp.events.adMonitor;

import com.teamtop.util.cache.CacheModel;

/**
 * 中央服的广告号账号数据
 * @author hepl
 *
 */
public class M_AdAccount extends CacheModel{
	private long id; //唯一id
	private String openid; //角色账号
	private int time; //添加时间
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getOpenid() {
		return openid;
	}
	public void setOpenid(String openid) {
		this.openid = openid;
	}
	public int getTime() {
		return time;
	}
	public void setTime(int time) {
		this.time = time;
	}
}
