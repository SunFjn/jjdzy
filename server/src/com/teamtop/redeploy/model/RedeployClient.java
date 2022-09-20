package com.teamtop.redeploy.model;

import com.teamtop.netty.handlers.CrossIOEncoder;
import com.teamtop.netty.server.cross.CrossClient;
import com.teamtop.redeploy.ReployClientIODecoder;
import com.teamtop.redeploy.ui.BanshuPanel;
import com.teamtop.util.Properties.PropertiesTools;

import io.netty.bootstrap.Bootstrap;
import io.netty.channel.Channel;
import io.netty.channel.ChannelFuture;
import io.netty.channel.ChannelInitializer;
import io.netty.channel.ChannelOption;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.SocketChannel;
import io.netty.channel.socket.nio.NioSocketChannel;
import io.netty.util.concurrent.DefaultThreadFactory;
/**
 * 部署client端
 * @author Administrator
 *
 */
public class RedeployClient extends CrossClient{
	private BanshuPanel panel;
	
	private int zone;
	
	public BanshuPanel getPanel() {
		return panel;
	}
	public void setPanel(BanshuPanel panel) {
		this.panel = panel;
	}
	public int getZone() {
		return zone;
	}
	public void setZone(int zone) {
		this.zone = zone;
	}
	
	public void setCrossChannel(Channel crossChannel) {
		this.crossChannel = crossChannel;
	}
	
	public RedeployClient(int zone,BanshuPanel panel){
		this.panel = panel;
		this.zone = zone;
		panel.setZone(zone);//设置会每次选中最后一个标签
		super.ip = PropertiesTools.getProperties("serverAddress_"+zone);
		super.port = PropertiesTools.getPropertiesInt("serverPort_"+zone);
		super.serverName = "redeployClient_"+zone;
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
							new ReployClientIODecoder(zone)
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
