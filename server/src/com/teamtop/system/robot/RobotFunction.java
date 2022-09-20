package com.teamtop.system.robot;

import com.teamtop.cross.upload.CrossHeroBaseModel;
import com.teamtop.system.hero.FightAttrFunction;
import com.teamtop.system.hero.FinalFightAttr;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.setting.model.SettingData;
import com.teamtop.system.skill.model.Skill;
import com.teamtop.system.wujiang.WuJiangModel;
import com.teamtop.util.ProbabilityEvent.RandomUtil;
import com.teamtop.util.clone.CloneUtils;
import com.teamtop.util.illiegalUtil.IlliegalUtil;
import com.teamtop.util.log.LogTool;

import excel.config.Config_hero_211;
import excel.struct.Struct_hero_211;

public class RobotFunction {

	private static RobotFunction robotFunction;

	private RobotFunction() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized RobotFunction getIns() {
		if (robotFunction == null) {
			robotFunction = new RobotFunction();
		}
		return robotFunction;
	}

	/**
	 * 创建机器人
	 * 
	 * @param hero
	 * @param addition 战斗属性加成百分比
	 * @return
	 */
	public RobotModel createRobotCopyHero(Hero hero, Integer... addition) {
		RobotModel robot = new RobotModel();
		int percent = 1;
		int addtionValue = 1;
		if (addition != null && addition.length > 0) {
			addtionValue = addition[0];
			percent = 100;
		}
		try {
			robot.setUid(RobotUidCreator.getUid());

			String rankName = IlliegalUtil.rankName();
			robot.setName(rankName);
			robot.setLevel(hero.getLevel());
			robot.setRebornlv(hero.getRebornlv());

			robot.setJob(hero.getJob());
			robot.setCountryType(hero.getCountryType());

			SettingData settingData = hero.getSettingData();
			robot.setIcon(settingData.getIcon());
			robot.setFrame(settingData.getFrame());

			robot.setTotalStrength(hero.getTotalStrength() * addtionValue / percent);
			// 复制战斗属性
			FinalFightAttr finalFightAttr = hero.getFinalFightAttr();
			FinalFightAttr attrCopy = (FinalFightAttr) CloneUtils.deepClone(finalFightAttr);
			FightAttrFunction.resetAttr(finalFightAttr, addtionValue, percent);
			robot.setFinalFightAttr(attrCopy);

			Skill skill = hero.getSkill();
			Skill skillCopy = (Skill) CloneUtils.deepClone(skill);
			robot.setSkill(skillCopy);
		} catch (Exception e) {
			LogTool.error(e, RobotFunction.class, "");
		}
		return robot;
	}
	
	/**
	 * 创建跨服战斗属性机器人
	 * 
	 * @param hero
	 * @param addition
	 *            战斗属性加成百分比
	 * @return
	 */
	public CrossHeroBaseRobot createCrossHeroBaseRobot(Hero hero, Integer... addition) {
		CrossHeroBaseRobot robot = new CrossHeroBaseRobot();
		int percent = 1;
		int addtionValue = 1;
		if (addition != null && addition.length > 0) {
			addtionValue = addition[0];
			percent = 100;
		}
		try {
			robot.setId(RobotUidCreator.getUid());

			String rankName = IlliegalUtil.rankName();
			robot.setName(rankName);
			robot.setNameZoneid(rankName);

			robot.setLevel(hero.getLevel());
			robot.setRebornlv(hero.getRebornlv());
			robot.setJob(hero.getJob());
			robot.setCountryType(hero.getCountryType());
			robot.setZoneid(hero.getZoneid());
			robot.setGangId(hero.getGangId());
			robot.setGangName(hero.getGangName());

			SettingData settingData = hero.getSettingData();
			robot.setIcon(settingData.getIcon());
			robot.setFrame(settingData.getFrame());
			robot.setOfficial(hero.getOfficial());
			// robot.setTitleId(hero.getTitleId());

			robot.setTotalStrength(hero.getTotalStrength() * addtionValue / percent);
			// 复制战斗属性
			FinalFightAttr finalFightAttr = hero.getFinalFightAttr();
			FinalFightAttr attrCopy = (FinalFightAttr) CloneUtils.deepClone(finalFightAttr);
			FightAttrFunction.resetAttr(attrCopy, addtionValue, percent);
			int type=hero.getJob();
			if (hero.getJob()>1000) {
				type=type/1000;
			}
			Struct_hero_211 struct_hero_211 = Config_hero_211.getIns().get(type);
			attrCopy.setType(struct_hero_211.getPinzhi());
			WuJiangModel wuJiangModel = hero.getWujiang().getWujiangs().get(type);
			attrCopy.setStar(wuJiangModel.getStar());
			attrCopy.setUid(robot.getId());
			robot.setFinalFightAttr(attrCopy);

			Skill skill = hero.getSkill();
			Skill skillCopy = (Skill) CloneUtils.deepClone(skill);
			robot.setSkill(skillCopy);
		} catch (Exception e) {
			LogTool.error(e, RobotFunction.class, "");
		}
		return robot;
	}
	
	/**
	 * 创建跨服机器人（外观战斗属性之后再设置）
	 * step 1
	 * @return
	 */
	public CrossHeroBaseRobot createCrossHeroBaseRobotOne(long strength) {
		CrossHeroBaseRobot robot = new CrossHeroBaseRobot();
		try {
			robot.setId(RobotUidCreator.getUid());

			String rankName = IlliegalUtil.rankName();
			robot.setName(rankName);
			robot.setNameZoneid(rankName);
			robot.setTotalStrength(strength);

//			robot.setLevel(hero.getLevel());
//			robot.setRebornlv(hero.getRebornlv());
//			robot.setJob(hero.getJob());
//			robot.setCountryType(hero.getCountryType());
//			robot.setZoneid(hero.getZoneid());
//			robot.setGangId(hero.getGangId());
//			robot.setGangName(hero.getGangName());
//
//			SettingData settingData = hero.getSettingData();
//			robot.setIcon(settingData.getIcon());
//			robot.setFrame(settingData.getFrame());
//			robot.setOfficial(hero.getOfficial());
//			// robot.setTitleId(hero.getTitleId());
//
//			// 复制战斗属性
//			FinalFightAttr finalFightAttr = hero.getFinalFightAttr();
//			FinalFightAttr attrCopy = (FinalFightAttr) CloneUtils.deepClone(finalFightAttr);
//			FightAttrFunction.resetAttr(attrCopy, addtionValue, percent);
//			int type=hero.getJob();
//			if (hero.getJob()>1000) {
//				type=type/1000;
//			}
//			Struct_hero_211 struct_hero_211 = Config_hero_211.getIns().get(type);
//			attrCopy.setType(struct_hero_211.getPinzhi());
//			WuJiangModel wuJiangModel = hero.getWujiang().getWujiangs().get(type);
//			attrCopy.setStar(wuJiangModel.getStar());
//			attrCopy.setUid(robot.getId());
//			robot.setFinalFightAttr(attrCopy);
//
//			Skill skill = hero.getSkill();
//			Skill skillCopy = (Skill) CloneUtils.deepClone(skill);
//			robot.setSkill(skillCopy);
		} catch (Exception e) {
			LogTool.error(e, RobotFunction.class, "createCrossHeroBaseRobotOne");
		}
		return robot;
	}

	/**
	 * 镜像玩家外观，战力属性跟进机器人的战力来调整
	 * step 2
	 * @param hero
	 * @param robot
	 */
	public void setViewAndFightAttrTwo(Hero hero, CrossHeroBaseModel robot) {
		try {
			long robotTotalStrength = robot.getTotalStrength();
			long totalStrength = hero.getTotalStrength();
			double addition = ((double) robotTotalStrength) * 100 / totalStrength;
			int percent = 100;
			robot.setLevel(hero.getLevel());
			robot.setRebornlv(hero.getRebornlv());
			robot.setJob(hero.getJob());
			robot.setCountryType(hero.getCountryType());
			int zoneid = hero.getZoneid();
			if (zoneid > 1) {
				zoneid = RandomUtil.getRandomNumInAreas(1, zoneid - 1);
			} else {
				zoneid = RandomUtil.getRandomNumInAreas(1, 10);
			}
			robot.setZoneid(zoneid);
			robot.setNameZoneid(robot.getName() + ".S" + zoneid);
			robot.setGangId(hero.getGangId());
			robot.setGangName(hero.getGangName());

			SettingData settingData = hero.getSettingData();
			robot.setIcon(settingData.getIcon());
			robot.setFrame(settingData.getFrame());
			robot.setOfficial(hero.getOfficial());
			// robot.setTitleId(hero.getTitleId());

			// 复制战斗属性
			FinalFightAttr finalFightAttr = hero.getFinalFightAttr();
			FinalFightAttr attrCopy = (FinalFightAttr) CloneUtils.deepClone(finalFightAttr);
			FightAttrFunction.resetAttr(attrCopy, (int) addition, percent);
			int type = hero.getJob();
			if (hero.getJob() > 1000) {
				type = type / 1000;
			}
			Struct_hero_211 struct_hero_211 = Config_hero_211.getIns().get(type);
			attrCopy.setType(struct_hero_211.getPinzhi());
			WuJiangModel wuJiangModel = hero.getWujiang().getWujiangs().get(type);
			attrCopy.setStar(wuJiangModel.getStar());
			attrCopy.setUid(robot.getId());
			robot.setFinalFightAttr(attrCopy);

			Skill skill = hero.getSkill();
			Skill skillCopy = (Skill) CloneUtils.deepClone(skill);
			robot.setSkill(skillCopy);
		} catch (Exception e) {
			LogTool.error(e, RobotFunction.class, "setViewAndFightAttrTwo");
		}
	}

}
