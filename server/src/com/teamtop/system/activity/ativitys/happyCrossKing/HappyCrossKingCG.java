package com.teamtop.system.activity.ativitys.happyCrossKing;
import com.teamtop.system.hero.Hero;

/**
 * HappyCrossKingCG.java
 * 全民狂欢—乱世枭雄
 */
public class HappyCrossKingCG{

	private static HappyCrossKingCG ins = null;

	public static HappyCrossKingCG getIns(){
		if(ins == null){
			ins = new HappyCrossKingCG();
		}
		return ins;
	}

	/**
	 * CG 打开ui信息 2581
	 */
	public void openUI(Hero hero, Object[] datas){
		HappyCrossKingManager.getIns().openUI(hero);
	} 
	/**
	 * CG 获取奖励 2583
	 * @param index| 奖励序号| byte
	 */
	public void getreward(Hero hero, Object[] datas){
		int index = (byte)datas[0];
		HappyCrossKingManager.getIns().getreward(hero, index);
	} 
}