package com.teamtop.system.zhanjia;

import java.util.HashMap;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;

import excel.config.Config_xtcs_004;

public class ZhanJiaEvent extends AbsSystemEvent{

	private static ZhanJiaEvent ins;
	public static ZhanJiaEvent getIns(){
		if(ins == null) {
			ins = new ZhanJiaEvent();
		}
		return ins;
	}
	
	@Override
	public void init(Hero hero) {
		if (hero.getZhanJia()==null) {
			ZhanJia zhanJia=new ZhanJia();
			zhanJia.setHid(hero.getId());
			zhanJia.setJieLv(1);
			//拥有战甲
			zhanJia.setZhanjias(new HashMap<Integer,ZhanJiaModel>());
			//战甲套装
			HashMap<Integer, Integer> taozhuangs=new HashMap<Integer, Integer>();
			int taozhuangSize=Config_xtcs_004.getIns().get(ZhanJiaConst.TAOZHUANGNUM).getNum();
			for (int i = 1; i <=taozhuangSize; i++) {
				taozhuangs.put(i, 1000*i);
			}
			zhanJia.setTaozhuangs(taozhuangs);
			//战甲技能
			HashMap<Integer, Integer> zhanJiaSkill=new HashMap<Integer, Integer>();
			for (int i = 1; i <=ZhanJiaConst.SKILLNUM; i++) {
				zhanJiaSkill.put(i,ZhanJiaConst.SKILL_ID+1000*i);
			}
			zhanJia.setZhanJiaSkill(zhanJiaSkill);
			hero.setZhanJia(zhanJia);
		}else {
			int taozhuangSize=Config_xtcs_004.getIns().get(ZhanJiaConst.TAOZHUANGNUM).getNum();
			ZhanJia zhanJia=hero.getZhanJia();
			if (zhanJia.getTaozhuangs().size()!=taozhuangSize) {
				for (int i = 1; i <=taozhuangSize; i++) {
					if (!zhanJia.getTaozhuangs().containsKey(i)) {
						zhanJia.getTaozhuangs().put(i, 1000*i);
					}
				}
			}
		}
		//觉醒之力
		ZhanJia zhanJia = hero.getZhanJia();
		HashMap<Integer, ZhanJiaModel> zhanjias = zhanJia.getZhanjias();
		if (zhanjias!=null) {
			for (Integer zhanjiaid : zhanjias.keySet()) {
				ZhanJiaModel zhanJiaModel = zhanjias.get(zhanjiaid);
				HashMap<Integer, Integer> jueXingSkills = zhanJiaModel.getJueXingSkills();
				if (jueXingSkills==null||jueXingSkills.size()==0) {
					jueXingSkills=new HashMap<>();
					jueXingSkills.put(GameConst.JUEXING_SKILL1, 0);
					jueXingSkills.put(GameConst.JUEXING_SKILL2, 0);
					jueXingSkills.put(GameConst.JUEXING_SKILL3, 0);
					jueXingSkills.put(GameConst.JUEXING_SKILL4, 0);
					zhanJiaModel.setJueXingSkills(jueXingSkills);
				}
			}
		}
	}

	@Override
	public void login(Hero hero) {
		//觉醒红点
		ZhanJiaFunction.getIns().jueXingRedPonint(hero,true);
	}

}
