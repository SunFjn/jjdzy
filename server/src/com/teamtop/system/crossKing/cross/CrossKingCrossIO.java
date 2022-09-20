package com.teamtop.system.crossKing.cross;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.gameCommon.GameProperties;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.battle.BattleFunction;
import com.teamtop.system.crossKing.CrossKingAssist;
import com.teamtop.system.crossKing.CrossKingConst;
import com.teamtop.system.crossKing.CrossKingCrossDao;
import com.teamtop.system.crossKing.CrossKingEnum;
import com.teamtop.system.crossKing.local.CrossKing;
import com.teamtop.system.crossKing.model.CrossKingAward;
import com.teamtop.system.crossKing.model.CrossKingHistory;
import com.teamtop.system.crossKing.model.CrossKingInfo;
import com.teamtop.system.crossKing.model.CrossKingRank;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_lsxx_232;
import excel.struct.Struct_lsxx_232;
import io.netty.channel.Channel;

public class CrossKingCrossIO {
	
	private static CrossKingCrossIO ins;
	
	public static synchronized CrossKingCrossIO getIns(){
		if(ins == null) {
			ins = new CrossKingCrossIO();
		}
		return ins;
	}
	/**
	 * 子服链接中央服事件 (中央服向子服获取数据)
	 * @param channel
	 */
	public void connEvent(Channel channel) {
		try {
			CrossKingInfo info = CrossKingCrossCache.getCrossKingInfo();
			CrossData crossData = new CrossData();
			crossData.putObject(CrossKingEnum.info, info);
			NettyWrite.writeXData(channel, CrossConst.KING_GS_SYNCINFO, crossData);
		} catch (Exception e) {
			LogTool.error(e, this, "CrossBossFunction connEvent Exception!");
		}
	}
	
	
	/**
	 * 状态改变时全服更新赛季数据
	 * @author lobbyer
	 * @date 2016年8月30日
	 */
	public void GSsyncInfo() {
		CrossKingInfo info = CrossKingCrossCache.getCrossKingInfo();
		for (int partId:CrossCache.getZoneidToChannelMap().keySet()) {
			ConcurrentHashMap<Channel, List<Integer>> channelToZoneid = CrossCache.getChannelToZoneidByPartId(partId);
			CrossData crossData = new CrossData();
			crossData.putObject(CrossKingEnum.info, info);
			for(Channel channel:channelToZoneid.keySet()) {
				NettyWrite.writeXData(channel, CrossConst.KING_GS_SYNCINFO, crossData);
			}
		}
	}
	
	/**
	 * 中央服通知子服状态
	 * @author lobbyer
	 * @param type
	 * @date 2016年8月17日
	 */
	public void GSnotice(int type) {
		for (int partId:CrossCache.getZoneidToChannelMap().keySet()) {
			ConcurrentHashMap<Channel, List<Integer>> channelToZoneid = CrossCache.getChannelToZoneidByPartId(partId);
			CrossData crossData = new CrossData(CrossKingEnum.notice, type);
			crossData.putObject(CrossKingEnum.info, CrossKingCrossCache.getCrossKingInfo());
			for(Channel channel:channelToZoneid.keySet()) {
				NettyWrite.writeXData(channel, CrossConst.KING_GS_NOTICE, crossData);
			}
		}
	}
	
	/**
	 * 获取数据
	 * @author lobbyer
	 * @param channel
	 * @param crossData
	 * @date 2016年8月18日
	 */
	public void CRLgetInfo(Channel channel,CrossData crossData) {
		int type =crossData.getObject(CrossKingEnum.extra, Integer.class);
		CrossKing heroData = crossData.getObject(CrossKingEnum.heroData,CrossKing.class);
		CrossKingRank rank = crossData.getObject(CrossKingEnum.rankData,CrossKingRank.class);
		int partid=CrossCache.getPartId(channel);
		crossData.finishGet();
		List<CrossKingRank> info = CrossKingCrossFunction.getIns().getInfo(partid,type, heroData, rank);
		LogTool.info("CrossKingCrossIO partid=" + partid + ", hid=" + heroData.getHid(), this);
		CrossKingRank newRank = CrossKingCrossCache.getDwHero(partid).get(heroData.getHid());
		crossData.putObject(CrossKingEnum.rankData, newRank);
		crossData.putObject(CrossKingEnum.enemyData, info);
		crossData.putObject(CrossKingEnum.heroData, heroData);
		NettyWrite.writeBlockCallback(channel, crossData, crossData.getCallbackCmd());
	}
	/**
	 * 检查挑战
	 * @author lobbyer
	 * @param channel
	 * @param crossData
	 * @date 2016年8月23日
	 */
	public void CRLcheckChallenge(Channel channel, CrossData crossData) {
		int type =crossData.getObject(CrossKingEnum.type, Integer.class);
		int index =crossData.getObject(CrossKingEnum.extra,Integer.class);
		long id =crossData.getObject(CrossKingEnum.hid,Long.class);
		int partId = CrossCache.getPartId(channel);
		CrossKingRank heroData =crossData.getObject(CrossKingEnum.heroData,CrossKingRank.class);
		crossData.finishGet();
		long hid = heroData.getRid();
		CrossKingRank dwHero = CrossKingCrossCache.getDwHero(partId).get(hid);
		if(dwHero == null) return;
		CrossKingInfo info = CrossKingCrossCache.getCrossKingInfo();
		if(info == null || info.getState() != CrossKingConst.STATE_START) {
			//1赛季未开启
			crossData.putObject(CrossKingEnum.state, 1);
			NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
			return;
		}else if(info.getState() == CrossKingConst.STATE_END) {
			//1赛季已结束
			crossData.putObject(CrossKingEnum.state, 2);
			NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
			return;
		}
		CrossKingAssist.getIns().updateRankData(dwHero, heroData);
		Struct_lsxx_232 struct = Config_lsxx_232.getIns().get(dwHero.getDuanwei());
		if(type == 2 && dwHero.getRank() > struct.getUp()) {
			//3未到可晋级排名
			crossData.putObject(CrossKingEnum.state, 3);
			NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
			return;
		}
		CrossKingRank enemy = null;
		List<Integer> showRank = dwHero.getShowRank();
		int beAttDw = dwHero.getDuanwei();
		if(type == 1 ){
			Integer rank = showRank.get(index-1);
			enemy = CrossKingCrossCache.getDwRebornRank(partId,dwHero.getRebornType(), beAttDw).get(rank);
		}else if(type == 2) {
			showRank = dwHero.getUpRank();
			Integer rank = showRank.get(index-1);
			enemy = CrossKingCrossCache.getDwRebornRank(partId,dwHero.getRebornType(), beAttDw+1).get(rank);
		}
		if(enemy == null) {
			//5对手不存在
			crossData.putObject(CrossKingEnum.state, 5);
			NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
			return;
		}
		if(enemy.getRid() != id) {
			//6对手已经改变
			int state = 6;
			if(type == 2) state = 11;
			crossData.putObject(CrossKingEnum.state, state);
			NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
			return;
		}
		
		if(enemy.isBattle()) {
			if(CrossKingCrossCache.getBattleMap().containsKey(enemy.getRid())) {
				CrossKingBattle crossKingBattle=CrossKingCrossCache.getBattleMap().get(enemy.getRid());
				int nowTime=TimeDateUtil.getCurrentTime();
				if (nowTime-crossKingBattle.getBattleTime()>=CrossKingConst.MAXBATTLETIM) {
					enemy.setBattle(false);
					//移除战斗
					CrossKingCrossCache.moveBattle(enemy.getRid());
				}else {
					//7对方正在战斗
					crossData.putObject(CrossKingEnum.state, 7);
					NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
					return;
				}
			}else {
				LogTool.warn("enemy.isBattle(): id"+enemy.getRid(), CrossKingCrossIO.class);
				return;
			}
		}
		CrossKingRank myRank = CrossKingCrossCache.getDwRebornRank(partId,dwHero.getRebornType(), beAttDw).get(dwHero.getRank());
		if(myRank.isBattle()) {
			if(CrossKingCrossCache.getBattleMap().containsKey(myRank.getRid())) {
				CrossKingBattle crossKingBattle=CrossKingCrossCache.getBattleMap().get(myRank.getRid());
				int nowTime=TimeDateUtil.getCurrentTime();
				if (nowTime-crossKingBattle.getBattleTime()>=CrossKingConst.MAXBATTLETIM) {
					myRank.setBattle(false);
					//移除战斗
					CrossKingCrossCache.moveBattle(myRank.getRid());
				}else {
					//8你正被人挑战
					crossData.putObject(CrossKingEnum.state, 8);
					NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
					return;
				}
			}else {
				LogTool.warn("myRank.isBattle(): id"+myRank.getRid(), CrossKingCrossIO.class);
				return;
			}
		}
		enemy.setBattle(true);
		myRank.setBattle(true);
		int now = TimeDateUtil.getCurrentTime();
		enemy.setBattleTime(now);
		myRank.setBattleTime(now);
		
		int battleRestint = BattleFunction.checkCrossKing(dwHero.getStrength(), enemy.getStrength());
		CrossKingBattle crossKingBattle=new CrossKingBattle(hid,type, dwHero, enemy, battleRestint,TimeDateUtil.getCurrentTime());
		CrossKingCrossCache.addBattle(hid, crossKingBattle);
		CrossKingBattle enemycrossKingBattle=new CrossKingBattle(id,type, dwHero, enemy, battleRestint,TimeDateUtil.getCurrentTime());
		CrossKingCrossCache.addBattle(id, enemycrossKingBattle);
		
		if(enemy.getType() == CrossKingConst.KINGTYPE_HERO){
			CrossKingRank targetDw = CrossKingCrossCache.getDwHero(partId).get(enemy.getRid());
			if(targetDw.getFinalFightAttr() == null){
				//到子服去找数据 
				GSloadRankData(heroData.getRid(), enemy.getRid(), enemy.getZoneid());
			}
		}
		//通知子服可挑战
		crossData.putObject(CrossKingEnum.state, 0);
		crossData.putObject(CrossKingEnum.battleRest, battleRestint);
		crossData.putObject(CrossKingEnum.enemyData, enemy);
		NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
	}
	/**
	 * 向子服申请对手数据
	 * @author lobbyer
	 * @param askId 申请者id
	 * @param hid 要上传的id
	 * @param zoneId 区号
	 * @date 2016年8月23日
	 */
	public void GSloadRankData(final long askId,final long hid,final int zoneid) {
		CrossData data = new CrossData();
		Channel channel = CrossCache.getChannel(zoneid);
		int partId = CrossCache.getPartId(channel);
		try {
			CrossData blockData = NettyWrite.writeBlockData(channel, CrossConst.KING_GS_LOADRANKDATA, hid, data);
			if(blockData != null) {
				CrossKingRank rank = blockData.getObject(CrossKingEnum.heroData, CrossKingRank.class);
				CrossKingRank oldRank = CrossKingCrossCache.getDwHero(partId).get(hid);
				CrossKingAssist.getIns().updateRankData(oldRank, rank);
			}
		} catch (Exception e) {
			LogTool.error(e,"loadRankData askId:"+askId+" hid:"+hid+" zoneid:"+zoneid+" Exception!");
		}
	}
	/**
	 * 收到子服请求战斗奖励
	 * @param channel
	 * @param crossData
	 */
	public void CRLgetBattleReward(Channel channel, CrossData crossData) {
		try {
			int battleRest =crossData.getObject(CrossKingEnum.battleRest,Integer.class);
			long hid =crossData.getObject(CrossKingEnum.hid,Long.class);
			int partId = CrossCache.getPartId(channel);
			crossData.finishGet();
			CrossKingRank dwHero = CrossKingCrossCache.getDwHero(partId).get(hid);
			if(dwHero == null) return;
			CrossKingBattle crossKingBattle = CrossKingCrossCache.getBattleByid(hid);
			if (crossKingBattle==null) {
				return;
			}
			if (crossKingBattle.getServerRest()==CrossKingConst.BATTLE_REST_2) {
				//以前段返回结果为准
				crossKingBattle.setServerRest(battleRest);
			}
			CrossKingRank myRank=crossKingBattle.getAttRank();
			CrossKingRank enemy=crossKingBattle.getEnemyRank();
			int[] attBefore = new int[]{myRank.getDuanwei(),myRank.getRank()};
			int[] targetBefore = new int[]{enemy.getDuanwei(),enemy.getRank()};
			int attChange = 0; 
			int enemyChange = 0;
			boolean win=true;
			if (crossKingBattle.getServerRest()==CrossKingConst.BATTLE_REST_0) {
				win=false;
			}
			if (win) {
				boolean change = changeRank(myRank, enemy);
				List<CrossKingRank> list = new ArrayList<CrossKingRank>();
				list.add(myRank);
				list.add(enemy);
				try {
					CrossKingCrossDao.getIns().insertOnDuplicateBatch(list, null, GameProperties.getFirstZoneId());
				} catch (Exception e) {
					LogTool.error(e, "crossKing win updateRank Exception!");
				}
				if(change) {
					attChange = getRankChange(myRank, attBefore); 
					enemyChange = getRankChange(enemy, targetBefore); 
				}
				if(crossKingBattle.getBattleType() == 2) {
					//晋级成功赛
					myRank.getUpRank().clear();
					enemy.getUpRank().clear();
				}
			}
			
			myRank.setBattle(false);
			enemy.setBattle(false);
			int isJingJi=0;
			if(crossKingBattle.getBattleType() == 2) {
				//晋级成功赛
				isJingJi=1;
			}
			CrossKingHistory attBattle = new CrossKingHistory(win?0:1, enemy.getRname(), attChange, isJingJi);
			crossData.putObject(CrossKingEnum.video, attBattle);
			crossData.putObject(CrossKingEnum.heroData, myRank);
			LogTool.info("CrossKing battle attId:"+myRank.getRid()+" name:"+myRank.getRname()+" beAtt:"+enemy.getRid()+" name:"+enemy.getRname()+" win:"+win,CrossKingCrossIO.class);
			NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
			if(enemy.getType() == CrossKingConst.KINGTYPE_HERO) {
				isJingJi=0;
				if(crossKingBattle.getBattleType() == 2) {
					//掉级
					isJingJi=2;
				}
				CrossKingHistory beAttBattle = new CrossKingHistory(win?1:0, myRank.getRname(),enemyChange, isJingJi);
				//发送战斗结果
				CrossData data = new CrossData();
				data.putObject(CrossKingEnum.heroData, enemy);
				data.putObject(CrossKingEnum.video, beAttBattle);
				Channel echannel = CrossCache.getChannel(enemy.getZoneid());
				NettyWrite.writeXData(echannel, CrossConst.KING_GS_UPDATEBEBATTLE, data);
			}
			//移除战斗
			CrossKingCrossCache.moveBattle(hid);
		} catch (Exception e) {
			LogTool.error(e,"CRLgetBattleReward has wrong");
		}
		
	}
	
	
	/**
	 * 段位排名发生改变时处理
	 * @author lobbyer
	 * @param winRank
	 * @param loseRank
	 * @return true变化false不变
	 * @date 2016年8月24日
	 */
	public boolean changeRank(CrossKingRank winRank,CrossKingRank loseRank) {
		int beforeRank = winRank.getRank();
		int afterRank = loseRank.getRank();
		int beforeDw = winRank.getDuanwei();
		int afterDw = loseRank.getDuanwei();
		if(afterDw > beforeDw || (afterDw == beforeDw && afterRank < beforeRank)) {
			winRank.setDuanwei(afterDw);
			winRank.setRank(afterRank);
			int partId = winRank.getPartId();
			CrossKingCrossCache.addDWLvRank(winRank);
			CrossKingRank winHeroRank = CrossKingCrossCache.getDwHero(partId).get(winRank.getRid());
			winHeroRank.setDuanwei(afterDw);
			winHeroRank.setRank(afterRank);
			loseRank.setDuanwei(beforeDw);
			loseRank.setRank(beforeRank);
			//当修改排名时  重新刷一次对手
			CrossKingCrossFunction.getIns().reflesh(winRank);
			CrossKingCrossCache.addDWLvRank(loseRank);
			if(loseRank.getType() == CrossKingConst.KINGTYPE_HERO) {
				CrossKingRank loseHeroRank = CrossKingCrossCache.getDwHero(partId).get(loseRank.getRid());
				loseHeroRank.setDuanwei(beforeDw);
				loseHeroRank.setRank(beforeRank);
				CrossKingCrossFunction.getIns().reflesh(loseRank);
			}
			/*if(afterDw > beforeDw && afterDw >= CrossKingConst.BROAD_DWID){
				broadJinJi(winRank.getRid(), winRank.getRname(), afterDw, winRank.getZoneid());
			}*/
			return true;
		}
		return false;
	}
	/**
	 * 获取排名变化
	 * @author lobbyer
	 * @param kingRank
	 * @param before
	 * @return  0不变1升2降
	 * @date 2016年8月24日
	 */
	public int getRankChange(CrossKingRank kingRank,int[] before) {
		if(kingRank.getDuanwei() > before[0]) return 1;
		else if(kingRank.getDuanwei() == before[0]) {
			if(kingRank.getRank() > before[1]) return 2;
			else if(kingRank.getRank() < before[1]) return 1;
			else return 0;
		}else return 2;
	}
	/**
	 * 子服获取晋级对手数据
	 * @author lobbyer
	 * @param channel
	 * @param crossData
	 * @date 2016年8月20日
	 */
	public void CRLgetJinJiData(Channel channel, CrossData crossData) {
		int type = crossData.getObject(CrossKingEnum.extra, Integer.class);
		CrossKing king =crossData.getObject(CrossKingEnum.heroData,CrossKing.class);
		CrossKingRank rank =  crossData.getObject(CrossKingEnum.rankData,CrossKingRank.class);
		List<CrossKingRank> jinjiData = CrossKingCrossFunction.getIns().getJinjiData(type, king, rank);
		crossData.putObject(CrossKingEnum.enemyData, jinjiData);
		NettyWrite.writeBlockCallback(channel, crossData, crossData.getCallbackCmd());
	}
	
	
	/**
	 * 子服向中央服获取排行榜数据
	 * @author lobbyer
	 * @param channel
	 * @param crossData
	 * @date 2016年8月22日
	 */
	public void CRLgetRankList(Channel channel, CrossData crossData) {
		int dw = crossData.getObject(CrossKingEnum.extra,Integer.class);
		long hid=crossData.getObject(CrossKingEnum.hid,Long.class);
		int partId = CrossCache.getPartId(channel);
		CrossKingRank crossKingRank=CrossKingCrossCache.getDwHero(partId).get(hid);
		if (crossKingRank==null) {
			LogTool.warn("CRLgetRankList has wrong hid:"+hid+" dw:"+dw, CrossKingCrossIO.class);
			return;
		}
		crossData.finishGet();
		byte[] rankList = CrossKingCrossFunction.getIns().getRankList(partId,dw,crossKingRank.getRebornType());
		crossData.putObject(CrossKingEnum.rankList, (byte[])rankList);
		NettyWrite.writeBlockCallback(channel, crossData, crossData.getCallbackCmd());
	}
	
	/**
	 * 赛季结束发送赛季奖励
	 * @author lobbyer
	 * @date 2016年8月23日
	 */
	public void sendDWAward() {
		try {
			for (int partId:CrossCache.getZoneidToChannelMap().keySet()) {
				Map<Integer,List<CrossKingAward>> zoneMap = new HashMap<Integer, List<CrossKingAward>>();
				for(CrossKingRank crossKingRank:CrossKingCrossCache.getDwHero(partId).values()) {
					if(crossKingRank.getType() == CrossKingConst.KINGTYPE_NPC) continue;
					int zid = crossKingRank.getZoneid();
					List<CrossKingAward> list = zoneMap.get(zid);
					if(list == null) {
						list = new ArrayList<CrossKingAward>();
						zoneMap.put(zid, list);
					}
					list.add(new CrossKingAward(crossKingRank.getDuanwei(), crossKingRank.getRebornType(), crossKingRank.getRank(), crossKingRank.getRid(), crossKingRank.getRname()));
					
				}
				
				for(Integer zoneid:zoneMap.keySet()) {
					List<CrossKingAward> list = zoneMap.get(zoneid);
					Channel channel = CrossCache.getChannel(zoneid);
					CrossData data = new CrossData();
					data.putObject(CrossKingEnum.dwMap, list);
					NettyWrite.writeXData(channel, CrossConst.KING_GS_SENDDWAWARD, data);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, "sendDWAward Exception!");
		}
	}
	
	/**
	 * 子服GM通知中央服
	 * @author lobbyer
	 * @param channel
	 * @param crossData
	 * @date 2016年8月17日
	 */
	public void CRLgm(Channel channel,CrossData crossData) {
		int type = crossData.getObject(CrossKingEnum.gmCmd,Integer.class);
		CrossKingInfo info = CrossKingCrossCache.getCrossKingInfo();
		boolean canDo = true;
		switch (type) {
		case 1:
			if(info != null && info.getState() == CrossKingConst.STATE_START){
				canDo = false;
			}else{
				CrossKingCrossFunction.getIns().start();
			}
			break;
		case 2:
			CrossKingCrossFunction.getIns().end();
			/*if(info != null && info.getState() != CrossKingConst.STATE_START){
				canDo = false;
			}else{
				CrossKingCrossFunction.getIns().end();
			}*/
			break;
		case 0:
			info = new CrossKingInfo();
			CrossKingCrossCache.setCrossKingInfo(info);
			break;
		}
		if(!canDo) {
			GSnotice(CrossKingConst.NOTICE_CANNOT);
			return;
		}
	}
	
	public void CRLgmcharge(Channel channel,CrossData crossData) {
		long localHid =  crossData.getObject(CrossKingEnum.hid,Long.class);
		int reborn=crossData.getObject(CrossKingEnum.type,Integer.class);
		int dw=crossData.getObject(CrossKingEnum.duanwei,Integer.class);
		int rank=crossData.getObject(CrossKingEnum.rank,Integer.class);
		int partId = CrossCache.getPartId(channel);
		CrossKingRank localcrossKingRank=CrossKingCrossCache.getDwHero(partId).get(localHid);
		CrossKingRank goalcrossKingRank=CrossKingCrossCache.getDwRank(partId,reborn).get(dw).get(rank);
		changeRank(localcrossKingRank, goalcrossKingRank);
		
	}
	
	/**
	 * GM增加1转新秀电脑人 每次1000 
	 * @param channel
	 * @param crossData
	 */
	public void CRLgmAddNpc(Channel channel, CrossData crossData) {
		int partId = CrossCache.getPartId(channel);
		CrossKingCrossFunction.getIns().gmAddNpc(partId);
	}

}
