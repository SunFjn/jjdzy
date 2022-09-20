package com.teamtop.system.event.serverEvent;

import com.teamtop.main.RunServerException;

/**
 * 服务器事件，包括启动、关闭服务器
 * @author kyle
 *
 */
public abstract class AbsServerEvent implements IServerEvent{
	/**
	 * 启动服务器
	 */
	@Override
	public abstract void startServer() throws RunServerException;
	/**
	 * 启动服务器初始化excel
	 * @throws RunServerException
	 */
	public void initExcel() throws RunServerException{
		
	};
	/**
	 * 关闭服务器
	 */
	@Override
	public void shutdownServer(){};
}
