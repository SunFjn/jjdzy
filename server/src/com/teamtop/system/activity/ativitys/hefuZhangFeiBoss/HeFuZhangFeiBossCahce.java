package com.teamtop.system.activity.ativitys.hefuZhangFeiBoss;

import java.util.ArrayList;
import java.util.List;

/**
 * boss信息
 * @author jjjjyyy
 *
 */
public class HeFuZhangFeiBossCahce {
	/**
	 * 0未开启 1开启中 2已被击杀
	 */
	private int bossType;
	/**
	 * 当前bossid
	 */
	private int bossid;
	/**
	 * 当前醉意
	 */
	private int zuiyiNum;
	/**
	 * hpmax
	 */
	private long hpmax;
	/**
	 * 当前气血
	 */
	private long curhp;
	/**
	 * 敬酒者
	 */
	private List<HeFuZhangFeiJoiner> joiners=new ArrayList<>();
	/**
	 * 击杀者
	 */
	private long skillid;
	
	public HeFuZhangFeiBossCahce() {
		super();
	}
	
	
	public int getBossType() {
		return bossType;
	}
	public void setBossType(int bossType) {
		this.bossType = bossType;
	}
	public int getBossid() {
		return bossid;
	}
	public void setBossid(int bossid) {
		this.bossid = bossid;
	}
	public int getZuiyiNum() {
		return zuiyiNum;
	}
	public void setZuiyiNum(int zuiyiNum) {
		this.zuiyiNum = zuiyiNum;
	}
	public long getHpmax() {
		return hpmax;
	}
	public void setHpmax(long hpmax) {
		this.hpmax = hpmax;
	}
	public long getCurhp() {
		return curhp;
	}
	public void setCurhp(long curhp) {
		this.curhp = curhp;
	}
	public List<HeFuZhangFeiJoiner> getJoiners() {
		return joiners;
	}
	public void setJoiners(List<HeFuZhangFeiJoiner> joiners) {
		this.joiners = joiners;
	}


	public long getSkillid() {
		return skillid;
	}


	public void setSkillid(long skillid) {
		this.skillid = skillid;
	}
	
	
	

}
