package com.teamtop.system.activity.ativitys.flashSale;

import java.util.Map;

import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysCache;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.flashSale.model.FlashSale;
import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.system.chat.ChatConst;
import com.teamtop.system.chat.ChatManager;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.struct.Struct_xhdxsqg_403;

/**
 * 限时抢购
 * @author jjjjyyyyouxi
 */
public class FlashSaleFunction {
	private static FlashSaleFunction ins;

	private FlashSaleFunction() {
	}

	public static FlashSaleFunction getIns() {
		if (ins == null) {
			ins = new FlashSaleFunction();
		}
		return ins;
	}
	
	//获得全局抢购剩余次数
	public Integer getGlobalNum(int qs, int id) {
		int gNum = FlashSaleCache.getGlobalNum(id);//全局已购买次数
		Struct_xhdxsqg_403 struct_xhdxsqg_403 = FlashSaleCache.getStruct_xhdxsqg_403(qs, id);
		if(struct_xhdxsqg_403 == null) return null;
		int max = struct_xhdxsqg_403.getMax();
		int syNum = max>gNum? max-gNum : 0;
		return syNum;
	}
	
	/**
	 * 登录推送红点
	 * @param hero
	 */
	public void loginRed(Hero hero) {
		try {
			if (hero == null) return;
			boolean bool = isOpen(hero);
			if(bool) {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.ACT_FLASHSALE, RedPointConst.RED_1, RedPointConst.HAS_RED);
			}
		}catch (Exception e) {
			LogTool.error(e, this, hero.getId(), hero.getName(), "FlashSaleFunction loginRed 登录推送红点  异常");
		}
	}
	
	/**
	 * 开始抢购推送红点
	 * @param hero
	 */
	public void startToBuy() {
		try {
			int minute = TimeDateUtil.getMinute();
			if(minute != 0) return;
			for (Hero hero:HeroCache.getHeroMap().values()) {
				if (hero.isOnline()) {
					boolean bool = isOpen(hero);
					if(bool) {
						RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.ACT_FLASHSALE, RedPointConst.RED_1, RedPointConst.HAS_RED);
					}
				}
			}
		}catch (Exception e) {
			LogTool.error(e, this, "FlashSaleFunction startToBuy 开始抢购推送红点  异常");
		}
	}
	
	/**
	 * 充值推送红点
	 * @param hero
	 */
	public void rechargeOrActOpenRed(Hero hero) {
		try {
			if (hero == null) return;
			boolean bool = isOpen(hero);
			if(bool) {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.ACT_FLASHSALE, RedPointConst.RED_1, RedPointConst.HAS_RED);
			}
		}catch (Exception e) {
			LogTool.error(e, this, hero.getId(), hero.getName(), "FlashSaleFunction rechargeRed 充值推送红点 异常");
		}
	}
	
	private boolean isOpen(Hero hero) {
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_FLASHSALE)) return false;
		
		FlashSale flashSale = (FlashSale) ActivityFunction.getIns().getActivityData(hero, ActivitySysId.ACT_FLASHSALE);//个人数据
		if(flashSale==null) {
			return false;
		}
		int periods = flashSale.getPeriods();
		
		Map<Integer, Struct_xhdxsqg_403> map = FlashSaleCache.getExcelConfig().get(periods);
		int hour = TimeDateUtil.getHour();
		for(Struct_xhdxsqg_403 struct_xhdxsqg_403 : map.values()) {
			if(periods==struct_xhdxsqg_403.getQx() && hour==struct_xhdxsqg_403.getOpentime()) {
				int id = struct_xhdxsqg_403.getID();
				Integer remainNum = FlashSaleFunction.getIns().getGlobalNum(periods, id);
				if(remainNum == null) return false;
				if(remainNum <= 0) return false;//没有剩余次数
				Map<Integer, Integer> buyMap = flashSale.getBuyMap();
				Integer num = buyMap.get(id);
				if(num != null) {
					if(num >= struct_xhdxsqg_403.getTime()) return false;//限购次数已满
				}
				int[][] money = struct_xhdxsqg_403.getMoney();
				if (!UseAddUtil.canUse(hero, money)) { 
					return false;//元宝不足
				}
				return true;
			}
		}
		return false;
	}
	
	/**
	 *每个刷新时间点开始前两分钟，广播全部玩家 
	 */
	public void gb() {
		try {
			if (!ActivityFunction.getIns().checkActOpen(ActivitySysId.ACT_FLASHSALE)) return;
			ActivityInfo activityInfo = ActivitySysCache.getActivityMap().get(ActivitySysId.ACT_FLASHSALE);
			int periods = activityInfo.getPeriods();
			Map<Integer, Struct_xhdxsqg_403> map = FlashSaleCache.getExcelConfig().get(periods);
			int hour = TimeDateUtil.getHour()+1;
			for(Struct_xhdxsqg_403 tb : map.values()) {
				if(periods==tb.getQx() && hour==tb.getOpentime()) {
					ChatManager.getIns().broadCast(ChatConst.FLASHSALE_REFRESH,new Object[] {}); // 全服广播
					break;
				}
			}
		}catch (Exception e) {
			LogTool.error(e, this, "FlashSaleFunction.gb 每个刷新时间点开始前两分钟，广播全部玩家  异常");
		}
	}
}
