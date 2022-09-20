package com.teamtop.system.scene;

public class Canwalk {
	private int[][] canwalk;
	private int row;
	private int col;
	public int[][] getCanwalk() {
		return canwalk;
	}
	public void setCanwalk(int[][] canwalk) {
		this.canwalk = canwalk;
	}
	public int getRow() {
		return row;
	}
	public void setRow(int row) {
		this.row = row;
	}
	public int getCol() {
		return col;
	}
	public void setCol(int col) {
		this.col = col;
	}
	public Canwalk(int[][] canwalk, int row, int col) {
		super();
		this.canwalk = canwalk;
		this.row = row;
		this.col = col;
	}
	
}
