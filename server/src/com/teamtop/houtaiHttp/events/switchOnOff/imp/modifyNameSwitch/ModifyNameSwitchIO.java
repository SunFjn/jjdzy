package com.teamtop.houtaiHttp.events.switchOnOff.imp.modifyNameSwitch;

import java.util.List;
import java.util.Map.Entry;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.callback.Callback;
import com.teamtop.gameCommon.GameProperties;
import com.teamtop.houtaiHttp.HouTaiHttpCache;
import com.teamtop.houtaiHttp.HoutaiConst;
import com.teamtop.houtaiHttp.HoutaiResponseUtil;
import com.teamtop.houtaiHttp.events.switchOnOff.OnOffTypeEnum;
import com.teamtop.houtaiHttp.events.switchOnOff.imp.wxhoutai.WxShowCrossEnum;
import com.teamtop.houtaiHttp.events.switchOnOff.imp.wxhoutai.WxhuotaiShowIO;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.global.GlobalSender;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.task.TaskUserFunction;
import com.teamtop.util.log.LogTool;

import io.netty.channel.Channel;
import io.netty.channel.ChannelHandlerContext;

public class ModifyNameSwitchIO {

	private static ModifyNameSwitchIO ins = null;

	public static synchronized ModifyNameSwitchIO getIns() {
		if (ins == null) {
			ins = new ModifyNameSwitchIO();
		}
		return ins;
	}

	/**
	 * 给所有服设置状态,开关状态 1开启 2关闭
	 * 
	 * @param state
	 * @param ctx
	 */
	public void setSwitchStateToLocal(List<Integer> zoneidList, int state, ChannelHandlerContext ctx, boolean isAll) {
		try {
			ConcurrentHashMap<Channel, List<Integer>> channelToZoneid = CrossCache.getChannelToZoneid();
			if (isAll) {
				for (Entry<Channel, List<Integer>> entry : channelToZoneid.entrySet()) {
					try {
						List<Integer> zoneIdList = entry.getValue();
						Integer zoneId = zoneIdList.get(0);
						CrossData crossData = new CrossData();
						crossData.putObject(ModifyNameSwitchCrossEnum.state, state);
						Channel channel = entry.getKey();
						LogTool.info("setSwitchStateToLocal zoneId:" + zoneId, this);
						NettyWrite.writeXData(channel, CrossConst.MODIFYNAME_SWITCH, crossData, new Callback() {
							@Override
							public void dataReci(Channel channel, CrossData crossData) {
								LogTool.info("setSwitchStateToLocal Callback zoneId:" + zoneId, this);
							}
						});
						
						if (!HouTaiHttpCache.getOnOffCache().containsKey(zoneId)) {
							HouTaiHttpCache.getOnOffCache().put(zoneId, new ConcurrentHashMap<Integer,Integer>());
						}
						HouTaiHttpCache.getOnOffCache().get(zoneId).put(OnOffTypeEnum.MODIFY_NAME_ONOFF.getCountryType(), state);
						
						
					} catch (Exception e) {
						// TODO: handle exception
						LogTool.error(e, this, "setSwitchStateToLocal");
					}
				}
			}else {
				// 部分服
				for (int i = 0; i < zoneidList.size(); i++) {
					Integer zoneid = zoneidList.get(i);
					LogTool.info("setShowOnOff zoneid " + zoneid, WxhuotaiShowIO.class);
					Channel channel = CrossCache.getChannel(zoneid);
					if (channel != null) {
						CrossData crossData = new CrossData();
						// 微信分享开关 状态
						crossData.putObject(WxShowCrossEnum.state, state);
						
						if (!HouTaiHttpCache.getOnOffCache().containsKey(zoneid)) {
							HouTaiHttpCache.getOnOffCache().put(zoneid, new ConcurrentHashMap<Integer,Integer>());
						}
						HouTaiHttpCache.getOnOffCache().get(zoneid).put(OnOffTypeEnum.MODIFY_NAME_ONOFF.getCountryType(), state);
						
						LogTool.info("setSwitchStateToLocal zoneId:" + zoneid, this);
						NettyWrite.writeXData(channel, CrossConst.MODIFYNAME_SWITCH, crossData, new Callback() {
							@Override
							public void dataReci(Channel channel, CrossData crossData) {
								LogTool.info("setSwitchStateToLocal Callback zoneId:" + zoneid, this);
							}
						});
						
						
					} else {
						LogTool.info("MODIFY_NAME_ONOFF channel==null", WxhuotaiShowIO.class);
					}
				}
				
				
			}
			//HouTaiHttpCache.getOnOffCache().put(OnOffTypeEnum.MODIFY_NAME_ONOFF.getCountryType(), state);
			HouTaiHttpCache.updateOnOffModel();
			HoutaiResponseUtil.responseSucc(ctx);
		} catch (Exception e) {
			LogTool.error(e, this, "setSwitchStateToLocal");
			HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_500, ctx);
		}
	}

	/**
	 * 所有服收到开关状态,开关状态 1开启 2关闭
	 * 
	 * @param channel
	 * @param crossData
	 */
	public void setSwitchStateFromCen(Channel channel, CrossData crossData) {
		int cmd = CrossConst.MODIFYNAME_SWITCH;
		int state = crossData.getObject(ModifyNameSwitchCrossEnum.state, Integer.class);
		HeroCache.getOnOffModel().getOnOffCache().put(OnOffTypeEnum.MODIFY_NAME_ONOFF.getCountryType(), state);
		HeroCache.upDateOnOffModel();
		try {
			crossData.putObject(ModifyNameSwitchCrossEnum.callbackState, true);
			NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
			LogTool.info("setSwitchStateFromCen state:" + state + " zoneId:" + GameProperties.getFirstZoneId(), this);
			for (Hero hero : HeroCache.getHeroMap().values()) {
				if (HeroFunction.getIns().isOnline(hero.getId())) {
					TaskUserFunction.getIns().houtaiModifyNameHandle(hero);
					GlobalSender.sendCmd_268(hero.getId(),
							new Object[] { new Object[] { OnOffTypeEnum.MODIFY_NAME_ONOFF.getCountryType(), state } });
				}
			}
		} catch (Exception e) {
			crossData.putObject(ModifyNameSwitchCrossEnum.callbackState, false);
			NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
			LogTool.info("setSwitchStateFromCen state:" + state + " zoneId:" + GameProperties.getFirstZoneId(), this);
		}
	}
}
