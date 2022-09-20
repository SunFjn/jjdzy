package com.teamtop.util.ProbabilityEvent;

import java.util.ArrayList;
import java.util.List;

/**
 * 概率事件工厂类
 * @author KyleCheng
 *
 */
public class ProbabilityEventFactory {

	/**
	 * 获取概率事件对象
	 * @return 概率事件对象
	 */
	public static ProbabilityEventModel getProbabilityEvent(){
		return new ProbabilityEventModel();
	}
	
	/**
	 * 获取copy的概率事件对象
	 * @param oriModel 原始时间对象
	 * @return 概率事件对象
	 */
	public static ProbabilityEventModel getProbabilityEventCopy(ProbabilityEventModel oriModel){
		ProbabilityEventModel copyModel = new ProbabilityEventModel();
		List<Object> oriEvents = oriModel.getEvents();
		List<Object> copyEvents = new ArrayList<Object>();
		copyEvents.addAll(oriEvents);
		List<Integer> oriProbabilities = oriModel.getProbabilities();
		List<Integer> copyProbabilities = new ArrayList<Integer>();
		copyProbabilities.addAll(oriProbabilities);
		
		copyModel.setTotalKey(oriModel.getTotalKey());
		copyModel.setEvents(copyEvents);
		copyModel.setProbabilities(copyProbabilities);
		return copyModel;
	}
}
