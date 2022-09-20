package com.teamtop.system.activity.ativitys.threeKingdomsCelebration.celebrationHaoLiZhuanPan.model;

public class CelebrationHaoLiZhuanPanRecord {

	private String name;//名字
	private int idTool;//道具ID
	private int numTool;//道具数量
	
	public CelebrationHaoLiZhuanPanRecord(String name, int idTool, int numTool) {
		super();
		this.name = name;
		this.idTool = idTool;
		this.numTool = numTool;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getIdTool() {
		return idTool;
	}
	public void setIdTool(int idTool) {
		this.idTool = idTool;
	}
	public int getNumTool() {
		return numTool;
	}
	public void setNumTool(int numTool) {
		this.numTool = numTool;
	}
}
