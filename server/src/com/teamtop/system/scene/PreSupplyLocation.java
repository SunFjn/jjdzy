package com.teamtop.system.scene;

import com.teamtop.util.db.trans.FieldOrder;

public class PreSupplyLocation {
	/**
	 * 旧场景唯一id
	 */
	@FieldOrder(order = 1)
	private long preSupplySceneUnitId;
	/**
	 * 旧场景系统id
	 */
	@FieldOrder(order = 2)
	private int preSupplySceneSysId;
	/**
	 * 旧场景坐标X
	 */
	@FieldOrder(order = 3)
	private int preSupplyPosX;
	/**
	 * 旧场景坐标Y
	 */
	@FieldOrder(order = 4)
	private int preSupplyPosY;
	public long getPreSupplySceneUnitId() {
		return preSupplySceneUnitId;
	}
	public void setPreSupplySceneUnitId(long preSupplySceneUnitId) {
		this.preSupplySceneUnitId = preSupplySceneUnitId;
	}
	public int getPreSupplySceneSysId() {
		return preSupplySceneSysId;
	}
	public void setPreSupplySceneSysId(int preSupplySceneSysId) {
		this.preSupplySceneSysId = preSupplySceneSysId;
	}
	public int getPreSupplyPosX() {
		return preSupplyPosX;
	}
	public void setPreSupplyPosX(int preSupplyPosX) {
		this.preSupplyPosX = preSupplyPosX;
	}
	public int getPreSupplyPosY() {
		return preSupplyPosY;
	}
	public void setPreSupplyPosY(int preSupplyPosY) {
		this.preSupplyPosY = preSupplyPosY;
	}
	public PreSupplyLocation(long preSupplySceneUnitId, int preSupplySceneSysId, int preSupplyPosX, int preSupplyPosY) {
		super();
		this.preSupplySceneUnitId = preSupplySceneUnitId;
		this.preSupplySceneSysId = preSupplySceneSysId;
		this.preSupplyPosX = preSupplyPosX;
		this.preSupplyPosY = preSupplyPosY;
	}
	public PreSupplyLocation() {
		super();
	}
}
