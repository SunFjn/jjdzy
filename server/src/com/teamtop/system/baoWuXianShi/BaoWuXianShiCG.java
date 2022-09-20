package com.teamtop.system.baoWuXianShi;
import com.teamtop.system.hero.Hero;

/**
 * BaoWuXianShiCG.java
 * 宝物现世
 */
public class BaoWuXianShiCG{

	private static BaoWuXianShiCG ins = null;

	public static BaoWuXianShiCG getIns(){
		if(ins == null){
			ins = new BaoWuXianShiCG();
		}
		return ins;
	}

	/**
	 * 战斗结束通知 4001
	 * @param result| 前端战斗结果  0:失败，1：成功| byte
	 */
	public void getAwards(Hero hero, Object[] datas){
		int result = (byte)datas[0];
		BaoWuXianShiManager.getIns().getAwards(hero, result);
	} 
}