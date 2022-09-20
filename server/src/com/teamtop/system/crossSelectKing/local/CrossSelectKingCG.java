package com.teamtop.system.crossSelectKing.local;
import com.teamtop.system.hero.Hero;

/**
 * CrossSelectKingCG.java
 * 枭雄争霸
 */
public class CrossSelectKingCG{

	private static CrossSelectKingCG ins = null;

	public static CrossSelectKingCG getIns(){
		if(ins == null){
			ins = new CrossSelectKingCG();
		}
		return ins;
	}

	/**
	 * CG 打开ui 2101
	 * @param flog| 比赛进程（0-4）第几轮| byte
	 */
	public void openUi(Hero hero, Object[] datas){
		int flog = (byte)datas[0];
		CrossSelectKingManager.getIns().openUi(hero, flog);
	} 
	/**
	 * CG 买比赛输赢 2103
	 * @param round| 第几轮| byte
	 * @param count| 第几场| byte
	 * @param win| 1为ID1赢, 2为ID2赢| byte
	 */
	public void buyWin(Hero hero, Object[] datas){
		int round = (byte)datas[0];
		int count = (byte)datas[1];
		int win = (byte)datas[2];
		CrossSelectKingManager.getIns().buyWin(hero, round, count, win);
	} 
	/**
	 * CG 观看比赛 2105
	 * @param round| 第几轮| byte
	 * @param count| 第几场| byte
	 */
	public void lookBattle(Hero hero, Object[] datas){
		int round = (byte)datas[0];
		int count = (byte)datas[1];
		CrossSelectKingManager.getIns().lookBattle(hero, round, count);
	} 
	/**
	 * CG 打开名人堂 2109
	 */
	public void openWiners(Hero hero, Object[] datas){
		CrossSelectKingManager.getIns().openWiners(hero);
	} 
	/**
	 * CG 膜拜 2111
	 */
	public void mobai(Hero hero, Object[] datas){
		CrossSelectKingManager.getIns().mobai(hero);
	} 
	/**
	 * CG 获取冠军奖励 2113
	 */
	public void getFrist(Hero hero, Object[] datas){
		CrossSelectKingManager.getIns().getFrist(hero);
	} 
}