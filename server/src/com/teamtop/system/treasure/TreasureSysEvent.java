package com.teamtop.system.treasure;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.system.bingfa.BingFaConst;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.treasure.model.TreasureData;
import com.teamtop.system.treasure.model.TreasureModel;
import com.teamtop.system.wujiang.WuJiangConst;

import excel.config.Config_xtcs_004;

public class TreasureSysEvent extends AbsSystemEvent {

	private static TreasureSysEvent treasureSysEvent;

	private TreasureSysEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized TreasureSysEvent getIns() {
		if (treasureSysEvent == null) {
			treasureSysEvent = new TreasureSysEvent();
		}
		return treasureSysEvent;
	}

	@Override
	public void init(Hero hero) {
		TreasureData treasureData = hero.getTreasureData();
		if (treasureData != null) {
			if (treasureData.getSkills()==null||treasureData.getSkills().size()==0) {
				treasureData.setSkills(new HashMap<>());
				for (int i = 1; i <=WuJiangConst.SKILLNUM; i++) {
					treasureData.getSkills().put(i,BingFaConst.TRESURE_SKILLID+1000*i);
				}
			}
			if (treasureData.getLevel()==0) {
				treasureData.setLevel(1);
			}
			int num=Config_xtcs_004.getIns().get(TreasureConst.TAOZHUANG_NUM).getNum();
			if (treasureData.getTaozhuangs()==null||treasureData.getTaozhuangs().size()==0) {
				HashMap<Integer, Integer> taozhuangs=new HashMap<Integer, Integer>();
				for (int i = 1; i <=num; i++) {
					taozhuangs.put(i, 1000*i);
				}
				treasureData.setTaozhuangs(taozhuangs);
			}
			if (treasureData.getTaozhuangs().size()!=num) {
				for (int i = 1; i <=num; i++) {
					if(!treasureData.getTaozhuangs().containsKey(i)) {
						treasureData.getTaozhuangs().put(i, 1000*i);
					}
				}
			}
			
		}else {
			treasureData = new TreasureData();
			List<Integer> wearList = new ArrayList<>();
			wearList.add(0);
			wearList.add(0);
			Map<Integer, TreasureModel> treasureMap = new HashMap<>();
			treasureData.setHid(hero.getId());
			treasureData.setLevel(1);
			treasureData.setWearTreasureList(wearList);
			treasureData.setTreasureMap(treasureMap);
			treasureData.setSkills(new HashMap<>());
			for (int i = 1; i <=WuJiangConst.SKILLNUM; i++) {
				treasureData.getSkills().put(i,BingFaConst.TRESURE_SKILLID+1000*i);
			}
			treasureData.setLevel(1);
			int num=Config_xtcs_004.getIns().get(TreasureConst.TAOZHUANG_NUM).getNum();
			HashMap<Integer, Integer> taozhuangs=new HashMap<Integer, Integer>();
			for (int i = 1; i <=num; i++) {
				taozhuangs.put(i, 1000*i);
			}
			treasureData.setTaozhuangs(taozhuangs);
			hero.setTreasureData(treasureData);
		}
		//觉醒之力初始化
		Map<Integer, TreasureModel> treasureMap = treasureData.getTreasureMap();
		for (Integer treasureid : treasureMap.keySet()) {
			TreasureModel treasureModel = treasureMap.get(treasureid);
			HashMap<Integer, Integer> jueXingSkills = treasureModel.getJueXingSkills();
			if (jueXingSkills==null||jueXingSkills.size()==0) {
				jueXingSkills=new HashMap<>();
				jueXingSkills.put(GameConst.JUEXING_SKILL1, 0);
				jueXingSkills.put(GameConst.JUEXING_SKILL2, 0);
				jueXingSkills.put(GameConst.JUEXING_SKILL3, 0);
				jueXingSkills.put(GameConst.JUEXING_SKILL4, 0);
				treasureModel.setJueXingSkills(jueXingSkills);
			}
			
		}
	
	}

	@Override
	public void login(Hero hero) {
		// TODO Auto-generated method stub

	}

	@Override
	public void passGuanqia(Hero hero, int passGuanqia) {

	}

}
