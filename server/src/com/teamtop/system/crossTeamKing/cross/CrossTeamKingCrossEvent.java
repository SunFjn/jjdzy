package com.teamtop.system.crossTeamKing.cross;

import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.cross.CrossZone;
import com.teamtop.system.crossTeamKing.CrossTeamKingFunction;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.global.GlobalCache;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalData;
import com.teamtop.system.hero.Hero;
import com.teamtop.util.db.trans.ObjStrTransUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

public class CrossTeamKingCrossEvent extends AbsSystemEvent{
	
	
	private static CrossTeamKingCrossEvent ins = null;

	public static CrossTeamKingCrossEvent getIns() {
		if (ins == null) {
			ins = new CrossTeamKingCrossEvent();
		}
		return ins;
	}


	@Override
	public void init(Hero hero) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void login(Hero hero) {
		// TODO Auto-generated method stub
		
	}
	/**
	 * 0准备  1开始时间  2结束时间 每天11:00-12:00、22:00-23:00开启*
	 */
	@Override
	public void fixTime(int cmdId, int now) {
		try {
			if (!CrossZone.isCrossServer()) {
				return;
			}
			if (cmdId == 0) {
				CrossTeamKingFunction.getIns().read();
			} else if (cmdId == 1) {
				//开启
				CrossTeamKingFunction.getIns().noticeState(1);
			}else if(cmdId == 2) {
				CrossTeamKingFunction.getIns().noticeState(0);
				CrossTeamKingFunction.getIns().noticeRank();
			}
		} catch (Exception e) {
			LogTool.error(e, CrossTeamKingCrossEvent.class, "fixTime has wrong");
		}
		
		
	}
	
	public void zeroPub(int now){
		try {
			if (TimeDateUtil.getWeek()==1) {
				//清空排行榜
				TeamKingRankSys teamKingRankSys = CrossTeamKingCroCache.getTeamKingRankSys();
				for (ConcurrentHashMap<Integer, List<TeamKingRanker>> rankersByPartid:teamKingRankSys.getRankCache().values()) {
					for (List<TeamKingRanker> teamKingRankerByReborn:rankersByPartid.values()) {
						for (int i = 0; i < teamKingRankerByReborn.size(); i++) {
							TeamKingRanker teamKingRanker = teamKingRankerByReborn.get(i);
							LogTool.info("partId: "+teamKingRanker.getPartid()+"Reborn: "+teamKingRanker.getRebornType()+"hid: "+teamKingRanker.getHid()+" jf:"+teamKingRanker.getJf(), CrossTeamKingCrossEvent.class);
						}
					}
				}
				teamKingRankSys.getRankCache().clear();
				GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.CROSS_TEAMKING_WEEKREST);
				globalData.setContent(ObjStrTransUtil.toStr(teamKingRankSys));
				GlobalCache.doSync(globalData);
				
			}
		} catch (Exception e) {
			LogTool.error(e, CrossTeamKingCrossEvent.class, "zeroPub has wrong");
		}
	
	}

}
