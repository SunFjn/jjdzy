package com.teamtop.houtaiHttp.events.heroInfo;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.TypeReference;
import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.callback.Callback;
import com.teamtop.houtaiHttp.HoutaiConst;
import com.teamtop.houtaiHttp.HoutaiResponseUtil;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.chat.ChatConst;
import com.teamtop.system.chat.ChatSender;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroConst;
import com.teamtop.system.hero.HeroDao;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import io.netty.channel.Channel;
import io.netty.channel.ChannelHandlerContext;

public class ForbidCrossIO {

	private static ForbidCrossIO ins;

	private ForbidCrossIO() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized ForbidCrossIO getIns() {
		if (ins == null) {
			ins = new ForbidCrossIO();
		}
		return ins;
	}

	/**
	 * 中央服通知封号禁言
	 * @param targetList
	 * @param playerType
	 * @param type
	 * @param time
	 * @param reason
	 * @param zoneid
	 * @param ctx
	 */
	public void forbidOperate(List<String> targetList, int playerType, int type, int time, String reason, int zoneid,
			ChannelHandlerContext ctx) {
		try {
			ConcurrentHashMap<Integer, Channel> zoneidToChannel = CrossCache.getZoneidToChannel();
			Channel channel = zoneidToChannel.get(zoneid);
			CrossData crossData = new CrossData();
			crossData.putObject(ForbidCrossEnum.targetList, targetList);
			crossData.putObject(ForbidCrossEnum.playerType, playerType);
			crossData.putObject(ForbidCrossEnum.type, type);
			crossData.putObject(ForbidCrossEnum.time, time);
			crossData.putObject(ForbidCrossEnum.reason, reason);
			crossData.putObject(ForbidCrossEnum.zoneid, zoneid);
			NettyWrite.writeXData(channel, CrossConst.FORBIDDEN, crossData, new Callback() {

				@Override
				public void dataReci(Channel channel, CrossData crossData) {
					List<String> failList = crossData.getObject(ForbidCrossEnum.failList, new TypeReference<List<String>>() {}.getType());
					if(failList.size()==0) {
						HoutaiResponseUtil.responseSucc(ctx);
					}else {
						String message = "部分玩家封号禁言成功";
						JSONObject data = new JSONObject();
						data.put("player", playerType);
						data.put("type", type);
						data.put("cond", failList);
						HoutaiResponseUtil.responseFail(true, HoutaiConst.SendBack_Code_5006, message, data, ctx);
					}
				}
			});
		} catch (Exception e) {
			LogTool.error(e, ForbidCrossIO.class,
					"ForbidCrossIO forbidOperate, playType=" + playerType + " ,type=" + type);
			HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_500, ctx);
		}
	}

	/** 子服接收中央服操作封号禁言 */
	public void forbidOperateHandle(Channel channel, CrossData crossData) {
		try {
			List<String> targetList = crossData.getObject(ForbidCrossEnum.targetList, new TypeReference<List<String>>() {}.getType());
			// 1角色名，2角色id，3平台账号
			int playerType = crossData.getObject(ForbidCrossEnum.playerType, Integer.class);
			// 1.封角色 2.解封角色 3.禁言角色 4.解禁言角色
			int type = crossData.getObject(ForbidCrossEnum.type, Integer.class);
			// 封号禁言时间（分钟）
			int time = crossData.getObject(ForbidCrossEnum.time, Integer.class);
			String reason = crossData.getObject(ForbidCrossEnum.reason, String.class);
			int zoneid = crossData.getObject(ForbidCrossEnum.zoneid, Integer.class);
			if (targetList.size() == 0) {
				return;
			}
			List<String> removeList = new ArrayList<>();
			int size = targetList.size();
			for (int i = 0; i < size; i++) {
				String target = targetList.get(i);
				Long hid = 0L;
				if (playerType == 1) {
					hid = HeroDao.getIns().getHidByName(target, zoneid);
				} else if (playerType == 2) {
					hid = Long.parseLong(target);
				} else if (playerType == 3) {
					hid = HeroDao.getIns().findHidByOpenid(target, zoneid);
				}
				if (hid == null) {
					continue;
				}
				Hero hero = HeroCache.getHero(hid);
				boolean online = false;
				if (HeroFunction.getIns().isOnline(hid)) {
					online = true;
				} else if (hero == null) {
					hero = HeroCache.getHero(hid, HeroConst.FIND_TYPE_BASIC);
				}
				singleHandle(hero, type, time, reason, online);
				removeList.add(target);
			}
			targetList.removeAll(removeList);
			crossData.putObject(ForbidCrossEnum.failList, targetList);
			NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
		} catch (Exception e) {
			LogTool.error(e, ForbidCrossIO.class, "ForbidCrossIO forbidOperateHandle, ");
		}
	}
	
	public void singleHandle(Hero hero, int type, int time, String reason, boolean online) throws Exception {
		int now = TimeDateUtil.getCurrentTime();
		if(1==type){//封号
			if(hero.getForbidState() != HeroConst.STATE_FORBID_NORMAL){
				return;
			}
			hero.setForbidState(HeroConst.STATE_FORBID_FENG_HAO);
			hero.setForbidTimeout(now + 60*time);
			hero.setForbidReason(reason);
			
			/*if(HeroFunction.getIns().isOnline(hid)){
				//在线则强制下线
				HeroFunction.getIns().logout(hero, BackstageConst.M_LOGINOUT_OPER_NORMAL);
				//清除离线缓存
				HeroDataSaver.removeClearCache(hero);
				HeroDao.getIns().update(hero, HeroDataSaver.CLEAR);
				if(hero.getChannel()==null){
					HeroCache.removeHero(hero.getId());
				}
			}*/
			
		}else if(2==type){//解封号
			if(hero.getForbidState() != HeroConst.STATE_FORBID_FENG_HAO && hero.getForbidState() != HeroConst.STATE_FORBID_FENG_HAO_HANDLE){
				return;
			}
			hero.setForbidState(HeroConst.STATE_FORBID_NORMAL);
		}else if(3==type){//禁言
			if(hero.getIllegalState() != ChatConst.STATE_ILLEGAL_NONE){
				return;
			}
			hero.setIllegalState(ChatConst.STATE_ILLEGAL_JIN_YAN);
			hero.setIllegalTimeout(now + 60*time);
			hero.setIllegalReason(reason);
		} else if (4 == type) {// 解禁言
			if(hero.getIllegalState() == ChatConst.STATE_ILLEGAL_NONE){
				return;
			}
			hero.setIllegalState(ChatConst.STATE_ILLEGAL_NONE);
		}
		// else if(7==type){//解封特权号
		// if(hero.getForbidState() == HeroConst.STATE_FORBID_PRIVILEGE && !online){
		// hero.setForbidState(HeroConst.STATE_FORBID_NORMAL);
		// }
		// }
		if(online){
			if(1==type || 2==type){
				hero.getChannel().close();
			}
			if(3==type || 6==type){
				ChatSender.sendCmd_454(hero.getId(), hero.getIllegalState());
			}
		}else{
			HeroDao.getIns().updateForbidInfo(hero);
		}
	}

}
