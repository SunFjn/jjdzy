package com.teamtop.system.event.backstage.events.flowHero;

/**
 * 商城购买表
 * @author hepl
 *
 */
public class B_FlowShop {
	/**
	 * 唯一id
	 */
	private long id;
	/**
	 * 角色id
	 */
	private long hid;
	/**
	 * 等级
	 */
	private int level;
	/**
	 * 商城类型（神秘 vip 声望）
	 */
	private int shoptype;
	/**
	 * 物品id
	 */
	private int itemid;
	/**
	 * 物品单价
	 */
	private int itemcost;
	/**
	 * 购买数量
	 */
	private int buynum;
	/**
	 * 消费总金额
	 */
	private int sumcost;
	/**
	 * 消耗钱币类型
	 */
	private int costtype;
	/**
	 * 区号
	 */
	private int zoneid;
	/**
	 * 注册系统
	 */
	private String usesys;
	/**
	 * 平台代码
	 */
	private String pfcode;
	/**
	 * 操作时间
	 */
	private int operateTime;
	/** 六道轮回等级 */
	private int reincarnationLevel;
	
	public B_FlowShop() {
		super();
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

	public int getLevel() {
		return level;
	}

	public void setLevel(int level) {
		this.level = level;
	}

	public int getShoptype() {
		return shoptype;
	}

	public void setShoptype(int shoptype) {
		this.shoptype = shoptype;
	}

	public int getItemid() {
		return itemid;
	}

	public void setItemid(int itemid) {
		this.itemid = itemid;
	}

	public int getItemcost() {
		return itemcost;
	}

	public void setItemcost(int itemcost) {
		this.itemcost = itemcost;
	}

	public int getBuynum() {
		return buynum;
	}

	public void setBuynum(int buynum) {
		this.buynum = buynum;
	}

	public int getSumcost() {
		return sumcost;
	}

	public void setSumcost(int sumcost) {
		this.sumcost = sumcost;
	}

	public int getCosttype() {
		return costtype;
	}

	public void setCosttype(int costtype) {
		this.costtype = costtype;
	}

	public int getZoneid() {
		return zoneid;
	}

	public void setZoneid(int zoneid) {
		this.zoneid = zoneid;
	}

	public String getUsesys() {
		return usesys;
	}

	public void setUsesys(String usesys) {
		this.usesys = usesys;
	}

	public String getPfcode() {
		return pfcode;
	}

	public void setPfcode(String pfcode) {
		this.pfcode = pfcode;
	}

	public int getOperateTime() {
		return operateTime;
	}

	public void setOperateTime(int operateTime) {
		this.operateTime = operateTime;
	}

	public int getReincarnationLevel() {
		return reincarnationLevel;
	}

	public void setReincarnationLevel(int reincarnationLevel) {
		this.reincarnationLevel = reincarnationLevel;
	}
	
	
	
}
