package com.teamtop.system.activity.ativitys.nianMonsterMakeSpring;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventFactory;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventUtil;

import excel.config.Config_xtcs_004;

public class NianMonsterMakeSpringCache extends AbsServerEvent {

	/**
	 * 年兽刷新随机
	 */
	private static ProbabilityEventModel monsterProModel = ProbabilityEventFactory.getProbabilityEvent();

	/**
	 * 鞭炮伤害随机
	 */
	private static ProbabilityEventModel hurtHpProModel = ProbabilityEventFactory.getProbabilityEvent();

	public static int getMonsterId() {
		Integer monsterId = (Integer) ProbabilityEventUtil.getEventByProbability(monsterProModel);
//		if (monsterId == null) {
//			monsterId = 1;
//		}
		return monsterId;
	}

	public static int getHurtHp() {
		Integer hp = (Integer) ProbabilityEventUtil.getEventByProbability(hurtHpProModel);
//		if (hp == null) {
//			hp = 10;
//		}
		return hp;
	}

	@Override
	public void startServer() throws RunServerException {
		// TODO Auto-generated method stub

	}

	@Override
	public void initExcel() throws RunServerException {
		int[][] monsterProArr = Config_xtcs_004.getIns().get(NianMonsterMakeSpringConst.MONSTER_PRO).getOther();
		for (int[] monsterPro : monsterProArr) {
			monsterProModel.addProbabilityEvent(monsterPro[1], monsterPro[0]);
		}
		int[][] hpProArr = Config_xtcs_004.getIns().get(NianMonsterMakeSpringConst.HP_PRO).getOther();
		for (int[] hpPro : hpProArr) {
			hurtHpProModel.addProbabilityEvent(hpPro[1], hpPro[0]);
		}
	}

}
