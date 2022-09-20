package com.teamtop.system.scene.area;
/**
 * 坐标
 * @author kyle
 *
 */
public class ScenePosXYArea {
	/**
	 * x坐标
	 */
	private int posX;
	/**
	 * y坐标
	 */
	private int posY;
	public int getPosX() {
		return posX;
	}
	public void setPosX(int posX) {
		this.posX = posX;
	}
	public int getPosY() {
		return posY;
	}
	public void setPosY(int posY) {
		this.posY = posY;
	}
	public ScenePosXYArea(int posX, int posY) {
		super();
		this.posX = posX;
		this.posY = posY;
	}
	@Override
	public boolean equals(Object obj) {
		if(obj instanceof ScenePosXYArea){
			ScenePosXYArea p = (ScenePosXYArea) obj;
			return this.posX==p.getPosX() && this.posY==p.getPosY();
		}
		return false;
	}
	
}
