package com.teamtop.util.tecent;

import io.netty.buffer.ByteBuf;
import io.netty.channel.Channel;

import java.util.Arrays;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.gameCommon.GameProperties;
import com.teamtop.netty.util.nettyCache.NettyCache;
import com.teamtop.system.hero.TempData;
import com.teamtop.util.log.LogTool;

/**
 * 腾讯工具包
 * @author Administrator
 *
 */
public class TecentUtil {
	private static Logger logger = LoggerFactory.getLogger(TecentUtil.class);
	/**
	 * 处理腾讯TGW的第一个包
	 * 
	 * @param channel
	 * @param buffer
	 * @return 若处理成功返回true
	 */
	public static boolean handleTencentFirstPackage(final Channel channel,final ByteBuf buffer) {
//		boolean handleTencent = ChannelCache.isHandleTencent(channel.getId());
//		boolean handleTencent = HeroCache.isHandleTencent(channel);
		TempData tempData = channel.attr(NettyCache.ATTR_KEY).get();
		if (!tempData.isPassTX()) {
			int length = GameProperties.tx.length;
			int capacity = buffer.readableBytes();
			// logger.info(LogFormat.rec("channel:"+channelId+",try add tencent handle,capacity:"+capacity+",txLen"+length));
			if (capacity >= length) {
				byte receive[] = new byte[length];
				buffer.readBytes(receive);
				boolean handle = true;
				for (int i = 0; i < length; i++) {
					if (receive[i] != GameProperties.tx[i]) {
						logger.info(LogTool.getmsg("channel:" + channel.toString() + ",try add tencent handle fail,i:" + i + ",tx:" + Arrays.toString(GameProperties.tx) + ",receive:"
								+ Arrays.toString(receive)));
//						IPCache.addBadIp(channel,new StringBuilder().append("handle tx fail,buff len:").append(capacity).append(",server len:").append(length).toString());
//						channel.close();// close now
						handle = false;
						buffer.resetReaderIndex();
						break;
					}
				}
				if (handle) {
//					ChannelCache.addHandleTencent(channelId);
//					HeroCache.addHandleTencent(channel);
					tempData.setPassTX(true);
					logger.info(LogTool.getmsg(new StringBuilder().append("channel:").append(channel.toString()).append(",add tencent handle success").append(",capacity:").append(capacity).append(",length").append(length).toString()));
					return true;
				}
			} else {
				// byte receive[]=new byte[capacity];
				// buffer.readBytes(receive);
				// logger.info("handle tx fail,tx:"+Arrays.toString(tx)+",receive:"+Arrays.toString(receive));
				// buffer.resetReaderIndex();
			}
		}
		return false;
	}
}
