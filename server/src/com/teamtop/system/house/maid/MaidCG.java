package com.teamtop.system.house.maid;
import com.teamtop.system.hero.Hero;

/**
 * MaidCG.java
 * 侍女
 */
public class MaidCG{

	private static MaidCG ins = null;

	public static MaidCG getIns(){
		if(ins == null){
			ins = new MaidCG();
		}
		return ins;
	}

	/**
	 * 打开界面 11301
	 */
	public void openUI(Hero hero, Object[] datas){
		MaidManager.getIns().openUI(hero);
	} 
	/**
	 * 激活/升星侍女 11303
	 * @param index| 配置表id| int
	 */
	public void upMaid(Hero hero, Object[] datas){
		int index = (int)datas[0];
		MaidManager.getIns().upMaid(hero, index);
	} 
	/**
	 * 升级侍女 11305
	 * @param id| 侍女id| int
	 * @param type| 类型 1升级 2一键升级| byte
	 */
	public void upMaidLevel(Hero hero, Object[] datas){
		int id = (int)datas[0];
		int type = (byte)datas[1];
		MaidManager.getIns().upMaidLevel(hero, id, type);
	} 
	/**
	 * 使用形象 11307
	 * @param id| 侍女id| int
	 */
	public void useMaid(Hero hero, Object[] datas){
		int id = (int)datas[0];
		MaidManager.getIns().useMaid(hero, id);
	} 
}