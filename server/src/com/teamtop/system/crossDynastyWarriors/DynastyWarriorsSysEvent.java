package com.teamtop.system.crossDynastyWarriors;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.CrossFunction;
import com.teamtop.cross.CrossZone;
import com.teamtop.cross.upload.CrossHeroBaseModel;
import com.teamtop.gameCommon.GameProperties;
import com.teamtop.houtaiHttp.events.crossActivitySwitch.CrossActivitySwitchCache;
import com.teamtop.netty.server.server2.Client_2;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.SystemStateEnum;
import com.teamtop.system.crossDynastyWarriors.cross.DynastyWarriorsCrossType;
import com.teamtop.system.crossDynastyWarriors.model.DynastyWarriorsModel;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroConst;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import io.netty.channel.Channel;

public class DynastyWarriorsSysEvent extends AbsSystemEvent {

	private static DynastyWarriorsSysEvent dynastyWarriorsSysEvent;

	private DynastyWarriorsSysEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized DynastyWarriorsSysEvent getIns() {
		if (dynastyWarriorsSysEvent == null) {
			dynastyWarriorsSysEvent = new DynastyWarriorsSysEvent();
		}
		return dynastyWarriorsSysEvent;
	}

	@Override
	public void init(Hero hero) {
		// TODO Auto-generated method stub

	}

	@Override
	public void login(Hero hero) {
		DynastyWarriorsModel model = hero.getDynastyWarriorsModel();
		if (model == null) {
			return;
		}
		if (!CrossActivitySwitchCache.checkCrossOpen(SystemIdConst.DYNASTY_WARRIORS)) {
			return;
		}
		int partId = CrossCache.getlocalPartId();
		DynastyWarriorsCache dynastyWarriorsCache = DynastyWarriorsSysCache.getDynastyWarriorsCache(partId);
		if (dynastyWarriorsCache.getActRound() > 0) {
			HeroFunction.getIns().addLoginSytemState(hero, SystemIdConst.DYNASTY_WARRIORS,
					SystemStateEnum.StateEnum.OPEN_NOW.getState());
		}
		boolean redPoint = DynastyWarriorsFunction.getIns().checkRedPoint(hero);
		if (redPoint) {
			RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.DYNASTY_WARRIORS, DynastyWarriorsConst.RED_POINT,
					RedPointConst.HAS_RED);
		}
	}

	@Override
	public void loginReset(Hero hero, int now) {
		weekReset(hero);
	}

	@Override
	public void zeroHero(Hero hero, int now) {
		weekReset(hero);
	}

	private void weekReset(Hero hero) {
		int week = TimeDateUtil.getWeek();
		if (week != 7) {
			return;
		}
		DynastyWarriorsModel dynastyWarriorsModel = hero.getDynastyWarriorsModel();
		if (dynastyWarriorsModel == null) {
			return;
		}
		int weekResetTime = dynastyWarriorsModel.getWeekResetTime();
		int todayZeroTime = TimeDateUtil.getTodayZeroTimeReturnInt();
		if (TimeDateUtil.compareTimeForSameDay(weekResetTime, todayZeroTime)) {
			// 已重置
			return;
		}
		dynastyWarriorsModel.setWeekResetTime(todayZeroTime);
		dynastyWarriorsModel.getBetMap().clear();
		dynastyWarriorsModel.getPondAward().clear();
	}

	@Override
	public void passGuanqia(Hero hero, int passGuanqia) {
		DynastyWarriorsModel dynastyWarriorsModel = hero.getDynastyWarriorsModel();
		if (dynastyWarriorsModel == null) {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.DYNASTY_WARRIORS)) {
				return;
			}
			if (!CrossActivitySwitchCache.checkCrossOpen(SystemIdConst.DYNASTY_WARRIORS)) {
				return;
			}
			dynastyWarriorsModel = new DynastyWarriorsModel();
			dynastyWarriorsModel.setHid(hero.getId());
			Map<Integer, Long> betMap = new HashMap<>();
			dynastyWarriorsModel.setBetMap(betMap);
			Map<Integer, Integer> pondAward = new HashMap<>();
			dynastyWarriorsModel.setPondAward(pondAward);
			hero.setDynastyWarriorsModel(dynastyWarriorsModel);
			int partId = CrossCache.getlocalPartId();
			DynastyWarriorsCache dynastyWarriorsCache = DynastyWarriorsSysCache.getDynastyWarriorsCache(partId);
			if (dynastyWarriorsCache.getActRound() > 0) {
				HeroFunction.getIns().sendSystemState(hero.getId(), SystemIdConst.DYNASTY_WARRIORS,
						SystemStateEnum.StateEnum.OPEN_NOW.getState());
			}
		}
	}

	@Override
	public void fixTime(int cmdId, int now) {
		try {
			if (!CrossActivitySwitchCache.checkCrossOpen(SystemIdConst.DYNASTY_WARRIORS)) {
				return;
			}
			if(CrossZone.isCrossServer()) {
				return;
			}
			if (cmdId == 1) {
				int week = TimeDateUtil.getWeek();
				if (week != 7) {
					return;
				}
				int partId = CrossCache.getlocalPartId();
				DynastyWarriorsCache dwCache = DynastyWarriorsSysCache.getDynastyWarriorsCache(partId);
				if(dwCache==null) {
					dwCache = new DynastyWarriorsCache();
					DynastyWarriorsSysCache.getCacheMap().put(partId, dwCache);
				}
				if (dwCache.getActState() == DynastyWarriorsConst.READY_STATE) {
					int passTime = now - dwCache.getStateTime();
					int minute = passTime / TimeDateUtil.ONE_MINUTE;
					int checkTime = (DynastyWarriorsConst.READY_TIME-DynastyWarriorsConst.SEND_GAP_TIME)/TimeDateUtil.ONE_MINUTE;
					if (minute == checkTime) {
						//上传参数玩家最新属性
						sendData(dwCache);
					}
				}
			} else if (cmdId == 2) {
				int partId = CrossCache.getlocalPartId();
				DynastyWarriorsCache dwCache = DynastyWarriorsSysCache.getDynastyWarriorsCache(partId);
				if(dwCache==null) {
					dwCache = new DynastyWarriorsCache();
					DynastyWarriorsSysCache.getCacheMap().put(partId, dwCache);
				}
				// 上传参数玩家最新属性
				sendData(dwCache);
			}
		} catch (Exception e) {
			LogTool.error(e, DynastyWarriorsSysEvent.class, "DynastyWarriorsSysEvent fixTime");
		}
	}

	public void sendData(DynastyWarriorsCache dwCache) {
		Map<Long, CrossHeroBaseModel> sendMap = new HashMap<>();
		List<List<Long>> list = dwCache.getMatchMap().get(dwCache.getActRound());
		if (list == null) {
			return;
		}
		Map<Long, CrossHeroBaseModel> fighterMap = dwCache.getFighterMap();
		int size = list.size();
		List<Long> group = null;
		int groupSize = 0;
		long hid = 0;
		for (int i = 0; i < size; i++) {
			group = list.get(i);
			groupSize = group.size();
			for (int j = 0; j < groupSize; j++) {
				hid = group.get(j);
				CrossHeroBaseModel model = fighterMap.get(hid);
				if (GameProperties.zoneids.contains(model.getZoneid())) {
					// 是本服玩家
					Hero hero = HeroCache.getHero(hid, HeroConst.FIND_TYPE_BATTLE);
					CrossFunction.makeCrossBaseHeroModel(model, hero);
					sendMap.put(hid, model);
				}
			}
		}
		Channel crossChannel = Client_2.getIns().getCrossChannel();
		CrossData crossData = new CrossData();
		crossData.putObject(DynastyWarriorsCrossType.FIGHT_MODEL, sendMap);
		NettyWrite.writeXData(crossChannel, CrossConst.DYNASTYWARRIORS_SG_UPDATEHERO, crossData);
	}

}
