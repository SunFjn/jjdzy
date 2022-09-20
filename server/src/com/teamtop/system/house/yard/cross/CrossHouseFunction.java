package com.teamtop.system.house.yard.cross;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.CrossEnum;
import com.teamtop.gameCommon.GameConst;
import com.teamtop.netty.server.server2.Client_2;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.NPC.NPC;
import com.teamtop.system.crossCommonRank.cross.CrossCommonRankCL;
import com.teamtop.system.crossRebornFB.RebornFBFunction;
import com.teamtop.system.event.sceneEvent.SceneEventFunction;
import com.teamtop.system.global.GlobalSender;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.house.houseKeeper.model.HouseKeeper;
import com.teamtop.system.house.yard.HouseConst;
import com.teamtop.system.house.yard.YardSender;
import com.teamtop.system.house.yard.model.CrossHouse;
import com.teamtop.system.house.yard.model.CrossHouseDao;
import com.teamtop.system.house.yard.model.CrossHouseRank;
import com.teamtop.system.house.yard.model.GoldRecord;
import com.teamtop.system.house.yard.model.LocalHouse;
import com.teamtop.system.house.yard.model.RandomEvent;
import com.teamtop.system.house.yard.model.RobberNpc;
import com.teamtop.system.scene.RowCol;
import com.teamtop.system.scene.SceneCache;
import com.teamtop.system.scene.SceneFunction;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventUtil;
import com.teamtop.util.ProbabilityEvent.RandomUtil;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_fddc_019;
import excel.config.Config_fdjk_019;
import excel.config.Config_fdqd_019;
import excel.config.Config_fdsjsj_019;
import excel.config.Config_fdtgl_019;
import excel.config.Config_jdjins_021;
import excel.config.Config_jdskill_021;
import excel.config.Config_xtcs_004;
import excel.config.Config_zsfl_019;
import excel.struct.Struct_fddc_019;
import excel.struct.Struct_fdqd_019;
import excel.struct.Struct_fdsjsj_019;
import excel.struct.Struct_fdtgl_019;
import excel.struct.Struct_jdjins_021;
import excel.struct.Struct_jdskill_021;
import excel.struct.Struct_zsfl_019;
import io.netty.channel.Channel;

public class CrossHouseFunction {
	public static CrossHouseFunction ins;

	public static CrossHouseFunction getIns() {
		if (ins == null) {
			ins = new CrossHouseFunction();
		}
		return ins;
	}

	private CrossHouseFunction() {
	}

	/**
	 * 下发进入院子返回消息
	 * 
	 * @param cHouse
	 */
	public void sendYardMsg(Hero hero, CrossHouse cHouse) {
		LocalHouse local = hero.getLocalHouse();
		List<Object[]> decorateInfos = new ArrayList<>();
		for (Struct_zsfl_019 cfg : Config_zsfl_019.getIns().getSortList()) {
			Integer lv = cHouse.getDecorateLvMap().get(cfg.getZslx());
			if (lv == null) {
				// 兼容新加装饰
				lv = cfg.getZslx();
			}
			decorateInfos.add(new Object[] { cfg.getZslx(), lv });
		}
		List<Object[]> eventInfos = new ArrayList<>();
		for (Struct_fdsjsj_019 cfg : Config_fdsjsj_019.getIns().getSortList()) {
			RandomEvent event = cHouse.getEventMap().get(cfg.getSjid());
			eventInfos.add(new Object[] { event.getCfgId(), event.getState() });
		}

		// updateHouseRank(cHouse);

		HouseKeeper HouseKeeper = hero.getHouseKeeper();
		int id = 1;
		if (HouseKeeper != null) {
			id = HouseKeeper.getId();
		}

		Map<Integer, Integer> decorateLvMap = local.getDecorateLvMap();
		Integer decorateLv = decorateLvMap.get(HouseConst.ID_101001);
		if (decorateLv == null) {
			// 数据异常
			decorateLv = HouseConst.ID_101001;
		}
		Struct_fdtgl_019 tglCfg = Config_fdtgl_019.getIns().get(decorateLv);
		int drawAwardTimes = tglCfg.getCishu() - local.getDrawAwardTimes();
		int maxTimes = Config_xtcs_004.getIns().get(HouseConst.CONST_7112).getNum();
		int completeEventTimes = maxTimes - local.getCompleteEventTimes();
		maxTimes = Config_xtcs_004.getIns().get(HouseConst.CONST_7120).getNum();
		int completeEventHelpTimes = maxTimes - local.getCompleteEventHelpTimes();

		YardSender.sendCmd_11102(hero.getId(), 0, cHouse.getHid(), cHouse.getName(), cHouse.getIcon(),
				cHouse.getFrame(), cHouse.getLevel(), cHouse.getProsperity(), cHouse.getHouseLv(), cHouse.getHouseDc(),
				decorateInfos.toArray(), cHouse.getNextShakeTreeTime(), drawAwardTimes, local.getJiFen(),
				cHouse.getGoldHouseMoney(), eventInfos.toArray(), cHouse.getLastAddMoneyTime() + HouseConst.GOLD_TIME,
				completeEventTimes, completeEventHelpTimes, local.getHouseMoney(), cHouse.getHouseKeepId(),
				cHouse.getMaidId());
	}

	/**
	 * 初始化府邸系统
	 * 
	 * @param hero
	 */
	public CrossHouse initCrossHouse(Hero hero) {
		CrossHouse cHouse = new CrossHouse();
		cHouse.setHid(hero.getId());
		cHouse.setBelongZoneid(hero.getZoneid());
		cHouse.setSceneUnitId(SceneCache.getSceneUnitId());
		cHouse.setHouseLv(1);
		cHouse.setHouseDc(1);
		cHouse.setProsperity(0);
		cHouse.setDecorateLvMap(new HashMap<>());
		cHouse.setName(hero.getNameZoneid());
		cHouse.setLevel(hero.getLevel());
		cHouse.setIcon(hero.getIcon());
		cHouse.setFrame(hero.getFrame());
		cHouse.setEventMap(new HashMap<>());
		cHouse.setHouseKeepId(hero.getHouseKeeper().getId());
		cHouse.setDrawAwardTimes(0);
		cHouse.setMaidId(hero.getMaid().getUseMaid());

		// 初始化事件
		for (Struct_fdsjsj_019 cfg : Config_fdsjsj_019.getIns().getSortList()) {
			RandomEvent event = new RandomEvent();
			event.setCfgId(cfg.getSjid());
			event.setState(0);
			int min = cfg.getLengque()[0][0];
			int max = cfg.getLengque()[0][1];
			int nextTime = TimeDateUtil.getCurrentTime() + RandomUtil.getRandomNumInAreas(min, max);
			event.setNextTime(nextTime);
			cHouse.getEventMap().put(cfg.getSjid(), event);
		}

		int min = Config_xtcs_004.getIns().get(HouseConst.CONST_7119).getOther()[0][0];
		int max = Config_xtcs_004.getIns().get(HouseConst.CONST_7119).getOther()[0][1];
		int nextTime = TimeDateUtil.getCurrentTime() + RandomUtil.getRandomNumInAreas(min, max);
		cHouse.setNextRobberTime(nextTime);

		int time = Config_xtcs_004.getIns().get(HouseConst.CONST_7111).getNum();
		nextTime = TimeDateUtil.getCurrentTime() + time;

		nextTime = TimeDateUtil.getCurrentTime() + 10;
		cHouse.setNextShakeTreeTime(nextTime);

		cHouse.setLastAddMoneyTime(TimeDateUtil.getCurrentTime());

		int partId = CrossCache.getPartId(hero.getZoneid());
		CrossHouseCache.pAllCrossHouseCache.get(partId).put(hero.getId(), cHouse);

		try {
			CrossHouseDao.getIns().insertData(cHouse);
		} catch (Exception e) {
			e.printStackTrace();
		}

		// 更新排名
		CrossHouseFunction.getIns().updateHouseRank(cHouse,true);

		return cHouse;
	}

	/**
	 * 返回跨服中的府邸数据(可能为空)
	 * 
	 * @param hid
	 * @return
	 */
	public CrossHouse getHouseByHid(long hid) {
		int partId = CrossCache.getPartId(CommonUtil.getZoneIdById(hid));
		ConcurrentHashMap<Long, CrossHouse> allCrossHouseCache = CrossHouseCache.pAllCrossHouseCache.get(partId);
		if (allCrossHouseCache == null) {
			return null;
		}
		return allCrossHouseCache.get(hid);
	}

	/**
	 * 根据府邸档次获取地图系统ID
	 * 
	 * @param houseDc
	 * @return
	 */
	public int getMapIdByDc(int houseDc) {
		Struct_fddc_019 dcCfg = Config_fddc_019.getIns().get(houseDc);
		if (dcCfg == null) {
			// 配置不存在
			return -1;
		}
		return dcCfg.getDt();
	}

	/**
	 * 更新府邸排名
	 * 
	 * @param cHouse
	 */
	public void updateHouseRank(CrossHouse cHouse,boolean isNew) {
		int hadEvent = 0;
		for (Struct_fdsjsj_019 cfg : Config_fdsjsj_019.getIns().getSortList()) {
			RandomEvent event = cHouse.getEventMap().get(cfg.getSjid());
			if (event != null) {
				if (event.getState() == 1) {
					hadEvent = 1;
					break;
				}
			}
		}
		int num = (int) cHouse.getProsperity();
		if (num > 999999) {
			num = 999999;
		}
		CrossHouseRank model = new CrossHouseRank(cHouse.getHid(), cHouse.getName(), cHouse.getIcon(),
				cHouse.getFrame(), cHouse.getLevel(), cHouse.getHouseLv(), cHouse.getHouseDc(), hadEvent,num);
		model.setReachTime(TimeDateUtil.getCurrentTime());
		if (!isNew) {
			// 刷新时间叹号
			model.setParameter(0);
		}
		int partId = CrossCache.getPartId(CommonUtil.getZoneIdById(cHouse.getHid()));
		CrossCommonRankCL.getIns().addUpdateRank(partId, SystemIdConst.YARD, model);
	}

	/**
	 * 定时添加金库或者清空金库
	 * 
	 * @param local
	 * @param num
	 */
	public void addGoldMoney(CrossHouse cHouse, int num) {
		synchronized (cHouse) {
			int houseDc = cHouse.getHouseDc();
			int oneAward[][] = Config_fddc_019.getIns().get(houseDc).getZengjia();
			int oneCount = oneAward[0][2];
			Integer decorateLv = cHouse.getDecorateLvMap().get(HouseConst.ID_102001);
			if (decorateLv == null) {
				decorateLv = HouseConst.ID_102001;
			}
			int max = (Config_fdjk_019.getIns().get(decorateLv).getCishu() / HouseConst.GOLD_TIME) * oneCount;
			if (num < 0) {
				// 设置时间
				if (cHouse.getGoldHouseMoney() >= max) {
					cHouse.setLastAddMoneyTime(TimeDateUtil.getCurrentTime());
				}
			}
			cHouse.setGoldHouseMoney(cHouse.getGoldHouseMoney() + num);
			if (num > 0) {
				// 防止溢出
				if (cHouse.getGoldHouseMoney() > max) {
					cHouse.setGoldHouseMoney(max);
				}
			}
		}
	}

	/**
	 * 天工炉抽奖获得物品
	 * 
	 * @param dc
	 * @return
	 */
	public int[] drawAward(int dc) {
		List<ProbabilityEventModel> list = CrossHouseCache.dcMap.get(dc);
		int[] genAward = null;
		int a = 0;
		while (genAward == null || a >= 100) {
			for (ProbabilityEventModel pm : list) {
				genAward = (int[]) ProbabilityEventUtil.getEventByProbability(pm);// 随机奖励
			}
			a++;
		}
		return genAward;
	}

	/**
	 * 检查金库
	 * 
	 * @param hero
	 */
	public void checkMoney(CrossHouse cHouse) {
		int now = TimeDateUtil.getCurrentTime();
		int time = cHouse.getLastAddMoneyTime();
		int dTime = now - time;
		int count = dTime / HouseConst.GOLD_TIME;
		if (count <= 0) {
			if (count < 0) {
				cHouse.setLastAddMoneyTime(TimeDateUtil.getCurrentTime());
			}
			return;
		}
		int houseDc = cHouse.getHouseDc();
		int oneAward[][] = Config_fddc_019.getIns().get(houseDc).getZengjia();
		int oneCount = oneAward[0][2];

		Struct_jdjins_021 struct_jdjins_021 = Config_jdjins_021.getIns().get(cHouse.getHouseKeepId());
		if (struct_jdjins_021 != null) {
			int[][] skill = struct_jdjins_021.getSkill();

			for (int i = 0; i < skill.length; i++) {
				int skillId = skill[i][0];
				Struct_jdskill_021 struct_jdskill_021 = Config_jdskill_021.getIns().get(skillId);
				int canshu1 = struct_jdskill_021.getCanshu1();
				if (skillId / 1000 == 21) {
					// 管家类技能
					oneCount = oneCount + oneCount * canshu1 / 100000;
					break;
				}
			}
		}

		Integer decorateLv = cHouse.getDecorateLvMap().get(HouseConst.ID_102001);
		if (decorateLv == null) {
			decorateLv = HouseConst.ID_102001;
		}
		int max = (Config_fdjk_019.getIns().get(decorateLv).getCishu() / HouseConst.GOLD_TIME) * oneCount;
		if (cHouse.getGoldHouseMoney() >= max) {
			return;
		}

		int addCount = oneCount * count;

		cHouse.setLastAddMoneyTime(cHouse.getLastAddMoneyTime() + HouseConst.GOLD_TIME * count);

		CrossHouseFunction.getIns().addGoldMoney(cHouse, addCount);
	}

	/**
	 * 检查事件
	 * 
	 * @param hero
	 */
	public void checkEvent(CrossHouse cHouse) {
		int now = TimeDateUtil.getCurrentTime();
		List<Object[]> eventInfos = new ArrayList<>();
		for (Struct_fdsjsj_019 cfg : Config_fdsjsj_019.getIns().getSortList()) {
			RandomEvent event = cHouse.getEventMap().get(cfg.getSjid());
			if (event == null) {
				event = new RandomEvent();
				event.setCfgId(cfg.getSjid());
				event.setState(0);
				int min = cfg.getLengque()[0][0];
				int max = cfg.getLengque()[0][1];
				int time = RandomUtil.getRandomNumInAreas(min, max);
				event.setNextTime(TimeDateUtil.getCurrentTime() + time);
				cHouse.getEventMap().put(cfg.getSjid(), event);
			}
			if (event.getState() == 1) {
				continue;
			}
			if (now >= event.getNextTime()) {
				// 触发时间
				event.setState(1);
				eventInfos.add(new Object[] { event.getCfgId(), event.getState() });
				updateHouseRank(cHouse,false);
			}
		}

		if (!eventInfos.isEmpty()) {
			YardSender.sendCmd_11126(cHouse.getHid(), cHouse.getHid(), eventInfos.toArray());
		}
	}

	/**
	 * 刷新小怪
	 */
	public void reshMapNpc(CrossHouse cHouse) {
		if (cHouse.getNextRobberTime() != 0 && cHouse.getNextRobberTime() > TimeDateUtil.getCurrentTime()) {
			// 时间未到
			return;
		}
		int min = Config_xtcs_004.getIns().get(HouseConst.CONST_7119).getOther()[0][0];
		int max = Config_xtcs_004.getIns().get(HouseConst.CONST_7119).getOther()[0][1];
		int nextTime = TimeDateUtil.getCurrentTime() + RandomUtil.getRandomNumInAreas(min, max);
		cHouse.setNextRobberTime(nextTime);

		Map<Long, RobberNpc> robberNpcMap = cHouse.getNpcMap();
		if (robberNpcMap == null) {
			robberNpcMap = new ConcurrentHashMap<>();
			cHouse.setNpcMap(robberNpcMap);
		}
		// 每次刷新刷新全部
		for (RobberNpc npc : robberNpcMap.values()) {
			SceneFunction.getIns().removeNpcFromScene(npc.getUnitid());
		}
		robberNpcMap.clear();
		int leftNum = robberNpcMap.size();
		if (leftNum >= 5) {
			return;
		}
		// TODO 计算今天限制
		int needFrshNum = 5 - leftNum;
		int mapId = getMapIdByDc(cHouse.getHouseDc());

		for (int i = 0; i < needFrshNum; i++) {
			ProbabilityEventModel model = new ProbabilityEventModel();
			for (Struct_fdqd_019 config : Config_fdqd_019.getIns().getSortList()) {
				model.addProbabilityEvent(config.getJilv(), config.getId());
			}
			int npcSysId = (int) ProbabilityEventUtil.getEventByProbability(model);
			RobberNpc robberNpc = new RobberNpc();
			robberNpc.setSysId(npcSysId);

			int dc = cHouse.getHouseDc();
			Struct_fddc_019 c = Config_fddc_019.getIns().get(dc);
			int[][] point = c.getPoint();
			List<RowCol> canWalkList = new ArrayList<>();
			for (int[] p : point) {
				boolean isFind = false;
				for (RobberNpc npc : robberNpcMap.values()) {
					if (npc.getPox() == p[0] && npc.getPoy() == p[1]) {
						isFind = true;
						continue;
					}
				}
				if (!isFind) {
					RowCol rowCol = new RowCol(p[0], p[1]);
					canWalkList.add(rowCol);
				}
			}
			RowCol newPosByRandom = SceneEventFunction.getNewPosByRandom(canWalkList);
			NPC npc = SceneFunction.getIns().addNpcToScene(npcSysId, newPosByRandom.getRow(), newPosByRandom.getCol(),
					-1, cHouse.getSceneUnitId(), mapId, true);
			robberNpc.setPox(newPosByRandom.getRow());
			robberNpc.setPoy(newPosByRandom.getCol());
			robberNpc.setUnitid(npc.getId());
			robberNpcMap.put(robberNpc.getUnitid(), robberNpc);
		}
	}

	/**
	 * 更新玩家属性
	 * 
	 * @param hero
	 */
	public void updateHouseFight(Hero hero) {
		CrossData crossData = new CrossData();
		crossData.putObject(CrossEnum.data1, hero.getLocalHouse());
		Channel c = CrossCache.getChannel(CommonUtil.getZoneIdById(hero.getId()));
		NettyWrite.writeXData(c, CrossConst.CROSS_HOUSE_UPDATE_FIGHT, crossData);
	}

	/**
	 * 升级档次发送广播
	 * 
	 * @param hero
	 */
	public void upDc(Hero hero, int dc) {
		CrossData crossData = new CrossData();
		crossData.putObject(CrossEnum.data1, hero.getNameZoneid());
		crossData.putObject(CrossEnum.data2, dc);

		int partId = CrossCache.getPartId(hero.getBelongZoneid());

		ConcurrentHashMap<Channel, List<Integer>> channelToZoneid = CrossCache.getChannelToZoneidByPartId(partId);
		Iterator<Entry<Channel, List<Integer>>> iterator = channelToZoneid.entrySet().iterator();
		while (iterator.hasNext()) {
			Entry<Channel, List<Integer>> next = iterator.next();
			Channel c = next.getKey();
			NettyWrite.writeXData(c, CrossConst.CROSS_HOUSE_UP_DC, crossData);
		}
	}

	/**
	 * 添加记录
	 * 
	 * @param hid
	 * @param name
	 * @param type
	 * @param number
	 * @param count
	 */
	public void addRecord(long hid, String name, int type, int count, int number) {
		List<GoldRecord> list = null;
		if (type == 1) {
			// 金库被偷
			int partId = CrossCache.getPartId(CommonUtil.getZoneIdById(hid));
			list = CrossHouseCache.pAllGoldRecordCache.get(partId).get(hid);
			if (list == null) {
				list = new ArrayList<>();
				CrossHouseCache.pAllGoldRecordCache.get(partId).put(hid, list);
			}
		} else {
			// 天工炉被借
			int partId = CrossCache.getPartId(CommonUtil.getZoneIdById(hid));
			list = CrossHouseCache.pAllTGLRecordCache.get(partId).get(hid);
			if (list == null) {
				list = new ArrayList<>();
				CrossHouseCache.pAllTGLRecordCache.get(partId).put(hid, list);
			}
		}
		GoldRecord record = new GoldRecord();
		record.setName(name);
		record.setNumber(number);
		record.setCount(count);
		if (list.size() >= 20) {
			list.remove(list.size() - 1);
		}
		list.add(0, record);
	}

	/**
	 * 通知每日刷新
	 * 
	 * @param hero
	 */
	public void dailyNotic(Hero hero, int n1, int n2, int n3, int n4) {
		CrossData crossData = new CrossData();
		crossData.putObject(CrossEnum.hid, hero.getId());
		crossData.putObject(CrossEnum.data1, n1);
		crossData.putObject(CrossEnum.data2, n2);
		crossData.putObject(CrossEnum.data3, n3);
		crossData.putObject(CrossEnum.DATA4, n4);
		Channel c = Client_2.getIns().getCrossChannel();
		NettyWrite.writeXData(c, CrossConst.CROSS_HOUSE_DAILY_NOTIC, crossData);
	}

	/**
	 * 通知前端次数变更
	 * 
	 * @param hero
	 * @param type
	 * @param times
	 */
	public void pushUpdate(Hero hero, int type, int times) {
		YardSender.sendCmd_11136(hero.getId(), type, times);
	}

	/**
	 * 加挑战次数
	 * 
	 * @param hero
	 * @param id
	 * @param num
	 * @return
	 */
	public boolean addNum(Hero hero, int id, int num) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.YARD)) {
				return false;
			}
			LocalHouse local = hero.getLocalHouse();
			if (id == GameConst.TYPE_43) {
				local.setDrawAwardTimes(local.getDrawAwardTimes() - num);
				dailyNotic(hero, 0, 0, 0, -num);
				GlobalSender.sendCmd_260(hero.getId(), 1, "天工造物次数+" + num);
			} else if (id == GameConst.TYPE_44) {
				local.setCompleteEventTimes(local.getCompleteEventTimes() - num);
				dailyNotic(hero, -num, 0, 0, 0);
				GlobalSender.sendCmd_260(hero.getId(), 1, "本府邸随机事件次数+" + num);
			} else if (id == GameConst.TYPE_45) {
				local.setCompleteEventHelpTimes(local.getCompleteEventHelpTimes() - num);
				dailyNotic(hero, 0, -num, 0, 0);
				GlobalSender.sendCmd_260(hero.getId(), 1, "协助他人随机事件次数+" + num);
			} else if (id == GameConst.TYPE_46) {
				local.setCompleteRobberTimes(local.getCompleteRobberTimes() - num);
				dailyNotic(hero, 0, 0, -num, 0);
				GlobalSender.sendCmd_260(hero.getId(), 1, "可击退强盗次数+" + num);
			}
			return true;
		} catch (Exception e) {
			LogTool.error(e, RebornFBFunction.class, hero.getId(), hero.getName(), "CrossHouseFunction addNum");
		}
		return false;
	}
}
