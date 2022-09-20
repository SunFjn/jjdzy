package com.teamtop.system.activity.ativitys.overTurntable;

import java.util.ArrayList;
import java.util.List;

import com.teamtop.main.RunServerException;
import com.teamtop.system.activity.ativitys.overTurntable.model.OverTurntableCache;
import com.teamtop.system.activity.ativitys.overTurntable.model.OverTurntableNoticeModel;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.global.GlobalCache;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalData;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventFactory;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.cache.union.UC;
import com.teamtop.util.db.trans.ObjStrTransUtil;
import com.teamtop.util.log.LogTool;

import excel.config.Config_czzpreward_726;
import excel.struct.Struct_czzpreward_726;

public class OverTurntableSysCache extends AbsServerEvent {

	/** 奖励概率事件Map **/
	private static ProbabilityEventModel probabilityEventModel = ProbabilityEventFactory.getProbabilityEvent();
	/** 超值转盘缓存 **/
//	private static OverTurntableCache overTurntableCache = new OverTurntableCache();
	/** 获奖公告列表 **/
	private static List<OverTurntableNoticeModel> awardNoticeList = UC.reg("overTurnAwardNoticeList", new ArrayList<OverTurntableNoticeModel>());

	public static ProbabilityEventModel getProbabilityEventModel() {
		return probabilityEventModel;
	}

//	public static OverTurntableCache getOverTurntableCache() {
//		return overTurntableCache;
//	}


	public static List<OverTurntableNoticeModel> getAwardNoticeList() {
		return awardNoticeList;
	}

	public static void setAwardNoticeList(List<OverTurntableNoticeModel> awardNoticeList) {
		OverTurntableSysCache.awardNoticeList = awardNoticeList;
	}

	@Override
	public void startServer() throws RunServerException {
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.OVERTURNTABLE);
			String content = globalData.getContent();
			if (content == null || content.equals("") || content.equals("{}")) {
//				initOverTurntableCache();
			} else {
				OverTurntableCache obj = ObjStrTransUtil.toObj(content, OverTurntableCache.class);
//				overTurntableCache.setAwardNoticeList(UC.reg("awardNoticeList", obj.getAwardNoticeList()));
				getAwardNoticeList().addAll(obj.getAwardNoticeList());
			}
		} catch (Exception e) {
			LogTool.error(e, this, "OverTurntableSysCache startServer has wrong");
		}
	}

	/**
	 * 初始化超值转盘缓存
	 */
//	private void initOverTurntableCache() {
//		List<OverTurntableNoticeModel> awardNoticeList = new ArrayList<OverTurntableNoticeModel>();
//		overTurntableCache.setAwardNoticeList(UC.reg("awardNoticeList", awardNoticeList));
//	}

	@Override
	public void shutdownServer() {
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.OVERTURNTABLE);
			OverTurntableCache data =new OverTurntableCache();
			data.setAwardNoticeList(getAwardNoticeList());
			globalData.setContent(ObjStrTransUtil.toStr( data));
			GlobalCache.doSync(globalData);
		} catch (Exception e) {
			LogTool.error(e, this, "OverTurntableSysCache shutdownServer has wrong");
		}
	}

	@Override
	public void initExcel() throws RunServerException {
		// TODO Auto-generated method stub

		List<Struct_czzpreward_726> sortList = Config_czzpreward_726.getIns().getSortList();
		int size = sortList.size();
		for (int i = 0; i < size; i++) {
			Struct_czzpreward_726 struct_czzpreward_726 = sortList.get(i);
			probabilityEventModel.addProbabilityEvent(struct_czzpreward_726.getQz(), struct_czzpreward_726);
		}
	}

}
