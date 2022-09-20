package com.teamtop.system.house.yard.event;

import java.util.List;

import com.teamtop.cross.CrossData;
import com.teamtop.cross.CrossEnum;
import com.teamtop.cross.connEvent.AbsCrossLoginEvent;
import com.teamtop.cross.connEvent.CrossSelectRoom;
import com.teamtop.gameCommon.GameProperties;
import com.teamtop.netty.server.server2.Client_2;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.house.houseKeeper.model.HouseKeeper;
import com.teamtop.system.house.maid.model.Maid;
import com.teamtop.system.house.yard.cross.CrossHouseFunction;
import com.teamtop.system.house.yard.model.CrossHouse;
import com.teamtop.system.house.yard.model.LocalHouse;
import com.teamtop.system.house.yard.model.RobberNpc;

import io.netty.channel.Channel;

public class HouseCrossLoginEvent extends AbsCrossLoginEvent {

	private static HouseCrossLoginEvent ins = null;

	public static HouseCrossLoginEvent getIns() {
		if (ins == null) {
			ins = new HouseCrossLoginEvent();
		}
		return ins;
	}

	@Override
	public Channel localAsk(Hero hero, int type, List<Object[]> param) {
		return Client_2.getIns().getCrossChannel();
	}

	@Override
	public CrossSelectRoom crossSelectRoom(int type, String param) {
		return new CrossSelectRoom(1, GameProperties.cross_domainName_2, GameProperties.serverPort);
	}

	@Override
	public void crossAfterLoginSucc(Hero hero, int crossLoginRoomId) {
		// 先消除场景信息
		CrossHouseSceneEvent.getIns().out(hero);
		// 跨服数据寻找自己的数据下发
		CrossHouse cHouse = CrossHouseFunction.getIns().getHouseByHid(hero.getId());
		if (cHouse == null) {
			// 第一次初始化府邸系统
			cHouse = CrossHouseFunction.getIns().initCrossHouse(hero);
		} else {
			// 更新信息
			cHouse.setName(hero.getNameZoneid());
			cHouse.setIcon(hero.getIcon());
			cHouse.setFrame(hero.getFrame());
			cHouse.setLevel(hero.getLevel());
			cHouse.setProsperity(hero.getLocalHouse().getProsperity());
			cHouse.setHouseKeepId(hero.getHouseKeeper().getId());
			cHouse.setMaidId(hero.getMaid().getUseMaid());
		}
		int houseDc = cHouse.getHouseDc();
		int sceneUnitId = cHouse.getSceneUnitId();
		int mapId = CrossHouseFunction.getIns().getMapIdByDc(houseDc);
		CrossHouseSceneEvent.getIns().in(hero, mapId, sceneUnitId);

		CrossHouseFunction.getIns().sendYardMsg(hero, cHouse);
		// 刷新强盗
		CrossHouseFunction.getIns().reshMapNpc(cHouse);
		
		// 更新排名
		CrossHouseFunction.getIns().updateHouseRank(cHouse,true);
	}

	@Override
	public void localBeforeUpload(Hero hero, Channel channel, Object[] crossLoginParam, CrossData crossData) {
		crossData.putObject(CrossEnum.data1, hero.getLocalHouse());
		HouseKeeper houseKeeper = hero.getHouseKeeper();
		crossData.putObject(CrossEnum.data2, houseKeeper);
		Maid maid = hero.getMaid();
		crossData.putObject(CrossEnum.data3, maid);
	}

	@Override
	public CrossData crossAfterReciSucc(Hero hero, Channel channel, Object[] crossLoginParam, CrossData crossData) {
		hero.setLocalHouse(crossData.getObject(CrossEnum.data1, LocalHouse.class));
		hero.setHouseKeeper(crossData.getObject(CrossEnum.data2, HouseKeeper.class));
		hero.setMaid(crossData.getObject(CrossEnum.data3, Maid.class));
		return crossData;

	}

	@Override
	public void crossLogout(Hero hero, CrossData crossData) {
		CrossHouseSceneEvent.getIns().out(hero);
		crossData.putObject(CrossEnum.data1, hero.getLocalHouse());
		// crossData.putObject(CrossEnum.data2, hero.getHouseKeeper());
		if (hero.getLocalHouse().getAtkHeroId() != 0) {
			// 结束强盗战斗
			CrossHouse cHouse = CrossHouseFunction.getIns().getHouseByHid(hero.getLocalHouse().getAtkHeroId());
			RobberNpc npc = cHouse.getNpcMap().get(-hero.getLocalHouse().getAtkNpcId());
			if (npc != null) {
				npc.setState(0);
				npc.setEnemyHid(0);
				npc.setAtkTime(0);
			}
		}
	}

	@Override
	public void localAfterLogout(Hero hero, CrossData crossData) {
		LocalHouse local = crossData.getObject(CrossEnum.data1, LocalHouse.class);
		hero.getLocalHouse().setDecorateLvMap(local.getDecorateLvMap());
		hero.getLocalHouse().setHouseLv(local.getHouseLv());
		hero.getLocalHouse().setDrawAwardTimes(local.getDrawAwardTimes());
		hero.getLocalHouse().setCompleteEventTimes(local.getCompleteEventTimes());
		hero.getLocalHouse().setCompleteEventHelpTimes(local.getCompleteEventHelpTimes());
		hero.getLocalHouse().setCompleteRobberTimes(local.getCompleteRobberTimes());
		// HouseKeeper houseKeeper = crossData.getObject(CrossEnum.data2,
		// HouseKeeper.class);
		// hero.setHouseKeeper(houseKeeper);
	}

}
