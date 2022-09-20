package com.teamtop.system.trueName;
import com.teamtop.system.hero.Hero;

/**
 * TrueNameCG.java
 * 实名验证
 */
public class TrueNameCG{

	private static TrueNameCG ins = null;

	public static TrueNameCG getIns(){
		if(ins == null){
			ins = new TrueNameCG();
		}
		return ins;
	}

	/**
	 * 发送实名身份证号 5291
	 * @param idCard| 身份证号| String
	 */
	public void sendIdCard(Hero hero, Object[] datas){
		String idCard = (String)datas[0];
		TrueNameManager.getIns().sendIdCard(hero, idCard);
	} 
	/**
	 * 实名验证 5293
	 * @param name| 真实姓名| String
	 * @param idCard| 身份证号| String
	 */
	public void trueName(Hero hero, Object[] datas){
		String name = (String)datas[0];
		String idCard = (String)datas[1];
		TrueNameManager.getIns().trueName(hero, name, idCard);
	} 
	/**
	 * 领取奖励 5295
	 */
	public void getReward(Hero hero, Object[] datas){
		TrueNameManager.getIns().getReward(hero);
	} 
}