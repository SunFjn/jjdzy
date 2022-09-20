package com.teamtop.cross.connEvent;

import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.cross.CrossZone;
import com.teamtop.houtaiHttp.events.manualOpServer.ServerInfoConnEvent;
import com.teamtop.houtaiHttp.events.recharge.iosRecharge.IosRechargeConnEvent;
import com.teamtop.houtaiHttp.events.welfareNotice.WelfareNoticeConnEvent;
import com.teamtop.main.RunServerException;
import com.teamtop.system.dengFengZaoJi.event.CrossDengFengZaoJiConnEvent;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.util.cache.union.UC;
/**
 * 跨服连接事件缓存
 * @author lobbyer
 * @date 2016年6月21日
 */
public class CrossConnCache extends AbsServerEvent {
	private static ConcurrentHashMap<Integer, CrossConnEvent[]> events = UC.reg("events", new ConcurrentHashMap<Integer, CrossConnEvent[]>());
	public static ConcurrentHashMap<Integer, CrossConnEvent[]> getEvents(){
		return events;
	}
	@Override
	public void startServer() throws RunServerException {
		ConcurrentHashMap<Integer, CrossConnEvent[]> events = getEvents();
		//事件分写到各自系统包里
		events.put(CrossZone.central, new CrossConnEvent[] { new CrossBossConnEvent(), new CrossKingConnEvent(),
				new CrossSelectKingConEvent(), new CrossLinglongConEvent(),
				new GodGenSendGiftActConEvent(), new CrossZcBossConEvent(),
				new CrossEightDoorAppraiseRankConEvent(), new CrossShaoZhuQiYuanRankConEvent(),
				new CrossRechargeRankActConEvent(), new MonsterKingSearchMonsterConnEvent(),
				new NewActConEvent(), new CrossZhuLuConEvent(), new CommonRankConEvent(), new CrossTrialConnEvent(),new CrossTeamKingConEvent(),new CrossDropRedPacketConEvent(),new CrossRedBoxConEvent(),new CrossArenaFightConnEvent(),new CrossDengFengZaoJiConnEvent()});
		events.put(CrossZone.central2,new CrossConnEvent[]{new CrossBossConnEvent(),new CrossKingConnEvent(),new CrossSelectKingConEvent(),new CrossLinglongConEvent(),new GodGenSendGiftActConEvent(),new CrossZcBossConEvent()});
		events.put(CrossZone.houtai, new CrossConnEvent[] { new ServerInfoConnEvent(), new IosRechargeConnEvent(),
				new WelfareNoticeConnEvent(), new TrueNameAndAntiAddictionConnEvent(), new SwitchOnOffConEvent(),
				new GameSystemSwitchConnEvent() });
		events.put(CrossZone.rankraise,new CrossConnEvent[]{});
	}
}
