package com.teamtop.netty.server.server1;

import com.teamtop.netty.handlers.CrossIODecoder;
import com.teamtop.netty.server.cross.CrossServer;
/**
 * 后台中央服
 * @author Administrator
 *
 */
public class Server_1 extends CrossServer {
	public Server_1(int port) {
		super(port,CrossIODecoder.class);
	}
}
