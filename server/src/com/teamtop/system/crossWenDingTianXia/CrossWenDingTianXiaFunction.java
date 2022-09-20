package com.teamtop.system.crossWenDingTianXia;

import java.util.List;
import java.util.concurrent.ConcurrentSkipListSet;

import com.teamtop.system.actHall.ActHallInterface;
import com.teamtop.system.global.GlobalCache;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalData;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.hero.XTCS004Const;
import com.teamtop.system.rankNew.RankingCache;
import com.teamtop.system.rankNew.RankingConst;
import com.teamtop.system.rankNew.rankModel.BaseRankModel;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_wdtxrank_260;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_wdtxrank_260;

public class CrossWenDingTianXiaFunction implements ActHallInterface {
	private static CrossWenDingTianXiaFunction ins = null;

	public static CrossWenDingTianXiaFunction getIns() {
		if (ins == null) {
			ins = new CrossWenDingTianXiaFunction();
		}
		return ins;
	}

	/**
	 * 获取排行榜前10名总战力
	 */
	public long getRankTop10Strength() {
		ConcurrentSkipListSet<BaseRankModel> treeSet = RankingCache.getRankingmap().get(RankingConst.STRENGTH_RANKING);
		ConcurrentSkipListSet<BaseRankModel> rankTreeSet = new ConcurrentSkipListSet<>(treeSet);
		int ranking = 0;
		long strengthTop10 = 0;
		for (BaseRankModel model : rankTreeSet) {
			ranking++;
			strengthTop10 = strengthTop10 + model.getStrength();
			if(ranking == 10)
				break;
		}
		return strengthTop10;
	}

	/**
	 * 获取排名奖励
	 */
	public int[][] getRankAwards(int rank, int zid) {
		int[][] awardsLast = null;//如果都没有，默认是最后的奖励
		List<Struct_wdtxrank_260> excelList = Config_wdtxrank_260.getIns().getSortList();
		for(Struct_wdtxrank_260 excel:excelList) {
			boolean newServer = isNewServer();
			if((newServer&& excel.getQf()==1)|| (!newServer&& excel.getQf()==2)) {//1是新区   2是跨服
				int[][] rankArr = excel.getRank();
				if(rankArr[0][0]<=rank&& rank<=rankArr[0][1]) {
					return excel.getReward();
				}
				awardsLast = excel.getReward();
			}
		}
		return awardsLast;
	}
	
	/**
	 * 判断是否是开服前N天，小于N天的区，单独一个房间
	 * @return  true：是
	 */
	public boolean isNewServer() {
		int dayExcel = Config_xtcs_004.getIns().get(XTCS004Const.WDTX_XX_DAY_NEW_SERVER).getNum();
		int dayOpen = TimeDateUtil.betweenOpen();
		if( dayExcel>= dayOpen) {//开服前XX天为本服匹配
			return true;
		}
		return false;
	}
	
	/**
	 * 判断是否开启活动
	 * @return  true：开
	 */
	public boolean isOpen() {
		int dayExcel = Config_xtcs_004.getIns().get(XTCS004Const.WDTX_XX_DAY_NEW_SERVER).getNum();
		int dayOpen = TimeDateUtil.betweenOpen();
		int weekToday = TimeDateUtil.getWeek();
		if( dayExcel>= dayOpen) {//开服前XX天为本服匹配
			int[][] dayNewServerExcel = Config_xtcs_004.getIns().get(XTCS004Const.WDTX_NEW_SERVER_OPEN_DAY).getOther();
			for( int dayIndexExcel:dayNewServerExcel[0]) {
				if(dayOpen == dayIndexExcel) 
					return true;
			}
		}else {
			int[][] dayOldServerExcel = Config_xtcs_004.getIns().get(XTCS004Const.WDTX_XX_DAY_NEW_SERVER_DAY_INDIX).getOther();
			for( int dayIndexExcel:dayOldServerExcel[0]) {
				if( dayIndexExcel == weekToday)
					return true;
			}
		}
		return false;
	}

	@Override
	public void getActHallData(List<Object[]> list) {
		GlobalData globalData = GlobalCache.getGlobalData( GlobalConst.WDTX_MVP);
		if(globalData==null)
			return;
		String content = globalData.getContent();
		if(content==null)
			return;

		list.add(new Object[] { SystemIdConst.CROSS_WEN_DING_TIAN_XIA, content });
	}
	
	public void checkRed(Hero hero) {
		int state = CrossWenDingTianXiaCache.getState();
		if(state == CrossWenDingTianXiaConst.STATE_1) {
			RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.CROSS_WEN_DING_TIAN_XIA, CrossWenDingTianXiaConst.INDEX_RED, RedPointConst.HAS_RED);
		}else {
			RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.CROSS_WEN_DING_TIAN_XIA, CrossWenDingTianXiaConst.INDEX_RED, RedPointConst.NO_RED);
		}
		
	}
}
