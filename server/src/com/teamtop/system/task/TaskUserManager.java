package com.teamtop.system.task;

import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.smelt.SmeltSender;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_mission_243;
import excel.struct.Struct_mission_243;

public class TaskUserManager {
	
	public static TaskUserManager ins;
	
	public static synchronized TaskUserManager getIns() {
		if(ins == null){
			ins = new TaskUserManager();
		}
		return ins;
	}

	public void getreward(Hero hero, int index) {
		try {
			if(hero.getTaskUser().getTaskid()!=index) {
				TaskUserSender.sendCmd_2552(hero.getId(), 1, hero.getTaskUser().getTaskid(), hero.getTaskUser().getState(), hero.getTaskUser().getDoNum());
				return;
			}
			
			if (hero.getTaskUser().getState()!=TaskUserConst.TASK_STATE_1) {
				TaskUserSender.sendCmd_2552(hero.getId(), 1, hero.getTaskUser().getTaskid(), hero.getTaskUser().getState(), hero.getTaskUser().getDoNum());
				return;
			}
			int[][] reward=Config_mission_243.getIns().get(index).getReward();
			if (UseAddUtil.canAdd(hero, reward, false)) {
				hero.getTaskUser().setState(TaskUserConst.TASK_STATE_2);
				UseAddUtil.add(hero, reward, SourceGoodConst.TASK_REWARD, null, true);
				hero.setBeforeTaskId(index);
				TaskUserFunction.getIns().chargeNextTask(hero);
				hero.setBeforeTime(TimeDateUtil.getCurrentTime());
				TaskUserSender.sendCmd_2552(hero.getId(), 0, hero.getTaskUser().getTaskid(), hero.getTaskUser().getState(), hero.getTaskUser().getDoNum());
			    return;
			}else {
				SmeltSender.sendCmd_606(hero.getId());
			}
		} catch (Exception e) {
			LogTool.error(e, TaskUserManager.class, "getreward has wrong");
		}
		
	}
	/**
	 * 特殊任务 
	 * @param hero
	 * @param canshu
	 */
	public void specialtask(Hero hero, int canshu) {
		try {
			//任务
			
			if (hero.getTaskUser().getState()!=TaskUserConst.TASK_STATE_0) {
				return;
			}
			Struct_mission_243 mission_243=	Config_mission_243.getIns().get(hero.getTaskUser().getTaskid());
			//分享任务
			if (mission_243.getType()==TaskUserConst.TASK_TYPE_17) {
				TaskUserFunction.getIns().reshTaskUser(hero, TaskUserConst.TASK_TYPE_17, canshu);
				return;
			}
			//自动闯关
			if (mission_243.getType()==TaskUserConst.TASK_TYPE_21) {
				TaskUserFunction.getIns().reshTaskUser(hero, TaskUserConst.TASK_TYPE_21, canshu);
				return;
			}
		} catch (Exception e) {
			LogTool.error(e, TaskUserManager.class, "specialtask has wrong");
		}
		
	}
	
	
	
	
	

}
