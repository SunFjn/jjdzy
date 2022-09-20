package com.teamtop.houtaiHttp.events.kefu;

/**
 * 接口上报返回结果
 * @author hepl
 *
 */
public class ResponseResult {
	/**
	 * 返回代码
	 */
	private int ret;
	/**
	 * 返回信息
	 */
	private String msg;
	
	public int getRet() {
		return ret;
	}
	public void setRet(int ret) {
		this.ret = ret;
	}
	public String getMsg() {
		return msg;
	}
	public void setMsg(String msg) {
		this.msg = msg;
	}
}
