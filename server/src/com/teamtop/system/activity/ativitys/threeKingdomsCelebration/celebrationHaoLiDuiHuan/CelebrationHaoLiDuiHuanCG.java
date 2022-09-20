package com.teamtop.system.activity.ativitys.threeKingdomsCelebration.celebrationHaoLiDuiHuan;
import com.teamtop.system.hero.Hero;

/**
 * CelebrationHaoLiDuiHuanCG.java
 * 三国庆典-豪礼兑换
 */
public class CelebrationHaoLiDuiHuanCG{

	private static CelebrationHaoLiDuiHuanCG ins = null;

	public static CelebrationHaoLiDuiHuanCG getIns(){
		if(ins == null){
			ins = new CelebrationHaoLiDuiHuanCG();
		}
		return ins;
	}

	/**
	 * 打开界面 4101
	 */
	public void openUI(Hero hero, Object[] datas){
		CelebrationHaoLiDuiHuanManager.getIns().openUI(hero);
	} 
	/**
	 * 兑换 4103
	 * @param id| 配置表ID| short
	 */
	public void duiHuan(Hero hero, Object[] datas){
		int id = (short)datas[0];
		CelebrationHaoLiDuiHuanManager.getIns().duiHuan(hero, id);
	} 
}