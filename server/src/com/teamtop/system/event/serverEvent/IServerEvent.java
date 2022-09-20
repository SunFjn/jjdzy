package com.teamtop.system.event.serverEvent;

import com.teamtop.main.RunServerException;

public interface IServerEvent {
	/**
	 * 启动服务器
	 * @throws RunServerException 抛出此异常会关闭服务器
	 */
	public void startServer() throws RunServerException;
	/**
	 * 关闭服务器
	 */
	public void shutdownServer();
}
