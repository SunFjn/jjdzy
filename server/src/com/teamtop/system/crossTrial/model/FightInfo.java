package com.teamtop.system.crossTrial.model;

import com.teamtop.cross.upload.CrossHeroBaseModel;

public class FightInfo {
	
	private int floor;
	
	private int time;
	
	private CrossHeroBaseModel model;

	public int getFloor() {
		return floor;
	}

	public void setFloor(int floor) {
		this.floor = floor;
	}

	public int getTime() {
		return time;
	}

	public void setTime(int time) {
		this.time = time;
	}

	public CrossHeroBaseModel getModel() {
		return model;
	}

	public void setModel(CrossHeroBaseModel model) {
		this.model = model;
	}

}
