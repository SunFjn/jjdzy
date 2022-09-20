package com.teamtop.system.excalibur;
import com.teamtop.system.hero.Hero;

/**
 * ExcaliburCG.java
 * 神剑
 */
public class ExcaliburCG{

	private static ExcaliburCG ins = null;

	public static ExcaliburCG getIns(){
		if(ins == null){
			ins = new ExcaliburCG();
		}
		return ins;
	}

	/**
	 * 打开神剑界面 1001
	 */
	public void openExcalibur(Hero hero, Object[] datas){
		ExcaliburManager.getIns().openExcalibur(hero);
	} 
	/**
	 * 激活神剑 1003
	 * @param excaliburId| 神剑id| int
	 */
	public void activateExcalibur(Hero hero, Object[] datas){
		int excaliburId = (int)datas[0];
		ExcaliburManager.getIns().activateExcalibur(hero, excaliburId);
	} 
	/**
	 * 神剑升星 1005
	 * @param excaliburId| 神剑id| int
	 */
	public void upgradeStar(Hero hero, Object[] datas){
		int excaliburId = (int)datas[0];
		ExcaliburManager.getIns().upgradeStar(hero, excaliburId);
	} 
	/**
	 * 吞噬神剑属性丹 1007
	 * @param type| 0：吞噬，1：一键吞噬| byte
	 */
	public void devourElixir(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		ExcaliburManager.getIns().devourElixir(hero, type);
	} 
	/**
	 * 神剑操作 1009
	 * @param operateType| 操作类型: 1：装备上，2：卸下| byte
	 * @param excaliburId| 神剑id| int
	 */
	public void operateExcalibur(Hero hero, Object[] datas){
		int operateType = (byte)datas[0];
		int excaliburId = (int)datas[1];
		ExcaliburManager.getIns().operateExcalibur(hero, operateType, excaliburId);
	} 
}