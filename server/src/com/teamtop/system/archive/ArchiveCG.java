package com.teamtop.system.archive;
import com.teamtop.system.hero.Hero;

/**
 * ArchiveCG.java
 * 图鉴
 */
public class ArchiveCG{

	private static ArchiveCG ins = null;

	public static ArchiveCG getIns(){
		if(ins == null){
			ins = new ArchiveCG();
		}
		return ins;
	}

	/**
	 * 打开图鉴 871
	 */
	public void openArchive(Hero hero, Object[] datas){
		ArchiveManager.getIns().openArchive(hero);
	} 
	/**
	 * 激活图鉴 873
	 * @param archiveId| 图鉴id| int
	 */
	public void activateArchive(Hero hero, Object[] datas){
		int archiveId = (int)datas[0];
		ArchiveManager.getIns().activateArchive(hero, archiveId);
	} 
	/**
	 * 升级图鉴 875
	 * @param archiveId| 图鉴id| int
	 */
	public void upgradeLevel(Hero hero, Object[] datas){
		int archiveId = (int)datas[0];
		ArchiveManager.getIns().upgradeLevel(hero, archiveId);
	} 
	/**
	 * 图鉴升星 877
	 * @param id| 图鉴id| int
	 */
	public void upgradeStar(Hero hero, Object[] datas){
		int id = (int)datas[0];
		ArchiveManager.getIns().upgradeStar(hero, id);
	} 
	/**
	 * 套装升级 879
	 * @param setId| 套装id| int
	 */
	public void upgradeSet(Hero hero, Object[] datas){
		int setId = (int)datas[0];
		ArchiveManager.getIns().upgradeSet(hero, setId);
	} 
}