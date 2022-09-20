package com.teamtop.system.battleNew.event;

import com.teamtop.system.battleNew.model.BattleNewInfo;

public abstract class BattleNewEvent {

	public abstract void battleEnd(BattleNewInfo battleNewInfo);

	public abstract void afterBattleEnd(BattleNewInfo battleNewInfo);

	/**
	 * 是否使用公共结算界面协议（是, 则需实现battleCountWin、battleCountLose）
	 * 
	 * @return
	 */
	public abstract boolean isNomalSendBack();

	/**
	 * 战斗胜利结算处理
	 * 
	 * @param battleUid
	 * @return int[][] reward 结算奖励（int[]{类型,道具id,道具数量,是否额外}） 可以为空
	 */
	public abstract int[][] battleCountWin(long battleUid);

	/**
	 * 战斗失败结算处理
	 * 
	 * @param battleUid
	 * @return int[][] reward 结算奖励（int[]{类型,道具id,道具数量,是否额外}） 可以为空
	 */
	public abstract int[][] battleCountLose(long battleUid);

}
