package com.teamtop.system.recharge.events;

import java.util.HashMap;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.recharge.AbsRechargeEvent;
import com.teamtop.system.sevenGroupBuy.SevenGroupBuy;
import com.teamtop.system.sevenGroupBuy.SevenGroupBuyCache;
import com.teamtop.system.sevenGroupBuy.SevenGroupBuySender;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.struct.Struct_sctg_730;

/**
 * 7日首冲团购
 * @author jjjjyyy
 *
 */
public class SevenGroupRechargeHandler extends AbsRechargeEvent{

	@Override
	public void recharge(Hero hero, int money, int product_id) {
		try {
			if(!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.SEVENFIRSTGROUP)) return;
			SevenGroupBuy sevenGroupBuy=hero.getSevenGroupBuy();
			int openFuDay = TimeDateUtil.betweenOpen();
			boolean isaddFristNum=false;
			if(sevenGroupBuy.getIsFristNum()==0) {
				if (!SevenGroupBuyCache.sevenGroupBuySysMap.containsKey(openFuDay)) {
					LogTool.warn("hid:"+hero.getId()+"name:"+hero.getName()+"openFuDay:"+openFuDay, SevenGroupRechargeHandler.class);
					return;
				}
				SevenGroupBuyCache.fristRechargeNum=SevenGroupBuyCache.fristRechargeNum+5;
				sevenGroupBuy.setIsFristNum(1);
				isaddFristNum=true;
			}
			sevenGroupBuy.setTodayRrmb(sevenGroupBuy.getTodayRrmb()+money);
			HashMap<Integer, Struct_sctg_730> sctg_730Map = SevenGroupBuyCache.sevenGroupBuySysMap.get(openFuDay);
			for (Struct_sctg_730 sctg_730: sctg_730Map.values()) {
				//本人奖励状态
				Integer rewardState = sevenGroupBuy.getRewards().get(sctg_730.getId());
				if (rewardState==GameConst.REWARD_0) {
					if (sctg_730.getJine()==1&&SevenGroupBuyCache.fristRechargeNum==sctg_730.getRenshu()) {
						//1：充值任意金额
						sevenGroupBuy.getRewards().put(sctg_730.getId(), GameConst.REWARD_1);
						SevenGroupBuySender.sendCmd_2852(hero.getId(), sctg_730.getId(), GameConst.REWARD_1,sevenGroupBuy.getTodayRrmb());
					}else if (sctg_730.getJine()>1&&sevenGroupBuy.getTodayRrmb()>=sctg_730.getJine()&&SevenGroupBuyCache.fristRechargeNum==sctg_730.getRenshu()) {
						// x（大于1的具体值）：充值指定金额
						sevenGroupBuy.getRewards().put(sctg_730.getId(), GameConst.REWARD_1);
						SevenGroupBuySender.sendCmd_2852(hero.getId(), sctg_730.getId(), GameConst.REWARD_1,sevenGroupBuy.getTodayRrmb());
					}
				}
			}
			SevenGroupBuySender.sendCmd_2852(hero.getId(), 0, 0,sevenGroupBuy.getTodayRrmb());
			if (isaddFristNum) {
				for (Hero hero1: HeroCache.getHeroMap().values()) {
					if(HeroFunction.getIns().isOnline(hero1.getId())) {
						SevenGroupBuySender.sendCmd_2854(hero1.getId(), SevenGroupBuyCache.fristRechargeNum);
					}
				}
				
			}
		} catch (Exception e) {
			LogTool.error(e, SevenGroupRechargeHandler.class, hero.getId(), hero.getName(), "recharge has wrong");
		}
	}

}
