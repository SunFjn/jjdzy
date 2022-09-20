package com.teamtop.system.godbook;

import java.util.HashMap;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.system.bingfa.BingFaConst;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.wujiang.WuJiangConst;

import excel.config.Config_xtcs_004;

public class GodBookEvent extends AbsSystemEvent{

	private static GodBookEvent ins;
	public static GodBookEvent getIns(){
		if(ins == null) {
			ins = new GodBookEvent();
		}
		return ins;
	}
	
	@Override
	public void init(Hero hero) {
		if (hero.getGodbook()==null) {
			GodBook godBook=new GodBook();
			godBook.setHid(hero.getId());
			godBook.setWearid(0);
			godBook.setLevel(1);
			godBook.setHasBooks(new HashMap<Integer,GodBookModel>());
			godBook.setSkills(new HashMap<>());
			for (int i = 1; i <=WuJiangConst.SKILLNUM; i++) {
				godBook.getSkills().put(i,BingFaConst.GODBOOK_SKILLID+1000*i);
			}
			//套装
			HashMap<Integer, Integer> taozhuangs=new HashMap<Integer, Integer>();
			int taozhuangSize=Config_xtcs_004.getIns().get(GodBookConst.TAOZHUANGNUM).getNum();
			for (int i = 1; i <=taozhuangSize; i++) {
				taozhuangs.put(i, 1000*i);
			}
			godBook.setTaozhuangs(taozhuangs);
			hero.setGodbook(godBook);
		}else {
			GodBook godbook = hero.getGodbook();
			if (godbook.getSkills()==null||godbook.getSkills().size()==0) {
				godbook.setSkills(new HashMap<>());
				for (int i = 1; i <=WuJiangConst.SKILLNUM; i++) {
					godbook.getSkills().put(i,BingFaConst.GODBOOK_SKILLID+1000*i);
				}
			}
			int taozhuangSize=Config_xtcs_004.getIns().get(GodBookConst.TAOZHUANGNUM).getNum();
			if (godbook.getTaozhuangs().size()!=taozhuangSize) {
				for (int i = 1; i <=taozhuangSize; i++) {
					if (!godbook.getTaozhuangs().containsKey(i)) {
						godbook.getTaozhuangs().put(i, 1000*i);
					}
				}
			}
		}
		//觉醒之力
		GodBook godbook = hero.getGodbook();
		HashMap<Integer, GodBookModel> hasBooks = godbook.getHasBooks();
		if (hasBooks!=null) {
			for (Integer godBookId : hasBooks.keySet()) {
				GodBookModel godBookModel = hasBooks.get(godBookId);
				HashMap<Integer, Integer> jueXingSkills = godBookModel.getJueXingSkills();
				if (jueXingSkills==null||jueXingSkills.size()==0) {
					jueXingSkills=new HashMap<>();
					jueXingSkills.put(GameConst.JUEXING_SKILL1, 0);
					jueXingSkills.put(GameConst.JUEXING_SKILL2, 0);
					jueXingSkills.put(GameConst.JUEXING_SKILL3, 0);
					jueXingSkills.put(GameConst.JUEXING_SKILL4, 0);
					godBookModel.setJueXingSkills(jueXingSkills);
				}
			}
		}
	}

	@Override
	public void login(Hero hero) {
		
	}

}
