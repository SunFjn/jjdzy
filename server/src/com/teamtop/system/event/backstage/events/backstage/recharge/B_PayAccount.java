package com.teamtop.system.event.backstage.events.backstage.recharge;

/**
 * 订单表数据
 * @author hepl
 *
 */
public class B_PayAccount {

	private long product_id;//游戏订单号,
	/**
	 * SDK订单号
	 */
	private String product_sdkid;
	/**
	 * 区号
	 */
	private int zoneid;
	/**
	 * 平台账户 接入的渠道账户名 由SDk提供给游戏前端，前端上报后端记录，用于定位玩家信息 
	 */
	private String pfopenid;
	/**
	 * 登陆平台代码
	 */
	private String loginpfcode; 
	/**
	 * 注册平台代码
	 */
	private String pfcode;
	/**
	 * 用户ID
	 */
	private String openid;
	/**
	 * 角色id
	 */
	private long hid;
	/**
	 * 角色名称
	 */
	private String  name;
	/**
	 * 角色等级
	 */
	private int lv;
	/**
	 * 支付时角色vip等级
	 */
	private int vipLv;
	/**
	 * 广告标识	
	 */
	private String app_custom;	
	/**
	 * 订单金额（以元为单位）
	 */
	private int payNum;
	/**
	 * 商品id
	 */
	private int itemId;
	/**
	 * 商品数量
	 */
	private int itemNum;
	/**
	 * 道具名称
	 */
	private String itemName;
	/**
	 * 道具描述
	 */
	private String itemInfo;
	/**
	 * 创建订单时间
	 */
	private int creatTime;
	/**
	 * 支付时间
	 */
	private int payTime;
	/**
	 * 支付状态 支付状态 0 未处理，1 成功，2 失败
	 */
	private int payState;		
	/**
	 * 成功支付次数
	 */
	private int successPayNum;
	/**
	 * 支付方式，如微信支付，米大师支付等
	 */
	private String payType;
	/**
	 * 订单类型（0：普通订单，1：切支付订单）
	 */
	private int order_formType; 
	/**
	 * 注册系统
	 */
	private String usesys;
	/**
	 * 下单系统（登陆系统）
	 */
	private String loginsys;
	/**
	 * 注册时间
	 */
	private int createtime;
	/**
	 * 最后更新时间
	 */
	private int updateTime;
	/**
	 * 是否是充值白名单 0不是 1是
	 */
	private int isBlackList;
	
	/**
	 * 特殊参数(供前后端数据定制使用)
	 */
	private String parameters;
	/**
	 * 注册职业
	 */
	private int job;
	/**
	 * 用户国家
	 */
	private String country;
	/**
	 * 用户地区
	 */
	private String region;
	
	
	
	public B_PayAccount() {
		super();
	}
	public long getProduct_id() {
		return product_id;
	}
	public void setProduct_id(long product_id) {
		this.product_id = product_id;
	}
	public String getProduct_sdkid() {
		return product_sdkid;
	}
	public void setProduct_sdkid(String product_sdkid) {
		this.product_sdkid = product_sdkid;
	}
	
	public int getZoneid() {
		return zoneid;
	}
	public void setZoneid(int zoneid) {
		this.zoneid = zoneid;
	}
	public String getPfopenid() {
		return pfopenid;
	}
	public void setPfopenid(String pfopenid) {
		this.pfopenid = pfopenid;
	}

	public String getLoginpfcode() {
		return loginpfcode;
	}
	public void setLoginpfcode(String loginpfcode) {
		this.loginpfcode = loginpfcode;
	}
	public String getPfcode() {
		return pfcode;
	}
	public void setPfcode(String pfcode) {
		this.pfcode = pfcode;
	}
	public String getOpenid() {
		return openid;
	}
	public void setOpenid(String openid) {
		this.openid = openid;
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
	public int getLv() {
		return lv;
	}
	public void setLv(int lv) {
		this.lv = lv;
	}
	public int getVipLv() {
		return vipLv;
	}
	public void setVipLv(int vipLv) {
		this.vipLv = vipLv;
	}
	public String getApp_custom() {
		return app_custom;
	}
	public void setApp_custom(String app_custom) {
		this.app_custom = app_custom;
	}
	public int getPayNum() {
		return payNum;
	}
	public void setPayNum(int payNum) {
		this.payNum = payNum;
	}

	public int getItemId() {
		return itemId;
	}
	public void setItemId(int itemId) {
		this.itemId = itemId;
	}
	public int getItemNum() {
		return itemNum;
	}
	public void setItemNum(int itemNum) {
		this.itemNum = itemNum;
	}
	public String getItemName() {
		return itemName;
	}
	public void setItemName(String itemName) {
		this.itemName = itemName;
	}
	public String getItemInfo() {
		return itemInfo;
	}
	public void setItemInfo(String itemInfo) {
		this.itemInfo = itemInfo;
	}
	public int getCreatTime() {
		return creatTime;
	}
	public void setCreatTime(int creatTime) {
		this.creatTime = creatTime;
	}
	public int getPayTime() {
		return payTime;
	}
	public void setPayTime(int payTime) {
		this.payTime = payTime;
	}
	public int getPayState() {
		return payState;
	}
	public void setPayState(int payState) {
		this.payState = payState;
	}
	public int getSuccessPayNum() {
		return successPayNum;
	}
	public void setSuccessPayNum(int successPayNum) {
		this.successPayNum = successPayNum;
	}
	public String getUsesys() {
		return usesys;
	}
	public void setUsesys(String usesys) {
		this.usesys = usesys;
	}
	public int getCreatetime() {
		return createtime;
	}
	public void setCreatetime(int createtime) {
		this.createtime = createtime;
	}
	public int getUpdateTime() {
		return updateTime;
	}
	public void setUpdateTime(int updateTime) {
		this.updateTime = updateTime;
	}
	public String getPayType() {
		return payType;
	}
	public void setPayType(String payType) {
		this.payType = payType;
	}
	public String getLoginsys() {
		return loginsys;
	}
	public void setLoginsys(String loginsys) {
		this.loginsys = loginsys;
	}
	public int getOrder_formType() {
		return order_formType;
	}
	public void setOrder_formType(int order_formType) {
		this.order_formType = order_formType;
	}
	public int getIsBlackList() {
		return isBlackList;
	}
	public void setIsBlackList(int isBlackList) {
		this.isBlackList = isBlackList;
	}
	public String getParameters() {
		return parameters;
	}
	public void setParameters(String parameters) {
		this.parameters = parameters;
	}
	public int getJob() {
		return job;
	}
	public void setJob(int job) {
		this.job = job;
	}
	
	public String getCountry() {
		return country;
	}
	public void setCountry(String country) {
		this.country = country;
	}
	public String getRegion() {
		return region;
	}
	public void setRegion(String region) {
		this.region = region;
	}
	
}
