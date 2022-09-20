package com.teamtop.system.guardArea;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.TypeReference;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.callback.Callback;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.netty.server.server2.Client_2;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.guardArea.cross.GuardAreaCrossFunction;
import com.teamtop.system.guardArea.cross.GuardAreaEnum;
import com.teamtop.system.guardArea.model.CityInfo;
import com.teamtop.system.guardArea.model.GuardArea;
import com.teamtop.system.guardArea.model.GuardAreaLocal;
import com.teamtop.system.guardArea.model.ZhanBao;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.wujiang.WuJiangFunction;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_hero_211;
import excel.config.Config_xtcs_004;
import excel.config.Config_zssf_294;
import excel.config.Config_zssfstore_294;
import excel.struct.Struct_hero_211;
import excel.struct.Struct_zssf_294;
import excel.struct.Struct_zssfstore_294;
import io.netty.channel.Channel;

public class GuardAreaManager {
	private static GuardAreaManager ins = null;

	public static GuardAreaManager getIns() {
		if (ins == null) {
			ins = new GuardAreaManager();
		}
		return ins;
	}

	public void openUI(Hero hero) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.GUARD_AREA)) {
				return;
			}
			GuardAreaLocal local = hero.getGuardAreaLocal();

			CrossData crossData = new CrossData();
			crossData.putObject(GuardAreaEnum.hid, hero.getId());
			crossData.putObject(GuardAreaEnum.belongZoneid, hero.getZoneid());

			Channel channel = Client_2.getIns().getCrossChannel();
			NettyWrite.writeXData(channel, CrossConst.CROSS_GUARD_AREA_OPEN_UI, crossData, new Callback() {
				@Override
				public void dataReci(Channel channel, CrossData crossData) {
					try {
						GuardArea guardArea = crossData.getObject(GuardAreaEnum.guardArea, GuardArea.class);
						List<Object[]> cityInfos = new ArrayList<>();
						for (Struct_zssf_294 config : Config_zssf_294.getIns().getSortList()) {
							CityInfo cityInfo = guardArea.getCityInfoMap().get(config.getId());
							cityInfos.add(new Object[] { cityInfo.getCityId(), cityInfo.getState(),
									cityInfo.getWuJiangId(), cityInfo.getStartTime() + config.getTime(),
									cityInfo.getPlunderTimes(), (int) (cityInfo.getAddValue() * 100000) });
						}

						GuardAreaSender.sendCmd_10902(hero.getId(), local.getPlunderTimes(), cityInfos.toArray());
					} catch (Exception e) {
						LogTool.error(e, GuardAreaManager.class, "openUI has wrong");
					}
				}
			});
		} catch (Exception e) {
			LogTool.error(e, GuardAreaManager.class, "openUI has wrong");
		}
	}

	public void dispatch(Hero hero, int cityId, int wuJiangId) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.GUARD_AREA)) {
				return;
			}

			if (!hero.getWujiang().getWujiangs().containsKey(wuJiangId)) {
				// 武将不存在
				GuardAreaSender.sendCmd_10904(hero.getId(), 5);
				return;
			}

			Struct_zssf_294 config = Config_zssf_294.getIns().get(cityId);
			if (config == null) {
				// 城池不存在
				GuardAreaSender.sendCmd_10904(hero.getId(), 5);
				return;
			}
			int vipLv = hero.getVipLv();
			int rLv = hero.getReincarnationLevel();

			if (rLv < config.getLh() && vipLv < config.getVip()) {
				// 开启条件不足
				GuardAreaSender.sendCmd_10904(hero.getId(), 6);
				return;
			}

			Struct_hero_211 wjConfig = Config_hero_211.getIns().get(wuJiangId);
			if (wjConfig == null) {
				// 武将配置不存在
				GuardAreaSender.sendCmd_10904(hero.getId(), 7);
				return;
			}
			double pinzhi = wjConfig.getPinzhi();
			double pinzhiAdd = (double) Config_xtcs_004.getIns().get(GuardAreaConst.CONST_8002).getNum() / 100000;
			double star = hero.getWujiang().getWujiangs().get(wuJiangId).getStar();
			double starAdd = (double) Config_xtcs_004.getIns().get(GuardAreaConst.CONST_8003).getNum() / 100000;
			if (pinzhi == 4) {
				starAdd = (double) Config_xtcs_004.getIns().get(GuardAreaConst.CONST_8008).getNum() / 100000;
			} else if (pinzhi == 5) {
				starAdd = (double) Config_xtcs_004.getIns().get(GuardAreaConst.CONST_8009).getNum() / 100000;
			} else if (pinzhi == 6 || pinzhi == 7) {
				starAdd = (double) Config_xtcs_004.getIns().get(GuardAreaConst.CONST_8010).getNum() / 100000;
			} else if (pinzhi == 8) {
				starAdd = (double) Config_xtcs_004.getIns().get(GuardAreaConst.CONST_8011).getNum() / 100000;
			}
			double addValue = pinzhi * pinzhiAdd + star * starAdd;

			CrossData crossData = new CrossData();
			crossData.putObject(GuardAreaEnum.hid, hero.getId());
			crossData.putObject(GuardAreaEnum.cityId, cityId);
			crossData.putObject(GuardAreaEnum.wuJiangId, wuJiangId);
			crossData.putObject(GuardAreaEnum.addValue, addValue);

			CityInfo cityInfo = new CityInfo();
			cityInfo.setBaowu(hero.getTreasureData());
			cityInfo.setTianshu(hero.getGodbook());
			cityInfo.setStrength(hero.getTotalStrength());
			cityInfo.setSkill(hero.getSkill());
			cityInfo.setFinalFightAttr(hero.getFinalFightAttr());
			cityInfo.setFigthMonsterSpirit(hero.getMonsterSpiritModel().getFightMonsterSpiri());
			cityInfo.setLittleLeader(hero.getLittleLeader());
			cityInfo.setName(hero.getNameZoneid());
			cityInfo.setCountryId(hero.getCountryType());
			int godSkillLevel = WuJiangFunction.getIns().getGodSkillLevel(hero.getJob(), hero.getWujiang());
			cityInfo.setGodSkillLevel(godSkillLevel);
			crossData.putObject(GuardAreaEnum.cityInfo, cityInfo);

			Channel channel = Client_2.getIns().getCrossChannel();
			NettyWrite.writeXData(channel, CrossConst.CROSS_GUARD_AREA_DISPATCH, crossData, new Callback() {
				@Override
				public void dataReci(Channel channel, CrossData crossData) {
					try {
						int state = crossData.getObject(GuardAreaEnum.state, Integer.class);
						GuardAreaSender.sendCmd_10904(hero.getId(), state);

						GuardAreaCrossFunction.getIns().updateRedPoint(hero);
					} catch (Exception e) {
						LogTool.error(e, GuardAreaManager.class, "dispatch has wrong");
					}
				}
			});

		} catch (Exception e) {
			LogTool.error(e, GuardAreaManager.class, "dispatch has wrong");
		}
	}

	public void getAward(Hero hero, int cityId) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.GUARD_AREA)) {
				return;
			}
			Struct_zssf_294 config = Config_zssf_294.getIns().get(cityId);
			if (config == null) {
				// 城池不存在
				return;
			}
			CrossData crossData = new CrossData();
			crossData.putObject(GuardAreaEnum.hid, hero.getId());
			crossData.putObject(GuardAreaEnum.cityId, cityId);

			Channel channel = Client_2.getIns().getCrossChannel();
			NettyWrite.writeXData(channel, CrossConst.CROSS_GUARD_AREA_GET_AWARD, crossData, new Callback() {
				@Override
				public void dataReci(Channel channel, CrossData crossData) {
					try {
						int state = crossData.getObject(GuardAreaEnum.state, Integer.class);
						GuardAreaSender.sendCmd_10906(hero.getId(), state);

						GuardAreaCrossFunction.getIns().updateRedPoint(hero);
					} catch (Exception e) {
						LogTool.error(e, GuardAreaManager.class, "getAward has wrong");
					}
				}
			});
		} catch (Exception e) {
			LogTool.error(e, GuardAreaManager.class, "getAward has wrong");
		}
	}

	public void recall(Hero hero, int cityId) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.GUARD_AREA)) {
				return;
			}

			Struct_zssf_294 config = Config_zssf_294.getIns().get(cityId);
			if (config == null) {
				// 城池不存在
				return;
			}
			CrossData crossData = new CrossData();
			crossData.putObject(GuardAreaEnum.hid, hero.getId());
			crossData.putObject(GuardAreaEnum.cityId, cityId);

			Channel channel = Client_2.getIns().getCrossChannel();
			NettyWrite.writeXData(channel, CrossConst.CROSS_GUARD_AREA_RECALL, crossData, new Callback() {
				@Override
				public void dataReci(Channel channel, CrossData crossData) {
					try {
						int state = crossData.getObject(GuardAreaEnum.state, Integer.class);
						GuardAreaSender.sendCmd_10908(hero.getId(), state);

						GuardAreaCrossFunction.getIns().updateRedPoint(hero);
					} catch (Exception e) {
						LogTool.error(e, GuardAreaManager.class, "recall has wrong");
					}
				}
			});

		} catch (Exception e) {
			LogTool.error(e, GuardAreaManager.class, "recall has wrong");
		}
	}

	public void openPlunderUI(Hero hero) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.GUARD_AREA)) {
				return;
			}
			GuardAreaLocal local = hero.getGuardAreaLocal();

			CrossData crossData = new CrossData();
			crossData.putObject(GuardAreaEnum.hid, hero.getId());

			Channel channel = Client_2.getIns().getCrossChannel();
			NettyWrite.writeXData(channel, CrossConst.CROSS_GUARD_AREA_OPEN_PLUNDER_UI, crossData, new Callback() {

				@Override
				public void dataReci(Channel channel, CrossData crossData) {
					Type classType = new TypeReference<Map<Integer, CityInfo>>() {
					}.getType();
					Map<Integer, CityInfo> plunderMap = crossData.getObject(GuardAreaEnum.plunderMap, classType);
					List<Object[]> plunderInfo = new ArrayList<>();

					int maxPlunderTimes = Config_xtcs_004.getIns().get(GuardAreaConst.CONST_8007).getNum();

					List<Integer> plunderList = GuardAreaLocalCache.plunderMap.get(hero.getId());
					if (plunderList == null) {
						plunderList = new ArrayList<>();
						GuardAreaLocalCache.plunderMap.put(hero.getId(), plunderList);
					}
					for (Struct_zssf_294 config : Config_zssf_294.getIns().getSortList()) {
						CityInfo cityInfo = plunderMap.get(config.getId());
						if (cityInfo == null) {
							continue;
						}
						int isP = 0;
						if (plunderList.contains(cityInfo.getCityId())) {
							isP = 1;
						}
						plunderInfo
								.add(new Object[] { cityInfo.getName(), cityInfo.getWuJiangId(), cityInfo.getStrength(),
										cityInfo.getCityId(), maxPlunderTimes - cityInfo.getPlunderTimes(), isP });
					}
					int freeRefreshTime = local.getFreeRefreshTime();
					if (freeRefreshTime != 0) {
						freeRefreshTime += Config_xtcs_004.getIns().get(GuardAreaConst.CONST_8006).getNum();
					}
					GuardAreaSender.sendCmd_10910(hero.getId(), plunderInfo.toArray(), freeRefreshTime);
				}

			});
		} catch (Exception e) {
			LogTool.error(e, GuardAreaManager.class, "openPlunderUI has wrong");
		}
	}

	public void plunder(Hero hero, int cityId) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.GUARD_AREA)) {
				return;
			}
			GuardAreaLocal local = hero.getGuardAreaLocal();

			if (local.getPlunderTimes() <= 0) {
				// 掠夺次数不足
				GuardAreaSender.sendCmd_10912(hero.getId(), 6, 0);
				return;
			}

			List<Integer> plunderList = GuardAreaLocalCache.plunderMap.get(hero.getId());
			if (plunderList == null) {
				plunderList = new ArrayList<>();
				GuardAreaLocalCache.plunderMap.put(hero.getId(), plunderList);
			}
			if (plunderList.contains(cityId)) {
				// 已掠夺
				GuardAreaSender.sendCmd_10912(hero.getId(), 7, 0);
				return;
			}

			CrossData crossData = new CrossData();
			crossData.putObject(GuardAreaEnum.hid, hero.getId());
			crossData.putObject(GuardAreaEnum.cityId, cityId);

			Channel channel = Client_2.getIns().getCrossChannel();
			NettyWrite.writeXData(channel, CrossConst.CROSS_GUARD_AREA_PLUNDER, crossData, new Callback() {

				@Override
				public void dataReci(Channel channel, CrossData crossData) {
					int state = crossData.getObject(GuardAreaEnum.state, Integer.class);
					if (state != 0) {
						GuardAreaSender.sendCmd_10912(hero.getId(), state, 0);
						return;
					}
					long hid = crossData.getObject(GuardAreaEnum.hid, Long.class);
					CityInfo cityInfo = crossData.getObject(GuardAreaEnum.cityInfo, CityInfo.class);

					local.setAttckCityId(cityId);
					local.setPlunderTimes(local.getPlunderTimes() - 1);
					GuardAreaCrossFunction.getIns().sendBattleHeroAttr(hero, cityInfo);
					GuardAreaSender.sendCmd_10912(hero.getId(), 0, hid);
				}

			});
		} catch (Exception e) {
			LogTool.error(e, GuardAreaManager.class, "plunder has wrong");
		}
	}

	public void refresh(Hero hero, int state) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.GUARD_AREA)) {
				return;
			}
			GuardAreaLocal local = hero.getGuardAreaLocal();
			int freeRefreshTime = local.getFreeRefreshTime();
			freeRefreshTime += Config_xtcs_004.getIns().get(GuardAreaConst.CONST_8006).getNum();
			freeRefreshTime = freeRefreshTime - TimeDateUtil.getCurrentTime();
			if (state == 0) {
				// 免费刷新
				if (freeRefreshTime > 0) {
					// 时间未到
					List<Object[]> plunderInfo = new ArrayList<>();
					GuardAreaSender.sendCmd_10914(hero.getId(), plunderInfo.toArray(), freeRefreshTime, 1);
					return;
				}
				local.setFreeRefreshTime(TimeDateUtil.getCurrentTime());
			} else {
				int cost[][] = Config_xtcs_004.getIns().get(GuardAreaConst.CONST_8005).getOther();
				if (!UseAddUtil.canUse(hero, cost)) {
					// 货币不足
					List<Object[]> plunderInfo = new ArrayList<>();
					GuardAreaSender.sendCmd_10914(hero.getId(), plunderInfo.toArray(), freeRefreshTime, 2);
					return;
				}
				UseAddUtil.use(hero, cost, SourceGoodConst.GUARD_AREA_BUY_COST, false);
			}

			CrossData crossData = new CrossData();
			crossData.putObject(GuardAreaEnum.hid, hero.getId());

			Channel channel = Client_2.getIns().getCrossChannel();
			NettyWrite.writeXData(channel, CrossConst.CROSS_GUARD_AREA_REFRESH, crossData, new Callback() {

				@Override
				public void dataReci(Channel channel, CrossData crossData) {
					Type classType = new TypeReference<Map<Integer, CityInfo>>() {
					}.getType();
					Map<Integer, CityInfo> plunderMap = crossData.getObject(GuardAreaEnum.plunderMap, classType);
					List<Object[]> plunderInfo = new ArrayList<>();

					int maxPlunderTimes = Config_xtcs_004.getIns().get(GuardAreaConst.CONST_8007).getNum();

					for (Struct_zssf_294 config : Config_zssf_294.getIns().getSortList()) {
						CityInfo cityInfo = plunderMap.get(config.getId());
						if (cityInfo == null) {
							continue;
						}
						plunderInfo
								.add(new Object[] { cityInfo.getName(), cityInfo.getWuJiangId(), cityInfo.getStrength(),
										cityInfo.getCityId(), maxPlunderTimes - cityInfo.getPlunderTimes() });
					}
					int freeRefreshTime = local.getFreeRefreshTime();
					if (freeRefreshTime != 0) {
						freeRefreshTime += Config_xtcs_004.getIns().get(GuardAreaConst.CONST_8006).getNum();
					}

					List<Integer> plunderList = GuardAreaLocalCache.plunderMap.get(hero.getId());
					plunderList = new ArrayList<>();
					GuardAreaLocalCache.plunderMap.put(hero.getId(), plunderList);

					GuardAreaSender.sendCmd_10914(hero.getId(), plunderInfo.toArray(), freeRefreshTime, 0);
				}

			});
		} catch (Exception e) {
			LogTool.error(e, GuardAreaManager.class, "refresh has wrong");
		}
	}

	public void openReportUI(Hero hero) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.GUARD_AREA)) {
				return;
			}
			List<ZhanBao> list = GuardAreaLocalCache.zhanBaoMap.get(hero.getId());
			List<Object[]> reportInfo = new ArrayList<>();
			if(list != null) {
				for (ZhanBao zb : list) {
					reportInfo.add(new Object[] { zb.getName(), zb.getType(), zb.getCityId() });
				}
			}
			GuardAreaSender.sendCmd_10916(hero.getId(), reportInfo.toArray());

			GuardAreaLocalCache.redPointPushZhanBao.remove(hero.getId());

		} catch (Exception e) {
			LogTool.error(e, GuardAreaManager.class, "openReportUI has wrong");
		}
	}

	public void openShopUI(Hero hero) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.GUARD_AREA)) {
				return;
			}
			GuardAreaLocal local = hero.getGuardAreaLocal();

			List<Object[]> shopInfo = new ArrayList<>();
			for (Struct_zssfstore_294 config : Config_zssfstore_294.getIns().getSortList()) {
				Integer times = local.getShopMap().get(config.getId());
				if (times == null) {
					times = 0;
				}
				shopInfo.add(new Object[] { config.getId(), times });
			}
			GuardAreaSender.sendCmd_10918(hero.getId(), shopInfo.toArray(), local.getHonorCoin());
		} catch (Exception e) {
			LogTool.error(e, GuardAreaManager.class, "openShopUI has wrong");
		}
	}

	public void buyItem(Hero hero, int itemId) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.GUARD_AREA)) {
				return;
			}
			GuardAreaLocal local = hero.getGuardAreaLocal();

			Struct_zssfstore_294 config = Config_zssfstore_294.getIns().get(itemId);
			if (config == null) {
				// 商品配置不存在
				GuardAreaSender.sendCmd_10920(hero.getId(), 1, itemId, local.getHonorCoin());
				return;
			}

			Integer times = local.getShopMap().get(itemId);
			if (times == null) {
				times = 0;
			}

			if (times >= config.getTime()) {
				// 超过限购
				GuardAreaSender.sendCmd_10920(hero.getId(), 2, itemId, local.getHonorCoin());
				return;
			}

			if (!UseAddUtil.canUse(hero, config.getConsume())) {
				// 货币不足
				GuardAreaSender.sendCmd_10920(hero.getId(), 3, itemId, local.getHonorCoin());
				return;
			}

			UseAddUtil.use(hero, config.getConsume(), SourceGoodConst.GUARD_AREA_BUY_COST, false);

			local.getShopMap().put(itemId, times + 1);

			// 发送奖励
			UseAddUtil.add(hero, config.getReward(), SourceGoodConst.GUARD_AREA_BUY_ADD, UseAddUtil.getDefaultMail(),
					true);

			GuardAreaSender.sendCmd_10920(hero.getId(), 0, itemId, local.getHonorCoin());
		} catch (Exception e) {
			LogTool.error(e, GuardAreaManager.class, "buyItem has wrong");
		}
	}

	public void battleResult(Hero hero, int result) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.GUARD_AREA)) {
				return;
			}
			GuardAreaLocal local = hero.getGuardAreaLocal();

			CrossData crossData = new CrossData();
			crossData.putObject(GuardAreaEnum.hid, hero.getId());
			crossData.putObject(GuardAreaEnum.result, result);
			crossData.putObject(GuardAreaEnum.cityId, local.getAttckCityId());
			crossData.putObject(GuardAreaEnum.zhanBao, hero.getName());
			crossData.putObject(GuardAreaEnum.addValue, hero.getTotalStrength());

			Channel channel = Client_2.getIns().getCrossChannel();
			NettyWrite.writeXData(channel, CrossConst.CROSS_GUARD_AREA_BATTLE_RESULT, crossData, new Callback() {

				@Override
				public void dataReci(Channel channel, CrossData crossData) {
					int state = crossData.getObject(GuardAreaEnum.state, Integer.class);
					int cityId = crossData.getObject(GuardAreaEnum.cityId, Integer.class);
					int result2 = crossData.getObject(GuardAreaEnum.result, Integer.class);
					local.setAttckCityId(0);

					if (result2 == 1) {
						int award[][] = CommonUtil.copyArrayAndNum(Config_zssf_294.getIns().get(cityId).getReward(), 2);
						// 发送奖励
						UseAddUtil.add(hero, award, SourceGoodConst.GUARD_AREA_BUY_ADD, UseAddUtil.getDefaultMail(),
								true);

						List<Integer> plunderList = GuardAreaLocalCache.plunderMap.get(hero.getId());
						if (plunderList == null) {
							plunderList = new ArrayList<>();
							GuardAreaLocalCache.plunderMap.put(hero.getId(), plunderList);
						}
						plunderList.add(cityId);
					}
					GuardAreaSender.sendCmd_10922(hero.getId(), result2, cityId);
				}

			});

		} catch (Exception e) {
			LogTool.error(e, GuardAreaManager.class, "battleResult has wrong");
		}
	}
}
