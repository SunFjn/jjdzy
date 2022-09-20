package com.teamtop.system.collectTreasury;

import java.util.List;
import java.util.Map;

import com.teamtop.system.SystemStateEnum;
import com.teamtop.system.chat.ChatConst;
import com.teamtop.system.chat.ChatManager;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;

import excel.config.Config_jbp_718;
import excel.config.Config_jbpbuy_718;
import excel.config.Config_xitong_001;
import excel.struct.Struct_jbpbuy_718;

public class CollectTreasuryFunction {
	private static CollectTreasuryFunction ins = null;

	public static CollectTreasuryFunction getIns() {
		if (ins == null) {
			ins = new CollectTreasuryFunction();
		}
		return ins;
	}

	private CollectTreasuryFunction() {
	}

	/**
	 * 聚宝盆奖励未领取完就发158协议通知前端开启入口(达到系统开启表关卡触发条件而触发一次)
	 * 
	 * @param hero
	 */
	public void noticeFront(Hero hero) {
		int needGuanqia = Config_xitong_001.getIns().get(CollectTreasuryConst.COLLECTTREASURY).getServer()[0][1];
		if (hero.getCurGuanqia() == needGuanqia) {
			List<List<Integer>> ctAwardsStateList = hero.getCollectTreasury().getCtAwardsStateList();
			for (List<Integer> awardsStateList : ctAwardsStateList) {// 聚宝盆奖励未领取完就发158协议通知前端开启入口
				for (Integer awardsstate : awardsStateList) {
					if (awardsstate != CollectTreasuryConst.GETTED) {
						HeroFunction.getIns().sendSystemState(hero.getId(), CollectTreasuryConst.COLLECTTREASURY,
								SystemStateEnum.StateEnum.OPEN_NOW.getState());
					}
				}
			}
			CollectTreasuryFunction.getIns().refreshCTAwardState(hero, CollectTreasuryConst.LOGIN_COLLECTTREASURY);
			CollectTreasuryFunction.getIns().refreshCTAwardState(hero, CollectTreasuryConst.LV_COLLECTTREASURY);
			CollectTreasuryFunction.getIns().refreshCTAwardState(hero, CollectTreasuryConst.STRENGTH_COLLECTTREASURY);
		}

	}

	/**
	 * 聚宝盆奖励未领取完就发158协议通知前端开启入口(登录用)
	 * 
	 * @param hero
	 */
	public void loginNoticeFront(Hero hero) {
		if (HeroFunction.getIns().checkSystemOpen(hero, CollectTreasuryConst.COLLECTTREASURY)) {
			List<List<Integer>> ctAwardsStateList = hero.getCollectTreasury().getCtAwardsStateList();
			for (List<Integer> awardsStateList : ctAwardsStateList) {// 聚宝盆奖励未领取完就发158协议通知前端开启入口
				for (Integer awardsstate : awardsStateList) {
					if (awardsstate != CollectTreasuryConst.GETTED) {
						HeroFunction.getIns().addLoginSytemState(hero, CollectTreasuryConst.COLLECTTREASURY,
								SystemStateEnum.StateEnum.OPEN_NOW.getState());
						return;
					}
				}
			}

		}
	}

	/**
	 * 更新用户聚宝盆奖励状态
	 * 
	 * @param hero
	 */
	public void refreshCTAwardState(Hero hero, int type) {
		if (HeroFunction.getIns().checkSystemOpen(hero, CollectTreasuryConst.COLLECTTREASURY)) {
			List<List<Integer>> ctAwardsStateList = hero.getCollectTreasury().getCtAwardsStateList();
			updateAwardsStateList(hero, type, ctAwardsStateList.get(type - 1));
		}
	}

	/**
	 * 更新登录返利奖励状态、更新闯关返利奖励状态、更新等级返利奖励状态、更新成长返利奖励状态
	 * 
	 * @param hero
	 * @param type
	 * @param awardsStateList
	 */
	public void updateAwardsStateList(Hero hero, int type, List<Integer> awardsStateList) {
		int size = awardsStateList.size();
		for (int j = 1; j <= size; j++) {
			Integer state = awardsStateList.get(j - 1);
			if (state == CollectTreasuryConst.NOT_REACH) {
				int awardId = type * 1000 + j; // 配置表奖励id
				int[] need = Config_jbp_718.getIns().get(awardId).getNEED();
				int needLv = need[1];
				if (type == CollectTreasuryConst.LOGIN_COLLECTTREASURY) { // 更新登录返利奖励状态
					if (hero.getCollectTreasury().getLoginDay() >= needLv) {
						updateAwardState(hero, type, j, awardsStateList);
					} else { // 不满足跳出循环
						break;
					}
				}

				if (type == CollectTreasuryConst.GUANQIA_COLLECTTREASURY) { // 更新闯关返利奖励状态
					if (hero.getCurGuanqia() >= needLv) {
						updateAwardState(hero, type, j, awardsStateList);
					} else { // 不满足跳出循环
						break;
					}
				}

				if (type == CollectTreasuryConst.LV_COLLECTTREASURY) { // 更新等级返利奖励状态
					if (hero.getRealLevel() >= needLv) {
						updateAwardState(hero, type, j, awardsStateList);
					} else { // 不满足跳出循环
						break;
					}
				}

				if (type == CollectTreasuryConst.STRENGTH_COLLECTTREASURY) { // 更新成长返利奖励状态
					if (hero.getTotalStrength() >= needLv) {
						updateAwardState(hero, type, j, awardsStateList);
					} else { // 不满足跳出循环
						break;
					}
				}

			}
		}
	}

	/**
	 * 更新奖励状态和发送红点
	 * 
	 * @param hero
	 * @param type
	 * @param aStateListIndex
	 * @param awardsStateList
	 */
	public void updateAwardState(Hero hero, int type, int aStateListIndex, List<Integer> awardsStateList) {
		List<Integer> buyGiftBagList = hero.getCollectTreasury().getBuyGiftBagList();
		awardsStateList.set(aStateListIndex - 1, CollectTreasuryConst.CAN_GET);// 更新奖励状态
		if (buyGiftBagList.indexOf(type) >= 0) {
			RedPointFunction.getIns().fastUpdateRedPoint(hero, CollectTreasuryConst.COLLECTTREASURY, type,
					RedPointConst.HAS_RED);
		}
	}

	/**
	 * 达到vip等级红点
	 * 
	 * @param hero
	 */
	public void reachVipRedPoint(Hero hero) {
		int index = 0;
		try {
			List<Integer> buyGiftBagList = hero.getCollectTreasury().getBuyGiftBagList();
			List<Struct_jbpbuy_718> sortList = Config_jbpbuy_718.getIns().getSortList();
			int size = sortList.size();
			int vipLv = hero.getVipLv();
			for (int i = 0; i < size; i++) {
				index = i;
				Struct_jbpbuy_718 struct_jbpbuy_718 = sortList.get(i);
				int vip = struct_jbpbuy_718.getVIP();
				if (vipLv >= vip) {
					int type = struct_jbpbuy_718.getTYPE();
					if (buyGiftBagList.indexOf(type) < 0) {
						RedPointFunction.getIns().fastUpdateRedPoint(hero, CollectTreasuryConst.COLLECTTREASURY, type,
								RedPointConst.HAS_RED);
					}
				}
			}
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(), "reachVipRedPoint index:" + index);
		}
	}

	/**
	 * 取得聚宝盆名称
	 * 
	 * @param giftBagType
	 * @return
	 */
	public String getCTName(int giftBagType) {
		switch (giftBagType) {
		case CollectTreasuryConst.LOGIN_COLLECTTREASURY:
			return "登录返利";
		case CollectTreasuryConst.GUANQIA_COLLECTTREASURY:
			return "闯关返利";
		case CollectTreasuryConst.LV_COLLECTTREASURY:
			return "等级返利";
		case CollectTreasuryConst.STRENGTH_COLLECTTREASURY:
			return "成长返利";
		default:
			return "";
		}
	}
	
	public void collectTreasuryRechargeHandle(Hero hero, int productId) {
		// 充值物品id 可通过 czid关联c_011充值商品id关联
		Struct_jbpbuy_718 struct_jbpbuy_718 = getStruct_jbpbuy_718ByCzid(productId);
		int type = struct_jbpbuy_718.getTYPE();
		//CollectTreasuryManager.getIns().buyGiftBag(hero, type);
		hero.getCollectTreasury().getBuyGiftBagList().add(type);
		CollectTreasurySender.sendCmd_2084(hero.getId(), CollectTreasuryConst.SUCCESS, type);
		ChatManager.getIns().broadCast(ChatConst.COLLECTTREASURY,
				new Object[] { hero.getName(), CollectTreasuryFunction.getIns().getCTName(type) }); // 全服广播
		refreshCTAwardState(hero, type);
	}
	
	private Struct_jbpbuy_718 getStruct_jbpbuy_718ByCzid(int czid) {
		List<Struct_jbpbuy_718> sortList = Config_jbpbuy_718.getIns().getSortList();
		for (int i = 0; i < sortList.size(); i++) {
			if(sortList.get(i).getCz() == czid) {
				return sortList.get(i);
			}
		}
		return null;
	}
}
