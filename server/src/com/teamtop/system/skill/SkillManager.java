package com.teamtop.system.skill;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.achievement.AchievementEnum;
import com.teamtop.system.achievement.AchievementFunction;
import com.teamtop.system.battle.BattleConst;
import com.teamtop.system.boss.monsterGod.MonsterGodFunction;
import com.teamtop.system.boss.qmboss.QMBossFunction;
import com.teamtop.system.chuangGuanYouLi.ChuangGuanYouLiFunction;
import com.teamtop.system.crossBoss.CrossBossFunction;
import com.teamtop.system.crossRebornFB.RebornFBFunction;
import com.teamtop.system.crossSJMiJing.CrossSJMiJingFunction;
import com.teamtop.system.crossTeamFuBen.CrossTeamFubenFunction;
import com.teamtop.system.daytask.DayTaskConst;
import com.teamtop.system.daytask.DayTaskFunction;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.FightCalcConst;
import com.teamtop.system.hero.FightCalcFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.liuChuQiShan.LiuChuQiShanConst;
import com.teamtop.system.liuChuQiShan.LiuChuQiShanFunction;
import com.teamtop.system.qice.QiCeConst;
import com.teamtop.system.qice.model.QiCe;
import com.teamtop.system.skill.model.SkillInfo;
import com.teamtop.system.task.TaskUserConst;
import com.teamtop.system.task.TaskUserFunction;
import com.teamtop.system.threeHeroFightLvBu.ThreeHeroFightLvBuFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_buff_011;
import excel.config.Config_godskill_210;
import excel.config.Config_skill_210;
import excel.config.Config_skillstart_210;
import excel.config.Config_xiaohao_210;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_buff_011;
import excel.struct.Struct_godskill_210;
import excel.struct.Struct_skill_210;
import excel.struct.Struct_skillstart_210;
import excel.struct.Struct_xiaohao_210;

public class SkillManager {

	private static SkillManager skillManager;
	
	private SkillManager() {
	}
	
	public static synchronized SkillManager getIns() {
		if(skillManager==null) {
			skillManager = new SkillManager();
		}
		return skillManager;
	}
	
	/**
	 * 开启技能位置
	 * @param hero
	 * @param passCheckPoint 通过关卡数量
	 */
	public void openSkillSite(Hero hero, int passCheckPoint) {
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
			for(int i=0;i<size;i++) {
				info = sortList.get(i);
				if(passCheckPoint>=info.getStart()&&(!skillMap.containsKey(info.getId()))) {
					List<Struct_skill_210> jobSkillList = SkillCache.getJobSkillList(skillJob);
					Struct_skill_210 skill = jobSkillList.get(info.getStart()-1);
					skillMap.put(info.getId(), new SkillInfo(skill.getId(),1,0));
				}
			}
			FightCalcFunction.setRecalcAll(hero,FightCalcConst.SKILL_OPEN,SystemIdConst.GodSkill_SYSID);
			return;
		} catch (Exception e) {
			LogTool.error(e, SkillManager.class, "openSkill heroid="+hero.getId());
		}
	}
	
	/**
	 * 升级技能
	 * @param hero
	 * @param skillId
	 */
	public void upgradeSkill(Hero hero, int skillId) {
		if(hero==null) {
			return;
		}
		try {
			long hid = hero.getId();
			Map<Integer, SkillInfo> skillMap = hero.getSkill().getSkillMap();
//			int site = SkillFunction.getIns().getSkillSite(hero, skillId);
//			if(site<0) {
//				SkillSender.sendCmd_622(hid, 0, 1);//未开启该技能
//				return;
//			}
			int job = hero.getJob();
			int skillJob = job;
			if(job>1000) {
				skillJob = job/1000;
			}
			List<Struct_skill_210> jobSkillList = SkillCache.getJobTypeSkillList(skillJob, SkillConst.TYPE_2);
			int size = jobSkillList.size();
			Struct_skill_210 skillData = null;
			int site = 0;
			for(int i=0;i<size;i++) {
				site = i+1;
				skillData = jobSkillList.get(i);
				if(skillData.getId()==skillId) {
					break;
				}
			}
			if(site<SkillConst.skiil_site_1||site>SkillConst.skiil_site_3) {
				return;
			}
			if(!skillMap.containsKey(site)) {
				SkillSender.sendCmd_622(hid, 0, 1);//未开启该技能
				return;
			}
			int heroLevel = hero.getRealLevel();
			SkillInfo skill = skillMap.get(site);
			int nowLevel = skill.getLevel();
			if(nowLevel>=heroLevel) {
				SkillSender.sendCmd_622(hid, 0, 2);//当前最高等级与角色等级一致
				return;
			}
			int newLevel = nowLevel + 1;
			List<Struct_xiaohao_210> sortList = Config_xiaohao_210.getIns().getSortList();
			int maxLevel = sortList.get(sortList.size()-1).getDengji();
			if(nowLevel>=maxLevel) {
				SkillSender.sendCmd_622(hid, 0, 3);//已达最高等级
				return;
			}
			Map<Integer, Struct_xiaohao_210> map = Config_xiaohao_210.getIns().getMap();
			int costNum = map.get(nowLevel).getXiaohao();
			if(!UseAddUtil.canUse(hero, GameConst.COIN, costNum)) {
				SkillSender.sendCmd_622(hid, 0, 4);//消耗物品不足
				return;
			}
			UseAddUtil.use(hero, GameConst.COIN, costNum, SourceGoodConst.SKILL_UPGRADE, true);
			skill.setLevel(newLevel);
			skillMap.put(site, skill);
			SkillSender.sendCmd_622(hid, 1, skillId);
			LogTool.info(hid, hero.getName(), "skillId="+skillId+", newLevel="+newLevel, SkillManager.class);
			//重算战力
			FightCalcFunction.setRecalcAll(hero, FightCalcConst.SKILL_LVUP,SystemIdConst.GodSkill_SYSID);
			//任务
			TaskUserFunction.getIns().reshTaskUser(hero, TaskUserConst.TASK_TYPE_9, 0);
			//转生红点
			//HeroFunction.getIns().loginRebornUpReadPoint(hero,false);
			//每日任务
			DayTaskFunction.getIns().successDayTaskType(hero, DayTaskConst.DATTASK_TYPE4);
			//闯关有礼
			ChuangGuanYouLiFunction.getIns().checkRed(hero, 2);
			// 成就
			AchievementFunction.getIns().checkTask(hero, AchievementEnum.GOAL_2, 0);
		} catch (Exception e) {
			LogTool.error(e, SkillManager.class, "upgradeSkill heroid="+hero.getId()+", skillId:"+skillId);
		}
	}
	
	/**
	 * 一键升级
	 * @param hero
	 */
	public void upgradeAll(Hero hero) {
		if(hero==null) {
			return;
		}
		try {
			long hid = hero.getId();
			Map<Integer, SkillInfo> skillMap = hero.getSkill().getSkillMap();
			int opCount = 0;//记录标识 防止死循环
			Set<Integer> passSet = new HashSet<>();
			singleUpgradeHandle(hero, skillMap, opCount, passSet);
			StringBuilder logInfo = new StringBuilder();
			List<Object[]> data = new ArrayList<Object[]>();
			for(int i=SkillConst.skiil_site_1;i<=SkillConst.skiil_site_3;i++) {
				SkillInfo skill = skillMap.get(i);
				if(skill==null) {
					continue;
				}
				data.add(new Object[] {skill.getId(), skill.getLevel()});
				logInfo.append("site=").append(i).append(" skillId=").append(skill.getId()).append(", level=").append(skill.getLevel()).append("|");
			}
			HeroFunction.getIns().sendChange120(hero, GameConst.huobiMap.get(GameConst.COIN), hero.getCoin());
			SkillSender.sendCmd_626(hid, 1, data.toArray());
			//重算战力
			FightCalcFunction.setRecalcAll(hero, FightCalcConst.SKILL_LVUP,SystemIdConst.GodSkill_SYSID);
			if(logInfo.length()>0) {				
				logInfo.setLength(logInfo.length()-1);
			}
			LogTool.info(hid, hero.getName(), logInfo.toString(), SkillManager.class);
			//任务
			TaskUserFunction.getIns().reshTaskUser(hero, TaskUserConst.TASK_TYPE_9, 0);
			//转生红点
			//HeroFunction.getIns().loginRebornUpReadPoint(hero,false);
			//每日任务
			DayTaskFunction.getIns().successDayTaskType(hero, DayTaskConst.DATTASK_TYPE4);
			//闯关有礼
			ChuangGuanYouLiFunction.getIns().checkRed(hero, 2);
			// 成就
			AchievementFunction.getIns().checkTask(hero, AchievementEnum.GOAL_2, 0);
		} catch (Exception e) {
			LogTool.error(e, SkillManager.class, "upgradeAll heroid="+hero.getId());
		}
	}
	
	/**
	 * 一键升级处理
	 * @param hero
	 * @param skillMap
	 * @param opCount
	 */
	private void singleUpgradeHandle(Hero hero, Map<Integer, SkillInfo> skillMap, int opCount, Set<Integer> passSet) {
		if(opCount>=1000) {
			return;
		}
		if (passSet.size() == 3) {
			return;
		}
		opCount += 1;
		//获取优先升级的技能
		int site = -1;
		int minLevel = 0;
		int same = 0;
		for(int i=SkillConst.skiil_site_1;i<=SkillConst.skiil_site_3;i++) {
			if (passSet.contains(i)) {
				continue;
			}
			SkillInfo skill = skillMap.get(i);
			if(skill==null) {
				continue;
			}
			int skillLevel = skill.getLevel();
			if(minLevel==0) {
				minLevel = skillLevel;
				site = i;
			}else if(minLevel>skillLevel) {
				minLevel = skillLevel;
				site = i;
			}else if(minLevel==skillLevel) {
				same += 1;
			}
		}
		if(same==2) {
			site = SkillConst.skiil_site_1;
		}
		if(site==-1) {
			return;
		}
		//开始升级
		int heroLevel = hero.getRealLevel();
		SkillInfo skillInfo = skillMap.get(site);
		int nowLevel = skillInfo.getLevel();
		if(nowLevel>=heroLevel) {
			passSet.add(site);
			singleUpgradeHandle(hero, skillMap, opCount, passSet);
			return;
		}
		int newLevel = nowLevel + 1;
		List<Struct_xiaohao_210> sortList = Config_xiaohao_210.getIns().getSortList();
		int maxLevel = sortList.get(sortList.size()-1).getDengji();
		if(nowLevel>=maxLevel) {
			passSet.add(site);
			singleUpgradeHandle(hero, skillMap, opCount, passSet);
			return;
		}
		Map<Integer, Struct_xiaohao_210> map = Config_xiaohao_210.getIns().getMap();
		int costNum = map.get(nowLevel).getXiaohao();
		if(!UseAddUtil.canUse(hero, GameConst.COIN, costNum)) {
			passSet.add(site);
			singleUpgradeHandle(hero, skillMap, opCount, passSet);
			return;
		}
		UseAddUtil.use(hero, GameConst.COIN, costNum, SourceGoodConst.SKILL_UPGRADE, false, false);
		skillInfo.setLevel(newLevel);
		skillMap.put(site, skillInfo);
		singleUpgradeHandle(hero, skillMap, opCount, passSet);
		//任务
		TaskUserFunction.getIns().reshTaskUser(hero, TaskUserConst.TASK_TYPE_9, 0);
		// 成就
		AchievementFunction.getIns().checkTask(hero, AchievementEnum.GOAL_2, 0);
	}
	
	/**
	 * 升级阵眼
	 * @param hero
	 * @param skillId
	 */
	public void upgradePhotoCenter(Hero hero, int photoCenterId) {
		if(hero==null) {
			return;
		}
		try {
			long hid = hero.getId();
			Set<Integer> photoCenterSet = hero.getSkill().getPhotoCenterSet();
			if(photoCenterSet==null) {
				SkillSender.sendCmd_624(hid, 0, 1, 0);//神技系统未开
				return;
			}
			if(!photoCenterSet.contains(photoCenterId)) {
				return;
			}
			Map<Integer, Struct_godskill_210> map = Config_godskill_210.getIns().getMap();
			Struct_godskill_210 center = map.get(photoCenterId);
			int nextPhotoCenterId = center.getNext();
			if(nextPhotoCenterId==0) {
				SkillSender.sendCmd_624(hid, 0, 2, 0);//已达最高等级
				return;
			}
			if(!map.containsKey(nextPhotoCenterId)) {
				SkillSender.sendCmd_624(hid, 0, 3, 0);//等级参数不存在
				return;
			}
			int[][] consume = center.getConsume();
			if(!UseAddUtil.canUse(hero, consume)) {
				return;
			}
			UseAddUtil.use(hero, consume, SourceGoodConst.PHOTOCENTER_UPGRADE, true);
			photoCenterSet.remove(photoCenterId);
			photoCenterSet.add(nextPhotoCenterId);
			FightCalcFunction.setRecalcAll(hero, FightCalcConst.GOD_SKILL,SystemIdConst.GodSkill_SYSID);
			SkillSender.sendCmd_624(hid, 1, nextPhotoCenterId, photoCenterId);
		} catch (Exception e) {
			LogTool.error(e, SkillManager.class, "upgradeAll heroid="+hero.getId());
		}
	}
	/**
	 * 使用界面技能
	 * @param hero
	 * @param type 技能（1 宝物1 2 宝物2 3怒气 4天书）
	 * @param sysid
	 */
	public void useSkill(Hero hero, int type, int sysid) {
		try {
			if(!hero.getSkill().getSkillMap().containsKey(type)) {
				LogTool.warn("type null:"+type, SkillManager.class);
				return;
			}
			if(type==3) {
				type = 4;
			} else if (type == 4) {
				type = SkillConst.skiil_site_7;// 前端天书传4强转为7
			}
			if (type==1) {
				type=SkillConst.skiil_site_6;
			}
			if (type==2) {
				type=SkillConst.skiil_site_5;
				
			}
			SkillInfo skillInfo=hero.getSkill().getSkillMap().get(type);
			if (skillInfo.getId()==0||skillInfo.getLevel()==0) {
				LogTool.warn("skillInfo.getId()==0||getLevel()==0:"+type, SkillManager.class);
				return;
			}
			int cd=30000;
			int cdCutDown = hero.getFinalFightAttr().getCdCutDown();
			if (type==SkillConst.skiil_site_5||type==SkillConst.skiil_site_6) {
				cd=Config_xtcs_004.getIns().get(BattleConst.TREASURE_CD).getNum()*1000;
				cd-=cdCutDown;
			}
			if (type==SkillConst.skiil_site_7) {
				cd=Config_xtcs_004.getIns().get(BattleConst.GODBOOK_CD).getNum()*1000;
				cd-=cdCutDown;
			}
			long currentTime = TimeDateUtil.getCurrentTimeInMillis();
			if (currentTime-skillInfo.getTime()<cd) {
				LogTool.warn(hero.getId()+" <cd:"+type+" sysid:"+sysid, SkillManager.class);//TODO 感觉可以去掉
				return;
			}
			skillInfo.setTime(currentTime);
			
			double skillHurt=SkillFunction.getIns().getSkillHurt(hero,skillInfo);
			switch (sysid) {
			case SystemIdConst.FUN_MONSTER_GOD:
				//魔神吕布
				MonsterGodFunction.getIns().skillAttBoss(skillHurt, hero);
				break;
			case SystemIdConst.FUN_QM_BOSS:
				//全民boss
				QMBossFunction.getIns().skillQMBoss(skillHurt, hero);
				break;
			case SystemIdConst.FUN_CROSS_BOSS_MH:
				//跨服boss 七擒孟获
				CrossBossFunction.getIns().skillAttBoss(skillHurt, hero);
				break;
			case SystemIdConst.FUN_CROSS_TEAM_FU_BEN:
				//跨服组队副本
				CrossTeamFubenFunction.getIns().skillAttBoss(skillHurt, hero);
				break;
			case SystemIdConst.CROSS_S_J_MI_JING:
				//升阶秘境
				CrossSJMiJingFunction.getIns().skillAttBoss(skillHurt, hero);
				break;
			case SystemIdConst.REBORN_FB:
				//轮回副本
				RebornFBFunction.getIns().skillAttBoss(skillHurt, hero);
				break;
			case LiuChuQiShanConst.sysId:
				if (type == SkillConst.skiil_site_4) {
					//六出祁山
					LiuChuQiShanFunction.getIns().skillAttBoss(0,skillHurt, hero);
				}else if (type==SkillConst.skiil_site_5||type==SkillConst.skiil_site_6) {
					//六出祁山 加血 设置无敌 将对面变形 生效
					Struct_skill_210 skill_210= Config_skill_210.getIns().get(skillInfo.getId());
					
					if (skill_210!=null&&skill_210.getHdxg()>0) {
							int effectType = skill_210.getHdxg();
							int starLve = skillInfo.getLevel();
							if (effectType == 1) {
								// 加血
								long hpMax = hero.getFinalFightAttr().getHpMax();
								int addTime = skill_210.getAttpg() * starLve;
								double addHp = hpMax * (skill_210.getAttp() + addTime) / 100000;
								LiuChuQiShanFunction.getIns().skillAttBoss(1,addHp, hero);
								
							} else if (effectType == 2) {
								// 设置无敌状态 以及时间
								int addTime = skill_210.getAttp()+skill_210.getAttpg()*starLve;
								LiuChuQiShanFunction.getIns().skillAttBoss(2,addTime, hero);
							} else  if(effectType == 3) {
								// 设置无敌状态 以及时间
								int addTime = skill_210.getAttp()+skill_210.getAttpg()*starLve;
								LiuChuQiShanFunction.getIns().skillAttBoss(3,addTime, hero);
							}
					} else if (skill_210 != null && skill_210.getHdxg() == 0) {
						// 宝物伤害
						LiuChuQiShanFunction.getIns().skillAttBoss(0, skillHurt, hero);
					}
				} else if (type == SkillConst.skiil_site_8) {
					// 爆气
					QiCe qiCe = hero.getQiCe();
					if (qiCe == null) {
						return;
					}
					Struct_buff_011 struct_buff_011 = Config_buff_011.getIns().get(QiCeConst.index);
					// 设置减伤状态 以及时间
					int addTime = struct_buff_011.getShijian();
					LiuChuQiShanFunction.getIns().skillAttBoss(4, addTime, hero);
				} else if (type == SkillConst.skiil_site_7) {
					// 天书伤害
					LiuChuQiShanFunction.getIns().skillAttBoss(0, skillHurt, hero);
				}
				break;
			case SystemIdConst.THREE_HERO_FIGHT_LVBU:
				ThreeHeroFightLvBuFunction.getIns().useSkill(hero, type, skillInfo, skillHurt);
				break;
			default:
				break;
			}
		} catch (Exception e) {
			LogTool.error(e, SkillManager.class, "useSkill heroid="+hero.getId());
		}
		
	}
	
}
