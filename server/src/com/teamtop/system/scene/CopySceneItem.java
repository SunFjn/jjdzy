package com.teamtop.system.scene;
/**
 * 副本场景的NPC 怪 物品等
 * @name：CopySceneItem
 * @description：
 * @author：Kyle
 * @date：2012-8-6 上午07:16:00
 * @moidfy：
 * @version 1.0.0
 *
 */
public class CopySceneItem {
	private int itemId=0;
	private int itemType=0;
	private int itemX=0;
	private int itemY=0;
	private int wave = -1;//第几波，暂时只放在副本里面
	
	//如果上面itemType 是跳转点类型,此处为要跳转的目的地
	private int targetId=0;
	private int targetX=0;
	private int targetY=0;
	public int getItemId() {
		return itemId;
	}
	public void setItemId(int itemId) {
		this.itemId = itemId;
	}
	public int getItemType() {
		return itemType;
	}
	public void setItemType(int itemType) {
		this.itemType = itemType;
	}
	public int getItemX() {
		return itemX;
	}
	public void setItemX(int itemX) {
		this.itemX = itemX;
	}
	public int getItemY() {
		return itemY;
	}
	public void setItemY(int itemY) {
		this.itemY = itemY;
	}
	public int getTargetId() {
		return targetId;
	}
	public void setTargetId(int targetId) {
		this.targetId = targetId;
	}
	public int getTargetX() {
		return targetX;
	}
	public void setTargetX(int targetX) {
		this.targetX = targetX;
	}
	public int getTargetY() {
		return targetY;
	}
	public void setTargetY(int targetY) {
		this.targetY = targetY;
	}
	public int getWave() {
		return wave;
	}
	public void setWave(int wave) {
		this.wave = wave;
	}
	
}
