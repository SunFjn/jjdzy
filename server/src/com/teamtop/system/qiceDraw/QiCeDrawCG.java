package com.teamtop.system.qiceDraw;
import com.teamtop.system.hero.Hero;

/**
 * QiCeDrawCG.java
 * 出谋策划
 */
public class QiCeDrawCG{

	private static QiCeDrawCG ins = null;

	public static QiCeDrawCG getIns(){
		if(ins == null){
			ins = new QiCeDrawCG();
		}
		return ins;
	}

	/**
	 * 打开界面 9751
	 */
	public void openUI(Hero hero, Object[] datas){
		QiCeDrawManager.getIns().openUI(hero);
	} 
	/**
	 * 抽奖 9753
	 * @param type| 抽奖类型 1为1次 2为10次| byte
	 */
	public void draw(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		QiCeDrawManager.getIns().draw(hero, type);
	} 
	/**
	 * 领取目标奖励 9755
	 * @param id| 目标id| int
	 */
	public void getAward(Hero hero, Object[] datas){
		int id = (int)datas[0];
		QiCeDrawManager.getIns().getAward(hero, id);
	} 
}