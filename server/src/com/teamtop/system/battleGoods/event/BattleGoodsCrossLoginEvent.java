package com.teamtop.system.battleGoods.event;

import java.util.List;

import com.teamtop.cross.CrossData;
import com.teamtop.cross.connEvent.AbsCrossLoginEvent;
import com.teamtop.cross.connEvent.CrossSelectRoom;
import com.teamtop.gameCommon.GameProperties;
import com.teamtop.netty.server.server2.Client_2;
import com.teamtop.system.battleGoods.BattleGoodConst;
import com.teamtop.system.battleGoods.BattleGoodsFunction;
import com.teamtop.system.battleGoods.BattleGoodsManager;
import com.teamtop.system.battleGoods.cache.BattleGoodSyscache;
import com.teamtop.system.hero.Hero;

import io.netty.channel.Channel;

public class BattleGoodsCrossLoginEvent extends AbsCrossLoginEvent {

	private static BattleGoodsCrossLoginEvent ins = null;

	public static BattleGoodsCrossLoginEvent getIns() {
		if (ins == null) {
			ins = new BattleGoodsCrossLoginEvent();
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
		BattleGoodsFunction.getIns().joinBattleGood(hero);
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
		if (BattleGoodSyscache.State!=BattleGoodConst.ACT_STATE_2) {
			//关闭中
			return;
		}
		BattleGoodsManager.getIns().outscene(hero);
		//ZcBossHeroManager.getIns().quit(hero);
	}

	@Override
	public void localAfterLogout(Hero hero, CrossData crossData) {
		//BattleGoodsManager.getIns().outscene(hero);
		//ZcBossHeroManager.getIns().quit(hero);
	}

}
