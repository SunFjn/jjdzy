package com.teamtop.system.scene;

import com.teamtop.util.db.trans.FieldOrder;

/**
 * 在每次进入不同场景前保存一份旧的位置数据
 * @name：RolePreLocation
 * @description：
 * @author：Kyle
 * @date：2012-8-6 上午08:53:06
 * @moidfy：2012-12-8 修改角色id为long
 * @version 1.0.0
 *
 */
public class PreLocation {
	/**
	 * 旧场景唯一id
	 */
	@FieldOrder(order = 1)
	private long preSceneUnitId;
	/**
	 * 旧场景系统id
	 */
	@FieldOrder(order = 2)
	private int preSceneSysId;
	/**
	 * 旧场景类型
	 */
	@FieldOrder(order = 3)
	private int preSceneType;
	/**
	 * 旧场景坐标X
	 */
	@FieldOrder(order = 4)
	private int prePosX;
	/**
	 * 旧场景坐标Y
	 */
	@FieldOrder(order = 5)
	private int prePosY;
	
	/**
	 * @return the preSceneUnitId
	 */
	public long getPreSceneUnitId() {
		return preSceneUnitId;
	}
	/**
	 * @param preSceneUnitId the preSceneUnitId to set
	 */
	public void setPreSceneUnitId(long preSceneUnitId) {
		this.preSceneUnitId = preSceneUnitId;
	}
	/**
	 * @return the preSceneSysId
	 */
	public int getPreSceneSysId() {
		return preSceneSysId;
	}
	/**
	 * @param preSceneSysId the preSceneSysId to set
	 */
	public void setPreSceneSysId(int preSceneSysId) {
		this.preSceneSysId = preSceneSysId;
	}
	/**
	 * @return the preSceneType
	 */
	public int getPreSceneType() {
		return preSceneType;
	}
	/**
	 * @param preSceneType the preSceneType to set
	 */
	public void setPreSceneType(int preSceneType) {
		this.preSceneType = preSceneType;
	}
	/**
	 * @return the prePosX
	 */
	public int getPrePosX() {
		return prePosX;
	}
	/**
	 * @param prePosX the prePosX to set
	 */
	public void setPrePosX(int prePosX) {
		this.prePosX = prePosX;
	}
	/**
	 * @return the prePosY
	 */
	public int getPrePosY() {
		return prePosY;
	}
	/**
	 * @param prePosY the prePosY to set
	 */
	public void setPrePosY(int prePosY) {
		this.prePosY = prePosY;
	}
	/**
	 * 构造方法
	 * @param preSceneUnitId 旧场景唯一id
	 * @param preSceneSysId 旧场景系统id
	 * @param preSceneType 旧场景类型
	 * @param prePosX 旧场景坐标X
	 * @param prePosY 旧场景坐标Y
	 */
	public PreLocation(long preSceneUnitId, int preSceneSysId,
			int preSceneType, int prePosX, int prePosY) {
		super();
		this.preSceneUnitId = preSceneUnitId;
		this.preSceneSysId = preSceneSysId;
		this.preSceneType = preSceneType;
		this.prePosX = prePosX;
		this.prePosY = prePosY;
	}
	public PreLocation() {
		super();
	}
	@Override
	public String toString() {
		return "RolePreLocation [preSceneUnitId=" + preSceneUnitId + ", preSceneSysId=" + preSceneSysId + ", preSceneType=" + preSceneType + ", prePosX=" + prePosX + ", prePosY="
				+ prePosY + "]";
	}
	
}
