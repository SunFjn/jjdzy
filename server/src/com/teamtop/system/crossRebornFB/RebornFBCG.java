package com.teamtop.system.crossRebornFB;
import com.teamtop.system.hero.Hero;

/**
 * RebornFBCG.java
 * 轮回副本
 */
public class RebornFBCG{

	private static RebornFBCG ins = null;

	public static RebornFBCG getIns(){
		if(ins == null){
			ins = new RebornFBCG();
		}
		return ins;
	}

	/**
	 * 打开轮回副本界面 11861
	 */
	public void openUi(Hero hero, Object[] datas){
		RebornFBManager.getIns().openUi(hero);
	} 
	/**
	 * 创建队伍 11863
	 * @param rebornLv| 轮回等级| int
	 */
	public void createTeam(Hero hero, Object[] datas){
		int rebornLv = (int)datas[0];
		RebornFBManager.getIns().createTeam(hero, rebornLv);
	} 
	/**
	 * 申请加入队伍 11867
	 * @param teamId| 队伍id| int
	 */
	public void joinTeam(Hero hero, Object[] datas){
		int teamId = (int)datas[0];
		RebornFBManager.getIns().joinTeam(hero, teamId);
	} 
	/**
	 * 发出邀请 11869
	 */
	public void invitation(Hero hero, Object[] datas){
		RebornFBManager.getIns().invitation(hero);
	} 
	/**
	 * 退出队伍 11873
	 */
	public void exitTeam(Hero hero, Object[] datas){
		RebornFBManager.getIns().exitTeam(hero);
	} 
	/**
	 * 移除队友 11875
	 * @param memHid| 队友hid| long
	 */
	public void moveMeber(Hero hero, Object[] datas){
		long memHid = (long)datas[0];
		RebornFBManager.getIns().moveMeber(hero, memHid);
	} 
	/**
	 * 刷新星级 11877
	 */
	public void refreshStar(Hero hero, Object[] datas){
		RebornFBManager.getIns().refreshStar(hero);
	} 
	/**
	 * 开始挑战 11881
	 */
	public void battle(Hero hero, Object[] datas){
		RebornFBManager.getIns().battle(hero);
	} 
	/**
	 * 退出战斗 11887
	 */
	public void leaveBattle(Hero hero, Object[] datas){
		RebornFBManager.getIns().leaveBattle(hero);
	} 
	/**
	 * 登录中央服 11891
	 */
	public void loginCross(Hero hero, Object[] datas){
		RebornFBManager.getIns().loginCross(hero);
	} 
}