package com.teamtop.cross.protocol;

import com.teamtop.util.communication.io.protocol.ProtocolAssist;

/**
 * LoginCrossReq.java
 * 登陆结果
 */
public class LoginCrossResp  implements ProtocolAssist{

	@Override
	public String[] sortFieldsName() {
		return new String[]{ "rtn" };
	}

	public LoginCrossResp(  int  rtn ){
	       this.rtn = (byte)rtn;

	}

	public LoginCrossResp(){}


	/**
 	 * 1：登陆成功 	
 	 */
	public byte rtn;

        
}