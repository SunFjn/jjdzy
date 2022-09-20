package com.teamtop.system.linglongge;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.global.GlobalCache;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalData;
import com.teamtop.system.linglongge.model.LingLongCrossCache;
import com.teamtop.system.linglongge.model.LingLongGeNoticeModel;
import com.teamtop.system.linglongge.model.LingLongGeRankModel;
import com.teamtop.system.linglongge.model.LingLongGeRankZoneid;
import com.teamtop.util.cache.union.UC;
import com.teamtop.util.db.trans.ObjStrTransUtil;
import com.teamtop.util.log.LogTool;

public class LingLongCrossSysCache extends AbsServerEvent{
	
	/** 获奖公告列表 **/
	private static Map<Integer, List<LingLongGeNoticeModel>> pAwardNoticeList = UC.reg("plingLongGeNotice",
			new HashMap<Integer, List<LingLongGeNoticeModel>>());
	
	/** 每日本服玩家积分排名 每日零点清空 **/
	private static Map<Integer, List<LingLongGeRankModel>> pLingLongGeRankList = UC.reg("plingLongGeRankList",
			new HashMap<Integer, List<LingLongGeRankModel>>());
	
	/** 区积分排名 每日零点清空 **/
	private static Map<Integer, List<LingLongGeRankZoneid>> pZoneidRankList = UC.reg("pzoneidRankList",
			new HashMap<Integer, List<LingLongGeRankZoneid>>());

	public static Map<Integer, List<LingLongGeNoticeModel>> getpAwardNoticeList() {
		return pAwardNoticeList;
	}

	public static void setpAwardNoticeList(Map<Integer, List<LingLongGeNoticeModel>> pAwardNoticeList) {
		LingLongCrossSysCache.pAwardNoticeList = pAwardNoticeList;
	}

	public static Map<Integer, List<LingLongGeRankModel>> getpLingLongGeRankList() {
		return pLingLongGeRankList;
	}

	public static void setpLingLongGeRankList(Map<Integer, List<LingLongGeRankModel>> pLingLongGeRankList) {
		LingLongCrossSysCache.pLingLongGeRankList = pLingLongGeRankList;
	}

	public static Map<Integer, List<LingLongGeRankZoneid>> getpZoneidRankList() {
		return pZoneidRankList;
	}

	public static void setpZoneidRankList(Map<Integer, List<LingLongGeRankZoneid>> pZoneidRankList) {
		LingLongCrossSysCache.pZoneidRankList = pZoneidRankList;
	}

	public static List<LingLongGeNoticeModel> getAwardNoticeList(int partId) {
		return pAwardNoticeList.get(partId);
	}

	public static List<LingLongGeRankModel> getLingLongGeRankList(int partId) {
		return pLingLongGeRankList.get(partId);
	}

	public static List<LingLongGeRankZoneid> getZoneidRankList(int partId) {
		return pZoneidRankList.get(partId);
	}
	
	
	@Override
	public void startServer() throws RunServerException {
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.CROSS_LINGLONGGE);
			String content = globalData.getContent();
			if (content == null || content.equals("") || content.equals("{}")) {
			} else {
				LingLongCrossCache obj = ObjStrTransUtil.toObj(content, LingLongCrossCache.class);
				if (obj.getPAwardNoticeList()!=null) {
					getpAwardNoticeList().putAll(obj.getPAwardNoticeList());
				}
				if (obj.getPLingLongGeRankList()!=null) {
					getpLingLongGeRankList().putAll(obj.getPLingLongGeRankList());
				}
				if (obj.getPZoneidRankList()!=null) {
					getpZoneidRankList().putAll(obj.getPZoneidRankList());
				}
			}
		} catch (Exception e) {
			LogTool.error(e, this, "LingLongCrossCache startServer has wrong");
		}
		
	}
	
	@Override
	public void shutdownServer() {
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.CROSS_LINGLONGGE);
			LingLongCrossCache data = new LingLongCrossCache();
			data.setPAwardNoticeList(getpAwardNoticeList());
			data.setPLingLongGeRankList(getpLingLongGeRankList());
			data.setPZoneidRankList(getpZoneidRankList());
			globalData.setContent(ObjStrTransUtil.toStr(data));
			GlobalCache.doSync(globalData);
		} catch (Exception e) {
			LogTool.error(e, this, "LingLongCrossCache shutdownServer has wrong");
		}
	}
	

}
