package com.teamtop.system.guardArea.cross;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.battle.BattleFunction;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.guardArea.GuardAreaConst;
import com.teamtop.system.guardArea.GuardAreaLocalCache;
import com.teamtop.system.guardArea.model.CityInfo;
import com.teamtop.system.guardArea.model.GuardArea;
import com.teamtop.system.guardArea.model.ZhanBao;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_xtcs_004;
import excel.config.Config_zssf_294;
import excel.struct.Struct_zssf_294;
import io.netty.channel.Channel;

public class GuardAreaIO {

	private static GuardAreaIO ins;

	public GuardAreaIO() {
	}

	public static synchronized GuardAreaIO getIns() {
		if (ins == null) {
			ins = new GuardAreaIO();
		}
		return ins;
	}

	public void openUI(Channel channel, CrossData crossData) {
		int cmd = CrossConst.CROSS_GUARD_AREA_OPEN_UI;
		long hid = crossData.getObject(GuardAreaEnum.hid, Long.class);
		int belongZoneid = crossData.getObject(GuardAreaEnum.belongZoneid, Integer.class);
		crossData.finishGet();
		int partId = CrossCache.getPartId(channel);
		GuardArea guardArea = GuardAreaCrossCache.allGuardAreaCache.get(partId).get(hid);
		if (guardArea == null) {
			// 创建玩家信息
			guardArea = GuardAreaCrossFunction.getIns().addGuardArea(partId, hid, belongZoneid);
		} else {
			// 检查城池状态并检查掠夺信息
			GuardAreaCrossFunction.getIns().checkCityInfo(guardArea);
		}
		crossData.putObject(GuardAreaEnum.guardArea, guardArea);
		NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
	}

	public void dispatch(Channel channel, CrossData crossData) {
		int cmd = CrossConst.CROSS_GUARD_AREA_DISPATCH;
		long hid = crossData.getObject(GuardAreaEnum.hid, Long.class);
		int cityId = crossData.getObject(GuardAreaEnum.cityId, Integer.class);
		int wuJiangId = crossData.getObject(GuardAreaEnum.wuJiangId, Integer.class);
		double addValue = crossData.getObject(GuardAreaEnum.addValue, Double.class);
		CityInfo myCityInfo = crossData.getObject(GuardAreaEnum.cityInfo, CityInfo.class);
		crossData.finishGet();
		int partId = CrossCache.getPartId(channel);
		GuardArea guardArea = GuardAreaCrossCache.allGuardAreaCache.get(partId).get(hid);
		if (guardArea == null) {
			crossData.putObject(GuardAreaEnum.state, 1);
			NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
			return;
		}

		for (CityInfo cityInfo : guardArea.getCityInfoMap().values()) {
			if (cityInfo.getWuJiangId() == wuJiangId) {
				// 武将正在其他城池镇守
				crossData.putObject(GuardAreaEnum.state, 2);
				NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
				return;
			}
		}

		CityInfo cityInfo = guardArea.getCityInfoMap().get(cityId);

		if (cityInfo.getState() == 1) {
			// 正在镇守
			crossData.putObject(GuardAreaEnum.state, 3);
			NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
			return;
		}

		if (cityInfo.getState() == 2) {
			// 镇守完毕
			crossData.putObject(GuardAreaEnum.state, 4);
			NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
			return;
		}

		cityInfo.setState(1);
		cityInfo.setStartTime(TimeDateUtil.getCurrentTime());
		cityInfo.setPlunderTimes(0);
		cityInfo.setWuJiangId(wuJiangId);
		cityInfo.setAddValue(addValue);

		// 设置属性
		cityInfo.setBaowu(myCityInfo.getBaowu());
		cityInfo.setTianshu(myCityInfo.getTianshu());
		cityInfo.setStrength(myCityInfo.getStrength());
		cityInfo.setSkill(myCityInfo.getSkill());
		cityInfo.setFinalFightAttr(myCityInfo.getFinalFightAttr());
		cityInfo.setFigthMonsterSpirit(myCityInfo.getFigthMonsterSpirit());
		cityInfo.setLittleLeader(myCityInfo.getLittleLeader());
		cityInfo.setName(myCityInfo.getName());
		cityInfo.setCountryId(myCityInfo.getCountryId());
		cityInfo.setGodSkillLevel(myCityInfo.getGodSkillLevel());

		crossData.putObject(GuardAreaEnum.state, 0);
		NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
	}

	public void getAward(Channel channel, CrossData crossData) {
		int cmd = CrossConst.CROSS_GUARD_AREA_GET_AWARD;
		long hid = crossData.getObject(GuardAreaEnum.hid, Long.class);
		int cityId = crossData.getObject(GuardAreaEnum.cityId, Integer.class);
		crossData.finishGet();
		int partId = CrossCache.getPartId(channel);
		GuardArea guardArea = GuardAreaCrossCache.allGuardAreaCache.get(partId).get(hid);
		if (guardArea == null) {
			crossData.putObject(GuardAreaEnum.state, 1);
			NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
			return;
		}

		CityInfo cityInfo = guardArea.getCityInfoMap().get(cityId);

		if (cityInfo.getState() == 0) {
			// 未开始镇守
			crossData.putObject(GuardAreaEnum.state, 2);
			NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
			return;
		}

		if (cityInfo.getState() == 1) {
			// 正在镇守
			crossData.putObject(GuardAreaEnum.state, 3);
			NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
			return;
		}

		// 计算收益发放奖励
		Struct_zssf_294 config = Config_zssf_294.getIns().get(cityId);
		if (config == null) {
			// 城池不存在
			crossData.putObject(GuardAreaEnum.state, 4);
			NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
			return;
		}
		Hero hero = new Hero();
		hero.setId(hid);
		hero.setLocalChannel(channel);

		int num = config.getTime() / GuardAreaConst.TIME;
		num -= cityInfo.getPlunderTimes() * 2;
		int award[][] = CommonUtil.copyArrayAndNum(CommonUtil.copyArrayAndNum(config.getReward(), num),
				1 + cityInfo.getAddValue());
		System.out.println(config.getReward()[0][2]);
		System.out.println(cityInfo.getAddValue());
		System.out.println(award[0][2]);
		// 发送奖励
		UseAddUtil.add(hero, award, SourceGoodConst.GUARD_AREA_GET_AWARD, UseAddUtil.getDefaultMail(), true);

		cityInfo.setState(0);
		cityInfo.setStartTime(0);
		cityInfo.setPlunderTimes(0);
		cityInfo.setWuJiangId(0);
		cityInfo.setAddValue(0);

		crossData.putObject(GuardAreaEnum.state, 0);
		NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
	}

	public void recall(Channel channel, CrossData crossData) {
		int cmd = CrossConst.CROSS_GUARD_AREA_RECALL;
		long hid = crossData.getObject(GuardAreaEnum.hid, Long.class);
		int cityId = crossData.getObject(GuardAreaEnum.cityId, Integer.class);
		crossData.finishGet();
		int partId = CrossCache.getPartId(channel);
		GuardArea guardArea = GuardAreaCrossCache.allGuardAreaCache.get(partId).get(hid);
		if (guardArea == null) {
			crossData.putObject(GuardAreaEnum.state, 1);
			NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
			return;
		}

		CityInfo cityInfo = guardArea.getCityInfoMap().get(cityId);

		if (cityInfo.getState() == 0) {
			// 未开始镇守
			crossData.putObject(GuardAreaEnum.state, 2);
			NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
			return;
		}

		if (cityInfo.getState() == 2) {
			// 镇守完毕
			crossData.putObject(GuardAreaEnum.state, 3);
			NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
			return;
		}

		// 计算收益发放奖励
		Struct_zssf_294 config = Config_zssf_294.getIns().get(cityId);
		if (config == null) {
			// 城池不存在
			crossData.putObject(GuardAreaEnum.state, 4);
			NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
			return;
		}
		Hero hero = new Hero();
		hero.setId(hid);
		hero.setLocalChannel(channel);
		int time = TimeDateUtil.getCurrentTime() - cityInfo.getStartTime();
		if (time > config.getTime()) {
			time = config.getTime();
		}
		int num = time / GuardAreaConst.TIME;
		num -= cityInfo.getPlunderTimes() * 2;
		int award[][] = CommonUtil.copyArrayAndNum(CommonUtil.copyArrayAndNum(config.getReward(), num),
				1 + cityInfo.getAddValue());

		System.out.println(config.getReward()[0][2]);
		System.out.println(num);
		System.out.println(cityInfo.getAddValue());
		System.out.println(award[0][2]);

		int[][] cost = Config_xtcs_004.getIns().get(GuardAreaConst.CONST_8004).getOther();
		if (!UseAddUtil.canUse(hero, cost)) {
			// 物品不足
			crossData.putObject(GuardAreaEnum.state, 5);
			NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
			return;
		}

		UseAddUtil.use(hero, cost, SourceGoodConst.GUARD_AREA_RECALL_COST, false);

		// 发送奖励
		if (num > 0) {
			UseAddUtil.add(hero, award, SourceGoodConst.GUARD_AREA_RECALL_ADD, UseAddUtil.getDefaultMail(), true);
		}

		cityInfo.setState(0);
		cityInfo.setStartTime(0);
		cityInfo.setPlunderTimes(0);
		cityInfo.setWuJiangId(0);
		cityInfo.setAddValue(0);

		crossData.putObject(GuardAreaEnum.state, 0);
		NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
	}

	public void openPlunderUI(Channel channel, CrossData crossData) {
		int cmd = CrossConst.CROSS_GUARD_AREA_OPEN_PLUNDER_UI;
		long hid = crossData.getObject(GuardAreaEnum.hid, Long.class);
		crossData.finishGet();
		int partId = CrossCache.getPartId(channel);
		GuardArea guardArea = GuardAreaCrossCache.allGuardAreaCache.get(partId).get(hid);
		if (guardArea == null) {
			crossData.putObject(GuardAreaEnum.state, 1);
			NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
			return;
		}
		if (guardArea.getPlunderMap().isEmpty()) {
			// 第一次先刷新一次
			GuardAreaCrossFunction.getIns().getRandomCityInfo(guardArea, partId);
		}

		int maxPlunderTimes = Config_xtcs_004.getIns().get(GuardAreaConst.CONST_8007).getNum();

		Map<Integer, CityInfo> plunderMap = new HashMap<>();
		for (Struct_zssf_294 config : Config_zssf_294.getIns().getSortList()) {
			Long heroId = guardArea.getPlunderMap().get(config.getId());
			if (heroId == null) {
				continue;
			}
			GuardArea ga = GuardAreaCrossCache.allGuardAreaCache.get(partId).get(heroId);
			if (ga == null) {
				continue;
			}
			CityInfo cityInfo = ga.getCityInfoMap().get(config.getId());
			if (cityInfo.getState() == 0) {
				continue;
			}
			if (cityInfo.getState() == 1 && TimeDateUtil.getCurrentTime() <= cityInfo.getStartTime() + 7200) {
				continue;
			}
			if (cityInfo.getPlunderTimes() >= maxPlunderTimes) {
				continue;
			}
			plunderMap.put(config.getId(), ga.getCityInfoMap().get(config.getId()));
		}

		crossData.putObject(GuardAreaEnum.plunderMap, plunderMap);
		crossData.putObject(GuardAreaEnum.state, 0);
		NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
	}

	public void plunder(Channel channel, CrossData crossData) {
		int cmd = CrossConst.CROSS_GUARD_AREA_PLUNDER;
		long hid = crossData.getObject(GuardAreaEnum.hid, Long.class);
		int cityId = crossData.getObject(GuardAreaEnum.cityId, Integer.class);
		crossData.finishGet();
		int partId = CrossCache.getPartId(channel);
		GuardArea guardArea = GuardAreaCrossCache.allGuardAreaCache.get(partId).get(hid);
		if (guardArea == null) {
			crossData.putObject(GuardAreaEnum.state, 1);
			NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
			return;
		}

		Long heroId = guardArea.getPlunderMap().get(cityId);
		if (heroId == null) {
			// 玩家不存在
			crossData.putObject(GuardAreaEnum.state, 2);
			NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
			return;
		}

		GuardArea ga = GuardAreaCrossCache.allGuardAreaCache.get(partId).get(heroId);
		if (ga == null) {
			// 玩家不存在
			crossData.putObject(GuardAreaEnum.state, 2);
			NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
			return;
		}

		int maxPlunderTimes = Config_xtcs_004.getIns().get(GuardAreaConst.CONST_8007).getNum();

		CityInfo cityInfo = ga.getCityInfoMap().get(cityId);
		if (cityInfo.getState() == 0) {
			// 城池还未开始镇守
			crossData.putObject(GuardAreaEnum.state, 3);
			NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
			return;
		}
		if (cityInfo.getState() == 1 && TimeDateUtil.getCurrentTime() <= cityInfo.getStartTime() + 7200) {
			// 没有资源
			crossData.putObject(GuardAreaEnum.state, 4);
			NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
			return;
		}
		if (cityInfo.getPlunderTimes() >= maxPlunderTimes) {
			// 掠夺次数不足
			crossData.putObject(GuardAreaEnum.state, 5);
			NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
			return;
		}

		cityInfo.setPlunderTimes(cityInfo.getPlunderTimes() + 1);

		crossData.putObject(GuardAreaEnum.hid, heroId);
		crossData.putObject(GuardAreaEnum.cityInfo, cityInfo);
		crossData.putObject(GuardAreaEnum.state, 0);
		NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
	}

	public void refresh(Channel channel, CrossData crossData) {
		int cmd = CrossConst.CROSS_GUARD_AREA_REFRESH;
		long hid = crossData.getObject(GuardAreaEnum.hid, Long.class);
		crossData.finishGet();
		int partId = CrossCache.getPartId(channel);
		GuardArea guardArea = GuardAreaCrossCache.allGuardAreaCache.get(partId).get(hid);
		if (guardArea == null) {
			crossData.putObject(GuardAreaEnum.state, 1);
			NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
			return;
		}
		// 先刷新一次
		GuardAreaCrossFunction.getIns().getRandomCityInfo(guardArea, partId);

		int maxPlunderTimes = Config_xtcs_004.getIns().get(GuardAreaConst.CONST_8007).getNum();

		Map<Integer, CityInfo> plunderMap = new HashMap<>();
		for (Struct_zssf_294 config : Config_zssf_294.getIns().getSortList()) {
			Long heroId = guardArea.getPlunderMap().get(config.getId());
			if (heroId == null) {
				continue;
			}
			GuardArea ga = GuardAreaCrossCache.allGuardAreaCache.get(partId).get(heroId);
			if (ga == null) {
				continue;
			}
			CityInfo cityInfo = ga.getCityInfoMap().get(config.getId());
			if (cityInfo.getState() == 0) {
				continue;
			}
			if (cityInfo.getState() == 1 && TimeDateUtil.getCurrentTime() <= cityInfo.getStartTime() + 7200) {
				continue;
			}
			if (cityInfo.getPlunderTimes() >= maxPlunderTimes) {
				cityInfo.setPlunderTimes(0);
				continue;
			}
			plunderMap.put(config.getId(), ga.getCityInfoMap().get(config.getId()));
		}

		crossData.putObject(GuardAreaEnum.plunderMap, plunderMap);
		crossData.putObject(GuardAreaEnum.state, 0);
		NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
	}

	public void battleResult(Channel channel, CrossData crossData) {
		int cmd = CrossConst.CROSS_GUARD_AREA_BATTLE_RESULT;
		long hid = crossData.getObject(GuardAreaEnum.hid, Long.class);
		int result = crossData.getObject(GuardAreaEnum.result, Integer.class);
		int cityId = crossData.getObject(GuardAreaEnum.cityId, Integer.class);
		String name = crossData.getObject(GuardAreaEnum.zhanBao, String.class);
		long strength = crossData.getObject(GuardAreaEnum.addValue, Long.class);
		crossData.finishGet();
		int partId = CrossCache.getPartId(channel);
		GuardArea guardArea = GuardAreaCrossCache.allGuardAreaCache.get(partId).get(hid);
		if (guardArea == null) {
			crossData.putObject(GuardAreaEnum.state, 1);
			NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
			return;
		}

		Long heroId = guardArea.getPlunderMap().get(cityId);
		if (heroId == null) {
			// 玩家不存在
			crossData.putObject(GuardAreaEnum.state, 2);
			NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
			return;
		}

		GuardArea ga = GuardAreaCrossCache.allGuardAreaCache.get(partId).get(heroId);
		if (ga == null) {
			// 玩家不存在
			crossData.putObject(GuardAreaEnum.state, 2);
			NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
			return;
		}

		CityInfo cityInfo = ga.getCityInfoMap().get(cityId);

		// 验证结果

		int isWin = BattleFunction.checkWinByFight(strength, cityInfo.getStrength(), 0);
		if (isWin == 0) {
			result = 2;
		}

		if (result == 2) {
			cityInfo.setPlunderTimes(cityInfo.getPlunderTimes() - 1);
		}
		crossData.putObject(GuardAreaEnum.result, result);
		crossData.putObject(GuardAreaEnum.cityId, cityId);
		crossData.putObject(GuardAreaEnum.state, 0);
		NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());

		ZhanBao zhanBao = new ZhanBao();
		zhanBao.setName(name);
		zhanBao.setCityId(cityId);
		zhanBao.setType(result);
		Channel c = CrossCache.getChannel(ga.getBelongZoneid());
		CrossData cData = new CrossData();
		cData.putObject(GuardAreaEnum.zhanBao, zhanBao);
		cData.putObject(GuardAreaEnum.hid, heroId);
		NettyWrite.writeXData(c, CrossConst.CROSS_GUARD_AREA_ZHAN_BAO, cData);
	}

	public void openReportUI(Channel channel, CrossData crossData) {
		int cmd = CrossConst.CROSS_GUARD_AREA_ZHAN_BAO;
		ZhanBao zhanBao = crossData.getObject(GuardAreaEnum.zhanBao, ZhanBao.class);
		long hid = crossData.getObject(GuardAreaEnum.hid, Long.class);
		crossData.finishGet();
		List<ZhanBao> list = GuardAreaLocalCache.zhanBaoMap.get(hid);
		if (list == null) {
			list = new ArrayList<>();
			GuardAreaLocalCache.zhanBaoMap.put(hid, list);
		}
		if (list.size() > 50) {
			list.remove(list.size() - 1);
		}
		list.add(0, zhanBao);

		GuardAreaLocalCache.redPointPushZhanBao.add(hid);

		GuardAreaCrossFunction.getIns().updateRedPoint(HeroCache.getHero(hid));
	}
}
