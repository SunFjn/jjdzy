package com.teamtop.system.task;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;

import excel.config.Config_mission_243;
import excel.struct.Struct_mission_243;

public class TaskUserEvent extends AbsSystemEvent{

	private static TaskUserEvent ins;
	
	public static synchronized TaskUserEvent getIns() {
		if(ins == null){
			ins = new TaskUserEvent();
		}
		return ins;
	}
	@Override
	public void init(Hero hero) {
		if (hero.getTaskUser()==null) {
			TaskUser taskUser=new TaskUser();
			taskUser.setHid(hero.getId());
			taskUser.setTaskid(TaskUserConst.TASK_1);
			taskUser.setState(TaskUserConst.TASK_STATE_0);
			taskUser.setDoNum(0);
			hero.setTaskUser(taskUser);
		}
	}

	@Override
	public void login(Hero hero) {
		Struct_mission_243 mission_243=	Config_mission_243.getIns().get(hero.getTaskUser().getTaskid());
		TaskUserFunction.getIns().reshTaskUser(hero, mission_243.getType(), 0);
		//已经完成的任务 变成下一个
		TaskUserFunction.getIns().chargeNextTask(hero);
		TaskUserSender.sendCmd_2550(hero.getId(),hero.getTaskUser().getTaskid(), hero.getTaskUser().getState(), hero.getTaskUser().getDoNum());
	    
	}
	
	@Override
    public void passGuanqia(Hero hero, int passGuanqia) {
		TaskUserFunction.getIns().reshTaskUser(hero, TaskUserConst.TASK_TYPE_1, passGuanqia);
	}

}
