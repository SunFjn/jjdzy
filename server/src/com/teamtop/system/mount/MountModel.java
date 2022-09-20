package com.teamtop.system.mount;

import com.teamtop.util.db.trans.FieldOrder;

public class MountModel {
	/**
	 * 坐骑id
	 */
	@FieldOrder(order=1)
	private int id;
	/**
	 * 品质
	 */
	@FieldOrder(order=2)
	private int pinZhi;
	/**
	 * 升星id
	 */
	@FieldOrder(order=3)
	private int starId;
	/**
	 * 升级id
	 */
	@FieldOrder(order=4)
	private int	upgradeLv;
	/**
	 * 坐骑幻化培养id
	 */
	@FieldOrder(order=5)
	private int	unrealId;
	
	public int getStar() {
		return starId%(pinZhi*MountConst.BASE_STAR);
	}
	
	public MountModel() {
		super();
	}

	public int getUnrealId() {
		return unrealId;
	}

	public void setUnrealId(int unrealId) {
		this.unrealId = unrealId;
	}

	public int getPinZhi() {
		return pinZhi;
	}

	public void setPinZhi(int pinZhi) {
		this.pinZhi = pinZhi;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getStarId() {
		return starId;
	}

	public void setStarId(int starId) {
		this.starId = starId;
	}

	public int getUpgradeLv() {
		return upgradeLv;
	}

	public void setUpgradeLv(int upgradeLv) {
		this.upgradeLv = upgradeLv;
	}
	
}
