package com.teamtop.system.fashionClothes;

import java.util.HashMap;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.wujiang.WuJiangModel;
import com.teamtop.util.log.LogTool;

public class FashionClothesEvent extends AbsSystemEvent {
	
	private static FashionClothesEvent ins;

	public static FashionClothesEvent getIns() {
		if (ins == null) {
			ins = new FashionClothesEvent();
		}
		return ins;
	}

	@Override
	public void init(Hero hero) {
		try {
			FashionClothes fashionClothes=hero.getFashionClothes();
			if (fashionClothes==null) {
				fashionClothes=new FashionClothes();
				HashMap<Integer, Integer> starmap=new HashMap<>();
				HashMap<Integer, Integer> wujiangmap=new HashMap<>();
				fashionClothes.setClothesStar(starmap);
				fashionClothes.setWujiangClothesId(wujiangmap);
				hero.setFashionClothes(fashionClothes);
			}
			if (fashionClothes.getWujiangClothesId().size()==0){
				for (WuJiangModel wuJiangModel:hero.getWujiang().getWujiangs().values()) {
					//激活武将的初始化时装
					fashionClothes.getWujiangClothesId().put(wuJiangModel.getType(), 0);
				}
			}
			if (fashionClothes.getFashNum()==0) {
				int num=0;
				for (WuJiangModel wuJiangModel:hero.getWujiang().getWujiangs().values()) {
					//激活武将的初始化时装
					Integer star = fashionClothes.getWujiangClothesId().get(wuJiangModel.getType());
					if (star>0) {
						num++;
					}
				}
				fashionClothes.setFashNum(num);
			}
		} catch (Exception e) {
			LogTool.error(e, FashionClothesEvent.class, hero.getId(), hero.getName(), "init has wrong");
		}
		
	}

	@Override
	public void login(Hero hero) {
		
		
	}

}
