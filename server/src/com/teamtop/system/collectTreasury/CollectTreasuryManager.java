package com.teamtop.system.collectTreasury;

import java.util.ArrayList;
import java.util.List;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.chat.ChatConst;
import com.teamtop.system.chat.ChatManager;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;

import excel.config.Config_jbp_718;
import excel.config.Config_jbpbuy_718;
import excel.struct.Struct_jbp_718;
import excel.struct.Struct_jbpbuy_718;

/**
 * 聚宝盆
 * 
 * @author zjh
 *
 */
public class CollectTreasuryManager {

	private static CollectTreasuryManager ins = null;

	public static CollectTreasuryManager getIns() {
		if (ins == null) {
			ins = new CollectTreasuryManager();
		}
		return ins;
	}

	private CollectTreasuryManager() {
	}

	/**
	 * 打开界面
	 * 
	 * @param hero
	 */
	public void openUI(Hero hero) {
		if (hero == null) {
			return;
		}
		if (!HeroFunction.getIns().checkSystemOpen(hero, CollectTreasuryConst.COLLECTTREASURY)) {
			return;
		}

		List<Integer> buyGiftBagList = hero.getCollectTreasury().getBuyGiftBagList();// 聚宝盆礼包购买的礼包列表List
		List<Object> buyGBagObjectList = new ArrayList<Object>();
		for (Integer buyGBagState : buyGiftBagList) {
			buyGBagObjectList.add(new Object[] { buyGBagState });
		}
		List<List<Integer>> heroctAwardsStateList = hero.getCollectTreasury().getCtAwardsStateList();// 聚宝盆奖励状态列表List
		ArrayList<Object[]> ctAwardsStateList = new ArrayList<Object[]>();
		int size = heroctAwardsStateList.size();
		for (int i = 1; i <= size; i++) {
			List<Integer> heroAwardStateList = heroctAwardsStateList.get(i - 1);
			ArrayList<Object> awardStateList = new ArrayList<Object>();
			for (Integer awardState : heroAwardStateList) {
				awardStateList.add(new Object[] { awardState });
			}
			ctAwardsStateList.add(new Object[] { i, awardStateList.toArray() });
		}
		int loginDay = hero.getCollectTreasury().getLoginDay();// 累计登录天数
		CollectTreasurySender.sendCmd_2082(hero.getId(), buyGBagObjectList.toArray(), ctAwardsStateList.toArray(),
				loginDay);

	}

	/**
	 * 购买礼包
	 * 
	 * @param hero
	 * @param giftBagType 礼包类型
	 */
	public void buyGiftBag(Hero hero, int giftBagType) {
		if (hero == null) {
			return;
		}
		if (!HeroFunction.getIns().checkSystemOpen(hero, CollectTreasuryConst.COLLECTTREASURY)) {
			return;
		}
		Struct_jbpbuy_718 struct_jbpbuy_718 = Config_jbpbuy_718.getIns().get(giftBagType);
		if (struct_jbpbuy_718 == null) {// 礼包不存在
			CollectTreasurySender.sendCmd_2084(hero.getId(), CollectTreasuryConst.FAILURE_NOT_GIFTBAG, 0);
			return;
		}
		List<Integer> buyGiftBagList = hero.getCollectTreasury().getBuyGiftBagList();
		if (buyGiftBagList.contains(giftBagType)) {// 不能重复购买
			CollectTreasurySender.sendCmd_2084(hero.getId(), CollectTreasuryConst.FAILURE_NOT_REPBUY, 0);
			return;
		}
		if (hero.getVipLv() < struct_jbpbuy_718.getVIP()) {// vip等级不满足
			CollectTreasurySender.sendCmd_2084(hero.getId(), CollectTreasuryConst.FAILURE_NOT_VIPLV, 0);
			return;
		}
		int yuanbao = struct_jbpbuy_718.getCOIN();
		if (!UseAddUtil.canUse(hero, GameConst.YUANBAO, yuanbao)) {// 元宝不足
			CollectTreasurySender.sendCmd_2084(hero.getId(), CollectTreasuryConst.FAILURE_NOT_YUANBAO, 0);
			return;
		}
		UseAddUtil.use(hero, GameConst.YUANBAO, yuanbao, SourceGoodConst.COLLECTTREASURY_BUYGIFTBAG, true);
		buyGiftBagList.add(giftBagType);
		CollectTreasurySender.sendCmd_2084(hero.getId(), CollectTreasuryConst.SUCCESS, giftBagType);
		ChatManager.getIns().broadCast(ChatConst.COLLECTTREASURY,
				new Object[] { hero.getName(), CollectTreasuryFunction.getIns().getCTName(giftBagType) }); // 全服广播
	}

	/**
	 * 领取奖励
	 * 
	 * @param hero
	 * @param awardsId 奖励id，为配置表奖励id
	 */
	public void getAwards(Hero hero, int awardsId) {
		if (hero == null) {
			return;
		}
		if (!HeroFunction.getIns().checkSystemOpen(hero, CollectTreasuryConst.COLLECTTREASURY)) {
			return;
		}
		Struct_jbp_718 struct_jbp_718 = Config_jbp_718.getIns().get(awardsId);
		if (struct_jbp_718 == null) { // 奖励不存在
			CollectTreasurySender.sendCmd_2086(hero.getId(), CollectTreasuryConst.FAILURE_NOT_AWARD, 0);
			return;
		}
		int collTreasuryId = awardsId / 1000; // 聚宝盆id
		List<Integer> buyGiftBagList = hero.getCollectTreasury().getBuyGiftBagList();
		if (!buyGiftBagList.contains(collTreasuryId)) {// 礼包未购买，不能领取
			CollectTreasurySender.sendCmd_2086(hero.getId(), CollectTreasuryConst.FAILURE_NOT_BUY, 0);
			return;
		}
		List<List<Integer>> ctAwardsStateList = hero.getCollectTreasury().getCtAwardsStateList();
		List<Integer> awardStateList = ctAwardsStateList.get(collTreasuryId - 1);
		int awardIndex = awardsId % 1000 - 1;
		Integer state = awardStateList.get(awardIndex);
		if (state == CollectTreasuryConst.GETTED) {// 不能重复领取
			CollectTreasurySender.sendCmd_2086(hero.getId(), CollectTreasuryConst.FAILURE_NOT_REP, 0);
			return;
		}
		int[] need = struct_jbp_718.getNEED();
		int needCon = need[1]; // 需要满足的条件
		if (collTreasuryId == CollectTreasuryConst.LOGIN_COLLECTTREASURY
				&& hero.getCollectTreasury().getLoginDay() < needCon) { // 登录返利未满足条件
			CollectTreasurySender.sendCmd_2086(hero.getId(), CollectTreasuryConst.FAILURE_NOT_REACH, 0);
			return;
		}
		if (collTreasuryId == CollectTreasuryConst.GUANQIA_COLLECTTREASURY && hero.getCurGuanqia() < needCon) { // 闯关返利未满足条件
			CollectTreasurySender.sendCmd_2086(hero.getId(), CollectTreasuryConst.FAILURE_NOT_REACH, 0);
			return;
		}
//		if (collTreasuryId == CollectTreasuryConst.LV_COLLECTTREASURY && hero.getLevel() < needCon) { // 等级返利未满足条件
//			CollectTreasurySender.sendCmd_2086(hero.getId(), CollectTreasuryConst.FAILURE_NOT_REACH, 0);
//			return;
//		}
		if (collTreasuryId == CollectTreasuryConst.STRENGTH_COLLECTTREASURY && hero.getTotalStrength() < needCon) { // 成长返利未满足条件
			CollectTreasurySender.sendCmd_2086(hero.getId(), CollectTreasuryConst.FAILURE_NOT_REACH, 0);
			return;
		}
		int[][] award = struct_jbp_718.getAWARD();
		UseAddUtil.add(hero, award, SourceGoodConst.COLLECTTREASURY_AWARD, null, true); // 发放奖励
		awardStateList.set(awardIndex, CollectTreasuryConst.GETTED);// 更新奖励状态
		CollectTreasurySender.sendCmd_2086(hero.getId(), CollectTreasuryConst.SUCCESS, awardsId);

	}

}
