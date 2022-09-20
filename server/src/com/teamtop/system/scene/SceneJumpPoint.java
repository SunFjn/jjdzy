package com.teamtop.system.scene;
/**
 * 跳转点
 * @author Administrator
 *
 */
public class SceneJumpPoint {
	//当前地图id
	private int nowSceneid;
	//当前地图坐标x
	private int nowPosx;
	//当前地图坐标y
	private int nowPosy;
	//下个地图坐标id
	private int nextSceneid;
	//下个地图坐标x
	private int nextPosx;
	//下个地图坐标y
	private int nextPosy;
	public int getNowSceneid() {
		return nowSceneid;
	}
	public void setNowSceneid(int nowSceneid) {
		this.nowSceneid = nowSceneid;
	}
	public int getNowPosx() {
		return nowPosx;
	}
	public void setNowPosx(int nowPosx) {
		this.nowPosx = nowPosx;
	}
	public int getNowPosy() {
		return nowPosy;
	}
	public void setNowPosy(int nowPosy) {
		this.nowPosy = nowPosy;
	}
	public int getNextSceneid() {
		return nextSceneid;
	}
	public void setNextSceneid(int nextSceneid) {
		this.nextSceneid = nextSceneid;
	}
	public int getNextPosx() {
		return nextPosx;
	}
	public void setNextPosx(int nextPosx) {
		this.nextPosx = nextPosx;
	}
	public int getNextPosy() {
		return nextPosy;
	}
	public void setNextPosy(int nextPosy) {
		this.nextPosy = nextPosy;
	}
	public SceneJumpPoint(int nowSceneid, int nowPosx, int nowPosy, int nextSceneid, int nextPosx, int nextPosy) {
		super();
		this.nowSceneid = nowSceneid;
		this.nowPosx = nowPosx;
		this.nowPosy = nowPosy;
		this.nextSceneid = nextSceneid;
		this.nextPosx = nextPosx;
		this.nextPosy = nextPosy;
	}
	
	
}
