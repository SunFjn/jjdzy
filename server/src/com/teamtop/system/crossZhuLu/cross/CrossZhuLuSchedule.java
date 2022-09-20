package com.teamtop.system.crossZhuLu.cross;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.TreeSet;

import com.teamtop.cross.CrossPartCache;
import com.teamtop.system.crossCommonRank.CommonRankFunction;
import com.teamtop.system.crossCommonRank.CommonRankSysCache;
import com.teamtop.system.crossCommonRank.cross.CrossCommonRankCL;
import com.teamtop.system.crossCommonRank.cross.model.CrossCommonRankCache;
import com.teamtop.system.crossCommonRank.model.CommonRankModel;
import com.teamtop.system.crossZhuLu.QunXiongZhuLuConst;
import com.teamtop.system.crossZhuLu.dao.CrossZhuLuHeroInfoDao;
import com.teamtop.system.crossZhuLu.dao.CrossZhuLuRoomInfoDao;
import com.teamtop.system.crossZhuLu.model.CrossZhuLuCityInfo;
import com.teamtop.system.crossZhuLu.model.CrossZhuLuCountryInfo;
import com.teamtop.system.crossZhuLu.model.CrossZhuLuDefendAward;
import com.teamtop.system.crossZhuLu.model.CrossZhuLuDefendInfo;
import com.teamtop.system.crossZhuLu.model.CrossZhuLuHeroInfo;
import com.teamtop.system.crossZhuLu.model.CrossZhuLuRoomInfo;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.mail.MailConst;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.exector.schedule.AbsScheduleExecutor;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_qxzl_273;
import excel.config.Config_qxzlrank_273;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_kuafu_200;
import excel.struct.Struct_qxzl_273;

public class CrossZhuLuSchedule extends AbsScheduleExecutor {

	public CrossZhuLuSchedule(long delay, long interval, boolean useLong) {
		super(delay, interval, useLong);
	}

	@Override
	public void execute(int now) {
		try {
			defendAward();
			saveData();
			sendCityAward();
			sendRankAward();
			resetLuckCity();
			reset();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 保存数据
	 */
	public void saveData() {
		int time = TimeDateUtil.getCurrentTime();
		if (time - CrossZhuLuCache.LastSaveTime > 10 * 60) {
			// 保存数据
			CrossZhuLuCache.LastSaveTime = time;
			try {
				List<CrossZhuLuRoomInfo> allRoomInfo = new ArrayList<>();
				allRoomInfo.addAll(CrossZhuLuCache.roomInfoMap.values());
				CrossZhuLuRoomInfoDao.getIns().updateRoomInfoBatch(allRoomInfo);

				List<CrossZhuLuHeroInfo> allHeroInfo = new ArrayList<>();
				Iterator<Map<Long, CrossZhuLuHeroInfo>> iterator = CrossZhuLuCache.heroInfoMap.values().iterator();
				for (; iterator.hasNext();) {
					Map<Long, CrossZhuLuHeroInfo> map = iterator.next();
					if (map != null) {
						allHeroInfo.addAll(map.values());
					}
				}
				CrossZhuLuHeroInfoDao.getIns().updateHeroInfoBatch(allHeroInfo);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}

	/**
	 * 结算驻守奖励
	 */
	public void defendAward() {
		if (!CrossZhuLuFunction.getIns().isOpen()) {
			return;
		}
		int time = TimeDateUtil.getCurrentTime();
		if (time - CrossZhuLuCache.LastRefreshTime > 10 * 60) {
			// 结算驻守奖励
			CrossZhuLuCache.LastRefreshTime = time;
			try {
				Iterator<CrossZhuLuRoomInfo> iterator = CrossZhuLuCache.roomInfoMap.values().iterator();
				for (; iterator.hasNext();) {
					CrossZhuLuRoomInfo roomInfo = iterator.next();
					for (CrossZhuLuCityInfo cityInfo : roomInfo.getCityInfoMap().values()) {
						Struct_qxzl_273 config = Config_qxzl_273.getIns().get(cityInfo.getCityId());
						int[][] award = config.getLu();
						int addScore = config.getPoint();
						if (cityInfo.getIsLuck() == 1) {
							award = Config_xtcs_004.getIns().get(QunXiongZhuLuConst.CONFIG_ID_7213).getOther();
							addScore = Config_xtcs_004.getIns().get(QunXiongZhuLuConst.CONFIG_ID_7214).getNum();
						}
						List<Integer> removeList = new ArrayList<>();
						for (int index : cityInfo.getHeroIdMap().keySet()) {
							CrossZhuLuDefendInfo defendInfo = cityInfo.getHeroIdMap().get(index);
							Map<Long, CrossZhuLuHeroInfo> map = CrossZhuLuCache.heroInfoMap.get(roomInfo.getPartId());
							if (map == null) {
								continue;
							}
							CrossZhuLuHeroInfo heroInfo = map.get(defendInfo.getHid());
							if (heroInfo != null) {

								CrossZhuLuFunction.getIns().updateTiLi(heroInfo);
								long time2 = heroInfo.getTodayScoreTime();
								if (!TimeDateUtil.isSameDay(time2 * 1000, TimeDateUtil.getCurrentTimeInMillis())) {
									heroInfo.setTodayScoreTime(TimeDateUtil.getCurrentTime());
									heroInfo.setTodayScore(0);
								}
								CrossZhuLuFunction.getIns().updateScore(heroInfo, addScore);

								CrossZhuLuFunction.getIns().updateTiLi(heroInfo, -config.getConmuse(), true);

								if (heroInfo.getRewards() == null || heroInfo.getRewards().isEmpty()) {
									heroInfo.setRewards(new ArrayList<>());
									for (int i = 0; i < award.length; i++) {
										CrossZhuLuDefendAward a = new CrossZhuLuDefendAward();
										a.setAwardType(award[i][0]);
										a.setAwardId(award[i][1]);
										a.setCount(award[i][2]);
										heroInfo.getRewards().add(a);
									}
								} else {
									for (int i = 0; i < award.length; i++) {
										boolean isFind = false;
										for (CrossZhuLuDefendAward a : heroInfo.getRewards()) {
											if (a.getAwardType() == award[i][0] && a.getAwardId() == award[i][1]) {
												a.setCount(a.getCount() + award[0][2]);
												isFind = true;
												break;
											}
										}
										if (!isFind) {
											CrossZhuLuDefendAward a = new CrossZhuLuDefendAward();
											a.setAwardType(award[i][0]);
											a.setAwardId(award[i][1]);
											a.setCount(award[i][2]);
											heroInfo.getRewards().add(a);
										}
									}
								}

								if (heroInfo.getTiLi() <= 0) {
									// 踢出城池
									heroInfo.setCityId(heroInfo.getCountryId() + 400);
									heroInfo.setState(0);
									removeList.add(index);
								}
							}
						}
						for (int index : removeList) {
							cityInfo.getHeroIdMap().remove(index);
						}
						if (cityInfo.getHeroIdMap().isEmpty()) {
							if (!(cityInfo.getCityId() >= 401 && cityInfo.getCityId() <= 403)) {
								cityInfo.setCountryId(0);
							}
						}
					}
					// 刷新排名
					CrossZhuLuFunction.getIns().refreshRank(roomInfo);
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}

	/**
	 * 结算城池奖励
	 */
	public void sendCityAward() {
		int time = TimeDateUtil.getCurrentTime();
		int Time22 = TimeDateUtil.getTimeOfTheClock(22);
		if (time >= Time22 && time >= CrossZhuLuCache.lastCityAwardTime) {
			// 每天22点发放城池奖励
			
			CrossZhuLuCache.lastCityAwardTime = TimeDateUtil.getTimeOfTheClock(22) + 86400;
			
			Map<Integer, List<CrossZhuLuMail>> allMailMap = new HashMap<>();

			int mailId = MailConst.QUN_XIONG_TASK_MAIL_158;
			Iterator<CrossZhuLuRoomInfo> iterator = CrossZhuLuCache.roomInfoMap.values().iterator();
			for (; iterator.hasNext();) {
				CrossZhuLuRoomInfo roomInfo = iterator.next();
				Map<Long, CrossZhuLuHeroInfo> heroInfoMap = CrossZhuLuCache.heroInfoMap.get(roomInfo.getPartId());
				for (CrossZhuLuCityInfo cityInfo : roomInfo.getCityInfoMap().values()) {
					Struct_qxzl_273 config = Config_qxzl_273.getIns().get(cityInfo.getCityId());
					int[][] award = config.getReward();
					if (cityInfo.getIsLuck() == 1) {
						award = Config_xtcs_004.getIns().get(QunXiongZhuLuConst.CONFIG_ID_7212).getOther();
					}
					int countryId = cityInfo.getCountryId();
					if (countryId != 0) {
						if (heroInfoMap != null) {
							for (CrossZhuLuHeroInfo heroInfo : heroInfoMap.values()) {
								if (heroInfo.getCountryId() == countryId) {
									LogTool.warn("cityAward-hid:" + heroInfo.getHid() + ",name:" + heroInfo.getName()
											+ ",cityName:" + config.getName(), CrossZhuLuSchedule.class);
									// 优化发放邮件
									CrossZhuLuMail mail = new CrossZhuLuMail();
									mail.setHid(heroInfo.getHid());
									mail.setMailId(mailId);
									mail.setParams(new Object[] { mailId, config.getName() });
									mail.setAward(award);
									int zoneid = CommonUtil.getZoneIdById(heroInfo.getHid());
									List<CrossZhuLuMail> mailList = allMailMap.get(zoneid);
									if (mailList == null) {
										mailList = new ArrayList<>();
										allMailMap.put(zoneid, mailList);
									}
									mailList.add(mail);
								}
							}
						}
					}

				}
			}

			// 哪些服-有哪些邮件
			for (int zoneid : allMailMap.keySet()) {
				List<CrossZhuLuMail> mailList = allMailMap.get(zoneid);
				if (mailList != null && !mailList.isEmpty()) {
					CrossZhuLuFunction.getIns().sendMail(zoneid, mailList);
				}
			}

			//清除服务器区间为0跨服组的个人排行数据
			Map<Integer, CrossCommonRankCache> partIdCacheMap = CommonRankSysCache.getCrossConsumeRankActCache(SystemIdConst.QUN_XIONG_ZHU_LU);
			Map<Integer, Struct_kuafu_200> partMap = CrossPartCache.getPartMap();
			for (Map.Entry<Integer, Struct_kuafu_200> entry : partMap.entrySet()) {
				Struct_kuafu_200 value = entry.getValue();
				int[][] boss = value.getBoss();
				if (boss[0][0] == 0) {
					Integer partId = entry.getKey();
					partIdCacheMap.remove(partId);
					LogTool.info("CrossZhuLuSchedule sendCityAward clearCache partId:" + partId, this);
				}
			}
		}
	}

	/**
	 * 结算排名奖励
	 */
	public void sendRankAward() {
		int time = TimeDateUtil.getCurrentTime();
		int Time22 = TimeDateUtil.getTimeOfTheClock(22);
		int week = TimeDateUtil.getWeek();
		int mailId = MailConst.QUN_XIONG_TASK_MAIL_159;
		if(week == 7) {
			if (time >= Time22 && time >= CrossZhuLuCache.lastRankAwardTime) {
				// 每周日22点结算排名奖励
				
				CrossZhuLuCache.lastRankAwardTime = TimeDateUtil.getTimeOfTheClock(22) + 86400;

				Map<Integer, List<CrossZhuLuMail>> allMailMap = new HashMap<>();

				// 个人排名奖励
				Iterator<CrossZhuLuRoomInfo> iterator2 = CrossZhuLuCache.roomInfoMap.values().iterator();
				for (; iterator2.hasNext();) {
					CrossZhuLuRoomInfo roomInfo = iterator2.next();
					CrossZhuLuFunction.getIns().refreshRank(roomInfo);

					List<CrossZhuLuCountryInfo> country = CrossZhuLuCache.countryInfoRankMap.get(roomInfo.getPartId());

					Map<Integer, List<CrossZhuLuHeroInfo>> map = CrossZhuLuCache.heroInfoRankMap.get(roomInfo.getPartId());

					int rank[] = { 0, 0, 0, 0 };

					mailId = MailConst.QUN_XIONG_TASK_MAIL_159;

					if (country != null && !country.isEmpty()) {
						int i = 1;
						for (CrossZhuLuCountryInfo info : country) {
							int countryId = info.getCountryId();
							rank[countryId] = i;
							if (map != null) {
								List<CrossZhuLuHeroInfo> list = map.get(countryId);
								int num = 1;
								if (list != null) {
									for (CrossZhuLuHeroInfo hero : list) {
										int[][] award2 = Config_qxzlrank_273.getIns().get(200 + num).getReward();
										LogTool.warn("benGuoWanJiaAward-hid:" + hero.getHid() + ",name:"
												+ hero.getName() + ",rank:" + num + ",guoJia:" + hero.getCountryId(),
												CrossZhuLuSchedule.class);

										// 优化发放邮件
										CrossZhuLuMail mail = new CrossZhuLuMail();
										mail.setHid(hero.getHid());
										mail.setMailId(mailId);
										mail.setParams(new Object[] { mailId, num });
										mail.setAward(award2);
										int zoneid = CommonUtil.getZoneIdById(hero.getHid());
										List<CrossZhuLuMail> mailList = allMailMap.get(zoneid);
										if (mailList == null) {
											mailList = new ArrayList<>();
											allMailMap.put(zoneid, mailList);
										}
										mailList.add(mail);

										if (i == 1 && num == 1) {
											// 发放mvp奖励
											int mailId2 = MailConst.QUN_XIONG_TASK_MAIL_169;
											int[][] award3 = Config_xtcs_004.getIns().get(QunXiongZhuLuConst.CONFIG_ID_7207)
													.getOther();
											LogTool.warn(
													"benGuoWanJiaMVPAward-hid:" + hero.getHid() + ",name:"
															+ hero.getName() + ",rank:" + num + ",guoJia:"
															+ hero.getCountryId(),
													CrossZhuLuSchedule.class);

											// 优化发放邮件
											CrossZhuLuMail mail2 = new CrossZhuLuMail();
											mail2.setHid(hero.getHid());
											mail2.setMailId(mailId2);
											mail2.setParams(new Object[] { mailId2 });
											mail2.setAward(award3);
											int zoneid2 = CommonUtil.getZoneIdById(hero.getHid());
											List<CrossZhuLuMail> mailList2 = allMailMap.get(zoneid2);
											if (mailList2 == null) {
												mailList2 = new ArrayList<>();
												allMailMap.put(zoneid2, mailList2);
											}
											mailList2.add(mail2);
										}

										if (num >= 10) {
											break;
										}
										num++;
									}
								}
							}
							i++;
						}
					}

					mailId = MailConst.QUN_XIONG_TASK_MAIL_160;
					// 国家排名奖励
					Map<Long, CrossZhuLuHeroInfo> heroInfoMap = CrossZhuLuCache.heroInfoMap.get(roomInfo.getPartId());
					if (heroInfoMap != null) {
						CrossZhuLuHeroInfo mvp = heroInfoMap.get(roomInfo.getMvpHeroId());
						if (mvp != null) {
							roomInfo.setLastMvpHero(mvp.getName());
							CrossZhuLuFunction.getIns().sendLastMvpName(mvp.getName(), roomInfo.getPartId());
						}
						for (CrossZhuLuHeroInfo heroInfo : heroInfoMap.values()) {
							int r = rank[heroInfo.getCountryId()];
							int award[][] = Config_qxzlrank_273.getIns().get(100 + r).getReward();
							LogTool.warn("guoJiaAward-hid:" + heroInfo.getHid() + ",name:" + heroInfo.getName()
									+ ",rank:" + r + ",guoJia:" + heroInfo.getCountryId(), CrossZhuLuSchedule.class);

							// 优化发放邮件
							CrossZhuLuMail mail = new CrossZhuLuMail();
							mail.setHid(heroInfo.getHid());
							mail.setMailId(mailId);
							mail.setParams(new Object[] { mailId, r });
							mail.setAward(award);
							int zoneid = CommonUtil.getZoneIdById(heroInfo.getHid());
							List<CrossZhuLuMail> mailList = allMailMap.get(zoneid);
							if (mailList == null) {
								mailList = new ArrayList<>();
								allMailMap.put(zoneid, mailList);
							}
							mailList.add(mail);
						}
						sendPersonRankAward(roomInfo.getPartId(), heroInfoMap);
					}

				}

				// 哪些服-有哪些邮件
				for (int zoneid : allMailMap.keySet()) {
					List<CrossZhuLuMail> mailList = allMailMap.get(zoneid);
					if (mailList != null && !mailList.isEmpty()) {
						CrossZhuLuFunction.getIns().sendMail(zoneid, mailList);
					}
				}

				CrossCommonRankCL.getIns().sendMailAwardToLocal(SystemIdConst.QUN_XIONG_ZHU_LU);
				LogTool.info("排名奖励发放完毕", CrossZhuLuSchedule.class);
			}
		}
	}

	public void sendPersonRankAward(int partId, Map<Long, CrossZhuLuHeroInfo> heroInfoMap) {
		try {
			Map<Long, CrossZhuLuHeroInfo> newHeroInfoMap = new HashMap<>(heroInfoMap);
			TreeSet<CommonRankModel> rankTreeSet = CommonRankSysCache.getRankTreeSet(SystemIdConst.QUN_XIONG_ZHU_LU, partId);
			for (CommonRankModel model : rankTreeSet) {
				newHeroInfoMap.remove(model.getHid());
			}

			Map<Integer, List<CrossZhuLuMail>> allMailMap = new HashMap<>();

			int rankNum = CommonRankFunction.getIns().getRankNum(SystemIdConst.QUN_XIONG_ZHU_LU);
			int award[][] = Config_qxzlrank_273.getIns().get(300 + rankNum + 1).getReward();
			for (CrossZhuLuHeroInfo heroInfo : newHeroInfoMap.values()) {
				//超过10名显示10+,0积分不发奖励
				if (heroInfo.getScore() > 0) {
					// 优化发放邮件
					CrossZhuLuMail mail = new CrossZhuLuMail();
					mail.setHid(heroInfo.getHid());
					mail.setMailId(MailConst.QUN_XIONG_TASK_MAIL_194);
					mail.setParams(new Object[] { MailConst.QUN_XIONG_TASK_MAIL_194, rankNum + "+" });
					mail.setAward(award);
					int zoneid = CommonUtil.getZoneIdById(heroInfo.getHid());
					List<CrossZhuLuMail> mailList = allMailMap.get(zoneid);
					if (mailList == null) {
						mailList = new ArrayList<>();
						allMailMap.put(zoneid, mailList);
					}
					mailList.add(mail);
				}
			}

			// 哪些服-有哪些邮件
			for (int zoneid : allMailMap.keySet()) {
				List<CrossZhuLuMail> mailList = allMailMap.get(zoneid);
				if (mailList != null && !mailList.isEmpty()) {
					CrossZhuLuFunction.getIns().sendMail(zoneid, mailList);
				}
			}

		} catch (Exception e) {
			LogTool.error(e, this, "CrossZhuLuSchedule sendPersonRankAward sysId:" + SystemIdConst.QUN_XIONG_ZHU_LU
			);
		}
	}

	/**
	 * 刷新庆典城池
	 */
	public void resetLuckCity() {
		// 每天0点刷新庆典城池
		int currentTime = TimeDateUtil.getCurrentTime();
		if (currentTime >= CrossZhuLuCache.lastLuckCityTime) {
			CrossZhuLuCache.lastLuckCityTime = TimeDateUtil.getTimeOfTheClock(0) + 86400;
			List<CrossZhuLuRoomInfo> allRoomInfo = new ArrayList<>();
			allRoomInfo.addAll(CrossZhuLuCache.roomInfoMap.values());
			for (CrossZhuLuRoomInfo roomInfo : allRoomInfo) {
				CrossZhuLuFunction.getIns().resetLuckCity(roomInfo);
			}
		}
	}

	/**
	 * 重置系统
	 */
	public void reset() {
		int time = TimeDateUtil.getCurrentTime();
		int Time10 = TimeDateUtil.getTimeOfTheClock(9);
		int week = TimeDateUtil.getWeek();
		if (week == 1) {
			if (time >= Time10 && time >= CrossZhuLuCache.lastResetTime) {
				// 每周一10点刷新系统
				
				CrossZhuLuCache.lastResetTime = TimeDateUtil.getTimeOfTheClock(9) + 86400 * 7;
				
				CrossZhuLuCache.heroRecordMap.clear();
				CrossZhuLuCache.countryRecordMap.clear();
				CrossZhuLuCache.countryInfoRankMap.clear();
				CrossZhuLuCache.heroInfoRankMap.clear();

				Map<Integer, List<CrossZhuLuMail>> allMailMap = new HashMap<>();

				Iterator<Map<Long, CrossZhuLuHeroInfo>> iterator = CrossZhuLuCache.heroInfoMap.values().iterator();
				for (; iterator.hasNext();) {
					Map<Long, CrossZhuLuHeroInfo> map = iterator.next();
					if (map != null) {
						for (CrossZhuLuHeroInfo info : map.values()) {
							if (info.getRewards() != null && !info.getRewards().isEmpty()) {
								// 补发驻守奖励
								int mailId = MailConst.QUN_XIONG_TASK_MAIL_151;
								List<int[]> awardList = new ArrayList<int[]>();
								for (CrossZhuLuDefendAward reward : info.getRewards()) {
									awardList.add(new int[] { reward.getAwardType(), reward.getAwardId(),
											reward.getCount() });
								}

								int size = awardList.size();
								int[][] AwardArray = new int[size][];
								awardList.toArray(AwardArray);

								// 优化发放邮件
								CrossZhuLuMail mail = new CrossZhuLuMail();
								mail.setHid(info.getHid());
								mail.setMailId(mailId);
								mail.setParams(new Object[] { mailId });
								mail.setAward(AwardArray);
								int zoneid = CommonUtil.getZoneIdById(info.getHid());
								List<CrossZhuLuMail> mailList = allMailMap.get(zoneid);
								if (mailList == null) {
									mailList = new ArrayList<>();
									allMailMap.put(zoneid, mailList);
								}
								mailList.add(mail);

								info.getRewards().clear();
							}
							info.setTiLi(info.getMaxTiLi());
							info.setScore(0);
							info.setTodayScore(0);
							info.setTodayScoreTime(TimeDateUtil.getCurrentTime());
							info.setUpdateScoreTime(0);
							info.setUpdateTiLiTime(0);
							info.setState(0);
							info.setCityId(400 + info.getCountryId());
						}
					}
				}

				// 哪些服-有哪些邮件
				for (int zoneid : allMailMap.keySet()) {
					List<CrossZhuLuMail> mailList = allMailMap.get(zoneid);
					if (mailList != null && !mailList.isEmpty()) {
						CrossZhuLuFunction.getIns().sendMail(zoneid, mailList);
					}
				}

				List<CrossZhuLuRoomInfo> allRoomInfo = new ArrayList<>();
				allRoomInfo.addAll(CrossZhuLuCache.roomInfoMap.values());
				for (CrossZhuLuRoomInfo roomInfo : allRoomInfo) {
					roomInfo.getCityInfoMap().clear();
					roomInfo.getCountryInfoMap().clear();
					CrossZhuLuFunction.getIns().initCountrysInfo(roomInfo);
					CrossZhuLuFunction.getIns().initCitysInfo(roomInfo);
					CrossZhuLuFunction.getIns().resetLuckCity(roomInfo);
					CrossCommonRankCL.getIns().clearRank(roomInfo.getPartId(), SystemIdConst.QUN_XIONG_ZHU_LU);
				}
			}
		}
	}
}
