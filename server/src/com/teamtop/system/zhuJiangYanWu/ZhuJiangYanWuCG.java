package com.teamtop.system.zhuJiangYanWu;
import com.teamtop.system.hero.Hero;

/**
 * ZhuJiangYanWuCG.java
 * 诸将演武
 */
public class ZhuJiangYanWuCG{

	private static ZhuJiangYanWuCG ins = null;

	public static ZhuJiangYanWuCG getIns(){
		if(ins == null){
			ins = new ZhuJiangYanWuCG();
		}
		return ins;
	}

	/**
	 * 打开界面 4713
	 */
	public void openUI(Hero hero, Object[] datas){
		ZhuJiangYanWuManager.getIns().openUI(hero);
	} 
	/**
	 * 挑战 4715
	 * @param index| 位置ID| short
	 */
	public void battle(Hero hero, Object[] datas){
		int index = (short)datas[0];
		ZhuJiangYanWuManager.getIns().battle(hero, index);
	} 
	/**
	 * 战斗结果 4717
	 * @param index| 位置| short
	 * @param result| 战斗结果| byte
	 */
	public void battleEnd(Hero hero, Object[] datas){
		int index = (short)datas[0];
		int result = (byte)datas[1];
		ZhuJiangYanWuManager.getIns().battleEnd(hero, index, result);
	} 
}