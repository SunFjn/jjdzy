package com.teamtop.system.cdkey;
import com.teamtop.system.hero.Hero;

/**
 * CDkeyCG.java
 * 激活码
 */
public class CDkeyCG{

	private static CDkeyCG ins = null;

	public static CDkeyCG getIns(){
		if(ins == null){
			ins = new CDkeyCG();
		}
		return ins;
	}

	/**
	 * 领取激活码奖励 2211
	 * @param cdkey| 激活码| String
	 */
	public void getCDkeyAward(Hero hero, Object[] datas){
		String cdkey = (String)datas[0];
		CDkeyManager.getIns().getCDkeyAward(hero, cdkey);
	} 
}