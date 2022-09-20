package com.teamtop.system.boss.qmboss;
import com.teamtop.system.hero.Hero;

/**
 * QMBossHeroCG.java
 * 全民boss
 */
public class QMBossHeroCG{

	private static QMBossHeroCG ins = null;

	public static QMBossHeroCG getIns(){
		if(ins == null){
			ins = new QMBossHeroCG();
		}
		return ins;
	}

	/**
	 * CG 打开全民boss 1351
	 */
	public void openUi(Hero hero, Object[] datas){
		QMBossHeroManager.getIns().openUi(hero);
	} 
	/**
	 * CG 进入全民boss副本 1353
	 * @param fbid| 副本id| int
	 */
	public void inatt(Hero hero, Object[] datas){
		int fbid = (int)datas[0];
		QMBossHeroManager.getIns().inatt(hero, fbid);
	} 
	/**
	 * CG 离开当前全民boss关卡 1359
	 */
	public void quitQMboss(Hero hero, Object[] datas){
		QMBossHeroManager.getIns().quitQMboss(hero);
	} 
	/**
	 * CG 打开全名boss排行榜 1361
	 */
	public void openRank(Hero hero, Object[] datas){
		QMBossHeroManager.getIns().openRank(hero);
	} 
	/**
	 * 单机版获取奖励 1367
	 * @param fubId| 副本id| int
	 */
	public void getDanJiRes(Hero hero, Object[] datas){
		int fubId = (int)datas[0];
		QMBossHeroManager.getIns().getDanJiRes(hero, fubId);
	} 
	/**
	 * CG 扫荡全名boss副本 1369
	 * @param fbid| 副本id| int
	 */
	public void mopup(Hero hero, Object[] datas){
		int fbid = (int)datas[0];
		QMBossHeroManager.getIns().mopup(hero, fbid);
	} 
}