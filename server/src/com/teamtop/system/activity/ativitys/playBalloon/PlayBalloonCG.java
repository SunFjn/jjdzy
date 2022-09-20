package com.teamtop.system.activity.ativitys.playBalloon;
import com.teamtop.system.hero.Hero;

/**
 * PlayBalloonCG.java
 * 打气球
 */
public class PlayBalloonCG{

	private static PlayBalloonCG ins = null;

	public static PlayBalloonCG getIns(){
		if(ins == null){
			ins = new PlayBalloonCG();
		}
		return ins;
	}

	/**
	 * 射击 10001
	 * @param index| 射击编号id(1-12),最小编号为1，最大编号为气球数| byte
	 */
	public void shooting(Hero hero, Object[] datas){
		int index = (byte)datas[0];
		PlayBalloonManager.getIns().shooting(hero, index);
	} 
}