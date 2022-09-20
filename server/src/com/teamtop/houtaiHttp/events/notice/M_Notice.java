package com.teamtop.houtaiHttp.events.notice;

/**
 * 公告实体对象类
 * @author hepl
 *
 */
public class M_Notice { 
	private long id; //唯一id
	private int spacetime;//公告间隔时间
	private int begintime;//公告开始时间
	private int endtime;//公告结束时间
	private String content;//公告内容
	private String account;//布发人账号
	private int time;//公告提交时间
	private int state;//公告状态，0刚提交待审，1已审核，2已过期或取消
	private int canceltime;//取消时间
	private String link;//链接
	private String pf;//渠道，全渠道为all
	private int zoneid;//区号
	private int type;//公告类型，0普通公告，1系统公告
	private String zsrange;//转生等级范围
	private String levelrange;//等级范围
	private String moneyrange;//充值范围
	
	public String getZsrange() {
		return zsrange;
	}
	public void setZsrange(String zsrange) {
		this.zsrange = zsrange;
	}
	public String getLink() {
		return link;
	}
	public void setLink(String link) {
		this.link = link;
	}
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public int getSpacetime() {
		return spacetime;
	}
	public void setSpacetime(int spacetime) {
		this.spacetime = spacetime;
	}
	public int getBegintime() {
		return begintime;
	}
	public void setBegintime(int begintime) {
		this.begintime = begintime;
	}
	public int getEndtime() {
		return endtime;
	}
	public void setEndtime(int endtime) {
		this.endtime = endtime;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getAccount() {
		return account;
	}
	public void setAccount(String account) {
		this.account = account;
	}
	public int getTime() {
		return time;
	}
	public void setTime(int time) {
		this.time = time;
	}
	public int getZoneid() {
		return zoneid;
	}
	public void setZoneid(int zoneid) {
		this.zoneid = zoneid;
	}
	public int getCanceltime() {
		return canceltime;
	}
	public void setCanceltime(int canceltime) {
		this.canceltime = canceltime;
	}
	public String getPf() {
		return pf;
	}
	public void setPf(String pf) {
		this.pf = pf;
	}
	public int getType() {
		return type;
	}
	public void setType(int type) {
		this.type = type;
	}
	public int getState() {
		return state;
	}
	public void setState(int state) {
		this.state = state;
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
}
