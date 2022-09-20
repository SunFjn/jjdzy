package com.teamtop.main;

import com.teamtop.gameCommon.GamePath;
import com.teamtop.netty.server.ServerController;
import com.teamtop.system.event.serverEvent.ServerEventFunction;
import com.teamtop.util.Properties.PropertiesTools;
import com.teamtop.util.exector.schedule.ScheduleUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.ui.ShowMsgFunction;

/**
 * 后台中央服服务器
 * @author hepl
 *
 */
public class RunHoutaiServer {
	public static boolean serverStart = false;
	public static void main(String[] args){
		try {
			long s = System.currentTimeMillis();
			String path = "gameHoutai.properties";
			path = GamePath.CONFIG_DIR + path;
			ScheduleUtil scheduleUtil = new ScheduleUtil();
			PropertiesTools.initPropretiesWithOutFolder(path);
			ServerEventFunction.readConfig("HoutaiServerEvents.xml");
			ServerEventFunction.startServer();
			ServerEventFunction.initExcel();
			ServerEventFunction.addShutdownHook();
			ServerController.startServer();
			scheduleUtil.startServer();
			serverStart = true;
			long e = System.currentTimeMillis();
			String desc = "服务器启动完毕"+",total time:"+(e-s)+" ms";
			LogTool.info(LogTool.showRunComplete(desc),RunHoutaiServer.class);
			ShowMsgFunction.sendBlueMsg(LogTool.showRunComplete(desc));
		} catch (Exception e) {
			LogTool.error(e,RunHoutaiServer.class);
		}
	}
	
	public static boolean isServerStart(){
		return serverStart;
	}
}
