package com.teamtop.system.crossKing;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.cross.CrossCache;
import com.teamtop.system.crossKing.cross.CrossKingCrossCache;
import com.teamtop.system.crossKing.local.CrossKing;
import com.teamtop.system.crossKing.model.CrossKingRank;
import com.teamtop.util.ProbabilityEvent.RandomUtil;
import com.teamtop.util.common.GenerateUtil;
import com.teamtop.util.log.LogTool;

import excel.config.Config_lsxxkf_232;
import excel.config.Config_lsxxrank_232;
import excel.struct.Struct_lsxxkf_232;
import excel.struct.Struct_lsxxrank_232;


/**
 * 最强王者辅助类
 * @author lobbyer
 * @date 2016年8月17日
 */
public class CrossKingAssist {
	private Object JOIN_KING_LOCK = new Object();
	private static CrossKingAssist ins;
	public static synchronized CrossKingAssist getIns(){
		if(ins == null) {
			ins = new CrossKingAssist();
		}
		return ins;
	}
	
	/**
	 * 初始化排名信息
	 * @author lobbyer
	 * @param localRank
	 * @return
	 * @date 2016年8月18日
	 */
	public CrossKingRank initRank(CrossKingRank localRank,int term) {
		synchronized (JOIN_KING_LOCK) {
			CrossKingRank rank = new CrossKingRank();
			int rebornType = localRank.getRebornType();
			int belongZoneid = localRank.getBelongZoneid();
			int partId = CrossCache.getPartId(belongZoneid);
			LogTool.info("CrossKingAssist partId="+partId+", rebornType="+rebornType, this);
			ConcurrentHashMap<Integer, CrossKingRank> rankMap = CrossKingCrossCache.getDwRebornRank(partId,rebornType, CrossKingConst.INIT_TYPE);
			if(rankMap == null) return rank;
			int count = rankMap.size();
			LogTool.info("CrossKingAssist partId=" + partId + ", rebornType1=" + rebornType, this);
			if(count >= 9999999) return rank;
			rank.setTerm(term);
			rank.setDuanwei(CrossKingConst.INIT_TYPE);
			rank.setRebornType(rebornType);
			rank.setBelongZoneid(localRank.getBelongZoneid());
			rank.setPartId(partId);
			rank.setRid(localRank.getRid());
			rank.setRank(count + 1);
			updateRankData(rank, localRank);
			List<Integer> showRank = initShowRank(rank.getRank());
			rank.setShowRank(showRank);
			rankMap.put(rank.getRank(), rank);
			CrossKingCrossCache.addDWHero(rank);
			LogTool.info("CrossKingAssist partId=" + partId + ", rebornType2=" + rebornType, this);
			rank.setGodSkillLevel(localRank.getGodSkillLevel());
			return rank;
		}
	}
	
	/**
	 * 初始化显示排行数据
	 * @param rank
	 * @date 2016年8月18日
	 */
	public List<Integer> initShowRank(int rank) {
		List<Integer> rankList = new ArrayList<Integer>();
		for (Struct_lsxxrank_232 showRank:Config_lsxxrank_232.getIns().getSortList()) {
			if (rank<=showRank.getRank()[0][1]&&rank>=showRank.getRank()[0][0]) {
				for (int i = 0; i < showRank.getRange().length; i++) {
					int num=RandomUtil.getRandomNumInAreas(rank+showRank.getRange()[i][0], rank+showRank.getRange()[i][1]);
					rankList.add(num);
				}
			}
		}
		Collections.sort(rankList);
		return rankList;
	}
	
	/**
	 * 初始化晋级对手
	 * @author lobbyer
	 * @param size
	 * @return
	 * @date 2016年8月22日
	 */
	public List<Integer> initJinjiRank(int size) {
		//	  第一个从下一段位的前20%排名玩家中抽取
		//  第二个从下一段位的20%-50%排名玩家中抽取
		//  第三个从下一段位的50%排名之后的玩家中抽取
		//50-60 65-80 85-100
		int can1=(int) (0.5*size);
		int can2=(int) (0.6*size);
		int can3=(int) (0.65*size);
		int can4=(int) (0.8*size);
		int can5=(int) (0.85*size);
		int num1=RandomUtil.getRandomNumInAreas(can1, can2);
		int num2=RandomUtil.getRandomNumInAreas(can3, can4);
		int num3=RandomUtil.getRandomNumInAreas(can5, size);
		List<Integer> rankList = new ArrayList<Integer>();
		rankList.add(num1);
		rankList.add(num2);
		rankList.add(num3);
		Collections.sort(rankList);
		return rankList;
	}
	
	/**
	 * 获取随机排行
	 * @author lobbyer
	 * @param rankList
	 * @param lastCount
	 * @param startRank
	 * @param endRank
	 * @param dwLvRank
	 * @return
	 * @date 2016年8月18日
	 */
	public int getRandomShow(List<Integer> rankList,int lastCount,int startRank,int endRank,ConcurrentHashMap<Integer, CrossKingRank> dwLvRank) {
		int needCount = lastCount;
		if(startRank <= dwLvRank.size() && startRank >=1){
			if(endRank > dwLvRank.size()){
				endRank = dwLvRank.size();
			}
			if(endRank < 2){
				endRank = 2;
			}
			int tempCount = endRank - startRank + 1;
			int[] temp = GenerateUtil.generateDifNums(tempCount, startRank, endRank);
			for(int n : temp){
				if(rankList.contains(n)) continue;
				rankList.add(n);
				needCount --;
				if(needCount == 0) break;
			}
		}
		return needCount;
	}
	
	/**
	 * 获取角色转生房间
	 * @author lobbyer
	 * @param rebornlevel
	 * @return
	 * @date 2016年8月17日
	 */
	public int getRebornLvType(int reborn) {
		int type = 0;
		List<Struct_lsxxkf_232> sortList = Config_lsxxkf_232.getIns().getSortList();
		for(Struct_lsxxkf_232 dj:sortList) {
			int[][] qj = dj.getZs();
			if(reborn >= qj[0][0] && reborn <= qj[0][1]) return dj.getId();
		}
		return type;
	}
	/**
	 * 更新角色排行数据
	 * @author lobbyer
	 * @param oldRank
	 * @param newRank
	 * @date 2016年8月22日
	 */
	public void updateRankData(CrossKingRank oldRank, CrossKingRank newRank) {
		oldRank.setRname(newRank.getRname());
		oldRank.setStrength(newRank.getStrength());
		oldRank.setJob(newRank.getJob());
		oldRank.setFinalFightAttr(newRank.getFinalFightAttr());
		oldRank.setSkill(newRank.getSkill());
		oldRank.setModel(newRank.getModel());
		oldRank.setZoneid(newRank.getZoneid());
		oldRank.setBelongZoneid(newRank.getBelongZoneid());
		oldRank.setPartId(newRank.getPartId());
		oldRank.setFigthMonsterSpirit(newRank.getFigthMonsterSpirit());
		oldRank.setLittleLeaderInfo(newRank.getLittleLeaderInfo());
		oldRank.setGodSkillLevel(newRank.getGodSkillLevel());
		oldRank.setBaowu(newRank.getBaowu());
		oldRank.setTianshu(newRank.getTianshu());
	}
	
	/**
	 * 中央服同步数据下来进行更新
	 * @author lobbyer
	 * @param oldKing
	 * @param oldKing
	 * @date 2016年8月23日
	 */
	public void updateKingData(CrossKing oldKing, CrossKing newKing) {
		oldKing.setDuanwei(newKing.getDuanwei());
		oldKing.setRank(newKing.getRank());
	}
}
