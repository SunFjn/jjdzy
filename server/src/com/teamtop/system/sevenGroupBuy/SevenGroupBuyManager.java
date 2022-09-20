package com.teamtop.system.sevenGroupBuy;

import java.util.HashMap;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.recharge.events.SevenGroupRechargeHandler;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.struct.Struct_sctg_730;

public class SevenGroupBuyManager {
	
	public static SevenGroupBuyManager ins;
	
	public static  SevenGroupBuyManager getIns() {
		if(ins == null){
			ins = new SevenGroupBuyManager();
		}
		return ins;
	}

	public void getreward(Hero hero, int index) {
		try {
			if(!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.SEVENFIRSTGROUP)) return;
			int openFuDay = TimeDateUtil.betweenOpen();
			if (!SevenGroupBuyCache.sevenGroupBuySysMap.containsKey(openFuDay)) {
				LogTool.warn("hid:"+hero.getId()+"name:"+hero.getName()+"openFuDay:"+openFuDay, SevenGroupRechargeHandler.class);
				return;
			}
			HashMap<Integer, Struct_sctg_730> sctg_730Map = SevenGroupBuyCache.sevenGroupBuySysMap.get(openFuDay);
			if (!sctg_730Map.containsKey(index)) {
				LogTool.warn("hid:"+hero.getId()+"name:"+hero.getName()+"openFuDay:"+openFuDay+" index:"+index, SevenGroupBuyManager.class);
			    return;
			}
			SevenGroupBuy sevenGroupBuy = hero.getSevenGroupBuy();
			if (!sevenGroupBuy.getRewards().containsKey(index)) {
				LogTool.warn(" index:"+index+" !sevenGroupBuy.containsKey(index)",  SevenGroupBuyManager.class);
				return;
			}
			Integer state = sevenGroupBuy.getRewards().get(index);
			Struct_sctg_730 sctg_730=sctg_730Map.get(index);
			if (state==GameConst.REWARD_2) {
				LogTool.warn(" index:"+index+" state==GameConst.REWARD_2",  SevenGroupBuyManager.class);
				return;
			}
			if (state==GameConst.REWARD_0) {
				if (sevenGroupBuy.getIsFristNum()>0) {
					if (sctg_730.getJine()==1&&SevenGroupBuyCache.fristRechargeNum>=sctg_730.getRenshu()) {
						//1：充值任意金额
						sevenGroupBuy.getRewards().put(sctg_730.getId(), GameConst.REWARD_1);
					}else if (sctg_730.getJine()>1&&sevenGroupBuy.getTodayRrmb()>=sctg_730.getJine()&&SevenGroupBuyCache.fristRechargeNum>=sctg_730.getRenshu()) {
						// x（大于1的具体值）：充值指定金额
						sevenGroupBuy.getRewards().put(sctg_730.getId(), GameConst.REWARD_1);
					}
				}
				if (sctg_730.getJine()==0&&SevenGroupBuyCache.fristRechargeNum>=sctg_730.getRenshu()) {
					sevenGroupBuy.getRewards().put(sctg_730.getId(), GameConst.REWARD_1);
				}
				state = sevenGroupBuy.getRewards().get(sctg_730.getId());
			}
			
			if (state==GameConst.REWARD_1) {
				//发奖励
				if (UseAddUtil.canAdd(hero, sctg_730.getJiangli(), false)) {
					sevenGroupBuy.getRewards().put(sctg_730.getId(), GameConst.REWARD_2);
					UseAddUtil.add(hero, sctg_730.getJiangli(), SourceGoodConst.REWARD_SEVENFRIST, null, true);
					SevenGroupBuySender.sendCmd_2852(hero.getId(), index, GameConst.REWARD_2,sevenGroupBuy.getTodayRrmb());
					return;
				}
			}
		} catch (Exception e) {
			LogTool.error(e, SevenGroupBuyManager.class, hero.getId(), hero.getName(), "getreward");
		}
		
	}

	
	
}
