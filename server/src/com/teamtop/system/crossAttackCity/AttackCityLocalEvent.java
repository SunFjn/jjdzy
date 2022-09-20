package com.teamtop.system.crossAttackCity;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.CrossZone;
import com.teamtop.gameCommon.GameProperties;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.crossAttackCity.cross.AttackCityCrossCache;
import com.teamtop.system.crossAttackCity.cross.AttackCityCrossFunction;
import com.teamtop.system.crossAttackCity.cross.AttackCityEnum;
import com.teamtop.system.crossAttackCity.model.AttackCity;
import com.teamtop.system.crossAttackCity.model.AttackCityLocal;
import com.teamtop.system.crossAttackCity.model.CityInfo;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_gcbz_777;
import excel.struct.Struct_gcbz_777;
import io.netty.channel.Channel;

public class AttackCityLocalEvent extends AbsSystemEvent {

	public static AttackCityLocalEvent ins;

	public static AttackCityLocalEvent getIns() {
		if (ins == null) {
			ins = new AttackCityLocalEvent();
		}
		return ins;
	}

	private AttackCityLocalEvent() {

	}

	@Override
	public void init(Hero hero) {
		AttackCityLocal local = hero.getAttackCityLocal();
		if (local == null) {
			local = new AttackCityLocal();
			local.setHid(hero.getId());
			local.setCityId(1001);
			local.setPassSet(new HashSet<>());
			local.setTimes(AttackCityConst.XTCS_8253);// 重置次数
			local.setReTime(AttackCityConst.XTCS_8252);
			local.setNd(1);
			local.setRePassSet(new HashSet<>());
			local.setChoose(1);
			local.setShopMap(new HashMap<>());
			local.setShopRefreshTime(TimeDateUtil.getNextMonDayZeroTime());
			hero.setAttackCityLocal(local);
		}
	}

	@Override
	public void login(Hero hero) {
		AttackCityLocal attackCityLocal = hero.getAttackCityLocal();
		if (attackCityLocal != null) {
			boolean[] redPoint = AttackCityCrossFunction.getIns().checkRedPoint(hero, attackCityLocal.getCountAward());
			for (int i = 1; i < 3; i++) {
				boolean hadRed = redPoint[i];
				if (hadRed) {
					// 提示已满
					AttackCitySender.sendCmd_12080(hero.getId(), i, RedPointConst.HAS_RED);
				}
			}
			int countAward = attackCityLocal.getCountAward();
			if (countAward > 0) {
				RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.ATTACT_CITY, 1, RedPointConst.HAS_RED);
			}
			boolean contains = AttackCityLocalCache.redPoint.contains(hero.getId());
			if (contains) {
				RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.ATTACT_CITY, 2, RedPointConst.HAS_RED);
			}
		}

	}

	@Override
	public void loginReset(Hero hero, int now) {
		zeroHero(hero, now);
	}

	@Override
	public void zeroHero(Hero hero, int now) {
		AttackCityLocal local = hero.getAttackCityLocal();
		if (local.getTimes() < AttackCityConst.XTCS_8253) {
			// 重置次数
			local.setTimes(AttackCityConst.XTCS_8253);
		}
		local.setBuyTimes(0);// 可购买次数
		local.setChoose(0);// 重置选择
		local.setReTime(AttackCityConst.XTCS_8252);
		Set<Integer> passSet = local.getPassSet();
		List<Struct_gcbz_777> sortList = Config_gcbz_777.getIns().getSortList();

		for (int i = 0; i < sortList.size(); i++) {
			Struct_gcbz_777 struct_gcbz_777 = sortList.get(i);
			int tgs = struct_gcbz_777.getTgs();
			int xyg = struct_gcbz_777.getXyg();
			if (tgs / 1000 == local.getNd() && xyg != 0 && xyg / 1000 == (tgs / 1000) + 1) {
				if (passSet.contains(tgs)) {
					// 隔天开启新的难度
					local.setNd(xyg / 1000);
				}
			}
		}
		local.setCityId(local.getNd() * 1000 + 1);

		local.getRePassSet().clear();
		if (TimeDateUtil.getCurrentTime() >= local.getShopRefreshTime()) {
			// 刷新商店
			local.setShopMap(new HashMap<>());
			local.setShopRefreshTime(TimeDateUtil.getNextMonDayZeroTime());
		}
		// local.setDispatchId(0);//重置驻守id
		AttackCityManager.getIns().openUI(hero);// 隔天刷新页面
		AttackCityCrossFunction.getIns().updateRedPoint(hero, local.getCountAward());
	}

	@Override
	public void logout(Hero hero) {
		AttackCityLocal local = hero.getAttackCityLocal();
		if (local.getAttckCityId() != 0) {
			// 离线算失败
			AttackCityManager.getIns().battleResult(hero, 2);
		}
	}

	@Override
	public void fixTime(int cmdId, int now) {
		// TODO Auto-generated method stub
		if (cmdId == 1) {
			// 每天23点50分踢玩家出城池
			if (!CrossZone.isCrossServer()) {
				return;
			}
			ConcurrentHashMap<Integer, AttackCity> allAttackCityCache = AttackCityCrossCache.getAllAttackCityCache();
			Iterator<AttackCity> iterator = allAttackCityCache.values().iterator();
			while(iterator.hasNext()) {
				AttackCity attackCity = iterator.next();
				Iterator<CityInfo> iterator2 = attackCity.getCityInfoMap().values().iterator();
				while (iterator2.hasNext()) {
					CityInfo cityInfo = iterator2.next();
					CrossData crossData1 = new CrossData();
					crossData1.putObject(AttackCityEnum.hid, cityInfo.getHid());
					crossData1.putObject(AttackCityEnum.StartTime, cityInfo.getStartTime());
					crossData1.putObject(AttackCityEnum.ChTime, TimeDateUtil.getCurrentTime());
					crossData1.putObject(AttackCityEnum.cityId, cityInfo.getCityId());
					crossData1.putObject(AttackCityEnum.state, 1);
					Channel c = CrossCache.getChannel(CommonUtil.getZoneIdById(cityInfo.getHid()));
					NettyWrite.writeXData(c, CrossConst.CROSS_ATTACK_CITY_REMOVE, crossData1);
					iterator2.remove();
				}
			}
			LogTool.info(GameProperties.getFirstZoneId() + "清理城池完毕,中央服当前时间::" + TimeDateUtil.pringNow(), this);
		}
	}

}
