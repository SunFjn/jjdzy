package com.teamtop.system.activity.ativitys.themeConsume.model;

import java.util.Map;

import com.teamtop.system.activity.model.ActivityData;

public class ThemeConsume extends ActivityData {
	/**主题类型1.符文主题 2.兽魂主题 3.少主主题 4.异兽主题 5.奇策主题*/
	private int type;
	/**充值元宝*/
	private int recharge;
	/**消费元宝*/
	private int consume;
	/**主题消费领取状态<id,状态：0.条件不符 1.可领 2.已领>*/
	private Map<Integer,Integer> stateMap;
	
	public ThemeConsume() {
		
	}
	public ThemeConsume(long hid, int indexId, int actId, int periods) {
		super(hid, indexId, actId, periods);
	}
	
	public int getType() {
		return type;
	}
	public void setType(int type) {
		this.type = type;
	}
	public int getRecharge() {
		return recharge;
	}
	public void setRecharge(int recharge) {
		this.recharge = recharge;
	}
	public int getConsume() {
		return consume;
	}
	public void setConsume(int consume) {
		this.consume = consume;
	}
	public Map<Integer, Integer> getStateMap() {
		return stateMap;
	}
	public void setStateMap(Map<Integer, Integer> stateMap) {
		this.stateMap = stateMap;
	}
}
