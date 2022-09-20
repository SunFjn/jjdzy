package com.teamtop.system.boss.countryBoss.protocol;

import com.teamtop.util.communication.io.protocol.ProtocolAssist;

/**
 * BuyTimeReq.java
 * GC 购买次数返回
 */
public class BuyTimeResp  implements ProtocolAssist{

	@Override
	public String[] sortFieldsName() {
		return new String[]{ "rest" , "times" };
	}

	public BuyTimeResp(  int  rest ,  int  times ){
	       this.rest = (byte)rest;

	       this.times = (byte)times;

	}

	public BuyTimeResp(){}


	/**
 	 * 0成功 1失败 	
 	 */
	public byte rest;

	/**
 	 * 剩余次数 	
 	 */
	public byte times;

        
}