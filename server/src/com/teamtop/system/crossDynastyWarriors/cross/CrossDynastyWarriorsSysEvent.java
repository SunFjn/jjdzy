package com.teamtop.system.crossDynastyWarriors.cross;

import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;

import com.teamtop.houtaiHttp.events.crossActivitySwitch.CrossActivitySwitchCache;
import com.teamtop.system.crossDynastyWarriors.DynastyWarriorsCache;
import com.teamtop.system.crossDynastyWarriors.DynastyWarriorsConst;
import com.teamtop.system.crossDynastyWarriors.DynastyWarriorsFunction;
import com.teamtop.system.crossDynastyWarriors.DynastyWarriorsSysCache;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.util.exector.schedule.ScheduleUtil;
import com.teamtop.util.time.TimeDateUtil;

public class CrossDynastyWarriorsSysEvent extends AbsSystemEvent {

	private static CrossDynastyWarriorsSysEvent crossDynastyWarriorsSysEvent;

	public CrossDynastyWarriorsSysEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized CrossDynastyWarriorsSysEvent getIns() {
		if (crossDynastyWarriorsSysEvent == null) {
			crossDynastyWarriorsSysEvent = new CrossDynastyWarriorsSysEvent();
		}
		return crossDynastyWarriorsSysEvent;
	}

	@Override
	public void init(Hero hero) {
		// TODO Auto-generated method stub

	}

	@Override
	public void login(Hero hero) {
		// TODO Auto-generated method stub

	}

	@Override
	public void fixTime(int cmdId, int now) {
		if (!CrossActivitySwitchCache.checkCrossOpen(SystemIdConst.DYNASTY_WARRIORS)) {
			return;
		}
		if (cmdId == 1) {
			// 活动开启
			DynastyWarriorsSysCache.ACT_OPEN = true;
			Map<Integer, DynastyWarriorsCache> cacheMap = DynastyWarriorsSysCache.getCacheMap();
			Iterator<Entry<Integer, DynastyWarriorsCache>> iterator = cacheMap.entrySet().iterator();
			for (; iterator.hasNext();) {
				Entry<Integer, DynastyWarriorsCache> entry = iterator.next();
				Integer partId = entry.getKey();
				DynastyWarriorsCache dwCache = entry.getValue();
				if (partId == null || dwCache == null) {
					return;
				}
				// dwCache.setActRound(DynastyWarriorsConst.ROUND_1);
				dwCache.setActState(DynastyWarriorsConst.FIGHT_STATE);
				dwCache.setStateTime(now);
				// 更新状态
				DynastyWarriorsFunction.getIns().updataActState(partId);
				// 触发战斗处理
				DynastyWarriorsFunction.getIns().fightHandle(partId);
			}
			// 添加任务
			ScheduleUtil.addTask(DynastyWarriorsSysCache.taskId, new DynastyWarriorsSchedule(1000, 1000, false));
		} else if (cmdId == 2) {
			// 活动结束
			DynastyWarriorsSysCache.ACT_OPEN = false;
			ScheduleUtil.cancelTask(DynastyWarriorsSysCache.taskId);
		} else if (cmdId == 3) {
			// 5分钟一次
			int week = TimeDateUtil.getWeek();
			if (week != 7) {
				return;
			}
			if (!DynastyWarriorsSysCache.ACT_OPEN) {
				return;
			}
			Map<Integer, DynastyWarriorsCache> cacheMap = DynastyWarriorsSysCache.getCacheMap();
			Iterator<Entry<Integer, DynastyWarriorsCache>> iterator = cacheMap.entrySet().iterator();
			for (; iterator.hasNext();) {
				Entry<Integer, DynastyWarriorsCache> entry = iterator.next();
				Integer partId = entry.getKey();
				DynastyWarriorsCache dwCache = entry.getValue();
				if (dwCache.getActRound() == DynastyWarriorsConst.ROUND_5) {
					return;
				}
				int stateTime = dwCache.getStateTime();
				if (stateTime == 0) {
					return;
				}
				int passTime = now - stateTime;
				int num = passTime / DynastyWarriorsConst.GAP_TIME;
				int actState = dwCache.getActState();
				if (num == 2 && actState == DynastyWarriorsConst.READY_STATE) {
					dwCache.setStateTime(now);
					dwCache.setActState(DynastyWarriorsConst.FIGHT_STATE);
					// 触发战斗处理
					DynastyWarriorsFunction.getIns().fightHandle(partId);
					// 更新状态
					DynastyWarriorsFunction.getIns().updataActState(partId);
				} else if (num == 1 && actState == DynastyWarriorsConst.FIGHT_STATE) {
					dwCache.setStateTime(now);
					dwCache.setActState(DynastyWarriorsConst.READY_STATE);
					dwCache.setActRound(dwCache.getActRound() + 1);// 比赛进入下一轮

					// 更新状态
					DynastyWarriorsFunction.getIns().updataActState(partId);
				}
			}
		} else if (cmdId == 4) {
			Iterator<Integer> iterator = DynastyWarriorsSysCache.getCacheMap().keySet().iterator();
			for (; iterator.hasNext();) {
				Integer partId = iterator.next();
				DynastyWarriorsFunction.getIns().synData(partId);
			}
		}
	}

	public static void main(String[] args) {
		int num = (int) Math.ceil((double) 286 / DynastyWarriorsConst.GAP_TIME);
		System.err.println(num);
	}

}
