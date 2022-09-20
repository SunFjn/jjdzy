package com.teamtop.system.crossKing.local;

import java.util.HashMap;
import java.util.Map;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.houtaiHttp.events.crossActivitySwitch.CrossActivitySwitchCache;
import com.teamtop.system.crossKing.CrossKingConst;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;

import excel.config.Config_lsxx_232;
import excel.config.Config_lsxxbp_232;
import excel.config.Config_lsxxstore_232;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_lsxx_232;
import excel.struct.Struct_lsxxbp_232;
import excel.struct.Struct_lsxxstore_232;

/**
 * 最强王者个人事件
 * @author lobbyer
 * @date 2016年8月29日
 */
public class CrossKingLocalEvent extends AbsSystemEvent {
	private static CrossKingLocalEvent ins;
	public static CrossKingLocalEvent getIns(){
		if(ins == null) {
			ins = new CrossKingLocalEvent();
		}
		return ins;
	}
	@Override
	public void init(Hero hero) {
		CrossKing crossKing = hero.getCrossKing();
		if(crossKing == null) {
			crossKing = new CrossKing(hero.getId());
			crossKing.setChallCount(Config_xtcs_004.getIns().get(CrossKingConst.DAYNUM_COST).getNum());
			//积分奖励
			Map<Integer, Integer> jfReward=new HashMap<Integer, Integer>();
			for (Struct_lsxxbp_232 lsxxbp_232: Config_lsxxbp_232.getIns().getSortList()) {
				jfReward.put(lsxxbp_232.getId(), GameConst.REWARD_0);
			}
			crossKing.setScoreReward(jfReward);
			//晋级奖励
			Map<Integer, Integer> jingJiReward=new HashMap<Integer, Integer>();
			for (Struct_lsxx_232 lsxx_232: Config_lsxx_232.getIns().getSortList()) {
				if (lsxx_232.getDan()!=CrossKingConst.INIT_TYPE) {
					jingJiReward.put(lsxx_232.getDan(), GameConst.REWARD_0);
				}
			}
			crossKing.setJingJiReward(jingJiReward);
			hero.setCrossKing(crossKing);
		}
		if (crossKing.getShopItems()==null||crossKing.getShopItems().size()==0) {
			Map<Integer, Integer> shopItems=new HashMap<Integer, Integer>();
			for (Struct_lsxxstore_232 lsxxstore_232: Config_lsxxstore_232.getIns().getSortList()) {
				shopItems.put(lsxxstore_232.getId(),GameConst.REWARD_0);
			}
			crossKing.setShopItems(shopItems);
			
		}
	}
	@Override
	public void loginReset(Hero hero, int now) {
		CrossKing crossKing = hero.getCrossKing();
		if(crossKing != null) {
			//判断发送奖励
			crossKing.zeroReset();
		}
	}
	@Override
	public void zeroHero(Hero hero, int now) {
		CrossKing crossKing = hero.getCrossKing();
		if(crossKing != null) {
			//发送奖励
			crossKing.zeroReset();
		}
	}
	@Override
	public void login(Hero hero) {
		if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.CROSS_KING)) {
			return;
		}
		if (!CrossActivitySwitchCache.checkCrossOpen(SystemIdConst.CROSS_KING)) {
			return;
		}
		if (CrossKingLocalCache.getIsbeatMap().containsKey(hero.getId())) {
			CrossKingSender.sendCmd_1892(hero.getId());
		}
		CrossKingManager.getIns().openShop(hero);
		if(CrossKingLocalCache.getInfo()!=null) {
			CrossKingSender.sendCmd_1860(hero.getId(), CrossKingLocalCache.getInfo().getState());
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.CROSS_KING)) {
				return;
			}
			if(CrossKingLocalCache.getInfo().getState() != CrossKingConst.STATE_START) {
				return;
			}
			CrossKing king = hero.getCrossKing();
			if(king == null) return;
			if (king.getTerm()!=CrossKingLocalCache.getInfo().getTerm()) {
				//不同赛季 重置
				king.termReset(hero.getBelongZoneid());
			}
			if (king.getChallCount()>0) {
				RedPointFunction.getIns().addLoginRedPoint(hero,SystemIdConst.CROSS_KING, 1, RedPointConst.HAS_RED);
				return;
			}
			Map<Integer, Integer> scoreReward = king.getScoreReward();
			int sumScore=king.getScore();
			for (Struct_lsxxbp_232 lsxxbp_232: Config_lsxxbp_232.getIns().getSortList()) {
				if (!scoreReward.containsKey(lsxxbp_232.getId())) {
					scoreReward.put(lsxxbp_232.getId(), GameConst.REWARD_0);
				}
				if (scoreReward.get(lsxxbp_232.getId())==GameConst.REWARD_1&&sumScore>=lsxxbp_232.getBp()) {
					RedPointFunction.getIns().addLoginRedPoint(hero,SystemIdConst.CROSS_KING, 1, RedPointConst.HAS_RED);
					return;
				}
			}
		}
	}
}
