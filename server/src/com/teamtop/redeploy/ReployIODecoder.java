package com.teamtop.redeploy;

import java.text.DecimalFormat;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.netty.handlers.CrossDispatch;
import com.teamtop.netty.handlers.CrossIODecoder;
import com.teamtop.netty.util.nettyCache.NettyCache;
import com.teamtop.redeploy.cross.RedeployServerToClient;
import com.teamtop.system.hero.TempData;
import com.teamtop.util.log.LogTool;

import io.netty.buffer.ByteBuf;
import io.netty.channel.Channel;
import io.netty.channel.ChannelHandlerContext;
/**
 * 部署服务器的decoder
 * @author Administrator
 *
 */
public class ReployIODecoder extends CrossIODecoder {
	private Logger logger = LoggerFactory.getLogger(ReployIODecoder.class);
	@Override
	protected void decode(ChannelHandlerContext ctx, ByteBuf in, List<Object> out) throws Exception {
//		if (TecentUtil.handleTencentFirstPackage(ctx.channel(), in)) {
//			return;
//		}
		int readableBytes = in.readableBytes();
		if(readableBytes<4) return;
		int dataLength = in.readInt();
		TempData tempData = ctx.channel().attr(NettyCache.ATTR_KEY).get();
		long now = System.currentTimeMillis();
		Long time = (Long) tempData.getAttribute("lastTime");
		DecimalFormat df = new DecimalFormat("0.00");
		if(time==null){
			time = now;
//			RedeployServerToClient.sendInfo(ctx.channel(), "RedeployServer:upload finish "+df.format(100f*readableBytes/dataLength) + "%,len:"+dataLength);
			tempData.addAttribute("lastTime", now);
		}
		if(now-time>200&& readableBytes != dataLength){
			RedeployServerToClient.sendInfo(ctx.channel(), "RedeployServer:upload finish "+df.format(100f*readableBytes/dataLength) + "%,len:"+dataLength);
			tempData.addAttribute("lastTime", now);
		}
		if (readableBytes < dataLength) {
			// 原长度为14640，但此次收到的包只有1044长度
			// 需要等待更多的包，所以reset reader index
			in.resetReaderIndex();
//			logger.info("need more data，readableBytes:" + readableBytes + ",dataLength:" + dataLength + ":" + ctx.channel().remoteAddress());
			return;
		} else {
			Thread.sleep(12L);
			RedeployServerToClient.sendInfo(ctx.channel(), "RedeployServer:upload finish "+df.format(100f*readableBytes/dataLength) + "%,len:"+dataLength+" end.");
			// 此次收到的包已经满足或多于一个完整的包
			// 把这个包读出来
			final ByteBuf data = in.readBytes(dataLength - 4);
			// 读完后mark 至此包decode已经完成 下面是解析协议
			in.markReaderIndex();
			try {
				int cmd = data.readShort();
				//final Object[] readData = NettyRead.readData(data.readBytes(dataLength - 4), cmd);
				byte[] readDatas = data.readBytes(dataLength - 6).array();
				if (readDatas != null) {
					CrossDispatch.dispatcherMethod(cmd, readDatas, ctx.channel());
				} else {
					logger.warn("iodecoder dispatch fail,cmd:" + cmd + ",dataLen:" + (dataLength - 6));
				}
			} catch (Exception e) {
				// 保证不影响读取包
				logger.error(LogTool.exception(e));
			}
		}
	}
	@Override
	public void channelActive(ChannelHandlerContext ctx) throws Exception {
		Channel channel = ctx.channel();
		TempData tempData = new TempData();
		tempData.setChannel(channel);
		channel.attr(NettyCache.ATTR_KEY).set(tempData);
		logger.info("channel active,remote address:"+channel.remoteAddress()+",local address:"+channel.localAddress());
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
		RedeployCache.clearTailerList();
	}
	
}
