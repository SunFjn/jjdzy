package com.teamtop.system.openDaysSystem.otherSevenDayLogin;

import java.util.HashMap;
import java.util.Map;
import com.teamtop.system.openDaysSystem.model.AbsOpenDaysSystemModel;

public class OtherSevenDayLogin extends AbsOpenDaysSystemModel {

	/**
	 * key 登录天数(1~7)
	 * value awardsGet 1已领取 
	 * 			
	 */
	private Map<Integer, OtherSevenDayLoginData> dataMap = new HashMap<>();
	
	/**
	 * key 活动天数(22-28)
	 * value 1登录 
	 * 			
	 */
	private Map<Integer,Integer> checkDay = new HashMap<>();
	
	public Map<Integer, Integer> getCheckDay() {
		return checkDay;
	}
	public void setCheckDay(Map<Integer, Integer> checkDay) {
		this.checkDay = checkDay;
	}
	
	public Map<Integer, OtherSevenDayLoginData> getDataMap() {
		return dataMap;
	}
	public void setDataMap(Map<Integer, OtherSevenDayLoginData> dataMap) {
		this.dataMap = dataMap;
	}

	
}
