package com.teamtop.main;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.gameCommon.GamePath;
import com.teamtop.redeploy.RedeployServer;
import com.teamtop.redeploy.ReployIODecoder;
import com.teamtop.system.event.serverEvent.ServerEventFunction;
import com.teamtop.util.Properties.PropertiesTools;
import com.teamtop.util.log.LogTool;

/**
 * 部署工具server端
 * @author Administrator
 *
 */
public class RunRedeployServer {
	private static Logger logger = LoggerFactory.getLogger(RunRedeployServer.class);
	public static boolean serverStart = false;
	public static void main(String[] args){
		try {
			long s = System.currentTimeMillis();
			PropertiesTools.initPropretiesWithOutFolderInit(GamePath.CONFIG_REDEPLOY_DIR + "redeploy.properties");
			ServerEventFunction.readConfig("RedeployServerEvents.xml");
			ServerEventFunction.startServer();
			RedeployServer redeployServer = new RedeployServer(PropertiesTools.getPropertiesInt("serverPort"),ReployIODecoder.class);
			redeployServer.startServer();
			serverStart = true;
			long e = System.currentTimeMillis();
			String desc = "部署服务器启动完毕"+",total time:"+(e-s)+" ms";
			logger.info(LogTool.showRunComplete(desc));
		} catch (Exception e) {
			LogTool.error(e,RunRedeployServer.class);
		}
	}
	
	public static boolean isServerStart(){
		return serverStart;
	}
}
