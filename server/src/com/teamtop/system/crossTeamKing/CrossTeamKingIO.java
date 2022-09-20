package com.teamtop.system.crossTeamKing;

import com.alibaba.fastjson.TypeReference;
import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.activity.ativitys.continuousConsume.ContinuousConsumeConst;
import com.teamtop.system.chat.ChatConst;
import com.teamtop.system.chat.ChatManager;
import com.teamtop.system.crossTeamKing.cross.CrossTeamKingCroCache;
import com.teamtop.system.crossTeamKing.cross.CrossTeamKingter;
import com.teamtop.system.crossTeamKing.cross.TeamKingRankSys;
import com.teamtop.system.crossTeamKing.local.CrossTeamKingLocal;
import com.teamtop.system.crossTeamKing.local.CrossTeamKingLocalCache;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;

import excel.struct.Struct_kfwzdw_770;
import io.netty.channel.Channel;

public class CrossTeamKingIO {
	
	private static CrossTeamKingIO ins = null;

	public static CrossTeamKingIO getIns() {
		if (ins == null) {
			ins = new CrossTeamKingIO();
		}
		return ins;
	}
	/**
	 * 连上中央服 中央服同步排行榜信息
	 * @param channel
	 */
	public void connEventToLocal(Channel channel) {
		try {
			CTLrank(channel);
		} catch (Exception e) {
			LogTool.error(e,  CrossTeamKingIO.class, "connEventToLocal  has wrong");
		}
		
	}
	/**
	 * 中央服同步排行榜信息
	 * @param channel
	 */
	public void CTLrank(Channel channel) {
		try {
			TeamKingRankSys teamKingRankSys = CrossTeamKingCroCache.getTeamKingRankSys();
			if (teamKingRankSys!=null) {
				CrossData crossData = new CrossData();
				crossData.putObject(CrossTreamKingType.rank, teamKingRankSys);
				NettyWrite.writeXData(channel, CrossConst.CROSS_TEAMKING_RANK, crossData);
			}
		} catch (Exception e) {
			LogTool.error(e,  CrossTeamKingIO.class, "CTLrank  has wrong");
		}
	}
	
	
	/**
	 * 子服更新排行榜
	 * @param channel
	 * @param data
	 */
	public void LRCrank(Channel channel, CrossData data) {
		int cmd = CrossConst.CROSS_TEAMKING_RANK;
		try {
			TeamKingRankSys teamKingRankSys  = data.getObject(CrossTreamKingType.rank,new TypeReference<TeamKingRankSys>() {}.getType());
			CrossTeamKingLocalCache.setTeamKingRankSys(teamKingRankSys);
			
			LogTool.info("LRCrank success ", CrossTeamKingIO.class);
		} catch (Exception e) {
			LogTool.error(e, CrossTeamKingIO.class, "LRCrank has wrong");
		}
	}
	
	/**
	 * 中央服邀请发到子服
	 */
	public void sendTeamYaoqing(Channel channel, CrossData data) {
		int cmd = CrossConst.CROSS_TEAMKING_YAOQING;
		String name = data.getObject(CrossTreamKingType.name, String.class);
		int rebornType = data.getObject(CrossTreamKingType.rebornType, Integer.class);
		int teamID = data.getObject(CrossTreamKingType.teamid, Integer.class);
		//根据 转生区间获取 
		ChatManager.getIns().broadCast(ChatConst.CROSS_TEAMKING,
				new Object[] { name,rebornType, teamID}); // 全服广播

	}
	
	/**
	 * 收到子服请求加入队伍
	 * @param channel
	 * @param crossData
	 */
	public void CRLrequestTeam(Channel channel, CrossData crossData) {
		try {
			long requestHid = crossData.getObject(CrossTreamKingType.hid,Long.class);
			Integer reborenType = crossData.getObject(CrossTreamKingType.rebornType,Integer.class);
			
			Integer requestteamid = crossData.getObject(CrossTreamKingType.teamid,Integer.class);
			
			int partid=CrossCache.getPartId(channel);
			crossData.finishGet();
			//0请求成功 1队伍不存在 2队伍己满3次数不够4段位不符合6已经在队伍中
			if (CrossTeamKingCroCache.getTeamidMapByHid().containsKey(requestHid)) {
				crossData.putObject(CrossTreamKingType.requestTeamRest, 6);
				NettyWrite.writeBlockCallback(channel, crossData, crossData.getCallbackCmd());
				return;
			}
			
			CrossTeamKingter jointeam = CrossTeamKingCroCache.getJointeam(partid, reborenType, requestteamid);
			if (jointeam==null) {
				//队伍已经解散 或者 不存在
				crossData.putObject(CrossTreamKingType.requestTeamRest, 1);
				NettyWrite.writeBlockCallback(channel, crossData, crossData.getCallbackCmd());
				return;
			}else {
				if (jointeam.getTeamerHids().contains(requestHid)) {
					//已经在队伍中了
					crossData.putObject(CrossTreamKingType.requestTeamRest, 6);
					NettyWrite.writeBlockCallback(channel, crossData, crossData.getCallbackCmd());
					return;
				}
				if (jointeam.getTeamerHids().size()>=3) {
					crossData.putObject(CrossTreamKingType.requestTeamRest, 2);
					NettyWrite.writeBlockCallback(channel, crossData, crossData.getCallbackCmd());
					return;
				}
				if (jointeam.getState()!=0) {
					crossData.putObject(CrossTreamKingType.requestTeamRest, 7);
					NettyWrite.writeBlockCallback(channel, crossData, crossData.getCallbackCmd());
					return;
				}
			}
			crossData.putObject(CrossTreamKingType.requestTeamRest, 0);
			NettyWrite.writeBlockCallback(channel, crossData, crossData.getCallbackCmd());
			LogTool.info("CRLrequestTeam partid=" + partid + ", hid=" + requestHid, CrossTeamKingIO.class);
		} catch (Exception e) {
			LogTool.error(e, CrossTeamKingIO.class, "CRLrequestTeam has wrong");
		}
	}


	public void CTLupdateTeamid(Channel channel, long id, int teamId) {
		try {
			CrossData crossData = new CrossData();
			crossData.putObject(CrossTreamKingType.hid, id);
			crossData.putObject(CrossTreamKingType.teamid, teamId);
			
			NettyWrite.writeXData(channel, CrossConst.CROSS_TEAMKING_UpDateTeamHid, crossData);
		} catch (Exception e) {
			LogTool.error(e, CrossTeamKingIO.class, "CTLupdateTeamid has wrong");
		}
		
	}
	
	
	public void CTLupdateTeamKingLocal(Channel channel, long id,CrossTeamKingLocal crossTeamKingLocal) {
		try {
			CrossData crossData = new CrossData();
			crossData.putObject(CrossTreamKingType.hid, id);
			crossData.putObject(CrossTreamKingType.localModel, crossTeamKingLocal);
			
			NettyWrite.writeXData(channel, CrossConst.CROSS_TEAMKING_UpDateLocalModel, crossData);
		} catch (Exception e) {
			LogTool.error(e, CrossTeamKingIO.class, "CTLupdateTeamKingLocal has wrong");
		}
	}
	
	public void LRCupdateTeamid(Channel channel, CrossData data) {
		int cmd = CrossConst.CROSS_TEAMKING_UpDateLocalModel;
		try {
			long hid = data.getObject(CrossTreamKingType.hid, Long.class);
			CrossTeamKingLocal crossTeamKingLocal  = data.getObject(CrossTreamKingType.localModel,new TypeReference<CrossTeamKingLocal>() {}.getType());
			if (crossTeamKingLocal!=null) {
				Hero hero=HeroCache.getHero(hid);
				if (hero!=null) {
					//只更新 积分  剩余场数 胜场数量 
					CrossTeamKingLocal crossTeamKingLocal2 = hero.getCrossTeamKingLocal();
					int oldDuanWei=crossTeamKingLocal2.getDuanwei();
					crossTeamKingLocal2.setJf(crossTeamKingLocal.getJf());
					int nowDuanWei=CrossTeamKingFunction.getIns().duanweiByJf(crossTeamKingLocal2.getReborenType(), crossTeamKingLocal2.getJf());
					if (nowDuanWei>oldDuanWei) {
						crossTeamKingLocal2.setDuanwei(nowDuanWei);
						//段位发生变化 发段位奖励
						Struct_kfwzdw_770 struct_kfwzdw_770 = CrossTeamKingLocalCache.getDuanweiRewardMap().get(crossTeamKingLocal2.getReborenType()).get(nowDuanWei);
						MailFunction.getIns().sendMailWithFujianData2(hid, MailConst.CROSSTEAMKING_DUANWEI, new Object[] { MailConst.CROSSTEAMKING_DUANWEI,nowDuanWei}, struct_kfwzdw_770.getJl());
					}
					crossTeamKingLocal2.addLeftNum(-1);
					crossTeamKingLocal2.setBattleWinNum(crossTeamKingLocal.getBattleWinNum());
					crossTeamKingLocal2.setWinAwayNum(crossTeamKingLocal.getWinAwayNum());
					//更新自己本地的跨服王者信息
					CrossTeamKingFunction.getIns().openUI(hero);
				}
				
			}
			LogTool.info("LRCupdateTeamid has success: hid "+hid+" crossTeamKingLocal:", CrossTeamKingIO.class);
		} catch (Exception e) {
			LogTool.error(e, CrossTeamKingIO.class, "LTCupdateTeamid has wrong");
		}
	}

	public void LTCupdateleftNum(Channel channel, long id, int leftNum) {
		try {
			CrossData crossData = new CrossData();
			crossData.putObject(CrossTreamKingType.hid, id);
			crossData.putObject(CrossTreamKingType.leftNum, leftNum);
			NettyWrite.writeXData(channel, CrossConst.CROSS_TEAMKING_UpdateleftNum, crossData);
		} catch (Exception e) {
			LogTool.error(e, CrossTeamKingIO.class, "CTLupdateTeamid has wrong");
		}
		
	}
	
	
	public void CRLupdateleftNum(Channel channel, CrossData data) {
		int cmd = CrossConst.CROSS_TEAMKING_UpdateleftNum;
		try {
			long hid = data.getObject(CrossTreamKingType.hid, Long.class);
			int leftNum = data.getObject(CrossTreamKingType.leftNum, Integer.class);
			if (HeroFunction.getIns().isOnline(hid)) {
				Hero hero=HeroCache.getHero(hid);
				if (hero!=null) {
					hero.getCrossTeamKingLocal().setLeftNum(leftNum);
				}
			}
			LogTool.info("CRLupdateleftNum has wrong: hid "+hid+" leftNum:"+leftNum, CrossTeamKingIO.class);
		} catch (Exception e) {
			LogTool.error(e, CrossTeamKingIO.class, "CRLupdateleftNum has wrong");
		}
	}
	
	public void LRCactState(Channel channel, CrossData data) {
		int cmd = CrossConst.CROSS_TEAMKING_STATE;
		try {
			int state = data.getObject(CrossTreamKingType.state, Integer.class);
			for (Hero hero: HeroCache.getHeroMap().values()) {
				CrossTeamKingSender.sendCmd_10820(hero.getId(), state);
				if (HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.CROSS_TEAMKING)) {
					CrossTeamKingLocal crossTeamKingLocal = hero.getCrossTeamKingLocal();
					if (crossTeamKingLocal.getLeftNum()>0&&state>0) {
						RedPointFunction.getIns().updateRedPoint(hero, SystemIdConst.CROSS_TEAMKING, ContinuousConsumeConst.RED_1, RedPointConst.HAS_RED);
					}
				}
			}
		} catch (Exception e) {
			LogTool.error(e, CrossTeamKingIO.class, "LRCactState has wrong");
		}
	}
	
	/*public void LRCupdateTeamid(Channel channel, CrossData data) {
		int cmd = CrossConst.CROSS_TEAMKING_UpDateTeamHid;
		try {
			long hid = data.getObject(CrossTreamKingType.hid, Long.class);
			int teamID = data.getObject(CrossTreamKingType.teamid, Integer.class);
			Hero hero=HeroCache.getHero(hid);
			if (hero!=null) {
				hero.getCrossTeamKingLocal().setJoinTeamId(teamID);
			}
			LogTool.info("LRCupdateTeamid has wrong: hid "+hid+" teamID:"+teamID, CrossTeamKingIO.class);
		} catch (Exception e) {
			LogTool.error(e, CrossTeamKingIO.class, "LTCupdateTeamid has wrong");
		}
	}*/

}
