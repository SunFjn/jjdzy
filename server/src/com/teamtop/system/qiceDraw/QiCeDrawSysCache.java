package com.teamtop.system.qiceDraw;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.excel.ExcelJsonUtils;

import excel.config.Config_cmhc_761;
import excel.config.Config_cmhcmb_761;
import excel.struct.Struct_cmhc_761;
import excel.struct.Struct_cmhcmb_761;

public class QiCeDrawSysCache extends AbsServerEvent {
	/** 普通和高级奖励概率事件Map key为出谋策划表id **/
	private static Map<Integer, List<List<ProbabilityEventModel>>> awardMap = new HashMap<>();
	/** 最大抽奖次数 **/
	private static int maxNum;
	
	@Override
	public void startServer() throws RunServerException {

	}
	
	@Override
	public void initExcel() throws RunServerException {
		awardMap.clear();
		maxNum = 0;
		for (Struct_cmhc_761 struct_cmhc_761 : Config_cmhc_761.getIns().getSortList()) {
			List<List<ProbabilityEventModel>> list = new ArrayList<>();
			list.add(ExcelJsonUtils.getGeneralDropData(struct_cmhc_761.getPt()));
			list.add(ExcelJsonUtils.getGeneralDropData(struct_cmhc_761.getGj()));
			awardMap.put(struct_cmhc_761.getId(), list);
		}
		
		List<Struct_cmhcmb_761> sortList = Config_cmhcmb_761.getIns().getSortList();
		for (Struct_cmhcmb_761 struct_cmhcmb_761 : sortList) {
			if (struct_cmhcmb_761.getPt() > maxNum) {
				maxNum = struct_cmhcmb_761.getPt();
			}
		}
	}

	public static Map<Integer, List<List<ProbabilityEventModel>>> getAwardMap() {
		return awardMap;
	}

	public static void setAwardMap(Map<Integer, List<List<ProbabilityEventModel>>> awardMap) {
		QiCeDrawSysCache.awardMap = awardMap;
	}

	public static int getMaxNum() {
		return maxNum;
	}

	public static void setMaxNum(int maxNum) {
		QiCeDrawSysCache.maxNum = maxNum;
	}

}
