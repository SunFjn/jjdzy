package com.teamtop.system.crossKing.cross;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.cross.CrossPartCache;
import com.teamtop.gameCommon.GameProperties;
import com.teamtop.main.RunServerException;
import com.teamtop.system.crossKing.CrossKingConst;
import com.teamtop.system.crossKing.CrossKingCrossDao;
import com.teamtop.system.crossKing.model.CrossKingInfo;
import com.teamtop.system.crossKing.model.CrossKingRank;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.hero.ShowModel;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_NPC_200;
import excel.config.Config_lsxx_232;
import excel.config.Config_lsxxkf_232;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_lsxx_232;
import excel.struct.Struct_lsxxkf_232;

public class CrossKingCrossCache extends AbsServerEvent{

	/**
	 * 转生房间->段位->排名->参与者
	 */
	private static ConcurrentHashMap<Integer,ConcurrentHashMap<Integer,ConcurrentHashMap<Integer, ConcurrentHashMap<Integer, CrossKingRank>>>> dwRank =new ConcurrentHashMap<Integer,ConcurrentHashMap<Integer,ConcurrentHashMap<Integer, ConcurrentHashMap<Integer, CrossKingRank>>>>();
	/**
	 * 参与者id->参与者
	 */
	private static ConcurrentHashMap<Integer,ConcurrentHashMap<Long, CrossKingRank>> dwHero=new ConcurrentHashMap<Integer,ConcurrentHashMap<Long, CrossKingRank>>();
	/**
	 * 战斗
	 */
	private static ConcurrentHashMap<Long, CrossKingBattle> battleMap=new ConcurrentHashMap<Long,CrossKingBattle>();
	/**
	 * npc唯一id
	 */
	private static int npcIndex=0;
	
	
	private static CrossKingInfo crossKingInfo;
	

	
	public static int getNpcIndex() {
		return npcIndex;
	}

	public static void setNpcIndex(int npcIndex) {
		CrossKingCrossCache.npcIndex = npcIndex;
	}

	public static Map<Long, CrossKingBattle> getBattleMap() {
		return battleMap;
	}
	
	public static void addBattle(long attid,CrossKingBattle crossKingBattle) {
		battleMap.put(attid, crossKingBattle);
	}
	
	public static void moveBattle(long attid) {
		battleMap.remove(attid);
	}
	
	public static CrossKingBattle getBattleByid(long attid) {
		return getBattleMap().get(attid);
	}
	
	public static ConcurrentHashMap<Integer, ConcurrentHashMap<Integer, ConcurrentHashMap<Integer, CrossKingRank>>> getDwRankMap(int partId) {
		if (!dwRank.containsKey(partId)) {
			dwRank.put(partId, new ConcurrentHashMap<>());
		}
		ConcurrentHashMap<Integer, ConcurrentHashMap<Integer, ConcurrentHashMap<Integer, CrossKingRank>>> map = dwRank.get(partId);
		return map;
	}
	public static void setDwRankMap(int partId,ConcurrentHashMap<Integer, ConcurrentHashMap<Integer, ConcurrentHashMap<Integer, CrossKingRank>>> dwRank) {
		CrossKingCrossCache.dwRank.put(partId, dwRank);
	}
	
	
	public static ConcurrentHashMap<Long, CrossKingRank> getDwHero(int partid) {
		if (!dwHero.containsKey(partid)) {
			dwHero.put(partid, new ConcurrentHashMap<Long, CrossKingRank>());
		}
		return dwHero.get(partid);
	}
	public static CrossKingInfo getCrossKingInfo() {
		return crossKingInfo;
	}
	public static void setCrossKingInfo(CrossKingInfo crossKingInfo) {
		CrossKingCrossCache.crossKingInfo = crossKingInfo;
	}
	
	/**
	 * 查找数据
	 * @author lobbyer
	 * @date 2016年8月25日
	 */
	public static void findData() {
		try {
			List<CrossKingRank> termRanks = CrossKingCrossDao.getIns().findTermRank();
			if(termRanks != null) {
				for(CrossKingRank rank:termRanks) {
					if(rank.getType() == CrossKingConst.KINGTYPE_HERO) {
						addDWHero(rank);
					}
					addDWLvRank(rank);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, "crossKing startServer findInfo exception!");
		}
	}
	
	/**
	 * 新一赛季开始
	 * @author lobbyer
	 * @date 2016年8月30日
	 */
	public static void initTerm(boolean initNPC) {
		Set<Integer> keySet = CrossPartCache.getPartMap().keySet();
		for (int partId : keySet) {
			getDwRankMap(partId).clear();
			getDwHero(partId).clear();
			getBattleMap().clear();
			List<Struct_lsxx_232> dwList = Config_lsxx_232.getIns().getSortList();
			List<Struct_lsxxkf_232> relvList=Config_lsxxkf_232.getIns().getSortList();
			//初始化各个房间的各个段位的各个排名
			for (int i = 0; i <relvList.size(); i++) {
				Struct_lsxxkf_232 relv=relvList.get(i);
				//段位->排名->参与者
				ConcurrentHashMap<Integer, ConcurrentHashMap<Integer, CrossKingRank>> dwMap = new ConcurrentHashMap<Integer, ConcurrentHashMap<Integer, CrossKingRank>>();
				for (int j = 0; j <dwList.size(); j++) {
					Struct_lsxx_232 dw = dwList.get(j);
					//排名->参与者
					ConcurrentHashMap<Integer, CrossKingRank> rankMap = new ConcurrentHashMap<Integer, CrossKingRank>();
					dwMap.put(dw.getDan(), rankMap);
					if(initNPC) {
						int num=dw.getRank();
						if (dw.getDan()==1) {
							num=Config_xtcs_004.getIns().get(CrossKingConst.BEGIN_NUM).getNum();
						}
						initNPCRank(partId,crossKingInfo.getTerm(), dw.getDan(), relv.getId(), rankMap, num);
					}
				}
				//转生房间->段位->排名->参与者
				getDwRankMap(partId).put(relv.getId(), dwMap);
			}
			
		}
	}
	/**
	 * 初始化前x名NPC数据
	 * @author lobbyer
	 * @param duanwei
	 * @param lv
	 * @param lvMap
	 */
	public static void initNPCRank(int partid,int term,int duanwei,int relv,ConcurrentHashMap<Integer, CrossKingRank> lvMap, int num) {
		Struct_lsxx_232 struct = Config_lsxx_232.getIns().get(duanwei);
		int sysid = struct.getNpc();
		String npcName=struct.getNpcname();
		int moxing=struct.getMod();
		int wuqimoxing=struct.getWeapon();
		long str=Config_NPC_200.getIns().get(sysid).getPower();
		for(int i=1;i <= num;i++) {
			int npcUnid=getNpcIndex();
			CrossKingRank rank = new CrossKingRank(npcUnid, term, relv, duanwei, i, CrossKingConst.KINGTYPE_NPC, sysid, 0, partid);
			rank.setStrength(str);
			rank.setRname(npcName);
			rank.setJob(moxing);
			rank.setPartId(partid);
			ShowModel showModel=new ShowModel();
			showModel.setWeaponModel(wuqimoxing);
			showModel.setBodyModel(moxing);
			rank.setModel(showModel);
			lvMap.put(i, rank);
			setNpcIndex(npcUnid+1);
			
		}
	}
	/**
	 * 获取指定转生房间的段位排行
	 * @author lobbyer
	 * @param reborn
	 * @return
	 * @date 2016年8月30日
	 */
	public static ConcurrentHashMap<Integer, ConcurrentHashMap<Integer, CrossKingRank>> getDwRank(int partid,int reborn){
		return getDwRankMap(partid).get(reborn);
	}
	/**
	 * 获取某个转生段 指定段位的排行
	 * @author lobbyer
	 * @param reborn 转生索引 
	 * @param dw段位
	 * @date 2016年8月30日
	 */
	public static ConcurrentHashMap<Integer, CrossKingRank> getDwRebornRank(int partid,int reborn,int dw) {
		ConcurrentHashMap<Integer, ConcurrentHashMap<Integer, CrossKingRank>> dwRankMap = getDwRank(partid,reborn);
		if(dwRankMap == null) {
			dwRankMap = new ConcurrentHashMap<Integer, ConcurrentHashMap<Integer, CrossKingRank>>();
			getDwRankMap(partid).put(reborn, dwRankMap);
		}
		ConcurrentHashMap<Integer, CrossKingRank> rankMap = dwRankMap.get(dw);
		if (rankMap == null) {
			rankMap = new ConcurrentHashMap<Integer, CrossKingRank>();
			dwRankMap.put(dw, rankMap);
		}
		return rankMap;
	}
	/**
	 * 添加排行数据进排行榜
	 * @author lobbyer
	 * @param rank
	 * @date 2016年8月20日
	 */
	public static void addDWLvRank(CrossKingRank rank) {
		int partId = rank.getPartId();
		ConcurrentHashMap<Integer, CrossKingRank> dwLvRank = getDwRebornRank(partId,rank.getRebornType(),rank.getDuanwei());
		dwLvRank.put(rank.getRank(), rank);
	}
	/**
	 * 添加玩家排名数据
	 * @author lobbyer
	 * @param rank
	 * @date 2016年8月18日
	 */
	public static void addDWHero(CrossKingRank rank) {
		int partId = rank.getPartId();
		LogTool.info("CrossKingAssist partId=" + partId + ", rid=" + rank.getRid(), CrossKingCrossCache.class);
		getDwHero(partId).put(rank.getRid(), rank);
	}
	@Override
	public void startServer() throws RunServerException {
		initTerm(false);
		findData();
		try {
			CrossKingInfo info = CrossKingCrossDao.getIns().findInfo();
			if(info == null) {
				info = new CrossKingInfo();
				setCrossKingInfo(info);
				if (TimeDateUtil.getWeek() != 7) {
					//开启
					CrossKingCrossFunction.getIns().start();
				}
				CrossKingCrossDao.getIns().insert(info);
			}else {
				setCrossKingInfo(info);
			}
			
		
		} catch (Exception e) {
			LogTool.error(e, "crossKing startServer findInfo exception!");
		}
	}
	/**
	 * 保存数据
	 * @author lobbyer
	 * @date 2016年8月25日
	 */
	public static void saveData() {
		try {
			CrossKingCrossDao.getIns().updateInfo(crossKingInfo);
			List<Struct_lsxxkf_232> sortList = Config_lsxxkf_232.getIns().getSortList();
			List<CrossKingRank> rankList = new ArrayList<CrossKingRank>();
			Set<Integer> keySet = CrossPartCache.getPartMap().keySet();
			for (int partId : keySet) {
				for(Struct_lsxxkf_232 struct:sortList) {
					ConcurrentHashMap<Integer, ConcurrentHashMap<Integer, CrossKingRank>> dwRankMap = getDwRank(partId,struct.getId());
					if (dwRankMap == null) {
						continue;
					}
					Iterator<Entry<Integer, ConcurrentHashMap<Integer, CrossKingRank>>> iterator = dwRankMap.entrySet().iterator();
					while(iterator.hasNext()) {
						Entry<Integer, ConcurrentHashMap<Integer, CrossKingRank>> next = iterator.next();
						ConcurrentHashMap<Integer, CrossKingRank> lvRankMap = next.getValue();
						Iterator<Entry<Integer, CrossKingRank>> iter = lvRankMap.entrySet().iterator();
						while(iter.hasNext()) {
							CrossKingRank rank = iter.next().getValue();
							rankList.add(rank);
						}
					}
				}
			}
			CrossKingCrossDao.getIns().insertOnDuplicateBatch(rankList, null, GameProperties.getFirstZoneId());
		} catch (Exception e) {
			LogTool.error(e, "saveData update Exception!");
		}
	}
	
	@Override
	public void shutdownServer() {
		saveData();
	}
}
