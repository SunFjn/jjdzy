package com.teamtop.system.activity.ativitys.vipDiscount;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.vipDiscount.model.Discount;
import com.teamtop.system.activity.ativitys.vipDiscount.model.VipDiscount;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;

import excel.config.Config_xhdvip_402;
import excel.struct.Struct_xhdvip_402;

public class VipDiscountFunction {
	private static VipDiscountFunction ins;

	private VipDiscountFunction() {
	}

	public static VipDiscountFunction getIns() {
		if (ins == null) {
			ins = new VipDiscountFunction();
		}
		return ins;
	}
	
	/**
	 * 获得已领现价的vip折扣
	 * @return
	 */
	public List<Object[]> getVipDisList(Hero hero, VipDiscount vipDiscount) {
		List<Object[]> list = new ArrayList<>();
		try {
			Map<Integer, Discount> map = vipDiscount.getVipDisMap();
			int size = map.size();
			if(size > 0) {
				for(Entry<Integer, Discount> entry : map.entrySet()) {
					Integer vipLev = entry.getKey();
					Discount discount = entry.getValue();
					list.add(new Object[] { vipLev, discount.getPresentPrice(), discount.getNum() });
				}
			}
		} catch (Exception e) {
			LogTool.error(e, this, hero.getId(), hero.getName(), "VipDiscountFunction getVipDis 获得已领现价的vip折扣 异常");
		}
		return list;
	}
	
	/**
	 * 登录推送vip折扣红点
	 * @param hero
	 */
	public void loginRed(Hero hero) {
		try {
			if (hero == null) return;
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_VIPDISCOUNT)) return;
			int vipLv = hero.getVipLv();
			
			VipDiscount vipDiscount = (VipDiscount) ActivityFunction.getIns().getActivityData(hero, ActivitySysId.ACT_VIPDISCOUNT);
			Map<Integer, Discount> map = vipDiscount.getVipDisMap();
			
			for(int i=1; i<=vipLv; i++) {
				Struct_xhdvip_402 struct_hdvip_402 = Config_xhdvip_402.getIns().get(i);
				if(struct_hdvip_402 != null) {
					Discount dis = map.get(i);
					if(dis == null) {//没有抽取折扣，推送红点提示
						RedPointFunction.getIns().addLoginRedPoint(hero,  ActivitySysId.ACT_VIPDISCOUNT, VipDiscountConst.HAS_RED, RedPointConst.HAS_RED);
						break;
					}else {
						if(dis.getNum() < struct_hdvip_402.getTime()) {//可购买，推送红点
							RedPointFunction.getIns().addLoginRedPoint(hero,  ActivitySysId.ACT_VIPDISCOUNT, VipDiscountConst.HAS_RED, RedPointConst.HAS_RED);
							break;
						}
					}
				}
			}
		}catch (Exception e) {
			LogTool.error(e, this, hero.getId(), hero.getName(), "VipDiscountFunction loginRed 登录推送vip折扣红点 异常");
		}
	}
	
	/**
	 * vip升级推送vip折扣红点
	 * @param hero
	 */
	public void vipUpRed(Hero hero,int beforeVipLv) {
		try {
			if (hero == null) return;
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_VIPDISCOUNT)) return;
			int vipLv = hero.getVipLv();
			for(int i=beforeVipLv+1; i<=vipLv; i++) {
				Struct_xhdvip_402 struct_hdvip_402 = Config_xhdvip_402.getIns().get(i);
				if(struct_hdvip_402 != null) {
					RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.ACT_VIPDISCOUNT, RedPointConst.RED_1, RedPointConst.HAS_RED);
					break;
				}
			}
		}catch (Exception e) {
			LogTool.error(e, this, hero.getId(), hero.getName(), "VipDiscountFunction vipUpRed vip升级推送vip折扣红点 异常");
		}
	}
	
	/**
	 * 活动开启推送vip折扣红点
	 * @param hero
	 */
	public void actOpen(Hero hero) {
		try {
			if (hero == null) return;
			int vipLv = hero.getVipLv();
			for(int i=1; i<=vipLv; i++) {
				Struct_xhdvip_402 struct_hdvip_402 = Config_xhdvip_402.getIns().get(i);
				if(struct_hdvip_402 != null) {
					RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.ACT_VIPDISCOUNT, RedPointConst.RED_1, RedPointConst.HAS_RED);
					break;
				}
			}
		}catch (Exception e) {
			LogTool.error(e, this, hero.getId(), hero.getName(), "VipDiscountFunction actOpen 活动开启推送vip折扣红点 异常");
		}
	}
}
