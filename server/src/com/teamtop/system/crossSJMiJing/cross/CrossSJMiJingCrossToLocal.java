package com.teamtop.system.crossSJMiJing.cross;

import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.CrossEnum;
import com.teamtop.netty.server.server2.Client_2;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.crossSJMiJing.model.CrossSJMiJing;
import com.teamtop.system.hero.Hero;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;

import io.netty.channel.Channel;

public class CrossSJMiJingCrossToLocal {
	private static CrossSJMiJingCrossToLocal ins = null;

	public static CrossSJMiJingCrossToLocal getIns() {
		if (ins == null) {
			ins = new CrossSJMiJingCrossToLocal();
		}
		return ins;
	}

	/**
	 * 广播队伍信息到子服
	 */
	public void sendNewTeamDataCL(int mjID, int teamID, String name, int partId) {
		CrossData crossData = new CrossData();
		crossData.putObject(CrossEnum.name, name);
		crossData.putObject(CrossEnum.FUBEN_ID, mjID);
		crossData.putObject(CrossEnum.teamid, teamID);
		ConcurrentHashMap<Channel, List<Integer>> channelToZoneid = CrossCache.getChannelToZoneidByPartId(partId);
		Iterator<Entry<Channel, List<Integer>>> iterator = channelToZoneid.entrySet().iterator();
		while (iterator.hasNext()) {
			Entry<Channel, List<Integer>> next = iterator.next();
			Channel channel = next.getKey();
			NettyWrite.writeXData(channel, CrossConst.CROSS_S_J_MI_JING_VOICE_CL, crossData);
		}
	}

	/**
	 * 同步玩家各种数据 从中央服到子服
	 */
	public void saveBattleDataCL(Hero hero, int numHelpAwards, int mjID, int typeByID, int[][] drops,
			List<Object[]> dropTips, List<Object[]> dropChatTips) {
		long hid = hero.getId();
		int zid = CommonUtil.getZoneIdById(hid);
		Channel channel = CrossCache.getChannel(zid);
		CrossData crossData = new CrossData();
		crossData.putObject(CrossEnum.hid, hid);
		crossData.putObject(CrossEnum.data1, mjID);
		crossData.putObject(CrossEnum.data2, numHelpAwards);
		crossData.putObject(CrossEnum.data3, typeByID);
		crossData.putObject(CrossEnum.DATA4, drops);
		crossData.putObject(CrossEnum.DATA5, dropTips);
		crossData.putObject(CrossEnum.DATA6, dropChatTips);
		NettyWrite.writeXData(channel, CrossConst.CROSS_S_J_MI_JING_SAVE_DATA_CL, crossData);
	}
	
	/**
	 * 同步玩家各种数据 从子服到中央服
	 */
	public void saveBattleDataLC(Hero hero) {
		long hid = hero.getId();
		CrossSJMiJing crossSJMiJing = hero.getCrossSJMiJing();
		Map<Integer, Integer> miJingIDMap = crossSJMiJing.getMiJingIDMap();
		int numHelpAwards = crossSJMiJing.getNumHelpAwards();
		Map<Integer, Integer> saoDangMap = crossSJMiJing.getSaoDangMap();
		CrossData crossData = new CrossData();
		crossData.putObject(CrossEnum.hid, hid);
		crossData.putObject(CrossEnum.data1, miJingIDMap);
		crossData.putObject(CrossEnum.data2, numHelpAwards);
		crossData.putObject(CrossEnum.data3, saoDangMap);
		Channel channel = Client_2.getIns().getCrossChannel();
		NettyWrite.writeXData(channel, CrossConst.CROSS_S_J_MI_JING_SAVE_DATA_LC, crossData);
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
			NettyWrite.writeXData(channel, CrossConst.CROSS_S_J_MI_JING_REFLASH_BATTLE_LC, crossData);
		} catch (Exception e) {
			LogTool.error(e, CrossSJMiJingCrossToLocal.class);
		}
	}

	/**
	 * 获得红色装备广播
	 */
	public void voiceRedEquipCL(List<Object[]> list) {
		try {
			for( Object[] tempObj:list) {
				long hid = (long) tempObj[0];
				String name = (String) tempObj[1];
				int equipID = (int) tempObj[2];
				int zid = CommonUtil.getZoneIdById(hid);
				Channel channel = CrossCache.getChannel(zid);
				CrossData crossData = new CrossData();
				crossData.putObject(CrossEnum.name, name);
				crossData.putObject(CrossEnum.data1, equipID);
				NettyWrite.writeXData(channel, CrossConst.CROSS_S_J_MI_JING_VOICE_RED_EQUIP_LC, crossData);
			}
		} catch (Exception e) {
			LogTool.error(e, CrossSJMiJingCrossToLocal.class);
		}
	}
}
