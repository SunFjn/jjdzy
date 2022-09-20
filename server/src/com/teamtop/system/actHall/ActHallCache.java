package com.teamtop.system.actHall;

import java.util.ArrayList;
import java.util.List;

import com.teamtop.system.battleGoods.BattleGoodsFunction;
import com.teamtop.system.boss.monsterGod.MonsterGodFunction;
import com.teamtop.system.crossFireBeacon.CrossFireBeaconFunction;
import com.teamtop.system.crossWenDingTianXia.CrossWenDingTianXiaFunction;
import com.teamtop.system.crossZhuLu.cross.CrossZhuLuFunction;
import com.teamtop.system.longZhongDui.LongZhongDuiFunction;
import com.teamtop.system.xuTianHunt.XuTianHuntFunction;

public class ActHallCache {

	public static List<ActHallInterface> actHallMap = new ArrayList<>();

	/**
	 * 返回活动大厅数据统一配置
	 */
	static {
		actHallMap.add(LongZhongDuiFunction.getIns());
		actHallMap.add(CrossFireBeaconFunction.getIns());
		actHallMap.add(CrossWenDingTianXiaFunction.getIns());
		actHallMap.add(MonsterGodFunction.getIns());
		actHallMap.add(CrossZhuLuFunction.getIns());
		actHallMap.add(BattleGoodsFunction.getIns());
		actHallMap.add(XuTianHuntFunction.getIns());
	}

}
