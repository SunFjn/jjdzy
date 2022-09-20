package com.teamtop.system.eightDoor;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.global.GlobalCache;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalData;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.util.db.trans.ObjStrTransUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_hdfl_012;
import excel.struct.Struct_hdfl_012;

public class EightDoorSysCache extends AbsServerEvent {
	
	private static EightDoorSysModel  eightDoorSysModel;
	
	private static EightDoorSysCache ins = null;

	public static  EightDoorSysCache getIns() {
		if (ins == null) {
			ins = new EightDoorSysCache();
		}
		return ins;
	}
	

	public static EightDoorSysModel getEightDoorSysModel() {
		return eightDoorSysModel;
	}

	public static void setEightDoorSysModel(EightDoorSysModel eightDoorSysModel) {
		EightDoorSysCache.eightDoorSysModel = eightDoorSysModel;
	}

	@Override
	public void startServer() throws RunServerException {
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.EIGHRDOOR);
			String content = globalData.getContent();
			if (content == null || content.equals("") || content.equals("{}")) {
				setEightDoorSysModel(new EightDoorSysModel());
			} else {
				setEightDoorSysModel(ObjStrTransUtil.toObj(content, EightDoorSysModel.class));
			}
			EightDoorSysModel eightDoorSysModel2 = getEightDoorSysModel();
			for (Struct_hdfl_012 struct_hdfl_012:Config_hdfl_012.getIns().getSortList()) {
				if (struct_hdfl_012.getId()==SystemIdConst.EIGHTDOOR) {
					int openFuDay = TimeDateUtil.betweenOpen();
					int qs = struct_hdfl_012.getQs();
					if (openFuDay>=struct_hdfl_012.getOpen()&&!eightDoorSysModel2.getHasOpen().contains(qs)) {
						//开服天数大于x 且 这个服没有开过这个一期活动
						//今天零点开启
						int beginTime=TimeDateUtil.getTodayZeroTimeReturnInt();
						//七日后0点结束
						int overTime=beginTime+3600*24*7;
						eightDoorSysModel2.setBeginTime(beginTime);
						eightDoorSysModel2.setOverTime(overTime);
						eightDoorSysModel2.setQs(qs);
						eightDoorSysModel2.getHasOpen().add(qs);
						upDate();
					}
					break;
				}
			}
		
			
			
		} catch (Exception e) {
			LogTool.error(e, EightDoorSysModel.class, "EightDoorSysCache startServer");
		}
	}
	
	@Override
	public void shutdownServer(){
		upDate();
		
	}
	
	public static void upDate() {
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.EIGHRDOOR);
			globalData.setContent(ObjStrTransUtil.toStr(getEightDoorSysModel()));
			GlobalCache.doSync(globalData);
		} catch (Exception e) {
			LogTool.error(e, EightDoorSysCache.class, "upDate has wrong");
		}
	}

}
