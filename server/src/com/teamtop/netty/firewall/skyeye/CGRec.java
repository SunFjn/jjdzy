package com.teamtop.netty.firewall.skyeye;
/**
 * 
 * @author Administrator
 *
 */
public class CGRec {
	/**
	 * id
	 */
	private long id;
	/**
	 * hid
	 */
	private long hid;
	/**
	 * cmd
	 */
	private int cmd;
	/**
	 * 时间
	 */
	private int time;
	/**
	 * 数据
	 */
	private String data;
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
	public int getCmd() {
		return cmd;
	}
	public void setCmd(int cmd) {
		this.cmd = cmd;
	}
	public int getTime() {
		return time;
	}
	public void setTime(int time) {
		this.time = time;
	}
	public String getData() {
		return data;
	}
	public void setData(String data) {
		this.data = data;
	}
	public CGRec(long hid, int cmd, int time, String data) {
		super();
		this.hid = hid;
		this.cmd = cmd;
		this.time = time;
		this.data = data;
	}
}
