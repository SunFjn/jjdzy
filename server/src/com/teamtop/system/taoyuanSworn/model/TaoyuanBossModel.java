package com.teamtop.system.taoyuanSworn.model;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import com.teamtop.util.db.trans.FieldOrder;

public class TaoyuanBossModel {
	/**
	 * bossid
	 */
	@FieldOrder(order = 1)
	private int bossId;
	/**
	 * 桃园结义id
	 */
	@FieldOrder(order = 2)
	private long taoyuanSwornId;
	/**
	 * hpmax
	 */
	@FieldOrder(order = 3)
	private double hpmax;
	/**
	 * 当前气血
	 */
	@FieldOrder(order = 4)
	private double curhp;
	/**
	 * 场景中的玩家
	 */
	private List<Long> inHeros=Collections.synchronizedList(new ArrayList<Long>());
	/**
	 * 战斗伤害
	 */
	private List<TaoyuanBossDamgModel> damgList = Collections.synchronizedList(new ArrayList<TaoyuanBossDamgModel>());
	
	public TaoyuanBossModel() {
		super();
	}




	public int getBossId() {
		return bossId;
	}




	public void setBossId(int bossId) {
		this.bossId = bossId;
	}




	public long getTaoyuanSwornId() {
		return taoyuanSwornId;
	}




	public void setTaoyuanSwornId(long taoyuanSwornId) {
		this.taoyuanSwornId = taoyuanSwornId;
	}




	public double getHpmax() {
		return hpmax;
	}




	public void setHpmax(double hpmax) {
		this.hpmax = hpmax;
	}




	public double getCurhp() {
		return curhp;
	}




	public void setCurhp(double curhp) {
		this.curhp = curhp;
	}




	public List<Long> getInHeros() {
		return inHeros;
	}




	public void setInHeros(List<Long> inHeros) {
		this.inHeros = inHeros;
	}




	public List<TaoyuanBossDamgModel> getDamgList() {
		return damgList;
	}




	public void setDamgList(List<TaoyuanBossDamgModel> damgList) {
		this.damgList = damgList;
	}

 

}
