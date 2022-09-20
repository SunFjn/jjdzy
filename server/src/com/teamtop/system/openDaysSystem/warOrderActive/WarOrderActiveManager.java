package com.teamtop.system.openDaysSystem.warOrderActive;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.bag.BagFunction;
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
import com.teamtop.system.openDaysSystem.warOrderActive.model.WarOrderActive;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_sgzljin_017;
import excel.config.Config_sgzljl_017;
import excel.config.Config_sgzlshop_017;
import excel.struct.Struct_sgzljin_017;
import excel.struct.Struct_sgzljl_017;
import excel.struct.Struct_sgzlrw_017;
import excel.struct.Struct_sgzlshop_017;

public class WarOrderActiveManager extends AbsOpenDaysManager {

	private static WarOrderActiveManager ins;

	private WarOrderActiveManager() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized WarOrderActiveManager getIns() {
		if (ins == null) {
			ins = new WarOrderActiveManager();
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
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.WARORDER)) {
				return;
			}
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.WARORDER);
			WarOrderActive model = (WarOrderActive) getSystemModel(hero, uid);
			List<Object[]> sendData = new ArrayList<>();
			List<Object[]> sendData1 = new ArrayList<>();
			WarOrderActiveFunction.getIns().checkALLTask(hero);// 检查全部任务
			WarOrderActiveFunction.getIns().updateLevel(hero);
			Map<Integer, Map<Integer, Struct_sgzljl_017>> OrderMap = WarOrderActiveSysCache.getWarOrderMap();
			Map<Integer, Map<Integer, Integer>> warOrderMap = model.getWarOrderMap();
			Iterator<Integer> iterator = OrderMap.keySet().iterator();
			while (iterator.hasNext()) {
				Integer warOrderState = iterator.next();
				Map<Integer, Struct_sgzljl_017> map = OrderMap.get(warOrderState);
				Iterator<Integer> iterator2 = map.keySet().iterator();
				while (iterator2.hasNext()) {
					Integer level = iterator2.next();
					Map<Integer, Integer> heroWarOrderMap = warOrderMap.get(warOrderState);
					Integer state = heroWarOrderMap.get(level);
					if (state == null) {
						state = 0;
						heroWarOrderMap.put(level, state);
					}
					sendData1.add(new Object[] { level, state });// 等级 领取状态
				}
				sendData.add(new Object[] { warOrderState, sendData1.toArray() });// 战令类型
			}
			int buyState = model.getBuyState();
			int level = model.getLevel();
			int exp = model.getExp();
			WarOrderActiveSender.sendCmd_8850(hid, sendData.toArray(), buyState, level, exp);
		} catch (Exception e) {
			LogTool.error(e, WarOrderActiveManager.class, hid, hero.getName(), "WarOrderActiveManager openUI");
		}
	}

	/**
	 * 领取战令奖励
	 * 
	 * @param hero
	 * @param type
	 *            战令类型
	 * @param level
	 *            战令
	 * @param getState
	 *            领取方式 0普通领取 1一键领取
	 */
	public void getWarOrderReward(Hero hero, int type, int level, int getState) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.WARORDER)) {
				return;
			}
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.WARORDER);
			WarOrderActive model = (WarOrderActive) getSystemModel(hero, uid);
			if (getState == 1) {
				// 一键领取
				Map<Integer, Map<Integer, Integer>> warOrderMap = model.getWarOrderMap();
				int buyState = model.getBuyState();
				int orderLevel = model.getLevel();
				boolean isGet = false;
				Iterator<Integer> iterator = warOrderMap.keySet().iterator();
				while (iterator.hasNext()) {
					int warOrderSatate = iterator.next();
					Map<Integer, Integer> map = warOrderMap.get(warOrderSatate);
					Iterator<Integer> iterator2 = map.keySet().iterator();
					while (iterator2.hasNext()) {
						int warOrderLevel = iterator2.next();
						Struct_sgzljl_017 struct_sgzljl_017 = Config_sgzljl_017.getIns().get(warOrderLevel);
						if (warOrderLevel > orderLevel) {
							break;
						}
						int state1 = map.get(warOrderLevel);
						if (state1 == WarOrderActiveConst.CAN_GET) {
							if (warOrderSatate == 0) {
								if (!UseAddUtil.canAdd(hero, struct_sgzljl_017.getPutong(), false)) {
									return;
								}
								UseAddUtil.add(hero, struct_sgzljl_017.getPutong(),
										SourceGoodConst.WARORDER_REWARD, UseAddUtil.getDefaultMail(), true);
								isGet = true;
								map.put(warOrderLevel, WarOrderActiveConst.ALREADY_GET);
							} else if (warOrderSatate == 1 && buyState == WarOrderActiveConst.BUY) {
								// 购买进阶战令
								if (!UseAddUtil.canAdd(hero, struct_sgzljl_017.getJinjie(), false)) {
									return;
								}
								UseAddUtil.add(hero, struct_sgzljl_017.getJinjie(),
										SourceGoodConst.WARORDER_REWARD, UseAddUtil.getDefaultMail(), true);
								isGet = true;
								map.put(warOrderLevel, WarOrderActiveConst.ALREADY_GET);
							}
						}
					}
				}
				if (!isGet) {
					// 没有可领取的奖励
					WarOrderActiveSender.sendCmd_8852(hid, 2, getState, type, level);
					return;
				}
				WarOrderActiveSender.sendCmd_8852(hid, 3, getState, type, level);
				// openUI(hero);
				return;
			} else if (getState == 0) {
				// 普通领取
				Map<Integer, Map<Integer, Integer>> warOrderMap = model.getWarOrderMap();
				if (type > model.getBuyState()) {
					// 没有购买进阶战令不能领取
					WarOrderActiveSender.sendCmd_8852(hid, 0, getState, type, level);
					return;
				}
				Map<Integer, Integer> map = warOrderMap.get(type);
				Integer orderState = map.get(level);
				if (orderState != WarOrderActiveConst.CAN_GET) {
					// 该等级奖励不可领取
					WarOrderActiveSender.sendCmd_8852(hid, 1, getState, type, level);
					return;
				}
				Struct_sgzljl_017 sgzljl_017 = Config_sgzljl_017.getIns().get(level);
				int[][] reward = null;
				if (type == 0) {
					reward = sgzljl_017.getPutong();
				} else if (type == 1) {
					reward = sgzljl_017.getJinjie();
				}
				if (!UseAddUtil.canAdd(hero, reward, false)) {
					return;
				}
				UseAddUtil.add(hero, reward, SourceGoodConst.WARORDER_REWARD, UseAddUtil.getDefaultMail(), true);
				map.put(level, WarOrderActiveConst.ALREADY_GET);
				WarOrderActiveSender.sendCmd_8852(hid, 3, getState, type, level);
				// openUI(hero);
				WarOrderActiveFunction.getIns().updateRedPoint(hero);
			} else {
				// 非法值
				return;
			}
		} catch (Exception e) {
			LogTool.error(e, WarOrderActiveManager.class, hid, hero.getName(),
					"WarOrderActiveManager getReward, level=" + level);
		}
	}

	public void openTaskUI(Hero hero) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.WARORDER)) {
				return;
			}
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.WARORDER);
			WarOrderActive model = (WarOrderActive) getSystemModel(hero, uid);
			Map<Integer, Map<Integer, Integer>> rewardMap = model.getRewardMap();
			Map<Integer, Integer> activeMap = model.getActiveMap();
			Map<Integer, Map<Integer, Struct_sgzlrw_017>> typeTaskMap = WarOrderActiveSysCache
					.getTypeTaskMap();
			Iterator<Integer> iterator = typeTaskMap.keySet().iterator();
			int type = 0;
			Integer typeNum = 0;
			Map<Integer, Integer> stateMap = null;
			Map<Integer, Struct_sgzlrw_017> taskMap = null;
			Iterator<Struct_sgzlrw_017> iterator2 = null;
			Struct_sgzlrw_017 sgzlrw_017 = null;
			int id = 0;
			Integer state = 0;
			List<Object[]> taskData = new ArrayList<>();
			WarOrderActiveFunction.getIns().checkALLTask(hero); // 检查全部任务
			for (; iterator.hasNext();) {
				type = iterator.next();
				typeNum = activeMap.get(type);
				if (typeNum == null) {
					typeNum = 0;
				}
				stateMap = rewardMap.get(type);
				List<Object[]> taskList = new ArrayList<>();
				taskMap = typeTaskMap.get(type);
				iterator2 = taskMap.values().iterator();
				for (; iterator2.hasNext();) {
					state = 0;
					sgzlrw_017 = iterator2.next();
					id = sgzlrw_017.getId();
					if (stateMap != null) {
						state = stateMap.get(id);
					}
					if (state == null) {
						// continue;
						state = 0;
					}
					taskList.add(new Object[] { id, state });// 任务id 任务状态
				}
				taskData.add(new Object[] { type, typeNum, taskList.toArray() });// 任务类型 完成度
			}
			WarOrderActiveSender.sendCmd_8854(hid, taskData.toArray());
		} catch (Exception e) {
			LogTool.error(e, WarOrderActiveManager.class, hid, hero.getName(), "WarOrderActiveManager openUI");
		}
	}

	/**
	 * 领取任务奖励
	 * 
	 * @param hero
	 * @param type
	 * @param taskId
	 */
	public void getReward(Hero hero, int type, int taskId) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.WARORDER)) {
				return;
			}
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.WARORDER);
			WarOrderActive model = (WarOrderActive) getSystemModel(hero, uid);
			Map<Integer, Struct_sgzlrw_017> taskMap = WarOrderActiveSysCache.getTypeTaskMap().get(type);
			if (!taskMap.containsKey(taskId)) {
				// 非法任务id
				return;
			}
			Struct_sgzlrw_017 sgzlrw_017 = taskMap.get(taskId);
			int id = sgzlrw_017.getId();
			Map<Integer, Map<Integer, Integer>> rewardMap = model.getRewardMap();
			Map<Integer, Integer> stateMap = rewardMap.get(type);
			if (!stateMap.containsKey(id)) {
				// if (stateMap.get(taskId) == WarOrderActiveConst.CANNOT_GET) {
				// 未完成任务
				WarOrderActiveSender.sendCmd_8856(hid, 0, 1, 0, model.getLevel(), model.getExp());
				return;
			}
			Integer state = stateMap.get(id);
			if (state == WarOrderActiveConst.ALREADY_GET) {
				// 已领取
				WarOrderActiveSender.sendCmd_8856(hid, 0, 2, 0, model.getLevel(), model.getExp());
				return;
			}
			stateMap.put(id, WarOrderActiveConst.ALREADY_GET);
			/*stateMap.remove(id);
			int houzhi = Config_sgzlrw_017.getIns().get(id).getHouzhi();
			if (houzhi != 0) {
				stateMap.put(houzhi, WarOrderActiveConst.CANNOT_GET);
			} else {
				stateMap.put(id, WarOrderActiveConst.ALREADY_GET);// 该类型全部任务已做完
			}*/
			int[][] reward = sgzlrw_017.getPutong();
			UseAddUtil.add(hero, reward, SourceGoodConst.WARORDER_TASKREWARD, UseAddUtil.getDefaultMail(), true);
			WarOrderActiveFunction.getIns().updateLevel(hero);// 更新等级和奖励
			WarOrderActiveFunction.getIns().checkALLTask(hero);// 检查全部任务
			WarOrderActiveSender.sendCmd_8856(hid, 1, type, taskId, model.getLevel(), model.getExp());
			WarOrderActiveFunction.getIns().updateRedPoint(hero);
		} catch (Exception e) {
			LogTool.error(e, WarOrderActiveManager.class, hid, hero.getName(),
					"WarOrderActiveManager getReward, taskId=" + taskId);
		}
	 }

	/**
	 * 打开商店界面
	 * 
	 * @param hero
	 */
	public void openShopUI(Hero hero) {
		// TODO Auto-generated method stub
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.WARORDER)) {
				return;
			}
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.WARORDER);
			WarOrderActive model = (WarOrderActive) getSystemModel(hero, uid);
			Map<Integer, Integer> buyMap = model.getBuyMap();
			List<Struct_sgzlshop_017> list = Config_sgzlshop_017.getIns().getSortList();
			List<Object> shopList = new ArrayList<>();
			for (Struct_sgzlshop_017 sgzlshop_017 : list) {
				Integer num = buyMap.get(sgzlshop_017.getId());
				if (num == null) {
					num = 0;
					buyMap.put(sgzlshop_017.getId(), num);
				}
				shopList.add(new Object[] { sgzlshop_017.getId(), num });
			}
			int prop1 = BagFunction.getIns().getGoodsNumBySysId(hero.getId(), WarOrderActiveConst.PROP_1);
			int prop2 = BagFunction.getIns().getGoodsNumBySysId(hero.getId(), WarOrderActiveConst.PROP_2);
			WarOrderActiveSender.sendCmd_8858(hero.getId(), shopList.toArray(), prop1, prop2);
		} catch (Exception e) {
			LogTool.error(e, WarOrderActiveManager.class, hid, hero.getName(), "WarOrderActiveManager openShopUI");
		}
	}

	/**
	 * 购买
	 * 
	 * @param hero
	 * @param id
	 *            购买的配置表id
	 */
	public void buy(Hero hero, int id) {
		// TODO Auto-generated method stub
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.WARORDER)) {
				return;
			}
			Struct_sgzlshop_017 struct_sgzlshop_017 = Config_sgzlshop_017.getIns().get(id);
			if (struct_sgzlshop_017 == null) {
				WarOrderActiveSender.sendCmd_8860(hero.getId(), 0, id);
				return;
			}
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.WARORDER);
			WarOrderActive model = (WarOrderActive) getSystemModel(hero, uid);
			Map<Integer, Integer> buyMap = model.getBuyMap();
			Integer num = buyMap.get(id);
			int time = struct_sgzlshop_017.getTime();
			if (time > 0 && num >= time) {
				// 没有购买次数
				WarOrderActiveSender.sendCmd_8860(hero.getId(), 3, id);
				return;
			}
			int[][] money = struct_sgzlshop_017.getMoney();
			if (!UseAddUtil.canUse(hero, money)) {
				// 道具不足
				WarOrderActiveSender.sendCmd_8860(hero.getId(), 2, id);
				return;
			}
			buyMap.put(id, num + 1);// 购买次数加1
			int[][] item = struct_sgzlshop_017.getItem();
			// 消耗
			UseAddUtil.use(hero, money, SourceGoodConst.WARORDERSHOP_BUY, true);
			// 添加道具
			UseAddUtil.add(hero, item, SourceGoodConst.WARORDERSHOP_BUYITEM, UseAddUtil.getDefaultMail(), true);
			WarOrderActiveSender.sendCmd_8860(hero.getId(), 1, id);
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, WarOrderActiveManager.class, hid, hero.getName(), "buy id:" + id);
		}
	}

	@Override
	public void handleOpenPub() {
		// TODO Auto-generated method stub

	}

	@Override
	public void handleOpen(Hero hero, int uid) {
		// TODO Auto-generated method stub
		int oneDayRecharge = hero.getOneDayRecharge();// 兼容充值
		// 三国战令
		WarOrderActiveFunction.getIns().updateTaskNum(hero, WarOrderActiveEnum.GOAL_11, oneDayRecharge);
		int oneDayConsume = hero.getOneDayConsume();// 兼容消费
		// 三国战令
		WarOrderActiveFunction.getIns().updateTaskNum(hero, WarOrderActiveEnum.GOAL_12, oneDayConsume);
	}

	@Override
	public void handleEndPub() {
		// TODO Auto-generated method stub

	}

	@Override
	public void handleEnd(Hero hero, int uid) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			WarOrderActive model = (WarOrderActive) getSystemModel(hero, uid);
			int buyState = model.getBuyState();
			Map<Integer, Map<Integer, Integer>> warOrderMap = model.getWarOrderMap();
			List<int[]> dropArr = new ArrayList<>();
			Iterator<Integer> iterator = warOrderMap.keySet().iterator();
			while (iterator.hasNext()) {
				Integer type = iterator.next();
				if (buyState < type) {
					// 没购买三国战令
					break;
				}
				Map<Integer, Integer> map = warOrderMap.get(type);
				Iterator<Integer> iterator2 = map.keySet().iterator();
				while (iterator2.hasNext()) {
					Integer level = iterator2.next();
					Struct_sgzljl_017 struct_sgzljl_017 = Config_sgzljl_017.getIns().get(level);
					Integer state = map.get(level);
					if (state != WarOrderActiveConst.CAN_GET) {
						continue;
					}
					if (type == 0) {
						int[][] putong = struct_sgzljl_017.getPutong();
						for (int i = 0; i < putong.length; i++) {
							dropArr.add(putong[i]);
						}
						map.put(level, WarOrderActiveConst.ALREADY_GET);
						warOrderMap.put(0, map);
					} else if (type == WarOrderActiveConst.BUY) {
						int[][] jinjie = struct_sgzljl_017.getJinjie();
						for (int i = 0; i < jinjie.length; i++) {
							dropArr.add(jinjie[i]);
						}
						map.put(level, WarOrderActiveConst.ALREADY_GET);
						warOrderMap.put(WarOrderActiveConst.BUY, map);
					}
				}			
			}
			if (dropArr.size() == 0) {
				return;
			}
			int[][] drops = new int[dropArr.size()][];
			int[][] reward = dropArr.toArray(drops);
			int mailId = MailConst.WARORDER_AWARD;
			if (reward != null) {
				MailFunction.getIns().sendMailWithFujianData2(hero.getId(), mailId, new Object[] { mailId }, reward);
			}
		}
		catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, WarOrderActiveManager.class, hid, hero.getName(), "WarOrderActiveManager handleEnd");
		}
	}

	@Override
	public AbsOpenDaysSystemModel getSystemModel(Hero hero, int uid) {
		HeroOpenDaysSysData heroOpenDaysSysData = hero.getHeroOpenDaysSysData();
		WarOrderActive data = (WarOrderActive) heroOpenDaysSysData.getOpSysDataMap().get(uid);
		if (data == null) {
			data = new WarOrderActive();
			Map<Integer, Integer> activeMap = new HashMap<>();
			Map<Integer, Map<Integer, Integer>> rewardMap = new HashMap<>();
			Iterator<Integer> iterator = WarOrderActiveSysCache.getTypeTaskMap().keySet().iterator();
			int type = 0;
			for (; iterator.hasNext();) {
				type = iterator.next();
				Map<Integer, Integer> map0 = new HashMap<>();
				rewardMap.put(type, map0);
				/*for (Struct_sgzlrw_017 sgzlrw_017 : Config_sgzlrw_017.getIns().getSortList()) {
					int id = sgzlrw_017.getId();
					int leixing = sgzlrw_017.getLeixing();
					if (leixing != type) {
						continue;
					}
					if (id % 1000 == 1) {
						// 寻找初始任务
						map0.put(id, 0);
					}
				}*/
			}
			Map<Integer, Map<Integer, Integer>> warOrderMap = new HashMap<>();
			Map<Integer, Integer> map = new HashMap<>();
			Map<Integer, Integer> map1 = new HashMap<>();
			warOrderMap.put(0, map);// 普通战令
			warOrderMap.put(WarOrderActiveConst.BUY, map1);// 进阶战令
			for (Struct_sgzljl_017 sgzljl_017 : Config_sgzljl_017.getIns().getMap().values()) {
				map.put(sgzljl_017.getDengji(), WarOrderActiveConst.CANNOT_GET);
				map1.put(sgzljl_017.getDengji(), WarOrderActiveConst.CANNOT_GET);
			}
			Map<Integer, Integer> loginDayMap = new HashMap<>();
			int betweenOpen = TimeDateUtil.betweenOpen();
			if (loginDayMap.get(betweenOpen) == null) {
				loginDayMap.put(betweenOpen, 1);
			}
			Map<Integer, Integer> buyMap = new HashMap<>();
			for (Struct_sgzlshop_017 sgzlshop_017 : Config_sgzlshop_017.getIns().getSortList()) {
				int id = sgzlshop_017.getId();
				buyMap.put(id, 0);
			}
			data.setLoginDay(loginDayMap);
			data.setActiveMap(activeMap);
			data.setRewardMap(rewardMap);
			data.setWarOrderMap(warOrderMap);
			data.setBuyMap(buyMap);
		}
		return data;
	}

	@Override
	public Class<?> getSystemModel() {
		// TODO Auto-generated method stub
		return WarOrderActive.class;
	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		return WarOrderActiveSysEvent.getIns();
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {
		// TODO Auto-generated method stub
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.WARORDER)) {
				return;
			}
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.WARORDER);
			WarOrderActive model = (WarOrderActive) getSystemModel(hero, uid);
			for (Struct_sgzljin_017 sgzljin_017 : Config_sgzljin_017.getIns().getMap().values()) {
				int shangpin = sgzljin_017.getShangpin();
				if (shangpin == product_id) {
					// 战令
					if (model.getBuyState() == WarOrderActiveConst.BUY) {
						// 已购买
						break;
					}
					model.setBuyState(WarOrderActiveConst.BUY);
					int level = model.getLevel();
					Map<Integer, Map<Integer, Integer>> warOrderMap = model.getWarOrderMap();
					Map<Integer, Integer> map = warOrderMap.get(WarOrderActiveConst.BUY);// 进阶后的战令
					for (int i = 1; i <= level; i++) {
						// 从1级开始遍历 问了罗导0级以后不会有奖励
						map.put(i, WarOrderActiveConst.CAN_GET);// 购买后遍历到最高等级全部为可领取
					}
					int[][] jinjie = sgzljin_017.getJinjie();
					UseAddUtil.add(hero, jinjie, SourceGoodConst.WARORDER,
							UseAddUtil.getDefaultMail(), true); // 发放奖励
				}
			}
			// 三国战令
			WarOrderActiveFunction.getIns().updateTaskNum(hero, WarOrderActiveEnum.GOAL_10, 0);
			WarOrderActiveFunction.getIns().updateTaskNum(hero, WarOrderActiveEnum.GOAL_11, money);
			openUI(hero);
		} catch (Exception e) {
			LogTool.error(e, WarOrderActiveManager.class, hid, hero.getName(), "WarOrderActiveManager rechargeHandle");
		}
	}

	@Override
	public void consumeHandle(Hero hero, int consumeNum, int reason) {
		// TODO Auto-generated method stub
		WarOrderActiveFunction.getIns().updateTaskNum(hero, WarOrderActiveEnum.GOAL_12, consumeNum);
	}

}
