package com.teamtop.system.daytask;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.promotion.PromotionFunction;
import com.teamtop.system.promotion.PromotionTaskType;
import com.teamtop.util.log.LogTool;

import excel.config.Config_meirirenwu_708;
import excel.struct.Struct_meirirenwu_708;

public class DayTaskFunction {
	
	private static DayTaskFunction ins;
	public static DayTaskFunction getIns(){
		if(ins == null) {
			ins = new DayTaskFunction();
		}
		return ins;
	}
	
	/**
	 * 每日任务完成情况
	 * @param hero
	 * @param taskid 任务id
	 * @param num
	 */
	public void successDayTaskType(Hero hero,int taskid) {
		try {
			DayTaskModel dayTaskModel=hero.getDayTask().getDayTasks().get(taskid);
			if (dayTaskModel.getReward()!=GameConst.REWARD_0) {
				//已经完成 已经领取奖励
				return;
			}
			int level=hero.getRealLevel();
			int guanka=hero.getGuanqia().getCurGuanqia();
			Struct_meirirenwu_708 meirirenwu_708=Config_meirirenwu_708.getIns().get(taskid);
			if (level<meirirenwu_708.getOpen()[0][0]||guanka<meirirenwu_708.getOpen()[0][1]) {
				return;
			}
			dayTaskModel.setReward(GameConst.REWARD_1);
			dayTaskModel.setNum(dayTaskModel.getNum()+1);
			PromotionFunction.getIns().updatePromotionTask(hero.getId(), PromotionTaskType.DAILY_TASK, null);
			DayTaskSender.sendCmd_1050(hero.getId(), hero.getDayTask().getActivityNum(), taskid, dayTaskModel.getNum(),dayTaskModel.getReward());
			return;
		} catch (Exception e) {
			LogTool.error(e, DayTaskFunction.class, hero.getId(), hero.getName(), "successDayTaskType has wrong");
		}
	}
	

}
