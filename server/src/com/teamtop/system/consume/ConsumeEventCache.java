package com.teamtop.system.consume;

import java.util.HashMap;

import com.teamtop.main.RunServerException;
import com.teamtop.system.activity.ativitys.consumeSmashEgg.ConsumeSmashEggConsumeEvent;
import com.teamtop.system.activity.ativitys.playBalloon.PlayBalloonConsumeEvent;
import com.teamtop.system.activity.ativitys.rollDice.RollDiceConsumeEvent;
import com.teamtop.system.activity.ativitys.themeConsume.ThemeAbsConsumeEvent;
import com.teamtop.system.consume.events.BaoZangPinTuActConsumEvent;
import com.teamtop.system.consume.events.ConsumeTurnTableActConsumEvent;
import com.teamtop.system.consume.events.ContinuousConsumeConsumeEvent;
import com.teamtop.system.consume.events.EightDoorConsume;
import com.teamtop.system.consume.events.ExclusiveActivityConsumEvent;
import com.teamtop.system.consume.events.OneDayConsmeEvent;
import com.teamtop.system.consume.events.OpenDaysSystemConsumeEvent;
import com.teamtop.system.consume.events.SevenContinuousConsumeConsumeEvent;
import com.teamtop.system.consume.events.TodayConsumeEvent;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.taoyuanSworn.TaoyuanSwornConsumeEvent;
import com.teamtop.util.cache.union.UC;
/**
 * 消费事件缓存
 * @author lobbyer
 * @date 2017年6月26日
 */
public class ConsumeEventCache extends AbsServerEvent{
	public static int ALL = 0;//表示此事件不受活动是否开启影响
	private static HashMap<Integer, AbsConsumeEvent[]> consumeEvents = UC.reg("consumeEvents", new HashMap<Integer, AbsConsumeEvent[]>());
	public static HashMap<Integer, AbsConsumeEvent[]> getEvents(){
		return consumeEvents;
	}
	@Override
	public void startServer() throws RunServerException {
		HashMap<Integer, AbsConsumeEvent[]> events = getEvents();
		events.put(ALL,new AbsConsumeEvent[]{
				new TodayConsumeEvent(),
				new SevenContinuousConsumeConsumeEvent(),//7日连续消费
				new ContinuousConsumeConsumeEvent(),//连续消费
				new EightDoorConsume(),//八门金锁消费
				new OneDayConsmeEvent(),//今日消费
				new OpenDaysSystemConsumeEvent(),// 开服天数控制系统
				new ExclusiveActivityConsumEvent(),// 专属活动
				new ConsumeTurnTableActConsumEvent(),// 消费转盘活动
				new ConsumeSmashEggConsumeEvent(),//消费砸蛋
				new PlayBalloonConsumeEvent(),//打气球
				new RollDiceConsumeEvent(),//消费摇骰子
				new ThemeAbsConsumeEvent(),//主题消费
				new TaoyuanSwornConsumeEvent(),//桃园结义消费任务
				new BaoZangPinTuActConsumEvent()
		});
	}

}
