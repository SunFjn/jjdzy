package com.teamtop.system.activity.ativitys.flashSale;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.activity.AbstractActivityManager;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.flashSale.model.FlashSale;
import com.teamtop.system.activity.model.ActivityData;
import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.struct.Struct_xhdxsqg_403;

/**
 * 限时抢购
 * @author jjjjyyyyouxi
 */
public class FlashSaleManager extends AbstractActivityManager {
	private static FlashSaleManager ins = null;
	public static FlashSaleManager getIns() {
		if (ins == null) {
			ins = new FlashSaleManager();
		}
		return ins;
	}
	private FlashSaleManager() {
	}
	
	@Override
	public void openUI(Hero hero) {
		try {
			if (hero == null) return;
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_FLASHSALE)) return;
			
			FlashSale flashSale = (FlashSale) ActivityFunction.getIns().getActivityData(hero, ActivitySysId.ACT_FLASHSALE);//个人数据
			int qs = flashSale.getPeriods();
			Map<Integer, Integer> buyMap = flashSale.getBuyMap();
			
			List<Object[]> list = new ArrayList<>();
			Map<Integer, Struct_xhdxsqg_403> map = FlashSaleCache.getExcelConfig().get(qs);
			for(Struct_xhdxsqg_403 struct_xhdxsqg_403 : map.values()) {
				int id = struct_xhdxsqg_403.getID();
				Integer num = buyMap.get(id);
				int gNum = FlashSaleCache.getGlobalNum(id);//全局已购买次数
				int max = struct_xhdxsqg_403.getMax();
				int syNum = max>gNum? max-gNum : 0;
				if(num == null) {
					list.add(new Object[] {id,0,syNum});
				}else {
					list.add(new Object[] {id,num,syNum});
				}
			}
			
			FlashSaleSender.sendCmd_8672(hero.getId(), list.toArray(), qs);//协议数据返回
		}catch (Exception e) {
			LogTool.error(e, this, hero.getId(), hero.getName(), "FlashSaleManager.openUI 限时抢购打开界面异常");
		}
	}
	
	/**
	 * 立即抢购
	 * @param hero
	 * @param id 抢购id
	 */
	public void buy(Hero hero, int id) {
		try {
			if (hero == null) return;
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_FLASHSALE)) return;
			
			FlashSale flashSale = (FlashSale) ActivityFunction.getIns().getActivityData(hero, ActivitySysId.ACT_FLASHSALE);//个人数据
			int qs = flashSale.getPeriods();
			
			
			Map<Integer, Integer> buyMap = flashSale.getBuyMap();
			Integer num = buyMap.get(id);
			if(num == null) {
				num=0;
			}
			
			Integer remainNum = FlashSaleFunction.getIns().getGlobalNum(qs, id);
			if(remainNum == null) {
				FlashSaleSender.sendCmd_8674(hero.getId(), FlashSaleConst.PARA_FAILURE, id, num, 0);
				return;
			}
			
			Struct_xhdxsqg_403 struct_xhdxsqg_403 = FlashSaleCache.getStruct_xhdxsqg_403(qs, id);
			
			if(remainNum <= 0) {
				if(struct_xhdxsqg_403.getMax() > 0) {
					FlashSaleSender.sendCmd_8674(hero.getId(), FlashSaleConst.NOT_HAVE_NUM, id, num, remainNum);
					return;
				}
			}
			
			if(num >=struct_xhdxsqg_403.getTime()) {
				if(struct_xhdxsqg_403.getTime() > 0) {
					FlashSaleSender.sendCmd_8674(hero.getId(), FlashSaleConst.MORE_BUY, id, num, remainNum);
					return;
				}
			}
			
			int opentime = struct_xhdxsqg_403.getOpentime();
			int hour = TimeDateUtil.getHour();
			if(hour != opentime) {
				FlashSaleSender.sendCmd_8674(hero.getId(), FlashSaleConst.HAS_ENDED, id, num, remainNum);
				return;
			}
			
			int[][] money = struct_xhdxsqg_403.getMoney();
			if (!UseAddUtil.canUse(hero, money)) { //元宝不足
				FlashSaleSender.sendCmd_8674(hero.getId(), FlashSaleConst.LACK_OF_MONEY, id, num, remainNum);
				return;
			}
			
			int[][] items = struct_xhdxsqg_403.getItem();
			boolean canAdd = UseAddUtil.canAdd(hero, items, false);
			if(!canAdd){//背包已满
				FlashSaleSender.sendCmd_8674(hero.getId(), FlashSaleConst.FULL, id, num, remainNum);
				return;
			}
			
			UseAddUtil.use(hero, money, SourceGoodConst.FLASHSALE_USE, true);
			UseAddUtil.add(hero, items, SourceGoodConst.FLASHSALE_ADD, UseAddUtil.getDefaultMail(), true);
			FlashSaleCache.addGlobalNum(id);
			buyMap.put(id, num+1);
			FlashSaleSender.sendCmd_8674(hero.getId(),FlashSaleConst.SUCCESS, id, num+1, remainNum-1);//协议数据返回
			LogTool.info("hid:"+hero.getId()+" FlashSaleManager.buy 限时抢购活动：  qs:"+qs+" id:"+id, this);//日志
		}catch (Exception e) {
			LogTool.error(e, this, hero.getId(), hero.getName(), "FlashSaleManager.buy 限时抢购抢购异常");
		}
	}

	@Override
	public void actOpen() {
		FlashSaleCache.buyMap.clear();
	}

	@Override
	public void heroActOpen(Hero hero) {
		FlashSaleFunction.getIns().rechargeOrActOpenRed(hero);
	}

	@Override
	public void actEnd() {

	}

	@Override
	public void heroActEnd(Hero hero) {

	}

	@Override
	public ActivityData getActivityData(Hero hero, ActivityInfo activityInfo) {
		FlashSale flashSale = new FlashSale(hero.getId(), activityInfo.getIndex(), activityInfo.getActId(), activityInfo.getPeriods());
		flashSale.setBuyMap(new HashMap<Integer, Integer>());
		return flashSale;
	}

	@Override
	public Class<?> getActivityData() {
		return FlashSale.class;
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {
		FlashSaleFunction.getIns().rechargeOrActOpenRed(hero);
	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		return FlashSaleEvent.getIns();
	}
}
