package com.teamtop.system.sevenHappy;

import java.util.HashMap;
import java.util.Map;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;

import excel.config.Config_party_240;
import excel.struct.Struct_party_240;

public class SevenHappyEvent extends AbsSystemEvent{

	public static SevenHappyEvent ins;
	
	public static  SevenHappyEvent getIns() {
		if(ins == null){
			ins = new SevenHappyEvent();
		}
		return ins;
	}

	@Override
	public void init(Hero hero) {
		if (hero.getSevenHappy()==null) {
			SevenHappy sevenHappy=new SevenHappy();
			sevenHappy.setHid(hero.getId());
			sevenHappy.setRewardMap(new HashMap<Integer, HashMap<Integer,Integer>>());
			sevenHappy.setTwoRewardMap(new HashMap<>());
			for (Struct_party_240  party_240: Config_party_240.getIns().getSortList()) {
				int type=party_240.getType();
				if(party_240.getXl()==null) {
					if (!sevenHappy.getRewardMap().containsKey(type)) {
						sevenHappy.getRewardMap().put(type, new HashMap<Integer, Integer>());
					}
				
					sevenHappy.getRewardMap().get(type).put(party_240.getId(), GameConst.REWARD_0);
				}else {
					Map<Integer, Integer[]> map = sevenHappy.getTwoRewardMap().get(type);
					if (map==null) {
						map=new HashMap<>();
						sevenHappy.getTwoRewardMap().put(type, map);
					}
				
					map.put(party_240.getId(), new Integer[] {GameConst.REWARD_0,GameConst.REWARD_0});
				}
			}
			hero.setSevenHappy(sevenHappy);
		}else {
			Map<Integer, Map<Integer, Integer[]>> twoRewardMap = hero.getSevenHappy().getTwoRewardMap();
			if(twoRewardMap==null) {
				hero.getSevenHappy().setTwoRewardMap(new HashMap<>());
			}
			for (Struct_party_240  party_240: Config_party_240.getIns().getSortList()) {
				int type=party_240.getType();
				if(party_240.getXl()==null) {
					if (!hero.getSevenHappy().getRewardMap().containsKey(type)) {
					hero.getSevenHappy().getRewardMap().put(type, new HashMap<Integer, Integer>());
					hero.getSevenHappy().getRewardMap().get(type).put(party_240.getId(), GameConst.REWARD_0);
					}
					boolean containsKey = hero.getSevenHappy().getRewardMap().get(type).containsKey(party_240.getId());
					if (!containsKey) {
						hero.getSevenHappy().getRewardMap().get(type).put(party_240.getId(), GameConst.REWARD_0);
					}
				}else {
					Map<Integer, Integer[]> hashMap = hero.getSevenHappy().getTwoRewardMap().get(type);
					if(hashMap==null) {
						hashMap=new HashMap<>();
						hero.getSevenHappy().getTwoRewardMap().put(type, hashMap);
					}
					Integer[] state = hashMap.get(party_240.getId());
					if(state==null) {
						hashMap.put(party_240.getId(), new Integer[] {GameConst.REWARD_0,GameConst.REWARD_0});
					}
				}
			}
		}
		
	}
	@Override
	public void loginReset(Hero hero,int now){
		SevenHappyFunction.getIns().zero(hero);
	}

	@Override
	public void login(Hero hero) {
		SevenHappyFunction.getIns().isHong(hero,true);
		//神将狂欢
		//SevenHappyFunction.getIns().refreshSevenWuShenRank(hero, SevenHappyConst.TYPE_15);
	}
	
	@Override
	public void zeroHero(Hero hero,int now){
		SevenHappyFunction.getIns().zero(hero);
	}
	
	@Override
	public void levelUp(Hero hero,int newLv,int oldLv){
		SevenHappyFunction.getIns().refreshSevenWuShenRank(hero, SevenHappyConst.TYPE_1);
	}

}
