package com.teamtop.system.crossKing.local;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.system.crossKing.CrossKingConst;
import com.teamtop.system.crossKing.model.CrossKingHistory;
import com.teamtop.system.hero.Hero;

import excel.config.Config_lsxx_232;
import excel.config.Config_lsxxbp_232;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_lsxx_232;
import excel.struct.Struct_lsxxbp_232;

/**
 * 最强王者角色信息
 * 
 * @author lobbyer
 * @date 2016年8月28日
 */
public class CrossKing {
	/**
	 * 角色id
	 */
	private long hid;
	/**
	 * 赛季
	 */
	private int term;
	/**
	 * 段位
	 */
	private int duanwei;
	/**
	 * 转生段位房间
	 */
	private int rebornType;
	/**
	 * 排名
	 */
	private int rank;
	/**
	 * 积分
	 */
	private int score;
	/**
	 * 已购买次数
	 */
	private int buyCount;
	/**
	 * 剩余挑战次数
	 */
	private int challCount;
	/**
	 * 挑战时间
	 */
	private int challTime;
	/**
	 * 已经换一批的次数
	 */
	private int changeNum;
	/**本赛季最高段位**/
	private int MaxDw; 
	/**
	 * 积分奖励
	 */
	private Map<Integer, Integer> scoreReward = new HashMap<Integer, Integer>();
	/**
	 * 战斗日志
	 */
	private List<CrossKingHistory> history = new ArrayList<CrossKingHistory>();
	/**
	 * 晋级奖励
	 */
	private Map<Integer, Integer> jingJiReward= new HashMap<Integer, Integer>();
	/**
	 *累计挑战次数 
	 */
	private int sumBattleNum;
	/**
	 * 乱世商城
	 */
	private Map<Integer, Integer> shopItems;
	/**
	 * 跨服大分区
	 */
	private int belongZoneid;
	
	public CrossKing(){
		super();
	}
	public CrossKing(long hid){
		super();
		this.hid = hid;
	}
	
	public long getHid() {
		return hid;
	}
	public void setHid(long hid) {
		this.hid = hid;
	}
	public int getTerm() {
		return term;
	}
	public void setTerm(int term) {
		this.term = term;
	}
	public int getDuanwei() {
		return duanwei;
	}
	public void setDuanwei(int duanwei) {
		if (duanwei>this.MaxDw) {
			setMaxDw(duanwei);
		}
		this.duanwei = duanwei;
	}
	public int getRank() {
		return rank;
	}
	public void setRank(int rank) {
		this.rank = rank;
	}
	public int getScore() {
		return score;
	}
	public void setScore(int score) {
		this.score = score;
	}
	public int getBuyCount() {
		return buyCount;
	}
	public void setBuyCount(int buyCount) {
		this.buyCount = buyCount;
	}
	public int getChallCount() {
		return challCount;
	}
	public void setChallCount(int challCount) {
		this.challCount = challCount;
	}
	public int getChallTime() {
		return challTime;
	}
	public void setChallTime(int challTime) {
		this.challTime = challTime;
	}
	public Map<Integer, Integer> getScoreReward() {
		return scoreReward;
	}
	public void setScoreReward(Map<Integer, Integer> scoreReward) {
		this.scoreReward = scoreReward;
	}
	
	public int getRebornType() {
		return rebornType;
	}
	public void setRebornType(int rebornType) {
		if (rebornType<1001&&rebornType>0) {
//			System.err.println("  ");
		}
		this.rebornType = rebornType;
	}
	public List<CrossKingHistory> getHistory() {
		return history;
	}
	public void setHistory(List<CrossKingHistory> history) {
		this.history = history;
	}
	
	public int getChangeNum() {
		return changeNum;
	}
	public void setChangeNum(int changeNum) {
		this.changeNum = changeNum;
	}
	
	public void addHistory(CrossKingHistory battleHis) {
		if (battleHis==null) {
			return;
		}
		if(history.size() >= 10) history.remove(0);
		history.add(battleHis);
	}
	public Map<Integer, Integer> getJingJiReward() {
		return jingJiReward;
	}
	public void setJingJiReward(Map<Integer, Integer> jingJiReward) {
		this.jingJiReward = jingJiReward;
	}
	public int getMaxDw() {
		return MaxDw;
	}
	public void setMaxDw(int maxDw) {
		MaxDw = maxDw;
	}
	
	public int getSumBattleNum() {
		return sumBattleNum;
	}
	public void setSumBattleNum(int sumBattleNum) {
		this.sumBattleNum = sumBattleNum;
	}
	public Map<Integer, Integer> getShopItems() {
		return shopItems;
	}
	public void setShopItems(Map<Integer, Integer> shopItems) {
		this.shopItems = shopItems;
	}
	
	public int getBelongZoneid() {
		return belongZoneid;
	}
	public void setBelongZoneid(int belongZoneid) {
		this.belongZoneid = belongZoneid;
	}
	/**
	 * 零点重置
	 * @author lobbyer
	 * @date 2016年8月29日
	 */
	public void zeroReset() {
		this.buyCount = 0;
		this.challCount=Config_xtcs_004.getIns().get(CrossKingConst.DAYNUM_COST).getNum();
		this.score = 0;
		//积分奖励
		Map<Integer, Integer> jfReward=new HashMap<Integer, Integer>();
		for (Struct_lsxxbp_232 lsxxbp_232: Config_lsxxbp_232.getIns().getSortList()) {
			jfReward.put(lsxxbp_232.getId(), GameConst.REWARD_0);
		}
		this.scoreReward=jfReward;
	}
	
	
	/**
	 * 赛季重置
	 * @author lobbyer
	 * @date 2016年8月18日
	 */
	public void termReset(int belongZoneid){
		if (CrossKingLocalCache.getInfo()!=null) {
			this.term = CrossKingLocalCache.getInfo().getTerm();
		}else {
			this.term=0;
		}
		this.duanwei = 0;
		this.rebornType = 0;
		this.rank = 0;
		this.score = 0;
		this.challTime = 0;
		this.MaxDw=0;
		this.history.clear();
		this.belongZoneid=belongZoneid;
		//晋级奖励
		Map<Integer, Integer> jingJiReward=new HashMap<Integer, Integer>();
		for (Struct_lsxx_232 lsxx_232: Config_lsxx_232.getIns().getSortList()) {
			if (lsxx_232.getDan()!=CrossKingConst.INIT_TYPE) {
				jingJiReward.put(lsxx_232.getDan(), GameConst.REWARD_0);
			}
		}
		//
		this.jingJiReward=jingJiReward;
		this.zeroReset();
	}
	

}
