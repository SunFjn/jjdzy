package com.teamtop.system.sevenWuShenRank;

import java.util.HashMap;
import java.util.Map;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_wsmb_238;
import excel.struct.Struct_wsmb_238;

public class SevenWuShenRankEvent extends AbsSystemEvent{
	
	public static SevenWuShenRankEvent ins;
	
	public static  SevenWuShenRankEvent getIns() {
		if(ins == null){
			ins = new SevenWuShenRankEvent();
		}
		return ins;
	}

	@Override
	public void init(Hero hero) {
		SevenWuShenRank sevenWuShenRank=hero.getSevenWuShenRank();
		if (sevenWuShenRank==null) {
			sevenWuShenRank=new SevenWuShenRank();
			sevenWuShenRank.setHid(hero.getId());
			sevenWuShenRank.setRewardMap(new HashMap<Integer, Integer>());
			sevenWuShenRank.setCountNum(new HashMap<Integer, Integer>());
			for (Struct_wsmb_238 wsmb_238:Config_wsmb_238.getIns().getSortList()) {
				sevenWuShenRank.getRewardMap().put(wsmb_238.getId(), GameConst.REWARD_0);
			}
			hero.setSevenWuShenRank(sevenWuShenRank);
		}
		
	}

	@Override
	public void login(Hero hero) {
//		SevenWuShenRankSender.sendCmd_2300(hero.getId(), TimeDateUtil.betweenOpen());
		if(!HeroFunction.getIns().checkSystemOpen(hero, SevenWuShenRankConst.FUN_WUSHENRANK)) return;
		SevenWuShenRank sevenWuShenRank=hero.getSevenWuShenRank();
		for (Struct_wsmb_238 struct_wsmb_238: Config_wsmb_238.getIns().getSortList()) {
			int index=struct_wsmb_238.getId();
			if (sevenWuShenRank.getRewardMap().containsKey(index)&&sevenWuShenRank.getRewardMap().get(index)==GameConst.REWARD_1) {
				RedPointFunction.getIns().addLoginRedPoint(hero,SevenWuShenRankConst.FUN_WUSHENRANK, struct_wsmb_238.getType(), RedPointConst.HAS_RED);
			}
		}
	}
	
	
	@Override
	public void zeroPub(int now){        
		int num=TimeDateUtil.betweenOpen()-1;
		if (num<=7) {
			SevenWuShenRankFunction.getIns().zero(num);
			SevenWuShenRankCache.getIns().update();
		}
		Map<Long, Hero> heroMap = HeroCache.getHeroMap();
		for (Hero hero : heroMap.values()) {
			if (hero.isOnline()) {
				SevenWuShenRankSender.sendCmd_2300(hero.getId(), TimeDateUtil.betweenOpen());
			}
		}

	}
	
	
	
	

}
