package com.teamtop.houtaiHttp.events.mail;
/**
 * 后台邮件临时对象
 * @author kyle
 *
 */
public class MailTempHero {
	
	private long hid;//角色id
	private String name;//名字
	private int zoneid;//区号
	private String pf;//渠道

	public MailTempHero() {
		super();
	}
	public MailTempHero(long hid, String name, int zoneid, String pf) {
		super();
		this.hid = hid;
		this.name = name;
		this.zoneid = zoneid;
		this.pf = pf;
	}
	public long getHid() {
		return hid;
	}


	public void setHid(long hid) {
		this.hid = hid;
	}


	public int getZoneid() {
		return zoneid;
	}

	public void setZoneid(int zoneid) {
		this.zoneid = zoneid;
	}

	public String getPf() {
		return pf;
	}

	public void setPf(String pf) {
		this.pf = pf;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
}
