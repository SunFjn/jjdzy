package com.teamtop.system.crossTeamKing;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map.Entry;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.CrossFunction;
import com.teamtop.cross.CrossZone;
import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.netty.server.server2.Client_2;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.battleNew.BattleNewManager;
import com.teamtop.system.battleNew.BattleNewSysCache;
import com.teamtop.system.battleNew.model.BattleNewInfo;
import com.teamtop.system.crossTeamKing.cross.CrossTeamKingBattleHis;
import com.teamtop.system.crossTeamKing.cross.CrossTeamKingCroCache;
import com.teamtop.system.crossTeamKing.cross.CrossTeamKingter;
import com.teamtop.system.crossTeamKing.cross.CrossTeamKingterBattleInfo;
import com.teamtop.system.crossTeamKing.cross.TeamKingRanker;
import com.teamtop.system.crossTeamKing.local.CrossTeamKingLocal;
import com.teamtop.system.crossTeamKing.local.CrossTeamKingLocalCache;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.vip.VipAddType;
import com.teamtop.system.vip.VipFunction;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_kfwzcs_770;
import excel.config.Config_kfwztz_770;
import excel.struct.Struct_kfwzcs_770;
import excel.struct.Struct_kfwzmb_770;
import excel.struct.Struct_kfwztz_770;
import io.netty.channel.Channel;

public class CrossTeamKingManager {
	
	private static CrossTeamKingManager ins = null;

	public static CrossTeamKingManager getIns() {
		if (ins == null) {
			ins = new CrossTeamKingManager();
		}
		return ins;
	}

	public void openUi(Hero hero) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.CROSS_TEAMKING)) {
				return;
			}
			CrossTeamKingFunction.getIns().openUI(hero);
		} catch (Exception e) {
			LogTool.exception(e, hero.getId(), "openUi has wrong");
		}
		
	}
	/**
	 * 创建队伍
	 * @param hero
	 */
	public void createteam(Hero hero) {
		try {
			LogTool.info("createteam ", CrossTeamKingManager.class);
			if (!CrossZone.isCrossServer()) {
				LogTool.info("createteam local", CrossTeamKingManager.class);
				// 请连跨服
				return;
			}
			LogTool.info("createteam cross", CrossTeamKingManager.class);
			
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.CROSS_TEAMKING)) {
				return;
			}
			
			
			if (!CrossTeamKingFunction.getIns().getActSate()) {
				CrossTeamKingSender.sendCmd_10824(hero.getId(), 2,0);
				return;
			}
			CrossTeamKingLocal crossTeamKingLocal = hero.getCrossTeamKingLocal();
			if (crossTeamKingLocal==null) {
				LogTool.warn("crossTeamKingLocal==null "+hero.getId(), CrossTeamKingManager.class);
				return;
			}
			if (crossTeamKingLocal.getLeftNum()<=0) {
				CrossTeamKingSender.sendCmd_10824(hero.getId(), 3,0);
				return;
			}
			if(CrossTeamKingCroCache.getTeamidMapByHid().containsKey(hero.getId())) {
				//
				CrossTeamKingSender.sendCmd_10824(hero.getId(), 1,0);
				return;
			}
			CrossTeamKingFunction.getIns().Createteam(hero);
		} catch (Exception e) {
			LogTool.exception(e, hero.getId(), "openUi has wrong");
		}
		
	}
	/**
	 * 跨服邀请玩家加入队伍广播
	 * @param hero
	 */
	public void invitation(Hero hero) {
		try {
			if (!CrossZone.isCrossServer()) {
				return;
			}
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.CROSS_TEAMKING)) {
				return;
			}
			if (!CrossTeamKingFunction.getIns().getActSate()) {
				return;
			}
			CrossTeamKingter crossTeamKingter = CrossTeamKingCroCache.getTeamidMapByHid().get(hero.getId());
			if (crossTeamKingter!=null) {
				long captainhid = crossTeamKingter.getCaptainhid();
				if (captainhid!=hero.getId()) {
					//不是队长 不能发邀请
					CrossTeamKingSender.sendCmd_10826(hero.getId(), 3);
					return;
				}else if (crossTeamKingter.getTeamerHids().size()>=3) {
					CrossTeamKingSender.sendCmd_10826(hero.getId(), 5);
					return;
				}
			}else {
				CrossTeamKingSender.sendCmd_10826(hero.getId(), 2);
				return;
			}
			//广播对应区服的 对应转生区间
			int partId = CrossCache.getPartId(hero.getBelongZoneid());
			
			CrossData crossData = new CrossData();
			crossData.putObject(CrossTreamKingType.name, hero.getNameZoneid());
			crossData.putObject(CrossTreamKingType.rebornType, crossTeamKingter.getRebornType());
			crossData.putObject(CrossTreamKingType.teamid, crossTeamKingter.getTeamid());
			
			ConcurrentHashMap<Channel, List<Integer>> channelToZoneid = CrossCache.getChannelToZoneidByPartId(partId);
			Iterator<Entry<Channel, List<Integer>>> iterator = channelToZoneid.entrySet().iterator();
			while (iterator.hasNext()) {
				Entry<Channel, List<Integer>> next = iterator.next();
				Channel c = next.getKey();
				NettyWrite.writeXData(c, CrossConst.CROSS_TEAMKING_YAOQING, crossData);
			}
			
			CrossTeamKingSender.sendCmd_10826(hero.getId(), 0);
			
		} catch (Exception e) {
			LogTool.exception(e, hero.getId(), "invitation has wrong");
		}
		
	}
	/**
	 * 
	 * @param hero
	 * @param teamid
	 */
	public void joinTeam(Hero hero, int teamid) {
		try {
			//本服操作
			if (!CrossZone.isCrossServer()) {
				// 请连跨服
				return;
			}
			
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.CROSS_TEAMKING)) {
				return;
			}
			if (!CrossTeamKingFunction.getIns().getActSate()) {
				return;
			}
			CrossTeamKingLocal crossTeamKingLocal = hero.getCrossTeamKingLocal();
			
			if (crossTeamKingLocal.getLeftNum()<=0) {
				CrossTeamKingSender.sendCmd_10830(hero.getId(), 3);
				return;
			}
			CrossTeamKingFunction.getIns().JoinTeam(hero,teamid);
		} catch (Exception e) {
			LogTool.exception(e, hero.getId(), "invitation has wrong");
		}
		
	}
	/**
	 * 交互位置 跨服
	 * @param hero
	 * @param index1
	 * @param index2
	 */
	public void exchange(Hero hero, int index1, int index2) {
		try {
			if (!CrossZone.isCrossServer()) {
				return;
			}
			
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.CROSS_TEAMKING)) {
				return;
			}
			if (!CrossTeamKingFunction.getIns().getActSate()) {
				return;
			}
			CrossTeamKingter crossTeamKingter = CrossTeamKingCroCache.getTeamidMapByHid().get(hero.getId());
			if (crossTeamKingter==null) {
				LogTool.warn("crossTeamKingter==null hero:"+hero.getId(), CrossTeamKingManager.class);
				return;
			}
			
			if (crossTeamKingter.getState()==CrossTeamKingConst.TEAM_STATE_1) {
				CrossTeamKingSender.sendCmd_10830(hero.getId(), 7);
				return;
			}
			if (crossTeamKingter.getState()==CrossTeamKingConst.TEAM_STATE_2) {
				CrossTeamKingSender.sendCmd_10830(hero.getId(), 8);
				return;
			}
			
			long captainhid = crossTeamKingter.getCaptainhid();
			if (captainhid!=hero.getId()) {
				LogTool.warn("captainhid!=hero.getId() hero:"+hero.getId(), CrossTeamKingManager.class);
				return;
			}
			Long long1 = crossTeamKingter.getTeamerHids().get(index1);
			Long long2 = crossTeamKingter.getTeamerHids().get(index2);
			
			if (long1==null||long2==null) {
				LogTool.warn("long1==null||long2==null hero:"+hero.getId(), CrossTeamKingManager.class);
				return;
			}
			crossTeamKingter.getTeamerHids().set(index1, long2);
			crossTeamKingter.getTeamerHids().set(index2, long1);
			for (long goalid:crossTeamKingter.getTeamerHids()) {
				CrossTeamKingSender.sendCmd_10834(goalid, index1, index2);
			}
			
		} catch (Exception e) {
			LogTool.error(e, hero.getId(), "exchange has wrong");
		}
		
	}
	/**
	 * 退出队伍
	 * @param hero
	 */
	public void exitteam(Hero hero) {
		long hid = hero.getId();
		try {
			if (!CrossZone.isCrossServer()) {
				return;
			}
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.CROSS_TEAMKING)) {
				return;
			}
			CrossTeamKingter crossTeamKingter = CrossTeamKingCroCache.getTeamidMapByHid().get(hid);
			if (crossTeamKingter==null) {
				LogTool.warn("exitteam crossTeamKingter==null hero:"+hid, CrossTeamKingManager.class);
				CrossTeamKingSender.sendCmd_10836(hid, 1);
				return;
			}
			ArrayList<Long> teamerHids = crossTeamKingter.getTeamerHids();
			if(!teamerHids.contains(hid)) {
				LogTool.warn("exitteam contains(hero.getId()) hero:"+hid, CrossTeamKingManager.class);
				CrossTeamKingSender.sendCmd_10836(hid, 1);
				return;
			}
			int size = teamerHids.size();
			if (size>=2) {
				boolean isCap=false;
				if (hid==crossTeamKingter.getCaptainhid()) {
					isCap=true;
				}
				teamerHids.remove(hid);
				size=teamerHids.size();
				//队长退出 设置新队长id
				for (int i = 0; i < size; i++) {
					Long long1 = teamerHids.get(i);
					if (isCap) {
						crossTeamKingter.setCaptainhid(long1);
						isCap=false;
					}
				}
				//退出成功
				Object[] teaminfo = CrossTeamKingFunction.getIns().makeTeamInfo(crossTeamKingter);
				for (long goalid:teamerHids) {
					CrossTeamKingSender.sendCmd_10832(goalid, 2, crossTeamKingter.getCaptainhid(), crossTeamKingter.getTeamid(), teaminfo);
				}
			}else {
				teamerHids.remove(hid);
			}
			int rebornType = crossTeamKingter.getRebornType();
			int partid = crossTeamKingter.getPartid();
			Struct_kfwztz_770 kfwztz_770=Config_kfwztz_770.getIns().get(rebornType);
			int[][] sbjl = kfwztz_770.getSbjl();
			int lose = kfwztz_770.getLose();
			CrossTeamKingLocal crossTeamKingLocal = hero.getCrossTeamKingLocal();
			
			if (crossTeamKingter.getState()==CrossTeamKingConst.TEAM_STATE_2) {
				//战斗中离线
				//失败队伍积分奖励
				crossTeamKingLocal.setJf(crossTeamKingLocal.getJf()+lose);
				
				CrossTeamKingBattleHis battleHis=new CrossTeamKingBattleHis();
				
				battleHis.setHid(hid);
				battleHis.setBattleRest(2);
				battleHis.setJfNum(lose);
				//加入个人战报
				CrossTeamKingFunction.getIns().addBattleHis(hid, battleHis);
				
				//扣次数
				crossTeamKingLocal.addLeftNum(-1);
				//清连胜纪录
				crossTeamKingLocal.setWinAwayNum(0);
				//胜利队伍奖励
				UseAddUtil.add(hero, sbjl, SourceGoodConst.CROSS_TEAMKING_FAIL, UseAddUtil.getDefaultMail(), true);
				
				//更新子服model
				Channel localChannel = CrossCache.getLocalChannel(hid);
				CrossTeamKingIO.getIns().CTLupdateTeamKingLocal(localChannel, hid, crossTeamKingLocal);
				
				CrossTeamKingFunction.getIns().addTeamKingRank(hid, hero.getNameZoneid(), partid, rebornType, crossTeamKingLocal.getJf(),hero.getTotalStrength());
				//
				List<CrossTeamKingterBattleInfo> list = CrossTeamKingCroCache.getBattleInfos().get(hid);
				if (list!=null) {
					CrossTeamKingterBattleInfo crossTeamKingterBattleInfo = list.get(list.size()-1);
					long battleUid = crossTeamKingterBattleInfo.getBattleUid();
					if (crossTeamKingter.getTeamid()==crossTeamKingterBattleInfo.getTeamAId()) {
						battleHis.setTeamMyinfo(crossTeamKingterBattleInfo.getTeamAinfo());
						battleHis.setTeamEnemyinfo(crossTeamKingterBattleInfo.getTeamBinfo());
					}else {
						battleHis.setTeamMyinfo(crossTeamKingterBattleInfo.getTeamBinfo());
						battleHis.setTeamEnemyinfo(crossTeamKingterBattleInfo.getTeamAinfo());
					}
					if (battleUid>0) {
						//pvp
						BattleNewInfo battleNewInfo = BattleNewSysCache.getBattleMap().get(battleUid);
						battleNewInfo.getSynHidSet().remove(hid);
						BattleNewManager.getIns().leave(hero);
						crossTeamKingterBattleInfo.getSynHidSet().remove(hid);
						
						List<Long> teamKingBattlersA = crossTeamKingterBattleInfo.getTeamKingBattlersA();
						List<Long> teamKingBattlersB = crossTeamKingterBattleInfo.getTeamKingBattlersB();
						
						int dieIndex=0;
						for (int i = 0; i < teamKingBattlersA.size(); i++) {
							Long long1 = teamKingBattlersA.get(i);
							if (hid==long1) {
								dieIndex=i;
							}
						}
						for (int i = 0; i < teamKingBattlersB.size(); i++) {
							Long long1 = teamKingBattlersB.get(i);
							if (hid==long1) {
								dieIndex=i;
							}
						}
						for (long id:crossTeamKingterBattleInfo.getSynHidSet()) {
							CrossTeamKingSender.sendCmd_10844(id, crossTeamKingter.getTeamid(), dieIndex);
						}
						
					}else {
						//pve
						crossTeamKingterBattleInfo.getSynHidSet().remove(hid);
						List<Long> teamKingBattlersA = crossTeamKingterBattleInfo.getTeamKingBattlersA();
						int dieIndex=0;
						for (int i = 0; i < teamKingBattlersA.size(); i++) {
							Long long1 = teamKingBattlersA.get(i);
							if (hid==long1) {
								dieIndex=i;
							}
						}
						for (long id:crossTeamKingterBattleInfo.getSynHidSet()) {
							CrossTeamKingSender.sendCmd_10844(id, crossTeamKingter.getTeamid(), dieIndex);
						}
					}
				}
				
			}
			CrossTeamKingCroCache.getTeamidMapByHid().remove(hid);
			CrossTeamKingSender.sendCmd_10836(hid, 0);
			CrossTeamKingFunction.getIns().broadCastTeamInfo();
			LogTool.warn("exitteam success:"+hid, CrossTeamKingManager.class);
		} catch (Exception e) {
			LogTool.error(e, hid, "exchange has wrong");
		}
		
	}

	public void moveMeber(Hero hero, int index) {
		try {
			if (!CrossZone.isCrossServer()) {
				return;
			}
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.CROSS_TEAMKING)) {
				return;
			}
			CrossTeamKingter crossTeamKingter = CrossTeamKingCroCache.getTeamidMapByHid().get(hero.getId());
			if (crossTeamKingter==null) {
				LogTool.warn("moveMeber crossTeamKingter==null hero:"+hero.getId(), CrossTeamKingManager.class);
				CrossTeamKingSender.sendCmd_10838(hero.getId(), 2);
				return;
			}
			if (crossTeamKingter.getState()==CrossTeamKingConst.TEAM_STATE_1) {
				CrossTeamKingSender.sendCmd_10830(hero.getId(), 7);
				return;
			}
			if (crossTeamKingter.getState()==CrossTeamKingConst.TEAM_STATE_2) {
				CrossTeamKingSender.sendCmd_10830(hero.getId(), 8);
				return;
			}
			ArrayList<Long> teamerHids = crossTeamKingter.getTeamerHids();
			if(!teamerHids.contains(hero.getId())) {
				LogTool.warn("moveMeber contains(hero.getId()) hero:"+hero.getId(), CrossTeamKingManager.class);
				CrossTeamKingSender.sendCmd_10838(hero.getId(), 2);
				return;
			}
			if (crossTeamKingter.getCaptainhid()!=hero.getId()) {
				LogTool.warn("getCaptainhid()!=hero.getId() hero:"+hero.getId(), CrossTeamKingManager.class);
				CrossTeamKingSender.sendCmd_10838(hero.getId(), 1);
				return;
			}
			Long long1 = teamerHids.get(index);
			if (long1==null) {
				LogTool.warn("long1==null hero:"+hero.getId(), CrossTeamKingManager.class);
				CrossTeamKingSender.sendCmd_10838(hero.getId(), 2);
				return;
			}
			if (long1==crossTeamKingter.getCaptainhid()) {
				LogTool.warn("long1==crossTeamKingter.getCaptainhid()"+hero.getId(), CrossTeamKingManager.class);
				CrossTeamKingSender.sendCmd_10838(hero.getId(), 2);
				return;
			}
			teamerHids.remove(index);
			CrossTeamKingCroCache.getTeamidMapByHid().remove(long1);
			Object[] teaminfo = CrossTeamKingFunction.getIns().makeTeamInfo(crossTeamKingter);
			for (long goalid:crossTeamKingter.getTeamerHids()) {
				CrossTeamKingSender.sendCmd_10832(goalid, 2, crossTeamKingter.getCaptainhid(), crossTeamKingter.getTeamid(), teaminfo);
			}
			CrossTeamKingSender.sendCmd_10838(hero.getId(), 0);
			CrossTeamKingSender.sendCmd_10838(long1, 0);
			CrossTeamKingFunction.getIns().broadCastTeamInfo();
		} catch (Exception e) {
			LogTool.error(e, hero.getId(), "moveMeber has wrong");
		}
		
	}
	/**
	 * 匹配战斗
	 * @param hero
	 */
	public void marryBattle(Hero hero) {
		try {
			if (!CrossZone.isCrossServer()) {
				return;
			}
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.CROSS_TEAMKING)) {
				return;
			}
			CrossTeamKingter crossTeamKingter = CrossTeamKingCroCache.getTeamidMapByHid().get(hero.getId());
			if (crossTeamKingter==null) {
				LogTool.warn("marryBattle crossTeamKingter==null hero:"+hero.getId(), CrossTeamKingManager.class);
				return;
			}
			if (crossTeamKingter.getCaptainhid()!=hero.getId()) {
				//不是队长
				LogTool.warn("marryBattle crossTeamKingter==null hero:"+hero.getId(), CrossTeamKingManager.class);
				return;
			}
			//0开始匹配1次数不够2时间未到3失败
			
			if (!CrossTeamKingFunction.getIns().getActSate()) {
				CrossTeamKingSender.sendCmd_10840(hero.getId(), 2);
				return;
			}
			CrossTeamKingLocal crossTeamKingLocal = hero.getCrossTeamKingLocal();
			if (crossTeamKingLocal.getLeftNum()<=0) {
				CrossTeamKingSender.sendCmd_10840(hero.getId(), 1);
				return;
			}
			 
			
			
			if (crossTeamKingter.getState()!=0) {
				CrossTeamKingSender.sendCmd_10840(hero.getId(), 3);
				LogTool.warn("marryBattle crossTeamKingter.getState()!=0 hero:"+hero.getId(), CrossTeamKingManager.class);
				return;
			}
			crossTeamKingter.setState(1);
			crossTeamKingter.setMarryBattleTime(TimeDateUtil.getCurrentTime());
			
			CrossTeamKingCroCache.getTeamInMarrys().put(crossTeamKingter.getTeamid(), crossTeamKingter);
			
			for (long goalid:crossTeamKingter.getTeamerHids()) {
				CrossTeamKingSender.sendCmd_10840(goalid, 0);
			}
			
		} catch (Exception e) {
			LogTool.error(e, hero.getId(), "marryBattle has wrong");
		}
	}
	/**
	 * 打开排行榜
	 * @param hero
	 * @param rebornIndex
	 */
	public void openRank(Hero hero, int rebornIndex) {
		try {
			if (CrossZone.isCrossServer()) {
				return;
			}
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.CROSS_TEAMKING)) {
				return;
			}
			CrossTeamKingLocal crossTeamKingLocal=hero.getCrossTeamKingLocal();
			int myrank=0;
			int myduanwei=0;
			int partId = CrossCache.getPartId(hero.getZoneid());
			ConcurrentHashMap<Integer, ConcurrentHashMap<Integer, List<TeamKingRanker>>> rankCache = CrossTeamKingLocalCache.getTeamKingRankSys().getRankCache();
			if (rankCache.containsKey(partId)) {
				List<TeamKingRanker> list = rankCache.get(partId).get(rebornIndex);
				if (list!=null) {
					Object[] rankinfo=new Object[list.size()];
					if (crossTeamKingLocal.getReborenType()==rebornIndex) {
						myduanwei=crossTeamKingLocal.getDuanwei();
					}
					for (int i = 0; i < list.size(); i++) {
						TeamKingRanker teamKingRanker = list.get(i);
						if (teamKingRanker.getHid()==hero.getId()) {
							myrank=i+1;
						}
						int duanwei=CrossTeamKingFunction.getIns().duanweiByJf(rebornIndex, teamKingRanker.getJf());
						//I:排名I:段位U:名字I:积分
						rankinfo[i]=new Object[] {i+1,duanwei,teamKingRanker.getName(),teamKingRanker.getJf()};
					}
					crossTeamKingLocal.setRank(myrank);
					CrossTeamKingSender.sendCmd_10848(hero.getId(), rebornIndex, myrank, myduanwei, rankinfo);
					return;
				}
				
			}
			CrossTeamKingSender.sendCmd_10848(hero.getId(), rebornIndex, myrank, crossTeamKingLocal.getDuanwei(), null);
			return;
		} catch (Exception e) {
			LogTool.error(e, hero.getId(), "openRank has wrong");
		}
		
	}
	/**
	 * 获取宝箱奖励
	 * @param hero
	 * @param rewardindex
	 */
	public void getReward(Hero hero, int rewardindex) {
		try {
			if (CrossZone.isCrossServer()) {
				return;
			}
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.CROSS_TEAMKING)) {
				return;
			}
			
			CrossTeamKingLocal crossTeamKingLocal = hero.getCrossTeamKingLocal();
			if (crossTeamKingLocal==null) {
				LogTool.warn("crossTeamKingLocal==null "+hero.getId(), CrossTeamKingManager.class);
				return;
			}
			ConcurrentHashMap<Integer, Struct_kfwzmb_770> concurrentHashMap = CrossTeamKingLocalCache.goalRewardMap.get(crossTeamKingLocal.getReborenType());
			Struct_kfwzmb_770 kfwzmb_770 = concurrentHashMap.get(rewardindex);
			crossTeamKingLocal.getRewards().contains(rewardindex);
			if (crossTeamKingLocal.getRewards().contains(rewardindex)) {
				return;
			}else if (crossTeamKingLocal.getBattleWinNum()>=kfwzmb_770.getCs()) {
				crossTeamKingLocal.getRewards().add(rewardindex);
				UseAddUtil.add(hero, kfwzmb_770.getJl(), SourceGoodConst.CROSS_TEAMKING_BOX, UseAddUtil.getDefaultMail(), true);
				CrossTeamKingSender.sendCmd_10850(hero.getId(), rewardindex, GameConst.REWARD_2);
				return;
			}
		} catch (Exception e) {
			LogTool.error(e, hero.getId(), "getReward has wrong");
		}
		
	}

	public void getLog(Hero hero) {
		try {
			if (!CrossZone.isCrossServer()) {
				return;
			}
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.CROSS_TEAMKING)) {
				return;
			}
			if (!CrossTeamKingFunction.getIns().getActSate()) {
				return;
			}
			List<CrossTeamKingBattleHis> list = CrossTeamKingCroCache.getBattleHisByHid().get(hero.getId());
			if (list==null) {
				return;
			}
			if (list.size()>0) {
				Object[] logInfo=new Object[list.size()];
				/*Iterator<CrossTeamKingterBattleInfo> iterator = list.iterator();
				while (iterator.hasNext()) {
					CrossTeamKingterBattleInfo next = iterator.next();
					
				}*/
				int a=0;
				for (int i = 0; i < list.size(); i++) {
					CrossTeamKingBattleHis crossTeamKingBattleHis = list.get(i);
					if (crossTeamKingBattleHis.getBattleRest()!=0) {
						logInfo[a]=CrossTeamKingFunction.getIns().changeInfoToObject(hero.getId(), crossTeamKingBattleHis);
						a++;
					}
					
				}
				logInfo=CommonUtil.removeNull(logInfo);
				CrossTeamKingSender.sendCmd_10852(hero.getId(), logInfo);
				return;
			}
			
		} catch (Exception e) {
			LogTool.error(e, hero.getId(), "getLog has wrong");
		}
		
	}
	/**
	 * 
	 * @param hero
	 */
	public void cancelMarry(Hero hero) {
		try {
			if (!CrossZone.isCrossServer()) {
				return;
			}
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.CROSS_TEAMKING)) {
				return;
			}
			CrossTeamKingter crossTeamKingter = CrossTeamKingCroCache.getTeamidMapByHid().get(hero.getId());
			if (crossTeamKingter==null) {
				return;
			}
			if (crossTeamKingter.getCaptainhid()!=hero.getId()) {
				//不是队长
				return;
			}
			//0开始匹配1次数不够2时间未到3失败
			if (!CrossTeamKingFunction.getIns().getActSate()) {
				return;
			}
			if (crossTeamKingter.getState()!=CrossTeamKingConst.TEAM_STATE_1) {
				CrossTeamKingSender.sendCmd_10856(hero.getId(), 1);
				return;
			}
			crossTeamKingter.setState(CrossTeamKingConst.TEAM_STATE_0);
			crossTeamKingter.setMarryBattleTime(0);
			CrossTeamKingCroCache.getTeamInMarrys().remove(crossTeamKingter.getTeamid());
			
			for (int i = 0; i < crossTeamKingter.getTeamerHids().size(); i++) {
				Long long1 = crossTeamKingter.getTeamerHids().get(i);
				CrossTeamKingSender.sendCmd_10856(long1, 0);
			}
		} catch (Exception e) {
			LogTool.error(e, CrossTeamKingManager.class, "cancelMarry has wrong");
		}
		
	}
	/**
	 * 结束pve战斗
	 * @param hero
	 */
	public void overPveBattle(Hero hero,int rest,int killNum) {
		try {
			if (!CrossZone.isCrossServer()) {
				return;
			}
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.CROSS_TEAMKING)) {
				return;
			}
			CrossTeamKingter crossTeamKingter = CrossTeamKingCroCache.getTeamidMapByHid().get(hero.getId());
			if (crossTeamKingter==null) {
				return;
			}
			if (crossTeamKingter.getState()!=CrossTeamKingConst.TEAM_STATE_2&&crossTeamKingter.getBattleTime()!=-1) {
				LogTool.warn("crossTeamKingter.getState()!=CrossTeamKingConst.TEAM_STATE_2&&crossTeamKingter.getBattleTime()!=-1", CrossTeamKingManager.class);
				return;
			}
			
			CrossTeamKingFunction.getIns().overPveBattle(hero,crossTeamKingter,rest,killNum);
			
		} catch (Exception e) {
			LogTool.error(e, CrossTeamKingManager.class, "overPveBattle has wrong");
		}
		
	}
	/**
	 * 
	 * @param hero
	 */
	public void joinAct(Hero hero) {
		try {
			if (CrossTeamKingFunction.getIns().getActSate()) {
				//活动开启中
				//拉入中央服
				CrossFunction.askCross(hero, SystemIdConst.CROSS_TEAMKING);
				
			}
		} catch (Exception e) {
			LogTool.error(e, CrossTeamKingManager.class, "joinAct has wrong");
		}
		
	}
	/**
	 * 买次数
	 * @param hero
	 * @param count
	 */
	public void buyCount(Hero hero, int count) {
		try {
			if (CrossZone.isCrossServer()) {
				return;
			}
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.CROSS_TEAMKING)) {
				return;
			}
			
			CrossTeamKingLocal crossTeamKingLocal = hero.getCrossTeamKingLocal();
			if (crossTeamKingLocal==null) {
				LogTool.warn("crossTeamKingLocal==null "+hero.getId(), CrossTeamKingManager.class);
				return;
			}
			
			int buyNum = crossTeamKingLocal.getBuyNum();
			int vipNum = VipFunction.getIns().getVipNum(hero, VipAddType.crossTeamKingBuyNum);
			int leftNum = crossTeamKingLocal.getLeftNum();
			if (buyNum>=vipNum) {
				CrossTeamKingSender.sendCmd_10862(hero.getId(), 1, buyNum, leftNum);
				return;
			} 
			
			int num=buyNum+count;
			if (num>vipNum) {
				CrossTeamKingSender.sendCmd_10862(hero.getId(), 1, buyNum, leftNum);
				return;
			}
			int[][] newCopyArrayAndNum = null;
			for (int i = buyNum+1; i <=num; i++) {
				Struct_kfwzcs_770 struct_kfwzcs_770 = Config_kfwzcs_770.getIns().get(i);
				int[][] xh = struct_kfwzcs_770.getXh();
				if (i==buyNum+1) {
					newCopyArrayAndNum = CommonUtil.copyDyadicArray(struct_kfwzcs_770.getXh());
				}else {
					newCopyArrayAndNum =CommonUtil.arrayPlusArraysItems(newCopyArrayAndNum,xh);
				}
				
			}
			//int[][] other = Config_xtcs_004.getIns().get(CrossTeamKingConst.BUY_COST).getOther();
		    if (newCopyArrayAndNum==null) {
		    	LogTool.warn("newCopyArrayAndNum==null "+hero.getId(), CrossTeamKingManager.class);
				return;
			}
			if (!UseAddUtil.canUse(hero, newCopyArrayAndNum)) {
				CrossTeamKingSender.sendCmd_10862(hero.getId(), 2, buyNum, leftNum);
				return;
			}
			UseAddUtil.use(hero, newCopyArrayAndNum, SourceGoodConst.CROSS_TEAMKING_BUYNUM, true);
			crossTeamKingLocal.setBuyNum(num);
			crossTeamKingLocal.addLeftNum(count);
			CrossTeamKingSender.sendCmd_10862(hero.getId(), 0, crossTeamKingLocal.getBuyNum(), crossTeamKingLocal.getLeftNum());
			
			Channel crossChannel = Client_2.getIns().getCrossChannel();
			CrossTeamKingIO.getIns().LTCupdateleftNum(crossChannel, hero.getId(),  crossTeamKingLocal.getLeftNum());
			
			return;
		} catch (Exception e) {
			LogTool.error(e, CrossTeamKingManager.class, "buyCount has wrong");
		}
		
	}
	/**
	 * 战斗退出
	 * @param hero
	 */
	public void quitBattle(Hero hero) {
		try {
			exitteam(hero);
		} catch (Exception e) {
			LogTool.error(e, CrossTeamKingManager.class, "buyCount has wrong");
		}
		
	}
	
	

	
	

}
