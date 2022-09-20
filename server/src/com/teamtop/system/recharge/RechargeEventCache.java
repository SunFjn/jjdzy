package com.teamtop.system.recharge;

import java.util.ArrayList;
import java.util.List;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.recharge.events.ActGiftHandler;
import com.teamtop.system.recharge.events.ActivityRechargeHandler;
import com.teamtop.system.recharge.events.EightDoorRechargeHandler;
import com.teamtop.system.recharge.events.ExclusiveActivityHandler;
import com.teamtop.system.recharge.events.FirstRechargeNewHandler;
import com.teamtop.system.recharge.events.HyperPointGeneralSysHandler;
import com.teamtop.system.recharge.events.LoginLuxuryGiftsHandler;
import com.teamtop.system.recharge.events.OneDayEveryIndexRechargeHandler;
import com.teamtop.system.recharge.events.OpenDaysSystemRechargeHandler;
import com.teamtop.system.recharge.events.PrivilegeCardHandler;
import com.teamtop.system.recharge.events.RechageFiveTimesHandler;
import com.teamtop.system.recharge.events.RechargeFeedbackHandler;
import com.teamtop.system.recharge.events.RechargeWanyuanHongbaoHandler;
import com.teamtop.system.recharge.events.RedBoXHandler;
import com.teamtop.system.recharge.events.SevenAwayRechargeHandler;
import com.teamtop.system.recharge.events.SevenContinuousConsumeHandler;
import com.teamtop.system.recharge.events.SevenDayRechargeHandler;
import com.teamtop.system.recharge.events.SevenGroupRechargeHandler;
import com.teamtop.system.recharge.events.SevenOneRechargeHandler;
import com.teamtop.system.recharge.events.TodayRechargeHandler;
import com.teamtop.system.recharge.events.TotalRechargeSysHandler;
import com.teamtop.system.recharge.events.VipHandler;
import com.teamtop.system.recharge.events.WeekCardHandler;
import com.teamtop.system.taoyuanSworn.TaoyuanSwornHandler;
import com.teamtop.system.weiXinShare.WeiXinShareRechargeHandler;
import com.teamtop.util.cache.union.UC;

/**
 * 充值事件缓存
 * 
 * @author Administrator
 *
 */
public class RechargeEventCache extends AbsServerEvent {
	private static List<AbsRechargeEvent> events = UC.reg("rechargeEvents", new ArrayList<AbsRechargeEvent>());

	public static List<AbsRechargeEvent> getEvents() {
		return events;
	}

	@Override
	public void startServer() throws RunServerException {
		events.add(new FirstRechargeNewHandler());
		events.add(new VipHandler());
		events.add(new RechageFiveTimesHandler());
		events.add(new PrivilegeCardHandler());
		events.add(new ActivityRechargeHandler());
		events.add(new SevenAwayRechargeHandler());
		events.add(new SevenGroupRechargeHandler());
		events.add(new SevenDayRechargeHandler());
		events.add(new LoginLuxuryGiftsHandler());
		events.add(new SevenOneRechargeHandler());
		events.add(new SevenContinuousConsumeHandler());
		events.add(new TotalRechargeSysHandler());
		events.add(new HyperPointGeneralSysHandler());
		events.add(new RechargeFeedbackHandler());
		events.add(new EightDoorRechargeHandler());
		events.add(new WeekCardHandler());
		events.add(new TodayRechargeHandler());
		events.add(new OpenDaysSystemRechargeHandler());
		events.add(new OneDayEveryIndexRechargeHandler());
		events.add(new ExclusiveActivityHandler());
		events.add(new WeiXinShareRechargeHandler());
		events.add(new ActGiftHandler());
		events.add(new TaoyuanSwornHandler());
		events.add(new RedBoXHandler());
		events.add(new RechargeWanyuanHongbaoHandler());
	}

}
