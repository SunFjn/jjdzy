package com.teamtop.util.ProbabilityEvent;
/**
 * 效果概率事件
 * @author KyleCheng
 *
 */
public class EffectProbabilityEvent {

	/**
	 * 概率
	 */
	private int probability;
	/**
	 * 效果数组,可能会有多个效果
	 */
	private int[][] effects;
	/**
	 * @return the probability
	 */
	public int getProbability() {
		return probability;
	}
	/**
	 * @param probability the probability to set
	 */
	public void setProbability(int probability) {
		this.probability = probability;
	}
	/**
	 * @return the effects
	 */
	public int[][] getEffects() {
		return effects;
	}
	/**
	 * @param effects the effects to set
	 */
	public void setEffects(int[][] effects) {
		this.effects = effects;
	}
	public EffectProbabilityEvent(int probability, int[][] effects) {
		super();
		this.probability = probability;
		this.effects = effects;
	}
	public EffectProbabilityEvent() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
}
