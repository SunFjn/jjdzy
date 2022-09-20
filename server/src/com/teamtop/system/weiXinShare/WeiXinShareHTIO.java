package com.teamtop.system.weiXinShare;

import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.util.log.LogTool;

import io.netty.channel.Channel;

public class WeiXinShareHTIO {
	private static WeiXinShareHTIO ins;

	public static synchronized WeiXinShareHTIO getIns() {
		if (ins == null) {
			ins = new WeiXinShareHTIO();
		}
		return ins;
	}

	/**
	 * 后台服收到子服好友信息进行中转
	 * 
	 * @param channel
	 * @param crossData
	 */
	public void LHnoticFriend(Channel channel, CrossData crossData) {
		int cmd = CrossConst.WEI_XIN_SHARE_FRIEND_LH;

		try {
			int zoneId = crossData.getObject(WeiXinShareEnum.zoneId, Integer.class);
			Channel iochannel = CrossCache.getChannel(zoneId);
			if (iochannel == null || !iochannel.isOpen()) {
				LogTool.warn("channel == null || !channel.isOpen() LHnoticFriend", WeiXinShareHTIO.class);
				return;
			}
			NettyWrite.writeXData(iochannel, CrossConst.WEI_XIN_SHARE_FRIEND_HL, crossData);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 后台服收到子服好友充值进行中转
	 * 
	 * @param channel
	 * @param crossData
	 */
	public void LHnoticMoney(Channel channel, CrossData crossData) {
		int cmd = CrossConst.WEI_XIN_SHARE_MONEY_LH;

		try {
			int zoneId = crossData.getObject(WeiXinShareEnum.zoneId, Integer.class);
			Channel iochannel = CrossCache.getChannel(zoneId);
			if (iochannel == null || !iochannel.isOpen()) {
				LogTool.warn("channel == null || !channel.isOpen() LHnoticFriend", WeiXinShareHTIO.class);
				return;
			}
			NettyWrite.writeXData(iochannel, CrossConst.WEI_XIN_SHARE_MONEY_HL, crossData);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
