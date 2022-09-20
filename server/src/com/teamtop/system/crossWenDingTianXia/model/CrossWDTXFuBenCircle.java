package com.teamtop.system.crossWenDingTianXia.model;

/**
 * 圆
 * @author Administrator
 *
 */
public class CrossWDTXFuBenCircle {
	private String id;
	/**
	 * 中心x
	 */
	private int x;
	/**
	 * 中心y
	 */
	private int y;
	/**
	 * 半径
	 */
	private int radius;
	
	public String getId() {
		return id;
	}
	public int getX() {
		return x;
	}
	public int getY() {
		return y;
	}
	public int getRadius() {
		return radius;
	}
	public CrossWDTXFuBenCircle(String id,int x, int y, int radius) {
		super();
		this.id = id;
		this.x = x;
		this.y = y;
		this.radius = radius;
	}
	
}
