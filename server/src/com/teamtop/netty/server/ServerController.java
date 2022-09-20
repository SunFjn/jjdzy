package com.teamtop.netty.server;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.cross.CrossFunction;
import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.GameProperties;
import com.teamtop.main.RunServerException;
import com.teamtop.netty.server.cross.ClientThread;
import com.teamtop.netty.server.server1.Client_1;
import com.teamtop.netty.server.server1.Server_1;
import com.teamtop.netty.server.server2.Client_2;
import com.teamtop.netty.server.server2.Server_2;
import com.teamtop.netty.websocket.WebSocketSSLServer;
import com.teamtop.util.log.LogTool;

public class ServerController{
	public static void main(String[] args) {
		try {
			startServer();
		} catch (RunServerException e) {
			e.printStackTrace();
		}
	}
	private static Logger logger = LoggerFactory.getLogger(ServerController.class);
	public static void startServer() throws RunServerException {
		try {
			int serverId = GameProperties.serverId;//服务器id
			String platform = GameProperties.platform;//平台id
			logger.info("server id:"+serverId+",platform:"+platform);
			if(serverId==GameConst.SERVER_ID_LOCAL){
				//子服
				/*LocalNettyServer.startServer();//对客户端
				Client_1 jianghu = Client_1.getIns();//连接中央服
				ClientThread.addChannelCheck(jianghu);
				Client_3 rankRaise = Client_3.getIns();//连接战力提升排行中央服
				ClientThread.addChannelCheck(rankRaise);*/
				Client_1 houtai = Client_1.getIns();//连接后台中央服
				ClientThread.addChannelCheck(houtai);
				houtai.conn();// 玩法中央服需要在后台中央服连接上的情况下才能连
				if (!CrossFunction.isTestServer()) {
					Thread.sleep(3000);
					Client_2 central = Client_2.getIns();// 连接玩法中央服
					if (central == null) {
						throw new RuntimeException("无法连接中央服");
					}
					ClientThread.addChannelCheck(central);
				}
				if(GameProperties.serverAddress.equals("neice.sgzj2.ptyu2.net2")&&GameProperties.zoneids.contains(9996)
						&&GameProperties.zoneids.contains(9997)&&GameProperties.zoneids.contains(9998)){						
					Client_1 weiXinRecharge = new Client_1("houtaiquick.sgzj2.ptyu2.net2", 11001, "微信充值后台");
					ClientThread.addChannelCheck(weiXinRecharge);
					LogTool.info("微信充值后台启动", ServerController.class);
				}
				ClientThread.execute();
//				if(GameProperties.localmode){
//					WebSocketServer.startServer(GameProperties.serverPort);
//				}else{
//					WebSocketSSLServer.startServer(GameProperties.serverPort);
//				}
				WebSocketSSLServer.startServer(GameProperties.serverPort);
			}else if(serverId==GameConst.SERVER_ID_HOUTAI){
				//中央服：后台
				Server_1 server_houtai = new Server_1(GameProperties.cross_port_1);
				server_houtai.startServer();
//				LocalNettyServer.startServer();//对客户端
			}else if(serverId==GameConst.SERVER_ID_CENTRAL){
				//中央服：玩法
				Server_2 server_central = new Server_2(GameProperties.cross_port_2);
				server_central.startServer();
				//对客户的
				WebSocketSSLServer.startServer(GameProperties.serverPort);
//				LocalNettyServer.startServer();//对客户端
			}
		} catch (Exception e) {
			throw new RunServerException(e, "");
		}
	}
}
