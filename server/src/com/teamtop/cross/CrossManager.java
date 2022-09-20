package com.teamtop.cross;

import com.teamtop.cross.connEvent.AbsCrossLoginEvent;
import com.teamtop.cross.connEvent.CrossLoginCache;
import com.teamtop.houtaiHttp.events.crossActivitySwitch.CrossActivitySwitchCache;
import com.teamtop.netty.firewall.skyeye.SkyEyeCache;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.global.GlobalCmd;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroManager;
import com.teamtop.util.log.LogTool;

import io.netty.channel.Channel;

public class CrossManager {
	private static CrossManager ins = null;

	public static CrossManager getIns() {
		if (ins == null) {
			ins = new CrossManager();
		}
		return ins;
	}

	
	/**
	 * 请求登陆跨服
	 * @param pwd 验证码
	 */
	public void loginCross(Channel channel,  long hid) {
		if (!CrossZone.isCrossServer())
			return;
		Hero hero = HeroCache.getHero(hid);
		if (hero == null) {
			LogTool.warn("login cross,hero has not cache,hid:" + hid, this);
			return;
		}
		int zoneid = hero.getZoneid();
		int crossLoginType = hero.getTempVariables().getCrossLoginType();
		if (!CrossActivitySwitchCache.checkCrossCentralOpen(crossLoginType, zoneid)) {
			NettyWrite.writeData(channel, new Object[] { 2, crossLoginType }, GlobalCmd.GC_NoticeFunMsg_256);
			return;
		}
		AbsCrossLoginEvent event = CrossLoginCache.getEvent(crossLoginType);
		if (event == null) {
			LogTool.warn("loginCross,can not found event,crossLoginType:" + crossLoginType, this);
			return;
		}
		HeroManager.getIns().bindHeroChannel(channel, hero);
		SkyEyeCache.removeChannelConn(channel);
		CrossSender.sendCmd_1664(hid, 0);
//		SceneCache.setSceneControl(hero.getId(), true);
		event.crossAfterLoginSucc(hero,hero.getTempVariables().getCrossLoginRoomId());
		LogTool.info("Cross login end.hid:"+hid+" name:"+hero.getName(), this);
	}

	/**
	 * 进入场景
	 * @param sceneId 地图ID
	 */
	public void inScene(Hero hero, int sceneId) {

	}
	/**
	 * 心跳包
	 * @param hero
	 */
	public void crossHeart(Hero hero) {
		if (!CrossZone.isCrossServer())
			return;
		CrossSender.sendCmd_1668(hero.getId());
	}
}
