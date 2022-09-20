package com.teamtop.system.tigerPass;

import java.util.HashMap;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.system.bag.BagFunction;
import com.teamtop.system.battle.BattleFunction;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.FinalFightAttr;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.system.tigerPass.model.TigerPass;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_hlg_323;
import excel.struct.Struct_hlg_323;

public class TigerPassEvent extends AbsSystemEvent{
	
	
	private static TigerPassEvent ins;
	public static TigerPassEvent getIns(){
		if(ins == null) {
			ins = new TigerPassEvent();
		}
		return ins;
	}
	
	
	@Override
	public void init(Hero hero) {
		TigerPass tigerPass = hero.getTigerPass();
		if (tigerPass==null) {
			tigerPass=new TigerPass();
			
			tigerPass.setHid(hero.getId());
			tigerPass.setBattleNum(TigerPassFunction.getIns().getInitBattleNum());
			tigerPass.setTigerPassEmployers(new HashMap<>());
			//初始化第一个boss
			tigerPass.setBossIndex(1);
			
			Struct_hlg_323 struct_hlg_323 = Config_hlg_323.getIns().get(1);
			FinalFightAttr target = BattleFunction.initNPC(struct_hlg_323.getBoss());
			tigerPass.setCurhp(target.getHpMax());
			tigerPass.setHpmax(target.getHpMax());
			
			
			tigerPass.setRewards(new HashMap<>());
			for (Struct_hlg_323 hlg_323:Config_hlg_323.getIns().getSortList()) {
				tigerPass.getRewards().put(hlg_323.getCs(), GameConst.REWARD_0);
			}
			tigerPass.setChooseNum(TigerPassFunction.getIns().getDayChooseNum());
			
			hero.setTigerPass(tigerPass);
		}else {
			if (tigerPass.getRewards().size()!=Config_hlg_323.getIns().getSortList().size()) {
				for (Struct_hlg_323 hlg_323:Config_hlg_323.getIns().getSortList()) {
					if (!tigerPass.getRewards().containsKey(hlg_323.getCs())) {
						tigerPass.getRewards().put(hlg_323.getCs(), GameConst.REWARD_0);
					}
				}
			}
		}
		if (tigerPass.getWeekRestTime()==0) {
			tigerPass.setWeekRestTime(TimeDateUtil.getMondayZeroTime());
		}
		
	}

	@Override
	public void login(Hero hero) {
		if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.TIGERPASS)) {
			return;
		}
		TigerPass tigerPass = hero.getTigerPass();

		int goodsNumBySysId = BagFunction.getIns().getGoodsNumBySysId(hero.getId(), TigerPassConst.TIGER_ITEMID);
		if (tigerPass.getBattleNum()>0||goodsNumBySysId>0||tigerPass.getJoinEmploySate()==0) {
			RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.TIGERPASS, 1, RedPointConst.HAS_RED);
		}
	}
	
	public void logout(Hero hero){
		if (TigerPassBattleCache.getTigerPassBattle().containsKey(hero.getId())) {
			TigerPassManager.getIns().die(hero);
		}
		
	}
	
	public void loginReset(Hero hero,int now){
		zeroHero(hero, now);
	}
	
	public void zeroHero(Hero hero,int now){
		if (TimeDateUtil.getWeek()==1) {
			login(hero);
		}
		TigerPassFunction.getIns().dayreset(hero);
		TigerPassManager.getIns().openUi(hero);
	}
	

}
