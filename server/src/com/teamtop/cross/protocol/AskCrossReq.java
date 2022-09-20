package com.teamtop.cross.protocol;

import com.teamtop.util.communication.io.protocol.ProtocolAssist;

/**
 * AskCrossReq.java
 * 请求跨服
 */
public class AskCrossReq implements ProtocolAssist{

	@Override
	public String[] sortFieldsName() {
		return new String[]{ "type" , "param" };
	}


	/**
 	 * 跨服类型 	
 	 */
	
	private byte type;


	/**
 	 * 附加参数 	
 	 */
	
	private String param;

	

	public byte getType() {
	    return type;
	}

	public void setType(byte type) {
	    this.type = type;
	}

	public String getParam() {
	    return param;
	}

	public void setParam(String param) {
	    this.param = param;
	}
}