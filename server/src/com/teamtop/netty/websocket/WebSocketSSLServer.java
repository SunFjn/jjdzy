package com.teamtop.netty.websocket;

import java.io.FileInputStream;
import java.security.KeyStore;

import javax.net.ssl.KeyManagerFactory;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLEngine;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.gameCommon.GamePath;
import com.teamtop.main.RunServerException;
import com.teamtop.netty.handlers.DefaultIOEncoder;

import io.netty.bootstrap.ServerBootstrap;
import io.netty.channel.ChannelFuture;
import io.netty.channel.ChannelInitializer;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.SocketChannel;
import io.netty.channel.socket.nio.NioServerSocketChannel;
import io.netty.handler.codec.http.HttpObjectAggregator;
import io.netty.handler.codec.http.HttpServerCodec;

/**
 * wss websocket的ssl版本
 * @author Administrator
 *
 */
public class WebSocketSSLServer {
	private static Logger logger = LoggerFactory.getLogger(WebSocketSSLServer.class);
	public final static String sslHandlerName = "ssl";
	public static void startServer(int port) throws Exception {
		NioEventLoopGroup bossGroup = new NioEventLoopGroup();
		NioEventLoopGroup wokerGroup = new NioEventLoopGroup();
		try {
			final DefaultIOEncoder ioEncoder = new DefaultIOEncoder();
			ServerBootstrap serverBootstrap = new ServerBootstrap();
			serverBootstrap.group(bossGroup, wokerGroup);
			serverBootstrap.channel(NioServerSocketChannel.class);
			KeyStore ks = KeyStore.getInstance("JKS");
			//ks.load(new FileInputStream(GamePath.USER_DIR+"/bin/com/teamtop/netty/websocket/_.3737.com.jks"), "123asd".toCharArray());
			ks.load(new FileInputStream(GamePath.USER_DIR + "/config/sgzj.jks"), "123456".toCharArray());
			KeyManagerFactory kmf = KeyManagerFactory.getInstance(KeyManagerFactory.getDefaultAlgorithm());
			kmf.init(ks, "123456".toCharArray());
			final SSLContext sslContext = SSLContext.getInstance("TLS");
			sslContext.init(kmf.getKeyManagers(), null, null);
			serverBootstrap.childHandler(new ChannelInitializer<SocketChannel>() {
				@Override
				protected void initChannel(SocketChannel ch) throws Exception {
					logger.info("init channel,ch:"+ch);
					SSLEngine sslEngine = sslContext.createSSLEngine();
					sslEngine.setUseClientMode(false);
					sslEngine.setNeedClientAuth(false);
					ch.pipeline().addLast(sslHandlerName,new SslHandler(sslEngine));
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
//		String port = System.getProperty("port");
//		System.err.println(port);
//		WebSocketServer.startServer(Integer.parseInt(port));
		WebSocketSSLServer.startServer(1234);
	}
}
