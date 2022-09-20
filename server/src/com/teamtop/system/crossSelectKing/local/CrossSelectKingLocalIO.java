package com.teamtop.system.crossSelectKing.local;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.alibaba.fastjson.TypeReference;
import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.netty.server.server2.Client_2;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.crossSelectKing.CrossSelectKingConst;
import com.teamtop.system.crossSelectKing.CrossSelectKingEnum;
import com.teamtop.system.crossSelectKing.cross.CrossSelectKing;
import com.teamtop.system.crossSelectKing.cross.CrossSelectKingInfo;
import com.teamtop.system.crossSelectKing.cross.CrossSelectKingNode;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroConst;
import com.teamtop.system.littleLeader.LittleLeader;
import com.teamtop.system.littleLeader.LittleLeaderModel;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.system.monsterSpirit.model.MonsterSpiritModel;
import com.teamtop.system.wujiang.WuJiangFunction;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;

import excel.config.Config_lsxxkf_232;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_lsxxkf_232;
import io.netty.channel.Channel;

public class CrossSelectKingLocalIO {
	
	private static CrossSelectKingLocalIO ins;
	public static CrossSelectKingLocalIO getIns() {
		if(ins == null) {
			ins = new CrossSelectKingLocalIO();
		}
		return ins;
	}
	
	public void LRCcrossSelectInfo(Channel channel, CrossData crossData) {
		CrossSelectKingInfo kingInfo=crossData.getObject(CrossSelectKingEnum.Info,CrossSelectKingInfo.class);
		ConcurrentHashMap<Integer,ConcurrentHashMap<Long, CrossSelectKing>> kingHeroMap=crossData.getObject(CrossSelectKingEnum.AllJoinerByBang,new TypeReference<ConcurrentHashMap<Integer,ConcurrentHashMap<Long, CrossSelectKing>>>(){}.getType());
		ConcurrentHashMap<Integer, CrossSelectKingNode[][]> battleNodeMap=crossData.getObject(CrossSelectKingEnum.BattleNode,new TypeReference<ConcurrentHashMap<Integer, CrossSelectKingNode[][]>>(){}.getType());
		CrossSelectKingLocalCache.setKingInfo(kingInfo);
		CrossSelectKingLocalCache.setKingHeroMap(kingHeroMap);
		CrossSelectKingLocalCache.setLocalBattleNodeMap(battleNodeMap);
	}
	
	public void LRCnotice(Channel channel, CrossData crossData) {
		CrossSelectKingInfo kingInfo=CrossSelectKingLocalCache.getKingInfo();
		int state= crossData.getObject(CrossSelectKingEnum.InfoSate, Integer.class);
		int proFlag= crossData.getObject(CrossSelectKingEnum.ProFlag, Integer.class);
		int proState= crossData.getObject(CrossSelectKingEnum.ProState, Integer.class);
		kingInfo.setState(state);
		kingInfo.setProFlag(proFlag);
		kingInfo.setProState(proState);
		CrossSelectKingLocalFunction.getIns().notice();
		if (state==CrossSelectKingConst.STATE_0) {
			for(Hero hero:HeroCache.getHeroMap().values()) {
				CrossSelectKingLocalFunction.getIns().rest(hero);
			}
			CrossSelectKingLocalCache.crossSelectKingLocalBuyWin.getBuyWinMap().clear();
		}
	}
	/**
	 * 战斗节点发生变化
	 * @param channel
	 * @param crossData
	 */
	public void LRCchangeNode(Channel channel, CrossData crossData) {
		CrossSelectKingInfo kingInfo=CrossSelectKingLocalCache.getKingInfo();
		int round=kingInfo.getProFlag()-1;
		List<CrossSelectKingNode> changeNodes=crossData.getObject(CrossSelectKingEnum.ChangeNode, new TypeReference<List<CrossSelectKingNode>>(){}.getType());
		int partId = CrossCache.getlocalPartId();
		Map<Integer, Long> map = kingInfo.getWinIdMap().get(partId);
		if (map == null) {
			map = new HashMap<>();
			kingInfo.getWinIdMap().put(partId, map);
		}
		if (changeNodes!=null&&changeNodes.size()>0) {
			for (CrossSelectKingNode node:changeNodes) {
				CrossSelectKingNode localNode=CrossSelectKingLocalCache.getLocalBattleNodeMap().get(node.getBang())[node.getRound()][node.getCount()];
				localNode.setId1(node.getId1());
				localNode.setId2(node.getId2());
				localNode.setWin(node.getWin());
				if (node.getWin()!=0&&round==3) {
					long fristHid=node.getId1();
					if (node.getWin()==2) {
						fristHid=node.getId2();
					}
					map.put(node.getBang(), fristHid);
				}
			}
		}
		ConcurrentHashMap<Long, CrossSelectKingBet> concurrentHashMap = CrossSelectKingLocalCache.crossSelectKingLocalBuyWin.getBuyWinMap().get(round);
	    if (concurrentHashMap!=null) {
			for (CrossSelectKingBet crossSelectKingBet:concurrentHashMap.values()) {
				int bang=crossSelectKingBet.getBang();
				int Round=crossSelectKingBet.getRound();
				int count=crossSelectKingBet.getCount();
				int win=crossSelectKingBet.getWin();
				CrossSelectKingNode localNode=CrossSelectKingLocalCache.getLocalBattleNodeMap().get(bang)[Round][count];
				int[][] cost=Config_xtcs_004.getIns().get(CrossSelectKingConst.BUYWIN_COST).getOther();
				if (win==localNode.getWin()&&crossSelectKingBet.getAward()==CrossSelectKingConst.REWARD_0) {
					int[][] winCost=CommonUtil.copyArrayAndNum(cost, 2);
					//买对了
					MailFunction.getIns().sendMailWithFujianData2(crossSelectKingBet.getHid(),  MailConst.CROSSSK_BUY_WIN,  new Object[]{MailConst.CROSSSK_BUY_WIN,Round}, winCost);
				}else {
					int[][] finalCost=CommonUtil.copyArrayAndNum(cost, 0.5d);
					//买错了
					MailFunction.getIns().sendMailWithFujianData2(crossSelectKingBet.getHid(),  MailConst.CROSSSK_BUY_FINAL,  new Object[]{MailConst.CROSSSK_BUY_FINAL,Round}, finalCost);
				}
				crossSelectKingBet.setAward(CrossSelectKingConst.REWARD_1);
			}
		}
	}
	/**
	 * 中央服通知子服上传玩家属性
	 * @param channel
	 * @param crossData
	 */
	public void LRCsynStrength(Channel channel, CrossData crossData) {
		List<CrossSelectKing>  synCrossSelectKing=new ArrayList<CrossSelectKing>();
		List<Long> hids=crossData.getObject(CrossSelectKingEnum.SynLocalStrength, new TypeReference<List<Long>>(){}.getType());
	    for (int i = 0; i < hids.size(); i++) {
			long joinerid=hids.get(i);
			Hero hero=HeroCache.getHero(joinerid, HeroConst.FIND_TYPE_ALL);
			CrossSelectKing crossSelectKing=new CrossSelectKing();
			crossSelectKing.setHid(joinerid);
			List<Struct_lsxxkf_232> sortList = Config_lsxxkf_232.getIns().getSortList();
			int bangid=0;
			for(Struct_lsxxkf_232 struct:sortList) {
				int[][] zs = struct.getZs();
				int rebornType = hero.getCrossKing().getRebornType();
				if (rebornType>=zs[0][0]&&rebornType<=zs[0][1]) {
					bangid=struct.getId();
					break;
				}
			}
			if (bangid==0) {
				LogTool.warn("bangid==0 : hid"+hero.getId()+"name: "+hero.getNameZoneid(), CrossSelectKingLocalIO.class);
				return;
			}
			crossSelectKing.setBang(bangid);
			crossSelectKing.setStrength(hero.getTotalStrength());
			crossSelectKing.setSkill(hero.getSkill());
			crossSelectKing.setModel(hero.getShowModel());
			crossSelectKing.setJob(hero.getJob());
			crossSelectKing.setFinalFightAttr(hero.getFinalFightAttr());
			int godSkillLevel = WuJiangFunction.getIns().getGodSkillLevel(hero.getJob(), hero.getWujiang());
			crossSelectKing.setGodSkillLevel(godSkillLevel);
			//兽魂
			MonsterSpiritModel monsterSpiritModel = hero.getMonsterSpiritModel();
			int fms = 0;
			if(monsterSpiritModel!=null) {
				fms = monsterSpiritModel.getFightMonsterSpiri();
			}
			crossSelectKing.setFigthMonsterSpirit(fms);
			//少主相关信息上传
			int withLeaderId=0;
			int withLeaderFid=0;
			int leaderStarId=0;
			int leaderSkillId=0;
			LittleLeader littleLeader=hero.getLittleLeader();
			if (littleLeader!=null) {
				withLeaderId=littleLeader.getWearType();
				if (withLeaderId!=0) {
					LittleLeaderModel littleLeaderModel = littleLeader.getHasLittleLeaderModels().get(withLeaderId);
					withLeaderFid=littleLeaderModel.getNowFashId();
					leaderStarId=littleLeaderModel.getStar();
					leaderSkillId=littleLeaderModel.getActivityKillLv();
				}

			}
			ArrayList<Integer> LeaderInfo=new ArrayList<>();
			LeaderInfo.add(withLeaderId);
			LeaderInfo.add(withLeaderFid);
			LeaderInfo.add(leaderStarId);
			LeaderInfo.add(leaderSkillId);
			crossSelectKing.setLittleLeaderInfo(LeaderInfo);
			
			synCrossSelectKing.add(crossSelectKing);
			LogTool.info("LRCsynStrength add hid"+joinerid, CrossSelectKing.class);
		}
	    crossData.finishGet();
		crossData.putObject(CrossSelectKingEnum.SynLocalStrength,synCrossSelectKing);
	    NettyWrite.writeXData(channel, CrossConst.CROSSSK_SG_SYNSTRENGTH, crossData);
	    LogTool.info("LRCsynStrength success", CrossSelectKing.class);
	}
	/**
	 * 子服同步所有玩家数据
	 * @param channel
	 * @param crossData
	 */
	public void LRCUpdateAlljoiner(Channel channel, CrossData crossData) {
		ConcurrentHashMap<Integer,ConcurrentHashMap<Long, CrossSelectKing>> kingHeroMap=crossData.getObject(CrossSelectKingEnum.AllJoinerByBang,new TypeReference<ConcurrentHashMap<Integer,ConcurrentHashMap<Long, CrossSelectKing>>>(){}.getType());
		CrossSelectKingLocalCache.setKingHeroMap(kingHeroMap);
	}
	
	/**
	 * GM操作
	 * @author lobbyer
	 * @param type 0开始 1准备阶段 2战斗阶段 3上传数据 4结束
	 * @date 2016年8月18日
	 */
	public void GM(int type) {
		CrossData crossData = new CrossData();
		crossData.putObject(CrossSelectKingEnum.gmCmd, type);
		Channel channel = Client_2.getIns().getCrossChannel();
		NettyWrite.writeXData(channel, CrossConst.CROSSSK_SG_GM, crossData);
	}

	
}
