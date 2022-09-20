package com.teamtop.netty.server.cross;

import io.netty.bootstrap.Bootstrap;
import io.netty.channel.Channel;
import io.netty.channel.ChannelFuture;
import io.netty.channel.ChannelInitializer;
import io.netty.channel.ChannelOption;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.SocketChannel;
import io.netty.channel.socket.nio.NioSocketChannel;
import io.netty.util.concurrent.DefaultThreadFactory;

import com.teamtop.netty.handlers.CrossIODecoder;
import com.teamtop.netty.handlers.CrossIOEncoder;
/**
 * 子服连接中央服
 * @author Administrator
 *
 */
public class CrossClient {
	protected String ip;
	protected int port;
	protected String serverName;//服务器名字
	private Class<? extends CrossIODecoder> decoderClazz;
	
	public void setCrossChannel(Channel crossChannel) {
		this.crossChannel = crossChannel;
	}
	public CrossClient(String ip, int port, String serverName,Class<? extends CrossIODecoder> decoderClazz) {
		super();
		this.ip = ip;
		this.port = port;
		this.serverName = serverName;
		this.decoderClazz = decoderClazz;
	}
	
	public CrossClient() {
		super();
	}

	private Channel crossChannel;
	private Bootstrap bootstrap;
	private int crossToAsPort;
	
	public int getCrossToAsPort() {
		return crossToAsPort;
	}
	public void setCrossToAsPort(int crossToAsPort) {
		this.crossToAsPort = crossToAsPort;
	}
	public String getServerName() {
		return serverName;
	}
	public Channel getCrossChannel() {
		return crossChannel;
	}
	public void conn(){
		if(bootstrap==null){
			NioEventLoopGroup wokerGroup = new NioEventLoopGroup(2,new DefaultThreadFactory("HoutaiNetty"));
			bootstrap = new Bootstrap();
			bootstrap.group(wokerGroup);
			bootstrap.option(ChannelOption.SO_KEEPALIVE, true);
			bootstrap.channel(NioSocketChannel.class);
			final CrossIOEncoder crossIOEncoder = new CrossIOEncoder();
			bootstrap.handler(new ChannelInitializer<SocketChannel>() {
				@Override
				protected void initChannel(SocketChannel ch) throws Exception {
					ch.pipeline().addLast(
							crossIOEncoder,
							decoderClazz.newInstance()
							);
				}
			});
		}
		ChannelFuture channelFuture = bootstrap.connect(ip,port);
		crossChannel = channelFuture.channel();
	}
	@Override
	public String toString() {
		return "LocalClient [serverName="+ serverName+" ,ip=" + ip + ", port=" + port + ", crossChannel=" + crossChannel + "]";
	}
	public String getIp() {
		return ip;
	}
	public int getPort() {
		return port;
	}
	
	
}
