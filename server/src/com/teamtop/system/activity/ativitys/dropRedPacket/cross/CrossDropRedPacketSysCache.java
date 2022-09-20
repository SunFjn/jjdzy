package com.teamtop.system.activity.ativitys.dropRedPacket.cross;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.TreeMap;
import java.util.concurrent.atomic.AtomicLong;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.teamtop.cross.CrossCache;
import com.teamtop.main.RunServerException;
import com.teamtop.system.activity.ActivitySysCache;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.dropRedPacket.DropRedPacketConst;
import com.teamtop.system.activity.ativitys.dropRedPacket.DropRedPacketFunction;
import com.teamtop.system.activity.ativitys.dropRedPacket.cross.model.CrossDropRedPacket;
import com.teamtop.system.activity.ativitys.dropRedPacket.cross.model.CrossDropRedPacketCache;
import com.teamtop.system.activity.ativitys.dropRedPacket.model.DropRedPacketModel;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.global.GlobalCache;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalData;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_xtcs_004;
import excel.struct.Struct_huodong_009;
import io.netty.channel.Channel;

public class CrossDropRedPacketSysCache extends AbsServerEvent {
	/**
	 * 天降红包活动结束时间配置key:index value:startTime开始时间,endTime结束时间
	 **/
	private static Map<Integer, Integer[]> qsStartEndTimeMap = new HashMap<>();

	private static CrossDropRedPacketCache cache;

	/**
	 * 系统红包配置key:id value:当日时间戳
	 **/
	private static TreeMap<Integer, Integer> sysConfigMap = new TreeMap<>();

	public static Map<Integer, Integer[]> getQsStartEndTimeMap() {
		return qsStartEndTimeMap;
	}

	public static TreeMap<Integer, Integer> getSysConfigMap() {
		return sysConfigMap;
	}

	public static void setSysConfigMap(TreeMap<Integer, Integer> sysConfigMap) {
		CrossDropRedPacketSysCache.sysConfigMap = sysConfigMap;
	}

	public static void setCache(CrossDropRedPacketCache cache) {
		CrossDropRedPacketSysCache.cache = cache;
	}

	public static int getSysRedPacketId() {
		int sysRedPacketId = cache.getSysRedPacketId();
		return sysRedPacketId;
	}

	public static void setSysRedPacketId(int sysRedPacketId) {
		cache.setSysRedPacketId(sysRedPacketId);
	}

	public static int getSysRedPacketTime() {
		int sysRedPacketTime = cache.getSysRedPacketTime();
		return sysRedPacketTime;
	}

	public static void setSysRedPacketTime(int sysRedPacketTime) {
		cache.setSysRedPacketTime(sysRedPacketTime);
	}

	public static CrossDropRedPacket getCache(Channel channel) {
		int partId = CrossCache.getPartId(channel);
		Map<Integer, CrossDropRedPacket> cacheMap = cache.getCacheMap();
		CrossDropRedPacket cache = cacheMap.get(partId);
		if (cache == null) {
			synchronized (cacheMap) {
				cache = cacheMap.get(partId);
				if (cache == null) {
					cache = new CrossDropRedPacket();
					cacheMap.put(partId, cache);
				}
			}
		}
		return cache;
	}
	
	public static CrossDropRedPacket getCache(int partId) {
		Map<Integer, CrossDropRedPacket> cacheMap = cache.getCacheMap();
		CrossDropRedPacket cache = cacheMap.get(partId);
		if (cache == null) {
			synchronized (cacheMap) {
				cache = cacheMap.get(partId);
				if (cache == null) {
					cache = new CrossDropRedPacket();
					cacheMap.put(partId, cache);
				}
			}
		}
		return cache;
	}

	public static int getQs(Channel channel) {
		CrossDropRedPacket rankCache = getCache(channel);
		return rankCache.getQs();
	}

	public static void setQs(Channel channel, int qs) {
		CrossDropRedPacket rankCache = getCache(channel);
		rankCache.setQs(qs);
	}

	public static int getEndTime(Channel channel) {
		CrossDropRedPacket rankCache = getCache(channel);
		return rankCache.getEndTime();
	}
	
	public static int getEndTime(int partId) {
		CrossDropRedPacket rankCache = getCache(partId);
		return rankCache.getEndTime();
	}

	public static void setEndTime(Channel channel, int endTime) {
		CrossDropRedPacket rankCache = getCache(channel);
		rankCache.setEndTime(endTime);
	}

	public static LinkedHashMap<Long, DropRedPacketModel> getRedpacketMap(Channel channel) {
		CrossDropRedPacket cache = getCache(channel);
		return cache.getRedpacketMap();
	}
	
	public static LinkedHashMap<Long, DropRedPacketModel> getRedpacketMap(int partId) {
		CrossDropRedPacket cache = getCache(partId);
		return cache.getRedpacketMap();
	}

	public static void setRedpacketMap(Channel channel, LinkedHashMap<Long, DropRedPacketModel> redpacketMap) {
		CrossDropRedPacket cache = getCache(channel);
		cache.setRedpacketMap(redpacketMap);
	}

	public static LinkedHashMap<Long, DropRedPacketModel> getRedpacketNotTimesMap(Channel channel) {
		CrossDropRedPacket cache = getCache(channel);
		return cache.getRedpacketNotTimesMap();
	}

	public static void addRedpacketNotTimesMap(Channel channel, DropRedPacketModel model) {
		CrossDropRedPacket cache = getCache(channel);
		LinkedHashMap<Long, DropRedPacketModel> redpacketNotTimesMap = cache.getRedpacketNotTimesMap();
		int maxNum = Config_xtcs_004.getIns().get(DropRedPacketConst.MAXNUM).getNum();
		CrossDropRedPacketIO.getIns().addCacheBeforeMore(maxNum, redpacketNotTimesMap.size(),
				redpacketNotTimesMap.values().iterator(), model);
		redpacketNotTimesMap.put(model.getId(), model);
	}

	public static void setRedpacketNotTimesMap(Channel channel,
			LinkedHashMap<Long, DropRedPacketModel> redpacketNotTimesMap) {
		CrossDropRedPacket cache = getCache(channel);
		cache.setRedpacketNotTimesMap(redpacketNotTimesMap);
	}

	public static int getServerOpenTime(Channel channel) {
		CrossDropRedPacket rankCache = getCache(channel);
		return rankCache.getServerOpenTime();
	}

	public static void setServerOpenTime(Channel channel, int serverOpenTime) {
		CrossDropRedPacket rankCache = getCache(channel);
		rankCache.setServerOpenTime(serverOpenTime);
	}

	public static long getAddId(Channel channel) {
		CrossDropRedPacket rankCache = getCache(channel);
		AtomicLong id = rankCache.getId();
		return id.incrementAndGet();
	}
	
	public static long getAddId(int partId) {
		CrossDropRedPacket rankCache = getCache(partId);
		AtomicLong id = rankCache.getId();
		return id.incrementAndGet();
	}

	public static void clearId(Channel channel) {
		CrossDropRedPacket rankCache = getCache(channel);
		AtomicLong id = rankCache.getId();
		id.getAndSet(0);
	}

	@Override
	public void startServer() throws RunServerException {
		// TODO Auto-generated method stub
		String content = "";
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.CROSS_DROPREDPACKET_NEWACT_CEN);
			content = globalData.getContent();
			if (content == null || content.equals("") || content.equals("{}") || content.equals("null")) {
				cache = new CrossDropRedPacketCache();
			} else {
				cache = JSONObject.parseObject(content, CrossDropRedPacketCache.class);
			}
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, "CrossDropRedPacketSysCache startServer content:" + content);
		}
	}

	@Override
	public void shutdownServer() {
		// TODO Auto-generated method stub
		String content = "";
		try {
			GlobalData globalDataRankData = GlobalCache.getGlobalData(GlobalConst.CROSS_DROPREDPACKET_NEWACT_CEN);
			shutdownServerHandler();
			content = JSON.toJSONString(cache);
			globalDataRankData.setContent(content);
			GlobalCache.doSync(globalDataRankData);
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, "CrossDropRedPacketSysCache shutdownServer content:" + content);
		}
	}

	public void shutdownServerHandler() {
		int maxNum = Config_xtcs_004.getIns().get(DropRedPacketConst.MAXNUM).getNum();
		Map<Integer, CrossDropRedPacket> cacheMap = cache.getCacheMap();
		for (CrossDropRedPacket crossDropRedPacket : cacheMap.values()) {
			// 只保存50个红包
			LinkedHashMap<Long, DropRedPacketModel> redpacketMap = crossDropRedPacket.getRedpacketMap();
			LinkedHashMap<Long, DropRedPacketModel> newRedpacketMap = new LinkedHashMap<>();
			int i = 0;
			for (Entry<Long, DropRedPacketModel> entry : redpacketMap.entrySet()) {
				if (i >= maxNum) {
					break;
				}
				newRedpacketMap.put(entry.getKey(), entry.getValue());
				i++;
			}
			crossDropRedPacket.setRedpacketMap(newRedpacketMap);
		}
	}

	@Override
	public void initExcel() throws RunServerException {
		// TODO Auto-generated method stub
		qsStartEndTimeMap.clear();
		sysConfigMap.clear();
		List<Struct_huodong_009> sortList1 = ActivitySysCache.getSortList();
		for (Struct_huodong_009 struct_huodong_009 : sortList1) {
			if (struct_huodong_009.getId() == ActivitySysId.DROPREDPACKET_NEWACT) {
				int qs = struct_huodong_009.getQs();
				int startTime = 0;
				int endTime = 0;
				try {
					startTime = TimeDateUtil.getTimeIntByStrTime(struct_huodong_009.getHstart(), "yyyy-MM-dd hh:mm:ss");
					endTime = TimeDateUtil.getTimeIntByStrTime(struct_huodong_009.getHend(), "yyyy-MM-dd hh:mm:ss");
				} catch (Exception e) {
					// TODO Auto-generated catch block
					LogTool.error(e, this, "initExcel indexConfigMap init error");
				}
				if (startTime == 0 || endTime == 0) {
					continue;
				}
				qsStartEndTimeMap.put(qs, new Integer[] { startTime, endTime });
			}
		}
		DropRedPacketFunction.getIns().initSysConfigMap();
		CrossDropRedPacketEvent.getIns().sysRedPacketIdHandler();

	}

}
