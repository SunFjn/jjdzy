package com.teamtop.redeploy;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.netty.handlers.CrossIODecoder;
import com.teamtop.redeploy.ui.MainFrame;

import io.netty.channel.Channel;
import io.netty.channel.ChannelHandlerContext;
/**
 * 部署服务器client端的decoder
 * @author Administrator
 *
 */
public class ReployClientIODecoder extends CrossIODecoder {
	private int zone;
	
	public void setZone(int zone) {
		this.zone = zone;
	}

	public ReployClientIODecoder(int zone) {
		super();
		this.zone = zone;
	}

	private Logger logger = LoggerFactory.getLogger(ReployClientIODecoder.class);
	@Override
	public void channelActive(ChannelHandlerContext ctx) throws Exception {
		Channel channel = ctx.channel();
		logger.info("channel active,remote address:"+channel.remoteAddress()+",local address:"+channel.localAddress()+",zone:"+zone);
		channel.attr(RedeployClientCache.ATTR_KEY).set(zone);
		MainFrame.info("服务器连接成功:"+RedeployConst.getPfName(zone), zone);
	}
	
	@Override
	public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) throws Exception {
		//360浏览器刷新不会断开连接，而关掉后又会触发：远程主机强迫关闭了一个现有的连接。
		//SB 360
	}
	
	@Override
	public void channelInactive(ChannelHandlerContext ctx) throws Exception {
		Channel channel = ctx.channel();
		logger.info("channel inactive,remote address:"+channel.remoteAddress()+",local address:"+channel.localAddress());
		MainFrame.info("服务器已断开", zone);
	}
	
}
