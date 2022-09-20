package com.teamtop.system.crossDynastyWarriors;
import com.teamtop.system.hero.Hero;

/**
 * DynastyWarriorsCG.java
 * 三国无双
 */
public class DynastyWarriorsCG{

	private static DynastyWarriorsCG ins = null;

	public static DynastyWarriorsCG getIns(){
		if(ins == null){
			ins = new DynastyWarriorsCG();
		}
		return ins;
	}

	/**
	 * 打开三国无双界面 1831
	 */
	public void openDynastyWarriors(Hero hero, Object[] datas){
		DynastyWarriorsManager.getIns().openDynastyWarriors(hero);
	} 
	/**
	 * 下注 1833
	 * @param beBetId| 被押注的玩家id| long
	 */
	public void bet(Hero hero, Object[] datas){
		long beBetId = (long)datas[0];
		DynastyWarriorsManager.getIns().bet(hero, beBetId);
	} 
	/**
	 * 领取奖池奖励 1837
	 * @param pondId| 奖池id| byte
	 */
	public void getPondAward(Hero hero, Object[] datas){
		int pondId = (byte)datas[0];
		DynastyWarriorsManager.getIns().getPondAward(hero, pondId);
	} 
	/**
	 * 打开奖池界面 1835
	 */
	public void openPond(Hero hero, Object[] datas){
		DynastyWarriorsManager.getIns().openPond(hero);
	} 
	/**
	 * 查看录像 1841
	 * @param round| 轮数| byte
	 * @param groupId| 分组id| byte
	 */
	public void getVideoData(Hero hero, Object[] datas){
		int round = (byte)datas[0];
		int groupId = (byte)datas[1];
		DynastyWarriorsManager.getIns().getVideoData(hero, round, groupId);
	} 
}