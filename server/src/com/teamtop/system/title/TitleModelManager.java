package com.teamtop.system.title;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.FightCalcConst;
import com.teamtop.system.hero.FightCalcFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.rankNew.RankingFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_chenghao_702;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_chenghao_702;
import excel.struct.Struct_xtcs_004;

public class TitleModelManager {
	private static TitleModelManager ins = null;

	public static TitleModelManager getIns() {
		if (ins == null) {
			ins = new TitleModelManager();
		}
		return ins;
	}

	/**
	 * 获取称号界面信息
	 * @param hero
	 */
	public void openTitle(Hero hero) {
		if (hero == null) {
			return;
		}
		try {
			int currentTime = TimeDateUtil.getCurrentTime();
			long hid = hero.getId();
			TitleModel titleModel = hero.getTitleModel();
			int wearTitleId = titleModel.getWearTitleId();
			Map<Integer, TitleInfo> hasMap = titleModel.getHasMap();
			List<Object[]> titleList = new ArrayList<>();
			Iterator<Integer> iterator = hasMap.keySet().iterator();
			for (; iterator.hasNext();) {
				int tid = iterator.next();
				TitleInfo titleInfo = hasMap.get(tid);
				int leftTime = -1;
				int type = Config_chenghao_702.getIns().get(tid).getType();
				if (type != TitleType.Forever.getType()) {
					leftTime = titleInfo.getTimeGet() + type - currentTime;
					if (leftTime < 0) {
						leftTime = 0;
					}
				}
				titleList.add(new Object[] { tid, leftTime, titleInfo.getLevel(), titleInfo.getState() });
			}
			TitleModelSender.sendCmd_502(hid, wearTitleId, titleList.toArray());
		} catch (Exception e) {
			LogTool.error(e, TitleModelManager.class, hero.getId(), hero.getName(), "openTitle fail");
		}
	}

	/**
	 * 激活称号
	 * 
	 * @param hero
	 * @param titleId
	 */
	public void activateTitle(Hero hero, int titleId) {
		if (hero == null) {
			return;
		}
		try {
			Struct_chenghao_702 title = Config_chenghao_702.getIns().get(titleId);
			if (title.getType() != TitleType.Forever.getType()) {
				// 非永久类型称号，无需激活操作
				TitleModelSender.sendCmd_510(hero.getId(), 0, 1);
				return;
			}
			if (title.getBelong() == 4) {//类型4无法激活
				// 非永久类型称号，无需激活操作
				TitleModelSender.sendCmd_510(hero.getId(), 0, 1);
				return;
			}
			TitleModel titleModel = hero.getTitleModel();
			Map<Integer, TitleInfo> titleMap = titleModel.getHasMap();
			if (titleMap.containsKey(titleId)) {
				// 已获得该称号
				TitleModelSender.sendCmd_510(hero.getId(), 0, 2);
				return;
			}
			int[][] condtion = title.getCondtion();
			int[][] email = title.getEmail();
			if (condtion[0][0] != TitleActivateType.TOOL_ACT.getActivateType() && email == null) {
				return;
			}
			int toolId = 0;
			if (condtion[0][0] == TitleActivateType.TOOL_ACT.getActivateType()) {
				toolId = condtion[0][2];
			} else {
				toolId = email[0][1];
			}
			if (!UseAddUtil.canUse(hero, GameConst.TOOL, 1, toolId)) {
				TitleModelSender.sendCmd_510(hero.getId(), 0, 3);
				return;
			}
			UseAddUtil.use(hero, GameConst.TOOL, 1, toolId, SourceGoodConst.TITLE_ACTIVE, true);
			TitleFunction.getIns().addTitleHandle(hero.getId(), titleId, false);
			TitleModelSender.sendCmd_510(hero.getId(), 1, titleId);
		} catch (Exception e) {
			LogTool.error(e, TitleModelManager.class, hero.getId(), hero.getName(), "activateTitle Fail, titleId="+titleId);
		}
	}

	/**
	 * 穿戴称号
	 * @param hero
	 * @param handle
	 * @param titleId
	 */
	public void handleTitle(Hero hero, int handle, int titleId) {
		if (hero == null) {
			return;
		}
		try {
			TitleModel title = hero.getTitleModel();
			handle = 0;//操作状态，不依据前端的数据
			int oldTitle = title.getWearTitleId();
			if (oldTitle > 0 && oldTitle != titleId) { // 替换，穿
				handle=TitleConst.TITLE_HANDLE_ON;
			}else if(title.getWearTitleId()==0){
				handle=TitleConst.TITLE_HANDLE_ON;
			} else if (oldTitle == titleId) {
				handle=TitleConst.TITLE_HANDLE_OFF;
			}
			if(title!=null){
				Map<Integer, TitleInfo> hasMap = title.getHasMap();
				if(!hasMap.containsKey(titleId))return;
				if(handle==TitleConst.TITLE_HANDLE_ON){
					if (oldTitle != titleId) {
						if (oldTitle > 0) {
							hasMap.get(oldTitle).setState(TitleConst.HAD_ACTIVATE);
						}
						title.setWearTitleId(titleId);
						hero.setTitleId(titleId);
						hasMap.get(titleId).setState(TitleConst.DRESS_NOW);
					}
				}else if(handle==TitleConst.TITLE_HANDLE_OFF){
					if(title.getWearTitleId()==titleId){
						title.setWearTitleId(0);
						hero.setTitleId(0);
						hasMap.get(titleId).setState(TitleConst.HAD_ACTIVATE);
					}
				}
				//重新计算战力
//				FightCalcFunction.setRecalcAll(hero, FightCalcConst.TITLE_WEAR);
				RankingFunction.getIns().refreshAll(hero);
				TitleModelSender.sendCmd_504(hero.getId(), titleId, handle);
			}
		} catch (Exception e) {
			LogTool.error(e, TitleModelManager.class, hero.getId(), hero.getName(), "handleTitle Fail, titleId="+titleId);
		}
	}
	
	/**
	 * 称号进价
	 * 
	 * @param hero
	 * @param titleId
	 */
	public void upgradeTitle(Hero hero, int titleId) {
		if (hero == null) {
			return;
		}
		try {
			long hid = hero.getId();
			TitleModel titleModel = hero.getTitleModel();
			Map<Integer, TitleInfo> titleMap = titleModel.getHasMap();
			if (!titleMap.containsKey(titleId)) {
				// 未获得该称号
				TitleModelSender.sendCmd_514(hid, 0, 1, 0);
				return;
			}
			TitleInfo titleInfo = titleMap.get(titleId);
			int level = titleInfo.getLevel();
			Struct_xtcs_004 struct_changshu_101 = Config_xtcs_004.getIns().get(TitleConst.MIX_LEVEL_INDEX);
			int maxLevel = struct_changshu_101.getNum();
			if(level>=maxLevel) {
				//达最高等级
				TitleModelSender.sendCmd_514(hid, 0, 2, 0);
				return;
			}
			Struct_chenghao_702 struct_chenghao_702 = Config_chenghao_702.getIns().get(titleId);
			int[][] condition = struct_chenghao_702.getCondtion();
			int[][] email = struct_chenghao_702.getEmail();
			if (condition[0][0] != TitleActivateType.TOOL_ACT.getActivateType()&&email==null) {
				// 非道具激活称号不可进价
				TitleModelSender.sendCmd_514(hid, 0, 3, 0);
				return;
			}
			int itemId = 0;
			if(condition[0][0] == TitleActivateType.TOOL_ACT.getActivateType()) {
				itemId = condition[0][2];
			}else {
				itemId = email[0][1];
			}
			if (!UseAddUtil.canUse(hero, GameConst.TOOL, 1, itemId)) {
				// 材料不足
				TitleModelSender.sendCmd_514(hid, 0, 4, 0);
				return;
			}
			UseAddUtil.use(hero, GameConst.TOOL, 1, itemId, SourceGoodConst.TITLE_UPGRADE, true);
			int newLevel = level + 1;
			titleInfo.setLevel(newLevel);
			TitleModelSender.sendCmd_514(hid, 1, titleId, newLevel);
			// 重新计算战力
			FightCalcFunction.setRecalcAll(hero, FightCalcConst.TITLE_UPGRADE,SystemIdConst.TITLE_SYSID);
			LogTool.info(hid, hero.getName(), "TitleModelManager titleId="+titleId+", newLevel="+newLevel, TitleModelManager.class);
		} catch (Exception e) {
			LogTool.error(e, TitleModelManager.class, hero.getId(), hero.getName(), "upgradeTitle Fail, titleId="+titleId);
		}
	}

}
