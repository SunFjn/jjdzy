package com.teamtop.system.crossTeamFuBen.cross;

import java.util.Iterator;
import java.util.List;
import java.util.Map.Entry;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.CrossEnum;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.crossTeamFuBen.model.CrossTeamFuBen;
import com.teamtop.system.hero.Hero;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;

import io.netty.channel.Channel;

public class CrossTeamFuBenCrossToLocal {
	private static CrossTeamFuBenCrossToLocal ins = null;

	public static CrossTeamFuBenCrossToLocal getIns() {
		if (ins == null) {
			ins = new CrossTeamFuBenCrossToLocal();
		}
		return ins;
	}

	/**
	 * 同步玩家调整次数
	 */
	public void saveBattleTimesCL(Hero hero) {
		long hid = hero.getId();
		CrossTeamFuBen crossTeamFuBen = hero.getCrossTeamFuBen();
		int timesBattled = crossTeamFuBen.getTimesBattled();
		int zid = CommonUtil.getZoneIdById(hid);
		Channel channel = CrossCache.getChannel(zid);
		CrossData crossData = new CrossData();
		crossData.putObject(CrossEnum.hid, hid);
		crossData.putObject(CrossEnum.data1, timesBattled);
		NettyWrite.writeXData(channel, CrossConst.CROSS_TEAM_FUBEN_SAVE_BATTLE_TIMES_CL, crossData);
	}

	/**
	 * 广播队伍信息到子服
	 */
	public void sendNewTeamDataCL(int fubenID, int teamID, String name, int partId) {
		CrossData crossData = new CrossData();
		crossData.putObject(CrossEnum.name, name);
		crossData.putObject(CrossEnum.FUBEN_ID, fubenID);
		crossData.putObject(CrossEnum.teamid, teamID);
		ConcurrentHashMap<Channel, List<Integer>> channelToZoneid = CrossCache.getChannelToZoneidByPartId(partId);
		Iterator<Entry<Channel, List<Integer>>> iterator = channelToZoneid.entrySet().iterator();
		while (iterator.hasNext()) {
			Entry<Channel, List<Integer>> next = iterator.next();
			Channel channel = next.getKey();
			NettyWrite.writeXData(channel, CrossConst.CROSS_TEAM_FUBEN_VOICE_CL, crossData);
		}
	}

	/**
	 * 进入副本
	 */
	public void battleCL(long hid) {
		try {
			int zid = CommonUtil.getZoneIdById(hid);
			Channel channel = CrossCache.getChannel(zid);
			CrossData crossData = new CrossData();
			crossData.putObject(CrossEnum.hid, hid);
			NettyWrite.writeXData(channel, CrossConst.CROSS_TEAM_FUBEN_REFLASH_BATTLE_LC, crossData);
		} catch (Exception e) {
			LogTool.error(e, CrossTeamFuBenCrossToLocal.class);
		}
	}
}
