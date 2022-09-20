package com.teamtop.system.specialTreasure;


import java.util.HashMap;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.system.bingfa.BingFaConst;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.wujiang.WuJiangConst;

import excel.config.Config_xtcs_004;

public class SpecialTreasureEvent extends AbsSystemEvent {
	
	private static SpecialTreasureEvent ins;
	public static SpecialTreasureEvent getIns(){
		if(ins == null) {
			ins = new SpecialTreasureEvent();
		}
		return ins;
	}

	@Override
	public void init(Hero hero) {
		if (hero.getSpecialTreasure()==null) {
			SpecialTreasure specialTreasure=new SpecialTreasure();
			specialTreasure.setHid(hero.getId());
			specialTreasure.setTreasureStar(new HashMap<Integer,Integer>());
			specialTreasure.setSkills(new HashMap<>());
			for (int i = 1; i <=WuJiangConst.SKILLNUM; i++) {
				specialTreasure.getSkills().put(i,BingFaConst.SPETRESURE_SKILLID+1000*i);
			}
			specialTreasure.setJieLv(1);
			int num=Config_xtcs_004.getIns().get(SpecialTreasureConst.TAOZHUANG_NUM).getNum();
			HashMap<Integer, Integer> taozhuangs=new HashMap<Integer, Integer>();
			for (int i = 1; i <=num; i++) {
				taozhuangs.put(i, 1000*i);
			}
			specialTreasure.setTaozhuangs(taozhuangs);
			hero.setSpecialTreasure(specialTreasure);
		}else {
			SpecialTreasure specialTreasure = hero.getSpecialTreasure();
			if (specialTreasure.getSkills()==null||specialTreasure.getSkills().size()==0) {
				specialTreasure.setSkills(new HashMap<>());
				for (int i = 1; i <=WuJiangConst.SKILLNUM; i++) {
					specialTreasure.getSkills().put(i,BingFaConst.SPETRESURE_SKILLID+1000*i);
				}
				if (specialTreasure.getJieLv()==0) {
					specialTreasure.setJieLv(1);
				}
				hero.setSpecialTreasure(specialTreasure);
			}
			int num=Config_xtcs_004.getIns().get(SpecialTreasureConst.TAOZHUANG_NUM).getNum();
			if (specialTreasure.getTaozhuangs()==null||specialTreasure.getTaozhuangs().size()==0) {
				HashMap<Integer, Integer> taozhuangs=new HashMap<Integer, Integer>();
				for (int i = 1; i <=num; i++) {
					taozhuangs.put(i, 1000*i);
				}
				specialTreasure.setTaozhuangs(taozhuangs);
			}
			if (specialTreasure.getTaozhuangs().size()!=num) {
				for (int i = 1; i <=num; i++) {
					if(!specialTreasure.getTaozhuangs().containsKey(i)) {
						specialTreasure.getTaozhuangs().put(i, 1000*i);
					}
				}
			}
		}
		//觉醒之力
		SpecialTreasure specialTreasure = hero.getSpecialTreasure();
		HashMap<Integer, Integer> treasureStar = specialTreasure.getTreasureStar();
		for (Integer specialTreasureid : treasureStar.keySet()) {
			int star = treasureStar.get(specialTreasureid);
			if (star>0) {
				HashMap<Integer, HashMap<Integer, Integer>> jueXingSkills = specialTreasure.getJueXingSkills();
				if (jueXingSkills==null||jueXingSkills.size()==0) {
					jueXingSkills=new HashMap<>();
					jueXingSkills.put(specialTreasureid, new HashMap<>());
					specialTreasure.setJueXingSkills(jueXingSkills);
				}
				HashMap<Integer, Integer> hashMap = jueXingSkills.get(specialTreasureid);
				if (hashMap==null||hashMap.size()==0) {
					hashMap=new HashMap<>();
					hashMap.put(GameConst.JUEXING_SKILL1, 0);
					hashMap.put(GameConst.JUEXING_SKILL2, 0);
					hashMap.put(GameConst.JUEXING_SKILL3, 0);
					hashMap.put(GameConst.JUEXING_SKILL4, 0);
					jueXingSkills.put(specialTreasureid, hashMap);
				}
			}
			
		}
		
	}

	@Override
	public void login(Hero hero) {
		/*if (!HeroFunction.getIns().checkSystemOpen(hero, SpecialTreasureConst.SYSID)) {
			return;
		}
		boolean isHong=false;
		for (Struct_yb_217 yb_217: Config_yb_217.getIns().getSortList()) {
			int treasureid=yb_217.getId();
			if (hero.getSpecialTreasure().getTreasureStar().containsKey(treasureid)) {
				int star=hero.getSpecialTreasure().getTreasureStar().get(treasureid);
				if (star<yb_217.getStar()) {
					if (UseAddUtil.canUse(hero, Config_yb_217.getIns().get(treasureid).getItem())) {
						isHong=true;
					}
				}
			}else {
				//激活
				if (UseAddUtil.canUse(hero, Config_yb_217.getIns().get(treasureid).getItem())) {
					isHong=true;
				}
			}
		}
		//红点
		if (isHong) {
			RedPointFunction.getIns().addLoginRedPoint(hero,HeroConst.SYS_ID,SpecialTreasureConst.SYSID, RedPointConst.HAS_RED);
		}*/
		
	}
	
	@Override
	public void loginReset(Hero hero,int now){
		zeroHero(hero, now);
	}
	
	@Override
	public void zeroHero(Hero hero,int now){
		/*if (hero.getSpecialTreasure().getTreasureStar().size()>0) {
			for (int treasureid:hero.getSpecialTreasure().getTreasureStar().keySet()) {
				int star=hero.getSpecialTreasure().getTreasureStar().get(treasureid);
				HashMap<Integer, Struct_ybreward_217> map = SpecialTreasureCache.getYbrewardMap().get(treasureid);
				Struct_ybreward_217 excel = map.get(star);
				int[][] reward=excel.getReward();
				MailFunction.getIns().sendMailWithFujianData2(hero.getId(), MailConst.MAIL_ID_YIBAO, new Object[]{MailConst.MAIL_ID_YIBAO}, reward);
			}
		}*/
		
	}

}
