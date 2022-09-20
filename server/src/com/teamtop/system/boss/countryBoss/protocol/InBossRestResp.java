package com.teamtop.system.boss.countryBoss.protocol;

import com.teamtop.util.communication.io.protocol.ProtocolAssist;

/**
 * InBossRestReq.java
 * GC 进入国家返回
 */
public class InBossRestResp  implements ProtocolAssist{

	@Override
	public String[] sortFieldsName() {
		return new String[]{ "rest" , "bossid" };
	}

	public InBossRestResp(  int  rest ,   int  bossid ){
	       this.rest = (byte)rest;

	       this.bossid = bossid;

	}

	public InBossRestResp(){}


	/**
 	 * 0成功 1次数不够 2boss已经死亡3你已经在副本内 	
 	 */
	public byte rest;

	/**
 	 * bossid 	
 	 */
	public int bossid;

        
}