package com.teamtop.system.event.fightAttrEvent;

import com.teamtop.system.hero.FightAttr;
import com.teamtop.system.hero.Hero;

/**
 * 战斗属性计算事件，对角色、侠客、宠物等的战斗属性set入对应的FightAttr
 * @author Administrator
 *
 */
public interface IFightAttrEvent {
	/**
	 * 设置角色的FightAttr战斗属性
	 * @param hero
	 * @param allAttrs
	 * @return 返回本系统的属性
	 */
	public long[][]  calcHero(Hero hero,FightAttr allAttrs);
}
