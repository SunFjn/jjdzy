package com.teamtop.main;

import com.teamtop.gameCommon.GamePath;
import com.teamtop.netty.server.ServerController;
import com.teamtop.system.event.serverEvent.CmdEvent;
import com.teamtop.system.event.serverEvent.ServerEventFunction;
import com.teamtop.util.Properties.PropertiesTools;
import com.teamtop.util.exector.schedule.ScheduleUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.ui.ShowMsgFunction;
/**
 * 中央服
 * @author jjjjyyy
 *
 */
public class RunCentralServer {
	public static boolean serverStart = false;
	public static void main(String[] args){
		try {
			long s = System.currentTimeMillis();
			String path = "gameCentral.properties";
			path = GamePath.CONFIG_DIR + path;
			ScheduleUtil scheduleUtil = new ScheduleUtil();
			PropertiesTools.initPropretiesWithOutFolder(path);
			ServerEventFunction.readConfig("CentralServerEvents.xml");
			CmdEvent.expalinXml("cmdevent.xml");
			ServerEventFunction.startServer();
			ServerEventFunction.initExcel();
			ServerEventFunction.addShutdownHook();
			ServerController.startServer();
			scheduleUtil.startServer();
			serverStart = true;
			long e = System.currentTimeMillis();
			String desc = "服务器启动完毕"+",total time:"+(e-s)+" ms";
			LogTool.info(LogTool.showRunComplete(desc),RunCentralServer.class);
			ShowMsgFunction.sendBlueMsg(LogTool.showRunComplete(desc));
		} catch (Exception e) {
			LogTool.error(e,RunCentralServer.class);
		}
	}
	
	public static boolean isServerStart(){
		return serverStart;
	}
}
