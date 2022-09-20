package com.teamtop.houtaiHttp.events.mail;

public class M_MailGoods {
	private long id;//主键
	private String content;//邮件内容
	private String goods;//物品集合[物品id,物品数量],[物品id,物品数量]
	private String account;//申请人账号
	private int time;//申请时间
	private int flag;//批准标志：0申请  1批准 2拒绝 3已发送
	private int zoneid;//区号
	private String zsrange;//转生等级范围
	private String levelrange;//等级范围
	private String moneyrange;//充值范围
	private int passtime;//批准/或拒绝时间
	private String checkuser;//审核人账号
	private int type;//0普通，1特殊
	private String link;//超链接，需URLEncoder.encode(link)处理
	
	public String getZsrange() {
		return zsrange;
	}
	public void setZsrange(String zsrange) {
		this.zsrange = zsrange;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public void setTime(int time) {
		this.time = time;
	}
	public int getTime() {
		return time;
	}
	public void setAccount(String account) {
		this.account = account;
	}
	public String getAccount() {
		return account;
	}
	public String getGoods() {
		return goods;
	}
	public void setGoods(String goods) {
		this.goods = goods;
	}
	public int getZoneid() {
		return zoneid;
	}
	public void setZoneid(int zoneid) {
		this.zoneid = zoneid;
	}
	public int getFlag() {
		return flag;
	}
	public void setFlag(int flag) {
		this.flag = flag;
	}
	public String getLevelrange() {
		return levelrange;
	}
	public void setLevelrange(String levelrange) {
		this.levelrange = levelrange;
	}
	public String getMoneyrange() {
		return moneyrange;
	}
	public void setMoneyrange(String moneyrange) {
		this.moneyrange = moneyrange;
	}
	public int getPasstime() {
		return passtime;
	}
	public void setPasstime(int passtime) {
		this.passtime = passtime;
	}
	public String getCheckuser() {
		return checkuser;
	}
	public void setCheckuser(String checkuser) {
		this.checkuser = checkuser;
	}
	public int getType() {
		return type;
	}
	public void setType(int type) {
		this.type = type;
	}
	public String getLink() {
		return link;
	}
	public void setLink(String link) {
		this.link = link;
	}
	
}
