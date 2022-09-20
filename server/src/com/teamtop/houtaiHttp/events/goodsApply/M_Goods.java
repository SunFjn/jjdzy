package com.teamtop.houtaiHttp.events.goodsApply;

/**
 * 物品申请对象实体类
 * @author hepl
 *
 */
public class M_Goods {
	private long id;
	private long hid;//角色id
	private String name;//角色名
	private String openid;//角色账号
	private String account;//申请账号
	private String mail;//邮件内容
	private String reason;//原因
	private String goods;//申请的物品集合：[物品id_物品数量][物品id_数量]
	private int checkflag;//0-申请状态，1-审核通过，2-审核不通过  3 已发送
	private int time;//申请时间
	private int passtime;//批准/或拒绝时间
	private String batchgoods;//批量标识
	private String checkuser;//审核人账号
	private long yuanbao;//元宝
	private long coin;//铜币
	private int zoneid;//区号
	
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
	public String getAccount() {
		return account;
	}
	public void setAccount(String account) {
		this.account = account;
	}
	public String getMail() {
		return mail;
	}
	public void setMail(String mail) {
		this.mail = mail;
	}
	public String getReason() {
		return reason;
	}
	public void setReason(String reason) {
		this.reason = reason;
	}
	public String getGoods() {
		return goods;
	}
	public void setGoods(String goods) {
		this.goods = goods;
	}
	public int getTime() {
		return time;
	}
	public void setTime(int time) {
		this.time = time;
	}
	public int getPasstime() {
		return passtime;
	}
	public void setPasstime(int passtime) {
		this.passtime = passtime;
	}
	public String getBatchgoods() {
		return batchgoods;
	}
	public void setBatchgoods(String batchgoods) {
		this.batchgoods = batchgoods;
	}
	public String getCheckuser() {
		return checkuser;
	}
	public void setCheckuser(String checkuser) {
		this.checkuser = checkuser;
	}
	public long getHid() {
		return hid;
	}
	public void setHid(long hid) {
		this.hid = hid;
	}
	public long getYuanbao() {
		return yuanbao;
	}
	public void setYuanbao(long yuanbao) {
		this.yuanbao = yuanbao;
	}
	public long getCoin() {
		return coin;
	}
	public void setCoin(long coin) {
		this.coin = coin;
	}
	public int getZoneid() {
		return zoneid;
	}
	public void setZoneid(int zoneid) {
		this.zoneid = zoneid;
	}
	public int getCheckflag() {
		return checkflag;
	}
	public void setCheckflag(int checkflag) {
		this.checkflag = checkflag;
	}
	public String getOpenid() {
		return openid;
	}
	public void setOpenid(String openid) {
		this.openid = openid;
	}
}
