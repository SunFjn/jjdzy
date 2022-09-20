package com.teamtop.houtaiHttp.events.activityHandle;

/**
 * 日常活动状态
 * @author hepl
 *
 */
public class M_Activity {
	//小龟赛跑状态，0：关闭，1：准备，2：开启
	private HoutaiActivity turtleRaceState;
	//兔子挖萝卜状态，0关闭，1开启
	private HoutaiActivity rabbitState;
	//群雄逐鹿状态，1准备，2开启，4结束
	private HoutaiActivity competeHegeState;
	//上午世界BOSS状态，0关闭，1预备，2开启
	private HoutaiActivity worldBossState;
	//下午世界BOSS状态，0关闭，1预备，2开启
	private HoutaiActivity worldBossStateSecond;
	//钓鱼活动状态，0关闭，1开启
	private HoutaiActivity fishState;
	//真假石破天状态，0关闭，1开启
	private HoutaiActivity shiPoTianState;
	//反恐精英状态，0关闭，1准备，2开启
	private HoutaiActivity csState;
	//帮会竞技状态，1准备，2开启，3关闭
	private HoutaiActivity gangCompetitionState;
	//跑镖活动状态，0关闭，1开启
	private HoutaiActivity transportState;
	//奔跑兄弟状态，1准备，2开启，3关闭
	private HoutaiActivity runningManState;
	//跨服龙舟状态
	private HoutaiActivity dragonBoatState;
	
	public HoutaiActivity getTurtleRaceState() {
		return turtleRaceState;
	}
	public void setTurtleRaceState(HoutaiActivity turtleRaceState) {
		this.turtleRaceState = turtleRaceState;
	}
	public HoutaiActivity getRabbitState() {
		return rabbitState;
	}
	public void setRabbitState(HoutaiActivity rabbitState) {
		this.rabbitState = rabbitState;
	}
	public HoutaiActivity getCompeteHegeState() {
		return competeHegeState;
	}
	public void setCompeteHegeState(HoutaiActivity competeHegeState) {
		this.competeHegeState = competeHegeState;
	}
	public HoutaiActivity getWorldBossState() {
		return worldBossState;
	}
	public void setWorldBossState(HoutaiActivity worldBossState) {
		this.worldBossState = worldBossState;
	}
	public HoutaiActivity getWorldBossStateSecond() {
		return worldBossStateSecond;
	}
	public void setWorldBossStateSecond(HoutaiActivity worldBossStateSecond) {
		this.worldBossStateSecond = worldBossStateSecond;
	}
	public HoutaiActivity getFishState() {
		return fishState;
	}
	public void setFishState(HoutaiActivity fishState) {
		this.fishState = fishState;
	}
	public HoutaiActivity getShiPoTianState() {
		return shiPoTianState;
	}
	public void setShiPoTianState(HoutaiActivity shiPoTianState) {
		this.shiPoTianState = shiPoTianState;
	}
	public HoutaiActivity getCsState() {
		return csState;
	}
	public void setCsState(HoutaiActivity csState) {
		this.csState = csState;
	}
	public HoutaiActivity getGangCompetitionState() {
		return gangCompetitionState;
	}
	public void setGangCompetitionState(HoutaiActivity gangCompetitionState) {
		this.gangCompetitionState = gangCompetitionState;
	}
	public HoutaiActivity getTransportState() {
		return transportState;
	}
	public void setTransportState(HoutaiActivity transportState) {
		this.transportState = transportState;
	}
	public HoutaiActivity getRunningManState() {
		return runningManState;
	}
	public void setRunningManState(HoutaiActivity runningManState) {
		this.runningManState = runningManState;
	}
	public HoutaiActivity getDragonBoatState() {
		return dragonBoatState;
	}
	public void setDragonBoatState(HoutaiActivity dragonBoatState) {
		this.dragonBoatState = dragonBoatState;
	}
}
