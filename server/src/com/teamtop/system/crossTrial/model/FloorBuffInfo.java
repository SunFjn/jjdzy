package com.teamtop.system.crossTrial.model;

import com.teamtop.util.ProbabilityEvent.ProbabilityEventFactory;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventUtil;

public class FloorBuffInfo {

	private int floorId;

	private int type;

	private int[][] attr;

	private ProbabilityEventModel model;

	private int cost;

	public FloorBuffInfo(int floorId, int type, int[][] attr, int cost) {
		super();
		this.floorId = floorId;
		this.type = type;
		this.attr = attr;
		this.cost = cost;
		this.model = ProbabilityEventFactory.getProbabilityEvent();
		for (int[] arr : attr) {
			model.addProbabilityEvent(arr[2], arr);
		}
	}

	public int getFloorId() {
		return floorId;
	}

	public void setFloorId(int floorId) {
		this.floorId = floorId;
	}

	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}

	public int[][] getAttr() {
		return attr;
	}

	public void setAttr(int[][] attr) {
		this.attr = attr;
	}

	public int getCost() {
		return cost;
	}

	public void setCost(int cost) {
		this.cost = cost;
	}

	public ProbabilityEventModel getModel() {
		return model;
	}

	public void setModel(ProbabilityEventModel model) {
		this.model = model;
	}

	public int[] getBuff() {
		int[] buff = (int[]) ProbabilityEventUtil.getEventByProbability(model);
		return buff;
	}

}
