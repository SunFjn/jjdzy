package com.teamtop.system.guanQiaHelp;
import com.teamtop.system.hero.Hero;

/**
 * GuanQiaHelpCG.java
 * 关卡求助
 */
public class GuanQiaHelpCG{

	private static GuanQiaHelpCG ins = null;

	public static GuanQiaHelpCG getIns(){
		if(ins == null){
			ins = new GuanQiaHelpCG();
		}
		return ins;
	}

	/**
	 * 广播邀请协助 5901
	 */
	public void broadCast(Hero hero, Object[] datas){
		GuanQiaHelpManager.getIns().broadCast(hero);
	} 
	/**
	 * 同意协助关卡 5905
	 * @param seekHelpHeroId| 需要协助玩家id| long
	 * @param guanQiaNum| 关卡数| int
	 */
	public void agree(Hero hero, Object[] datas){
		long seekHelpHeroId = (long)datas[0];
		int guanQiaNum = (int)datas[1];
		GuanQiaHelpManager.getIns().agree(hero, seekHelpHeroId, guanQiaNum);
	} 
	/**
	 * 通知后端是否可以开启战斗 5907
	 * @param seekHelpId| 返回队伍Id,如失败返回-1| long
	 */
	public void noticeState(Hero hero, Object[] datas){
		long seekHelpId = (long)datas[0];
		GuanQiaHelpManager.getIns().noticeState(hero, seekHelpId);
	} 
	/**
	 * 离开战斗 5915
	 * @param seekHelpId| 队伍id| long
	 */
	public void exitFight(Hero hero, Object[] datas){
		long seekHelpId = (long)datas[0];
		GuanQiaHelpManager.getIns().exitFight(hero, seekHelpId);
	} 
}