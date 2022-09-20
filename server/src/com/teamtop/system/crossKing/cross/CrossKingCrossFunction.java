package com.teamtop.system.crossKing.cross;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

import com.alibaba.fastjson.JSON;
import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.crossKing.CrossKingAssist;
import com.teamtop.system.crossKing.CrossKingConst;
import com.teamtop.system.crossKing.CrossKingCrossDao;
import com.teamtop.system.crossKing.CrossKingEnum;
import com.teamtop.system.crossKing.CrossKingRankComparator;
import com.teamtop.system.crossKing.local.CrossKing;
import com.teamtop.system.crossKing.local.CrossKingCmd;
import com.teamtop.system.crossKing.model.CrossKingInfo;
import com.teamtop.system.crossKing.model.CrossKingRank;
import com.teamtop.system.hero.ShowModel;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_NPC_200;
import excel.config.Config_lsxx_232;
import excel.struct.Struct_lsxx_232;
import io.netty.channel.Channel;

/**
 * 最强王者中央服功能接口类
 * @author lobbyer
 * @date 2016年8月30日
 */
public class CrossKingCrossFunction {
	private static CrossKingCrossFunction ins;
	public static synchronized CrossKingCrossFunction getIns(){
		if(ins == null) {
			ins = new CrossKingCrossFunction();
		}
		return ins;
	}
	
	/**
	 * 连接事件
	 * @author lobbyer
	 * @param channel
	 * @date 2016年8月23日
	 */
	public void connEvent(Channel channel){
		try {
			CrossData crossData = new CrossData();
			CrossKingInfo info = CrossKingCrossCache.getCrossKingInfo();
			crossData.putObject(CrossKingEnum.info.name(), info);
			NettyWrite.writeXData(channel, CrossConst.KING_GS_SYNCINFO, crossData);
		} catch (Exception e) {
			LogTool.error(e, CrossKingCrossFunction.class, "CrossKingCrossFunction connEvent has wrong");
		}
	}
	
	/**
	 * 开始新一赛季
	 * @author lobbyer
	 * @date 2016年8月17日
	 */
	public void start() {
		try {
			CrossKingInfo info = CrossKingCrossCache.getCrossKingInfo();
			int oldTerm = info.getTerm();
			int newTerm = oldTerm + 1;
			if(newTerm >= 99) newTerm = 1;
			info.setTerm(newTerm);
			info.setStartTime(TimeDateUtil.getCurrentTime());
			CrossKingCrossCache.initTerm(true);
			info.setState(CrossKingConst.STATE_START);
			CrossKingCrossDao.getIns().deleteTerm();
			CrossKingCrossCache.saveData();
			CrossKingCrossIO.getIns().GSsyncInfo();
			CrossKingCrossIO.getIns().GSnotice(CrossKingConst.NOTICE_START);
		} catch (Exception e) {
			LogTool.error(e, CrossKingCrossFunction.class, "start has wrong");
		}
	}
	
	/**
	 * 结束当前赛季
	 * @author lobbyer
	 * @date 2016年8月17日
	 */
	public void end() {
		CrossKingInfo info = CrossKingCrossCache.getCrossKingInfo();
		info.setState(CrossKingConst.STATE_END);
		info.setEndTime(TimeDateUtil.getCurrentTime());
		//发送赛季段位奖励
		CrossKingCrossIO.getIns().sendDWAward();
		//同步信息
		CrossKingCrossIO.getIns().GSsyncInfo();
		CrossKingCrossIO.getIns().GSnotice(CrossKingConst.NOTICE_END);
		CrossKingCrossCache.saveData();
	}
	
	/**
	 * 获取面板数据 同时 更新角色数据
	 * @author lobbyer
	 * @param king
	 * @date 2016年8月17日
	 */
	public List<CrossKingRank> getInfo(int partid,int type,CrossKing king,CrossKingRank localRank) {
		CrossKingInfo info = CrossKingCrossCache.getCrossKingInfo();
		if(king.getTerm() != info.getTerm()) {
			king.termReset(partid);
			king.setTerm(info.getTerm());
		}
		CrossKingRank dwRank = CrossKingCrossCache.getDwHero(partid).get(localRank.getRid());
		if(dwRank == null) {
			dwRank = CrossKingAssist.getIns().initRank(localRank,info.getTerm());
			try {
				if(dwRank.getTerm()>0)CrossKingCrossDao.getIns().insertRank(dwRank);
			} catch (Exception e) {
				LogTool.error(e, king.getHid(), localRank.getRname(), "getInfo initRank Exception!");
			}
		}else if(type == 1 || type == 3 || dwRank.getShowRank().isEmpty() || dwRank.getShowRank().contains(dwRank.getRank())) {
			reflesh(dwRank);
		}
		king.setDuanwei(dwRank.getDuanwei());
		king.setRank(dwRank.getRank());
		king.setRebornType(dwRank.getRebornType());
		CrossKingAssist.getIns().updateRankData(dwRank, localRank);
		List<CrossKingRank> showRank = getShowRank(dwRank);
		return showRank;
	}
	
	/**
	 * 刷新面板对手数据
	 * @author lobbyer
	 * @param rank
	 * @return
	 * @date 2016年8月19日
	 */
	public List<CrossKingRank> reflesh(CrossKingRank rank) {
		List<Integer> showRank = CrossKingAssist.getIns().initShowRank(rank.getRank());
		rank.setShowRank(showRank);
		List<CrossKingRank> enemy = getShowRank(rank);
		return enemy;
	}
	
	/**
	 * 子服申请挑战对手
	 * @author lobbyer
	 * @param localRank
	 * @param type 1普通2晋级
	 * @param index 对象索引0最强王者>0第n个对手
	 * @param rid 对象id
	 * @date 2016年8月22日
	 */
	public void challenge(CrossKingRank localRank,int type,int index,long rid) {
		
	}
	
	/**
	 * 获取玩家晋级对手数据
	 * @author lobbyer
	 * @param rank
	 * @return
	 * @date 2016年8月20日
	 */
	public List<CrossKingRank> getJinjiData(int type,CrossKing king,CrossKingRank rank) {
		int partId = CrossCache.getPartId(king.getBelongZoneid());
		CrossKingRank dwHero = CrossKingCrossCache.getDwHero(partId).get(king.getHid());
		if(dwHero == null) return null;
		CrossKingAssist.getIns().updateRankData(dwHero, rank);
		int nextDw=dwHero.getDuanwei()+1;
		ConcurrentHashMap<Integer, CrossKingRank> dwLvRank = CrossKingCrossCache.getDwRebornRank(partId,dwHero.getRebornType(), nextDw);
		List<Integer> upRank = dwHero.getUpRank();
		for(Integer upId:upRank) {
			if(upId > dwLvRank.size()) {
				type = 1;
				break;
			}
		}
		if(type==1 || upRank.isEmpty()) {
			upRank = CrossKingAssist.getIns().initJinjiRank(dwLvRank.size());
			dwHero.setUpRank(upRank);
		}
		List<CrossKingRank> enemyList = new ArrayList<CrossKingRank>();
		for(Integer id:upRank) {
			CrossKingRank data = dwLvRank.get(id);
			enemyList.add(data);
		}
		return enemyList;
	}
	
	
	/**
	 * 获取对手数据
	 * @author lobbyer
	 * @date 2016年8月19日
	 */
	public List<CrossKingRank> getShowRank(CrossKingRank kingRank) {
		List<CrossKingRank> enemyList = new ArrayList<CrossKingRank>();
		List<Integer> showRank = kingRank.getShowRank();
		System.err.println(JSON.toJSONString(showRank));
		int partId = kingRank.getPartId();
		for(Integer rank:showRank) {
			ConcurrentHashMap<Integer, CrossKingRank> dwRebornRank = CrossKingCrossCache.getDwRebornRank(partId, kingRank.getRebornType(), kingRank.getDuanwei());
			CrossKingRank data = dwRebornRank.get(rank);
			if (data == null) {
				continue;
			}
			if(data.getType() == CrossKingConst.KINGTYPE_HERO) {
				data = CrossKingCrossCache.getDwHero(partId).get(data.getRid());
			}
			enemyList.add(data);
		}
		return enemyList;
	}
	
	/**
	 * 申请排行榜数据
	 * @author lobbyer
	 * @date 2016年8月22日
	 * 排行榜数据 I:当前页I:总页数[L:对象idU:对象名]排行数据
	 */
	public byte[] getRankList(int partId,int dw,int rebornType) {
		List<CrossKingRank> rankList = new ArrayList<CrossKingRank>();
		ConcurrentHashMap<Integer, CrossKingRank> dwLvRank = CrossKingCrossCache.getDwRebornRank(partId,rebornType, dw);
		rankList.addAll(dwLvRank.values());
		Collections.sort(rankList, new CrossKingRankComparator());
		Object[] rankData = new Object[rankList.size()];
		for(int i=0;i<rankList.size();i++) {
			CrossKingRank cr = rankList.get(i);
			String name = cr.getRname();
			if(name == null) name="";
			rankData[i] = new Object[]{cr.getRid(),name};
		}
		Object[] data = new Object[]{dw,rankData};
		return NettyWrite.getByteArrDataWithCMD(data,CrossKingCmd.GC_OpenRanks_1876);
	}

	/**
	 * 检查正在战斗的超时问题
	 */
	public void checkBattleMap() {
		try {
			int nowTime=TimeDateUtil.getCurrentTime();
			ArrayList<Long> moveBattle=new ArrayList<>();
			for (CrossKingBattle crossKingBattle:CrossKingCrossCache.getBattleMap().values()) {
				if (nowTime-crossKingBattle.getBattleTime()>=CrossKingConst.MAXBATTLETIM) {
					CrossKingRank myRank=crossKingBattle.getAttRank();
					CrossKingRank enemy=crossKingBattle.getEnemyRank();
					myRank.setBattle(false);
					enemy.setBattle(false);
					moveBattle.add(crossKingBattle.getAttid());
				}
			}
			for (int i = 0; i < moveBattle.size(); i++) {
				//移除战斗
				CrossKingCrossCache.moveBattle(moveBattle.get(i));
			}
		} catch (Exception e) {
			LogTool.error(e, CrossKingCrossFunction.class, "checkBattleMap has wrong");
		}
		
	}
	/**
	 * 增加1转新秀电脑人 每次1000 
	 */
	public void  gmAddNpc(int partId) {
		Struct_lsxx_232 struct = Config_lsxx_232.getIns().get(CrossKingConst.INIT_TYPE);
		int sysid = struct.getNpc();
		String npcName=struct.getNpcname();
		int moxing=struct.getMod();
		int wuqimoxing=struct.getWeapon();
		long str=Config_NPC_200.getIns().get(sysid).getPower();
		int rebornType = 1;
		ConcurrentHashMap<Integer, CrossKingRank> rankMap = CrossKingCrossCache.getDwRebornRank(partId, rebornType, CrossKingConst.INIT_TYPE);
		int count = rankMap.size();
		for(int j=1;j <= 1000;j++) {
			int npcUnid=CrossKingCrossCache.getNpcIndex();
			CrossKingRank rank = new CrossKingRank(npcUnid, CrossKingCrossCache.getCrossKingInfo().getTerm(), rebornType, CrossKingConst.INIT_TYPE, count+j, CrossKingConst.KINGTYPE_NPC,sysid, 0, partId);
			rank.setStrength(str);
			rank.setRname(npcName);
			rank.setJob(moxing);
			ShowModel showModel=new ShowModel();
			showModel.setWeaponModel(wuqimoxing);
			showModel.setBodyModel(moxing);
			rank.setModel(showModel);
			rankMap.put(count+j, rank);
			CrossKingCrossCache.setNpcIndex(npcUnid+1);
			try {
				CrossKingCrossDao.getIns().insertRank(rank);
			} catch (Exception e) {
				LogTool.error(e, CrossKingCrossFunction.class);
			}
		}
	}
	
	
}
