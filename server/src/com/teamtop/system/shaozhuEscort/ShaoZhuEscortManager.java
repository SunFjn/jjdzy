package com.teamtop.system.shaozhuEscort;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Optional;

import com.alibaba.fastjson.JSON;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.OpTaskConst;
import com.teamtop.synHandleCore.orderedRunnable.RankingOpTaskRunnable;
import com.teamtop.system.activity.ativitys.achievementTree.AchievementTreeEnum;
import com.teamtop.system.activity.ativitys.achievementTree.AchievementTreeFunction;
import com.teamtop.system.activity.ativitys.baoZangPinTu.BaoZangPinTuConst;
import com.teamtop.system.activity.ativitys.baoZangPinTu.BaoZangPinTuFunction;
import com.teamtop.system.activity.ativitys.warOrder.WarOrderEnum;
import com.teamtop.system.activity.ativitys.warOrder.WarOrderFunction;
import com.teamtop.system.activity.ativitys.wuJiangGoal.WuJiangGoalEnum;
import com.teamtop.system.activity.ativitys.wuJiangGoal.WuJiangGoalFunction;
import com.teamtop.system.chat.ChatConst;
import com.teamtop.system.chat.ChatManager;
import com.teamtop.system.daytask.DayTaskConst;
import com.teamtop.system.daytask.DayTaskFunction;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.FightAttrFunction;
import com.teamtop.system.hero.FinalFightAttr;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroConst;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.HeroMapper;
import com.teamtop.system.hero.HeroSender;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.openDaysSystem.warOrder.WarOrderNewEnum;
import com.teamtop.system.openDaysSystem.warOrder.WarOrderNewFunction;
import com.teamtop.system.shaozhuEscort.model.ShaoZhuEscort;
import com.teamtop.system.shaozhuEscort.model.ShaoZhuEscortInfo;
import com.teamtop.system.shaozhuEscort.model.ShaoZhuEscortPlayBack;
import com.teamtop.system.shaozhuEscort.model.ShaoZhuEscortRecord;
import com.teamtop.system.skill.model.SkillInfo;
import com.teamtop.system.wujiang.WuJiang;
import com.teamtop.system.wujiang.WuJiangFunction;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventUtil;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.mybatis.DaoUtil;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_szhs_401;
import excel.struct.Struct_szhs_401;

public class ShaoZhuEscortManager {
	private static volatile ShaoZhuEscortManager ins = null;

	public static ShaoZhuEscortManager getIns() {
		if (ins == null) {
			synchronized (ShaoZhuEscortManager.class) {
				if (ins == null) {
					ins = new ShaoZhuEscortManager();
				}
			}
		}
		return ins;
	}

	private ShaoZhuEscortManager() {
	}

	/**
	 * 打开界面 8001
	 * 
	 * @param hero
	 */
	public void openUI(Hero hero) {
		// TODO Auto-generated method stub
		if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.SHAOZHU_ESCORT)) {
			return;
		}
		ShaoZhuEscortFunction.getIns().isGettedAward(hero);
		List<ShaoZhuEscortInfo> shaozhuEscortInfoList = ShaoZhuEscortSysCache.getShaozhuEscortInfoList();
		int size = shaozhuEscortInfoList.size();
		// 少主护送列表
		List<Object[]> infoArrayList = new ArrayList<>();
		boolean isHasHero = false;
		for (int i = 0; i < size; i++) {
			if (!isHasHero && i == ShaoZhuEscortConst.ESCORT_MAX_NUM - 1) {
				// 除去玩家自己，满足策划要求的同屏护送者不能超过6人，自己的护送永远在中间跑过去
				break;
			}
			ShaoZhuEscortInfo shaozhuEscortInfo = shaozhuEscortInfoList.get(i);
			long hid = shaozhuEscortInfo.getHid();
			if (hero.getId() == hid) {
				// 除去玩家自己，满足策划要求的同屏护送者不能超过6人，自己的护送永远在中间跑过去
				isHasHero = true;
				continue;
			}
			int reachTime = shaozhuEscortInfo.getReachTime();
			int state = isCanIntercept(hero, shaozhuEscortInfo);
			infoArrayList.add(new Object[] { shaozhuEscortInfo.getHid(), shaozhuEscortInfo.getName(),
					shaozhuEscortInfo.getWujiangId(), shaozhuEscortInfo.getStrength(), shaozhuEscortInfo.getIcon(),
					shaozhuEscortInfo.getFrame(), shaozhuEscortInfo.getCountryType(), reachTime, state });
		}
		ShaoZhuEscort shaozhuEscort = hero.getShaozhuEscort();
		int escortTimes = shaozhuEscort.getEscortTimes();
		int interceptTimes = shaozhuEscort.getInterceptTimes();
		int escortWuJiang = shaozhuEscort.getEscortWuJiang();
		int state = shaozhuEscort.getState();
		int reachTime = shaozhuEscort.getReachTime();
		ShaoZhuEscortSender.sendCmd_8002(hero.getId(), infoArrayList.toArray(), escortTimes, interceptTimes,
				escortWuJiang, reachTime, state);
	}

	/**
	 * 是否可拦截
	 * 
	 * @param hero
	 * @param shaozhuEscortInfo
	 * @return
	 */
	public int isCanIntercept(Hero hero, ShaoZhuEscortInfo shaozhuEscortInfo) {
		int interceptedTimes = shaozhuEscortInfo.getInterceptedTimes();
		List<Long> battleRecordHidList = shaozhuEscortInfo.getBattleRecordHidList();
		if (interceptedTimes < ShaoZhuEscortConst.MAX_INTERCEPTED_TIMES
				&& !battleRecordHidList.contains(hero.getId())) {
			// 没到被拦截次数上限且玩家没打过
			return ShaoZhuEscortConst.CAN_INTERCEPT;
		}
		return ShaoZhuEscortConst.NOT_CAN_INTERCEPT;
	}

	public Object[] lossAward(int wujiangId, int battleResult) {
		// int size = Config_szhs_401.getIns().getSortList().size();
		if (battleResult == ShaoZhuEscortConst.FAILURE) {
			// 输了但不是武将护送
			Object[] lossAwardArray = ShaoZhuEscortSysCache.getLossAwardArrayMap().get(wujiangId);
			return lossAwardArray;
		}
		return null;
	}

	/**
	 * 开始护送 8003
	 * 
	 * @param hero
	 */
	public void escort(Hero hero) {
		// TODO Auto-generated method stub
		if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.SHAOZHU_ESCORT)) {
			return;
		}
		ShaoZhuEscort shaozhuEscort = hero.getShaozhuEscort();
		int state = shaozhuEscort.getState();
		if (state != ShaoZhuEscortConst.NO_ESCORT) {
			LogTool.warn("hid:" + hero.getId() + "name:" + hero.getName() + "state:" + state, this);
			ShaoZhuEscortSender.sendCmd_8004(hero.getId(), ShaoZhuEscortConst.FAILURE);
			return;
		}
		int escortTimes = shaozhuEscort.getEscortTimes();
		if (escortTimes >= ShaoZhuEscortConst.MAX_DAY_CAN_ESCORT_TIMES) {
			LogTool.warn("hid:" + hero.getId() + "name:" + hero.getName() + "escortTimes:" + escortTimes, this);
			ShaoZhuEscortSender.sendCmd_8004(hero.getId(), ShaoZhuEscortConst.FULL_ESCORT_TIMES);
			return;
		}
		// 每日任务
		DayTaskFunction.getIns().successDayTaskType(hero, DayTaskConst.DATTASK_TYPE30);
		// 限定武将
		WuJiangGoalFunction.getIns().updateTaskNum(hero, WuJiangGoalEnum.TASK_6, 1);
		shaozhuEscort.setEscortTimes(escortTimes + 1);
		shaozhuEscort.setState(ShaoZhuEscortConst.ESCORTING);
		int currentTime = TimeDateUtil.getCurrentTime();
		int reachTime = currentTime + ShaoZhuEscortConst.ESCORT_FINISH_TIME;
		shaozhuEscort.setReachTime(reachTime);
		ShaoZhuEscortFunction.getIns().escortAddCacheHandle(hero, reachTime, false);
		ShaoZhuEscortSender.sendCmd_8004(hero.getId(), ShaoZhuEscortConst.SUCCESS);
		int escortWuJiang = shaozhuEscort.getEscortWuJiang();
		// 成就树
		AchievementTreeFunction.getIns().checkTask(hero, AchievementTreeEnum.TASK_9, 1, escortWuJiang);
		if (ShaoZhuEscortFunction.getIns().isLvBuEscort(escortWuJiang)) {
			ChatManager.getIns().broadCast(ChatConst.LB_ESCORT_BROADCAST, new Object[] { hero.getName() }); // 全服广播
			// 宝藏拼图
			BaoZangPinTuFunction.getIns().checkTask(hero, BaoZangPinTuConst.TASK_TYPE_3, 1);
			// 犒赏三军(活动)
			WarOrderFunction.getIns().updateTaskNum(hero, WarOrderEnum.GOAL_10, 1);
			// 犒赏三军(开服)
			WarOrderNewFunction.getIns().updateTaskNum(hero, WarOrderNewEnum.GOAL_10, 1);
		}
	}

	/**
	 * 刷新 8005
	 * 
	 * @param type|
	 *            刷新类型：1：普通刷新，2：一键刷新| byte
	 */
	public void reflesh(Hero hero, int type) {
		// TODO Auto-generated method stub
		Integer wujiangPro = null;
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.SHAOZHU_ESCORT)) {
				return;
			}
			boolean isGettedAward = ShaoZhuEscortFunction.getIns().isGettedAward(hero);
			if (!isGettedAward) {
				return;
			}
			if (type != 1 && type != 2) {
				return;
			}
			int size = Config_szhs_401.getIns().getSortList().size();
			ShaoZhuEscort shaozhuEscort = hero.getShaozhuEscort();
			int state = shaozhuEscort.getState();
			if (state != ShaoZhuEscortConst.NO_ESCORT) {
				return;
			}
			int escortTimes = shaozhuEscort.getEscortTimes();
			if (escortTimes >= ShaoZhuEscortConst.MAX_DAY_CAN_ESCORT_TIMES) {
				LogTool.warn("hid:" + hero.getId() + "name:" + hero.getName() + "escortTimes:" + escortTimes, this);
				ShaoZhuEscortSender.sendCmd_8006(hero.getId(), ShaoZhuEscortConst.FULL_ESCORT_TIMES, 0);
				return;
			}
			int escortWuJiang = shaozhuEscort.getEscortWuJiang();
			if (escortWuJiang >= size) {
				LogTool.warn("hid:" + hero.getId() + "name:" + hero.getName() + "escortWuJiang:" + escortWuJiang, this);
				ShaoZhuEscortSender.sendCmd_8006(hero.getId(), 3, 0);
				return;
			}
			int[][] refleshconsume;
			if (type == 1) {
				refleshconsume = ShaoZhuEscortConst.COMMON_REFLESHCONSUME;
			} else {
				refleshconsume = ShaoZhuEscortConst.ONEKEY_REFLESHCONSUME;
				escortWuJiang = size;
			}

			if (!UseAddUtil.canUse(hero, refleshconsume)) { // 元宝不足
				ShaoZhuEscortSender.sendCmd_8006(hero.getId(), 0, 0);
				return;
			}
			UseAddUtil.use(hero, refleshconsume, SourceGoodConst.SHAOZHU_ESCORT_CONSUME, true);
			if (escortWuJiang == size) {
				shaozhuEscort.setEscortWuJiang(escortWuJiang);
				ShaoZhuEscortSender.sendCmd_8006(hero.getId(), 1, escortWuJiang);
				return;
			}
			Map<Integer, ProbabilityEventModel> idToProbabilityMap = ShaoZhuEscortSysCache.getIdToProbabilityMap();
			ProbabilityEventModel pm = idToProbabilityMap.get(escortWuJiang);
			wujiangPro = (Integer) ProbabilityEventUtil.getEventByProbability(pm);
			if (wujiangPro == null || wujiangPro == escortWuJiang) {
				int refleshThreshold = shaozhuEscort.getRefleshThreshold();
				Struct_szhs_401 struct_szhs_401 = Config_szhs_401.getIns().get(escortWuJiang);
				int addyz = struct_szhs_401.getAddyz();
				int yz = struct_szhs_401.getYz();
				if (refleshThreshold + addyz >= yz) {
					refleshThreshold = 0;
					escortWuJiang++;
				} else {
					refleshThreshold += addyz;
				}
				shaozhuEscort.setRefleshThreshold(refleshThreshold);
				wujiangPro = escortWuJiang;
			} else {
				// 升级就刷新阈值
				shaozhuEscort.setRefleshThreshold(0);
			}
			shaozhuEscort.setEscortWuJiang(wujiangPro);
			ShaoZhuEscortSender.sendCmd_8006(hero.getId(), 1, wujiangPro);
			openUI(hero);
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(),
					"type:" + type + "wujiangPro:" + (wujiangPro == null ? 0 : wujiangPro));
		}
	}

	/**
	 * 领取奖励 8009
	 * 
	 * @param hero
	 */
	public void getAward(Hero hero) {
		// TODO Auto-generated method stub
		if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.SHAOZHU_ESCORT)) {
			return;
		}
		Map<Integer, Map<Integer, Integer>> rewardMap = new HashMap<>();
		try {
			ShaoZhuEscort shaozhuEscort = hero.getShaozhuEscort();
			int state = shaozhuEscort.getState();
			if (state != ShaoZhuEscortConst.ESCORT_FINISH) {
				LogTool.warn("hid:" + hero.getId() + "name:" + hero.getName() + "state:" + state, this);
				ShaoZhuEscortSender.sendCmd_8010(hero.getId(), ShaoZhuEscortConst.FAILURE);
				return;
			}
			int interceptedTimes = shaozhuEscort.getInterceptedTimes();
			int escortWuJiang = shaozhuEscort.getEscortWuJiang();
			shaozhuEscort.setState(ShaoZhuEscortConst.NO_ESCORT);
			shaozhuEscort.setEscortWuJiang(1);
			shaozhuEscort.setRefleshThreshold(0);
			shaozhuEscort.setInterceptedTimes(0);
			Struct_szhs_401 struct_szhs_401 = Config_szhs_401.getIns().get(escortWuJiang);
			int[][] reward = struct_szhs_401.getReward();
			int[][] lj = struct_szhs_401.getLj();
			// 计算奖励:奖励-拦截奖励*拦截次数
			CommonUtil.arrayIntoMap(rewardMap, reward, 1);
			boolean isLvBuEscort = ShaoZhuEscortFunction.getIns().isLvBuEscort(escortWuJiang);
			if (!isLvBuEscort) {
				CommonUtil.arrayIntoMap(rewardMap, lj, interceptedTimes * -1);
			}
			int[][] calcReward = CommonUtil.awardMap2IntArray(rewardMap);
			// 发放奖励
			UseAddUtil.add(hero, calcReward, SourceGoodConst.SHAOZHU_ESCORT_REWARD, UseAddUtil.getDefaultMail(), true);
			ShaoZhuEscortSender.sendCmd_8010(hero.getId(), ShaoZhuEscortConst.SUCCESS);
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(), "rewardMapStr" + JSON.toJSONString(rewardMap));
		}
		openUI(hero);
	}

	/**
	 * 拦截
	 * 
	 * @param hero
	 * @param interceptedHid
	 *            被拦截的玩家id
	 */
	public void intercept(Hero hero, long interceptedHid) {
		// TODO Auto-generated method stub
		if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.SHAOZHU_ESCORT)) {
			return;
		}
		if (hero.getId() == interceptedHid) {
			return;
		}
		intercept_f1(hero, interceptedHid);
	}

	public void intercept_f1(Hero hero, long interceptedHid) {
		OpTaskExecutorService.PublicOrderService.execute(new RankingOpTaskRunnable() {
			@Override
			public void run() {
				ShaoZhuEscort shaozhuEscort = hero.getShaozhuEscort();
				int interceptTimes = shaozhuEscort.getInterceptTimes();
				if (interceptTimes >= ShaoZhuEscortConst.MAX_DAY_CAN_INTERCEPT_TIMES) {
					// 玩家当日拦截次数满了
					ShaoZhuEscortSender.sendCmd_8012(hero.getId(), ShaoZhuEscortConst.FULL_INTERCEP_TTIMES, null, 0, 0,
							0, 0, "", 0, 0);
					return;
				}
				List<ShaoZhuEscortInfo> findList = ShaoZhuEscortFunction.getIns()
						.deleteExpireAndFindHero(interceptedHid);
				int size2 = findList.size();
				if (size2 == 0) {
					// 被拦截的玩家不存在，数据过期了
					ShaoZhuEscortSender.sendCmd_8012(hero.getId(), ShaoZhuEscortConst.TIME_EXPIRE, null, 0, 0, 0, 0, "",
							0, 0);
					return;
				}
				ShaoZhuEscortInfo findShaoZhuEscortInfo = findList.get(0);
				int interceptedTimes = findShaoZhuEscortInfo.getInterceptedTimes();
				if (interceptedTimes >= ShaoZhuEscortConst.MAX_INTERCEPTED_TIMES) {
					// 已经达到单次护送中可被拦截次数上限
					ShaoZhuEscortSender.sendCmd_8012(hero.getId(), ShaoZhuEscortConst.FULL_INTERCEPTED_TIMES, null, 0,
							0, 0, 0, "", 0, 0);
					return;
				}
				Hero interceptedHero = HeroCache.getHero(interceptedHid, HeroConst.FIND_TYPE_SHAOZHU_ESCORT);
				ShaoZhuEscort interceptedShaoZhuEscort = interceptedHero.getShaozhuEscort();
				ArrayList<ShaoZhuEscortRecord> recordList = interceptedShaoZhuEscort.getRecordList();
				int recordListSize = recordList.size();
				int currentTime = TimeDateUtil.getCurrentTime();
				for (int i = 0; i < recordListSize; i++) {
					ShaoZhuEscortRecord shaozhuEscortRecord = recordList.get(i);
					int reachTime = shaozhuEscortRecord.getReachTime();
					long interceptHid = shaozhuEscortRecord.getInterceptHid();
					if (currentTime < reachTime && interceptHid == hero.getId()
							&& shaozhuEscortRecord.getBattleResult() == ShaoZhuEscortConst.FAILURE) {
						// 不能再次拦截同一个玩家同一护送的东西
						ShaoZhuEscortSender.sendCmd_8012(hero.getId(), ShaoZhuEscortConst.NOT_INTERCEPT_SAME, null, 0,
								0, 0, 0, "", 0, 0);
						return;
					}
				}
				shaozhuEscort.setInterceptTimes(interceptTimes + 1);
				long totalStrength = hero.getTotalStrength();
				long strength = findShaoZhuEscortInfo.getStrength();
				int wujiangId = findShaoZhuEscortInfo.getWujiangId();
				int battleResult = ShaoZhuEscortConst.SUCCESS;
				if (totalStrength > strength) {
					battleResult = ShaoZhuEscortConst.FAILURE;
					// 增加被拦截次数
					findShaoZhuEscortInfo.setInterceptedTimes(interceptedTimes + 1);
					ShaoZhuEscortFunction.getIns().updateEscortInfoTreeSet(findShaoZhuEscortInfo);
					interceptedShaoZhuEscort.setInterceptedTimes(interceptedTimes + 1);
					findShaoZhuEscortInfo.getBattleRecordHidList().add(hero.getId());
				}

				ShaoZhuEscortRecord shaoZhuEscortRecord = new ShaoZhuEscortRecord();
				shaoZhuEscortRecord.setInterceptHid(hero.getId());
				shaoZhuEscortRecord.setInterceptName(hero.getName());
				shaoZhuEscortRecord.setReachTime(interceptedShaoZhuEscort.getReachTime());
				shaoZhuEscortRecord.setBattleResult(battleResult);
				// 增加少主护送录像缓存
				List<ShaoZhuEscortPlayBack> playBackList = new ArrayList<>();
				ShaoZhuEscortPlayBack myPlayBack = new ShaoZhuEscortPlayBack();
				myPlayBack.setHid(interceptedHero.getId());
				myPlayBack.setName(interceptedHero.getName());
				myPlayBack.setWujiangId(interceptedShaoZhuEscort.getEscortWuJiang());
				myPlayBack.setStrength(interceptedHero.getTotalStrength());
				myPlayBack.setFinalFightAttr(interceptedHero.getFinalFightAttr());
				myPlayBack.setFigthMonsterSpirit(interceptedHero.getMonsterSpiritModel().getFightMonsterSpiri());
				myPlayBack.setIcon(interceptedHero.getIcon());
				myPlayBack.setOfficial(interceptedHero.getOfficial());
				myPlayBack.setJob(interceptedHero.getJob());
				myPlayBack.setBodyId(interceptedHero.getShowModel().getBodyModel());
				// myPlayBack.setWeaponModel(GodWeaponFunction.getIns().getNowGodWeapon(interceptedHero));
				myPlayBack.setWeaponModel(0);
				myPlayBack.setSkillMap(interceptedHero.getSkill().getSkillMap());
				myPlayBack.setWujiang(interceptedHero.getWujiang());
				ShaoZhuEscortPlayBack hePlayBack = new ShaoZhuEscortPlayBack();
				hePlayBack.setHid(hero.getId());
				hePlayBack.setName(hero.getName());
				hePlayBack.setWujiangId(shaozhuEscort.getEscortWuJiang());
				hePlayBack.setStrength(hero.getTotalStrength());
				hePlayBack.setFinalFightAttr(hero.getFinalFightAttr());
				hePlayBack.setFigthMonsterSpirit(hero.getMonsterSpiritModel().getFightMonsterSpiri());
				hePlayBack.setIcon(hero.getIcon());
				hePlayBack.setOfficial(hero.getOfficial());
				hePlayBack.setJob(hero.getJob());
				hePlayBack.setBodyId(hero.getShowModel().getBodyModel());
				// hePlayBack.setWeaponModel(GodWeaponFunction.getIns().getNowGodWeapon(hero));
				hePlayBack.setWeaponModel(0);
				hePlayBack.setSkillMap(hero.getSkill().getSkillMap());
				hePlayBack.setWujiang(hero.getWujiang());
				playBackList.add(myPlayBack);
				playBackList.add(hePlayBack);
				shaoZhuEscortRecord.setPlayBackList(playBackList);
				addPlayReport(recordList, shaoZhuEscortRecord);
				interceptedShaoZhuEscort.setBattleRecordRedPointState(1);
				updateShaoZhuEscortTable(interceptedHid, interceptedShaoZhuEscort);

				long winerID;
				int icon;
				int jiangXianID;
				long winerPower;
				String winerName;
				Object[] lossAwardArray = null;
				if (battleResult == ShaoZhuEscortConst.FAILURE) {
					// 损失奖励
					lossAwardArray = lossAward(wujiangId, battleResult);
					Struct_szhs_401 struct_szhs_401 = Config_szhs_401.getIns()
							.get(interceptedShaoZhuEscort.getEscortWuJiang());
					int[][] lj = struct_szhs_401.getLj();
					Map<Integer, Map<Integer, Integer>> interceptRewardMap = new HashMap<>();
					CommonUtil.arrayIntoMap(interceptRewardMap, lj, 1);
					int[][] interceptReward = CommonUtil.awardMap2IntArray(interceptRewardMap);
					// 发放拦截奖励
					UseAddUtil.add(hero, interceptReward, SourceGoodConst.SHAOZHU_ESCORT_INTERCEPT_REWARD,
							UseAddUtil.getDefaultMail(), true);
					winerID = hero.getId();
					winerName = hero.getName();
					winerPower = hePlayBack.getStrength();
					icon = hero.getIcon();
					jiangXianID = hero.getOfficial();
				} else {
					winerID = myPlayBack.getHid();
					winerName = myPlayBack.getName();
					winerPower = myPlayBack.getStrength();
					icon = myPlayBack.getIcon();
					jiangXianID = myPlayBack.getOfficial();
				}
				sendAttr(hero, myPlayBack);
				sendAttr(hero, hePlayBack);
				ShaoZhuEscortSender.sendCmd_8012(hero.getId(), ShaoZhuEscortConst.SUCCESS, lossAwardArray, winerID,
						icon, jiangXianID, winerPower, winerName, hero.getId(), interceptedHero.getId());
				ShaoZhuEscortFunction.getIns().redPoint(interceptedHero, false);
			}

			@Override
			public Object getSession() {
				// TODO Auto-generated method stub
				return OpTaskConst.SHAOZHU_ESCORT;
			}

		});
	}

	/**
	 * 更新少主表
	 * 
	 * @param hero
	 * @param shaozhuEscort
	 */
	private void updateShaoZhuEscortTable(long interceptedHid, ShaoZhuEscort interceptedShaoZhuEscort) {
		boolean online = HeroFunction.getIns().isOnline(interceptedHid);
		if (!online) {
			try {
				DaoUtil.update(interceptedShaoZhuEscort, HeroMapper.class, CommonUtil.getZoneIdById(interceptedHid));
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}

	/**
	 * 增加战报
	 * 
	 * @param recordList
	 * @param shaozhuEscortRecord
	 */
	public void addPlayReport(List<ShaoZhuEscortRecord> recordList, ShaoZhuEscortRecord shaozhuEscortRecord) {
		recordList.add(0, shaozhuEscortRecord);
		Iterator<ShaoZhuEscortRecord> iterator = recordList.iterator();
		int i = 1;
		while (iterator.hasNext()) {
			iterator.next();
			if (i > ShaoZhuEscortConst.ESCORT_PLAY_REPORT_NUM) {
				iterator.remove();
			}
			i++;
		}
	}

	/**
	 * 查看录像
	 * 
	 * @param hero
	 * @param index
	 */
	public void lookReport(Hero hero, int index) {
		// TODO Auto-generated method stub
		if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.SHAOZHU_ESCORT)) {
			return;
		}
		ShaoZhuEscort shaozhuEscort = hero.getShaozhuEscort();
		ArrayList<ShaoZhuEscortRecord> recordList = shaozhuEscort.getRecordList();
		int size = recordList.size();
		if (index >= size) {
			return;
		}
		ShaoZhuEscortRecord shaoZhuEscortRecord = recordList.get(index);
		List<ShaoZhuEscortPlayBack> playBackList = shaoZhuEscortRecord.getPlayBackList();
		ShaoZhuEscortPlayBack myPlayBack = playBackList.get(0);
		ShaoZhuEscortPlayBack hePlayBack = playBackList.get(1);
		sendAttr(hero, myPlayBack);
		sendAttr(hero, hePlayBack);
		int battleResult = shaoZhuEscortRecord.getBattleResult();
		long winerID;
		int icon;
		int jiangXianID;
		long winerPower;
		String winerName;
		Object[] lossAward = null;
		if (battleResult == ShaoZhuEscortConst.SUCCESS) {
			winerID = hero.getId();
			winerName = hero.getName();
			winerPower = myPlayBack.getStrength();
			icon = hero.getIcon();
			jiangXianID = hero.getOfficial();
		} else {
			winerID = hePlayBack.getHid();
			winerName = hePlayBack.getName();
			winerPower = hePlayBack.getStrength();
			icon = hePlayBack.getIcon();
			jiangXianID = hePlayBack.getOfficial();
			int wujiangId = myPlayBack.getWujiangId();
			if (!ShaoZhuEscortFunction.getIns().isLvBuEscort(wujiangId)) {
				lossAward = lossAward(wujiangId, battleResult);
			}
		}

		ShaoZhuEscortSender.sendCmd_8014(hero.getId(), lossAward, winerID, icon, jiangXianID, winerPower, winerName,
				hero.getId(), shaoZhuEscortRecord.getInterceptHid());
	}

	/**
	 * 发送属性
	 * 
	 * @param hero
	 * @param crossMineJoiner
	 */
	public void sendAttr(Hero hero, ShaoZhuEscortPlayBack shaozhuEscortPlayBack) {
		try {
			List<Object[]> attrData = new ArrayList<Object[]>();
			FinalFightAttr attr = shaozhuEscortPlayBack.getFinalFightAttr();
			// 技能数据
			List<Object[]> skillData = new ArrayList<Object[]>();
			int godSkillLevel = WuJiangFunction.getIns().getGodSkillLevel(shaozhuEscortPlayBack.getJob(),
					shaozhuEscortPlayBack.getWujiang());
			Map<Integer, Integer> skillHurtAddMap = HeroFunction.getIns().getSkillHurtAddMap(hero,
					shaozhuEscortPlayBack.getHid(), godSkillLevel, shaozhuEscortPlayBack.getJob());
			Map<Integer, SkillInfo> skillMap = shaozhuEscortPlayBack.getSkillMap();
			for (Entry<Integer, SkillInfo> entry : skillMap.entrySet()) {
				int index = entry.getKey();
				SkillInfo skillInfo = entry.getValue();
				Integer skillHurtAdd = Optional.ofNullable(skillHurtAddMap).map(mapper -> mapper.get(skillInfo.getId()))
						.orElse(0);
				skillData.add(new Object[] { index, skillInfo.getId(), skillInfo.getLevel(), skillHurtAdd });
			}
			// 时装
			int fashionID = shaozhuEscortPlayBack.getBodyId();
			List<Object[]> attrSendData = FightAttrFunction
					.createAttrSendData(shaozhuEscortPlayBack.getFinalFightAttr());
			attrData.add(new Object[] { attr.getUid(), shaozhuEscortPlayBack.getJob(), attrSendData.toArray(),
					skillData.toArray(), fashionID });
			List<Object[]> extdataList = new ArrayList<>();
			int wearTreasure1 = 0;
			int baowu1Star = 0;
			int wearTreasure2 = 0;
			int baowu2Star = 0;
			int godBookid = 0;
			int godBookStar = 0;
			int wujiangStar = 0;
			int godWeapon = shaozhuEscortPlayBack.getWeaponModel();

			int job = shaozhuEscortPlayBack.getJob();
			if (job > 1000) {
				job = job / 1000;
			}
			final int jobFinal = job;
			WuJiang wujiang = shaozhuEscortPlayBack.getWujiang();
			wujiangStar = Optional.ofNullable(wujiang).map(mapper -> wujiang.getWujiangs())
					.map(mapper -> mapper.get(jobFinal)).map(mapper -> mapper.getStar()).orElse(0);

			extdataList.add(new Object[] { wearTreasure1 });
			extdataList.add(new Object[] { baowu1Star });
			extdataList.add(new Object[] { wearTreasure2 });
			extdataList.add(new Object[] { baowu2Star });
			extdataList.add(new Object[] { godBookid });
			extdataList.add(new Object[] { godBookStar });
			extdataList.add(new Object[] { wujiangStar });
			extdataList.add(new Object[] { godWeapon });
			extdataList.add(new Object[] { 0 });
			// 少主信息
			int withLeaderId = 0;
			int withLeaderFid = 0;
			int leaderStarId = 0;
			int leaderSkillId = 0;
			HeroSender.sendCmd_130(hero.getId(), shaozhuEscortPlayBack.getHid(), shaozhuEscortPlayBack.getName(), 0, 0,
					0, shaozhuEscortPlayBack.getFigthMonsterSpirit(), attrData.toArray(),
					shaozhuEscortPlayBack.getStrength(), extdataList.toArray(), withLeaderId, withLeaderFid,
					leaderStarId, leaderSkillId);
		} catch (Exception e) {
			LogTool.error(e, this, "send has wrong");
		}

	}

	/**
	 * 打开战报界面
	 * 
	 * @param hero
	 */
	public void openBattleRecordUI(Hero hero) {
		// TODO Auto-generated method stub
		if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.SHAOZHU_ESCORT)) {
			return;
		}
		ShaoZhuEscort shaozhuEscort = hero.getShaozhuEscort();
		shaozhuEscort.setBattleRecordRedPointState(0);
		// 战报列表
		List<Object[]> recordArrayList = new ArrayList<>();
		List<ShaoZhuEscortRecord> recordList = shaozhuEscort.getRecordList();
		for (int i = 0; i < recordList.size(); i++) {
			ShaoZhuEscortRecord shaoZhuEscortRecord = recordList.get(i);
			int battleResult = shaoZhuEscortRecord.getBattleResult();
			List<ShaoZhuEscortPlayBack> playBackList = shaoZhuEscortRecord.getPlayBackList();
			ShaoZhuEscortPlayBack myPlayBack = playBackList.get(0);
			int wujiangId = myPlayBack.getWujiangId();
			Object[] lossAward = null;
			boolean islvBuEscort = ShaoZhuEscortFunction.getIns().isLvBuEscort(wujiangId);
			if (!islvBuEscort) {
				lossAward = lossAward(wujiangId, battleResult);
			}
			recordArrayList.add(new Object[] { shaoZhuEscortRecord.getBattleResult() == ShaoZhuEscortConst.FAILURE
					? (islvBuEscort ? ShaoZhuEscortConst.FAILURE_LVBU_ESCORT : ShaoZhuEscortConst.FAILURE)
					: ShaoZhuEscortConst.SUCCESS, shaoZhuEscortRecord.getInterceptName(), lossAward });
		}
		ShaoZhuEscortSender.sendCmd_8016(hero.getId(), recordArrayList.toArray());
	}

}
