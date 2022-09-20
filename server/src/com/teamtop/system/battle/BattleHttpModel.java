package com.teamtop.system.battle;

import java.util.List;

/**
 * 战斗请求http获得战斗结果的model
 * @author Administrator
 *
 */
public class BattleHttpModel {
	private BattleHttpSide left;
	private BattleHttpSide right;
	private int randomseed;
	public BattleHttpSide getLeft() {
		return left;
	}
	public void setLeft(BattleHttpSide left) {
		this.left = left;
	}
	public BattleHttpSide getRight() {
		return right;
	}
	public void setRight(BattleHttpSide right) {
		this.right = right;
	}
	public int getRandomseed() {
		return randomseed;
	}
	public void setRandomseed(int randomseed) {
		this.randomseed = randomseed;
	}
}

/**
 * PVE战斗请求http获得战斗结果的model
 * @author hepl
 *
 */
class BattlePVEHttpModel{
	private BattleHttpSide player;
	private List<Integer> npcs;
	private int randomseed;
	
	public BattleHttpSide getPlayer() {
		return player;
	}
	public void setPlayer(BattleHttpSide player) {
		this.player = player;
	}
	public List<Integer> getNpcs() {
		return npcs;
	}
	public void setNpcs(List<Integer> npcs) {
		this.npcs = npcs;
	}
	public int getRandomseed() {
		return randomseed;
	}
	public void setRandomseed(int randomseed) {
		this.randomseed = randomseed;
	}
}

class BattleHttpSide{
	private long id;
	private String name;
	private int level;
	private int sb;
	private long str;
	private int zs;
	
	public BattleHttpSide(long id, String name, int level, int sb, long str, int zs) {
		super();
		this.id = id;
		this.name = name;
		this.level = level;
		this.sb = sb;
		this.str = str;
		this.zs = zs;
	}
	private List<BattleHttpAttr> roleList;
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getLevel() {
		return level;
	}
	public void setLevel(int level) {
		this.level = level;
	}
	public int getSb() {
		return sb;
	}
	public void setSb(int sb) {
		this.sb = sb;
	}
	
	public long getStr() {
		return str;
	}
	public void setStr(long str) {
		this.str = str;
	}
	public int getZs() {
		return zs;
	}
	public void setZs(int zs) {
		this.zs = zs;
	}
	public List<BattleHttpAttr> getRoleList() {
		return roleList;
	}
	public void setRoleList(List<BattleHttpAttr> roleList) {
		this.roleList = roleList;
	}
	
}

class BattleHttpAttr{
	
	public BattleHttpAttr(long id, int job, int sblv, long hp, long att, long def, int critical, int resistCrit,
			int hit, int evade, int damage, int criticalRate, int resistCritRate, int hitRate, int evadeRate,
			int criticalDamageAdd, int criticalDamageDerate, int damageAdd, int damageDerate, int fireDamage,
			int frozenDamage, int poisonDamage, int electricDamage, int boomDamage, int fireRes, int frozenRes,
			int poisonRes, int electricRes, int boomRes, long str, List<BattleHttpSkill> skillList) {
		super();
		this.id = id;
		this.job = job;
		this.sblv = sblv;
		this.hp = hp;
		this.att = att;
		this.def = def;
		this.critical = critical;
		this.resistCrit = resistCrit;
		this.hit = hit;
		this.evade = evade;
		this.damage = damage;
		this.criticalRate = criticalRate;
		this.resistCritRate = resistCritRate;
		this.hitRate = hitRate;
		this.evadeRate = evadeRate;
		this.criticalDamageAdd = criticalDamageAdd;
		this.criticalDamageDerate = criticalDamageDerate;
		this.damageAdd = damageAdd;
		this.damageDerate = damageDerate;
		this.fireDamage = fireDamage;
		this.frozenDamage = frozenDamage;
		this.poisonDamage = poisonDamage;
		this.electricDamage = electricDamage;
		this.boomDamage = boomDamage;
		this.fireRes = fireRes;
		this.frozenRes = frozenRes;
		this.poisonRes = poisonRes;
		this.electricRes = electricRes;
		this.boomRes = boomRes;
		this.str = str;
		this.skillList = skillList;
	}
	private long id;
	private int job;
	private int sblv;
	private long hp;
	private long att;
	private long def;
	private int critical;
	private int resistCrit;
	private int hit;
	private int evade;
	private int damage;
	private int criticalRate;
	private int resistCritRate;
	private int hitRate;
	private int evadeRate;
	private int criticalDamageAdd;
	private int criticalDamageDerate;
	private int damageAdd;
	private int damageDerate;
	private int fireDamage;
	private int frozenDamage;
	private int poisonDamage;
	private int electricDamage;
	private int boomDamage;
	private int fireRes;
	private int frozenRes;
	private int poisonRes;
	private int electricRes;
	private int boomRes;
	private long str;
	List<BattleHttpSkill> skillList;
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public int getJob() {
		return job;
	}
	public void setJob(int job) {
		this.job = job;
	}
	public int getSblv() {
		return sblv;
	}
	public void setSblv(int sblv) {
		this.sblv = sblv;
	}
	public long getHp() {
		return hp;
	}
	public void setHp(long hp) {
		this.hp = hp;
	}
	public long getAtt() {
		return att;
	}
	public void setAtt(long att) {
		this.att = att;
	}
	public long getDef() {
		return def;
	}
	public void setDef(long def) {
		this.def = def;
	}
	public int getCritical() {
		return critical;
	}
	public void setCritical(int critical) {
		this.critical = critical;
	}
	public int getResistCrit() {
		return resistCrit;
	}
	public void setResistCrit(int resistCrit) {
		this.resistCrit = resistCrit;
	}
	public int getHit() {
		return hit;
	}
	public void setHit(int hit) {
		this.hit = hit;
	}
	public int getEvade() {
		return evade;
	}
	public void setEvade(int evade) {
		this.evade = evade;
	}
	public int getDamage() {
		return damage;
	}
	public void setDamage(int damage) {
		this.damage = damage;
	}
	public int getCriticalRate() {
		return criticalRate;
	}
	public void setCriticalRate(int criticalRate) {
		this.criticalRate = criticalRate;
	}
	public int getResistCritRate() {
		return resistCritRate;
	}
	public void setResistCritRate(int resistCritRate) {
		this.resistCritRate = resistCritRate;
	}
	public int getHitRate() {
		return hitRate;
	}
	public void setHitRate(int hitRate) {
		this.hitRate = hitRate;
	}
	public int getEvadeRate() {
		return evadeRate;
	}
	public void setEvadeRate(int evadeRate) {
		this.evadeRate = evadeRate;
	}
	public int getCriticalDamageAdd() {
		return criticalDamageAdd;
	}
	public void setCriticalDamageAdd(int criticalDamageAdd) {
		this.criticalDamageAdd = criticalDamageAdd;
	}
	public int getCriticalDamageDerate() {
		return criticalDamageDerate;
	}
	public void setCriticalDamageDerate(int criticalDamageDerate) {
		this.criticalDamageDerate = criticalDamageDerate;
	}
	public int getDamageAdd() {
		return damageAdd;
	}
	public void setDamageAdd(int damageAdd) {
		this.damageAdd = damageAdd;
	}
	public int getDamageDerate() {
		return damageDerate;
	}
	public void setDamageDerate(int damageDerate) {
		this.damageDerate = damageDerate;
	}
	public int getFireDamage() {
		return fireDamage;
	}
	public void setFireDamage(int fireDamage) {
		this.fireDamage = fireDamage;
	}
	public int getFrozenDamage() {
		return frozenDamage;
	}
	public void setFrozenDamage(int frozenDamage) {
		this.frozenDamage = frozenDamage;
	}
	public int getPoisonDamage() {
		return poisonDamage;
	}
	public void setPoisonDamage(int poisonDamage) {
		this.poisonDamage = poisonDamage;
	}
	public int getElectricDamage() {
		return electricDamage;
	}
	public void setElectricDamage(int electricDamage) {
		this.electricDamage = electricDamage;
	}
	public int getBoomDamage() {
		return boomDamage;
	}
	public void setBoomDamage(int boomDamage) {
		this.boomDamage = boomDamage;
	}
	public int getFireRes() {
		return fireRes;
	}
	public void setFireRes(int fireRes) {
		this.fireRes = fireRes;
	}
	public int getFrozenRes() {
		return frozenRes;
	}
	public void setFrozenRes(int frozenRes) {
		this.frozenRes = frozenRes;
	}
	public int getPoisonRes() {
		return poisonRes;
	}
	public void setPoisonRes(int poisonRes) {
		this.poisonRes = poisonRes;
	}
	public int getElectricRes() {
		return electricRes;
	}
	public void setElectricRes(int electricRes) {
		this.electricRes = electricRes;
	}
	public int getBoomRes() {
		return boomRes;
	}
	public void setBoomRes(int boomRes) {
		this.boomRes = boomRes;
	}
	public long getStr() {
		return str;
	}
	public void setStr(long str) {
		this.str = str;
	}
	public List<BattleHttpSkill> getSkillList() {
		return skillList;
	}
	public void setSkillList(List<BattleHttpSkill> skillList) {
		this.skillList = skillList;
	} 
	
}

class BattleHttpSkill{
	
	public BattleHttpSkill(int lv, int jxlv) {
		super();
		this.lv = lv;
		this.jxlv = jxlv;
	}
	private int lv;
	private int jxlv;
	public int getLv() {
		return lv;
	}
	public void setLv(int lv) {
		this.lv = lv;
	}
	public int getJxlv() {
		return jxlv;
	}
	public void setJxlv(int jxlv) {
		this.jxlv = jxlv;
	} 
	
}