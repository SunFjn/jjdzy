package com.teamtop.system.activity.ativitys.arenaFight.model;

import java.util.ArrayList;
import java.util.List;

import com.teamtop.system.activity.model.ActivityData;

public class ArenaFightModel extends ActivityData {

	public ArenaFightModel() {
		// TODO Auto-generated constructor stub
	}

	public ArenaFightModel(long hid, int indexId, int actId, int periods) {
		super(hid, indexId, actId, periods);
	}

	/**
	 * 所属擂台id
	 */
	private int arenaId;

	/**
	 * 类型1：擂主，2：协助
	 */
	private int type;

	/**
	 * 协助位置
	 */
	private int site;

	/**
	 * 战报
	 */
	private List<ArenaNoticeInfo> noticeList = new ArrayList<>();

	/**
	 * 挑战CD
	 */
	private int cdEndTime;

	/**
	 * 记录日期时间
	 */
	private int dayTime;

	/**
	 * 对应哪个时间点的擂台
	 */
	private int myOpstate;

	public int getArenaId() {
		return arenaId;
	}

	public void setArenaId(int arenaId) {
		this.arenaId = arenaId;
	}

	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}

	public List<ArenaNoticeInfo> getNoticeList() {
		return noticeList;
	}

	public void setNoticeList(List<ArenaNoticeInfo> noticeList) {
		this.noticeList = noticeList;
	}

	public int getSite() {
		return site;
	}

	public void setSite(int site) {
		this.site = site;
	}

	public int getCdEndTime() {
		return cdEndTime;
	}

	public void setCdEndTime(int cdEndTime) {
		this.cdEndTime = cdEndTime;
	}

	public int getDayTime() {
		return dayTime;
	}

	public void setDayTime(int dayTime) {
		this.dayTime = dayTime;
	}

	public int getMyOpstate() {
		return myOpstate;
	}

	public void setMyOpstate(int myOpstate) {
		this.myOpstate = myOpstate;
	}

}
