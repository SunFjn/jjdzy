package com.teamtop.system.activity.ativitys.caoCaoCome;
import com.teamtop.system.hero.Hero;

/**
 * CaoCaoComeCG.java
 * 曹操来袭
 */
public class CaoCaoComeCG{

	private static CaoCaoComeCG ins = null;

	public static CaoCaoComeCG getIns(){
		if(ins == null){
			ins = new CaoCaoComeCG();
		}
		return ins;
	}

	/**
	 * CG 打开boss伤害排行榜 8511
	 */
	public void openRank(Hero hero, Object[] datas){
		CaoCaoComeManager.getIns().openRank(hero);
	} 
	/**
	 * 进入曹操boss场景 8513
	 */
	public void join(Hero hero, Object[] datas){
		CaoCaoComeManager.getIns().join(hero);
	} 
	/**
	 * CG 退出 8515
	 */
	public void quit(Hero hero, Object[] datas){
		CaoCaoComeManager.getIns().quit(hero);
	} 
	/**
	 * CG 通知后端 我本人死亡了 8521
	 */
	public void cgherodie(Hero hero, Object[] datas){
		CaoCaoComeManager.getIns().cgherodie(hero);
	} 
	/**
	 * CG 买活 8523
	 * @param type| 0买活 1申请复活| byte
	 */
	public void buyLive(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		CaoCaoComeManager.getIns().buyLive(hero, type);
	} 
	/**
	 * CG 自动复活状态 8525
	 * @param state| 1开启自动复活 0关闭自动| byte
	 */
	public void isaotufuhuo(Hero hero, Object[] datas){
		int state = (byte)datas[0];
		CaoCaoComeManager.getIns().isaotufuhuo(hero, state);
	} 
}