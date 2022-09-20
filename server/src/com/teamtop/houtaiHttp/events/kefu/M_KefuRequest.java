package com.teamtop.houtaiHttp.events.kefu;

/**
 * 客服系统反馈问题实体类
 * @author hepl
 *
 */
public class M_KefuRequest {
	/**唯一id*/
	private long id;
	/**提交时间*/
	private int reqTime;
	/**玩家id*/
	private long hid;
	/**玩家名称*/
	private String name;
	/**区号*/
	private int zoneid;
	/**vip等级*/
	private int vipLv;
	/**平台*/
	private String pf;
	/**反馈内容*/
	private String content;
	/**回复客服*/
	private String kefuName;
	/**回复时间*/
	private int dealTime;
	/**状态，0未处理，1已回复 */
	private int state;
	/**邮件内容*/
	private String mailContent;
	/**物品集合[物品id,物品数量],[物品id,物品数量]*/
	private String goods;
	/**申请人账号*/
	private String account;
	/**申请时间*/
	private int mailTime;
	/**批准标志：0申请  1批准 2拒绝 3已发送*/
	private int flag;
	/**批准/或拒绝时间*/
	private int passtime;
	/**审核人账号*/
	private String checkuser;
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public int getReqTime() {
		return reqTime;
	}
	public void setReqTime(int reqTime) {
		this.reqTime = reqTime;
	}
	public long getHid() {
		return hid;
	}
	public void setHid(long hid) {
		this.hid = hid;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getZoneid() {
		return zoneid;
	}
	public void setZoneid(int zoneid) {
		this.zoneid = zoneid;
	}
	public int getVipLv() {
		return vipLv;
	}
	public void setVipLv(int vipLv) {
		this.vipLv = vipLv;
	}
	public String getPf() {
		return pf;
	}
	public void setPf(String pf) {
		this.pf = pf;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getKefuName() {
		return kefuName;
	}
	public void setKefuName(String kefuName) {
		this.kefuName = kefuName;
	}
	public int getDealTime() {
		return dealTime;
	}
	public void setDealTime(int dealTime) {
		this.dealTime = dealTime;
	}
	public int getState() {
		return state;
	}
	public void setState(int state) {
		this.state = state;
	}
	public String getMailContent() {
		return mailContent;
	}
	public void setMailContent(String mailContent) {
		this.mailContent = mailContent;
	}
	public String getGoods() {
		return goods;
	}
	public void setGoods(String goods) {
		this.goods = goods;
	}
	public String getAccount() {
		return account;
	}
	public void setAccount(String account) {
		this.account = account;
	}
	public int getMailTime() {
		return mailTime;
	}
	public void setMailTime(int mailTime) {
		this.mailTime = mailTime;
	}
	public int getFlag() {
		return flag;
	}
	public void setFlag(int flag) {
		this.flag = flag;
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
}
