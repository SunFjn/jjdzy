package com.teamtop.houtaiHttp.request;

import com.teamtop.gameCommon.GameProperties;
import com.teamtop.system.alarmSystem.AlarmSystemFunction;
import com.teamtop.system.alarmSystem.AlarmType;
import com.teamtop.system.event.backstage.events.backstage.serverInfoList.M_ServerInfo;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.md5.MD5Function;
import com.teamtop.util.time.TimeDateUtil;

public class SynOpenServerInfo {
	
	public static final String equals = "=";
	public static final String and = "&";

	public static void synServerInfo(M_ServerInfo serverInfo) {
		//time = 当前时间戳
		//sign = md5(product_code&service_id&service_ip&server_open_time&db_ip&time&key)，使用md5加密一下
		/*
			product_code	xx	游戏code	是
			platform_code	quxx01	渠道code	是
			service_id	9999	接口序号	是
			service_ip	neice.xx.jshi1.com	区服IP	是
			service_port	6001	后端端口	是
			server_name	9999内测服	区服名	是
			server_type	2	服务器类型 1中心服，2游戏服	是
			server_open_time	1521993600	开服时间	是
			server_status	1	服务器状态 0：维护，1：正常，2：火爆，3：白名单	是
			db_ip	120.11.11.111	数据库IP或域名	是
			db_name	xx_neice_9999	数据库名称	是
			db_port	3306	登录端口	是
			game_port	0	游戏端口	是
			recharge_port	0	充值端口	是
			client_version		客户端版本	是，可传字符串空
			merge_server		合服区服	是，可传字符串空
			merge_time	0	合服时间	是
			time	1522293088	请求时间	是 
		*/

		// DataBaseProp dataBaseProp =
		// MybatisUtil.getDataBasePropMap().get(GameProperties.getFirstZoneId());
		// String dbName = dataBaseProp.getDbname();
		// String url = dataBaseProp.getUrl();
		// Matcher m =
		// Pattern.compile("((25[0-5]|2[0-4]\\d|((1\\d{2})|([1-9]?\\d)))\\.){3}(25[0-5]|2[0-4]\\d|((1\\d{2})|([1-9]?\\d)))").matcher(url);
		// m.find();
		// String dbIp = m.group();
		// Matcher m1 = Pattern.compile("\\:\\d*").matcher(url);
		// m1.find();
		// String dbPort = m1.group().substring(1);
		// StringBuffer hefuStr = new StringBuffer();
		// if(GameProperties.zoneids.size()>1) {
		// for(int zoneid : GameProperties.zoneids) {
		// hefuStr.append(zoneid).append(",");
		// }
		// if(hefuStr.length()>1) {
		// hefuStr.setLength(hefuStr.length()-1);
		// }
		// }
		try {
			int serverType = 2;
			StringBuilder parmsStr = new StringBuilder();
			int time = TimeDateUtil.getCurrentTime();
			parmsStr.append("product_code").append(equals).append(GameProperties.gameid).append(and);
			parmsStr.append("platform_code").append(equals).append(serverInfo.getPf()).append(and);
			String serviceId = String.valueOf(serverInfo.getZoneid());
			parmsStr.append("service_id").append(equals).append(serviceId).append(and);
			parmsStr.append("service_ip").append(equals).append(serverInfo.getIp()).append(and);
			parmsStr.append("service_port").append(equals).append(String.valueOf(serverInfo.getHoutaiport()))
					.append(and);
			parmsStr.append("server_type").append(equals).append(String.valueOf(serverType)).append(and);
			int opentime = serverInfo.getOpentime();
			if(opentime==0) {
				opentime = TimeDateUtil.getTimeIntByStrTime("2016-1-1 00:00:00", TimeDateUtil.PATTERN_SECONDS);
			}
			String serverOpenTime = String.valueOf(opentime);
			parmsStr.append("server_open_time").append(equals).append(serverOpenTime).append(and);
			int state = serverInfo.getState();
			String serverName = serverInfo.getAlias();
			if (state == -1) {
				serverName = serverName + "(备服)";
			}
			parmsStr.append("server_name").append(equals).append(serverName).append(and);
			parmsStr.append("server_status").append(equals).append(String.valueOf(state)).append(and);
			String dbip = serverInfo.getDbip();
			parmsStr.append("db_ip").append(equals).append(dbip).append(and);
			parmsStr.append("db_name").append(equals).append(serverInfo.getDbname()).append(and);
			parmsStr.append("db_port").append(equals).append(String.valueOf(serverInfo.getDbport())).append(and);
			parmsStr.append("game_port").append(equals).append(serverInfo.getPort()).append(and);
			parmsStr.append("recharge_port").append(equals).append(serverInfo.getRechargeport()).append(and);
			parmsStr.append("client_version").append(equals).append(serverInfo.getClientversion()).append(and);
//			if (exInfo != null && exInfo.length > 0) {
//				parmsStr.append("merge_server").append(equals).append((String) exInfo[0]).append(and);
//				parmsStr.append("merge_time").append(equals).append(String.valueOf((Integer) exInfo[1])).append(and);
//			} else {
//				parmsStr.append("merge_server").append(equals).append("").append(and);
//				parmsStr.append("merge_time").append(equals).append("0").append(and);
//			}
			parmsStr.append("merge_server").append(equals).append(serverInfo.getHefuServer()).append(and);
			parmsStr.append("merge_time").append(equals).append(Integer.toString(serverInfo.getHefuTime())).append(and);
			String timeStr = String.valueOf(time);
			parmsStr.append("time").append(equals).append(timeStr).append(and);
			
			// post
			// List<NameValuePair> params = new ArrayList<NameValuePair>();
			// params.add(new BasicNameValuePair("product_code", GameProperties.gameid));
			// params.add(new BasicNameValuePair("platform_code", GameProperties.platform));
			// String serviceId = String.valueOf(GameProperties.getFirstZoneId());
			// params.add(new BasicNameValuePair("service_id", serviceId));
			// params.add(new BasicNameValuePair("service_ip",
			// GameProperties.serverAddress));
			// params.add(new BasicNameValuePair("service_port",
			// String.valueOf(GameProperties.houtaiHttpPort)));
			// params.add(new BasicNameValuePair("server_name", serverInfo.getAlias()));
			// params.add(new BasicNameValuePair("server_type",
			// String.valueOf(serverType)));
			// String serverOpenTime = String.valueOf(GameProperties.serverOpenTime);
			// params.add(new BasicNameValuePair("server_open_time", serverOpenTime));
			// params.add(new BasicNameValuePair("server_status",
			// String.valueOf(ServerMaintainCache.MAINTAIN_STATE)));
			// params.add(new BasicNameValuePair("db_ip", dbIp));
			// params.add(new BasicNameValuePair("db_name", dbName));
			// params.add(new BasicNameValuePair("db_port", dbPort));
			// params.add(new BasicNameValuePair("game_port", "0"));
			// params.add(new BasicNameValuePair("recharge_port",
			// String.valueOf(GameProperties.rechargePort)));
			// params.add(new BasicNameValuePair("client_version", ""));
			// params.add(new BasicNameValuePair("merge_server", hefuStr.toString()));
			// params.add(new BasicNameValuePair("merge_time", "0"));
			// String timeStr = String.valueOf(time);
			// params.add(new BasicNameValuePair("time", timeStr));

			// (product_code&service_id&service_ip&server_open_time&db_ip&time&key)
			//server_ip 和db_name检查一下
			if (serverInfo.getIp()==null||serverInfo.getDbname()==null) {
				LogTool.warn("serverInfo.getIp()==null||serverInfo.getDbname()==null", SynOpenServerInfo.class);
				return;
			}
			StringBuilder mdStr = new StringBuilder();
			mdStr.append(GameProperties.gameid).append(and).append(serviceId).append(and).append(serverInfo.getIp())
					.append(and).append(serverOpenTime).append(and).append(dbip).append(and).append(timeStr).append(and)
					.append(HoutaiRequestCache.SynServerInfo_Key);
			String sign = MD5Function.getIns().toDigest(mdStr.toString());
			// params.add(new BasicNameValuePair("sign", sign));
			parmsStr.append("sign").append(equals).append(sign);

			// HttpGetOrPostHandle.postInfo(params, HoutaiRequestCache.SynServerInfo_Url);
			LogTool.info("mdStr :: " + mdStr, SynOpenServerInfo.class);
			LogTool.info("parmsStr :: " + parmsStr, SynOpenServerInfo.class);
			String url = HoutaiRequestCache.SynServerInfo_Url;
//			boolean isTest = false;
//			if ("192.169.999.999".equals(serverInfo.getIp())) {
//				// 内测用
//				url = "http://192.169.999.999";
//				isTest = true;
//			} else {
				if (serverInfo.getZoneid() == 9999) {
					return;
				}
//				if (!GameProperties.alarmFlag) {
//					return;
//				}
//			}
			StringBuilder sb = new StringBuilder();
			sb.append('"').append("status").append('"').append(":").append("true");
			LogTool.info(url+"?"+parmsStr.toString(), SynOpenServerInfo.class);
			//暂时不上传开服信息
/*			String result = HttpGetOrPostHandle.doGetInfo(url, parmsStr.toString());
			LogTool.info("3333333result=  "+result, SynOpenServerInfo.class);
			if (!isTest && !CommonUtil.isNull(result) && result.indexOf(sb.toString()) == -1) {
				AlarmSystemFunction.getIns().alarmSend(AlarmType.HOUTAI_SYN, 0, new Object[] { result });
			}*/
		} catch (Exception e) {
			AlarmSystemFunction.getIns().alarmSend(AlarmType.HOUTAI_SYN, 0, new Object[] { "后端处理逻辑报错" });
			LogTool.error(e, SynOpenServerInfo.class, "SynOpenServerInfo synServerInfo");
		}
	}

	public static void main(String[] args) {
		// String sdfs = "845文身断发192.168.21.100:8254/";
		// Matcher m = Pattern.compile("\\:\\d*").matcher(sdfs);
		// m.find();
		// System.err.println(m.group().substring(1));
		// List<NameValuePair> params = new ArrayList<NameValuePair>();
		// params.add(new BasicNameValuePair("product_code", "99"));
		// params.add(new BasicNameValuePair("platform_code", "yuu"));
		// HttpPostHandle.postInfo(params, "http://192.168.100.222:9812");
		// HttpPostHandle.postFileAndInfo("http://192.168.100.222:9812",
		// "C:\\Users\\jjjjyyy\\Desktop\\新建文本文档.txt");
		System.err.println(TimeDateUtil.getTimeInt("2018-12-14 22:44:01"));
		// try {
		// String path = "game.properties";
		// path = GamePath.CONFIG_DIR + path;
		// PropertiesTools.initPropretiesWithOutFolder(path);
		// new MybatisUtil().startServer();
		// } catch (Exception e) {
		// // TODO Auto-generated catch block
		// e.printStackTrace();
		// }
/*		 M_ServerInfo serverInfo = new M_ServerInfo();
		 serverInfo.setAlias("逐鹿10服");
		 serverInfo.setZoneid(10);
		 serverInfo.setId(10);
		 serverInfo.setPf("fxzjsg01");
		 serverInfo.setPlayerNum(500);
		 serverInfo.setIp("119.45.44.63");
		 serverInfo.setPort(8010);
		 serverInfo.setState(2);
		 serverInfo.setDbip("119.45.44.63");
		 serverInfo.setDbname("el_8010");
		 serverInfo.setDbport(3306);
		 serverInfo.setHoutaiport(9010);
		 serverInfo.setRechargeport(10010);
		 serverInfo.setOpentime(1609894800);
		 serverInfo.setHefuServer("");
		 serverInfo.setClientversion("v6");
		 SynOpenServerInfo.synServerInfo(serverInfo);*/
	}

}
