package com.teamtop.system.hero;

/**
 * 角色登陆的其他参数
 * @author hepl
 *
 */
public class LoginOtherData {
	/**
	 * 腾讯广告位数据
	 */
	private String via;
	/**
	 * 腾讯广告位数据
	 */
	private String app_custom;
	/**
	 * 集市任务id值，可能为空
	 */
	private String contract_id;
	/**
	 * 账户ID
	 */
	private String accid;
	/**
	 * 账户名称
	 */
	private String accname;
	/**
	 * 服务器id
	 */
	private String serverid;
	/**
	 * 时间戳
	 */
	private int tstamp;
	/**
	 * 防沉迷标识，1为没有防沉迷，0为有防沉迷
	 */
	private String fcm;
	/**
	 * 加密后的串
	 */
	private String key;
	/**
	 * 越南平台vip等级
	 */
	private int custom;
	
	
	public int getCustom() {
		return custom;
	}
	public void setCustom(int custom) {
		this.custom = custom;
	}
	public String getAccid() {
		return accid;
	}
	public void setAccid(String accid) {
		this.accid = accid;
	}
	public String getAccname() {
		return accname;
	}
	public void setAccname(String accname) {
		this.accname = accname;
	}
	public String getServerid() {
		return serverid;
	}
	public void setServerid(String serverid) {
		this.serverid = serverid;
	}
	public int getTstamp() {
		return tstamp;
	}
	public void setTstamp(int tstamp) {
		this.tstamp = tstamp;
	}
	public String getFcm() {
		return fcm;
	}
	public void setFcm(String fcm) {
		this.fcm = fcm;
	}
	public String getKey() {
		return key;
	}
	public void setKey(String key) {
		this.key = key;
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
