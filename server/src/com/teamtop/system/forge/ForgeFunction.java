package com.teamtop.system.forge;

import java.util.HashMap;
import java.util.Map;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.bag.BagGrid;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.forge.model.Forge;
import com.teamtop.system.forge.model.ForgeModel;
import com.teamtop.system.hero.Hero;

import excel.config.Config_daoju_204;
import excel.config.Config_dzgem_209;

public class ForgeFunction {
	
	private static ForgeFunction forgeFunction;

	public static ForgeFunction getIns() {
		if (forgeFunction == null)
			forgeFunction = new ForgeFunction();
		return forgeFunction;
	}
	
	/**
	 * 铸造大师等级[强化大师大师,宝石大师,升星大师,铸魂大师]
	 * @param hero
	 * @return int[]
	 */
	public int[] getZhuHunDaShi(Hero hero) {
		int[] minLevel=new int[] {0,0,0,0};
		for (int i = GameConst.INDEX_EQUIP_0; i <=GameConst.INDEX_EQUIP_9; i++) {
			if (i==0) {
				minLevel[0]=hero.getForge().getForgeModelMap().get(i).getStrengthen();
				minLevel[2]=hero.getForge().getForgeModelMap().get(i).getStarLevel();
				minLevel[3]=hero.getForge().getForgeModelMap().get(i).getZhuHunLevel();
			}else if (hero.getForge().getForgeModelMap().get(i).getStrengthen()<minLevel[0]) {
				minLevel[0]=hero.getForge().getForgeModelMap().get(i).getStrengthen();
			}else if (hero.getForge().getForgeModelMap().get(i).getStarLevel()<minLevel[2]) {
				minLevel[2]=hero.getForge().getForgeModelMap().get(i).getStarLevel();
			}else if (hero.getForge().getForgeModelMap().get(i).getZhuHunLevel()<minLevel[3]) {
				minLevel[3]=hero.getForge().getForgeModelMap().get(i).getZhuHunLevel();
			}
			minLevel[1]=minLevel[1]+sumINT(hero.getForge().getForgeModelMap().get(i).getGemLevel());
			
			
		}
		return minLevel;
	}
	
	public int sumINT(int[] GemLevel) {
		int sum=0;
		for (int i = 0; i < GemLevel.length; i++) {
			if(GemLevel[i]>0) {
				sum=sum+Config_dzgem_209.getIns().get(GemLevel[i]).getLv();
			}
		}
		return sum;
	}
	/**
	 *  锻造升星总星级
	 * @param hero
	 * @return
	 */
	public int maxStar(Hero hero) {
		int sumNum=0;
		for (int i = GameConst.INDEX_EQUIP_0; i <=GameConst.INDEX_EQUIP_9; i++) {
			sumNum=sumNum+hero.getForge().getForgeModelMap().get(i).getStarLevel();
		}
		return sumNum;
	}
	/**
	 * 锻造强化总等级
	 * @param hero
	 * @return
	 */
	public int maxStrength(Hero hero) {
		int sumNum=0;
		for (int i = GameConst.INDEX_EQUIP_0; i <=GameConst.INDEX_EQUIP_9; i++) {
			sumNum=sumNum+hero.getForge().getForgeModelMap().get(i).getStrengthen();
		}
		return sumNum;
	}
	/**
	 * 宝石等级之和
	 * @param hero
	 * @return
	 */
	public int maxBaoShiSum(Hero hero) {
		int sumNum=0;
		for (int i = GameConst.INDEX_EQUIP_0; i <=GameConst.INDEX_EQUIP_9; i++) {
			sumNum=sumNum+sumINT(hero.getForge().getForgeModelMap().get(i).getGemLevel());
		}
		return sumNum;
	}
	/**
	 * 全身铸魂之和
	 * @param hero
	 * @return
	 */
	public int maxZhuHunSum(Hero hero) {
		int sumNum=0;
		for (int i = GameConst.INDEX_EQUIP_0; i <=GameConst.INDEX_EQUIP_9; i++) {
			sumNum=sumNum+hero.getForge().getForgeModelMap().get(i).getZhuHunLevel();
		}
		return sumNum;
	}
	
	/**
	 * 全是装备强化等级大于goal的数量
	 * @param heo
	 * @param goal
	 * @return
	 */
	public int getMoreNumStrength(Hero hero,int goal) {
		int sumNum=0;
		for (int i = GameConst.INDEX_EQUIP_0; i <=GameConst.INDEX_EQUIP_9; i++) {
			if (hero.getForge().getForgeModelMap().get(i).getStrengthen()>=goal) {
				sumNum=sumNum+1;
			}
		}
		return sumNum;
	}
	
	/**
	 * 全是装备升星大于goal的数量
	 * @param heo
	 * @param goal
	 * @return
	 */
	public int getMoreNumStar(Hero hero,int goal) {
		int sumNum=0;
		for (int i = GameConst.INDEX_EQUIP_0; i <=GameConst.INDEX_EQUIP_9; i++) {
			int addNum=hero.getForge().getForgeModelMap().get(i).getStarLevel();
			sumNum=sumNum+addNum;
		}
		return sumNum;
	}
	
	/**
	 * 全是装备铸魂大于goal的数量
	 * @param heo
	 * @param goal
	 * @return
	 */
	public int getMoreNumHun(Hero hero,int goal) {
		int sumNum=0;
		for (int i = GameConst.INDEX_EQUIP_0; i <=GameConst.INDEX_EQUIP_9; i++) {
			if (hero.getForge().getForgeModelMap().get(i).getZhuHunLevel()>=goal) {
				sumNum=sumNum+1;
			}
		}
		return sumNum;
	}
	
	public boolean oneKeyBaoShi(Hero hero,int part){
		boolean isChargeBao=false;
		Forge forge = hero.getForge();
		Map<Integer, ForgeModel> forgeModelMap = forge.getForgeModelMap();
		HashMap<Integer, Integer> maxBaoShi=new HashMap<Integer, Integer>();
		for (int i = 0; i < 4; i++) {
			int index_tool=i+4;
			maxBaoShi.put(i,forgeModelMap.get(part).getGemLevel()[i]);
			for (BagGrid bagGrid:hero.getBag().getItemData().values()) {
				if(Config_daoju_204.getIns().get(bagGrid.getSysId()).getLeixing()==index_tool) {
					if (maxBaoShi.get(i)!=0) {
						if (Config_dzgem_209.getIns().get(bagGrid.getSysId()).getLv()>Config_dzgem_209.getIns().get(maxBaoShi.get(i)).getLv()) {
							maxBaoShi.put(i, bagGrid.getSysId());
						}
					}else {
						maxBaoShi.put(i, bagGrid.getSysId());
					}
					
				}
			}
			if (maxBaoShi.get(i)!=forgeModelMap.get(part).getGemLevel()[i]) {
				if (forgeModelMap.get(part).getGemLevel()[i]==0) {
					UseAddUtil.use(hero, GameConst.TOOL, 1, maxBaoShi.get(i), SourceGoodConst.FORGE_GEM, true);
					forgeModelMap.get(part).getGemLevel()[i]=maxBaoShi.get(i);
				}else {
					//拆除宝石
					int addBaoShi=forgeModelMap.get(part).getGemLevel()[i];
					UseAddUtil.add(hero, GameConst.TOOL, 1, addBaoShi, null, SourceGoodConst.FORGE_GEM_CHAI, true);
					//使用宝石
					UseAddUtil.use(hero, GameConst.TOOL, 1, maxBaoShi.get(i), SourceGoodConst.FORGE_GEM, true);
					forgeModelMap.get(part).getGemLevel()[i]=maxBaoShi.get(i);
				}
				isChargeBao=true;
			}
		}
		return isChargeBao;
	} 

}
