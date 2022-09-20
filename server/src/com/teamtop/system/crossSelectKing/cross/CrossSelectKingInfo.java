package com.teamtop.system.crossSelectKing.cross;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.util.db.trans.FieldOrder;
/**
 * 枭雄争霸比赛信息
 * @author jjjjyyy
 *
 */
public class CrossSelectKingInfo {
	/**
	 * 第几届
	 */
	@FieldOrder(order = 1)
	private int term;
	/**0未开始1开始中**/
	@FieldOrder(order = 2)
	private int state;
	/**
	 * 进场进度 1十六强2八强3四强4半决赛5决赛
	 */
	@FieldOrder(order = 3)
	private int proFlag;
	/**
	 * 进程的状态 1：准备阶段 2：战斗阶段
	 */
	@FieldOrder(order = 4)
	private int proState;
	/**
	 * 最后胜利的玩家冠亚军id，若本届没打完，则为上一届胜利玩家id
	 */
	@FieldOrder(order = 5)
	private Map<Integer, Map<Integer, Long>> winIdMap = new HashMap<Integer, Map<Integer, Long>>();
	
	public CrossSelectKingInfo() {
		super();
	}
	public int getTerm() {
		return term;
	}
	public void setTerm(int term) {
		this.term = term;
	}
	public int getProFlag() {
		return proFlag;
	}
	public void setProFlag(int proFlag) {
		this.proFlag = proFlag;
	}
	public int getProState() {
		return proState;
	}
	public void setProState(int proState) {
		this.proState = proState;
	}
	public Map<Integer, Map<Integer, Long>> getWinIdMap() {
		return winIdMap;
	}
	public void setWinIdMap(Map<Integer, Map<Integer, Long>> winIdMap) {
		this.winIdMap = winIdMap;
	}
	public int getState() {
		return state;
	}
	public void setState(int state) {
		this.state = state;
	}
	
	
	
}
