package com.teamtop.system.crossFireBeacon;

import java.util.HashSet;
import java.util.Iterator;
import java.util.concurrent.ConcurrentSkipListSet;

import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.CrossZone;
import com.teamtop.gameCommon.GameProperties;
import com.teamtop.houtaiHttp.events.crossActivitySwitch.CrossActivitySwitchCache;
import com.teamtop.netty.server.server2.Client_2;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.SystemStateEnum;
import com.teamtop.system.crossFireBeacon.cross.CrossFireBeaconType;
import com.teamtop.system.crossFireBeacon.model.FireBeacon;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.rankNew.RankingCache;
import com.teamtop.system.rankNew.RankingConst;
import com.teamtop.system.rankNew.rankModel.BaseRankModel;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import io.netty.channel.Channel;

public class FrieBeaconLocalSysEvent extends AbsSystemEvent {

	private static FrieBeaconLocalSysEvent ins;

	private FrieBeaconLocalSysEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized FrieBeaconLocalSysEvent getIns() {
		if (ins == null) {
			ins = new FrieBeaconLocalSysEvent();
		}
		return ins;
	}

	@Override
	public void init(Hero hero) {
		FireBeacon fireBeacon = hero.getFireBeacon();
		if (fireBeacon == null) {
			fireBeacon = new FireBeacon();
			fireBeacon.setHid(hero.getId());
			fireBeacon.setAlreadyGet(new HashSet<>());
			hero.setFireBeacon(fireBeacon);
		}
	}

	@Override
	public void login(Hero hero) {
		CrossFireBeaconFunction.getIns().resetData(hero);
		if (CrossFireBeaconFunction.getIns().heroIsOpen(hero)) {
			if (!CrossActivitySwitchCache.checkCrossOpen(SystemIdConst.CROSS_FIRE_BEACON)) {
				return;
			}
			HeroFunction.getIns().addLoginSytemState(hero, SystemIdConst.CROSS_FIRE_BEACON,
					SystemStateEnum.StateEnum.OPEN_NOW.getState());
		}
	}

	@Override
	public void fixTime(int cmdId, int now) {
		if (CrossZone.isCrossServer()) {
			return;
		}
		if (!CrossActivitySwitchCache.checkCrossOpen(SystemIdConst.CROSS_FIRE_BEACON)) {
			return;
		}
		int week = TimeDateUtil.getWeek();
		if (!CrossFireBeaconSysCache.openDays.contains(week)) {
			return;
		}
		if (cmdId == 1) {
			if (!HeroFunction.getIns().checkSystemOpenDay(SystemIdConst.CROSS_FIRE_BEACON)) {
				return;
			}
			// 报名参赛
			ConcurrentSkipListSet<BaseRankModel> treeSet = RankingCache.getRankingmap().get(RankingConst.STRENGTH_RANKING);
			ConcurrentSkipListSet<BaseRankModel> tempSet = new ConcurrentSkipListSet<>(treeSet);
			Iterator<BaseRankModel> iterator = tempSet.iterator();
			long totalStrength = 0;
			int i = 0;
			for (; iterator.hasNext();) {
				BaseRankModel model = iterator.next();
				if (i < 10) {
					totalStrength += model.getStrength();
				} else {
					break;
				}
				i++;
			}
			CrossData crossData = new CrossData();
			crossData.putObject(CrossFireBeaconType.zoneId.name(), GameProperties.getFirstZoneId());
			crossData.putObject(CrossFireBeaconType.totalStrength.name(), totalStrength);
			crossData.putObject(CrossFireBeaconType.openServerTime.name(), GameProperties.serverOpenTime);
			Channel crossChannel = Client_2.getIns().getCrossChannel();
			NettyWrite.writeXData(crossChannel, CrossConst.FIREBEACON_SG_APPLY, crossData);
			LogTool.info("FrieBeaconLocalSysEvent apply", FrieBeaconLocalSysEvent.class);
		} else if (cmdId == 2) {
			if (!HeroFunction.getIns().checkSystemOpenDay(SystemIdConst.CROSS_FIRE_BEACON)) {
				return;
			}
			// 活动开启时重置玩家数据
			Iterator<Hero> iterator = HeroCache.getHeroMap().values().iterator();
			for (; iterator.hasNext();) {
				Hero hero = iterator.next();
				if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.CROSS_FIRE_BEACON)) {
					continue;
				}
				CrossFireBeaconFunction.getIns().resetData(hero);
				HeroFunction.getIns().sendSystemState(hero.getId(), SystemIdConst.CROSS_FIRE_BEACON,
						SystemStateEnum.StateEnum.OPEN_NOW.getState());
			}
		} else if (cmdId == 3) {
			// 活动关闭
			// CrossFireBeaconSysCache.FireBeaconState = CrossFireBeaconConst.FB_CLOSE;
		}
	}

}
