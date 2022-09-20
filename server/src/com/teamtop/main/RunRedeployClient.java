package com.teamtop.main;

import java.util.Map;
import java.util.TimeZone;

import com.teamtop.gameCommon.GamePath;
import com.teamtop.gameCommon.GameProperties;
import com.teamtop.netty.server.cross.ClientThread;
import com.teamtop.redeploy.RedeployClientCache;
import com.teamtop.redeploy.model.RedeployClient;
import com.teamtop.redeploy.ui.MainFrame;
import com.teamtop.system.event.serverEvent.ServerEventFunction;
import com.teamtop.util.Properties.PropertiesTools;
import com.teamtop.util.log.LogTool;

/**
 * 部署工具客户端
 * @author Administrator
 *
 */
public class RunRedeployClient {
	public static void main(String[] args){
		try {
			long s = System.currentTimeMillis();
			GameProperties.timeZone = TimeZone.getTimeZone("GMT+08:00");
			PropertiesTools.initPropretiesWithOutFolderInit(GamePath.CONFIG_REDEPLOY_DIR + "client.properties");
			ServerEventFunction.readConfig("RedeployClientEvents.xml");
			ServerEventFunction.startServer();
			MainFrame mainFrame = MainFrame.getInstance();
			mainFrame.initFrame();
			ClientThread.execute();
			Map<Integer, RedeployClient> clients = RedeployClientCache.getClients();
			for(RedeployClient client:clients.values()){
				ClientThread.addChannelCheck(client);
			}
			long e = System.currentTimeMillis();
			String desc = "部署服客户端启动完毕"+",total time:"+(e-s)+" ms";
			LogTool.info(LogTool.showRunComplete(desc),RunRedeployClient.class);
		} catch (Exception e) {
			LogTool.error(e,RunRedeployClient.class);
		}
	}
}
