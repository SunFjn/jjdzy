package com.teamtop.system.activity.ativitys.hyperPointGeneral;
import com.teamtop.system.hero.Hero;

/**
 * HyperPointGeneralCG.java
 * 超级点将(活动)
 */
public class HyperPointGeneralCG{

	private static HyperPointGeneralCG ins = null;

	public static HyperPointGeneralCG getIns(){
		if(ins == null){
			ins = new HyperPointGeneralCG();
		}
		return ins;
	}

	/**
	 * 领取奖励 2611
	 * @param awardId| 奖励id，为配置表位置| byte
	 */
	public void getAward(Hero hero, Object[] datas){
		int awardId = (byte)datas[0];
		HyperPointGeneralManager.getIns().getAward(hero, awardId);
	} 
}