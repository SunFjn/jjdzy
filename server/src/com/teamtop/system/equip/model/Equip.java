package com.teamtop.system.equip.model;

import com.teamtop.util.cache.CacheModel;
import com.teamtop.util.db.trans.FieldOrder;

public class Equip extends CacheModel{
	
	/**	 * 唯一id	 */
	@FieldOrder(order = 1)
	private long id;
	/**	 * 角色id	 */
	@FieldOrder(order = 2)
	private long hid;
	/**	 * 装备系统id	 */
	@FieldOrder(order = 3)
	private int sysId;
	/**	 * 状态 1 在背包中  2 在仓库 3 在身上  4 在交易中/市场上 5在当铺 6在邮件	 */
	@FieldOrder(order = 4)
	private int state;
	/**	 * 穿戴装备的身上位置，默认从0开始	 */
	@FieldOrder(order = 5)
	private int bodyIndex;
	/**	 * 职业（身上装备才有），不在身上默认为0	 */
//	@FieldOrder(order = 3)
//	private int job;
	/**	 * 品质，白绿蓝紫橙红	 */
//	@FieldOrder(order = 6)
//	private int quality;
	/**	 * 附加属性系数（百分比）	 */
//	@FieldOrder(order = 7)
//	private int attrAdd;
	/**	 * 装备部位	 */
//	@FieldOrder(order = 8)
//	private int part;
	/**	 * 装备评分	 */
//	@FieldOrder(order = 10)
//	private int score;
	/**	 * 装备创建时间	 */
//	@FieldOrder(order = 11)
//	private int createTime;
	
	public Equip(){
		
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
	public int getSysId() {
		return sysId;
	}
	public void setSysId(int sysId) {
		this.sysId = sysId;
	}
	public int getState() {
		return state;
	}
	public void setState(int state) {
		this.state = state;
	}
//	public int getCreateTime() {
//		return createTime;
//	}
//	public void setCreateTime(int createTime) {
//		this.createTime = createTime;
//	}
//	public int getJob() {
//		return job;
//	}
//	public void setJob(int job) {
//		this.job = job;
//	}
//	public int getQuality() {
//		return quality;
//	}
//	public void setQuality(int quality) {
//		this.quality = quality;
//	}
//	public int getAttrAdd() {
//		return attrAdd;
//	}
//	public void setAttrAdd(int attrAdd) {
//		this.attrAdd = attrAdd;
//	}
	public int getBodyIndex() {
		return bodyIndex;
	}
	public void setBodyIndex(int bodyIndex) {
		this.bodyIndex = bodyIndex;
	}
//	public int getScore() {
//		return score;
//	}
//	public void setScore(int score) {
//		this.score = score;
//	}
//	public int getPart() {
//		return part;
//	}
//	public void setPart(int part) {
//		this.part = part;
//	}
	@Override
	public boolean equals(Object obj) {
		if(obj == null) {
			return false;
		}
		if(obj == this) {
			return true;
		}
		if(!(obj instanceof Equip)) {
			return false;
		}
		Equip equip = (Equip)obj;
		if(equip.getId() == getId()) {
			return true;
		}
		return false;
	}
	@Override
	public String toString() {
		return "{" + id + "," + hid + "," + sysId + "," + state + "," + bodyIndex + "}";
	}
	
	
}
