package com.teamtop.system.crossDynastyWarriors.cross;

import java.util.Iterator;
import java.util.Map.Entry;
import java.util.Set;

import com.teamtop.system.crossDynastyWarriors.DynastyWarriorsCache;
import com.teamtop.system.crossDynastyWarriors.DynastyWarriorsConst;
import com.teamtop.system.crossDynastyWarriors.DynastyWarriorsFunction;
import com.teamtop.system.crossDynastyWarriors.DynastyWarriorsSysCache;
import com.teamtop.util.exector.schedule.AbsScheduleExecutor;
import com.teamtop.util.time.TimeDateUtil;

public class DynastyWarriorsSchedule extends AbsScheduleExecutor {

	public DynastyWarriorsSchedule(long delay, long interval, boolean useLong) {
		super(delay, interval, useLong);
		// TODO Auto-generated constructor stub
	}

	@Override
	public void execute(int now) {
		Iterator<Entry<Integer, DynastyWarriorsCache>> iterator = DynastyWarriorsSysCache.getCacheMap().entrySet()
				.iterator();
		for (; iterator.hasNext();) {
			Entry<Integer, DynastyWarriorsCache> entry = iterator.next();
			Integer partId = entry.getKey();
			DynastyWarriorsCache dwCache = entry.getValue();
			if (dwCache.getActState() == DynastyWarriorsConst.READY_STATE) {
				int stateTime = dwCache.getStateTime();
				if (stateTime == 0) {
					return;
				}
				int passTime = TimeDateUtil.getCurrentTime() - stateTime;
				int num = passTime / TimeDateUtil.ONE_MINUTE;
				Set<Integer> synSet = dwCache.getSynSet();
				if (num == DynastyWarriorsConst.ROUND_SYN_FIGHT && (!synSet.contains(dwCache.getActRound()))) {// 9分钟同步到子服
					synSet.add(dwCache.getActRound());
					DynastyWarriorsFunction.getIns().synData(partId);
				}
			}
		}
	}

}
