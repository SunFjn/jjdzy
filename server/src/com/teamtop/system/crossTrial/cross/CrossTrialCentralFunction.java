package com.teamtop.system.crossTrial.cross;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import com.teamtop.cross.upload.CrossHeroBaseModel;
import com.teamtop.system.crossTrial.model.FloorFightInfo;
import com.teamtop.system.robot.CrossHeroBaseRobot;
import com.teamtop.system.robot.RobotFunction;
import com.teamtop.util.ProbabilityEvent.RandomUtil;
import com.teamtop.util.log.LogTool;

public class CrossTrialCentralFunction {

	private static CrossTrialCentralFunction ins;

	private CrossTrialCentralFunction() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized CrossTrialCentralFunction getIns() {
		if (ins == null) {
			ins = new CrossTrialCentralFunction();
		}
		return ins;
	}

	public void createRobot(int floor, int num, int type) {
		Map<Integer, FloorFightInfo> map = CrossTrialSysCache.getFloorFigthMap().get(floor);
		Map<Long, CrossHeroBaseModel> fightMap = CrossTrialSysCache.getFightMap();
		Map<Integer, List<Long>> matchMap = CrossTrialSysCache.getFloorMatchMap().get(floor);
		if (matchMap == null) {
			matchMap = new HashMap<>();
			CrossTrialSysCache.getFloorMatchMap().put(floor, matchMap);
		}
		long averageStrength = CrossTrialSysCache.getAverageStrength();
//		for(int type=1;type<=3;type++) {
			int[] grap = map.get(type).getGrap();
			List<Long> list = matchMap.get(type);
			if (list == null) {
				list = new ArrayList<>();
				matchMap.put(type, list);
			}
			for(int i=0;i<num;i++) {
				int random = RandomUtil.getRandomNumInAreas(grap[0], grap[1]);
				long strength = averageStrength * random / 100000;
				LogTool.info("CrossHeroBaseRobot strength="+strength+",type="+type+", floor="+floor, this);
				CrossHeroBaseRobot robot = RobotFunction.getIns().createCrossHeroBaseRobotOne(strength);
				fightMap.put(robot.getId(), robot);
				list.add(robot.getId());
			}
//		}
	}

	public void clearAll() {
		CrossTrialSysCache.getStandardMap().clear();
		CrossTrialSysCache.getFightMap().clear();
		CrossTrialSysCache.getFloorMatchMap().clear();
		LogTool.info("CrossTrialCentralFunction clear all", this);
	}

	public void initMatchMap() {
		Map<Integer, Long> standardMap = CrossTrialSysCache.getStandardMap();
		long totalNum = 0;
		int num = 0;
		for (long strength : standardMap.values()) {
			totalNum += strength;
			num++;
		}
		long averageStrength = CrossTrialSysCache.getAverageStrength();
		if (totalNum > 0) {
			averageStrength = totalNum / num;
		}
		if (averageStrength == 0) {
			averageStrength = 100000000;
		}
		CrossTrialSysCache.setAverageStrength(averageStrength);
		Map<Long, CrossHeroBaseModel> fightMap = CrossTrialSysCache.getFightMap();
		Map<Integer, Map<Integer, List<Long>>> floorMatchMap = CrossTrialSysCache.getFloorMatchMap();
		Map<Integer, Map<Integer, FloorFightInfo>> floorFigthMap = CrossTrialSysCache.getFloorFigthMap();
		Iterator<Entry<Integer, Map<Integer, FloorFightInfo>>> iterator = floorFigthMap.entrySet().iterator();
		for (; iterator.hasNext();) {
			Entry<Integer, Map<Integer, FloorFightInfo>> entry = iterator.next();
			Integer floor = entry.getKey();
			Map<Integer, List<Long>> matchMap = floorMatchMap.get(floor);
			if (matchMap == null) {
				matchMap = new HashMap<>();
				floorMatchMap.put(floor, matchMap);
			}
			Map<Integer, FloorFightInfo> map = entry.getValue();
			for (int type : map.keySet()) {
				List<Long> list = matchMap.get(type);
				if (list == null) {
					list = new ArrayList<>();
					matchMap.put(type, list);
				}
				FloorFightInfo floorFightInfo = map.get(type);
				int[] grap = floorFightInfo.getGrap();
				long minStrength = averageStrength * grap[0] / 100000;
				long maxStrength = averageStrength * grap[1] / 100000;
				for (CrossHeroBaseModel model : fightMap.values()) {
					long totalStrength = model.getTotalStrength();
					if (totalStrength >= (minStrength) && totalStrength <= (maxStrength)) {
						list.add(model.getId());
					}
				}
			}
		}
	}

}
