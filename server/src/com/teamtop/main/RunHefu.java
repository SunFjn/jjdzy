package com.teamtop.main;

import java.util.List;

import com.teamtop.gameCommon.GamePath;
import com.teamtop.hefu.HefuCache;
import com.teamtop.hefu.HefuFunction;
import com.teamtop.system.event.serverEvent.ServerEventFunction;
import com.teamtop.util.Properties.PropertiesTools;
import com.teamtop.util.db.orm.AutoObjTableUtil;
import com.teamtop.util.log.LogServer;
import com.teamtop.util.log.LogTool;
/**
 * 运行合服
 * @author kyle
 *
 */
public class RunHefu {
	public static void main(String[] args) {
		try {
//			DataSourceFactory.DRIVER = "com.p6spy.engine.spy.P6SpyDriver";
			String gamepath = "game.properties";
			gamepath = GamePath.CONFIG_DIR + gamepath;
			PropertiesTools.initPropretiesWithOutFolder(gamepath);
			//GameProperties.timeZone= TimeZone.getTimeZone(PropertiesTools.getProperties("timezone"));
			
			String path = GamePath.CONFIG_DIR +"hefudb.properties";//System.getProperty("hefuProp");//TODO 正式
			//String path = "dbs.properties";//TODO 测试
			//path = GamePath.CONFIG_DIR + path;//TODO 测试
			//System.out.println("合服.测试用路径，正式合服要屏蔽本代码。");//TODO 测试
			//读数据表
			RunLocalServer.serverStart = true;
			ServerEventFunction.initExcel();
			//建表
			AutoObjTableUtil.init();
			
			long a = System.currentTimeMillis();
			new LogServer().startServer();
			//读取需要合服的区
			HefuCache.getDBS(path);
			//合服事件
			HefuCache.readHefuEventConfig();
			//hero附加表
			HefuCache.readHeroExtraTb();
			//需要转移的表和清空的表
			HefuCache.readMovetbListConfig();
			
			List<Integer> hefuZoneList = HefuCache.hefuZoneList;
			int zonenum = hefuZoneList.size();
			//处理单个服
			for(int zoneid:hefuZoneList){
				LogTool.info("-------------------------"+zoneid+"区开始执行合服前事件、删玩家关联的表 zonenum："+zonenum+"-------------------------",RunHefu.class);
				HefuFunction.handleOneServer(zoneid, zonenum);
			}
			//合服
			HefuFunction.handleAllServer(hefuZoneList);
			long b = System.currentTimeMillis();
			LogTool.info("hefu ok,use time:"+(b-a)+" ms",RunHefu.class);
		} catch (Exception e) {
			LogTool.error(e,RunHefu.class);
			System.exit(0);
		}
	}
}
