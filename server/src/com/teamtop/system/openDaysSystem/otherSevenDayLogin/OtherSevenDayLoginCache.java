package com.teamtop.system.openDaysSystem.otherSevenDayLogin;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.cache.union.UC;
import com.teamtop.util.excel.ExcelJsonUtils;
import excel.config.Config_scdlhb_272;
import excel.struct.Struct_scdlhb_272;

public class OtherSevenDayLoginCache extends AbsServerEvent {

	/** 七日登录奖励 **/
	private static Map<Integer, List<ProbabilityEventModel>> rewardMap = new HashMap<Integer, List<ProbabilityEventModel>>();
	/** 获奖公告列表 **/
	private static List<OtherSevenDayLoginModel> awardNoticeList = UC.reg("OtherSevenDayLoginAwardNoticeList", new ArrayList<OtherSevenDayLoginModel>());

	
	public static Map<Integer, List<ProbabilityEventModel>> getRewardMap() {
		return rewardMap;
	}


	public static void setRewardMap(Map<Integer, List<ProbabilityEventModel>> rewardMap) {
		OtherSevenDayLoginCache.rewardMap = rewardMap;
	}




	public static List<OtherSevenDayLoginModel> getAwardNoticeList() {
		return awardNoticeList;
	}


	public static void setAwardNoticeList(List<OtherSevenDayLoginModel> awardNoticeList) {
		OtherSevenDayLoginCache.awardNoticeList = awardNoticeList;
	}

	@Override
	public void startServer() throws RunServerException {
		List<Struct_scdlhb_272> sevenDayList = Config_scdlhb_272.getIns().getSortList();
		for (Struct_scdlhb_272 sevenDay : sevenDayList) {
			List<ProbabilityEventModel> rewardData = ExcelJsonUtils.getGeneralDropData(sevenDay.getReward()+","+sevenDay.getBig());			
			rewardMap.put(sevenDay.getId(), rewardData);
		}
	}


	@Override
	public void shutdownServer() {
		
	
	}
	
	@Override
	public void initExcel() throws RunServerException {
		
	
	}

}
