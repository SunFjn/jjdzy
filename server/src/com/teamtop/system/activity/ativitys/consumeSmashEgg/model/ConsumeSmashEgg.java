package com.teamtop.system.activity.ativitys.consumeSmashEgg.model;

import java.util.Map;
import java.util.Set;

import com.teamtop.system.activity.model.ActivityData;

public class ConsumeSmashEgg extends ActivityData {
	/**砸蛋次数*/
	private int num;
	/**消费元宝*/
	private int consume;
	/**砸蛋索引<位置(0、1、2), [0.未砸1.已砸，,道具类型，道具id,数量]>*/
	private Map<Integer,int[]> stateMap;
	/**已领大奖id*/
	private Set<Integer> receivedIdSet;
	
	public ConsumeSmashEgg() {
		
	}
	public ConsumeSmashEgg(long hid, int indexId, int actId, int periods) {
		super(hid, indexId, actId, periods);
	}
	public int getNum() {
		return num;
	}
	public void setNum(int num) {
		this.num = num;
	}
	public int getConsume() {
		return consume;
	}
	public void setConsume(int consume) {
		this.consume = consume;
	}
	
	public Map<Integer, int[]> getStateMap() {
		return stateMap;
	}
	public void setStateMap(Map<Integer, int[]> stateMap) {
		this.stateMap = stateMap;
	}
	public Set<Integer> getReceivedIdSet() {
		return receivedIdSet;
	}
	public void setReceivedIdSet(Set<Integer> receivedIdSet) {
		this.receivedIdSet = receivedIdSet;
	}
}
