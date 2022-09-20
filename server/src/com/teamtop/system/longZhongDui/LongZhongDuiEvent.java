package com.teamtop.system.longZhongDui;

import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.cross.CrossZone;
import com.teamtop.system.SystemStateEnum;
import com.teamtop.system.chat.ChatConst;
import com.teamtop.system.chat.ChatManager;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.longZhongDui.model.LongZhongDui;
import com.teamtop.system.longZhongDui.model.LongZhongDuiCache;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.util.exector.schedule.ScheduleUtil;

public class LongZhongDuiEvent extends AbsSystemEvent {
	public static LongZhongDuiEvent ins;

	public static LongZhongDuiEvent getIns() {
		if (ins == null) {
			ins = new LongZhongDuiEvent();
		}
		return ins;
	}

	private LongZhongDuiEvent() {
	}

	@Override
	public void init(Hero hero) {
		LongZhongDui longZhongDui = hero.getLongZhongDui();
		if (longZhongDui == null) {
			longZhongDui = new LongZhongDui();
			longZhongDui.setHid(hero.getId());
			hero.setLongZhongDui(longZhongDui);
		}
		Map<Integer, Integer> answeredMap = longZhongDui.getAnsweredMap();
		if (answeredMap == null) {
			longZhongDui.setAnsweredMap(new HashMap<>());
		}
	}

	@Override
	public void login(Hero hero) {
		if (LongZhongDuiSysCache.isStart
				&& HeroFunction.getIns().checkSystemOpen(hero, LongZhongDuiConst.LONGZHONGDUI)) {
			LongZhongDuiFunction.getIns().loginSendRedPoint(hero);
		}
	}

	@Override
	public void loginReset(Hero hero, int now) {
		zeroHero(hero, now);
	}

	@Override
	public void zeroHero(Hero hero, int now) {
		hero.getLongZhongDui().setMyScore(0); // 玩家积分清零
		hero.getLongZhongDui().getAnsweredMap().clear();
	}

	/*
	 * 系统零点更新
	 */
	@Override
	public void zeroPub(int now) {
		LongZhongDuiCache longZhongDuiCache = LongZhongDuiSysCache.getLongZhongDuiCache();
		List<List<Integer>> topicAndAnswerList = longZhongDuiCache.getTopicAndAnswerList();
		topicAndAnswerList.clear();
		Map<Long, Long> joinMap = longZhongDuiCache.getJoinMap();
		joinMap.clear();
	}

	@Override
	public void fixTime(int cmdId, int now) {
		if (CrossZone.isCrossServer()) {
			return;
		}
		if (cmdId == 1) {// 每天中午12点触发
			LongZhongDuiFunction.getIns().initRandomTopicAndAnswer();
			LongZhongDuiSysCache.isStart = true;
			ChatManager.getIns().broadCast(ChatConst.BROCAST_LONGZHONGDUI_START, new Object[] {}); // 全服广播
			Collection<Hero> values = HeroCache.getHeroMap().values();
			for (Hero hero : values) {
				if (HeroFunction.getIns().checkSystemOpen(hero, LongZhongDuiConst.LONGZHONGDUI)) {
					HeroFunction.getIns().sendSystemState(hero.getId(), LongZhongDuiConst.LONGZHONGDUI,
							SystemStateEnum.StateEnum.OPEN_NOW.getState());
					LongZhongDuiFunction.getIns().fastSendRedPoint(hero, RedPointConst.HAS_RED);
				}
			}
		}
		if (cmdId == 2) {// 每天晚上10点触发
			LongZhongDuiSysCache.isStart = false;
			ScheduleUtil.addTask(LongZhongDuiConst.SCHEDULE_ID,
					new LongZhongDuiEndSchedule(LongZhongDuiConst.END_DELAY_TIME, 99999, false));
			Collection<Hero> values = HeroCache.getHeroMap().values();
			for (Hero hero : values) {
				if (HeroFunction.getIns().isOnline(hero.getId())) {
					LongZhongDuiSender.sendCmd_1980(hero.getId());
				}
			}
		}
	}

	@Override
	public void passGuanqia(Hero hero, int passGuanqia) {
		// TODO Auto-generated method stub
		if (LongZhongDuiSysCache.isStart) {
			LongZhongDuiFunction.getIns().fastSendRedPoint(hero, RedPointConst.HAS_RED);
		}
	}

}
