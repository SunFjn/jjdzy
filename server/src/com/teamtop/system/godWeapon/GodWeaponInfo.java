package com.teamtop.system.godWeapon;
/**
 * 神兵状态类
 * @author jjjjyyy
 *
 */

import java.util.HashMap;
import java.util.Set;

import com.teamtop.util.db.trans.FieldOrder;

public class GodWeaponInfo {
	/**
	 * 神兵类型
	 */
	@FieldOrder(order=1)
	private int type;
	/**
	 * 星级
	 */
	@FieldOrder(order=2)
	private int star;
	/**
	 * 当前穿戴的武器模型
	 */
	@FieldOrder(order=3)
	private int wearWeapon;
	/**
	 * 已经激活的时装
	 */
	@FieldOrder(order=4)
	private Set<Integer> fashions;
	/**
	 * 神铸 神铁、陨铁 玄铁
	 */
	@FieldOrder(order=5)
	private HashMap<Integer, Integer> godForges;
	/**
	 * 神兵专属等级
	 */
	@FieldOrder(order=6)
	private int zhuanshuLevel;
	/**
	 * 淬炼等级
	 */
	@FieldOrder(order=7)
	private int cuilianLevel;
	/**
	 * 经验
	 */
	@FieldOrder(order=8)
	private int cuilianexp;
	
	
	public GodWeaponInfo() {
		super();
	}
	
	
	public int getType() {
		return type;
	}
	public void setType(int type) {
		this.type = type;
	}
	public int getStar() {
		return star;
	}
	public void setStar(int star) {
		this.star = star;
	}
	public int getWearWeapon() {
		return wearWeapon;
	}
	public void setWearWeapon(int wearWeapon) {
		this.wearWeapon = wearWeapon;
	}
	public Set<Integer> getFashions() {
		return fashions;
	}
	public void setFashions(Set<Integer> fashions) {
		this.fashions = fashions;
	}
	public HashMap<Integer, Integer> getGodForges() {
		return godForges;
	}
	public void setGodForges(HashMap<Integer, Integer> godForges) {
		this.godForges = godForges;
	}
	public int getZhuanshuLevel() {
		return zhuanshuLevel;
	}
	public void setZhuanshuLevel(int zhuanshuLevel) {
		this.zhuanshuLevel = zhuanshuLevel;
	}
	public int getCuilianLevel() {
		return cuilianLevel;
	}
	public void setCuilianLevel(int cuilianLevel) {
		this.cuilianLevel = cuilianLevel;
	}
	public int getCuilianexp() {
		return cuilianexp;
	}
	public void setCuilianexp(int cuilianexp) {
		this.cuilianexp = cuilianexp;
	}
	
	
	

}
