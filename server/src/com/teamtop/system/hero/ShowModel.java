package com.teamtop.system.hero;

import com.teamtop.util.db.trans.FieldOrder;

/**
 * hero外观模型
 * @author Administrator
 *
 */
public class ShowModel {
	/**
	 * 武器模型
	 */
	@FieldOrder(order = 1)
	private int weaponModel;
	/**
	 * 衣服模型
	 */
	@FieldOrder(order = 2)
	private int bodyModel;
	/**
	 * 翅膀模型
	 */
	@FieldOrder(order = 3)
	private int wingModel;
	/**
	 * 坐骑模型
	 */
	@FieldOrder(order = 4)
	private int rideModel;
	/**将衔**/
	@FieldOrder(order = 5)
	private int official;
	/**头像id**/
	@FieldOrder(order = 6)
	private int herdid;
	/**头像框ui**/
	@FieldOrder(order = 7)	
	private int herdUi;
	
	
	public ShowModel() {
		super();
	}
	public int getWeaponModel() {
		return weaponModel;
	}
	public void setWeaponModel(int weaponModel) {
		this.weaponModel = weaponModel;
	}
	
	public int getBodyModel() {
		return bodyModel;
	}
	public void setBodyModel(int bodyModel) {
		this.bodyModel = bodyModel;
	}
	public int getWingModel() {
		return wingModel;
	}
	public void setWingModel(int wingModel) {
		this.wingModel = wingModel;
	}
	public int getRideModel() {
		return rideModel;
	}
	public void setRideModel(int rideModel) {
		this.rideModel = rideModel;
	}
	public int getOfficial() {
		return official;
	}
	public void setOfficial(int official) {
		this.official = official;
	}
	public int getHerdid() {
		return herdid;
	}
	public void setHerdid(int herdid) {
		this.herdid = herdid;
	}
	public int getHerdUi() {
		return herdUi;
	}
	public void setHerdUi(int herdUi) {
		this.herdUi = herdUi;
	}
	
	
}
