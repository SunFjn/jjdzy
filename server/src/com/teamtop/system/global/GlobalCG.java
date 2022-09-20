package com.teamtop.system.global;
import com.teamtop.system.hero.Hero;

/**
 * GlobalCG.java
 * 全局公用
 */
public class GlobalCG{

	private static GlobalCG ins = null;

	public static GlobalCG getIns(){
		if(ins == null){
			ins = new GlobalCG();
		}
		return ins;
	}

	/**
	 * CG申请同步服务器时间 251
	 */
	public void getServerTime(Hero hero, Object[] datas){
		GlobalManager.getIns().getServerTime(hero);
	} 
	/**
	 * 查看秘密数据（隐藏协议） 267
	 * @param anHao| 暗号（尽量复杂点）| String
	 * @param param| 参数| String
	 */
	public void showSecret(Hero hero, Object[] datas){
		String anHao = (String)datas[0];
		String param = (String)datas[1];
		GlobalManager.getIns().showSecret(hero, anHao, param);
	} 
}