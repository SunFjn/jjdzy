package com.teamtop.system.activity.ativitys.caoCaoCome;

import com.teamtop.system.hero.FinalFightAttr;
/**
 * 曹操
 * @author jjjjyyy
 *
 */
public class CaoCaoBoss {
	/**
	 * 当前bossid:
	 */
	private  int bossId;
	/**
	 * hpmax
	 */
	private long hpmax;
	/**
	 * 当前气血
	 */
	private long curhp;
	/**
	 * 战斗属性
	 */
	private FinalFightAttr attr;
	/**
	 * 增加玩家的伤害buff
	 */
	private int addAttBuffIndex;
	
	
	
	public CaoCaoBoss() {
		super();
	}
	public CaoCaoBoss(int bossId, long hpmax, long curhp, FinalFightAttr attr) {
		super();
		this.bossId = bossId;
		this.hpmax = hpmax;
		this.curhp = curhp;
		this.attr = attr;
	}


	public int getBossId() {
		return bossId;
	}
	public void setBossId(int bossId) {
		this.bossId = bossId;
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
	public FinalFightAttr getAttr() {
		return attr;
	}
	public void setAttr(FinalFightAttr attr) {
		this.attr = attr;
	}
	public int getAddAttBuffIndex() {
		return addAttBuffIndex;
	}
	public void setAddAttBuffIndex(int addAttBuffIndex) {
		this.addAttBuffIndex = addAttBuffIndex;
	}

}
