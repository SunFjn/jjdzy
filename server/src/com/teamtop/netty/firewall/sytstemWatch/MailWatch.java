package com.teamtop.netty.firewall.sytstemWatch;

import java.util.List;

/**
 * 邮件监控
 * @author Administrator
 *
 */
public class MailWatch {
	/**
	 * 唯一id
	 */
	private long id;
	/**
	 * 玩家id
	 */
	private long hid;
	private String name;
	/**
	 * 邮件系统id
	 */
	private int sysid;
	/**
	 * 标题
	 */
	private String title;
	/**
	 * 记录时间（对比用）
	 */
	private List<Integer> times;
	/**
	 * 数据库记录时间
	 */
	private int time;
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getTime() {
		return time;
	}
	public void setTime(int time) {
		this.time = time;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public long getHid() {
		return hid;
	}
	public void setHid(long hid) {
		this.hid = hid;
	}
	public int getSysid() {
		return sysid;
	}
	public void setSysid(int sysid) {
		this.sysid = sysid;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	
	public List<Integer> getTimes() {
		return times;
	}
	public void setTimes(List<Integer> times) {
		this.times = times;
	}
	public MailWatch(long hid, int sysid, String title, int time) {
		super();
		this.hid = hid;
		this.sysid = sysid;
		this.title = title;
	}
	@Override
	public String toString() {
		return "MailWatch [hid=" + hid + ", name=" + name + ", sysid=" + sysid + ", title=" + title + "]";
	}
	
	
}
