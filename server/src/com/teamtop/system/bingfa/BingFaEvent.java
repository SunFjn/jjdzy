package com.teamtop.system.bingfa;

import java.util.HashMap;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.wujiang.WuJiangConst;

import excel.config.Config_xtcs_004;

public class BingFaEvent extends AbsSystemEvent{

	private static BingFaEvent ins;
	public static BingFaEvent getIns(){
		if(ins == null) {
			ins = new BingFaEvent();
		}
		return ins;
	}
	
	@Override
	public void init(Hero hero) {
		if (hero.getBingfa()==null) {
			BingFa bingFa=new BingFa();
			bingFa.setHid(hero.getId());
			//兵法激活
			HashMap<Integer, BingFaModel> bingfas=new HashMap<Integer, BingFaModel>();
			bingFa.setBingfas(bingfas);
			//兵法套装
			int taozhuangSize=Config_xtcs_004.getIns().get(BingFaConst.TAOZHUANG_NUM).getNum();
			HashMap<Integer, Integer> taozhuangs=new HashMap<Integer, Integer>();
			for (int i = 1; i <=taozhuangSize; i++) {
				taozhuangs.put(i, 1000*i);
			}
			//兵法技能
			bingFa.setSkills(new HashMap<>());
			for (int i = 1; i <=WuJiangConst.SKILLNUM; i++) {
				bingFa.getSkills().put(i,BingFaConst.BINGFA_SKILLID+1000*i);
			}
			bingFa.setJieLv(1);
			bingFa.setTaozhuanbfs(taozhuangs);
			hero.setBingfa(bingFa);
		}else {
			BingFa bingfa = hero.getBingfa();
			if (bingfa.getSkills()==null||bingfa.getSkills().size()==0) {
				bingfa.setSkills(new HashMap<>());
				for (int i = 1; i <=WuJiangConst.SKILLNUM; i++) {
					bingfa.getSkills().put(i,BingFaConst.BINGFA_SKILLID+1000*i);
				}
			}
			int taozhuangSize=Config_xtcs_004.getIns().get(BingFaConst.TAOZHUANG_NUM).getNum();
			if (bingfa.getTaozhuanbfs().size()!=taozhuangSize) {
				for (int i = 1; i <=taozhuangSize; i++) {
					if(!bingfa.getTaozhuanbfs().containsKey(i)) {
						bingfa.getTaozhuanbfs().put(i, 1000*i);
					}
				}
			}
			if (hero.getBingfa().getJieLv()==0) {
				hero.getBingfa().setJieLv(1);
			}
			
		}
		//觉醒之力
		BingFa bingfa = hero.getBingfa();
		HashMap<Integer, BingFaModel> bingfas = bingfa.getBingfas();
		if (bingfas!=null) {
			for (Integer bingfaid : bingfas.keySet()) {
				BingFaModel bingFaModel = bingfas.get(bingfaid);
				HashMap<Integer, Integer> jueXingSkills = bingFaModel.getJueXingSkills();
				if (jueXingSkills==null||jueXingSkills.size()==0) {
					jueXingSkills=new HashMap<>();
					jueXingSkills.put(GameConst.JUEXING_SKILL1, 0);
					jueXingSkills.put(GameConst.JUEXING_SKILL2, 0);
					jueXingSkills.put(GameConst.JUEXING_SKILL3, 0);
					jueXingSkills.put(GameConst.JUEXING_SKILL4, 0);
					bingFaModel.setJueXingSkills(jueXingSkills);
				}
			}

		}
		
	}

	@Override
	public void login(Hero hero) {
		
		
	}

}
