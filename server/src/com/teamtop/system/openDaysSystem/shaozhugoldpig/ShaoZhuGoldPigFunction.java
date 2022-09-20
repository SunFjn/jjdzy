package com.teamtop.system.openDaysSystem.shaozhugoldpig;

import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.openDaysSystem.OpenDaysSystemFunction;
import com.teamtop.system.openDaysSystem.saintMonsterGoal.SaintMonsterGoalFunction;
import com.teamtop.system.openDaysSystem.shaozhugoldpig.model.ShaoZhuGoldPig;
import com.teamtop.system.openDaysSystem.shaozhugoldpig.model.ShaoZhuGoldPigTaskInfo;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;

import excel.config.Config_pigrw_272;
import excel.struct.Struct_pigrw_272;

public class ShaoZhuGoldPigFunction {

	private static ShaoZhuGoldPigFunction ins;

	private ShaoZhuGoldPigFunction() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized ShaoZhuGoldPigFunction getIns() {
		if (ins == null) {
			ins = new ShaoZhuGoldPigFunction();
		}
		return ins;
	}

	public void checkTask(Hero hero, int type, int num) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.SHAO_ZHU_GOLD_PIG)) {
				return;
			}
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.SHAO_ZHU_GOLD_PIG);
			ShaoZhuGoldPig model = (ShaoZhuGoldPig) ShaoZhuGoldPigManager.getIns().getSystemModel(hero, uid);

			ShaoZhuGoldPigTaskInfo taskInfo = model.getTaskMap().get(type);
			if (taskInfo == null) {
				return;
			}
			if (taskInfo.getTaskState() == 1) {
				// 已全部完成
				return;
			}
			Struct_pigrw_272 pigrw = Config_pigrw_272.getIns().get(taskInfo.getTaskId());
			Struct_pigrw_272 nowpigrw = Config_pigrw_272.getIns().get(taskInfo.getTaskId());
			if (pigrw == null) {
				return;
			}
			if (type != ShaoZhuGoldPigConst.TASK_TYPE_7) {
				// 其他叠加处理
				taskInfo.setTaskValue(taskInfo.getTaskValue() + num);
			} else {
				// 乱世枭雄特殊处理
				if (num > taskInfo.getTaskValue()) {
					taskInfo.setTaskValue(num);
				} else {
					return;
				}
			}
			while (taskInfo.getTaskValue() >= nowpigrw.getCs()) {
				if (nowpigrw.getNext() == 0) {
					// 全部完成
					taskInfo.setTaskState(1);
					taskInfo.setTaskId(nowpigrw.getId());
					updateRedPoint(hero);
					break;
				}
				nowpigrw = Config_pigrw_272.getIns().get(nowpigrw.getNext());
			}
			if (nowpigrw.getId() != pigrw.getId()) {
				// 变更信息
				taskInfo.setTaskId(nowpigrw.getId());
				updateRedPoint(hero);
			}

		} catch (Exception e) {
			LogTool.error(e, SaintMonsterGoalFunction.class, hid, hero.getName(),
					"SaintMonsterGoalFunction checkTask, type=" + type);
		}
	}

	/**
	 * 更新红点
	 * 
	 * @param hero
	 */
	public void updateRedPoint(Hero hero) {
		try {
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.SHAO_ZHU_GOLD_PIG)) {
				return;
			}
			boolean redPoint = checkRedPoint(hero);
			if (redPoint) {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.SHAO_ZHU_GOLD_PIG, RedPointConst.RED_1,
						RedPointConst.HAS_RED);
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.SHAO_ZHU_HUO_DONG, RedPointConst.RED_1,
						RedPointConst.HAS_RED);
			} else {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.SHAO_ZHU_GOLD_PIG, RedPointConst.RED_1,
						RedPointConst.NO_RED);
			}
		} catch (Exception e) {
			LogTool.error(e, SaintMonsterGoalFunction.class, hero.getId(), hero.getName(),
					"SaintMonsterGoalFunction checkRedPoint");
		}
	}

	/**
	 * 检测红点
	 * 
	 * @param hero
	 * @return
	 */
	public boolean checkRedPoint(Hero hero) {
		try {
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.SHAO_ZHU_GOLD_PIG)) {
				return false;
			}
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.SHAO_ZHU_GOLD_PIG);
			ShaoZhuGoldPig model = (ShaoZhuGoldPig) ShaoZhuGoldPigManager.getIns().getSystemModel(hero, uid);
			if (model.getGoldPigState() != 1 || model.getSilverPigState() != 1) {
				return true;
			}
			for (ShaoZhuGoldPigTaskInfo taskInfo : model.getTaskMap().values()) {
				if (model.getGoldPigState() == 1) {
					// 检查金猪任务是否可领
					if (taskInfo.getTaskState() == 1) {
						// 全部可领
						if (taskInfo.getGoldPigTaskId() != -1) {
							return true;
						}
					}
					if (taskInfo.getGoldPigTaskId() < taskInfo.getTaskId()) {
						return true;
					}
				}
				if (model.getSilverPigState() == 1) {
					// 检查银猪任务是否可领
					if (taskInfo.getTaskState() == 1) {
						// 全部可领
						if (taskInfo.getSilverPigTaskId() != -1) {
							return true;
						}
					}
					if (taskInfo.getSilverPigTaskId() < taskInfo.getTaskId()) {
						return true;
					}
				}
			}

			if(model.getHeadState() == 1) {
				return true;
			}
		} catch (Exception e) {
			LogTool.error(e, SaintMonsterGoalFunction.class, hero.getId(), hero.getName(),
					"SaintMonsterGoalFunction checkRedPoint");
		}
		return false;
	}
}
