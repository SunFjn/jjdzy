package com.teamtop.system.bingfa;
import com.teamtop.system.hero.Hero;

/**
 * BingFaCG.java
 * 兵法
 */
public class BingFaCG{

	private static BingFaCG ins = null;

	public static BingFaCG getIns(){
		if(ins == null){
			ins = new BingFaCG();
		}
		return ins;
	}

	/**
	 * CG 打开ui获取兵法 901
	 */
	public void getbingfa(Hero hero, Object[] datas){
		BingFaManager.getIns().getbingfa(hero);
	} 
	/**
	 * CG 激活/升阶兵法 903
	 * @param index| 兵法id| int
	 */
	public void upbingfa(Hero hero, Object[] datas){
		int index = (int)datas[0];
		BingFaManager.getIns().upbingfa(hero, index);
	} 
	/**
	 * CG 激活/升阶兵法套装 905
	 * @param index| 套装索引 1/2/3| byte
	 */
	public void upBFtaozhuang(Hero hero, Object[] datas){
		int index = (byte)datas[0];
		BingFaManager.getIns().upBFtaozhuang(hero, index);
	} 
	/**
	 * CG 使用丹药 907
	 * @param type| 使用方式 0 1颗 1一键| byte
	 */
	public void eatDan(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		BingFaManager.getIns().eatDan(hero, type);
	} 
	/**
	 * CG 获取某系统的培养等阶经验技能等级 909
	 * @param type| 1神剑2异宝3兵法4宝物5天书| byte
	 */
	public void getinfobysys(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		BingFaManager.getIns().getinfobysys(hero, type);
	} 
	/**
	 * CG 升阶 911
	 * @param type| 系统分类1神剑2异宝3兵法| byte
	 * @param uptype| 升阶方式0普通 1一键| byte
	 */
	public void upjiebysys(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		int uptype = (byte)datas[1];
		BingFaManager.getIns().upjiebysys(hero, type, uptype);
	} 
	/**
	 * CG 激活/升级技能  913
	 * @param type| 1-5| byte
	 * @param index| 位置id 12345| byte
	 */
	public void upskills(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		int index = (byte)datas[1];
		BingFaManager.getIns().upskills(hero, type, index);
	} 
}