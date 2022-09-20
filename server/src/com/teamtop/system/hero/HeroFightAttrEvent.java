package com.teamtop.system.hero;
import java.util.HashMap;

import com.teamtop.system.event.fightAttrEvent.IFightAttrEvent;
import com.teamtop.util.common.CommonUtil;

import excel.config.Config_guanxian_701;
import excel.config.Config_zhuansheng_705;

/**
 * 角色战力事件
 * @author Administrator
 *
 */
public class HeroFightAttrEvent implements IFightAttrEvent{

	@Override
	public long[][] calcHero(Hero hero, FightAttr  allAttrs) {
		HashMap<Integer, Long> attrMap=new HashMap<Integer, Long>();
		//转生
		if (hero.getRebornlv()>0) {
			CommonUtil.arrChargeMap(Config_zhuansheng_705.getIns().get(hero.getRebornlv()).getAttr(), attrMap);
		}
		//官职
		if (Config_guanxian_701.getIns().get(hero.getOfficial())!=null) {
			CommonUtil.arrChargeMap(Config_guanxian_701.getIns().get(hero.getOfficial()).getAttr(), attrMap);
		}
		long[][] totalAttr=CommonUtil.mapToArr(attrMap);
		if (totalAttr!=null) {
			FightCalcFunction.setFightValue(totalAttr, allAttrs);
		}
		return totalAttr;
	}

}
