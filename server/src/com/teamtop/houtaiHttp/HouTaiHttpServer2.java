package com.teamtop.houtaiHttp;

import java.io.FileInputStream;
import java.security.KeyStore;

import javax.net.ssl.KeyManagerFactory;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLEngine;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.gameCommon.GamePath;
import com.teamtop.gameCommon.GameProperties;
import com.teamtop.main.RunServerException;
import com.teamtop.netty.websocket.SslHandler;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.util.log.LogTool;

import io.netty.bootstrap.ServerBootstrap;
import io.netty.channel.ChannelFuture;
import io.netty.channel.ChannelInitializer;
import io.netty.channel.EventLoopGroup;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.SocketChannel;
import io.netty.channel.socket.nio.NioServerSocketChannel;
import io.netty.handler.codec.http.HttpObjectAggregator;
import io.netty.handler.codec.http.HttpServerCodec;
import io.netty.util.concurrent.DefaultThreadFactory;

/** 
 * @author qgan
 * @version 2014年2月12日 上午9:03:23
 */
public class HouTaiHttpServer2 extends AbsServerEvent{
	private static final Logger log = LoggerFactory.getLogger(HouTaiHttpServer2.class);
	public final static String sslHandlerName = "ssl";
    
	public void start(int httpPort) throws RunServerException {
		assert (httpPort != -1);
		
		EventLoopGroup bossGroup = new NioEventLoopGroup(0, new DefaultThreadFactory("houtai-boss"));
		EventLoopGroup workGroup = new NioEventLoopGroup(0, new DefaultThreadFactory("houtai-work"));
		try {
//			ServerBootstrap bootstrap = new ServerBootstrap();
//			bootstrap.group(bossGroup, workGroup)
//				.channel(NioServerSocketChannel.class)
//				.localAddress(new InetSocketAddress(httpPort))
//	            .option(ChannelOption.SO_KEEPALIVE, true)
//	            .option(ChannelOption.SO_REUSEADDR, true);
//			
//			bootstrap.childHandler(new ChannelInitializer<SocketChannel>() {
//				@Override
//				protected void initChannel(SocketChannel ch) throws Exception {
//					ChannelPipeline pipeline = ch.pipeline();
//					pipeline.addLast(new HttpRequestDecoder());
//					pipeline.addLast(new HttpResponseEncoder());
//					pipeline.addLast(new HttpObjectAggregator(512 * 1024));
//					pipeline.addLast(new HouTaiHttpHandler());
//				}
//			});
			
//			log.debug("server start");
//			bootstrap.bind(new InetSocketAddress(httpPort));
			ServerBootstrap serverBootstrap = new ServerBootstrap();
			serverBootstrap.group(bossGroup, workGroup);
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
					LogTool.info("init channel,ch:"+ch, HouTaiHttpServer2.class);
					SSLEngine sslEngine = sslContext.createSSLEngine();
					sslEngine.setUseClientMode(false);
					sslEngine.setNeedClientAuth(false);
					ch.pipeline().addLast(sslHandlerName,new SslHandler(sslEngine));
					ch.pipeline().addLast(new HttpServerCodec(),
							new HttpObjectAggregator(65536),
							new HouTaiHttpHandler());
				}
			});
			ChannelFuture bind = serverBootstrap.bind(httpPort);
			LogTool.info("houtai websocket start ok at port:"+httpPort, HouTaiHttpServer2.class);
			bind.await();
			
		} catch (Exception e) {
			log.error("run error", e);
			throw new RunServerException(e, "RunBattleVideo werr");
		} finally {
//            bossGroup.shutdownGracefully();
//            workGroup.shutdownGracefully();
        }
	}
	@Override
	public void startServer() throws RunServerException {
		HouTaiHttpServer2 server = new HouTaiHttpServer2();
		server.start(GameProperties.houtaiHttpPort);
	}
}