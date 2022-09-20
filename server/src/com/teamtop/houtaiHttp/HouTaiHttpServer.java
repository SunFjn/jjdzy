package com.teamtop.houtaiHttp;

import java.net.InetSocketAddress;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.gameCommon.GameProperties;
import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;

import io.netty.bootstrap.ServerBootstrap;
import io.netty.channel.ChannelInitializer;
import io.netty.channel.ChannelOption;
import io.netty.channel.ChannelPipeline;
import io.netty.channel.EventLoopGroup;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.SocketChannel;
import io.netty.channel.socket.nio.NioServerSocketChannel;
import io.netty.handler.codec.http.HttpObjectAggregator;
import io.netty.handler.codec.http.HttpRequestDecoder;
import io.netty.handler.codec.http.HttpResponseEncoder;
import io.netty.util.concurrent.DefaultThreadFactory;

/** 
 * @author qgan
 * @version 2014年2月12日 上午9:03:23
 */
public class HouTaiHttpServer extends AbsServerEvent{
	private static final Logger log = LoggerFactory.getLogger(HouTaiHttpServer.class);
    
	public void start(int httpPort) throws RunServerException {
		assert (httpPort != -1);
		
		EventLoopGroup bossGroup = new NioEventLoopGroup(0, new DefaultThreadFactory("houtai-boss"));
		EventLoopGroup workGroup = new NioEventLoopGroup(0, new DefaultThreadFactory("houtai-work"));
		try {
			ServerBootstrap bootstrap = new ServerBootstrap();
			bootstrap.group(bossGroup, workGroup)
				.channel(NioServerSocketChannel.class)
				.localAddress(new InetSocketAddress(httpPort))
	            .option(ChannelOption.SO_KEEPALIVE, true)
	            .option(ChannelOption.SO_REUSEADDR, true);
			
			bootstrap.childHandler(new ChannelInitializer<SocketChannel>() {
				@Override
				protected void initChannel(SocketChannel ch) throws Exception {
					ChannelPipeline pipeline = ch.pipeline();
					pipeline.addLast(new HttpRequestDecoder());
					pipeline.addLast(new HttpResponseEncoder());
					pipeline.addLast(new HttpObjectAggregator(512 * 1024));
					pipeline.addLast(new HouTaiHttpHandler());
				}
			});
			
			log.debug("server start");
			bootstrap.bind(new InetSocketAddress(httpPort));
//			f.channel().closeFuture().sync();
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
		HouTaiHttpServer server = new HouTaiHttpServer();
		server.start(GameProperties.houtaiHttpPort);
		HouTaiHttpServer2 server2 = new HouTaiHttpServer2();
		server2.start(GameProperties.clientHttpPort);
	}
}