package com.teamtop.netty.websocket;

import io.netty.bootstrap.ServerBootstrap;
import io.netty.channel.ChannelFuture;
import io.netty.channel.ChannelInitializer;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.SocketChannel;
import io.netty.channel.socket.nio.NioServerSocketChannel;
import io.netty.handler.codec.http.HttpObjectAggregator;
import io.netty.handler.codec.http.HttpServerCodec;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.main.RunServerException;
import com.teamtop.netty.handlers.DefaultIOEncoder;


public class WebSocketServer {
	private static Logger logger = LoggerFactory.getLogger(WebSocketServer.class);
	public static void startServer(int port) throws Exception {
		NioEventLoopGroup bossGroup = new NioEventLoopGroup();
		NioEventLoopGroup wokerGroup = new NioEventLoopGroup();
		try {
			final DefaultIOEncoder ioEncoder = new DefaultIOEncoder();
			ServerBootstrap serverBootstrap = new ServerBootstrap();
			serverBootstrap.group(bossGroup, wokerGroup);
			serverBootstrap.channel(NioServerSocketChannel.class);
			serverBootstrap.childHandler(new ChannelInitializer<SocketChannel>() {
				@Override
				protected void initChannel(SocketChannel ch) throws Exception {
					ch.pipeline().addLast(new HttpServerCodec(),
							new HttpObjectAggregator(65536),
							new MyWebSocketServerHandler()
							,ioEncoder
							);
				}
			});
			ChannelFuture bind = serverBootstrap.bind(port);
			logger.info("websocket start ok at port:"+port);
			//这里会一直卡主
//			bind.sync().channel().closeFuture().sync();
			bind.await();
//			if(!bind.isSuccess()){
//				
//			}
		} catch (Exception e) {
			throw new RunServerException(e, "netty start err");
		}
	}
	public static void main(String[] args) throws Exception {
		String port = System.getProperty("port");
		System.err.println(port);
//		WebSocketServer.startServer(Integer.parseInt(port));
		WebSocketServer.startServer(1234);
	}
}
