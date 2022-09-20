package com.teamtop.system.redBox;
import com.teamtop.system.hero.Hero;

/**
 * RedBoxCG.java
 * 红包系统
 */
public class RedBoxCG{

	private static RedBoxCG ins = null;

	public static RedBoxCG getIns(){
		if(ins == null){
			ins = new RedBoxCG();
		}
		return ins;
	}

	/**
	 * CG 查看红包领取情况 11761
	 * @param boxid| 红包唯一id| long
	 */
	public void lookinfos(Hero hero, Object[] datas){
		long boxid = (long)datas[0];
		RedBoxManager.getIns().lookinfos(hero, boxid);
	} 
	/**
	 * CG 发送红包 11763
	 * @param fanum| 红包数量| long
	 * @param boxname| 红包名称| String
	 */
	public void faBoxs(Hero hero, Object[] datas){
		long fanum = (long)datas[0];
		String boxname = (String)datas[1];
		RedBoxManager.getIns().faBoxs(hero, fanum, boxname);
	} 
	/**
	 * CG领取红包 11765
	 * @param boxid| 红包唯一id| long
	 */
	public void getBox(Hero hero, Object[] datas){
		long boxid = (long)datas[0];
		RedBoxManager.getIns().getBox(hero, boxid);
	} 
	/**
	 * 打开红包ui返回11760 11769
	 */
	public void openUI(Hero hero, Object[] datas){
		RedBoxManager.getIns().openUI(hero);
	} 
}