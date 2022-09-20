package com.teamtop.system.crossWenDingTianXia.model;

import com.teamtop.util.astar.Robbert;

public class CrossWenDingTianXiaNPC  extends Robbert{

	/**	 * 终点坐标X	 */
	private int finalX;
	/**	 * 终点坐标Y	 */
	private int finalY;
	
	public CrossWenDingTianXiaNPC(int finalX, int finalY) {
		super();
		this.finalX = finalX;
		this.finalY = finalY;
	}
	public int getFinalX() {
		return finalX;
	}
	public void setFinalX(int finalX) {
		this.finalX = finalX;
	}
	public int getFinalY() {
		return finalY;
	}
	public void setFinalY(int finalY) {
		this.finalY = finalY;
	}	
	
}
