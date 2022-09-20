package com.teamtop.redeploy;

import com.teamtop.netty.handlers.CrossIODecoder;
import com.teamtop.netty.server.cross.CrossServer;
/**
 * 部署server端
 * @author Administrator
 *
 */
public class RedeployServer extends CrossServer {

	public RedeployServer(int port, Class<? extends CrossIODecoder> decoderClazz) {
		super(port, decoderClazz);
	}

}
