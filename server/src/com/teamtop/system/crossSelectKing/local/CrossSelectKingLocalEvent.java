package com.teamtop.system.crossSelectKing.local;

import java.util.HashMap;
import java.util.Map;

import com.teamtop.cross.CrossCache;
import com.teamtop.gameCommon.GameProperties;
import com.teamtop.houtaiHttp.events.crossActivitySwitch.CrossActivitySwitchCache;
import com.teamtop.system.crossSelectKing.CrossSelectKingConst;
import com.teamtop.system.crossSelectKing.cross.CrossSelectKingInfo;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.common.CommonUtil;

public class CrossSelectKingLocalEvent extends AbsSystemEvent {

	
	private static CrossSelectKingLocalEvent ins;
	public static CrossSelectKingLocalEvent getIns(){
		if(ins == null) {
			ins = new CrossSelectKingLocalEvent();
		}
		return ins;
	}
	@Override
	public void init(Hero hero) {
		if (hero.getCrossSelectKingLocal()==null) {
			CrossSelectKingLocal crossSelectKingLocal=new CrossSelectKingLocal();
			crossSelectKingLocal.setHid(hero.getId());
			crossSelectKingLocal.setReward(0);
			crossSelectKingLocal.setMobai(0);
			if (CrossSelectKingLocalCache.getKingInfo()!=null) {
				crossSelectKingLocal.setTrem(CrossSelectKingLocalCache.getKingInfo().getTerm());
				int num=0;
				int partId = CrossCache.getlocalPartId();
				Map<Integer, Map<Integer, Long>> winIdMap = CrossSelectKingLocalCache.getKingInfo().getWinIdMap();
				Map<Integer, Long> chamPoin = winIdMap.get(partId);
				if (chamPoin == null) {
					chamPoin = new HashMap<>();
					winIdMap.put(partId, chamPoin);
				}
				if (chamPoin != null) {
					for (int key : chamPoin.keySet()) {
						long championHid = chamPoin.get(key);
					  int zoid= CommonUtil.getZoneIdById(championHid);
					  if(GameProperties.zoneids.contains(zoid)) {
						  num++;
					  }
					}
				}
				crossSelectKingLocal.setReward(num);
			}
			hero.setCrossSelectKingLocal(crossSelectKingLocal);
		}
		
	}

	@Override
	public void login(Hero hero) {
		CrossSelectKingInfo kingInfo=CrossSelectKingLocalCache.getKingInfo();
		if (kingInfo==null) {
			return;
		}
		if (!CrossActivitySwitchCache.checkCrossOpen(SystemIdConst.CROSS_SELECT_KING)) {
			return;
		}
		int state= kingInfo.getState();
		int term=kingInfo.getTerm();
		CrossSelectKingSender.sendCmd_2100(hero.getId(),state, kingInfo.getProFlag(), kingInfo.getProState());
		if (term!=hero.getCrossSelectKingLocal().getTrem()&&state==CrossSelectKingConst.STATE_0) {
			CrossSelectKingLocalFunction.getIns().rest(hero);
		}
		if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.CROSS_SELECT_KING)) {
			return;
		}
		if (state==CrossSelectKingConst.STATE_0) {
			if (hero.getCrossSelectKingLocal().getReward()>0) {
				RedPointFunction.getIns().addLoginRedPoint(hero,SystemIdConst.CROSS_SELECT_KING, 1, RedPointConst.HAS_RED);
			}
		}
		
	}
	@Override
	public void loginReset(Hero hero,int now){
		zeroHero(hero, now);
		
	}
	@Override
	public void zeroHero(Hero hero,int now){
		CrossSelectKingInfo kingInfo=CrossSelectKingLocalCache.getKingInfo();
		if (kingInfo==null) {
			return;
		}
		if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.CROSS_SELECT_KING)) {
			return;
		}
		if (kingInfo.getState()==CrossSelectKingConst.STATE_1) {
			RedPointFunction.getIns().addLoginRedPoint(hero,SystemIdConst.CROSS_SELECT_KING, 1, RedPointConst.HAS_RED);
		}
		
	}
	

}
