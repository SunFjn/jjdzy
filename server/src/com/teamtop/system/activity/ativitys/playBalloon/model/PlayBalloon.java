package com.teamtop.system.activity.ativitys.playBalloon.model;

import java.util.Map;

import com.teamtop.system.activity.model.ActivityData;

public class PlayBalloon extends ActivityData {
	/**打气球次数*/
	private int num;
	/**消费元宝*/
	private int consume;
	/**打中的气球<位置(1-12), [道具类型,道具id,数量]>*/
	private Map<Integer,int[]> balloonMap;
	
	public PlayBalloon() {
		
	}
	public PlayBalloon(long hid, int indexId, int actId, int periods) {
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
	public Map<Integer, int[]> getBalloonMap() {
		return balloonMap;
	}
	public void setBalloonMap(Map<Integer, int[]> balloonMap) {
		this.balloonMap = balloonMap;
	}
	
}
