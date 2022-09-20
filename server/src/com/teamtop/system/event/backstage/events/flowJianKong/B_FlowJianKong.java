package com.teamtop.system.event.backstage.events.flowJianKong;
/**
 * 玩家物品、货币监控
 * @author Administrator
 *
 */
public class B_FlowJianKong {
	private long id;//id唯一id
	private long hid;//hid
	private int zoneid;//区号
	private String name;//名字
	private String openid;//账号
	private int type;//类型，物品类型（1道具、2装备）或货币类型（角色属性表）
	private int goodid;//物品id，货币时为0
	private long num;//数量
	private long chongzhi;//充值
	private int lv;//等级
	private int reason;//原因 参考SourceGoodConst
	private int time;//记录时间
	
	public int getReason() {
		return reason;
	}
	public void setReason(int reason) {
		this.reason = reason;
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
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getType() {
		return type;
	}
	public void setType(int type) {
		this.type = type;
	}
	public int getGoodid() {
		return goodid;
	}
	public void setGoodid(int goodid) {
		this.goodid = goodid;
	}
	
	public long getNum() {
		return num;
	}
	public void setNum(long num) {
		this.num = num;
	}
	public long getChongzhi() {
		return chongzhi;
	}
	public void setChongzhi(long chongzhi) {
		this.chongzhi = chongzhi;
	}
	public int getLv() {
		return lv;
	}
	public void setLv(int lv) {
		this.lv = lv;
	}
	public B_FlowJianKong(long hid, int zoneid, String name, String openid, int type, int goodid, long num, long chongzhi, int lv,int reason,int time) {
		super();
		this.hid = hid;
		this.zoneid = zoneid;
		this.name = name;
		this.openid = openid;
		this.type = type;
		this.goodid = goodid;
		this.num = num;
		this.chongzhi = chongzhi;
		this.lv = lv;
		this.reason = reason;
		this.time = time;
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
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	
}
