package com.teamtop.system.linglongge;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.global.GlobalCache;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalData;
import com.teamtop.system.linglongge.model.LingLongGeCache;
import com.teamtop.system.linglongge.model.LingLongGeNoticeModel;
import com.teamtop.system.linglongge.model.LingLongGeRankModel;
import com.teamtop.system.linglongge.model.LingLongGeRankZoneid;
import com.teamtop.util.cache.union.UC;
import com.teamtop.util.db.trans.ObjStrTransUtil;
import com.teamtop.util.log.LogTool;

public class LingLongCrossCache extends AbsServerEvent{
	
	/** 获奖公告列表 **/
	private static List<LingLongGeNoticeModel> awardNoticeList = UC.reg("lingLongGeNotice",
			new LinkedList<LingLongGeNoticeModel>());
	
	/** 每日本服玩家积分排名 每日零点清空 **/
	private static List<LingLongGeRankModel> lingLongGeRankList = UC.reg("lingLongGeRankList",
			new ArrayList<LingLongGeRankModel>());
	
	/** 区积分排名 每日零点清空 **/
	private static List<LingLongGeRankZoneid> zoneidRankList = UC.reg("zoneidRankList",
			new ArrayList<LingLongGeRankZoneid>());

	public static List<LingLongGeNoticeModel> getAwardNoticeList() {
		return awardNoticeList;
	}
	public static void setAwardNoticeList(List<LingLongGeNoticeModel> awardNoticeList) {
		LingLongCrossCache.awardNoticeList = awardNoticeList;
	}
	public static List<LingLongGeRankModel> getLingLongGeRankList() {
		return lingLongGeRankList;
	}
	public static void setLingLongGeRankList(List<LingLongGeRankModel> lingLongGeRankList) {
		LingLongCrossCache.lingLongGeRankList = lingLongGeRankList;
	}
	public static List<LingLongGeRankZoneid> getZoneidRankList() {
		return zoneidRankList;
	}
	public static void setZoneidRankList(List<LingLongGeRankZoneid> zoneidRankList) {
		LingLongCrossCache.zoneidRankList = zoneidRankList;
	}
	
	
	@Override
	public void startServer() throws RunServerException {
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.LINGLONGGE);
			String content = globalData.getContent();
			if (content == null || content.equals("") || content.equals("{}")) {
			} else {
				LingLongGeCache obj = ObjStrTransUtil.toObj(content, LingLongGeCache.class);
				getAwardNoticeList().addAll(obj.getAwardNoticeList());
				getLingLongGeRankList().addAll(obj.getLingLongGeRankList());
				getZoneidRankList().addAll(obj.getZoneidRankList());
			}
		} catch (Exception e) {
			LogTool.error(e, this, "LingLongCrossCache startServer has wrong");
		}
		
	}
	
	@Override
	public void shutdownServer() {
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.LINGLONGGE);
			LingLongGeCache data = new LingLongGeCache();
			data.setAwardNoticeList(getAwardNoticeList());
			data.setLingLongGeRankList(getLingLongGeRankList());
			data.setZoneidRankList(getZoneidRankList());
			globalData.setContent(ObjStrTransUtil.toStr(data));
			GlobalCache.doSync(globalData);
		} catch (Exception e) {
			LogTool.error(e, this, "LingLongCrossCache shutdownServer has wrong");
		}
	}
	

}
