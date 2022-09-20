package com.teamtop.system.hero;

import com.teamtop.util.db.trans.FieldOrder;

/**
 * 最终的战斗属性，保存角色最终战斗属性
 *
 */
public class FinalFightAttr {
	/**当前气血*/
	@FieldOrder(order = 1)
	private long hp;
	/**气血上限*/
	@FieldOrder(order = 2)
	private long hpMax;
	/**攻击*/
	@FieldOrder(order = 3)
	private long att;
	/**防御*/
	@FieldOrder(order = 4)
	private long def;
	/**暴击*/
	@FieldOrder(order = 5)
	private int critical;
	/**抗暴*/
	@FieldOrder(order = 6)
	private int resistCrit;
	/**命中*/
	@FieldOrder(order = 7)
	private int hit;
	/**闪避*/
	@FieldOrder(order = 8)
	private int evade;
	/**真实伤害*/
	@FieldOrder(order = 9)
	private int damage;
	/**暴击率*/
	@FieldOrder(order = 10)
	private int criticalRate;
	/**抗暴率*/
	@FieldOrder(order = 11)
	private int resistCritRate;
	/**命中率*/
	@FieldOrder(order = 12)
	private int hitRate;
	/**闪避率*/
	@FieldOrder(order = 13)
	private int evadeRate;
	/**暴伤加成*/
	@FieldOrder(order = 14)
	private int criticalDamageAdd;
	/**暴伤减免*/
	@FieldOrder(order = 15)
	private int criticalDamageDerate;
	/**伤害加成*/
	@FieldOrder(order = 16)
	private int damageAdd;
	/**伤害减免*/
	@FieldOrder(order = 17)
	private int damageDerate;
	/**火焰伤害*/
	@FieldOrder(order = 18)
	private int fireDamage;
	/**冰冻伤害*/
	@FieldOrder(order = 19)
	private int frozenDamage;
	/**毒液伤害*/
	@FieldOrder(order = 20)
	private int poisonDamage;
	/**电击伤害*/
	@FieldOrder(order = 21)
	private int electricDamage;
	/**爆炸伤害*/
	@FieldOrder(order = 22)
	private int boomDamage;
	/**火焰抗性*/
	@FieldOrder(order = 23)
	private int fireRes;
	/**冰冻抗性*/
	@FieldOrder(order = 24)
	private int frozenRes;
	/**毒液抗性*/
	@FieldOrder(order = 25)
	private int poisonRes;
	/**电击抗性*/
	@FieldOrder(order = 26)
	private int electricRes;
	/**爆炸抗性*/
	@FieldOrder(order = 27)
	private int boomRes;
	/**战力*/
	@FieldOrder(order = 28)
	private long strength;
	/**附加的战斗力*/
	@FieldOrder(order = 29)
	private int appendStrength;
	/** 唯一id，第一个跟hid相同*/
	@FieldOrder(order = 30)
	private long uid;
	/**武将品质*/
	@FieldOrder(order = 31)
	private int type;
	/**武将星级*/
	@FieldOrder(order = 32)
	private int star;
	/**PVP伤害加成*/
	@FieldOrder(order = 33)
	private int pvpAddHurt;
	/**PVP伤害减免*/
	@FieldOrder(order = 34)
	private int pvpMinuteHurt;
	/**PVE伤害加成*/
	@FieldOrder(order = 36)	
	private int  pveAddHurt;
	/**元素伤害加成*/
	@FieldOrder(order = 37)	
	private int elementAddHurt;
	/**元素伤害减免*/
	@FieldOrder(order = 38)	
	private int elementMinuteHurt;
	/**产生自身生命百分比护盾*/
	@FieldOrder(order = 39)	
	private int hudunAdd;
	/**生命护盾*/
	@FieldOrder(order = 40)	
	private long hudun;
	/**生命护盾最大值*/
	@FieldOrder(order = 41)	
	private long hudunMax;
	/**血气爆炸*/
	@FieldOrder(order = 42)	
	private int hpHurt;
	/**少主品质秒伤基础值**/
	@FieldOrder(order = 43)	
	private int littleLeaderBase;
	/**少主品质秒伤提升值**/
	@FieldOrder(order = 44)	
	private int littleLeaderAdd;
	/**少主主动技能等级**/
	@FieldOrder(order = 45)	
	private int littleLeaderSkillLv;
	/**少主星级**/
	@FieldOrder(order = 46)	
	private int littleLeaderStarLv;
	/**PVE伤害减免**/
	@FieldOrder(order = 47)	
	private int  pveMinuteHurt;
	/**每次攻击回复怒气**/
	@FieldOrder(order = 48)
	private int attBackAnger;
	/**宝物和天数CD时间减少*/
	@FieldOrder(order = 49)
	private int cdCutDown;
	/**宝物治疗效果提升*/
	@FieldOrder(order = 50)
	private int cureEffect;
	/**被控时间减少*/
	@FieldOrder(order = 51)
	private int beControlTimeCutDown;
	/**降低敌方对自己的技能伤害*/
	@FieldOrder(order = 52)
	private int lowerDamage;
	/**降低敌方治疗效果*/
	@FieldOrder(order = 53)
	private int lowerCureEffect;
	/**增加少主技能伤害百分比*/
	@FieldOrder(order = 54)
	private int szAttDamageAdd;
	/**增加技能伤害百分比*/
	@FieldOrder(order = 55)
	private int attDamageAdd;
	/**额外伤害百分*/
	@FieldOrder(order = 56)
	private int extDamage;
	
	
	public long getHp() {
		return hp;
	}
	public void setHp(long hp) {
		this.hp = hp;
	}
	public long getHpMax() {
		return hpMax;
	}
	public void setHpMax(long hpMax) {
		this.hpMax = hpMax;
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
	public long getStrength() {
		return strength;
	}
	public void setStrength(long strength) {
		this.strength = strength;
	}
	public int getAppendStrength() {
		return appendStrength;
	}
	public void setAppendStrength(int appendStrength) {
		this.appendStrength = appendStrength;
	}
	public long getUid() {
		return uid;
	}
	public void setUid(long uid) {
		this.uid = uid;
	}
	public int getType() {
		return type;
	}
	public void setType(int type) {
		this.type = type;
	}
	public int getStar() {
		return star;
	}
	public void setStar(int star) {
		this.star = star;
	}
	public int getPvpAddHurt() {
		return pvpAddHurt;
	}
	public void setPvpAddHurt(int pvpAddHurt) {
		this.pvpAddHurt = pvpAddHurt;
	}
	public int getPvpMinuteHurt() {
		return pvpMinuteHurt;
	}
	public void setPvpMinuteHurt(int pvpMinuteHurt) {
		this.pvpMinuteHurt = pvpMinuteHurt;
	}
	public int getPveAddHurt() {
		return pveAddHurt;
	}
	public void setPveAddHurt(int pveAddHurt) {
		this.pveAddHurt = pveAddHurt;
	}
	public int getElementAddHurt() {
		return elementAddHurt;
	}
	public void setElementAddHurt(int elementAddHurt) {
		this.elementAddHurt = elementAddHurt;
	}
	public int getElementMinuteHurt() {
		return elementMinuteHurt;
	}
	public void setElementMinuteHurt(int elementMinuteHurt) {
		this.elementMinuteHurt = elementMinuteHurt;
	}
	public long getHudun() {
		if (hudunMax==0) {
			//护盾最大值为0  没有初始化过护盾
			long num=(long)(hpMax* (hudunAdd/100000d));
			hudunMax=num;
			hudun=num;
		}
		return hudun;
	}
	public void setHudun(long hudun) {
		this.hudun = hudun;
	}
	public long getHudunMax() {
		return hudunMax;
	}
	public void setHudunMax(long hudunMax) {
		this.hudunMax = hudunMax;
	}
	public int getHpHurt() {
		return hpHurt;
	}
	public void setHpHurt(int hpHurt) {
		this.hpHurt = hpHurt;
	}
	public int getHudunAdd() {
		return hudunAdd;
	}
	public void setHudunAdd(int hudunAdd) {
		this.hudunAdd = hudunAdd;
	}
	public int getLittleLeaderBase() {
		return littleLeaderBase;
	}
	public void setLittleLeaderBase(int littleLeaderBase) {
		this.littleLeaderBase = littleLeaderBase;
	}
	public int getLittleLeaderAdd() {
		return littleLeaderAdd;
	}
	public void setLittleLeaderAdd(int littleLeaderAdd) {
		this.littleLeaderAdd = littleLeaderAdd;
	}
	public int getLittleLeaderSkillLv() {
		return littleLeaderSkillLv;
	}
	public void setLittleLeaderSkillLv(int littleLeaderSkillLv) {
		this.littleLeaderSkillLv = littleLeaderSkillLv;
	}
	public int getLittleLeaderStarLv() {
		return littleLeaderStarLv;
	}
	public void setLittleLeaderStarLv(int littleLeaderStarLv) {
		this.littleLeaderStarLv = littleLeaderStarLv;
	}
	public int getPveMinuteHurt() {
		return pveMinuteHurt;
	}
	public void setPveMinuteHurt(int pveMinuteHurt) {
		this.pveMinuteHurt = pveMinuteHurt;
	}
	public int getAttBackAnger() {
		return attBackAnger;
	}
	public void setAttBackAnger(int attBackAnger) {
		this.attBackAnger = attBackAnger;
	}
	public int getCdCutDown() {
		return cdCutDown;
	}
	public void setCdCutDown(int cdCutDown) {
		this.cdCutDown = cdCutDown;
	}
	public int getCureEffect() {
		return cureEffect;
	}
	public void setCureEffect(int cureEffect) {
		this.cureEffect = cureEffect;
	}
	public int getBeControlTimeCutDown() {
		return beControlTimeCutDown;
	}
	public void setBeControlTimeCutDown(int beControlTimeCutDown) {
		this.beControlTimeCutDown = beControlTimeCutDown;
	}
	public int getLowerCureEffect() {
		return lowerCureEffect;
	}
	public void setLowerCureEffect(int lowerCureEffect) {
		this.lowerCureEffect = lowerCureEffect;
	}
	public int getSzAttDamageAdd() {
		return szAttDamageAdd;
	}
	public void setSzAttDamageAdd(int szAttDamageAdd) {
		this.szAttDamageAdd = szAttDamageAdd;
	}
	public int getAttDamageAdd() {
		return attDamageAdd;
	}
	public void setAttDamageAdd(int attDamageAdd) {
		this.attDamageAdd = attDamageAdd;
	}
	public int getLowerDamage() {
		return lowerDamage;
	}
	public void setLowerDamage(int lowerDamage) {
		this.lowerDamage = lowerDamage;
	}
	public int getExtDamage() {
		return extDamage;
	}
	public void setExtDamage(int extDamage) {
		this.extDamage = extDamage;
	}
	
	
	
}
