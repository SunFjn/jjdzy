package com.teamtop.cross.protocol;

import com.teamtop.util.communication.io.protocol.ProtocolAssist;

/**
 * AskCrossReq.java
 * 请求跨服返回
 */
public class AskCrossResp  implements ProtocolAssist{

	@Override
	public String[] sortFieldsName() {
		return new String[]{ "rtn" , "param" };
	}

	public AskCrossResp(  int  rtn ,   String  param ){
	       this.rtn = (byte)rtn;

	       this.param = param;

	}

	public AskCrossResp(){}


	/**
 	 * 返回 1：正在请求中央服务器，2：正在准备数据，3：可以开始连接，4：中央服务器连接失败 	
 	 */
	public byte rtn;

	/**
 	 * 附加参数 	
 	 */
	public String param;

        
}