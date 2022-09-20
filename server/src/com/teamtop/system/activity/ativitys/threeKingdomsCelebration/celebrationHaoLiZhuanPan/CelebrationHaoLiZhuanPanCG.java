package com.teamtop.system.activity.ativitys.threeKingdomsCelebration.celebrationHaoLiZhuanPan;
import com.teamtop.system.hero.Hero;

/**
 * CelebrationHaoLiZhuanPanCG.java
 * 三国庆典-豪礼转盘
 */
public class CelebrationHaoLiZhuanPanCG{

	private static CelebrationHaoLiZhuanPanCG ins = null;

	public static CelebrationHaoLiZhuanPanCG getIns(){
		if(ins == null){
			ins = new CelebrationHaoLiZhuanPanCG();
		}
		return ins;
	}

	/**
	 * 打开UI 4121
	 */
	public void openUI(Hero hero, Object[] datas){
		CelebrationHaoLiZhuanPanManager.getIns().openUI(hero);
	} 
	/**
	 * 抽奖 4123
	 * @param type| 次数  1单抽  2十连抽| byte
	 */
	public void buy(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		CelebrationHaoLiZhuanPanManager.getIns().buy(hero, type);
	} 
	/**
	 * 打开排行榜 4125
	 */
	public void openRank(Hero hero, Object[] datas){
		CelebrationHaoLiZhuanPanManager.getIns().openRank(hero);
	} 
	/**
	 * 打开目标奖励界面 4127
	 */
	public void openTargetAwardUI(Hero hero, Object[] datas){
		CelebrationHaoLiZhuanPanManager.getIns().openTargetAwardUI(hero);
	} 
	/**
	 * 领取目标奖励 4129
	 * @param awardId| 要领取的奖励id| int
	 */
	public void getTargetAward(Hero hero, Object[] datas){
		int awardId = (int)datas[0];
		CelebrationHaoLiZhuanPanManager.getIns().getTargetAward(hero, awardId);
	} 
}