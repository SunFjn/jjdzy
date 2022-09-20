package com.teamtop.system.activity.ativitys.countryTreasure;

import java.util.List;
import java.util.Map;

import com.teamtop.system.activity.model.ActivityData;

/**
 * 三国宝藏
 * @author jjjjyyy
 *
 */
public class CountryTreasure extends ActivityData{
	/**
	 * 状态：0 选择物品界面 1 抽奖界面 默认0
	 */
	private int state;
	/**
	 * 第几轮 默认1
	 */
	private int lun;
	/**
	 * 第几次抽奖 默认0
	 */
	private int cinum;
	/**
	 * 按照期数轮数档次 已经选择的奖励
	 */
	private Map<Integer,List<int[]>> chooseReward;
	/**
	 * 按照期数轮数档次  已经抽取奖励
	 */
	private Map<Integer,List<int[]>> hasChooseReward;
	/**
	 * ui显示 [类型_id_数量_位置]
	 */
	private List<int[]> uiInfo;
	/**
	 * 额外奖励领取情况
	 */
	private Map<Integer, Integer> extraRewards;
	
	public CountryTreasure() {
		super();
	}
	
	public int getState() {
		return state;
	}
	public void setState(int state) {
		this.state = state;
	}

	public int getLun() {
		return lun;
	}
	public void setLun(int lun) {
		this.lun = lun;
	}
	public int getCinum() {
		return cinum;
	}
	public void setCinum(int cinum) {
		this.cinum = cinum;
	}
	public Map<Integer, List<int[]>> getChooseReward() {
		return chooseReward;
	}
	public void setChooseReward(Map<Integer, List<int[]>> chooseReward) {
		this.chooseReward = chooseReward;
	}
	public Map<Integer, List<int[]>> getHasChooseReward() {
		return hasChooseReward;
	}
	public void setHasChooseReward(Map<Integer, List<int[]>> hasChooseReward) {
		this.hasChooseReward = hasChooseReward;
	}
	public Map<Integer, Integer> getExtraRewards() {
		return extraRewards;
	}
	public void setExtraRewards(Map<Integer, Integer> extraRewards) {
		this.extraRewards = extraRewards;
	}
	public List<int[]> getUiInfo() {
		return uiInfo;
	}
	public void setUiInfo(List<int[]> uiInfo) {
		this.uiInfo = uiInfo;
	}
	

}
