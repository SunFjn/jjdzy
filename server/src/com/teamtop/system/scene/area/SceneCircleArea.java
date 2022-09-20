package com.teamtop.system.scene.area;

/**
 * @author Sam
 * 圆形区域
 */
public class SceneCircleArea {
	
	public SceneCircleArea(int x , int y , int radius){
		this.pointX = x;
		this.pointY = y;
		this.radius = radius;
	}

	/**
	 * 圆心坐标
	 */
	private int pointX;
	
	/**
	 * 圆心坐标
	 */
	private int pointY;
	
	/**
	 * 半径
	 */
	private int radius;

	public int getPointX() {
		return pointX;
	}

	public void setPointX(int pointX) {
		this.pointX = pointX;
	}

	public int getPointY() {
		return pointY;
	}

	public void setPointY(int pointY) {
		this.pointY = pointY;
	}

	public int getRadius() {
		return radius;
	}

	public void setRadius(int radius) {
		this.radius = radius;
	}
	
}
