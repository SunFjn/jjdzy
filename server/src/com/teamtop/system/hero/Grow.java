package com.teamtop.system.hero;

/**
 * 角色或者侠客的成长属性，取表的数据
 * @author hepl
 *
 */
public class Grow {
	/**气血上限*/
	private int hpMax;
	/**内力 */
	private int mp;
	/**攻击*/
	private int att;
	/**物防*/
	private int def;
	/**法防*/
	private int res;
	/**暴击*/
	private int critical;
	/**伤害减免*/
	private int damgRedu;
	/**伤害加成*/
	private int damgAdd;
	/**暴击伤害*/
	private int critDamg;
	/**抗暴*/
	private int resistCrit;
	/**移动速度*/
	private int moveSpeed;
	public int getHpMax() {
		return hpMax;
	}
	public void setHpMax(int hpMax) {
		this.hpMax = hpMax;
	}
	public int getMp() {
		return mp;
	}
	public void setMp(int mp) {
		this.mp = mp;
	}
	public int getAtt() {
		return att;
	}
	public void setAtt(int att) {
		this.att = att;
	}
	public int getDef() {
		return def;
	}
	public void setDef(int def) {
		this.def = def;
	}
	public int getRes() {
		return res;
	}
	public void setRes(int res) {
		this.res = res;
	}
	public int getCritical() {
		return critical;
	}
	public void setCritical(int critical) {
		this.critical = critical;
	}
	public int getDamgRedu() {
		return damgRedu;
	}
	public void setDamgRedu(int damgRedu) {
		this.damgRedu = damgRedu;
	}
	public int getDamgAdd() {
		return damgAdd;
	}
	public void setDamgAdd(int damgAdd) {
		this.damgAdd = damgAdd;
	}
	public int getCritDamg() {
		return critDamg;
	}
	public void setCritDamg(int critDamg) {
		this.critDamg = critDamg;
	}
	public int getResistCrit() {
		return resistCrit;
	}
	public void setResistCrit(int resistCrit) {
		this.resistCrit = resistCrit;
	}
	public int getMoveSpeed() {
		return moveSpeed;
	}
	public void setMoveSpeed(int moveSpeed) {
		this.moveSpeed = moveSpeed;
	}
	public Grow(int hpMax, int mp, int att, int def, int res, int critical, int damgRedu, int damgAdd, int critDamg, int resistCrit, int moveSpeed) {
		super();
		this.hpMax = hpMax;
		this.mp = mp;
		this.att = att;
		this.def = def;
		this.res = res;
		this.critical = critical;
		this.damgRedu = damgRedu;
		this.damgAdd = damgAdd;
		this.critDamg = critDamg;
		this.resistCrit = resistCrit;
		this.moveSpeed = moveSpeed;
	}
}