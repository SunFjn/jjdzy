package com.teamtop.system.monsterSpirit;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.monsterSpirit.model.MonsterSpiritInfo;
import com.teamtop.system.monsterSpirit.model.MonsterSpiritModel;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;

import excel.config.Config_shoulin_704;
import excel.struct.Struct_shoulin_704;

public class MonsterSpiritSysEvent extends AbsSystemEvent {

	private static MonsterSpiritSysEvent event;

	public static synchronized MonsterSpiritSysEvent getIns() {
		if (event == null) {
			event = new MonsterSpiritSysEvent();
		}
		return event;
	}

	@Override
	public void init(Hero hero) {
		MonsterSpiritModel monsterSpiritModel = hero.getMonsterSpiritModel();
		if(monsterSpiritModel==null) {
			monsterSpiritModel = new MonsterSpiritModel();
			monsterSpiritModel.setHid(hero.getId());
			Map<Integer, MonsterSpiritInfo> monsterSpiritMap = monsterSpiritModel.getMonsterSpiritMap();
			Map<Integer, Integer> monsterSpiritMapOld = hero.getMonsterSpiritMap();
			if(monsterSpiritMap==null) {
				Map<Integer, Integer> starBaseMap = MonsterSpiritSysCache.getStarBaseMap();
				monsterSpiritMap = new HashMap<>();
				List<Struct_shoulin_704> sortList = Config_shoulin_704.getIns().getSortList();
				int size = sortList.size();
				for(int i=0;i<size;i++) {
					Struct_shoulin_704 ms = sortList.get(i);
					int msId = ms.getId();
					int type = msId/1000;
					if(type<=MonsterSpiritConst.INIT_MONSTERSPIRIT_NUM&&ms.getLv()==MonsterSpiritConst.INIT_MONSTERSPIRIT_LVL) {
						MonsterSpiritInfo spiritInfo = monsterSpiritMap.get(type);
						if(spiritInfo==null) {
							spiritInfo = new MonsterSpiritInfo();
							spiritInfo.setId(msId);
							spiritInfo.setType(type);
							spiritInfo.setStarLevel(starBaseMap.get(type));
							monsterSpiritMap.put(type, spiritInfo);
						}
						int lv = MonsterSpiritConst.INIT_MONSTERSPIRIT_LVL;
						if(monsterSpiritMapOld!=null&&monsterSpiritMapOld.size()!=0) {
							Iterator<Integer> iterator = monsterSpiritMapOld.keySet().iterator();
							for(;iterator.hasNext();) {
								Integer oldMsId = iterator.next();
								if(oldMsId!=null) {
									if(type==(oldMsId/1000)) {
										spiritInfo.setId(oldMsId);
										Integer oldLv = monsterSpiritMapOld.get(oldMsId);
										if(oldLv!=null) {
											lv = oldLv;
										}
									}
								}
							}
						}
						spiritInfo.setLevel(lv);
					}
				}
				monsterSpiritModel.setMonsterSpiritMap(monsterSpiritMap);
			}
			hero.setMonsterSpiritModel(monsterSpiritModel);
		}
	}

	@Override
	public void login(Hero hero) {
		MonsterSpiritModel monsterSpiritModel = hero.getMonsterSpiritModel();
		boolean redPoint = MonsterSpiritFunction.getIns().checkRedPoint(hero);
		if (redPoint) {
			RedPointFunction.getIns().addLoginRedPoint(hero, MonsterSpiritConst.SysId, MonsterSpiritConst.RedPoint,
					RedPointConst.HAS_RED);
		}
		//矫正兽魂洗练总次数
		int sumWashNum = MonsterSpiritFunction.getIns().sumWashNum(hero);
		if (monsterSpiritModel.getWashNum()!=sumWashNum) {
			monsterSpiritModel.setWashNum(sumWashNum);
		}
	}

}
