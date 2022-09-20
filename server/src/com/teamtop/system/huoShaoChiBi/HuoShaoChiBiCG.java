package com.teamtop.system.huoShaoChiBi;
import com.teamtop.system.hero.Hero;

/**
 * HuoShaoChiBiCG.java
 * 火烧赤壁
 */
public class HuoShaoChiBiCG{

	private static HuoShaoChiBiCG ins = null;

	public static HuoShaoChiBiCG getIns(){
		if(ins == null){
			ins = new HuoShaoChiBiCG();
		}
		return ins;
	}

	/**
	 * 打开界面 7931
	 */
	public void openUi(Hero hero, Object[] datas){
		HuoShaoChiBiManager.getIns().openUi(hero);
	} 
	/**
	 * 爬塔 7933
	 */
	public void upPower(Hero hero, Object[] datas){
		HuoShaoChiBiManager.getIns().upPower(hero);
	} 
	/**
	 * 请求本人关卡奖励 7935
	 */
	public void beatBossWin(Hero hero, Object[] datas){
		HuoShaoChiBiManager.getIns().beatBossWin(hero);
	} 
}