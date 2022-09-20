package com.teamtop.system.crossSelectKing.cross;

import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

import com.alibaba.fastjson.TypeReference;
import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.crossKing.CrossKingEnum;
import com.teamtop.system.crossSelectKing.CrossSelectKingEnum;
import com.teamtop.util.log.LogTool;

import io.netty.channel.Channel;

public class CrossSelectKingCrossIO {
	
	private static CrossSelectKingCrossIO ins;
	public static CrossSelectKingCrossIO getIns() {
		if(ins == null) {
			ins = new CrossSelectKingCrossIO();
		}
		return ins;
	}
	
	/**
	 * 连接事件
	 * @author lobbyer
	 * @param channel
	 * @date 2016年8月23日
	 */
	public void GSconnEvent(Channel channel) {
		try {
			int partId = CrossCache.getPartId(channel);
			CrossData data = new CrossData();
			CrossSelectKingInfo info = CrossSelectKingCache.getKingInfo();
			ConcurrentHashMap<Integer,ConcurrentHashMap<Long, CrossSelectKing>> kingHeroMap=CrossSelectKingCache.getKingHeroMap(partId);
			ConcurrentHashMap<Integer, CrossSelectKingNode[][]> battleNodeMap =CrossSelectKingCache.getBattleNodeMap(partId);
			data.putObject(CrossSelectKingEnum.Info, info);
			data.putObject(CrossSelectKingEnum.AllJoinerByBang, kingHeroMap);
			data.putObject(CrossSelectKingEnum.BattleNode, battleNodeMap);
			NettyWrite.writeXData(channel, CrossConst.CROSSSK_GS_SYNCALLDATA, data);
		} catch (Exception e) {
			LogTool.error(e, this, "connEveent Exception!");
		}
	}
	
	/**
	 * 中央服通知子服状态
	 * @author lobbyer
	 * @param type
	 * @date 2016年8月17日
	 */
	public void GSnotice(int partId) {
		CrossSelectKingInfo info = CrossSelectKingCache.getKingInfo();
		CrossData crossData = new CrossData(CrossSelectKingEnum.InfoSate, info.getState());
		crossData.putObject(CrossSelectKingEnum.ProFlag, info.getProFlag());
		crossData.putObject(CrossSelectKingEnum.ProState, info.getProState());
		ConcurrentHashMap<Channel, List<Integer>> channelToZoneid = CrossCache.getChannelToZoneidByPartId(partId);
		if (channelToZoneid == null) {
			return;
		}
		for (Channel channel : channelToZoneid.keySet()) {
			NettyWrite.writeXData(channel, CrossConst.CROSSSK_GS_NOTICE, crossData);
		}
	}
	
	/**
	 * 活动开始发送战斗节点 参赛选手
	 * @author lobbyer
	 * @param channel
	 * @date 2016年8月23日
	 */
	public void GSstar() {
		try {
			CrossData data = new CrossData();
			CrossSelectKingInfo info = CrossSelectKingCache.getKingInfo();
			for (int partId:CrossCache.getZoneidToChannelMap().keySet()) {
				ConcurrentHashMap<Integer,ConcurrentHashMap<Long, CrossSelectKing>> kingHeroMap=CrossSelectKingCache.getKingHeroMap(partId);
				ConcurrentHashMap<Integer, CrossSelectKingNode[][]> battleNodeMap =CrossSelectKingCache.getBattleNodeMap(partId);
				data.putObject(CrossSelectKingEnum.Info, info);
				data.putObject(CrossSelectKingEnum.AllJoinerByBang, kingHeroMap);
				data.putObject(CrossSelectKingEnum.BattleNode, battleNodeMap);
				ConcurrentHashMap<Channel, List<Integer>> channelToZoneid = CrossCache.getChannelToZoneidByPartId(partId);
				for(Channel channel:channelToZoneid.keySet()) {
					NettyWrite.writeXData(channel, CrossConst.CROSSSK_GS_SYNCALLDATA, data);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, this, "connEveent Exception!");
		}
	}
	/**
	 * 活动开始发送战斗节点 参赛选手
	 * @author lobbyer
	 * @param channel
	 * @date 2016年8月23日
	 */
	public void GSchangeNode() {
		try {
			CrossData data = new CrossData();
			CrossSelectKingInfo info = CrossSelectKingCache.getKingInfo();
			for (int partId:CrossCache.getZoneidToChannelMap().keySet()) {
				ConcurrentHashMap<Integer,ConcurrentHashMap<Long, CrossSelectKing>> kingHeroMap=CrossSelectKingCache.getKingHeroMap(partId);
				ConcurrentHashMap<Integer, CrossSelectKingNode[][]> battleNodeMap =CrossSelectKingCache.getBattleNodeMap(partId);
				data.putObject(CrossSelectKingEnum.Info, info);
				data.putObject(CrossSelectKingEnum.AllJoinerByBang, kingHeroMap);
				data.putObject(CrossSelectKingEnum.BattleNode, battleNodeMap);
				ConcurrentHashMap<Channel, List<Integer>> channelToZoneid = CrossCache.getChannelToZoneidByPartId(partId);
				for(Channel channel:channelToZoneid.keySet()) {
					NettyWrite.writeXData(channel, CrossConst.CROSSSK_GS_SYNCALLDATA, data);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, this, "connEveent Exception!");
		}
	}
	/**中央服通知子服变化的战斗节点**/
	public void GSchangeNode(List<CrossSelectKingNode> updateNodeList, int partId) {
		CrossData data = new CrossData();
		data.putObject(CrossSelectKingEnum.ChangeNode, updateNodeList);
		ConcurrentHashMap<Channel, List<Integer>> channelToZoneid = CrossCache.getChannelToZoneidByPartId(partId);
		for (Channel channel : channelToZoneid.keySet()) {
			if (channel == null) {
				continue;
			}
			NettyWrite.writeXData(channel, CrossConst.CROSSSK_GS_CHANGENODE, data);
		}
		
	}
	
	/**
	 * 中央服接到子服同步上来的战力
	 * @param channel
	 * @param crossData
	 */
	public void CRLsynStrength(Channel channel, CrossData crossData) {
		int partId = CrossCache.getPartId(channel);
		List<CrossSelectKing> list=crossData.getObject(CrossSelectKingEnum.SynLocalStrength, new TypeReference<List<CrossSelectKing>>(){}.getType());
		for (int i = 0; i < list.size(); i++) {
			CrossSelectKing newSelectKing=list.get(i);
			ConcurrentHashMap<Integer, ConcurrentHashMap<Long, CrossSelectKing>> kingHeroMap = CrossSelectKingCache.getKingHeroMap(partId);
			ConcurrentHashMap<Long, CrossSelectKing> map = kingHeroMap.get(newSelectKing.getBang());
			CrossSelectKing oldSelectKing=map.get(newSelectKing.getHid());
			oldSelectKing.setStrength(newSelectKing.getStrength());
			oldSelectKing.setSkill(newSelectKing.getSkill());
			oldSelectKing.setModel(newSelectKing.getModel());
			oldSelectKing.setJob(newSelectKing.getJob());
			oldSelectKing.setFinalFightAttr(newSelectKing.getFinalFightAttr());
			oldSelectKing.setFigthMonsterSpirit(newSelectKing.getFigthMonsterSpirit());
			oldSelectKing.setLittleLeaderInfo(newSelectKing.getLittleLeaderInfo());
			oldSelectKing.setGodSkillLevel(newSelectKing.getGodSkillLevel());
			CrossSelectKingCache.addLTCNum(partId);
		}
		//if (CrossSelectKingCache.getCTLNum(partId)==CrossSelectKingCache.getLTCNum(partId)) {
			LogTool.info("CRLsynStrength success", CrossSelectKingCrossIO.class);
			//同步完毕
			CrossSelectKingCache.setCTLNum(partId,0);
			CrossSelectKingCache.setLTCNum(partId,0);
			CrossData data = new CrossData();
			ConcurrentHashMap<Integer,ConcurrentHashMap<Long, CrossSelectKing>> kingHeroMap=CrossSelectKingCache.getKingHeroMap(partId);
			data.putObject(CrossSelectKingEnum.AllJoinerByBang, kingHeroMap);
			NettyWrite.writeXData(channel, CrossConst.CROSSSK_GS_UPDATEALLJOINER, data);
		//}
		
	}
	/**
	 * 
	 * @param channel
	 * @param crossData
	 */
	public void CRLgm(Channel channel, CrossData crossData) {
		int type = crossData.getObject(CrossKingEnum.gmCmd,Integer.class);
		CrossSelectKingCrossFunction.getIns().activityOper(type);
	}
	

}
