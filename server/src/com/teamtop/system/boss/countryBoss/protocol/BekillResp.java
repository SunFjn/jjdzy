package com.teamtop.system.boss.countryBoss.protocol;

import com.teamtop.util.communication.io.protocol.ProtocolAssist;

/**
 * BekillReq.java
 * GC 被击杀的玩家id
 */
public class BekillResp  implements ProtocolAssist{

	@Override
	public String[] sortFieldsName() {
		return new String[]{ "hids" };
	}

	public BekillResp(   Object[]  hids ){
	       this.hids = hids;

	}

	public BekillResp(){}


	/**
 	 *  	
 	 */
	public Object[] hids;

        
}