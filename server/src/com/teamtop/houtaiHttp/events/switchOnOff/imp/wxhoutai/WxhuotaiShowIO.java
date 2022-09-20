package com.teamtop.houtaiHttp.events.switchOnOff.imp.wxhoutai;

import java.util.List;
import java.util.Map.Entry;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.callback.Callback;
import com.teamtop.houtaiHttp.HouTaiHttpCache;
import com.teamtop.houtaiHttp.HoutaiConst;
import com.teamtop.houtaiHttp.HoutaiResponseUtil;
import com.teamtop.houtaiHttp.events.switchOnOff.OnOffTypeEnum;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.global.GlobalSender;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.util.log.LogTool;

import io.netty.channel.Channel;
import io.netty.channel.ChannelHandlerContext;

public class WxhuotaiShowIO {

	private static WxhuotaiShowIO ins = null;

	public static synchronized WxhuotaiShowIO getIns() {
		if (ins == null) {
			ins = new WxhuotaiShowIO();
		}
		return ins;
	}

	public void setShowOnOff(List<Integer> zoneidList, int state, ChannelHandlerContext ctx, boolean isAll) {
		try {
			ConcurrentHashMap<Channel, List<Integer>> channelToZoneid = CrossCache.getChannelToZoneid();
			int zoneid = 0;
			if (isAll) {
				// 所有服
				for (Entry<Channel, List<Integer>> entry : channelToZoneid.entrySet()) {
					try {
						List<Integer> zoneIdList = entry.getValue();
						Integer zoneId = zoneIdList.get(0);
						Channel channel = entry.getKey();
						if (channel != null) {
							CrossData crossData = new CrossData();
							// 微信分享开关 状态
							crossData.putObject(WxShowCrossEnum.state, state);
							
							LogTool.info("setShowOnOff zoneid:" + zoneId, this);
							if (!HouTaiHttpCache.getOnOffCache().containsKey(zoneId)) {
								HouTaiHttpCache.getOnOffCache().put(zoneId, new ConcurrentHashMap<Integer,Integer>());
							}
							HouTaiHttpCache.getOnOffCache().get(zoneId).put(OnOffTypeEnum.WEIXIN_SHARE_ONOFF.getCountryType(), state);
							
							NettyWrite.writeXData(channel, CrossConst.CTL_WX_SHOW, crossData, new Callback() {
								@Override
								public void dataReci(Channel channel, CrossData crossData) {
									boolean flag = crossData.getObject(WxShowCrossEnum.callbackState, Boolean.class);
									if (!flag) {
										LogTool.info("setShowOnOff Callback zoneid:" + zoneId, this);
									}
								}
							});
						}
					} catch (Exception e) {
						// TODO: handle exception
						LogTool.error(e, this, "setShowOnOff setShowOnOff");
					}
				}
			} else {
//				// 部分服
				for (int i = 0; i < zoneidList.size(); i++) {
					zoneid = zoneidList.get(i);
					LogTool.info("setShowOnOff zoneid " + zoneid, WxhuotaiShowIO.class);
					Channel channel = CrossCache.getChannel(zoneid);
					if (channel != null) {
						CrossData crossData = new CrossData();
						// 微信分享开关 状态
						crossData.putObject(WxShowCrossEnum.state, state);
						
						if (!HouTaiHttpCache.getOnOffCache().containsKey(zoneid)) {
							HouTaiHttpCache.getOnOffCache().put(zoneid, new ConcurrentHashMap<Integer,Integer>());
						}
						HouTaiHttpCache.getOnOffCache().get(zoneid).put(OnOffTypeEnum.WEIXIN_SHARE_ONOFF.getCountryType(), state);
						
						NettyWrite.writeXData(channel, CrossConst.CTL_WX_SHOW, crossData, new Callback() {
							@Override
							public void dataReci(Channel channel, CrossData crossData) {
								boolean flag = crossData.getObject(WxShowCrossEnum.callbackState, Boolean.class);
								if (flag) {
									HoutaiResponseUtil.responseSucc(ctx);
								} else {
									HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_500, ctx);
								}
							}
						});
					} else {
						LogTool.info("setShowOnOff channel==null", WxhuotaiShowIO.class);
					}
				}
			}
			
			HouTaiHttpCache.updateOnOffModel();
			HoutaiResponseUtil.responseSucc(ctx);
		} catch (Exception e) {
			LogTool.error(e, WxhuotaiShowIO.class, "setShowOnOff setShowOnOff");
			HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_500, ctx);
		}
	}

	/**
	 * 子服收到 分享开关状态
	 * 
	 * @param channel
	 * @param crossData
	 */
	public void LRCWxShowCross(Channel channel, CrossData crossData) {
		int cmd = CrossConst.CTL_WX_SHOW;
		int state = crossData.getObject(WxShowCrossEnum.state, Integer.class);
		LogTool.info("set WxShowCross state:" + state, WxhuotaiShowIO.class);
		// 1开启 2关闭
		if (state == 1) {
			state = 1;
		} else {
			state = 0;
		}
		HeroCache.getOnOffModel().getOnOffCache().put(OnOffTypeEnum.WEIXIN_SHARE_ONOFF.getCountryType(), state);
		HeroCache.upDateOnOffModel();
		try {
			crossData.putObject(WxShowCrossEnum.callbackState, true);
			NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
			LogTool.info("state:" + state, WxShowCrossEnum.class);
			for (Hero hero : HeroCache.getHeroMap().values()) {
				if (HeroFunction.getIns().isOnline(hero.getId())) {
					// HeroSender.sendCmd_166(hero.getId(), guankaNum);
					GlobalSender.sendCmd_268(hero.getId(),
							new Object[] { new Object[] { OnOffTypeEnum.WEIXIN_SHARE_ONOFF.getCountryType(), state } });
				}
			}
		} catch (Exception e) {
			crossData.putObject(WxShowCrossEnum.callbackState, false);
			NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
			LogTool.error(e, WxhuotaiShowIO.class, "WxhuotaiShowIO LRCWxShowCross ");
		}
	}
}
