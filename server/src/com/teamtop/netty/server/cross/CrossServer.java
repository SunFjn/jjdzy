package com.teamtop.netty.server.cross;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import io.netty.bootstrap.ServerBootstrap;
import io.netty.channel.ChannelFuture;
import io.netty.channel.ChannelInitializer;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.SocketChannel;
import io.netty.channel.socket.nio.NioServerSocketChannel;

import com.teamtop.main.RunServerException;
import com.teamtop.netty.handlers.CrossIODecoder;
import com.teamtop.netty.handlers.CrossIOEncoder;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.util.log.LogTool;
/**
 * 中央服
 * @author Administrator
 *
 */
public class CrossServer extends AbsServerEvent{
	private int port;
	private Logger logger = LoggerFactory.getLogger(CrossServer.class);
	public CrossServer(int port,Class<? extends CrossIODecoder> decoderClazz) {
		super();
		this.port = port;
		this.decoderClazz = decoderClazz;
	}
	private Class<? extends CrossIODecoder> decoderClazz;

	@Override
	public void startServer() throws RunServerException {
		try {
			long s = System.currentTimeMillis();
			final CrossIOEncoder ioEncoder = new CrossIOEncoder();
			NioEventLoopGroup bossGroup = new NioEventLoopGroup();
			NioEventLoopGroup wokerGroup = new NioEventLoopGroup();

			ServerBootstrap serverBootstrap = new ServerBootstrap();
			serverBootstrap.group(bossGroup, wokerGroup);
			serverBootstrap.channel(NioServerSocketChannel.class);
			serverBootstrap.childHandler(new ChannelInitializer<SocketChannel>() {
				@Override
				protected void initChannel(SocketChannel ch) throws Exception {
					ch.pipeline().addLast(decoderClazz.newInstance(),ioEncoder);
				}
			});
			ChannelFuture bind = serverBootstrap.bind(port);
			bind.await();
			if(!bind.isSuccess()){
				throw new RunServerException(null, "CrossServer netty port bind by others,port:"+port);
			}
			long e = System.currentTimeMillis();
			logger.info(LogTool.showRunComplete("netty server,total time:"+(e-s)+" ms"));
		} catch (Exception e) {
			throw new RunServerException(e, "CrossServer1 netty exception");
		}
	}
}
