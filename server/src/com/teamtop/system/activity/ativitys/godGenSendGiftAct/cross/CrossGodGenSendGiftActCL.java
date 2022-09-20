package com.teamtop.system.activity.ativitys.godGenSendGiftAct.cross;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.activity.ativitys.godGenSendGiftAct.cross.model.CrossLastGodGenSendGiftCache;
import com.teamtop.system.activity.ativitys.godGenSendGiftAct.model.GodGenSendGiftActRankModel;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;

import io.netty.channel.Channel;

public class CrossGodGenSendGiftActCL {
	private static CrossGodGenSendGiftActCL ins = null;

	public static CrossGodGenSendGiftActCL getIns() {
		if (ins == null) {
			ins = new CrossGodGenSendGiftActCL();
		}
		return ins;
	}

	private CrossGodGenSendGiftActCL() {
	}

	/**
	 * 子服联接中央服成功 中央服向子服发送排行
	 * 
	 * @param channel
	 */
	public void connEvent(Channel channel) {
		try {
			CrossData crossData = new CrossData();
			int partId = CrossCache.getPartId(channel);
			List<GodGenSendGiftActRankModel> rankList = CrossGodGenSendGiftActCache.getRankList(partId);
			if (rankList == null) {
				rankList = new ArrayList<>();
			}
			crossData.putObject(CrossGodGenSendGiftActEnum.rankList, rankList);
			CrossLastGodGenSendGiftCache lastCache = CrossGodGenSendGiftActCache.getLastCache();
			crossData.putObject(CrossGodGenSendGiftActEnum.lastCache, lastCache);
			LogTool.info("CrossGodGenSendGiftActCL connEvent:" + channel, this);
			NettyWrite.writeXData(channel, CrossConst.CROSS_GODGENSENDGIFT_CONN_CL, crossData);
		} catch (Exception e) {
			LogTool.error(e, this, "CrossGodGenSendGiftActCL connEvent Exception!");
		}
	}

	/**
	 * 中央服向各个子服同步玩家数据
	 * 
	 * @param channel
	 * @param crossConsumeRankModel
	 */
	public void addUpdateRankToLocal(GodGenSendGiftActRankModel model, int type) {
		int zoneId = CommonUtil.getZoneIdById(model.getHid());
		int partId = CrossCache.getPartId(zoneId);
		ConcurrentHashMap<Channel, List<Integer>> channelToZoneid = CrossCache.getChannelToZoneidByPartId(partId);
		CrossData crossData = new CrossData();
		crossData.putObject(CrossGodGenSendGiftActEnum.addUpdateRankModel, model);
		crossData.putObject(CrossGodGenSendGiftActEnum.type, type);
		for (Channel channel1 : channelToZoneid.keySet()) {
			NettyWrite.writeXData(channel1, CrossConst.CROSS_GODGENSENDGIFT_ADDUPDATERANK_CL, crossData);
		}
	}

	/**
	 * 中央服向各个子服发送上期排名奖励列表
	 */
	public void sendLastRankList() {
		ConcurrentHashMap<Integer, ConcurrentHashMap<Channel, List<Integer>>> pchToZoneMap = CrossCache.getPchToZoneMap();
		Iterator<Integer> iterator = pchToZoneMap.keySet().iterator();
		ConcurrentHashMap<Channel, List<Integer>> chToZone = null;
		for(;iterator.hasNext();) {
			int partId = iterator.next();
			chToZone = pchToZoneMap.get(partId);
			CrossData crossData = new CrossData();
			CrossLastGodGenSendGiftCache lastCache = CrossGodGenSendGiftActCache.getLastCache();
			crossData.putObject(CrossGodGenSendGiftActEnum.lastCache, lastCache);
			for (Channel channel1 : chToZone.keySet()) {
				NettyWrite.writeXData(channel1, CrossConst.CROSS_GODGENSENDGIFT_SENDLASTRANKLIST_CL, crossData);
			}
		}
	}
	
	/**
	 * 中央服向各个子服发送排名列表,防止各个子服数据不同步问题
	 */
	public void sendRankList(int partId) {
		ConcurrentHashMap<Integer, ConcurrentHashMap<Channel, List<Integer>>> pchToZoneMap = CrossCache.getPchToZoneMap();
		ConcurrentHashMap<Channel, List<Integer>> channelToZoneid = null;
		channelToZoneid = pchToZoneMap.get(partId);
		CrossData crossData = new CrossData();
		List<GodGenSendGiftActRankModel> rankList = CrossGodGenSendGiftActCache.getRankList(partId);
		if(rankList==null) {
			rankList = new ArrayList<>();
			CrossGodGenSendGiftActCache.setRankList(partId, rankList);
		}
		crossData.putObject(CrossGodGenSendGiftActEnum.rankList, rankList);
		for (Channel channel1 : channelToZoneid.keySet()) {
			NettyWrite.writeXData(channel1, CrossConst.CROSS_GODGENSENDGIFT_SENDRANKLIST_CL, crossData);
		}
	}

	/**
	 * 中央服向玩家所在子服同步新一期玩家数据
	 * 
	 * @param channel
	 * @param crossConsumeRankModel
	 */
	public void addNewQsDataToLocal(GodGenSendGiftActRankModel model, int partId) {
		CrossData crossData = new CrossData();
		if (model == null) {
			int crossQs = CrossGodGenSendGiftActCache.getQs(partId);
			crossData.putObject(CrossGodGenSendGiftActEnum.qs, crossQs);
			ConcurrentHashMap<Channel, List<Integer>> channelToZoneid = CrossCache.getPchToZoneMap().get(partId);
			for (Channel channel : channelToZoneid.keySet()) {
				NettyWrite.writeXData(channel, CrossConst.CROSS_GODGENSENDGIFT_SYNC_NEWQSDATA_CL, crossData);
			}
		} else {
			int zoneId = CommonUtil.getZoneIdById(model.getHid());
			Channel channel = CrossCache.getZoneidToChannel().get(zoneId);
			crossData.putObject(CrossGodGenSendGiftActEnum.addUpdateRankModel, model);
			NettyWrite.writeXData(channel, CrossConst.CROSS_GODGENSENDGIFT_SYNC_NEWQSDATA_CL, crossData);
		}
	}

}
