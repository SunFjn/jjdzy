/**
 * 玩家属性加成
 */
package com.teamtop.system.hero;

/**
 * 战力详细 ext为附加，add为加成百分比
 * 生命=（基础生命+附加生命数值）*（1+生命加成%）
 *
 */
public class FightAttr{
	private int appendStrength;
	/**攻击*/
	private float attExt;
	private float attAdd;
	/**物防*/
	private float defExt;
	private float defAdd;
	/**气血上限*/
	private double hpMaxExt;
	private float hpMaxAdd;
	/**暴击*/
	private float criticalExt;
	private float criticalAdd;
	/**抗暴*/
	private float resistCritExt;
	private float resistCritAdd;
	/**命中*/
	private float hitExt;
	private float hitAdd;
	/**闪避*/
	private float evadeExt;
	private float evadeAdd;
	/**伤害*/
	private float damageExt;
	private float damageAdd;
	/**暴击率*/
	private float critRateExt;
	private float critRateAdd;
	/**抗暴率*/
	private float resCritRateExt;
	private float resCritRateAdd;
	/**命中率*/
	private float hitRateExt;
	private float hitRateAdd;
	/**闪避率*/
	private float evadeRateExt;
	private float evadeRateAdd;
	/**暴伤加成*/
	private float critDmgAddExt;
	private float critDmgAddAdd;
	/**暴伤减免*/
	private float critDmgDetExt;
	private float critDmgDetAdd;
	/**伤害加成*/
	private float DmgAddExt;
	private float DmgAdditionAdd;
	/**伤害减免*/
	private float dmgDetExt;
	private float dmgDetAdd;
	/**火焰伤害*/
	private float fireDmgExt;
	private float fireDmgAdd;
	/**冰冻伤害*/
	private float frozenDmgExt;
	private float frozenDmgAdd;
	/**毒液伤害*/
	private float poisonDmgExt;
	private float poisonDmgAdd;
	/**电击伤害*/
	private float electricDmgExt;
	private float electricDmgAdd;
	/**爆炸伤害*/
	private float boomDmgExt;
	private float boomDmgAdd;
	/**火焰抗性*/
	private float fireResExt;
	private float fireResAdd;
	/**冰冻抗性*/
	private float frozenResExt;
	private float frozenResAdd;
	/**毒液抗性*/
	private float poisonResExt;
	private float poisonResAdd;
	/**电击伤害*/
	private float electricResExt;
	private float electricResAdd;
	/**爆炸伤害*/
	private float boomResExt;
	private float boomResAdd;
	/**PVP伤害加成*/
	private float pvpAddHurt;
	private float pvpAddHurtadd;
	/**PVP伤害减免*/
	private float pvpMinuteHurt;
	private float pvpMinuteHurtadd;
	/**PVE伤害加成*/
	private float pveAddHurt;
	private float pveAddHurtadd;
	/**元素伤害加成*/
	private float elementAddHurt;
	private float elementAddHurtadd;
	/**元素减免加成*/
	private float elementMinuteHurt;
	private float elementMinuteHurtadd;
	/**护盾*/
	private float hudunext;
	private float hudunadd;
	/**生命爆炸*/
	private float hphurtext;
	private float hphurtextadd;
	/**PVE伤害减免*/
	private float pveMinuteHurt;
	private float pveMinuteHurtadd;
	/**每次攻击回复怒气**/
	private float attBackAnger;
	private float attBackAngeradd;
	/**宝物和天数CD时间减少*/
	private float cdCutDown;
	private float cdCutDownadd;
	/**宝物治疗效果提升*/
	private float cureEffect;
	private float cureEffectadd;
	/**被控时间减少*/
	private float beControlTimeCutDown;
	private float beControlTimeCutDownadd;
	/**降低敌方对自己的技能伤害*/
	private float lowerDamage;
	private float lowerDamageadd;
	/**降低敌方治疗效果*/
	private float lowerCureEffect;
	private float lowerCureEffectadd;
	/**增加少主技能伤害百分比*/
	private float szAttDamageAdd;
	private float szAttDamageAddadd;
	/**增加技能伤害百分比*/
	private float attDamageAdd;
	private float attDamageAddadd;
	/**额外伤害百分*/
	private float extDamage;
	private float extDamageAdd;
	
	
	
	
	
	public int getAppendStrength() {
		return appendStrength;
	}
	public void setAppendStrength(int appendStrength) {
		this.appendStrength = appendStrength;
	}
	public float getAttExt() {
		return attExt;
	}
	public void setAttExt(float attExt) {
		this.attExt = attExt;
	}
	public float getAttAdd() {
		return attAdd;
	}
	public void setAttAdd(float attAdd) {
		this.attAdd = attAdd;
	}
	public float getDefExt() {
		return defExt;
	}
	public void setDefExt(float defExt) {
		this.defExt = defExt;
	}
	public float getDefAdd() {
		return defAdd;
	}
	public void setDefAdd(float defAdd) {
		this.defAdd = defAdd;
	}

	public double getHpMaxExt() {
		return hpMaxExt;
	}

	public void setHpMaxExt(double hpMaxExt) {
		this.hpMaxExt = hpMaxExt;
	}
	public float getHpMaxAdd() {
		return hpMaxAdd;
	}
	public void setHpMaxAdd(float hpMaxAdd) {
		this.hpMaxAdd = hpMaxAdd;
	}
	public float getCriticalExt() {
		return criticalExt;
	}
	public void setCriticalExt(float criticalExt) {
		this.criticalExt = criticalExt;
	}
	public float getCriticalAdd() {
		return criticalAdd;
	}
	public void setCriticalAdd(float criticalAdd) {
		this.criticalAdd = criticalAdd;
	}
	public float getResistCritExt() {
		return resistCritExt;
	}
	public void setResistCritExt(float resistCritExt) {
		this.resistCritExt = resistCritExt;
	}
	public float getResistCritAdd() {
		return resistCritAdd;
	}
	public void setResistCritAdd(float resistCritAdd) {
		this.resistCritAdd = resistCritAdd;
	}
	public float getHitExt() {
		return hitExt;
	}
	public void setHitExt(float hitExt) {
		this.hitExt = hitExt;
	}
	public float getHitAdd() {
		return hitAdd;
	}
	public void setHitAdd(float hitAdd) {
		this.hitAdd = hitAdd;
	}
	public float getEvadeExt() {
		return evadeExt;
	}
	public void setEvadeExt(float evadeExt) {
		this.evadeExt = evadeExt;
	}
	public float getEvadeAdd() {
		return evadeAdd;
	}
	public void setEvadeAdd(float evadeAdd) {
		this.evadeAdd = evadeAdd;
	}
	public float getDamageExt() {
		return damageExt;
	}
	public void setDamageExt(float damageExt) {
		this.damageExt = damageExt;
	}
	public float getDamageAdd() {
		return damageAdd;
	}
	public void setDamageAdd(float damageAdd) {
		this.damageAdd = damageAdd;
	}
	public float getCritRateExt() {
		return critRateExt;
	}
	public void setCritRateExt(float critRateExt) {
		this.critRateExt = critRateExt;
	}
	public float getCritRateAdd() {
		return critRateAdd;
	}
	public void setCritRateAdd(float critRateAdd) {
		this.critRateAdd = critRateAdd;
	}
	public float getResCritRateExt() {
		return resCritRateExt;
	}
	public void setResCritRateExt(float resCritRateExt) {
		this.resCritRateExt = resCritRateExt;
	}
	public float getResCritRateAdd() {
		return resCritRateAdd;
	}
	public void setResCritRateAdd(float resCritRateAdd) {
		this.resCritRateAdd = resCritRateAdd;
	}
	public float getHitRateExt() {
		return hitRateExt;
	}
	public void setHitRateExt(float hitRateExt) {
		this.hitRateExt = hitRateExt;
	}
	public float getHitRateAdd() {
		return hitRateAdd;
	}
	public void setHitRateAdd(float hitRateAdd) {
		this.hitRateAdd = hitRateAdd;
	}
	public float getEvadeRateExt() {
		return evadeRateExt;
	}
	public void setEvadeRateExt(float evadeRateExt) {
		this.evadeRateExt = evadeRateExt;
	}
	public float getEvadeRateAdd() {
		return evadeRateAdd;
	}
	public void setEvadeRateAdd(float evadeRateAdd) {
		this.evadeRateAdd = evadeRateAdd;
	}
	public float getCritDmgAddExt() {
		return critDmgAddExt;
	}
	public void setCritDmgAddExt(float critDmgAddExt) {
		this.critDmgAddExt = critDmgAddExt;
	}
	public float getCritDmgAddAdd() {
		return critDmgAddAdd;
	}
	public void setCritDmgAddAdd(float critDmgAddAdd) {
		this.critDmgAddAdd = critDmgAddAdd;
	}
	public float getCritDmgDetExt() {
		return critDmgDetExt;
	}
	public void setCritDmgDetExt(float critDmgDetExt) {
		this.critDmgDetExt = critDmgDetExt;
	}
	public float getCritDmgDetAdd() {
		return critDmgDetAdd;
	}
	public void setCritDmgDetAdd(float critDmgDetAdd) {
		this.critDmgDetAdd = critDmgDetAdd;
	}
	public float getDmgAddExt() {
		return DmgAddExt;
	}
	public void setDmgAddExt(float dmgAddExt) {
		DmgAddExt = dmgAddExt;
	}
	public float getDmgAdditionAdd() {
		return DmgAdditionAdd;
	}
	public void setDmgAdditionAdd(float dmgAdditionAdd) {
		DmgAdditionAdd = dmgAdditionAdd;
	}
	public float getDmgDetExt() {
		return dmgDetExt;
	}
	public void setDmgDetExt(float dmgDetExt) {
		this.dmgDetExt = dmgDetExt;
	}
	public float getDmgDetAdd() {
		return dmgDetAdd;
	}
	public void setDmgDetAdd(float dmgDetAdd) {
		this.dmgDetAdd = dmgDetAdd;
	}
	public float getFireDmgExt() {
		return fireDmgExt;
	}
	public void setFireDmgExt(float fireDmgExt) {
		this.fireDmgExt = fireDmgExt;
	}
	public float getFireDmgAdd() {
		return fireDmgAdd;
	}
	public void setFireDmgAdd(float fireDmgAdd) {
		this.fireDmgAdd = fireDmgAdd;
	}
	public float getFrozenDmgExt() {
		return frozenDmgExt;
	}
	public void setFrozenDmgExt(float frozenDmgExt) {
		this.frozenDmgExt = frozenDmgExt;
	}
	public float getFrozenDmgAdd() {
		return frozenDmgAdd;
	}
	public void setFrozenDmgAdd(float frozenDmgAdd) {
		this.frozenDmgAdd = frozenDmgAdd;
	}
	public float getPoisonDmgExt() {
		return poisonDmgExt;
	}
	public void setPoisonDmgExt(float poisonDmgExt) {
		this.poisonDmgExt = poisonDmgExt;
	}
	public float getPoisonDmgAdd() {
		return poisonDmgAdd;
	}
	public void setPoisonDmgAdd(float poisonDmgAdd) {
		this.poisonDmgAdd = poisonDmgAdd;
	}
	public float getElectricDmgExt() {
		return electricDmgExt;
	}
	public void setElectricDmgExt(float electricDmgExt) {
		this.electricDmgExt = electricDmgExt;
	}
	public float getElectricDmgAdd() {
		return electricDmgAdd;
	}
	public void setElectricDmgAdd(float electricDmgAdd) {
		this.electricDmgAdd = electricDmgAdd;
	}
	public float getBoomDmgExt() {
		return boomDmgExt;
	}
	public void setBoomDmgExt(float boomDmgExt) {
		this.boomDmgExt = boomDmgExt;
	}
	public float getBoomDmgAdd() {
		return boomDmgAdd;
	}
	public void setBoomDmgAdd(float boomDmgAdd) {
		this.boomDmgAdd = boomDmgAdd;
	}
	public float getFireResExt() {
		return fireResExt;
	}
	public void setFireResExt(float fireResExt) {
		this.fireResExt = fireResExt;
	}
	public float getFireResAdd() {
		return fireResAdd;
	}
	public void setFireResAdd(float fireResAdd) {
		this.fireResAdd = fireResAdd;
	}
	public float getFrozenResExt() {
		return frozenResExt;
	}
	public void setFrozenResExt(float frozenResExt) {
		this.frozenResExt = frozenResExt;
	}
	public float getFrozenResAdd() {
		return frozenResAdd;
	}
	public void setFrozenResAdd(float frozenResAdd) {
		this.frozenResAdd = frozenResAdd;
	}
	public float getPoisonResExt() {
		return poisonResExt;
	}
	public void setPoisonResExt(float poisonResExt) {
		this.poisonResExt = poisonResExt;
	}
	public float getPoisonResAdd() {
		return poisonResAdd;
	}
	public void setPoisonResAdd(float poisonResAdd) {
		this.poisonResAdd = poisonResAdd;
	}
	public float getElectricResExt() {
		return electricResExt;
	}
	public void setElectricResExt(float electricResExt) {
		this.electricResExt = electricResExt;
	}
	public float getElectricResAdd() {
		return electricResAdd;
	}
	public void setElectricResAdd(float electricResAdd) {
		this.electricResAdd = electricResAdd;
	}
	public float getBoomResExt() {
		return boomResExt;
	}
	public void setBoomResExt(float boomResExt) {
		this.boomResExt = boomResExt;
	}
	public float getBoomResAdd() {
		return boomResAdd;
	}
	public void setBoomResAdd(float boomResAdd) {
		this.boomResAdd = boomResAdd;
	}
	public float getPvpAddHurt() {
		return pvpAddHurt;
	}
	public void setPvpAddHurt(float pvpAddHurt) {
		this.pvpAddHurt = pvpAddHurt;
	}
	public float getPvpMinuteHurt() {
		return pvpMinuteHurt;
	}
	public void setPvpMinuteHurt(float pvpMinuteHurt) {
		this.pvpMinuteHurt = pvpMinuteHurt;
	}
	public float getPveAddHurt() {
		return pveAddHurt;
	}
	public void setPveAddHurt(float pveAddHurt) {
		this.pveAddHurt = pveAddHurt;
	}
	public float getPvpAddHurtadd() {
		return pvpAddHurtadd;
	}
	public void setPvpAddHurtadd(float pvpAddHurtadd) {
		this.pvpAddHurtadd = pvpAddHurtadd;
	}
	public float getPvpMinuteHurtadd() {
		return pvpMinuteHurtadd;
	}
	public void setPvpMinuteHurtadd(float pvpMinuteHurtadd) {
		this.pvpMinuteHurtadd = pvpMinuteHurtadd;
	}
	public float getPveAddHurtadd() {
		return pveAddHurtadd;
	}
	public void setPveAddHurtadd(float pveAddHurtadd) {
		this.pveAddHurtadd = pveAddHurtadd;
	}
	public float getElementAddHurt() {
		return elementAddHurt;
	}
	public void setElementAddHurt(float elementAddHurt) {
		this.elementAddHurt = elementAddHurt;
	}
	public float getElementAddHurtadd() {
		return elementAddHurtadd;
	}
	public void setElementAddHurtadd(float elementAddHurtadd) {
		this.elementAddHurtadd = elementAddHurtadd;
	}
	public float getElementMinuteHurt() {
		return elementMinuteHurt;
	}
	public void setElementMinuteHurt(float elementMinuteHurt) {
		this.elementMinuteHurt = elementMinuteHurt;
	}
	public float getElementMinuteHurtadd() {
		return elementMinuteHurtadd;
	}
	public void setElementMinuteHurtadd(float elementMinuteHurtadd) {
		this.elementMinuteHurtadd = elementMinuteHurtadd;
	}
	public float getHudunext() {
		return hudunext;
	}
	public void setHudunext(float hudunext) {
		this.hudunext = hudunext;
	}
	public float getHudunadd() {
		return hudunadd;
	}
	public void setHudunadd(float hudunadd) {
		this.hudunadd = hudunadd;
	}
	public float getHphurtext() {
		return hphurtext;
	}
	public void setHphurtext(float hphurtext) {
		this.hphurtext = hphurtext;
	}
	public float getHphurtextadd() {
		return hphurtextadd;
	}
	public void setHphurtextadd(float hphurtextadd) {
		this.hphurtextadd = hphurtextadd;
	}
	public float getPveMinuteHurt() {
		return pveMinuteHurt;
	}
	public void setPveMinuteHurt(float pveMinuteHurt) {
		this.pveMinuteHurt = pveMinuteHurt;
	}
	public float getPveMinuteHurtadd() {
		return pveMinuteHurtadd;
	}
	public void setPveMinuteHurtadd(float pveMinuteHurtadd) {
		this.pveMinuteHurtadd = pveMinuteHurtadd;
	}
	public float getAttBackAnger() {
		return attBackAnger;
	}
	public void setAttBackAnger(float attBackAnger) {
		this.attBackAnger = attBackAnger;
	}
	public float getAttBackAngeradd() {
		return attBackAngeradd;
	}
	public void setAttBackAngeradd(float attBackAngeradd) {
		this.attBackAngeradd = attBackAngeradd;
	}
	public float getCdCutDown() {
		return cdCutDown;
	}
	public void setCdCutDown(float cdCutDown) {
		this.cdCutDown = cdCutDown;
	}
	public float getCdCutDownadd() {
		return cdCutDownadd;
	}
	public void setCdCutDownadd(float cdCutDownadd) {
		this.cdCutDownadd = cdCutDownadd;
	}
	public float getCureEffect() {
		return cureEffect;
	}
	public void setCureEffect(float cureEffect) {
		this.cureEffect = cureEffect;
	}
	public float getCureEffectadd() {
		return cureEffectadd;
	}
	public void setCureEffectadd(float cureEffectadd) {
		this.cureEffectadd = cureEffectadd;
	}
	public float getBeControlTimeCutDown() {
		return beControlTimeCutDown;
	}
	public void setBeControlTimeCutDown(float beControlTimeCutDown) {
		this.beControlTimeCutDown = beControlTimeCutDown;
	}
	public float getBeControlTimeCutDownadd() {
		return beControlTimeCutDownadd;
	}
	public void setBeControlTimeCutDownadd(float beControlTimeCutDownadd) {
		this.beControlTimeCutDownadd = beControlTimeCutDownadd;
	}
	public float getLowerDamage() {
		return lowerDamage;
	}
	public void setLowerDamage(float lowerDamage) {
		this.lowerDamage = lowerDamage;
	}
	public float getLowerDamageadd() {
		return lowerDamageadd;
	}
	public void setLowerDamageadd(float lowerDamageadd) {
		this.lowerDamageadd = lowerDamageadd;
	}
	public float getLowerCureEffect() {
		return lowerCureEffect;
	}
	public void setLowerCureEffect(float lowerCureEffect) {
		this.lowerCureEffect = lowerCureEffect;
	}
	public float getLowerCureEffectadd() {
		return lowerCureEffectadd;
	}
	public void setLowerCureEffectadd(float lowerCureEffectadd) {
		this.lowerCureEffectadd = lowerCureEffectadd;
	}
	public float getSzAttDamageAdd() {
		return szAttDamageAdd;
	}
	public void setSzAttDamageAdd(float szAttDamageAdd) {
		this.szAttDamageAdd = szAttDamageAdd;
	}
	public float getSzAttDamageAddadd() {
		return szAttDamageAddadd;
	}
	public void setSzAttDamageAddadd(float szAttDamageAddadd) {
		this.szAttDamageAddadd = szAttDamageAddadd;
	}
	public float getAttDamageAdd() {
		return attDamageAdd;
	}
	public void setAttDamageAdd(float attDamageAdd) {
		this.attDamageAdd = attDamageAdd;
	}
	public float getAttDamageAddadd() {
		return attDamageAddadd;
	}
	public void setAttDamageAddadd(float attDamageAddadd) {
		this.attDamageAddadd = attDamageAddadd;
	}
	public float getExtDamage() {
		return extDamage;
	}
	public void setExtDamage(float extDamage) {
		this.extDamage = extDamage;
	}
	public float getExtDamageAdd() {
		return extDamageAdd;
	}
	public void setExtDamageAdd(float extDamageAdd) {
		this.extDamageAdd = extDamageAdd;
	}

	
	
}
