package com.teamtop.system.forge;

import java.util.HashMap;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.system.equip.EquipFunction;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.forge.model.Forge;
import com.teamtop.system.forge.model.ForgeModel;
import com.teamtop.system.hero.Hero;

public class ForgeEvent extends AbsSystemEvent {
	private static ForgeEvent forgeEvent;
	public static ForgeEvent getIns(){
		if(forgeEvent == null) {
			forgeEvent = new ForgeEvent();
		}
		return forgeEvent;
	}
	private ForgeEvent(){}

	@Override
	public void init(Hero hero) {
		//初始化
		Forge forge = hero.getForge();
		if(forge == null) {
			forge = new Forge();
			forge.setForgeModelMap(new ConcurrentHashMap<Integer, ForgeModel>());
			forge.setHunLevels(new HashMap<Integer,Integer>());
			hero.setForge(forge);
			for (int i = GameConst.INDEX_EQUIP_0; i <=GameConst.INDEX_EQUIP_9; i++) {
				ForgeModel forgeModel=new ForgeModel();
				forgeModel.setGemLevel(new int[]{0,0,0,0});
				forgeModel.setPart(i);
				forge.getForgeModelMap().put(i, forgeModel);
			}
			
			for (int i = GameConst.INDEX_REBORN_0; i <=GameConst.INDEX_REBORN_3; i++) {
				ForgeModel forgeModel=new ForgeModel();
				forgeModel.setGemLevel(new int[]{0,0,0,0});
				forgeModel.setPart(i);
				forge.getForgeModelMap().put(i, forgeModel);
			}
			
			forge.getHunLevels().put(1, 0);
			forge.getHunLevels().put(2, 0);
			forge.getHunLevels().put(3, 0);
			//锻造大师
			forge.setDashi(new HashMap<Integer,Integer>());
			forge.getDashi().put(0, 0);
			forge.getDashi().put(1, 0);
			forge.getDashi().put(2, 0);
			forge.getDashi().put(3, 0);
		}else {
			for (int i = GameConst.INDEX_REBORN_0; i <=GameConst.INDEX_REBORN_3; i++) {
				if (!hero.getForge().getForgeModelMap().containsKey(i)) {
					ForgeModel forgeModel=new ForgeModel();
					forgeModel.setGemLevel(new int[]{0,0,0,0});
					forgeModel.setPart(i);
					forge.getForgeModelMap().put(i, forgeModel);
				}
			}
			if (!forge.getDashi().containsKey(3)) {
				forge.getDashi().put(3, 0);
			}
		}
	}
	@Override
	public void login(Hero hero) {
		EquipFunction.getIns().getSumEquipStar(hero);
	}

}
