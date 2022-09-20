package com.teamtop.system.crossMine.model;

public class ZhanBao {
	/** 1 抢夺战报 2顺手牵羊 */
	private int type;
	/** 0 失败 1胜利 */
	private int battleRest;
	/** 抢夺者 */
	private CrossMineJoiner qinger;
	/** 被抢夺者 */
	private CrossMineJoiner isqinger;
	/** 奖励 */
	private Object[] rewards;
	/** 矿的类型id */
	private int mineId;

	public ZhanBao() {
		super();
	}

	public ZhanBao(int type, int battleRest, CrossMineJoiner qinger, CrossMineJoiner isqinger, Object[] rewards,
			int mineId) {
		super();
		this.type = type;
		this.battleRest = battleRest;
		this.qinger = qinger;
		this.isqinger = isqinger;
		this.rewards = rewards;
		this.mineId = mineId;
	}

	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}

	public int getBattleRest() {
		return battleRest;
	}

	public void setBattleRest(int battleRest) {
		this.battleRest = battleRest;
	}

	public CrossMineJoiner getQinger() {
		return qinger;
	}

	public void setQinger(CrossMineJoiner qinger) {
		this.qinger = qinger;
	}

	public CrossMineJoiner getIsqinger() {
		return isqinger;
	}

	public void setIsqinger(CrossMineJoiner isqinger) {
		this.isqinger = isqinger;
	}

	public Object[] getRewards() {
		return rewards;
	}

	public void setRewards(Object[] rewards) {
		this.rewards = rewards;
	}

	public int getMineId() {
		return mineId;
	}

	public void setMineId(int mineId) {
		this.mineId = mineId;
	}

}
