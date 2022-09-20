package com.teamtop.system.liuChuQiShan;
import com.teamtop.system.hero.Hero;

/**
 * LiuChuQiShanCG.java
 * 六出祁山
 */
public class LiuChuQiShanCG{

	private static LiuChuQiShanCG ins = null;

	public static LiuChuQiShanCG getIns(){
		if(ins == null){
			ins = new LiuChuQiShanCG();
		}
		return ins;
	}

	/**
	 * 打开界面 8201
	 */
	public void openUI(Hero hero, Object[] datas){
		LiuChuQiShanManager.getIns().openUI(hero);
	} 
	/**
	 * 查看队伍信息 8203
	 * @param id| 关卡id| int
	 */
	public void getTeamData(Hero hero, Object[] datas){
		int id = (int)datas[0];
		LiuChuQiShanManager.getIns().getTeamData(hero, id);
	} 
	/**
	 * 创建队伍 8205
	 * @param id| 关卡id| int
	 */
	public void buildTeam(Hero hero, Object[] datas){
		int id = (int)datas[0];
		LiuChuQiShanManager.getIns().buildTeam(hero, id);
	} 
	/**
	 * 踢人 8207
	 * @param hidOth| 玩家id| long
	 */
	public void removeMember(Hero hero, Object[] datas){
		long hidOth = (long)datas[0];
		LiuChuQiShanManager.getIns().removeMember(hero, hidOth);
	} 
	/**
	 * 广播邀请协助 8209
	 */
	public void broadCast(Hero hero, Object[] datas){
		LiuChuQiShanManager.getIns().broadCast(hero);
	} 
	/**
	 * 离开队伍 8211
	 * @param id| 关卡id| int
	 */
	public void leave(Hero hero, Object[] datas){
		int id = (int)datas[0];
		LiuChuQiShanManager.getIns().leave(hero, id);
	} 
	/**
	 * 加入队伍 8213
	 * @param teamID| 队伍id| int
	 * @param id| 关卡id| int
	 */
	public void joinByTeamID(Hero hero, Object[] datas){
		int teamID = (int)datas[0];
		int id = (int)datas[1];
		LiuChuQiShanManager.getIns().joinByTeamID(hero, teamID, id);
	} 
	/**
	 * 开始战斗 8215
	 */
	public void battle(Hero hero, Object[] datas){
		LiuChuQiShanManager.getIns().battle(hero);
	} 
	/**
	 * 退出副本 8223
	 */
	public void leaveBattle(Hero hero, Object[] datas){
		LiuChuQiShanManager.getIns().leaveBattle(hero);
	} 
	/**
	 * 扫荡 8225
	 */
	public void saoDang(Hero hero, Object[] datas){
		LiuChuQiShanManager.getIns().saoDang(hero);
	} 
}