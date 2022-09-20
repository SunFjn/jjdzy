package com.teamtop.system.crossMine;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentHashMap.KeySetView;

import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.TypeReference;
import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.callback.Callback;
import com.teamtop.gameCommon.GameProperties;
import com.teamtop.netty.server.server2.Client_2;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.activity.ativitys.threeKingdomsCelebration.celebrationHaoLiZhuanPan.CelebrationHaoLiZhuanPanCache;
import com.teamtop.system.activity.ativitys.threeKingdomsCelebration.celebrationHaoLiZhuanPan.CelebrationHaoLiZhuanPanConst;
import com.teamtop.system.activity.ativitys.threeKingdomsCelebration.celebrationHaoLiZhuanPan.cross.CelebrationHaoLiZhuanPanCrossToLocal;
import com.teamtop.system.crossMine.model.CrossMine;
import com.teamtop.system.crossMine.model.CrossMineAward;
import com.teamtop.system.crossMine.model.CrossMineDao;
import com.teamtop.system.crossMine.model.CrossMineJoiner;
import com.teamtop.system.godWeapon.GodWeaponFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventUtil;
import com.teamtop.util.ProbabilityEvent.RandomUtil;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_kfkz_275;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_kfkz_275;
import excel.struct.Struct_xtcs_004;
import io.netty.channel.Channel;

public class CrossMineFunction {
	private static CrossMineFunction ins;

	public static synchronized CrossMineFunction getIns() {
		if (ins == null) {
			ins = new CrossMineFunction();
		}
		return ins;
	}

	/**
	 * 转换下发数据
	 * 
	 * @param crossMine
	 * @return
	 */
	public Object[] getMinersInfo(CrossMine crossMine) {
		ArrayList<Object> minersInfo = new ArrayList<>();
		if (crossMine == null || crossMine.getMineId() == 0) {
			return minersInfo.toArray();
		}
		for (CrossMineJoiner joiner : crossMine.getMinersInfo()) {
			minersInfo.add(new Object[] { joiner.getHid(), joiner.getName(), joiner.getStrength(), joiner.getCountry(),
					joiner.getHerdid(), joiner.getIconid() });
		}

		return minersInfo.toArray();
	}

	public Object[] getMineInfo(long hid, CrossMine crossMine, long crossTime, long tomorrowCrossTime) {
		ArrayList<Object> rewards = new ArrayList<Object>();
		for (CrossMineJoiner joiner : crossMine.getMinersInfo()) {
			if (joiner.getHid() == hid) {
				if (joiner.getRewards() != null) {
					for (CrossMineAward reward : joiner.getRewards()) {
						if (reward != null) {
							rewards.add(new Object[] { reward.getAwardType(), reward.getAwardId(), reward.getCount(),
									reward.getLostNum() });
						}
					}
					break;
				}
			}
		}
		return new Object[] { crossMine.getMineId(), crossMine.getHid(), crossMine.getStealTimes(),
				crossMine.getFightTimes(), CrossMineFunction.getIns().getTime(crossTime, tomorrowCrossTime, crossMine),
				rewards.toArray(), CrossMineFunction.getIns().getMinersInfo(crossMine) };
	}

	/**
	 * 返回矿藏剩余挖掘时间
	 * 
	 * @param crossTime
	 * @param startTime
	 * @return
	 */
	public int getTime(long crossTime, long tomorrowCrossTime, CrossMine crossMine) {
		long startTime = crossMine.getStartTime();
		if (startTime == -1) {
			// 未开启挖矿
			return -1;
		}
		if (startTime == -2) {
			// 已经采集完
			return -2;
		}

		if (TimeDateUtil.getHour() < 8) {
			// 昨天已完结,今天未开启
			return -2;
		}

		Struct_kfkz_275 config = Config_kfkz_275.getIns().get(crossMine.getMineId());
		if (config == null) {
			// 配置有误
			return -1;
		}

		long tomorrowZeroTime = tomorrowCrossTime;
		long endTime = startTime + config.getTime() * 1000;
		if (endTime > tomorrowZeroTime) {
			return (int) (tomorrowZeroTime - crossTime) / 1000;
		}

		return (int) (endTime - crossTime) / 1000;
	}

	/**
	 * 获取矿藏战斗掠夺奖励
	 * 
	 * @param crossMine
	 * @return
	 */
	public Object[] getMineFightAwards(CrossMine crossMine, boolean isShow) {
		if (crossMine == null) {
			return new Object[] {};
		}

		Struct_kfkz_275 config = Config_kfkz_275.getIns().get(crossMine.getMineId());
		if (config == null) {
			return new Object[] {};
		}

		int[][] costInfo = config.getQd();

		return getOneAwards(crossMine, costInfo, isShow);
	}

	/**
	 * 获取矿藏顺手牵羊奖励
	 * 
	 * @param crossMine
	 * @return
	 */
	public Object[] getMineStealAwards(CrossMine crossMine, boolean isShow) {
		if (crossMine == null) {
			return new Object[] {};
		}

		Struct_kfkz_275 config = Config_kfkz_275.getIns().get(crossMine.getMineId());
		if (config == null) {
			return new Object[] {};
		}

		int[][] costInfo = config.getSs();

		return getOneAwards(crossMine, costInfo, isShow);
	}

	/**
	 * 获取扣取资源数据
	 * 
	 * @param crossMine
	 * @param costInfo
	 * @param isShow
	 * @return
	 */
	public Object[] getOneAwards(CrossMine crossMine, int[][] costInfo, boolean isShow) {
		ArrayList<Object> r = new ArrayList<Object>();
		int size = crossMine.getMinersInfo().size();
		for (int[] cost : costInfo) {
			int[][] awards = new int[costInfo.length][3];
			awards[0][0] = cost[0];
			awards[0][1] = cost[1];
			for (CrossMineJoiner joiner : crossMine.getMinersInfo()) {
				for (int j = 0; j < joiner.getRewards().size(); j++) {
					CrossMineAward rewards = joiner.getRewards().get(j);
					if (cost[0] == rewards.getAwardType() && cost[1] == rewards.getAwardId()) {
						int num = cost[2] / size;
						if (num > (rewards.getCount() - rewards.getLostNum())) {
							num = (rewards.getCount() - rewards.getLostNum());
						}
						if (rewards.getCount() - rewards.getLostNum() <= 0) {
							num = 0;
						}
						awards[0][2] += num;
						if (!isShow) {
							// 真实扣除
							// rewards.setCount(rewards.getCount() - num);
							rewards.setLostNum(rewards.getLostNum() + num);
						}
					}
				}
			}
			r.add(new Object[] { awards[0][0], awards[0][1], awards[0][2] });
		}

		return r.toArray();
	}

	/**
	 * 是否可以获得奖励
	 * 
	 * @param type
	 * @param crossMine
	 * @return
	 */
	public boolean canGetAwards(int type, CrossMine crossMine) {
		if (type == 1) {
			Object[] obj = getMineFightAwards(crossMine, true);
			for (Object o : obj) {
				Object[] objArr = (Object[]) o;
				if (Integer.valueOf(objArr[2].toString()) > 0) {
					return true;
				}
			}
		} else {
			Object[] obj = getMineStealAwards(crossMine, true);
			for (Object o : obj) {
				Object[] objArr = (Object[]) o;
				if (Integer.valueOf(objArr[2].toString()) > 0) {
					return true;
				}
			}
		}
		return false;
	}

	/**
	 * 新建一个矿工信息
	 * 
	 * @param hero
	 * @return
	 */
	public CrossMineJoiner newCrossMineJoiner(Hero hero) {
		CrossMineJoiner crossMineJoiner = new CrossMineJoiner();
		crossMineJoiner.setHid(hero.getId());
		crossMineJoiner.setBelongZoneid(GameProperties.getFirstZoneId());
		crossMineJoiner.setJob(hero.getJob());
		crossMineJoiner.setStrength(hero.getTotalStrength());
		crossMineJoiner.setCountry(hero.getCountryType());
		crossMineJoiner.setHerdid(hero.getIcon());
		crossMineJoiner.setIconid(hero.getFrame());
		crossMineJoiner.setModel(hero.getShowModel());
		crossMineJoiner.getModel().setWeaponModel(GodWeaponFunction.getIns().getNowGodWeapon(hero));
		crossMineJoiner.setSkill(hero.getSkill());
		crossMineJoiner.setFinalFightAttr(hero.getFinalFightAttr());
		crossMineJoiner.setFigthMonsterSpirit(hero.getMonsterSpiritModel().getFightMonsterSpiri());
		crossMineJoiner.setLittleLeader(hero.getLittleLeader());
		crossMineJoiner.setName(hero.getNameZoneid());
		crossMineJoiner.setStartTime(-1);
		crossMineJoiner.setRewards(new ArrayList<>());
		crossMineJoiner.setOfficial(hero.getOfficial());
		crossMineJoiner.setWujiang(hero.getWujiang());
		crossMineJoiner.setTitleModel(hero.getTitleModel());
		crossMineJoiner.getModel().setRideModel(hero.getMountId());
		return crossMineJoiner;
	}

	/**
	 * 推送矿藏信息
	 * 
	 * @param nowMinerIdList
	 * @param type
	 * @param name
	 * @param crossMine
	 */
	public void pushMineInfo(List<Long> pushIdList, int type, String name, CrossData crossData) {
		crossData.putObject(CrossMineEnum.Type, type);
		crossData.putObject(CrossMineEnum.Name, name);
		crossData.putObject(CrossMineEnum.CrossTime, TimeDateUtil.getCurrentTimeInMillis());
		crossData.putObject(CrossMineEnum.TomorrowCrossTime, TimeDateUtil.getTomorrowZeroTime());
		for (long id : pushIdList) {
			int zoneId = CommonUtil.getZoneIdById(id);
			Channel c = CrossCache.getChannel(zoneId);
			crossData.putObject(CrossMineEnum.Hid, id);
			NettyWrite.writeXData(c, CrossConst.CROSS_MINE_PUSH_MINE_CL, crossData);
		}
	}

	/**
	 * 矿藏是否开启时间
	 * 
	 * @return
	 */
	public boolean isMineOpen() {
		long currentTime = TimeDateUtil.getCurrentTimeInMillis();
		long zeroTime = TimeDateUtil.getTodayZeroTime();
		long eightTime = zeroTime + 8 * 3600 * 1000l;

		if (currentTime > zeroTime && currentTime < eightTime) {
			// 活动未开启
			return false;
		}
		return true;
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

	/**
	 * 搜索矿藏
	 * 
	 * @param hid
	 * @param helpMinerId
	 * @param mineIdList
	 * @return
	 */
	public List<CrossMine> searchMine(long hid, long helpMinerId, List<Long> mineIdList, int belongZoneid) {
		List<CrossMine> canMines = new ArrayList<>();
		int partId = CrossCache.getPartId(belongZoneid);
		ConcurrentHashMap<Long, CrossMine> mineMap = CrossMineCrossCache.pAllCrossMineCache.get(partId);
		if (mineMap != null) {
			for (CrossMine mine : mineMap.values()) {
				if (mine.getStartTime() == -1 || mine.getMineId() == 0) {
					// 未开始开采不显示
					continue;
				}
				if (mineIdList.contains(mine.getHid())) {
					// 已有矿下轮不显示
					continue;
				}
				if (mine.getHid() == hid || mine.getHid() == helpMinerId) {
					// 自己的和协助的不显示
					continue;
				}
				if (!canGetAwards(1, mine) && !canGetAwards(2, mine)) {
					// 没有资源可抢可顺的不显示
					continue;
				}
				if (mine.getFightTimes() < 3 || mine.getStealTimes() < 3) {
					// 可被顺被抢显示
					canMines.add(mine);
				}

			}
		}
		List<CrossMine> mines = new ArrayList<>();
		int size = canMines.size();
		if (size > 3) {
			for (int i = 0; i < 3; i++) {
				int index = RandomUtil.getRandomNumInAreas(0, size - 1);
				mines.add(canMines.get(index));
				canMines.remove(index);
				size--;
			}
		} else {
			return canMines;
		}
		return mines;
	}

	/**
	 * 数据转换成奖励
	 * 
	 * @param array
	 * @return
	 */
	public int[][] objectToArr(Object[] array) {
		int[][] data = new int[array.length][3];
		for (int i = 0; i < array.length; i++) {
			Type type = new TypeReference<Object[]>() {
			}.getType();
			Object[] object = JSONObject.parseObject(array[i].toString(), type);
			for (int j = 0; j < object.length; j++) {
				data[i][j] = (int) object[j];
			}
		}
		return data;
	}

	/**
	 * 新增矿藏
	 * 
	 * @param crossMineJoiner
	 * @return
	 */
	public CrossMine addCrossMine(CrossMineJoiner crossMineJoiner) {
		CrossMine crossMine = new CrossMine();
		crossMine.setHid(crossMineJoiner.getHid());
		crossMine.setBelongZoneid(crossMineJoiner.getBelongZoneid());
		crossMine.setFightTimes(0);
		crossMine.setStealTimes(0);
		crossMine.setStartTime(-1);
		crossMine.setMinerNum(1);
		crossMine.setName(crossMineJoiner.getName());

		int partId = CrossCache.getPartId(crossMine.getBelongZoneid());
		ProbabilityEventModel model = new ProbabilityEventModel();
		for (Struct_kfkz_275 config : Config_kfkz_275.getIns().getSortList()) {
			model.addProbabilityEvent(config.getGl(), config.getId());
		}

		int mineId = (int) ProbabilityEventUtil.getEventByProbability(model);
		crossMine.setMineId(mineId);

		ArrayList<CrossMineJoiner> minersInfo = new ArrayList<>();
		crossMine.setMinersInfo(minersInfo);
		minersInfo.add(0, crossMineJoiner);
		try {
			ConcurrentHashMap<Long, CrossMine> mineMap = CrossMineCrossCache.pAllCrossMineCache.get(partId);
			mineMap.put(crossMineJoiner.getHid(), crossMine);
			CrossMineDao.getIns().insertCrossMine(crossMine);
		} catch (Exception e) {
			LogTool.error(e, CrossMineFunction.class, " addCrossMine has wrong hid:" + crossMineJoiner.getHid());
		}
		return crossMine;
	}

	/**
	 * 定时发放奖励
	 */
	public void scheduleAddReward() {
		long currentTime = TimeDateUtil.getCurrentTimeInMillis();
		long zeroTime = TimeDateUtil.getTodayZeroTime();
		long eightTime = zeroTime + 8 * 3600 * 1000l;
		Struct_xtcs_004 excel = Config_xtcs_004.getIns().get(CrossMineConst.CONST_6610);

		// 30分钟定时存库
		if (TimeDateUtil.getCurrentTime() - CrossMineCrossCache.LastSaveTime >= 30 * 60) {
			try {
				ConcurrentHashMap<Long, CrossMine> allCrossMineCache = new ConcurrentHashMap<>();
				Iterator<ConcurrentHashMap<Long, CrossMine>> iterator = CrossMineCrossCache.pAllCrossMineCache.values()
						.iterator();
				for (; iterator.hasNext();) {
					ConcurrentHashMap<Long, CrossMine> map = iterator.next();
					if (map != null) {
						ConcurrentHashMap<Long, CrossMine> map2 = new ConcurrentHashMap<>();
						for (CrossMine mine : map.values()) {
							if (mine.isNeedSave()) {
								map2.put(mine.getHid(), mine);
								mine.setNeedSave(false);
							}
						}
						allCrossMineCache.putAll(map2);
					}
				}
				CrossMineDao.getIns().updateCrossMineBatch(allCrossMineCache.values());
			} catch (Exception e) {
				e.printStackTrace();
			}
			CrossMineCrossCache.LastSaveTime = TimeDateUtil.getCurrentTime();
			
			//特殊处理
//			try {
//				if(CelebrationHaoLiZhuanPanCache.getOpenState()==CelebrationHaoLiZhuanPanConst.OPEN) {					
//					Iterator<Channel> iterator = CrossCache.getChannelToZoneid().keySet().iterator();
//					for (; iterator.hasNext();) {
//						Channel channel = iterator.next();
//						CelebrationHaoLiZhuanPanCrossToLocal.getIns().sendRankAllDataCL(channel);
//					}
//					LogTool.info("CelebrationHaoLiZhuanPanCrossToLocal synRankList", CrossMineFunction.class);
//				}
//			} catch (Exception e) {
//				LogTool.error(e, CrossMineFunction.class, "CrossMineFunction scheduleAddReward");
//			}
		}

		if (currentTime > zeroTime && currentTime < eightTime) {
			// 结束收益期间
			return;
		}
		// 计算挖矿者的奖励
		Iterator<Integer> iterator = CrossMineCrossCache.pAllCrossMineCache.keySet().iterator();
		for (; iterator.hasNext();) {
			int partId = iterator.next();
			try {
				ConcurrentHashMap<Long, CrossMine> allCrossMineCache = CrossMineCrossCache.pAllCrossMineCache
						.get(partId);
				for (CrossMine crossMine : allCrossMineCache.values()) {
					try {
						Struct_kfkz_275 struct_kfkz_275 = Config_kfkz_275.getIns().get(crossMine.getMineId());
						if (crossMine.getStartTime() > 0) {
							// 开采中计算收益
							long waTime = currentTime - crossMine.getStartTime();
							if (waTime < 0) {
								waTime = 0;
							}
							if (waTime > struct_kfkz_275.getTime() * 1000l) {
								// 超出采集时间
								crossMine.setStartTime(-2);
								// 添加组队加成奖励
								List<CrossMineJoiner> minersInfo = crossMine.getMinersInfo();
								for (int i = 0; i < minersInfo.size(); i++) {
									CrossMineJoiner crossMineJoiner = minersInfo.get(i);
									for (int j = 0; j < crossMineJoiner.getRewards().size(); j++) {
										int num = crossMineJoiner.getRewards().get(j).getCount();
										if (crossMine.getMinerNum() == 2) {
											Struct_xtcs_004 excel2 = Config_xtcs_004.getIns()
													.get(CrossMineConst.CONST_6605);
											num = (int) ((double) num * (100 + (double) excel2.getNum()) / 100);
										} else if (crossMine.getMinerNum() == 3) {
											Struct_xtcs_004 excel2 = Config_xtcs_004.getIns()
													.get(CrossMineConst.CONST_6606);
											num = (int) ((double) num * (100 + (double) excel2.getNum()) / 100);
										}
										crossMineJoiner.getRewards().get(j).setCount(num);
									}
								}

								// 用于推送新消息
								List<Long> pushIdList = new ArrayList<>();
								for (CrossMineJoiner joiner : crossMine.getMinersInfo()) {
									pushIdList.add(joiner.getHid());
								}
								// 推送信息通知完成采集
								CrossData crossData = new CrossData();
								crossData.putObject(CrossMineEnum.CrossMineInfo, crossMine);
								CrossMineFunction.getIns().pushMineInfo(pushIdList, 8, crossMine.getName(), crossData);
							} else {
								List<CrossMineJoiner> minersInfo = crossMine.getMinersInfo();
								for (int i = 0; i < minersInfo.size(); i++) {
									CrossMineJoiner crossMineJoiner = minersInfo.get(i);
									waTime = currentTime - crossMineJoiner.getStartTime();
									if (waTime < 0) {
										waTime = 0;
									}
									int maxRewardTime = struct_kfkz_275.getTime() / excel.getNum();
									int addRewardTime = (int) (waTime / (excel.getNum() * 1000l));
									if (addRewardTime <= 0) {
										continue;
									}
									if (addRewardTime > maxRewardTime) {
										// 保证不会超出可领取次数
										addRewardTime = maxRewardTime;
									}
									crossMineJoiner.setStartTime(currentTime);
									int[][] reward = null;
									if (crossMineJoiner.getHid() == crossMine.getHid()) {
										// 矿主
										reward = struct_kfkz_275.getReward();
									} else {
										reward = struct_kfkz_275.getReward1();
									}

									int[][] addttr = CommonUtil.copyDyadicArray(reward);
									if (addRewardTime > 0) {
										addttr = CommonUtil.copyArrayAndNum(addttr, addRewardTime);
										if (crossMineJoiner.getRewards() == null) {
											crossMineJoiner.setRewards(new ArrayList<>());
											for (int[] ttr : addttr) {
												CrossMineAward award = new CrossMineAward();
												award.setAwardType(ttr[0]);
												award.setAwardId(ttr[1]);
												award.setCount(ttr[2]);
												award.setLostNum(0);
											}
											continue;
										}
										for (int j = 0; j < crossMineJoiner.getRewards().size(); j++) {
											CrossMineAward award = crossMineJoiner.getRewards().get(j);
											for (int[] ttr : addttr) {
												if (ttr[0] == award.getAwardType() && ttr[1] == award.getAwardId()) {
													award.setCount(award.getCount() + ttr[2]);
												}
											}
										}
									}
								}
							}
							crossMine.setNeedSave(true);
						}
						if (currentTime == zeroTime) {
							// 0点 停止挖矿的
							if (crossMine.getStartTime() > 0) {
								crossMine.setStartTime(-2);
								// 添加组队加成奖励
								List<CrossMineJoiner> minersInfo = crossMine.getMinersInfo();
								for (int i = 0; i < minersInfo.size(); i++) {
									CrossMineJoiner crossMineJoiner = minersInfo.get(i);
									for (int j = 0; j < crossMineJoiner.getRewards().size(); j++) {
										int num = crossMineJoiner.getRewards().get(j).getCount();
										if (crossMine.getMinerNum() == 2) {
											Struct_xtcs_004 excel2 = Config_xtcs_004.getIns()
													.get(CrossMineConst.CONST_6605);
											num = (int) ((double) num * (100 + (double) excel2.getNum()) / 100);
										} else if (crossMine.getMinerNum() == 3) {
											Struct_xtcs_004 excel2 = Config_xtcs_004.getIns()
													.get(CrossMineConst.CONST_6606);
											num = (int) ((double) num * (100 + (double) excel2.getNum()) / 100);
										}
										crossMineJoiner.getRewards().get(j).setCount(num);
									}
								}

								// 用于推送新消息
								List<Long> pushIdList = new ArrayList<>();
								for (CrossMineJoiner joiner : crossMine.getMinersInfo()) {
									pushIdList.add(joiner.getHid());
								}
								// 推送信息通知完成采集
								CrossData crossData = new CrossData();
								crossData.putObject(CrossMineEnum.CrossMineInfo, crossMine);
								CrossMineFunction.getIns().pushMineInfo(pushIdList, 8, crossMine.getName(), crossData);
							}
						}
					} catch (Exception e) {
						long hid = -1;
						if (crossMine != null) {
							hid = crossMine.getHid();
						}
						LogTool.error(e, this, "crossmine scheduleAddReward, partId=" + partId + "hid=" + hid);
					}
				}
			} catch (Exception e) {
				LogTool.error(e, this, "crossmine scheduleAddReward, partId=" + partId);
			}
		}
	}

	/**
	 * 修改名称通知改变
	 * 
	 * @param hero
	 */
	public void changeName(Hero hero) {
		CrossData crossData = new CrossData();
		crossData.putObject(CrossMineEnum.Hid, hero.getId());
		crossData.putObject(CrossMineEnum.Name, hero.getNameZoneid());
		crossData.putObject(CrossMineEnum.HelpMinerId, hero.getCrossMineLocal().getHelpMinerId());
		Channel channel = Client_2.getIns().getCrossChannel();
		if (channel == null || !channel.isOpen()) {
			LogTool.warn("channel == null || !channel.isOpen() sendToCross", CrossMineFunction.class);
			return;
		}
		NettyWrite.writeXData(channel, CrossConst.CROSS_MINE_ChangeName, crossData);
	}

	/**
	 * 0~8点开服检查矿藏状态
	 */
	public void checkMines() {
		long currentTime = TimeDateUtil.getCurrentTimeInMillis();
		long zeroTime = TimeDateUtil.getTodayZeroTime();
		long eightTime = zeroTime + 8 * 3600 * 1000l;
		Iterator<Integer> iterator = CrossMineCrossCache.pAllCrossMineCache.keySet().iterator();
		for (; iterator.hasNext();) {
			int partId = iterator.next();
			ConcurrentHashMap<Long, CrossMine> allCrossMineCache = CrossMineCrossCache.pAllCrossMineCache.get(partId);
			try {
				for (CrossMine crossMine : allCrossMineCache.values()) {
					try {
						if (currentTime > zeroTime && currentTime < eightTime) {
							if (crossMine.getStartTime() != -1 && crossMine.getStartTime() != -2
									&& crossMine.getStartTime() < zeroTime) {
								// 结束挖矿
								crossMine.setStartTime(-2);

								// 添加组队加成奖励
								List<CrossMineJoiner> minersInfo = crossMine.getMinersInfo();
								for (int i = 0; i < minersInfo.size(); i++) {
									CrossMineJoiner crossMineJoiner = minersInfo.get(i);
									for (int j = 0; j < crossMineJoiner.getRewards().size(); j++) {
										int num = crossMineJoiner.getRewards().get(j).getCount();
										if (crossMine.getMinerNum() == 2) {
											Struct_xtcs_004 excel2 = Config_xtcs_004.getIns()
													.get(CrossMineConst.CONST_6605);
											num = (int) ((double) num * (1 + (double) excel2.getNum()) / 100);
										} else if (crossMine.getMinerNum() == 3) {
											Struct_xtcs_004 excel2 = Config_xtcs_004.getIns()
													.get(CrossMineConst.CONST_6606);
											num = (int) ((double) num * (1 + (double) excel2.getNum()) / 100);
										}
										crossMineJoiner.getRewards().get(j).setCount(num);
									}
								}
							}
						}
					} catch (Exception e) {
						long hid = -1;
						if (crossMine != null) {
							hid = crossMine.getHid();
						}
						LogTool.error(e, this, "CrossMine checkMines, partId=" + partId + ", hid=" + hid);
					}
				}
			} catch (Exception e) {
				LogTool.error(e, this, "CrossMine checkMines, partId=" + partId);
			}
		}

	}

	/**
	 * 更新红点
	 * 
	 * @param hero
	 */
	public void updateRedPoint(Hero hero) {
		try {
			if (hero == null) {
				return;
			}
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.CROSS_MINE)) {
				return;
			}
			boolean[] redPoint = checkRedPoint(hero);
			for (int i = 1; i < 4; i++) {
				boolean hadRed = redPoint[i];
				if (hadRed) {
					RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.CROSS_MINE, i,
							RedPointConst.HAS_RED);
				} else {
					RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.CROSS_MINE, i,
							RedPointConst.NO_RED);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 检测红点
	 * 
	 * @param hero
	 * @return
	 */
	public boolean[] checkRedPoint(Hero hero) {
		boolean[] hadRedPoint = new boolean[4];
		hadRedPoint[0] = false;
		hadRedPoint[1] = false;
		hadRedPoint[2] = false;
		hadRedPoint[3] = false;
		try {
			if (hero == null) {
				return hadRedPoint;
			}
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.CROSS_MINE)) {
				return hadRedPoint;
			}

			boolean isOpen = CrossMineFunction.getIns().isMineOpen();

			// 有协助次数
			if (isOpen && hero.getCrossMineLocal().getHelpMinerId() == -1) {
				hadRedPoint[CrossMineRedPointConst.RED_1] = true;
			}
			// 有免费搜索次数
			if (isOpen && hero.getCrossMineLocal().getSearchTimes() <= 0) {
				hadRedPoint[CrossMineRedPointConst.RED_2] = true;
			}
			// 玩家有顺手牵羊或战斗抢夺次数
			if (isOpen) {
				if (hero.getCrossMineLocal().getFightTimes() > 0 || hero.getCrossMineLocal().getStealTimes() > 0) {
					hadRedPoint[CrossMineRedPointConst.RED_2] = true;
				}
			}
			if (CrossMineHisLocalCache.redPointPushZhanBao.contains(hero.getId())) {
				hadRedPoint[CrossMineRedPointConst.RED_3] = true;
			}

			CrossMineJoiner crossMineJoiner = CrossMineFunction.getIns().newCrossMineJoiner(hero);
			CrossData crossData = new CrossData();
			crossData.putObject(CrossMineEnum.Hid, hero.getId());
			crossData.putObject(CrossMineEnum.HelpMinerId, hero.getCrossMineLocal().getHelpMinerId());
			crossData.putObject(CrossMineEnum.CrossMineJoiner, crossMineJoiner);

			Channel channel = Client_2.getIns().getCrossChannel();
			if (channel == null || !channel.isOpen()) {
				LogTool.warn("channel == null || !channel.isOpen() sendToCross", CrossMineFunction.class);
				return hadRedPoint;
			}
			NettyWrite.writeXData(channel, CrossConst.CROSS_MINE_OPENUI_LC, crossData, new Callback() {
				@Override
				public void dataReci(Channel channel, CrossData crossData) {
					if (crossData != null) {
						CrossMine crossMine = crossData.getObject(CrossMineEnum.CrossMineInfo, CrossMine.class);
						if (CrossMineFunction.getIns().isMineOpen() && crossMine.getStartTime() == -1) {
							// 有开矿次数
							RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.CROSS_MINE,
									CrossMineRedPointConst.RED_1, RedPointConst.HAS_RED);
						}

						if (crossMine.getStartTime() == -2) {
							// 有可领取的奖励
							RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.CROSS_MINE,
									CrossMineRedPointConst.RED_1, RedPointConst.HAS_RED);
						}

					}
				}
			});
		} catch (Exception e) {
			e.printStackTrace();
		}
		return hadRedPoint;
	}

	/**
	 * 刷新矿主战力
	 * 
	 * @param joiner
	 * @param joiner2
	 */
	public void copyToJoiner(CrossMineJoiner joiner, CrossMineJoiner joiner2) {
		joiner.setJob(joiner2.getJob());
		joiner.setStrength(joiner2.getStrength());
		joiner.setHerdid(joiner2.getHerdid());
		joiner.setIconid(joiner2.getIconid());
		joiner.setModel(joiner2.getModel());
		joiner.getModel().setWeaponModel(joiner2.getModel().getWeaponModel());
		joiner.setSkill(joiner2.getSkill());
		joiner.setFinalFightAttr(joiner2.getFinalFightAttr());
		joiner.setFigthMonsterSpirit(joiner2.getFigthMonsterSpirit());
		joiner.setLittleLeader(joiner2.getLittleLeader());
		joiner.setName(joiner2.getName());
		joiner.setOfficial(joiner2.getOfficial());
		joiner.setWujiang(joiner2.getWujiang());
		joiner.setTitleModel(joiner2.getTitleModel());
	}
}
