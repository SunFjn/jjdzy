package com.teamtop.netty.server.server2;

import com.teamtop.netty.handlers.CrossIODecoder;
import com.teamtop.netty.server.cross.CrossServer;
/**
 * 江湖试炼
 * @author hepl
 *
 */
public class Server_2 extends CrossServer {
	public Server_2(int port) {
		super(port,CrossIODecoder.class);
	}
}
