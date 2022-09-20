package com.teamtop.system.countrySkill;
import com.teamtop.system.hero.Hero;

/**
 * CountrySkillCG.java
 * 国家技能
 */
public class CountrySkillCG{

	private static CountrySkillCG ins = null;

	public static CountrySkillCG getIns(){
		if(ins == null){
			ins = new CountrySkillCG();
		}
		return ins;
	}

	/**
	 * 打开界面 6001
	 */
	public void openUI(Hero hero, Object[] datas){
		CountrySkillManager.getIns().openUI(hero);
	} 
	/**
	 * 激活或升级 6003
	 * @param skillId| 技能id| int
	 */
	public void jihuoOrUpLv(Hero hero, Object[] datas){
		int skillId = (int)datas[0];
		CountrySkillManager.getIns().jihuoOrUpLv(hero, skillId);
	} 
}