package com.teamtop.system.boss.countryBoss.protocol;

import com.teamtop.util.communication.io.protocol.ProtocolAssist;

/**
 * HurtInfoReq.java
 * GC 场景中伤害数据同步
 */
public class HurtInfoResp  implements ProtocolAssist{

	@Override
	public String[] sortFieldsName() {
		return new String[]{ "myHp" , "bossHpMax" , "bossCurHp" , "myHurt" , "hurtList" };
	}

	public HurtInfoResp(   long  myHp ,   long  bossHpMax ,   long  bossCurHp ,   long  myHurt ,   Object[]  hurtList ){
	       this.myHp = myHp;

	       this.bossHpMax = bossHpMax;

	       this.bossCurHp = bossCurHp;

	       this.myHurt = myHurt;

	       this.hurtList = hurtList;

	}

	public HurtInfoResp(){}


	/**
 	 * 我的气血 	
 	 */
	public long myHp;

	/**
 	 * boss最大气血 	
 	 */
	public long bossHpMax;

	/**
 	 * boss当前血量 	
 	 */
	public long bossCurHp;

	/**
 	 * 我的伤害值 	
 	 */
	public long myHurt;

	/**
 	 *  	
 	 */
	public Object[] hurtList;

        
}