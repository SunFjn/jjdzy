package com.teamtop.houtaiHttp.events.recharge.rechargeSwitch;

import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.callback.Callback;
import com.teamtop.houtaiHttp.HoutaiConst;
import com.teamtop.houtaiHttp.HoutaiResponseUtil;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.util.log.LogTool;

import io.netty.channel.Channel;
import io.netty.channel.ChannelHandlerContext;

public class RechargeSwitchCrossIO {
	private static RechargeSwitchCrossIO ins = null;

	public static RechargeSwitchCrossIO getIns() {
		if (ins == null) {
			ins = new RechargeSwitchCrossIO();
		}
		return ins;
	}

	private RechargeSwitchCrossIO() {
		// TODO Auto-generated constructor stub
	}

	/**
	 * 中央服向子服请求充值入口开关处理
	 * 
	 * @param type
	 * @param ctx
	 */
	public void rechargeSwitch(int type, ChannelHandlerContext ctx) {
		try {
			ConcurrentHashMap<Integer, Channel> zoneidToChannel = CrossCache.getZoneidToChannel();
			for (Channel channel : zoneidToChannel.values()) {
				CrossData crossData = new CrossData();
				// 状态 1.开启 2.关闭
				crossData.putObject(RechargeSwitchCrossEnum.type, type);
				NettyWrite.writeXData(channel, CrossConst.RECHARGESWITCH, crossData, new Callback() {
					@Override
					public void dataReci(Channel channel, CrossData crossData) {
						boolean flag = crossData.getObject(RechargeSwitchCrossEnum.callbackState, Boolean.class);
						if (flag) {
							HoutaiResponseUtil.responseSucc(ctx);
						} else {
							HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_500, ctx);
						}
					}
				});
			}
		} catch (Exception e) {
			LogTool.error(e, RechargeSwitchCrossIO.class, "RechargeSwitchCrossIO rechargeSwitch, ");
			HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_500, ctx);
		}

	}

	/**
	 * 子服充值入口开关处理
	 * 
	 * @param channel
	 * @param crossData
	 */
	public void rechargeSwitchHandle(Channel channel, CrossData crossData) {
		// 状态 1.开启 2.关闭
		int type = crossData.getObject(RechargeSwitchCrossEnum.type, Integer.class);
		try {
			boolean isCanRecharge;
			if (type == 1) {
				isCanRecharge = true;
			} else {
				isCanRecharge = false;
			}
			HeroCache.setCanRecharge(isCanRecharge);
			crossData.putObject(RechargeSwitchCrossEnum.callbackState, true);
			NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
		} catch (Exception e) {
			crossData.putObject(RechargeSwitchCrossEnum.callbackState, false);
			NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
			LogTool.error(e, RechargeSwitchCrossIO.class, "RechargeSwitchCrossIO rechargeSwitchHandle, ");
		}
	}
}
