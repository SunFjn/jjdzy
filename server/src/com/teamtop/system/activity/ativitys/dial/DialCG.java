package com.teamtop.system.activity.ativitys.dial;
import com.teamtop.system.hero.Hero;

/**
 * DialCG.java
 * 充值转盘(活动)
 */
public class DialCG{

	private static DialCG ins = null;

	public static DialCG getIns(){
		if(ins == null){
			ins = new DialCG();
		}
		return ins;
	}

	/**
	 * 转盘抽奖 8493
	 */
	public void turnDial(Hero hero, Object[] datas){
		DialManager.getIns().turnDial(hero);
	} 
}