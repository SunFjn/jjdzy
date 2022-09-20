package com.teamtop.system.crossTeamKing;
import com.teamtop.system.hero.Hero;

/**
 * CrossTeamKingCG.java
 * 跨服王者
 */
public class CrossTeamKingCG{

	private static CrossTeamKingCG ins = null;

	public static CrossTeamKingCG getIns(){
		if(ins == null){
			ins = new CrossTeamKingCG();
		}
		return ins;
	}

	/**
	 * 打开ui(活动开启时 进入跨服) 10821
	 */
	public void openUi(Hero hero, Object[] datas){
		CrossTeamKingManager.getIns().openUi(hero);
	} 
	/**
	 * CG 创建队伍（进入跨服） 10823
	 */
	public void createteam(Hero hero, Object[] datas){
		CrossTeamKingManager.getIns().createteam(hero);
	} 
	/**
	 * CG 邀请玩家参与（跨服） 10825
	 */
	public void invitation(Hero hero, Object[] datas){
		CrossTeamKingManager.getIns().invitation(hero);
	} 
	/**
	 * CG 申请加入某个队伍（子服） 10829
	 * @param teamid| 队伍id| int
	 */
	public void joinTeam(Hero hero, Object[] datas){
		int teamid = (int)datas[0];
		CrossTeamKingManager.getIns().joinTeam(hero, teamid);
	} 
	/**
	 * CG数组下标交换位置（跨服） 10833
	 * @param index1| 位置1| byte
	 * @param index2| 位置2| byte
	 */
	public void exchange(Hero hero, Object[] datas){
		int index1 = (byte)datas[0];
		int index2 = (byte)datas[1];
		CrossTeamKingManager.getIns().exchange(hero, index1, index2);
	} 
	/**
	 * CG 退出队伍（跨服） 10835
	 */
	public void exitteam(Hero hero, Object[] datas){
		CrossTeamKingManager.getIns().exitteam(hero);
	} 
	/**
	 * CG 移除队友（跨服） 10837
	 * @param index| 队友位置012| int
	 */
	public void moveMeber(Hero hero, Object[] datas){
		int index = (int)datas[0];
		CrossTeamKingManager.getIns().moveMeber(hero, index);
	} 
	/**
	 * CG 开始匹配战斗（跨服） 10839
	 */
	public void marryBattle(Hero hero, Object[] datas){
		CrossTeamKingManager.getIns().marryBattle(hero);
	} 
	/**
	 * 打开排行榜 10847
	 * @param rebornIndex| 对于转生段位| byte
	 */
	public void openRank(Hero hero, Object[] datas){
		int rebornIndex = (byte)datas[0];
		CrossTeamKingManager.getIns().openRank(hero, rebornIndex);
	} 
	/**
	 * CG 获取每日宝箱奖励 10849
	 * @param rewardindex| 奖励索引| int
	 */
	public void getReward(Hero hero, Object[] datas){
		int rewardindex = (int)datas[0];
		CrossTeamKingManager.getIns().getReward(hero, rewardindex);
	} 
	/**
	 * CG 查询战报（跨服） 10851
	 */
	public void getLog(Hero hero, Object[] datas){
		CrossTeamKingManager.getIns().getLog(hero);
	} 
	/**
	 * CG 取消匹配战斗（跨服） 10855
	 */
	public void cancelMarry(Hero hero, Object[] datas){
		CrossTeamKingManager.getIns().cancelMarry(hero);
	} 
	/**
	 * CG 结束当前pve战斗（跨服） 10857
	 * @param rest| 0胜利 1失败| byte
	 * @param kill| 杀死电脑的数量| byte
	 */
	public void overPveBattle(Hero hero, Object[] datas){
		int rest = (byte)datas[0];
		int kill = (byte)datas[1];
		CrossTeamKingManager.getIns().overPveBattle(hero, rest, kill);
	} 
	/**
	 * CG 进入活动 10859
	 */
	public void joinAct(Hero hero, Object[] datas){
		CrossTeamKingManager.getIns().joinAct(hero);
	} 
	/**
	 *  10861
	 * @param count| 需要购买的次数| int
	 */
	public void buyCount(Hero hero, Object[] datas){
		int count = (int)datas[0];
		CrossTeamKingManager.getIns().buyCount(hero, count);
	} 
	/**
	 * CG 退出战斗（pvp pve） 10863
	 */
	public void quitBattle(Hero hero, Object[] datas){
		CrossTeamKingManager.getIns().quitBattle(hero);
	} 
}