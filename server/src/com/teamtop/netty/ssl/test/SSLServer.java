package com.teamtop.netty.ssl.test;


import io.netty.bootstrap.ServerBootstrap;
import io.netty.channel.ChannelFuture;
import io.netty.channel.ChannelInitializer;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.SocketChannel;
import io.netty.channel.socket.nio.NioServerSocketChannel;
import io.netty.handler.codec.http.HttpRequestDecoder;
import io.netty.handler.codec.http.HttpResponseEncoder;
import io.netty.handler.codec.string.StringEncoder;
import io.netty.handler.ssl.SslHandler;

import java.io.FileInputStream;
import java.security.KeyStore;

import javax.net.ssl.KeyManagerFactory;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLEngine;

import com.teamtop.main.RunServerException;

public class SSLServer {
	public static void main(String[] args) {
		try {
			NioEventLoopGroup bossGroup = new NioEventLoopGroup();
			NioEventLoopGroup wokerGroup = new NioEventLoopGroup();
			
			ServerBootstrap serverBootstrap = new ServerBootstrap();
			serverBootstrap.group(bossGroup, wokerGroup);
			serverBootstrap.channel(NioServerSocketChannel.class);
			KeyStore ks = KeyStore.getInstance("PKCS12");
			ks.load(new FileInputStream("src/com/teamtop/netty/ssl/test/_.3737.com.p12"), "123asd".toCharArray());
			KeyManagerFactory kmf = KeyManagerFactory.getInstance(KeyManagerFactory.getDefaultAlgorithm());
			kmf.init(ks, "123asd".toCharArray());
			final SSLContext sslContext = SSLContext.getInstance("TLS");
			sslContext.init(kmf.getKeyManagers(), null, null);
			serverBootstrap.childHandler(new ChannelInitializer<SocketChannel>() {
				@Override
				protected void initChannel(SocketChannel ch) throws Exception {
					SSLEngine sslEngine = sslContext.createSSLEngine();
					sslEngine.setUseClientMode(false);
					sslEngine.setNeedClientAuth(false);
					ch.pipeline().addLast("ssl",new SslHandler(sslEngine));
					ch.pipeline().addLast(new HttpRequestDecoder());
					ch.pipeline().addLast(new HttpResponseEncoder());
					ch.pipeline().addLast("handler", new SSLServerHandler());
				}
			});
			ChannelFuture bind = serverBootstrap.bind(8001);
			bind.await();
			if(!bind.isSuccess()){
				throw new RunServerException(null, "LocalNettyServer netty port bind by others");
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}