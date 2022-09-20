package com.teamtop.system.threeHeroFightLvBu.model;

import java.util.concurrent.ConcurrentHashMap;

public class TeamChaInfo {
	/**
	 * 队伍id
	 */
	private int teamId;

	/**
	 * 当前关卡
	 */
	private int guanqia;

	/**
	 * 队员个人挑战信息
	 */
	private ConcurrentHashMap<Long, PersonalChaInfo> memberChaMap = new ConcurrentHashMap<>();

	/**
	 * 已操作复活的玩家id
	 */
	private long reliveOpHid;

	/**
	 * 已操作复活的玩家名
	 */
	private String opName;

	/**
	 * 在挑战的boss
	 */
	private ThreeHeroFightLvBuBoss boss;

	/**
	 * 地图唯一id
	 */
	private int sceneUnitId;

	/**
	 * 场景id
	 */
	private int sceneId;

	/**
	 * 已复活次数
	 */
	private int reliveNum;
	
	private boolean goNext;

	public TeamChaInfo() {
		// TODO Auto-generated constructor stub
	}

	public TeamChaInfo(int teamId, int guanqia, long reliveOpHid,
			ThreeHeroFightLvBuBoss boss) {
		super();
		this.teamId = teamId;
		this.guanqia = guanqia;
		this.reliveOpHid = reliveOpHid;
		this.boss = boss;
	}

	public int getTeamId() {
		return teamId;
	}

	public void setTeamId(int teamId) {
		this.teamId = teamId;
	}

	public int getGuanqia() {
		return guanqia;
	}

	public void setGuanqia(int guanqia) {
		this.guanqia = guanqia;
	}

	public ConcurrentHashMap<Long, PersonalChaInfo> getMemberChaMap() {
		return memberChaMap;
	}

	public void setMemberChaMap(ConcurrentHashMap<Long, PersonalChaInfo> memberChaMap) {
		this.memberChaMap = memberChaMap;
	}

	public long getReliveOpHid() {
		return reliveOpHid;
	}

	public void setReliveOpHid(long reliveOpHid) {
		this.reliveOpHid = reliveOpHid;
	}

	public String getOpName() {
		return opName;
	}

	public void setOpName(String opName) {
		this.opName = opName;
	}

	public ThreeHeroFightLvBuBoss getBoss() {
		return boss;
	}

	public void setBoss(ThreeHeroFightLvBuBoss boss) {
		this.boss = boss;
	}

	public int getSceneUnitId() {
		return sceneUnitId;
	}

	public void setSceneUnitId(int sceneUnitId) {
		this.sceneUnitId = sceneUnitId;
	}

	public int getSceneId() {
		return sceneId;
	}

	public void setSceneId(int sceneId) {
		this.sceneId = sceneId;
	}

	public int getReliveNum() {
		return reliveNum;
	}

	public void setReliveNum(int reliveNum) {
		this.reliveNum = reliveNum;
	}

	public boolean isGoNext() {
		return goNext;
	}

	public void setGoNext(boolean goNext) {
		this.goNext = goNext;
	}

}
