package com.teamtop.system.openDaysSystem.shaozhugoldpig;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.chat.ChatConst;
import com.teamtop.system.chat.ChatManager;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.system.openDaysSystem.AbsOpenDaysManager;
import com.teamtop.system.openDaysSystem.OpenDaysSystemFunction;
import com.teamtop.system.openDaysSystem.model.AbsOpenDaysSystemModel;
import com.teamtop.system.openDaysSystem.model.HeroOpenDaysSysData;
import com.teamtop.system.openDaysSystem.shaozhugoldpig.model.ShaoZhuGoldPig;
import com.teamtop.system.openDaysSystem.shaozhugoldpig.model.ShaoZhuGoldPigTaskInfo;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;

import excel.config.Config_pig_272;
import excel.config.Config_pigrw_272;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_pig_272;
import excel.struct.Struct_pigrw_272;
import excel.struct.Struct_xtcs_004;

public class ShaoZhuGoldPigManager extends AbsOpenDaysManager {

	private static ShaoZhuGoldPigManager ins;

	private ShaoZhuGoldPigManager() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized ShaoZhuGoldPigManager getIns() {
		if (ins == null) {
			ins = new ShaoZhuGoldPigManager();
		}
		return ins;
	}

	@Override
	public void openUI(Hero hero) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.SHAO_ZHU_GOLD_PIG)) {
				return;
			}
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.SHAO_ZHU_GOLD_PIG);
			ShaoZhuGoldPig model = (ShaoZhuGoldPig) getSystemModel(hero, uid);
			int goldPigState = model.getGoldPigState();
			int silverPigState = model.getSilverPigState();
			int headState = model.getHeadState();
			int goldPigValue = model.getGoldPigValue();
			int silverPigValue = model.getSilverPigValue();

			List<Object[]> taskData = new ArrayList<>();

			for (ShaoZhuGoldPigTaskInfo task : model.getTaskMap().values()) {
				taskData.add(new Object[] { task.getTaskId(), task.getTaskState(), task.getTaskValue(),
						task.getGoldPigTaskId(), task.getSilverPigTaskId() });
			}

			ShaoZhuGoldPigSender.sendCmd_5492(hid, goldPigState, silverPigState, headState, goldPigValue,
					silverPigValue, taskData.toArray());

		} catch (Exception e) {
			LogTool.error(e, ShaoZhuGoldPigManager.class, hid, hero.getName(), "ShaoZhuGoldPigManager openUI");
		}
	}

	@Override
	public void handleOpenPub() {
		// TODO ???????????????????????????

	}

	@Override
	public void handleOpen(Hero hero, int uid) {
		// TODO ???????????????????????????

	}

	@Override
	public void handleEndPub() {
		// TODO ???????????????????????????

	}

	@Override
	public void handleEnd(Hero hero, int uid) {
		// TODO ???????????????????????????
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		ShaoZhuGoldPig model = (ShaoZhuGoldPig) getSystemModel(hero, uid);
		// ????????????????????????

		// ??????????????????
		int goldAddValue = model.getGoldPigValue();
		int silverAddValue = model.getSilverPigValue();
		for (ShaoZhuGoldPigTaskInfo taskInfo : model.getTaskMap().values()) {
			int taskId = taskInfo.getTaskId();
			int goldTaskId = taskInfo.getGoldPigTaskId();
			int silverTaskId = taskInfo.getSilverPigTaskId();
			if (model.getGoldPigState() == 1) {
				while (goldTaskId <= taskId) {
					Struct_pigrw_272 pigrw = Config_pigrw_272.getIns().get(goldTaskId);
					if (pigrw == null) {
						break;
					}
					if (goldTaskId == -1) {
						break;
					}
					if (goldTaskId == taskId) {
						if (pigrw.getNext() == 0) {
							// ??????????????????
							if (taskInfo.getTaskState() == 0) {
								break;
							}
						} else {
							// ???????????????
							break;
						}
					}
					int mailId = MailConst.SHAO_ZHU_GOLD_PIG_GOLD_REWARD;
					MailFunction.getIns().sendMailWithFujianData2(hid, mailId, new Object[] { mailId },
							pigrw.getReward1());
					goldAddValue += pigrw.getZz1();
					if (pigrw.getNext() == 0) {
						break;
					}
					goldTaskId = pigrw.getNext();
					taskInfo.setGoldPigTaskId(goldTaskId);
				}
			}

			if (model.getSilverPigState() == 1) {
				while (silverTaskId <= taskId) {
					Struct_pigrw_272 pigrw = Config_pigrw_272.getIns().get(silverTaskId);
					if (pigrw == null) {
						break;
					}
					if (silverTaskId == -1) {
						break;
					}
					if (silverTaskId == taskId) {
						if (pigrw.getNext() == 0) {
							// ??????????????????
							if (taskInfo.getTaskState() == 0) {
								break;
							}
						} else {
							// ???????????????
							break;
						}
					}
					int mailId = MailConst.SHAO_ZHU_GOLD_PIG_SILVER_REWARD;
					MailFunction.getIns().sendMailWithFujianData2(hid, mailId, new Object[] { mailId },
							pigrw.getReward());
					silverAddValue += pigrw.getZz();
					if (pigrw.getNext() == 0) {
						break;
					}
					silverTaskId = pigrw.getNext();
					taskInfo.setSilverPigTaskId(silverTaskId);
				}
			}
		}

		if (model.getHeadState() == 1) {
			Struct_xtcs_004 xtcs = Config_xtcs_004.getIns().get(ShaoZhuGoldPigConst.HEAD_ID);
			if (xtcs == null) {
				return;
			}
			int[][] reward = xtcs.getOther();
			int mailId = MailConst.SHAO_ZHU_GOLD_PIG_GOLD_REWARD;
			MailFunction.getIns().sendMailWithFujianData2(hid, mailId, new Object[] { mailId }, reward);
		}

		// ??????????????????
		if (model.getGoldPigState() == 1) {
			Struct_pig_272 pig = Config_pig_272.getIns().get(2);
			int[][] reward = pig.getCun();
			int[][] copy = CommonUtil.copyDyadicArray(reward);
			for (int[] arr : copy) {
				arr[2] = (int) Math.floor((double) arr[2] * (1 + (double) goldAddValue / 100));
			}

			int mailId = MailConst.SHAO_ZHU_GOLD_PIG_GOLD_YB_REWARD;
			MailFunction.getIns().sendMailWithFujianData2(hid, mailId, new Object[] { mailId }, copy);

			// ???????????????????????????
			model.setGoldPigValue(goldAddValue);
			model.setGoldPigState(2);
		}
		if (model.getSilverPigState() == 1) {
			Struct_pig_272 pig = Config_pig_272.getIns().get(1);
			int[][] reward = pig.getCun();

			int[][] copy = CommonUtil.copyDyadicArray(reward);
			for (int[] arr : copy) {
				arr[2] = (int) Math.floor((double) arr[2] * (1 + (double) silverAddValue / 100));
			}

			int mailId = MailConst.SHAO_ZHU_GOLD_PIG_SILVER_YB_REWARD;
			MailFunction.getIns().sendMailWithFujianData2(hid, mailId, new Object[] { mailId }, copy);

			// ???????????????????????????
			model.setSilverPigValue(silverAddValue);
			model.setSilverPigState(2);
		}
	}

	@Override
	public AbsOpenDaysSystemModel getSystemModel(Hero hero, int uid) {
		HeroOpenDaysSysData heroOpenDaysSysData = hero.getHeroOpenDaysSysData();
		ShaoZhuGoldPig shaoZhuGoldPig = (ShaoZhuGoldPig) heroOpenDaysSysData.getOpSysDataMap().get(uid);
		if (shaoZhuGoldPig == null) {
			shaoZhuGoldPig = new ShaoZhuGoldPig();
			shaoZhuGoldPig.setHeadState(0);
			shaoZhuGoldPig.setGoldPigState(0);
			shaoZhuGoldPig.setSilverPigState(0);
			shaoZhuGoldPig.setGoldPigValue(0);
			shaoZhuGoldPig.setSilverPigValue(0);
			Map<Integer, ShaoZhuGoldPigTaskInfo> taskMap = new HashMap<>();
			for (Struct_pigrw_272 pigrw : Config_pigrw_272.getIns().getSortList()) {
				if (pigrw.getId() % 10 != 1) {
					continue;
				}
				ShaoZhuGoldPigTaskInfo taskInfo = new ShaoZhuGoldPigTaskInfo();
				taskInfo.setTaskId(pigrw.getId());
				taskInfo.setTaskState(0);
				taskInfo.setTaskValue(0);
				taskInfo.setGoldPigTaskId(pigrw.getId());
				taskInfo.setSilverPigTaskId(pigrw.getId());
				taskMap.put(pigrw.getId() / 1000, taskInfo);

				if (pigrw.getId() / 1000 == ShaoZhuGoldPigConst.TASK_TYPE_7) {
					// ????????????????????????????????????
					taskInfo.setTaskValue(hero.getCrossKing().getDuanwei());
					Struct_pigrw_272 nowpigrw = pigrw;
					while (taskInfo.getTaskValue() >= nowpigrw.getCs()) {
						if (nowpigrw.getNext() == 0) {
							// ????????????
							taskInfo.setTaskState(1);
							taskInfo.setTaskId(nowpigrw.getId());
							break;
						}
						nowpigrw = Config_pigrw_272.getIns().get(nowpigrw.getNext());
					}
					if (nowpigrw.getId() != pigrw.getId()) {
						// ????????????
						taskInfo.setTaskId(nowpigrw.getId());
					}
				}

			}
			shaoZhuGoldPig.setTaskMap(taskMap);
		}
		return shaoZhuGoldPig;
	}

	@Override
	public Class<?> getSystemModel() {
		return ShaoZhuGoldPig.class;
	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		// TODO ???????????????????????????
		return ShaoZhuGoldPigSysEvent.getIns();
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.SHAO_ZHU_GOLD_PIG)) {
				return;
			}
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.SHAO_ZHU_GOLD_PIG);
			ShaoZhuGoldPig model = (ShaoZhuGoldPig) getSystemModel(hero, uid);
			Struct_pig_272 pigConfig = null;
			for (Struct_pig_272 pig : Config_pig_272.getIns().getSortList()) {
				if (pig.getShop() == product_id) {
					pigConfig = pig;
					break;
				}
			}
			if (ShaoZhuGoldPigConst.GOLD_PIG_RECHARGE_ID == product_id) {
				// ??????
				if (model.getGoldPigState() != 0) {
					// ?????????
					return;
				}
				model.setGoldPigState(1);
				ChatManager.getIns().broadCast(ChatConst.SHAO_ZHU_GOLD_PIG_BUY_NOTIC,
						new Object[] { hero.getNameZoneid(), "????????????" });
			} else if (ShaoZhuGoldPigConst.SILVER_PIG_RECHARGE_ID == product_id) {
				if (model.getSilverPigState() != 0) {
					// ?????????
					return;
				}
				model.setSilverPigState(1);
				ChatManager.getIns().broadCast(ChatConst.SHAO_ZHU_GOLD_PIG_BUY_NOTIC,
						new Object[] { hero.getNameZoneid(), "????????????" });
			} else {
				return;
			}
			int[][] reward = pigConfig.getReward();
			UseAddUtil.add(hero, reward, SourceGoodConst.SHAO_ZHU_GOLD_PIG_BUY_AWARD, UseAddUtil.getDefaultMail(),
					true); // ????????????

			if (model.getGoldPigState() == 1 && model.getSilverPigState() == 1) {
				if (model.getHeadState() == 0) {
					model.setHeadState(1);
				}
			}
			openUI(hero);
			ShaoZhuGoldPigFunction.getIns().updateRedPoint(hero);
		} catch (Exception e) {
			LogTool.error(e, ShaoZhuGoldPigManager.class, hid, hero.getName(), "ShaoZhuGoldPigManager rechargeHandle");
		}
	}

	@Override
	public void consumeHandle(Hero hero, int consumeNum, int reason) {
		// ????????????-????????????
		ShaoZhuGoldPigFunction.getIns().checkTask(hero, ShaoZhuGoldPigConst.TASK_TYPE_6, consumeNum);
	}

	public void getHeadAward(Hero hero) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.SHAO_ZHU_GOLD_PIG)) {
				return;
			}
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.SHAO_ZHU_GOLD_PIG);
			ShaoZhuGoldPig model = (ShaoZhuGoldPig) getSystemModel(hero, uid);

			if (model.getHeadState() == 0) {
				ShaoZhuGoldPigSender.sendCmd_5494(hid, 2);
				return;
			} else if (model.getHeadState() == 2) {
				ShaoZhuGoldPigSender.sendCmd_5494(hid, 1);
				return;
			}
			if (model.getGoldPigState() == 1 && model.getSilverPigState() == 1) {
				// ????????????
				Struct_xtcs_004 xtcs = Config_xtcs_004.getIns().get(ShaoZhuGoldPigConst.HEAD_ID);
				if (xtcs == null) {
					return;
				}
				int[][] reward = xtcs.getOther();
				model.setHeadState(2);
				UseAddUtil.add(hero, reward, SourceGoodConst.SHAO_ZHU_GOLD_PIG_HEAD_AWARD, UseAddUtil.getDefaultMail(),
						true); // ????????????
			} else {
				ShaoZhuGoldPigSender.sendCmd_5494(hid, 2);
				return;
			}

			ShaoZhuGoldPigSender.sendCmd_5494(hid, 0);

		} catch (Exception e) {
			LogTool.error(e, ShaoZhuGoldPigManager.class, hid, hero.getName(), "ShaoZhuGoldPigManager getHeadAward");
		}
	}

	public void getYuanBaoAdd(Hero hero, int taskId, int pigType) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.SHAO_ZHU_GOLD_PIG)) {
				return;
			}
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.SHAO_ZHU_GOLD_PIG);
			ShaoZhuGoldPig model = (ShaoZhuGoldPig) getSystemModel(hero, uid);
			int taskType = taskId / 1000;
			int taskNum = taskId % 1000;

			ShaoZhuGoldPigTaskInfo taskInfo = model.getTaskMap().get(taskType);
			if (taskInfo == null) {
				return;
			}

			Struct_pigrw_272 pigrw = Config_pigrw_272.getIns().get(taskId);
			if (pigrw == null) {
				return;
			}

			int[][] reward = pigType == 1 ? pigrw.getReward1() : pigrw.getReward();
			int addValue = pigType == 1 ? pigrw.getZz1() : pigrw.getZz();

			int nowTaskNum = taskInfo.getTaskId() % 1000;

			int hId = 0;
			int hNum = 0;
			if (pigType == 1) {
				// ????????????
				if (model.getGoldPigState() != 1) {
					// ?????????
					return;
				}
				hId = taskInfo.getGoldPigTaskId();
				hNum = hId % 1000;
			} else {
				// ????????????
				if (model.getSilverPigState() != 1) {
					// ?????????
					return;
				}
				hId = taskInfo.getSilverPigTaskId();
				hNum = hId % 1000;
			}

			if (hId == -1) {
				// ???????????????
				ShaoZhuGoldPigSender.sendCmd_5496(hid, 1, pigType, taskId, 1, 0);
				return;
			}

			int sumValue = 0;

			if (taskNum < hNum) {
				// ?????????
				ShaoZhuGoldPigSender.sendCmd_5496(hid, 1, pigType, taskId, 0, 0);
				return;
			} else if (taskNum == hNum) {
				// ?????????????????????
				if (taskNum > nowTaskNum) {
					// ????????????
					return;
				}

				if (taskNum == nowTaskNum) {
					if (taskInfo.getTaskState() == 0) {
						// ?????????
						ShaoZhuGoldPigSender.sendCmd_5496(hid, 2, pigType, taskId, 0, 0);
						return;
					} else {
						// ???????????????????????????
						if (pigType == 1) {
							taskInfo.setGoldPigTaskId(-1);
						} else {
							taskInfo.setSilverPigTaskId(-1);
						}
					}
				} else {
					// ?????????
					if (pigType == 1) {
						taskInfo.setGoldPigTaskId(pigrw.getNext());
					} else {
						taskInfo.setSilverPigTaskId(pigrw.getNext());
					}
				}
				if (pigType == 1) {
					model.setGoldPigValue(model.getGoldPigValue() + addValue);
					sumValue = model.getGoldPigValue();
				} else {
					model.setSilverPigValue(model.getSilverPigValue() + addValue);
					sumValue = model.getSilverPigValue();
				}
				UseAddUtil.add(hero, reward, SourceGoodConst.SHAO_ZHU_GOLD_PIG_TASK_AWARD, UseAddUtil.getDefaultMail(),
						true); // ????????????

				int nextState = 0;
				if (taskNum + 1 < nowTaskNum) {
					nextState = 1;
				} else if (taskNum + 1 == nowTaskNum) {
					if (taskInfo.getTaskState() == 1) {
						nextState = 1;
					}
				} else {
					nextState = taskInfo.getTaskState() == 1 ? 2 : 0;
				}
				ShaoZhuGoldPigSender.sendCmd_5496(hid, 0, pigType, taskId, nextState, sumValue);
			} else {
				// ????????????
				return;
			}
		} catch (Exception e) {
			LogTool.error(e, ShaoZhuGoldPigManager.class, hid, hero.getName(), "ShaoZhuGoldPigManager getHeadAward");
		}
	}

}
