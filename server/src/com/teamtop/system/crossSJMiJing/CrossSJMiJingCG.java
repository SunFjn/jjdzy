package com.teamtop.system.crossSJMiJing;
import com.teamtop.system.hero.Hero;

/**
 * CrossSJMiJingCG.java
 * 升阶秘境
 */
public class CrossSJMiJingCG{

	private static CrossSJMiJingCG ins = null;

	public static CrossSJMiJingCG getIns(){
		if(ins == null){
			ins = new CrossSJMiJingCG();
		}
		return ins;
	}

	/**
	 * 打开UI 3761
	 */
	public void openUI(Hero hero, Object[] datas){
		CrossSJMiJingManager.getIns().openUI(hero);
	} 
	/**
	 * （首次访问子服，连上中央服后就只发中央服）查看秘境队伍信息，同时请求3777连中央服 3763
	 * @param id| 秘境ID| short
	 */
	public void getMiJingTeamData(Hero hero, Object[] datas){
		int id = (short)datas[0];
		CrossSJMiJingManager.getIns().getMiJingTeamData(hero, id);
	} 
	/**
	 * （跨服）创建队伍 3765
	 * @param id| 秘境ID| short
	 */
	public void buildTeam(Hero hero, Object[] datas){
		int id = (short)datas[0];
		CrossSJMiJingManager.getIns().buildTeam(hero, id);
	} 
	/**
	 * （跨服）踢人 3767
	 * @param hidOth| 被踢者ID| long
	 */
	public void removeMember(Hero hero, Object[] datas){
		long hidOth = (long)datas[0];
		CrossSJMiJingManager.getIns().removeMember(hero, hidOth);
	} 
	/**
	 * （跨服）广播邀请协助 3769
	 */
	public void broadCast(Hero hero, Object[] datas){
		CrossSJMiJingManager.getIns().broadCast(hero);
	} 
	/**
	 * （跨服）离开队伍 3771
	 */
	public void leave(Hero hero, Object[] datas){
		CrossSJMiJingManager.getIns().leave(hero);
	} 
	/**
	 * （跨服）加入指定队伍 3773
	 * @param teamID| 队伍ID| int
	 * @param id| 秘境ID| short
	 */
	public void joinByTeamID(Hero hero, Object[] datas){
		int teamID = (int)datas[0];
		int id = (short)datas[1];
		CrossSJMiJingManager.getIns().joinByTeamID(hero, teamID, id);
	} 
	/**
	 * （跨服）开始战斗 3775
	 */
	public void battle(Hero hero, Object[] datas){
		CrossSJMiJingManager.getIns().battle(hero);
	} 
	/**
	 * （子服）登录中央服 3777
	 * @param id| 秘境ID| short
	 * @param teamID| 队伍ID（默认是0，聊天框请求队伍ID）| int
	 */
	public void loginCross(Hero hero, Object[] datas){
		int id = (short)datas[0];
		int teamID = (int)datas[1];
		CrossSJMiJingManager.getIns().loginCross(hero, id, teamID);
	} 
	/**
	 * （跨服）退出副本 3785
	 */
	public void leaveBattle(Hero hero, Object[] datas){
		CrossSJMiJingManager.getIns().leaveBattle(hero);
	} 
	/**
	 * （子服）扫荡 3787
	 * @param id| 类型  0扫荡全部  扫荡1个秘境就发秘境ID| short
	 */
	public void saoDang(Hero hero, Object[] datas){
		//int id = (short)datas[0];
		//CrossSJMiJingManager.getIns().saoDang(hero, id);
	} 
	/**
	 * （子服）购买宝箱 3789
	 * @param id| 秘境ID| short
	 */
	public void buyBox(Hero hero, Object[] datas){
		int id = (short)datas[0];
		CrossSJMiJingManager.getIns().buyBox(hero, id);
	} 
}