package com.teamtop.system.boss.countryBoss.protocol;

import com.teamtop.util.communication.io.protocol.ProtocolAssist;

/**
 * QuitReq.java
 * GC 退出返回
 */
public class QuitResp  implements ProtocolAssist{

	@Override
	public String[] sortFieldsName() {
		return new String[]{ "rest" };
	}

	public QuitResp(  int  rest ){
	       this.rest = (byte)rest;

	}

	public QuitResp(){}


	/**
 	 * 0成功发奖励 1失败 	
 	 */
	public byte rest;

        
}