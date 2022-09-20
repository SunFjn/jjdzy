package com.teamtop.houtaiHttp.events.recharge.iosRecharge;

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
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.HeroSender;
import com.teamtop.util.log.LogTool;

import io.netty.channel.Channel;
import io.netty.channel.ChannelHandlerContext;

public class IosRechargeCrossIO {
	private static IosRechargeCrossIO ins = null;

	public static synchronized IosRechargeCrossIO getIns() {
		if (ins == null) {
			ins = new IosRechargeCrossIO();
		}
		return ins;
	}
	
	
	public void setIosRecharge(List<Integer> zoneidList,int guankaNum, ChannelHandlerContext ctx,boolean isAll) {
		try {
			ConcurrentHashMap<Channel, List<Integer>> channelToZoneid = CrossCache.getChannelToZoneid();
			int zoneid = 0;
			if (isAll) {
				//所有服
				for (Entry<Channel, List<Integer>> entry : channelToZoneid.entrySet()) {
					List<Integer> zoneIdList = entry.getValue();
					Integer zoneId = zoneIdList.get(0);
					Channel channel = entry.getKey();
					LogTool.info("setIosRecharge zoneid all", IosRechargeCrossIO.class);
					if (zoneId!=null) {
						CrossData crossData = new CrossData();
						// 开区关卡数
						crossData.putObject(IosRechargeCrossEnum.num, guankaNum);
						crossData.putObject(IosRechargeCrossEnum.type, 1);
						//设置ios充值关卡缓存
						HouTaiHttpCache.getIosRechargeGuanNum().put(zoneId, guankaNum);
						
						NettyWrite.writeXData(channel, CrossConst.CTL_IOS_RECHARGE, crossData, new Callback() {
							@Override
							public void dataReci(Channel channel, CrossData crossData) {
								boolean flag = crossData.getObject(IosRechargeCrossEnum.callbackState, Boolean.class);
								if (flag) {
									HoutaiResponseUtil.responseSucc(ctx);
								} else {
									HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_500, ctx);
								}
							}
						});
					}
				}
			}else {
				for (int i = 0; i < zoneidList.size(); i++) {
					zoneid = zoneidList.get(i);
					LogTool.info("setIosRecharge zoneid "+zoneid, IosRechargeCrossIO.class);
					Channel channel = CrossCache.getChannel(zoneid);
					if (channel!=null) {
						CrossData crossData = new CrossData();
						// 开区关卡数
						crossData.putObject(IosRechargeCrossEnum.num, guankaNum);
						crossData.putObject(IosRechargeCrossEnum.type, 1);
						
						//设置ios充值关卡缓存
						HouTaiHttpCache.getIosRechargeGuanNum().put(zoneid, guankaNum);
						
						NettyWrite.writeXData(channel, CrossConst.CTL_IOS_RECHARGE, crossData, new Callback() {
							@Override
							public void dataReci(Channel channel, CrossData crossData) {
								boolean flag = crossData.getObject(IosRechargeCrossEnum.callbackState, Boolean.class);
								if (flag) {
									HoutaiResponseUtil.responseSucc(ctx);
								} else {
									HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_500, ctx);
								}
							}
						});
					}else {
						LogTool.info("setIosRecharge channel==null", IosRechargeCrossIO.class);
					}
				}
			}
			HouTaiHttpCache.updateIosRechargeNum();
			HoutaiResponseUtil.responseSucc(ctx);
		} catch (Exception e) {
			LogTool.error(e, IosRechargeCrossIO.class, "IosRechargeCrossIO setIosRecharge, ");
			HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_500, ctx);
		}
	}
	
	/**
	 * 子服收到 ios充值开启关卡数
	 * 
	 * @param channel
	 * @param crossData
	 */
	public void LRCiosrecharge(Channel channel, CrossData crossData) {
		int guankaNum = crossData.getObject(IosRechargeCrossEnum.num, Integer.class);
		int type=crossData.getObject(IosRechargeCrossEnum.type, Integer.class);
		LogTool.info("set ios recharge guanka num:"+guankaNum, IosRechargeHttpEvent.class);
		HeroCache.setIosChargeGuanka(guankaNum);
		HeroCache.upDate();
		try {
			if (type==1) {
				crossData.putObject(IosRechargeCrossEnum.callbackState, true);
				NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
			}
			LogTool.info("guankaNum:"+guankaNum+" type:"+type, IosRechargeCrossIO.class);
		    for (Hero hero: HeroCache.getHeroMap().values()) {
				if(HeroFunction.getIns().isOnline(hero.getId())){
					HeroSender.sendCmd_166(hero.getId(), guankaNum);
				}
			}
		} catch (Exception e) {
			crossData.putObject(IosRechargeCrossEnum.callbackState, false);
			NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
			LogTool.error(e, IosRechargeCrossIO.class, "IosRechargeCrossIO LRCiosrecharge, ");
		}
	}
	
	/**
	 * 子服链接中央服事件 (中央服向子服发送ios充值开启关卡数)
	 * @param channel
	 */
	public void connEvent(Channel channel) {
		try {
			CrossData crossData = new CrossData();
			List<Integer> list = CrossCache.getChannelToZoneid().get(channel);
			if(list!=null&&list.size()>0) {
				Integer num = HouTaiHttpCache.getIosRechargeGuanNum().get(list.get(0));
				// 开启关卡数
				if (num!=null) {
					crossData.putObject(IosRechargeCrossEnum.num, num);
					crossData.putObject(IosRechargeCrossEnum.type, 2);
					NettyWrite.writeXData(channel, CrossConst.CTL_IOS_RECHARGE, crossData,new Callback() {
						@Override
						public void dataReci(Channel channel, CrossData crossData) {
							LogTool.info("connEvent,matchServer:"+channel, this);
						}
					});
				}
			}
			
		} catch (Exception e) {
			LogTool.error(e, this, "IosRechargeCrossIO connEvent Exception!");
		}
	}
	

}
