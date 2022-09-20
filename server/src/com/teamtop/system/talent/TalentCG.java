package com.teamtop.system.talent;
import com.teamtop.system.hero.Hero;

/**
 * TalentCG.java
 * 修炼天赋
 */
public class TalentCG{

	private static TalentCG ins = null;

	public static TalentCG getIns(){
		if(ins == null){
			ins = new TalentCG();
		}
		return ins;
	}

	/**
	 * 打开修炼天赋界面 9371
	 */
	public void openUI(Hero hero, Object[] datas){
		TalentManager.getIns().openUI(hero);
	} 
	/**
	 * 修炼 9373
	 * @param type| 修炼类型：1.修炼1次  2.修炼10次| byte
	 */
	public void xiuLian(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		TalentManager.getIns().xiuLian(hero, type);
	} 
	/**
	 * 领取目标奖励 9375
	 * @param id| 目标奖励ID| int
	 */
	public void getAward(Hero hero, Object[] datas){
		int id = (int)datas[0];
		TalentManager.getIns().getAward(hero, id);
	} 
}