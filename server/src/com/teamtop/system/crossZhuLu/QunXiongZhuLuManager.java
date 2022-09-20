package com.teamtop.system.crossZhuLu;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.TypeReference;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.godGenThisLifeAct.GodGenThisLifeActSender;
import com.teamtop.system.activity.ativitys.luckTurnCardAct.LuckTurnCardActSender;
import com.teamtop.system.crossCommonRank.CommonRankFunction;
import com.teamtop.system.crossCommonRank.CommonRankSysCache;
import com.teamtop.system.crossZhuLu.cross.CrossZhuLuEnum;
import com.teamtop.system.crossZhuLu.cross.CrossZhuLuFunction;
import com.teamtop.system.crossZhuLu.model.CrossZhuLuCityInfo;
import com.teamtop.system.crossZhuLu.model.CrossZhuLuCountryInfo;
import com.teamtop.system.crossZhuLu.model.CrossZhuLuDefendAward;
import com.teamtop.system.crossZhuLu.model.CrossZhuLuHeroInfo;
import com.teamtop.system.crossZhuLu.model.CrossZhuLuRecord;
import com.teamtop.system.crossZhuLu.model.QunXiongZhuLu;
import com.teamtop.system.crossZhuLu.model.TaskInfo;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.vip.VipAddType;
import com.teamtop.system.vip.VipFunction;
import com.teamtop.util.log.LogTool;

import com.teamtop.util.time.TimeDateUtil;
import excel.config.Config_qxzlrw_273;
import excel.config.Config_qxzlstore_273;
import excel.config.Config_qxzltl_273;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_qxzlrw_273;
import excel.struct.Struct_qxzlstore_273;
import excel.struct.Struct_qxzltl_273;

public class QunXiongZhuLuManager {
	private static QunXiongZhuLuManager ins;

	private QunXiongZhuLuManager() {
	}

	public static synchronized QunXiongZhuLuManager getIns() {
		if (ins == null) {
			ins = new QunXiongZhuLuManager();
		}
		return ins;
	}

	public void enterMap(Hero hero) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.QUN_XIONG_ZHU_LU)) {
				return;
			}

			CrossData crossData = new CrossData();
			crossData.putObject(CrossZhuLuEnum.Hid, hero.getId());

			CrossZhuLuHeroInfo heroInfo = CrossZhuLuFunction.getIns().initCrossZhuLuHeroInfo(hero);
			crossData.putObject(CrossZhuLuEnum.CrossZhuLuHeroInfo, heroInfo);

			CrossData writeBlockData = CrossZhuLuFunction.getIns().sendToCross(hero,
					CrossConst.CROSS_ZHU_LU_ENTER_MAP_LC, crossData);
			if (writeBlockData == null)
				return;

			Type type = new TypeReference<List<CrossZhuLuCountryInfo>>() {
			}.getType();
			List<CrossZhuLuCountryInfo> countryInfoList = writeBlockData
					.getObject(CrossZhuLuEnum.CrossZhuLuCountryInfos, type);

			type = new TypeReference<List<CrossZhuLuCityInfo>>() {
			}.getType();
			List<CrossZhuLuCityInfo> cityInfoList = writeBlockData.getObject(CrossZhuLuEnum.CrossZhuLuCityInfos, type);

			CrossZhuLuHeroInfo info = writeBlockData.getObject(CrossZhuLuEnum.CrossZhuLuHeroInfo,
					CrossZhuLuHeroInfo.class);

			List<Object> sendCityInfoList = new ArrayList<>();
			int[] numbers = new int[4];
			for (CrossZhuLuCityInfo cityInfo : cityInfoList) {
				numbers[cityInfo.getCountryId()]++;
				sendCityInfoList.add(new Object[] { cityInfo.getCityId(), cityInfo.getCountryId(), cityInfo.getIsLuck(),
						cityInfo.getHeroIdMap().size() });
			}

			List<Object> sendCountryInfoList = new ArrayList<>();
			for (CrossZhuLuCountryInfo countryInfo : countryInfoList) {
				sendCountryInfoList.add(new Object[] { countryInfo.getCountryId(), numbers[countryInfo.getCountryId()],
						countryInfo.getTotalScore() });
			}

			int isEnd = CrossZhuLuFunction.getIns().isOpen() ? 0 : 1;

			QunXiongZhuLu qunXiongZhuLu = hero.getQunXiongZhuLu();
			int restBuffTime = refreshBuff(qunXiongZhuLu);
			QunXiongZhuLuSender.sendCmd_8952(hero.getId(), 0, isEnd, qunXiongZhuLu.getBuyTiLiTimes(),
					sendCountryInfoList.toArray(), info.getMaxTiLi(), info.getTiLi(), info.getUpdateTiLiTime(),
					info.getScore(), info.getCityId(), info.getState(), sendCityInfoList.toArray(), restBuffTime);
			qunXiongZhuLu.setScore(info.getScore());
			// 刷新积分任务
			QunXiongZhuLuFunction.getIns().doTask(hero, QunXiongZhuLuConst.TASK_TYPES_2, info.getTodayScore());
			QunXiongZhuLuFunction.getIns().doTask(hero, QunXiongZhuLuConst.TASK_TYPES_5, info.getScore());

			QunXiongZhuLuFunction.getIns().updateRedPoint(hero);
		} catch (Exception e) {
			LogTool.error(e, QunXiongZhuLuManager.class, "enterMap has wrong");
		}
	}

	public void openRankUI(Hero hero) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.QUN_XIONG_ZHU_LU)) {
				return;
			}

			CrossData crossData = new CrossData();
			CrossData writeBlockData = CrossZhuLuFunction.getIns().sendToCross(hero,
					CrossConst.CROSS_ZHU_LU_OPEN_RANK_UI_LC, crossData);
			if (writeBlockData == null)
				return;
			Type type = new TypeReference<List<CrossZhuLuCountryInfo>>() {
			}.getType();
			List<CrossZhuLuCountryInfo> countryInfoList = writeBlockData
					.getObject(CrossZhuLuEnum.CrossZhuLuCountryInfos, type);

			type = new TypeReference<List<CrossZhuLuCityInfo>>() {
			}.getType();
			List<CrossZhuLuCityInfo> cityInfoList = writeBlockData.getObject(CrossZhuLuEnum.CrossZhuLuCityInfos, type);

			int[] numbers = new int[4];
			for (CrossZhuLuCityInfo cityInfo : cityInfoList) {
				numbers[cityInfo.getCountryId()]++;
			}

			List<Object> rankList = new ArrayList<>();
			int i = 1;
			for (CrossZhuLuCountryInfo countryInfo : countryInfoList) {
				rankList.add(new Object[] { i, countryInfo.getCountryId(), countryInfo.getTotalScore(),
						numbers[countryInfo.getCountryId()] });
				i++;
			}

			String name = writeBlockData.getObject(CrossZhuLuEnum.Name, String.class);
			Integer herdid = writeBlockData.getObject(CrossZhuLuEnum.Herdid, Integer.class);
			Integer iconid = writeBlockData.getObject(CrossZhuLuEnum.Iconid, Integer.class);
			Long score = writeBlockData.getObject(CrossZhuLuEnum.Score, Long.class);

			QunXiongZhuLuSender.sendCmd_8954(hero.getId(), rankList.toArray(), name, score, herdid, iconid);
		} catch (Exception e) {
			LogTool.error(e, QunXiongZhuLuManager.class, "openRankUI has wrong");
		}
	}

	public void openTaskUI(Hero hero) {
		if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.QUN_XIONG_ZHU_LU)) {
			return;
		}

		QunXiongZhuLu qunXiongZhuLu = hero.getQunXiongZhuLu();
		QunXiongZhuLuFunction.getIns().checkTiLiTask(hero);
		List<Object[]> taskInfos = new ArrayList<>();

		for (TaskInfo info : qunXiongZhuLu.getTaskInfoMap().values()) {
			taskInfos.add(new Object[] { info.getConfigId(), info.getState(), info.getValue() });
		}

		QunXiongZhuLuSender.sendCmd_8956(hero.getId(), taskInfos.toArray());
	}

	public void openBaoKuUI(Hero hero) {
		if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.QUN_XIONG_ZHU_LU)) {
			return;
		}

		QunXiongZhuLu qunXiongZhuLu = hero.getQunXiongZhuLu();

		List<Object[]> goodsList = new ArrayList<>();
		for (Struct_qxzlstore_273 config : Config_qxzlstore_273.getIns().getSortList()) {
			Integer num = qunXiongZhuLu.getBaoKuMap().get(config.getId());
			if (num == null) {
				qunXiongZhuLu.getBaoKuMap().put(config.getId(), 0);
				num = 0;
			}
			goodsList.add(new Object[] { config.getId(), num });
		}
		QunXiongZhuLuSender.sendCmd_8958(hero.getId(), goodsList.toArray());
	}

	public void openRecord(Hero hero) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.QUN_XIONG_ZHU_LU)) {
				return;
			}

			CrossData crossData = new CrossData();
			crossData.putObject(CrossZhuLuEnum.Hid, hero.getId());
			CrossData writeBlockData = CrossZhuLuFunction.getIns().sendToCross(hero,
					CrossConst.CROSS_ZHU_LU_OPEN_RECORD_LC, crossData);
			if (writeBlockData == null)
				return;

			Type type = new TypeReference<List<CrossZhuLuRecord>>() {
			}.getType();
			List<CrossZhuLuRecord> list1 = writeBlockData.getObject(CrossZhuLuEnum.CrossZhuLuRecords, type);
			List<CrossZhuLuRecord> list2 = writeBlockData.getObject(CrossZhuLuEnum.CrossZhuLuRecords2, type);

			List<Object> recordDate = new ArrayList<>();
			for (CrossZhuLuRecord record : list1) {
				String name2 = record.getName2();
				if (name2 == null) {
					name2 = "";
				}
				recordDate.add(new Object[] { record.getCountryId(), record.getName(), record.getType(),
						record.getParam(), record.getCountryId2(), name2 });
			}
			List<Object> myRecordDate = new ArrayList<>();
			for (CrossZhuLuRecord record : list2) {
				myRecordDate.add(
						new Object[] { record.getCountryId(), record.getName(), record.getType(), record.getParam() });
			}

			QunXiongZhuLuSender.sendCmd_8960(hero.getId(), recordDate.toArray(), myRecordDate.toArray());

			QunXiongZhuLuFunction.getIns().updateRedPoint(hero);
		} catch (Exception e) {
			LogTool.error(e, QunXiongZhuLuManager.class, "move has wrong");
		}
	}

	public void exchange(Hero hero, int goodsId) {
		if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.QUN_XIONG_ZHU_LU)) {
			return;
		}
		Struct_qxzlstore_273 config = Config_qxzlstore_273.getIns().get(goodsId);
		if (config == null) {
			// 配置不存在
			QunXiongZhuLuSender.sendCmd_8962(hero.getId(), 3, goodsId, 0);
			return;
		}
		QunXiongZhuLu qunXiongZhuLu = hero.getQunXiongZhuLu();
		Integer num = qunXiongZhuLu.getBaoKuMap().get(goodsId);
		if (num == null) {
			qunXiongZhuLu.getBaoKuMap().put(goodsId, 0);
			num = 0;
		}
		if (num >= config.getXg()) {
			// 限购已满
			QunXiongZhuLuSender.sendCmd_8962(hero.getId(), 2, goodsId, num);
			return;
		}
		int[][] cost = config.getMoney();
		if (!UseAddUtil.canUse(hero, cost)) {
			QunXiongZhuLuSender.sendCmd_8962(hero.getId(), 1, goodsId, num);
			return;
		}

		num++;
		qunXiongZhuLu.getBaoKuMap().put(goodsId, num);
		UseAddUtil.use(hero, cost, SourceGoodConst.QUNXIONGZHULU_BAOKU_COST, true);

		UseAddUtil.add(hero, config.getItem(), SourceGoodConst.QUNXIONGZHULU_BAOKU_ADD, UseAddUtil.getDefaultMail(),
				true);

		QunXiongZhuLuSender.sendCmd_8962(hero.getId(), 0, goodsId, num);
	}

	public void getTaskReward(Hero hero, int taskId) {
		if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.QUN_XIONG_ZHU_LU)) {
			return;
		}

		QunXiongZhuLu qunXiongZhuLu = hero.getQunXiongZhuLu();
		QunXiongZhuLuFunction.getIns().checkTiLiTask(hero);
		TaskInfo info = qunXiongZhuLu.getTaskInfoMap().get(taskId);
		if (info == null) {
			// 任务不存在
			QunXiongZhuLuSender.sendCmd_8964(hero.getId(), 1, taskId);
			return;
		}

		if (info.getState() == 0) {
			// 未完成
			QunXiongZhuLuSender.sendCmd_8964(hero.getId(), 2, taskId);
			return;
		} else if (info.getState() == 2) {
			// 已领取
			QunXiongZhuLuSender.sendCmd_8964(hero.getId(), 3, taskId);
			return;
		}

		Struct_qxzlrw_273 config = Config_qxzlrw_273.getIns().get(taskId);
		if (config == null) {
			// 配置不存在
			QunXiongZhuLuSender.sendCmd_8964(hero.getId(), 4, taskId);
			return;
		}

		if (config.getNext() != 0) {
			qunXiongZhuLu.getTaskInfoMap().remove(info.getConfigId());
			info.setState(0);
			info.setConfigId(config.getNext());
			qunXiongZhuLu.getTaskInfoMap().put(info.getConfigId(), info);
			if (info.getValue() >= Config_qxzlrw_273.getIns().get(info.getConfigId()).getCs()) {
				info.setState(1);
			}
		} else {
			info.setState(2);
		}

		UseAddUtil.add(hero, config.getReward(), SourceGoodConst.QUNXIONGZHULU_TASK_ADD, UseAddUtil.getDefaultMail(),
				true);
		QunXiongZhuLuSender.sendCmd_8964(hero.getId(), 0, taskId);

		openTaskUI(hero);

		QunXiongZhuLuFunction.getIns().updateRedPoint(hero);
	}

	public void openCountryRankUI(Hero hero, int countryId) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.QUN_XIONG_ZHU_LU)) {
				return;
			}
			CrossData crossData = new CrossData();
			crossData.putObject(CrossZhuLuEnum.Hid, hero.getId());
			crossData.putObject(CrossZhuLuEnum.CountryId, countryId);
			CrossData writeBlockData = CrossZhuLuFunction.getIns().sendToCross(hero,
					CrossConst.CROSS_ZHU_LU_OPEN_COUNTRY_RANK_UI_LC, crossData);
			if (writeBlockData == null)
				return;

			Type type = new TypeReference<List<CrossZhuLuHeroInfo>>() {
			}.getType();
			List<CrossZhuLuHeroInfo> list = writeBlockData.getObject(CrossZhuLuEnum.CrossZhuLuHeroInfos, type);
			int rank = writeBlockData.getObject(CrossZhuLuEnum.Rank, Integer.class);
			int score = writeBlockData.getObject(CrossZhuLuEnum.Score, Integer.class);
			List<Object> rankList = new ArrayList<>();
			for (int i = 0; i < list.size(); i++) {
				CrossZhuLuHeroInfo heroInfo = list.get(i);
				rankList.add(new Object[] { i + 1, heroInfo.getName(), heroInfo.getScore() });
			}
			QunXiongZhuLu qunXiongZhuLu = hero.getQunXiongZhuLu();
			qunXiongZhuLu.setScore(score);
			QunXiongZhuLuSender.sendCmd_8966(hero.getId(), rank, score, countryId, rankList.toArray());
		} catch (Exception e) {
			LogTool.error(e, QunXiongZhuLuManager.class, "move has wrong");
		}
	}

	public void move(Hero hero, int cityId) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.QUN_XIONG_ZHU_LU)) {
				return;
			}

			if (!CrossZhuLuFunction.getIns().isOpen()) {
				// 本期活动已结束
				QunXiongZhuLuSender.sendCmd_8968(hero.getId(), cityId, 99);
				return;
			}

			CrossData crossData = new CrossData();
			crossData.putObject(CrossZhuLuEnum.Hid, hero.getId());
			crossData.putObject(CrossZhuLuEnum.CityId, cityId);

			CrossData writeBlockData = CrossZhuLuFunction.getIns().sendToCross(hero, CrossConst.CROSS_ZHU_LU_MOVE_LC,
					crossData);
			if (writeBlockData == null)
				return;

			int state = writeBlockData.getObject(CrossZhuLuEnum.State, Integer.class);
			int type = writeBlockData.getObject(CrossZhuLuEnum.Type, Integer.class);

			if (state != 0) {
				QunXiongZhuLuSender.sendCmd_8968(hero.getId(), cityId, state);
				return;
			}
			if (type == 1) {
				QunXiongZhuLuSender.sendCmd_8982(hero.getId(), 4, 0, 0, 0, 0);
			}

			CrossZhuLuHeroInfo info = writeBlockData.getObject(CrossZhuLuEnum.CrossZhuLuHeroInfo,
					CrossZhuLuHeroInfo.class);

			QunXiongZhuLuSender.sendCmd_8982(hero.getId(), 1, info.getTiLi(), info.getMaxTiLi(),
					info.getUpdateTiLiTime(), 0);

			QunXiongZhuLuSender.sendCmd_8968(hero.getId(), cityId, state);
		} catch (Exception e) {
			LogTool.error(e, QunXiongZhuLuManager.class, "move has wrong");
		}
	}

	public void showCityInfo(Hero hero, int cityId, int page) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.QUN_XIONG_ZHU_LU)) {
				return;
			}

			CrossData crossData = new CrossData();
			crossData.putObject(CrossZhuLuEnum.CityId, cityId);
			crossData.putObject(CrossZhuLuEnum.Page, page);

			CrossData writeBlockData = CrossZhuLuFunction.getIns().sendToCross(hero,
					CrossConst.CROSS_ZHU_LU_SHOW_CITY_INFO_LC, crossData);
			if (writeBlockData == null)
				return;

			int countryId = writeBlockData.getObject(CrossZhuLuEnum.CountryId, Integer.class);
			int maxPage = writeBlockData.getObject(CrossZhuLuEnum.MaxPage, Integer.class);
			int curPage = writeBlockData.getObject(CrossZhuLuEnum.Page, Integer.class);

			Type type = new TypeReference<Map<Integer, CrossZhuLuHeroInfo>>() {
			}.getType();
			Map<Integer, CrossZhuLuHeroInfo> heroInfoMap = writeBlockData.getObject(CrossZhuLuEnum.CrossZhuLuHeroInfos,
					type);
			List<Object> roleInfo = new ArrayList<>();
			for (int index : heroInfoMap.keySet()) {
				CrossZhuLuHeroInfo heroInfo = heroInfoMap.get(index);
				long heroId = heroInfo.getHid();
				if (heroId < 0) {
					// NPC
					roleInfo.add(new Object[] { index, -1 * heroId, "", 0, 0, 1, 1, 0, 1, 0 });
				} else {
					roleInfo.add(new Object[] { index, heroId, heroInfo.getName(), heroInfo.getJob(),
							heroInfo.getModel().getWeaponModel(), heroInfo.getTiLi(), heroInfo.getMaxTiLi(),
							heroInfo.getStrength(), 0, heroInfo.getModel().getRideModel()});
				}
			}

			QunXiongZhuLuSender.sendCmd_8970(hero.getId(), cityId, countryId, maxPage, curPage, roleInfo.toArray());
		} catch (Exception e) {
			LogTool.error(e, QunXiongZhuLuManager.class, "showCityInfo has wrong");
		}
	}

	public void attack(Hero hero, int index) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.QUN_XIONG_ZHU_LU)) {
				return;
			}

			if (!CrossZhuLuFunction.getIns().isOpen()) {
				// 本期活动已结束
				QunXiongZhuLuSender.sendCmd_8972(hero.getId(), index, 99, 0, 0);
				return;
			}

			CrossData crossData = new CrossData();
			crossData.putObject(CrossZhuLuEnum.Hid, hero.getId());
			crossData.putObject(CrossZhuLuEnum.Index, index);
			QunXiongZhuLu local = hero.getQunXiongZhuLu();
			int buffTime = refreshBuff(local);
			crossData.putObject(CrossZhuLuEnum.isBuff, buffTime == 0 ? false : true);
			CrossData writeBlockData = CrossZhuLuFunction.getIns().sendToCross(hero, CrossConst.CROSS_ZHU_LU_ATTACK_LC,
					crossData);
			if (writeBlockData == null)
				return;

			int state = writeBlockData.getObject(CrossZhuLuEnum.State, Integer.class);
			if (state != 0) {
				QunXiongZhuLuSender.sendCmd_8972(hero.getId(), index, state, 0, 0);
				return;
			}

			CrossZhuLuHeroInfo info = writeBlockData.getObject(CrossZhuLuEnum.CrossZhuLuHeroInfo,
					CrossZhuLuHeroInfo.class);
			int type = writeBlockData.getObject(CrossZhuLuEnum.Type, Integer.class);
			if (type == 2) {
				// 驻守成功
				// 刷新驻守任务
				QunXiongZhuLuFunction.getIns().doTask(hero, QunXiongZhuLuConst.TASK_TYPES_1, 1);
				QunXiongZhuLuSender.sendCmd_8972(hero.getId(), index, 0, 0, type);
				return;
			}
			if (info.getHid() < 0) {
				// Npc
				info.setHid(info.getHid() * -1);
			} else {
				// 发送属性
				CrossZhuLuFunction.getIns().sendBattleHeroAttr(hero, info);
			}
			QunXiongZhuLuSender.sendCmd_8972(hero.getId(), index, 0, info.getHid(), type);

			local.setAttackCity(info.getCityId());
			local.setAttackIndex(index);
		} catch (Exception e) {
			LogTool.error(e, QunXiongZhuLuManager.class, "attack has wrong");
		}
	}

	public void battleResult(Hero hero, int result, int index) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.QUN_XIONG_ZHU_LU)) {
				return;
			}
			CrossData crossData = new CrossData();
			crossData.putObject(CrossZhuLuEnum.Hid, hero.getId());

			// 后端验算
			crossData.putObject(CrossZhuLuEnum.State, result);
			crossData.putObject(CrossZhuLuEnum.Index, index);

			CrossData writeBlockData = CrossZhuLuFunction.getIns().sendToCross(hero,
					CrossConst.CROSS_ZHU_LU_BATTLE_RESULT_LC, crossData);
			if (writeBlockData == null)
				return;

			int isDefend = writeBlockData.getObject(CrossZhuLuEnum.IsDefend, Integer.class);
			if (isDefend == 1) {
				// 刷新驻守任务
				QunXiongZhuLuFunction.getIns().doTask(hero, QunXiongZhuLuConst.TASK_TYPES_1, 1);
			}
			
			result = writeBlockData.getObject(CrossZhuLuEnum.State, Integer.class);

			QunXiongZhuLuSender.sendCmd_8974(hero.getId(), result);

			if (result == 1) {
				// 发送胜利奖励
				int[][] add = Config_xtcs_004.getIns().get(QunXiongZhuLuConst.CONFIG_ID_7202).getOther();
				UseAddUtil.add(hero, add, SourceGoodConst.QUNXIONGZHULU_ATTACK_AWARD_ADD, UseAddUtil.getDefaultMail(),
						true);
			} else {
				// 发送失败奖励
				int[][] add = Config_xtcs_004.getIns().get(QunXiongZhuLuConst.CONFIG_ID_7215).getOther();
				UseAddUtil.add(hero, add, SourceGoodConst.QUNXIONGZHULU_ATTACK_AWARD_ADD, UseAddUtil.getDefaultMail(),
						true);
			}

			QunXiongZhuLu local = hero.getQunXiongZhuLu();
			local.setAttackCity(0);
			local.setAttackIndex(0);
			CrossZhuLuHeroInfo info = writeBlockData.getObject(CrossZhuLuEnum.CrossZhuLuHeroInfo,
					CrossZhuLuHeroInfo.class);
			local.setScore(info.getScore());
		} catch (Exception e) {
			LogTool.error(e, QunXiongZhuLuManager.class, "battleResult has wrong");
		}
	}

	public void buySta(Hero hero) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.QUN_XIONG_ZHU_LU)) {
				return;
			}

			if (!CrossZhuLuFunction.getIns().isOpen()) {
				// 本期活动已结束
				QunXiongZhuLuSender.sendCmd_8976(hero.getId(), 99, 0, 0, 0);
				return;
			}

			QunXiongZhuLu zhuLu = hero.getQunXiongZhuLu();
			int maxBuyTimes = Config_xtcs_004.getIns().get(QunXiongZhuLuConst.CONFIG_ID_7209).getNum();
			maxBuyTimes += VipFunction.getIns().getVipNum(hero, VipAddType.crossZhuLuBuyTiLiTimes);
			if (zhuLu.getBuyTiLiTimes() >= maxBuyTimes) {
				// 购买次数不足
				QunXiongZhuLuSender.sendCmd_8976(hero.getId(), 1, 0, 0, 0);
				return;
			}

			int nowBuyTimes = zhuLu.getBuyTiLiTimes() + 1;
			int state = 0;
			Struct_qxzltl_273 config = Config_qxzltl_273.getIns().get(nowBuyTimes);
			if (config == null) {
				config = Config_qxzltl_273.getIns().get(Config_qxzltl_273.getIns().getSortList().size());
			}
			state = config.getTl();
			int[][] cost = config.getConmuse();

			if (!UseAddUtil.canUse(hero, cost)) {
				QunXiongZhuLuSender.sendCmd_8976(hero.getId(), 2, 0, 0, 0);
				return;
			}

			UseAddUtil.use(hero, cost, SourceGoodConst.QUNXIONGZHULU_TILI_COST, true);

			zhuLu.setBuyTiLiTimes(zhuLu.getBuyTiLiTimes() + 1);

			CrossData crossData = new CrossData();
			crossData.putObject(CrossZhuLuEnum.Hid, hero.getId());
			crossData.putObject(CrossZhuLuEnum.State, state);
			CrossData writeBlockData = CrossZhuLuFunction.getIns().sendToCross(hero, CrossConst.CROSS_ZHU_LU_BUY_STA_LC,
					crossData);
			if (writeBlockData == null)
				return;

			CrossZhuLuHeroInfo info = writeBlockData.getObject(CrossZhuLuEnum.CrossZhuLuHeroInfo,
					CrossZhuLuHeroInfo.class);

			QunXiongZhuLuSender.sendCmd_8976(hero.getId(), 0, info.getTiLi(), info.getMaxTiLi(),
					zhuLu.getBuyTiLiTimes());

			QunXiongZhuLuFunction.getIns().doTask(hero, QunXiongZhuLuConst.TASK_TYPES_4, 1);

			QunXiongZhuLuFunction.getIns().updateRedPoint(hero);
		} catch (Exception e) {
			LogTool.error(e, QunXiongZhuLuManager.class, "buySta has wrong");
		}
	}

	public void getDefendAwardInfo(Hero hero) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.QUN_XIONG_ZHU_LU)) {
				return;
			}

			CrossData crossData = new CrossData();
			crossData.putObject(CrossZhuLuEnum.Hid, hero.getId());
			CrossData writeBlockData = CrossZhuLuFunction.getIns().sendToCross(hero,
					CrossConst.CROSS_ZHU_LU_GET_DEFEND_AWARD_INFO_LC, crossData);
			if (writeBlockData == null)
				return;

			Type type = new TypeReference<List<CrossZhuLuDefendAward>>() {
			}.getType();
			List<CrossZhuLuDefendAward> list = writeBlockData.getObject(CrossZhuLuEnum.CrossZhuLuDefendAwards, type);

			List<Object> awardList = new ArrayList<>();
			for (CrossZhuLuDefendAward award : list) {
				awardList.add(new Object[] { award.getAwardType(), award.getAwardId(), award.getCount() });
			}
			QunXiongZhuLuSender.sendCmd_8978(hero.getId(), awardList.toArray());
		} catch (Exception e) {
			LogTool.error(e, QunXiongZhuLuManager.class, "getDefendAwardInfo has wrong");
		}
	}

	public void gotDefendAward(Hero hero) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.QUN_XIONG_ZHU_LU)) {
				return;
			}

			CrossData crossData = new CrossData();
			crossData.putObject(CrossZhuLuEnum.Hid, hero.getId());
			CrossData writeBlockData = CrossZhuLuFunction.getIns().sendToCross(hero,
					CrossConst.CROSS_ZHU_LU_GOT_DEFEND_AWARD_LC, crossData);
			if (writeBlockData == null)
				return;

			Type type = new TypeReference<List<CrossZhuLuDefendAward>>() {
			}.getType();
			List<CrossZhuLuDefendAward> list = writeBlockData.getObject(CrossZhuLuEnum.CrossZhuLuDefendAwards, type);
			if (list.isEmpty()) {
				// 已领取驻守奖励
				QunXiongZhuLuSender.sendCmd_8980(hero.getId(), 1);
				return;
			}
			List<int[]> awardList = new ArrayList<int[]>();
			for (CrossZhuLuDefendAward reward : list) {
				awardList.add(new int[] { reward.getAwardType(), reward.getAwardId(), reward.getCount() });
			}

			int size = awardList.size();
			int[][] AwardArray = new int[size][];
			awardList.toArray(AwardArray);
			UseAddUtil.add(hero, AwardArray, SourceGoodConst.QUNXIONGZHULU_DEFEND_AWARD_ADD,
					UseAddUtil.getDefaultMail(), true);

			QunXiongZhuLuSender.sendCmd_8980(hero.getId(), 0);

			QunXiongZhuLuFunction.getIns().updateRedPoint(hero);
		} catch (Exception e) {
			LogTool.error(e, QunXiongZhuLuManager.class, "gotDefendAward has wrong");
		}
	}

	public void openPersonRankUI(Hero hero) {
		if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.QUN_XIONG_ZHU_LU)) {
			return;
		}
		QunXiongZhuLu qunXiongZhuLu = hero.getQunXiongZhuLu();
		long myScore = qunXiongZhuLu.getScore();
		int myRank = 0;
		Object[] openUIObjArray = CommonRankSysCache.getOpenUIObjArray(SystemIdConst.QUN_XIONG_ZHU_LU);
		if (openUIObjArray != null) {
			for (Object obj : openUIObjArray) {
				Object[] objArray = (Object[]) obj;
				String name = (String) objArray[1];
				if (hero.getNameZoneid().equals(name)) {
					myRank = (Integer) objArray[0];
				}
			}
		}
		if (myScore != 0 && myRank == 0) {
			myRank = CommonRankFunction.getIns().getRankNum(SystemIdConst.QUN_XIONG_ZHU_LU) + 1;
		}
		QunXiongZhuLuSender.sendCmd_8984(hero.getId(), openUIObjArray, myRank, (int) myScore);
	}

	public void buffBuy(Hero hero) {
		if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.QUN_XIONG_ZHU_LU)) {
			return;
		}
		QunXiongZhuLu qunXiongZhuLu = hero.getQunXiongZhuLu();
		int restBuffTime = refreshBuff(qunXiongZhuLu);
		if (restBuffTime > 0) {
			QunXiongZhuLuSender.sendCmd_8986(hero.getId(), 3);
			return;
		}
		int[][] buffConsume = Config_xtcs_004.getIns().get(QunXiongZhuLuConst.BUFF_CONSUME).getOther();
		if (!UseAddUtil.canUse(hero, buffConsume)) {
			// 元宝不足
			QunXiongZhuLuSender.sendCmd_8986(hero.getId(), 2);
			return;
		}
		UseAddUtil.use(hero, buffConsume, SourceGoodConst.QUNXIONGZHULU_BUFF_CONSUME, true);
		int currentTime = TimeDateUtil.getCurrentTime();
		int buffTime = Config_xtcs_004.getIns().get(QunXiongZhuLuConst.BUFF_TIME).getNum();
		qunXiongZhuLu.setBuffTime(currentTime + buffTime * TimeDateUtil.ONE_MINUTE);
		QunXiongZhuLuSender.sendCmd_8986(hero.getId(), 1);

	}

	public int refreshBuff(QunXiongZhuLu qunXiongZhuLu){
		int buffTime = qunXiongZhuLu.getBuffTime();
		if (buffTime == 0) {
			return 0;
		}
		int currentTime = TimeDateUtil.getCurrentTime();
		if (buffTime != 0 && currentTime >= buffTime) {
			qunXiongZhuLu.setBuffTime(0);
			return 0;
		}
		return buffTime - currentTime;
	}

}
