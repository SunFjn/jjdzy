/**
 * 系统项目名称
 * com.game.main
 * RequestMsg.java
 * 2012-9-24-上午10:42:43
 *  2012广东天拓-版权所有
 * 
 */
package com.teamtop.netty.handlers;

import com.teamtop.system.hero.TempData;


/**
 * @name：RequestMsg
 * @description：前端请求封装类
 * @author：yxh
 * @date：2012-9-24 上午10:42:43
 * @moidfy：
 * @version 1.0.0
 * 
 */
public class RequestMsg {

	
	private int cmd;//请求协议
	private Object[] params;//参数集合
	private TempData tempData;//临时数据
	
	public int getCmd() {
		return cmd;
	}

	public Object[] getParams() {
		return params;
	}

	public TempData getTempData() {
		return tempData;
	}

	public void setTempData(TempData tempData) {
		this.tempData = tempData;
	}

	public void setCmd(int cmd) {
		this.cmd = cmd;
	}

	public void setParams(Object[] params) {
		this.params = params;
	}

	public RequestMsg(int cmd, Object[] params, TempData tempData) {
		this.cmd = cmd;
		this.params = params;
		this.tempData = tempData;
	}
	
}
