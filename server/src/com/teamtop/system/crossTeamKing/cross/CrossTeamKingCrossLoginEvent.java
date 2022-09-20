package com.teamtop.system.crossTeamKing.cross;

import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

import com.alibaba.fastjson.TypeReference;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.CrossEnum;
import com.teamtop.cross.connEvent.AbsCrossLoginEvent;
import com.teamtop.cross.connEvent.CrossSelectRoom;
import com.teamtop.gameCommon.GameProperties;
import com.teamtop.netty.server.server2.Client_2;
import com.teamtop.system.crossTeamKing.CrossTeamKingFunction;
import com.teamtop.system.crossTeamKing.CrossTeamKingManager;
import com.teamtop.system.crossTeamKing.CrossTeamKingSender;
import com.teamtop.system.crossTeamKing.local.CrossTeamKingLocal;
import com.teamtop.system.hero.Hero;

import io.netty.channel.Channel;

public class CrossTeamKingCrossLoginEvent  extends AbsCrossLoginEvent{
	
	private static CrossTeamKingCrossLoginEvent ins = null;

	public static CrossTeamKingCrossLoginEvent getIns() {
		if (ins == null) {
			ins = new CrossTeamKingCrossLoginEvent();
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
		//CrossTeamKingLocal crossTeamKingLocal = hero.getCrossTeamKingLocal();
		ConcurrentHashMap<Long, CrossTeamKingter> teamidMapByHid = CrossTeamKingCroCache.getTeamidMapByHid();
		if (teamidMapByHid.containsKey(hero.getId())) {
			CrossTeamKingManager.getIns().exitteam(hero);
			teamidMapByHid.remove(hero.getId());
		}
		CrossTeamKingFunction.getIns().broadCastTeamInfoForHero(hero);
		CrossTeamKingSender.sendCmd_10860(hero.getId());
	}
	
	@Override
	public void localBeforeUpload(Hero hero, Channel channel, Object[] crossLoginParam, CrossData crossData) {
		CrossTeamKingLocal crossTeamKingLocal = hero.getCrossTeamKingLocal();
		if (crossTeamKingLocal!=null) {
			crossData.putObject(CrossEnum.data1, crossTeamKingLocal);
		}
	}
	
	@Override
	public CrossData crossAfterReciSucc(Hero hero, Channel channel, Object[] crossLoginParam, CrossData crossData) {
		CrossTeamKingLocal crossTeamKingLocal  = crossData.getObject(CrossEnum.data1,new TypeReference<CrossTeamKingLocal>() {}.getType());
		hero.setCrossTeamKingLocal(crossTeamKingLocal);
		return super.crossAfterReciSucc(hero, channel, crossLoginParam, crossData);
	}
	
	@Override
	public void crossLogout(Hero hero, CrossData crossData) {
		CrossTeamKingManager.getIns().exitteam(hero);
		CrossTeamKingLocal crossTeamKingLocal = hero.getCrossTeamKingLocal();
		if (crossTeamKingLocal!=null) {
			crossData.putObject(CrossEnum.data1, crossTeamKingLocal);
		}
	}

	@Override
	public void localAfterLogout(Hero hero, CrossData crossData) {
		CrossTeamKingLocal crossTeamKingLocal  = crossData.getObject(CrossEnum.data1,new TypeReference<CrossTeamKingLocal>() {}.getType());
		if (crossTeamKingLocal!=null) {
			//只更新 积分  剩余场数 胜场数量 
			CrossTeamKingLocal crossTeamKingLocal2 = hero.getCrossTeamKingLocal();
			crossTeamKingLocal2.setJf(crossTeamKingLocal.getJf());
			crossTeamKingLocal2.setBattleWinNum(crossTeamKingLocal.getBattleWinNum());
		}
		
	}
	
}
