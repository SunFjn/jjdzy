package com.teamtop.system.push;
import com.teamtop.system.hero.Hero;

/**
 * PushCG.java
 * 推送
 */
public class PushCG{

	private static PushCG ins = null;

	public static PushCG getIns(){
		if(ins == null){
			ins = new PushCG();
		}
		return ins;
	}

	/**
	 * 保存推送设置 7503
	 * @param data| 推送设置| Object[]
	 */
	public void setPust(Hero hero, Object[] datas){
		Object[] data = (Object[]) datas[0];
		PushManager.getIns().setPust(hero, data);
	} 
	/**
	 * 打开页面 7501
	 */
	public void openUI(Hero hero, Object[] datas){
		PushManager.getIns().openUI(hero);
	} 
}