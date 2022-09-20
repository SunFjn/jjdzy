package com.teamtop.system.bag;
/**
 * 背包格子临时数据
 * @author Administrator
 *
 */
public class GridTempData {
	/**
	 * 系统id
	 */
	private int sysid;
	/**
	 * 数量
	 */
	private int num;
	/**a
	 * 唯一id
	 */
	private long unitId;
	/**
	 * 类型
	 */
	private int type;
	/**
	 * 到期时间
	 */
	private int expiredTime;
	
	/**
	 * 随机的附加属性 因为随机也可能是0 这里加默认值-1 代表没有随机过（神秘商店需要生成商品的时候随机出附加属性）
	 */
	private int attrAdd = -1;

	public int getSysid() {
		return sysid;
	}
	public void setSysid(int sysid) {
		this.sysid = sysid;
	}
	public int getNum() {
		return num;
	}
	public void setNum(int num) {
		this.num = num;
	}
	public long getUnitId() {
		return unitId;
	}
	public void setUnitId(long unitId) {
		this.unitId = unitId;
	}
	public int getType() {
		return type;
	}
	public void setType(int type) {
		this.type = type;
	}
	public int getExpiredTime() {
		return expiredTime;
	}
	public void setExpiredTime(int expiredTime) {
		this.expiredTime = expiredTime;
	}
	@Override
	public String toString() {
		return "[" + this.getSysid() + "," + this.getUnitId() + "," + this.getNum() +"]";
	}
	public GridTempData() {
		super();
	}
	public GridTempData(int sysid, int num, long unitId, int type) {
		super();
		this.sysid = sysid;
		this.num = num;
		this.unitId = unitId;
		this.type = type;
	}
	public GridTempData(int sysid, int num) {
		this.sysid = sysid;
		this.num = num;
	}
	public int getAttrAdd() {
		return attrAdd;
	}
	public void setAttrAdd(int attrAdd) {
		this.attrAdd = attrAdd;
	}
}
