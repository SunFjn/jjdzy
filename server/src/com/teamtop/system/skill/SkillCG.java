package com.teamtop.system.skill;
import com.teamtop.system.hero.Hero;

/**
 * SkillCG.java
 * 技能
 */
public class SkillCG{

	private static SkillCG ins = null;

	public static SkillCG getIns(){
		if(ins == null){
			ins = new SkillCG();
		}
		return ins;
	}

	/**
	 * 升级技能 621
	 * @param skillId| 技能id| int
	 */
	public void upgradeSkill(Hero hero, Object[] datas){
		int skillId = (int)datas[0];
		SkillManager.getIns().upgradeSkill(hero, skillId);
	} 
	/**
	 * 升级阵眼 623
	 * @param photoCenterId| 阵眼id| int
	 */
	public void upgradePhotoCenter(Hero hero, Object[] datas){
		int photoCenterId = (int)datas[0];
		SkillManager.getIns().upgradePhotoCenter(hero, photoCenterId);
	} 
	/**
	 * 一键升级技能等级 625
	 */
	public void upgradeAll(Hero hero, Object[] datas){
		SkillManager.getIns().upgradeAll(hero);
	} 
	/**
	 * CG 使用技能（宝物1宝物2天书怒气） 627
	 * @param type| 使用技能| byte
	 * @param sysid| 系统id| int
	 */
	public void useSkill(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		int sysid = (int)datas[1];
		SkillManager.getIns().useSkill(hero, type, sysid);
	} 
}