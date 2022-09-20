package com.teamtop.system.crossZhuLu.cross;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.netty.server.server2.Client_2;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.actHall.ActHallInterface;
import com.teamtop.system.crossCommonRank.cross.CrossCommonRankCL;
import com.teamtop.system.crossMine.CrossMineFunction;
import com.teamtop.system.crossZhuLu.QunXiongZhuLuCache;
import com.teamtop.system.crossZhuLu.QunXiongZhuLuConst;
import com.teamtop.system.crossZhuLu.dao.CrossZhuLuHeroInfoDao;
import com.teamtop.system.crossZhuLu.dao.CrossZhuLuRoomInfoDao;
import com.teamtop.system.crossZhuLu.model.CrossZhuLuCityInfo;
import com.teamtop.system.crossZhuLu.model.CrossZhuLuCountryInfo;
import com.teamtop.system.crossZhuLu.model.CrossZhuLuDefendInfo;
import com.teamtop.system.crossZhuLu.model.CrossZhuLuHeroInfo;
import com.teamtop.system.crossZhuLu.model.CrossZhuLuPersonRank;
import com.teamtop.system.crossZhuLu.model.CrossZhuLuRoomInfo;
import com.teamtop.system.godWeapon.GodWeaponFunction;
import com.teamtop.system.godbook.GodBook;
import com.teamtop.system.godbook.GodBookModel;
import com.teamtop.system.hero.FightAttrFunction;
import com.teamtop.system.hero.FinalFightAttr;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroConst;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.HeroSender;
import com.teamtop.system.hero.ShowModel;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.littleLeader.LittleLeader;
import com.teamtop.system.littleLeader.LittleLeaderModel;
import com.teamtop.system.skill.model.SkillInfo;
import com.teamtop.system.treasure.model.TreasureData;
import com.teamtop.system.treasure.model.TreasureModel;
import com.teamtop.system.vip.VipAddType;
import com.teamtop.system.vip.VipFunction;
import com.teamtop.system.wujiang.WuJiangFunction;
import com.teamtop.util.ProbabilityEvent.RandomUtil;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_kuafu_200;
import excel.config.Config_qxzl_273;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_kuafu_200;
import excel.struct.Struct_qxzl_273;
import io.netty.channel.Channel;

public class CrossZhuLuFunction implements ActHallInterface {
	private static CrossZhuLuFunction ins;

	public static synchronized CrossZhuLuFunction getIns() {
		if (ins == null) {
			ins = new CrossZhuLuFunction();
		}
		return ins;
	}

	private CrossZhuLuFunction() {

	}

	/**
	 * 初始化房间信息
	 * 
	 * @param partId
	 */
	public void initRoomInfo(int partId) {
		try {
			CrossZhuLuRoomInfo roomInfo = new CrossZhuLuRoomInfo();
			roomInfo.setPartId(partId);
			initCountrysInfo(roomInfo);
			initCitysInfo(roomInfo);
			resetLuckCity(roomInfo);
			CrossZhuLuCache.roomInfoMap.put(partId, roomInfo);
			CrossZhuLuRoomInfoDao.getIns().insertRoomInfo(roomInfo);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 初始化国家信息
	 * 
	 * @param roomInfo
	 */
	public void initCountrysInfo(CrossZhuLuRoomInfo roomInfo) {
		try {
			for (int i = 1; i <= 3; i++) {
				CrossZhuLuCountryInfo info = new CrossZhuLuCountryInfo();
				info.setCountryId(i);
				info.setTotalScore(0);
				info.setUpdateTime(0);
				roomInfo.getCountryInfoMap().put(i, info);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 初始化城池信息
	 * 
	 * @param roomInfo
	 */
	public void initCitysInfo(CrossZhuLuRoomInfo roomInfo) {
		try {
			for (Struct_qxzl_273 config : Config_qxzl_273.getIns().getSortList()) {
				CrossZhuLuCityInfo info = new CrossZhuLuCityInfo();
				info.setCityId(config.getId());
				info.setHeroIdMap(new ConcurrentHashMap<>());
				int countryId = 0;
				if (config.getType() == QunXiongZhuLuConst.CITY_TYPES_4) {
					countryId = HeroConst.WEI;
				} else if (config.getType() == QunXiongZhuLuConst.CITY_TYPES_5) {
					countryId = HeroConst.SHU;
				} else if (config.getType() == QunXiongZhuLuConst.CITY_TYPES_6) {
					countryId = HeroConst.WU;
				}
				info.setCountryId(countryId);
				info.setIsLuck(0);
				roomInfo.getCityInfoMap().put(info.getCityId(), info);
				if (config.getNpc() != 0) {
					// 初始化npc
					long npcId = config.getNpc();
					CrossZhuLuDefendInfo defendInfo = new CrossZhuLuDefendInfo();
					defendInfo.setDefendTime(0);
					defendInfo.setHid(-1 * npcId);
					info.getHeroIdMap().put(0, defendInfo);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 逐鹿是否进行开启
	 * 
	 * @return
	 */
	public boolean isOpen() {
		try {
			int week = TimeDateUtil.getWeek();
			if (week == 7) {
				int currentTime = TimeDateUtil.getCurrentTime();
				int endTime = TimeDateUtil.getTimeOfTheClock(22);
				if (currentTime >= endTime) {
					return false;
				}
			} else if (week == 1) {
				int currentTime = TimeDateUtil.getCurrentTime();
				int startTime = TimeDateUtil.getTimeOfTheClock(10);
				if (currentTime < startTime) {
					return false;
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return true;
	}

	/**
	 * 刷新庆典城池
	 * 
	 * @param roomInfo
	 */
	public void resetLuckCity(CrossZhuLuRoomInfo roomInfo) {
		try {
			for (CrossZhuLuCityInfo cityInfo : roomInfo.getCityInfoMap().values()) {
				cityInfo.setIsLuck(0);
			}
			int count = 0;
			int size = CrossZhuLuCache.luckCityIdList.size();
			int firstCityId = 0;
			while (count < 100) {
				int index = RandomUtil.getRandomNumInAreas(0, size - 1);
				int cityId = CrossZhuLuCache.luckCityIdList.get(index);
				if (firstCityId == cityId) {
					count++;
					continue;
				}
				roomInfo.getCityInfoMap().get(cityId).setIsLuck(1);
				if (firstCityId != 0 && firstCityId != cityId) {
					break;
				}
				firstCityId = cityId;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 刷新排名
	 * 
	 * @param roomInfo
	 */
	public void refreshRank(CrossZhuLuRoomInfo roomInfo) {
		List<CrossZhuLuCountryInfo> countryInfoRankList = new ArrayList<>();
		countryInfoRankList.addAll(roomInfo.getCountryInfoMap().values());
		CrossZhuLuCache.countryInfoRankMap.put(roomInfo.getPartId(), countryInfoRankList);
		Collections.sort(countryInfoRankList);

		CrossZhuLuCountryInfo info = countryInfoRankList.get(0);
		int countryId = info.getCountryId();

		Map<Integer, List<CrossZhuLuHeroInfo>> heroInfoRankMap = new ConcurrentHashMap<>();
		CrossZhuLuCache.heroInfoRankMap.put(roomInfo.getPartId(), heroInfoRankMap);
		for (int i = 1; i < 4; i++) {
			List<CrossZhuLuHeroInfo> heroInfoRankList = new ArrayList<>();
			heroInfoRankMap.put(i, heroInfoRankList);

			Map<Long, CrossZhuLuHeroInfo> heroInfoMap = CrossZhuLuCache.heroInfoMap.get(roomInfo.getPartId());
			if (heroInfoMap != null) {
				for (CrossZhuLuHeroInfo heroInfo : heroInfoMap.values()) {
					if (heroInfo.getCountryId() == i) {
						if (heroInfo.getScore() != 0) {
							heroInfoRankList.add(heroInfo);
						}
					}
				}
			}
			Collections.sort(heroInfoRankList);

			if (countryId == i) {
				long mvpHeroId = 0;
				if (!heroInfoRankList.isEmpty()) {
					mvpHeroId = heroInfoRankList.get(0).getHid();
				}
				roomInfo.setMvpHeroId(mvpHeroId);
			}
		}
	}

	/**
	 * 初始化玩家信息
	 * 
	 * @param hero
	 * @return
	 */
	public CrossZhuLuHeroInfo initCrossZhuLuHeroInfo(Hero hero) {
		CrossZhuLuHeroInfo heroInfo = new CrossZhuLuHeroInfo();
		heroInfo.setHid(hero.getId());
		heroInfo.setCountryId(hero.getCountryType());
		heroInfo.setJob(hero.getJob());
		heroInfo.setBaowu(hero.getTreasureData());
		heroInfo.setTianshu(hero.getGodbook());
		heroInfo.setStrength(hero.getTotalStrength());
		heroInfo.setModel(hero.getShowModel());
		heroInfo.getModel().setWeaponModel(GodWeaponFunction.getIns().getNowGodWeapon(hero));
		heroInfo.setSkill(hero.getSkill());
		heroInfo.setFinalFightAttr(hero.getFinalFightAttr());
		heroInfo.setFigthMonsterSpirit(hero.getMonsterSpiritModel().getFightMonsterSpiri());
		heroInfo.setLittleLeader(hero.getLittleLeader());
		heroInfo.setName(hero.getNameZoneid());
		heroInfo.setHerdid(hero.getIcon());
		heroInfo.setIconid(hero.getFrame());
		heroInfo.setIconid(hero.getFrame());
		heroInfo.setIconid(hero.getFrame());
		int base = Config_xtcs_004.getIns().get(QunXiongZhuLuConst.CONFIG_ID_7205).getNum();
		heroInfo.setMaxTiLi(VipFunction.getIns().getVipNum(hero, VipAddType.crossZhuLuAddTiLi) + base);
		int godSkillLevel = WuJiangFunction.getIns().getGodSkillLevel(hero.getJob(), hero.getWujiang());
		heroInfo.setGodSkillLevel(godSkillLevel);
		heroInfo.getModel().setRideModel(hero.getMountId());
		return heroInfo;
	}

	/**
	 * 刷新体力
	 * 
	 * @param heroInfo
	 */
	public void updateTiLi(CrossZhuLuHeroInfo heroInfo) {
		if (heroInfo.getTiLi() >= heroInfo.getMaxTiLi()) {
			return;
		}
		int now = TimeDateUtil.getCurrentTime();
		int time = Config_xtcs_004.getIns().get(QunXiongZhuLuConst.CONFIG_ID_7208).getNum();
		int add = Config_xtcs_004.getIns().get(QunXiongZhuLuConst.CONFIG_ID_7201).getNum();
		int before = heroInfo.getUpdateTiLiTime();
		if (now - before > time) {
			// 回复若干体力
			int count = (now - before) / time;
			add *= count;
			updateTiLi(heroInfo, add, false);

			if (heroInfo.getTiLi() < heroInfo.getMaxTiLi()) {
				heroInfo.setUpdateTiLiTime(before + count * time);
			} else {
				heroInfo.setUpdateTiLiTime(now);
			}
		}
	}

	/**
	 * 更新体力操作
	 * 
	 * @param heroInfo
	 * @param num
	 */
	public void updateTiLi(CrossZhuLuHeroInfo heroInfo, int num, boolean isOverMax) {
		synchronized (heroInfo) {
			int before = heroInfo.getTiLi();
			if (num < 0) {
				if (heroInfo.getTiLi() >= heroInfo.getMaxTiLi()) {
					heroInfo.setUpdateTiLiTime(TimeDateUtil.getCurrentTime());
				}
			}
			if(!isOverMax && num > 0) {
				// 体力回复
				if(heroInfo.getTiLi()>=heroInfo.getMaxTiLi()) {
					LogTool.warn("updateTiLi_for("+(num<0?"-":"+")+"):hid-"+heroInfo.getHid()+",before-"+before+",now-"+heroInfo.getTiLi(), CrossZhuLuFunction.class);
					return;
				}
			}
			heroInfo.setTiLi(heroInfo.getTiLi() + num);
			if (!isOverMax) {
				if (heroInfo.getTiLi() >= heroInfo.getMaxTiLi()) {
					heroInfo.setTiLi(heroInfo.getMaxTiLi());
				}
			}
			if (heroInfo.getTiLi() > 100000) {
				heroInfo.setTiLi(heroInfo.getMaxTiLi());
			}
			if (heroInfo.getTiLi() < 0) {
				heroInfo.setTiLi(0);
			}
			LogTool.warn("updateTiLi_for("+(num<0?"-":"+")+"):hid-"+heroInfo.getHid()+",before-"+before+",now-"+heroInfo.getTiLi(), CrossZhuLuFunction.class);
		}
	}

	/**
	 * 更新积分操作
	 * 
	 * @param heroInfo
	 * @param num
	 */
	public void updateScore(CrossZhuLuHeroInfo heroInfo, int num) {
		synchronized (heroInfo) {
			heroInfo.setScore(heroInfo.getScore() + num);
			heroInfo.setTodayScore(heroInfo.getTodayScore() + num);
			heroInfo.setUpdateScoreTime(TimeDateUtil.getCurrentTime());
		}
		updatePersonRank(heroInfo);

		int countryId = heroInfo.getCountryId();
		int partId = CrossCache.getPartId(CommonUtil.getZoneIdById(heroInfo.getHid()));
		CrossZhuLuRoomInfo roomInfo = CrossZhuLuCache.roomInfoMap.get(partId);
		if (roomInfo != null) {
			CrossZhuLuCountryInfo countryInfo = roomInfo.getCountryInfoMap().get(countryId);
			if (countryInfo != null) {
				synchronized (countryInfo) {
					countryInfo.setTotalScore(countryInfo.getTotalScore() + num);
					countryInfo.setUpdateTime(TimeDateUtil.getCurrentTime());
				}
			}
		}
	}

	public void updatePersonRank(CrossZhuLuHeroInfo heroInfo) {
		try {
			CrossZhuLuPersonRank model = new CrossZhuLuPersonRank(heroInfo.getHid(), heroInfo.getName(), (int) heroInfo.getScore(), heroInfo.getCountryId());
			model.setReachTime(heroInfo.getUpdateScoreTime());
			int partId = CrossCache.getPartId(CommonUtil.getZoneIdById(heroInfo.getHid()));
			CrossCommonRankCL.getIns().addUpdateRank(partId, SystemIdConst.QUN_XIONG_ZHU_LU, model);
		} catch (Exception e) {
			if (heroInfo == null) {
				LogTool.error(e, this, "CrossZhuLuFunction updatePersonRank sysId:" + SystemIdConst.QUN_XIONG_ZHU_LU);
			} else {
				LogTool.error(e, this, heroInfo.getHid(), heroInfo.getName(), "CrossZhuLuFunction updatePersonRank sysId:" + SystemIdConst.QUN_XIONG_ZHU_LU + " score:" + heroInfo.getScore());
			}
		}
	}

	/**
	 * 发送战斗玩家的属性
	 * 
	 * @param hero
	 *            发送到的玩家对象
	 * @param beHid
	 *            需查询的玩家id
	 */
	public void sendBattleHeroAttr(Hero hero, CrossZhuLuHeroInfo heroInfo) {
		Map<Integer, SkillInfo> skillMap = heroInfo.getSkill().getSkillMap();
		List<Object[]> attrData = new ArrayList<Object[]>();
		FinalFightAttr attr = heroInfo.getFinalFightAttr();
		// 技能数据
		Map<Integer, Integer> skillHurtAddMap = HeroFunction.getIns().getSkillHurtAddMap(hero, heroInfo.getHid(),
				heroInfo.getGodSkillLevel(),
				heroInfo.getJob());
		List<Object[]> skillData = new ArrayList<Object[]>();
		for (Entry<Integer, SkillInfo> entry : skillMap.entrySet()) {
			int index = entry.getKey();
			SkillInfo skillInfo = entry.getValue();
			Integer skillHurtAdd = Optional.ofNullable(skillHurtAddMap).map(mapper -> mapper.get(skillInfo.getId()))
					.orElse(0);
			skillData.add(new Object[] { index, skillInfo.getId(), skillInfo.getLevel(), skillHurtAdd });
		}
		ShowModel showModel = heroInfo.getModel();
		int fashionID = showModel.getBodyModel();
		// 出战兽灵
		int fms = heroInfo.getFigthMonsterSpirit();
		// L:唯一id，第一个跟hid一样B:武将类型I:生命I:内力I:攻击I:物防I:法防I:暴击率I:抗暴率I:暴击伤害I:伤害加成I:伤害减免I:pvp伤害加成I:pvp伤害减免I:移动速度I:战力[S:技能等级S:技能觉醒等级]技能数据
		List<Object[]> attrSendData = FightAttrFunction.createAttrSendData(attr);
		attrData.add(new Object[] { attr.getUid(), heroInfo.getJob(), attrSendData.toArray(), skillData.toArray(),
				fashionID });
		// GC[I:0（宝物1id）1（宝物1星级）2（宝物2）3（宝物2星级）4（天书id）5（天书星级）6（武将星级）]其他参数数组
		List<Object[]> extdataList = new ArrayList<>();
		int wearTreasure1 = 0;
		int baowu1Star = 0;
		int wearTreasure2 = 0;
		int baowu2Star = 0;
		int godBookid = 0;
		int godBookStar = 0;
		int wujiangStar = 0;
		int godWeapon = 0;
		int nowjob = heroInfo.getJob();
		TreasureData treasureData = heroInfo.getBaowu();
		if (treasureData != null) {
			List<Integer> wearTreasureList = treasureData.getWearTreasureList();
			if (wearTreasureList != null) {
				Map<Integer, TreasureModel> treasureMap = treasureData.getTreasureMap();
				wearTreasure1 = wearTreasureList.get(0);
				wearTreasure2 = wearTreasureList.get(1);
				if (wearTreasure1 != 0 && treasureMap.containsKey(wearTreasure1)) {
					TreasureModel treasureModel = treasureMap.get(wearTreasure1);
					baowu1Star = treasureModel.getStarLevel();
				}
				if (wearTreasure2 != 0 && treasureMap.containsKey(wearTreasure2)) {
					TreasureModel treasureModel = treasureMap.get(wearTreasure2);
					baowu2Star = treasureModel.getStarLevel();
				}
			}
		}
		GodBook godBook = heroInfo.getTianshu();
		if (godBook != null) {
			HashMap<Integer, GodBookModel> hasBooks = godBook.getHasBooks();
			godBookid = godBook.getWearid();
			if (godBookid != 0 && hasBooks.containsKey(godBookid)) {
				GodBookModel godBookModel = hasBooks.get(godBookid);
				godBookStar = godBookModel.getStar();
			}
		}

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
		LittleLeader littleLeader = heroInfo.getLittleLeader();
		if (littleLeader != null) {
			withLeaderId = littleLeader.getWearType();
			if (withLeaderId != 0) {
				LittleLeaderModel littleLeaderModel = littleLeader.getHasLittleLeaderModels().get(withLeaderId);
				withLeaderFid = littleLeaderModel.getNowFashId();
				leaderStarId = littleLeaderModel.getStar();
				leaderSkillId = littleLeaderModel.getActivityKillLv();
			}

		}
		// 推送前端
		HeroSender.sendCmd_130(hero.getId(), heroInfo.getHid(), heroInfo.getName(), 0, heroInfo.getCountryId(), 0, fms,
				attrData.toArray(), heroInfo.getStrength(), extdataList.toArray(), withLeaderId, withLeaderFid,
				leaderStarId, leaderSkillId);
	}

	/**
	 * 发送全服广播
	 * 
	 * @param crossData
	 * @param partId
	 */
	public void sendBroad(int countryId, String name, int cityId, int partId) {
		CrossData crossData = new CrossData();
		crossData.putObject(CrossZhuLuEnum.CountryId, countryId);
		crossData.putObject(CrossZhuLuEnum.Name, name);
		crossData.putObject(CrossZhuLuEnum.CityId, cityId);
		ConcurrentHashMap<Channel, List<Integer>> channelToZoneid = CrossCache.getChannelToZoneidByPartId(partId);
		Iterator<Entry<Channel, List<Integer>>> iterator = channelToZoneid.entrySet().iterator();
		while (iterator.hasNext()) {
			Entry<Channel, List<Integer>> next = iterator.next();
			Channel c = next.getKey();
			NettyWrite.writeXData(c, CrossConst.CROSS_ZHU_LU_BROAD_CAST_CL, crossData);
		}
	}

	/**
	 * 发送全服MVP通知
	 * 
	 * @param crossData
	 * @param partId
	 */
	public void sendLastMvpName(String name, int partId) {
		CrossData crossData = new CrossData();
		crossData.putObject(CrossZhuLuEnum.Name, name);
		ConcurrentHashMap<Channel, List<Integer>> channelToZoneid = CrossCache.getChannelToZoneidByPartId(partId);
		Iterator<Entry<Channel, List<Integer>>> iterator = channelToZoneid.entrySet().iterator();
		while (iterator.hasNext()) {
			Entry<Channel, List<Integer>> next = iterator.next();
			Channel c = next.getKey();
			NettyWrite.writeXData(c, CrossConst.CROSS_ZHU_LU_NOTICE_LAST_MVP_NAME_LC, crossData);
		}
	}
	
	/**
	 * 发送驻守方移动通知
	 * 
	 * @param crossData
	 * @param partId
	 */
	public void noticeMove(long hid) {
		CrossData crossData = new CrossData();
		crossData.putObject(CrossZhuLuEnum.Hid, hid);
		Channel c = CrossCache.getChannel(CommonUtil.getZoneIdById(hid));
		NettyWrite.writeXData(c, CrossConst.CROSS_ZHU_LU_NOTICE_MOVE_LC, crossData);
	}

	/**
	 * 请求中央服并获取返回数据
	 * 
	 * @param hero
	 * @param crossData
	 * @return
	 */
	public CrossData sendToCross(Hero hero, int cmd, CrossData crossData) {
		Channel channel = Client_2.getIns().getCrossChannel();
		if (channel == null || !channel.isOpen()) {
			LogTool.warn("channel == null || !channel.isOpen() sendToCross", CrossMineFunction.class);
			return null;
		}
		CrossData writeBlockData = NettyWrite.writeBlockData(channel, cmd, hero.getId(), crossData);
		return writeBlockData;
	}

	@Override
	public void getActHallData(List<Object[]> list) {
		// 群雄逐鹿lastmvp
		if (QunXiongZhuLuCache.lastMvpName != null && !QunXiongZhuLuCache.lastMvpName.equals("")) {
			list.add(new Object[] { SystemIdConst.QUN_XIONG_ZHU_LU, QunXiongZhuLuCache.lastMvpName });
		}
	}
	
	
	public  void heCrossZuhandle() {
		try {
			Map<Integer, Struct_kuafu_200> map = Config_kuafu_200.getIns().getMap();
			Map<Integer, CrossZhuLuRoomInfo> roomInfoMap = new HashMap<Integer, CrossZhuLuRoomInfo>();
			// 加载房间数据并处理
			List<CrossZhuLuRoomInfo> roomInfoList = CrossZhuLuRoomInfoDao.getIns().findAllData();
			for (CrossZhuLuRoomInfo roomInfo : roomInfoList) {
				roomInfoMap.put(roomInfo.getPartId(), roomInfo);
				roomInfo.getCityInfoMap().clear();
				initCitysInfo(roomInfo);
			}
			for (Integer key: roomInfoMap.keySet()) {
				CrossZhuLuRoomInfo crossZhuLuRoomInfo = roomInfoMap.get(key);
				if (crossZhuLuRoomInfo!=null) {
					Struct_kuafu_200 struct_kuafu_200 = map.get(key);
					if(struct_kuafu_200.getCl()==1) {
						int mb = struct_kuafu_200.getMb();
						//合并 国家积分
						CrossZhuLuRoomInfo goalRoomInfo = roomInfoMap.get(mb);
						if (goalRoomInfo!=null) {
							Map<Integer, CrossZhuLuCountryInfo> countryInfoMap = goalRoomInfo.getCountryInfoMap();
							Map<Integer, CrossZhuLuCountryInfo> countryInfoMap2 = crossZhuLuRoomInfo.getCountryInfoMap();
							if (countryInfoMap!=null&&countryInfoMap2!=null) {
								for (CrossZhuLuCountryInfo countryInfo:countryInfoMap.values()) {
									if (countryInfoMap2.get(countryInfo.getCountryId())!=null) {
										CrossZhuLuCountryInfo crossZhuLuCountryInfo = countryInfoMap2.get(countryInfo.getCountryId());
										countryInfo.setTotalScore(countryInfo.getTotalScore()+crossZhuLuCountryInfo.getTotalScore());
									}
									
								}
							}
						}
					}
				}
			}
			//处理玩家数据 回到起点
			List<CrossZhuLuHeroInfo> heroInfoList = CrossZhuLuHeroInfoDao.getIns().findAllData();
			for (CrossZhuLuHeroInfo heroInfo : heroInfoList) {
				if (heroInfo.getHid() == 1) {
					continue;
				}
				heroInfo.setState(0);
				heroInfo.setCityId(400+heroInfo.getCountryId());
			}
			//入库
			List<CrossZhuLuRoomInfo> allRoomInfo = new ArrayList<>();
			allRoomInfo.addAll(roomInfoMap.values());
			CrossZhuLuRoomInfoDao.getIns().updateRoomInfoBatch(allRoomInfo);
			CrossZhuLuHeroInfoDao.getIns().updateHeroInfoBatch(heroInfoList);
			
		} catch (Exception e) {
			LogTool.error(e, CrossZhuLuFunction.class, "CrossZhuLuFunction heCrossZuhandle has wrong");
		}
	}

	public void sendMail(int zoneid, List<CrossZhuLuMail> mails) {
		CrossData crossData = new CrossData();
		crossData.putObject(CrossZhuLuEnum.mails, mails);
		Channel channel = CrossCache.getChannel(zoneid);
		NettyWrite.writeXData(channel, CrossConst.CROSS_ZHU_LU_NOTICE_MAIL_LC, crossData);
	}

}