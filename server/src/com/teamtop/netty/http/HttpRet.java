package com.teamtop.netty.http;

/**
 * http返回数据包装
 * @author hepl
 *
 */
public class HttpRet {
	//返回值
	private int ret;
	//数据
	private Object data;
	
	public HttpRet(int ret, Object data){
		this.ret = ret;
		this.data = data;
	}
	
	public int getRet() {
		return ret;
	}
	public void setRet(int ret) {
		this.ret = ret;
	}
	public Object getData() {
		return data;
	}
	public void setData(Object data) {
		this.data = data;
	}
}
