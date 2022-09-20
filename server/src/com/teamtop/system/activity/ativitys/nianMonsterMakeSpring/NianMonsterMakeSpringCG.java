package com.teamtop.system.activity.ativitys.nianMonsterMakeSpring;
import com.teamtop.system.hero.Hero;

/**
 * NianMonsterMakeSpringCG.java
 * 年兽闹春
 */
public class NianMonsterMakeSpringCG{

	private static NianMonsterMakeSpringCG ins = null;

	public static NianMonsterMakeSpringCG getIns(){
		if(ins == null){
			ins = new NianMonsterMakeSpringCG();
		}
		return ins;
	}

	/**
	 * 刷新召唤年兽 11551
	 */
	public void summonMonster(Hero hero, Object[] datas){
		NianMonsterMakeSpringManager.getIns().summonMonster(hero);
	} 
	/**
	 * 召唤年兽王 11553
	 */
	public void summonMonsterKing(Hero hero, Object[] datas){
		NianMonsterMakeSpringManager.getIns().summonMonsterKing(hero);
	} 
	/**
	 * 攻击年兽 11555
	 */
	public void attactMonster(Hero hero, Object[] datas){
		NianMonsterMakeSpringManager.getIns().attactMonster(hero);
	} 
	/**
	 * 领取目标奖励 11557
	 * @param id| 目标奖励id| int
	 */
	public void getGoalReward(Hero hero, Object[] datas){
		int id = (int)datas[0];
		NianMonsterMakeSpringManager.getIns().getGoalReward(hero, id);
	} 
	/**
	 * 领取奖池奖励 11559
	 * @param index| 奖励序号| byte
	 * @param type| 是否使用元宝开启：（0：否，1：是）| byte
	 */
	public void getReward(Hero hero, Object[] datas){
		int index = (byte)datas[0];
		int type = (byte)datas[1];
		NianMonsterMakeSpringManager.getIns().getReward(hero, index, type);
	} 
}