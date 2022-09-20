package com.teamtop.system.activity.ativitys.vipDiscount;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.activity.AbstractActivityManager;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.vipDiscount.model.Discount;
import com.teamtop.system.activity.ativitys.vipDiscount.model.VipDiscount;
import com.teamtop.system.activity.model.ActivityData;
import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.util.log.LogTool;

import excel.config.Config_xhdvip_402;
import excel.struct.Struct_xhdvip_402;

public class VipDiscountManager extends AbstractActivityManager {
	private static VipDiscountManager ins = null;

	public static VipDiscountManager getIns() {
		if (ins == null) {
			ins = new VipDiscountManager();
		}
		return ins;
	}

	private VipDiscountManager() {
	}
	
	
	@Override
	public void openUI(Hero hero) {
		try {
			if (hero == null) {
				return;
			}
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_VIPDISCOUNT)) {
				return;
			}
			VipDiscount vipDiscount = (VipDiscount) ActivityFunction.getIns().getActivityData(hero, ActivitySysId.ACT_VIPDISCOUNT);
			
			List<Object[]> array = VipDiscountFunction.getIns().getVipDisList(hero, vipDiscount);
			
			VipDiscountSender.sendCmd_8452(hero.getId(), array.toArray(), hero.getVipLv());
		}catch (Exception e) {
			LogTool.error(e, this, hero.getId(), hero.getName(), "openUI");
		}
	}
	
	/**
	 * 抽取折扣
	 * @param hero
	 * @param vipLevel
	 */
	public void extractDiscount(Hero hero, int vipLevel) {
		try {
			if (hero == null) return;
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_VIPDISCOUNT)) return;
			int vipLv = hero.getVipLv();
			if(vipLevel > vipLv) {//vip等级不足
				VipDiscountSender.sendCmd_8454(hero.getId(), VipDiscountConst.VIP_LEVEL_LESS, vipLv,0,0);
				return;
			}
			
			VipDiscount vipDiscount = (VipDiscount) ActivityFunction.getIns().getActivityData(hero, ActivitySysId.ACT_VIPDISCOUNT);
			Map<Integer, Discount> map = vipDiscount.getVipDisMap();
			Discount discount = map.get(vipLevel);
			if(discount != null) {//已抽取
				VipDiscountSender.sendCmd_8454(hero.getId(), VipDiscountConst.HAVE_EXTRACTED, vipLv,0,0);
				return;
			}
			
			Struct_xhdvip_402 struct_hdvip_402 = Config_xhdvip_402.getIns().get(vipLevel);
			if(struct_hdvip_402 == null) {
				VipDiscountSender.sendCmd_8454(hero.getId(), VipDiscountConst.PARA_FAILURE, vipLv,0,0);
				return;
			}
			
			int num = 0;//购买次数
			int[][] money = struct_hdvip_402.getMoney();
			Random r = new Random();
			int money1 = money[0][0];
			int money2 = money[0][1];
			int money3 = money1-money2;
			int presentPrice = r.nextInt(money3)+1+money2;
			
			discount = new Discount(presentPrice,num);
			map.put(vipLevel, discount);
			VipDiscountSender.sendCmd_8454(hero.getId(), VipDiscountConst.SUCCESS, vipLevel,presentPrice,num);
			//openUI(hero);
			LogTool.info("VipDiscountManager.extractDiscount.hid:"+hero.getId()+" vip:"+hero.getVipLv()+" 抽取折扣 vip:"+vipLevel+" 折扣价："+presentPrice, this);
		}catch (Exception e) {
			LogTool.error(e, this, hero.getId(), hero.getName(), "extractDiscount vipLevel:" + vipLevel);
		}
	}
	
	/**
	 * 购买
	 * @param hero
	 * @param vipLevel
	 */
	public void buy(Hero hero, int vipLevel) {
		try {
			if (hero == null) return;
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_VIPDISCOUNT)) return;
			int vipLv = hero.getVipLv();
			if(vipLevel > vipLv) {//vip等级不足
				VipDiscountSender.sendCmd_8456(hero.getId(), VipDiscountConst.VIP_LEVEL_LESS, vipLevel);
				return;
			}
			
			VipDiscount vipDiscount = (VipDiscount) ActivityFunction.getIns().getActivityData(hero, ActivitySysId.ACT_VIPDISCOUNT);
			Map<Integer, Discount> map = vipDiscount.getVipDisMap();
			Discount discount = map.get(vipLevel);
			if(discount == null) {//未获得现价
				VipDiscountSender.sendCmd_8456(hero.getId(), VipDiscountConst.FOR_PRESENT_PRICE, vipLevel);
				return;
			}
			
			Struct_xhdvip_402 struct_hdvip_402 = Config_xhdvip_402.getIns().get(vipLevel);
			if(struct_hdvip_402 == null) {//参数错误
				VipDiscountSender.sendCmd_8456(hero.getId(), VipDiscountConst.PARA_FAILURE, vipLevel);
				return;
			}
			
			int num = discount.getNum();
			if(num >= struct_hdvip_402.getTime()) {//超过购买次数
				VipDiscountSender.sendCmd_8456(hero.getId(), VipDiscountConst.MORE_BUY, vipLevel);
				return;
			}
			
			int presentPrice = discount.getPresentPrice();
			int[][] oldmoney = struct_hdvip_402.getOldmoney();
			int[] newPrice = new int[] {oldmoney[0][0],oldmoney[0][1],presentPrice};
			int[][] price = new int[][] {newPrice};
			
			if (!UseAddUtil.canUse(hero, price)) { //元宝不足
				VipDiscountSender.sendCmd_8456(hero.getId(), VipDiscountConst.LACK_OF_MONEY, vipLevel);
				return;
			}
			
			int[][] items = struct_hdvip_402.getItem();
			boolean canAdd = UseAddUtil.canAdd(hero, items, false);
			if(!canAdd){//背包已满
				VipDiscountSender.sendCmd_8456(hero.getId(), VipDiscountConst.FULL, vipLevel);
				return;
			}
			
			discount.setNum(num+1);
			UseAddUtil.use(hero, price, SourceGoodConst.VIP_DISCOUNT_USE, true);
			UseAddUtil.add(hero, items, SourceGoodConst.VIP_DISCOUNT, UseAddUtil.getDefaultMail(), true);
			
			VipDiscountSender.sendCmd_8456(hero.getId(), VipDiscountConst.SUCCESS, vipLevel);
			
			//openUI(hero);
			LogTool.info("VipDiscountManager.buy.hid:"+hero.getId()+" vip折扣活动购买  vip:"+hero.getVipLv()+" 折扣vip:"+vipLevel+" 折扣价："+presentPrice, this);
		}catch (Exception e) {
			LogTool.error(e, this, hero.getId(), hero.getName(), "VipDiscountManager.buy vipLevel:" + vipLevel);
		}
	}
	
	@Override
	public void actOpen() {
	}

	@Override
	public void heroActOpen(Hero hero) {
		VipDiscountFunction.getIns().actOpen(hero);
	}

	@Override
	public void actEnd() {
	}

	@Override
	public void heroActEnd(Hero hero) {
	}

	@Override
	public ActivityData getActivityData(Hero hero, ActivityInfo activityInfo) {
		VipDiscount vipDiscount = new VipDiscount(hero.getId(), activityInfo.getIndex(), activityInfo.getActId(), activityInfo.getPeriods());
		vipDiscount.setVipDisMap(new HashMap<>());
		return vipDiscount;
	}

	@Override
	public Class<?> getActivityData() {
		return VipDiscount.class;
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {
	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		return VipDiscountEvent.getIns();
	}
}
