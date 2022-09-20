package com.teamtop.system.redBox;

import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.GameProperties;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.system.redBox.cross.RedBoxCross;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.system.sevenHappy.SevenHappyConst;
import com.teamtop.util.common.CommonUtil;

import excel.config.Config_xtcs_004;
import excel.struct.Struct_xtcs_004;

public class RedBoxEvent extends AbsSystemEvent {
	public static RedBoxEvent ins;
	public static synchronized RedBoxEvent getIns() {
		if(ins == null){
			ins = new RedBoxEvent();
		}
		return ins;
	}
	private RedBoxEvent() {
	}
	
	
	@Override
	public void init(Hero hero) {
		RedBox redBox = hero.getRedBox();
		if (redBox==null) {
			redBox=new RedBox();
			redBox.setHid(hero.getId());
			redBox.setSendNum(0);
			redBox.setGoldYuanBao(0);
			hero.setRedBox(redBox);
		}
		
	}
	@Override
	public void login(Hero hero) {
		ConcurrentHashMap<Long, RedBoxCross> redBoxMap = RedBoxLocalCache.getRedBoxMap();
		for (RedBoxCross redBoxCross: redBoxMap.values()) {
			if (redBoxCross.getLeftNum()>0) {
				RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.REDBOX,0,RedPointConst.HAS_RED);
				return;
			}
		}
		if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.REDBOX)) {
			return ;
		}
		Struct_xtcs_004 struct_xtcs_004 = Config_xtcs_004.getIns().get(RedBoxConst.MIN);
		int min=struct_xtcs_004.getNum();
		if (hero.getRedBox().getGoldYuanBao()>=min) {
			RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.REDBOX,0,RedPointConst.HAS_RED);
			return;
		}
		
		
	}
	
	@Override
	public void loginReset(Hero hero,int now){
		RedBoxFunction.getIns().localZero(hero);
	}
	
	@Override
	public void zeroHero(Hero hero,int now){
		RedBoxFunction.getIns().localZero(hero);
	}
	
	@Override
	public void zeroPub(int now){
		RedBoxFunction.getIns().localCacheZero();
	}
	
	
}
