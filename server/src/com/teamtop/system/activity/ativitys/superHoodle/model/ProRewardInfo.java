package com.teamtop.system.activity.ativitys.superHoodle.model;

import java.util.ArrayList;
import java.util.List;

import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventUtil;

public class ProRewardInfo {

	/**
	 * 奖励表id
	 */
	private int id;

	/**
	 * 奖池
	 */
	private int pool;

	/**
	 * 权重*100
	 */
	private int pro;

	/**
	 * 随机事件
	 */
	private ProbabilityEventModel proModel;

	/**
	 * 奖池奖励数据
	 */
//	private int[][] reward;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getPool() {
		return pool;
	}

	public void setPool(int pool) {
		this.pool = pool;
	}

	public int getPro() {
		return pro;
	}

	public void setPro(int pro) {
		this.pro = pro;
	}

	public ProbabilityEventModel getProModel() {
		return proModel;
	}

	public void setProModel(ProbabilityEventModel proModel) {
		this.proModel = proModel;
	}

//	public int[][] getReward() {
//		return reward;
//	}
//
//	public void setReward(int[][] reward) {
//		this.reward = reward;
//	}

	public List<int[][]> getRandReward(int num) {
		List<int[][]> list = new ArrayList<int[][]>();
		if (pool == 5) {
			// ProbabilityEventModel model = ProbabilityEventFactory.getProbabilityEvent();
			// for(int[] arr:reward) {
			// model.addProbabilityEvent(arr[3], arr);
			// }
			List<Object> eList = ProbabilityEventUtil.getEventByProbabilityNotRemove(proModel, 3);
			for (Object obj : eList) {
				list.add((int[][]) obj);
			}
		} else {
			int[][] tools = (int[][]) ProbabilityEventUtil.getEventByProbability(proModel);
			list.add(tools);
		}
		return list;
	}

}
