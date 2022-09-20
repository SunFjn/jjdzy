package com.teamtop.util.ProbabilityEvent;

import java.util.ArrayList;
import java.util.List;
/**
 * 概率事件
 * @author KyleCheng
 *
 */
public class ProbabilityEventModel {

	/**
	 * 概率总值,随着每次加入概率会不断增加
	 */
	private int totalKey;
	/**
	 * 保存概率
	 */
	private List<Integer> probabilities = new ArrayList<Integer>();
	/**
	 * 保存事件
	 */
	private List<Object> events = new ArrayList<Object>(); 
	/**
	 * 加入概率事件
	 * @param probability 概率
	 * @param event 事件
	 */
	public void addProbabilityEvent(int probability,Object event){
		if(probability<=0) return;
		if(probabilities.size()==0){
			probabilities.add(1);
			totalKey = 1;
		}
		totalKey +=probability;
		probabilities.add(totalKey);
		events.add(event);
	}
	
	/**
	 * 加入概率事件<br/>
	 * 只适用于x%概率可以运行的情况，并且不能与上面方法共用
	 * @param canRunprobability 能够运行的概率
	 */
	public void addProbabilityEvent(int canRunprobability){
		this.addProbabilityEvent(canRunprobability, true);
		this.addProbabilityEvent(100-canRunprobability, false);
	}
	
	/**
	 * 移除某个概率事件
	 * @param event 事件
	 * @return 是否移除成功
	 */
	public boolean removeProbabilityEvent(Object event){
		int tempProbability = 0;
		List<Integer> newProbabilities = new ArrayList<Integer>();
		List<Object> newEvents = new ArrayList<Object>();
		boolean foundPro = false;
		int size = probabilities.size();
		for(int i=0;i<size;i++){
			Integer key = probabilities.get(i);
			if(key>1){
				Object oriEvent = events.get(i-1);
				int newKey = key - tempProbability;
				tempProbability = key;
				if(event!=null&&oriEvent!=null){
					if(foundPro || !oriEvent.equals(event)){
						newEvents.add(oriEvent);
						newProbabilities.add(newKey);
					}else{
						foundPro = true;
					}
				}else{
					if(oriEvent==event){
						foundPro = true;
					}else{
						newEvents.add(oriEvent);
						newProbabilities.add(newKey);
					}
				}
			}
		}
		if(foundPro){
			probabilities.clear();
			events.clear();
			totalKey = 0;
			int newSize = newProbabilities.size();
			for(int i = 0;i<newSize;i++){
				addProbabilityEvent(newProbabilities.get(i), newEvents.get(i));
			}
		}
		return foundPro;
	}
	
	/**
	 * 获取概率
	 * @return 概率
	 */
	public List<Integer> getProbabilities(){
		return probabilities;
	}
	
	/**
	 * 获取事件
	 * @return 事件
	 */
	public List<Object> getEvents(){
		return events;
	}

	public int getTotalKey() {
		return totalKey;
	}

	public void setTotalKey(int totalKey) {
		this.totalKey = totalKey;
	}

	public void setProbabilities(List<Integer> probabilities) {
		this.probabilities = probabilities;
	}

	public void setEvents(List<Object> events) {
		this.events = events;
	}

	@Override
	public String toString() {
		return "ProbabilityEventModel [probabilities=" + probabilities
				+ ", events=" + events + "]";
	}
	
	
}
