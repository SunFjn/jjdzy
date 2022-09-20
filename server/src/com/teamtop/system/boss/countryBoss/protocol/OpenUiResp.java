package com.teamtop.system.boss.countryBoss.protocol;

import com.teamtop.util.communication.io.protocol.ProtocolAssist;

/**
 * OpenUiReq.java
 * GC 打开国家boss返回
 */
public class OpenUiResp  implements ProtocolAssist{

	@Override
	public String[] sortFieldsName() {
		return new String[]{ "bossIndex" , "maxHp" , "hp" , "killBossinfo" , "battleNum" , "buyNum" , "rewards" };
	}

	public OpenUiResp(   int  bossIndex ,   long  maxHp ,   long  hp ,   Object[]  killBossinfo ,   int  battleNum ,   int  buyNum ,   Object[]  rewards ){
	       this.bossIndex = bossIndex;

	       this.maxHp = maxHp;

	       this.hp = hp;

	       this.killBossinfo = killBossinfo;

	       this.battleNum = battleNum;

	       this.buyNum = buyNum;

	       this.rewards = rewards;

	}

	public OpenUiResp(){}


	/**
 	 * 当前boss序号 	
 	 */
	public int bossIndex;

	/**
 	 * boss最大气血 	
 	 */
	public long maxHp;

	/**
 	 * boss当前气血 	
 	 */
	public long hp;

	/**
 	 *  	
 	 */
	public Object[] killBossinfo;

	/**
 	 * 我的剩余boss挑战数 	
 	 */
	public int battleNum;

	/**
 	 * 今日购买次数 	
 	 */
	public int buyNum;

	/**
 	 *  	
 	 */
	public Object[] rewards;

        
}