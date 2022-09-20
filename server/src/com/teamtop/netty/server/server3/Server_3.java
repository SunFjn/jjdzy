package com.teamtop.netty.server.server3;

import com.teamtop.netty.handlers.CrossIODecoder;
import com.teamtop.netty.server.cross.CrossServer;
/**
 * 后台中央服
 * @author hepl
 *
 */
public class Server_3 extends CrossServer {
	public Server_3(int port) {
		super(port,CrossIODecoder.class);
	}
}
