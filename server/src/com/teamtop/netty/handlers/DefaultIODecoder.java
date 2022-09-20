package com.teamtop.netty.handlers;

import io.netty.buffer.ByteBuf;
import io.netty.channel.Channel;
import io.netty.channel.ChannelHandlerContext;
import io.netty.handler.codec.ByteToMessageDecoder;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.cross.CrossFunction;
import com.teamtop.cross.CrossZone;
import com.teamtop.gameCommon.GameProperties;
import com.teamtop.netty.firewall.FireWallFunction;
import com.teamtop.netty.firewall.skyeye.SkyEyeCache;
import com.teamtop.netty.firewall.skyeye.SkyEyeFunction;
import com.teamtop.netty.util.NettyDispatch;
import com.teamtop.netty.util.NettyRead;
import com.teamtop.netty.util.nettyCache.NettyCache;
import com.teamtop.system.event.backstage.events.backstage.BackstageConst;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.TempData;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.tecent.TecentUtil;
/**
 * 这个iodecoder用于处理客户端
 * 里面有处理cg的cmd，如果是跨服请用其他
 * @author Administrator
 *
 */
public class DefaultIODecoder extends ByteToMessageDecoder {
	private Logger logger = LoggerFactory.getLogger(DefaultIODecoder.class);

	// private final TempData tempData = new TempData();

	@Override
	protected void decode(ChannelHandlerContext ctx, ByteBuf in, List<Object> out) throws Exception {
//		if (TecentUtil.handleTencentFirstPackage(ctx.channel(), in)) {
//			return;
//		}
		int readableBytes = in.readableBytes();
		if(readableBytes<2) return;
		int dataLength = in.readShort();
		if (readableBytes < dataLength) {
			// 原长度为12640，但此次收到的包只有1024长度
			// 需要等待更多的包，所以reset reader index
			in.resetReaderIndex();
//			logger.warn("need more data，readableBytes:" + readableBytes + ",dataLength:" + dataLength + ":" + ctx.channel().remoteAddress());
			return;
		} else {
			// 此次收到的包已经满足或多于一个完整的包
			// 把这个包读出来
			final ByteBuf data = in.readBytes(dataLength - 2);
			// 读完后mark 至此包decode已经完成 下面是解析协议
			in.markReaderIndex();
			try {
				int cmd = data.readShort();
				if(cmd %2==0){
					TempData tempData = ctx.channel().attr(NettyCache.ATTR_KEY).get();
					SkyEyeFunction.cgBadCmd(tempData);
				}
				if((cmd >6100 & cmd <6200) || cmd==223 || cmd==225){
					
				}else{
					FireWallFunction.channelRead(ctx, dataLength);
				}
				final Object[] readDatas = NettyRead.readData(data, cmd);
				if (readDatas != null) {
					NettyDispatch.dispatcherMethod(cmd, readDatas, ctx.channel());
				} else {
					logger.warn("iodecoder dispatch fail,cmd:" + cmd + ",dataLen:" + (dataLength - 4));
				}

				 //屏蔽，改用Object[]
				/*byte[] readDatas = data.readBytes(dataLength - 4).array();
				if (readDatas != null) {
					NettyDispatch.dispatcherMethod(cmd, readDatas, ctx.channel());
				} else {
					logger.warn("iodecoder dispatch fail,cmd:" + cmd + ",dataLen:" + (dataLength - 4));
				}*/
				
			} catch (Exception e) {
				// 保证不影响读取包
				LogTool.error(e,this);
			}
		}
	}

	@Override
	public void channelActive(ChannelHandlerContext ctx) throws Exception {
		Channel channel = ctx.channel();
		if(GameProperties.shutdown) channel.close();
		TempData tempData = new TempData();
		tempData.setChannel(channel);
		channel.attr(NettyCache.ATTR_KEY).set(tempData);
		SkyEyeCache.addChannelConn(channel);//记录连接的channel
		logger.info(channel.remoteAddress().toString() + ",client channelActive");
		super.channelActive(ctx);
	}

	@Override
	public void channelInactive(ChannelHandlerContext ctx) throws Exception {
		try {
			Channel channel = ctx.channel();
			SkyEyeCache.removeChannelConn(channel);
			logger.info(channel.remoteAddress().toString() + ",client channelInactive");
			TempData tempData = channel.attr(NettyCache.ATTR_KEY).get();
			if(tempData!=null){
				Hero hero = tempData.getHero();
				if(hero!=null){
					int operType = 0;
					if(hero.getLoginTime()-hero.getLogoutTime()<10){
						//刷新
						operType = BackstageConst.M_LOGINOUT_OPER_REFRESH;
					}else{
						//正常退出
						operType = BackstageConst.M_LOGINOUT_OPER_NORMAL;
					}
					if(CrossZone.isCrossServer()){
						//中央服退出
						CrossFunction.logout(hero);
					}else{
						HeroFunction.getIns().logout(hero, operType);
					}
				}
			}
			tempData.setChannel(null);
		} catch (Exception e) {
			logger.error(LogTool.errmsg(e));
		}
		super.channelInactive(ctx);
	}

	@Override
	public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) throws Exception {
		//360浏览器刷新不会断开连接，而关掉后又会触发：远程主机强迫关闭了一个现有的连接。
		//SB 360
	}
	
	
}
