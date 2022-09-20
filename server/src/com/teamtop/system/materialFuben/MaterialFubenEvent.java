package com.teamtop.system.materialFuben;

import java.util.HashMap;
import java.util.Set;
import java.util.TreeSet;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.system.weekCard.WeekCardFunction;

import excel.config.Config_cailiaofuben_709;
import excel.struct.Struct_cailiaofuben_709;

public class MaterialFubenEvent extends AbsSystemEvent {
	private static MaterialFubenEvent event;
	public static MaterialFubenEvent getIns(){
		if(event == null) {
			event = new MaterialFubenEvent();
		}
		return event;
	}
	private MaterialFubenEvent(){}

	@Override
	public void init(Hero hero) {
		//初始化
		MaterialFuben materialFuben = hero.getMaterialFuben();
		if(materialFuben == null){
			materialFuben = new MaterialFuben();
			materialFuben.setMaterialFubenCount(new HashMap<Integer, MaterialFubenModel>());
			for(Struct_cailiaofuben_709 cailiaofuben_709:Config_cailiaofuben_709.getIns().getMap().values()) {
				MaterialFubenModel materialFubenModel=new MaterialFubenModel();
				materialFubenModel.setCount(MaterialFubenConst.DAY_COUNT);
				materialFubenModel.setHasBuyNum(0);
				materialFubenModel.setFubenid(cailiaofuben_709.getID());
				materialFuben.getMaterialFubenCount().put(cailiaofuben_709.getID(), materialFubenModel);
			}
			materialFuben.setHid(hero.getId());
			Set<Integer> hasFuBenId = new TreeSet<>();
			materialFuben.setHasFuBenId(hasFuBenId);
			hero.setMaterialFuben(materialFuben);
		}
		if (materialFuben.getMaterialFubenCount().size()!=Config_cailiaofuben_709.getIns().size()) {
			for(Struct_cailiaofuben_709 cailiaofuben_709:Config_cailiaofuben_709.getIns().getMap().values()) {
				if (!materialFuben.getMaterialFubenCount().containsKey(cailiaofuben_709.getID())) {
					MaterialFubenModel materialFubenModel=new MaterialFubenModel();
					materialFubenModel.setCount(MaterialFubenConst.DAY_COUNT);
					materialFubenModel.setHasBuyNum(0);
					materialFubenModel.setFubenid(cailiaofuben_709.getID());
					materialFuben.getMaterialFubenCount().put(cailiaofuben_709.getID(), materialFubenModel);
				}
			}
		}
		
		
	}


	@Override
	public void loginReset(Hero hero,int now) {
		zeroHero(hero,now);
	}
	
	
	@Override
	public void zeroHero(Hero hero,int now) {
		MaterialFubenManager.getIns().reset(hero);
		MaterialFubenManager.getIns().showInfo(hero);
	}
	
	@Override
	public void login(Hero hero) {
		if (!HeroFunction.getIns().checkSystemOpen(hero, MaterialFubenConst.SYSID)) {
			return;
		}
		MaterialFuben materialFuben = hero.getMaterialFuben();
		if(materialFuben == null){
			return;
		}
		int addNum = WeekCardFunction.getIns().getMaterialFuben(hero);
		for(MaterialFubenModel itEntry:materialFuben.getMaterialFubenCount().values()) {
			Struct_cailiaofuben_709 data = Config_cailiaofuben_709.getIns().get(itEntry.getFubenid());
			boolean isopen=false;
			int[][] open = data.getStartcondition();
			if (open!=null) {
				for (int[] info : open) {
					switch (info[0]) {
					case 1:
						int curGuanqia = 0;
						if(hero.getGuanqia()!=null) {
							curGuanqia = hero.getGuanqia().getCurGuanqia();
						}
						if (curGuanqia >= info[1]) {
							isopen=true;
						}
						break;
					case 2:
						int rebornlv = hero.getRebornlv();
						if (rebornlv >= info[1]) {
							isopen=true;
						}
						break;
					case 3:
						if (hero.getRealLevel() >= info[1]) {
							isopen=true;
						}
						break;					
					default:
						break;
					}
				}
			}
			int leftTime = MaterialFubenConst.DAY_COUNT + itEntry.getHasBuyNum() + addNum - itEntry.getHasChaNum();
			if (leftTime > 0 && isopen) {
				RedPointFunction.getIns().addLoginRedPoint(hero,MaterialFubenConst.SYSID, 1, RedPointConst.HAS_RED);
				return;
			}
		}
		
	}
	@Override
	public void passGuanqia(Hero hero, int passGuanqia) {
		if (!HeroFunction.getIns().checkSystemOpen(hero, MaterialFubenConst.SYSID)) {
			return;
		}
		MaterialFuben materialFuben = hero.getMaterialFuben();
		if(materialFuben == null){
			return;
		}
		int addNum = WeekCardFunction.getIns().getMaterialFuben(hero);
		for(MaterialFubenModel itEntry:materialFuben.getMaterialFubenCount().values()) {
			Struct_cailiaofuben_709 data = Config_cailiaofuben_709.getIns().get(itEntry.getFubenid());
			boolean isopen=false;
			int[][] open = data.getStartcondition();
			if (open!=null) {
				for (int[] info : open) {
					switch (info[0]) {
					case 1:
						int curGuanqia = 0;
						if(hero.getGuanqia()!=null) {
							curGuanqia = hero.getGuanqia().getCurGuanqia();
						}
						if (curGuanqia >= info[1]) {
							isopen=true;
						}
						break;
					case 2:
						int rebornlv = hero.getRebornlv();
						if (rebornlv >= info[1]) {
							isopen=true;
						}
						break;
					case 3:
						if (hero.getRealLevel() >= info[1]) {
							isopen=true;
						}
						break;					
					default:
						break;
					}
				}
			}
			int leftTime = MaterialFubenConst.DAY_COUNT + itEntry.getHasBuyNum() + addNum - itEntry.getHasChaNum();
			if (leftTime > 0 && isopen) {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, MaterialFubenConst.SYSID, 1, RedPointConst.HAS_RED);
				return;
			}
		}
		
	}
	

}
