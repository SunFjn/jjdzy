package com.teamtop.system.battleNew;
import com.teamtop.system.hero.Hero;

/**
 * BattleNewCG.java
 * 新战斗模式
 */
public class BattleNewCG{

	private static BattleNewCG ins = null;

	public static BattleNewCG getIns(){
		if(ins == null){
			ins = new BattleNewCG();
		}
		return ins;
	}

	/**
	 * 技能击中 3865
	 * @param skillId| 技能id| int
	 * @param players| 技能攻击范围内玩家集合| Object[]
	 */
	public void skillHit(Hero hero, Object[] datas){
		int skillId = (int)datas[0];
		Object[] players = (Object[])datas[1];
		BattleNewManager.getIns().skillHit(hero, skillId, players);
	} 
	/**
	 * 使用技能 3861
	 * @param skillId| 技能id| int
	 */
	public void useSkill(Hero hero, Object[] datas){
		int skillId = (int)datas[0];
		BattleNewManager.getIns().useSkill(hero, skillId);
	} 
	/**
	 * 测试战斗用协议 3869
	 * @param type| 1:PVP,2:组队| byte
	 */
	public void testBattle(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		BattleNewManager.getIns().testBattle(hero, type);
	} 
	/**
	 * 退出 3871
	 */
	public void leave(Hero hero, Object[] datas){
		BattleNewManager.getIns().leave(hero);
	} 
}