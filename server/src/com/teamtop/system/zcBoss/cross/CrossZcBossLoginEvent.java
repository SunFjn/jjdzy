package com.teamtop.system.zcBoss.cross;

import java.util.List;

import com.alibaba.fastjson.TypeReference;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.CrossEnum;
import com.teamtop.cross.connEvent.AbsCrossLoginEvent;
import com.teamtop.cross.connEvent.CrossSelectRoom;
import com.teamtop.gameCommon.GameProperties;
import com.teamtop.netty.server.server2.Client_2;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.zcBoss.ZcBossHero;
import com.teamtop.system.zcBoss.ZcBossHeroManager;

import io.netty.channel.Channel;

public class CrossZcBossLoginEvent extends AbsCrossLoginEvent {
	
	private static CrossZcBossLoginEvent ins = null;

	public static CrossZcBossLoginEvent getIns() {
		if (ins == null) {
			ins = new CrossZcBossLoginEvent();
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
		ZcBossHero zcBossHero = hero.getZcBossHero();
		int goalIndex=zcBossHero.getBossIndex();
		ZcBossCrossFunction.getIns().joinCrossZcboss(hero, goalIndex);
	}
	
	@Override
	public void localBeforeUpload(Hero hero, Channel channel, Object[] crossLoginParam, CrossData crossData) {
		ZcBossHero zcBossHero = hero.getZcBossHero();
		if (zcBossHero!=null) {
			crossData.putObject(CrossEnum.data1, zcBossHero);
		}
		
	}
	
	@Override
	public CrossData crossAfterReciSucc(Hero hero, Channel channel, Object[] crossLoginParam, CrossData crossData) {
		ZcBossHero zcBossHero  = crossData.getObject(CrossEnum.data1,new TypeReference<ZcBossHero>() {}.getType());
		hero.setZcBossHero(zcBossHero);
		return super.crossAfterReciSucc(hero, channel, crossLoginParam, crossData);
		
	}
	
	@Override
	public void crossLogout(Hero hero, CrossData crossData) {
		ZcBossHeroManager.getIns().quit(hero);
	}

	@Override
	public void localAfterLogout(Hero hero, CrossData crossData) {
		ZcBossHeroManager.getIns().quit(hero);
	}
	

}
