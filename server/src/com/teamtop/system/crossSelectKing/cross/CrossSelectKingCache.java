package com.teamtop.system.crossSelectKing.cross;

import java.util.List;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossPartCache;
import com.teamtop.gameCommon.GameProperties;
import com.teamtop.main.RunServerException;
import com.teamtop.system.crossKing.CrossKingConst;
import com.teamtop.system.crossKing.cross.CrossKingCrossCache;
import com.teamtop.system.crossKing.model.CrossKingRank;
import com.teamtop.system.crossSelectKing.CrossSelectKingConst;
import com.teamtop.system.crossSelectKing.CrossSelectKingDao;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.global.GlobalCache;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalData;
import com.teamtop.util.db.trans.ObjStrTransUtil;
import com.teamtop.util.log.LogTool;

import excel.config.Config_lsxxkf_232;
import excel.struct.Struct_lsxxkf_232;


/**
 * 枭雄争霸系统缓存
 * @author jjjjyyy
 *
 */
public class CrossSelectKingCache extends AbsServerEvent{
	/**
	 * 大分区-》转生房间id->参与者id->参与者
	 */
	private static ConcurrentHashMap<Integer,ConcurrentHashMap<Integer,ConcurrentHashMap<Long, CrossSelectKing>>> kingHeroMap=new ConcurrentHashMap<Integer,ConcurrentHashMap<Integer,ConcurrentHashMap<Long, CrossSelectKing>>>();
	/**
	 * 大分区-》转生房间id-比赛节点
	 */
	public static ConcurrentHashMap<Integer,ConcurrentHashMap<Integer, CrossSelectKingNode[][]>> battleNodeMap = new ConcurrentHashMap<Integer,ConcurrentHashMap<Integer, CrossSelectKingNode[][]>>();
	
	/**
	 *  大分区-》同步玩家数量
	 */
	public static ConcurrentHashMap<Integer,Integer> CTLNum=new ConcurrentHashMap<Integer,Integer>();
	/**
	 *  大分区-》同步玩家数量
	 */
	public static ConcurrentHashMap<Integer,Integer> LTCNum=new ConcurrentHashMap<Integer,Integer>();
	/**
	 * 战斗唯一id
	 */
	private static AtomicInteger battleUnitId = new AtomicInteger();
	
	/**
	 * 比赛信息第几届 阶段等等
	 */
	private static CrossSelectKingInfo kingInfo=new CrossSelectKingInfo();
	
	
	
	
	public static CrossSelectKingInfo getKingInfo() {
		return kingInfo;
	}
	public static void setKingInfo(CrossSelectKingInfo kingInfo) {
		CrossSelectKingCache.kingInfo = kingInfo;
	}
	public static ConcurrentHashMap<Integer, ConcurrentHashMap<Long, CrossSelectKing>> getKingHeroMap(int partid) {
		if (!kingHeroMap.containsKey(partid)) {
			kingHeroMap.put(partid, new ConcurrentHashMap<Integer, ConcurrentHashMap<Long, CrossSelectKing>>());
		}
		return kingHeroMap.get(partid);
	}
	
	public static ConcurrentHashMap<Integer, CrossSelectKingNode[][]> getBattleNodeMap(int partid) {
		if (!battleNodeMap.containsKey(partid)) {
			battleNodeMap.put(partid, new ConcurrentHashMap<Integer, CrossSelectKingNode[][]>());
		}
		return battleNodeMap.get(partid);
	}
	
	
	public static void addCrossSelectKingData(CrossSelectKing data) {
		int belongZoneid = data.getBelongZoneid();
		int partId = CrossCache.getPartId(belongZoneid);
		ConcurrentHashMap<Integer, ConcurrentHashMap<Long, CrossSelectKing>> allSelectKingData = getKingHeroMap(partId);
		ConcurrentHashMap<Long, CrossSelectKing> map = allSelectKingData.get(data.getBang());
		if(map == null) {
			map = new ConcurrentHashMap<Long, CrossSelectKing>();
			allSelectKingData.put(data.getBang(), map);
		}
		map.put(data.getHid(), data);
	}
	
	public static int getCTLNum(int partid) {
		int num =0;
		if (CTLNum.containsKey(partid)) {
			num =CTLNum.get(partid);
		}
		return num;
	}
	public static void setCTLNum(int partid,int cTLNum) {
		CTLNum.put(partid, cTLNum);
	}
	public static int getLTCNum(int partid) {
		int num =0;
		if (LTCNum.containsKey(partid)) {
			num =LTCNum.get(partid);
		}
		return num;
	}
	public static void setLTCNum(int partid,int lTCNum) {
		LTCNum.put(partid, lTCNum);
	}
	public static synchronized  void addLTCNum(int partid) {
		if (!LTCNum.containsKey(partid)) {
			LTCNum.put(partid, 0);
		}
		int num=LTCNum.get(partid);
		num++;
		LTCNum.put(partid, num);
	}
	/**
	 * 使当前最大战斗唯一id加1并返回
	 * @return 增加后的战斗唯一id
	 */
	public static int getAndAddBattleUnitId(){
		if(battleUnitId.get()<=0 || battleUnitId.get()>Integer.MAX_VALUE){
			battleUnitId.set(1);
		}
		return battleUnitId.getAndIncrement();
	}
	
	/**
	 * 初始化参加枭雄争霸的各个转生房间
	 */
	public static void initKingHeroMap() {
		Set<Integer> keySet = CrossPartCache.getPartMap().keySet();
		for (int partId : keySet) {
			getKingHeroMap(partId).clear();
			List<Struct_lsxxkf_232> sortList = Config_lsxxkf_232.getIns().getSortList();
			for(Struct_lsxxkf_232 struct:sortList) {
				ConcurrentHashMap<Long, CrossSelectKing> joiners=new ConcurrentHashMap<Long, CrossSelectKing>();
				int bangId=struct.getId();
				ConcurrentHashMap<Integer, ConcurrentHashMap<Integer, CrossKingRank>> dwRankMap = CrossKingCrossCache.getDwRank(partId,bangId);
				if (dwRankMap!=null) {
					ConcurrentHashMap<Integer, CrossKingRank> maxDwHeroMap = dwRankMap.get(CrossKingConst.KING_ID);
					for (CrossKingRank kingRank:maxDwHeroMap.values()) {
						if (kingRank.getType()==CrossKingConst.KINGTYPE_HERO) {
							CrossSelectKing crossSelectKing=kingRankToSelectKing(kingRank);
							crossSelectKing.setBang(bangId);
							joiners.put(kingRank.getRid(),crossSelectKing);
						}
					}
				}
				getKingHeroMap(partId).put(bangId, joiners);
			}
			try {
				ConcurrentHashMap<Integer, ConcurrentHashMap<Long, CrossSelectKing>> allCrossSelectKing = getKingHeroMap(partId);
				for(Integer bang:allCrossSelectKing.keySet()) {
					ConcurrentHashMap<Long, CrossSelectKing> map = allCrossSelectKing.get(bang);
					CrossSelectKingDao.getIns().updateCrossSelectKing(map.values());
				}
			} catch (Exception e) {
				LogTool.error(e, CrossSelectKingCache.class, "initKingHeroMap Exception!");
			}
		}
	}
	
	
	/**
	 * 从乱世枭雄类转换成枭雄争霸类
	 * @param data
	 * @return
	 */
	public static CrossSelectKing kingRankToSelectKing(CrossKingRank data) {
		if(data == null) return null;
		CrossSelectKing nd = new CrossSelectKing();
		nd.setHid(data.getRid());
		nd.setTerm(data.getTerm());
		nd.setBang(data.getRebornType());
		nd.setRank(data.getRank());
		nd.setName(data.getRname());
		nd.setJob(data.getJob());
		nd.setZoneid(data.getZoneid());
		nd.setStrength(data.getStrength());
		nd.setSkill(data.getSkill());
		nd.setModel(data.getModel());
		nd.setFinalFightAttr(data.getFinalFightAttr());
		nd.setBelongZoneid(data.getBelongZoneid());
		nd.setFigthMonsterSpirit(data.getFigthMonsterSpirit());
		nd.setLittleLeaderInfo(data.getLittleLeaderInfo());
		nd.setGodSkillLevel(data.getGodSkillLevel());
		return nd;
	}
	/**
	 * 重置数据
	 * @author lobbyer
	 * @date 2016年6月16日
	 */
	public static void resetTerm() {
		//清掉上一期的
		CrossSelectKingInfo kingInfo=CrossSelectKingCache.getKingInfo();
		int oldTerm = kingInfo.getTerm();
		int newTerm = oldTerm + 1;
		if(newTerm >= 99) newTerm = 1;
		kingInfo.setTerm(newTerm);
		kingInfo.setState(CrossSelectKingConst.STATE_1);
		kingInfo.setProState(CrossSelectKingConst.INFO_STATE_1);
		kingInfo.setProFlag(CrossSelectKingConst.INFO_FLAG_1);
		kingInfo.getWinIdMap().clear();
		try {
			CrossSelectKingDao.getIns().truncateSelectKingNode(GameProperties.getFirstZoneId());
			CrossSelectKingDao.getIns().truncateSelectKing(GameProperties.getFirstZoneId());
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public static void updateInfo(){
		try {
			GlobalData data = GlobalCache.getGlobalData(GlobalConst.SELECTKING);
			data.setContent(ObjStrTransUtil.toStr(getKingInfo()));
			GlobalCache.doSync(data);
		} catch (Exception e) {
			LogTool.error(e, CrossSelectKingCache.class, "updateInfo Exception!");
		}
	}
	
	public static void main(String[] args) {
		for (int i = 0; i < 5; i++) {
			System.err.println(getAndAddBattleUnitId());
		}
		
	}
	
	
	@Override
	public void startServer() throws RunServerException {
		GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.SELECTKING);
		String content = globalData.getContent();
		CrossSelectKingInfo info = null;
		if(content!=null && !"".equals(content)){
			try {
				info = ObjStrTransUtil.toObj(content, CrossSelectKingInfo.class);
			} catch (Exception e) {
				throw new RunServerException(e, "startServer info Exception!");
			}
		}
		if(info == null){
			info = new CrossSelectKingInfo();
		}
		kingInfo = info;
		//查找参赛数据
		try {
			//晋级赛
			List<CrossSelectKing> allPrimaryData = CrossSelectKingDao.getIns().findAllCrossSelectKingData();
			for(CrossSelectKing data:allPrimaryData) {
				addCrossSelectKingData(data);
			}
			
			for (int partId:CrossPartCache.getPartMap().keySet()) {
				CrossSelectKingCrossFunction.getIns().initFinalNodeFromDB(partId);
			}
		} catch (Exception e) {
			LogTool.error(e, this, "startServer findData Exception!");
		}
		
	}
	@Override
	public void shutdownServer(){
		updateData();
	}
	
	/**
	 * 更新数据
	 * @author lobbyer
	 * @date 2017年8月2日
	 */
	public static void updateData() {
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.SELECTKING);
			globalData.setContent(ObjStrTransUtil.toStr(kingInfo));
			GlobalCache.doSync(globalData);
		} catch (Exception e) {
			LogTool.error(e, CrossSelectKingCache.class, "GlobalConst.SELECTKING info Exception!");
		}
		try {
			for (int partId:CrossCache.getZoneidToChannelMap().keySet()) {
				ConcurrentHashMap<Integer, ConcurrentHashMap<Long, CrossSelectKing>> allCrossSelectKing = getKingHeroMap(partId);
				for(Integer bang:allCrossSelectKing.keySet()) {
					ConcurrentHashMap<Long, CrossSelectKing> map = allCrossSelectKing.get(bang);
					CrossSelectKingDao.getIns().updateCrossSelectKing(map.values());
				}
			}
		} catch (Exception e) {
			LogTool.error(e, CrossSelectKingCache.class, "updateCrossSelectKing Exception!");
		}
	}
	
	

	

}
