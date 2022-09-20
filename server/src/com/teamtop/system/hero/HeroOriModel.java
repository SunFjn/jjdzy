package com.teamtop.system.hero;
/**
 * 角色基本模型
 * @author kyle
 *
 */
public class HeroOriModel {
	/**
	 * 衣服模型
	 */
	private int bodyModel;
	/**
	 * 武器模型
	 */
	private int weaponModel;
	/**
	 * 初始普攻技能
	 */
	private int pugong;
	/**
	 * 怒气
	 */
	private int nuqi;
	/**
	 * 被动
	 */
	private int beidong;
	
	
	public int getPugong() {
		return pugong;
	}
	public void setPugong(int pugong) {
		this.pugong = pugong;
	}
	public int getNuqi() {
		return nuqi;
	}
	public void setNuqi(int nuqi) {
		this.nuqi = nuqi;
	}
	public int getBeidong() {
		return beidong;
	}
	public void setBeidong(int beidong) {
		this.beidong = beidong;
	}
	public int getBodyModel() {
		return bodyModel;
	}
	public void setBodyModel(int bodyModel) {
		this.bodyModel = bodyModel;
	}
	public int getWeaponModel() {
		return weaponModel;
	}
	public void setWeaponModel(int weaponModel) {
		this.weaponModel = weaponModel;
	}
	public HeroOriModel() {
		super();
	}
	public HeroOriModel(int bodyModel, int weaponModel, int pugong,int nuqi,int beidong) {
		super();
		this.bodyModel = bodyModel;
		this.weaponModel = weaponModel;
		this.pugong = pugong;
		this.nuqi = nuqi;
		this.beidong = beidong;
	}
	
}
