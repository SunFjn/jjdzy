package com.teamtop.netty.server.local;

import io.netty.bootstrap.ServerBootstrap;
import io.netty.channel.ChannelFuture;
import io.netty.channel.ChannelInitializer;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.SocketChannel;
import io.netty.channel.socket.nio.NioServerSocketChannel;

import com.teamtop.gameCommon.GameProperties;
import com.teamtop.main.RunServerException;
import com.teamtop.netty.firewall.NettyFireWallHandler;
import com.teamtop.netty.handlers.DefaultIODecoder;
import com.teamtop.netty.handlers.DefaultIOEncoder;
/**
 * 子服服务器
 * @author Administrator
 *
 */
public class LocalNettyServer{
	public static void startServer() throws RunServerException {
		try {
			final DefaultIOEncoder ioEncoder = new DefaultIOEncoder();
			NioEventLoopGroup bossGroup = new NioEventLoopGroup();
			NioEventLoopGroup wokerGroup = new NioEventLoopGroup();

			ServerBootstrap serverBootstrap = new ServerBootstrap();
			serverBootstrap.group(bossGroup, wokerGroup);
			serverBootstrap.channel(NioServerSocketChannel.class);
			serverBootstrap.childHandler(new ChannelInitializer<SocketChannel>() {
				@Override
				protected void initChannel(SocketChannel ch) throws Exception {
					ch.pipeline().addLast(new DefaultIODecoder(),ioEncoder);
				}
			});
			ChannelFuture bind = serverBootstrap.bind(GameProperties.serverPort);
			bind.await();
			if(!bind.isSuccess()){
				throw new RunServerException(null, "LocalNettyServer netty port:"+GameProperties.serverPort+" bind by others");
			}
		} catch (Exception e) {
			throw new RunServerException(e, "LocalNettyServer netty exception");
		}
	}
}
