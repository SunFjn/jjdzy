package com.teamtop.util.log;

import org.slf4j.ILoggerFactory;
import org.slf4j.LoggerFactory;

import ch.qos.logback.classic.LoggerContext;
import ch.qos.logback.classic.joran.JoranConfigurator;
import ch.qos.logback.core.joran.spi.JoranException;

import com.teamtop.gameCommon.GamePath;
import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;

public class LogServer extends AbsServerEvent{
	@Override
	public void startServer() throws RunServerException {
		ILoggerFactory iLoggerFactory = LoggerFactory.getILoggerFactory();
		LoggerContext lc = (LoggerContext) iLoggerFactory;
		JoranConfigurator configurator = new JoranConfigurator();
		configurator.setContext(lc);
		lc.reset();
		try {
			configurator.doConfigure(GamePath.USER_DIR+GamePath.SEP+"config"+GamePath.SEP+"logback.xml");
		} catch (JoranException e) {
			throw new RunServerException(e,"initLogBack");
		}
	}
	public static void main(String[] args) throws RunServerException {
		LogServer logServer = new LogServer();
		logServer.startServer();
//		LogFormat.info("this is a test", logServer);
		LogFlowUtil.tt();
	}
}
