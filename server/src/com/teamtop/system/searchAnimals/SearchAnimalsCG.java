package com.teamtop.system.searchAnimals;
import com.teamtop.system.hero.Hero;

/**
 * SearchAnimalsCG.java
 * 仙山寻兽
 */
public class SearchAnimalsCG{

	private static SearchAnimalsCG ins = null;

	public static SearchAnimalsCG getIns(){
		if(ins == null){
			ins = new SearchAnimalsCG();
		}
		return ins;
	}

	/**
	 * 寻兽 8763
	 * @param id| 寻兽ID，0.为一键寻兽| int
	 */
	public void search(Hero hero, Object[] datas){
		int id = (int)datas[0];
		SearchAnimalsManager.getIns().search(hero, id);
	} 
	/**
	 * 领取积分奖励 8765
	 * @param id| 积分ID| int
	 */
	public void getAward(Hero hero, Object[] datas){
		int id = (int)datas[0];
		SearchAnimalsManager.getIns().getAward(hero, id);
	} 
	/**
	 * 打开仙山寻兽界面 8761
	 */
	public void openUI(Hero hero, Object[] datas){
		SearchAnimalsManager.getIns().openUI(hero);
	} 
	/**
	 * 重置 8767
	 */
	public void reset(Hero hero, Object[] datas){
		SearchAnimalsManager.getIns().reset(hero);
	} 
}