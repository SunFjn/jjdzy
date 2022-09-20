package com.teamtop.system.scene;

import com.teamtop.util.db.trans.FieldOrder;

public class NewLocation {
	@FieldOrder(order = 1)
	private long sceneId;
	@FieldOrder(order = 2)
	private int sceneSysId;
	@FieldOrder(order = 3)
	private int posX;
	@FieldOrder(order = 4)
	private int posY;
	public long getSceneId() {
		return sceneId;
	}
	public int getSceneSysId() {
		return sceneSysId;
	}
	public int getPosX() {
		return posX;
	}
	public int getPosY() {
		return posY;
	}
	public NewLocation(long sceneId, int sceneSysId, int posX, int posY) {
		super();
		this.sceneId = sceneId;
		this.sceneSysId = sceneSysId;
		this.posX = posX;
		this.posY = posY;
	}
	public NewLocation() {
		super();
	}
	public void setSceneId(long sceneId) {
		this.sceneId = sceneId;
	}
	public void setSceneSysId(int sceneSysId) {
		this.sceneSysId = sceneSysId;
	}
	public void setPosX(int posX) {
		this.posX = posX;
	}
	public void setPosY(int posY) {
		this.posY = posY;
	}
	
}