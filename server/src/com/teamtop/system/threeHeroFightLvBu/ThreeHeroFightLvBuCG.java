package com.teamtop.system.threeHeroFightLvBu;
import com.teamtop.system.hero.Hero;

/**
 * ThreeHeroFightLvBuCG.java
 * 三英战吕布
 */
public class ThreeHeroFightLvBuCG{

	private static ThreeHeroFightLvBuCG ins = null;

	public static ThreeHeroFightLvBuCG getIns(){
		if(ins == null){
			ins = new ThreeHeroFightLvBuCG();
		}
		return ins;
	}

	/**
	 * 打开界面 9771
	 */
	public void openUI(Hero hero, Object[] datas){
		ThreeHeroFightLvBuManager.getIns().openUI(hero);
	} 
	/**
	 * 创建队伍 9773
	 * @param hardType| 选择难度(1普通，2困难)| byte
	 */
	public void createTeam(Hero hero, Object[] datas){
		int hardType = (byte)datas[0];
		ThreeHeroFightLvBuManager.getIns().createTeam(hero, hardType);
	} 
	/**
	 * 踢出队伍 9775
	 * @param id| 被踢玩家id| long
	 */
	public void kickOut(Hero hero, Object[] datas){
		long id = (long)datas[0];
		ThreeHeroFightLvBuManager.getIns().kickOut(hero, id);
	} 
	/**
	 * 邀请组队 9777
	 */
	public void broadCastInvite(Hero hero, Object[] datas){
		ThreeHeroFightLvBuManager.getIns().broadCastInvite(hero);
	} 
	/**
	 * 离开队伍 9779
	 */
	public void leaveTeam(Hero hero, Object[] datas){
		ThreeHeroFightLvBuManager.getIns().leaveTeam(hero);
	} 
	/**
	 * 加入队伍 9781
	 * @param teamId| 队伍id| int
	 */
	public void joinByTeamId(Hero hero, Object[] datas){
		int teamId = (int)datas[0];
		ThreeHeroFightLvBuManager.getIns().joinByTeamId(hero, teamId);
	} 
	/**
	 * 开始挑战（进第一个地图） 9783
	 */
	public void challenge(Hero hero, Object[] datas){
		ThreeHeroFightLvBuManager.getIns().challenge(hero);
	} 
	/**
	 * 进入下一关（跳转地图） 9785
	 */
	public void enterNext(Hero hero, Object[] datas){
		ThreeHeroFightLvBuManager.getIns().enterNext(hero);
	} 
	/**
	 * 复活 9787
	 */
	public void relive(Hero hero, Object[] datas){
		ThreeHeroFightLvBuManager.getIns().relive(hero);
	} 
	/**
	 * 退出挑战（副本） 9789
	 */
	public void exitCha(Hero hero, Object[] datas){
		ThreeHeroFightLvBuManager.getIns().exitCha(hero);
	} 
	/**
	 * 点击boss挑战 9791
	 */
	public void chaBoss(Hero hero, Object[] datas){
		ThreeHeroFightLvBuManager.getIns().chaBoss(hero);
	} 
	/**
	 * 转让队长 9803
	 * @param memberId| 队员id| long
	 */
	public void changeLeader(Hero hero, Object[] datas){
		long memberId = (long)datas[0];
		ThreeHeroFightLvBuManager.getIns().changeLeader(hero, memberId);
	} 
	/**
	 * 购买挑战次数 9805
	 * @param buyNum| 购买次数| byte
	 */
	public void buyChaNum(Hero hero, Object[] datas){
		int buyNum = (byte)datas[0];
		ThreeHeroFightLvBuManager.getIns().buyChaNum(hero, buyNum);
	} 
}