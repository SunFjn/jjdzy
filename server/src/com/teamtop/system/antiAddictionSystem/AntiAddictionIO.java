package com.teamtop.system.antiAddictionSystem;

import java.util.Map;
import java.util.Set;

import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.houtaiHttp.events.trueNameAndAntiAddiction.TrueNameAndAntiAddictionEnum;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.antiAddictionSystem.model.AntiAddictionInfo;
import com.teamtop.system.event.backstage.events.backstage.antiaddiction.AntiAddictionDao;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import io.netty.channel.Channel;

public class AntiAddictionIO {

	private static AntiAddictionIO ins;

	private AntiAddictionIO() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized AntiAddictionIO getIns() {
		if (ins == null) {
			ins = new AntiAddictionIO();
		}
		return ins;
	}

	/**
	 * 接收到子服请求获取在线时间
	 * 
	 * @param channel
	 * @param crossData
	 */
	public void getAccountOnlineTime(Channel channel, CrossData crossData) {
		try {
			int cmd = CrossConst.ANTI_GET_ONLINE_TIME;
			// if (TrueNameAndAntiAddictionCache.ANTI_ADDICTION_SWICH == 0) {
			// return;
			// }
			String openid = crossData.getObject(TrueNameAndAntiAddictionEnum.openid.name(), String.class);
			int zoneid = crossData.getObject(TrueNameAndAntiAddictionEnum.zoneid.name(), Integer.class);
			Map<String, AntiAddictionInfo> antiMap = AntiAddictionCache.getAntiMap();
			AntiAddictionInfo antiAddictionInfo = antiMap.get(openid);
			if (antiAddictionInfo == null) {
				antiAddictionInfo = AntiAddictionDao.getIns().findInfo(openid);
				if(antiAddictionInfo==null) {					
					antiAddictionInfo = new AntiAddictionInfo();
					antiAddictionInfo.setOpenid(openid);
					antiAddictionInfo.setStartOnlineTime(TimeDateUtil.getCurrentTime());
				}
				antiMap.put(openid, antiAddictionInfo);
			}
			Set<Integer> zoneidSet = antiAddictionInfo.getZoneidSet();
			int size = zoneidSet.size();
			zoneidSet.add(zoneid);
			int startOnlineTime = antiAddictionInfo.getStartOnlineTime();
			int lastLogoutTime = antiAddictionInfo.getLastLogoutTime();
			int onlineTime = antiAddictionInfo.getOnlineTime();
			int currentTime = TimeDateUtil.getCurrentTime();
			if (startOnlineTime > lastLogoutTime) {
				int passTime = currentTime - startOnlineTime;
				onlineTime += passTime;
			}
			int leftTime = antiAddictionInfo.getLeftTime();
			if (size == 0) {
				if (lastLogoutTime == 0) {
					lastLogoutTime = currentTime;
				}
				int passTime = currentTime - lastLogoutTime;
				leftTime += passTime;
				int limit = TimeDateUtil.ONE_HOUR_INT * 5;
				if (leftTime >= limit) {
					antiAddictionInfo.setLeftTime(0);
					antiAddictionInfo.setOnlineTime(0);
				} else {
					antiAddictionInfo.setLeftTime(leftTime);
				}
				onlineTime = antiAddictionInfo.getOnlineTime();
				antiAddictionInfo.setStartOnlineTime(currentTime);
				AntiAddictionInfo info = AntiAddictionDao.getIns().findInfo(openid);
				if (info == null) {
					AntiAddictionDao.getIns().insert(antiAddictionInfo);
				}
			}
			LogTool.info("AntiAddictionIO 7777, openid="+openid+", startOnlineTime="+startOnlineTime+
					", lastLogoutTime="+lastLogoutTime+", onlineTime="+onlineTime+
					", leftTime="+leftTime+", size="+size+", currentTime="+currentTime, AntiAddictionIO.class);
			crossData.putObject(TrueNameAndAntiAddictionEnum.onlineTime.name(), onlineTime);
			NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
		} catch (Exception e) {
			LogTool.error(e, AntiAddictionIO.class, "AntiAddictionIO getAccountOnlineTime");
		}
	}
	
	/**
	 * 收到通知离线
	 * 
	 * @param channel
	 * @param crossData
	 */
	public void logout(Channel channel, CrossData crossData) {
		try {
			int cmd = CrossConst.ANTI_LOGOUT;
			String openid = crossData.getObject(TrueNameAndAntiAddictionEnum.openid, String.class);
			int zoneid = crossData.getObject(TrueNameAndAntiAddictionEnum.zoneid, Integer.class);
			Map<String, AntiAddictionInfo> antiMap = AntiAddictionCache.getAntiMap();
			AntiAddictionInfo antiAddictionInfo = antiMap.get(openid);
			if (antiAddictionInfo == null) {
				antiAddictionInfo = new AntiAddictionInfo();
				antiAddictionInfo.setOpenid(openid);
				antiMap.put(openid, antiAddictionInfo);
				AntiAddictionInfo info = AntiAddictionDao.getIns().findInfo(openid);
				if (info == null) {
					AntiAddictionDao.getIns().insert(antiAddictionInfo);
				}
			}
			Set<Integer> zoneidSet = antiAddictionInfo.getZoneidSet();
			zoneidSet.remove(zoneid);
			// 计算在线时间
			int currentTime = TimeDateUtil.getCurrentTime();
			int startOnlineTime = antiAddictionInfo.getStartOnlineTime();
			int onlineTime = antiAddictionInfo.getOnlineTime();
			int passTime = currentTime - startOnlineTime;
			antiAddictionInfo.setOnlineTime(onlineTime + passTime);
			if (zoneidSet.size() == 0) {
				// 全部离线
				// 更新最新离线时间
				antiAddictionInfo.setLastLogoutTime(currentTime);
			}
			AntiAddictionDao.getIns().update(antiAddictionInfo);
		} catch (Exception e) {
			LogTool.error(e, AntiAddictionIO.class, "AntiAddictionIO logout");
		}
	}

}
