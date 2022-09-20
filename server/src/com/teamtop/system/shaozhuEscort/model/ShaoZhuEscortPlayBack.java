package com.teamtop.system.shaozhuEscort.model;

import java.util.Map;

import com.teamtop.system.hero.FinalFightAttr;
import com.teamtop.system.skill.model.SkillInfo;
import com.teamtop.system.wujiang.WuJiang;
import com.teamtop.util.db.trans.FieldOrder;

/**
 * 少主护送录像缓存
 * 
 * @author jjjjyyy
 *
 */
public class ShaoZhuEscortPlayBack {
	@FieldOrder(order = 1)
	private long hid;
	@FieldOrder(order = 2)
	private String name;
	/** 雇佣的武将id **/
	@FieldOrder(order = 3)
	private int wujiangId;
	/*** 战力 */
	@FieldOrder(order = 4)
	private long strength;
	/** 战斗属性详细 **/
	@FieldOrder(order = 5)
	private FinalFightAttr finalFightAttr;
	/** 出战兽魂 */
	@FieldOrder(order = 6)
	private int figthMonsterSpirit;
	/** 头像 */
	@FieldOrder(order = 7)
	private int icon;
	/** 将衔 */
	@FieldOrder(order = 8)
	private int official;
	@FieldOrder(order = 9)
	private int job;
	/** 时装 */
	@FieldOrder(order = 10)
	private int bodyId;
	/** 武器模型 */
	@FieldOrder(order = 11)
	private int weaponModel;
	/** 技能数据 */
	@FieldOrder(order = 12)
	private Map<Integer, SkillInfo> skillMap;
	/** 武将 */
	@FieldOrder(order = 13)
	private WuJiang wujiang;

	public long getHid() {
		return hid;
	}

	public String getName() {
		return name;
	}

	public long getStrength() {
		return strength;
	}

	public FinalFightAttr getFinalFightAttr() {
		return finalFightAttr;
	}

	public int getFigthMonsterSpirit() {
		return figthMonsterSpirit;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setStrength(long strength) {
		this.strength = strength;
	}

	public void setFinalFightAttr(FinalFightAttr finalFightAttr) {
		this.finalFightAttr = finalFightAttr;
	}

	public void setFigthMonsterSpirit(int figthMonsterSpirit) {
		this.figthMonsterSpirit = figthMonsterSpirit;
	}

	public int getWujiangId() {
		return wujiangId;
	}

	public void setWujiangId(int wujiangId) {
		this.wujiangId = wujiangId;
	}

	public int getIcon() {
		return icon;
	}

	public void setIcon(int icon) {
		this.icon = icon;
	}

	public int getOfficial() {
		return official;
	}

	public void setOfficial(int official) {
		this.official = official;
	}

	public int getJob() {
		return job;
	}

	public void setJob(int job) {
		this.job = job;
	}

	public Map<Integer, SkillInfo> getSkillMap() {
		return skillMap;
	}

	public void setSkillMap(Map<Integer, SkillInfo> skillMap) {
		this.skillMap = skillMap;
	}

	public int getBodyId() {
		return bodyId;
	}

	public int getWeaponModel() {
		return weaponModel;
	}

	public WuJiang getWujiang() {
		return wujiang;
	}

	public void setBodyId(int bodyId) {
		this.bodyId = bodyId;
	}

	public void setWeaponModel(int weaponModel) {
		this.weaponModel = weaponModel;
	}

	public void setWujiang(WuJiang wujiang) {
		this.wujiang = wujiang;
	}

}
