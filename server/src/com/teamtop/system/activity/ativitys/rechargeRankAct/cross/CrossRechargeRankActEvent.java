package com.teamtop.system.activity.ativitys.rechargeRankAct.cross;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;

public class CrossRechargeRankActEvent extends AbsSystemEvent {

	private static volatile CrossRechargeRankActEvent ins = null;

	public static CrossRechargeRankActEvent getIns() {
		if (ins == null) {
			synchronized (CrossRechargeRankActEvent.class) {
				if (ins == null) {
					ins = new CrossRechargeRankActEvent();
				}
			}
		}
		return ins;
	}

	private CrossRechargeRankActEvent() {
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
		CrossRechargeRankActCL.getIns().sendMailAwardToLocal();
	}

	@Override
	public void fixTime(int cmdId, int now) {
		// TODO Auto-generated method stub
		if (cmdId == 1) {
			// 中央服向各个子服发送排名列表,而这个排名是新一期的，防止各个子服数据清空时间不一致导致数据不同步问题
			CrossRechargeRankActCL.getIns().sendRankList();
		}
	}

}
