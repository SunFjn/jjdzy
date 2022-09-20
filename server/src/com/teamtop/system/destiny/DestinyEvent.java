package com.teamtop.system.destiny;

import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.system.destiny.model.DestinyBagData;
import com.teamtop.system.destiny.model.PersonalDestiny;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;

import excel.config.Config_bzt_261;
import excel.struct.Struct_bzt_261;


public class DestinyEvent extends AbsSystemEvent{
	
	private static DestinyEvent ins = null;
	public static DestinyEvent getIns(){
		if(ins == null){
			ins = new DestinyEvent();
		}
		return ins;
	}
	
	
	@Override
	public void init(Hero hero) {
		//初始化天命心法
		PersonalDestiny personalDestiny=hero.getPersonalDestiny();
		if (personalDestiny==null) {
			personalDestiny=new PersonalDestiny();
			personalDestiny.setHid(hero.getId());
			personalDestiny.setFeelNum(DestinyConst.FEEL_NUM);
			ConcurrentHashMap<Integer, DestinyBagData> bagData = new ConcurrentHashMap<Integer, DestinyBagData>();
			personalDestiny.setBagData(bagData);
			ConcurrentHashMap<Integer, ConcurrentHashMap<Integer,DestinyBagData>> bodyData = new ConcurrentHashMap<Integer, ConcurrentHashMap<Integer,DestinyBagData>>();
			personalDestiny.setBodyData(bodyData);
			bodyData.put(0, new ConcurrentHashMap<Integer, DestinyBagData>());
			personalDestiny.setGodFuChange(new ConcurrentHashMap<Integer, Integer>());
			hero.setPersonalDestiny(personalDestiny);
		}else if (personalDestiny.getGodFuChange()==null) {
			personalDestiny.setGodFuChange(new ConcurrentHashMap<Integer, Integer>());
		}
		
		
	}

	@Override
	public void login(Hero hero) {
		//角色等级小于开启等级
		if(!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.DESTINY_SYSID)){
			return;
		}
		PersonalDestiny personalDestiny=hero.getPersonalDestiny();
		ConcurrentHashMap<Integer, DestinyBagData> bodyData = personalDestiny.getBodyData().get(0);
		if (bodyData.size()==0) {
			for (Struct_bzt_261 xitongkaiqi_104:Config_bzt_261.getIns().getSortList()) {
				if(hero.getRealLevel() >= xitongkaiqi_104.getLv()){
					//判断是否解锁
					if (xitongkaiqi_104.getVip()==0&&xitongkaiqi_104.getLv()==0) {
						//特殊孔不直接开
					}else {						
						DestinyFunction.getIns().jieSuoDestiny(hero,xitongkaiqi_104.getId());
					}
				}
			}
			DestinyFunction.getIns().vipadd(hero);
		}
		DestinyFunction.getIns().readPoint(hero);
		DestinyFunction.getIns().destinyMasterRedPoint(hero,true);
		
	}
	
	@Override
	public void levelUp(Hero hero, int newLv, int oldLv) {
		//角色等级小于开启等级
		if(!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.DESTINY_SYSID)){
			return;
		}
		for (Struct_bzt_261 xitongkaiqi_104:Config_bzt_261.getIns().getSortList()) {
			if(newLv == xitongkaiqi_104.getLv()){
				//判断是否解锁
				if (xitongkaiqi_104.getVip()==0&&xitongkaiqi_104.getLv()==0) {
					//特殊孔不直接开
				}else {					
					DestinyFunction.getIns().jieSuoDestiny(hero,xitongkaiqi_104.getId());
				}
			}
		}
		DestinyFunction.getIns().vipadd(hero);
	}
	
	@Override
	public void loginReset(Hero hero, int now) {
		//重置每日元宝修炼次数
		PersonalDestiny personalDestiny=hero.getPersonalDestiny();
		if (personalDestiny!=null) {
			personalDestiny.setFeelNum(DestinyConst.FEEL_NUM);
			personalDestiny.setCoinNum(0);
		}
	}

	@Override
	public void zeroHero(Hero hero, int now) {
		//重置每日元宝修炼次数
		PersonalDestiny personalDestiny=hero.getPersonalDestiny();
		if (personalDestiny!=null) {
			personalDestiny.setFeelNum(DestinyConst.FEEL_NUM);
			personalDestiny.setCoinNum(0);
		}
	}
}
