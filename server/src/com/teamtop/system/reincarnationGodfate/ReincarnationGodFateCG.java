package com.teamtop.system.reincarnationGodfate;
import com.teamtop.system.hero.Hero;

/**
 * ReincarnationGodFateCG.java
 * 轮回-天命
 */
public class ReincarnationGodFateCG{

	private static ReincarnationGodFateCG ins = null;

	public static ReincarnationGodFateCG getIns(){
		if(ins == null){
			ins = new ReincarnationGodFateCG();
		}
		return ins;
	}

	/**
	 * 打开界面 10591
	 */
	public void openUI(Hero hero, Object[] datas){
		ReincarnationGodFateManager.getIns().openUI(hero);
	} 
	/**
	 * 升级，升品 10593
	 * @param id| 天命id| int
	 */
	public void up(Hero hero, Object[] datas){
		int id = (int)datas[0];
		ReincarnationGodFateManager.getIns().up(hero, id);
	} 
}