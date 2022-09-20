package com.teamtop.system.openDaysSystem.otherHyperPointGeneralSys;
import com.teamtop.system.hero.Hero;

/**
 * OtherHyperPointGeneralSysCG.java
 * 超级点将（8~28）
 */
public class OtherHyperPointGeneralSysCG{

	private static OtherHyperPointGeneralSysCG ins = null;

	public static OtherHyperPointGeneralSysCG getIns(){
		if(ins == null){
			ins = new OtherHyperPointGeneralSysCG();
		}
		return ins;
	}

	/**
	 * 领取奖励 4811
	 * @param awardId| 奖励id，为配置表位置| byte
	 */
	public void getAward(Hero hero, Object[] datas){
		int awardId = (byte)datas[0];
		OtherHyperPointGeneralSysManager.getIns().getAward(hero, awardId);
	} 
}