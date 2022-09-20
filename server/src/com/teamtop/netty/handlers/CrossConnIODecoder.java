package com.teamtop.netty.handlers;

import io.netty.channel.Channel;
import io.netty.channel.ChannelHandlerContext;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.CrossEnum;
import com.teamtop.gameCommon.GameProperties;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.util.mybatis.MybatisUtil;
/**
 * 子服中央服通讯的decoder
 * @author Administrator
 *
 */
public class CrossConnIODecoder extends CrossIODecoder {
	private Logger logger = LoggerFactory.getLogger(CrossConnIODecoder.class);
   /**
    * 子服申请连接游戏中央服
    */
	@Override
	public void channelActive(ChannelHandlerContext ctx) throws Exception {
		Channel channel = ctx.channel();		
//		System.out.println("与中央服 "+channel.remoteAddress()+" 连接成功");
		logger.info("与中央服 "+channel.remoteAddress()+" 连接成功.channel active,local address:"+channel.localAddress());
		//发送子服区号
		CrossData crossData = new CrossData();
		crossData.putObject(CrossEnum.zoneidList.name(), GameProperties.zoneids);
		crossData.putObject(CrossEnum.databaseProp.name(), MybatisUtil.getDataBasePropMap());
		NettyWrite.writeXData(channel, CrossConst.CMD_BIND_ZONE_CHANNEL, crossData);
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
	}
	
}
