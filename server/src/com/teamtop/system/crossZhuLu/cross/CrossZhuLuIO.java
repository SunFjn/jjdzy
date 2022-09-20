package com.teamtop.system.crossZhuLu.cross;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.alibaba.fastjson.TypeReference;
import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.battle.BattleFunction;
import com.teamtop.system.chat.ChatConst;
import com.teamtop.system.chat.ChatManager;
import com.teamtop.system.crossZhuLu.QunXiongZhuLuCache;
import com.teamtop.system.crossZhuLu.QunXiongZhuLuConst;
import com.teamtop.system.crossZhuLu.QunXiongZhuLuSender;
import com.teamtop.system.crossZhuLu.dao.CrossZhuLuHeroInfoDao;
import com.teamtop.system.crossZhuLu.model.CrossZhuLuCityInfo;
import com.teamtop.system.crossZhuLu.model.CrossZhuLuCountryInfo;
import com.teamtop.system.crossZhuLu.model.CrossZhuLuDefendAward;
import com.teamtop.system.crossZhuLu.model.CrossZhuLuDefendInfo;
import com.teamtop.system.crossZhuLu.model.CrossZhuLuHeroInfo;
import com.teamtop.system.crossZhuLu.model.CrossZhuLuRecord;
import com.teamtop.system.crossZhuLu.model.CrossZhuLuRoomInfo;
import com.teamtop.system.crossZhuLu.model.QunXiongZhuLu;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_qxzl_273;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_qxzl_273;
import io.netty.channel.Channel;

public class CrossZhuLuIO {
	private static CrossZhuLuIO ins;

	public static synchronized CrossZhuLuIO getIns() {
		if (ins == null) {
			ins = new CrossZhuLuIO();
		}
		return ins;
	}

	public void CRLenterMap(Channel channel, CrossData crossData) {
		try {
			int cmd = CrossConst.CROSS_ZHU_LU_ENTER_MAP_LC;

			long hid = crossData.getObject(CrossZhuLuEnum.Hid, Long.class);
			CrossZhuLuHeroInfo info = crossData.getObject(CrossZhuLuEnum.CrossZhuLuHeroInfo, CrossZhuLuHeroInfo.class);
			int partId = CrossCache.getPartId(channel);
			crossData.finishGet();

			Map<Long, CrossZhuLuHeroInfo> heroMap = CrossZhuLuCache.heroInfoMap.get(partId);
			if (heroMap == null) {
				heroMap = new ConcurrentHashMap<>();
				CrossZhuLuCache.heroInfoMap.put(partId, heroMap);
			}
			if (heroMap.containsKey(hid)) {
				// 返回信息
				CrossZhuLuHeroInfo heroInfo = heroMap.get(hid);
				// 刷新hero信息
				heroInfo.setJob(info.getJob());
				heroInfo.setStrength(info.getStrength());
				heroInfo.setModel(info.getModel());
				heroInfo.setSkill(info.getSkill());
				heroInfo.setFinalFightAttr(info.getFinalFightAttr());
				heroInfo.setFigthMonsterSpirit(info.getFigthMonsterSpirit());
				heroInfo.setLittleLeader(info.getLittleLeader());
				heroInfo.setName(info.getName());
				heroInfo.setIconid(info.getIconid());
				heroInfo.setHerdid(info.getHerdid());
				heroInfo.setMaxTiLi(info.getMaxTiLi());
				heroInfo.setGodSkillLevel(info.getGodSkillLevel());
				heroInfo.setBaowu(info.getBaowu());
				heroInfo.setTianshu(info.getTianshu());

				long time = heroInfo.getTodayScoreTime();
				if (!TimeDateUtil.isSameDay(time * 1000, TimeDateUtil.getCurrentTimeInMillis())) {
					heroInfo.setTodayScoreTime(TimeDateUtil.getCurrentTime());
					heroInfo.setTodayScore(0);
				}

				CrossZhuLuFunction.getIns().updateTiLi(heroInfo);
				crossData.putObject(CrossZhuLuEnum.CrossZhuLuHeroInfo, heroInfo);
			} else {
				// 创建新玩家信息
				info.setPartId(partId);
				info.setTiLi(info.getMaxTiLi());
				info.setScore(0);
				info.setTodayScore(0);
				info.setTodayScoreTime(TimeDateUtil.getCurrentTime());
				info.setUpdateScoreTime(0);
				info.setUpdateTiLiTime(0);
				info.setState(0);
				info.setCityId(400 + info.getCountryId());
				heroMap.put(hid, info);
				CrossZhuLuHeroInfoDao.getIns().insertHeroInfo(info);

				crossData.putObject(CrossZhuLuEnum.CrossZhuLuHeroInfo, info);
			}

			List<CrossZhuLuCountryInfo> crossZhuLuCountryInfoList = CrossZhuLuCache.countryInfoRankMap.get(partId);
			if (crossZhuLuCountryInfoList == null) {
				crossZhuLuCountryInfoList = new ArrayList<>();
				CrossZhuLuCache.countryInfoRankMap.put(partId, crossZhuLuCountryInfoList);
			}
			crossData.putObject(CrossZhuLuEnum.CrossZhuLuCountryInfos, crossZhuLuCountryInfoList);

			CrossZhuLuRoomInfo roomInfo = CrossZhuLuCache.roomInfoMap.get(partId);
			List<CrossZhuLuCityInfo> crossZhuLuCityInfoList = new ArrayList<>();
			crossZhuLuCityInfoList.addAll(roomInfo.getCityInfoMap().values());
			crossData.putObject(CrossZhuLuEnum.CrossZhuLuCityInfos, crossZhuLuCityInfoList);

			NettyWrite.writeBlockCallback(channel, crossData, crossData.getCallbackCmd());
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public void CRLmove(Channel channel, CrossData crossData) {
		try {
			int cmd = CrossConst.CROSS_ZHU_LU_MOVE_LC;

			long hid = crossData.getObject(CrossZhuLuEnum.Hid, Long.class);
			int cityId = crossData.getObject(CrossZhuLuEnum.CityId, Integer.class);
			int partId = CrossCache.getPartId(channel);
			crossData.finishGet();
			Map<Long, CrossZhuLuHeroInfo> heroMap = CrossZhuLuCache.heroInfoMap.get(partId);

			crossData.putObject(CrossZhuLuEnum.Type, 0);
			CrossZhuLuHeroInfo heroInfo = heroMap.get(hid);
			int cost = Config_xtcs_004.getIns().get(QunXiongZhuLuConst.CONFIG_ID_7206).getNum();
			// 检查是否足够体力
			if (heroInfo.getTiLi() < cost) {
				// 体力不足
				crossData.putObject(CrossZhuLuEnum.State, 1);
				NettyWrite.writeBlockCallback(channel, crossData, crossData.getCallbackCmd());
				return;
			}

			CrossZhuLuRoomInfo roomInfo = CrossZhuLuCache.roomInfoMap.get(partId);

			CrossZhuLuFunction.getIns().updateTiLi(heroInfo, -cost, true);

			int i = -1;
			for (int index : roomInfo.getCityInfoMap().get(heroInfo.getCityId()).getHeroIdMap().keySet()) {
				if (roomInfo.getCityInfoMap().get(heroInfo.getCityId()).getHeroIdMap().get(index).getHid() == hid) {
					i = index;
					break;
				}
			}
			if (i != -1) {
				int now = TimeDateUtil.getCurrentTime();
				if (roomInfo.getCityInfoMap().get(heroInfo.getCityId()).getHeroIdMap().get(i).getDefendTime() != 0) {
					if (now - roomInfo.getCityInfoMap().get(heroInfo.getCityId()).getHeroIdMap().get(i)
							.getDefendTime() >= 1 * 60) {
						roomInfo.getCityInfoMap().get(heroInfo.getCityId()).getHeroIdMap().get(i).setDefendTime(0);
					} else {
						// 通知攻击方停止攻击
						long attckId = roomInfo.getCityInfoMap().get(heroInfo.getCityId()).getHeroIdMap().get(i)
								.getAttackHid();
						CrossZhuLuFunction.getIns().noticeMove(attckId);
					}
				}
				roomInfo.getCityInfoMap().get(heroInfo.getCityId()).getHeroIdMap().remove(i);
				crossData.putObject(CrossZhuLuEnum.Type, 1);

				if (roomInfo.getCityInfoMap().get(heroInfo.getCityId()).getHeroIdMap().isEmpty()) {
					if (!(roomInfo.getCityInfoMap().get(heroInfo.getCityId()).getCityId() >= 401
							&& roomInfo.getCityInfoMap().get(heroInfo.getCityId()).getCityId() <= 403)) {
						roomInfo.getCityInfoMap().get(heroInfo.getCityId()).setCountryId(0);
					}
				}
			}
			heroInfo.setCityId(cityId);
			heroInfo.setState(0);
			crossData.putObject(CrossZhuLuEnum.State, 0);
			crossData.putObject(CrossZhuLuEnum.CrossZhuLuHeroInfo, heroInfo);
			NettyWrite.writeBlockCallback(channel, crossData, crossData.getCallbackCmd());
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public void CRLshowCityInfo(Channel channel, CrossData crossData) {
		try {
			int cmd = CrossConst.CROSS_ZHU_LU_SHOW_CITY_INFO_LC;

			int cityId = crossData.getObject(CrossZhuLuEnum.CityId, Integer.class);
			int page = crossData.getObject(CrossZhuLuEnum.Page, Integer.class);
			int partId = CrossCache.getPartId(channel);
			crossData.finishGet();

			CrossZhuLuRoomInfo roomInfo = CrossZhuLuCache.roomInfoMap.get(partId);
			CrossZhuLuCityInfo cityInfo = roomInfo.getCityInfoMap().get(cityId);
			if (cityInfo == null) {
				crossData.putObject(CrossZhuLuEnum.State, 1);
				NettyWrite.writeBlockCallback(channel, crossData, crossData.getCallbackCmd());
				return;
			}
			int maxPage = 1;
			if (cityId >= 401 && cityId <= 403) {
				// 都城999个位置
				maxPage = 111;
			} else {
				// 其他城池只有1页
				page = 1;
			}
			if (page > maxPage) {
				page = 1;
			}

			crossData.putObject(CrossZhuLuEnum.Page, page);
			crossData.putObject(CrossZhuLuEnum.MaxPage, maxPage);
			crossData.putObject(CrossZhuLuEnum.CountryId, cityInfo.getCountryId());
			Map<Integer, CrossZhuLuHeroInfo> map = new HashMap<>();
			int index = (page - 1) * 9;
			for (int i = index; i < index + 9; i++) {
				if (cityInfo.getHeroIdMap().get(i) == null) {
					continue;
				}
				Long heroId = cityInfo.getHeroIdMap().get(i).getHid();
				if (heroId < 0) {
					// NPC
					CrossZhuLuHeroInfo info = new CrossZhuLuHeroInfo();
					info.setHid(heroId);
					map.put(i, info);
				} else {
					CrossZhuLuHeroInfo info = CrossZhuLuCache.heroInfoMap.get(partId).get(heroId);
					map.put(i, info);
				}
			}

			crossData.putObject(CrossZhuLuEnum.CrossZhuLuHeroInfos, map);
			crossData.putObject(CrossZhuLuEnum.State, 0);
			NettyWrite.writeBlockCallback(channel, crossData, crossData.getCallbackCmd());
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public void CRLattack(Channel channel, CrossData crossData) {
		try {
			int cmd = CrossConst.CROSS_ZHU_LU_ATTACK_LC;

			long hid = crossData.getObject(CrossZhuLuEnum.Hid, Long.class);
			int index = crossData.getObject(CrossZhuLuEnum.Index, Integer.class);
			Boolean isBuff = crossData.getObject(CrossZhuLuEnum.isBuff, Boolean.class);
			int partId = CrossCache.getPartId(channel);
			crossData.finishGet();

			CrossZhuLuRoomInfo roomInfo = CrossZhuLuCache.roomInfoMap.get(partId);

			Map<Long, CrossZhuLuHeroInfo> heroMap = CrossZhuLuCache.heroInfoMap.get(partId);
			CrossZhuLuHeroInfo heroInfo = heroMap.get(hid);

			CrossZhuLuCityInfo cityInfo = roomInfo.getCityInfoMap().get(heroInfo.getCityId());

			if (heroInfo.getState() != 0) {
				// 驻守中
				crossData.putObject(CrossZhuLuEnum.State, 1);
				NettyWrite.writeBlockCallback(channel, crossData, crossData.getCallbackCmd());
				return;
			}

			if (heroInfo.getTiLi() <= 0) {
				// 体力不足
				crossData.putObject(CrossZhuLuEnum.State, 2);
				NettyWrite.writeBlockCallback(channel, crossData, crossData.getCallbackCmd());
				return;
			}

			// 体力≥10 才可挑战
			int needTiLi = Config_xtcs_004.getIns().get(QunXiongZhuLuConst.CONFIG_ID_7218).getNum();
			if (heroInfo.getTiLi() < needTiLi) {
				// 体力不足
				crossData.putObject(CrossZhuLuEnum.State, 10);
				NettyWrite.writeBlockCallback(channel, crossData, crossData.getCallbackCmd());
				return;
			}

			if (cityInfo.getCityId() >= 401 && cityInfo.getCityId() <= 403) {
				if (cityInfo.getCountryId() != heroInfo.getCountryId()) {
					// 都城不能进攻
					crossData.putObject(CrossZhuLuEnum.State, 5);
					NettyWrite.writeBlockCallback(channel, crossData, crossData.getCallbackCmd());
					return;
				}
			}
			Struct_qxzl_273 config = Config_qxzl_273.getIns().get(cityInfo.getCityId());
			if (!isBuff && cityInfo.getCountryId() != heroInfo.getCountryId()) {
				int[][] behind = config.getBehind();
				// 位置限制占领
				boolean canZhanLing = false;
				for (int cId : behind[0]) {
					CrossZhuLuCityInfo cInfo = roomInfo.getCityInfoMap().get(cId);
					if (cInfo.getCountryId() == heroInfo.getCountryId()) {
						canZhanLing = true;
						break;
					}
				}
				if (!canZhanLing) {
					crossData.putObject(CrossZhuLuEnum.State, 8);
					NettyWrite.writeBlockCallback(channel, crossData, crossData.getCallbackCmd());
					return;
				}
			}

			if (cityInfo.getHeroIdMap().get(index) == null) {
				// 当前位置是空闲
				if (!cityInfo.getHeroIdMap().isEmpty()) {
					if (cityInfo.getCountryId() != heroInfo.getCountryId()) {
						// 城池不是本方即不能驻守
						crossData.putObject(CrossZhuLuEnum.State, 3);
						NettyWrite.writeBlockCallback(channel, crossData, crossData.getCallbackCmd());
						return;
					}
				}

				// 体力限制占领

				if (heroInfo.getTiLi() < config.getTl()) {
					crossData.putObject(CrossZhuLuEnum.State, 6);
					NettyWrite.writeBlockCallback(channel, crossData, crossData.getCallbackCmd());
					return;
				}
				boolean isBroad = false;
				if (!isBuff && cityInfo.getCountryId() != heroInfo.getCountryId()) {
					int[][] behind = config.getBehind();
					// 位置限制占领
					boolean canZhanLing = false;
					for (int cId : behind[0]) {
						CrossZhuLuCityInfo cInfo = roomInfo.getCityInfoMap().get(cId);
						if (cInfo.getCountryId() == heroInfo.getCountryId()) {
							canZhanLing = true;
							break;
						}
					}
					if (!canZhanLing) {
						crossData.putObject(CrossZhuLuEnum.State, 7);
						NettyWrite.writeBlockCallback(channel, crossData, crossData.getCallbackCmd());
						return;
					}
					isBroad = true;
				}

				CrossZhuLuDefendInfo defendInfo = new CrossZhuLuDefendInfo();
				defendInfo.setDefendTime(0);
				defendInfo.setHid(hid);
				cityInfo.getHeroIdMap().put(index, defendInfo);
				heroInfo.setState(1);
				cityInfo.setCountryId(heroInfo.getCountryId());

				if (isBroad && !(cityInfo.getCityId() >= 401 && cityInfo.getCityId() <= 403)) {
					// 发送广播
					CrossZhuLuFunction.getIns().sendBroad(heroInfo.getCountryId(), heroInfo.getName(),
							cityInfo.getCityId(), partId);
					CrossZhuLuRecord record = new CrossZhuLuRecord();
					record.setCountryId(heroInfo.getCountryId());
					record.setName(heroInfo.getName());
					record.setType(3);
					record.setParam(cityInfo.getCityId());
					List<CrossZhuLuRecord> list = CrossZhuLuCache.countryRecordMap.get(partId);
					if (list == null) {
						list = new ArrayList<>();
						CrossZhuLuCache.countryRecordMap.put(partId, list);
					}
					if (list.size() >= 30) {
						list.remove(list.size() - 1);
					}
					list.add(0, record);
				}

				crossData.putObject(CrossZhuLuEnum.Type, 2);
				crossData.putObject(CrossZhuLuEnum.State, 0);
				NettyWrite.writeBlockCallback(channel, crossData, crossData.getCallbackCmd());
				return;

			} else {
				CrossZhuLuDefendInfo defendInfo = cityInfo.getHeroIdMap().get(index);
				int now = TimeDateUtil.getCurrentTime();
				if (defendInfo.getDefendTime() != 0) {
					// 正在被挑战
					if (now - defendInfo.getDefendTime() >= 1 * 60) {
						defendInfo.setDefendTime(0);
					} else {
						crossData.putObject(CrossZhuLuEnum.State, 4);
						NettyWrite.writeBlockCallback(channel, crossData, crossData.getCallbackCmd());
						return;
					}
				}
				Long heroId = defendInfo.getHid();
				if (heroId < 0) {
					// NPC
					CrossZhuLuHeroInfo info = new CrossZhuLuHeroInfo();
					info.setHid(heroId);
					info.setCityId(cityInfo.getCityId());
					crossData.putObject(CrossZhuLuEnum.CrossZhuLuHeroInfo, info);
					crossData.putObject(CrossZhuLuEnum.Type, 1);
				} else {
					CrossZhuLuHeroInfo info = CrossZhuLuCache.heroInfoMap.get(partId).get(heroId);
					if (info.getCountryId() == heroInfo.getCountryId()) {
						// 同国家的不能打
						crossData.putObject(CrossZhuLuEnum.State, 9);
						NettyWrite.writeBlockCallback(channel, crossData, crossData.getCallbackCmd());
						return;
					}
					crossData.putObject(CrossZhuLuEnum.CrossZhuLuHeroInfo, info);
					crossData.putObject(CrossZhuLuEnum.Type, 0);
				}
				defendInfo.setDefendTime(TimeDateUtil.getCurrentTime());
				defendInfo.setAttackHid(hid);
			}
			crossData.putObject(CrossZhuLuEnum.State, 0);
			NettyWrite.writeBlockCallback(channel, crossData, crossData.getCallbackCmd());
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public void CRLopenRankUI(Channel channel, CrossData crossData) {
		try {
			int cmd = CrossConst.CROSS_ZHU_LU_OPEN_RANK_UI_LC;

			int partId = CrossCache.getPartId(channel);
			crossData.finishGet();

			CrossZhuLuRoomInfo roomInfo = CrossZhuLuCache.roomInfoMap.get(partId);

			// CrossZhuLuFunction.getIns().refreshRank(roomInfo);

			List<CrossZhuLuCountryInfo> crossZhuLuCountryInfoList = CrossZhuLuCache.countryInfoRankMap.get(partId);
			if (crossZhuLuCountryInfoList == null) {
				crossZhuLuCountryInfoList = new ArrayList<>();
				CrossZhuLuCache.countryInfoRankMap.put(partId, crossZhuLuCountryInfoList);
			}
			crossData.putObject(CrossZhuLuEnum.CrossZhuLuCountryInfos, crossZhuLuCountryInfoList);

			List<CrossZhuLuCityInfo> crossZhuLuCityInfoList = new ArrayList<>();
			crossZhuLuCityInfoList.addAll(roomInfo.getCityInfoMap().values());
			crossData.putObject(CrossZhuLuEnum.CrossZhuLuCityInfos, crossZhuLuCityInfoList);

			long mvpHeroId = roomInfo.getMvpHeroId();

			crossData.putObject(CrossZhuLuEnum.Name, "");
			crossData.putObject(CrossZhuLuEnum.Herdid, 0);
			crossData.putObject(CrossZhuLuEnum.Iconid, 0);
			crossData.putObject(CrossZhuLuEnum.Score, 0);

			if (mvpHeroId != 0) {
				CrossZhuLuHeroInfo heroInfo = CrossZhuLuCache.heroInfoMap.get(partId).get(mvpHeroId);
				crossData.putObject(CrossZhuLuEnum.Name, heroInfo.getName());
				crossData.putObject(CrossZhuLuEnum.Herdid, heroInfo.getHerdid());
				crossData.putObject(CrossZhuLuEnum.Iconid, heroInfo.getIconid());
				crossData.putObject(CrossZhuLuEnum.Score, heroInfo.getScore());
			}
			NettyWrite.writeBlockCallback(channel, crossData, crossData.getCallbackCmd());
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public void CRLopenRecord(Channel channel, CrossData crossData) {
		try {
			int cmd = CrossConst.CROSS_ZHU_LU_OPEN_RECORD_LC;

			long hid = crossData.getObject(CrossZhuLuEnum.Hid, Long.class);
			int partId = CrossCache.getPartId(channel);
			crossData.finishGet();

			List<CrossZhuLuRecord> countryList = CrossZhuLuCache.countryRecordMap.get(partId);
			List<CrossZhuLuRecord> sendCountryList = new ArrayList<>();
			if (countryList != null && !countryList.isEmpty()) {
				sendCountryList.addAll(countryList);
			}

			List<CrossZhuLuRecord> sendHeroList = new ArrayList<>();
			if (CrossZhuLuCache.heroRecordMap.get(partId) != null) {
				List<CrossZhuLuRecord> heroList = CrossZhuLuCache.heroRecordMap.get(partId).get(hid);
				if (heroList != null) {
					if (heroList != null && !heroList.isEmpty()) {
						sendHeroList.addAll(heroList);
					}
				}
			}
			crossData.putObject(CrossZhuLuEnum.CrossZhuLuRecords, sendCountryList);
			crossData.putObject(CrossZhuLuEnum.CrossZhuLuRecords2, sendHeroList);

			CrossZhuLuCache.redPointHeroRecord.remove(hid);

			NettyWrite.writeBlockCallback(channel, crossData, crossData.getCallbackCmd());
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public void CRLopenCountryRankUI(Channel channel, CrossData crossData) {
		try {
			int cmd = CrossConst.CROSS_ZHU_LU_OPEN_COUNTRY_RANK_UI_LC;

			long hid = crossData.getObject(CrossZhuLuEnum.Hid, Long.class);
			int countryId = crossData.getObject(CrossZhuLuEnum.CountryId, Integer.class);
			int partId = CrossCache.getPartId(channel);
			crossData.finishGet();

			Map<Long, CrossZhuLuHeroInfo> heroMap = CrossZhuLuCache.heroInfoMap.get(partId);
			CrossZhuLuHeroInfo heroInfo = heroMap.get(hid);

			Map<Integer, List<CrossZhuLuHeroInfo>> map = CrossZhuLuCache.heroInfoRankMap.get(partId);
			List<CrossZhuLuHeroInfo> sendList = new ArrayList<>();
			crossData.putObject(CrossZhuLuEnum.Rank, 0);
			crossData.putObject(CrossZhuLuEnum.Score, heroInfo.getScore());
			if (map != null) {
				List<CrossZhuLuHeroInfo> list = map.get(countryId);

				if (list != null) {
					int i = 1;
					for (CrossZhuLuHeroInfo info : list) {
						sendList.add(info);
						if (i >= 10) {
							break;
						}
						i++;
					}
				}

				list = map.get(heroInfo.getCountryId());
				if (list != null) {
					int i = 1;
					for (CrossZhuLuHeroInfo info : list) {
						if (info.getHid() == heroInfo.getHid()) {
							crossData.putObject(CrossZhuLuEnum.Rank, list.indexOf(info) + 1);
							break;
						}
						if (i >= 10) {
							break;
						}
						i++;
					}
				}
			}
			crossData.putObject(CrossZhuLuEnum.CrossZhuLuHeroInfos, sendList);

			NettyWrite.writeBlockCallback(channel, crossData, crossData.getCallbackCmd());
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public void CRLbuySta(Channel channel, CrossData crossData) {
		try {
			int cmd = CrossConst.CROSS_ZHU_LU_BUY_STA_LC;
			long hid = crossData.getObject(CrossZhuLuEnum.Hid, Long.class);
			int state = crossData.getObject(CrossZhuLuEnum.State, Integer.class);
			int partId = CrossCache.getPartId(channel);
			crossData.finishGet();

			Map<Long, CrossZhuLuHeroInfo> heroMap = CrossZhuLuCache.heroInfoMap.get(partId);
			CrossZhuLuHeroInfo heroInfo = heroMap.get(hid);
			int add = state;
			CrossZhuLuFunction.getIns().updateTiLi(heroInfo, add, true);

			crossData.putObject(CrossZhuLuEnum.CrossZhuLuHeroInfo, heroInfo);
			NettyWrite.writeBlockCallback(channel, crossData, crossData.getCallbackCmd());
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public void CRLgetDefendAwardInfo(Channel channel, CrossData crossData) {
		try {
			int cmd = CrossConst.CROSS_ZHU_LU_GET_DEFEND_AWARD_INFO_LC;

			long hid = crossData.getObject(CrossZhuLuEnum.Hid, Long.class);
			int partId = CrossCache.getPartId(channel);
			crossData.finishGet();

			Map<Long, CrossZhuLuHeroInfo> heroMap = CrossZhuLuCache.heroInfoMap.get(partId);
			CrossZhuLuHeroInfo heroInfo = heroMap.get(hid);
			List<CrossZhuLuDefendAward> list = new ArrayList<>();
			if (heroInfo.getRewards() != null && !heroInfo.getRewards().isEmpty()) {
				list.addAll(heroInfo.getRewards());
			}

			crossData.putObject(CrossZhuLuEnum.CrossZhuLuDefendAwards, list);
			NettyWrite.writeBlockCallback(channel, crossData, crossData.getCallbackCmd());
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public void CRLgotDefendAward(Channel channel, CrossData crossData) {
		try {
			int cmd = CrossConst.CROSS_ZHU_LU_GOT_DEFEND_AWARD_LC;

			long hid = crossData.getObject(CrossZhuLuEnum.Hid, Long.class);
			int partId = CrossCache.getPartId(channel);
			crossData.finishGet();

			Map<Long, CrossZhuLuHeroInfo> heroMap = CrossZhuLuCache.heroInfoMap.get(partId);
			CrossZhuLuHeroInfo heroInfo = heroMap.get(hid);
			List<CrossZhuLuDefendAward> list = new ArrayList<>();
			if (heroInfo.getRewards() != null && !heroInfo.getRewards().isEmpty()) {
				list.addAll(heroInfo.getRewards());
			}

			crossData.putObject(CrossZhuLuEnum.CrossZhuLuDefendAwards, list);

			heroInfo.getRewards().clear();
			NettyWrite.writeBlockCallback(channel, crossData, crossData.getCallbackCmd());
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public void CRLbattleResult(Channel channel, CrossData crossData) {
		try {
			int cmd = CrossConst.CROSS_ZHU_LU_BATTLE_RESULT_LC;
			long hid = crossData.getObject(CrossZhuLuEnum.Hid, Long.class);
			int state = crossData.getObject(CrossZhuLuEnum.State, Integer.class);
			int index = crossData.getObject(CrossZhuLuEnum.Index, Integer.class);
			int partId = CrossCache.getPartId(channel);
			crossData.finishGet();

			Map<Long, CrossZhuLuHeroInfo> heroMap = CrossZhuLuCache.heroInfoMap.get(partId);
			CrossZhuLuHeroInfo heroInfo = heroMap.get(hid);

			CrossZhuLuRoomInfo roomInfo = CrossZhuLuCache.roomInfoMap.get(partId);
			CrossZhuLuCityInfo cityInfo = roomInfo.getCityInfoMap().get(heroInfo.getCityId());

			CrossZhuLuDefendInfo defendInfo = cityInfo.getHeroIdMap().get(index);
			CrossZhuLuHeroInfo defendHeroInfo = heroMap.get(defendInfo.getHid());
			boolean isNpc = false;
			if (defendInfo.getHid() < 0) {
				// npc
				isNpc = true;
			}
			if (defendHeroInfo != null && defendHeroInfo.getCountryId() != heroInfo.getCountryId()) {
				int isWin = BattleFunction.checkWinByFight(heroInfo.getStrength(), defendHeroInfo.getStrength(), 0);
				if (isWin == 0) {
					state = 2;
				}
			}

			int winCost = Config_xtcs_004.getIns().get(QunXiongZhuLuConst.CONFIG_ID_7203).getNum();
			int loserCost = Config_xtcs_004.getIns().get(QunXiongZhuLuConst.CONFIG_ID_7204).getNum();

			int winScore = Config_xtcs_004.getIns().get(QunXiongZhuLuConst.CONFIG_ID_7216).getNum();
			int loserScore = Config_xtcs_004.getIns().get(QunXiongZhuLuConst.CONFIG_ID_7217).getNum();

			defendInfo.setDefendTime(0);

			crossData.putObject(CrossZhuLuEnum.IsDefend, 0);
			if (state == 1) {
				// 挑战方胜利

				// 扣除体力
				CrossZhuLuFunction.getIns().updateTiLi(heroInfo, -winCost, true);
				CrossZhuLuFunction.getIns().updateScore(heroInfo, winScore);

				if (isNpc) {
					// TODO 判断相连城池是否自己国家
					// 第一个占领城池
					cityInfo.getHeroIdMap().clear();
					Struct_qxzl_273 config = Config_qxzl_273.getIns().get(cityInfo.getCityId());
					if (heroInfo.getTiLi() > 0 && heroInfo.getTiLi() >= config.getTl()) {
						int[][] behind = config.getBehind();
						// 位置限制占领
						boolean canZhanLing = false;
						for (int cId : behind[0]) {
							CrossZhuLuCityInfo cInfo = roomInfo.getCityInfoMap().get(cId);
							if (cInfo.getCountryId() == heroInfo.getCountryId()) {
								canZhanLing = true;
								break;
							}
						}
						if (canZhanLing) {
							defendInfo = new CrossZhuLuDefendInfo();
							defendInfo.setDefendTime(0);
							defendInfo.setHid(hid);
							cityInfo.getHeroIdMap().put(index, defendInfo);
							heroInfo.setState(1);
							crossData.putObject(CrossZhuLuEnum.IsDefend, 1);
							cityInfo.setCountryId(heroInfo.getCountryId());

							if (!(cityInfo.getCityId() >= 401 && cityInfo.getCityId() <= 403)) {
								// 发送广播
								CrossZhuLuFunction.getIns().sendBroad(heroInfo.getCountryId(), heroInfo.getName(),
										cityInfo.getCityId(), partId);

								CrossZhuLuRecord record = new CrossZhuLuRecord();
								record.setCountryId(heroInfo.getCountryId());
								record.setName(heroInfo.getName());
								record.setType(3);
								record.setParam(cityInfo.getCityId());
								List<CrossZhuLuRecord> list = CrossZhuLuCache.countryRecordMap.get(partId);
								if (list == null) {
									list = new ArrayList<>();
									CrossZhuLuCache.countryRecordMap.put(partId, list);
								}
								if (list.size() >= 30) {
									list.remove(list.size() - 1);
								}
								list.add(0, record);
							}
						}
					}
				} else {
					if (defendHeroInfo.getCountryId() != heroInfo.getCountryId()) {
						CrossZhuLuFunction.getIns().updateTiLi(defendHeroInfo, -loserCost, true);
						// 胜利积分
						CrossZhuLuFunction.getIns().updateScore(defendHeroInfo, loserScore);
						// 发放失败奖励
						int[][] add = Config_xtcs_004.getIns().get(QunXiongZhuLuConst.CONFIG_ID_7215).getOther();
						int mailId = MailConst.QUN_XIONG_TASK_MAIL_173;
						MailFunction.getIns().sendMailWithFujianData2(defendHeroInfo.getHid(), mailId,
								new Object[] { mailId }, add);

						// 判断是否被打出城池
						if (defendHeroInfo.getTiLi() <= 0) {
							cityInfo.getHeroIdMap().remove(index);
							defendHeroInfo.setState(0);
							defendHeroInfo.setCityId(defendHeroInfo.getCountryId() + 400);
							// 判断是否可进驻城池
							Struct_qxzl_273 config = Config_qxzl_273.getIns().get(cityInfo.getCityId());
							if (heroInfo.getTiLi() > 0 && heroInfo.getTiLi() >= config.getTl()) {
								int[][] behind = config.getBehind();
								// 位置限制占领
								boolean canZhanLing = false;
								for (int cId : behind[0]) {
									CrossZhuLuCityInfo cInfo = roomInfo.getCityInfoMap().get(cId);
									if (cInfo.getCountryId() == heroInfo.getCountryId()) {
										canZhanLing = true;
										break;
									}
								}

								if (canZhanLing && cityInfo.getHeroIdMap().isEmpty()) {
									defendInfo = new CrossZhuLuDefendInfo();
									defendInfo.setDefendTime(0);
									defendInfo.setHid(hid);
									cityInfo.getHeroIdMap().put(index, defendInfo);
									heroInfo.setState(1);
									crossData.putObject(CrossZhuLuEnum.IsDefend, 1);
									cityInfo.setCountryId(heroInfo.getCountryId());

									if (!(cityInfo.getCityId() >= 401 && cityInfo.getCityId() <= 403)) {
										// 发送广播
										CrossZhuLuFunction.getIns().sendBroad(heroInfo.getCountryId(),
												heroInfo.getName(), cityInfo.getCityId(), partId);

										CrossZhuLuRecord record = new CrossZhuLuRecord();
										record.setCountryId(heroInfo.getCountryId());
										record.setName(heroInfo.getName());
										record.setType(3);
										record.setParam(cityInfo.getCityId());
										List<CrossZhuLuRecord> list = CrossZhuLuCache.countryRecordMap.get(partId);
										if (list == null) {
											list = new ArrayList<>();
											CrossZhuLuCache.countryRecordMap.put(partId, list);
										}
										if (list.size() >= 30) {
											list.remove(list.size() - 1);
										}
										list.add(0, record);
									}
								}
							}
						}

						CrossZhuLuCache.redPointHeroRecord.add(defendHeroInfo.getHid());
						CrossZhuLuRecord record = new CrossZhuLuRecord();
						record.setCountryId(heroInfo.getCountryId());
						record.setName(heroInfo.getName());
						record.setType(1);
						record.setParam(cityInfo.getCityId());
						record.setCountryId2(defendHeroInfo.getCountryId());
						record.setName2(defendHeroInfo.getName());
						List<CrossZhuLuRecord> list = CrossZhuLuCache.countryRecordMap.get(partId);
						if (list == null) {
							list = new ArrayList<>();
							CrossZhuLuCache.countryRecordMap.put(partId, list);
						}
						if (list.size() >= 30) {
							list.remove(list.size() - 1);
						}
						list.add(0, record);

						Map<Long, List<CrossZhuLuRecord>> map = CrossZhuLuCache.heroRecordMap.get(partId);
						if (map == null) {
							map = new ConcurrentHashMap<Long, List<CrossZhuLuRecord>>();
							CrossZhuLuCache.heroRecordMap.put(partId, map);
						}
						list = map.get(defendHeroInfo.getHid());
						if (list == null) {
							list = new ArrayList<>();
							map.put(defendHeroInfo.getHid(), list);
						}
						if (list.size() >= 30) {
							list.remove(list.size() - 1);
						}
						list.add(0, record);

					}
				}
			} else {
				// 挑战方失败

				// 扣除体力
				CrossZhuLuFunction.getIns().updateTiLi(heroInfo, -loserCost, true);
				// 失败积分
				CrossZhuLuFunction.getIns().updateScore(heroInfo, loserScore);

				if (isNpc) {
				} else {
					if (defendHeroInfo.getCountryId() != heroInfo.getCountryId()) {
						CrossZhuLuFunction.getIns().updateTiLi(defendHeroInfo, -winCost, true);
						// 胜利积分
						CrossZhuLuFunction.getIns().updateScore(defendHeroInfo, winScore);
						// 发放胜利奖励
						int[][] add = Config_xtcs_004.getIns().get(QunXiongZhuLuConst.CONFIG_ID_7202).getOther();
						int mailId = MailConst.QUN_XIONG_TASK_MAIL_172;
						MailFunction.getIns().sendMailWithFujianData2(defendHeroInfo.getHid(), mailId,
								new Object[] { mailId }, add);

						// 判断是否被打出城池
						if (defendHeroInfo.getTiLi() <= 0) {
							cityInfo.getHeroIdMap().remove(index);
							defendHeroInfo.setState(0);
							defendHeroInfo.setCityId(defendHeroInfo.getCountryId() + 400);
						}
						if (cityInfo.getHeroIdMap().isEmpty()) {
							cityInfo.setCountryId(0);
						}

						CrossZhuLuCache.redPointHeroRecord.add(defendHeroInfo.getHid());
						CrossZhuLuRecord record = new CrossZhuLuRecord();
						record.setCountryId(heroInfo.getCountryId());
						record.setName(heroInfo.getName());
						record.setType(2);
						record.setParam(cityInfo.getCityId());
						record.setCountryId2(defendHeroInfo.getCountryId());
						record.setName2(defendHeroInfo.getName());
						List<CrossZhuLuRecord> list = CrossZhuLuCache.countryRecordMap.get(partId);
						if (list == null) {
							list = new ArrayList<>();
							CrossZhuLuCache.countryRecordMap.put(partId, list);
						}
						if (list.size() >= 30) {
							list.remove(list.size() - 1);
						}
						list.add(0, record);

						Map<Long, List<CrossZhuLuRecord>> map = CrossZhuLuCache.heroRecordMap.get(partId);
						if (map == null) {
							map = new ConcurrentHashMap<Long, List<CrossZhuLuRecord>>();
							CrossZhuLuCache.heroRecordMap.put(partId, map);
						}
						list = map.get(defendHeroInfo.getHid());
						if (list == null) {
							list = new ArrayList<>();
							map.put(defendHeroInfo.getHid(), list);
						}
						if (list.size() >= 30) {
							list.remove(list.size() - 1);
						}
						list.add(0, record);

					}
				}
			}

			crossData.putObject(CrossZhuLuEnum.State, state);
			crossData.putObject(CrossZhuLuEnum.CrossZhuLuHeroInfo, heroInfo);
			NettyWrite.writeBlockCallback(channel, crossData, crossData.getCallbackCmd());
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public void CRLhongDian(Channel channel, CrossData crossData) {
		int cmd = CrossConst.CROSS_ZHU_LU_HONG_DIAN_LC;

		long hid = crossData.getObject(CrossZhuLuEnum.Hid, Long.class);
		int partId = CrossCache.getPartId(channel);
		Map<Long, CrossZhuLuHeroInfo> heroMap = CrossZhuLuCache.heroInfoMap.get(partId);
		if (heroMap == null) {
			heroMap = new ConcurrentHashMap<>();
			CrossZhuLuCache.heroInfoMap.put(partId, heroMap);
		}
		String state = "";
		if (heroMap.containsKey(hid)) {
			// 返回信息
			CrossZhuLuHeroInfo heroInfo = heroMap.get(hid);
			if (heroInfo.getRewards() != null && !heroInfo.getRewards().isEmpty()) {
				state += "_2&1";
			} else {
				state += "_2&0";
			}
			if (heroInfo.getTiLi() <= 0) {
				state += "_3&1";
			} else {
				state += "_3&0";
			}
			// 个人战况
			if (CrossZhuLuCache.redPointHeroRecord.contains(hid)) {
				state += "_4&1";
			} else {
				state += "_4&0";
			}
			state = state.substring(1);
		} else {
			state = "2&0_3&0_4&0";
		}
		crossData.putObject(CrossZhuLuEnum.State, state);
		NettyWrite.writeBlockCallback(channel, crossData, crossData.getCallbackCmd());
	}

	public void CRLbroadCast(Channel channel, CrossData crossData) {
		int cmd = CrossConst.CROSS_ZHU_LU_BROAD_CAST_CL;
		int countryId = crossData.getObject(CrossZhuLuEnum.CountryId, Integer.class);
		String name = crossData.getObject(CrossZhuLuEnum.Name, String.class);
		int cityId = crossData.getObject(CrossZhuLuEnum.CityId, Integer.class);
		ChatManager.getIns().broadCast(ChatConst.ZHULUWIN, new Object[] { countryId, name, cityId });
	}

	public void CRLaddTiLi(Channel channel, CrossData crossData) {
		try {
			int cmd = CrossConst.CROSS_ZHU_LU_ADD_TI_LI_LC;
			long hid = crossData.getObject(CrossZhuLuEnum.Hid, Long.class);
			int num = crossData.getObject(CrossZhuLuEnum.State, Integer.class);
			int partId = CrossCache.getPartId(channel);
			crossData.finishGet();

			Map<Long, CrossZhuLuHeroInfo> heroMap = CrossZhuLuCache.heroInfoMap.get(partId);
			if (heroMap == null) {
				heroMap = new ConcurrentHashMap<>();
				CrossZhuLuCache.heroInfoMap.put(partId, heroMap);
			}
			if (heroMap.containsKey(hid)) {
				// 返回信息
				CrossZhuLuHeroInfo heroInfo = heroMap.get(hid);
				CrossZhuLuFunction.getIns().updateTiLi(heroInfo, num, true);
				crossData.putObject(CrossZhuLuEnum.State, heroInfo.getTiLi());
				crossData.putObject(CrossZhuLuEnum.Index, heroInfo.getMaxTiLi());
				crossData.putObject(CrossZhuLuEnum.Type, heroInfo.getUpdateTiLiTime());
				NettyWrite.writeBlockCallback(channel, crossData, crossData.getCallbackCmd());
				return;
			}
			crossData.putObject(CrossZhuLuEnum.State, 0);
			crossData.putObject(CrossZhuLuEnum.Index, 0);
			crossData.putObject(CrossZhuLuEnum.Type, 0);
			NettyWrite.writeBlockCallback(channel, crossData, crossData.getCallbackCmd());
			return;
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public void CRLsendLastMvpName(Channel channel, CrossData crossData) {
		int cmd = CrossConst.CROSS_ZHU_LU_NOTICE_LAST_MVP_NAME_LC;
		String name = crossData.getObject(CrossZhuLuEnum.Name, String.class);
		QunXiongZhuLuCache.lastMvpName = name;
	}

	public void CRLnoticeMove(Channel channel, CrossData crossData) {
		int cmd = CrossConst.CROSS_ZHU_LU_NOTICE_MOVE_LC;
		long hid = crossData.getObject(CrossZhuLuEnum.Hid, Long.class);
		Hero hero = HeroCache.getHero(hid);
		if (hero != null) {
			QunXiongZhuLu local = hero.getQunXiongZhuLu();
			local.setAttackCity(0);
			local.setAttackIndex(0);
			QunXiongZhuLuSender.sendCmd_8974(hero.getId(), 3);
		}
	}

	public void CRLsendMail(Channel channel, CrossData crossData) {
		int cmd = CrossConst.CROSS_ZHU_LU_NOTICE_MAIL_LC;
		Type type = new TypeReference<List<CrossZhuLuMail>>() {
		}.getType();
		List<CrossZhuLuMail> mailList = crossData.getObject(CrossZhuLuEnum.mails, type);
		for (CrossZhuLuMail mail : mailList) {
			Object[] obj = mail.getParams();
			MailFunction.getIns().sendMailWithFujianData2(mail.getHid(), mail.getMailId(), obj, mail.getAward());
		}
	}
}
