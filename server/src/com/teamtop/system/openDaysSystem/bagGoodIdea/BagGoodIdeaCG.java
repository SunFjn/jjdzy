package com.teamtop.system.openDaysSystem.bagGoodIdea;
import com.teamtop.system.hero.Hero;

/**
 * BagGoodIdeaCG.java
 * 运筹帷幄-锦囊妙计
 */
public class BagGoodIdeaCG{

	private static BagGoodIdeaCG ins = null;

	public static BagGoodIdeaCG getIns(){
		if(ins == null){
			ins = new BagGoodIdeaCG();
		}
		return ins;
	}

	/**
	 * 领取奖励 9901
	 * @param id| 配置表id| int
	 */
	public void getAward(Hero hero, Object[] datas){
		int id = (int)datas[0];
		BagGoodIdeaManager.getIns().getAward(hero, id);
	} 
}