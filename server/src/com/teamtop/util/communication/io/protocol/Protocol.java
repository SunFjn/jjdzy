package com.teamtop.util.communication.io.protocol;

/**
 * 请求协议必须继承的接口
 * @author syp
 *
 */
public abstract class Protocol {
	
	private int cmd;
	
	/**
	 * 设置协议命令号
	 * @return
	 */
	public void setCmd(int cmd){
		this.cmd = cmd;
	}

	/**
	 * 获取协议命令号
	 * @return
	 */
	public int getCmd(){
		return cmd;
	}
	
}
