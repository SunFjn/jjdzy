package com.teamtop.system.activity.ativitys.eightDoorAppraiseRankAct.cross;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;

public class CrossEightDoorAppraiseRankActEvent extends AbsSystemEvent {

	private static volatile CrossEightDoorAppraiseRankActEvent ins = null;

	public static CrossEightDoorAppraiseRankActEvent getIns() {
		if (ins == null) {
			synchronized (CrossEightDoorAppraiseRankActEvent.class) {
				if (ins == null) {
					ins = new CrossEightDoorAppraiseRankActEvent();
				}
			}
		}
		return ins;
	}

	private CrossEightDoorAppraiseRankActEvent() {
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
	public void zeroPub(int now) {
		// TODO Auto-generated method stub
		CrossEightDoorAppraiseRankActCL.getIns().sendMailAwardToLocal();
	}

	@Override
	public void fixTime(int cmdId, int now) {
		// TODO Auto-generated method stub
		if (cmdId == 1) {
			// 中央服向各个子服发送排名列表,而这个排名是新一期的，防止各个子服数据清空时间不一致导致数据不同步问题
			CrossEightDoorAppraiseRankActCL.getIns().sendRankList();
		}
	}

}
