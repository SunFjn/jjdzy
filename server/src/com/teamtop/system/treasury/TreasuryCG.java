package com.teamtop.system.treasury;
import com.teamtop.system.hero.Hero;

/**
 * TreasuryCG.java
 * 宝库
 */
public class TreasuryCG{

	private static TreasuryCG ins = null;

	public static TreasuryCG getIns(){
		if(ins == null){
			ins = new TreasuryCG();
		}
		return ins;
	}

	/**
	 * 打开宝库界面 2041
	 * @param tid| 宝库id，1：隆中宝库，2：无双宝库，3：枭雄宝库，4：三国宝库| byte
	 */
	public void openUI(Hero hero, Object[] datas){
		int tid = (byte)datas[0];
		TreasuryManager.getIns().openUI(hero, tid);
	} 
	/**
	 * 兑换 2043
	 * @param tid| 宝库id，1：隆中宝库，2：无双宝库，3：枭雄宝库，4：三国宝库| int
	 * @param goodsId| 商品id| int
	 */
	public void exchange(Hero hero, Object[] datas){
		int tid = (int)datas[0];
		int goodsId = (int)datas[1];
		TreasuryManager.getIns().exchange(hero, tid, goodsId);
	} 
}