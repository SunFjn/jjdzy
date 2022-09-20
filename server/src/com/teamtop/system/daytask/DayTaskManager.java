package com.teamtop.system.daytask;

import java.util.Map;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.activity.ativitys.hefuRechargeBack.HeFuRechargeBackConst;
import com.teamtop.system.activity.ativitys.hefuRechargeBack.HeFuRechargeBackFunction;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.forge.ForgeFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.huoShaoChiBi.HuoShaoChiBi;
import com.teamtop.system.peacockFloor.PeacockFloor;
import com.teamtop.system.skill.SkillFunction;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;

import excel.config.Config_baoxiang_708;
import excel.config.Config_dzqianghua_209;
import excel.config.Config_hscb_751;
import excel.config.Config_meirirenwu_708;
import excel.config.Config_tower_219;
import excel.config.Config_xiaohao_210;
import excel.struct.Struct_baoxiang_708;
import excel.struct.Struct_meirirenwu_708;

public class DayTaskManager {
	
	private static DayTaskManager ins;
	public static DayTaskManager getIns(){
		if(ins == null) {
			ins = new DayTaskManager();
		}
		return ins;
	}
	
	public void getDatTaskUI(Hero hero) {
		try {
			checkSpecialTask(hero);
			Object[] tasks=new Object[hero.getDayTask().getDayTasks().size()];
			int a=0;
			for (DayTaskModel  dayTaskModel :hero.getDayTask().getDayTasks().values()) {
				Struct_meirirenwu_708 meirirenwu_708=Config_meirirenwu_708.getIns().get(dayTaskModel.getTaskid());
				if (hero.getRealLevel()<meirirenwu_708.getOpen()[0][0]||hero.getGuanqia().getCurGuanqia()<meirirenwu_708.getOpen()[0][1]) {
					continue;
				}
				tasks[a]=new Object[] {dayTaskModel.getTaskid(),dayTaskModel.getNum(),dayTaskModel.getReward()};
			    a++;
			}
			tasks=CommonUtil.removeNull(tasks);
			Object[] boxs=new Object[hero.getDayTask().getRewardboxs().size()];
			a=0;
			for (Map.Entry<Integer, Integer> entry:hero.getDayTask().getRewardboxs().entrySet()) {
				boxs[a]=new Object[] { entry.getKey(),entry.getValue()};
				a++;
			}
			DayTaskSender.sendCmd_1052(hero.getId(), hero.getDayTask().getActivityNum(), tasks, boxs);
			return;
		} catch (Exception e) {
			LogTool.error(e, DayTaskManager.class, hero.getId(), hero.getName(), "getDatTaskUI has wrong");
		}
		
	}
	/**
	 * 获取任务奖励
	 * @param hero
	 * @param taskid
	 */
	public void getTaskReward(Hero hero, int taskid) {
		try {
			DayTaskModel dayTaskModel=hero.getDayTask().getDayTasks().get(taskid);
			Struct_meirirenwu_708 meirirenwu_708=Config_meirirenwu_708.getIns().get(taskid);
			if (dayTaskModel.getReward()==GameConst.REWARD_1&&UseAddUtil.canAdd(hero, meirirenwu_708.getAward(), false)) {
				UseAddUtil.add(hero, meirirenwu_708.getAward(), SourceGoodConst.DAYTASK_REWARD, null, true);
				dayTaskModel.setReward(GameConst.REWARD_2);
				int addAct=meirirenwu_708.getAdd();
				hero.getDayTask().setActivityNum(hero.getDayTask().getActivityNum()+addAct);
				for(Struct_baoxiang_708 baoxiang_708:Config_baoxiang_708.getIns().getMap().values()){
					if (hero.getDayTask().getActivityNum()>=baoxiang_708.getCondition()&&hero.getDayTask().getRewardboxs().get(baoxiang_708.getId())==GameConst.REWARD_0) {
						hero.getDayTask().getRewardboxs().put(baoxiang_708.getId(), GameConst.REWARD_1);
						DayTaskSender.sendCmd_1056(hero.getId(), 0, baoxiang_708.getId(), GameConst.REWARD_1);
					}
				}
				DayTaskSender.sendCmd_1054(hero.getId(), 0, taskid, GameConst.REWARD_2);
				DayTaskSender.sendCmd_1050(hero.getId(), hero.getDayTask().getActivityNum(), taskid, dayTaskModel.getNum(),dayTaskModel.getReward());
				//合服充值返利-南征北战
				HeFuRechargeBackFunction.getIns().numCharge(hero, HeFuRechargeBackConst.EVERY_TASK, 1);
				return;
			}else {
				DayTaskSender.sendCmd_1054(hero.getId(), 0, taskid, dayTaskModel.getReward());
				return;
			}
		} catch (Exception e) {
			LogTool.error(e, DayTaskManager.class, hero.getId(), hero.getName(), "getTaskReward has wrong");
		}
		
	}
	/**
	 * 获取宝箱奖励
	 * @param hero
	 * @param boxid
	 */
	public void getActReward(Hero hero, int boxid) {
		try {
			Struct_baoxiang_708  baoxiang_708=Config_baoxiang_708.getIns().get(boxid);
			if (hero.getDayTask().getRewardboxs().get(boxid)==GameConst.REWARD_1&&UseAddUtil.canAdd(hero, baoxiang_708.getAward(), false)) {
				//奖励
				hero.getDayTask().getRewardboxs().put(boxid, GameConst.REWARD_2);
				UseAddUtil.add(hero, baoxiang_708.getAward(), SourceGoodConst.DAYBOX_REWARD, null, true);
				DayTaskSender.sendCmd_1056(hero.getId(), 0, boxid, GameConst.REWARD_2);
				return;
			}else {
				DayTaskSender.sendCmd_1056(hero.getId(), 1, boxid,hero.getDayTask().getRewardboxs().get(boxid));
				return;
			}
		} catch (Exception e) {
			LogTool.error(e, DayTaskManager.class, hero.getId(), hero.getName(), "getActReward has wrong");
		}
		
	}
	
	
	/**
	 * 检测特殊任务满足条件后自动完成
	 * 
	 * @param hero
	 * @param boxid
	 */
	public void checkSpecialTask(Hero hero) {
		try {
			int size2 = Config_xiaohao_210.getIns().size();
			int maxNum = SkillFunction.getIns().getMaxNum(hero);
			if (maxNum >= size2 * 3) {
				// 技能总等级满级后每日任务自动完成
				DayTaskFunction.getIns().successDayTaskType(hero, DayTaskConst.DATTASK_TYPE4);
			}
			int size = Config_tower_219.getIns().size();
			PeacockFloor peacockFloor = hero.getPeacockFloor();
			if (peacockFloor != null && peacockFloor.getFloorNum() >= size) {
				// 铜雀台达到最高层每日任务自动完成
				DayTaskFunction.getIns().successDayTaskType(hero, DayTaskConst.DATTASK_TYPE14);
			}
			int size1 = Config_hscb_751.getIns().size();
			HuoShaoChiBi huoShaoChiBi = hero.getHuoShaoChiBi();
			if (huoShaoChiBi != null && huoShaoChiBi.getFloorNum() >= size1) {
				// 火烧赤壁达到最高层每日任务自动完成
				DayTaskFunction.getIns().successDayTaskType(hero, DayTaskConst.DATTASK_TYPE31);
			}
			int maxStrength = ForgeFunction.getIns().maxStrength(hero);
			int size3 = Config_dzqianghua_209.getIns().size() - 1;
			if (maxStrength >= size3 * 10) {
				// 强化达到最高总等级每日任务自动完成
				DayTaskFunction.getIns().successDayTaskType(hero, DayTaskConst.DATTASK_TYPE3);
			}
		} catch (Exception e) {
			LogTool.error(e, DayTaskManager.class, hero.getId(), hero.getName(), "checkSpecialTask has wrong");
		}

	}

}
