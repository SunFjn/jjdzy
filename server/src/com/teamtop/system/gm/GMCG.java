package com.teamtop.system.gm;
import com.teamtop.system.hero.Hero;

/**
 * GMCG.java
 * GM命令
 */
public class GMCG{

	private static GMCG ins = null;

	public static GMCG getIns(){
		if(ins == null){
			ins = new GMCG();
		}
		return ins;
	}

	/**
	 * GM命令
	 * @param gmType| 系统类型| short
	 * @param sysType| 方法类型| short
	 * @param content| 内容| String
	 */
	public void gm(Hero hero, Object[] datas){
		int gmType = (short)datas[0];
		int sysType = (short)datas[1];
		String content = (String)datas[2];
		GMManager.getIns().gm(hero, gmType, sysType, content);
	} 
}