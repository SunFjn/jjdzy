package com.teamtop.util.astar;

public class PreSetRoute {
	private int sceneUnitId;
	private int sceneSysId;
	private int x;
	private int y;
	private int[][] route;
	public int getSceneUnitId() {
		return sceneUnitId;
	}
	public void setSceneUnitId(int sceneUnitId) {
		this.sceneUnitId = sceneUnitId;
	}
	public int getSceneSysId() {
		return sceneSysId;
	}
	public void setSceneSysId(int sceneSysId) {
		this.sceneSysId = sceneSysId;
	}
	public int getX() {
		return x;
	}
	public void setX(int x) {
		this.x = x;
	}
	public int getY() {
		return y;
	}
	public void setY(int y) {
		this.y = y;
	}
	public int[][] getRoute() {
		return route;
	}
	public void setRoute(int[][] route) {
		this.route = route;
	}
	
}
