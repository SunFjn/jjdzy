package com.teamtop.houtaiHttp.events.manualOpServer;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.lang.reflect.Type;
import java.net.InetSocketAddress;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.alibaba.fastjson.TypeReference;
import com.jcraft.jsch.JSch;
import com.jcraft.jsch.Session;
import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.CrossEnum;
import com.teamtop.cross.CrossZone;
import com.teamtop.gameCommon.GamePath;
import com.teamtop.houtaiHttp.events.serverMaintain.ServerMaintainIO;
import com.teamtop.houtaiHttp.events.serverSelfMotion.ServerSelfMotionCache;
import com.teamtop.houtaiHttp.request.SynOpenServerInfo;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.ManualOpServerRunnable;
import com.teamtop.synHandleCore.orderedRunnable.OpTaskConst;
import com.teamtop.system.event.backstage.events.backstage.serverInfoList.M_ServerInfo;
import com.teamtop.system.event.backstage.events.backstage.serverInfoList.ServerInfoDao;
import com.teamtop.system.event.backstage.events.backstage.serverInfoList.ServerInfoMapper;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.mybatis.DaoUtil;
import com.teamtop.util.time.TimeDateUtil;

import io.netty.channel.Channel;

public class ManualOpServerIO {

	private static ManualOpServerIO ins;

	private ManualOpServerIO() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized ManualOpServerIO getIns() {
		if (ins == null) {
			ins = new ManualOpServerIO();
		}
		return ins;
	}
	
	public void manualOpenServer(int zoneid, String pf) {
		OpTaskExecutorService.PublicOrderService.execute(new ManualOpServerRunnable() {
			
			@Override
			public void run() {
				manualOpenServerHandel(zoneid, pf);
			}
			
			@Override
			public Object getSession() {
				return OpTaskConst.SESSION_KEY1;
			}
		});
	}

	/**
	 * 中央服通知子服开启
	 */
	public void manualOpenServerHandel(int zoneid, String pf) {
		try {
			// 设置开服状态
			Map<Integer, M_ServerInfo> map = ServerInfoCache.pfServerMap.get(pf);
			if (map == null)
				return;
			M_ServerInfo serverInfo = map.get(zoneid);
			if (serverInfo == null) {
				return;
			}
			if (serverInfo.getState() != ServerInfoConst.NOT_OPEN) {
				return;
			}
			if (serverInfo.getAutoopen() == 1) {
				return;
			}
			serverInfo.setState(ServerInfoConst.OPEN_NOMAL);
			serverInfo.setAutoopen(1);
			serverInfo.setOpentime(TimeDateUtil.getCurrentTime());
			ServerSelfMotionCache.pfMaxZoneidMap.put(pf, zoneid);
			// 通知子服开启入口
			CrossData crossData = new CrossData();
			crossData.putObject(ManualOpServerEnum.state, ServerInfoConst.OPEN_NOMAL);
			ConcurrentHashMap<Integer, Channel> zoneidToChannel = CrossCache.getZoneidToChannel();
			LogTool.info("Channel channel = zoneidToChannel.get(zoneid)= " + zoneid, ManualOpServerIO.class);
			Channel channel = zoneidToChannel.get(zoneid);
			// NettyWrite.writeXData(channel, CrossConst.MANUAL_OPEN_SERVER, crossData);
//			NettyWrite.writeXData(channel, CrossConst.MANUAL_OPEN_SERVER, crossData, new Callback() {
//
//				@Override
//				public void dataReci(Channel channel, CrossData crossData) {
//					String pathCmd = crossData.getObject(ManualOpServerEnum.pathCmd, String.class);
//					String shellCmd = "sh " + GamePath.USER_DIR + GamePath.SEP + "sgzj.sh";
//					InetSocketAddress address = (InetSocketAddress) channel.remoteAddress();
//					String hostName = address.getHostName();
//					LogTool.info("hostName=" + hostName + ", cmd=" + pathCmd, ManualOpServerIO.class);
//					// callLocalServerStart(pathCmd, hostName);
//					shellCallServerStart(shellCmd, pathCmd, hostName);
//					List<Integer> zoneidList = new ArrayList<>();
//					zoneidList.add(zoneid);
//					map.put(zoneid, serverInfo);
//					ServerMaintainIO.getIns().updateServerInfo(pf, serverInfo, ServerInfoConst.OPEN_NOMAL);
//					map.put(zoneid, serverInfo);
//					SynOpenServerInfo.synServerInfo(serverInfo);
//				}
//			});
			CrossData data = NettyWrite.writeBlockData(channel, CrossConst.MANUAL_OPEN_SERVER, 0, crossData);
			Integer type = data.getObject(CrossEnum.type, Integer.class);
			if(type!=null&&type==1) {
				String pathCmd = data.getObject(ManualOpServerEnum.pathCmd, String.class);
				String shellCmd = "sh " + GamePath.USER_DIR + GamePath.SEP + "sgzj.sh";
				InetSocketAddress address = (InetSocketAddress) channel.remoteAddress();
				String hostName = address.getHostName();
				LogTool.info("hostName=" + hostName + ", cmd=" + pathCmd, ManualOpServerIO.class);
				// callLocalServerStart(pathCmd, hostName);
				shellCallServerStart(shellCmd, pathCmd, hostName);
				List<Integer> zoneidList = new ArrayList<>();
				zoneidList.add(zoneid);
				map.put(zoneid, serverInfo);
				ServerMaintainIO.getIns().updateServerInfo(pf, serverInfo, ServerInfoConst.OPEN_NOMAL);
				map.put(zoneid, serverInfo);
				SynOpenServerInfo.synServerInfo(serverInfo);
			}
		} catch (Exception e) {
			LogTool.error(e, ManualOpServerIO.class, "ManualOpServerIO manualOpenServer fail");
			throw e;
		}
	}

	/** 远程调用游戏服启动 */
	public void callLocalServerStart(String pathCmd, String host) {
		Session session = null;
		com.jcraft.jsch.Channel channel = null;
		try {
			JSch jsch = new JSch();
			String pubKeyPath = "/root/.ssh/id_rsa";
			jsch.addIdentity(pubKeyPath);

			String username = "root";
			session = jsch.getSession(username, host, 22);// 为了连接做准备
			session.setConfig("StrictHostKeyChecking", "no");
			session.connect(3000);
			String command = "ls";
			channel = session.openChannel("shell");
			channel.connect();
			OutputStream outputStream = channel.getOutputStream();
			outputStream.write(pathCmd.getBytes());
			outputStream.flush();
			InputStream in = channel.getInputStream();
			BufferedReader reader = new BufferedReader(new InputStreamReader(in));
			String buf = null;
			String result = "";
			while ((buf = reader.readLine()) != null) {
				result += new String(buf.getBytes("gbk"), "UTF-8") + "    <br>\r\n";
			}
			reader.close();
			in.close();
			outputStream.close();
			LogTool.info("pathCmd result=" + result, ManualOpServerIO.class);
		} catch (Exception e) {
			LogTool.error(e, ManualOpServerIO.class, "ManualOpServerIO callLocalServerStart fail");
		} finally {
			if (channel != null && !channel.isClosed()) {
				channel.disconnect();
			}
			if (session != null && session.isConnected()) {
				session.disconnect();
			}
		}
	}

	public void shellCallServerStart(String shellCmd, String pathCmd, String host) {
		try {
//			Thread.sleep(5000);
			Process ps = Runtime.getRuntime().exec("su");
			DataOutputStream os = new DataOutputStream(ps.getOutputStream());
			String lastCmd = shellCmd + " '" + host + "' '" + pathCmd + "'";
			LogTool.info("lastCmd=" + lastCmd, ManualOpServerIO.class);
			os.writeBytes(lastCmd);
			os.flush();
			os.close();
			int exitValue = ps.waitFor();
			// 当返回值为0时表示执行成功
			if (0 != exitValue) {
				LogTool.info("call shell failed. error code is :" + exitValue, ManualOpServerIO.class);
			}
			BufferedInputStream in = new BufferedInputStream(ps.getInputStream());
			BufferedReader br = new BufferedReader(new InputStreamReader(in));
			String line;
			while ((line = br.readLine()) != null) {
				LogTool.info("脚本返回的数据如下： " + line, ManualOpServerIO.class);
			}
			in.close();
			br.close();
		} catch (Exception e) {
			LogTool.error(e, ManualOpServerIO.class, "ManualOpServerIO shellCallServerStart fail");
		}
	}

	/**
	 * 收到中央服通知 ,子服开启入口
	 */
	public void openServer(Channel channel, CrossData crossData) {
		try {
			int state = crossData.getObject(ManualOpServerEnum.state, Integer.class);
			// ServerMaintainCache.MAINTAIN_STATE = state;
			// 删除所有数据表
			ServerInfoDao.getIns().deleteAllTables();
			crossData.finishGet();

			String pathCmd = "sh " + GamePath.USER_DIR + GamePath.SEP + "sgzjRestart.sh restart";
			crossData.putObject(ManualOpServerEnum.pathCmd, pathCmd);
			crossData.putObject(CrossEnum.type, 1);
//			NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
			NettyWrite.writeBlockCallback(channel, crossData, crossData.getCallbackCmd());
			// LogTool.info("UUUUUUUUU：：" + ServerMaintainCache.MAINTAIN_STATE +
			// GamePath.USER_DIR + GamePath.SEP
			// + "sgzjRestart.sh",
			// ManualOpServerIO.class);
			// Process ps = Runtime.getRuntime().exec("su");
			// DataOutputStream os = new DataOutputStream(ps.getOutputStream());
			// os.writeBytes("sh " + GamePath.USER_DIR + GamePath.SEP + "sgzj.sh clear" +
			// "\n");
			// os.flush();
			// os.close();
			// int exitValue = ps.waitFor();
			// // 当返回值为0时表示执行成功
			// if (0 != exitValue) {
			// LogTool.info("call shell failed. error code is :" + exitValue,
			// ManualOpServerIO.class);
			// }
		} catch (Exception e) {
			LogTool.error(e, ManualOpServerIO.class, "ManualOpServerIO openServer fail");
		}
	}

	/**
	 * 更新服务器信息
	 */
	public void sendServerAddressData(Channel channel, CrossData crossData) {
		try {
			int cmd = CrossConst.REFLASH_IP_PORT;
			Type typeList = new TypeReference<List<Integer>>() {}.getType();
			List<Integer> zoneList = crossData.getObject( CrossEnum.zoneidList, typeList);
			String serverAddress = crossData.getObject( CrossEnum.serverAddress, String.class);
			//游戏端口
			int serverPort = crossData.getObject( CrossEnum.serverPort, Integer.class);
			Type typeMap = new TypeReference<Map<Integer, String>>() {}.getType();
			Map<Integer, String> dbAddress = crossData.getObject( CrossEnum.dbAddress, typeMap);
			//后台端口
			int houtaiHttpPort = crossData.getObject( CrossEnum.houtaiHttpPort, Integer.class);
			//充值端口
			int rechargePort = crossData.getObject( CrossEnum.rechargePort, Integer.class);
			// 合服时间
			int hefuTime = crossData.getObject(CrossEnum.hefuTime, Integer.class);
			// 合服区服
			String hefuServer = crossData.getObject(CrossEnum.hefuServer, String.class);
			
			List<M_ServerInfo> findByZID = ServerInfoDao.getIns().findByZID(zoneList);
			
			List<M_ServerInfo> updateList = new ArrayList<>();
			for( M_ServerInfo temp:findByZID){
				int zoneid = temp.getZoneid();
				String dbAddressStr = dbAddress.get(zoneid);
				String ip = temp.getIp();
				int port = temp.getPort();
				String dbip = temp.getDbip();
				int temp_houtaiport = temp.getHoutaiport();
				int temp_rechargeport = temp.getRechargeport();
				if (ip.equals(serverAddress) && port == serverPort && dbip.equals(dbAddressStr)
						&& temp_houtaiport == houtaiHttpPort && temp_rechargeport == rechargePort) {
					if (hefuTime > 0) {
						int todayZeroTime = TimeDateUtil.getTodayZeroTimeReturnInt();
						int oneDayZeroTime = TimeDateUtil.getOneDayZeroTime(hefuTime);
//						if (todayZeroTime != oneDayZeroTime) {
//							continue;
//						}
					}else {
						continue;
					}
				}
				temp.setIp(serverAddress);
				temp.setPort(serverPort);
				temp.setDbip(dbAddressStr);
				temp.setHoutaiport(houtaiHttpPort);
				temp.setRechargeport(rechargePort);
				temp.setHefuServer(hefuServer);
				temp.setHefuTime(hefuTime);
				
				updateList.add( temp);
				LogTool.info("Update db serverInfo data.zid:"+zoneid+" ip:"+serverAddress+" port:"+serverPort+" dbip:"+dbAddressStr+" temp_houtaiport:"+houtaiHttpPort+" temp_rechargeport:"+rechargePort, this);

				String pf = temp.getPf();
				Map<Integer, M_ServerInfo> map = ServerInfoCache.pfServerMap.get(pf);
				if( map!=null){
					M_ServerInfo serverInfo = map.get(zoneid);
					if( serverInfo!=null){
						serverInfo.setIp(serverAddress);
						serverInfo.setPort(serverPort);
						serverInfo.setDbip(dbAddressStr);
						serverInfo.setHoutaiport(houtaiHttpPort);
						serverInfo.setRechargeport(rechargePort);
						serverInfo.setHefuServer(hefuServer);
						serverInfo.setHefuTime(hefuTime);
					}
				}
				//同步服务信息到后台
				if (temp.getState() != ServerInfoConst.NOT_OPEN) {
					SynOpenServerInfo.synServerInfo(temp);
				}
			}
				
			
			//入库
			if( updateList.size()>0){
				String[] notInclude = new String[]{"zoneid","alias","pf","state","dbport","dbname","dbuser","dbpwd","opentime","autoopen","content"};
				DaoUtil.insertOnDuplicateBatch( updateList, M_ServerInfo.class, ServerInfoMapper.class, CrossZone.houtai, notInclude, DaoUtil.size_300);
			}
		} catch (Exception e) {
			LogTool.error(e, ManualOpServerIO.class, "sendServerAddressData");
		}
	}
	/**
	 * 更新服务器信息
	 */
	public void getServerAddressData(Channel channel, CrossData crossData) {
		try {
			int cmd = CrossConst.REFLASH_IP_PORT_GET;
			ServerInfoLocalToCross.getIns().sendServerAddressData();
		} catch (Exception e) {
			LogTool.error(e, ManualOpServerIO.class, "sendServerAddressData");
		}
	}

}
