package com.teamtop.netty.firewall;

import io.netty.buffer.ByteBuf;
import io.netty.channel.Channel;
import io.netty.channel.ChannelHandler.Sharable;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.ChannelInboundHandlerAdapter;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.gameCommon.GameProperties;
import com.teamtop.netty.firewall.skyeye.SkyEyeCache;
import com.teamtop.netty.firewall.skyeye.SkyEyeConst;
import com.teamtop.netty.firewall.skyeye.SkyEyeFunction;
import com.teamtop.netty.util.nettyCache.NettyCache;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.TempData;
import com.teamtop.util.time.TimeDateUtil;

/**
 * Netty刷包防火墙
 * 
 * @author sheng
 *
 */
@Sharable
public class NettyFireWallHandler extends ChannelInboundHandlerAdapter {
	 private static Logger logger = LoggerFactory.getLogger(NettyFireWallHandler.class);
	/**
	 * @param connection
	 * @return
	 */
	private static Long[] getChannelPackRecord(Channel channel, long currentTime) {
		TempData tempData = channel.attr(NettyCache.ATTR_KEY).get();
		if(tempData==null) return null;
		Long[] value = tempData.getFirewall();
		if (value == null) {
			value = new Long[] { currentTime + 1000, 0l, 0l, currentTime + 60000, 0l, 0l, 0l };
			tempData.setFirewall(value);
		}
		if (currentTime > value[0]) {
			value[0] = currentTime + 1000;
			value[1] = 0l;
			value[2] = 0l;
		}
		if (currentTime > value[3]) {
			value[3] = currentTime + 60000;
			value[4] = 0l;
			value[5] = 0l;
		}
		return value;
	}

	@Override
	public void channelRead(ChannelHandlerContext ctx, Object e) throws Exception {
		if(!SkyEyeFunction.watch) {
			super.channelRead(ctx, e);
			return;
		}
		long currentTime = System.currentTimeMillis();
		final Channel channel = ctx.channel();
		final ByteBuf buffer = (ByteBuf) e;
		Long[] packRecord = getChannelPackRecord(channel, currentTime);
		if(packRecord!=null){
			packRecord[1] += 1;
			int bytes = buffer.readableBytes();
			packRecord[2] += bytes;
			packRecord[4] += 1;
			packRecord[5] += bytes;
			logger.info("pack num:" + packRecord[1] + ",bytes:" + packRecord[2] + ",time:" + TimeDateUtil.printOnlyTime(TimeDateUtil.getCurrentTime()));
			if (packRecord[1] >= FireWallConfig.MAX_SECOND_PACKAGES || packRecord[2] >= FireWallConfig.MAX_SECOND_BYTES || packRecord[4] >= FireWallConfig.MAX_MINUTE_PACKAGES
					|| packRecord[5] >= FireWallConfig.MAX_MINUTE_BYTES) {
				TempData tempData = ctx.channel().attr(NettyCache.ATTR_KEY).get();
				int zoneid = 0;
				String openid = null;
				long hid = 0;
				if(tempData!=null){
					zoneid = tempData.getZoneid();
					openid = tempData.getOpenid();
					Hero hero = tempData.getHero();
					if(hero!=null){
						hid = hero.getId();
					}
					tempData.setPrintcmd(true);
				}
				if(zoneid==0){
					zoneid = GameProperties.getFirstZoneId();
				}
				logger.info("hid:"+hid+",openid:"+openid+",zoneid:"+zoneid+",pack num:" + packRecord[1] + ",bytes:" + packRecord[2] + ",time:" + TimeDateUtil.printOnlyTime(TimeDateUtil.getCurrentTime()));
				packRecord[1] = 0l;
				packRecord[2] = 0l;
				packRecord[4] = 0l;
				packRecord[5] = 0l;
				packRecord[6] += 1;
			}
			if (packRecord[6] > 4) {
				TempData tempData = ctx.channel().attr(NettyCache.ATTR_KEY).get();
				int zoneid = 0;
				String openid = null;
				long hid = 0;
				if(tempData!=null){
					zoneid = tempData.getZoneid();
					openid = tempData.getOpenid();
					Hero hero = tempData.getHero();
					if(hero!=null){
						hid = hero.getId();
					}
				}
				if(zoneid==0){
					zoneid = GameProperties.getFirstZoneId();
				}
				logger.warn("packet too much openid:"+openid+",hid:"+hid+",zoneid:"+zoneid+"pack num:" + packRecord[1] + ",bytes:" + packRecord[2] + ",time:" + TimeDateUtil.printOnlyTime(TimeDateUtil.getCurrentTime()));
//				FlowSkyEyeEvent.getIns().addProtocolWatch(hid, zoneid,openid, SkyEyeConst.REASON_PACKET);
				SkyEyeCache.addBadRole(tempData.getOpenid(), SkyEyeConst.FIREWALL);
				channel.close();
			}
		}
		super.channelRead(ctx, e);
	}
}
