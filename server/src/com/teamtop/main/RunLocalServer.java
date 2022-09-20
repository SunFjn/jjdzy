package com.teamtop.main;

import com.teamtop.gameCommon.GamePath;
import com.teamtop.netty.server.ServerController;
import com.teamtop.system.alarmSystem.AlarmSystemFunction;
import com.teamtop.system.alarmSystem.AlarmType;
import com.teamtop.system.event.serverEvent.CmdEvent;
import com.teamtop.system.event.serverEvent.ServerEventFunction;
import com.teamtop.util.Properties.PropertiesTools;
import com.teamtop.util.exector.schedule.ScheduleUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.ui.ShowMsgFunction;

public class RunLocalServer {
	public static boolean serverStart = false;
	public static void main(String[] args){
		try {
			long s = System.currentTimeMillis();
			String path = "game.properties";
			path = GamePath.CONFIG_DIR + path;
			ScheduleUtil scheduleUtil = new ScheduleUtil();
			PropertiesTools.initPropretiesWithOutFolder(path);
			ServerEventFunction.readConfig("ServerEvents.xml");
			CmdEvent.expalinXml("cmdevent.xml");
			ServerEventFunction.startServer();
			ServerEventFunction.initExcel();
			ServerEventFunction.addShutdownHook();
			ServerController.startServer();
			scheduleUtil.startServer();
			serverStart = true;
			long e = System.currentTimeMillis();
			String desc = "服务器启动完毕"+",total time:"+(e-s)+" ms";
			LogTool.info(LogTool.showRunComplete(desc),RunLocalServer.class);
			ShowMsgFunction.sendBlueMsg(LogTool.showRunComplete(desc));
		} catch (Exception e) {
			AlarmSystemFunction.getIns().alarmSend(AlarmType.STARTUP_FAIL, 0, new Object[] {});
			LogTool.error(e,RunLocalServer.class);
		}
	}
	
	public static boolean isServerStart(){
		return serverStart;
	}
}
