package com.teamtop.houtaiHttp.qqGift;

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

public class QqGiftHttpServer extends AbsServerEvent{
	
	private static final Logger log = LoggerFactory.getLogger(QqGiftHttpServer.class);

	public void start(int httpPort) throws RunServerException {
		assert (httpPort != -1);
		
		EventLoopGroup bossGroup = new NioEventLoopGroup(2, new DefaultThreadFactory("qqGift-boss"));
		EventLoopGroup workGroup = new NioEventLoopGroup(2, new DefaultThreadFactory("qqGift-work"));
		try {
			ServerBootstrap bootstrap = new ServerBootstrap();
			bootstrap.group(bossGroup, workGroup)
				.channel(NioServerSocketChannel.class)
				.localAddress(new InetSocketAddress(httpPort))
	            .option(ChannelOption.SO_KEEPALIVE, true)
	            .option(ChannelOption.SO_REUSEADDR, true);
			
			//final QqGiftHttpHandler handler = new QqGiftHttpHandler();
			
			bootstrap.childHandler(new ChannelInitializer<SocketChannel>() {
				@Override
				protected void initChannel(SocketChannel ch) throws Exception {
					ChannelPipeline pipeline = ch.pipeline();
					pipeline.addLast(new HttpRequestDecoder());
					pipeline.addLast(new HttpResponseEncoder());
					pipeline.addLast(new HttpObjectAggregator(512 * 1024));
					pipeline.addLast(new QqGiftHttpHandler());
				}
			});
			
			log.info("server start");
			bootstrap.bind(new InetSocketAddress(httpPort));
//			f.channel().closeFuture().sync();
		} catch (Exception e) {
			log.error("run error", e);
			throw new RunServerException(e, "QqGiftHttpServer werr");
		} finally {
//            bossGroup.shutdownGracefully();
//            workGroup.shutdownGracefully();
        }
	}
	@Override
	public void startServer() throws RunServerException {
		QqGiftHttpServer server = new QqGiftHttpServer();
		server.start(GameProperties.qqGiftPort);
	}

}
