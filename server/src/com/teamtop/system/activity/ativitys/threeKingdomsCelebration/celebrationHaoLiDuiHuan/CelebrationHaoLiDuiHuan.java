package com.teamtop.system.activity.ativitys.threeKingdomsCelebration.celebrationHaoLiDuiHuan;

import java.util.HashMap;
import java.util.Map;

import com.teamtop.system.activity.model.ActivityData;

public class CelebrationHaoLiDuiHuan extends ActivityData {

	private Map<Integer, Integer> duiHuanMap = new HashMap<>();//兑换数据  key：excelID  value:已兑换数量

	public Map<Integer, Integer> getDuiHuanMap() {
		return duiHuanMap;
	}
	public void setDuiHuanMap(Map<Integer, Integer> duiHuanMap) {
		this.duiHuanMap = duiHuanMap;
	}
	
}
