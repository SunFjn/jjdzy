package com.teamtop.houtaiHttp.events.guanka;

import java.util.concurrent.ConcurrentHashMap;

import com.alibaba.fastjson.JSONObject;
import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.callback.Callback;
import com.teamtop.houtaiHttp.HoutaiConst;
import com.teamtop.houtaiHttp.HoutaiResponseUtil;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.event.systemEvent.SystemEventFunction;
import com.teamtop.system.guanqia.GuanqiaSender;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroDao;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.util.log.LogTool;

import io.netty.channel.Channel;
import io.netty.channel.ChannelHandlerContext;

public class GuanKaHttpIO {
	private static GuanKaHttpIO ins = null;

	public static synchronized GuanKaHttpIO getIns() {
		if (ins == null) {
			ins = new GuanKaHttpIO();
		}
		return ins;
	}
	
	public void CTLSetGuanka(String cond, int zoneid, int playerType,int guankaNum, ChannelHandlerContext ctx) {
		try {
			CrossData crossData = new CrossData();
			crossData.putObject(GuanKaHttpEnum.zoneid, zoneid);
			crossData.putObject(GuanKaHttpEnum.playerType, playerType);
			crossData.putObject(GuanKaHttpEnum.player, cond);
			crossData.putObject(GuanKaHttpEnum.num, guankaNum);
			ConcurrentHashMap<Integer, Channel> zoneidToChannel = CrossCache.getZoneidToChannel();
			Channel channel = zoneidToChannel.get(zoneid);
			if(channel!=null) {
				NettyWrite.writeXData(channel, CrossConst.SET_HERO_GUANKA, crossData, new Callback() {
					@Override
					public void dataReci(Channel channel, CrossData crossData) {
						//0是玩家不在线 1目标关卡不能小于当前关卡 2报错 3成功
						int flag  = crossData.getObject(GuanKaHttpEnum.callbackState, Integer.class);
						if (flag==3) {
							HoutaiResponseUtil.responseSucc(ctx);
						} else if (flag==0) {
							String message = "玩家不在线";
							JSONObject data = new JSONObject();
							data.put("cond", cond);
							data.put("player", playerType);
							data.put("zoneid", zoneid);
							HoutaiResponseUtil.responseFail(true, HoutaiConst.SendBack_Code_5006, message, data, ctx);
						}else if(flag==1){
							String message = "目标关卡不能小于当前关卡";
							JSONObject data = new JSONObject();
							data.put("cond", cond);
							data.put("player", playerType);
							data.put("zoneid", zoneid);
							HoutaiResponseUtil.responseFail(true, HoutaiConst.SendBack_Code_5006, message, data, ctx);
						}else if(flag==4){
							String message = "玩家不存在";
							JSONObject data = new JSONObject();
							data.put("cond", cond);
							data.put("player", playerType);
							data.put("zoneid", zoneid);
							HoutaiResponseUtil.responseFail(true, HoutaiConst.SendBack_Code_5006, message, data, ctx);
						}else {
							//2
							HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_500, ctx);
						}
					}
				});
			}else {
				String message = "获取玩家所在区失败";
				JSONObject data = new JSONObject();
				data.put("cond", cond);
				data.put("player", playerType);
				data.put("zoneid", zoneid);
				HoutaiResponseUtil.responseFail(true, HoutaiConst.SendBack_Code_5006, message, data, ctx);
			}
		} catch (Exception e) {
			LogTool.error(e, GuanKaHttpIO.class, "CTLSetGuanka fail, cond="+cond+" ,zoneid="+zoneid+", playerTyp="+playerType);
			HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_500, ctx);
		}
	}
	
	
	public void LRCSETGuanka(Channel channel, CrossData crossData) {
		int zoneid=crossData.getObject(GuanKaHttpEnum.zoneid, Integer.class);
		int playerType= crossData.getObject(GuanKaHttpEnum.playerType, Integer.class);
		int guankaNum = crossData.getObject(GuanKaHttpEnum.num, Integer.class);
		String target=crossData.getObject(GuanKaHttpEnum.player, String.class);
		try {
			int result=isSetGuanKa(zoneid, playerType, target, guankaNum);
			crossData.putObject(GuanKaHttpEnum.callbackState, result);
			NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
		} catch (Exception e) {
			crossData.putObject(GuanKaHttpEnum.callbackState, 2);
			NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
			LogTool.error(e, GuanKaHttpIO.class, "LRCSETGuanka has wrong");
		}
	}
	/**
	 * 
	 * @param zoneid
	 * @param playerType
	 * @param target
	 * @param guankaNum
	 * @return 0是玩家不在线 1目标关卡不能小于当前关卡 2报错 3成功 4玩家不存在
	 * @throws Exception
	 */
	public int isSetGuanKa(int zoneid, int playerType, String target,int guankaNum) throws Exception {
		Long hid = 0L;
		// 1角色名，2角色id，3平台账号
		if (playerType == 1) {
			hid = HeroDao.getIns().getHidByName(target, zoneid);
		}else if(playerType == 2) {
			hid = Long.parseLong(target);
		    Hero	hero = HeroDao.getIns().findBasic(hid);
		    if (hero==null) {
				return 4;
			}
		}else if(playerType == 3) {
			hid = HeroDao.getIns().findHidByOpenid(target, zoneid);
		}
		if (hid==null) {
			return 4;
		}
		if (!HeroFunction.getIns().isOnline(hid)) {
			return 0;
		}
		Hero hero = HeroCache.getHero(hid);
		if (hero==null) {
			return 0;
		}
		//通过关卡
		int curGuanqia = hero.getGuanqia().getCurGuanqia();
		if (guankaNum <= curGuanqia) {
			return 1;
		}
		for (int i = curGuanqia + 1; i <= guankaNum; i++) {
			// 触发通关事件
			hero.getGuanqia().setCurGuanqia(i);
			SystemEventFunction.triggerPassGuanqiaEvent(hero, i);
		}
		GuanqiaSender.sendCmd_1106(hero.getId(), guankaNum, null,null);
		LogTool.info("GuanKaHttpIO setguankaNum:"+guankaNum+" hid:"+hero.getId()+" name"+hero.getName(), GuanKaHttpIO.class);
		return 3;
		
	}
	
}
