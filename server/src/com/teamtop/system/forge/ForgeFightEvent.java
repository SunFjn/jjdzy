package com.teamtop.system.forge;

import java.util.HashMap;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.system.equip.model.Equip;
import com.teamtop.system.event.fightAttrEvent.IFightAttrEvent;
import com.teamtop.system.hero.FightAttr;
import com.teamtop.system.hero.FightCalcFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;

import excel.config.Config_dzgem_209;
import excel.config.Config_dzgemsuit_209;
import excel.config.Config_dzinsoul_209;
import excel.config.Config_dzqianghua_209;
import excel.config.Config_dzqianghuasuit_209;
import excel.config.Config_dzsoul_209;
import excel.config.Config_dzstar_209;
import excel.config.Config_dzstarsuit_209;
import excel.config.Config_godequipsuit_208;
import excel.config.Config_zhuangbei_204;
import excel.config.Config_zhuanshenglh_256;
import excel.config.Config_zhuanshenglhds_256;
import excel.struct.Struct_dzgem_209;
import excel.struct.Struct_zhuangbei_204;


/**
 * 计算身上装备锻造对角色的战力
 * @author Administrator
 *
 */
public class ForgeFightEvent implements IFightAttrEvent {

	@Override
	public long[][] calcHero(Hero hero, FightAttr allAttrs) {
		HashMap<Integer, Long> attrMap=new HashMap<Integer, Long>();
		for (int i = GameConst.INDEX_EQUIP_0; i <=GameConst.INDEX_EQUIP_9; i++) {
			//锻造 
			//铸魂 
			int strengthLv=hero.getForge().getForgeModelMap().get(i).getStrengthen();
			int zhuHunLv=hero.getForge().getForgeModelMap().get(i).getZhuHunLevel();
			if (strengthLv>0||zhuHunLv>0) {
				int[][] attr=null;
				int[][] zhuHun=null;
				switch (i) {
				case 0:
					attr=Config_dzqianghua_209.getIns().get(strengthLv).getAttr0();
					zhuHun=Config_dzsoul_209.getIns().get(zhuHunLv).getAttr0();
					break;
				case 1:
					attr=Config_dzqianghua_209.getIns().get(strengthLv).getAttr1();
					zhuHun=Config_dzsoul_209.getIns().get(zhuHunLv).getAttr1();
					break;
				case 2:
					attr=Config_dzqianghua_209.getIns().get(strengthLv).getAttr2();
					zhuHun=Config_dzsoul_209.getIns().get(zhuHunLv).getAttr2();
					break;
				case 3:
					attr=Config_dzqianghua_209.getIns().get(strengthLv).getAttr3();
					zhuHun=Config_dzsoul_209.getIns().get(zhuHunLv).getAttr3();
					break;	
				case 4:
					attr=Config_dzqianghua_209.getIns().get(strengthLv).getAttr4();
					zhuHun=Config_dzsoul_209.getIns().get(zhuHunLv).getAttr4();
					break;
				case 5:
					attr=Config_dzqianghua_209.getIns().get(strengthLv).getAttr5();
					zhuHun=Config_dzsoul_209.getIns().get(zhuHunLv).getAttr5();
					break;
				case 6:
					attr=Config_dzqianghua_209.getIns().get(strengthLv).getAttr6();
					zhuHun=Config_dzsoul_209.getIns().get(zhuHunLv).getAttr6();
					break;
				case 7:
					attr=Config_dzqianghua_209.getIns().get(strengthLv).getAttr7();
					zhuHun=Config_dzsoul_209.getIns().get(zhuHunLv).getAttr7();
					break;
				case 8:
					attr=Config_dzqianghua_209.getIns().get(strengthLv).getAttr8();
					zhuHun=Config_dzsoul_209.getIns().get(zhuHunLv).getAttr8();
					break;	
				case 9:
					attr=Config_dzqianghua_209.getIns().get(strengthLv).getAttr9();
					zhuHun=Config_dzsoul_209.getIns().get(zhuHunLv).getAttr9();
					break;	
				default:
					break;
				}
				//强化
				CommonUtil.arrChargeMap(attr, attrMap);
				CommonUtil.arrChargeMap(zhuHun, attrMap);
				/*FinalFightAttr zhunfinalAttr = new FinalFightAttr();
				FightAttr zhunattr = new FightAttr();
				FightCalcFunction.setFightValue(zhuHun, zhunattr);
				FightCalcFunction.calcEquipAttr(zhunfinalAttr, zhunattr,0);
				zhunStr = zhunfinalAttr.getStrength()+zhunStr;*/
			}
			
		
			//宝石
			for (int j = 0; j < 4; j++) {
				if(hero.getForge().getForgeModelMap().get(i).getGemLevel()[j]>0) {
					if(Config_dzgem_209.getIns().get(hero.getForge().getForgeModelMap().get(i).getGemLevel()[j])!=null) {
						Struct_dzgem_209 dzgem=	Config_dzgem_209.getIns().get(hero.getForge().getForgeModelMap().get(i).getGemLevel()[j]);
						CommonUtil.arrChargeMap(dzgem.getAttr(), attrMap);
					}else {
						LogTool.warn("calcHero has wrong:"+hero.getId()+" i:"+i+" j:"+j, ForgeFightEvent.class);
					}
				}
			}
			//升星
			if(hero.getForge().getForgeModelMap().get(i).getStarLevel()>0) {
				Equip equip=hero.getOnbodyEquip().get(i);
				if (equip!=null) {
					Struct_zhuangbei_204 zhuangbei_602 = Config_zhuangbei_204.getIns().get(equip.getSysId());
					int[][] data = CommonUtil.copyDyadicArray(zhuangbei_602.getAttr());
					int starNum=hero.getForge().getForgeModelMap().get(i).getStarLevel();
					int proNum=Config_dzstar_209.getIns().get(starNum).getAddition();
					if(proNum != 0){
						for(int[] d : data){
							//max（装备基础属性*（升星增强比例*升星等级），升星等级）
							//攻防血
							int addNum=(int) Math.ceil((double)d[1]*proNum/100000d);
							if (d[0]==GameConst.HP_EXT||d[0]==GameConst.ATT_EXT||d[0]==GameConst.DEF_EXT) {
								if (addNum<starNum) {
									addNum=starNum;
								}
							}
							d[1] =addNum;
						}
					}
					//FightCalcFunction.setFightValue(data, allAttrs);
					CommonUtil.arrChargeMap(data, attrMap);
				}
			}
		}
		//转生装备 炼化
		for (int j = GameConst.INDEX_REBORN_0; j <= GameConst.INDEX_REBORN_3; j++) {
			if (!hero.getForge().getForgeModelMap().containsKey(j)) {
				continue;
			}
			int lianhunLv=hero.getForge().getForgeModelMap().get(j).getLianHunLevel();
			if (lianhunLv>0) {
				int[][] lianhunattr=null;
				switch (j) {
				case GameConst.INDEX_REBORN_0:
					lianhunattr=Config_zhuanshenglh_256.getIns().get(lianhunLv).getBw1();
					break;
				case GameConst.INDEX_REBORN_1:
					lianhunattr=Config_zhuanshenglh_256.getIns().get(lianhunLv).getBw1();
					break;
				case GameConst.INDEX_REBORN_2:
					lianhunattr=Config_zhuanshenglh_256.getIns().get(lianhunLv).getBw1();
					break;
				case GameConst.INDEX_REBORN_3:
					lianhunattr=Config_zhuanshenglh_256.getIns().get(lianhunLv).getBw1();
					break;	
				}
				CommonUtil.arrChargeMap(lianhunattr, attrMap);
			}
		}
		//System.err.println(zhunStr);
		//大师加成
		int qiangHuaDaShiLv=hero.getForge().getDashi().get(0);
		int baoShiDaShi=hero.getForge().getDashi().get(1);
		int starDaShi=hero.getForge().getDashi().get(2);
		int lianhunDaShiLv=hero.getForge().getDashi().get(3);
		
		if (qiangHuaDaShiLv>0) {
			CommonUtil.arrChargeMap(Config_dzqianghuasuit_209.getIns().get(qiangHuaDaShiLv).getAttr(), attrMap);
		}
		//宝石大师
		if (baoShiDaShi>0) {
			CommonUtil.arrChargeMap(Config_dzgemsuit_209.getIns().get(baoShiDaShi).getAttr(), attrMap);
		}
		if (starDaShi>0) {
			CommonUtil.arrChargeMap(Config_dzstarsuit_209.getIns().get(starDaShi).getAttr(), attrMap);
		}
		if (lianhunDaShiLv>0) {
			CommonUtil.arrChargeMap(Config_zhuanshenglhds_256.getIns().get(lianhunDaShiLv).getAttr(), attrMap);
		}
		//噬魂
		for (int j = 1; j <=Config_dzinsoul_209.getIns().getMap().size(); j++) {
			int num=hero.getForge().getHunLevels().get(j);
			if (num>0) {
				int[][] data = CommonUtil.copyDyadicArray(Config_dzinsoul_209.getIns().get(j).getAttr());
				for(int[] d : data){
					d[1] = d[1]*num;
				}
				CommonUtil.arrChargeMap(data, attrMap);
			}
		}
		//神装套装等级
		if (Config_godequipsuit_208.getIns().get(hero.getForge().getShenLv())!=null) {
			CommonUtil.arrChargeMap(Config_godequipsuit_208.getIns().get(hero.getForge().getShenLv()).getAttr(), attrMap);
		}
		long[][] attr=CommonUtil.mapToArr(attrMap);
		if (attr!=null) {
			FightCalcFunction.setFightValue(attr, allAttrs);
		}
		return attr;
	}
}
