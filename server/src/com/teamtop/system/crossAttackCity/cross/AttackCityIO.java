package com.teamtop.system.crossAttackCity.cross;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.HeroOpTaskRunnable;
import com.teamtop.system.battle.BattleFunction;
import com.teamtop.system.crossAttackCity.AttackCityConst;
import com.teamtop.system.crossAttackCity.AttackCityLocalCache;
import com.teamtop.system.crossAttackCity.AttackCityManager;
import com.teamtop.system.crossAttackCity.model.AttackCity;
import com.teamtop.system.crossAttackCity.model.AttackCityDao;
import com.teamtop.system.crossAttackCity.model.AttackCityLocal;
import com.teamtop.system.crossAttackCity.model.CityInfo;
import com.teamtop.system.crossAttackCity.model.ZhanBao;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_gcbz_777;
import excel.struct.Struct_gcbz_777;
import io.netty.channel.Channel;

public class AttackCityIO {

	private static AttackCityIO ins;

	public AttackCityIO() {
	}

	public static synchronized AttackCityIO getIns() {
		if (ins == null) {
			ins = new AttackCityIO();
		}
		return ins;
	}

	public void openUI(Channel channel, CrossData crossData) {
		int cmd = CrossConst.CROSS_ATTACK_CITY_OPEN_UI;
		try {
			crossData.finishGet();
			ConcurrentHashMap<Integer, AttackCity> allAttackCityCache = AttackCityCrossCache.getAllAttackCityCache();
			Iterator<AttackCity> iterator = allAttackCityCache.values().iterator();
			Map<Integer, CityInfo> cityInfo = new ConcurrentHashMap<>();
			while (iterator.hasNext()) {
				AttackCity next = iterator.next();
				AttackCityCrossFunction.getIns().checkCityInfo(next);
				Map<Integer, CityInfo> cityInfoMap = next.getCityInfoMap();
				int cityId = next.getCityId();
				if (cityInfoMap == null) {
					continue;
				}
				Iterator<CityInfo> iterator2 = cityInfoMap.values().iterator();
				while (iterator2.hasNext()) {
					CityInfo cityInfo2 = iterator2.next();
					/*if (cityInfo2.getState() == 2) {
						// 发放奖励
						CrossData crossData1 = new CrossData();
						crossData1.putObject(AttackCityEnum.hid, cityInfo2.getHid());
						crossData1.putObject(AttackCityEnum.StartTime, cityInfo2.getStartTime());
						crossData1.putObject(AttackCityEnum.ChTime, TimeDateUtil.getCurrentTime());
						crossData1.putObject(AttackCityEnum.cityId, cityInfo2.getCityId());
						Channel c = CrossCache.getChannel(CommonUtil.getZoneIdById(cityInfo2.getHid()));
						NettyWrite.writeXData(c, CrossConst.CROSS_ATTACK_CITY_REMOVE, crossData1);
						iterator2.remove();
					}*/
					cityInfo.put(cityId, cityInfo2);
				}
			}
			crossData.putObject(AttackCityEnum.AttackCity, cityInfo);
			NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
			// System.out.println("中央服当前时间::" + TimeDateUtil.pringNow());
		} catch (Exception e) {
			LogTool.error(e, AttackCityIO.class, "openUI has wrong");
		}
	}

	public void dispatch(Channel channel, CrossData crossData) {
		int cmd = CrossConst.CROSS_ATTACK_CITY_DISPATCH;
		try {
			long hid = crossData.getObject(AttackCityEnum.hid, Long.class);
			int cityId = crossData.getObject(AttackCityEnum.cityId, Integer.class);
			int dispatchId = crossData.getObject(AttackCityEnum.dispatchId, Integer.class);
			CityInfo myCityInfo = crossData.getObject(AttackCityEnum.cityInfo, CityInfo.class);
			int countAward = crossData.getObject(AttackCityEnum.getAward, Integer.class);
			int reTime = crossData.getObject(AttackCityEnum.reTime, Integer.class);
			crossData.finishGet();

			boolean open = AttackCityCrossFunction.getIns().isOpen();
			if (!open) {
				// 没到驻守时间
				crossData.putObject(AttackCityEnum.state, 5);
				NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
				return;
			}
			
			ConcurrentHashMap<Integer, AttackCity> allAttackCityCache = AttackCityCrossCache.getAllAttackCityCache();
			if (dispatchId != 0) {
				// 已有驻守城池
				// 重置城池信息
				// 计算收益发放奖励
				AttackCity AttackCity1 = allAttackCityCache.get(dispatchId);
				ConcurrentHashMap<Integer, CityInfo> cityInfoMap1 = AttackCity1.getCityInfoMap();
				CityInfo cityInfo1 = cityInfoMap1.get(dispatchId);
				if (cityInfo1 != null) {
					Struct_gcbz_777 config = Config_gcbz_777.getIns().get(dispatchId);
					if (config == null) {
						// 城池不存在
						return;
					}
					if (cityInfo1.getStartTime() == 0) {
						// 城池不存在
						crossData.putObject(AttackCityEnum.state, 4);
						NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
						return;
					}
					if (cityInfo1.getHid() != hid) {
						crossData.putObject(AttackCityEnum.state, 4);
						NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
						return;
					}
					int getAwardTime = TimeDateUtil.getCurrentTime() - cityInfo1.getStartTime();
					// if (getAwardTime >= AttackCityConst.XTCS_8250) {
					// 镇守时间超过5分钟累计领取奖励
					if (getAwardTime >= AttackCityConst.XTCS_8252) {
						getAwardTime = AttackCityConst.XTCS_8252;
					}
					// 剩余可领取时间
					if ((reTime - getAwardTime) <= 0) {
						getAwardTime = reTime;
						reTime = 0;
					} else {
						reTime = reTime - getAwardTime;
					}

					int num = getAwardTime / AttackCityConst.XTCS_8250;
					countAward = countAward + num * config.getZsjl()[0][2];
					// }
					AttackCity1.getCityInfoMap().remove(dispatchId);
				}
			}

			AttackCity AttackCity = allAttackCityCache.get(cityId);
			ConcurrentHashMap<Integer, CityInfo> cityInfoMap = AttackCity.getCityInfoMap();
			if (cityInfoMap == null || cityInfoMap.isEmpty()) {
				cityInfoMap = new ConcurrentHashMap<>();
				cityInfoMap.put(cityId, new CityInfo());
				AttackCity.setCityInfoMap(cityInfoMap);
			}
			CityInfo cityInfo = cityInfoMap.get(cityId);
			if (cityInfo.getState() == 1) {
				// 其他玩家正在城池镇守
				crossData.putObject(AttackCityEnum.state, 3);
				NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
				return;
			}

			cityInfo.setState(1);
			cityInfo.setStartTime(TimeDateUtil.getCurrentTime());
			cityInfo.setShowTime(TimeDateUtil.getCurrentTime());
			cityInfo.setWuzi(countAward);

			// 设置城池属性
			cityInfo.setCityId(cityId);
			cityInfo.setHid(hid);
			cityInfo.setBaowu(myCityInfo.getBaowu());
			cityInfo.setTianshu(myCityInfo.getTianshu());
			cityInfo.setReTime(reTime);
			cityInfo.setIcon(myCityInfo.getIcon());
			cityInfo.setFrame(myCityInfo.getFrame());
			cityInfo.setWuJiangId(myCityInfo.getWuJiangId());
			cityInfo.setStrength(myCityInfo.getStrength());
			cityInfo.setSkill(myCityInfo.getSkill());
			cityInfo.setFinalFightAttr(myCityInfo.getFinalFightAttr());
			cityInfo.setFigthMonsterSpirit(myCityInfo.getFigthMonsterSpirit());
			cityInfo.setLittleLeader(myCityInfo.getLittleLeader());
			cityInfo.setName(myCityInfo.getName());
			cityInfo.setCountryId(myCityInfo.getCountryId());
			cityInfo.setOfficial(myCityInfo.getOfficial());
			cityInfo.setTitleId(myCityInfo.getTitleId());
			cityInfo.setGodSkillLevel(myCityInfo.getGodSkillLevel());

			crossData.putObject(AttackCityEnum.state, 0);
			crossData.putObject(AttackCityEnum.reTime, reTime);
			crossData.putObject(AttackCityEnum.getAward, countAward);
			NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
		} catch (Exception e) {
			LogTool.error(e, AttackCityIO.class, "dispatch has wrong");
		}
	}

	public void getAward(Channel channel, CrossData crossData) {
		int cmd = CrossConst.CROSS_ATTACK_CITY_GET_AWARD;
		try {
			long hid = crossData.getObject(AttackCityEnum.hid, Long.class);
			int cityId = crossData.getObject(AttackCityEnum.cityId, Integer.class);
			int countAward = crossData.getObject(AttackCityEnum.getAward, Integer.class);
			int reTime = crossData.getObject(AttackCityEnum.reTime, Integer.class);
			crossData.finishGet();
			if (cityId != 0) {
				AttackCity AttackCity = AttackCityCrossCache.allAttackCityCache.get(cityId);
				if (AttackCity == null) {
					// 数据不存在
					crossData.putObject(AttackCityEnum.state, 1);
					NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
					return;
				}

				CityInfo cityInfo = AttackCity.getCityInfoMap().get(cityId);
				if (cityInfo == null) {
					crossData.putObject(AttackCityEnum.state, 1);
					NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
					return;
				}

				if (cityInfo.getHid() != hid) {
					Hero hero = new Hero();
					hero.setId(hid);
					hero.setLocalChannel(channel);
					int award[][] = { { 1, AttackCityConst.ITEM_410438, countAward } };
					// 发送奖励
					UseAddUtil.add(hero, award, SourceGoodConst.ATTACK_CITY_GET_AWARD, UseAddUtil.getDefaultMail(),
							true);
					crossData.putObject(AttackCityEnum.state, 0);
					crossData.putObject(AttackCityEnum.reTime, reTime);
					NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());

				}

				if (cityInfo.getState() == 1 && countAward == 0) { // 镇守时间不足领取奖励
					if (TimeDateUtil.getCurrentTime() - cityInfo.getStartTime() <= AttackCityConst.XTCS_8250) {
						crossData.putObject(AttackCityEnum.state, 2);
						crossData.putObject(AttackCityEnum.reTime, reTime);
						NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
						return;
					}
				}

				// 计算收益发放奖励
				Struct_gcbz_777 config = Config_gcbz_777.getIns().get(cityId);
				if (config == null) {
					// 城池不存在
					crossData.putObject(AttackCityEnum.state, 4);
					crossData.putObject(AttackCityEnum.reTime, reTime);
					NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
					return;
				}
				Hero hero = new Hero();
				hero.setId(hid);
				hero.setLocalChannel(channel);

				// 剩余可领取时间
				int awardTime = TimeDateUtil.getCurrentTime() - cityInfo.getStartTime();
				if (awardTime > reTime) {
					awardTime = reTime;
				}

				int num = awardTime / AttackCityConst.XTCS_8250;
				reTime = reTime - num * AttackCityConst.XTCS_8250;
				countAward = countAward + num * config.getZsjl()[0][2];

				int award[][] = { { 1, AttackCityConst.ITEM_410438, countAward } };
				// int award[][] = CommonUtil.copyArrayAndNum(config.getZsjl(), countAward);
				if (award[0][2] >= AttackCityConst.XTCS_8251[0][2]) {
					// 达到最大值
					award = AttackCityConst.XTCS_8251;
				}

				// 发送奖励
				UseAddUtil.add(hero, award, SourceGoodConst.ATTACK_CITY_GET_AWARD, UseAddUtil.getDefaultMail(), true);

				// 重置城池信息
				// AttackCity.getCityInfoMap().remove(cityId);
				cityInfo.setStartTime(cityInfo.getStartTime() + num * AttackCityConst.XTCS_8250);
				cityInfo.setWuzi(0);
				cityInfo.setReTime(reTime);

				crossData.putObject(AttackCityEnum.state, 0);
				crossData.putObject(AttackCityEnum.reTime, reTime);
				NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
			} else {
				// 没有城池的情况下领取
				Hero hero = new Hero();
				hero.setId(hid);
				hero.setLocalChannel(channel);
				int award[][] = { { 1, AttackCityConst.ITEM_410438, countAward } };
				// 发送奖励
				UseAddUtil.add(hero, award, SourceGoodConst.ATTACK_CITY_GET_AWARD, UseAddUtil.getDefaultMail(), true);
				crossData.putObject(AttackCityEnum.state, 0);
				crossData.putObject(AttackCityEnum.reTime, reTime);
				NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
			}
		} catch (Exception e) {
			LogTool.error(e, AttackCityIO.class, "getAward has wrong");
		}
	}



	public void plunder(Channel channel, CrossData crossData) {
		int cmd = CrossConst.CROSS_ATTACK_CITY_PLUNDER;
		try {
			long playerId = crossData.getObject(AttackCityEnum.hid, Long.class);
			int cityId = crossData.getObject(AttackCityEnum.cityId, Integer.class);
			int dispatchId = crossData.getObject(AttackCityEnum.dispatchId, Integer.class);
			crossData.finishGet();
			boolean open = AttackCityCrossFunction.getIns().isOpen();
			if (!open) {
				// 没到开启时间
				crossData.putObject(AttackCityEnum.state, 4);
				NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
				return;
			}
			AttackCity AttackCity = AttackCityCrossCache.allAttackCityCache.get(cityId);
			if (AttackCity == null) {
				// 数据不存在
				crossData.putObject(AttackCityEnum.state, 3);
				NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
				return;
			}

			CityInfo cityInfo = AttackCity.getCityInfoMap().get(cityId);
			if (cityInfo == null) {
				crossData.putObject(AttackCityEnum.state, 3);
				NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
				return;
			}
			if (cityInfo.getState() == 0) {
				// 城池还未开始镇守
				crossData.putObject(AttackCityEnum.state, 3);
				NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
				return;
			}
			if (cityInfo.getState() == 2) {
				// 城池还未开始镇守
				crossData.putObject(AttackCityEnum.state, 3);
				NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
				return;
			}
			if (cityInfo.getHid() == playerId) {
				// 不能打本人
				return;
			}
			if (dispatchId != 0) {
				// 移除城池信息
				CrossData crossData1 = new CrossData();
				AttackCity AttackCity1 = AttackCityCrossCache.allAttackCityCache.get(dispatchId);
				CityInfo cityInfo1 = AttackCity1.getCityInfoMap().get(dispatchId);
				if (cityInfo1 != null & cityInfo1.getHid() == playerId) {
					crossData1.putObject(AttackCityEnum.hid, cityInfo1.getHid());
					crossData1.putObject(AttackCityEnum.StartTime, cityInfo1.getStartTime());
					crossData1.putObject(AttackCityEnum.ChTime, TimeDateUtil.getCurrentTime());
					crossData1.putObject(AttackCityEnum.cityId, dispatchId);
					Channel c1 = CrossCache.getChannel(CommonUtil.getZoneIdById(cityInfo1.getHid()));
					NettyWrite.writeXData(c1, CrossConst.CROSS_ATTACK_CITY_REMOVE, crossData1);
					AttackCity1.getCityInfoMap().remove(dispatchId);
				}
			}
			
			crossData.putObject(AttackCityEnum.hid, cityInfo.getHid());
			crossData.putObject(AttackCityEnum.cityInfo, cityInfo);
			crossData.putObject(AttackCityEnum.state, 0);
			NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
		} catch (Exception e) {
			LogTool.error(e, AttackCityIO.class, "plunder has wrong");
		}
	}

	public void battleResult(Channel channel, CrossData crossData) {
		try {
			int cmd = CrossConst.CROSS_ATTACK_CITY_BATTLE_RESULT;
			long attHid = crossData.getObject(AttackCityEnum.hid, Long.class);
			int result = crossData.getObject(AttackCityEnum.result, Integer.class);
			int cityId = crossData.getObject(AttackCityEnum.cityId, Integer.class);
			String name = crossData.getObject(AttackCityEnum.zhanBao, String.class);
			long strength = crossData.getObject(AttackCityEnum.addValue, Long.class);
			crossData.finishGet();
			AttackCity AttackCity = AttackCityCrossCache.allAttackCityCache.get(cityId);
			if (AttackCity == null) {
				crossData.putObject(AttackCityEnum.state, 1);
				crossData.putObject(AttackCityEnum.result, result);
				crossData.putObject(AttackCityEnum.cityId, cityId);
				NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
				return;
			}

			CityInfo cityInfo = AttackCity.getCityInfoMap().get(cityId);
			if (cityInfo == null) {
				crossData.putObject(AttackCityEnum.state, 1);
				crossData.putObject(AttackCityEnum.result, result);
				crossData.putObject(AttackCityEnum.cityId, cityId);
				NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
				return;
			}

			if (attHid != cityInfo.getHid() && result == 1) {
				// 胜利 但是该城池已换人
				crossData.putObject(AttackCityEnum.state, 3);
				crossData.putObject(AttackCityEnum.result, result);
				crossData.putObject(AttackCityEnum.cityId, cityId);
				NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
				return;
			}

			// 验证结果
			int isWin = BattleFunction.checkWinByFight(strength, cityInfo.getStrength(), 0);
			if (isWin == 0) {
				result = 2;
			}

			if (result == 1) {
				// 移除城池信息
				CrossData crossData1 = new CrossData();
				crossData1.putObject(AttackCityEnum.hid, cityInfo.getHid());
				crossData1.putObject(AttackCityEnum.StartTime, cityInfo.getStartTime());
				crossData1.putObject(AttackCityEnum.ChTime, TimeDateUtil.getCurrentTime());
				crossData1.putObject(AttackCityEnum.cityId, cityId);
				Channel c1 = CrossCache.getChannel(CommonUtil.getZoneIdById(cityInfo.getHid()));
				NettyWrite.writeXData(c1, CrossConst.CROSS_ATTACK_CITY_REMOVE, crossData1);
				AttackCity.getCityInfoMap().remove(cityId);
			}

			// int startTime = cityInfo.getStartTime();
			// int award = (TimeDateUtil.getCurrentTime() - startTime) /
			// AttackCityConst.XTCS_8250;

			// crossData.putObject(AttackCityEnum.getAward, award);
			crossData.putObject(AttackCityEnum.result, result);
			crossData.putObject(AttackCityEnum.cityId, cityId);
			crossData.putObject(AttackCityEnum.state, 0);
			// crossData.putObject(AttackCityEnum.hid, cityInfo.getHid());

			NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());

			ZhanBao zhanBao = new ZhanBao();
			zhanBao.setName(name);
			zhanBao.setCityId(cityId);
			zhanBao.setType(result);
			Channel c = CrossCache.getChannel(CommonUtil.getZoneIdById(cityInfo.getHid()));
			CrossData cData = new CrossData();
			cData.putObject(AttackCityEnum.zhanBao, zhanBao);
			cData.putObject(AttackCityEnum.hid, cityInfo.getHid());
			NettyWrite.writeXData(c, CrossConst.CROSS_ATTACK_CITY_ZHAN_BAO, cData);

		} catch (Exception e) {
			LogTool.error(e, AttackCityIO.class, "battleResult has wrong");
		}
	}

	public void openReportUI(Channel channel, CrossData crossData) {
		int cmd = CrossConst.CROSS_ATTACK_CITY_ZHAN_BAO;
		try {
			ZhanBao zhanBao = crossData.getObject(AttackCityEnum.zhanBao, ZhanBao.class);
			long hid = crossData.getObject(AttackCityEnum.hid, Long.class);
			crossData.finishGet();
			List<ZhanBao> list = AttackCityLocalCache.zhanBaoMap.get(hid);
			if (list == null) {
				list = new ArrayList<>();
				AttackCityLocalCache.zhanBaoMap.put(hid, list);
			}
			if (list.size() > 50) {
				list.remove(list.size() - 1);
			}
			list.add(0, zhanBao);

			if (zhanBao.getType() == 1) {
				// 对方丢失城池提示
				AttackCityLocalCache.redPointPushZhanBao.add(hid);
			}
			AttackCityLocalCache.redPoint.add(hid);
			AttackCityCrossFunction.getIns().updateRedPoint(HeroCache.getHero(hid), 0);
		} catch (Exception e) {
			LogTool.error(e, AttackCityIO.class, "openReportUI has wrong");
		}
	}

	public void remove(Channel channel, CrossData crossData) {
		int cmd = CrossConst.CROSS_ATTACK_CITY_REMOVE;
		long hid = crossData.getObject(AttackCityEnum.hid, Long.class);
		int cityId = crossData.getObject(AttackCityEnum.cityId, Integer.class);
		int startTime = crossData.getObject(AttackCityEnum.StartTime, Integer.class);
		int chTime = crossData.getObject(AttackCityEnum.ChTime, Integer.class);
		crossData.finishGet();
		OpTaskExecutorService.DefaultService.execute(new HeroOpTaskRunnable() {
			@Override
			public void run() {
				// TODO Auto-generated method stub
				try {
					AttackCityLocal attackCityLocal = null;
					Hero hero2 = HeroCache.getHero(hid);
					if (hero2 == null) {
						// hero2 = HeroDao.getIns().find(hid, null);
						LogTool.info(
								"AttackCityIO remove hero==null,hid = " + hid + ",nowtime = " + TimeDateUtil.pringNow(),
								AttackCityIO.class);
						try {
							attackCityLocal = AttackCityDao.getIns().findAttackCityLocal(hid);
						} catch (Exception e) {
							// TODO Auto-generated catch block
							LogTool.error(e, this, "AttackCityIO remove findAttackCityLocal hid=" + hid);
						}
					} else {
						attackCityLocal = hero2.getAttackCityLocal();
					}
					Struct_gcbz_777 struct_gcbz_777 = Config_gcbz_777.getIns().get(cityId);
					int[][] zsjl = struct_gcbz_777.getZsjl();
					int reTime = attackCityLocal.getReTime();

					int awardTime;
					if (!TimeDateUtil.isSameDay(startTime * 1000L, chTime * 1000L)) {
						// 结束时间不为同一天
						if (chTime < startTime) {
							// 中央服时间比驻守时间还少 非法不给奖励
							awardTime = 0;
						} else {
							// 每天23.50定时器没跑的时候补发
							int tomorrow = startTime + TimeDateUtil.ONE_DAY_INT;
							awardTime = TimeDateUtil.getOneDayZeroTime(tomorrow) - startTime
									- TimeDateUtil.FIVE_MINUTE * 2;
						}
					} else {
						awardTime = chTime - startTime;
					}

					if (awardTime < 0) {
						awardTime = 0;
					}

					if (awardTime > reTime) {
						awardTime = reTime;
					}

					reTime = reTime - awardTime;

					int award = awardTime / AttackCityConst.XTCS_8250;
					attackCityLocal.setCountAward(attackCityLocal.getCountAward() + award * zsjl[0][2]);// 累积奖励
					attackCityLocal.setReTime(reTime);
					attackCityLocal.setDispatchId(0);
					LogTool.info("AttackCityIO remove success hid = " + hid + ",nowtime = " + TimeDateUtil.pringNow(),
							AttackCityIO.class);
					AttackCityDao.getIns().updateInfo(attackCityLocal);
					if (hero2 != null) {
						AttackCityManager.getIns().openUI(hero2);
					}
				} catch (Exception e) {
					LogTool.error(e, this, "AttackCityIO remove hid=" + hid);
				}
			}

			@Override
			public Object getSession() {
				// TODO Auto-generated method stub
				return hid;
			}
		});
	}

	public void replace(Channel channel, CrossData crossData) {
		int cmd = CrossConst.CROSS_ATTACK_CITY_REPLACE;
		long hid = crossData.getObject(AttackCityEnum.hid, Long.class);
		int dispatchId = crossData.getObject(AttackCityEnum.dispatchId, Integer.class);
		crossData.finishGet();
		try {
			if (dispatchId == 0) {
				crossData.putObject(AttackCityEnum.state, 1);
				NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
				return;
			}
			AttackCity AttackCity = AttackCityCrossCache.allAttackCityCache.get(dispatchId);
			if (AttackCity == null) {
				crossData.putObject(AttackCityEnum.state, 2);
				NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
				return;
			}
			CityInfo cityInfo = AttackCity.getCityInfoMap().get(dispatchId);
			if (cityInfo == null) {
				crossData.putObject(AttackCityEnum.state, 3);
				NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
				return;
			}
			if (cityInfo.getHid() != hid) {
				crossData.putObject(AttackCityEnum.state, 4);
				NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
				return;
			}

			int startTime = cityInfo.getStartTime();
			int reTime = cityInfo.getReTime();
			
			int awardTime = TimeDateUtil.getCurrentTime() - startTime;
			if (awardTime < 0) {
				awardTime = 0;
			}
			if (awardTime > reTime) {
				awardTime = reTime;
			}
			reTime = reTime - awardTime;
			
			Struct_gcbz_777 struct_gcbz_777 = Config_gcbz_777.getIns().get(dispatchId);
			int[][] zsjl = struct_gcbz_777.getZsjl();
			int award = awardTime / AttackCityConst.XTCS_8250;
			crossData.putObject(AttackCityEnum.getAward, award * zsjl[0][2]);
			crossData.putObject(AttackCityEnum.reTime, reTime);
			crossData.putObject(AttackCityEnum.state, 0);
			AttackCity.getCityInfoMap().remove(dispatchId);
			NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
		} catch (Exception e) {
			LogTool.error(e, this, "AttackCityIO replace hid=" + hid);
		}
	}

	public void check(Channel channel, CrossData crossData) {
		int cmd = CrossConst.CROSS_ATTACK_CITY_CHECK;
		long hid = crossData.getObject(AttackCityEnum.hid, Long.class);
		int dispatchId = crossData.getObject(AttackCityEnum.cityId, Integer.class);
		crossData.finishGet();
		try {
			if(dispatchId==0) {
				crossData.putObject(AttackCityEnum.getAward, 0);
				NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
				return;
			}
			AttackCity AttackCity = AttackCityCrossCache.allAttackCityCache.get(dispatchId);
			if (AttackCity == null) {
				crossData.putObject(AttackCityEnum.getAward, 0);
				NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
				return;
			}
			CityInfo cityInfo = AttackCity.getCityInfoMap().get(dispatchId);
			if (cityInfo == null) {
				crossData.putObject(AttackCityEnum.getAward, 0);
				NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
				return;
			}
			if (cityInfo.getHid() != hid) {
				crossData.putObject(AttackCityEnum.getAward, 0);
				NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
				return;
			}
			int startTime = cityInfo.getStartTime();

			int reTime = cityInfo.getReTime();

			int awardTime = TimeDateUtil.getCurrentTime() - startTime;
			if (awardTime < 0) {
				awardTime = 0;
			}
			if (awardTime > reTime) {
				awardTime = reTime;
			}
			reTime = reTime - awardTime;

			Struct_gcbz_777 struct_gcbz_777 = Config_gcbz_777.getIns().get(dispatchId);
			int[][] zsjl = struct_gcbz_777.getZsjl();
			int award = awardTime / AttackCityConst.XTCS_8250;
			crossData.putObject(AttackCityEnum.getAward, award * zsjl[0][2]);
			NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
		} catch (Exception e) {
			LogTool.error(e, this, "AttackCityIO check hid=" + hid);
		}
	}

}
