package com.teamtop.system.specialAnimalDir;
import com.teamtop.system.hero.Hero;

/**
 * SpecialAnimalDirCG.java
 * 异兽录
 */
public class SpecialAnimalDirCG{

	private static SpecialAnimalDirCG ins = null;

	public static SpecialAnimalDirCG getIns(){
		if(ins == null){
			ins = new SpecialAnimalDirCG();
		}
		return ins;
	}

	/**
	 * 打开界面UI 8391
	 */
	public void openUI(Hero hero, Object[] datas){
		SpecialAnimalDirManager.getIns().openUI(hero);
	} 
	/**
	 * 激活或升级 8393
	 * @param id| 异兽id| byte
	 * @param type| type：0：激活，1：升级，2：一键升级，进阶| byte
	 */
	public void activeOrUpLv(Hero hero, Object[] datas){
		int id = (byte)datas[0];
		int type = (byte)datas[1];
		SpecialAnimalDirManager.getIns().activeOrUpLv(hero, id, type);
	} 
	/**
	 * 请求异兽天赋信息 8395
	 */
	public void openTalentsUI(Hero hero, Object[] datas){
		SpecialAnimalDirManager.getIns().openTalentsUI(hero);
	} 
	/**
	 * 升级天赋技能 8397
	 * @param animalId| 异兽id| int
	 */
	public void upgradeTalentsSkill(Hero hero, Object[] datas){
		int animalId = (int)datas[0];
		SpecialAnimalDirManager.getIns().upgradeTalentsSkill(hero, animalId);
	} 
	/**
	 * 升级天赋装备 8399
	 * @param animalId| 异兽id| int
	 * @param equipId| 装备id| int
	 */
	public void upgradeEquip(Hero hero, Object[] datas){
		int animalId = (int)datas[0];
		int equipId = (int)datas[1];
		SpecialAnimalDirManager.getIns().upgradeEquip(hero, animalId, equipId);
	} 
	/**
	 * 升品 8401
	 * @param animalId| 异兽id| int
	 * @param equipId| 天赋装备id| int
	 */
	public void upgradeQuality(Hero hero, Object[] datas){
		int animalId = (int)datas[0];
		int equipId = (int)datas[1];
		SpecialAnimalDirManager.getIns().upgradeQuality(hero, animalId, equipId);
	} 
}