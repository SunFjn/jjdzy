package com.teamtop.system.skill;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.util.cache.union.UC;

import excel.config.Config_skill_210;
import excel.struct.Struct_skill_210;

public class SkillCache extends AbsServerEvent {
	
	private static Map<Integer, List<Struct_skill_210>> jobSkillMap = UC.reg("jobSkillMap", new HashMap<Integer, List<Struct_skill_210>>());

	public static Map<Integer, List<Struct_skill_210>> getJobSkillMap() {
		return jobSkillMap;
	}
	
	public static List<Struct_skill_210> getJobSkillList(int job) {
		List<Struct_skill_210> list = jobSkillMap.get(job);
		return list;
	}
	
	/**
	 * @param job
	 *            职业
	 * @param type
	 *            类型：1 普攻，2 技能，3 神技，4 宝物，5 天书
	 **/
	public static List<Struct_skill_210> getJobTypeSkillList(int job, int type) {
		List<Struct_skill_210> list = jobSkillMap.get(job);
		List<Struct_skill_210> typeList = new ArrayList<>();
		for (Struct_skill_210 skill : list) {
			if (skill.getType() == type) {
				typeList.add(skill);
			}
		}
		return typeList;
	}

	@Override
	public void initExcel() throws RunServerException {
		jobSkillMap.clear();
		List<Struct_skill_210> sortList = Config_skill_210.getIns().getSortList();
		for(Struct_skill_210 skillObj : sortList) {
			int job = skillObj.getJob();
			List<Struct_skill_210> list = jobSkillMap.get(job);
			if(list==null) {
				list = new ArrayList<>();
				jobSkillMap.put(job, list);
			}
			list.add(skillObj);
		}
	}

	@Override
	public void startServer() throws RunServerException {
		// TODO Auto-generated method stub
		
	}

}
