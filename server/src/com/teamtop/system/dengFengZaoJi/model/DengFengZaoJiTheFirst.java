package com.teamtop.system.dengFengZaoJi.model;

import java.util.HashMap;
import java.util.Map;

public class DengFengZaoJiTheFirst {
	/**<每周时间戳,登峰造极决赛第一名玩家id>*/
	private Map<Integer,Long> firstMap = new HashMap<Integer, Long>();

	public Map<Integer, Long> getFirstMap() {
		return firstMap;
	}

	public void setFirstMap(Map<Integer, Long> firstMap) {
		this.firstMap = firstMap;
	}
	
}
