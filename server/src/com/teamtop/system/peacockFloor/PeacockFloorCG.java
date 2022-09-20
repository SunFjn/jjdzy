package com.teamtop.system.peacockFloor;
import com.teamtop.system.hero.Hero;

/**
 * PeacockFloorCG.java
 * 铜雀台
 */
public class PeacockFloorCG{

	private static PeacockFloorCG ins = null;

	public static PeacockFloorCG getIns(){
		if(ins == null){
			ins = new PeacockFloorCG();
		}
		return ins;
	}

	/**
	 * CG 打开铜雀台ui 1221
	 */
	public void openUi(Hero hero, Object[] datas){
		PeacockFloorManager.getIns().openUi(hero);
	} 
	/**
	 * CG 获取某一双倍关卡的通过人数 1223
	 * @param floorNum| 关卡id| int
	 */
	public void getNum(Hero hero, Object[] datas){
		int floorNum = (int)datas[0];
		PeacockFloorManager.getIns().getNum(hero, floorNum);
	} 
	/**
	 * CG 获取某关卡的双倍奖励 1225
	 * @param floornum| 层数| int
	 */
	public void getreward(Hero hero, Object[] datas){
		int floornum = (int)datas[0];
		PeacockFloorManager.getIns().getreward(hero, floornum);
	} 
	/**
	 * CG 爬塔 1227
	 */
	public void upPower(Hero hero, Object[] datas){
		PeacockFloorManager.getIns().upPower(hero);
	} 
	/**
	 * CG 请求本关卡奖励 1229
	 */
	public void beatBossWin(Hero hero, Object[] datas){
		PeacockFloorManager.getIns().beatBossWin(hero);
	} 
}