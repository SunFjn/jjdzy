package com.teamtop.system.openDaysSystem.shaozhugoldpig.model;

import java.util.Map;

import com.teamtop.system.openDaysSystem.model.AbsOpenDaysSystemModel;

public class ShaoZhuGoldPig extends AbsOpenDaysSystemModel {
	/** 金猪购买状态:0-未购买,1-已购买 */
	private int goldPigState;
	/** 银猪购买状态:0-未购买,1-已购买 */
	private int silverPigState;
	/** 头像领取状态:0-未领取,1-已领取 */
	private int headState;
	/** 金猪元宝加成值 */
	private int goldPigValue;
	/** 银猪元宝加成值 */
	private int silverPigValue;

	private Map<Integer, ShaoZhuGoldPigTaskInfo> taskMap;

	public int getGoldPigState() {
		return goldPigState;
	}

	public void setGoldPigState(int goldPigState) {
		this.goldPigState = goldPigState;
	}

	public int getSilverPigState() {
		return silverPigState;
	}

	public void setSilverPigState(int silverPigState) {
		this.silverPigState = silverPigState;
	}

	public int getHeadState() {
		return headState;
	}

	public void setHeadState(int headState) {
		this.headState = headState;
	}

	public int getGoldPigValue() {
		return goldPigValue;
	}

	public void setGoldPigValue(int goldPigValue) {
		this.goldPigValue = goldPigValue;
	}

	public int getSilverPigValue() {
		return silverPigValue;
	}

	public void setSilverPigValue(int silverPigValue) {
		this.silverPigValue = silverPigValue;
	}

	public Map<Integer, ShaoZhuGoldPigTaskInfo> getTaskMap() {
		return taskMap;
	}

	public void setTaskMap(Map<Integer, ShaoZhuGoldPigTaskInfo> taskMap) {
		this.taskMap = taskMap;
	}

}
