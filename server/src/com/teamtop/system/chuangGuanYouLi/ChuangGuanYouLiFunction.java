package com.teamtop.system.chuangGuanYouLi;

import java.util.Map;
import java.util.Set;

import com.teamtop.system.chuangGuanYouLi.model.ChuangGuanYouLi;
import com.teamtop.system.forge.ForgeFunction;
import com.teamtop.system.guanqia.Guanqia;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.system.skill.model.Skill;
import com.teamtop.system.skill.model.SkillInfo;
import com.teamtop.util.log.LogTool;

import excel.config.Config_cgyl_262;
import excel.config.Config_cgylrw_262;
import excel.struct.Struct_cgyl_262;
import excel.struct.Struct_cgylrw_262;

public class ChuangGuanYouLiFunction {
	private static ChuangGuanYouLiFunction ins = null;

	public static ChuangGuanYouLiFunction getIns() {
		if (ins == null) {
			ins = new ChuangGuanYouLiFunction();
		}
		return ins;
	}

	/**
	 * 检查任务是否完成
	 */
	public int checkTask( Hero hero, int taskID) {
		Struct_cgylrw_262 excel = Config_cgylrw_262.getIns().get(taskID);
		if(excel==null) {
			return ChuangGuanYouLiConst.TYPE_AWARD_0;
		}
		int type = excel.getType();
		int cs = excel.getCs();
		switch (type) {
		case ChuangGuanYouLiConst.TASK_TYPE_1:
			return checkGuangQia(hero, cs);
		case ChuangGuanYouLiConst.TASK_TYPE_2:
			return checkStrength(hero, cs);
		case ChuangGuanYouLiConst.TASK_TYPE_3:
			return checkLevel(hero, cs);
		case ChuangGuanYouLiConst.TASK_TYPE_4:
			return checkForgeQiangHua(hero, cs);
		case ChuangGuanYouLiConst.TASK_TYPE_5:
			return checkStar(hero, cs);
		case ChuangGuanYouLiConst.TASK_TYPE_6:
			return checkBaoShi(hero, cs);
		case ChuangGuanYouLiConst.TASK_TYPE_7:
			return checkSkill(hero, cs);
		}
		return ChuangGuanYouLiConst.TYPE_AWARD_0;
	}
	
	/**	 * 检查关卡任务是否达标	 */
	private int checkGuangQia(Hero hero, int param) {
		Guanqia guanqia = hero.getGuanqia();
		int guanQiaIndexHero = guanqia.getCurGuanqia();
		if(param > guanQiaIndexHero) {
			return ChuangGuanYouLiConst.TYPE_AWARD_0;
		}else {
			return ChuangGuanYouLiConst.TYPE_AWARD_1;
		}
	}
	
	/**	 * 检查战力是否达标	 */
	private int checkStrength(Hero hero, int param) {
		long strengthHero = hero.getTotalStrength();
		if(param > strengthHero) {
			return ChuangGuanYouLiConst.TYPE_AWARD_0;
		}else {
			return ChuangGuanYouLiConst.TYPE_AWARD_1;
		}
	}
	
	/**	 * 检查等级是否达标	 */
	private int checkLevel(Hero hero, int param) {
		int level = hero.getRealLevel();
		if(param > level) {
			return ChuangGuanYouLiConst.TYPE_AWARD_0;
		}else {
			return ChuangGuanYouLiConst.TYPE_AWARD_1;
		}
	}
	
	/**	 * 检查全身强化 是否达标	 */
	private int checkForgeQiangHua(Hero hero, int param) {
//		Forge forge = hero.getForge();
//		Map<Integer, Integer> dataAll = forge.getDashi();
//		Integer lvInt = dataAll.get(0);
		int[] dashi=ForgeFunction.getIns().getZhuHunDaShi(hero);
		if(param > dashi[0]) {
			return ChuangGuanYouLiConst.TYPE_AWARD_0;
		}else {
			return ChuangGuanYouLiConst.TYPE_AWARD_1;
		}
	}

	/**	 * 检查全身升星是否达标	 */
	private int checkStar(Hero hero, int param) {
//		Forge forge = hero.getForge();
//		Map<Integer, Integer> dataAll = forge.getDashi();
//		Integer lvInt = dataAll.get(1);
		int[] dashi=ForgeFunction.getIns().getZhuHunDaShi(hero);
		if(param > dashi[2]) {
			return ChuangGuanYouLiConst.TYPE_AWARD_0;
		}else {
			return ChuangGuanYouLiConst.TYPE_AWARD_1;
		}
	}
	
	/**	 * 检查全身宝石是否达标	 */
	private int checkBaoShi(Hero hero, int param) {
//		Forge forge = hero.getForge();
//		Map<Integer, Integer> dataAll = forge.getDashi();
//		Integer lvInt = dataAll.get(2);
		int[] dashi=ForgeFunction.getIns().getZhuHunDaShi(hero);
		if(param > dashi[1]) {
			return ChuangGuanYouLiConst.TYPE_AWARD_0;
		}else {
			return ChuangGuanYouLiConst.TYPE_AWARD_1;
		}
	}

	/**	 * 检查全身技能等级是否达标	 */
	private int checkSkill(Hero hero, int param) {
		Skill skill = hero.getSkill();
		Map<Integer, SkillInfo> skillMap = skill.getSkillMap();
		int lvAll = 0;
		for(SkillInfo temp:skillMap.values()) {
			int level = temp.getLevel();
			lvAll = lvAll + level;
		}
		if(param > lvAll) {
			return ChuangGuanYouLiConst.TYPE_AWARD_0;
		}else {
			return ChuangGuanYouLiConst.TYPE_AWARD_1;
		}
	}
	
	/**
	 * 获取任务进度
	 */
	public int getTaskSchedule( Hero hero, int taskID) {
		Struct_cgylrw_262 excel = Config_cgylrw_262.getIns().get(taskID);
		if(excel==null) {
			return 0;
		}
		int type = excel.getType();
		switch (type) {
		case ChuangGuanYouLiConst.TASK_TYPE_1:
			Guanqia guanqia = hero.getGuanqia();
			int guanQiaIndexHero = guanqia.getCurGuanqia();
			return guanQiaIndexHero;
		case ChuangGuanYouLiConst.TASK_TYPE_2:
			return (int) hero.getTotalStrength();
		case ChuangGuanYouLiConst.TASK_TYPE_3:
			return hero.getRealLevel();
		case ChuangGuanYouLiConst.TASK_TYPE_4:
			int[] dashi=ForgeFunction.getIns().getZhuHunDaShi(hero);
			return dashi[0];
		case ChuangGuanYouLiConst.TASK_TYPE_5:
			dashi=ForgeFunction.getIns().getZhuHunDaShi(hero);
			return dashi[2];
		case ChuangGuanYouLiConst.TASK_TYPE_6:
			dashi=ForgeFunction.getIns().getZhuHunDaShi(hero);
			return dashi[1];
		case ChuangGuanYouLiConst.TASK_TYPE_7:
			Skill skill = hero.getSkill();
			Map<Integer, SkillInfo> skillMap = skill.getSkillMap();
			int lvAll = 0;
			for(SkillInfo temp:skillMap.values()) {
				int level = temp.getLevel();
				lvAll = lvAll + level;
			}
			return lvAll;
		}
		return 0;
	}
	
	/**
	 * 初始化下个目标
	 */
	public void initNextTarget(Hero hero) {
		ChuangGuanYouLi data = hero.getChuangGuanYouLi();
		int targetID = data.getTargetID();
		Map<Integer, Integer> taskMap = data.getTaskMap();
		Map<Integer, Set<Integer>> targerToTaskIDMap = ChuangGuanYouLiCache.getTargetToTaskIDMap();
		Set<Integer> taskExcelSet = targerToTaskIDMap.get(targetID);
		for(int taskIDExcel:taskExcelSet) {
			Integer taskData = taskMap.get(taskIDExcel);
			if(taskData==null) {
				//初始化异常？
				LogTool.info("ChuangGuanYouLiFunction.initNextTarget.exception.task is null.hid:"+hero.getId()+" targetID"+targetID+" taskID:"+taskIDExcel, this);
				return;
			}else if(taskData != ChuangGuanYouLiConst.TYPE_AWARD_2 ) {
				//未领取
				return;
			}
		}
		
		int targetState = data.getTargetState();
		if(targetState!=ChuangGuanYouLiConst.TYPE_AWARD_2) {
			//未领取
			return;
		}
		
		Struct_cgyl_262 excel = Config_cgyl_262.getIns().get(targetID);
		int targetIDNext = excel.getNext();
		if(targetIDNext==0) {
			//已完成所有目标
			return;
		}
		
		data.setTargetID(targetIDNext);
		data.setTargetState(ChuangGuanYouLiConst.TYPE_AWARD_0);
		Set<Integer> taskExcelNextSet = targerToTaskIDMap.get(targetIDNext);
		taskMap.clear();
		for(int taskIDExcel:taskExcelNextSet) {
			taskMap.put(taskIDExcel, ChuangGuanYouLiConst.TYPE_AWARD_0);
		}
	}
	
	/**
	 * 完成最高目标后，关闭入口
	 * @param type  1通知前端显示系统入口  2不通知
	 * @return	true:已领完所有奖励
	 */
	public boolean door(Hero hero, int type) {
		ChuangGuanYouLi data = hero.getChuangGuanYouLi();
		int targetState = data.getTargetState();
		int targetID = data.getTargetID();
		int finishNum = 0;
		Map<Integer, Integer> taskMap = data.getTaskMap();
		Map<Integer, Set<Integer>> targerToTaskIDMap = ChuangGuanYouLiCache.getTargetToTaskIDMap();
		Set<Integer> taskExcelSet = targerToTaskIDMap.get(targetID);
		for(int taskIDExcel:taskExcelSet) {
			Integer integer = taskMap.get(taskIDExcel);
			if(integer!=null&& integer==ChuangGuanYouLiConst.TYPE_AWARD_2) {
				finishNum++;//完成数量
			}
		}
		
		if(targetState!= ChuangGuanYouLiConst.TYPE_AWARD_2) {
			if(type==1)
				ChuangGuanYouLiSender.sendCmd_4150(hero.getId(), 1, finishNum, taskExcelSet.size(), targetID);
			return false;
		}
		
		Struct_cgyl_262 excel = Config_cgyl_262.getIns().get(targetID);
		if(excel.getNext()!=0) {
			if(type==1)
				ChuangGuanYouLiSender.sendCmd_4150(hero.getId(), 1, finishNum, taskExcelSet.size(), targetID);
			return false;
		}
		
		for(int taskIDExcel:taskExcelSet) {
			Integer integer = taskMap.get(taskIDExcel);
			if(integer!=null&& integer!=ChuangGuanYouLiConst.TYPE_AWARD_2) {
				if(type==1)
					ChuangGuanYouLiSender.sendCmd_4150(hero.getId(), 1, finishNum, taskExcelSet.size(), targetID);
				return false;
			}
		}
		if(type==1)
			ChuangGuanYouLiSender.sendCmd_4150(hero.getId(), 0, finishNum, taskExcelSet.size(), targetID);
		return true;
	}
	
	/**
	 * 红点
	 * @param	type:1登录红点  2实时红点
	 */
	public void checkRed(Hero hero, int type) {
		try {
			boolean door = door(hero, 2);
			if(door)
				return;
			
			ChuangGuanYouLi data = hero.getChuangGuanYouLi();
			int targetID = data.getTargetID();
			Map<Integer, Integer> taskMap = data.getTaskMap();
			Map<Integer, Set<Integer>> targerToTaskIDMap = ChuangGuanYouLiCache.getTargetToTaskIDMap();
			Set<Integer> taskExcelSet = targerToTaskIDMap.get(targetID);
			
			boolean canGetTarget = true;//true：大奖可领取
			for(int taskIDExcel:taskExcelSet) {
				Integer stateHero = taskMap.get(taskIDExcel);
				if(stateHero==null) {
					canGetTarget = false;
				}else if(stateHero == ChuangGuanYouLiConst.TYPE_AWARD_2) {
				}else {
					int state = ChuangGuanYouLiFunction.getIns().checkTask(hero, taskIDExcel);
					if(state == ChuangGuanYouLiConst.TYPE_AWARD_1) {
						if(type==1) {
							RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.CHUANG_GUAN_YOU_LI, RedPointConst.RED_1, RedPointConst.HAS_RED);
						}else {
							RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.CHUANG_GUAN_YOU_LI, RedPointConst.RED_1, RedPointConst.HAS_RED);
						}
						return;
					}
					canGetTarget = false;
				}
			}
			
			if(canGetTarget) {
				if(type==1) {
					RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.CHUANG_GUAN_YOU_LI, RedPointConst.RED_1, RedPointConst.HAS_RED);
				}else {
					RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.CHUANG_GUAN_YOU_LI, RedPointConst.RED_1, RedPointConst.HAS_RED);
				}
			}
		} catch (Exception e) {
			LogTool.errmsg(e);
		}
	}
}
