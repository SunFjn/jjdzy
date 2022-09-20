package com.teamtop.cross.protocol;

import com.teamtop.util.communication.io.protocol.ProtocolAssist;

/**
 * LoginCrossReq.java
 * 请求登陆跨服
 */
public class LoginCrossReq implements ProtocolAssist{

	@Override
	public String[] sortFieldsName() {
		return new String[]{ "pwd" , "heroid" };
	}


	/**
 	 * 验证码 	
 	 */
	
	private String pwd;


	/**
 	 * hid 	
 	 */
	
	private long heroid;

	

	public String getPwd() {
	    return pwd;
	}

	public void setPwd(String pwd) {
	    this.pwd = pwd;
	}

	public long getHeroid() {
	    return heroid;
	}

	public void setHeroid(long heroid) {
	    this.heroid = heroid;
	}
}