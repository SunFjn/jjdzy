package com.teamtop.system.hero;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

public class FightAttrFunction {

	public static List<Object[]> createAttrSendData(FinalFightAttr attr) {
		List<Object[]> dataList = new ArrayList<>();
		dataList.add(new Object[] { FightAttrConst.HP, attr.getHpMax() });
		dataList.add(new Object[] { FightAttrConst.ATT, attr.getAtt() });
		dataList.add(new Object[] { FightAttrConst.DEF, attr.getDef() });
		dataList.add(new Object[] { FightAttrConst.CRIT, attr.getCritical() });
		dataList.add(new Object[] { FightAttrConst.RESCRIT, attr.getResistCrit() });
		dataList.add(new Object[] { FightAttrConst.HIT, attr.getHit() });
		dataList.add(new Object[] { FightAttrConst.EVADE, attr.getEvade() });
		dataList.add(new Object[] { FightAttrConst.DAMAGE, attr.getDamage() });
		dataList.add(new Object[] { FightAttrConst.CRITRATE, attr.getCriticalRate() });
		dataList.add(new Object[] { FightAttrConst.RESCRITRATE, attr.getResistCritRate() });
		dataList.add(new Object[] { FightAttrConst.HITRATE, attr.getHitRate() });
		dataList.add(new Object[] { FightAttrConst.EVADERATE, attr.getEvadeRate() });
		dataList.add(new Object[] { FightAttrConst.CRITDMGADD, attr.getCriticalDamageAdd() });
		dataList.add(new Object[] { FightAttrConst.CRITDMGDET, attr.getCriticalDamageDerate() });
		dataList.add(new Object[] { FightAttrConst.DAMAGEADD, attr.getDamageAdd() });
		dataList.add(new Object[] { FightAttrConst.DAMAGEDET, attr.getDamageDerate() });
		dataList.add(new Object[] { FightAttrConst.FIREDMG, attr.getFireDamage() });
		dataList.add(new Object[] { FightAttrConst.FROZENDMG, attr.getFrozenDamage() });
		dataList.add(new Object[] { FightAttrConst.POISONDMG, attr.getPoisonDamage() });
		dataList.add(new Object[] { FightAttrConst.ELECTRICDMG, attr.getElectricDamage() });
		dataList.add(new Object[] { FightAttrConst.BOOMDMG, attr.getBoomDamage() });
		dataList.add(new Object[] { FightAttrConst.FIRERES, attr.getFireRes() });
		dataList.add(new Object[] { FightAttrConst.FROZENRES, attr.getFrozenRes() });
		dataList.add(new Object[] { FightAttrConst.POISERES, attr.getPoisonRes() });
		dataList.add(new Object[] { FightAttrConst.ELECTRICRES, attr.getElectricRes() });
		dataList.add(new Object[] { FightAttrConst.BOOMRES, attr.getBoomRes() });
		dataList.add(new Object[] { FightAttrConst.star, attr.getStar() });
		//0321新增属性
		dataList.add(new Object[] { FightAttrConst.pvpAddHurt, attr.getPvpAddHurt() });
		dataList.add(new Object[] { FightAttrConst.pvpMinuteHurt, attr.getPvpMinuteHurt() });
		dataList.add(new Object[] { FightAttrConst.pveAddHurt, attr.getPveAddHurt() });
		//0330新增属性
		dataList.add(new Object[] { FightAttrConst.elementAddHurt, attr.getElementAddHurt() });
		dataList.add(new Object[] { FightAttrConst.elementMinuteHurt, attr.getElementMinuteHurt() });
		//0408新增属性
		dataList.add(new Object[] { FightAttrConst.hudunAdd, attr.getHudunAdd()});
		//0413新增属性
		dataList.add(new Object[] { FightAttrConst.hphurt, attr.getHpHurt()});
		//20190903新增属性
		dataList.add(new Object[] { FightAttrConst.pveMinuteHurt, attr.getPveMinuteHurt()});
		// 20191009新增属性
		dataList.add(new Object[] { FightAttrConst.attBackAnger, attr.getAttBackAnger() });
		dataList.add(new Object[] { FightAttrConst.cdCutDown, attr.getCdCutDown() });
		dataList.add(new Object[] { FightAttrConst.cureEffect, attr.getCureEffect() });
		dataList.add(new Object[] { FightAttrConst.beControlTimeCutDown, attr.getBeControlTimeCutDown() });
		// 20191101
		dataList.add(new Object[] { FightAttrConst.lowerDamage, attr.getLowerDamage() });
		dataList.add(new Object[] { FightAttrConst.lowerCureEffect, attr.getLowerCureEffect() });
		dataList.add(new Object[] { FightAttrConst.szAttDamageAdd, attr.getSzAttDamageAdd() });
		dataList.add(new Object[] { FightAttrConst.attDamageAdd, attr.getAttDamageAdd() });
		// 20191114
		dataList.add(new Object[] { FightAttrConst.extDamage, attr.getExtDamage() });
		return dataList;
	}

	public static void resetAttr(FinalFightAttr attr, int addition, int percent) {
		Field[] fields = attr.getClass().getDeclaredFields();
		for (Field field : fields) {
			try {
				Class<?> type = field.getType();
				field.setAccessible(true);
				if (type.equals(long.class)) {
					long value = field.getLong(attr);
					field.setLong(attr, value * addition / percent);
				} else if (type.equals(int.class)) {
					int value = field.getInt(attr);
					field.setInt(attr, value * addition / percent);
				}
				field.setAccessible(false);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}

}
