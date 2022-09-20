package com.teamtop.system.rewardBack;
import com.teamtop.system.hero.Hero;

/**
 * RewardBackCG.java
 * 奖励找回
 */
public class RewardBackCG{

	private static RewardBackCG ins = null;

	public static RewardBackCG getIns(){
		if(ins == null){
			ins = new RewardBackCG();
		}
		return ins;
	}

	/**
	 * 打开界面 5271
	 */
	public void openUI(Hero hero, Object[] datas){
		RewardBackManager.getIns().openUI(hero);
	} 
	/**
	 * 领取奖励 5273
	 * @param type| 找回类型，1：铜钱找回，2：元宝找回，3：全部找回| byte
	 * @param sysId| 系统id,全部找回时系统id必须为0| int
	 */
	public void getAward(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		int sysId = (int)datas[1];
		RewardBackManager.getIns().getAward(hero, type, sysId);
	} 
}