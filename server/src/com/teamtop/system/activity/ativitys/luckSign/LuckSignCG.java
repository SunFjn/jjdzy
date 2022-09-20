package com.teamtop.system.activity.ativitys.luckSign;
import com.teamtop.system.hero.Hero;

/**
 * LuckSignCG.java
 * 新活动-幸运福签
 */
public class LuckSignCG{

	private static LuckSignCG ins = null;

	public static LuckSignCG getIns(){
		if(ins == null){
			ins = new LuckSignCG();
		}
		return ins;
	}

	/**
	 * 抽福签 12151
	 * @param type| 抽奖次数 1代表1次 2代表10次| byte
	 */
	public void draw(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		LuckSignManager.getIns().draw(hero, type);
	} 
	/**
	 * 打开排行 12153
	 */
	public void openRankUI(Hero hero, Object[] datas){
		LuckSignManager.getIns().openRankUI(hero);
	} 
	/**
	 * 领取目标奖励 12155
	 * @param sysId| 领取类型 1是总的目标类型 2是每日目标类型| byte
	 * @param awardId| 配置表id| int
	 */
	public void getTargetAward(Hero hero, Object[] datas){
		int sysId = (byte)datas[0];
		int awardId = (int)datas[1];
		LuckSignManager.getIns().getTargetAward(hero, sysId, awardId);
	} 
	/**
	 * 合成福签 12157
	 * @param id| 配置表id| int
	 * @param num| 合成的数量| int
	 */
	public void getAward(Hero hero, Object[] datas){
		int id = (int)datas[0];
		int num = (int)datas[1];
		LuckSignManager.getIns().getAward(hero, id, num);
	} 
	/**
	 * 开启福签 12159
	 * @param index| 配置表id| int
	 * @param count| 道具数量| int
	 */
	public void openLuckSign(Hero hero, Object[] datas){
		int index = (int)datas[0];
		int count = (int)datas[1];
		LuckSignManager.getIns().openLuckSign(hero, index, count);
	} 
}