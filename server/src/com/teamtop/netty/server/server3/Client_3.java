package com.teamtop.netty.server.server3;

import com.teamtop.netty.handlers.CrossConnIODecoder;
import com.teamtop.netty.server.cross.CrossClient;
/**
 * 子服3:战力排行rank
 * @author hepl
 *
 */
public class Client_3 extends CrossClient{
	private static Client_3 ins = null;

	public static Client_3 getIns() {
		if (ins == null) {
//			ins = new Client_3(GameProperties.cross_ip_3, GameProperties.cross_port_3,"子服3");
		}
		return ins;
	}

	public Client_3(String ip, int port, String serverName) {
		super(ip, port, serverName,CrossConnIODecoder.class);
	}
}
