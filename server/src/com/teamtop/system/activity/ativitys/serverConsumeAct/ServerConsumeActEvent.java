package com.teamtop.system.activity.ativitys.serverConsumeAct;

import java.util.concurrent.atomic.AtomicLong;

import com.teamtop.cross.CrossZone;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.util.ProbabilityEvent.RandomUtil;

import excel.config.Config_xtcs_004;

public class ServerConsumeActEvent extends AbsSystemEvent {
	private static ServerConsumeActEvent ins = null;

	public static ServerConsumeActEvent getIns() {
		if (ins == null) {
			ins = new ServerConsumeActEvent();
		}
		return ins;
	}

	private ServerConsumeActEvent() {
	}

	@Override
	public void init(Hero hero) {
		// TODO Auto-generated method stub

	}

	@Override
	public void login(Hero hero) {
		// TODO Auto-generated method stub
		ServerConsumeActFunction.getIns().heroRedPoint(hero, true);
	}

	@Override
	public void zeroHero(Hero hero, int now) {
		// TODO Auto-generated method stub
		ServerConsumeActFunction.getIns().heroRedPoint(hero, false);
	}

	@Override
	public void fixTime(int cmdId, int now) {
		// TODO Auto-generated method stub
		if (CrossZone.isCrossServer()) {
			return;
		}
		// 除了玩家自己的消费计算，额外每1小时全服消费的当前消费要随机增加元宝，从100-10000元宝间以100的倍数随机增加
		if (!ActivityFunction.getIns().checkActOpen(ActivitySysId.SERVERCONSUME_NEWACT)) {
			return;
		}
		int[][] addYb = Config_xtcs_004.getIns().get(ServerConsumeActConst.EVERY_HOUR_ADD_YB).getOther();
		int randomYb = RandomUtil.getRandomNumInAreas(addYb[0][0] / 100, addYb[0][1] / 100);
		AtomicLong serverConsume = ServerConsumeActSysCache.getServerConsume();
		serverConsume.addAndGet(randomYb * 100);
	}

}
