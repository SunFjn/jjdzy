/**
 * 系统项目名称
 * com.game.system.imitator.service
 * ImitatorManager.java
 * 2012-9-10-上午02:19:35
 *  2012广东天拓-版权所有
 * 
 */
package com.teamtop.system.gm;

import com.teamtop.gameCommon.GameProperties;
import com.teamtop.system.hero.Hero;

public class GMManager {
	private static GMManager ins;
	private GMManager() {}
	public static GMManager getIns() {
		if(ins == null) {
			ins = new GMManager();
		}
		return ins;
	}
	/**
	 * 解析gm
	 * @param hero
	 * @param gmType
	 * @param sysType
	 * @param data
	 */
	public void gm(Hero hero,int gmType,int sysType,String data){
		if(!GameProperties.gmFlag) return;
		AbsGMEvent absGMEvent = GMCache.gmEventMap.get(gmType);
		absGMEvent.gm(hero,sysType, data.split("_"));
	}

}
