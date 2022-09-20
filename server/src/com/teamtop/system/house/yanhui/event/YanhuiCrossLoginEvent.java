package com.teamtop.system.house.yanhui.event;

import java.util.List;

import com.teamtop.cross.CrossData;
import com.teamtop.cross.connEvent.AbsCrossLoginEvent;
import com.teamtop.cross.connEvent.CrossSelectRoom;
import com.teamtop.gameCommon.GameProperties;
import com.teamtop.netty.server.server2.Client_2;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.house.yanhui.YanhuiManager;
import com.teamtop.system.house.yanhui.cross.YanhuiCrossFunction;

import io.netty.channel.Channel;

public class YanhuiCrossLoginEvent extends AbsCrossLoginEvent {

	private static YanhuiCrossLoginEvent ins = null;

	public static YanhuiCrossLoginEvent getIns() {
		if (ins == null) {
			ins = new YanhuiCrossLoginEvent();
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
		//YanhuiCrossFunction.getIns().in(hero);
		YanhuiCrossFunction.getIns().inCrossScene(hero);
	}
	
	@Override
	public void localBeforeUpload(Hero hero, Channel channel, Object[] crossLoginParam, CrossData crossData) {
		
	}
	
	@Override
	public CrossData crossAfterReciSucc(Hero hero, Channel channel, Object[] crossLoginParam, CrossData crossData) {
		return crossData;
	}
	
	@Override
	public void crossLogout(Hero hero, CrossData crossData) {
		YanhuiManager.getIns().quit(hero);
	}

	@Override
	public void localAfterLogout(Hero hero, CrossData crossData) {
	}

}
