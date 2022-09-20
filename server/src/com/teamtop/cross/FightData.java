package com.teamtop.cross;

import com.teamtop.system.hero.FinalFightAttr;
import com.teamtop.util.db.trans.FieldOrder;
/**
 * 战力数据
 * @author Administrator
 *
 */
public class FightData {
	@FieldOrder(order = 1)
	private FinalFightAttr finalFightAttr;
	@FieldOrder(order = 2)
	private int strength;
	public FinalFightAttr getFinalFightAttr() {
		return finalFightAttr;
	}
	public void setFinalFightAttr(FinalFightAttr finalFightAttr) {
		this.finalFightAttr = finalFightAttr;
	}
	public int getStrength() {
		return strength;
	}
	public void setStrength(int strength) {
		this.strength = strength;
	}
	public FightData(FinalFightAttr finalFightAttr, int strength) {
		super();
		this.finalFightAttr = finalFightAttr;
		this.strength = strength;
	}
	public FightData() {
		super();
	}
	
}
