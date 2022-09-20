package com.teamtop.system.excalibur;

import java.util.HashMap;
import java.util.Map;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.system.bingfa.BingFaConst;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.excalibur.model.Excalibur;
import com.teamtop.system.excalibur.model.ExcaliburModel;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.wujiang.WuJiangConst;

import excel.config.Config_xtcs_004;

public class ExcaliburSysEvent extends AbsSystemEvent {

	private static ExcaliburSysEvent excaliburSynEvent;

	private ExcaliburSysEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized ExcaliburSysEvent getIns() {
		if (excaliburSynEvent == null) {
			excaliburSynEvent = new ExcaliburSysEvent();
		}
		return excaliburSynEvent;
	}

	@Override
	public void init(Hero hero) {
		Excalibur excalibur = hero.getExcalibur();
		if (excalibur != null) {
			if (excalibur.getSkills()==null||excalibur.getSkills().size()==0) {
				excalibur.setSkills(new HashMap<>());
				for (int i = 1; i <=WuJiangConst.SKILLNUM; i++) {
					excalibur.getSkills().put(i,BingFaConst.EXCALIBUR_SKILLID+1000*i);
				}
			}
			if (excalibur.getJieLv()==0) {
				excalibur.setJieLv(1);
			}
			int num=Config_xtcs_004.getIns().get(ExcaliburConst.TAOZHUANG_NUM).getNum();
			if (excalibur.getTaozhuangs()==null||excalibur.getTaozhuangs().size()==0) {
				HashMap<Integer, Integer> taozhuangs=new HashMap<Integer, Integer>();
				for (int i = 1; i <=num; i++) {
					taozhuangs.put(i, 1000*i);
				}
				excalibur.setTaozhuangs(taozhuangs);
			}
			if (excalibur.getTaozhuangs().size()!=num) {
				for (int i = 1; i <=num; i++) {
					if(!excalibur.getTaozhuangs().containsKey(i)) {
						excalibur.getTaozhuangs().put(i, 1000*i);
					}
				}
			}
			Map<Integer, ExcaliburModel> excaliburMap = excalibur.getExcaliburMap();
			//觉醒之力
			for (Integer excaliburid : excaliburMap.keySet()) {
				ExcaliburModel excaliburModel = excaliburMap.get(excaliburid);
				HashMap<Integer, Integer> jueXingSkills = excaliburModel.getJueXingSkills();
				if (jueXingSkills==null||jueXingSkills.size()==0) {
					jueXingSkills=new HashMap<>();
					jueXingSkills.put(GameConst.JUEXING_SKILL1, 0);
					jueXingSkills.put(GameConst.JUEXING_SKILL2, 0);
					jueXingSkills.put(GameConst.JUEXING_SKILL3, 0);
					jueXingSkills.put(GameConst.JUEXING_SKILL4, 0);
					excaliburModel.setJueXingSkills(jueXingSkills);
				}
				
			}
			return;
		}
		excalibur = new Excalibur();
		Map<Integer, ExcaliburModel> excaliburMap = new HashMap<>();
		excalibur.setExcaliburMap(excaliburMap);
		excalibur.setSkills(new HashMap<>());
		for (int i = 1; i <= WuJiangConst.SKILLNUM; i++) {
			excalibur.getSkills().put(i, BingFaConst.EXCALIBUR_SKILLID + 1000 * i);
		}
		excalibur.setJieLv(1);
		int num=Config_xtcs_004.getIns().get(ExcaliburConst.TAOZHUANG_NUM).getNum();
		HashMap<Integer, Integer> taozhuangs=new HashMap<Integer, Integer>();
		for (int i = 1; i <=num; i++) {
			taozhuangs.put(i, 1000*i);
		}
		excalibur.setTaozhuangs(taozhuangs);
		hero.setExcalibur(excalibur);
	}

	@Override
	public void login(Hero hero) {
		// Excalibur excalibur = hero.getExcalibur();
		// if (excalibur == null) {
		// return;
		// }
		// boolean redPoint = ExcaliburFunction.getIns().checkRedPoint(hero);
		// if (redPoint) {
		// RedPointFunction.getIns().addLoginRedPoint(hero, ExcaliburConst.SysId,
		// ExcaliburConst.redPoint_1,
		// RedPointConst.HAS_RED);
		// }
	}

	@Override
	public void passGuanqia(Hero hero, int passGuanqia) {

	}

}
