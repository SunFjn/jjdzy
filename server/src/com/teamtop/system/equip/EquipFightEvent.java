package com.teamtop.system.equip;

import java.util.HashMap;
import java.util.Map;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.system.equip.model.Equip;
import com.teamtop.system.equip.model.ShengEquipClear;
import com.teamtop.system.event.fightAttrEvent.IFightAttrEvent;
import com.teamtop.system.hero.FightAttr;
import com.teamtop.system.hero.FightCalcFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.rankNew.RankingFunction;
import com.teamtop.system.sevenHappy.SevenHappyConst;
import com.teamtop.system.sevenHappy.SevenHappyFunction;
import com.teamtop.util.common.CommonUtil;

import excel.config.Config_zhuangbei_204;
import excel.struct.Struct_zhuangbei_204;

/**
 * 计算身上装备对角色的战力
 * @author Administrator
 *
 */
public class EquipFightEvent implements IFightAttrEvent {

	@Override
	public long[][] calcHero(Hero hero,FightAttr allAttrs) {
		HashMap<Integer, Long> attrMap=new HashMap<Integer, Long>();
		Map<Integer, Equip> onbodyEquip = hero.getOnbodyEquip();
		ShengEquipClear shengEquipClear = hero.getShengEquipClear();
		Map<Integer, HashMap<Integer, Integer>> clearValues = shengEquipClear.getClearValues();
		for(Equip e : onbodyEquip.values()){
			int part = e.getBodyIndex();
			//将印放在武将战力里
			if (e.getBodyIndex()>=GameConst.INDEX_WUJING_0&&e.getBodyIndex()<=GameConst.INDEX_WUJING_9) {
				continue;
			}
			//1武将2战甲3神剑4异宝5兵法6宝物7天书 《装备》各自系统算
			if (e.getBodyIndex()>=GameConst.INDEX_40) {
				continue;
			}
			Struct_zhuangbei_204 zhuangbei_602 = Config_zhuangbei_204.getIns().get(e.getSysId());
			int[][] attr = CommonUtil.copyDyadicArray(zhuangbei_602.getAttr());
			CommonUtil.arrChargeMap(attr, attrMap);
			
			if( part >= GameConst.INDEX_SHEN_BING_0 && part <= GameConst.INDEX_SHEN_BING_9){
				//神装洗练
				if (clearValues.containsKey(part)) {
					HashMap<Integer, Integer> hashMap = clearValues.get(part);
					if (hashMap!=null) {
						CommonUtil.mapPuslMapLong(hashMap, attrMap);
					}
				}
			}
			
		}
		long[][] attr=CommonUtil.mapToArr(attrMap);
		if (attr!=null) {
			FightCalcFunction.setFightValue(attr, allAttrs);
		}
		// 刷新排行榜
		RankingFunction.getIns().refreshEquipRankList(hero);
		RankingFunction.getIns().refreshGodEquipRankList(hero);
		//七日武圣榜
		//SevenWuShenRankFunction.getIns().refreshSevenWuShenRank(hero, SevenWuShenRankConst.TYPE_EQUIP);
		//开服狂欢
		SevenHappyFunction.getIns().refreshSevenWuShenRank(hero, SevenHappyConst.TYPE_4);
		return attr;
	} 

}
