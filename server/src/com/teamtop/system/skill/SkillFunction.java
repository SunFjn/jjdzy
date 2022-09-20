package com.teamtop.system.skill;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import com.teamtop.system.godWeapon.GodWeaponInfo;
import com.teamtop.system.hero.FightCalcConst;
import com.teamtop.system.hero.FightCalcFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.littleLeader.LittleLeaderModel;
import com.teamtop.system.skill.model.SkillInfo;
import com.teamtop.util.log.LogTool;

import excel.config.Config_sb_750;
import excel.config.Config_sbzs_750;
import excel.config.Config_skill_210;
import excel.config.Config_skillstart_210;
import excel.config.Config_son_267;
import excel.struct.Struct_sb_750;
import excel.struct.Struct_sbzs_750;
import excel.struct.Struct_skill_210;
import excel.struct.Struct_skillstart_210;
import excel.struct.Struct_son_267;

public class SkillFunction {
	
	private static SkillFunction skillFunction;
	private SkillFunction() {
		// TODO Auto-generated constructor stub
	}
	public static synchronized SkillFunction getIns() {
		if(skillFunction==null) {
			skillFunction = new SkillFunction();
		}
		return skillFunction;
	}

	/**
	 * 开启技能位置
	 * @param hero
	 * @param passCheckPoint 通过关卡数量
	 */
	public void openSkillSite(Hero hero, int curGuanqia) {
		if(hero==null) {
			return;
		}
		try {
			Map<Integer, SkillInfo> skillMap = hero.getSkill().getSkillMap();
			if(skillMap.containsKey(SkillConst.skiil_site_3)) {
				//已经开通所有位置
				return;
			}
			List<Struct_skillstart_210> sortList = Config_skillstart_210.getIns().getSortList();
			int job = hero.getJob();
			int skillJob = job;
			if(job>1000) {
				skillJob = job/1000;
			}
			int size = sortList.size();
			Struct_skillstart_210 info = null;
			List<Struct_skill_210> jobSkillList = SkillCache.getJobTypeSkillList(skillJob, SkillConst.TYPE_2);
			int site = 0;
			int id = 0;
			for(int i=0;i<size;i++) {
				info = sortList.get(i);
				if (curGuanqia >= info.getStart() && (!skillMap.containsKey(info.getId()))) {
					Struct_skill_210 skill = jobSkillList.get(info.getId() - 1);
					skillMap.put(info.getId(), new SkillInfo(skill.getId(), 1,0));
					site = info.getId();
					id = skill.getId();
					SkillSender.sendCmd_630(hero.getId(), site, id, 1);
				}
			}
			if(id==0) {
				return;
			}
			if(curGuanqia!=1){				
				FightCalcFunction.setRecalcAll(hero,FightCalcConst.SKILL_OPEN,SystemIdConst.GodSkill_SYSID);
			}
		} catch (Exception e) {
			LogTool.error(e, SkillManager.class, "openSkill heroid="+hero.getId());
		}
	}
	
	/**
	 * 检测是否拥有该技能
	 */
	public boolean checkOwnSkill(Hero hero, int skillId) {
		if(hero!=null) {
			Map<Integer, SkillInfo> skillMap = hero.getSkill().getSkillMap();
			Iterator<SkillInfo> iterator = skillMap.values().iterator();
			SkillInfo skill = null;
			for(;iterator.hasNext();) {
				skill = iterator.next();
				if(skill.getId()==skillId) {
					return true;
				}
			}
		}
		return false;
	}
	
	/**
	 * 获取技能位置
	 */
	public int getSkillSite(Hero hero, int skillId) {
		if(hero!=null) {
			Map<Integer, SkillInfo> skillMap = hero.getSkill().getSkillMap();
			Iterator<Integer> iterator = skillMap.keySet().iterator();
			int site = 0;
			SkillInfo skill = null;
			for(;iterator.hasNext();) {
				site = iterator.next();
				skill = skillMap.get(site);
				if(skill.getId()==skillId) {
					return site;
				}
			}
		}
		return -1;
	}

	/**
	 * 转职技能处理
	 * @param hero
	 * @param job
	 */
	public void changeJob(Hero hero, int job) {
		int skillJob = job;
		if(job>1000) {
			skillJob = job/1000;
		}
		List<Struct_skill_210> jobSkillList = SkillCache.getJobTypeSkillList(skillJob, SkillConst.TYPE_2);
		Map<Integer, SkillInfo> skillMap = hero.getSkill().getSkillMap();
		for (int i = SkillConst.skiil_site_1; i <= SkillConst.skiil_site_3; i++) {
			SkillInfo skillInfo = skillMap.get(i);
			if (skillInfo != null) {
				Struct_skill_210 skill = jobSkillList.get(i - 1);
				skillInfo.setId(skill.getId());
			}
		}
	}

	/**
	 * 可操作技能发生变化
	 */
	public void changeSkill(Hero hero,int key,int skill,int level) {
		if(!hero.getSkill().getSkillMap().containsKey(key)) {
			SkillInfo skillInfo=new SkillInfo(skill, level, 0);
			hero.getSkill().getSkillMap().put(key, skillInfo);
		}else {
			hero.getSkill().getSkillMap().get(key).setId(skill);
			hero.getSkill().getSkillMap().get(key).setLevel(level);
		}
	}
	/**
	 * 根据技能算伤害
	 * @param skillInfo
	 * A技能伤害=A攻击*(基础伤害百分比+伤害百分比成长*等级)+基础威力+威力成长*等级
	 * @return
	 */
	public double getSkillHurt(Hero hero,SkillInfo skillInfo) {
		double skillHurt=0;
		double godWeaponAdd = 0;
		// 专属神兵专属加成
		GodWeaponInfo info = hero.getGodWeapon().getWeaponIdByWuJiang().get(hero.getJob()%1000);
		if(info != null) {
			int type = info.getType();
			int taozhuangindex=type*1000+info.getZhuanshuLevel();
			Struct_sbzs_750 struct_sbzs_750 = Config_sbzs_750.getIns().get(taozhuangindex);
			if (struct_sbzs_750!=null) {
				if(struct_sbzs_750.getJineng()[0][0] == skillInfo.getId()) {
					godWeaponAdd = struct_sbzs_750.getJineng()[0][1]/100000d;
				}
			}
		}
		Struct_skill_210 skill_210=Config_skill_210.getIns().get(skillInfo.getId());
		if (skill_210!=null) {
			skillHurt=hero.getFinalFightAttr().getAtt()*(godWeaponAdd + skill_210.getAttp()/100000d+(skill_210.getAttpg()/100000d*skillInfo.getLevel()))+skill_210.getBp()+skill_210.getPg()*skillInfo.getLevel();
		}
		
		return skillHurt;
	}
	/**
	 * 技能总战力
	 * @param hero
	 * @return （3个技能）技能战力=基础战力+成长战力*技能等级
	 */
	public int getThreeSkillStr(Hero hero) {
		int skillStr=0;
		try {
			for (int i = SkillConst.skiil_site_1; i <=SkillConst.skiil_site_3; i++) {
				SkillInfo skillInfo = hero.getSkill().getSkillMap().get(i);
				if (skillInfo!=null&&skillInfo.getId()!=0&&skillInfo.getLevel()!=0) {
				 Struct_skill_210 skill_210 = Config_skill_210.getIns().get(skillInfo.getId());
					if(skill_210!=null) {
						skillStr=skillStr+skill_210.getZlp()+skill_210.getZlg()*skillInfo.getLevel();
					}
				}
				
			}
		} catch (Exception e) {
			LogTool.error(e, SkillFunction.class, "getThreeSkillStr has wrong");
		}
	
		return skillStr;
	}
	/**
	 * 小主主动技能总战力
	 * @param hero
	 * @return
	 */
	public int getLittleLeaderKillStr(Hero hero) {
		int skillStr=0;
		try {
			HashMap<Integer, LittleLeaderModel> hasLittleLeaderModels = hero.getLittleLeader().getHasLittleLeaderModels();
			if (hasLittleLeaderModels!=null) {
				for (LittleLeaderModel littleLeaderModel:hasLittleLeaderModels.values()) {
					int activityKillLv = littleLeaderModel.getActivityKillLv();
					Struct_son_267 struct_son_267 = Config_son_267.getIns().get(littleLeaderModel.getIndex());
					if (struct_son_267!=null) {
						int actKillId=struct_son_267.getSkill()[0][0];
						Struct_skill_210 skill_210 = Config_skill_210.getIns().get(actKillId);
						if(skill_210!=null) {
							skillStr=skillStr+skill_210.getZlp()+skill_210.getZlg()*activityKillLv;
						}
					}
				}
				
			}
		} catch (Exception e) {
			LogTool.error(e, SkillFunction.class, "getLittleLeaderKillStr has wrong");
		}
		return skillStr;
	}
	
	public int getLittleLeaderKillStrByIndex(Hero hero,int index) {
		int skillStr=0;
		try {
			HashMap<Integer, LittleLeaderModel> hasLittleLeaderModels = hero.getLittleLeader().getHasLittleLeaderModels();
			if (hasLittleLeaderModels!=null) {
				LittleLeaderModel littleLeaderModel = hasLittleLeaderModels.get(index);
				if (littleLeaderModel!=null) {
					int activityKillLv = littleLeaderModel.getActivityKillLv();
					Struct_son_267 struct_son_267 = Config_son_267.getIns().get(index);
					if (struct_son_267!=null) {
						int actKillId=struct_son_267.getSkill()[0][0];
						Struct_skill_210 skill_210 = Config_skill_210.getIns().get(actKillId);
						if(skill_210!=null) {
							skillStr=skillStr+skill_210.getZlp()+skill_210.getZlg()*activityKillLv;
						}
					}
				}
			}
		} catch (Exception e) {
			LogTool.error(e, SkillFunction.class, "getLittleLeaderKillStrByIndex has wrong");
		}
		return skillStr;
		
	}
	/**
	 * 普通技能总等级
	 * @param hero
	 * @return
	 */
	public int getMaxNum(Hero hero) {
		int sumNum=0;
		for (int i = SkillConst.skiil_site_1; i <=SkillConst.skiil_site_3; i++) {
			SkillInfo skillInfo = hero.getSkill().getSkillMap().get(i);
			if (skillInfo!=null&&skillInfo.getId()!=0&&skillInfo.getLevel()!=0) {
			 Struct_skill_210 skill_210 = Config_skill_210.getIns().get(skillInfo.getId());
				if(skill_210!=null) {
					sumNum=sumNum+skillInfo.getLevel();
				}
			}
		}
		return sumNum;
	}

	
}
