package com.teamtop.system.activity.ativitys.arenaFight;

import java.util.List;

import com.teamtop.cross.CrossData;
import com.teamtop.cross.CrossFunction;
import com.teamtop.cross.connEvent.AbsCrossLoginEvent;
import com.teamtop.cross.connEvent.CrossSelectRoom;
import com.teamtop.cross.upload.CrossHeroBaseModel;
import com.teamtop.gameCommon.GameProperties;
import com.teamtop.netty.server.server2.Client_2;
import com.teamtop.system.activity.ActivitySysCache;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.arenaFight.cross.ArenaFightEnum;
import com.teamtop.system.activity.ativitys.arenaFight.cross.ArenaFightIO;
import com.teamtop.system.activity.ativitys.arenaFight.cross.CrossArenaFightSysCache;
import com.teamtop.system.activity.ativitys.arenaFight.model.ArenaFightModel;
import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;

import io.netty.channel.Channel;

public class ArenaFightCrossLoginEvent extends AbsCrossLoginEvent {

	private static ArenaFightCrossLoginEvent ins;

	private ArenaFightCrossLoginEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized ArenaFightCrossLoginEvent getIns() {
		if (ins == null) {
			ins = new ArenaFightCrossLoginEvent();
		}
		return ins;
	}

	@Override
	public Channel localAsk(Hero hero, int type, List<Object[]> param) {
		param.add(new Object[] { GameProperties.getFirstZoneId() });
		return Client_2.getIns().getCrossChannel();
	}

	@Override
	public CrossSelectRoom crossSelectRoom(int type, String param) {
		return new CrossSelectRoom(1, GameProperties.cross_domainName_2, GameProperties.serverPort);
	}

	@Override
	public void crossAfterLoginSucc(Hero hero, int crossLoginRoomId) {
		ArenaFightManager.getIns().sendInfo(hero);
	}

	@Override
	public void localBeforeUpload(Hero hero, Channel channel, Object[] crossLoginParam, CrossData crossData) {
		if (!HeroFunction.getIns().checkSystemOpen(hero, ActivitySysId.ACT_ARENA_FIGHT)) {
			return;
		}
		ArenaFightModel actModel = (ArenaFightModel) hero.getHeroActivityData().getActivityDataMap()
				.get(ActivitySysId.ACT_ARENA_FIGHT);
		if (actModel == null) {
			return;
		}
		ActivityInfo activityInfo = ActivitySysCache.getActivityMap().get(ActivitySysId.ACT_ARENA_FIGHT);
		int endTime = activityInfo.getEndTime();
		int startTime = activityInfo.getStartTime();
		CrossHeroBaseModel model = new CrossHeroBaseModel();
		CrossFunction.makeCrossBaseHeroModel(model, hero);
		crossData.putObject(ArenaFightEnum.fightModel.name(), model);
		crossData.putObject(ArenaFightEnum.actData.name(), actModel);
		// crossData.putObject(ArenaFightEnum.endTime.name(), endTime);
		// crossData.putObject(ArenaFightEnum.startTime.name(), startTime);
	}

	@Override
	public void localAfterUploadSucc(Hero hero, Channel channel, Object[] crossLoginParam, CrossData crossData) {

	}

	@Override
	public CrossData crossAfterReciSucc(Hero hero, Channel channel, Object[] crossLoginParam, CrossData crossData) {
		ArenaFightIO.getIns().uploadModel(channel, crossData);
		return crossData;
	}

	@Override
	public void crossLogout(Hero hero, CrossData crossData) {
		long hid = hero.getId();
		ArenaFightModel arenaFightModel = CrossArenaFightSysCache.getHeroArenaMap().get(hid);
		crossData.putObject(ArenaFightEnum.actData.name(), arenaFightModel);
		// 跨服离线战斗判断为失败
		ArenaFightManager.getIns().fightEnd(hero, 0);
		if (arenaFightModel == null) {
			CrossArenaFightSysCache.getHeroFightMap().remove(hid);
			return;
		}
		int arenaId = arenaFightModel.getArenaId();
		int type = arenaFightModel.getType();
		if (arenaId == 0 || type == 0) {
			// 不是擂主并且没有协助则移除缓存
			CrossArenaFightSysCache.getHeroArenaMap().remove(hid);
			CrossArenaFightSysCache.getHeroFightMap().remove(hid);
		}
	}

	@Override
	public void localAfterLogout(Hero hero, CrossData crossData) {
		ArenaFightModel arenaFightModel = crossData.getObject(ArenaFightEnum.actData.name(), ArenaFightModel.class);
		ArenaFightModel actModel = (ArenaFightModel) hero.getHeroActivityData().getActivityDataMap()
				.get(ActivitySysId.ACT_ARENA_FIGHT);
		if (actModel != null) {
			actModel.setArenaId(arenaFightModel.getArenaId());
			actModel.setType(arenaFightModel.getType());
			actModel.setSite(arenaFightModel.getSite());
			actModel.setNoticeList(arenaFightModel.getNoticeList());
			actModel.setCdEndTime(arenaFightModel.getCdEndTime());
			actModel.setDayTime(arenaFightModel.getDayTime());
			actModel.setMyOpstate(arenaFightModel.getMyOpstate());
		}
	}

}
