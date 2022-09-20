package com.teamtop.system.shaozhuEscort.model;

import java.util.ArrayList;

public class ShaoZhuEscort {
	private long hid;

	/** 雇佣的武将id **/
	private int escortWuJiang;

	/** 刷新武将阈值 **/
	private int refleshThreshold;

	/** 单次被拦截次数 **/
	private int interceptedTimes;

	/** 护送次数 */
	private int escortTimes;

	/** 拦截次数 */
	private int interceptTimes;

	/** 到达时间 */
	private int reachTime;
	/** 护送状态：0：没护送，1：护送中，2：护送完成 */
	private int state;

	/** 被打记录 */
	private ArrayList<ShaoZhuEscortRecord> recordList;
	/** 战报红点状态 0：:玩家打开过界面，红点不出来，1：:有红点 */
	private int battleRecordRedPointState;

	public long getHid() {
		return hid;
	}

	public int getEscortWuJiang() {
		return escortWuJiang;
	}

	public void setEscortWuJiang(int escortWuJiang) {
		this.escortWuJiang = escortWuJiang;
	}

	public int getEscortTimes() {
		return escortTimes;
	}

	public int getInterceptTimes() {
		return interceptTimes;
	}

	public ArrayList<ShaoZhuEscortRecord> getRecordList() {
		return recordList;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

	public void setEscortTimes(int escortTimes) {
		this.escortTimes = escortTimes;
	}

	public void setInterceptTimes(int interceptTimes) {
		this.interceptTimes = interceptTimes;
	}

	public void setRecordList(ArrayList<ShaoZhuEscortRecord> recordList) {
		this.recordList = recordList;
	}

	public int getReachTime() {
		return reachTime;
	}

	public void setReachTime(int reachTime) {
		this.reachTime = reachTime;
	}

	public int getState() {
		return state;
	}

	public void setState(int state) {
		this.state = state;
	}

	public int getInterceptedTimes() {
		return interceptedTimes;
	}

	public void setInterceptedTimes(int interceptedTimes) {
		this.interceptedTimes = interceptedTimes;
	}

	public int getRefleshThreshold() {
		return refleshThreshold;
	}

	public void setRefleshThreshold(int refleshThreshold) {
		this.refleshThreshold = refleshThreshold;
	}

	public int getBattleRecordRedPointState() {
		return battleRecordRedPointState;
	}

	public void setBattleRecordRedPointState(int battleRecordRedPointState) {
		this.battleRecordRedPointState = battleRecordRedPointState;
	}

}
