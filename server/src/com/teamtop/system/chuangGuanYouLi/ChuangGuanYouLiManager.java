package com.teamtop.system.chuangGuanYouLi;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.chat.ChatConst;
import com.teamtop.system.chat.ChatManager;
import com.teamtop.system.chuangGuanYouLi.model.ChuangGuanYouLi;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.task.TaskUserConst;
import com.teamtop.system.task.TaskUserFunction;

import excel.config.Config_cgyl_262;
import excel.config.Config_cgylrw_262;
import excel.struct.Struct_cgyl_262;
import excel.struct.Struct_cgylrw_262;

public class ChuangGuanYouLiManager {
	
	private static ChuangGuanYouLiManager ins;
	public static ChuangGuanYouLiManager getIns(){
		if(ins == null) {
			ins = new ChuangGuanYouLiManager();
		}
		return ins;
	}
	
	public void openUI(Hero hero) {
		ChuangGuanYouLi data = hero.getChuangGuanYouLi();
		int targetID = data.getTargetID();
		Map<Integer, Integer> taskMap = data.getTaskMap();
		Map<Integer, Set<Integer>> targerToTaskIDMap = ChuangGuanYouLiCache.getTargetToTaskIDMap();
		Set<Integer> taskExcelSet = targerToTaskIDMap.get(targetID);
		
		List<Object[]> sendData = new ArrayList<>();
		for(int taskIDExcel:taskExcelSet) {
			Integer stateHero = taskMap.get(taskIDExcel);
			int num = ChuangGuanYouLiFunction.getIns().getTaskSchedule(hero, taskIDExcel);
			if(stateHero==null) {
				sendData.add(new Object[] {taskIDExcel, ChuangGuanYouLiConst.TYPE_AWARD_0, num});
			}else if(stateHero == ChuangGuanYouLiConst.TYPE_AWARD_1|| stateHero == ChuangGuanYouLiConst.TYPE_AWARD_2 ) {
				sendData.add(new Object[] {taskIDExcel, stateHero, num});
			}else {
				int state = ChuangGuanYouLiFunction.getIns().checkTask(hero, taskIDExcel);
				sendData.add(new Object[] {taskIDExcel, state, num});
			}
		}
		
		int targetState = data.getTargetState();//true：大奖领取姿态
		if(targetState==ChuangGuanYouLiConst.TYPE_AWARD_0) {
			boolean canGetTarget = true;//true：大奖可领取
			for(int taskIDExcel:taskExcelSet) {
				Integer stateHero = taskMap.get(taskIDExcel);
				if(stateHero==null) {
					canGetTarget = false;
				}else if(stateHero == ChuangGuanYouLiConst.TYPE_AWARD_2) {
				}else {
					int state = ChuangGuanYouLiFunction.getIns().checkTask(hero, taskIDExcel);
					if(state == ChuangGuanYouLiConst.TYPE_AWARD_1) {
						continue;
					}
					canGetTarget = false;
				}
			}
			if(canGetTarget)
				targetState = ChuangGuanYouLiConst.TYPE_AWARD_1; 
		}
		
		ChuangGuanYouLiSender.sendCmd_4152(hero.getId(), targetID, targetState, sendData.toArray());
		//触发初始化下一档
		ChuangGuanYouLiFunction.getIns().initNextTarget(hero);
//		ChuangGuanYouLiFunction.getIns().checkRed(hero);
	}
	
	public void getTaskAwards(Hero hero, int id) {
		Struct_cgylrw_262 excel = Config_cgylrw_262.getIns().get(id);
		if(excel==null) {
			//奖励不存在
			ChuangGuanYouLiSender.sendCmd_4154(hero.getId(), 2);
			return;
		}
		ChuangGuanYouLi data = hero.getChuangGuanYouLi();
		int targetID = data.getTargetID();
		if(targetID!=excel.getMb()) {
			//该任务不属于本目标
			ChuangGuanYouLiSender.sendCmd_4154(hero.getId(), 3);
			return;
		}
		Map<Integer, Integer> taskMap = data.getTaskMap();
		Integer stateHero = taskMap.get(id);
		if(stateHero==null) {
			//任务未初始化，请重新登录
			ChuangGuanYouLiSender.sendCmd_4154(hero.getId(), 4);
			return;
		}
		if(stateHero == ChuangGuanYouLiConst.TYPE_AWARD_2) {
			//奖励已领取
			ChuangGuanYouLiSender.sendCmd_4154(hero.getId(), 5);
			return;
		}
		int stateNow = ChuangGuanYouLiFunction.getIns().checkTask(hero, id);
		if(stateNow == ChuangGuanYouLiConst.TYPE_AWARD_0) {
			//任务未达标
			ChuangGuanYouLiSender.sendCmd_4154(hero.getId(), 6);
			return;
		}
		int[][] rewardExcel = excel.getReward();
		boolean canAdd = UseAddUtil.canAdd(hero, rewardExcel, false);
		if(!canAdd) {
			//背包已满
			ChuangGuanYouLiSender.sendCmd_4154(hero.getId(), 7);
			return;
		}
		taskMap.put(id, ChuangGuanYouLiConst.TYPE_AWARD_2);
		UseAddUtil.add(hero, rewardExcel, SourceGoodConst.CHUANG_GUAN_YOU_LI_TASK, UseAddUtil.getDefaultMail(), true);
		ChuangGuanYouLiSender.sendCmd_4154(hero.getId(), 1);
		
		TaskUserFunction.getIns().reshTaskUser(hero, TaskUserConst.TASK_TYPE_42, 1);
		
		//触发初始化下一档
		ChuangGuanYouLiFunction.getIns().initNextTarget(hero);
		ChuangGuanYouLiFunction.getIns().door(hero, 1);
	}
	
	public void getTargetAwards(Hero hero) {
		ChuangGuanYouLi data = hero.getChuangGuanYouLi();
		int targetID = data.getTargetID();
		int targetState = data.getTargetState();
		if(targetState==ChuangGuanYouLiConst.TYPE_AWARD_2) {
			//已领取
			ChuangGuanYouLiSender.sendCmd_4156(hero.getId(), 2);
			return;
		}
		Map<Integer, Integer> taskMap = data.getTaskMap();
		Map<Integer, Set<Integer>> targerToTaskIDMap = ChuangGuanYouLiCache.getTargetToTaskIDMap();
		Set<Integer> taskExcelSet = targerToTaskIDMap.get(targetID);
		for(int taskIDExcel:taskExcelSet) {
			Integer stateHero = taskMap.get(taskIDExcel);
			if(stateHero==null) {
				//目标未初始化，请重新登录
				ChuangGuanYouLiSender.sendCmd_4156(hero.getId(), 3);
				return;
			}else if(stateHero == ChuangGuanYouLiConst.TYPE_AWARD_2 ) {
				//已领取
			}else {
				int state = ChuangGuanYouLiFunction.getIns().checkTask(hero, taskIDExcel);
				if(state != ChuangGuanYouLiConst.TYPE_AWARD_1) {
					//目标未达成
					ChuangGuanYouLiSender.sendCmd_4156(hero.getId(), 4);
					return;
				}
			}
		}
		
		Struct_cgyl_262 excel = Config_cgyl_262.getIns().get(targetID);
		int[][] rewardExcel = excel.getReward();
		boolean canAdd = UseAddUtil.canAdd(hero, rewardExcel, false);
		if(!canAdd) {
			//背包已满
			ChuangGuanYouLiSender.sendCmd_4156(hero.getId(), 5);
			return;
		}
		data.setTargetState(ChuangGuanYouLiConst.TYPE_AWARD_2);
		UseAddUtil.add(hero, rewardExcel, SourceGoodConst.CHUANG_GUAN_YOU_LI_TARGET, UseAddUtil.getDefaultMail(), true);
		ChuangGuanYouLiSender.sendCmd_4156(hero.getId(), 1);
		ChatManager.getIns().broadCast(ChatConst.CHUANG_GUAN_YOU_LI, new Object[] { hero.getName(), rewardExcel[0][1] });
		TaskUserFunction.getIns().reshTaskUser(hero, TaskUserConst.TASK_TYPE_42, 1);
		//触发初始化下一档
		ChuangGuanYouLiFunction.getIns().initNextTarget(hero);
		ChuangGuanYouLiFunction.getIns().door(hero, 1);

	}

}
