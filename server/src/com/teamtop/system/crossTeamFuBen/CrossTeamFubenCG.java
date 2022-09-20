package com.teamtop.system.crossTeamFuBen;
import com.teamtop.system.hero.Hero;

/**
 * CrossTeamFubenCG.java
 * 跨服组队
 */
public class CrossTeamFubenCG{

	private static CrossTeamFubenCG ins = null;

	public static CrossTeamFubenCG getIns(){
		if(ins == null){
			ins = new CrossTeamFubenCG();
		}
		return ins;
	}

	/**
	 * 查看副本组队信息 3401
	 * @param id| 副本ID| byte
	 */
	public void openUI(Hero hero, Object[] datas){
		int id = (byte)datas[0];
		CrossTeamFubenManager.getIns().openUI(hero, id);
	} 
	/**
	 * （跨服）快速加入 3403
	 * @param type| 类型  1创建副本  2快速加入| byte
	 * @param id| 副本ID| byte
	 */
	public void autoJoin(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		int id = (byte)datas[1];
		CrossTeamFubenManager.getIns().autoJoin(hero, type, id);
	} 
	/**
	 * （跨服）踢人 3405
	 * @param hidOth| 队员ID| long
	 */
	public void removeMenber(Hero hero, Object[] datas){
		long hidOth = (long)datas[0];
		CrossTeamFubenManager.getIns().removeMenber(hero, hidOth);
	} 
	/**
	 * （跨服）开始挑战 3407
	 */
	public void battle(Hero hero, Object[] datas){
		CrossTeamFubenManager.getIns().battle(hero);
	} 
	/**
	 * （跨服）离开队伍 3409
	 */
	public void leave(Hero hero, Object[] datas){
		CrossTeamFubenManager.getIns().leave(hero);
	} 
	/**
	 * （跨服）加入指定队伍 3411
	 * @param teamID| 队伍ID| int
	 * @param fbID| 副本ID| byte
	 */
	public void joinByTeamID(Hero hero, Object[] datas){
		int teamID = (int)datas[0];
		int fbID = (byte)datas[1];
		CrossTeamFubenManager.getIns().joinByTeamID(hero, teamID, fbID);
	} 
	/**
	 * （跨服）拉一个机器人入队伍 3413
	 */
	public void addMember(Hero hero, Object[] datas){
		CrossTeamFubenManager.getIns().addMember(hero);
	} 
	/**
	 * 登录中央服 3421
	 * @param id| 副本ID| byte
	 * @param teamID| 队伍ID（默认是0，聊天框请求队伍ID）| int
	 */
	public void loginCross(Hero hero, Object[] datas){
		int id = (byte)datas[0];
		int teamID = (int)datas[1];
		CrossTeamFubenManager.getIns().loginCross(hero, id, teamID);
	} 
	/**
	 * 退出副本 3419
	 */
	public void leaveBattle(Hero hero, Object[] datas){
		CrossTeamFubenManager.getIns().leaveBattle(hero);
	} 
	/**
	 * 收益使用姿态 3425
	 * @param state| 姿态  0勾选  其他:不勾选| byte
	 */
	public void awardsState(Hero hero, Object[] datas){
		int state = (byte)datas[0];
		CrossTeamFubenManager.getIns().awardsState(hero, state);
	} 
}