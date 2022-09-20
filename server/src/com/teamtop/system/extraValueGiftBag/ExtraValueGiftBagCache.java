package com.teamtop.system.extraValueGiftBag;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;

import excel.config.Config_czlb_781;
import excel.struct.Struct_czlb_781;

public class ExtraValueGiftBagCache extends AbsServerEvent {

	/** 周礼包 key-期数  **/
	private static Map<Integer, Map<Integer, Struct_czlb_781>> weekGiftMap = new HashMap<>();
	
	/** 月礼包 key-期数  **/
	private static Map<Integer, Map<Integer, Struct_czlb_781>> monthGiftMap = new HashMap<>();
	
	public static Map<Integer, Map<Integer, Struct_czlb_781>> getWeekGiftMap() {
		return weekGiftMap;
	}
	
	public static Map<Integer, Map<Integer, Struct_czlb_781>> getMonthGiftMap() {
		return monthGiftMap;
	}

	@Override
	public void startServer() throws RunServerException {
		// TODO Auto-generated method stub

	}

	@Override
	public void initExcel() throws RunServerException {
		// TODO Auto-generated method stub
		weekGiftMap.clear();
		monthGiftMap.clear();
		List<Struct_czlb_781> sortList = Config_czlb_781.getIns().getSortList();
		for (int i = 0; i < sortList.size(); i++) {
			Struct_czlb_781 struct_czlb_781 = sortList.get(i);
			int qs = struct_czlb_781.getQs();
			
			if(struct_czlb_781.getType() == ExtraValueGiftBagConst.type_WeekGift) {
				Map<Integer, Struct_czlb_781> map = weekGiftMap.get(qs);
				if(map == null) {
					map = new HashMap<>();
				}
				map.put(struct_czlb_781.getId(), struct_czlb_781);
				weekGiftMap.put(qs, map);
			} else if(struct_czlb_781.getType() == ExtraValueGiftBagConst.type_MonthGift) {
				Map<Integer, Struct_czlb_781> wmap = monthGiftMap.get(qs);
				if(wmap == null) {
					wmap = new HashMap<>();
				}
				wmap.put(struct_czlb_781.getId(), struct_czlb_781);
				monthGiftMap.put(qs, wmap);
			}
		}
	}
}
