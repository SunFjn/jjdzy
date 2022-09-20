package com.teamtop.cross.battleVideo;

import com.teamtop.gameCommon.GamePath;
import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.ServerEventFunction;
import com.teamtop.util.Properties.PropertiesTools;

/** 
 * @author qgan
 * @version 2014年2月12日 上午9:03:23
 */
public class RunBattleVideo{
	public static void main(String[] args) throws RunServerException{
		try {
			String path = "game.properties";
			path = GamePath.CONFIG_DIR + path;
			PropertiesTools.initPropretiesWithOutFolder(path);
			ServerEventFunction.readConfig("BattleVideoServerEvents.xml");
			ServerEventFunction.startServer();
			ServerEventFunction.addShutdownHook();
		} catch (Exception e) {
			throw new RunServerException(e, "RunBattleVideo err");
		}
	}
	
}