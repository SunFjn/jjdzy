package com.teamtop.netty.server.server1;

import com.teamtop.gameCommon.GameProperties;
import com.teamtop.netty.handlers.CrossConnIODecoder;
import com.teamtop.netty.server.cross.CrossClient;
/**
 * 子服1:后台中央服
 * @author Administrator
 *
 */
public class Client_1 extends CrossClient{
	private static Client_1 ins = null;

	public static Client_1 getIns() {
		if (ins == null) {
			ins = new Client_1(GameProperties.cross_ip_1, GameProperties.cross_port_1,"子服1");
		}
		return ins;
	}

	public Client_1(String ip, int port, String serverName) {
		super(ip, port, serverName,CrossConnIODecoder.class);
	}
}
