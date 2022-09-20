package com.teamtop.system.boss.personalBoss;

import java.util.List;
import java.util.Map;

import com.teamtop.system.boss.personalBoss.model.BossInfo;
import com.teamtop.system.hero.Hero;

import excel.config.Config_solo_220;
import excel.struct.Struct_solo_220;

public class PersonalBossFunction {
	
	private static PersonalBossFunction ins;
	public static  PersonalBossFunction getIns(){
		if(ins == null) {
			ins = new PersonalBossFunction();
		}
		return ins;
	}
	
	
	public int getTodayBossNum(Hero hero) {
		int num=0;
		Map<Integer, BossInfo> bossMap = hero.getBoss().getPersonalBoss().getBossMap();
		List<Struct_solo_220> sortList = Config_solo_220.getIns().getSortList();
		int size = sortList.size();
		BossInfo bossInfo = null;
		for (int i = 0; i < size; i++) {
			Struct_solo_220 solo = sortList.get(i);
			int bossId = solo.getId();
			bossInfo = bossMap.get(bossId);
			if (bossInfo == null) {
				continue;
			}
			if (bossInfo.getChallengeNum() >0) {
				num=num+bossInfo.getChallengeNum();
			}
			
		}
		return num;
		
	}
	

}
