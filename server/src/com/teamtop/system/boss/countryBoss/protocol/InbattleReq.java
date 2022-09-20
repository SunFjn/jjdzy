package com.teamtop.system.boss.countryBoss.protocol;

import com.teamtop.util.communication.io.protocol.ProtocolAssist;

/**
 * InbattleReq.java
 * CG 挑战国家boss
 */
public class InbattleReq implements ProtocolAssist{

	@Override
	public String[] sortFieldsName() {
		return new String[]{ "id" };
	}


	/**
 	 * BossID 	
 	 */
	
	private int id;

	

	public int getId() {
	    return id;
	}

	public void setId(int id) {
	    this.id = id;
	}
}