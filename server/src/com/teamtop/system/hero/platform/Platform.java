package com.teamtop.system.hero.platform;
/**
 * 腾讯平台
 * @author kyle
 *
 */
public class Platform{
	//登陆模式
	private int loginMode;
	//openid
	private String openid;
	//平台账户
	private String seqid;
	//openkey
	private String openkey;
	//邀请者
	private String inviteOpenid;
	//pfKey
	private String pfkey;
	//repf
	private String repf;
	//pd
	private String pd;
	//广告位数据
	private String via;
	//广告位数据
	private String app_custom;
	//集市任务id值
	private String contract_id;
	//玩吧专用，1是安卓，2是苹果
	private String platform;
	
	public String getPlatform() {
		return platform;
	}
	public void setPlatform(String platform) {
		this.platform = platform;
	}
	/**
	 * 区号
	 */
	protected int zoneid;
	/**
	 * 平台
	 */
	protected String pf;
	/**
	 * 登陆ip
	 */
	protected String loginip;
	
	public int getZoneid() {
		return zoneid;
	}
	public void setZoneid(int zoneid) {
		this.zoneid = zoneid;
	}
	public String getLoginip() {
		return loginip;
	}
	public void setLoginip(String loginip) {
		this.loginip = loginip;
	}
	public String getPf() {
		return pf;
	}
	public void setPf(String pf) {
		this.pf = pf;
	}
	public int getLoginMode() {
		return loginMode;
	}
	public void setLoginMode(int loginMode) {
		this.loginMode = loginMode;
	}
	public String getOpenid() {
		return openid;
	}
	public void setOpenid(String openid) {
		this.openid = openid;
	}
	public String getSeqid() {
		return seqid;
	}
	public void setSeqid(String seqid) {
		this.seqid = seqid;
	}
	public String getOpenkey() {
		return openkey;
	}
	public void setOpenkey(String openkey) {
		this.openkey = openkey;
	}
	public Platform(int loginMode, String openid, String seqid, String openkey, String pf, int zoneid,String inviteOpenid,
			String loginip,String pfkey,String repf,String pd, String via, String app_custom, String contract_id) {
		super();
		this.loginMode = loginMode;
		this.openid = openid;
		this.seqid = seqid;
		this.openkey = openkey;
		this.pf = pf;
		this.inviteOpenid = inviteOpenid;
		this.zoneid = zoneid;
		this.loginip = loginip;
		this.pfkey = pfkey;
		this.repf = repf;
		this.pd = pd;
		this.via = via;
		this.app_custom = app_custom;
		this.setContract_id(contract_id);
	}
	public Platform(){
		
	}
	public String getInviteOpenid() {
		return inviteOpenid;
	}
	public String getPfkey() {
		return pfkey;
	}
	public void setPfkey(String pfkey) {
		this.pfkey = pfkey;
	}
	public String getRepf() {
		return repf;
	}
	public void setRepf(String repf) {
		this.repf = repf;
	}
	public String getPd() {
		return pd;
	}
	public void setPd(String pd) {
		this.pd = pd;
	}
	public String getVia() {
		return via;
	}
	public void setVia(String via) {
		this.via = via;
	}
	public String getApp_custom() {
		return app_custom;
	}
	public void setApp_custom(String app_custom) {
		this.app_custom = app_custom;
	}
	public String getContract_id() {
		return contract_id;
	}
	public void setContract_id(String contract_id) {
		this.contract_id = contract_id;
	}
	
}
