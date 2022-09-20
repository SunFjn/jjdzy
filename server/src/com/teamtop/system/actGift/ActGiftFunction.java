package com.teamtop.system.actGift;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import com.teamtop.system.actGift.model.ActGift;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.battleVixens.model.BattleVixens;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.system.wujiang.WuJiang;
import com.teamtop.system.wujiang.WuJiangModel;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_hero_211;
import excel.config.Config_xslbb_331;
import excel.config.Config_xtcs_004;
import excel.config.Config_yiqi_007;
import excel.struct.Struct_xslbb_331;
import excel.struct.Struct_xtcs_004;
import excel.struct.Struct_yiqi_007;

public class ActGiftFunction {

	private static ActGiftFunction ActGiftFunction;

	public ActGiftFunction() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized ActGiftFunction getIns() {
		if (ActGiftFunction == null) {
			ActGiftFunction = new ActGiftFunction();
		}
		return ActGiftFunction;
	}

	/**
	 * 检测红将
	 * 
	 * @param hero
	 * @return
	 */
	public Map<Integer, Integer> wujiangHandle(Hero hero) {
		Map<Integer, Integer> wjMap = new HashMap<>();
		try {
			WuJiang wujiang1 = hero.getWujiang();
			if (wujiang1 != null) {
				Map<Integer, WuJiangModel> wujiangMap = wujiang1.getWujiangs();
				wjMap = new HashMap<>();
				int num = 0;
				for (WuJiangModel wuJiangModel : wujiangMap.values()) {
					int type2 = wuJiangModel.getType();
					int pinzhi = Config_hero_211.getIns().get(type2).getPinzhi();
					for (int i = 1; i <= pinzhi; i++) {
						if (wjMap.get(i) == null) {
							num = 0;
							wjMap.put(i, num);
						}
						wjMap.put(i, wjMap.get(i) + 1);
					}
				}
				}
		} catch (Exception e) {
			LogTool.error(e, ActGiftFunction.class, hero.getId(), hero.getName(), "ActGiftFunction wujiangHandle");
		}
		return wjMap;
	}

	public void Handle(Hero hero, int state) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			ActGift model = hero.getActGift();
			if (model == null) {
				return;
			}
			if (!HeroFunction.getIns().checkSystemOpen(hero, ActivitySysId.GIFT_ACT)) {
				return;
			}
			Map<Integer, Map<Integer, Integer>> buyMap = model.getBuyMap();
			Map<Integer, Integer> endTimeMap = model.getEndTimeMap();
			int periods = model.getPeriods();
			List<Struct_xslbb_331> sortList = Config_xslbb_331.getIns().getSortList();
			Iterator<Struct_xslbb_331> iterator = sortList.iterator();
			Struct_xtcs_004 struct_xtcs_004 = Config_xtcs_004.getIns().get(ActGiftConst.ADDTIME);
			int addTime = struct_xtcs_004.getNum() * TimeDateUtil.ONE_HOUR_INT;
			int currentTime = TimeDateUtil.getCurrentTime();
			List<Struct_yiqi_007> sortList2 = Config_yiqi_007.getIns().getSortList();
			int size = sortList2.size()-1;
			Struct_yiqi_007 struct_yiqi_007 = sortList2.get(size);
			int index = struct_yiqi_007.getIndex();//最后一关
			while (iterator.hasNext()) {
				Struct_xslbb_331 next = iterator.next();
				int qs = next.getQs();
				if (periods != qs) {
					continue;
					}
				int lx = next.getLx();
				int cs = next.getCs();
				int id = next.getId();
				BattleVixens battleVixens = hero.getBattleVixens();
				if (battleVixens != null) {
					if (lx == ActGiftConst.TASK_4 && battleVixens.getHardType() > cs) {
						Map<Integer, Integer> map = buyMap.get(ActGiftConst.TASK_4);
						if (map == null) {
							map = new HashMap<>();
							buyMap.put(ActGiftConst.TASK_4, map);
						}
						if (!map.containsKey(id)) {
							map.put(id, ActGiftConst.CANNOT_GET);
							endTimeMap.put(ActGiftConst.TASK_4, currentTime + addTime);
							ActGiftManager.getIns().sendMsg(hero);
						}
					} else if (lx == ActGiftConst.TASK_4 && battleVixens.getMaxPassId() == index) {
						// 一骑当千特殊处理
						Map<Integer, Integer> map = buyMap.get(ActGiftConst.TASK_4);
						if (map == null) {
							map = new HashMap<>();
							buyMap.put(ActGiftConst.TASK_4, map);
						}
						if (!map.containsKey(id)) {
							map.put(id, ActGiftConst.CANNOT_GET);
							endTimeMap.put(ActGiftConst.TASK_4, currentTime + addTime);
							ActGiftManager.getIns().sendMsg(hero);
						}
					}
				}
			}
		} catch (Exception e) {
			LogTool.error(e, ActGiftFunction.class, hero.getId(), hero.getName(), "ActGiftFunction Handle");
			}
		}

	/**
	 * 检测红点
	 * @param hero
	 * @return
	 */
	public boolean checkRedPoint(Hero hero) {
		try {
			if (hero == null) {
				return false;
			}
			long hid = hero.getId();
			ActGift model = hero.getActGift();
			if (model == null) {
				return false;
			}
			if (!HeroFunction.getIns().checkSystemOpen(hero, ActivitySysId.GIFT_ACT)) {
				return false;
			}
			Map<Integer, Map<Integer, Integer>> map = model.getBuyMap();
			Iterator<Integer> iterator2 = map.keySet().iterator();
			while (iterator2.hasNext()) {
				Integer type = iterator2.next();
				Map<Integer, Integer> buyMap = map.get(type);
				Iterator<Integer> iterator = buyMap.values().iterator();
				while (iterator.hasNext()) {
					Integer state = iterator.next();
					if (state == ActGiftConst.CAN_GET) {
						return true;
					}
				}
			}
		} catch (Exception e) {
			LogTool.error(e, ActGiftFunction.class, hero.getId(), hero.getName(), "ActGiftFunction checkRedPoint");
		}
		return false;
	}
	
	/**
	 * 更新红点
	 */
	public void updateRedPoint(Hero hero) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, ActivitySysId.GIFT_ACT)) {
				return;
			}
			boolean redPoint = checkRedPoint(hero);
			if (redPoint) {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.GIFT_ACT, RedPointConst.RED_1,
						RedPointConst.HAS_RED);
				RedPointFunction.getIns().sendFastRedPointHandle(hero);
			} else {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.GIFT_ACT, RedPointConst.RED_1,
						RedPointConst.NO_RED);
				RedPointFunction.getIns().sendFastRedPointHandle(hero);
			}
		} catch (Exception e) {
			LogTool.error(e, ActGiftFunction.class, hero.getId(), hero.getName(), "ActGiftFunction updateRedPoint");
		}
	}

}
