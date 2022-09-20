package com.teamtop.system.wujiang;

import java.util.HashMap;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.system.archive.ArchiveConst;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.system.skill.SkillConst;
import com.teamtop.system.skill.SkillFunction;

import excel.config.Config_drug_200;
import excel.config.Config_hero_211;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_hero_211;

public class WuJiangEvent extends AbsSystemEvent {
	
	private static WuJiangEvent ins;
	public static WuJiangEvent getIns(){
		if(ins == null) {
			ins = new WuJiangEvent();
		}
		return ins;
	}

	@Override
	public void init(Hero hero) {
		if (hero.getWujiang()==null) {
			WuJiang wuJiang=new WuJiang();
			wuJiang.setHid(hero.getId());
			HashMap<Integer, WuJiangModel> wujiangs=new HashMap<Integer, WuJiangModel>();
			WuJiangModel wuJiangModel=new WuJiangModel();
			wuJiangModel.setType(hero.getJob());
			wuJiangModel.setStar(1);
			//觉醒之力
			HashMap<Integer, Integer> jueXingSkills=new HashMap<>();
			jueXingSkills.put(GameConst.JUEXING_SKILL1, 0);
			jueXingSkills.put(GameConst.JUEXING_SKILL2, 0);
			jueXingSkills.put(GameConst.JUEXING_SKILL3, 0);
			jueXingSkills.put(GameConst.JUEXING_SKILL4, 0);
			wuJiangModel.setJueXingSkills(jueXingSkills);
			
			int skill=Config_hero_211.getIns().get(hero.getJob()).getSkills()[3][0];
			SkillFunction.getIns().changeSkill(hero, SkillConst.skiil_site_4, skill, 1);
			wujiangs.put(hero.getJob(), wuJiangModel);
			wuJiang.setWujiangs(wujiangs);
			wuJiang.setJieLv(1);
			wuJiang.setWujiangSkill(new HashMap<Integer,Integer>());
			for (int i = 1; i <=WuJiangConst.SKILLNUM; i++) {
				wuJiang.getWujiangSkill().put(i,WuJiangConst.SKILL_ID+1000*i);
			}
			int num=Config_xtcs_004.getIns().get(WuJiangConst.TAOZHUANG_NUM).getNum();
			HashMap<Integer, Integer> taozhuangs=new HashMap<Integer, Integer>();
			for (int i = 1; i <=num; i++) {
				taozhuangs.put(i, 1000*i);
			}
			wuJiang.setTaozhuangs(taozhuangs);
			//2019/06/22 重置羁绊
			wuJiang.setRestTaoZhuang(1);
			hero.setWujiang(wuJiang);
		}else {
			WuJiang wuJiang=hero.getWujiang();
			int num=Config_xtcs_004.getIns().get(WuJiangConst.TAOZHUANG_NUM).getNum();
			if (wuJiang.getTaozhuangs()==null||wuJiang.getTaozhuangs().size()==0) {
				HashMap<Integer, Integer> taozhuangs=new HashMap<Integer, Integer>();
				for (int i = 1; i <=num; i++) {
					taozhuangs.put(i, 1000*i);
				}
				wuJiang.setTaozhuangs(taozhuangs);
			}
			if (wuJiang.getTaozhuangs().size()!=num) {
				for (int i = 1; i <=num; i++) {
					if (!wuJiang.getTaozhuangs().containsKey(i)) {
						wuJiang.getTaozhuangs().put(i, 1000*i);
					}
				}
			}
			
		}
		if (hero.getDanyao()==null) {
			hero.setDanyao(new HashMap<Integer, Integer>());
			for (int i = 1; i <=Config_drug_200.getIns().getSortList().size(); i++) {
				hero.getDanyao().put(i, 0);
			}
		}
		//觉醒之力初始化
		WuJiang wujiang = hero.getWujiang();
		HashMap<Integer, WuJiangModel> wujiangs = wujiang.getWujiangs();
		for (Integer wuJiangid : wujiangs.keySet()) {
			WuJiangModel wuJiangModel=wujiangs.get(wuJiangid);
			HashMap<Integer, Integer> jueXingSkills = wuJiangModel.getJueXingSkills();
			if (jueXingSkills==null||jueXingSkills.size()==0) {
				jueXingSkills=new HashMap<>();
				jueXingSkills.put(GameConst.JUEXING_SKILL1, 0);
				jueXingSkills.put(GameConst.JUEXING_SKILL2, 0);
				jueXingSkills.put(GameConst.JUEXING_SKILL3, 0);
				jueXingSkills.put(GameConst.JUEXING_SKILL4, 0);
				wuJiangModel.setJueXingSkills(jueXingSkills);
			}
			
			int type = wuJiangModel.getType();
			Struct_hero_211 struct_hero_211 = Config_hero_211.getIns().get(type);
			if(struct_hero_211.getGodhero() == 1) {
				int newXiulianLv = wuJiangModel.getXiulianLv();
				int oldStar = wuJiangModel.getStar();
				if(newXiulianLv==0 && oldStar>1) {
					wuJiangModel.setXiulianLv(oldStar);
					int star = oldStar/10 + 1;
					wuJiangModel.setStar(star);
				}
			}
			
		}
		//重置武将所有羁绊  //2019/06/22 重置羁绊
		if (wujiang.getRestTaoZhuang()==0) {
			wujiang.getTaozhuangs().clear();
			int num=Config_xtcs_004.getIns().get(WuJiangConst.TAOZHUANG_NUM).getNum();
			if (wujiang.getTaozhuangs().size()!=num) {
				for (int i = 1; i <=num; i++) {
					if (!wujiang.getTaozhuangs().containsKey(i)) {
						wujiang.getTaozhuangs().put(i, 1000*i);
					}
				}
			}
			//2019/06/22 重置羁绊
			wujiang.setRestTaoZhuang(1);
		}
		
	}

	@Override
	public void login(Hero hero) {
		boolean redPonint = WuJiangFunction.getIns().redPonint(hero);
		if (redPonint) {
			RedPointFunction.getIns().addLoginRedPoint(hero, WuJiangConst.SYSID, ArchiveConst.RedPoint,
					RedPointConst.HAS_RED);
		}
		WuJiangFunction.getIns().redPoint(hero, true);
		//WuJiangFunction.getIns().shenJiangRedPonint(hero);//神将红点
	}

}
