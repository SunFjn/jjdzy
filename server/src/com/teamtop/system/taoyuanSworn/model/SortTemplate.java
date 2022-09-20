package com.teamtop.system.taoyuanSworn.model;

import java.util.HashMap;

import com.teamtop.system.taoyuanSworn.TaoyuanSwornConst;

public class SortTemplate {
	/**桃园结义id*/
	private long id;
	/**玩家id*/
	private long hid;
	/**结义名字*/
	private String name;
	/**大哥名称*/
	private String hName;
	/**成员人数*/
	private int num;
	/**总战力*/
	private long strength;
	/**申请时间,升序*/
	private int time;
	/**VIP等级*/
	private int vipLv;
	/** 头像 */
	private int icon;
	/** 头像框 */
	private int frame;
	/**状态：4.取消申请 3.申请加入 2申请已满 1已满员*/
	private int state;
	
	public static SortTemplate valueOf(long hid,TaoyuanSworn ts) {
		SortTemplate sortTemp = new SortTemplate();
		sortTemp.id = ts.getId();
		sortTemp.name = ts.getName();
		HashMap<Long, Member> applyMember = ts.getApplyMember();
		HashMap<Long, Member> member = ts.getMember();
		long totalStrength = 0;
		for(Member m : member.values()) {
			if(TaoyuanSwornConst.BROTHER == m.getFlag()) {
				sortTemp.hName = m.getName();
			}
			totalStrength += m.getStrength();
		}
		sortTemp.num = member.size();
		sortTemp.strength = totalStrength;
		if(TaoyuanSwornConst.MEMBER_NUM == member.size()) {
			sortTemp.state = 1;
		}else if(TaoyuanSwornConst.TS_APPLY_NUM == applyMember.size()) {
			sortTemp.state = 2;
		}else if(applyMember.get(hid) != null) {
			sortTemp.state = 4;
		}else {
			sortTemp.state = 3;
		}
		return sortTemp;
	}
	
	public static SortTemplate valueOf(Member member) {
		SortTemplate sortTemp = new SortTemplate();
		sortTemp.hid = member.getHid();
		sortTemp.hName = member.getName();
		sortTemp.frame = member.getFrame();
		sortTemp.icon = member.getIcon();
		sortTemp.vipLv = member.getVipLv();
		sortTemp.strength = member.getStrength();
		sortTemp.time = member.getApplyTime();
		return sortTemp;
	}
	
	public int getState() {
		return state;
	}

	public void setState(int state) {
		this.state = state;
	}

	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

	public int getIcon() {
		return icon;
	}

	public void setIcon(int icon) {
		this.icon = icon;
	}

	public int getFrame() {
		return frame;
	}

	public void setFrame(int frame) {
		this.frame = frame;
	}

	public int getVipLv() {
		return vipLv;
	}

	public void setVipLv(int vipLv) {
		this.vipLv = vipLv;
	}

	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String gethName() {
		return hName;
	}
	public void sethName(String hName) {
		this.hName = hName;
	}
	public int getNum() {
		return num;
	}
	public void setNum(int num) {
		this.num = num;
	}
	public long getStrength() {
		return strength;
	}
	public void setStrength(long strength) {
		this.strength = strength;
	}
	public int getTime() {
		return time;
	}
	public void setTime(int time) {
		this.time = time;
	}
}
