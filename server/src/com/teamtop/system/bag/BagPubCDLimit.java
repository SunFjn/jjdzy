package com.teamtop.system.bag;

import com.teamtop.system.hero.Hero;

/**
 * 背包公共cd
 * @author Administrator
 *
 */
public class BagPubCDLimit {
	/**
	 * 开始时间
	 */
	private static long starttime = 0;
	
	/**
	 * 是否在公共cd时间内
	 * 该方法判断操作的时间是否在指定操作范围内，如果否，则时间重置为当前时间，次数为1
	 * @param hero
	 * @return true 在cd内, false 已过cd 
	 */
	public static boolean isCDing(Hero hero) {
		synchronized (hero) {
			boolean isLessThanCDLimit = System.currentTimeMillis() - starttime < BagConst.CD_TIME;
			if(!isLessThanCDLimit) {
				starttime = System.currentTimeMillis();
			}
			/*if(hero.getVip().getLevel() < BagConst.VIP_LEVEL_LIMIT && times >= BagConst.CD_LIMIT_TIMES) {
				return isLessThanCDLimit;
			}*/
			return false;
		}
	}
	
}
