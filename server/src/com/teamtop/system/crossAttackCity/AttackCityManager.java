package com.teamtop.system.crossAttackCity;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import com.alibaba.fastjson.TypeReference;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.callback.Callback;
import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.netty.server.server2.Client_2;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.bag.BagFunction;
import com.teamtop.system.battle.BattleFunction;
import com.teamtop.system.crossAttackCity.cross.AttackCityCrossFunction;
import com.teamtop.system.crossAttackCity.cross.AttackCityEnum;
import com.teamtop.system.crossAttackCity.model.AttackCityLocal;
import com.teamtop.system.crossAttackCity.model.CityInfo;
import com.teamtop.system.crossAttackCity.model.ZhanBao;
import com.teamtop.system.daytask.DayTaskConst;
import com.teamtop.system.daytask.DayTaskFunction;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.global.GlobalSender;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.wujiang.WuJiangFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_gcbk_777;
import excel.config.Config_gcbz_777;
import excel.config.Config_gcbzcs;
import excel.struct.Struct_gcbk_777;
import excel.struct.Struct_gcbz_777;
import excel.struct.Struct_gcbzcs;
import io.netty.channel.Channel;

public class AttackCityManager {
	private static AttackCityManager ins = null;

	public static AttackCityManager getIns() {
		if (ins == null) {
			ins = new AttackCityManager();
		}
		return ins;
	}

	public void openUI(Hero hero) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.ATTACT_CITY)) {
				return;
			}
			CrossData crossData = new CrossData();

			Channel channel = Client_2.getIns().getCrossChannel();
			NettyWrite.writeXData(channel, CrossConst.CROSS_ATTACK_CITY_OPEN_UI, crossData, new Callback() {
				@Override
				public void dataReci(Channel channel, CrossData crossData) {
					try {
						AttackCityLocal local = hero.getAttackCityLocal();
						int countAward = local.getCountAward();
						int reTime = local.getReTime();
						int dispatchId = local.getDispatchId();
						List<Object[]> cityInfos = new ArrayList<>();
							Type type1 = new TypeReference<ConcurrentHashMap<Integer, CityInfo>>() {
							}.getType();
							ConcurrentHashMap<Integer, CityInfo> cityInfoMap = crossData
									.getObject(AttackCityEnum.AttackCity, type1);
						if (cityInfoMap != null) {
							Iterator<Integer> iterator = cityInfoMap.keySet().iterator();
							// if (cityInfoMap.get(dispatchId) == null) {
							// local.setDispatchId(0);
							// }
							while (iterator.hasNext()) {
								Integer next = iterator.next();
								CityInfo cityInfo = cityInfoMap.get(next);
								if (cityInfo == null) {
									continue;
								}
								if (dispatchId == next && cityInfo.getHid() != hero.getId()) {
									local.setDispatchId(0);
								}
								cityInfos.add(new Object[] { cityInfo.getCityId(), cityInfo.getHid(),
									cityInfo.getName(), cityInfo.getStrength(), cityInfo.getIcon(), cityInfo.getFrame(),
										cityInfo.getShowTime() });
								if (cityInfo.getHid() == hero.getId()) {
									Struct_gcbz_777 struct_gcbz_777 = Config_gcbz_777.getIns().get(cityInfo.getCityId());
									int[][] zsjl = struct_gcbz_777.getZsjl();

									int awardTime = TimeDateUtil.getCurrentTime() - cityInfo.getStartTime();
									if (awardTime < 0) {
										awardTime = 0;
									}
									if (awardTime > reTime) {
										awardTime = reTime;
									}
									reTime = reTime - awardTime;
									int award = awardTime / AttackCityConst.XTCS_8250;
									countAward = local.getCountAward()
											+ award * zsjl[0][2];
								}
							}
						}
						int cityId = local.getCityId();
						Set<Integer> rePassSet = local.getRePassSet();
						int canState = 0;
						if (rePassSet.contains(cityId)) {
							canState = 1;// 可挑战玩家
						}
						AttackCitySender.sendCmd_12052(hero.getId(), local.getCityId(), local.getDispatchId(),
								reTime > 0 ? reTime : 0,
								countAward > AttackCityConst.XTCS_8251[0][2] ? AttackCityConst.XTCS_8251[0][2]
										: countAward,canState,cityInfos.toArray(), local.getNd(), local.getChoose(), local.getTimes(),local.getBuyTimes());
						AttackCityCrossFunction.getIns().updateRedPoint(hero, countAward);
						// System.out.println("子服当前时间::" + TimeDateUtil.pringNow());
					} catch (Exception e) {
						LogTool.error(e, AttackCityManager.class, "openUI has wrong");
					}
				}
			});
		} catch (Exception e) {
			LogTool.error(e, AttackCityManager.class, "openUI has wrong");
		}
	}

	/**
	 * 购买次数
	 * 
	 * @param hero
	 * @param num
	 */
	public void buyTimes(Hero hero, int num) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.ATTACT_CITY)) {
				return;
			}
			if (num == 0) {
				return;
			}
			AttackCityLocal local = hero.getAttackCityLocal();
			int buyTimes = local.getBuyTimes();

			Struct_gcbzcs struct_gcbzcs = Config_gcbzcs.getIns().get(buyTimes + num);
			if (struct_gcbzcs == null) {
				// 已达到最大购买次数
				AttackCitySender.sendCmd_12074(hero.getId(), 1, buyTimes, local.getTimes());
				return;
			}
			int[][] countUse = {{4,0,0}};
			// 累加购买次数元宝消耗
			for (int i = buyTimes + 1; i < buyTimes + num + 1; i++) {
				Struct_gcbzcs struct_gcbzcs2 = Config_gcbzcs.getIns().get(i);
				int[][] xh = struct_gcbzcs2.getXh();
				countUse[0][2] += xh[0][2];
			}

			if (!UseAddUtil.canUse(hero, countUse)) {
				// 货币不足
				AttackCitySender.sendCmd_12074(hero.getId(), 2, buyTimes, local.getTimes());
				return;
			}

			UseAddUtil.use(hero, countUse, SourceGoodConst.ATTACK_CITY_BUY_COST, false);
			local.setBuyTimes(buyTimes + num);
			local.setTimes(local.getTimes() + num);

			AttackCitySender.sendCmd_12074(hero.getId(), 0, local.getBuyTimes(), local.getTimes());

		} catch (Exception e) {
			LogTool.error(e, AttackCityManager.class, "refresh has wrong");
		}
	}


	/**
	 * 重置
	 * 
	 * @param hero
	 * @param state
	 */
	public void again(Hero hero) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.ATTACT_CITY)) {
				return;
			}
			boolean open = AttackCityCrossFunction.getIns().isOpen();
			if (!open) {
				// 没到时间
				AttackCitySender.sendCmd_12054(hero.getId(), 1);
				return;
			}
			AttackCityLocal local = hero.getAttackCityLocal();
			int times = local.getTimes();
			if (times <= 0) {
				int prop1 = BagFunction.getIns().getGoodsNumBySysId(hero.getId(), AttackCityConst.ITEM_410439);
				if (prop1 <= 0) {
					// 没有挑战令
					AttackCitySender.sendCmd_12072(hero.getId(), 1, local.getCityId());
					return;
				} else {
					if (!UseAddUtil.canUse(hero, GameConst.TOOL, 1, AttackCityConst.ITEM_410439)) {
						return;
					}
					UseAddUtil.use(hero, GameConst.TOOL, 1, AttackCityConst.ITEM_410439,
							SourceGoodConst.ATTACK_CITY_REDUCE,
							true);
				}
			}
			// 领取奖励
			// getAward(hero);
			CrossData crossData = new CrossData();
			crossData.putObject(AttackCityEnum.hid, hero.getId());
			crossData.putObject(AttackCityEnum.dispatchId, local.getDispatchId());
			crossData.putObject(AttackCityEnum.reTime, local.getReTime());
			Channel channel = Client_2.getIns().getCrossChannel();
			NettyWrite.writeXData(channel, CrossConst.CROSS_ATTACK_CITY_REPLACE, crossData, new Callback() {
				@Override
				public void dataReci(Channel channel, CrossData crossData) {
					try {
						int state = crossData.getObject(AttackCityEnum.state, Integer.class);

						if (state == 0) {
							// 有驻守城池
							int getAward = crossData.getObject(AttackCityEnum.getAward, Integer.class);
							int reTime = crossData.getObject(AttackCityEnum.reTime, Integer.class);
							AttackCityLocal attackCityLocal = hero.getAttackCityLocal();
							attackCityLocal.setReTime(reTime);
							attackCityLocal.setCountAward(attackCityLocal.getCountAward() + getAward);
						}

						if (local.getTimes() > 0) {
							local.setTimes(local.getTimes() - 1);
						}

						local.setDispatchId(0);
						local.getRePassSet().clear();

						int id = local.getCityId();
						local.setCityId(id / 1000 * 1000 + 1);

						AttackCitySender.sendCmd_12072(hero.getId(), 0, local.getCityId());
						openUI(hero);
						AttackCityCrossFunction.getIns().updateRedPoint(hero, local.getCountAward());
					} catch (Exception e) {
						LogTool.error(e, AttackCityManager.class, "again has wrong");
					}
				}
			});
		} catch (Exception e) {
			LogTool.error(e, AttackCityManager.class, "again has wrong");
		}
	}

	/**
	 * 驻守城池
	 * 
	 * @param hero
	 * @param cityId
	 */
	public void dispatch(Hero hero, int cityId) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.ATTACT_CITY)) {
				return;
			}

			Struct_gcbz_777 config = Config_gcbz_777.getIns().get(cityId);
			if (config == null) {
				// 城池不存在
				AttackCitySender.sendCmd_12054(hero.getId(), 4);
				return;
			}
			AttackCityLocal attackCityLocal = hero.getAttackCityLocal();
			Set<Integer> rePassSet = attackCityLocal.getRePassSet();
			if (!rePassSet.contains(cityId)) {
				// 先通关本关卡
				AttackCitySender.sendCmd_12054(hero.getId(), 2);
				return;
			}
			boolean open = AttackCityCrossFunction.getIns().isOpen();
			if (!open) {
				// 没到驻守时间
				AttackCitySender.sendCmd_12054(hero.getId(), 1);
				return;
			}
			int reTime = attackCityLocal.getReTime();
			if (reTime <= 0) {
				attackCityLocal.setReTime(0);
				// 今日驻守时间已达上限
				AttackCitySender.sendCmd_12054(hero.getId(), 5);
				return;
			}
			int countAward = attackCityLocal.getCountAward();
			if (countAward >= AttackCityConst.XTCS_8251[0][2]) {
				// 物资已达到最大值 请领取
				AttackCitySender.sendCmd_12054(hero.getId(), 6);
				return;
			}
			/*if (dispatchId != 0) {
				getAward(hero);
			}*/

			CrossData crossData = new CrossData();
			crossData.putObject(AttackCityEnum.hid, hero.getId());
			crossData.putObject(AttackCityEnum.cityId, cityId);
			crossData.putObject(AttackCityEnum.dispatchId, attackCityLocal.getDispatchId());
			crossData.putObject(AttackCityEnum.getAward, attackCityLocal.getCountAward());
			crossData.putObject(AttackCityEnum.reTime, reTime);
			// crossData.putObject(AttackCityEnum.dispatchId, dispatchId);

			CityInfo cityInfo = new CityInfo();

			cityInfo.setBaowu(hero.getTreasureData());
			cityInfo.setTianshu(hero.getGodbook());
			cityInfo.setWuJiangId(hero.getJob());
			cityInfo.setReTime(reTime);
			cityInfo.setIcon(hero.getIcon());
			cityInfo.setFrame(hero.getFrame());
			cityInfo.setStrength(hero.getTotalStrength());
			cityInfo.setSkill(hero.getSkill());
			cityInfo.setFinalFightAttr(hero.getFinalFightAttr());
			cityInfo.setFigthMonsterSpirit(hero.getMonsterSpiritModel().getFightMonsterSpiri());
			cityInfo.setLittleLeader(hero.getLittleLeader());
			cityInfo.setName(hero.getNameZoneid());
			cityInfo.setCountryId(hero.getCountryType());
			cityInfo.setOfficial(hero.getOfficial());
			cityInfo.setTitleId(hero.getTitleId());
			int godSkillLevel = WuJiangFunction.getIns().getGodSkillLevel(hero.getJob(), hero.getWujiang());
			cityInfo.setGodSkillLevel(godSkillLevel);
			crossData.putObject(AttackCityEnum.cityInfo, cityInfo);

			Channel channel = Client_2.getIns().getCrossChannel();
			NettyWrite.writeXData(channel, CrossConst.CROSS_ATTACK_CITY_DISPATCH, crossData, new Callback() {
				@Override
				public void dataReci(Channel channel, CrossData crossData) {
					try {
						AttackCityLocal attackCityLocal = hero.getAttackCityLocal();
						// attackCityLocal.setDispatchId(0);// 重置驻守
						int state = crossData.getObject(AttackCityEnum.state, Integer.class);
						if (state == 0) {
							// 驻守成功
							int countAward = crossData.getObject(AttackCityEnum.getAward, Integer.class);
							int reTime = crossData.getObject(AttackCityEnum.reTime, Integer.class);
							attackCityLocal.setCountAward(countAward);
							attackCityLocal.setReTime(reTime);
							attackCityLocal.setDispatchId(cityId);
							LogTool.info("AttackCityManager dispatch success hid = " + hero.getId() + ",cityId = "
									+ cityId + ",nowtime = " + TimeDateUtil.pringNow(), AttackCityManager.class);
						} else if (state == 4) {
							attackCityLocal.setDispatchId(0);
							dispatch(hero, cityId);
							return;
						} else if (state == 5) {
							// 没到驻守时间
							AttackCitySender.sendCmd_12054(hero.getId(), 1);
							return;
						}
						AttackCitySender.sendCmd_12054(hero.getId(), state);
						openUI(hero);
						AttackCityCrossFunction.getIns().updateRedPoint(hero, attackCityLocal.getCountAward());
						// 每日任务
						DayTaskFunction.getIns().successDayTaskType(hero, DayTaskConst.DATTASK_TYPE33);
					} catch (Exception e) {
						LogTool.error(e, AttackCityManager.class, "dispatch has wrong");
					}
				}
			});

		} catch (Exception e) {
			LogTool.error(e, AttackCityManager.class, "dispatch has wrong");
		}
	}

	public void getAward(Hero hero) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.ATTACT_CITY)) {
				return;
			}
			AttackCityLocal attackCityLocal = hero.getAttackCityLocal();
			int dispatchId = attackCityLocal.getDispatchId();
			int countAward = attackCityLocal.getCountAward();
			if (dispatchId == 0 && countAward == 0) {
				// 未驻守
				AttackCitySender.sendCmd_12056(hero.getId(), 3);
				return;
			}

			CrossData crossData = new CrossData();
			crossData.putObject(AttackCityEnum.hid, hero.getId());
			crossData.putObject(AttackCityEnum.cityId, dispatchId);

			crossData.putObject(AttackCityEnum.getAward, countAward);
			int reTime = attackCityLocal.getReTime();
			crossData.putObject(AttackCityEnum.reTime, reTime);

			Channel channel = Client_2.getIns().getCrossChannel();
			NettyWrite.writeXData(channel, CrossConst.CROSS_ATTACK_CITY_GET_AWARD, crossData, new Callback() {
				@Override
				public void dataReci(Channel channel, CrossData crossData) {
					try {
						int state = crossData.getObject(AttackCityEnum.state, Integer.class);
						AttackCityLocal attackCityLocal = hero.getAttackCityLocal();
						if (state == 0) {
							int reTime = crossData.getObject(AttackCityEnum.reTime, Integer.class);
							attackCityLocal.setReTime(reTime);
							attackCityLocal.setCountAward(0);
							// attackCityLocal.setDispatchId(0);
						}
						openUI(hero);
						AttackCitySender.sendCmd_12056(hero.getId(), state);
						AttackCityCrossFunction.getIns().updateRedPoint(hero, attackCityLocal.getCountAward());
					} catch (Exception e) {
						LogTool.error(e, AttackCityManager.class, "getAward has wrong");
					}
				}
			});
		} catch (Exception e) {
			LogTool.error(e, AttackCityManager.class, "getAward has wrong");
		}
	}

	/**
	 * 挑战城池(玩家)
	 * 
	 * @param hero
	 * @param cityId
	 */
	public void plunder(Hero hero, int cityId) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.ATTACT_CITY)) {
				return;
			}
			boolean open = AttackCityCrossFunction.getIns().isOpen();
			if (!open) {
				// 没到活动时间
				AttackCitySender.sendCmd_12054(hero.getId(), 1);
				return;
			}
			AttackCityLocal local = hero.getAttackCityLocal();
			Set<Integer> rePassSet = local.getRePassSet();
			if (!rePassSet.contains(cityId)) {
				// 先通关本关卡
				AttackCitySender.sendCmd_12058(hero.getId(), 2, 0, cityId);
				return;
			}
			CrossData crossData = new CrossData();
			// crossData.putObject(AttackCityEnum.hid, playerId);

			crossData.putObject(AttackCityEnum.cityId, cityId);
			crossData.putObject(AttackCityEnum.hid, hero.getId());
			crossData.putObject(AttackCityEnum.dispatchId, local.getDispatchId());

			Channel channel = Client_2.getIns().getCrossChannel();
			NettyWrite.writeXData(channel, CrossConst.CROSS_ATTACK_CITY_PLUNDER, crossData, new Callback() {

				@Override
				public void dataReci(Channel channel, CrossData crossData) {
					int state = crossData.getObject(AttackCityEnum.state, Integer.class);
					if (state == 4) {
						// 没到活动时间
						AttackCitySender.sendCmd_12054(hero.getId(), 1);
						return;
					}
					if (state != 0) {
						AttackCitySender.sendCmd_12058(hero.getId(), state, 0, cityId);
						openUI(hero);
						return;
					}
					long hid = crossData.getObject(AttackCityEnum.hid, Long.class);
					CityInfo cityInfo = crossData.getObject(AttackCityEnum.cityInfo, CityInfo.class);
					long attHid = cityInfo.getHid();
					// local.setDispatchId(0);
					local.setAttckCityId(cityId);
					local.setAttckPlayerId(attHid);

					AttackCityCrossFunction.getIns().sendBattleHeroAttr(hero, cityInfo);
					AttackCitySender.sendCmd_12058(hero.getId(), 0, hid, cityId);
					// battleResult(hero, 1);
				}

			});
		} catch (Exception e) {
			LogTool.error(e, AttackCityManager.class, "plunder has wrong");
		}
	}

	public void openReportUI(Hero hero) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.ATTACT_CITY)) {
				return;
			}
			List<ZhanBao> list = AttackCityLocalCache.zhanBaoMap.get(hero.getId());
			List<Object[]> reportInfo = new ArrayList<>();
			if (list != null) {
				for (ZhanBao zb : list) {
					int type = zb.getType();
					if (type == 1) {
						// 对手赢了 等于 自己输了
						type = 2;
					} else {
						type = 1;
					}
					reportInfo.add(new Object[] { zb.getName(), type, zb.getCityId() });
				}
			}
			AttackCitySender.sendCmd_12070(hero.getId(), reportInfo.toArray());
			openUI(hero);
			AttackCityLocalCache.redPoint.remove(hero.getId());
			AttackCityLocalCache.redPointPushZhanBao.remove(hero.getId());

		} catch (Exception e) {
			LogTool.error(e, AttackCityManager.class, "openReportUI has wrong");
		}
	}

	public void openShopUI(Hero hero) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.ATTACT_CITY)) {
				return;
			}
			AttackCityLocal local = hero.getAttackCityLocal();

			List<Object[]> shopInfo = new ArrayList<>();
			for (Struct_gcbk_777 config : Config_gcbk_777.getIns().getSortList()) {
				Integer times = local.getShopMap().get(config.getId());
				if (times == null) {
					times = 0;
				}
				shopInfo.add(new Object[] { config.getId(), times });
			}
			int prop1 = BagFunction.getIns().getGoodsNumBySysId(hero.getId(), AttackCityConst.ITEM_410438);
			AttackCitySender.sendCmd_12066(hero.getId(), shopInfo.toArray(), prop1);
			openUI(hero);
		} catch (Exception e) {
			LogTool.error(e, AttackCityManager.class, "openShopUI has wrong");
		}
	}

	public void buyItem(Hero hero, int itemId) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.ATTACT_CITY)) {
				return;
			}
			AttackCityLocal local = hero.getAttackCityLocal();
			int prop1 = BagFunction.getIns().getGoodsNumBySysId(hero.getId(), AttackCityConst.ITEM_410438);

			Struct_gcbk_777 config = Config_gcbk_777.getIns().get(itemId);
			if (config == null) {
				// 商品配置不存在
				AttackCitySender.sendCmd_12068(hero.getId(), 1, itemId, prop1);
				return;
			}

			Integer times = local.getShopMap().get(itemId);
			if (times == null) {
				times = 0;
			}

			if (times >= config.getXg()) {
				// 超过限购
				AttackCitySender.sendCmd_12068(hero.getId(), 2, itemId, prop1);
				return;
			}

			if (!UseAddUtil.canUse(hero, config.getMoney())) {
				// 货币不足
				AttackCitySender.sendCmd_12068(hero.getId(), 3, itemId, prop1);
				return;
			}

			UseAddUtil.use(hero, config.getMoney(), SourceGoodConst.ATTACK_CITY_BUY_COST, false);

			local.getShopMap().put(itemId, times + 1);

			// 发送奖励
			UseAddUtil.add(hero, config.getItem(), SourceGoodConst.ATTACK_CITY_BUY_ADD, UseAddUtil.getDefaultMail(),
					true);

			AttackCitySender.sendCmd_12068(hero.getId(), 0, itemId,
					BagFunction.getIns().getGoodsNumBySysId(hero.getId(), AttackCityConst.ITEM_410438));
		} catch (Exception e) {
			LogTool.error(e, AttackCityManager.class, "buyItem has wrong");
		}
	}

	public void battleResult(Hero hero, int result) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.ATTACT_CITY)) {
				return;
			}
			AttackCityLocal local = hero.getAttackCityLocal();

			CrossData crossData = new CrossData();
			crossData.putObject(AttackCityEnum.hid, local.getAttckPlayerId());
			crossData.putObject(AttackCityEnum.result, result);
			crossData.putObject(AttackCityEnum.cityId, local.getAttckCityId());
			crossData.putObject(AttackCityEnum.zhanBao, hero.getNameZoneid());
			crossData.putObject(AttackCityEnum.addValue, hero.getTotalStrength());

			Channel channel = Client_2.getIns().getCrossChannel();
			NettyWrite.writeXData(channel, CrossConst.CROSS_ATTACK_CITY_BATTLE_RESULT, crossData, new Callback() {

				@Override
				public void dataReci(Channel channel, CrossData crossData) {
					// int award = crossData.getObject(AttackCityEnum.getAward, Integer.class);
					int state = crossData.getObject(AttackCityEnum.state, Integer.class);
					int cityId = crossData.getObject(AttackCityEnum.cityId, Integer.class);
					int result2 = crossData.getObject(AttackCityEnum.result, Integer.class);
					if (state == 3) {
						// 挑战的城池已换玩家
						result2 = 3;
					}
					// long eplayerId = crossData.getObject(AttackCityEnum.hid, Long.class);
					local.setAttckCityId(0);
					local.setAttckPlayerId(0);

					if (result2 == 1) {
						// Struct_gcbz_777 struct_gcbz_777 = Config_gcbz_777.getIns().get(cityId);
						// int[][] zsjl = struct_gcbz_777.getZsjl();
						dispatch(hero, cityId);
					}
					AttackCitySender.sendCmd_12060(hero.getId(), result2, cityId);
					openUI(hero);
				}

			});

		} catch (Exception e) {
			LogTool.error(e, AttackCityManager.class, "battleResult has wrong");
		}
	}

	/**
	 * 挑战NPC
	 * 
	 * @param hero
	 */
	public void attackNPC(Hero hero, int cityId) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.ATTACT_CITY)) {
				return;
			}
			boolean open = AttackCityCrossFunction.getIns().isOpen();
			if (!open) {
				// 没到活动时间
				AttackCitySender.sendCmd_12054(hero.getId(), 1);
				return;
			}
			AttackCityLocal attackCityLocal = hero.getAttackCityLocal();
			int cId = attackCityLocal.getCityId();
			if (cId != cityId) {
				// 挑战非法id 失败发1就行了
				AttackCitySender.sendCmd_12062(hero.getId(), 1, cityId, 0);
				return;
			}
			Set<Integer> rePassSet = attackCityLocal.getRePassSet();
			if (rePassSet.contains(cityId)) {
				// 重复挑战 失败发1就行了
				AttackCitySender.sendCmd_12062(hero.getId(), 1, cityId, 0);
				return;
			}

			Struct_gcbz_777 gcbz_777 = Config_gcbz_777.getIns().get(cityId);
			if (gcbz_777 == null) {
				// 配置表不存在 失败发1就行了
				AttackCitySender.sendCmd_12062(hero.getId(), 1, cityId, 0);
				return;
			}
			int npcid = gcbz_777.getBoss();
			int result = BattleFunction.checkWinGuanqiaBoss(hero, npcid);// 0:失败，1：成功，2：由前端结果决定
			AttackCitySender.sendCmd_12062(hero.getId(), 0, cityId, result);
			// 每日任务
			DayTaskFunction.getIns().successDayTaskType(hero, DayTaskConst.DATTASK_TYPE33);
		} catch (Exception e) {
			LogTool.error(e, AttackCityManager.class, "attackNPC has wrong");
		}
	}

	/**
	 * 击败关卡boss 申请奖励
	 * 
	 * @param hero
	 */
	public void battleNPCResult(Hero hero) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.ATTACT_CITY)) {
				return;
			}
			AttackCityLocal attackCityLocal = hero.getAttackCityLocal();
			int cityId = attackCityLocal.getCityId();
			Struct_gcbz_777 gcbz_777 = Config_gcbz_777.getIns().get(cityId);
			int xyg = gcbz_777.getXyg();
			int tgs = gcbz_777.getTgs();
			if (tgs / 1000 == attackCityLocal.getNd() && xyg != 0 && xyg / 1000 == (tgs / 1000) + 1) {
				// 挑战成功最后一关
				attackCityLocal.setNd(xyg / 1000);
			}
			Set<Integer> passSet = attackCityLocal.getPassSet();
			Set<Integer> rePassSet = attackCityLocal.getRePassSet();
			passSet.add(cityId);
			rePassSet.add(cityId);
			// int npcid = gcbz_777.getBoss();

			List<Object[]> dropTips = new ArrayList<>();
			// 发送胜利奖励
			int[][] tgjl = gcbz_777.getTgjl();
			UseAddUtil.add(hero, tgjl, SourceGoodConst.ATTACK_CITY_AWARD_ADD, UseAddUtil.getDefaultMail(), true);

			for (int i = 0; i < tgjl.length; i++) {
				dropTips.add(new Object[] { tgjl[i][0], tgjl[i][1], tgjl[i][2], 0 });
			}

			// 弹出胜利界面
			GlobalSender.sendCmd_262(hero.getId(), 1, dropTips.toArray());
			openUI(hero);

		} catch (Exception e) {
			LogTool.error(e, AttackCityManager.class, "battleNPCResult has wrong");
		}
	}

	/**
	 * 移动到下一关
	 * 
	 * @param hero
	 */
	public void move(Hero hero, int cid) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.ATTACT_CITY)) {
				return;
			}
			boolean open = AttackCityCrossFunction.getIns().isOpen();
			if (!open) {
				// 没到时间
				AttackCitySender.sendCmd_12054(hero.getId(), 1);
				return;
			}
			AttackCityLocal attackCityLocal = hero.getAttackCityLocal();
			int cityId = attackCityLocal.getCityId();
			Set<Integer> rePassSet = attackCityLocal.getRePassSet();
			if (!rePassSet.contains(cityId)) {
				// 非法移动 没有通关之前的关卡
				AttackCitySender.sendCmd_12076(hero.getId(), 1, cityId);
				return;
			}
			Struct_gcbz_777 gcbz_777 = Config_gcbz_777.getIns().get(cityId);
			int nd = attackCityLocal.getNd();
			int xygnd = gcbz_777.getXyg() / 1000;
			if (nd < xygnd) {
				// 第二天才可以挑战
				AttackCitySender.sendCmd_12076(hero.getId(), 2, cityId);
				return;
			}
			int xyg = gcbz_777.getXyg();
			if (xyg != 0 && xyg == cid) {
				attackCityLocal.setCityId(xyg);
			}
			AttackCitySender.sendCmd_12076(hero.getId(), 0, attackCityLocal.getCityId());

		} catch (Exception e) {
			LogTool.error(e, AttackCityManager.class, "move has wrong");
		}
	}

	/**
	 * 选择难度
	 * 
	 * @param hero
	 */
	public void choose(Hero hero, int nd, int cityId) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.ATTACT_CITY)) {
				return;
			}
			AttackCityLocal attackCityLocal = hero.getAttackCityLocal();
			if (nd > attackCityLocal.getNd()) {
				// 未开启该难度
				AttackCitySender.sendCmd_12078(hero.getId(), 1, nd, cityId);
				return;
			}
			attackCityLocal.setCityId(cityId);
			attackCityLocal.setChoose(1);
			AttackCitySender.sendCmd_12078(hero.getId(), 0, nd, cityId);
			openUI(hero);

		} catch (Exception e) {
			LogTool.error(e, AttackCityManager.class, "choose has wrong");
		}
	}

	/**
	 * 查看宝箱
	 * 
	 * @param hero
	 */
	public void checkBox(Hero hero) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.ATTACT_CITY)) {
				return;
			}
			AttackCityLocal attackCityLocal = hero.getAttackCityLocal();
			CrossData crossData = new CrossData();
			crossData.putObject(AttackCityEnum.cityId, attackCityLocal.getDispatchId());
			crossData.putObject(AttackCityEnum.hid, hero.getId());

			Channel channel = Client_2.getIns().getCrossChannel();
			NettyWrite.writeXData(channel, CrossConst.CROSS_ATTACK_CITY_CHECK, crossData, new Callback() {
				@Override
				public void dataReci(Channel channel, CrossData crossData) {
					int countAward = crossData.getObject(AttackCityEnum.getAward, Integer.class);
					AttackCityLocal local = hero.getAttackCityLocal();
					AttackCitySender.sendCmd_12082(hero.getId(), local.getCountAward() + countAward);

				}
			});
		} catch (Exception e) {
			LogTool.error(e, AttackCityManager.class, "checkBox has wrong");
		}
	}
}
