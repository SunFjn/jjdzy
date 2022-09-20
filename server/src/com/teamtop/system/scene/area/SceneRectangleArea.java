package com.teamtop.system.scene.area;
/**
 * 长方形的区域，在某些地图上存在
 * @author Administrator
 *
 */
public class SceneRectangleArea {
	private int x;
	private int y;
	private int w;
	private int h;
	/**
	 * 旋转角度
	 */
	private int rotationAngle; 
	
	public int getRotationAngle() {
		return rotationAngle;
	}
	public void setRotationAngle(int rotationAngle) {
		this.rotationAngle = rotationAngle;
	}
	public int getX() {
		return x;
	}
	public int getY() {
		return y;
	}
	public int getW() {
		return w;
	}
	public int getH() {
		return h;
	}
	public SceneRectangleArea(int x, int y, int w, int h) {
		super();
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
	}
	
}
