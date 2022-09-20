package com.teamtop.system.directUp;
import com.teamtop.system.hero.Hero;

/**
 * DirectUPCG.java
 * 直升一阶丹
 */
public class DirectUPCG{

	private static DirectUPCG ins = null;

	public static DirectUPCG getIns(){
		if(ins == null){
			ins = new DirectUPCG();
		}
		return ins;
	}

	/**
	 * 升阶 3741
	 * @param type| 系统类型，1:武将，2:战甲，3:宝物，4:天书，5:神剑，6:兵法，7:异宝| byte
	 */
	public void directUp(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		DirectUPManager.getIns().directUp(hero, type);
	} 
}