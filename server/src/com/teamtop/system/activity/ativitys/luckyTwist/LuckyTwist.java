package com.teamtop.system.activity.ativitys.luckyTwist;

import java.util.List;
import java.util.Map;

import com.teamtop.system.activity.model.ActivityData;

/**
 * 三国宝藏
 * @author jjjjyyy
 *
 */
public class LuckyTwist extends ActivityData {
	/**
	 * 免费抽奖次数
	 */
	private int num;
	/**
	 * 抽奖次数
	 */
	private int times;
	/**
	 * 第几次注入奖池(重置)
	 */
	private int cinum;
	/**
	 * 每轮抽奖次数(重置，用来获取免费次数)
	 */
	private int hasTimes;
	/**
	 * 已经选择的奖励
	 */
	private List<int[]> chooseReward;
	/**
	 * key奖池 ui显示 [类型_id_数量_大奖_是否抽中]
	 */
	private Map<Integer, List<int[]>> uiInfo;
	/**
	 * 每期必定获得福利次数
	 */
	private int luckyNum;

	public int getHasTimes() {
		return hasTimes;
	}

	public void setHasTimes(int hasTimes) {
		this.hasTimes = hasTimes;
	}

	public int getLuckyNum() {
		return luckyNum;
	}

	public void setLuckyNum(int luckyNum) {
		this.luckyNum = luckyNum;
	}

	public int getTimes() {
		return times;
	}

	public void setTimes(int times) {
		this.times = times;
	}

	public int getNum() {
		return num;
	}

	public void setNum(int num) {
		this.num = num;
	}

	public LuckyTwist() {
		super();
	}

	public LuckyTwist(long hid, int indexId, int actId, int periods) {
		super(hid, indexId, actId, periods);
	}

	public int getCinum() {
		return cinum;
	}
	public void setCinum(int cinum) {
		this.cinum = cinum;
	}

	public Map<Integer, List<int[]>> getUiInfo() {
		return uiInfo;
	}

	public void setUiInfo(Map<Integer, List<int[]>> uiInfo) {
		this.uiInfo = uiInfo;
	}

	public List<int[]> getChooseReward() {
		return chooseReward;
	}

	public void setChooseReward(List<int[]> chooseReward) {
		this.chooseReward = chooseReward;
	}

	

}
