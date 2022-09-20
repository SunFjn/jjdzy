package com.teamtop.system.extraValueGiftBag;

import java.util.List;
import java.util.Map;

import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.houtaiHttp.events.recharge.RechargeConst;
import com.teamtop.system.SystemStateEnum;
import com.teamtop.system.chat.ChatConst;
import com.teamtop.system.chat.ChatManager;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.extraValueGiftBag.model.ExtraValueGiftBag;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.HeroSender;
import com.teamtop.util.log.LogTool;

import excel.config.Config_czlb_781;
import excel.struct.Struct_czlb_781;

public class ExtraValueGiftBagFunction {
	private static ExtraValueGiftBagFunction ins;

	private ExtraValueGiftBagFunction() {
		// TODO Auto-generated constructor stub
	}

	public static ExtraValueGiftBagFunction getIns() {
		if (ins == null) {
			ins = new ExtraValueGiftBagFunction();
		}
		return ins;
	}
	
	/**
	 * 超值礼包通知前端开启入口(登录用)
	 * 
	 * @param hero
	 */
	public void loginNoticeFront(Hero hero) {
		if (HeroFunction.getIns().checkSystemOpen(hero, ExtraValueGiftBagConst.SYSTEMID)) {
			boolean close = true;
			Map<Integer, Integer> weekMap = hero.getExtraValueGiftBag().getWeekGiftMap();
			for (int wnum : weekMap.values()) {
				if(wnum>0) {// 可购买次数
					HeroFunction.getIns().addLoginSytemState(hero, ExtraValueGiftBagConst.SYSTEMID,
							SystemStateEnum.StateEnum.OPEN_NOW.getState());
					return;
				}
				close = false;
			}
			
			Map<Integer, Integer> monthMap = hero.getExtraValueGiftBag().getMonthGiftMap();
			for (int mnum : monthMap.values()) {
				if(mnum>0) {
					HeroFunction.getIns().addLoginSytemState(hero, ExtraValueGiftBagConst.SYSTEMID,
							SystemStateEnum.StateEnum.OPEN_NOW.getState());
					return;
				}
				close = false;
			}
			// 领取完，发关闭消息
			HeroSender.sendCmd_20100(hero.getId(), ExtraValueGiftBagConst.SYSTEMID, close?SystemStateEnum.StateEnum.NOT_OPEN.getState():SystemStateEnum.StateEnum.OPEN_NOW.getState());
		} else {
			HeroSender.sendCmd_20100(hero.getId(), ExtraValueGiftBagConst.SYSTEMID, SystemStateEnum.StateEnum.NOT_OPEN.getState());
		}
	}

	/**
	 * 超值礼包充值处理，供recharge方法调用
	 * @param hero
	 * @param type 12 周礼包，13月礼包
	 * @param paramMap 支付相关参数
	 */
	public void extraValueGiftBagRechargeHandle(Hero hero, int rechargeType, int productId) {
		if (HeroFunction.getIns().checkSystemOpen(hero, ExtraValueGiftBagConst.SYSTEMID)) {
			try {
				// 充值物品id 可通过 czid关联c_011充值商品id关联
				int type = rechargeType==RechargeConst.EXTRA_VALUE_GIFT?ExtraValueGiftBagConst.type_WeekGift:ExtraValueGiftBagConst.type_MonthGift;
				int qs = type==ExtraValueGiftBagConst.type_WeekGift?hero.getExtraValueGiftBag().getQsWeek():hero.getExtraValueGiftBag().getQsMonth();
				Struct_czlb_781 struct_czlb_781 = getStruct_czlb_781ByCzid(type, qs, productId);
				int itemid = struct_czlb_781.getId();
				ExtraValueGiftBag extraValueGiftBag = hero.getExtraValueGiftBag();
				//发放奖励 购买次数+1 通知发放奖励
				int[][] awards = struct_czlb_781.getReward();
				if(struct_czlb_781.getType() == ExtraValueGiftBagConst.type_WeekGift) {
					Map<Integer, Integer> wmap = extraValueGiftBag.getWeekGiftMap();
					int cnt = wmap.get(itemid)-1;
					if(cnt<0) {
						LogTool.warn("可购买次数不足"+productId, ExtraValueGiftBagFunction.class);
						return;
					}
					UseAddUtil.add(hero, awards, SourceGoodConst.EXTRA_VALUE_GIFT_BAG, null, true); // 发放奖励
					wmap.put(itemid, cnt);
					extraValueGiftBag.setWeekGiftMap(wmap);
					hero.setExtraValueGiftBag(extraValueGiftBag);
					if(struct_czlb_781.getBroadcast()!=0)
						ChatManager.getIns().broadCast(ChatConst.EXTRA_VALUE_WEEK, new Object[] { hero.getName()}); // 全服广播
				} else if(struct_czlb_781.getType() == ExtraValueGiftBagConst.type_MonthGift) {
					Map<Integer, Integer> mmap = extraValueGiftBag.getMonthGiftMap();
					int cnt = mmap.get(itemid)-1;
					if(cnt<0) {//可购买次数不足
						LogTool.warn("可购买次数不足"+productId, ExtraValueGiftBagFunction.class);
						return;
					}
					UseAddUtil.add(hero, awards, SourceGoodConst.EXTRA_VALUE_GIFT_BAG, null, true); // 发放奖励
					mmap.put(itemid, cnt);
					extraValueGiftBag.setMonthGiftMap(mmap);
					hero.setExtraValueGiftBag(extraValueGiftBag);
					if(struct_czlb_781.getBroadcast()!=0)
						ChatManager.getIns().broadCast(ChatConst.EXTRA_VALUE_MONTH, new Object[] { hero.getName()}); // 全服广播
				}
				ExtraValueGiftBagSender.sendCmd_20004(hero.getId(), itemid);
			} catch (Exception e) {
				LogTool.error(e, ExtraValueGiftBagFunction.class, hero.getId(), hero.getName(),
						"dailyDirectBuyRechargeHandle has wrong");
			}
		}
	}
	
	/** 根据充值id获得对应条目信息 */
	private Struct_czlb_781 getStruct_czlb_781ByCzid(int type,int qs, int czid) {
		List<Struct_czlb_781> sortList = Config_czlb_781.getIns().getSortList();
		for (int i = 0; i < sortList.size(); i++) {
			Struct_czlb_781 struct_czlb_781 = sortList.get(i);
			if(struct_czlb_781.getType()==type && struct_czlb_781.getQs()==qs && struct_czlb_781.getCzid()==czid) {
				return struct_czlb_781;
			}
		}
		return null;
	}
}
