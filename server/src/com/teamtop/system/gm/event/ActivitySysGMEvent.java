package com.teamtop.system.gm.event;

import java.util.HashMap;
import java.util.Map;

import com.teamtop.system.activity.AbstractActivityManager;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysCache;
import com.teamtop.system.activity.ActivitySysEvent;
import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.system.activity.model.ActivitySetting;
import com.teamtop.system.crossDynastyWarriors.DynastyWarriorsFunction;
import com.teamtop.system.global.GlobalSender;
import com.teamtop.system.gm.AbsGMEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_huodong_009;
import excel.config.Config_xitong_001;
import excel.struct.Struct_huodong_009;
import excel.struct.Struct_xitong_001;

/**
 * 活动表活动控制GM
 * 
 * @author hzp
 *
 */
public class ActivitySysGMEvent extends AbsGMEvent {

	private static ActivitySysGMEvent ins;

	private ActivitySysGMEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized ActivitySysGMEvent getIns() {
		if (ins == null) {
			ins = new ActivitySysGMEvent();
		}
		return ins;
	}

	/**
	 * type 1修改活动时间,2修改活动开关,3添加一个新的已开启活动
	 */
	@Override
	public void gm(Hero hero, int type, String[] param) {
//		ActivityFunction.getIns().gmHandle(hero, type, param);
		try {
			if (type == 1) {// 修改活动时间
				int actId = Integer.parseInt(param[0]);
				int periods = Integer.parseInt(param[1]);
				int startTime = TimeDateUtil.getTimeIntByStrTime(param[2], "yyyy-MM-dd hh:mm:ss");
				int endTime = TimeDateUtil.getTimeIntByStrTime(param[3], "yyyy-MM-dd hh:mm:ss");
				int currentTime = TimeDateUtil.getCurrentTime();
				if (endTime < currentTime) {
					return;
				}
				// 同步
				Map<Integer, Map<Integer, ActivitySetting>> actSettingMap = ActivitySysCache.getActSettingMap();
				Map<Integer, ActivitySetting> map = actSettingMap.get(actId);
				if (map == null) {
					map = new HashMap<>();
					actSettingMap.put(actId, map);
				}
				ActivitySetting activitySetting = map.get(periods);
				if (activitySetting == null) {
					activitySetting = new ActivitySetting();
					map.put(periods, activitySetting);
				}
				activitySetting.setStartTime(startTime);
				activitySetting.setEndTime(endTime);

				ActivityInfo activityInfo = ActivitySysCache.getActivityMap().get(actId);
				activityInfo.setStartTime(startTime);
				activityInfo.setEndTime(endTime);
				activityInfo.setTimeType(1);
				ActivityFunction.getIns().checkActEnd();
				ActivityFunction.getIns().checkActOpen(true);
				ActivitySysEvent.getIns().login(hero);
			} else if (type == 2) {// 修改活动开关
				int actId = Integer.parseInt(param[0]);
				int periods = Integer.parseInt(param[1]);
				int switchType = Integer.parseInt(param[2]);// 1 开启 ， 2 关闭
				ActivityInfo activityInfo = ActivitySysCache.getActivityMap().get(actId);
				if (activityInfo.getPeriods() == periods) {
					if (switchType == 1) {
						activityInfo.setSwitchOn();
					} else if (switchType == 2) {
						activityInfo.setSwitchOff();
					}
				}
			} else if (type == 3) {// 添加一个新的已开启活动
				int actId = Integer.parseInt(param[0]);// 活动id
				int periods = Integer.parseInt(param[1]);// 期数
				int startTime = Integer.parseInt(param[2]);// 开始时间
				int endTime = Integer.parseInt(param[3]);// 结束数据
				int index = Integer.parseInt(param[4]);// 序号
				int currentTime = TimeDateUtil.getCurrentTime();
				Map<Integer, Map<Integer, ActivitySetting>> actSettingMap = ActivitySysCache.getActSettingMap();
				Map<Integer, ActivitySetting> map = actSettingMap.get(actId);
				if (map == null) {
					map = new HashMap<>();
					actSettingMap.put(actId, map);
				}
				ActivitySetting activitySetting = map.get(periods);
				if (activitySetting == null) {
					activitySetting = new ActivitySetting();
					map.put(periods, activitySetting);
				}
				activitySetting.setStartTime(startTime);
				activitySetting.setEndTime(endTime);
				ActivityInfo activityInfo = new ActivityInfo(index, actId, periods, type, 1, startTime, endTime, 1);
				Map<Integer, ActivityInfo> activityMap = ActivitySysCache.getActivityMap();
				activityMap.put(actId, activityInfo);
				// 调用活动开启处理
				Map<Integer, AbstractActivityManager> actMgrMap = ActivitySysCache.getActMgrMap();
				AbstractActivityManager manager = actMgrMap.get(actId);
				if (manager == null) {
					return;
				}
				manager.actOpen();
				ActivityFunction.getIns().heroOpenHandle(manager, activityInfo);
			} else if (type == 4) {
				DynastyWarriorsFunction.getIns().gmHandle(param);
			} else if (type==5) {
				//前端UI显示
				getActivityTimeGM(hero);
			}
		} catch (Exception e) {
			LogTool.error(e, ActivityFunction.class, "");
		}
	}

	/**
	 * 前端UI显示所有活动时间
	 */
	public static void getActivityTimeGM(Hero hero){
		StringBuffer actStr= new StringBuffer();
		for (ActivityInfo actData:ActivitySysCache.getActivityMap().values()) {
			int actId = actData.getActId();
			ActivityInfo activityInfo = ActivitySysCache.getActivityMap().get(actId);
			Struct_huodong_009 excel = Config_huodong_009.getIns().get( actData.getIndex());
			int index=activityInfo.getIndex();
			actId=activityInfo.getActId();
			int periods=activityInfo.getPeriods();
			int startTime=activityInfo.getStartTime();
			int endTime=activityInfo.getEndTime();
			int state=activityInfo.getState();
			//开启条件
			Struct_xitong_001 openExcel = Config_xitong_001.getIns().get(actId);
			int[][] openArr = openExcel.getServer();
			StringBuilder openStr = new StringBuilder();
			if(openArr!=null) {
				for(int[] temp:openArr) {
					for(int temp2:temp) {
						if(openStr.length()==0) {
							openStr.append(temp2);
						}else {
							openStr.append(",").append(temp2);
						}
					}
					openStr.append(";");
				}
			}
			
			actStr.append("<font color='#84dbFF'>"+excel.getName()+"</font> ").append("表ID:<font color='#84dbFF'>"+index+"</font> ").append("sysID:"+actId).append(" qs:"+periods).append(" state:"+state)
			.append(" \n          <font color='#999999'>"+TimeDateUtil.getTimeStrByInt(startTime, "yyyy-MM-dd HH:mm:ss")+"</font> - ").append("<font color='#999999'>"+TimeDateUtil.getTimeStrByInt(endTime, "yyyy-MM-dd HH:mm:ss")+"</font>")
			.append(" \n          <font color='#999999'>开服:"+openExcel.getDay()+"   开启:"+openStr.toString()+"</font>").append(" \n");
		}
	    if(hero!=null){
//	    	GMSender.sendCmd_98(hero.getId(), GMConst.GM_ACTIVITY_SYS,actStr.toString(),type);
			GlobalSender.sendCmd_260(hero.getId(), 4, "                     <font color='#84dbFF'>所有活动如下：</font> ٩(๑`v´๑)۶ YES!!\n"+actStr.toString());
	    }
	
	}
}
