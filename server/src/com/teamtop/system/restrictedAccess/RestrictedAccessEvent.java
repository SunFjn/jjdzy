package com.teamtop.system.restrictedAccess;

import java.util.HashSet;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;

public class RestrictedAccessEvent extends AbsSystemEvent {

	private static RestrictedAccessEvent ins;
	public static RestrictedAccessEvent getIns(){
		if(ins == null) {
			ins = new RestrictedAccessEvent();
		}
		return ins;
	}
	@Override
	public void init(Hero hero) {
		RestrictedAccess restrictedAccess = hero.getRestrictedAccess();
		if(restrictedAccess==null) {
			restrictedAccess = new RestrictedAccess();
			restrictedAccess.setHid( hero.getId());
			hero.setRestrictedAccess(restrictedAccess);
		}
		
		Map<Integer, Integer> numBuyedMap = restrictedAccess.getNumBuyedMap();
		if( numBuyedMap==null) {
			numBuyedMap = new ConcurrentHashMap<>();
			restrictedAccess.setNumBuyedMap(numBuyedMap);
		}
		
		Map<Integer, Integer> timeBuyedMap = restrictedAccess.getTimeBuyedMap();
		if(timeBuyedMap==null) {
			timeBuyedMap = new ConcurrentHashMap<>();
			restrictedAccess.setTimeBuyedMap(timeBuyedMap);
		}
	}
	
	@Override
	public void login(Hero hero) {

	}
	
	public void zeroHero(Hero hero,int now){
		RestrictedAccess restrictedAccess = hero.getRestrictedAccess();
		Map<Integer, Integer> numBuyedMap = restrictedAccess.getNumBuyedMap();
		Set<Integer> set = new HashSet<>(numBuyedMap.keySet());
		Iterator<Integer> iterator = set.iterator();
		while(iterator.hasNext()) {
			Integer resID = iterator.next();
			RestrictedAccessUtil.checkAndReset(hero, resID);
		}
	}
	
	public void loginReset(Hero hero,int now){
		zeroHero(hero, now);
	}

}
