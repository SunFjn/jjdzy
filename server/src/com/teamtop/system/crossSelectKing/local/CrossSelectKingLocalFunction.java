package com.teamtop.system.crossSelectKing.local;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Optional;

import com.teamtop.cross.CrossCache;
import com.teamtop.gameCommon.GameProperties;
import com.teamtop.system.crossSelectKing.cross.CrossSelectKing;
import com.teamtop.system.crossSelectKing.cross.CrossSelectKingInfo;
import com.teamtop.system.hero.FightAttrFunction;
import com.teamtop.system.hero.FinalFightAttr;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.skill.model.Skill;
import com.teamtop.system.skill.model.SkillInfo;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;

public class CrossSelectKingLocalFunction {
	
	private static CrossSelectKingLocalFunction ins;
	public static CrossSelectKingLocalFunction getIns() {
		if(ins == null) {
			ins = new CrossSelectKingLocalFunction();
		}
		return ins;
	}
	
	
	public Object[] getFinalAtt(FinalFightAttr finalFightAttr) {
		List<Object[]> attrSendData = FightAttrFunction.createAttrSendData(finalFightAttr);
		Object[] attr=attrSendData.toArray();
		return attr;
	}
	
	public Object[][] getKillInfo(Hero hero, CrossSelectKing model) {
		List<Object[]> skillData = new ArrayList<Object[]>();
		List<Object[]> skillData130 = new ArrayList<Object[]>();
		Skill skill = model.getSkill();
		Map<Integer, Integer> skillHurtAddMap = HeroFunction.getIns().getSkillHurtAddMap(hero, model.getHid(),
				model.getGodSkillLevel(), model.getJob());
		if (skill!=null) {
			for(Entry<Integer, SkillInfo> entry:skill.getSkillMap().entrySet()){
				int index=entry.getKey();
				SkillInfo skillInfo=entry.getValue();
				skillData.add(new Object[]{index,skillInfo.getId(),skillInfo.getLevel()});
				Integer skillHurtAdd = Optional.ofNullable(skillHurtAddMap).map(mapper -> mapper.get(skillInfo.getId()))
						.orElse(0);
				skillData130.add(new Object[] { index, skillInfo.getId(), skillInfo.getLevel(), skillHurtAdd });
			}
		}
		Object[] skillinfo=skillData.toArray();
		Object[] skillinfo130 = skillData130.toArray();
		return new Object[][] { skillinfo, skillinfo130 };
	}
	
	/**
	 * 通知状态
	 * @author lobbyer
	 * @param type
	 * @date 2016年8月22日
	 */
	public void notice(){
		try {
			CrossSelectKingInfo kingInfo=CrossSelectKingLocalCache.getKingInfo();
			Map<Long, Hero> heroMap = HeroCache.getHeroMap();
			for(Hero hero:heroMap.values()) {
				if(!HeroFunction.getIns().isOnline(hero.getId())) continue;
				CrossSelectKingSender.sendCmd_2100(hero.getId(), kingInfo.getState(), kingInfo.getProFlag(), kingInfo.getProState());
			}
		} catch (Exception e) {
			LogTool.error(e, "notice Exception!");
		}
	}
	
	public void rest(Hero hero) {
		CrossSelectKingLocal crossSelectKingLocal=new CrossSelectKingLocal();
		crossSelectKingLocal.setHid(hero.getId());
		crossSelectKingLocal.setReward(0);
		crossSelectKingLocal.setMobai(0);
		if (CrossSelectKingLocalCache.getKingInfo()!=null) {
			crossSelectKingLocal.setTrem(CrossSelectKingLocalCache.getKingInfo().getTerm());
			int num=0;
			int partId = CrossCache.getlocalPartId();
			Map<Integer, Map<Integer, Long>> winIdMap = CrossSelectKingLocalCache.getKingInfo().getWinIdMap();
			Map<Integer, Long> chamPoin = winIdMap.get(partId);
			if (chamPoin == null) {
				chamPoin = new HashMap<>();
				winIdMap.put(partId, chamPoin);
			}
			if (winIdMap != null) {
				for (int key : chamPoin.keySet()) {
					long championHid = chamPoin.get(key);
					int zoid = CommonUtil.getZoneIdById(championHid);
					if (GameProperties.zoneids.contains(zoid)) {
						num++;
				  }
				}
			}
			crossSelectKingLocal.setReward(num);
		}
		hero.setCrossSelectKingLocal(crossSelectKingLocal);
	}
	

}
