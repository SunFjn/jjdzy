package com.teamtop.system.hyperPointGeneralSys;
import com.teamtop.system.hero.Hero;

/**
 * HyperPointGeneralSysCG.java
 * 超级点将(系统)
 */
public class HyperPointGeneralSysCG{

	private static HyperPointGeneralSysCG ins = null;

	public static HyperPointGeneralSysCG getIns(){
		if(ins == null){
			ins = new HyperPointGeneralSysCG();
		}
		return ins;
	}

	/**
	 * 打开界面 4371
	 */
	public void openUI(Hero hero, Object[] datas){
		HyperPointGeneralSysManager.getIns().openUI(hero);
	} 
	/**
	 * 领取奖励 4373
	 * @param awardId| 奖励id，为配置表位置| byte
	 */
	public void getAward(Hero hero, Object[] datas){
		int awardId = (byte)datas[0];
		HyperPointGeneralSysManager.getIns().getAward(hero, awardId);
	} 
}