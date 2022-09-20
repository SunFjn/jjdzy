package com.teamtop.system.treasury;

import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.activity.ativitys.baoZangPinTu.BaoZangPinTuConst;
import com.teamtop.system.activity.ativitys.baoZangPinTu.BaoZangPinTuFunction;
import com.teamtop.system.event.backstage.events.flowHero.FlowHeroEvent;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.shop.ShopEnum;
import com.teamtop.util.clone.CloneUtils;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_bkitem_236;
import excel.struct.Struct_bkitem_236;

public class TreasuryManager {
	public static TreasuryManager ins;

	public static TreasuryManager getIns() {
		if (ins == null) {
			ins = new TreasuryManager();
		}
		return ins;
	}

	private TreasuryManager() {
	}

	/**
	 * 打开宝库界面
	 * 
	 * @param hero
	 * @param tid
	 */
	public void openUI(Hero hero, int tid) {
		if (hero == null) {
			return;
		}
		// key为已购买的物品id，第二个value为物品已购买次数
		Map<Integer, Integer> map = hero.getTreasury().getTreasuryMap().get(tid);
		if (map == null) {
			return;
		}
		if (!HeroFunction.getIns().checkSystemOpen(hero, TreasuryConst.SysIdArray[tid - 1])) {
			return;
		}
		ArrayList<Object> goodsList = new ArrayList<Object>();
		List<Struct_bkitem_236> list = TreasuryCache.getConfigMap().get(tid);
		for (Struct_bkitem_236 struct_bkitem_236 : list) {
			Integer bugNum = map.get(struct_bkitem_236.getId());
			Integer newBugNum = 0;
			if (bugNum != null) {
				newBugNum = bugNum;
			}
			goodsList.add(new Object[] { struct_bkitem_236.getId(), newBugNum });
		}
		TreasurySender.sendCmd_2042(hero.getId(), goodsList.toArray());
	}

	/**
	 * 兑换
	 * 
	 * @param hero
	 * @param tid
	 * @param goodsId
	 * @throws NoSuchMethodException
	 * @throws InvocationTargetException
	 * @throws InstantiationException
	 * @throws IllegalAccessException
	 */
	public void exchange(Hero hero, int tid, int goodsId) {
		if (hero == null) {
			return;
		}
		// key为已购买的物品id，第二个value为物品已购买次数
		Map<Integer, Integer> map = hero.getTreasury().getTreasuryMap().get(tid);
		if (map == null) {
			return;
		}
		if (!HeroFunction.getIns().checkSystemOpen(hero, TreasuryConst.SysIdArray[tid - 1])) {
			return;
		}
		Struct_bkitem_236 bkItem = Config_bkitem_236.getIns().get(goodsId);
		int week = TimeDateUtil.getWeek();
		if (bkItem == null || bkItem.getBk() != tid || (bkItem.getXianshi() != 0 && bkItem.getXianshi() != week)) { // 商品不存在或非法操作
			TreasurySender.sendCmd_2044(hero.getId(), TreasuryConst.FAILURE_NOT_GOODS, 0);
			return;
		}
		Integer buyNum = map.get(goodsId);
		int beBuynum = 0;
		if (buyNum != null) {
			beBuynum = buyNum;
		}
		int vipLimit = bkItem.getVip();
		int buyNumLimit = bkItem.getTime();
		int[][] consume = null;
		try {
			consume = (int[][]) CloneUtils.deepClone(bkItem.getConsume());
		} catch (Exception e) {
			LogTool.error(e, this, "hid:" + hero.getId());
		}
		int[][] disConsume = consume;
		if (bkItem.getDazhe() != 0 && bkItem.getDazhe() == week) {
			int num = consume[0][2];
			int disNum = (int) Math.ceil(num * TreasuryConst.TREASURY_DISCOUNT);// 向上取整
			consume[0][2] = disNum;
			disConsume = consume;
		}
		if (beBuynum == buyNumLimit) { // 商品已售罄
			TreasurySender.sendCmd_2044(hero.getId(), TreasuryConst.FAILURE_NOT_GOODSNUM, 0);
			return;
		}
		if (hero.getVipLv() < vipLimit) { // vip等级不足
			TreasurySender.sendCmd_2044(hero.getId(), TreasuryConst.FAILURE_NOT_VIPLV, 0);
			return;
		}
		if (!UseAddUtil.canUse(hero, disConsume)) { // 宝库道具不足
			TreasurySender.sendCmd_2044(hero.getId(), TreasuryConst.FAILURE_NOT_TREASURYNUM, 0);
			return;
		}
		UseAddUtil.use(hero, disConsume, SourceGoodConst.TREASURY_EXCHANGE, true);
		int[][] reward = bkItem.getReward();
		UseAddUtil.add(hero, reward, SourceGoodConst.TREASURY_AWARD, null, true);
		map.put(goodsId, beBuynum + 1);
		TreasurySender.sendCmd_2044(hero.getId(), TreasuryConst.SUCCESS, goodsId);
		int type = 0;
		//1：隆中宝库，2：无双宝库，3：枭雄宝库，4：三国宝库,5:分享宝库(微信)
		switch (tid) {
		case 1:
			type = ShopEnum.LONG_ZHONG_TREASURY.getType();
			break;
		case 2:
			type = ShopEnum.DYNASTY_WARRIORS_TREASURY.getType();
			break;
		case 3:
			type = ShopEnum.CROSS_KING_TREASURY.getType();
			break;
		case 4:
			type = ShopEnum.SAN_GUO_TREASURY.getType();
			break;
		case 5:
			type = ShopEnum.SHARE_SHOP.getType();
			break;
		default:
			break;
		}
		if(type>0) {
			String usesys = hero.getTempData().getAccount().getUsesys();
			int itemid=reward[0][1];
			if(itemid==0) {
				itemid = reward[0][0];
			}
			int itemcost=disConsume[0][2];
			int buynum=1;
			int costtype=disConsume[0][0];
			FlowHeroEvent.addShopFlow(hero.getId(), hero.getLevel(), type, itemid, itemcost, buynum, costtype,
					hero.getZoneid(), hero.getLoginPf(), usesys, hero.getReincarnationLevel());
			
			if(type == ShopEnum.SAN_GUO_TREASURY.getType()) {
				// 宝藏拼图
				BaoZangPinTuFunction.getIns().checkTask(hero, BaoZangPinTuConst.TASK_TYPE_7, itemcost);
			}
		}
	}

}
