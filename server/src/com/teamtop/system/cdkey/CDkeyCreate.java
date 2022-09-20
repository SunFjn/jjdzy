package com.teamtop.system.cdkey;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.teamtop.gameCommon.GamePath;
import com.teamtop.gameCommon.GameProperties;
import com.teamtop.main.RunCentralServer;
import com.teamtop.main.RunHoutaiServer;
import com.teamtop.netty.server.ServerController;
import com.teamtop.system.cdkey.model.CDkeyData;
import com.teamtop.system.event.serverEvent.CmdEvent;
import com.teamtop.system.event.serverEvent.ServerEventFunction;
import com.teamtop.util.ProbabilityEvent.RandomUtil;
import com.teamtop.util.Properties.PropertiesTools;
import com.teamtop.util.exector.schedule.ScheduleUtil;
import com.teamtop.util.log.LogTool;

import excel.config.Config_jhm_721;
import excel.struct.Struct_jhm_721;

public class CDkeyCreate {
	private static List<CDkeyData> cdkeyDataList = new ArrayList<CDkeyData>();

	private static char[] constCharNum;

	public static void main(String[] args) {
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
			long e = System.currentTimeMillis();
			String desc = "服务器启动完毕"+",total time:"+(e-s)+" ms";
			LogTool.info(LogTool.showRunComplete(desc),RunHoutaiServer.class);
			
/*			long s = System.currentTimeMillis();
			String path = "gameCentral.properties";
			path = GamePath.CONFIG_DIR + path;
			ScheduleUtil scheduleUtil = new ScheduleUtil();
			PropertiesTools.initPropretiesWithOutFolder(path);
			ServerEventFunction.readConfig("CentralServerEvents.xml");
			CmdEvent.expalinXml("cmdevent.xml");
			ServerEventFunction.startServer();
			ServerEventFunction.initExcel();
			ServerEventFunction.addShutdownHook();
			long e = System.currentTimeMillis();
			String desc = "服务器启动完毕"+",total time:"+(e-s)+" ms";
			LogTool.info(LogTool.showRunComplete(desc),RunCentralServer.class);*/
			
			
			createCDkeyInsertDB();
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e,RunHoutaiServer.class);
		}
		
		
	}

	/**
	 * 生成激活码并插入数据库
	 */
	public static void createCDkeyInsertDB() {
		try {
			String[] qudaoArray = new String[] {"fxzjsg01"};//填写要生成的激活码的渠道信息
			createCDkeyToCDkeyDataList(qudaoArray);
			int zoneid = GameProperties.getFirstZoneId();
			CDkeyDao.getIns().insertOnDuplicateBatch(cdkeyDataList, null, zoneid);// 批量插入
			Map<String, CDkeyData> cdkeyCacheMap = CDkeyCache.getCdkeyCacheMap();
			for (CDkeyData cdkeyData : cdkeyDataList) {
				cdkeyCacheMap.put(cdkeyData.getCdkey(), cdkeyData);
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 生成不重复的激活码
	 * 
	 * @throws Exception
	 */
	public static void createCDkeyToCDkeyDataList(String[] qudaoArray) throws Exception {
		cdkeyDataList.clear();
		List<Struct_jhm_721> sortList = Config_jhm_721.getIns().getSortList();
		for (Struct_jhm_721 struct_jhm_721 : sortList) {
			for (String qudao : qudaoArray) {
				if (qudao.equals(struct_jhm_721.getQudao())) {// getQudao 有可能是,分隔的数组 jysgzj01-apk,jysgzj02-ios,jysgzj03-apk,jysgzj04-yapk
					LogTool.info("111111111111111",CDkeyCreate.class);
					// 可以考虑是否为通码，只生成1个？5个？struct_jhm_721.getTongma()==1
					int num = struct_jhm_721.getTongma()==1?CDkeyConst.CDKEY_CREATENUMTM:CDkeyConst.CDKEY_CREATENUM;
					for (int i = 0; i < num; i++) {
						String cdkey;
						while (true) {// 消除重复
							cdkey = randomcreateCDkey();
							if (!isSame(cdkey, i)) {
								break;
							}
						}
						CDkeyData cdkeyData = new CDkeyData();
						cdkeyData.setCdkey(cdkey);
						cdkeyData.setType(struct_jhm_721.getType());
//				String startTimeStr = struct_jhm_721.getTime1();
//				String endTimeStr = struct_jhm_721.getTime2();
//				int startTime = TimeDateUtil.getTimeIntByStrTime(startTimeStr, "yyyy-MM-dd hh:mm:ss");
//				int endTime = TimeDateUtil.getTimeIntByStrTime(endTimeStr, "yyyy-MM-dd hh:mm:ss");
//				cdkeyData.setStartTime(startTime);
//				cdkeyData.setEndTime(endTime);
						cdkeyDataList.add(cdkeyData);
						LogTool.info(cdkey+", "+struct_jhm_721.getType(),RunHoutaiServer.class);
					}
				}
			}
		}
		LogTool.info("数量:cdkeyDataList.size()= "+cdkeyDataList.size(), CDkeyCreate.class);
	}

	public static String randomcreateCDkey() {
		constCharNum = new char[62];
		int num = 48;
		for (int i = 0; i < 10; i++) {
			char a = (char) (num + i);
			constCharNum[i] = a;
		}
		int smallChar = 65;
		for (int i = 0; i < 26; i++) {
			char a = (char) (smallChar + i);
			constCharNum[i + 10] = a;
		}
		int bigChar = 97;
		for (int i = 0; i < 26; i++) {
			char a = (char) (bigChar + i);
			constCharNum[i + 36] = a;
		}
		StringBuffer cdkeyBuff = new StringBuffer();
		for (int i = 0; i < CDkeyConst.CDKEY_LEN; i++) {
			int randomIndex = RandomUtil.getRandomNumInAreas(0, 61);
			char c = constCharNum[randomIndex];
			cdkeyBuff.append(c);
		}
		return cdkeyBuff.toString();
	}

	public static boolean isSame(String str, int j) {
		for (int i = 0; i < j; i++) {
			String cdkey = cdkeyDataList.get(i).getCdkey();
			if (cdkey.equals(str)) {
				return true;
			}
		}
		return false;
	}

}
