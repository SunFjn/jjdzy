package com.teamtop.system.godbook;
import com.teamtop.system.hero.Hero;

/**
 * GodBookCG.java
 * 天书
 */
public class GodBookCG{

	private static GodBookCG ins = null;

	public static GodBookCG getIns(){
		if(ins == null){
			ins = new GodBookCG();
		}
		return ins;
	}

	/**
	 * CG 打开天书UI 971
	 */
	public void openUi(Hero hero, Object[] datas){
		GodBookManager.getIns().openUi(hero);
	} 
	/**
	 * CG 切换携带天书 973
	 * @param bookid| 天书id| int
	 */
	public void charge(Hero hero, Object[] datas){
		int bookid = (int)datas[0];
		GodBookManager.getIns().charge(hero, bookid);
	} 
	/**
	 * CG 升级天书 975
	 * @param type| 升级方式 0 1颗 1一键| byte
	 */
	public void upLevel(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		GodBookManager.getIns().upLevel(hero, type);
	} 
	/**
	 * CG 激活/升阶天书星级 977
	 * @param bookid| 天书id| int
	 */
	public void upStar(Hero hero, Object[] datas){
		int bookid = (int)datas[0];
		GodBookManager.getIns().upStar(hero, bookid);
	} 
	/**
	 * CG 使用丹药 979
	 * @param type| 0 1颗 1一键| byte
	 */
	public void eatDan(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		GodBookManager.getIns().eatDan(hero, type);
	} 
}