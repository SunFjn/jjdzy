package com.teamtop.system.openDaysSystem.runeCellect;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.system.destiny.model.DestinyBagData;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.openDaysSystem.OpenDaysSystemFunction;
import com.teamtop.system.openDaysSystem.OpenDaysSystemSysCache;
import com.teamtop.system.openDaysSystem.runeCellect.model.RuneCellectModel;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;

import excel.config.Config_bztzf_261;
import excel.config.Config_fwsj_263;
import excel.struct.Struct_bztzf_261;
import excel.struct.Struct_fwsj_263;
import excel.struct.Struct_hdfl_012;

public class RuneCellectFunction {

	private static RuneCellectFunction ins;

	private RuneCellectFunction() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized RuneCellectFunction getIns() {
		if (ins == null) {
			ins = new RuneCellectFunction();
		}
		return ins;
	}

	/**
	 * 更新各品质符文历史镶嵌数量
	 * 
	 * @param hero
	 */
	public void updateTypeNum(Hero hero) {
		try {
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.RUNE_CELLECT)) {
				return;
			}
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.RUNE_CELLECT);
			RuneCellectManager manager = (RuneCellectManager) OpenDaysSystemSysCache
					.getManager(SystemIdConst.RUNE_CELLECT);
			RuneCellectModel model = (RuneCellectModel) manager.getSystemModel(hero, uid);
			ConcurrentHashMap<Integer, ConcurrentHashMap<Integer, DestinyBagData>> bodyRuneData = hero
					.getPersonalDestiny().getBodyData();
			ConcurrentHashMap<Integer, DestinyBagData> data = bodyRuneData.get(0);
			Map<Integer, Integer> tempMap = new HashMap<>();
			Iterator<DestinyBagData> iterator = data.values().iterator();
			Map<Integer, Struct_bztzf_261> map = Config_bztzf_261.getIns().getMap();
			DestinyBagData dbData = null;
			int id = 0;
			int pz = 0;
			for (; iterator.hasNext();) {
				dbData = iterator.next();
				id = dbData.getDestinyId();
				if (id == 0) {
					continue;
				}
				pz = map.get(id).getPz();
				for (int i = 2; i <= pz; i++) {
					Integer num = tempMap.get(i);
					if (num == null) {
						num = 0;
					}
					tempMap.put(i, num + 1);
				}
			}
			Iterator<Entry<Integer, Integer>> iterator2 = tempMap.entrySet().iterator();
			Entry<Integer, Integer> entry = null;
			int num = 0;
			Map<Integer, Integer> typeNumMap = model.getTypeNumMap();
			for (; iterator2.hasNext();) {
				entry = iterator2.next();
				id = entry.getKey();
				num = entry.getValue();
				Integer historyNum = typeNumMap.get(id);
				if (historyNum == null) {
					typeNumMap.put(id, num);
				} else if (historyNum < num) {
					typeNumMap.put(id, num);
				}
			}
			checkRewardState(hero);
		} catch (Exception e) {
			LogTool.error(e, RuneCellectFunction.class, hero.getId(), hero.getName(),
					"RuneCellectFunction checkRewardState");
		}
	}

	/**
	 * 检测更新领取状态
	 * 
	 * @param hero
	 */
	public void checkRewardState(Hero hero) {
		try {
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.RUNE_CELLECT)) {
				return;
			}
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.RUNE_CELLECT);
			Struct_hdfl_012 hdfl_012 = OpenDaysSystemSysCache.gethdflData(uid);
			int qs = hdfl_012.getQs();
			RuneCellectManager manager = (RuneCellectManager) OpenDaysSystemSysCache.getManager(SystemIdConst.RUNE_CELLECT);
			RuneCellectModel model = (RuneCellectModel) manager.getSystemModel(hero, uid);
			List<Struct_fwsj_263> sortList = Config_fwsj_263.getIns().getSortList();
			int size = sortList.size();
			Map<Integer, Integer> typeNumMap = model.getTypeNumMap();
			Map<Integer, Integer> rewardMap = model.getRewardMap();
			for(int i=0;i<size;i++) {
				Struct_fwsj_263 struct_fwsj_263 = sortList.get(i);
				int id = struct_fwsj_263.getId();
				int pz = struct_fwsj_263.getPz();
				int num = struct_fwsj_263.getNum();
				int rewardQs = struct_fwsj_263.getQs();
				Integer nowNum = typeNumMap.get(pz);
				if (nowNum != null && nowNum >= num) {
					Integer state = rewardMap.get(id);
					if (state != null && state == RuneCellectConst.STATE_ALREADY_GET) {
						continue;
					}
					if (rewardQs != qs) {
						continue;
					}
					rewardMap.put(id, RuneCellectConst.STATE_CAN_GET);
				}
			}
			RuneCellectManager.getIns().openUI(hero);
			updateRedPoint(hero);
		} catch (Exception e) {
			LogTool.error(e, RuneCellectFunction.class, hero.getId(), hero.getName(),
					"RuneCellectFunction checkRewardState");
		}
	}

	/**
	 * 更新红点
	 */
	public void updateRedPoint(Hero hero) {
		try {
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.RUNE_CELLECT)) {
				return;
			}
			boolean redPoint = checkRedPoint(hero);
			if (redPoint) {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.RUNE_CELLECT, RedPointConst.RED_1,
						RedPointConst.HAS_RED);
			} else {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.RUNE_CELLECT, RedPointConst.RED_1,
						RedPointConst.NO_RED);
			}
		} catch (Exception e) {
			LogTool.error(e, RuneCellectFunction.class, hero.getId(), hero.getName(),
					"RuneCellectFunction updateRedPoint");
		}
	}

	/**
	 * 检测红点
	 * 
	 * @param hero
	 * @return
	 */
	public boolean checkRedPoint(Hero hero) {
		try {
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.RUNE_CELLECT)) {
				return false;
			}
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.RUNE_CELLECT);
			RuneCellectModel model = (RuneCellectModel) RuneCellectManager.getIns().getSystemModel(hero, uid);
			Map<Integer, Integer> rewardMap = model.getRewardMap();
			if (rewardMap.size() == 0) {
				return false;
			}
			Iterator<Integer> iterator = rewardMap.values().iterator();
			for (; iterator.hasNext();) {
				Integer state = iterator.next();
				if (state != null && state == RuneCellectConst.STATE_CAN_GET) {
					return true;
				}
			}
		} catch (Exception e) {
			LogTool.error(e, RuneCellectFunction.class, hero.getId(), hero.getName(),
					"RuneCellectFunction checkRedPoint");
		}
		return false;
	}

}
