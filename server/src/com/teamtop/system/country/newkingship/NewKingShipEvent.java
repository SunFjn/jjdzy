package com.teamtop.system.country.newkingship;

import java.util.Collection;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.system.country.CountryFunction;
import com.teamtop.system.country.CountrySysCache;
import com.teamtop.system.country.model.Country;
import com.teamtop.system.countrySkill.CountrySkillFunction;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.title.TitleFunction;
import com.teamtop.util.log.LogTool;

import excel.config.Config_xwwzdnpc_311;
import excel.struct.Struct_xwwzdnpc_311;

public class NewKingShipEvent extends AbsSystemEvent {

	
	public static NewKingShipEvent ins;

	public static NewKingShipEvent getIns() {
		if (ins == null) {
			ins = new NewKingShipEvent();
		}
		return ins;
	}

	private NewKingShipEvent() {
		
	}
	
	
	@Override
	public void init(Hero hero) {
		NewKingWar newKingWar = hero.getNewKingWar();
		if (newKingWar==null) {
			newKingWar=new NewKingWar();
			newKingWar.setHid(hero.getId());
			newKingWar.setBattleNum(NewKingShipConst.BATTLENUM);
			newKingWar.setIsHasReward(0);
			hero.setNewKingWar(newKingWar);
		}
		
	}

	@Override
	public void login(Hero hero) {
		//遍历战斗
		ConcurrentHashMap<Integer, long[]> battleMap = NewKingShipCache.getBattleMap();
		int moveid=0;
		if (battleMap.size()>0) {
			for (int key:battleMap.keySet()) {
				long[] ls = battleMap.get(key);
				long hida = ls[0];
				if (hida==hero.getId()) {
					LogTool.info("logout hid is atting:"+hero.getId()+" key:"+key, NewKingShipEvent.class);
					moveid=key;
				}
			}
		}
		if (moveid!=0) {
			battleMap.remove(moveid);
		}
		NewKingShipFunction.getIns().startRedPoint(hero, true);// 红点
		
	}
	
	@Override
	public void logout(Hero hero){
		ConcurrentHashMap<Integer, long[]> battleMap = NewKingShipCache.getBattleMap();
		int moveid=0;
		if (battleMap.size()>0) {
			for (int key:battleMap.keySet()) {
				long[] ls = battleMap.get(key);
				long hida = ls[0];
				if (hida==hero.getId()) {
					LogTool.info("logout hid is atting:"+hero.getId()+" key:"+key, NewKingShipEvent.class);
					moveid=key;
				}
			}
		}
		if (moveid!=0) {
			battleMap.remove(moveid);
		}		
	}
	
	/**
	 * 王位之争开启处理
	 */
	public void fixTimeStart() {
		//初始化 三国王位之争npc
		NewKingShipSysCache newKingShipSysCache = NewKingShipCache.getNewKingShipSysCache();
		for (Struct_xwwzdnpc_311  xwwzdnpc_311:Config_xwwzdnpc_311.getIns().getSortList()) {
			int countryId=xwwzdnpc_311.getSite()/100;
			if(!newKingShipSysCache.getJoinerNewKingShiper().containsKey(countryId)) {
				newKingShipSysCache.getJoinerNewKingShiper().put(countryId, new ConcurrentHashMap<Integer, NewKingShip>());
			}
			ConcurrentHashMap<Integer, NewKingShip> concurrentHashMap = newKingShipSysCache.getJoinerNewKingShiper().get(countryId);
			NewKingShip newKingShip=new NewKingShip();
			newKingShip.setType(NewKingShipConst.TYPE_0);
			newKingShip.setNpcid(xwwzdnpc_311.getNpc());
			newKingShip.setSit(xwwzdnpc_311.getSite());
			newKingShip.setId(xwwzdnpc_311.getNpc());
			concurrentHashMap.put(xwwzdnpc_311.getSite(), newKingShip);
		}
		NewKingShipCache.isWWStartTime = true;
		Collection<Hero> values = HeroCache.getHeroMap().values();
		for (Hero hero : values) {// 王位之争开启红点
			if (hero.getCountryType() != 0
					&& HeroFunction.getIns().checkSystemOpen(hero, NewKingShipConst.COUNTRY_KINGSHIP)) {
				//KingShipFunction.getIns().startRedPoint(hero, false);
			}
		}
	}

	/**
	 * 王位之争关闭处理
	 */
	public void fixTimeEnd() {
		NewKingShipCache.isWWStartTime = false;
		NewKingShipSysCache newKingShipSysCache = NewKingShipCache.getNewKingShipSysCache();
		ConcurrentHashMap<Integer, Country> countryMap = CountrySysCache.getCountryCache().getCountryMap();
		for (Country country : countryMap.values()) {
			ConcurrentHashMap<Integer, NewKingShip> concurrentHashMap = newKingShipSysCache.getJoinerNewKingShiper().get(country.getCid());
			if (concurrentHashMap!=null) {
				for (NewKingShip newKingShip:concurrentHashMap.values()) {
					if (newKingShip.getType()==NewKingShipConst.TYPE_1) {
						for (Struct_xwwzdnpc_311 xwwzdnpc_311: Config_xwwzdnpc_311.getIns().getSortList()) {
							if (xwwzdnpc_311.getSite()==newKingShip.getSit()) {
								TitleFunction.getIns().addTitle(newKingShip.getId(), xwwzdnpc_311.getCh());
							}
						}
						
					}
				}
			}
			
		}
		CountryFunction.getIns().kingShipDatatoDB();
		Collection<Hero> values = HeroCache.getHeroMap().values();
		for (Hero hero : values) {// 王位之争关闭红点
			if (hero.getCountryType() != 0
					&& HeroFunction.getIns().checkSystemOpen(hero, NewKingShipConst.COUNTRY_KINGSHIP)) {
				//KingShipFunction.getIns().endRedPoint(hero, false);
			}
		}
	}
	
	/*
	 * 从开服开始每三天一轮换，每三天的第一天19.30-20.30开启
	 */
	@Override
	public void fixTime(int cmdId, int now) {
		if (cmdId == 1) { // 每周一00:05开启
			if (NewKingShipCache.getIns().isStartWeek()) {
				//国家技能国王红点取消
				CountrySkillFunction.getIns().redPointCancel(true);
				fixTimeStart();
				NewKingShipCache.updateGlobalData();
			}
		}
		if (cmdId == 2) {// 每周一22:00关闭
			if (NewKingShipCache.getIns().isStartWeek()) {
				fixTimeEnd();
				//国家技能国王红点开启
				CountrySkillFunction.getIns().redPointCancel(false);
				NewKingShipCache.updateGlobalData();
			}
		}
		if (cmdId == 3) {// 每天00:00
			if (NewKingShipCache.getIns().isStartWeek()) {
				ConcurrentHashMap<Integer, Country> countryMap = CountrySysCache.getCountryCache().getCountryMap();
				for (Country country : countryMap.values()) {
					removeTitle(country);
				}
				NewKingShipCache.updateGlobalData();
			}
		}

	}
	/**
	 * 取消称号
	 * @param country
	 */
	public void removeTitle(Country country) {
		NewKingShipSysCache newKingShipSysCache = NewKingShipCache.getNewKingShipSysCache();
		ConcurrentHashMap<Integer, NewKingShip> concurrentHashMap = newKingShipSysCache.getJoinerNewKingShiper().get(country.getCid());
		for (NewKingShip newKingShip:concurrentHashMap.values()) {
			if (newKingShip.getType()==NewKingShipConst.TYPE_1) {
				for (Struct_xwwzdnpc_311 xwwzdnpc_311: Config_xwwzdnpc_311.getIns().getSortList()) {
					if (xwwzdnpc_311.getSite()==newKingShip.getSit()) {
						TitleFunction.getIns().removeTitle(newKingShip.getId(), xwwzdnpc_311.getCh());
					}
				}
			
			}
		}
	
	}
	/**
	 * 
	 * @param hero
	 * @param now
	 */
	public void zeroHero(Hero hero,int now){
		NewKingShipFunction.getIns().resetKingShipData(hero);
	}
	/**
	 * 
	 * @param hero
	 * @param now
	 */
	public void loginReset(Hero hero,int now){
		zeroHero(hero, now);
	}

}
