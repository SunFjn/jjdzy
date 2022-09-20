package com.teamtop.system.event.backstage.events.flowJianKong;

import java.util.Map;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.system.alarmSystem.AlarmConst;
import com.teamtop.system.alarmSystem.AlarmSystemFunction;
import com.teamtop.system.alarmSystem.AlarmType;
import com.teamtop.system.bag.Bag;
import com.teamtop.system.bag.BagFunction;
import com.teamtop.system.event.backstage.AbsBackstageEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_daoju_204;

/**
 * 玩家物品、货币监控
 * @author Administrator
 *
 */
public class FlowJianKongEvent extends AbsBackstageEvent {
	/**
	 * 货币监控警戒线
	 */
	private static int MONEY_JIANKONG = 100000000;
	/**
	 * 物品监控警戒线
	 */
	private static int GOODS_JIANKONG = 300;
	
	@Override
	public void executeFiveMin(int currTime) {
		//HoutaiDao.getIns().addJianKong(FlowJianKongCache.getJiankongQueue());
	}


	@Override
	public void shutdownServer() {
		executeFiveMin(TimeDateUtil.getCurrentTime());
	}
	/**
	 * 检查货币
	 * @param hero hero
	 * @param type 货币类型 参考GameConst
	 * @param num 货币数量
	 * @param reason 原因
	 */
	public static void checkMoney(Hero hero, int type, long num, long addNum, int reason) {
		if(hero==null) return;
		if(type == GameConst.EXP) return;
		try {
//			// 元宝预警
//			if (type==GameConst.YUANBAO && num > AlarmConst.YUAN_BAO_MAX) {
//				AlarmSystemFunction.getIns().alarmSend(AlarmType.YB, hero.getId(), new Object[] { num });
//			}
//			// 铜钱预警
//			if (type==GameConst.COIN && num > AlarmConst.COIN_MAX) {
//				AlarmSystemFunction.getIns().alarmSend(AlarmType.COIN, hero.getId(), new Object[] { num });
//			}
			Bag bag = hero.getBag();
			if (bag == null) {
				return;
			}
			Map<Integer, Long> dailyItemNum = bag.getDailyItemNum();
			Long onwNum = dailyItemNum.get(type);
			if (onwNum == null) {
				onwNum = 0L;
			}
			onwNum += addNum;
			dailyItemNum.put(type, onwNum);
			// 元宝预警
			if (type == GameConst.YUANBAO && onwNum >= AlarmConst.YUAN_BAO_DAILY_MAX) {
				AlarmSystemFunction.getIns().alarmSend(AlarmType.YB, hero.getId(), new Object[] { onwNum });
			}
			// 元宝预警
			if (type == GameConst.YUANBAO && addNum >= AlarmConst.YUAN_BAO_DAILY_ONCE) {
				AlarmSystemFunction.getIns().alarmSend(AlarmType.ONCE_YB, hero.getId(), new Object[] { addNum });
			}
			// 铜钱预警
			if (type == GameConst.COIN && onwNum >= AlarmConst.COIN_DAILY_MAX) {
				AlarmSystemFunction.getIns().alarmSend(AlarmType.COIN, hero.getId(), new Object[] { onwNum });
			}
			// 铜钱预警
			if (type == GameConst.COIN && addNum >= AlarmConst.COIN_DAILY_ONCE) {
				AlarmSystemFunction.getIns().alarmSend(AlarmType.ONCE_COIN, hero.getId(), new Object[] { addNum });
			}
			int max = MONEY_JIANKONG;
			if(num > max){
//				B_FlowJianKong b_FlowJianKong = new B_FlowJianKong(hero.getId(), hero.getZoneid(), hero.getNameZoneid(), hero.getOpenid(), type, 0, num, 
//						hero.getChongZhiYuan(), hero.getLevel(),reason, TimeDateUtil.getCurrentTime());
//				FlowJianKongCache.getJiankongQueue().add(b_FlowJianKong);
			}
		} catch (Exception e) {
			LogTool.error(e,FlowJianKongEvent.class,"hid:"+hero.getId());
		}
	}
	/**
	 * 检查物品
	 * @param hero hero
	 * @param sysid 物品id
	 * @param reason 原因
	 */
	public static void checkGood(long hid,int sysid,int reason){
		try {
			Hero hero = HeroCache.getHero(hid);
			if(hero==null) return;
			int num = BagFunction.getIns().getGoodsNumBySysId(hid, sysid);
			int max = GOODS_JIANKONG;
			if(num > max){
				int type = GameConst.EQUIP;
				if(Config_daoju_204.getIns().get(sysid)!=null){
					type = GameConst.TOOL;
				}
//				B_FlowJianKong b_FlowJianKong = new B_FlowJianKong(hero.getId(), hero.getZoneid(), hero.getNameZoneid(), hero.getOpenid(), type, sysid, num, 
//						hero.getChongZhiYuan(), hero.getLevel(),reason, TimeDateUtil.getCurrentTime());
//				FlowJianKongCache.getJiankongQueue().add(b_FlowJianKong);
			}
		} catch (Exception e) {
			LogTool.error(e,FlowJianKongEvent.class,"hid:"+hid);
		}
	}
}
